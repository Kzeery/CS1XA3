$("input").on('input', function() {
    $("#text").text($("input")[0].value + " : " + $("input")[1].value);
});