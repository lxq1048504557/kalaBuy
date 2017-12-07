require(["config"],function($){
	require(["jquery","cookie","loadHeaderFooter"],function($){
		//首先实现获取验证码
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
	    		$("#code").attr("isRightWrong",data.showapi_res_body.valid);//设置私有属性
	    		if(data.showapi_res_body.valid)
					$("#information").html("验证码输入正确")
				else
					{
						$("#information").html("验证码输入有误");
					};
				
	    	});
	    });
	    //这个是没有点击保存10天免登陆的时候的登录，当点击登录按钮实现用户输入的手机号与密码是否与数据库的内容是否一致 
	    $("#sub").on("click",function(){
	    	if($("#code").attr("isRightWrong")){//当验证码输入正确时才能执行
		    		//获取用户输入的手机号与密码
		    	var phone=$("#phone").val(),
		    		password=$("#password").val();
		    	//当用户点击10天免登陆的时候。将用户信息保存到cookie中保存时间是10天；
		    	var user={
		    		Phone:phone,
		    		Password:password
		    	};
		    	 $.cookie.json=true;
		    	 var userInfo=$.cookie("usersInfo")||[];
		    	 var index=exist(user.Phone,userInfo);//查找用户手机号是否已经存在
		    	if($("#checkbox").prop("checked")){
		    		if(index!==-1){//则说明是存在的，则只需要将时间在增长10天
		    			$.cookie("usersInfo",userInfo,{expires:10,path:"/"});
		    		}else{
		    			userInfo.push(user);
		    			$.cookie("usersInfo",userInfo,{expires:10,path:"/"});
		    		}
		    	}
		    	$.ajax({
		    			type:"post",
						url:"/PC/pc_project/login.php",
						dataType:"json",
						data:{
							phone:$("#phone").val(),
							password:$("#password").val()
						},
						success:function(rspData){
							console.log(rspData);
							console.log(rspData.status);
							if(rspData.status===1){
								$("#info").html("登录成功") ;
								location="http://localhost/PC/pc_project/index.html";
							}else{
								$("#info").html("登录失败");
							}
						}
					});
	    	};
	    	
	    });
	});
});
//定义函数，查找用户是否已经在cookie中是否储存在
function exist(phone,arr){
	for(var i=0;i<arr.length;i++){
		if(phone===arr[i].phone){
			return i;
		}
	}
	return -1;
}
