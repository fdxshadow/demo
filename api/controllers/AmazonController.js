/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	mostrar:function(req,res){
		console.log("hola");
		var amazon = require('amazon-product-api');
		var client = amazon.createClient({
  			awsId: "AKIAIIOFUEUV4SHYNRIQ",
  			awsSecret: "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",
  			awsTag: "grad0c3-20"
		});
		client.itemSearch({
 		 	director: 'Quentin Tarantino',
  		 	actor: 'Samuel L. Jackson',
  		 	searchIndex: 'DVD',
  		 	audienceRating: 'R',
  		 	responseGroup: 'ItemAttributes,Offers,Images'
		}).then(function(results){
  			return res.send(results);
		}).catch(function(err){
  			console.log(err);
		});
	}


		
};

