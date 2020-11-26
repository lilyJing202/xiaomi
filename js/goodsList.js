// 搜索框内容自动变化
var sInp=document.querySelector(".search>input")
console.log(1);
var arr=["哼唧哼唧","嘻嘻哈哈","叽哩哇啦","哼哈哼哈","哼哼哈哈","哇哦哇哦哇哦哇哦"]
var index=0;
  sInp.placeholder=arr[0];
  setInterval(function(){
    sInp.placeholder=arr[index];
    index++;
    if(index===arr.length){
      index=0
    }
  },5000)

  $(function(){
    // 从后台或者其他渠道  加载商品数据  这里是通过给的json数据 
    // 加载商品数据
    $.ajax({
        url:'./data/goodslist.json',
        type:'get',
        dataType:'json',
        // 从./data/goods.json中取出数据展示在页面   记得要在服务器打开
        success:function(jsonArr){
            $.each(jsonArr,function(index,item){
            //     var goodsDom=`<div class="goods">
            //     <img src="${item.imgurl}" alt="">
            //     <p>${item.price}</p>
            //     <h3>${item.title}</h3>
            //     <div code="${item.code}">加入购物车</div>
            // </div>`;//此处将code保存在页面方便底下保存数据到localstorage
                var goodsDom=`
                <li class="goods">
                        <img src="${item.imgurl}" alt="">
                       <div class="img-right">
                        <h3 class="title">${item.title}</h3>
                        <p class="desc">${item.desc}</p>
                        <span class="price">${item.price}</span>
                        <div class="add" code="${item.code}" >加入购物车</div>
                       </div>
                    </li>`
            $('.list').append(goodsDom);
            })
        } 
    });

// 点击加入购物车   
//  思想：将页面中选中加入购物车的商品编码保存在本地存储 localStorage中
// localStorage中保存格式  key/ value
// 即   goods/ [{code: 'abc1',num: 1},{code: 'abc1',num: 1}]  这种格式方便存数据
$(".list").on("click",".goods .add",function(){
    // 判断之前是否加入过购物车  如果加入过只需num++，没加过创建本地储存，将数据储存到localstorage中
    var goodsArr=[];
    if(localStorage.getItem('goods')){
        goodsArr=JSON.parse(localStorage.getItem('goods'));
    }

    // 当前商品的编码
    var code = $(this).attr('code');
    console.log(this,code);
    // 标记是否已经加入过购物车
    var flag = false;
    $.each(goodsArr,function (index,item){
        if (item.code === code) {
            item.num++;
            flag = true;
            return false;
        }
    })
    // 购物车没有此商品，push {code: 'abc1',num: 1}
    if (!flag) {
        goodsArr.push({"code": code,"num": 1});
    }
    // 数据存储到 localStorage中
    localStorage.setItem('goods',JSON.stringify(goodsArr));
    alert('加入购物车成功！');
    
    // alert(localStorage.getItem('goods'))
})


})