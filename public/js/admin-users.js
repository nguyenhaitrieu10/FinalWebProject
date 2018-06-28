$(document).ready(function(){
	$('.user-status').click(function(){
		let self = $(this);
		if (self.hasClass('active')){
			r = confirm('Vô hiệu hóa người dùng này?');
			if (r){
				$('#banUser').attr('action','/admin/ban/' + self.attr('value'));
				$('#banUser').submit();
			}
		} else {
			r = confirm('Bỏ chặn người dùng này?');
			if (r){
				$('#banUser').attr('action','/admin/deban/' + self.attr('value'));
				$('#banUser').submit();
			}
		}
	});

});