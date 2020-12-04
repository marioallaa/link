/* Template: Tivo - SaaS App HTML Landing Page Template
   Author: Inovatik
   Created: Sep 2019
   Description: Custom JS file
*/


var firebaseConfig = {
    apiKey: "AIzaSyAgGjB3QQWTcMmq_ji5BJUuHiAvbrJJet4",
    authDomain: "ogierio.firebaseapp.com",
    databaseURL: "https://ogierio.firebaseio.com",
    projectId: "ogierio",
    storageBucket: "ogierio.appspot.com",
    messagingSenderId: "864816377235",
    appId: "1:864816377235:web:01ccdc38c2ca9117aa8c66",
    measurementId: "G-BNP5JS58NJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


(function($) {
    "use strict";
    var baseURL = "https://api.ogier.io/"; // 'http://localhost:3000/'; // "https://api.ogier.io/";

    /* Preloader */
    $(window).on('load', function() {
        var preloaderFadeOutTime = 250;

        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function() {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 250);
        }
        hidePreloader();
    });


    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });


    /* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            // when window is <= 580px
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


    /* Text Slider - Swiper */
    var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });


    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        /* keep it false to avoid html tag shift with margin-right: 17px */
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function() {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });



    /* Sign Up Form */
    $("#signUpForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            sformError();
            ssubmitMSG(false, "This field is required!");
        } else {
            // everything looks good!
            event.preventDefault();
            ssubmitForm();
        }
    });


    /* Demo Form */
    $("#4signUpForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            rformError();
            rsubmitMSG(false, "This field is required!");
        } else {
            // everything looks good!
            event.preventDefault();
            rsubmitForm();
        }
    });



    function rsubmitForm() {

        var data = {
            email: $("#4email").val().toLowerCase(),
            name: $("#4name").val(),
            surname: $("#4surname").val(),
            company: $("#4company").val().toLowerCase(),
            industry: $("#4industry").val(),
            role: $("#4role").val(),
            phone: $("#4phone").val().toLowerCase(),
            terms: $("#4terms").val(),
        }
        var d = { msg: `${data.name} ${data.surname} who works as a ${data.role} at ${data.company} (${data.industry}) want's to schedule a demo. \n   CONTACT INFO \nemail: ${data.email} \nphone: ${data.phone}` };
        $.ajax({
            type: "POST",
            url: baseURL + "telegram/send/msg",
            data: d,
            success: function(text) {
                rformSuccess();
                rsubmitMSG(false, "We will be in touch shortly!");
            },
            error: function(text) {
                rformError();
                rsubmitMSG(false, "There was a problem, please try again later!");
            }
        });
    }


    function ssubmitForm() {
        // initiate variables with form content
        var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        var email = $("#semail").val().toLowerCase();
        var name = $("#sname").val();
        var surname = $("#ssurname").val();
        var username = $("#suname").val().toLowerCase();
        var password = $("#spassword").val();
        var type = $("#sType").val();
        hashObj.update(password);
        password = hashObj.getHash("HEX");

        var terms = $("#sterms").val();

        var data = {
            email: email,
            name: name,
            role: 1,
            surname: surname,
            username: username,
            password: password,
            accountType: type,
        }
        $.ajax({
            type: "POST",
            url: baseURL + "auth/register",
            data: data,
            success: function(text) {
                console.log(text)
                if (text.id != null) {
                    var d = { username: username, password: password }
                    console.log(d);
                    $.ajax({
                        type: "POST",
                        url: baseURL + "auth/login",
                        data: d,
                        success: function(text) {
                            if (text.access_token != null || text.access_token != undefined) {
                                localStorage.setItem('token', text.access_token)
                                sformSuccess();
                                setTimeout(function() {
                                    window.location.href = "/next/";
                                }, 500)
                            } else {
                                sformError();
                                ssubmitMSG(false, text);
                            }
                        }
                    });
                } else {
                    sformError();
                    ssubmitMSG(false, "This username is taken")
                }
            },
            error: function(text) {
                sformError();
                ssubmitMSG(false, "The username that you have chosen is already taken. If the error persists please try again later.")
            }
        });
    }

    function sformSuccess() {
        $("#signUpForm")[0].reset();
        ssubmitMSG(true, "Submitted");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function sformError() {
        $("#signUpForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function ssubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#smsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    function rformSuccess() {
        $("#4signUpForm")[0].reset();
        ssubmitMSG(true, "Submitted");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function rformError() {
        $("#signUpForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function rsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#4submit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Log In Form */
    $("#logInForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
        // initiate variables with form content
        var username = $("#lemail").val();
        var password = $("#lpassword").val();
        var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        hashObj.update(password);
        password = hashObj.getHash("HEX");

        var d = { username: username, password: password }
        $.ajax({
            type: "POST",
            url: baseURL + "auth/login",
            data: d,
            success: function(text) {
                if (text.access_token != null) {
                    localStorage.setItem('token', text.access_token)
                    lformSuccess();
                    setTimeout(function() {
                        window.location.href = "/user/";
                    }, 500)
                } else {
                    lformError();
                    lsubmitMSG(false, text);
                }
            },
            error: function(text) {
                lformError();
                lsubmitMSG(false, "Please check your username and password.")
            }
        });
    }

    function lformSuccess() {
        $("#logInForm")[0].reset();
        lsubmitMSG(true, "Log In Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function lformError() {
        $("#logInForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function lsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Newsletter Form */
    $("#newsletterForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            nformError();
            nsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            nsubmitForm();
        }
    });

    function nsubmitForm() {
        // initiate variables with form content
        var email = $("#nemail").val();
        var terms = $("#nterms").val();
        var d = { msg: `${ email } wants to subscribe to your news letter,$ { terms } ` }
        console.log(d);
        $.ajax({
            type: "POST",
            url: baseURL + "telegram/send/msg",
            data: d,
            success: function(text) {
                nformSuccess();
            },
            error: function(text) {
                nformError();
            }
        });
    }

    function nformSuccess() {
        $("#newsletterForm")[0].reset();
        nsubmitMSG(true, "Subscribed!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function nformError() {
        $("#newsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function nsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });



})(jQuery);