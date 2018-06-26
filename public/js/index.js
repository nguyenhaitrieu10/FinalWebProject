$(document).ready(function(){

	var url = location.href;

	$('.ht-search-form').submit(function(e){
		e.preventDefault();
		let keywords = $('#ht-search').val();

		let self = $('#ht-search');

		let cur = location.href + 'shopping';
		if (cur.indexOf('?') == -1){
			cur += '?';
		} else if (cur[cur.length-1] != '&'){
			cur += '&';
		}

		let query = cur.split('?')[1];
		if (query.indexOf('search=') == -1){
			cur += ('search=' + $('#ht-search').val());
		}
		else {
			cur = cur.replace(/(search=).*?(&)/,'$1' + $('#ht-search').val() + '$2');
		}
		location.href = cur;
	});
});