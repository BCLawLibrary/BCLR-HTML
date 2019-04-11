$( document ).ready(function(){
	$('p.Head1').replaceWith(function() {
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
	
	
	$("*").removeAttr("class").removeAttr("style").removeAttr("align");
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
})