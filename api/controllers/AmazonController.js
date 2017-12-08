/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 var amazon = require('amazon-product-api');
		var client = amazon.createClient({
  			awsId: "AKIAIIOFUEUV4SHYNRIQ",
  			awsSecret: "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",
  			awsTag: "grad0c3-20"
		});

module.exports = {

	mostrar:function(req,res){
		console.log("hola");
		
		/*client.itemSearch({
 		 	keywords:'superga',
  		 	searchIndex: 'FashionWomen',
  		 	responseGroup: 'ItemAttributes,Offers,Images'
		}).then(function(results){
  			return res.send(results);
		}).catch(function(err){
  			console.log(err);
		});*/


		client.itemLookup({
  			idType: 'ASIN',
  			itemId: 'B071JDQKWM'
		}).then(function(results) {
  			return res.send(results);
		}).catch(function(err) {
  			console.log(err);
		});
	},

	mostrarid:function(req,res){
		console.log("por codigo");



	}


		
};

