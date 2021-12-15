function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function() {
        var obj = this;
        obj.dd.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
        });
        obj.opts.on('click', function() {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            opt.siblings().removeClass('selected');
            opt.filter(':contains("' + obj.val + '")').addClass('selected');
        }).change();
    },
    getValue: function() {
        return this.val;
    },
    getIndex: function() {
        return this.index;
    }
};

$(function() {
    // create new variable for each menu
    var dd1 = new DropDown($('#noble-gases'));
    // var dd2 = new DropDown($('#other-gases'));
    $(document).click(function() {
        // close menu on document click
        $('.wrap-drop').removeClass('active');
    });
});
var btn = $('#button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').scrollTop({ scrollTop: 0 }, '300');
});



$(document).keydown(function(e) {
    switch (e.which) {
        case 37: // left
            moveToSelected('prev');
            break;

        case 39: // right
            moveToSelected('next');
            break;

        default:
            return;
    }
    e.preventDefault();
});

jQuery(document).ready(function($) {
    $('.sales').slick({
        centerMode: true,
        centerPadding: '200px',
        slidesToShow: 3,

        responsive: [{
                breakpoint: 992,
                settings: {
                    centerPadding: '50px',
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-review').slick({
        prevArrow: false,
        nextArrow: false,
        dots: true,
        centerPadding: '200px',
        slidesToShow: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }

            }

        ]
    });
    $('.tour-index').slick({
        slidesToShow: 3,
        autoplay: false,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        infinite: true,
        speed: 400,

        rows: 1,
        centerMode: true,
        // centerPadding: 0,
        dots: false,
        arrows: true,

        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }

            }, {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }

            }

        ]
    });
    $('.des-banner-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // fade: true,
        asNavFor: '.des-banner-nav'
    });
    $('.des-banner-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.des-banner-for',
        // dots: true,
        // centerMode: true,
        focusOnSelect: true,

    });
    $(".card-vn").click(function() {
        $(".card-vn.color696969").css("color", "#515151;")
            // $(".card-vn.collapsed.color696969").css("color", "#f7b92d");
    });
    // $('#continueinque').click(function() {
    //     $('#informationinque').css("display", "block;");
    // });

    $("#continueinque").click(function() {

        var lable = $("#continueinque").text().trim();

        if (lable == "Hide") {
            $("#continueinque").css("display", "bock");
            $("#informationinque").hide();
        } else {
            $("#continueinque").css("transition", "all .5s ease");
            $("#informationinque").css("transition", "all .5s ease");
            $("#continueinque").hide();
            $("#informationinque").show();
            $("#informationinque").fadeToggle("slow");
        }

    });



});

//$('#datetimepicker1').datepicker("setDate ", new Date());

function up(max) {
    document.getElementById("myNumber ").value = parseInt(document.getElementById("myNumber ").value) + 1;
    if (document.getElementById("myNumber ").value >= parseInt(max)) {
        document.getElementById("myNumber ").value = max;
    }
}

function down(min) {
    document.getElementById("myNumber ").value = parseInt(document.getElementById("myNumber ").value) - 1;
    if (document.getElementById("myNumber ").value <= parseInt(min)) {
        document.getElementById("myNumber ").value = min;
    }
}