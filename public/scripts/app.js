const topHero = document.getElementById("home"),
    aboutHero = document.getElementById("about"),
    projectsHero = document.getElementById("projects"),
    contactHero = document.getElementById("contact"),
    form = document.getElementById("contact-form"),
    $nav = $("#nav");

$(function () {
    // Check for Mobile use
    let isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    // Force Mobile Nav
    if (isMobile) {
        $(".offcanvas").addClass("nav-show");
        $(".navbar-toggler").addClass("nav-show");
        $(".main-nav").addClass("nav-hide");
    } else {
        $(".offcanvas").addClass("nav-hide");
        $(".navbar-toggler").addClass("nav-hide");
        $(".main-nav").addClass("nav-show");
    }

    // On Load
    $(window).on("load", () => {
        if (isMobile) {
            // remove scroll fade animation
            $(".animated").each( function(i){
                $(this).removeClass("animated");
            });
        } else {
            // run fade animation
            fadeAnimation();
        }
    })

    // On Scroll
    $(document).on("scroll", function () {
        // limit scroll code 
        let pos = $(window).scrollTop();
        let pos2 = pos + 50;

        // nav slide down animation
        if(isMobile || $(window).width() < 768) {
            $(".navbar.scrollDown").css("animation-duration", "0s")
        }
        $nav.toggleClass("scrollDown", $(this).scrollTop() >= $("#home").height() - 49);
        $nav.toggleClass("scrollUp", $(this).scrollTop() < $("#home").height() - 48);

        // Link Highlighting
        if (pos2 > $("#home").offset().top) {
            highlightLink("home")
        }
        if (pos2 > $("#about").offset().top) {
            highlightLink("about")
        }
        if (pos2 > $("#projects").offset().top) {
            highlightLink("projects")
        }
        if (pos2 > $("#contact").offset().top || pos + $(window).height() === $(document).height()) {
            highlightLink("contact")
        }
        // run fade animation
        if (!isMobile) {
            fadeAnimation();
        } 
    });

    // Nav Scroll-To Event
    $(".nav-link").on("click", function () {
        $("nav .active").removeClass("active");
        $("nav").find("[dest=\"" + $(this).attr('dest') + "\"]").addClass("active");
        
        // scroll animation
        $("#" + $(this).attr('dest'))[0].scrollIntoView({ behavior: "smooth" });

        // if has not scrolled for 50ms, close offcanvas
        $(window).on("scroll", function () {
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function () {
                // close canvas
                $(".offcanvas .btn-close").trigger("click");
            }, 50));
        });

        // if selected same link, close offcanvas
        if($("#" + $(this).attr('dest')).position().top == $(window).scrollTop()){
            // close canvas
            $(".offcanvas .btn-close").trigger("click");
        }
    });

    // Functions
    function highlightLink(anchor) {
        // remove previous active, set current active
        $("nav .active").removeClass("active");
        $("nav").find("[dest=\"" + anchor + "\"]").addClass("active");
    }
    function fadeAnimation() {
        // Check the location of each animated element
        $(".animated").each( function(i){
            let bottom_of_object = $(this).position().top + $(this).outerHeight();
            let bottom_of_window = $(window).scrollTop() + $(window).height();

            // If the object is completely visible in the window, fade it in
            if( bottom_of_window > bottom_of_object ){ 
                $(this).addClass("fadeUp");

                // if in contact form remove animated class (required for text input)
                if($(this).hasClass("form-group")) {
                    setTimeout( () => {
                        $(this).removeClass("fadeUp")
                        $(this).removeClass("animated")
                    }, 1000);
                }
            }
        });
    }
});
