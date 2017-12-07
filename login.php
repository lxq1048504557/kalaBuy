<?php
  $phone=$_POST["phone"];
  $password=$_POST["password"];
  //建立服务器连接
  mysql_connect("localhost:3306","root","");
  //读写数据库编码
  mysql_query("set character set utf8");
  mysql_query("set names utf8");
  //选择数据库连接
  mysql_select_db("ajax");
  //编写操作,登录主要是将用户输入的与数据库的数据进行匹配,为什们不能用查询全部
  $sql="SELECT  phone,password FROM regesiter WHERE phone='$phone' AND password='$password'";
  //执行数据库操作
  $result=mysql_query($sql);
  if ($row=mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo '{"status":1,"message":"success","data":'. json_encode($row) .'}';
	} else {
		echo '{"status":0,"message":"failed","data":{}}';
	}
  mysql_close();
?>