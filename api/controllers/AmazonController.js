/**
 * UserController
 *
 * @description :: Server-side logic for managing users
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

	mostrar:function(req,res){
		var codigo=req.body.asin	

		/*client.itemSearch({
 		 	keywords:'superga',
  		 	searchIndex: 'FashionWomen',
  		 	responseGroup: 'Variations'
		}).then(function(results){
  			return res.send(results);
		}).catch(function(err){
  			console.log(err);
		});*/


		client.itemLookup({
  			idType: 'ASIN',
  			itemId: codigo,
  			responseGroup:'Images,ItemAttributes'
		}).then(function(results) {
  			return res.send(results);
		}).catch(function(err) {
  			console.log(err);
		});



	},

	mostrar1:function(req,res){	
		var categoria = req.param('categoria');
		var producto = req.param('producto')
		client.itemSearch({
			keywords:producto,
  		 	searchIndex: categoria,
  		 	responseGroup: 'Images,ItemAttributes'
		}).then(function(results){
			//return res.send(results);
			for (var i = results.length - 1; i >= 0; i--) {
			var prod = {
  					Nombre:results[i].DetailPageURL,
  					Foto:results[i].MediumImage[0].URL,
  					Precio:results[i].ItemAttributes[0].ListPrice[0].FormattedPrice,
  					Tamaño:results[i].ItemAttributes[0].ItemDimensions[0].Height[0]._+"X"+results[0].ItemAttributes[0].ItemDimensions[0].Length[0]._+"X"+results[0].ItemAttributes[0].ItemDimensions[0].Weight[0]._ ,
					Peso:results[i].ItemAttributes[0].ItemDimensions[0].Weight[0]._
  					}
			Amazon.create(prod,function(err,product){
				if (err) return handleError(err);
				console.log("todo bien");
			});
		}


			//return res.send(results[0]);
			//console.log(results[0].MediumImage[0].URL);
  			/*for (var i = results.length - 1; i >= 0; i--) {
  				var prod = new Amazon({
  					Nombre:results[i].Item
  					ASIN:results[i].ASIN,
  					URL:results[i].DetailPageURL,
  					Foto:results[i].MediumImage[0].URL,
  					Precio:results[i].ItemAttributes[0].ListPrice[0].FormattedPrice,
  					Tamaño:results[i].ItemAttributes[0].ItemDimensions[0].Height[0]._+"X"+results[0].ItemAttributes[0].ItemDimensions[0].Length[0]._+"X"+results[0].ItemAttributes[0].ItemDimensions[0].Weight[0]._ ,
					Peso:results[i].ItemAttributes[0].ItemDimensions[0].Weight[0]._
  					});
  				prod.save(function(err,prod){
  					if(err) return handleError(err);
  					return res.send(prod);
  				});
  			}*/
		}).catch(function(err){
  			return res.send("soy el error"+err);
		});



	},


	////scrap de amazon
	scrap:function(req,res){
		console.log("hola scrap");
		//url ="https://www.amazon.com/Superga-Womens-Woolmelw-Fashion-Sneaker/dp/B071WC36FS/ref=sr_1_5?s=apparel&ie=UTF8&qid=1513255474&sr=1-5&nodeID=7141123011&psd=1&keywords=superga";

		var options = {
  		  uri: "https://www.amazon.com/Superga-Womens-Woolmelw-Fashion-Sneaker/dp/B071WC36FS/ref=sr_1_5?s=apparel&ie=UTF8&qid=1513255474&sr=1-5&nodeID=7141123011&psd=1&keywords=superga",
    	  transform: function (body) {
          return cheerio.load(body);
    		}
		};

		request(options).then(function($){
			var json=[];
			$('li[data-defaultasin]').each(function(key,e){
					var aux = {
						title:$(e).attr('title'),
						asin:$(e).attr('data-defaultasin') 
					}
					json.push(aux);
			});
			console.log(json);
			return res.send(json);
		}).catch(function(err){
			console.log(err);
		})

	},




	//scrap de zapos


	scrap2:function(req,res){
		console.log("scrap 2");
		var opti={
		url:"https://www.zappos.com/men-sneakers-athletic-shoes/CK_XARC81wHAAQLiAgMBAhg.zso?si=3999003&sy=1&pf_rd_r=SN7RTM9MRSHFDR1RFZBA&pf_rd_p=d45b3677-fed6-462a-9afa-7b9ef24f6d85",
		transform: function(body){
			return cheerio.load(body);
			}
		};


		request(opti).then(function($){
		$('a[data-product-id]').each(function(key,e){
			console.log($(e).attr('href')); //hay que agregarle el prefijo de www.zappos.com
			console.log("Ruta de la imagen "+$(e).children('span.productImgContainer').children('img').attr('data-src'));//imagen general
			var aux = $(e).children('div.productInfoContainer');
			console.log("Brand "+aux.children('span.brandName').text());
			console.log('ProductName '+aux.children('span.productName').text());
			console.log('OldPrice '+aux.children('span.productPrice').children('span.price').text());
		});	



		}).catch(function(err){
			console.log(err);
		});


	},


	//scrap particular de zappos

	scrap3:function(req,resp){
		console.log("scrap 3");
		var opt={
		url:"https://www.zappos.com/p/adidas-originals-campus-clear-onix-white-chalk-white/product/8894455/color/695435",
		transform: function(body){
			return cheerio.load(body);
			}
		};

		request(opt).then(function($){
			//console.log($('div.IjGXb'))
			$('div.IjGXb').children('button._2mf0w').each(function(key,e){
				console.log($(e).children('img').attr('src'));
				console.log($(e).children('img').attr('alt'));	

			});

			$('select#pdp-size-select').children('option').each(function(key,e){
				console.log($(e).text()); //duplicado en el html


			});


		}).catch(function(err){

		});



	}		
};

