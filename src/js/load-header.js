/* 加载头部和尾部 */
// 定义模块，复用
define(["jquery","cookie"], function($) {
	// 构造函数
	function HeaderAndFooter() {
		$.cookie.json = true;
		this.init();
	}

	// 扩展原型
	$.extend(HeaderAndFooter.prototype, {
		// 初始化
		init() {
			this.loadHeader();
		},
		// 加载头部
		loadHeader() {
			$.get("/htm/include/headTop.html", (data)=>{
				$(".head-top").html(data);
				// 头部内容加载完毕并渲染完成后，还需要添加交互
				this.headerHandler();
			});
		},
		// 添加头部交互
		headerHandler() {
			let user = $.cookie("loginUser")|| [];
			let htm= `
			<a href="/htm/cart.html">${user}</a><span>&nbsp;&nbsp;</span>
            <a class="exit" href="/htm/login.html">[退出]</a>
			`;
			let userHtml = `
			
			<li class="more_menu" id="header_guanzhu">
				<a href="javascript:;">我的丽子</a><i class="iconfont arrow3 icon-arrow3"></i>
				<ul class="more_bd">
					<li><a href="#">我的订单</a></li>
					<li><a href="#">我的订单</a></li>
					<li><a href="#">我的订单</a></li>
					<li><a href="#">我的订单</a></li>
				</ul>
			</li>`
			
			console.log(user);
			if (user.length !== 0) {
				console.log(1);
				//登录后头部显示用户名
				$(".topbar_user").html(htm).after(userHtml); 
				//点击退出清空cookie用户
				$(".exit",".topbar_user").on("click",()=>{
					console.log("**********************************");
					$.removeCookie("loginUser");
				})
				return;
			} else {
				console.log(2);					
				// $(".none-box").css("display","none");
				// $(".page-cont").css("display","block");
			}
		},
		
	});

	return new HeaderAndFooter();
});