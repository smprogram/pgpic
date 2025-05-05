/*
 # JSM DeleteWindows 1.0.0
 # Saleh Mosleh
 # www.SMProgram.com
*/
function ConfirmWin(root){
	root = typeof(root)!='undefined' ? root : '';
	var that = this ;
	
	this.Attr = {
		no : function(){},
		yes : function(){}
	};
	var Win ;
	
	var makeWindowHtml = function(){
		var html = '<div class="conwindowsframebg hide" ></div>'+
		'<div class="Shadow-20 conwindowsframe hide" align="center">'+
		'	<div class="titlewindowsframe" align="right">'+
		'		<img src="'+root+'images/closewin.png" class="trans-all fl imageclosewindows JSMTitelshow" '+
		'		 id="closeconfirn" JSMTITLESHOW="بستن" > '+
		'		<div class="fr titleconwindowsframe FAfont fontsize16" align="right" dir="rtl"> '+
		'		</div>'+
		'	</div>'+
		'	<div class="conwindowsbody FAfont fontsize14" align="right" dir="rtl">'+
		'	</div>'+
		'	<div class="divofbueswinconfirm" >'+
		'		  <input type="button" value="  خیر  " id="noconfirm" '+
		'		  class="trans-all button-orange fontsize15 FAfont inputconfirmbu pendding" align="center" dir="rtl"> '+
		'		  <input type="button" value="  بله  " id="okyesconfirm" '+
		'		  class="trans-all button-green fontsize15 FAfont inputconfirmbu pendding" align="center" dir="rtl"> '+
		'	</div>'+
		'</div>';
		$('body').append(html);
	};
	makeWindowHtml();
	
	this.setSize = function(){
		
		Win = {
			h : $(window).height(),
			w : $(window).width()
		};
		var width = 400;
		var height = $(".conwindowsframe").height();
		if(Win.w>width){ 
			$(".conwindowsframe").css({ 
				"width":width+"px" ,
				"top" : ((Win.h-height)/2)+"px" ,
				"left" : ((Win.w-width)/2)+"px" 
			}); 
		}else{
			$(".conwindowsframe").css({ 
				"width":Win.w+"px" ,
				"top" : ((Win.h-height)/2)+"px" ,
				"left" : (0)+"px" 
			}); 
		}
		
	};
	var _isShow = false;
	$(window).resize(function() {
		if(_isShow)
			that.setSize();
	});
	this.open = function(opt){ 
		
		opt.type = typeof(opt.type)=="undefined"? "green-yes" : opt.type;
		$(".titleconwindowsframe").html(opt.title);
		$(".conwindowsbody").html(opt.message); 
		$("#okyesconfirm").removeClass("button-red").removeClass("button-green")
		.addClass(opt.type=="red-yes"?"button-red":"button-green"); 
		this.setSize();
		$(".conwindowsframebg").css({opacity:0}).removeClass("hide").transition({ opacity:1 },600);
		$(".conwindowsframe").css({y:Win.h,opacity:0}).removeClass("hide").transition({ y:0,opacity:1 },500);
		
		this.Attr.no =  opt.no ;
		this.Attr.yes =  opt.yes ;
		_isShow = true;
	}
	this.close = function(){
		
		$(".conwindowsframebg").transition({ opacity:0 },500,function(){
			$(this).addClass("hide");
		});
		$(".conwindowsframe").transition({y:Win.h,opacity:0},600,function(){
			$(this).addClass("hide");
		});
		_isShow = false;
		
	};
	$("#noconfirm").live("click",function(){
		that.close();	
		that.Attr.no();
		
	});
	$("#closeconfirn,.conwindowsframebg").live("click",function(){
		that.close();	
	});
	$("#okyesconfirm").live("click",function(){
		that.close();	
		that.Attr.yes();
		
	});
	
}	

