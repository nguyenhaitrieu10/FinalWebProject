
$(document).ready(function () {
	$('.hl-submit').click(function () {
		location.href = "payment.html";
	});

});

var i = 0, j = 0;
var pass = "123456789";
var a = 0, b = 0, c = 0;
function checkName() {
	var txtname = document.getElementById("update-name");
	if (txtname.value == "") {
		var error = document.getElementById("hl-error-name");
		error.classList.remove("hl-hidden");
		i = -1;
	}
	else {
		var error = document.getElementById("hl-error-name");
		error.classList.add("hl-hidden");
		i = 1;
		if (j != -1) document.getElementById("hl-submit-update").disabled = false;
	}
}

function checkCMND() {
	var txtname = document.getElementById("update-cmnd");
	if (txtname.value == "") {
		var error = document.getElementById("hl-error-cmnd1");
		error.classList.remove("hl-hidden");
		j = -1;
	}
	else {
		var error = document.getElementById("hl-error-cmnd1");
		error.classList.add("hl-hidden");
		j = 1;
		if (i != -1) document.getElementById("hl-submit-update").disabled = false;
	}
}

function changexx() {
	if (i != -1 && j != -1) document.getElementById("hl-submit-update").disabled = false;
}

function subUpdate() {
	alert("Thông tin đã được thay đổi!");
	// window.location="home.html";
}

function checkOldPass() {
	if (document.getElementById("old-password").value != pass)
		document.getElementById("hl-error-password-old").classList.remove("hl-hidden");
	else {
		document.getElementById("hl-error-password-old").classList.add("hl-hidden");
		a = 1;
	}
}
function checkNewPass1() {
	if (c != 0) {
		if ((document.getElementById("new-password1").value) != (document.getElementById("new-password2").value)) {
			document.getElementById("hl-error-password-new2").classList.remove("hl-hidden");
		}
		else {
			document.getElementById("hl-error-password-new2").classList.add("hl-hidden");
			b = 1;
		}
	}
	if(b==1&&c==1)
	{
		document.getElementById("hl-sub-Pass-Update").disabled = false;
	}

}
function checkNewPass2() {
	c = 1;
	if ((document.getElementById("new-password1").value) != (document.getElementById("new-password2").value)) {
		document.getElementById("hl-error-password-new2").classList.remove("hl-hidden");
	}
	else {
		document.getElementById("hl-error-password-new2").classList.add("hl-hidden");
		b = 1;
	}
	if(b==1&&c==1)
	{
		document.getElementById("hl-sub-Pass-Update").disabled = false;
	}
}

function changPass(){
	alert("Mật khẩu đã được thay đổi!");
	window.location="home.html";
}

