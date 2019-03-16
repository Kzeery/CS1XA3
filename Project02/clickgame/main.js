$(function() {
    function initGame(score) {
        $("#game").hide();
        $("#tab").removeAttr("hidden");
        $("#play").removeAttr("hidden");
        $("#score").text("score: " + score);
        $("#accuracy").text("accuracy: 100.00%");
        $("#minutes").text("0");
        $("#seconds").text("05");
    }



    function makeNewCircle() {
        x = Math.floor(660 * Math.random());
        y = Math.floor(660 * Math.random());
        $(".play").append("<span class='circle' style='margin-top: " + y + "px; margin-left: " + x + "px;'></span>");
        
    }
    function timer(time, game, create) {
        var seconds = $("#seconds").text();
        var minutes = $("#minutes").text();
        if(seconds === "00") {
            if(minutes === "0") {
                reset(create, game);
                clearInterval(time);
            } else {
                $("#minutes").text(minutes - 1);
                $("#seconds").text("59");
            }
        } else {
            if(seconds <= 10) {
                $("#seconds").text("0" + (seconds - 1));
            } else {
                $("#seconds").text(seconds - 1);
            }
        }
    }
    function reset(create, game) {
        $(".circle").remove();
        $("#tab").attr("hidden", "hidden");
        $("#play").attr("hidden", "hidden");
        $("#game").show();
        clearInterval(game);
        clearInterval(create);
    }
    $("button").click(function() {
        var score = 0;
        var clicked = 0;
        var missed = 0;
        initGame(score);
        $(".play").on('click', function(e) {
            if(e.target !== this) {
                console.log("not target")
            } else {
            $("#score").text("score: " + --score);
            missed++;
            $("#accuracy").text("accuracy: " + (clicked/(clicked + missed) * 100).toFixed(2) + "%");
            }
           
        });
        var create = setInterval(function() {
            if($(".circle").length != 6) {
                makeNewCircle();
            }
        }, 400);
        var game = setInterval(function() {
            $(".circle").each(function(circle) {
                if($(this).width() == 1) {
                    $(this).remove();
                    $("#score").text("score: " + --score);
                    missed++;
                    $("#accuracy").text("accuracy: " + (clicked/(clicked + missed) * 100).toFixed(2) + "%");
                }
                $(this).width($(this).width() - 1);
                $(this).height($(this).height() - 1);
                $(this).off("click");
                $(this).click(function() {
                    $(this).remove();
                    $("#score").text("score: " + ++score);
                    clicked++;
                    $("#accuracy").text("accuracy: " + (clicked/(clicked + missed) * 100).toFixed(2) + "%");
                });
            });
        }, 60);
        var time = setInterval(function() {
            timer(time, game, create);
        }, 1000)
    });
});