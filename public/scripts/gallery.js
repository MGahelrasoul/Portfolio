var grid = document.querySelector('.listing-grid'),
    gridSizer = document.getElementById("grid-sizer"),
    gridItem = document.getElementsByClassName("grid-item")

var imageSrc = "/"

var msnry = new Masonry( grid, {
    // options
    itemSelector: '.grid-item',
    columnWidth: '#grid-sizer',
    percentPosition: true
});


window.onload = setTimeout(function() {
    sizeControl()
}, 150)
runSizeControl();


// Modal handling
$(".preview").on("click", function() {
    $("#imageModal").find("img").attr("src", $(this)[0].children[0].children[0].src)
})
$('#imageModal').on('shown.bs.modal', function () {
    $(".modal")[0].style.setProperty("overflow-x", "hidden")
    $(".modal")[0].style.setProperty("overflow-y", "auto")
})
$('#imageModal').on('hide.bs.modal', function () {
    $(".modal")[0].style.setProperty("overflow-x", "hidden")
    $(".modal")[0].style.setProperty("overflow-y", "auto")
    $("body")[0].style.setProperty("overflow-x", "hidden")
})

$(".navbar-toggler").on("click", () => {
    $("#main-nav").toggleClass("navToggle")
})

// Nav fade effect
$(function () {
    $(document).scroll(function(){
        var $nav = $("#main-nav");
        $nav.toggleClass("scrollDown", $(this).scrollTop() > $nav.height() - 63);
        var $brand = $(".navbar-brand");
        $brand.toggleClass("scrollDown-brand", $(this).scrollTop() > $nav.height() - 63);
    })
})
$(function () {
    $(document).scroll(function(){
        var $nav = $("#main-nav");
        $nav.toggleClass("scrollUp", $(this).scrollTop() <= $nav.height() - 44);
        var $brand = $(".navbar-brand");
        $brand.toggleClass("scrollUp-brand", $(this).scrollTop() <= $nav.height() - 44);
    })
})

// Run Masonry functions on window resize
function runSizeControl() {
    $(window).resize(function() {
        sizeControl();
    });
}
function sizeControl() {
    if (window.innerWidth < 1024){
        smItem();
    }
    else if (window.innerWidth >= 1024 && window.innerWidth < 1540){
        mdItem();
    }
    // else if (window.innerWidth >= 1540){
    //     lgItem();
    // }
    msnry.layout();
}

// Main masonry grid
function smItem() {
    gridSizer.style.setProperty("width", "50%");
    for(i = 0; i < gridItem.length; i++) {
        gridItem[i].style.setProperty("width", "50%");
    }
}
function mdItem() {
    gridSizer.style.setProperty("width", "33.33%");
    for(i = 0; i < gridItem.length; i++) {
        gridItem[i].style.setProperty("width", "33.33%");
    }
}
// function lgItem() {
//     gridSizer.style.setProperty("width", "25%");
//     for(i = 0; i < gridItem.length; i++) {
//         gridItem[i].style.setProperty("width", "25%");
//     }
// }