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

// Run Masonry functions on window resize
function runSizeControl() {
    $(window).resize(function() {
        sizeControl();
    });
}
function sizeControl() {
    // $("#main-container")[0].style.setProperty("width", window.innerWidth - 270 + "px");
    if (window.innerWidth < 768){
        smItem();
    }
    else if (window.innerWidth >= 768 && window.innerWidth < 1024){
        mdItem();
    }
    else if (window.innerWidth >= 1024 && window.innerWidth < 1540){
        lgItem();
    }
    else if (window.innerWidth >= 1540){
        xlItem();
    }
    msnry.layout();
}

// Main masonry grid
function smItem() {
    gridSizer.style.setProperty("width", "100%");
    for(i = 0; i < gridItem.length; i++) {
        gridItem[i].style.setProperty("width", "100%");
    }
}
function mdItem() {
    gridSizer.style.setProperty("width", "50%");
    for(i = 0; i < gridItem.length; i++) {
        gridItem[i].style.setProperty("width", "50%");
    }
}
function lgItem() {
    gridSizer.style.setProperty("width", "33.33%");
    for(i = 0; i < gridItem.length; i++) {
        gridItem[i].style.setProperty("width", "33.33%");
    }
}
function xlItem() {
    gridSizer.style.setProperty("width", "25%");
    for(i = 0; i < gridItem.length; i++) {
        gridItem[i].style.setProperty("width", "25%");
    }
}
