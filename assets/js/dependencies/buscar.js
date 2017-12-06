$(document).ready(function(){
	$("#buscar").click(function () {
		console.log("hola")
		io.socket.get('/mostrar',function (error,data) {
			console.log(data);
		});

		

	})
	
	
});