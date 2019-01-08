define(["jquery", "cookie"], function($) {
	// 构造函数
	function HeaderAndFooter() {
		// 配置 cookie 自动在JS值与JSON值之间转换
		$.cookie.json = true;
		this.init();
	}

	// 扩展原型
	$.extend(HeaderAndFooter.prototype, {
		// 初始化
		init() {
			this.loadSider();
			// this.showTotalMum();
		},

		// 加载侧边栏
		loadSider() {
			$(".sider-left").load("/htm/include/sider.html",function(){
				const cart = $.cookie("cart") || [];
				let num = 0;
				if(cart.length===0){
					return ;
				}else{
					cart.some(curr=>{
						num += Number(curr.amount);
					});
				}
				//TODO:侧边栏显示购物车中的数量
				console.log("数量---"+num);
				$("#sidebar_cartnum").text(num);
				console.log($("#sidebar_cartnum"));
			});
			
		},
		//显示购物车物品数量
		

	});

	return new HeaderAndFooter();
});