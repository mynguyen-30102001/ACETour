	$(function() {
	    $('.toggle-menu').click(function() {
	        $('.exo-menu').toggleClass('display');

	    });

	});
	$('.menu').on('click', '.search-toggle', function(e) {
	    var selector = $(this).data('selector');

	    $(selector).toggleClass('show').find('.search-header').focus();
	    $(this).toggleClass('active');

	    e.preventDefault();
	});
	$(window).scroll(function() {
	    if ($(this).scrollTop() > 90) {
	        $("#masthead").addClass("sticky1");
	        $(".dropdown-language").css({ "display": "none" });
	        $(".inque-now").css({ "padding": "10px 40px" });
	        $(".logo-bb").css({ "width": "95px", "transition": ".3 ease-in-out" });
	        $("dropdown-menu").css({ "display": "none" })

	    } else {
	        $("#masthead").removeClass("sticky1");
	    }
	});
	$('li.dropdown').on('click', function() {
	    var $el = $(this);
	    if ($el.hasClass('open')) {
	        var $a = $el.children('a.dropdown-toggle');
	        if ($a.length && $a.attr('href')) {
	            location.href = $a.attr('href');
	        }
	    }
	});
	// $(".btn-search").click(function() {

	//     var lable = $(".btn-search").text().trim();

	//     if (lable == "show") {
	//         // $(".btn-search").innerHTML("<i class='fas fa-search'></i>");
	//         $(".form-search").hide();
	//     } else {
	//         // $(".btn-search").text("Hide");
	//         $(".form-search").show();
	//     }

	// });

	$(window).scroll(function() {
	    if ($(this).scrollTop() > 700) {
	        $(".nav-detailtour").addClass("sticky");
	        $("section").removeClass(".sticky1");

	    } else {
	        $(".nav-detailtour").removeClass("sticky");
	        // $("section").removeClass(".sticky1");

	    }
	});
	// $(window).scroll(function() {
	//     if ($(this).scrollTop() > 1200) {
	//         $(".fixed-book-thistour").addClass("sticky");

	//     } else {
	//         $(".fixed-book-thistour").removeClass("sticky");
	//         $(".fixed-book-thistour").removeClass("#masthead");
	//     }
	// });

	// $(window).scroll(function() {

	//         if ($(this).scrollTop() > 90) {
	//             $("dropdown-menu").css({ "display": "none" });
	//         }

	//     )
	// };