/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request-promise');
 var cheerio = require('cheerio');




 var am = require('amazon-product-api');
		var client = am.createClient({
  			awsId: "AKIAIIOFUEUV4SHYNRIQ",
  			awsSecret: "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",
  			awsTag: "grad0c3-20"
		});

module.exports = {


		mostrar1:function(req,res){	
		var categoria = req.param('categoria');
		var producto = req.param('producto')
		client.itemSearch({
			keywords:producto,
  		 	searchIndex: categoria,
  		 	responseGroup: 'Images,ItemAttributes'
		}).then(function(results){
			//return res.send(results[0]);
			//console.log(results[0].MediumImage[0].URL);
  			//for (var i = results.length - 1; i >= 0; i--) {
  				var prod = new Products({
  					Nombre:results[0].DetailPageURL,
  					Foto:results[0].MediumImage[0].URL,
  					Precio:results[0].ItemAttributes[0].ListPrice[0].FormattedPrice,
  					Tamaño:results[0].ItemAttributes[0].ItemDimensions[0].Height[0]._+"X"+results[0].ItemAttributes[0].ItemDimensions[0].Length[0]._+"X"+results[0].ItemAttributes[0].ItemDimensions[0].Weight[0]._,
					Peso:results[0].ItemAttributes[0].ItemDimensions[0].Weight[0]._
  					});
  				prod.save(function(err,prod){
  					if(err) return handleError(err);
  					return res.send(prod);
  				});
  			//}
		}).catch(function(err){
  			return res.send("soy el error"+err);
		});



	}

	
};

