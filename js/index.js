var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  //  自动播放
        autoplay: {
          true:true,
          delay: 5000,//1秒切换一次
        },

    // autoplay:true,{}
      
  })  
  mySwiper.el.onmouseover = function(){
    mySwiper.autoplay.stop();
  }
  
  //鼠标离开开始自动切换
  mySwiper.el.onmouseout = function(){
    mySwiper.autoplay.start();
  }

  // 搜索框内容自动变化
  var sInp=document.querySelector(".search>input")
  var arr=["哼唧哼唧","嘻嘻哈哈","叽哩哇啦","哼哈哼哈","哼哼哈哈"]
  var index=0;
  sInp.placeholder=arr[0];
    setInterval(function(){
      sInp.placeholder=arr[index];
      index++;
      if(index===arr.length){
        index=0
      }
    },3000)

   

    var right=document.querySelector('.right')
    var left=document.querySelector('.left')
    var smallBanner=document.querySelector('.small-banner')
    var listBanner=document.querySelector('.list-banner')
    // right.onclick = function(){
    //   // animate(smallbox,3968,500);
    //   var current = listBanner.offsetWidth;
    //   console.log(current);
    //   // var target=3698+'px';
    //   smallBanner.style.left +=-current + "px"; 
    //   // smallBanner.style.scrollLeft+=-current+'px';
    // }
  
    function autoPlay(){
      var i=0;
    timer=setInterval(function(){
     i++;
     animate(smallBanner,-992*i,10);
       if(i === 3){
         i=-1
       }
    },5000)
    }
    autoPlay()
		right.onclick = function(){
     var i=0;
      i++;
      animate(smallBanner,-992*i,10);
        if(i === 3){
          i=-1
        }
        clearInterval(timer)
		}
		left.onclick = function(){
			animate(smallBanner,0,10);
		}

		
		/* for (var i = 0; i < div.length; i++) {
			div[i].onmouseover = function(){
				animate(this,500,30);
			}
		}
		 */
		
		//var timer = null;//要解决下面的问题，就要让这个timer私有化
		//如何私有化？将timer保存在obj(当前运动的元素对象)下面
		function animate(obj,target,speedTime){
			//问题：开启多个物体的运动，有可能后面物体的运动把前面一个物体的运动清除
			//如何解决？
			clearInterval(obj.timer);//清除的是当前运动的obj中的timer
			//将运动程序的定时器保存在当前obj中
			obj.timer = setInterval(function(){
				var current = obj.offsetLeft;
				// console.log(current);
				var speed = (target - current)/10;
				speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);
				if(target === current){//
					clearInterval(obj.timer);
				}else{	
					obj.style.left = current + speed + "px";  
				}
			},speedTime);
		}
		
  // 加载数据
  $(function(){
    // 从后台或者其他渠道  加载商品数据  这里是通过给的json数据 
    // 加载商品数据
    $.ajax({
        url:'./data/goods.json',
        type:'get',
        dataType:'json',
        success:function(jsonArr){
            $.each(jsonArr,function(index,item){
            var goodsDom=`<a href="./goodsList.html">
            <div class="smallbox">
                  <li style="border-top:1px solid red"></li>
                  <img src="${item.imgurl}"alt="">
                  <h3 class="title">${item.title}</h3>
                  <p class="desc">${item.desc}</p>
                  <p class="price">
                      <span>${item.price1}</span>元
                      <del>${item.price2}</del>
                  </p>
                </div>
            </a>`
            $('.small-banner').append(goodsDom);
            })
        } 
    });
    
  })

  var col=document.querySelectorAll('.small-banner>a>.color');
  var movement=document.querySelector('.movement');
  console.log(col)
  for(var i=0;i<col.length;i++){
    col[i].style.color=getRandColor();
    col[i].style.borderTop='1px solid';
   
  }
  movement.style.borderTop='1px solid';
  function getRandColor() {
    return "rgba(" + getRand(0, 255) + "," + getRand(0, 255) + "," + getRand(0, 255) + "," + "1" + ")";
  }
  function getRand(min,max){
    return parseInt(Math.random()*(max-min+1) + min);
  };
  