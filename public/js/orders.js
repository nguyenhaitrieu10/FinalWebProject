$(document).ready(function(){

	var url = location.href;
	if (url.indexOf('status=') != -1){
		let type = url.split('status=')[1].split('&')[0];
		$('input[value="' + type + '"]').prop('checked', true);
	}



	$('input[name="type-order"]','#ht-type-order').click(function(){
		let self = $(this);
		let cur = location.href;
		if (cur.indexOf('?') == -1){
			cur += '?';
		} else if (cur[cur.length-1] != '&'){
			cur += '&';
		}

		let query = cur.split('?')[1];
		if (query.indexOf('status=') == -1){
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur += ('status=' + self.val());
		}
		else {
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur = cur.replace(/(status=).*?(&)/,'$1' + self.val() + '$2');
		}
		location.href = cur;

	});

	$('.ht-sort').click(function(){
		let self = $(this);
		$('.ht-sort.active').removeClass('active');
		self.addClass('active');
		// $('.ht-sort-list').text(self.text());
		let cur = location.href;
		if (cur.indexOf('?') == -1){
			cur += '?';
		} else if (cur[cur.length-1] != '&'){
			cur += '&';
		}

		let query = cur.split('?')[1];
		if (query.indexOf('sort=') == -1){
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur += ('sort=' + self.attr('value'));
		}
		else {
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur = cur.replace(/(sort=).*?(&)/,'$1' + self.attr('value') + '$2');
		}
		location.href = cur;
	});
});