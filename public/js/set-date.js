
$(document).ready(function(){
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
});