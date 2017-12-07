require(["config"],function($){
	require(["jquery","loadHeaderFooter","template","cookie"],function($){
		var template=require("template");
//*********************************************************************************************
		//实现选择地址
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
//**********************************************************************************************
	//实现地址的保存
	$("#btn").on("click",function(){
		//获取省信息
		var province=$("#province option:selected").text(),
		//获取市
			city=$("#city option:selected").text(),
		//获取去
			county=$("#County option:selected").text(),
		//获取县级
			township=$("#township option:selected").text(),
		//详细地址以及姓名等
			detailAdress=$("#detailAdress").val(),
			getName=$("#getName").val(),
			moblePhone=$("#moblePhone").val(),
			phone=$("#phone").val(),
			emailAdress=$("#emailAdress").val();
		//设置输入的s手机号是否正确
		var phoneNumber=/^1[3|4|5|8][0-9]\d{4,8}$/;
		if(phoneNumber.test(moblePhone)){
			$(".submitAdress").show();
			$(".adress").hide();
			$(".name").text(getName);
			$(".province").text(province);
			$(".city").text(city);
			$(".country").text(county);
			$(".detailAdress").text(detailAdress);
			$(".moblephone").text(moblePhone);
			$(".phone").text(phone);
		}else{
			return;
		}
		});
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	//实现地址的修改
	$("#change").on("click",function(){
		$(".adress").show();
		$(".adress").css("z-index","999");
	});
	});
});
//**************************************************************************************
//定义promise函数
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