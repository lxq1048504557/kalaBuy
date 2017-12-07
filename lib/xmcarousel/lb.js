/*
 * 轮播的配置对象
 * options={
 * 	imgs:[{src:,href:}],
 * 	width:,//图片的高度
 * 	height:,//图片的宽度
 * 	isAuto:true,//是否自动播放
 * 	duration:XX 	//自动播放时间,
 * 	isPage:true;
 * 	container:$("#xx")
 * }
 */
//建立构造函数,工厂式的方法
function Carousel(options){
	options=options||{};
	this.imgs=options.imgs;
	this.width=options.width;
	this.height=options.height;
	this.isAuto=options.isAuto;//是否自动播放
	this.duration=options.duration;
	this.isPage=options.isPage;//通过判断是否需要创建
	this.container=options.container;//轮播图片的容器
	this.imgsBox=null;//存放li
	this.circleBox=null;//存放小圆点
	this.currentIndex=0;//当前播放的图片索引
	this.nextIndex=1;//即将播放的图片索引
	this.timer=null;//创建计时器
}
Carousel.prototype={
	constructor:Carousel,
	init:function(){//初始化
	//创建页面元素
		//创建li标签
		var html="";
		for(var i=0;i<this.imgs.length;i++){
			html+=`<li style="height:${this.height}px;width:${this.width}%"><a href=${this.imgs[i].href}><img src=${this.imgs[i].src} style="height:${this.height}px;width:${this.width}%"/></a></li>`
		}
		//创建小圆点
		var circleHtml="";
		for(var i=0;i<this.imgs.length;i++){
			circleHtml+=`<i></i>`
		}
		//向前向后翻页
		var preNextPage="";
		if(this.isPage){//如果存在向前向后翻页，则需要创建向前向后翻页
			preNextPage+=`<div class="prev"><</div><div class="next">></div>`
		}
		html=`
			<ul class="imgs" style="height:${this.height}px;width:${this.width}%">${html}</ul>
			<div class="Circle">${circleHtml}</div>
			${preNextPage}
		`;
		//完成页面的整体布局,这里如果固定去选择元素的话就达不到实现共享
		this.container.innerHTML(html);
		//设置页面样式
		this.container.css({
			height:this.height+"px",
			width:this.width+"%"
		});
		//设置第一张图片盒子显示，就需要将所有的盒子全部查找出来
		this.imgsBox=$(".imgs li",this.container);
		$(this.imgsBox[0]).show();
		//设置默认第一张图片的北京色是红色
		this.circleBox=$(".Circle i",this.container);
		$(this.circleBox[0]).addClass("current");
		if(this.isAuto){
			this.playAuto();
		}
		this.circleMouse();
		this.changeMouse();
		this.preNextPage();
	},
	//运动效果的实现
	fade:function(){
		$(this.imgsBox[this.currentIndex]).fadeOut(2000);
		$(this.imgsBox[this.nextIndex]).fadeIn(2000);
		//小圆点修改
		$(this.circleBox[this.currentIndex]).removeClass("current");
		$(this.circleBox[this.nextIndex]).addClass("current");
		//修改索引
		this.currentIndex=this.nextIndex;//一轮播放完毕之后，，设置一下播放顺序
		this.nextIndex++;
		if(this.nextIndex>=this.imgs.length){//判断是否是已经播放到最后一张
			this.nextIndex=0;
		}
		
	},
	playAuto:function(){
		this.timer=setInterval(()=>{
			this.fade();//使用箭头函数，保证里面的this指向与外面的this一致
		},this.duration);
	},
	//鼠标移动到小圆点上时，相应切换图片
	circleMouse:function(){
		for(let i=0;i<this.circleBox.length;i++){
			this.circleBox[i].onmouseenter=()=>{
				this.nextIndex=i;
				this.fade();
			}
			this.circleBox[i].onmouseleave=()=>{
				this.playAuto();
				
			}
		}
	},
	//鼠标移动container时停止自动播放，鼠标移开又开始自动播放
	changeMouse:function(){
		this.container[0].onmouseenter=()=>{
		 clearInterval(this.timer);
			
		}
		this.container[0].onmouseleave=()=>{
			this.playAuto();
		}
	},
	//实现向前向后翻页的效果
	preNextPage:function(){
		/*console.log($(".prev")[0])*/
		$(".prev")[0].onclick=()=>{//这是使用箭头函数是为了不要改变this的指向
			this.nextIndex=this.currentIndex-1;
			if(this.currentIndex===0){
				this.nextIndex=this.imgsBox.length-1;
			}
			this.fade();
		}
		$(".next")[0].onclick=()=>{//这是使用箭头函数是为了不要改变this的指向
			this.fade();
		}
	}
}
