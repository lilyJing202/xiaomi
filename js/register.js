var password=document.querySelector('.password');
var phone=document.querySelector('.phone');
var register=document.querySelector('.register');
// 注册

register.onclick=function(){
    console.log(password.value)
    var ps=password.value;
    var phones=phone.value;
    console.log(ps)
    if(!ps || !phones){
        alert('账号或密码不能为空');
        return;
    }
    ajax({
        url: './php/login-register.php',
        type: 'post',
        data: {
            type: 'add',
            password: ps,
            phone: phones,
        },
        // dataType: 'json',
        success: function (json){
            start = json.indexOf("{", 0);//Array{"err":0,"msg":"登录成功"}
        //   console.log(start);
          res1 = json.slice(start);//{"err":0,"msg":"登录成功"}
        //   console.log(res1);
        //   res2=JSON.parse(res1);//将JSON格式的字符串转成JSON对象  不然无法遍历就无法使用   获取的数据都要进行使用
          // alert(res1)
          if(res1==='{"err":-4,"msg":"账号已被占用"}'){
              alert('账号已被占用,请重新注册')
            location.href='register.html'
          }else{
            alert('恭喜注册成功')
            location.href='xiaomi.html' 
          }
            
        },
        error: function (code){
            // alert(code);
            location.href='register.html'
        }
    });

}