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
    $(document).on('submit', '#myForm', function(e) {
        $.post('https://mac1xa3.ca/e/kzeery/lab7', $("#myForm").serialize(), function(result) {
            $("#response").text(result);
        });
        $("input").val("");
        e.preventDefault();
    });
});

