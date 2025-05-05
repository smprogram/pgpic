/*
 # JSM Windows 1.0.0
 # Saleh Mosleh
 # www.salehmosleh.ir
*/
var _idwin = 1;
function Windows(root,zindex){ 
	var that = this ;
	var Loading = new LoadingWaitingMin(root);
	this.Attr;
	var Win ;
	var _resizeTimmer = 0;
	this.isShow = false;
	this.isBig = true;
    var Elm = {};
	this.closeWithBG = true;
	this.setCloseWithBG = function(val){
		this.closeWithBG = val;
	};
	var createNewWindow = function(){
		Elm = {
			bgwindow : "#windowframebg_"+_idwin ,
			window : "#windowframe_"+_idwin ,
			closeico : "#closewindowico_"+_idwin ,
			title : "#titlewindowframe_"+_idwin ,
			bodywin : "#bodywindowframe_"+_idwin 
		};
		_idwin++;
		var html = '<div class="windowsframebg hide" id="'+Elm.bgwindow.replace("#","")+'" ></div>'+
		'<div class="Shadow-20 windowsframe hide" id="'+Elm.window.replace("#","")+'" align="center">'+
		'	<div class="titlewindowsframe fontsize0" align="right" dir="ltr">'+
		'		<div class="vat block trans-all JSMTitelshow closewincov43we pendding post-ripple" align="center" id="'+Elm.closeico.replace("#","")+'" JSMTITLESHOW="بستن" rippleria-color="#989898">'+
		'			<li class="fas fa-times"></li>'+
		'		</div>'+
		'		<div class="vat block titletextwindowsframe FAfont pendding" id="'+Elm.title.replace("#","")+'" align="right" dir="rtl">پنجره عملیات</div>'+
		'	</div>'+
		'	<div class="bodywindowsframe" id="'+Elm.bodywin.replace("#","")+'" align="center" dir="rtl">'+
		'	</div>'+
		'</div>';
		$("body").append(html);
		if(typeof(zindex)!="undefined"){
			$(Elm.window+','+Elm.bgwindow).css({"z-index":zindex});
		}
		postRipple(Elm.window);
	};
	createNewWindow();
	
	this.getElementsId = function(){
		return Elm;
	};
	
	this.setSize = function(height,width){
		Win = {
			h : $(window).height(),
			w : $(window).width()
		};
		this.Attr.fullscreen = typeof(this.Attr.fullscreen)=="undefined" ? false : this.Attr.fullscreen;
		if(Win.h>height && Win.w>width && !this.Attr.fullscreen){ 
			this.isBig = true;
			$(Elm.window).css({
				"height":height+"px",
				"width":width+"px" ,
				"top" : ((Win.h-height)/2)+"px" ,
				"left" : ((Win.w-width)/2)+"px" 
			});
			$(Elm.bodywin).css({
				"height":(height-41)+"px",
				"width":width+"px"
			});
		}else{
			this.isBig = false;
			$(Elm.window).css({
				"height":Win.h+"px",
				"width":Win.w+"px" ,
				"top" : (0)+"px" ,
				"left" : (0)+"px" 
			});
			$(Elm.bodywin).css({
				"height":(Win.h-41)+"px",
				"width":Win.w+"px"
			});
		}
		Loading.reSize();
	};  
	$(window).resize(function() {
		if(that.isShow)
			that.setSize(that.Attr.height,that.Attr.width);
	});
	this.reSize = function(){
		if(Win.h>that.Attr.height && Win.w>that.Attr.width){
			var inH = $(Elm.bodywin).get(0).scrollHeight + 41;
			if(inH<Win.h-20 && inH>$(Elm.window).height()){
				$(Elm.window).transition({
					height:inH, 
					top : (Win.h-inH)/2
				},300);
				$(Elm.bodywin).transition({height:inH-41},300);
			}
		}
	};
	
	// page , data , height , width
	this.open = function(opt){
		this.Attr = opt;
		this.setSize(opt.height,opt.width);
		this.isShow = true;
		$(Elm.bodywin).html("");
		$(Elm.title).html(opt.title);
		var color = typeof(opt.color)=="undefined" ? "#d4ad0e" : opt.color;
		Loading.showIn(Elm.bodywin,color);
		$(Elm.bgwindow).css({opacity:0}).removeClass("hide").transition({ opacity:1 },600);
		$(Elm.window).css({y:Win.h,opacity:0}).removeClass("hide").transition({ y:0,opacity:1 },500);
		$.get(opt.page,opt.data,function(data){
			if(!that.isShow) return;
			Loading.hide(); 
			$(Elm.bodywin).html(data);
			postRipple(Elm.bodywin);
			_resizeTimmer = setTimeout(function(){
				that.reSize();
			},340);
			if(typeof(that.Attr.loaded)!="undefined")
				that.Attr.loaded();
		});
	};
	this.close = function(){
		this.isShow = false;
		Loading.hide();
		clearTimeout(_resizeTimmer);
		$(Elm.bgwindow).transition({ opacity:0 },500,function(){
			$(this).addClass("hide");
		});
		$(Elm.window).transition({y:Win.h,opacity:0},600,function(){
			$(this).addClass("hide");
			if(typeof(that.Attr.hided)!="undefined")
				that.Attr.hided();
		});
		if(typeof(that.Attr.closed)!="undefined")
			that.Attr.closed();
		
	};
	this.load = function(color){
		color = typeof(color)=="undefined"?"#d4ad0e":color;
		Loading.showOn(Elm.bodywin,color);
	};
	this.stop = function(){
		Loading.hide();
	};
	this.setTitle = function(title){
        $(Elm.title).html(title);
    };
	$(Elm.closeico).live("click",function(){
		that.close();
	});
	$(Elm.bgwindow).live("click",function(){
		if(!that.closeWithBG) return;
		that.close();
	});
	this.destroy = function(){
		$(Elm.bgwindow).remove();
		$(Elm.window).remove();
	};
	
}	

