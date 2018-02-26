/* Theme Name: Ablogia - Responsive HTML5 Blog Template
   Author: Themeswale
   Version: 1.0.0
   Created: Aug 2017
   File Description:Main JS file of the template
*/


(function ($) {

    'use strict';

    function initNavbar() {

        var scroll = $(window).scrollTop();

        $('.navbar-toggle').on('click', function (event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('.navigation-menu>li').slice(-2).addClass('last-elements');

        $('.menu-arrow,.submenu-arrow').on('click', function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });
    }

    function initNavitemActive() {
        $(".navigation-menu a").each(function () {
            if (this.href == window.location.href) {
                $(this).parent().addClass("active"); // add active to li of the current link
                $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().parent().parent().addClass("active"); // add active class to an anchor
            }
        });
    }


    function init() {
        initNavbar();
        initNavitemActive();
    }

    init();

})(jQuery)
