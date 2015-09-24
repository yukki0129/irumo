$(function(){
/*――――――――――――――――――――
slider
――――――――――――――――――――*/
//マーカーをコンテンツ数ぶん追加する
	$('#slider .slider-content').each(function(){
		$('.slider-marker').append('<p>●');
	});
//マーカーの初期設定
	$('.slider-marker p:last').css('margin-right','0');
	$('.slider-marker p:first').css('color','rgba(255,255,255,.8)').addClass('present-marker');
//マーカーの位置調整
	function sliderMarkerPositionFunc(){
		var myWidth = $('#slider').width();
		var sliderMarkerWidth = $('.slider-marker').width();
		var sliderMarkerPosition = myWidth/2 - sliderMarkerWidth/2;
		$('.slider-marker').css('left',sliderMarkerPosition);		
	}
	sliderMarkerPositionFunc();
	$(window).resize(function(){
		sliderMarkerPositionFunc();
	});	

//スライドの初期設定
	$('.slider-content-wrap li:first').addClass('present-slide');
	$('.slider-content-wrap li:nth-of-type(2)').addClass('next-slide');

//スライダー配列を作成
	var slideWidth = $('.slider-content-wrap li').width();
	var sliderArray = [];
	$('.slider-content-wrap li').each(function(i){
		sliderArray[i] = $(this).html();
	});
	$('.slider-content-wrap').prepend('<li class="previous-slide">'+sliderArray[sliderArray.length-1]+'</li>');
	$('.slider-content-wrap li:gt(2)').remove();

//スライドの位置調整
	var windowWidth = $(window).width();
	var slideWidth = $('.slider-content-wrap li').width();
	var presentLeft = windowWidth/2 - slideWidth/2;
	var previousLeft = presentLeft - slideWidth;
	var nextLeft = presentLeft + slideWidth;	
	function slidePositionFunc(){
		windowWidth = $(window).width();
		slideWidth = $('.slider-content-wrap li').width();
		presentLeft = windowWidth/2 - slideWidth/2;
		previousLeft = presentLeft - slideWidth;
		nextLeft = presentLeft + slideWidth;			
		$('.previous-slide').css('left',previousLeft);
		$('.next-slide').css('left',nextLeft);
		$('.present-slide').css('left',presentLeft);	
	}
	slidePositionFunc();
	$(window).resize(function(){
		slidePositionFunc();
	});	
//左右ボタン位置調整
	function sliderButtonPositionFunc(){
		var sliderButtonWidth = $('.slider-button').width();
		$('.slider-prev').css('left', presentLeft+20);
		$('.slider-next').css('left',nextLeft - sliderButtonWidth-20);
	}
	sliderButtonPositionFunc();
	$(window).resize(function(){
		sliderButtonPositionFunc();
	});		

//左右ボタンでスライドする機能を付加
	var slideNum = 0;
	var newClassArray = ['previous-slide','present-slide','next-slide'];
	var animateDuration = 800;
	var easing = 'easeInOutQuart';


	//左ボタンクリック時
	$('.slider-prev').click(function(){
		if($('.slider-content-wrap li').is(':animated')){
		}else{
			slideNum -= 1;//マイナスカウントする
			if(slideNum < 0){//ゼロより小さくなったら
				slideNum = sliderArray.length - 1;//カウントをリセットする
				var slideNumConteinar = sliderArray[slideNum - 1];				
			}else if(slideNum == 0){
				var slideNumConteinar = sliderArray[sliderArray.length - 1];
			}else{
				var slideNumConteinar = sliderArray[slideNum - 1];
			};
			$('.slider-content-wrap').prepend('<li class="second-previous-slide">'+slideNumConteinar+'</li>');
			$('.second-previous-slide').css('left',previousLeft-slideWidth);
			$('.present-slide').animate({left:nextLeft},animateDuration,easing);
			$('.next-slide').animate({left:nextLeft+slideWidth},animateDuration,easing);
			$('.previous-slide').animate({left:presentLeft},animateDuration,easing);
			$('.second-previous-slide').animate({left:previousLeft},animateDuration,easing,function(){
				$('.next-slide').remove();
				$('.slider-content-wrap li').removeClass().each(function(i){
					$(this).addClass(newClassArray[i]);
				});
			});
			var markerNum = slideNum + 1;//slideNumと同じ番号のマーカー
			if( markerNum == sliderArray.length+1){//スライド数の上限に達したらリセット
				markerNum = 1;
			};
			$('.slider-marker p:nth-child('+markerNum+')').css('color','rgba(255,255,255,.8)').addClass('present-marker');
			$('.slider-marker p:not(:nth-child('+markerNum+'))').css('color','rgba(0,0,0,.5)').removeClass('present-marker');
		};
	});

	//右ボタンクリック時
	$('.slider-next').click(function(){
		if($('.slider-content-wrap li').is(':animated')){
		}else{
			slideNum += 1;
			if(slideNum == sliderArray.length-1){
				var slideNumConteinar = sliderArray[0];
			}else if(slideNum == sliderArray.length){
				slideNum = 0;
				var slideNumConteinar = sliderArray[slideNum+1];
			}else{
				var slideNumConteinar = sliderArray[slideNum+1];
			};
			$('.slider-content-wrap').append('<li class="second-next-slide">'+slideNumConteinar+'</li>');
			$('.second-next-slide').css('left',nextLeft+slideWidth);
			$('.present-slide').animate({left:previousLeft},animateDuration,easing);
			$('.next-slide').animate({left:presentLeft},animateDuration,easing);
			$('.previous-slide').animate({left:previousLeft-slideWidth},animateDuration,easing);
			$('.second-next-slide').animate({left:nextLeft},animateDuration,easing,function(){
				$('.previous-slide').remove();
				$('.slider-content-wrap li').removeClass().each(function(i){
					$(this).addClass(newClassArray[i]);
				});
			});
			var markerNum = slideNum + 1;
			if( markerNum == 0){//スライド数の上限に達したらリセット
				markerNum = sliderArray.length;
			};
			$('.slider-marker p:nth-child('+markerNum+')').css('color','rgba(255,255,255,.8)').addClass('present-marker');
			$('.slider-marker p:not(:nth-child('+markerNum+'))').css('color','rgba(0,0,0,.5)').removeClass('present-marker');
		};
	});

	//マーカークリック時
	$('.slider-marker p').each(function(i){
		$(this).click(function(){
			if($('.slider-content-wrap li').is(':animated')){
			}else{	
				if($(this).hasClass("present-marker")){
				}else{
					var slideNumConteinar = sliderArray[i];
					if(slideNum == i - 1){
						if(slideNum == sliderArray.length - 2){
							var slideNumConteinar = sliderArray[0];
						}else{
							var slideNumConteinar = sliderArray[slideNum+2];
						};
						$('.slider-content-wrap').append('<li class="second-next-slide">' + slideNumConteinar + '</li>');
						$('.second-next-slide').css('left',nextLeft + slideWidth);
						$('.present-slide').animate({left:previousLeft},animateDuration,easing);
						$('.next-slide').animate({left:presentLeft},animateDuration,easing);
						$('.previous-slide').animate({left:previousLeft-slideWidth},animateDuration,easing);
						$('.second-next-slide').animate({left:nextLeft},animateDuration,easing,function(){
							$('.previous-slide').remove();
							$('.slider-content-wrap li').removeClass().each(function(i){
								$(this).addClass(newClassArray[i]);
							});
						});
					}else if(slideNum == i + 1){
						if(slideNum == 1){
							var slideNumConteinar = sliderArray[sliderArray.length - 1];
						}else{
							var slideNumConteinar = sliderArray[slideNum - 2];
						};
						$('.slider-content-wrap').prepend('<li class="second-previous-slide">' + slideNumConteinar + '</li>');
						$('.second-previous-slide').css('left',previousLeft-slideWidth);
						$('.present-slide').animate({left:nextLeft},animateDuration,easing);
						$('.next-slide').animate({left:nextLeft + slideWidth},animateDuration,easing);
						$('.previous-slide').animate({left:presentLeft},animateDuration,easing);
						$('.second-previous-slide').animate({left:previousLeft},animateDuration,easing,function(){
							$('.next-slide').remove();
							$('.slider-content-wrap li').removeClass().each(function(i){
								$(this).addClass(newClassArray[i]);
							});
						});
					}else if(slideNum <= i - 2){
						var difference = i - slideNum;
						var widthByDifference = slideWidth * difference;
						for(var counter = 1; counter <= difference; counter++){
							slideNum ++;
							if(slideNum == sliderArray.length - 1){
								var slideNumConteinar = sliderArray[0];
							}else if(slideNum == sliderArray.length){
								slideNum = 0;
								var slideNumConteinar = sliderArray[slideNum + 1];
							}else{
								var slideNumConteinar = sliderArray[slideNum + 1];
							};
							$('.slider-content-wrap').append('<li class="next-slides' + counter + '">' + slideNumConteinar + '</li>');
							$('.next-slides' + counter).css('left',nextLeft + slideWidth * counter);
							var slideVolume = $('.next-slides' + counter).css('left');
							slideVolume = parseInt(slideVolume,10);
							var newPosition = slideVolume - widthByDifference;
							$('.next-slides' + counter).animate({left: newPosition},animateDuration,easing);
						};
						$('.present-slide').animate({left: presentLeft - widthByDifference},animateDuration,easing);
						$('.next-slide').animate({left: nextLeft - widthByDifference},animateDuration,easing);
						$('.previous-slide').animate({left:previousLeft - widthByDifference},animateDuration,easing,function(){
							$('.slider-content-wrap li:lt(-3)').remove();
							$('.slider-content-wrap li').removeClass().each(function(i){
								$(this).addClass(newClassArray[i]);
							});
						});
					}else if(slideNum >= i + 2){
						var difference = slideNum - i;
						var widthByDifference = slideWidth * difference;
						for(var counter = 1; counter <= difference; counter++){
							slideNum --;//マイナスカウントする
							if(slideNum < 0){//ゼロより小さくなったら
								var slideNumConteinar = sliderArray[sliderArray.length - 1];
							}else if(slideNum == 0){
								var slideNumConteinar = sliderArray[sliderArray.length - 1];
							}else{
								var slideNumConteinar = sliderArray[slideNum - 1];
							};						
							$('.slider-content-wrap').prepend('<li class="previous-slides' + counter + '">' + slideNumConteinar + '</li>');
							$('.previous-slides' + counter).css('left',previousLeft - slideWidth * counter);
							var slideVolume = $('.previous-slides' + counter).css('left');
							slideVolume = parseInt(slideVolume,10);
							var newPosition = slideVolume + widthByDifference;
							$('.previous-slides' + counter).animate({left: newPosition},animateDuration,easing);						
						};
						
						$('.present-slide').animate({left: presentLeft + widthByDifference},animateDuration,easing);
						$('.next-slide').animate({left: nextLeft + widthByDifference},animateDuration,easing);
						$('.previous-slide').animate({left:previousLeft + widthByDifference},animateDuration,easing,function(){
							$('.slider-content-wrap li:gt(2)').remove();
							$('.slider-content-wrap li').removeClass().each(function(i){
								$(this).addClass(newClassArray[i]);
							});
						});
					};
					slideNum = i;
					$(this).css('color','rgba(255,255,255,.8)').addClass('present-marker');
					$(this).siblings().css('color','rgba(0,0,0,.5)').removeClass('present-marker');
				};
			};
		});
	});

	//オートでスクロール
	setInterval(function(){
		if($('.slider-content-wrap li').is(':animated')){
		}else{
			slideNum += 1;
			if(slideNum == sliderArray.length-1){
				var slideNumConteinar = sliderArray[0];
			}else if(slideNum == sliderArray.length){
				slideNum = 0;
				var slideNumConteinar = sliderArray[slideNum+1];
			}else{
				var slideNumConteinar = sliderArray[slideNum+1];
			};
			$('.slider-content-wrap').append('<li class="second-next-slide">'+slideNumConteinar+'</li>');
			$('.second-next-slide').css('left',nextLeft+slideWidth);
			$('.present-slide').animate({left:previousLeft},animateDuration,easing);
			$('.next-slide').animate({left:presentLeft},animateDuration,easing);
			$('.previous-slide').animate({left:previousLeft-slideWidth},animateDuration,easing);
			$('.second-next-slide').animate({left:nextLeft},animateDuration,easing,function(){
				$('.previous-slide').remove();
				$('.slider-content-wrap li').removeClass().each(function(i){
					$(this).addClass(newClassArray[i]);
				});
			});
			var markerNum = slideNum + 1;
			if( markerNum == 0){//スライド数の上限に達したらリセット
				markerNum = sliderArray.length;
			};
			$('.slider-marker p:nth-child('+markerNum+')').css('color','rgba(255,255,255,.8)').addClass('present-marker');
			$('.slider-marker p:not(:nth-child('+markerNum+'))').css('color','rgba(0,0,0,.5)').removeClass('present-marker');
		};
	},5000);
});
