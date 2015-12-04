$(function(){

	$('.js-acordion').parents('li').click(function(){
		$(this).children('.js-acordion').slideToggle(200,'swing').prev('span').toggleClass('open');
		if($(this).children('span').is('.open')){
			$(this).children('span').text('−');
		}else{
			$(this).children('span').text('＋');
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
			console.log('hello');
		}
	});
	
	$('.js-to-top').click(function(){
		$('body,html').stop().scrollTop(0);
	});

});