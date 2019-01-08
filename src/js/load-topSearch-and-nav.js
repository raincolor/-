/* 加载头部和尾部 */
// 定义模块，复用
define(["jquery"], function($) {
	// 构造函数
	function HeaderAndFooter() {
		this.init();
	}

	// 扩展原型
	$.extend(HeaderAndFooter.prototype, {
		// 初始化
		init() {
			this.loadHeader();
			this.loadFooter();
		},
		// 加载头部
		loadHeader() {
			$.get("/htm/include/headSearch.html", (data)=>{
				$(".head-bottom").html(data);
				// 头部内容加载完毕并渲染完成后，还需要添加交互
				this.headerHandler();
			});
		},
		// 加载尾部
		loadFooter() {
			$(".nav").load("/htm/include/topNav.html");
		},
		// 添加头部交互
		headerHandler() {
			
			// 搜索提示
			$(".search :text").on("keyup", this.suggestHandler);
			// 点击提示：事件委派
			$(".suggest").on("click", "div", (event) => {
				$(".search :text").val($(event.target).text());
				// <==>
				// $(".search :text")[0].value = event.target.innerText;
				// 隐藏提示
				$(".suggest").hide(); // $(".suggest")[0].style.display = "none"
			})
		},
		// 搜索提示
		suggestHandler(event) {
			const
				word = $(event.target).val(), // 从文本框中获取输入值
				url = `https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=?`; // jsonp接口URL
			// jsonp跨域请求淘宝建议接口
			$.getJSON(url, (data) => {
				console.log(data)
				let html = "";
				data.result.forEach((curr) => {
					html += `<div>${curr[0]}</div>`;
				});
				$(".suggest").show().html(html);
			});
		}
	});

	return new HeaderAndFooter();
});