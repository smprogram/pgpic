/*  
 # Saleh Mosleh
 # www.SMProgram.com
*/
function FullScreenLoading(root){
	
	
	var that = this ;
	var win;
	var html = '<div class="bgloadingmax hide"></div>'+
	'<div class="loadingmaxobj" id="loadingmaxobj1">'+
	'	<div class="double-bounce1" style="background-color:#179d0c;"></div>'+
	'	<div class="double-bounce2" style="background-color:#179d0c;"></div>'+
	'</div>';
	var isShow = false;
	this.show = function(color,callback){
		$('body').append(html);
		isShow = true;
		that.resize();
		color = typeof(color)!="undefined" ? color : "#d4ad0e";
		$(".loadingmaxobj").find("div").css({"background-color": color});
		$(".bgloadingmax").css({
			opacity:0
		}).removeClass("hide").transition({ 
			opacity: 1
		},300);
		 
		$("#loadingmaxobj1").css({
			opacity:0 
		}).removeClass("hide").transition({ 
			opacity: 1
		},500,function(){
			if(typeof(callback)!="undefined")
				callback();
		});
		
	};
	
	this.isShow = function(){
		return isShow;
	};
	
	this.hide = function(callback){
		 
		$(".bgloadingmax").transition({ 
			opacity: 0
		},400,function(){
			$(this).remove();
		});
		
		$("#loadingmaxobj1").transition({  
			opacity: 0
		},350,function(){
			$(this).remove();
			if(typeof(callback)!="undefined")
				callback();
		});
		isShow = false;
	};
	this.resize = function(){
		if(isShow){
			win = {
				h : $(window).height(),
				w : $(window).width()
			}; 
			$("#loadingmaxobj1").css({top:((win.h-80)/2)+"px",left:((win.w-80)/2)+"px"})
		}
	};
	$(window).resize(function() {
		that.resize();
	});
	
}	

