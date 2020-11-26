$(function () {
    // 判断购物车是否有数据
    if (localStorage.getItem('goods')) {
        var goodsArr = JSON.parse(localStorage.getItem('goods'));
        // 加载保存在本地存储的数据
        $.ajax({
            url: "./data/goodslist.json",
            type: "get",
            dataType: "json",
            success: function (jsonArr) {
                console.log(jsonArr);
                $.each(goodsArr, function (index, item) {
                    $.each(jsonArr, function (i, obj) {
                        console.log(obj.code);
                        if (item.code === obj.code) {
                            var goodsDom = `<li class="goods">
                                  <input type="checkbox" checked>
                                  <img src="${obj.imgurl}" alt="">
                                <div class="img-right">
                                  <h3 class="title">${obj.title}</h3>
                                  <p class="desc">${obj.price}</p>
                                  <span class="num">${item.num}</span>
                                  <span class="price">${obj.price*item.num}</span>
                                <div class="delete" code=${obj.code} >x</div>
                                </div></li>`
                            $('.list').append(goodsDom);
                        }
                    })
                })
            }
        })

            // 删除购物车商品
            $('.list').on('click','li .delete',function(){
                // 删除保存的数据
                var code=$(this).attr('code');
                // 保存的数据是以数组格式保存的   删除数据元素   pop()  unshift()  splice(start,1)
                $.each(goodsArr,function(index,item){
                    if(item.code === code){
                        goodsArr.splice(index,1);
                        return false;
                    }
                });
                if(goodsArr.length >0 ){
                    // 把更新的数据更新到本地储存
                    localStorage.setItem('goods',JSON.stringify(goodsArr));
                }else{//没有数据直接清空本地储存
                    localStorage.clear();
                    var newLi = '<li style="line-height:80px; text-align:center; color: #999;background:#fff;width:100%;">购物车暂无数据！</li>';
                    $('.list').html(newLi);
                }


                // 删除页面的商品
                $(this).parent().parent().remove();
                alert('商品成功移除购物车！')
            })


        }else{
            var newLi='<li style="line-height:80px; text-align:center; color: #999; background:#fff;width:100%">购物车暂无数据！</li>';
            $('.list').html(newLi);
    }
})