define(["jquery","cookie"],function($){

	$.ajax("/PC/pc_project/html/include/header.html").done(function(data){
		$(".Header").html(data);
	}).done(function(){//实现搜索功能
		$("#TopSearch").on("keyup",function(){
			$.getJSON("https://suggest.taobao.com/sug?code=utf-8&q="+ $("#TopSearch").val() +"&callback=?",function(data){
			//实现鼠标按键松开获取收缩内容
			$(".ShowSearchMatch").css("display","block");
			var Data=data.result;
			var ul=$(".ShowSearchMatch");
			var liAll=$(".ShowSearchMatch li");
			for(var arr in Data){
				$(liAll[arr]).html(Data[arr][0]);
				}
			});
		});
		$("body").not("#TopSearch").on("click",function(){
			$(".ShowSearchMatch").css("display","none");
		});
	});
	//异步加载尾部数据
	$.ajax("/PC/pc_project/html/include/footer.html").done(function(data){
		$(".footer").html(data);
	});
});