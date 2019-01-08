require(["config"],function(){
    require(["jquery","template","loadHeader","loadOther","loadFooter","loadSider"],function($,abc){
        function Index(){
            this.init();
        }
        $.extend(Index.prototype,{
            init(){
                this.loadList();
                //this.addHref();
            },
            loadList(){
                console.log(1233);
                $.get("http://rap2api.taobao.org/app/mock/120150/api/list",(date)=>{
                    console.log(date);
                    // var htmlstring = template("模板id", 待渲染数据data);
                    let html = abc("list-template",{products:date.src_body.list});
                    console.log(html);
                    $(".list-pro").html(html)
                })
            },
            addHref(){
                $(".det").attr(href,"/htm/detail.html");
                console.log($(".det").attr(href));
            }
        })

        new Index();
    })
})