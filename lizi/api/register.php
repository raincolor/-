<?php 
	header("Access-Control-Allow-Origin:*");

	// 获取注册数据
	$firstname = $_POST["firstname"];
	//$lastname = $_POST["lastname"];
	//$email = $_POST["email"];
	//$accept_lizi_law = $_POST["accept_lizi_law"];
	$password = md5($_POST["password"]);

	// 包含连接文件
	include "conn.php";
	// SQL语句
	$sql = "INSERT INTO userinfo (firstname, password) VALUES('$firstname',  '$password')";
	// 执行SQL语句
	$result = mysql_query($sql);
	$array = array("res_code"=>1, "res_error"=>"");
	if ($result) {
		$res_body = array("status"=>1, "firstname"=>$firstname, "message"=>"");
	} else {
		$res_body = array("status"=>0, "message"=>"有误：" . mysql_error());
	}
	// 构建返回的关联数组
	$array["res_body"] = $res_body;
	// 返回JSON文本
	echo json_encode($array);
	// 关闭
	mysql_close();
 ?>

 