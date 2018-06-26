$(document).ready(function(){
	$('.ht-size').click(function(){
		let self = $(this);
		$('.ht-size.active').removeClass('active');
		self.addClass('active');

		console.log($('input[type="number"]').val());
		console.log(self.attr('value'));
	});
});