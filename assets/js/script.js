// JavaScript Document
var ready;

ready = function() {
	var documentHeight = $(document).height();

//css初期設定系
	$('#search-for-column li:last-of-type').css({marginRight:'0', marginBottom:'0'});
	$('.team-page-recomend li:nth-of-type(3n)').css('margin-right','0');
	$('#search-for-column .faq li:nth-of-type(3n)').css('margin-right','0');
	$('.team-page-detail > div > ul > li:nth-of-type(2n)').css('margin-right','0');
	$('.team-page-detail div > ul > div ul li:last-of-type').css('margin-right','0');
	$('#search-for-team .category:nth-of-type(2n)').css('margin-right','0');
	$('.team-page-coachs ul li:nth-of-type(2n)').css('margin-right','0');
	$('.team-page-columns ul li:last-of-type div').css('margin-bottom','0');
	$('.team-page-columns ul li:nth-of-type(2n)').css('margin-right','0');
	$('.team-page-introduction ul li:nth-of-type(2n)').css('margin-right','0');
	$('.team-page-contact ul li:nth-of-type(2n)').css('margin-right','0');
	$('.team-page-tags ul li:last-of-type').css('margin-right','0');

	$('#subcol div:first-child').css('margin-top','0');

//パンくずに「＞」を追加
	$('.breadcrumb ul li:not(:last-child)').append(' >');
/*――――――――――――――――――――
search-for-team
――――――――――――――――――――*/
	$('#search-for-team ul li ul li:not(:last-of-type)').each(function(){
		$(this).append(' ／ ');
	});

	$('#search-for-team ul li.category').each(function(){
		$(this).click(function(e){
			if($(e.target).is('a')){
				/*aなら何もしない*/
			}else{
				if($(this).children('span').is('.opened')){
					$(this).children('span').html('OPEN<span>▽</span>');
				}else{
					$(this).children('span').html('CLOSE<span>△</span>');
				}
				$(this).children('span').toggleClass('opened').next('ul').slideToggle();
			}
		});
	});

/*――――――――――――――――――――
絞り込み検索
――――――――――――――――――――*/
//絞り込み検索が開／閉時それぞれのボタン内テキスト切り替え
	$('.search-right-wrapper h4 button').click(function(){
		if($(this).hasClass('open')){
			$(this).text('絞り込む！').removeClass('open').parent('h4').css('top','50px').next('div').stop().animate({top:'50px',height:'0px',opacity:'0'},500);
		}else{
			$(this).text('閉じる').addClass('open').parent('h4').css('top','0').next('div').stop().animate({top:'0',height:'443px',opacity:'1'},500);
		}
	});

//検索フィールドの初期化
	$('.search-right-wrapper input').prop('checked',false);
	$('#search-field select option[value="defaultValue"]').prop('selected',true);

//labelのfor要素と直前のinput要素のidを連番で自動設定
	$('.search-right-wrapper input').each(function(i){
		var thisValue = $(this).siblings('label').text();
		$(this).attr('value',thisValue).attr('id',i).siblings('label').attr('for',i);
	});

//検索条件部分にチェックされた内容を表示
	$('.search-right-wrapper input').change(function(){
		$('.search-condition .search-refine-checked').remove();
		$('.search-right-wrapper input:checked').each(function(i,val){
				var changedContent = $(this).next('label').text();
				var changedContentCategory = $(this).closest('ul').attr('class');
				$('.search-condition .' + changedContentCategory).after('<dd class="search-refine-checked">' + changedContent);
		});
	});
	$('#search-condition dl dt:not(:first-child)').css('margin-top','20');

//検索条件部分にプルダウンから選択された内容を表示
	function dispSelectedPulldownFunc(pullDownName){
		$('#' + pullDownName + ' select').change(function(){
			$('.search-condition .' + pullDownName + '-selected').empty();
			var optionContent = $(this).children('option:selected').text();
			$('.search-condition dd.' + pullDownName + '-selected').text(optionContent)	;
			$('.search-condition .search-conditions dd');
		});
	}
	dispSelectedPulldownFunc('search-pref-pulldown');
	dispSelectedPulldownFunc('search-cities-pulldown');





/*――――――――――――――――――――
ランキング
――――――――――――――――――――*/
//-----ランキング番号の自動付与-----
	$('.ranking-column-container strong, .ranking-page-team-prof h4 strong').each(function(i){
		$(this).prepend(i+1);
	});

//-----コラムタイトルとチーム名の間にスラッシュ
	$('.ranking-column-team-name').each(function(){
		$(this).before('<span class="fow-normal">／</span>');
	});



/*――――――――――――――――――――
チームプロフィール
――――――――――――――――――――*/
//画像リサイズファンクション
	$(".js-imgresize").each(function(){
		$(this).on('load',this,function(){
			var myHeight 	= $(this).height();
			var myWidth  	= $(this).width();
			var sizeW　　	= $(this).parent('div').width();
			var sizeH　　	= $(this).parent('div').height();
			var mySizeH   = parseInt(sizeH,10);
			var mySizeW   = parseInt(sizeW,10);
			var aspectDiv = sizeW / sizeH;
			var aspectImg = myWidth / myHeight;

			if(aspectDiv > aspectImg){	//枠のアス比の方が大きい場合
				$(this).css({width:sizeW,height:'auto'});
				myHeight 	= $(this).height();
				var myTop = (myHeight - mySizeH)/2;
				$(this).css('top',-myTop);
			}else{											//枠のアス比の方が小さい場合
				$(this).css({width:'auto',height: sizeH});
				myWidth 		= $(this).width();
				var myLeft 	= (myWidth - mySizeW)/2;
				$(this).css('left',-myLeft);
			}
			$(this).fadeIn(500);
		});
	});




/*――――――――――――――――――――
問い合わせフォーム
――――――――――――――――――――*/
//体験入会・問い合わせフォームの表示／非表示
	function inquiryPositionFunc(){
		var windowWidth 				= $(window).width();
		var inquiryContentWidth = 630;
		var inquiryContentLeft  = (windowWidth - inquiryContentWidth)/2;
		$('.inquiry-content').css('left', inquiryContentLeft);
	}
	inquiryPositionFunc();
	$(window).resize(function(){
		inquiryPositionFunc();
	});

//体験入会・問い合わせフォームの表示／非表示
	function dispInquiryFunc(target){
		$(target + '-button').on('click',this,function(){
			$('.inquiry-wrapper,' + target).fadeIn();
		});
	}
	dispInquiryFunc('.inquiry-for-team');
	dispInquiryFunc('.inquiry-for-game');

	$('.inquiry-content .closebutton, .inquiry-background').on('click',this,function(){
		$('.inquiry-wrapper, .inquiry-content').fadeOut();
	});
//入力状況をチェックし、問題があれば送信時にアラートを表示
	$('form.inquiry').each(function(){
		$(this).submit(function(){
			var emptyForm	 	= 0;
			var array			 	= [];
			var mail 				= $(this).children('.mail').val();
			var mailConfirm = $(this).children('.mail-confirm').val();
			$(this).find('input.required-item,textarea').each(function(){
				var value = $(this).val();
				var name = $(this).attr('name');
				if(value ==''){
					emptyForm += 1;
					array += name + '、';
				}
			});
			if(emptyForm > 0){
				array = array.slice(0,-1);
				alert(array + 'は，入力必須項目です。');
				return false;
			}else if(mail !== mailConfirm){
				alert('２つのメールアドレスが一致しません。ご確認のうえ、再入力してください。');
				return false;
			}
		});
//同意ボタンにチェックがないと送信できない＆送信ボタン内の文字の変化
		$(this).find('.consent-checkbox').change(function(){
			if($(this).prop('checked') == true){
				$(this).parent().parent().next('input[type=submit]').removeAttr('disabled').attr('value','送信する');
			}else{
				$(this).parent().parent().next('input[type=submit]').attr('disabled','disabled').attr('value','「利用規約に同意する」にチェックを入れて下さい。');
			}
		});
	});


};

$(document).ready(ready);
$(document).on('page:load', ready);
