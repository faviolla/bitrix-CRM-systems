//= vendor/jquery-1.12.0.min.js
//= vendor/wow.js
//= vendor/validate.js
//= vendor/modal.js

$(document).ready(function () {
    openingMenu();
    menuItemsScroll();
    $(document).bind('mouseup touchend', function (e) {
        var container = $('.dropdown-menu'),
            button = $('.burger-menu');

        if(($(e.target).closest(button).length) || ($(e.target).closest(container).length)) {
            return;
        } else {
            $('.header').removeClass('opened');
            e.stopPropagation();
        }
    });
    initModal();
});



$(window).on('resize', function() {
    windowWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    if(windowWidth > 1359) {
        stickyMenu();
    } else {
        $('body').removeClass('scroll');
        return false;
    }
}).trigger('resize');

$(document).on('click', '.nav-list a[href^="#"]', function (e) {
    var target = $(this.getAttribute('href')),
        $menu = $('.nav-list');

    if(target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});

function menuItemsScroll () {
    var lastId,
        menuItems = $('.nav-list a'),
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if(item.length) {return item;}
        });

    $(window).scroll(function () {
        var fromTop = $(this).scrollTop();

        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop+10)
                return this;
        });

        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });
}

function stickyMenu() {
    var $promo = $('.promo').outerHeight() - 10;

    if ($(this).scrollTop() > $promo) {
        $('body').addClass('scroll');
    } else  {
        $('body').removeClass('scroll');
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > $promo) {
            $('body').addClass('scroll');
        } else  {
            $('body').removeClass('scroll');
        }
    });
}

function openingMenu() {
    $('.burger-menu').on('click', function () {
        if($(this).parents('.header').hasClass('opened')) {
            $(this).parents('.header').removeClass('opened');
        } else {
            $(this).parents('.header').addClass('opened');
        }
    })
}

var wow = new WOW(
    {
        boxClass:     'wow',
        animateClass: 'animated',
        offset:       0,
        mobile:       true,
        live:         true,
        callback:     function(box) {

        },
        scrollContainer: null
    }
);
wow.init();

/* modals */
function initModal() {
    var main_modal = $('#modal-main');

    // modal closing
    main_modal.on('hidden.bs.modal', function () {
    });

    // modal showing
    main_modal.on('show.bs.modal', function () {
        centerModal(main_modal);
    });

    // bg clicking
    $(document).on('click', '.modal-backdrop', function () {

    });

    $(document).on('click', '[data-openmodal]', function() {

        var link = $(this).data('openmodal');

        main_modal.find('.modal-dialog').load(link, function() {
            main_modal.modal('show');

            $('.form_validate').formValidation();
        })
    })
}

function centerModal(modalBox) {
    if (modalBox === undefined) {
        modalBox = $('#modal-main');
    }

    var wrapper = $('body'),
        modalDialog = modalBox.find('.modal-dialog'),
        widthMain = wrapper.outerWidth(),
        widthModal = modalDialog.find('.modal-body').outerWidth(),
        centerDistance = (widthMain - widthModal) / 2,
        centerVertical = ($(window).outerHeight() - modalDialog.outerHeight())/2;

    modalDialog.css('margin-left', centerDistance + 'px');

    if (centerVertical>0) {
        modalDialog.css('margin-top', centerVertical + 'px');
    } else {
        modalDialog.css('margin-top', '0');
    }

    $(window).resize(function() {
        var modalDialog = modalBox.find('.modal-dialog'),
            widthMain = wrapper.outerWidth(),
            widthModal = modalDialog.find('.modal-body').outerWidth(),
            centerDistance = (widthMain - widthModal) / 2;

        modalDialog.css('margin-left', centerDistance + 'px');

    });
}

