
function modifyDOM() {

	function slugify(string) {
	  const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;"
	  const b = "aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------"
	  const p = new RegExp(a.split('').join('|'), 'g')

	  return string.toString().toLowerCase()
	    .replace(/\s+/g, '-') // Replace spaces with -
	    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
	    .replace(/&/g, '-and-') // Replace & with 'and'
	    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
	    .replace(/\-\-+/g, '-') // Replace multiple - with single -
	    .replace(/^-+/, '') // Trim - from start of text
	    .replace(/-+$/, '') // Trim - from end of text
	}

	var title = $('p.ArticleTitle').text();
	var slug = slugify(title);
	$('p.ArticleTitle').replaceWith(function() {
		return $('<h3/>', {
				html: this.innerHTML
		});
	});
	//$('i').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").remove();
	$('p.FootNote a').each(function(e){
		if($(this).siblings('span').hasClass('NoterefInNote'))
			 $(this).html($(this).html()+" ")
					 .append($(this).siblings('span.NoterefInNote'));
	});


	$("*").removeAttr("style").removeAttr("align");
	$('p, h3').each(function() {
		var html = $(this).html();
		$(this).html(html.replace(/\r?\n|\r/g, ' '));
	});
	$('p, p b, p i, p span, h3, h3 span, h3 span span')
		.filter(function() {
				return $.trim($(this).text()) === '' && $(this).children().length == 0
		})
		.remove()
	$("div").each(function() {
		var $this = $(this);
		$this.html($this.html().replace(/&nbsp;/g, ''));
	});


	$('p:empty, p b:empty, p i:empty, p span:empty, h3:empty, h3 span:empty, h3 span span:empty').remove();
	$('p:empty, p b:empty, p i:empty, p span:empty, h3:empty, h3 span:empty, h3 span span:empty').remove();

	$('h3').attr('style','text-align: center;');


	$('a[href*="_ftn"]').addClass('footnote footnoteLink');
	$('a[href*="_ftnref"]').removeClass('footnoteLink').addClass('footnoteTextOriginal');


	$('a.footnoteLink').each(function(){
		var footnote = $(this).attr('href').replace('_','');
		var footnoteHTML = $('<span>');
		$(footnote).appendTo(footnoteHTML);
		$(footnoteHTML).addClass('footnoteTextOuter').find('a').addClass('footnoteTextNew').removeClass('footnoteTextOriginal');
		//change divs to spans
		$(footnoteHTML).find('div').replaceWith(function() {
    	return "<span class='footnoteDiv'>" + this.innerHTML + "</span>";
		});
		//replace p with span of clas footnoteP
		$(footnoteHTML).find('p').replaceWith(function() {
			return "<span class='footnoteP'>" + this.innerHTML + "</span>";
		});
		$(footnoteHTML).children('span').children().unwrap();
		$(this).after(footnoteHTML);
	});

	$('.footnoteTextOriginal').remove();

	$('.footnote').children().each(function(){
			$(this).text($(this).text().replace('[','').replace(']',''));
	});



	//copy body HTML
		var copy = $("body").html();
		spaceDel = copy.replace(/\s+/g, '');
		var area = $('<textarea>')
		$(area).attr('id','copyMe').val(spaceDel).prependTo('body');
		var buttonElement = $('<button>');
		$(buttonElement).attr('id','copyButton').text('Click to copy HTML');
		$(area).after(buttonElement);
		var button = document.getElementById('copyButton');
		//copy from button
		button.addEventListener('click', function (e) {
			e.preventDefault();
			window.getSelection().empty();
			document.execCommand('copy', false, $("#copyMe").select());
				$('.copy-notification').remove();
				$('<div class="copy-notification">HTML copied to clipboard</div>').prependTo('body');
				$('.copy-notification').delay(300).fadeOut(600);

			});
		//copy once after running script
		document.execCommand('copy', false, $("#copyMe").select());






//copy Slug

	$('<div id="slug">'+slug+'</div>').prependTo('body');
	var slugButtonElement = $('<button>');
	$(slugButtonElement).attr('id','copySlugButton').text('Click to copy URL slug');
	$('#slug').after(slugButtonElement);
	var slugButton = document.getElementById('copySlugButton');
	//copy from button
	slugButton.addEventListener('click', function (e) {
		e.preventDefault();
		var copyText = document.querySelector('#slug');
		var range = document.createRange();
  	range.selectNode(copyText);
		window.getSelection().empty();
  	window.getSelection().addRange(range);

  try {
    // Now that we've selected the anchor text, execute the copy command
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
  } catch(err) {
    console.log('Oops, unable to copy');
  }
		$('.copy-notification').remove();
		$('<div class="copy-notification">URL slug copied to clipboard</div>').insertBefore('#slug');
		$('.copy-notification').delay(300).fadeOut(600);
		});
		//add indication that HTML is copied to the clipboard on load
		$('<div class="copy-notification">HTML copied to clipboard</div>').prependTo('body');
}



$(document).ready(function(){



	$('#popupButton').click(function(){

//We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
	chrome.tabs.executeScript({
		code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
	});
	$(this).hide();



})
})
