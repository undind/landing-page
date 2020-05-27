$(document).ready(function () {
    var hamburgerMenu = $('#navbar-responsive');
    var hamburgerButton = $('#navbar-button');

    function showMenu() {
        hamburgerMenu.addClass('fadeIn');
        hamburgerButton.addClass('show');
        document.body.classList.add('open');
    }

    function hideMenu() {
        hamburgerMenu.removeClass('fadeIn');
        hamburgerButton.removeClass('show');
    }

    function timeOut() {
        hamburgerMenu.addClass('fadeOut');
        hamburgerButton.removeClass('show');

        setTimeout(() => {
            hideMenu();
            hamburgerMenu.removeClass('fadeOut');
        }, 400);
    }

    $(hamburgerButton).on('click', function (e) {
        e.preventDefault();

        if (hamburgerButton.hasClass('show')) {
            timeOut();
        } else {
            showMenu();
        }
    });

    $(document).keyup(function (e) {
        if (e.key === 'Escape' && hamburgerButton.hasClass('show')) {
            timeOut();
        }
    });
});
