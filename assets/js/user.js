// JavaScript Document
//タイトルを追加する
	$('.user-article').on('click','.add-title',function(){
		var subTitleNum = 0;
		subTitleNum = $('.subtitles').length;
		subTitleNum += 1;
		if(subTitleNum > 6){
			alert('追加可能なタイトルは6つまでです');
			return false;
		}
		$('.user-article ul > li:last').before('<li class="subtitles"><label for="article_sub_title_0'+subTitleNum+'">サブタイトル'+ subTitleNum +'</label><textarea name="article[sub_title_0'+subTitleNum+']" id="article_sub_title_0'+subTitleNum+'"></textarea><button class="delete-title-button" type="button">削除する</button></li>');
		$('.subtitles').slideDown(200).css('display','inline-block');
	});
//削除時のタイトルNo.の振り直し
	$('.rightmenu').on('click','.delete-title-button',function(){
		$(this).closest('li').slideUp(200,function(){
			$(this).remove();
			$('.subtitles').each(function(i){
				$(this).children('label').attr('for','sub-title'+(i+1)).text('サブタイトル'+(i+1))
				.siblings('input').attr('id','sub-title'+(i+1));
			});
		});
	});
//画像／動画を追加する
	$('.user-article').on('click','.add-load',function(){
		var subLoadNum = 0;
		var subLoadArray = ['zero','one','two','three','four','five','six'];
		subLoadNum = $('.subloads').length;
		subLoadNum += 1;
		if(subLoadNum > 6){
			alert('追加可能な画像／動画は6つまでです');
			return false;
		}
		$('.user-article ul > li:last').before('<li class="subloads"><fieldset class="uploads"><legend>サブ画像／動画'+subLoadNum+'</legend><div><label class="sub-image-label" for="article_sub_image_'+ subLoadArray[subLoadNum] + '">画像はこちらから</label><br><input class="sub-image-input" name="article[sub_image_' + subLoadArray[subLoadNum] + ']" id="article_sub_image_'+ subLoadArray[subLoadNum] + '" type="file" value="画像アップロード"></div><div><label class="sub-movie-label" for="article_movie_thumbnail_0' + subLoadNum + '">動画はこちらから</label><br><textarea name="article[movie_thumbnail_0'+subLoadNum+']" id="article_movie_thumbnail_0' + subLoadNum + '" rows="5" cols="52"></textarea></div></fieldset><button class="delete-load-button" type="button">削除する</button></li>');
		$('.subloads').slideDown(200).css('display','inline-block');
	});
//削除時のタイトルNo.の振り直し
	$('.rightmenu').on('click','.delete-load-button',function(){
		$(this).closest('li').slideUp(200,function(){
			$(this).closest('li').remove();
			$('.subloads').each(function(i){
				$(this).find('legend').text('サブ画像／動画'+(i+1));
				$(this).find('label.sub-image-label').attr('for','upload-subimage'+(i+1))
				.siblings('input.sub-image-input').attr('id','upload-subimage'+(i+1))
				.siblings('label.sub-movie-label').attr('for','upload-submovie'+(i+1))
				.siblings('input.sub-movie-input').attr('id','upload-submovie'+(i+1));
			});
		});

	});

//テキストを追加する
	$('.user-article').on('click','.add-text',function(){
		var subTextNum = 0;
		subTextNum = $('.subtexts').length;
		subTextNum += 1;
		if(subTextNum > 6){
			alert('追加可能な文章は6つまでです');
			return false;
		}
		$('.user-article ul > li:last').before('<li class="subtexts"><label for="article_sub_text_0'+subTextNum+'">サブ文章'+subTextNum+'</label><textarea id="article_sub_text_0'+subTextNum+'" name="article[sub_text_0'+subTextNum+']" rows="5" cols="50"></textarea><button class="delete-text-button" type="button">削除する</button></li>');
		$('.subtexts').slideDown(200).css('display','inline-block');
	});
//削除時のタイトルNo.の振り直し
	$('.rightmenu').on('click','.delete-text-button',function(){
		$(this).closest('li').slideUp(200,function(){
			$(this).closest('li').remove();
			$('.subtexts').each(function(i){
				$(this).children('label').text('サブ文章'+(i+1));
				$(this).find('label.sub-image-label').attr('for','upload-subimage'+(i+1))
				.siblings('textarea').attr('id','sub-text'+(i+1));
			});
		});
	});


var ready;

ready = function() {
//文字省略ファンクション
	function textCut(target,thres,word){//（ターゲットセレクタ，省略開始文字数，後に付ける文字）
		$(target).each(function(){
			var originalText = $(this).text();
			var textLength   = originalText.length;
			var textThres    = thres;
			if(textLength > textThres){
				var shortText = originalText.slice(0,textThres);
				$(this).text(shortText).append(word);
			}
		});
	}

/*――――――――――――――――――――
管理画面
――――――――――――――――――――*/
//チェックボックスのチェック可能な個数の制限
	function checkBoxDisableFunc(target,value){//ターゲットセレクタ、選択可能数
		$(target).change(function(){
			var checkedbox = $(target + ':checked').length;
			if(checkedbox >= value){
				$(target + ':not(:checked)').attr('disabled','disabled');
			}else{
				$(target).removeAttr('disabled');
			}
		});
	}
	checkBoxDisableFunc('fieldset.age input',2);
	checkBoxDisableFunc('fieldset.policy input',1);
	checkBoxDisableFunc('fieldset.style input',1);
	checkBoxDisableFunc('fieldset.main-tag-selection input',3);

//確認用パスワードの一致確認
	$('form.user-prof').submit(function(){
		var pass = $(this).find('input.pass').val();
		var passConfirm = $(this).find('input.pass-confirm').val();
		if(pass !== passConfirm){
			alert('２つの変更後パスワードが一致しません。ご確認のうえ、再入力してください。')
			return false;
		}
	});

/*――――――――――――――――――――
記事作成画面
――――――――――――――――――――*/

//記事管理画面のタイトル文字数省略
	textCut('.article-title',53,'…');

//編集ボタン押下時に確認アラート表示
	$('.rightmenu').on('click','.article-edit',function(){
		return confirm('記事の編集画面に移動します。よろしいですか？')
	});
//削除ボタン押下時に確認アラート表示
	$('.rightmenu').on('click','.article-delete',function(){
		return confirm('本当に削除しますか？（削除後、記事の復元はできません。）')
	});
//下書きか非公開なら背景色を変える
	$(window).on('load',this,function(){
		$('.user-management ul').each(function(){
			if($(this).children('.article-condition').text() == '下書き'||$(this).children('.article-condition').text() == '非公開'){
				$(this).children('li').css({backgroundColor:'#f1f1f1',color:'#666'});
			}
		});
	});

};

$(document).ready(ready);


// $(document).on('page:load', ready);
