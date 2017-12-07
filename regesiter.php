<?php
	//获取注册页面的输入内容，再将其保存到数据库
	header("Access-Control-Allow-Origin: *");
	$password=$_POST["password"];
	$phone=$_POST["phone"];
	//连接服务器
	mysql_connect("localhost:3306","root","");
	//读写数据库编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	//选择连接的数据库名
	mysql_select_db("ajax");
	//执行sql语句编写
	$sql="INSERT INTO regesiter(password,phone) VALUE( '$password','$phone')";
	//执行数据库语言
	$result=mysql_query($sql);
	if($result){
		echo '{"status":1,"message":"success"}';
	}else{
		echo '{"status":0,"message":"failed"}';
	}
	
	mysql_close();
?>