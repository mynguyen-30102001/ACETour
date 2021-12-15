(new IntersectionObserver(function (e, o) {
    if (e[0].intersectionRatio > 0) {
        document.documentElement.removeAttribute('class');
    } else {
        document.documentElement.setAttribute('class', 'stuck');
    };
})).observe(document.querySelector('.trigger'));

$('#gallery').owlCarousel({
    loop: true,
    margin: 5,
    nav: true,
    navText: [
        "<i class='fas fa-arrow-circle-right'></i>",
        "<i class='fas fa-arrow-circle-left'></i>"
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 5
        }
    }
})

$('#person').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 5
        }
    }
});

$('#person2').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplayHoverPause: true,
    navText: [
        "<i class='fas fa-arrow-circle-right'></i>",
        "<i class='fas fa-arrow-circle-left'></i>"
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 5
        }
    }
});

$('#cm').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        "<i class='fas fa-arrow-circle-right'></i>",
        "<i class='fas fa-arrow-circle-left'></i>"
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});
$('#nos1').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 5
        }
    }
})

$().ready(function () {
    if ($('#vietiso_sitebadgecontainer').length > 0) {
        $('#vietiso_sitebadgecontainer').hover(function () {
            $('#vietiso_sitebadgecontainer').stop().animate({ right: '0px' }, 500);
        }, function () { $('#vietiso_sitebadgecontainer').stop().animate({ right: '-137px' }, 500); });
        setMinHeight('group_col_2');
    }
}); function setMinHeight(class_name) {
    var min_height = 0; $('.' + class_name).each(function () { if ($(this).height() > min_height) min_height = $(this).height(); });
    if (min_height < 150) { min_height = 150; } $('.' + class_name).eq(1).css('height', min_height);
}

