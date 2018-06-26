$(document).ready(function(){

	var url = location.href;
	if (url.indexOf('type=') != -1){
		let type = url.split('type=')[1].split('&')[0];
		$('input[value="' + type + '"]').prop('checked', true);
	}

	if (url.indexOf('color=') != -1){
		let color = url.split('color=')[1].split('&')[0];
		$('input[value="' + color + '"]').prop('checked', true);
	}

	// $('.ht-sort-list').text($('.ht-sort.active').text());

	$('input[name="type-tshirt"]','#ht-type-tshirt').click(function(){
		let self = $(this);
		let cur = location.href;
		if (cur.indexOf('?') == -1){
			cur += '?';
		} else if (cur[cur.length-1] != '&'){
			cur += '&';
		}

		let query = cur.split('?')[1];
		if (query.indexOf('type=') == -1){
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur += ('type=' + self.val());
		}
		else {
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur = cur.replace(/(type=).*?(&)/,'$1' + self.val() + '$2');
		}
		location.href = cur;

	});

	$('input[name="color-tshirt"]','#ht-color-tshirt').click(function(){
		let self = $(this);
		let cur = location.href;
		if (cur.indexOf('?') == -1){
			cur += '?';
		} else if (cur[cur.length-1] != '&'){
			cur += '&';
		}

		let query = cur.split('?')[1];
		if (query.indexOf('color=') == -1){
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur += ('color=' + self.val());
		}
		else {
			cur = cur.replace(/(page=).*?(&)/,'$1' + 1 + '$2');
			cur = cur.replace(/(color=).*?(&)/,'$1' + self.val() + '$2');
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
			cur += ('sort=' + self.attr('value'));
		}
		else {
			cur = cur.replace(/(sort=).*?(&)/,'$1' + self.attr('value') + '$2');
		}
		location.href = cur;
	});

	$('.ht-search-form').submit(function(e){
		e.preventDefault();
		let keywords = $('#ht-search').val();

		let self = $('#ht-search');

		let cur = location.href;
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