$(document).ready(function () {
    var hamburgerMenu = $('#navbar-responsive');
    var hamburgerButton = $('#navbar-button');
    var navbarBackdrop = $('.navbar-backdrop');
    var navbarClose = $('.navbar-toggler-close');

    function showMenu() {
        hamburgerMenu.addClass('fadeIn');
        hamburgerButton.addClass('show');
        navbarBackdrop.removeClass('hidden');
        navbarClose.removeClass('hidden');
        $('body').addClass('open');
    }

    function hideMenu() {
        hamburgerMenu.removeClass('fadeIn');
        hamburgerButton.removeClass('show');
        navbarBackdrop.addClass('hidden');
        $('body').removeClass('open');
    }

    function timeOut() {
        hamburgerMenu.addClass('fadeOut');

        setTimeout(() => {
            hideMenu();
            hamburgerMenu.removeClass('fadeOut');
            navbarClose.addClass('hidden');
        }, 400);
    }

    $(hamburgerButton).on('click', function (e) {
        e.preventDefault();
        showMenu();
    });

    $(navbarClose).on('click', function () {
        timeOut();
    });

    $(document).on('click', function (e) {
        if (e.target.classList.contains('navbar-backdrop')) {
            timeOut();
        }
    });

    $(document).keyup(function (e) {
        if (e.key === 'Escape' && hamburgerButton.hasClass('show')) {
            timeOut();
        }
    });

    //Dropdown navbar
    var $dropdown = $('.dropdown-hovered');
    var $dropdownToggle = $('#dropdow-main-toggle');
    var $dropdownMenu = $('#dropdown-main-menu');
    var showClass = 'show';

    $(window).on('load resize', function () {
        if (this.matchMedia('(min-width: 992px)').matches) {
            $dropdown.hover(
                function () {
                    var $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr('aria-expanded', 'true');
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    var $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr('aria-expanded', 'false');
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        }
    });
});
