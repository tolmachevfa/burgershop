//jQuery

// OnePageScroll

const display = $('.main');
const sections = $('.section');

let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const switchPagActiveClass = sectionEq => {
    $('.pagination__list-item').eq(sectionEq).addClass('pagination__list-item-active').siblings().removeClass('pagination__list-item-active');
}

const performTransition = sectionEq => {
    if (inScroll) return
    inScroll = true;
    const position = (sectionEq * -100) + '%';
    display.css({
        'transform': `translate(0, ${position})`,
        '-webkit-transform': `translate(0, ${position})`
    })
    sections.eq(sectionEq).addClass('active-section').siblings().removeClass('active-section');
    setTimeout(() => {
        inScroll = false;
        switchPagActiveClass(sectionEq);
    }, 750);
}

const defineSections = sections => {
    const activeSection = sections.filter('.active-section');
    return {
        activeSection: activeSection,
        nextSection: activeSection.next(),
        prevSection: activeSection.prev()
    }
}

const scrollToSection = direction => {
    const section = defineSections(sections)
    if (inScroll) return;
    if (direction === 'up' && section.nextSection.length) {
        performTransition(section.nextSection.index())
    }
    if (direction === 'down' && section.prevSection.length) {
        performTransition(section.prevSection.index())
    }
}

$('.wrapper').on({
    wheel: e => {
        const deltaY = e.originalEvent.deltaY;
        let direction = (deltaY > 0)
            ? 'up'
            : 'down'

        scrollToSection(direction);
        //const section = defineSections(sections);
        //const activeSection = sections.filter('.active-section');
        //const nextSection = activeSection.next();
        //const prevSection = activeSection.prev();
        //if (deltaY > 0 && section.nextSection.length) {
        //    performTransition(section.nextSection.index())
        //}
        //if (deltaY < 0 && section.prevSection.length) {
        //    performTransition(section.prevSection.index())
        //}
    },
    touchmove: e => (e.preventDefault())
});


$(document).on('keydown', e => {
    const section = defineSections(sections);
    if (inScroll) return
    switch (e.keyCode) {
        case 40:
            if (!section.nextSection.length) return;
            performTransition(section.nextSection.index());
            break;
        case 38:
            if (!section.prevSection.length) return;
            performTransition(section.prevSection.index());
            break;
    }
});

if (isMobile) {
    $(window).swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            console.log(direction);
            scrollToSection(direction);
        }
    })
}

$('[data-goto]').on('click touchstart', e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const sectionIndex = parseInt($this.attr('data-goto'));
    performTransition(sectionIndex);
});


//_hamburger-menu

$(function () {

    const hbrBtn = $('.hamburger-btn__item'),
        closeHbrBtn = $('.hamburger-btn__item--hide');
    let hiddenMenu = $('.hidden-menu'),
        active = 'hidden-menu--active';

    hbrBtn.click(function () {
        hiddenMenu.addClass(active);
    });

    closeHbrBtn.click(function () {
        hiddenMenu.removeClass(active);
    });

    $(document).keyup(function (e) {
        if (e.which == 27) {
            hiddenMenu.removeClass(active);
        }
    });

    $(document).mouseup(function (e) {
        if (!hiddenMenu.has(e.target).length) {
            hiddenMenu.removeClass(active);
        }
    })

});

//_reviews

$(document).ready(() => {

    $('.feeds__content-button--poli').on('click', e => {

        $('.feeds__content_active-feed--polina').addClass('feeds__content_active-feed--active')
    })

    $('.feeds__content-button--kons').on('click', e => {

        $('.feeds__content_active-feed--konstantin').addClass('feeds__content_active-feed--active')
    })

    $('.feeds__content-button--ekat').on('click', e => {

        $('.feeds__content_active-feed--ekaterina').addClass('feeds__content_active-feed--active')
    })

    $('.feeds__content-button--ivan').on('click', e => {

        $('.feeds__content_active-feed--ivan').addClass('feeds__content_active-feed--active')
    })

    $('.feeds__content-button--dmit').on('click', e => {

        $('.feeds__content_active-feed--dmitriy').addClass('feeds__content_active-feed--active')
    })

    $('.feeds__content-button--anas').on('click', e => {

        $('.feeds__content_active-feed--anastasia').addClass('feeds__content_active-feed--active')
    })

    $('.feeds__content-button--anat').on('click', e => {

        $('.feeds__content_active-feed--anatolii').addClass('feeds__content_active-feed--active')
    })

    $('.feeds__content-button--boro').on('click', e => {

        $('.feeds__content_active-feed--boroda').addClass('feeds__content_active-feed--active')
    })

    //close feeds

    let feedWrap = $('.feeds__content_active-feed-wrap');

    $('.feeds__content_active-feed_close').on('click', e => {

        $('.feeds__content_active-feed--active').removeClass('feeds__content_active-feed--active')
    })

    $(document).keyup(function (e) {
        if (e.which == 27) {
            $('.feeds__content_active-feed--active').removeClass('feeds__content_active-feed--active')
        }
    })

    $(document).mouseup(function (e) {
        if (!feedWrap.has(e.target).length) {
            $('.feeds__content_active-feed--active').removeClass('feeds__content_active-feed--active')
        }
    })
})

//_team-accordion

$(document).ready(() => {

    $('.team-accord__title').on('click', e => {
        let teamElem = $(e.currentTarget);

        teamElem.closest('.team-accord__item').toggleClass('team-accord__item-active').siblings().removeClass('team-accord__item-active');
    })

})

//_menu-accordion

$(document).ready(() => {

    $('.menu-accord__title').on('click', e => {
        let menuElem = $(e.currentTarget);

        menuElem.closest('.menu-accord__item').toggleClass('menu-accord__item-active').siblings().removeClass('menu-accord__item-active');
    })
})

//_slider

$(function () {

    var coloringDots = function (index) {
        $('.slider')
            .find('.slider__dot-item')
            .eq(index)
            .addClass('slider__dot-item--active')
            .siblings()
            .removeClass('slider__dot-item--active');
    }

    var generateDots = function () {
        $('.slide-box').each(function () {
            var dot = $('<li>', {
                attr: {
                    class: 'slider__dot-item'
                },
                html: ' <div class="slider__dot-circle"></div>'
            });

            $('.slider__dots').append(dot);
        })
    }

    generateDots();

    var moveSlide = function (container, slideNum) {
        var
            items = $('.slide-box', container),
            activeSlide = items.filter('.active-slide'),
            reqItem = items.eq(slideNum),
            reqIndex = reqItem.index(),
            list = container.find('.slide-wrapper'),
            duration = 500;

        if (reqItem.length) {
            items.animate({
                'left': -reqIndex * 100 + '%'
            }, duration, function () {
                activeSlide.removeClass('active-slide');
                reqItem.addClass('active-slide');
                coloringDots(slideNum);
            });
        }
    }


    $('.slider__arrow').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            container = $this.closest('.slider')
        items = $('.slide-box', container),
            activeSlide = items.filter('.active-slide'),
            nextItem = activeSlide.next(),
            prevItem = activeSlide.prev();

        if ($this.hasClass('slider__arrow-right')) {

            if (nextItem.length) {
                moveSlide(container, nextItem.index());
            } else {
                moveSlide(container, items.first().index());
            }

        } else {

            if (prevItem.length) {
                moveSlide(container, prevItem.index());
            } else {
                moveSlide(container, items.last().index());
            }
        }

    });

    $('body').on('click', '.slider__dot-item', function () {
        var $this = $(this),
            container = $this.closest('.slider'),
            index = $this.index();

        moveSlide(container, index);
        coloringDots(index);
    });
});

//_yandex.map

ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [59.94198466, 30.30102181],
        zoom: 12
    });

    var myPlacemark = new ymaps.Placemark([59.89613356, 30.42461800], {
        hintContent: 'Mr.Burger',
        balloonContent: 'Babushkinskaya',
    },
        {
            iconLayout: 'default#image',
            iconImageHref: '/2-Burgershop/img/map-marker.png',
            iconImageSize: [45, 63],
            iconImageOffset: [-3, -42]
        });

    myPlacemark2 = new ymaps.Placemark([59.90122777, 30.26585499], {
        hintContent: 'Mr.Burger2',
        balloonContent: 'DVA'
    },
        {
            iconLayout: 'default#image',
            iconImageHref: '/2-Burgershop/img/map-marker.png',
            iconImageSize: [45, 63],
            iconImageOffset: [-3, -42]
        });

    myPlacemark3 = new ymaps.Placemark([59.98322312, 30.35461929], {
        hintContent: 'Mr.BurgerTRI',
        balloonContent: 'Privet'
    },
        {
            iconLayout: 'default#image',
            iconImageHref: '/2-Burgershop/img/map-marker.png',
            iconImageSize: [45, 63],
            iconImageOffset: [-3, -42]
        });

    myMap.geoObjects.add(myPlacemark).add(myPlacemark2).add(myPlacemark3);
}

//_ajax

var submitForm = function (e) {
    console.log('in submitForm');
    e.preventDefault();

    var form = $(e.target),
        data = form.serialize(),
        url = form.attr('action');


    console.log(form);
    console.log(data);
    console.log(url);

    var request = $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON'
    });

    request.done(function (msg) {
        var mes = msg.mes,
            status = msg.status;
        if (status === 'Yes') {
            $('.success-order').addClass('success-order--active');
            //form.append('<p class="success-order">' + mes + '</p>');
        } else {
            $('.error-order').addClass('error-order--active');
            //form.append('<p class="error-order">' + mes + '</p>');
        }
    });

    request.fail(function (jqXHR, textStatus) {
        alert("Order denied: " + textStatus);
    });

}

$('#order-form').on('submit', submitForm);

let sucOrderWrap = $('.success-order--active');

$(document).keyup(function (e) {
    if (e.which == 27) {
        $('.success-order--active').removeClass('success-order--active');
    }
})

$(document).mouseup(function (e) {
    if (!sucOrderWrap.has(e.target).length) {
        $('.success-order--active').removeClass('success-order--active');
    }
});

let errOrderWrap = $('.error-order--active');

$(document).keyup(function (e) {
    if (e.which == 27) {
        $('.error-order--active').removeClass('error-order--active');
    }
})

$(document).mouseup(function (e) {
    if (!errOrderWrap.has(e.target).length) {
        $('.error-order--active').removeClass('error-order--active');
    }
});
