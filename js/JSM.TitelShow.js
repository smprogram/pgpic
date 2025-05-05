/* 
 # Saleh Mosleh
 # www.SMProgram.com
*/
$(document).ready(function(){
	$(window).load(function(){
		var _divHW={h: 0,w: 0} ;
		var _Scroll={t: 0,l: 0} ;
		var margin = 25;
		var win = {H:0,W:0};
		var _aloweChange = true; 
		
		$(".JSMTitelshow").live("mouseenter",function(e){
			win = {
				H: $(window).height(),
				W: $(window).width()
			};
			_aloweChange = true;
			var title = $(this).attr("jsmtitleshow");
			var html = '<div class="JSMTitelshow-div Shadow-5 Rudus-5 FAfont hide" '+
			' style="background-color:rgba(0,0,0,0.7); font-size:11px; color:#ffffff;padding-top:2px; font-weight:350; padding-bottom:4px;padding-left:5px;top:'+0+'px;left:'+
			0+'px;position:absolute;z-index:5000;border:1px solid #777777;padding-right:5px;max-width:200px;overflow:hidden;" dir="rtl">'+
			title+'</div>';
			$("body").append(html);
			_divHW = {
				h: $(".JSMTitelshow-div").height(),
				w: $(".JSMTitelshow-div").width()
			};
			
			_Scroll = {
				t: $(window).scrollTop(),
				l: $(window).scrollLeft()
			};
			var top=(e.pageY-_divHW.h-margin),left=(e.pageX-(_divHW.w/2)); 
			
			if(win.W<(left+_divHW.w)-_Scroll.l){
				left = left-(_divHW.w/2);
			}else if(left<=0){
				left = 0;
			}
			if(0>top-_Scroll.t){
				top = top+_divHW.h + (margin*2);
			}  
			
			$(".JSMTitelshow-div").css({"left":left+"px","top":top+"px"});
			$(".JSMTitelshow-div").show(300);
			
		});
		
		$(".JSMTitelshow").live("mousemove",function(e){
			if(!_aloweChange) return ;
			var top=(e.pageY-_divHW.h-margin),left=(e.pageX-(_divHW.w/2));
			
			if(win.W<(left+_divHW.w)-_Scroll.l){ 
				left = left-(_divHW.w/2);
			}else if(left<=0){
				left = 0;
			}
			if(0>top-_Scroll.t){ 
				top = top+_divHW.h + (margin*2) ;
			}  
			
			$(".JSMTitelshow-div").css({"left":left+"px","top":top+"px"});
			
		});
		$(".JSMTitelshow").live("mouseleave",function(e){
			$(".JSMTitelshow-div").stop().clearQueue();
			$(".JSMTitelshow-div").remove();
			
		});
		$(".JSMTitelshow").live("click",function(e){
			_aloweChange = false;
			$(".JSMTitelshow-div").stop().clearQueue();
			$(".JSMTitelshow-div").hide(200);
			
		});
	});
});