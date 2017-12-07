require(["config"],function($){
	require(["jquery","loadHeaderFooter","zoom","slider","template","cookie"],function($){
		var template=require('template');
		$("#img_0").elevateZoom({
			gallery:'gal1',
			cursor: 'pointer',
			galleryActiveClass: 'active', 
			imageCrossfade: true, 
			loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif',
			lensShape : "square",
			zoomType : "window",
			zoomWindowWidth: 380,
			zoomWindowHeight: 380,
			cursor:"pointer",
			zoomWindowOffetx: 50,
			imageCrossfade:true,
			borderSize:2
			}); 
		$("#gal1").bind("click", function(e) {  
		  var ez=$('#gal1').data('elevateZoom');	
			$.fancybox(ez.getGalleryList());
		  return false;
		});
		$(document).ready(function(){
          $('.slider4').bxSlider({
            slideWidth: 200,
            minSlides: 2,
            maxSlides: 3,
			moveSlides: 1,
			startSlide: 1,

            slideMargin: 10
          });
        });
//********************************************************************************************
		//异步加载推荐的数据
		$.getJSON("/PC/pc_project/mock/tuiPro.json",function(respData){
					//开始处理拿回的数据
					var data={
						products:respData.data
					}
					var html=template("tui_pro",data);
					$(".tuiPro").html(html);
		});
//***********************************************************************************************/
		//实现地址
		var p1=ajaxPrimise("http://route.showapi.com/1149-1?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&level=1"),
			p2=ajaxPrimise("http://route.showapi.com/1149-1?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&level=2");
		var Pro=Promise.all([p1,p2]);
			Pro.then(function(respData){
				//这里的respData将两页的省份全都带了回来
				var html=`<option value="-1">请选择省份</option>`
				respData.forEach(function(respdata){
					respdata.showapi_res_body.data.forEach(function(province){
						html+=`<option  value=${province.id}>${province.areaName}</option>`;
					});
				});
				//将所有的省分信息带回之后再填充到province里面
				$("#province").html(html);
			});
		//实现将选择好省份之后，就将该省份的所有城市信息获取回来
		$("#province").change(function(){
			var id=$(this).val();
			var c1=ajaxPrimise("http://route.showapi.com/1149-2?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&parentId="+id),
			    c2=ajaxPrimise("http://route.showapi.com/1149-2?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&parentId="+id);
			var back=Promise.all([c1,c2]);
			back.then(function(resPdata){
				//已经获取到省份城市的信息
				/*console.log(resPdata);*/
				console.log(resPdata);
				var html=`<option value="-1">请选择城市</option>`
				resPdata.forEach(function(respdata){
					respdata.showapi_res_body.data.forEach(function(city){
						html+=`<option  value=${city.cityId}>${city.areaName}</option>`;
					});
				});
				//将所有的省分信息带回之后再填充到province里面
				$("#city").html(html);
			});
		});
		//实现将选择好城市之后，就将该省份的所有区信息获取回来
		$("#city").change(function(){
			var id=$(this).val();
			var c1=ajaxPrimise("http://route.showapi.com/1149-2?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&parentId="+id),
			    c2=ajaxPrimise("http://route.showapi.com/1149-2?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&parentId="+id);
			var back=Promise.all([c1,c2]);
			back.then(function(resPdata){
				//已经获取到省份城市的信息
				var html=`<option value="-1">请选择区</option>`
				resPdata.forEach(function(respdata){
					respdata.showapi_res_body.data.forEach(function(Country){
						html+=`<option  value=${Country.cityId}>${Country.areaName}</option>`;
					});
				});
				//将所有的省分信息带回之后再填充到province里面
				$("#County").html(html);
			});
		});
		//实现将选择好区之后，就将该省份的所有县信息获取回来
		$("#County").change(function(){
			var id=$(this).val();
			var c1=ajaxPrimise("http://route.showapi.com/1149-2?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&parentId="+id),
			    c2=ajaxPrimise("http://route.showapi.com/1149-2?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b&parentId="+id);
			var back=Promise.all([c1,c2]);
			back.then(function(resPdata){
				//已经获取到省份城市的信息
				var html=`<option value="-1">请选择县</option>`
				resPdata.forEach(function(respdata){
					respdata.showapi_res_body.data.forEach(function(township){
						html+=`<option  value=${township.cityId}>${township.areaName}</option>`;
					})
				});
				//将所有的省分信息带回之后再填充到province里面
				$("#township").html(html);
			});
		});
//***************************************************************************************
	 //实现数量的加减,利用时间委派
	 $(".serviceTop").delegate(".minus,.add","click",function(){
	 	var parent=$(this).parents(".priceDetail"),
	 		priceStr=$(parent).children(".price").find("#proPrice").html().substring(1),
	 		price=parseFloat(priceStr).toFixed(2),//得到价格
	 	//找到title
	 		title=$(parent).prev().html(),
	 	//拿到尺码
	 		size=$(parent).find(".size").html(),
	 	//拿到图片
	 		img=$(parent).parent().prev().children("#img_0").attr("src"),
	 	//拿到图片
	 		id=$(parent).parent().prev().children(".id").val();	
	 		console.log(id);
	 	var pro={
	 		Img:img,
	 		id:id,
	 		Price:price,
	 		amount:1,
	 		Title:title,
	 		Size:size,
	 	};
	 	$.cookie.json=true;
	 	var product=$.cookie("products")||[];
	 	var index=exist(pro.id,product);
	 	if($(this).is(".add")){
	 		if(index!==-1)
	 			product[index].amount++;
	 		else
	 			product.push(pro);
		 }
		else{
			if(index!==-1){
				if(product[index].amount===1)
 					return;
 				else
 					product[index].amount--;
			}
 			else
	 			product.push(pro);
	 	}
	 	$.cookie("products",product,{expires:7,path:"/"});
	 	//修改Dom中的数量
	 	$(parent).children(".serviceDetail").find("#amout").val(product[index].amount);
	 });
	 
	});
});
//*******************************************************************************
//通过promise的使用，里面利用ajax调用服务器上的信息
			//封装promise函数
			//参数_url：是你请求的url
function ajaxPrimise(_url){
	//主要是利用ajax来请求,构造函数，每次就可以利用它来创建一个promise对象
	var promise=new Promise(function(resolve,reject){
		$.ajax({
		type:"get",
		url:_url,
		dataType:"json",
		//请求成功执行的函数
		success:function(respData){
			resolve(respData);
		},
		//请求失败执行的函数
			error:function(errMsg){
				reject(errMsg);
			}
		});
		});
		return promise;
}
//**********************************************
function exist(id,arr){
	for(var i=0;i<arr.length;i++){
		if(id===arr[i].id){
			return i;
		}
	}
	return -1;
}
