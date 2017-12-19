$(function() {

	// mobile header

	$('.mobile-nav-btn').on('click', function(){
        $('.nav').toggleClass('show');
    });

	// fixed header

	let headerH;

	if(window.matchMedia('(max-width: 1440px)').matches){
		headerH = $('.header').innerHeight() - 10;
	} else if (window.matchMedia('(max-width: 1600px)').matches){
		headerH = $('.header').innerHeight() - 20;
	} else {
		headerH = $('.header').innerHeight() - 50;
	}

	let pageH = $('#home').innerHeight() - headerH;

    $(document).on('scroll', function(){

        let documentScroll = $(this).scrollTop() + 1;

        if(documentScroll > pageH){
            $('.header').addClass('fixed');
        } else{
            $('.header').removeClass('fixed');
        }
    });

    // nav scroll

    $('.nav').on('click','a', function (e) {
        e.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top - headerH;
        $('body,html').animate({scrollTop: top}, 500);
    });

    // nav item border

	$(document).on('scroll', function (event){
        let scrollPos = $(document).scrollTop();
        $('.nav__link').each(function () {
            let currLink = $(this);
            let refElement = $(currLink.attr('href'));
            let refElementPos = refElement.position().top - headerH - 1;

            if (refElementPos <= scrollPos && refElementPos + refElement.innerHeight() > scrollPos) {
                $('.nav__link').removeClass('current');
                currLink.addClass('current');
            }
            else{
                currLink.removeClass('current');
            }
        });
    });

    // search input

	$('.search__btn').on('click', function (){
		$('.search__input').toggleClass('active');
    });

    // home slider

    function changeNumber(counter){
    	$('.home-slider__number').text('0' + counter);
    }

    function nextSlide(activeItem, reqItem, activeDesc, reqDescItem){

    	activeItem.css('z-index', 1);
		activeItem.animate({
			'right' : '100%'
		}, 500);

		reqItem.animate({
			'right' : '0'
		}, 500, function () {
			activeItem.removeClass('current').css('right', '-100%').css('z-index', 2);
			$(this).addClass('current');
		});

		activeDesc.animate({
			'opacity' : 0
		}, 500);

		reqDescItem.animate({
			'opacity' : 1
		}, 500, function(){
			activeDesc.removeClass('current');
			$(this).addClass('current');
		})
	}

	function changeControlClass(activeControl, reqControl){
		activeControl.removeClass('current');
		reqControl.addClass('current');
	}

    (function () {
		let counter = 1,
			container = $('.home-slider__img-wrap'),
			descContainer = $('.home-slider-desc__list'),
			items = container.find('.home-slider__item'),
			descItems = descContainer.find('.home-slider-desc__item'),
			controls = $('.home-slider__bottom-controls-item');

		$('.home-slider__arrow--right').bind('click', function(e){
		    e.preventDefault();

		    let activeItem = container.find('.home-slider__item.current'),
		    	activeDesc = descContainer.find('.home-slider-desc__item.current'),
		    	activeControl = $('.home-slider__bottom-controls-item.current');

			if (counter >= items.length) {
				counter = 0;
			}

			let reqItem = items.eq(counter),
				reqDescItem = descItems.eq(counter),
				reqControl = controls.eq(counter);

			nextSlide(activeItem, reqItem, activeDesc, reqDescItem);
			changeControlClass(activeControl, reqControl);

			counter++;

			changeNumber(counter);
		});

		$('.home-slider__arrow--left').on('click', function(e){
		    e.preventDefault();

		    let activeItem = container.find('.home-slider__item.current'),
		    	activeDesc = descContainer.find('.home-slider-desc__item.current'),
		    	activeControl = $('.home-slider__bottom-controls-item.current');

			let reqItem = items.eq(counter - 2),
				reqDescItem = descItems.eq(counter - 2),
				reqControl = controls.eq(counter - 2);
			reqItem.css('right', '100%');

			activeItem.css('z-index', 3);
			activeItem.animate({
				'right' : '-100%'
			}, 500);

			reqItem.animate({
				'right' : '0'
			}, 500, function () {
				activeItem.removeClass('current').css('z-index', 2);
				$(this).addClass('current');
			});

			activeDesc.animate({
				'opacity' : 0
			}, 500);

			reqDescItem.animate({
				'opacity' : 1
			}, 500, function(){
				activeDesc.removeClass('current');
				$(this).addClass('current');
			})

			changeControlClass(activeControl, reqControl);

			counter--;

			if (counter <= 0) {
				counter = items.length;
			}

			changeNumber(counter);
		});

		$('.home-slider__bottom-controls-item').on('click', function(){
			let controlId = $(this).index();

			let activeItem = $('.home-slider__item.current'),
				reqItem = items.eq(controlId),
				activeDesc = descContainer.find('.home-slider-desc__item.current'),
				reqDescItem = descItems.eq(controlId),
				currentControl = $('.home-slider__bottom-controls-item.current');

			if (controlId + 1 != counter){
				nextSlide(activeItem, reqItem, activeDesc, reqDescItem);

				currentControl.removeClass('current');
				$(this).addClass('current');
			}

			counter = controlId + 1;

			changeNumber(counter);
		});
	}());

	// popup

	let overlay = $('.overlay'),
		modal = $('.modal'),
		modalImg = $('.modal__img'),
		close = $('.close');

	$('.categories__link').on('click', function(e) {

		e.preventDefault();

		$('html,body').on('mousewheel', function (e) {
			e.preventDefault();
    	});

    	overlay.animate({'opacity': '.3'}, 500);
    	modal.animate({'opacity': '1'}, 500);
    	$('.overlay, .modal').css('display', 'block');

    	let largeImg = $(this).attr('href');
    	modalImg.attr({src: largeImg});

    });

	$('.close, .overlay').on('click', function(){
		closeModal();
		$('html,body').off('mousewheel');
	});

	function closeModal(){
		$('overlay, .modal').animate({'opacity': '0'}, 500, function(){
		$('.overlay, .modal').css('display', 'none');
		});
	}

	// projects slider

	(function () {
		let counter = 0,
			container = $('.projects__slider-left'),
			items = container.find('.projects__slider-item'),
			controls = $('.projects__slider-controls-item');

		$('.project__slider-arrow--right').on('click', function(e){
		    e.preventDefault();

		    let activeItem = container.find('.projects__slider-item.current'),
		    	activeControl = $('.projects__slider-controls-item.current');

			if (counter >= items.length) {
				counter = 0;
			}

			let reqItem = items.eq(counter),
				reqControl = controls.eq(counter);

			activeItem.css('z-index', 1);
			activeItem.animate({
				'right' : '100%'
			}, 500);

			reqItem.animate({
				'right' : '0'
			}, 500, function () {
				activeItem.removeClass('current').css('right', '-100%').css('z-index', 2);
				$(this).addClass('current');
				changeControlClass(activeControl, reqControl);
			});

			counter++;
		});

		$('.project__slider-arrow--left').on('click', function(e){
		    e.preventDefault();

		    let activeItem = container.find('.projects__slider-item.current'),
		    	activeControl = $('.projects__slider-controls-item.current');

			let reqItem = items.eq(counter - 2),
				reqControl = controls.eq(counter - 2);
			reqItem.css('right', '100%');

			activeItem.css('z-index', 3);
			activeItem.animate({
				'right' : '-100%'
			}, 500);

			reqItem.animate({
				'right' : '0'
			}, 500, function () {
				activeItem.removeClass('current').css('z-index', 2);
				$(this).addClass('current');
				changeControlClass(activeControl, reqControl);
			});

			counter--;

			if (counter <= 0) {
				counter = items.length;
			}
		});

		$('.projects__slider-controls-item').on('click', function(e){
			e.preventDefault();
			let controlId = $(this).index();

			let activeItem = $('.projects__slider-item.current'),
				reqItem = items.eq(controlId),
				currentControl = $('.projects__slider-controls-item.current');

			if (controlId + 1 != counter){

				activeItem.css('z-index', 1);
				activeItem.animate({
					'right' : '100%'
				}, 500);

				reqItem.animate({
					'right' : '0'
				}, 500, function () {
					activeItem.removeClass('current').css('right', '-100%').css('z-index', 2);
					$(this).addClass('current');
				});

				currentControl.removeClass('current');
				$(this).addClass('current');
			}

			counter = controlId + 1;
		});
	}());

	// contact tabs

	(function () {

		let tabsBtn = $('.contact__tabs'),
	        tabContent = $('.tab-content'),
	        childBtn = $('.contact-tabs__link'),
	        line = $('.line');

	        let lineWidth = $('.contact-tabs__link.current').width();
	    	line.css('width', lineWidth);

	    	let linePosition = $('.contact-tabs__link.current').position().left;
	        line.css('left', linePosition);

	    $(tabsBtn).on('click', '.contact-tabs__link', function(e){

	    	e.preventDefault();

	        let anchor = $(e.target).attr('href');

	        tabContent.animate({'opacity' : '0'}, 200);
			childBtn.removeClass('current');
			tabContent.removeClass('active-content');

			$(e.target).addClass('current');
			$(anchor).addClass('active-content').animate({'opacity' : '1'}, 200);
	        
			lineWidth = $('.contact-tabs__link.current').width();
	    	line.css('width', lineWidth);
	    	
	        linePosition = $(e.target).position().left;
	        line.css('left', linePosition);
	    })
    }());
})