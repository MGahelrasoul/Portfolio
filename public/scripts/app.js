const topHero = document.getElementById("top-hero"),
    skillsHero = document.getElementById("skills-hero"),
    projectsHero = document.getElementById("projects-hero"),
    contactHero = document.getElementById("contact-hero"),
    galleryInfo = document.getElementById("gallery"),
    tasteInfo = document.getElementById("taste"),
    ffInfo = document.getElementById("finding-farmers"),
    ycInfo = document.getElementById("yelp-camp"),
    techinfo = document.getElementById("tech-blog"),
    tetrisInfo = document.getElementById("tetris"),
    // productInfo = document.getElementById("product"),
    logosInfo = document.getElementById("logos")

// window.onload = setTimeout(function () {
//     sizeControl()
// }, 150)
// runSizeControl();

// Nav link for scroll to hero
$("#top-btn").bind("click", function (e) {
    e.preventDefault();
    topHero.scrollIntoView({ behavior: 'smooth' });
})
$("#skills-btn").bind("click", function (e) {
    e.preventDefault();
    skillsHero.scrollIntoView({ behavior: 'smooth' });
})
$("#projects-btn").bind("click", function (e) {
    e.preventDefault();
    projectsHero.scrollIntoView({ behavior: 'smooth' });
})
$("#contact-btn").bind("click", function (e) {
    e.preventDefault();
    contactHero.scrollIntoView({ behavior: 'smooth' });
})

// Dropdown link for scroll to Project Info
$(".gallery-btn").bind("click", function () {
    galleryInfo.scrollIntoView({ behavior: 'smooth' });
})
$(".taste-btn").bind("click", function () {
    tasteInfo.scrollIntoView({ behavior: 'smooth' });
})
$(".findingFarmers-btn").bind("click", function () {
    ffInfo.scrollIntoView({ behavior: 'smooth' });
})
$(".yelpCamp-btn").bind("click", function () {
    ycInfo.scrollIntoView({ behavior: 'smooth' });
})
$(".techBlog-btn").bind("click", function () {
    techinfo.scrollIntoView({ behavior: 'smooth' });
})
$(".tetris-btn").bind("click", function () {
    tetrisInfo.scrollIntoView({ behavior: 'smooth' });
})
// $(".product-btn").bind("click", function () {
//     productInfo.scrollIntoView({ behavior: 'smooth' });
// })
// $(".logos-btn").bind("click", function () {
//     logosInfo.scrollIntoView({ behavior: 'smooth' });
// })

// image resize on window resize
// function runSizeControl() {
//     $(window).resize(function () {
//         sizeControl();
//     });
// }
// function sizeControl() {
//     let $proj = $(".project-content")
//     for (let i = 0; i < $proj.length; i++) {
//         $proj[i].style.setProperty("height", $('.project-content img')[0].offsetWidth + "px")
//     }
// }

// Navbar scroll control
$(function () {
    $(document).scroll(function () {
        var $nav = $("#topnav");
        $nav.toggleClass("scrollDown", $(this).scrollTop() >= $("#top-hero").height() - 70);
    })
})
$(function () {
    $(document).scroll(function () {
        var $nav = $("#topnav");
        $nav.toggleClass("scrollUp", $(this).scrollTop() < $("#top-hero").height() - 69);
    })
})