require.config({
	baseUrl:"/",
	paths:{
		"jquery":["https://code.jquery.com/jquery-1.12.4.min","/PC/pc_project/lib/jquery/jquery-1.12.4.min"],
		"cookie":"/PC/pc_project/lib/jquery_plugins/jquery.cookie",
		"template":"/PC/pc_project/lib/arttemplate/template",
		"loadHeaderFooter":"/PC/pc_project/js/loadHeaderFooter",
		"zoom":"/PC/pc_project/lib/jquery_plugins/jquery.elevateZoom-2.2.3.min",
		"slider":"/PC/pc_project/lib/jquery_plugins/jquery.bxslider"
	},
	shim : {
		 "zoom" : {deps:["jquery"]},
		 "slider" : {deps:["jquery"]}
		}
});