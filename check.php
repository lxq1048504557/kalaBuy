<?php
 	$phone = $_GET["phone"];
// 	echo "$phone";
	/* 连接数据库，判断 */
	mysql_connect("localhost:3306", "root", "");
	// 设置读/写库时的编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	// 选择数据库
	mysql_select_db("ajax");
	$sql = "SELECT count(*) FROM regesiter WHERE phone='$phone'";
	// 执行查询，返回查询结果集
	$result = mysql_query($sql);
	// 读取查询结果中的数据
	if ($row = mysql_fetch_array($result)) {
		if ($row[0] == "1")
			echo '{"status":1,"message":"exist"}';
		else
			echo '{"status":0,"message":"not exist"}';
	} 
	// 关闭数据库连接
	mysql_close();
?>