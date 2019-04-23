# Project 03

## For CS1XA3 Server
### How to run the project on the server
To run the project on the server, simply go over to the Project03 directory and type in "node app.js" and the server will start. You can then head over to http://mac1xa3.ca/e/kzeery to visit the index page.
### How to test the functionality of the project
#### YouTube Video
I've created a YouTube of me going over all of the key functionality of the app. It shows me starting the server, creating accounts, signing in, adding friends, and playing the game. You can watch the video here: https://youtu.be/i8rAjVyJ9es

All of the features I have showcased in the video are explained below in this section.

#### Connections
To test the functionality of the project, you will want two different connections. Using two different browsers will do the trick (browsers save session info so if you try it on a different tab it will not work). I usually use Chrome and Firefox.

#### Signing up/logging in
Firstly, start by making two different accounts by clicking sign up on the navbar (for example's sake, we'll say their usernames are Foo and Bar). This will create and store two different accounts in the database. You can test this by logging out and trying to log back in with different credentials which will not work. You can try signing up with the same username and that also will not work (note that you cannot be signed in at two different locations on the same user at once. Doing so will prompt an error message).

#### Adding a friend
Once you have made both accounts, you will want to use Foo to add Bar to the friends list. Click on find friend in the navbar and type in Bar (case sensitive). If done correctly, Bar will receive a real-time notification that they received a friend request. If Bar accepts the friend request (under pending friend requests), both users' friends lists will be updated in real time.

#### Online updates
You will notice that in Foo's friends list, Bar's name is highlighted in green. This is to indicate that Bar is currently online. Try logging off or exiting the app on Bar and Foo's friend list will now show Bar's name in black. If Bar signs back in, Foo's friend list will be updated to show the name in green. Also, when hovering over a friend's username, it will only show the "Invite" button if the friend is online. If not, it will only show "Remove friend", and "Match History".

#### Accessing the game
If you are signed in on both Foo and Bar, you can use Foo to invite Bar to a game of cards by hovering over their name in the friends list and clicking "Invite". Bar will recieve a real-time notification indicating that Foo has invited them to a game of cards. Accepting the game invite will redirect both users to the game page. You can try accessing that game page with another user or after the game has started and you will notice that it does not work.

#### Playing the game
Playing the game is complex and documented under "/howtoplay". But for the sake of testing, you can test the real-time updates in the game. On game start, one user will get the notification that it is their turn. Each user can see the cards in their hand, but not the cards in their opponent's hand (Your hand is the leftmost 5 cards at the very bottom and your opponent's hand are the leftmost 5 cards at the top). You can test who's turn it is as well by clicking on a card in the bottom (your hand). If the card is outlined in green, then it is that user's turn. 

If it is Foo's turn for example, you can test the real-time updates by playing a card in your discard pile. Select any card from your hand (not the rightmost one because that is your goal pile) and it will be outlined in green. Play it in one of the empty slots directly above your hand. Foo will notice that their card was removed from their hand and placed in the discard pile. Bar will immediately notice that Foo's hand has one less card, and Foo's discard pile (second from the top) has a new card in it which is the same card that Bar played. 

Foo will notice that an "End turn" button has appeared at the bottom. When clicked, Foo's turn will end, they cannot click any cards, Bar will be notified that it is their turn, and Bar will now be able to play cards.

#### Winning
Leave the game with either Foo or Bar. The other will be notified that they have won and will be prompted to redirect home.

#### Match history
Click on "Signed in as ___" with either Foo or Bar. You will notice that their match history has been updated to show how many wins they have, how many losses they have, the amount of games they have played, as well as some details about each match they have played.

## To view the app online
### How to find the app online
To see the app online, simply go to https://www.multicards.tk. It has the exact same functionality as the CS1XA3 server version.

## Basic Features
### User Creation
This app uses Passport JS authentication combined with MongoDB database to create and authenticate users. When you first arrive on the main page, clicking the "Sign Up" button on the navbar will take you to a page that allows you to create a new user through an HTTP POST request. If all goes successfully, you will create a new user login with those credentials and can then log out and log in at your pleasure.
#### User Sessions
If a user redirects to another page in the server, they do not have to change the page. Their session and cookie information is saved in the MongoDB database and keeps them logged in for the duration of their session.
### EJS Template
The EJS template used in rendering HTML allows the a user to see HTML content that is based on the current user. The navbar will show the username of the currently signed in user, the friends drop-down will show a list of all the current user's friends, the friend requests drop-down will show a list of the current user's pending friend requests, clicking on the currently signed in user will take the user to their match history page, and clicking on a friend's match history button will take the user to that friend's match history page.
### Flash Alerts
Errors or success messages are shown using the connect-flash npm module. They disappear on refresh and help the user know when something has went wrong and when it has went correctly.
### Responsiveness
The app is mostly responsive thanks to the help of a lot of bootstrap. The cards in the game scale down to the users viewing height, it can even be played on mobile. The rest of the website is also mobile friendly and can be enjoyed from any viewing height and width.
### Friends
Each user can add a friend to their friends list. First they start by adding a friend by searching their username up. If the friend is found and is not already their friend, they will send a friend request to that person. When the person accepts their friend request, they become each other's friends. This information is all held in a Mongolabs free online database which means that the information will remain stored.
### The Game (Basic Features)
The game is a card game that may seem kind of confusing to play at first. It is all documented in the "/howtoplay" page. It makes use of a lot of event listeners through jQuery. It uses click listeners on any playable cards, and hover listeners for tool tips where needed. There is also a dialogue box that asks the user if they are sure they want to leave the page when in the game as if they leave they automatically lose. The rules of the game are coded in such that a user cannot make any unallowed or game-breaking actions.

## Advanced Features - Real Time Updates
### Overview 
If there is one thing to take away from this app, it is the real time updates. An npm package that utilizes web sockets called Socket.io was used to make this work. Users get notifications in the bottom right corner for some real time updates and their HTML can change based on another user's actions. A few examples of how this is used are found below.
### Online Status
When a user is online, that user informs all other online users in their friends list that they are online. Every friend that receives this information immediately has their friend's list updated to show that that user is now online by having their name highlighted in green. There is also a number that shows how many friends a user has online at a time.

When a user is online, they also gets the information about which of their friends are currently online at that time, and reflect that information in their friends list.

Anytime a user goes offline, they inform all other friends that are currently online that they have went offline. Their name becomes black to all of their online friends and their friends' online friends count is updated.
### Adding/Removing Friends
When a user sends a friend request to another user, the server will check if that user is online. If they are, it will immediately notify them that they have received a friend request and update their friend request list. 

When the user decides to accept the friend request, if the user who sent it is still online, they will receive an immediate notification informing them that the user has accepted their friend request, and both users will have their friends lists updated accordingly.

Friends lists are also updated in real time when a user removes a friend.

### The Game (Real Time Updates)
A user can only invite a friend to a game of cards if they are online. When they do so, the other player receives a notification asking them if they'd like to accept. If they do, both users are redirected to the game page. The game page is safe in that no other users can access it after 5 seconds of the first two players connecting. If a user does manage to access it in that time frame, they are given a prompt that they cannot join the game and redirected back to the home page. Attempting to access the page after 5 seconds redirects the user to the home page.

When both users are in the game, a random player will start their turn and each player will be notified of who's turn it is. The player that has the turn can play according to the rules and the other player will see what they are doing in real time. When they end their turn, the other player gets a turn and the roles are reversed. Everything that changes is updated for both players in real time, allowing for smooth game play without latency. 

When a user wins, or another user disconnects, a new MongoDB match is created indicating the winner and loser. Each user's match history will be updated to show the time the game started, the length of the game, the users playing, whether the match resulted in a defeat or victory, and the final score.

## Other Notes
### Dependencies
The npm dependencies are found in the package.json, but they will be listed here to explain what they are used for:

 - body-parser: For parsing the JSON of a post request into a javascript object req.body
 - connect-flash: Flashes error and success messages to the user that are visible once
 - connect-mongodb-session: Stores session and cookie information for a user in MongoDB database
 - dateformat: For formatting javascript Date objects
 - dotenv: Required for local development. Allows environment variables to be set from a .env file in process.env
 - ejs: Template used for rendering HTML based on the user
 - express: The main app and routing functionality
 - express-session: Links the app with a user's session information
 - mongoose: Allows for interaction with a MongoDB database
 - passport: Authentication of user credentials
 - passport-local: Strategy for authenticating users
 - passport-local-mongoose: Attachment of authentication to users in the MongoDB database
 - socket.io: Websocket functionality for real time updates

Javascript dependencies include:

 - jQuery: For DOM manipulation
 - Bootstrap javascript files: For bootstrap functionality

Styling dependencies include: 

 - Bootstrap 4: Styling almost everything involved some bootstrap styles

Images:

 - All card images (1 - 12, "Pass", the back, and the deck) were made on my own using Microsoft Paint
 - The image in the "/howtoplay" page was made on my own using a screenshot and Microsoft Word
 - Background images were taken from http://unsplash.com
 
 ### Game Idea
 
 The idea for this card game is based off an already existing card game called Skip Bo. Card game graphics are copyrightable, but card game rules are not. I made all the graphics on my own and only referenced the rules of the game when making my app. 