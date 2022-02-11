
sizeControl();
$(window).resize(function() {
    sizeControl();
});

function sizeControl() {
    $(".circle-brand").toggleClass("float-left", window.innerWidth < 768)
    $(".brand").toggleClass("float-right", window.innerWidth < 768)
}