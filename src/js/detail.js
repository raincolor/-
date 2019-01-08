require(["config"],function(){
    require(["jquery","template","loadHeader","loadFooter","loadSider","cookie", "fly", "zoom"],function($,template){
        function Init(){
            this.render();
            this.addListener();
            this.zoomSmall();
            // 配置 cookie 自动在JS值与JSON值之间转换
			$.cookie.json = true;
        }
        $.extend(Init.prototype,{
            render(){
               const _id = location.search.slice(location.search.lastIndexOf("=")+1);
                
                // 获取当前待加载商品的 id
                const 
                    testApi = "http://rap2api.taobao.org/app/mock/120150/api/zoon";

				// 假数据接口
				$.getJSON(testApi, (data)=>{
					console.log(data);
                    const {title, desc, price, details, id, img,} = data.res_body;
                    //console.log(deta.src_body);
					const html = template("detail-template", {"id": _id, "img": img, "title": title, "desc": desc, "price": price, "details": details})
					// console.log(html);

					$(".begin").html(html);
					// 放大镜
					/* $(".zoom-img").elevateZoom({
						gallery:'gal1',
						cursor: 'pointer',
						galleryActiveClass: 'active',
                        borderSize:'1',    
                        borderColour:'#888',
					});  */
				});
            },
            addListener() {
                // $("div.btn_form form").on("submit", this.addToCartHandler)
                $("#buy_btn").on("click",this.addToCartHandler);
                //
                $(".sk-num").on("click",this.disAmount);
            },
            //处理加减商品数量
            disAmount(event){
                console.log("+-");
                const $src = $(event.target);
				let amount = $(".num_val").val();
				// 修改数量
				if ($src.is(".add")) // 加
					amount++;
				else if ($src.is(".minus")) { // 减
					if (amount <= 1) // 商品数量最小减到1
						return;
					amount--;
				} else if ($src.is(".num_val")) { // 输入修改
					// 获取输入的数量值
					const _amount = $src.val();
					// 判断是否符合数字合法格式
					const reg = /^[1-9]\d*$/;
					if (!reg.test(_amount)) {
						$src.val(amount);
						return;
					}
					amount = Number(_amount);
				}
				
				$(".num_val").val(amount);
            },
            // 添加到购物车处理
            addToCartHandler(event) {
                // 获取当前选购的商品对象
                const $parent = $(".prod-detail");
                const currentProduct = {
                    id: $parent.find(".pro-id").text(),
                    title: $parent.find(".title").text(),
                    price: $parent.find("#s_nowprice").text(),
                    img: $parent.find("#img_info").attr("src"),
                    amount: $(".num_val").val(),
                };
                console.log(currentProduct)

                // 获取在 cookie 中已保存的购物车数组
                const cart = $.cookie("cart") || [];
                console.log(cart);
                // 判断在 cart 数组中是否存在当前选购的商品对象
                const has = cart.some(curr=>{
                    if (curr.id == currentProduct.id) { // 已有选购
                        curr.amount = Number(currentProduct.amount)+Number(curr.amount); // 增加数量
                        return true;
                    }                                                           
                    return false;
                });
                // 如果未选购过
                if (!has){
                    cart.push(currentProduct);
                    console.log("没有这件商品");
                }
                // 将购物车的数组保存到 cookie 中
                $.cookie("cart", cart, {expires: 10, path: "/"});
                // alert("商品添加成功");
                /* 添加成功，抛物线效果 */
                // 抛物线终点
                const
                    end = $(".sb_cart").offset(),
                    start = {
                        top: event.pageY - $(window).scrollTop(),
                        left: event.pageX
                    },
                    flyer = $("<div></div>").css({
                        width: 20,
                        height: 20,
                        background: "#f00"
                    });
                end.top -= $(window).scrollTop();
                //TODO: ...
                flyer.fly({
                    start,
                    end,
                    onEnd() {
                        this.destroy();
                    }
                });
                //改变侧边栏数量
                let num = 0;
                cart.some(curr=>{
                    num += Number(curr.amount);
                });
                console.log("数量---"+num);
				$("#sidebar_cartnum").text(num);

                console.log(start)
                return false;
            },
            zoomSmall(){
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColour:'#888',
                }); 
                $("img",".view-ul").on("click",function(event){
                    const
                        $src = $(event.target),
                        $li = $src.parents("li"),
                        $lis = $src.parents("ul").children("li");
                    $lis.removeClass("current");

                    $li.addClass("current");
                })
            }
        })
        new Init();
    })
})