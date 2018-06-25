
$(document).ready(function(){
	$('.mm-agree').click(function(e){
		e.preventDefault();
	});

	$('.ht-agree').click(function(){
		alert('Chúc mừng, bạn đã đặt hàng thành công!');
		let r = confirm('Bạn có muốn tiếp tục mua hàng?');
		if (r == true)
			location.href = "member-home.html";
		else
			location.href = "member-orderstatus.html";
	});
});