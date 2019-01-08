require(["config"], function() {
	require(["jquery","loadFooter"], function($) {
		function Register() {
			var flag = false;
			this.addListener();
			
		}

		$.extend(Register.prototype, {
			 oo : this,
			// 注册事件监听 
			addListener() {
				//TODO:添加表单验证
				$(".submit_btn").on("click", $.proxy(this.registerHandler,this));
				$(".pass1,.pass2").on("blur",this.dePassword);
				$(".security_code").on("click",$.proxy(this.security, this));
			},
			// 注册处理
			registerHandler() {		
				console.log(this.dePassword());
				if(this.dePassword()){
					// 获取注册信息
					const data = $(".register_infor").serialize();
					// console.log(data);
					// return 1;
					// POST请求注册API
					$.post("http://127.0.0.1/lizi/api/register.php", data, (res)=>{
						// console.log(res)
						if (res.res_body.status === 1) { // 注册成功
							location = "/htm/login.html";
							console.log("成功")
						} else { // 注册失败
							$(".register-error").removeClass("hidden");
							console.log("失败")
						}
					}, "json");

					return false;
				}else{
					return false;
				}	
				
			},
			dePassword(){
				//获取两次输入密码
				let 
					pass1 = $(".pass1").val(),
					pass2 = $(".pass2").val();
				
				//密码正则，4到16位（字母，数字，下划线，减号）
				let u_pass = /^[a-zA-Z0-9_-]{4,16}$/;
				//console.log(u_pass.test("iFat3"));
				if(u_pass.test(pass1)){
					$(".pass1").parent(".input_box").next(".error_box").text("");
					//判断第二次密码格式
					if(u_pass.test(pass2)){
						$(".pass2").parent(".input_box").next(".error_box").text("");
						//判断两次密码是否相同
						if(pass2===pass1){
							$(".pass2").parent(".input_box").next(".error_box").text("");
							return true;
						}else{
							$(".pass2").parent(".input_box").next(".error_box").text("两次密码不一致");
							return false;
						}
					}else{
						$(".pass2").parent(".input_box").next(".error_box").text("请输入正确的密码格式：4到16位（字母，数字，下划线，减号）");
						return false;
					}
				}else{
					$(".pass2").parent(".input_box").next(".error_box").text("");
					$(".pass1").parent(".input_box").next(".error_box").text("请输入正确的密码格式：4到16位（字母，数字，下划线，减号）");
					return false;
				}

			},
			security(){
				console.log(this.dePassword());
				//TODO:短信验证
			}


		});

		new Register();
	});
});
