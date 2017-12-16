$(function() {

	// fixed header

	let headerH = $('.header').height() - 50,
		pageH = $('#home').height() - headerH;
    
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
        $('.nav a').each(function () {
            let currLink = $(this);
            let refElement = $(currLink.attr('href'));
            let refElementPos = refElement.position().top - headerH - 1;

            if (refElementPos <= scrollPos && refElementPos + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass('current');
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
		activeItem.animate({
			'right' : '100%'
		}, 500);

		reqItem.animate({
			'right' : '0'
		}, 500, function () {
			activeItem.removeClass('current').css('right', '-100%');
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

    (function () {
		let counter = 1,
			container = $('.home-slider__img-wrap'),
			descContainer = $('.home-slider-item-desc__list'),
			items = container.find('.home-slider__item'),
			descItems = descContainer.find('.home-slider-item-desc__item');

		$('.home-slider__arrow--right').on('click', function(e){
		    e.preventDefault();

		    let activeItem = container.find('.home-slider__item.current'),
		    	activeDesc = descContainer.find('.home-slider-item-desc__item.current');

			if (counter >= items.length) {
				counter = 0;
			}

			let reqItem = items.eq(counter),
				reqDescItem = descItems.eq(counter);

			nextSlide(activeItem, reqItem, activeDesc, reqDescItem);

			counter++;

			changeNumber(counter);
		});

		$('.home-slider__arrow--left').on('click', function(e){
		    e.preventDefault();

		    let activeItem = container.find('.home-slider__item.current'),
		    	activeDesc = descContainer.find('.home-slider-item-desc__item.current');

			let reqItem = items.eq(counter - 2),
				reqDescItem = descItems.eq(counter - 2);
			reqItem.css('right', '100%');

			activeItem.animate({
				'right' : '-100%'
			}, 500);

			reqItem.animate({
				'right' : '0'
			}, 500, function () {
				activeItem.removeClass('current');
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
				activeDesc = descContainer.find('.home-slider-item-desc__item.current'),
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

	// modals

	let overlay = $('.overlay'),
		modal = $('.modal'),
		modalImg = $('.modal__img'),
		close = $('.close');

	$('.categories__link').on('click', function(e) {

		e.preventDefault();

    	overlay.animate({'opacity': '.3'}, 500);
    	modal.animate({'opacity': '1'}, 500);
    	$('.overlay, .modal').css('display', 'block');

    	let largeImg = $(this).attr('href');
    	modalImg.attr({src: largeImg});

    	$('body').addClass('overflow');

    });

	$('.close, .overlay').on('click', function(){
		closeModal();
	});

	function closeModal(){
		$('overlay, .modal').animate({'opacity': '0'}, 500, function(){
		$('.overlay, .modal').css('display', 'none');
		});

		$('body').removeClass('overflow');
	}
	
})