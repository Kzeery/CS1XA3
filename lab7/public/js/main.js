$(".password").on("input", function() {
    if($(".password").val() != $("#reenter").val()) {
        $("#ok").text("Passwords do not match!");
        $("#ok").css("color", "red");
    } else {
        $("#ok").text("OK");
        $("#ok").css("color", "green");
    }

    
});