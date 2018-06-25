
$(document).ready(function(){
	$('.ht-design-now').click(function(){
		if (location.href.indexOf('member') != -1)
			location.href = "member-design.html";
		else
			location.href = "design.html";
	});

	$('.ht-see-more').click(function(){
		if (location.href.indexOf('member') != -1)
			location.href = "member-shopping.html";
		else
			location.href = "shopping.html";
	});
	
	$('.ht-add-cart').click(function(){
		alert('Thêm vào giỏ hàng thành công!');
		if (location.href.indexOf('member') != -1)
			location.href = "member-cart.html";
		else
			location.href = "cart.html";
	});

	$('.ht-add-cart-admin').click(function(e){
		e.preventDefault();
		alert('Thêm sản phẩm thành công!');
			location.href = "cart.html";
		location.href = "admin-store.html";	
	});

	$('.ht-del-cart-admin').click(function(){
		let r = confirm('Chắc chắn xóa sản phẩm?');
		if (r == true){
			alert('Xóa sản phẩm thành công');
			location.href = "admin-store.html";
		}
	});

	$('.ht-argee').click(function(){
		alert('Chúc mừng, bạn đã đặt hàng thành công!');
		let r = confirm('Bạn có muốn tiếp tục mua hàng?');
		if (r == true)
			location.href = "member-home.html";
		else
			location.href = "member-orderstatus.html";
	});

	$('.admin-delivered').click(function(){
		let r = confirm('Xác nhận đã giao hàng?');
		if (r == true)
			$(this).parent().parent().css('display','none');
	});

	// $('.ht-support, .ht-close-chat').click(function(){
	// 	$('.ht-support-chat').toggle();		
	// });

	let select = [];
	let d = new Date();
	let y = d.getFullYear();
	let birth = $('#inputBirth');
	let e = document.createElement("option");
	e.value = 0;
	e.innerText = 'Năm';
	birth.append(e);
	for (let i = y; i > 1899; --i){
		let e = document.createElement("option");
		e.value = i;
		e.innerText = i;
		birth.append(e);
	}
	
	$('.header-login').click(function(){
		$('a#pills-home-tab').trigger('click');
	});

	$('.header-register').click(function(){
		$('a#pills-profile-tab').trigger('click');
	});

	$('.ht-login').click(function(e){
		e.preventDefault();
		let url = window.location.href;
		let page = url.split('/');
		page = page[page.length - 1];
		page = './member-' + page.split('html')[0] + 'html';
		window.location.replace(page);
	});


	$('#ht-save-product').click(function(e){
		e.preventDefault();
		window.location.replace('./admin-product.html');
	});

	$('.del-product').click(function(){
		let r = confirm('Xóa sản phẩm khỏi đơn hàng?');
		if (r == true){
			$(this).parent().parent().parent().css('display','none');
		}
	});

	$('.confirm-order').click(function(){
		alert('Xác nhận thành công');
		location.href = "admin-order.html";
	});

	$('.payment').click(function(){
		if (location.href.indexOf('member') != -1)
			location.href = "member-payment.html";
		else{
			alert('Hãy đăng nhập để mua hàng! Đăng ký ngay Nếu bạn chưa có tài khoản');
    		$('.header-login').trigger('click');
		}
	});

	$('.buy-more').click(function(){
		if (location.href.indexOf('member') != -1)
			location.href = "member-shopping.html";
		else
			location.href = "shopping.html";
	});

	$('.op-one').click(function(){
		$('.card-pay').css('display','none');
	});
	$('.op-two').click(function(){
		$('.card-pay').css('display','block');
	});

	$('.admin-detail-order').click(function(){
		location.href = 'admin-order-detail.html';
	});
});