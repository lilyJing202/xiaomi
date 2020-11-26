var password=document.querySelector('.password');
var phone=document.querySelector('.phone');
var login=document.querySelector('.login');
   // 登录
   login.onclick = function () {
    var ps=password.value;
    var phones=phone.value;
console.log(ps,phones)
    // 验证
    if (!phones || !ps) {
      alert('账号或密码不能为空');
      return;
    }

    // 提交数据
    ajax({
      url: './php/login-register.php',
      type: 'post',
      data: {
        password: ps,
        phone: phones,
        type: 'login'
      },
    //   dataType:"json",
      success: function (json) {
        start = json.indexOf("{", 0);//Array{"err":0,"msg":"登录成功"}
        res1 = json.slice(start);//{"err":0,"msg":"登录成功"}
        // res2=JSON.parse(res1);//将JSON格式的字符串转成JSON对象  不然无法遍历就无法使用   获取的数据都要进行使用
        // console.log(res2)
        if(res1 === '{"err":0,"msg":"登录成功"}'){
            alert ('登陆成功');
            location.href='xiaomi.html';
        }else{
            alert('账号或密码错误，请重新登陆');
            location.href='login.html';
        }
      console.log(json);
      },
      error: function (code) {
        alert(code);
        location.href='login.html';
      }
    })

  }