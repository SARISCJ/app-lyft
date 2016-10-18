$(document).ready(function(){
	
	var celu =  window.localStorage.getItem("celular");
	$("#numCel").text(celu);

	var codigoRandom =  window.localStorage.getItem("codigo");

	$("#phoneId,.code").keydown(function(evento){
		var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	});

	$("#phoneId").keyup(function(evento) {
		var longitud = $(this).val().length;
		if (longitud == 9) {
			$("#siguiente").attr("href", "codigo.html");
		} else {
			$("#siguiente").removeAttr("href");
		}
	});

	$("#siguiente").click(function(evento){
		var long = $("#phoneId").val().length;
		if (codigoRandom !== null) {
			window.localStorage.removeItem("codigo");
		}
		if (long == 9) {
			var codigo = "Tu codigo aleatorio es : LAB - ";
			codigoRandom = Math.floor(Math.random()*899)+100;
			var random= window.localStorage.setItem("codigo", codigoRandom);
			alert(codigo + codigoRandom);
			window.localStorage.setItem("celular", $("#phoneId").val());
		}
	});	

	$("#validCode").click(function(){
		var validCode= $("#x").val() + $("#y").val() + $("#z").val();
		if (validCode == window.localStorage.getItem("codigo")) {
			$("#validCode").attr("href", "datos.html");
		} else {
			$("#validCode").removeAttr("href");
			alert("Código inválido");
			$(".code").val("");
			$(".code").last().focus(); 
		}
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

	$("#btn").click(function(evento){
		var nombre = $("#nombre").val().length;
		var email = $("#email").val().length;
		var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		var letra = /^[a-zA-Z]+$/;
		if ((nombre > 1 && nombre < 21) && (email > 4 && email < 51) && (letra.test($("#nombre").val().trim()) && regex.test($("#email").val().trim()))) {
			$(this).attr("href", "ubicacion.html");
		} else {
			alert("datos inválidos");
		}
	});

	var cargarPagina = function() {
		if (navigator.geolocation) { 
		// también se puede usar if ("geolocation" in navigator) {}
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}
	var funcionExito = function(posicion) {
		var lat = posicion.coords.latitude;
		var lon = posicion.coords.longitude;

		new GMaps({
			div: "#mapa_div",
			lat: lat,
			lng: lon
		});
	}

	var funcionError = function (error) {
		console.log(error);
	};

	$(document).ready(cargarPagina);

});