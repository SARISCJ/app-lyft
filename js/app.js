$(document).ready(function(){
	
	var celu =  window.localStorage.getItem("celular");
	$("#numCel").text(celu);

	var codigoRandom =  window.localStorage.getItem("codigo");

	var nombre= localStorage.getItem("nombre");

	var apellido= localStorage.getItem("apellido");

	var correo= localStorage.getItem("correo");

	$("#phoneId,.code").keydown(function(evento){
		var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	});

	$("#siguiente").click(function(){
		var alertDigitos = $("#alertDigitos");
		var longitud = $("#phoneId").val().length;
			if (longitud == 9) {
				$("#siguiente").attr("href","codigo.html");
			} else {
				alertDigitos.text("Vuelve a digitar tu numero de celular");
				alertDigitos.removeClass("ocultar");
				setTimeout(function(){ alertDigitos.addClass("ocultar"); }, 2000);
				$("#siguiente").removeAttr("href");
			}
	});

	$("#siguiente").click(function(evento){
		var codigoCel = $("#codigoCel");
		var long = $("#phoneId").val().length;
		if (codigoRandom !== null) {
			window.localStorage.removeItem("codigo");
		}
		if (long == 9) {
			var codigo = "Tu codigo: LAB - ";
			codigoRandom = Math.floor(Math.random()*899)+100;
			var random= window.localStorage.setItem("codigo", codigoRandom);
			codigoCel.text(codigo + codigoRandom);
			codigoCel.removeClass("ocultar");
			setTimeout(function(){ codigoCel.addClass("ocultar"); }, 2000);
			window.localStorage.setItem("celular", $("#phoneId").val());
		}
	});	


	$("#validCode").click(function(){
		var alertCodigo = $("#alertCodigo");
		var validCode= $(".code").eq(0).val() + $(".code").eq(1).val() + $(".code").eq(2).val();
		if (validCode == codigoRandom) {
			$("#validCode").attr("href","datos.html");
		} else {
			$("#validCode").removeAttr("href");
			alertCodigo.text("Código inválido");
			alertCodigo.removeClass("ocultar");
			setTimeout(function(){ alertCodigo.addClass("ocultar"); }, 2000);
			$(".code").val("");
			$(".code").last().focus(); 
		}
	});

	$("#resendCode").click(function(){ 
		var alertResentCodigo = $("#alertNuevoCodigo");
		var codigo = "Tu nuevo codigo es : LAB - ";
		var resentCode = (Math.floor(Math.random()*899)+100);
		alertResentCodigo.text(codigo + resentCode);
		alertResentCodigo.removeClass("ocultar");
		setTimeout(function(){ alertResentCodigo.addClass("ocultar"); }, 2000);
		localStorage.setItem("nuevocodigo", resentCode);
		codigoRandom = resentCode;
	});

	$(".code").keyup(function(e){
		var x = e.keyCode;
		if($(this).val().length==$(this).attr("maxlength")){
			$(this).next().focus();
		}
		if(x == 8){
			$(this).prev().focus();
		}
	});

	$("#btn").click(function(){
		nombre= localStorage.setItem("nombre", $("#nombre").val());
		apellido= localStorage.setItem("apellido", $("#apellido").val());
		correo= localStorage.setItem("correo", $("#email").val());
		var nombre = $("#nombre").val().length;
		var apellido = $("#apellido").val().length;
		var email = $("#email").val().length;
		var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		var letra = /^[a-zA-Z]+$/;
		if ((nombre > 1 && nombre < 21) && (apellido > 1 && apellido < 21) && (email > 4 && email < 51) && (letra.test($("#nombre").val().trim()) && letra.test($("#apellido").val().trim()) && regex.test($("#email").val().trim()))  && $("#terms").is(":checked")){
			$(this).attr("href","ubicacion.html");
		} else {
			alert("datos inválidos");
		}
	});


	$(".button-collapse").sideNav({
		menuWidth: 220, 
		// closeOnClick: true        // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });	

	$("#user").text(inputName + " " + inputLastname);
	var getNames = function(evento){
	var inputName = $("nombre").val();
	localStorage.setItem("nombre", inputName);
	var inputLastname = $("apellido").val();
	localStorage.setItem("apellido", inputLastname);
};
});


