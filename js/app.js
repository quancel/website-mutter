var touch = Modernizr.touch;
$('.img-holder').imageScroll({
    imageAttribute: (touch === true) ? 'image-mobile' : 'image',
    touch: touch,
});

(function ($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })

    window.sr = ScrollReveal();
    sr.reveal('.titel', {
        origin: 'bottom',
        opacity: 0,
        duration: 800
    });
    sr.reveal('.photoBox', {
        origin: 'bottom',
        duration: 500
    });
    sr.reveal('.aboutBox', {
        origin: 'bottom',
        duration: 500,
        delay: 300
    });

})(jQuery); // End of use strict

jQuery(document).ready(function ($) {
    var sliderContainers = $('.cd-slider-wrapper');

    if (sliderContainers.length > 0) initBlockSlider(sliderContainers);

    function initBlockSlider(sliderContainers) {
        sliderContainers.each(function () {
            var sliderContainer = $(this),
                slides = sliderContainer.children('.cd-slider').children('li'),
                sliderPagination = createSliderPagination(sliderContainer);

            sliderPagination.on('click', function (event) {
                event.preventDefault();
                var selected = $(this),
                    index = selected.index();
                updateSlider(index, sliderPagination, slides);
            });

            sliderContainer.on('swipeleft', function () {
                var bool = enableSwipe(sliderContainer),
                    visibleSlide = sliderContainer.find('.is-visible').last(),
                    visibleSlideIndex = visibleSlide.index();
                if (!visibleSlide.is(':last-child') && bool) {
                    updateSlider(visibleSlideIndex + 1, sliderPagination, slides);
                }
            });

            sliderContainer.on('swiperight', function () {
                var bool = enableSwipe(sliderContainer),
                    visibleSlide = sliderContainer.find('.is-visible').last(),
                    visibleSlideIndex = visibleSlide.index();
                if (!visibleSlide.is(':first-child') && bool) {
                    updateSlider(visibleSlideIndex - 1, sliderPagination, slides);
                }
            });
        });
    }

    function createSliderPagination(container) {
        var wrapper = $('<ol class="cd-slider-navigation"></ol>');
        container.children('.cd-slider').find('li').each(function (index) {
            var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
                dot = $('<a href="#0"></a>').appendTo(dotWrapper);
            dotWrapper.appendTo(wrapper);
            var dotText = (index + 1 < 10) ? '0' + (index + 1) : index + 1;
            dot.text(dotText);
        });
        wrapper.appendTo(container);
        return wrapper.children('li');
    }

    function updateSlider(n, navigation, slides) {
        navigation.removeClass('selected').eq(n).addClass('selected');
        slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

        //fixes a bug on Firefox with ul.cd-slider-navigation z-index
        navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            $(this).removeClass('slider-animating');
        });
    }

    function enableSwipe(container) {
        return (container.parents('.touch').length > 0);
    }
});
