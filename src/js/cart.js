require(["config"], function() {
	require(["jquery", "template", "cookie", "loadHeader","loadFooter"], function($, template) {
		function Cart() {
			this.cart = []; // 购物车数组结构
			// 配置 cookie 自动在JS值与JSON值之间转换
			$.cookie.json = true;
			// 渲染页面
			this.render();
			// 注册事件监听
			this.addListener();
		}
		$.extend(Cart.prototype, {
			// 购物车页面渲染
			render() {
				// 获取cookie中保存的购物车数据
				const cart = this.cart = $.cookie("cart") || [];
				// 判断是否购物车为空
				if (cart.length === 0) {
					$(".none-box").css("display","block");
					$(".page-cont").css("display","none");
					return;
				} else {
					console.log(2);					
					$(".none-box").css("display","none");
					$(".page-cont").css("display","block");
				}

				// 将读取到的购物车数据使用 art-template 渲染
				const html = template("cart-template", {"cart": cart});
				$(".cart-body").html(html);
			},
			// 添加事件监听
			addListener() {
				// 删除链接
				$(".cart-body").on("click", ".list-del", $.proxy(this.delHandler, this));
				// 数量加/减
				$(".cart-body").on("click", ".minus, .add", $.proxy(this.modifyAmountHandler, this))
				// 输入修改数量
				$(".cart-body").on("blur", ".num_val", $.proxy(this.modifyAmountHandler, this))
				// 全选
				$(".chk_all").on("click", this.chkAllHandler);
				// 部分选中
				$(".cart-body").on("click", ".chk_prod", $.proxy(this.chkProdHandler, this));
				// 事件
				$(".cart-body").on("click", ".chk_prod, .minus, .add, .list-del", this.calcTotalHandler);
				// 全选按钮不在.cart-body里
				$(".chk_all").on("click", this.calcTotalHandler);
				//全部删除按钮
				$(".del_all").on("click", $.proxy(this.delAllHandler, this));
			},
			// 删除处理
			delHandler(event) {	
				console.log("删除");
				// 所在行
				const $tr = $(event.target).parents(".td");
				// 待删除商品的 id
				const id = $tr.find(".pro_id").text();
				// 将数组中当前删除的商品对象移除
				this.cart = this.cart.filter(curr=>curr.id!=id);
				// 将修改后的数组存回 cookie
				$.cookie("cart", this.cart, {expires: 10, path: "/"});
				// 页面DOM树中删除行
				$tr.remove();
				//判断是否购物车为空
				let _cart = $.cookie("cart");
				if (_cart.length === 0) {
					$(".none-box").css("display","block");
					$(".page-cont").css("display","none");
					return;
				} else {
					console.log(2);					
					$(".none-box").css("display","none");
					$(".page-cont").css("display","block");
				}
			},
			delAllHandler(){
				$(".chk_prod:checked").each((index, element)=>{
					//TODO:实现选中商品删除
					console.log(index,element);
				});
			},
			// 修改数量处理
			modifyAmountHandler(event) {
				console.log("+-");
				// 所在行
				const
					$src = $(event.target),
					$tr = $src.parents(".td");
				// 当前修改数量的商品id
				console.log($src);
				const id = $tr.find(".pro_id").text();
				// console.log($tr.find(".id"))
				console.log(id);
				// return;
				// let id = 6;
				// 对应商品对象 
				const prod = this.cart.filter(curr=>curr.id==id)[0];
				// 修改数量
				if ($src.is(".add")) // 加
					prod.amount++;
				else if ($src.is(".minus")) { // 减
					if (prod.amount <= 1) // 商品数量最小减到1
						return;
					prod.amount--;
				} else if ($src.is(".num_val")) { // 输入修改
					// 获取输入的数量值
					const _amount = $src.val();
					// 判断是否符合数字合法格式
					const reg = /^[1-9]\d*$/;
					if (!reg.test(_amount)) {
						$src.val(prod.amount);
						return;
					}
					prod.amount = Number(_amount);
				}
				// 保存 cookie
				$.cookie("cart", this.cart, {expires: 10, path: "/"});
				// 显示修改后数量
				$tr.find(".num_val").val(prod.amount);
				// 显示修改后的小计金额
				console.log(prod.price,prod.amount)
				$tr.find(".list-sum").text((prod.price*prod.amount).toFixed(2));
				console.log(this.cart);
			},
			// 全选处理
			chkAllHandler(event) {
				console.log("全选");
				// 获取当前“全选”复选框选中状态
				// checked、selected、disabled 通常使用 .prop() 方法获取/设置
				const status = $(event.target).prop("checked");
				// 让每行前的复选框与“全选”状态保持一致
				$(".chk_prod").prop("checked", status);
			},
			// 部分选中
			chkProdHandler() {
				console.log("部分选择");
				// 获取商品行前选中的复选框个数
				const count = $(".chk_prod:checked").length;
				// 设置“全选”选中状态
				$(".chk_all").prop("checked", count === this.cart.length);
			},
			// 计算合计金额
			calcTotalHandler() {
				console.log("合计")
				let sum = 0,prod_num=0;
				$(".chk_prod:checked").each((index, element)=>{
					sum += Number($(element).parents(".td").find(".list-sum").text());
					prod_num += Number($(element).parents(".td").find(".num_val").val());
					console.log(sum,prod_num);
				});
				$("#total_price").text(sum.toFixed(2));
				$("#total_num").text(prod_num.toFixed(0));
				if(sum==0){
					$("#topay").css("background-color","#CCC");
				}else{
					$("#topay").css("background-color","#ff666b");
				}
			}
		});

		new Cart();
	});
});

// localStorage
// sessionStorage