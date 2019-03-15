$(function() {
    $(".password").on("input", function() {
        if($(".password").val() != $("#reenter").val()) {
            $("#ok").text("Passwords do not match!");
            $("#ok").css("color", "red");
            $("button").attr("disabled", "disabled");
        } else {
            $("#ok").text("OK");
            $("#ok").css("color", "green");
            $("button").removeAttr("disabled");
            
        }
    
        
    });
});

