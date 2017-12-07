require(["config"],function($){
	require(["jquery","loadHeaderFooter","cookie","template"],function($){
		var template=require('template');
		//从cookie中将上一个值读取出来
		$.cookie.json=true;
		var _products=$.cookie("products")||[];
		if(_products.length===0){//说明没有,就直接跳到详情页面
			location="http://localhost/PC/pc_project/html/detail.html";
		}else{
			var data={
			product:_products
			}
			var html=template("cart_products",data);
			$(".cart_body").html(html);
		}
//***********************************************************************************
	//实现删除操作
	$(".cart_body").on("click",".del",function(){
		var parent=$(this).parent().parent(),
			id=$(parent).children(".id").val();
		var index=exist(id,_products);
		//先找到商品，再在cookie中删除
		_products.splice(index,1);
		$.cookie("products",_products,{expires:7,path:"/"});
		//页面中删除
		parent.remove();
		calcTotal()
		});
//***********************************************************************************
	//实现购物车页面的额数量的加减
	$(".cart_body").on("click",".minus,.add",function(){
		var data=$(this).parent().parent();
		var id=$(data).find(".ID").val();
		//先查找id的商品对象所在的索引
		var index=exist(id,_products);
		console.log(id);
		if($(this).is(".minus")){
			if(_products[index].amount===1){
				return;
			}else{
				_products[index].amount--;
			}
		}else if($(this).is(".add")){
			_products[index].amount++;
		}
		//cooike中保存
		$.cookie("products",_products,{expires:7,path:"/"});
		//a修改页面数量
		data.children(".amount").find(".amount_val").val(_products[index].amount);
		data.children(".sub").text((_products[index].amount*_products[index].Price).toFixed(2));
		calcTotal()
	});
//*******************************************************************************************
	//失焦事件
	$(".cart_body").on("blur",".amount_val",function(){
		var data=$(this).parent().parent();
		var id=data.children(".id").val();
		//先查找id的商品对象所在的索引
		var index=0;
		_products[index].amount=data.children(".amount").find(".amount_val").val();
		//保存cookie
		$.cookie("products",_products,{expires:7,path:"/"});
		data.children(".amount").find(".amount_val").val(_products[index].amount);
		data.children(".sub").text((_products[index].amount*_products[index].Price).toFixed(2));
		calcTotal()
	});
//******************************************************************************************
//实现全选状态，设置，前面所有状态设置一样
	$("#ck_all").on("click",function(){
		//获取全选的状态,这里的this是DOM元素
		var status=$(this).prop("checked");
		$(".ck_prod").each(function(index,element){
			$(this).prop("checked",status);
		});
		calcTotal()
		});
//*******************************************************************************************
//实现当下面的ck全部选中时，全选也要选中
	$(".cart_body").on("click",".ck_prod",function(){
		var status=$(".ck_prod:checked").length===$(".ck_prod").length;
		$("#ck_all").prop("checked",status);
		calcTotal()
		});
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
function calcTotal() {
	// 合计金额
	var sum = 0;
	$(".ck_prod:checked").each(function(index, element){
		// 当前选中行中的获取小计金额
		var _sub = Number($(this).parents(".row").children(".sub").text());
		// 累加到合计金额中
		sum += _sub;
	});
	// 显示合计金额
	$("#total").text(sum.toFixed(2));
}
//********************************************************************************************
	//异步加载推荐的数据
	$.getJSON("/PC/pc_project/mock/gusslike.json",function(respData){
				//开始处理拿回的数据
				var data={
					products:respData.data
				}
				var html=template("guss_pro",data);
				$(".gussPro").html(html);
		});
	});
});
function  exist(id,arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i].id===id){
			return i;
		}
	}
	return -1;
}

function calcTotal() {
		// 合计金额
		var sum = 0;
		$(".ck_prod:checked").each(function(index, element){
			// 当前选中行中的获取小计金额
			var _sub = Number($(this).parents(".row").children(".sub").text());
			// 累加到合计金额中
			sum += _sub;
		});
		// 显示合计金额
		$("#total").text(sum.toFixed(2));
	}