require.config({
	baseUrl: "/", // webserver根目录
	paths: { // 模块短名称路径配置
		jquery: "lib/jquery/jquery-1.12.4.min", // jQuery短名称
		loadHeader: "js/load-header", // 加载头
		loadFooter: "js/load-footer", // 加载尾
        loadOther:"js/load-topSearch-and-nav", //加载搜索和导航
		loadSider:"js/load-sider",	//加载侧边栏
		template: "lib/art-template/template-web", // art-template
		swiper:"lib/swiper/js/swiper.min", //轮播图
		cookie: "lib/jquery-plugins/jquery.cookie", // cookie插件
		fly: "lib/jquery-plugins/jquery.fly.min", // 抛物线插件，不遵循AMD规范
		zoom: "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min", // 放大镜插件
	},
	shim: {
		fly: { // 这是jQuery插件，依赖于 jQuery 模块
			deps: ["jquery"]
		},
		zoom: {
			deps: ["jquery"]
		}
	}
});