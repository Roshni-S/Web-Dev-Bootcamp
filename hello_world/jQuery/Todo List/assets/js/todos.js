$("li").on("click", "li", function(){
    $(this).toggleClass("completed");
});

$("ul").on("click", "span", function(event) {
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

$(".fa-plus").click(function(){
    $("input[type='text'").fadeToggle();
})

// $("ul").click(function () {
//     alert("clicked on a ul!");
// });

// $("#container").click(function () {
//     alert("clicked on container div!");
// });

// $("body").click(function () {
//     alert("clicked on body!");
// });