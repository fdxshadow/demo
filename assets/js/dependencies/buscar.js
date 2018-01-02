$(document).ready(function(){
	$("#buscar").click(function () {
		console.log("hola");
		var prod= $("#buscador").val();
		//io.socket.post('/mostrar1',{categoria:'All',producto:prod},function(resp){
		//	console.log(resp);
		//});
		io.socket.post('/scrapp3',function(resp){
			console.log(resp)

		});
		/*io.socket.get('/scrapp',function (err,resp) {
			if(resp.body.length>0){
				console.log(resp.body[0].asin);
				io.socket.post('/mostrar',{asin:resp.body[0].asin},function(err,resp){
					console.log(resp);
				});

			}
			
		});*/
	
	
});
});