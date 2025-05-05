/*  
 # Saleh Mosleh
 # www.SMProgram.com
*/
function FullDivScreenLoading(root){
	
	
	var that = this ; 
	this.opt;
	var html = '<div class="bgloadingmaxdiv hide"></div>'+
	'<div class="fl loadingmaxobj" id="loadingmaxobj2">'+
	'	<div class="double-bounce1" style="background-color:#179d0c;"></div>'+
	'	<div class="double-bounce2" style="background-color:#179d0c;"></div>'+
	'</div>';
	var isShow = false;
	this.show = function(opt,callback){
		$('body').append(html);
		isShow = true;
		this.opt = opt;
		that.resize(opt);
		$(".loadingmaxobj").find("div").css({"background-color": opt.hasOwnProperty("color") ? opt.color : "#d4ad0e"});
		$(".bgloadingmaxdiv").css({
			opacity:0
		}).removeClass("hide").transition({ 
			opacity: 1
		},300);
		 
		$("#loadingmaxobj2").css({
			opacity:0 
		}).removeClass("hide").transition({ 
			opacity: 1
		},500,function(){
			if(typeof(callback)!="undefined")
				callback();
		});
		
	};
	
	this.hide = function(callback){
		 
		$(".bgloadingmaxdiv").transition({ 
			opacity: 0
		},400,function(){
			$(this).remove();
		});
		 
		
		$("#loadingmaxobj2").transition({  
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
			$(".bgloadingmaxdiv").css({height:(this.opt.height)+"px",width:(this.opt.width)+"px",
			top:(this.opt.top)+"px",left:(this.opt.left)+"px"});
			$("#loadingmaxobj2").css({top:(this.opt.top+((this.opt.height-80)/2))+"px",
			left:(this.opt.left+((this.opt.width-80)/2))+"px"});
		}
	}; 
	
}	

