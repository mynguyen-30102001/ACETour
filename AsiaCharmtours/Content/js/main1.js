"use strict";

$(window).on('load', function() {
    TruncateLine.init();
});

$(function() {

    MobileMenu.init();
    PreLoader.init();
    AnimationScrollPage.init();
    // CountTo.init();
    // ParallaxBackground.init();
    Slider.init();
    // InputFile.init();
    ScrollToTop.init();
    CustomTheme.init();
    // PriceRange.init();
    CalcQuantity.init();
    StickyScroll.init();
    // ToolTip.init();
    // Barrating.init(); //require poper.js
    // NiceSelect.init();
    // ScrollBar.init();
    // FormValidation.init();
    DatePicker.init();

});

var DatePicker = function() {
    var _initInstances = function() {
        var date = new Date();
        date.setDate(date.getDate());


        function matchStart(term, text) {
            if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
                return true;
            }
            return false;
        }

        if ($('.js-example-basic-single').length) {
            $.fn.select2.amd.require(['select2/compat/matcher'], function(oldMatcher) {
                $('.js-example-basic-single').select2({
                    theme: "bootstrap4",
                    matcher: oldMatcher(matchStart)
                });
            });
        }


        if ($('.vk-datepicker').length) {
            $('.vk-datepicker').datepicker({
                startDate: date,
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayHighlight: true
            });
        }

    };

    return {
        init: function() {
            _initInstances();
        }


    };
}();


var FormValidation = function() {
    var _initInstances = function() {
        var checkoutForm = function() {
            var els = $('.vk-form--checkout input, .vk-form--checkout textarea');

            function telIsNumberOnly() {
                var el = $("#tel");
                el.keydown(function(e) {
                    // Allow: backspace, devare, tab, escape, enter and .
                    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                        // Allow: Ctrl/cmd+A
                        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: Ctrl/cmd+C
                        (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: Ctrl/cmd+X
                        (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // var it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                });
            }


            function inputHandleFocus() {
                els.on('focus', function() {
                    $(this).addClass('active');
                })
            }

            function inputHandleBlur() {
                els.on('blur', function() {
                    var el = $(this);
                    console.log(el.val().trim().length);
                    if (el.val().trim().length < 1) {
                        $(this).removeClass('active');
                    }


                })
            }

            function checkoutFormValidation() {
                var el = $("#checkoutForm");

                $.validator.addMethod("valueNotEquals", function(value, element, arg) {
                    return arg !== value;
                }, "Value must not equal arg.");

                el.validate({

                    rules: {
                        fullname: {
                            required: true,
                            minlength: 2,
                        },
                        tel: {
                            required: true,
                            minlength: 10,
                            maxlength: 11,
                        },
                        province: {
                            required: true,
                            valueNotEquals: '0'
                        },
                        district: {
                            required: true,
                            valueNotEquals: '0'
                        },
                        addr: {
                            required: true,
                        }
                    },

                    //noti
                    messages: {
                        fullname: {
                            required: "Nhập họ tên của bạn",
                            minlength: "Họ tên của bạn quá ngắn"
                        },
                        tel: {
                            required: "Nhập số điện thoại của bạn",
                            minlength: "Số điện thoại không đúng định dạng 10 hoặc 11 số",
                            maxlength: "Số điện thoại không đúng định dạng 10 hoặc 11 số",
                        },
                        province: {
                            required: "Chọn tỉnh/thành",
                            valueNotEquals: 'Chọn tỉnh/thành'
                        },
                        district: {
                            required: "Chọn quận/huyện",
                            valueNotEquals: 'Chọn quận/huyện'
                        },
                        addr: {
                            required: "Nhập địa nhận hàng",
                        }
                    }
                });
            }

            function run() {
                telIsNumberOnly();
                inputHandleFocus();
                inputHandleBlur();
                checkoutFormValidation();
            }

            run();

        }();


        $("#txtboxToFilter").keydown(function(e) {
            // Allow: backspace, devare, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl/cmd+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: Ctrl/cmd+C
                (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: Ctrl/cmd+X
                (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // var it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });


        $("#signupForm").validate({
            rules: {
                firstname: "required",
                test: {
                    required: true,
                    minlength: 3

                },
                tel: {
                    required: true,
                    minlength: 10,
                    maxlength: 11
                },
                username: {
                    required: true,
                    minlength: 5
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                agree: "required"
            },

            //noti
            messages: {
                firstname: "Nhập họ tên của bạn",
                test: {
                    required: 'nhập lại test',
                    minlength: 'chưa dủ 3 ký tự'
                },

                tel: {
                    required: "Nhập số điện thoại của bạn",
                    minlength: 'Số điện thoại không phù hợp',
                    maxlength: 'Số điện thoại không phù hợp',
                },
                username: {
                    required: "Please enter a username",
                    minlength: "Tài khoản đăng nhập phải có ít nhất {0} ký tự"
                },
                password: {
                    required: "Nhập mật khẩu của bạn",
                    minlength: "Mật khẩu phải có ít nhất {0} ký tự"
                },
                confirm_password: {
                    required: "Nhập mật khẩu của bạn",
                    minlength: "Mật khẩu phải có ít nhất {0} ký tự",
                    equalTo: "Nhập lại mật khẩu chưa đúng"
                },
                email: "Email không hợp lệ",
                agree: "Bạn chưa đồng ý với điều khoản của chúng tôi",
            },


            submitHandler: function(form) {
                console.log(form);
                postContent();

            },
        });

    };

    return {
        init: function() {
            _initInstances();
        }


    };
}();

var ScrollBar = function() {
    var _initInstances = function() {
        $('.scrollbar-inner').scrollbar();
    };

    return {
        init: function() {
            _initInstances();
        }


    };
}();

var NiceSelect = function() {
    var _initInstances = function() {
        var el = $('[data-nice-select]');
        el.niceSelect();

    };

    return {
        init: function() {
            _initInstances();
        }


    };
}();

var Barrating = function() {
    var _initInstances = function() {
        var el = $('[data-rate]');
        el.barrating({
            theme: 'fontawesome-stars'
        });

    };

    return {
        init: function() {
            _initInstances();
        }


    };
}();

var TruncateLine = function() {
    var _initInstances = function() {
        var el = $('[data-truncate-lines]');
        el.each(function() {
            var lines = $(this).data('truncate-lines');
            // console.log(lines);
            $(this).truncate({
                lines: lines
            });
        });

    };

    return {
        init: function() {
            _initInstances();
        },
        responsive: function() {
            _initInstances();
        }


    };
}();

var ToolTip = function() {

    var _initInstances = function() {

        $('[data-toggle="tooltip"]').tooltip({})

    };

    return {
        init: function() {
            _initInstances();
        }

    };
}();

var StickyScroll = function() {

    var _initInstances = function() {

        var obj = $('[data-layout="sticky"]');
        var megaMenuActivity = $('.vk-menu__mega');
        var shrinkHeader = 300;

        obj.stickOnScroll({
            topOffset: 0,
            bottomOffset: 5,
            footerElement: null,
            viewport: window,
            stickClass: 'stickOnScroll-on',
            setParentOnStick: false,
            setWidthOnStick: false,
            onStick: null,
            onUnStick: null
        });


        // obj.next().css({
        //     'position':'relative',
        //     'top': obj.outerHeight(true) + 'px',
        // });


        $(window).scroll(function() {
            var scroll = getCurrentScroll();

            if (scroll >= 50) {
                megaMenuActivity.addClass('_shrink');
            } else {
                megaMenuActivity.removeClass('_shrink');
            }


            if (scroll >= shrinkHeader) {
                obj.addClass('_shrink');
                $('body').addClass('header-shrink')
            } else {
                obj.removeClass('_shrink');
                $('body').removeClass('header-shrink');
            }
        });

        var fixTop = function() {

            var els = $('[data-layout="fix-top"]');
            if ($(window).width() > 991) {
                els.each(function() {
                    var _this = $(this);
                    var offsetTop = _this.offset().top;
                    $(window).scroll(function() {
                        var offsetCurrent = getCurrentScroll();
                        if (offsetCurrent >= offsetTop) {
                            _this.addClass('active');
                        } else {
                            _this.removeClass('active');
                        }
                    })

                });
            }


        }();

        var getCurrentScroll = function() {
            return window.pageYOffset || document.documentElement.scrollTop;
        };

    };

    return {
        init: function() {
            _initInstances();
        }

    };
}();


var PreLoader = function() {
    var _initInstances = function() {
        $('.animsition').animsition({
            // loadingClass: 'loader',
            inDuration: 500,
            outDuration: 400,
            timeoutCountdown: 1000,
            timeout: true,
            linkElement: 'a:not([data-fancybox]) a:not([data-image]) a:not([target="_blank"]):not([href^="#"]):not([href^="javascript:void(0);"]):not([href^="callto:"]):not([href^="mailto:"])',
        });
    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var MobileMenu = function() {
    var _initInstances = function() {

        var mobileMenu = $('[data-menu]');

        if (mobileMenu.length) {
            mobileMenu.each(function() {
                var el = $(this).data('menu');

                $(el).mmenu({
                    "extensions": [
                        // "fx-panels-zoom",
                        "pagedim-black",
                        "theme-dark"
                    ],
                    "offCanvas": {
                        // "position": "right"
                    },
                    "navbar": {
                        "title": "<img src=\"images/logo-1.png\" alt=\"LOGO\">"
                    },
                    "navbars": [{
                            "position": "bottom",
                            "content": [
                                "<ul class=\"vk-header__list--style-1\">\n" +
                                "                    <li><a href=\"mailto:sales@luxurytravelvietnam.com\"><i class=\"_icon fa fa-envelope-o\"></i>\n" +
                                "                        sales@luxurytravelvietnam.com</a></li>\n" +
                                "                    <li><a href=\"tel:(+84) 834 686 996\"><i class=\"_icon fa fa-phone\"></i> Call Us: (+84) 834 686\n" +
                                "                        996</a></li>\n" +
                                "                </ul>"
                            ]
                        },
                        {
                            "position": "bottom",
                            "content": [
                                "<a class='' href='#/'>French</a>",
                                "<a class='' href='#/'>German</a>",
                                "<a class='' href='#/'>Spanish</a>",
                                "<a class='' href='#/'>Italy</a>"
                            ]
                        }

                    ]
                });
            })


        }

    };


    return {
        init: function() {
            _initInstances();
        }
    };
}();

var AnimationScrollPage = function() {
    var _initInstances = function() {

        var anchor = $('[data-animation]');
        if ($(window).width() > 992) {



            /* anchor.waypoint(function (direction) {
                 var el = $(this.element);
                 var animationName = el.data('animation');
                 var animationDuration = el.data('animation-duration');
                 var animationDelay = el.data('animation-delay');

                 el.css('opacity', 1);
                 if (animationDuration) {

                     el.css({
                         "-webkit-animation-duration": animationDuration + "s",
                         "animation-duration": animationDuration + "s"
                     });
                 }

                 if (animationDelay) {

                     el.css({
                         "-webkit-animation-delay": animationDelay + "s",
                         "animation-delay": animationDelay + "s"
                     });
                 }

                 el.addClass('animated ' + animationName);
             }, {
                 offset: '90%',
                 triggerOnce: true
             });*/
        }

    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var CountTo = function() {
    var _initInstances = function() {
        var el = $('.vk-countto');
        el.waypoint({
            handler: function(direction) {
                $(this.element).countTo({
                    refreshInterval: 50,
                    formatter: function(value, options) {
                        return numeral(value).format('0,0');
                    }
                });
            },
            offset: '100%',
            triggerOnce: true,
        });
    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var ParallaxBackground = function() {
    var _initInstances = function() {
        $('.vk-parallax').attr('data-stellar-background-ratio', '0.3');
        $.stellar({
            verticalOffset: 0,
            horizontalScrolling: false,
        });
    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var Slider = function() {

    var _initInstances = function() {


        var slider = $('[data-slider]');
        slider.addClass('vk-slider');


        $('[data-slider="slider-nav"]').slick({

            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: false,
            autoplaySpeed: 4000,
            // swipeToSlide:true,
            infinite: false,
            speed: 600,

            dots: false,
            arrows: true,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',
        });

        $('[data-slider="banner"]').slick({
            slidesToShow: 1,
            fade: true,
            autoplay: false,
            autoplaySpeed: 4000,
            infinite: true,
            pauseOnHover: false,
            speed: 600,

            dots: false,
            arrows: true,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: false,
                }

            }, {

                breakpoint: 768,
                settings: {
                    arrows: false,
                }

            }, {

                breakpoint: 576,
                settings: {
                    arrows: false,
                }

            }]
        });

        if ($(window).width() < 768) {
            $('[data-slider="home-how"]').slick({
                slidesToShow: 3,
                // fade: true,
                autoplay: false,
                autoplaySpeed: 4000,
                infinite: true,
                pauseOnHover: false,
                speed: 600,

                dots: false,
                arrows: true,
                prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
                nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

                responsive: [{

                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }

                }, {

                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    }

                }]
            });
        }


        $('[data-slider="banner-sale"]').slick({
            slidesToShow: 1,
            fade: true,
            autoplay: false,
            autoplaySpeed: 4000,
            infinite: true,
            pauseOnHover: false,
            speed: 600,

            dots: true,
            arrows: false,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: false,
                }

            }, {

                breakpoint: 768,
                settings: {
                    arrows: false,
                }

            }, {

                breakpoint: 576,
                settings: {
                    arrows: false,
                }

            }]
        });

        $('[data-slider="review"]').slick({
            slidesToShow: 1,
            fade: false,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            pauseOnHover: false,
            speed: 600,

            dots: true,
            arrows: false,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: false,
                }

            }, {

                breakpoint: 768,
                settings: {
                    arrows: false,
                }

            }, {

                breakpoint: 576,
                settings: {
                    arrows: false,
                }

            }]
        });


        $('[data-slider="relate"]').slick({
            slidesToShow: 4,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: true,
            speed: 600,

            dots: false,
            arrows: true,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }

            }]
        })

        $('[data-slider="blog"]').slick({
            slidesToShow: 3,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: true,
            speed: 600,

            dots: false,
            arrows: false,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }

            }]
        })

        $('[data-slider="blog-home"]').slick({
            slidesToShow: 3,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: false,
            speed: 500,
            rows: 1,

            dots: false,
            arrows: false,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    rows: 3,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    rows: 3,
                }

            }]
        })



        $('[data-slider="association"]').slick({
            slidesToShow: 5,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: false,
            speed: 600,
            rows: 2,

            dots: false,
            arrows: false,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                    rows: 3,
                }

            }]
        })

        $('[data-slider="brand"]').slick({
            slidesToShow: 6,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: false,
            speed: 600,

            dots: false,
            arrows: false,
            prevArrow: '<button class="vk-slider__arrow _prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><i class="fa fa-angle-right"></i></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                    rows: 2,
                }

            }]
        })


        $('[data-slider="blog-main"]').slick({
            slidesToShow: 2,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: true,
            speed: 700,

            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="vk-slider__arrow _prev"><img src="' + asset() + '/images/arrow-2.png" alt=""></button>',
            nextArrow: '<button type="button" class="vk-slider__arrow _next"><img src="' + asset() + '/images/arrow-2-1.png" alt=""></button>',

            responsive: [{
                    breakpoint: 992,
                    settings: {
                        dots: true,
                    }

                },

                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                    }

                }
            ]
        })
        $('[data-slider="home-tour-1"]').slick({
            slidesToShow: 3,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: true,
            speed: 700,

            rows: 1,
            centerMode: true,
            centerPadding: 0,
            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="vk-slider__arrow _prev"><img src="' + asset() + '/images/arrow-2.png" alt=""></button>',
            nextArrow: '<button type="button" class="vk-slider__arrow _next"><img src="' + asset() + '/images/arrow-2-1.png" alt=""></button>',

            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                    }

                }, {

                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        rows: 2,
                    }

                }

            ]
        });
        $('[data-slider="home-tour"]').slick({
            slidesToShow: 3,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: true,
            speed: 400,

            rows: 1,
            centerMode: true,
            centerPadding: 0,
            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="vk-slider__arrow _prev"><img src="' + asset() + '/images/arrow-2.png" alt=""></button>',
            nextArrow: '<button class="vk-slider__arrow _next"><img src="' + asset() + '/images/arrow-2-1.png" alt=""></button>',

            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                    }

                }, {

                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }

                }, {

                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    }

                }

            ]
        });
        $('[data-slider="tour-detail"]').slick({
            slidesToShow: 3,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: true,
            speed: 600,
            rows: 1,
            dots: false,
            arrows: true,

            prevArrow: '<button type="button" type="button" class="vk-slider__arrow _prev"><img src="' + asset() + '/images/arrow-1.png" alt=""></button>',
            nextArrow: '<button type="button" class="vk-slider__arrow _next"><img src="' + asset() + '/images/arrow-1-1.png" alt=""></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    rows: 1,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    rows: 4,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    rows: 4,
                }

            }]
        });

        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            adaptiveHeight: true,
            asNavFor: '.slider-nav',
            prevArrow: '<button type="button" class="vk-slider__arrow _prev"><img src="' + asset() + '/images/arrow-2.png" alt=""></button>',
            nextArrow: '<button type="button" class="vk-slider__arrow _next"><img src="' + asset() + '/images/arrow-2-1.png" alt=""></button>',
        });


        $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            // centerMode: true,
            focusOnSelect: true,
            arrows: false,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 2,

                }

            }]
        });


        $('[data-slider="tour"]').slick({
            slidesToShow: 3,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: false,
            speed: 600,
            touchThreshold: 40,


            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="vk-slider__arrow _prev"><img src="' + asset() + '/images/arrow-1.png" alt=""></button>',
            nextArrow: '<button type="button" class="vk-slider__arrow _next"><img src="' + asset() + '/images/arrow-1-1.png" alt=""></button>',

            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    rows: 4,
                }

            }]
        })

        $('[data-slider="tour-des"]').slick({
            slidesToShow: 3,
            autoplay: false,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            infinite: true,
            speed: 600,


            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="vk-slider__arrow _prev"><img src="' + asset() + '/images/arrow-1.png" alt=""></button>',
            nextArrow: '<button type="button" class="vk-slider__arrow _next"><img src="' + asset() + '/images/arrow-1-1.png" alt=""></button>',


            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }

            }]
        })



    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var MasonryItem = function() {
    var masonry = '[data-layout="masonry"]';
    var masonryItem = '[data-layout="masonry-item"]'
    var masonryFix = '[data-layout="masonry-fix"]';

    var buttonFilterDefault = '[data-filter-button="default"]';
    var buttonFilterFix = '[data-filter-button="filter-fix"]';

    var filterFix = function() {

        var delayFilter = function() {
            $(masonryFix).isotope({
                filter: '.first',
            })
        }

        setTimeout(delayFilter, 100);
        $(buttonFilterFix)

        .on('click', 'li', function() {
                var filterValue = $(this).attr('data-filter');
                $(masonryFix).isotope({
                    filter: filterValue,
                });

                return false;
            })
            .on('change', function() {

                // get filter value from option value
                var filterValue = this.value;
                $(masonryFix).isotope({
                    filter: filterValue,

                });

                return false;
            });


    }

    var masonryLayout = function() {
        $(masonry).isotope({
            // options...
            itemSelector: masonryItem,
            masonry: {
                columnWidth: masonryItem,
            }
        });

        //filter items on button click
        $(buttonFilterDefault)
            .on('click', 'li', function() {
                var filterValue = $(this).attr('data-filter');
                console.log(filterValue);
                $(masonry).isotope({
                    filter: filterValue,

                });

                return false;
            })
            .on('change', function() {
                // get filter value from option value
                var filterValue = this.value;
                // console.log(filterValue);
                $(masonry).isotope({
                    filter: filterValue,

                });

                return false;
            });
    };

    var _initInstances = function() {
        masonryLayout();
        filterFix();

    };

    return {
        init: function() {
            _initInstances();
        },

        responsive: function() {

        }
    };
}();

var ScrollToTop = function() {

    var _initInstances = function() {

        $.scrollUp({
            scrollText: '<span class="_text">' + backToTop() + '</span> <i class="_icon ti-arrow-down"></i>',
            scrollSpeed: 500,
            zIndex: 1,

        });

        $('[data-scroll-to^="#"]').on('click', function(event) {

            event.preventDefault();
            var offset = $(this).data('scroll-offset');

            var target = $(this.getAttribute('data-scroll-to'));
            var elsSiblings = $(this).closest('.vk-menu__nav').find("a");
            elsSiblings.removeClass('active');
            $(this).addClass('active');

            offset = parseFloat(offset);

            console.log(target.length);

            if (target.length) {


                $('html, body').stop().animate({
                    scrollTop: target.offset().top - offset

                }, 1000);
            }


        });

    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var PriceRange = function() {

    var _initInstances = function() {
        var slider_range = $('#slider-range');

        if (slider_range.length) {

            var min = slider_range.data('min');
            var max = slider_range.data('max');

            var amount1 = slider_range.siblings('#amount1');
            var amount2 = slider_range.siblings('#amount2');

            var text_amount1 = slider_range.siblings('.vk-range__show').find('#text_amount1');
            var text_amount2 = slider_range.siblings('.vk-range__show').find('#text_amount2');

            slider_range.slider({
                range: true,
                min: min,
                max: max,
                values: [min + max * .1, max - max * .1],
                slide: function(event, ui) {
                    amount1.val(ui.values[0]);
                    amount2.val(ui.values[1]);

                    //value
                    text_amount1.text(numeral(ui.values[0]).format('0,0'));
                    text_amount2.text(numeral(ui.values[1]).format('0,0'));
                }
            });

            //value
            amount1.val(slider_range.slider("values", 0));
            amount2.val(slider_range.slider("values", 1));
            //text
            text_amount1.text(numeral(slider_range.slider("values", 0)).format('0,0'));
            text_amount2.text(numeral(slider_range.slider("values", 1)).format('0,0'));

        }


    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var CalcQuantity = function() {
    var _initInstances = function() {

        var calculatorDefault = function() {
            $("[data-calculator] ._btn").on("click", function() {

                var $button = $(this);
                var oldValue = $button.siblings("input").val();
                var newVal = 0;

                if ($button.attr('data-index') === "plus") {

                    var newVal = parseFloat(oldValue) + 1;

                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 1) {
                        newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }

                $button.siblings("input").val(newVal);

                return false;
            });
        }();

        var calculatorSync = function() {
            function handleClick() {
                $("[data-calculator-cart] .vk-btn").on("click", function() {

                    var button = $(this);
                    var parent = button.closest('tr');
                    var oldValue = button.siblings("input").val();
                    var newVal;

                    if (button.attr('data-index') === "plus") {

                        if (oldValue > 0) {
                            newVal = parseFloat(oldValue) + 1;
                        } else {
                            newVal = 1;
                        }

                    } else {
                        // Don't allow decrementing below zero
                        if (oldValue > 1) {
                            newVal = parseFloat(oldValue) - 1;
                        } else {
                            newVal = 1;
                        }
                    }

                    button.siblings("input").val(newVal);

                    //cal sync

                    calTotal(parent, newVal);

                    return false;
                });
            }

            function handChange() {
                $('.vk-calculator input').on('keyup', function(e) {
                    var keyCode = e.keyCode;

                    var parent = $(this).closest('tr');
                    var newVal = $(this).val();

                    if (newVal.length === 0) {
                        $(this).val(0);
                    }
                    calTotal(parent, newVal);
                    if (keyCode === 8) {
                        calTotal(parent, newVal);
                    }

                    if (keyCode === 43 || keyCode === 45) {
                        return false;
                    }
                })
            }

            function init() {
                var rowDataFirst = $('.vk-table--cart tbody tr:first');

                if (rowDataFirst.length) {
                    var newVal = rowDataFirst.find('.vk-calculator input').val();
                    newVal = parseFloat(newVal);

                    calTotal(rowDataFirst, newVal);
                }
            }

            function calTotal(parent, newVal) {
                var price = parent.find('.vk-shopcart-item__price').data('price');
                var priceTotal = parent.find('.vk-shopcart-item__price--total');
                // console.log(price);

                var result = price * newVal;


                var resultPrime = result;

                parent.siblings().each(function() {
                    var priceSibling = $(this).find('.vk-shopcart-item__price').data('price');
                    var quantitySibling = $(this).find('.vk-calculator input').val();
                    // console.log(priceSibling);

                    priceSibling = parseFloat(priceSibling);
                    quantitySibling = parseFloat(quantitySibling);

                    resultPrime += priceSibling * quantitySibling;


                });

                priceTotal.text(numeral(result).format('0,0'));
                $('#shopcartPriceTotal').text(numeral(resultPrime).format('0,0'))


            }

            function cartRowDataDevare() {
                $('.vk-shopcart-item__btn-del').on('click', function(e) {
                    e.preventDefault();

                    var parent = $(this).closest('tr');
                    calTotal(parent, 0)
                    parent.remove();

                    return false;
                })
            };

            function run() {
                init();
                handleClick();
                handChange();
                cartRowDataDevare();
            }

            run();

        }();

    };

    return {
        init: function() {
            _initInstances();
        }
    };
}();

var CustomTheme = function() {

    var _initInstances = function() {

        $(document).on('show.bs.modal', '.modal', function() {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });

        var ajaxReviews = function() {
            /*$(window).on('hashchange', function() {

                if (window.location.hash) {

                    var page = window.location.hash.replace('#', '');

                    if (page == Number.NaN || page <= 0) {
                        return false;
                    }else{
                        getData(page);
                    }
                }
            });*/


            $(document).on('click', '.pagination a', function(event) {
                event.preventDefault();

                $('li').removeClass('active');

                $(this).parent('li').addClass('active');

                var myurl = $(this).attr('href');

                var page = $(this).attr('href').split('page=')[1];

                getData(page);

            });

            function getData(page) {

                $.ajax({
                    url: '?page=' + page,
                    type: "get",
                    data: { type: 'reviews' },
                    success: function(data) {

                        $("#reviewList").html(data);
                        /* location.hash = page;*/

                        $('html, body').stop().animate({
                            scrollTop: $("#reviewList").offset().top - 140

                        }, 1000);
                    }
                });


            }
        }();


        var megaMenu = function() {
            $("._destination,.vk-menu__mega").hover(function() {
                $(this).addClass("active"), $(this).hasClass("_destination") ? $('[data-parent="#' + $(this).attr("id") + '"]').addClass("active") : $($(this).data("parent")).addClass("active"), $("body").addClass("megaMenuActive")
            }, function() {
                $(this).removeClass("active"), $(this).hasClass("_destination") ? $('[data-parent="#' + $(this).attr("id") + '"]').removeClass("active") : $($(this).data("parent")).removeClass("active"), $("body").removeClass("megaMenuActive")
            }).on('click', function(e) {
                if ($(e.target).hasClass('vk-menu__mega')) {
                    $(this).removeClass("active");
                }
            });
            $(window).scroll(function(t) {
                150 < (window.pageYOffset || document.documentElement.scrollTop) && ($("body").removeClass("megaMenuActive"), $("._destination").removeClass("active"))
            })
        }();

        var activeScroll = function() {

            var topMenu = $("#top-menu"),
                topMenuHeight = topMenu.outerHeight() + 30,
                // All list items
                menuItems = topMenu.find("a"),
                // Anchors corresponding to menu items
                scrollItems = menuItems.map(function() {
                    var item = $($(this).attr("href"));
                    if (item.length) {
                        return item;
                    }
                });


            $(window).scroll(function() {
                // Get container scroll position
                var fromTop = $(this).scrollTop() + topMenuHeight;

                // Get id of current scroll item
                var cur = scrollItems.map(function() {
                    if ($(this).offset().top < fromTop)
                        return this;
                });
                // Get the id of the current element
                cur = cur[cur.length - 1];
                var id = cur && cur.length ? cur[0].id : "";
                // Set/remove active class
                menuItems
                    .siblings().removeClass("active")
                    .end().filter("[href='#" + id + "']").addClass("active");
            })

        }();


        var shopItem = function() {
            var els = $('.vk-shop-item--style-4');
            els.hover(function() {
                var content = $(this).find('.collapse');
                content.slideDown("fast");

            }, function() {

                var content = $(this).find('.collapse');

                content.slideUp("fast");

            })
        }();

        var dropdown = function() {

            var dropdownStyle1 = $('[data-layout="dropdown"]');

            var dropdownStyle4 = $('[data-layout="dropdown--style-4"]');

            var dropdownStyle2 = $('[data-layout="dropdown-style-2"]').find('._current');

            var dropdownStyle3 = $('[data-layout="dropdown-style-3"]').find('._current');


            $(window).click(function() {
                $('.vk-dropdown').find('._list').collapse('hide');
            });

            $('.vk-dropdown').click(function(event) {
                event.stopPropagation();
            });

            dropdownStyle1.each(function() {
                var text = $(this).find('._list a.active ._content').text();
                var _current = $(this).find('._current ._text');
                // console.log(text);
                _current.text(text)
            });


            dropdownStyle1.on('click', function(e) {
                var _this = $(this);
                var parent = _this.closest('.vk-dropdown');
                var text = _this.find('._text');
                var list = _this.find('._list');
                var item = _this.find('a');
                var input = list.find('input');

                list.on('hide.bs.collapse', function() {
                    parent.removeClass('active')
                });

                list.on('show.bs.collapse', function() {
                    parent.addClass('active')
                });

                list.collapse('toggle');


                item.on('click', function(e) {
                    var target = $(this).find('._content').html();
                    item.removeClass('active');
                    text.html(target);
                    $(this).addClass('active');
                    input.val($(this).data('value'));
                });

            });

            dropdownStyle2.on('click', function(e) {

                var _this = $(this);
                var parent = _this.closest('[data-layout="dropdown-style-2"]');
                var text = parent.find('._text');
                var list = parent.find('._list');
                var input = list.find('input');
                var data = [];
                var temp;
                var placeholder = parent.data('placeholder');


                list.on('hide.bs.collapse', function() {
                    parent.removeClass('active')
                });

                list.on('show.bs.collapse', function() {
                    parent.addClass('active')
                });

                list.collapse('toggle');

                list.find('.active').each(function() {
                    data.push($(this).text());
                })

                list.on('click', 'a', function(e) {

                    var _thisInner = $(this);
                    var _thisText = _thisInner.text();
                    var listParent = _thisInner.closest('._list');
                    var result;
                    var value = [];


                    // $(this).toggleClass('active');


                    if (_thisInner.hasClass('active')) {
                        data.push(_thisText);

                    } else {
                        temp = data.indexOf(_thisText);

                        if (temp !== -1) {
                            data.splice(temp, 1);
                        }
                    }

                    result = placeholder;
                    if (data.length) {
                        result = data.join(', ');
                    }

                    text.text(result);
                    text.attr('title', result);

                    listParent.find('a.active').each(function(i) {
                        value[i] = $(this).data('value');
                    })

                    input.val(value.join(','));

                });

            });

            window.itemDropdownSelect = function(el) {

                var _this = $(el);
                var parent = _this.closest('[data-layout="dropdown-style-3"]');
                var text = parent.find('._text');
                var list = parent.find('._list');
                var input = list.find('input');
                var placeholder = parent.data('placeholder');

                var data = [];
                var temp;

                _this.toggleClass('active');

            }

            dropdownStyle3.on('click', function(e) {

                var _this = $(this);
                var parent = _this.closest('[data-layout="dropdown-style-3"]');
                var text = parent.find('._text');
                var list = parent.find('._list');
                var input = list.find('input');
                var placeholder = parent.data('placeholder');

                var data = [];
                var temp;

                list.on('hide.bs.collapse', function() {
                    parent.removeClass('active')
                });

                list.on('show.bs.collapse', function() {
                    parent.addClass('active')
                });

                list.collapse('toggle');

                list.find('.active').each(function() {
                    data.push($(this).text());
                })

                list.on('click', 'a', function(e) {

                    var _thisInner = $(this);
                    var _thisText = _thisInner.text();
                    var listParent = _thisInner.closest('._list');
                    var result;
                    var value = [];

                    // $(this).toggleClass('active');



                    if (_thisInner.hasClass('active')) {
                        data.push(_thisText);

                    } else {
                        temp = data.indexOf(_thisText);

                        if (temp !== -1) {
                            data.splice(temp, 1);
                        }
                    }
                    result = placeholder;
                    if (data.length) {
                        result = data.join(', ');
                    }


                    text.text(result);
                    text.attr('title', result);

                    listParent.find('a.active').each(function(i) {
                        value[i] = $(this).data('value');
                    })

                    input.val(value.join(','));

                });

            });

            dropdownStyle4.on('click', function(e) {
                var _this = $(this);
                var parent = _this.closest('.vk-dropdown');
                var text = _this.find('._text');
                var list = _this.find('._list');
                var item = _this.find('a');
                var input = list.find('input');

                list.on('hide.bs.collapse', function() {
                    parent.removeClass('active')
                });

                list.on('show.bs.collapse', function() {
                    parent.addClass('active')
                });

                list.collapse('toggle');


                item.on('click', function(e) {
                    var target = $(this).find('._content').html();
                    item.removeClass('active');
                    text.html(target);
                    $(this).addClass('active');
                    input.val($(this).data('value'));
                });



            });

        }();

        var activeList = function() {

            var activeListEl = $('[data-list="active"]');

            var activeListLoad = function() {

                activeListEl.each(function() {
                    var el = $(this);
                    var activeItem = el.find('.active');
                    var data = activeItem.data('value');
                    var input = el.closest('[data-list="active"]').siblings('input').first();

                    if (activeItem.length) {
                        input.val(data);
                    } else {
                        input.val(0);
                    }
                })


            }();

            var activeListHandle = function() {
                activeListEl.on('click', 'li', function(e) {
                    e.preventDefault();
                    var el = $(this);
                    var parent = el.closest('[data-list="active"]').siblings('input').first();
                    var data = el.data('value');

                    el.siblings().removeClass('active');
                    el.toggleClass('active');
                    // console.log(parent);

                    if (el.hasClass('active')) {
                        parent.val(data)
                    } else {
                        parent.val(0);
                    }

                    return false;
                })
            }();


        }();

        var aTagNullClick = function() {

            $('a').on("click", function(e) {
                if ($(this).attr('href') === undefined) {
                    e.preventDefault();
                    return false;
                }
            });

        }();

    }

    return {
        init: function() {
            _initInstances();
        }
    };
}();

function buttonSlideUp(el, ev, target) {
    ev.preventDefault();
    el = $(el);
    target = $(target);
    var parent = el.closest('.vk-button');

    var progress = $('#progress');
    progress.css('width', '75%');

    parent.collapse('hide');
    target.collapse('show');
}

function buttonBack(el, ev, elHide, elShow) {
    ev.preventDefault();
    el = $(el);
    elHide = $(elHide);
    elShow = $(elShow);
    var progress = $('#progress');

    progress.css('width', '25%');
    elHide.collapse('hide');
    elShow.collapse('show');

}

function menuToggle(el, ev) {
    ev.preventDefault();

    el = $(el);
    var target = $(el.attr('href'));
    var body = $('body');

    body.toggleClass('scroll-disable');
    el.toggleClass('active');
    target.toggleClass('active');
}

function filterShow(el, ev) {
    ev.preventDefault();
    el = $(el);
    var parent = el.closest('.vk-shop__top');
    var text = el.find('._text');

    parent.toggleClass('hide');

    if (parent.hasClass('hide')) {
        text.text('Show filter')
    } else {
        text.text('Hide filter')
    }

}

function goToTourForm(el, ev) {
    // ev.preventDefault();
    el = $(el);
    var target = $(el.data('scroll-to'));
    var parent = el.closest('.vk-tour-detail__price')
    var buttonTarget = target.find('#tourFormBtnMobile');
    var inputFirst = target.find('input').first();

    parent.addClass("hide");
    buttonTarget.trigger('click');
    setTimeout(function() {
        inputFirst.focus();
    }, 1000);
}

function captchaChange(el, url) {

    $.ajax({
        type: "get",
        url: url,
        success: function($data) {
            $(el).closest('.form-group').find('img').attr('src', $data);
        }
    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var username = getCookie(cname);
    if (username != "") {
        return true
    }
    return false;
}


document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("[data-animation]"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {

                    var el = $(entry.target);
                    var animationName = el.data('animation');
                    var animationDuration = el.data('animation-duration');
                    var animationDelay = el.data('animation-delay');

                    el.css('opacity', 1);
                    if (animationDuration) {

                        el.css({
                            "-webkit-animation-duration": animationDuration + "s",
                            "animation-duration": animationDuration + "s"
                        });
                    }

                    if (animationDelay) {

                        el.css({
                            "-webkit-animation-delay": animationDelay + "s",
                            "animation-delay": animationDelay + "s"
                        });
                    }

                    el.addClass('animated ' + animationName);

                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Possibly fall back to a more compatible method here
    }
});