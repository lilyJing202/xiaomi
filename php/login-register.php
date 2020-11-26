<?php
echo "1";
/* 
接口说明文档

url: './data/user.php'
type: post
参数：user   用户账号
      pass  用户密码
      type  登录或注册
          = login 登录
          = add   注册 
返回值示例：
{"err":0,"msg":"登录成功"}



*/

error_reporting(0);
// 允许任何来源
header("Access-Control-Allow-Origin:*"); 

// 设置响应头信息
header('Content-Type:text/html;charset=utf-8');

$password=$_REQUEST['password'];
$phone=$_REQUEST['phone'];
$type = $_POST['type'];
//  echo $user.$pass .$type;S
// 连接数据库
$link = mysqli_connect('localhost','root','root','db2010');
if (!$link) {
  die('{"1err":-1,"msg":"连接失败"}');
}

// 控制判断
// echo ($phone);
// echo ($password);
if (!$phone || !$password) {
  // echo ($user.$type.$pass);
  die('1{"err":-2,"msg":"参数错误"}');
} else {

  // 登录
  // echo $type;
  if ($type === 'login') {
    // 查询sql语句
    $login_sql = "select * from xiaomi where phone='$phone' and password='$password'";
    // 执行sql语句
    $login_res = mysqli_query($link,$login_sql);
    $login_arr = mysqli_fetch_all($login_res,1);
    echo $login_arr;
    if (count($login_arr) > 0) {
      echo '{"err":0,"msg":"登录成功"}';
    } else {
      echo '{"err":-3,"msg":"账号或密码错误"}';
    }
  }
  // 注册
  if ($type === 'add') {
    // 先查询注册的账号是否已存在
    $query_sql = "select * from xiaomi where phone='$phone'";
    $query_res = mysqli_query($link,$query_sql);
    $query_arr = mysqli_fetch_all($query_res,1);
    if (count($query_arr) > 0) {
      echo '{"err":-4,"msg":"账号已被占用"}';
    } else {
      // 可以注册，插入数据
      $insert_sql = "insert into xiaomi(phone,password) values('$phone','$password')";
      $num=mysqli_query($link,$insert_sql);
      $num = mysqli_affected_rows($link);
      echo $num;
      if ($num > 0){
        echo '{"err":1,"msg":"注册成功"}';
      } else {
        echo '{"err":-5,"msg":"注册失败"}';
      }
    }
  }

}
// 关闭连接
mysqli_close($link);
?>