require(["config"], function() {
	require(["jquery","cookie","loadFooter"], function($) {
		function Login() {
			// console.log(000);XXX:严格模式下不允许直接使用0开头的数字
			this.addListener();
			$.cookie.json = true;
			console.log(123);
		}

		$.extend(Login.prototype, {
			// 登录事件监听 
			addListener() {
				$(".login").on("click", this.loginHandler);
			},
			// 登录处理
			loginHandler() {
				console.log(1113);
				// 获取登录信息
				const data = $("#login_form").serialize();
				console.log(data);
				// POST请求登录API
				$.post("http://127.0.0.1/lizi/api/login.php", data, (res)=>{
					console.log(res)
					if (res.res_body.status === 1) { // 登录成功
						// 将登录成功的用户信息保存到 cookie 中
						$.cookie("loginUser", res.res_body.info.firstname, {path: "/"});
						console.log($.cookie("loginUser"));
						location = "/";
					} else { // 登录失败
						$(".error").text("用户名或密码错误！");
					}
				}, "json");

				return false;
			}
		});

		new Login();
	});
});
