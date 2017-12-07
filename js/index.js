require(["config"],function($){
	require(["jquery","template","loadHeaderFooter"],function($){
		var template = require('template');
		$(function(){
			$(window).on("scroll",function(){
				if(Number($(document).scrollTop())>500){
					$(".siderSearch").css("display","block");
				}else{
					$(".siderSearch").css("display","none");
				}
			});
			$("#topSearch").on("keyup",function(){
				searchMatch("#topSearch",".showSearchMatch");
			});
			$("body").not("#topSearch").on("click",function(){
				$(".showSearchMatch").css("display","none");
			});
			//实现侧边栏轮播
			function asideCarousel(id,ID){
				var timer=setInterval(function(){
				$(ID).fadeIn("slow",function(){
					$(ID).fadeOut("slow",function(){
						$(id).fadeIn("slow");
					});
				});
			},2000);
			}
			asideCarousel(".first",".second");
			//处理模拟数据
			$.getJSON("/PC/pc_project/mock/list.json",function(respData){
				//开始处理拿回的数据
				var data={
					products:respData.data
				}
				var html=template("listOne",data);
				$("selection").html(html);
			});
			//处理模拟数据2
			$.getJSON("/PC/pc_project/mock/listT.json",function(respData){
			//开始处理拿回的数据
			var data={
				products:respData.data
			}
			console.log("hh");
			var html=template("listTwo",data);
			$(".dailyNewBottom").html(html);
			});
		});
	});
	
});
 function searchMatch(Id,classname){
	$.getJSON("https://suggest.taobao.com/sug?code=utf-8&q="+ $(Id).val() +"&callback=?",function(data){
		//实现鼠标按键松开获取收缩内容
		$(classname).css("display","block");
		var Data=data.result;
		var ul=$(classname);
		var liAll=$("ul li");
		console.log(liAll)
		console.log(Data);
		for(var arr in Data){
			$(liAll[arr]).html(Data[arr][0]);
		}
	});
}
new Carousel({
				imgs:[{src:"/PC/pc_project/images/ban.jpg",href:"#"},
				{src:"/PC/pc_project/images/banner1.jpg",href:"#"},
				{src:"/PC/pc_project/images/banner2.jpg",href:"#"},
				{src:"/PC/pc_project/images/banner3.jpg",href:"#"},
				{src:"/PC/pc_project/images/banner4.jpg",href:"#"},
				{src:"/PC/pc_project/images/banner5.jpg",href:"#"},
				{src:"/PC/pc_project/images/banner6.jpg",href:"#"}
				],
				width:100,
				height:400,
				isPage:true,
				isAuto:true,
				container:$("#Box"),//轮播图的容器
				duration:3000
}).init();
//实现侧边栏淡入淡出
