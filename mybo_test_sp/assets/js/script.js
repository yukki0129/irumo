$(function(){

	$('.js-acordion-triger').click(function(){
		$(this).siblings('.js-acordion').slideToggle(200,'swing').prev('.js-acordion-plus').toggleClass('open');
		if($(this).siblings('.js-acordion-plus').is('.open')){
			$(this).siblings('.js-acordion-plus').text('−');
		}else{
			$(this).siblings('.js-acordion-plus').text('＋');
		}
	});

	$('.js-search-switch').click(function(){
		$(this).next('.js-search').slideToggle(200,'swing');
		$(this).children('span').toggleClass('open')
		if($(this).children('span').is('.open')){
			$(this).children('span').text('−');
		}else{
			$(this).children('span').text('＋');
		}
	});

	$('.js-feature-switch').click(function(){
		$(this).next('.js-feature').fadeIn(300);
	});

	$('.feature-bg,.feature--close').click(function(){	
		if($('.js-feature').is(':visible')){
			$('.js-feature').fadeOut(300);
		}
	});
	
	$('.js-to-top').click(function(){
		$('body,html').stop().scrollTop(0);
	});

	$('.js-breadcrumb ul li:not("li:last-of-type")').each(function(){
		$(this).append('＞ ');
	});

	$('.js-team-inquiry-button').click(function(){
		$('.js-team-inquiry-bg').fadeIn(function(){
			if($(this).is('.left')){
				$('.js-team-inquiry.left').fadeIn();
			}else{
				$('.js-team-inquiry.right').fadeIn();
			}	
		});
	});


	$('.team--inquiry-bg,.feature--close').click(function(){	
		if($('.js-team-inquiry').is(':visible')){
			$('.js-team-inquiry,.js-team-inquiry-bg').fadeOut(300);
		}
	});

});