require(["config"], function() {
	require(["jquery", "template","swiper", "loadHeader","loadFooter","loadOther","loadSider"], function($, template,Swiper) {
		function Index() {
			this.loadHotProducts();
			this.swip();
			this.doTimer();
			// this.timeDown(2025,1,1,1,1,1);
		}
		$.extend(Index.prototype, {
			// 加载渲染热销商品
			loadHotProducts() {
				$.getJSON("http://rap2api.taobao.org/app/mock/120150/api/hot", (data)=>{
					// console.log(data)
					// var htmlstring = template("模板id", 待渲染数据data);
					const html = template("prod-template", {products: data.src_body.list})
					// console.log(html);
					// console.log($("ul.grid_2"))
					$("ul.grid_2").html(html);
				});				
			},
			//轮播图
			swip(){
				var mySwiper1 = new Swiper('.swiper-container', {
					autoplay: true,//可选选项，自动滑动
					loop : true,//循环
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
						clickable :true, //点击分页器控制
					},
					//左右按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				})
			},
			//temail_timer
			doTimer(){
				this.orderTimer($(".temail_timer"),2021,1,1,0,0,0);

			},
			//定时器更新倒计时
			orderTimer(ele,y,m,d,h,min,s){
				
				let _orderTimer = setInterval(()=>{
					let tempTimer = this.timeDown(y,m,d,h,min,s);
					// console.log(tempTimer);
					// console.log(window)
					if (tempTimer.days <= 0 && tempTimer.hours <= 0 && tempTimer.minutes <= 0 && tempTimer.seconds <= 0) {
						 window.clearInterval(_ordertimer);
						_ordertimer = null;
					}
					let htm = `<i class="iconfont icon-huo1">:</i>
					<span class="s">剩余时间：</span>
					<em>${tempTimer.days}</em>
					<span>天</span>
					<em>${tempTimer.hours}</em>
					<span>时</span>
					<em>${tempTimer.minutes}</em>
					<span>分</span>
					<em>${tempTimer.seconds}</em>
					<span>秒</span>`
					ele.html(htm);
				},1000);
			},
			//倒计时
			timeDown(y,m,d,h,min,s){				
				function checkTime(i) { //将0-9的数字前面加上0，例1变为01
					  if (i < 10) {
					  i = "0" + i;
					  }
					  return i;
					 }
		
				let data = new Date();
				 data.setFullYear(y);
				 data.setMonth(m)
				 data.setDate(d)
				 data.setHours(h)
				 data.setMinutes(min)
				 data.setSeconds(s);//设置时间
		
				//  console.log(data);
		
				let leftTime = (new Date(data)) - new Date(); //计算剩余的毫秒数
				let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
				let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
				let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
				let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数

					// console.log(days,hours,minutes,seconds)
				days = checkTime(days);
				hours = checkTime(hours);
				minutes = checkTime(minutes);
				seconds = checkTime(seconds);
		
				let dateObj = {};
				dateObj = {
					days : days,
					hours : hours,
					minutes : minutes,
					seconds : seconds
				}
				return dateObj;
			},

		});
		new Index();
	});
});
