require(["config"],function($){
	require(["jquery","loadHeaderFooter"],function($){
	 	$("#btn").on("click",function(){
	 		$("#codeJpg").show();
	 		$.getJSON("http://route.showapi.com/932-2?showapi_appid=49973&showapi_sign=17157def3c2b4d1b9689ea3d7b5bf55b",function(respData){
	 		var code=respData.showapi_res_body;
	 		$("#codeJpg").attr("src",code.image);
	 		$("#codeJpg").attr("sid",code.sid);
	 		});
	 	});
	    $("#code").on("blur",function(){
	    	var str=$("#codeJpg").attr("sid");
	    	var value=$(this).val();
	    	$("#information").show();
	    	$.getJSON("http://route.showapi.com/932-1",{"showapi_appid":"49973","showapi_sign":"17157def3c2b4d1b9689ea3d7b5bf55b","checkcode":value,"sid":str},function(data){
	    		$("#code").attr("isRightWrong",data.showapi_res_body.valid);
	    		if(data.showapi_res_body.valid)
					$("#information").html("验证码输入正确")
				else
					$("#information").html("验证码输入有误");

	    	});
	    });
	    //验证该手机是否已经被注册
	    $("#phone").on("blur",function(){
	    		//匹配手机号，正则表达式验证
	    		var value=$(this).val();
	    		var Reg=/^[\d]{5,20}$/;
	    		if(Reg.test(value)){
	    			//成功后才执行对check.php的访问
	    			$.ajax({
						url:"/PC/pc_project/check.php",
						dataType:"json",
						data:{phone:$("#phone").val()},
						success:function(rspData){
							console.log(rspData);
							console.log(rspData.status);
							if(rspData.status===1){
								$("#info").html("该手机号已被注册，请登录") ;
							}else{
								$("#info").html("可以使用");
							}
						}
					});
	    		}else{
	    			alert("手机号输入有误！请重新输入");
	    			$(this).val("");
	    		}
	});
	//将用户注册信息保存到数据库中
	 	$("#sub").on("click",function(){
	 		if(Boolean($("#code").attr("isRightWrong"))){
	 			$.ajax({
	 			type :"post",
				url:"/PC/pc_project/regesiter.php",
				dataType:"json",
				data:{
					password:$("#password").val(),
					phone:$("#phone").val()
				},
				success:function(rePdata){
					if(rePdata.status===1){
//						console.log($("#code").attr("isRightWrong"));
						location="http://localhost/PC/pc_project/html/login.html";
					}else{
						$("#info").html("注册失败");
					}
					}
	 			});
	 		}
		});
	});
});