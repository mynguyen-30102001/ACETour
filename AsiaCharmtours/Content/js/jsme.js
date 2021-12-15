$('.carousel').carousel();


$(function () {
    $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(this)
            .siblings()
            .toggleClass("show");

        if (
            !$(this)
                .next()
                .hasClass("show")
        ) {
            $(this)
                .parents(".dropdown-menu")
                .first()
                .find(".show")
                .removeClass("show");
        }
        $(this)
            .parents("li.nav-item.dropdown.show")
            .on("hidden.bs.dropdown", function (e) {
                $(".dropdown-submenu .show").removeClass("show");
            });
    });
});


$(document).ready(function () {

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});


