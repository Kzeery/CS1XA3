const sockets       = require("./exports/sockets"),
    session         = require("express-session"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    User            = require("./models/user"),
    bodyParser      = require("body-parser"),
    socketIO        = require("socket.io"),
    mongoose        = require("mongoose"),
    passport        = require("passport"), 
    express         = require("express"),
    http            = require("http"),
    mongoconnect    = process.env.DATABASEURL || "mongodb://localhost/multicards",
    port            = process.env.PORT || 3000,
    ip              = process.env.IP || '127.0.0.1',
    app             = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoconnect);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(session({
    secret: "multicardSecret13245",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
const server  = http.Server(app),
      io      = socketIO(server),
      urls    = [];  

var main = io.of("/");
var connectedUserSockets = {};
main.on("connection", function(socket) {
    socket.on("newsocket", function(id) {
        if(connectedUserSockets[id]) {
            return socket.emit("alreadyonline")
        }
        socket.userId = id;
        User.findById(id, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                socket.username = user.username;
                connectedUserSockets[socket.userId] = socket.id;
                user.friends.forEach(function(friend) {
                    if(connectedUserSockets[friend.id]) {
                        socket.emit("useronline", friend.id, friend.username);
                        socket.broadcast.to(connectedUserSockets[friend.id]).emit("useronline", socket.userId, socket.username);
                    }
                });
            }
        });
    });
    socket.on("findfriend", function(findfriend) {
        User.findOne({username: findfriend}, function(err, foundfriend) {
            if(err) {
                var message = {danger: err.message};
            } else {
                if(foundfriend && foundfriend.username !== socket.username) {
                    var requested = foundfriend.friendinvites.some(function(friendinvite) {
                        return friendinvite.id == socket.userId;
                    });
                    var friendlist = foundfriend.friends.some(function(friend) {
                        return friend.id == socket.userId;
                    });
                    if(!requested) {
                        if(!friendlist) {
                            foundfriend.friendinvites.push({id: socket.userId, username: socket.username});
                            foundfriend.save();
                            var message = {success: "Sent a friend request to: " + foundfriend.username};
                            socket.broadcast.to(connectedUserSockets[foundfriend.id]).emit("newfriendrequest", socket.username, socket.userId);

                        } else {
                            var message = {danger: "you are already friends with " + foundfriend.username};
                        }
                    } else {
                        var message = {danger: "you already sent a friend request to: " + foundfriend.username};
                    }
                } else {
                    var message = {danger: "no friend with that name found!"};
                } 
            }
            socket.emit("findfriendresult", message)
        });
    });
    socket.on("acceptrequest", function(data) {
        User.findById(socket.userId, function(err, user) {
            if(err) {
                return socket.emit("acceptrequestresult", {danger: err.message});
            } else {
                var friendId;
                if(user.friendinvites.some(function(friendinvite) {
                    friendId = {id: friendinvite.id, username: friendinvite.username};
                    return friendinvite.id == data.friend;
                })) {
                    user.friendinvites = user.friendinvites.filter(function(value, index, arr) {
                        return value.id !== data.friend
                    });
                    user.friends.push(friendId);
                    user.save();
                    User.findById(data.friend, function(err, friend) {
                        if(err) {
                            return socket.emit("acceptrequestresult", {danger: err.message})
                        } else {
                            friend.friends.push({id: socket.userId, username: socket.username});
                            friend.save();
                            socket.emit("acceptrequestresult", {success: "friend added!", friend: {id: friend.id, username: friend.username}});
                            if(connectedUserSockets[data.friend]) {
                                socket.broadcast.to(connectedUserSockets[data.friend]).emit("acceptedrequest", socket.username, socket.userId);
                                socket.emit("useronline", friend.id, friend.username)
                                socket.broadcast.to(connectedUserSockets[data.friend]).emit("useronline", socket.userId, socket.username);
                            }
                        }
                    });
                } else {
                    return socket.emit("acceptrequestresult", {danger: "Friend not found!"});
                }
            }
        });
    });
    socket.on("declinerequest", function(data) {
        User.findById(socket.userId, function(err, user) {
            if(err) {
                var message = {danger: err.message};
            } else {
                if(user.friendinvites.some(function(friendinvite) {
                    return friendinvite.id == data.friend;
                })) {
                    user.friendinvites = user.friendinvites.filter(function(value, index, arr) {
                        return value.id !== data.friend;
                    });
                    user.save();
                    var message = {success: "friend request declined!"};
                } else {
                    var message = {danger: "Friend not found!"}
                }
            }
            socket.emit("declinerequestresult", message)
        });
    });
    socket.on("removefriend", function(id) {
        User.findById(id, function(err, friend) {
            if(err) {
                socket.emit("friendremoved", {danger: err.message})
            } else {
                friend.friends = friend.friends.filter(function(value, index, arr) {
                    return value.id !== socket.userId;
                });
                friend.save();
                User.findById(socket.userId, function(err, self) {
                    if(err) {
                        socket.emit("friendremoved", {danger: err.message})
                    } else {
                        self.friends = self.friends.filter(function(value, index, arr) {
                            return value.id !== friend.id;
                        });
                        self.save();
                        socket.emit("friendremoved", {success: "Friend removed!"});
                        if(connectedUserSockets[friend.id]) {
                            socket.broadcast.to(connectedUserSockets[friend.id]).emit("deletedfriend", socket.username, socket.userId);
                        }
                    }
                });
            }
        });
    });
    socket.on("invitefriend", function(id) {
        if(!urls.includes(id + socket.userId)) {
            var url = "/game/" + urls[urls.push(id + socket.userId) - 1]
            sockets.socketListener(url, io);
        } else {
            var url = "/game/" + id + socket.userId;
        }
        if(connectedUserSockets[id]) {
            socket.broadcast.to(connectedUserSockets[id]).emit("invitedtogame", socket.username, socket.userId, url);
        }
    });
    socket.on("acceptedinvite", function(id, url) {
        if(connectedUserSockets[id]) {
            socket.broadcast.to(connectedUserSockets[id]).emit("redirectgame", url);
        }
        setTimeout(function() {
            var index = urls.indexOf(url);
            urls.splice(index, 1);
        }, 5000);
    });
    socket.on("declinedinvite", function(id) {
        if(connectedUserSockets[id]) {
            socket.broadcast.to(connectedUserSockets[id]).emit("frienddeclined", socket.username);
        }
    })
    socket.on("disconnect", function() {
        if(socket.userId) {
            User.findById(socket.userId, function(err, user) {
                if(err) {
                    console.log(err);
                } else {
                    user.friends.forEach(function(friend) {
                        if(connectedUserSockets[friend.id]) {
                            socket.broadcast.to(connectedUserSockets[friend.id]).emit("useroffline", socket.userId, socket.username);
                        }
                    });
                }
            });
            delete connectedUserSockets[socket.userId]
        }
    });
});

app.get("/", function (req, res) {
    res.render("index");
});
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to multicards " + user.username);
            res.redirect("/");
        });
    });
});
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}),function(req, res) {
});

app.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

app.get("/matches/:id", function(req, res) {
    User.findById(req.params.id).populate("matches").exec(function(err, user) {
        if(err || !user) {
            req.flash("error", "No user with that ID found!");
            return res.redirect("/");
        }
        var isFriend = false;
        if(req.user) {
            user.friends.forEach(function(friend) {
                if(friend.id == req.user.id) {
                    isFriend = true;
                }
            });
        }
        setTimeout(function() {
            res.render("matches", {user: user, isFriend: isFriend});
        }, 100)
    });
    
});



app.get("/game/:id", function(req, res) {
    if(urls.includes(req.params.id)) {
        return res.render("game");
    }
    res.redirect("/");
});

server.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started!");
});