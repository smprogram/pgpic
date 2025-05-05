/* 
 # Saleh Mosleh
*/
var _Id_increment_lwm=0
function LoadingWaitingMin(root){
	
	var that = this ; 
	var _last_idloader = "";
	this.reSize = function(){
		try{
			var progdivs = $(".progressinondiv");
			for(var i=0 ; i<progdivs.length ; i++){
				var parent = $(progdivs[i]).parent();
				var opt = { 
					top : ($(parent).height()/2)-(48/2) ,
					left : ($(parent).width()/2)-(48/2) 
				};
				if($(progdivs[i]).hasClass(".progress2inside")){
					$(progdivs[i]).css({
						'margin-left': opt.left+'px' ,
						'margin-top': opt.top+'px'
					});
				}else if($(progdivs[i]).hasClass(".progressinondiv")){
					$(progdivs[i]).find(".progress2inside").css({
						'width': $(parent).width()+'px' ,
						'height': $(parent).height()+'px' ,
						'margin-top': '-'+$(parent).height()+'px'
					});
				}
			}
		}catch(e){}
	};
	
	this.showIn = function(inside,color){
		color = typeof(color)=="undefined" ? "#d4ad0e" : color;
		var opt = { 
			top : ($(inside).height()/2)-(48/2) ,
			left : ($(inside).width()/2)-(48/2) 
		}; 
		var idloader = 'loader'+_Id_increment_lwm;
		var html = '<div id="'+idloader+'" style="margin-left:'+opt.left+'px; margin-top:'+opt.top+'px;" class="fl spinner-double-bounce progress2inside progressinondiv"><div class="double-bounce1" style="background-color:'+color+';"></div><div class="double-bounce2" style="background-color:'+color+';"></div></div>';
		
		$(inside).append(html); 
		_Id_increment_lwm++;
		_last_idloader = '#'+idloader;
		return _last_idloader;
	};
	
	
	this.showOn = function(inside,color){
		color = typeof(color)=="undefined" ? "#d4ad0e" : color;
		var opt = { 
			top : ($(inside).height()/2)-(48/2) ,
			left : ($(inside).width()/2)-(48/2) 
		}; 
		var height = $(inside).outerHeight()+parseInt($(inside).css("margin-bottom"));
		var idloader = 'loader'+_Id_increment_lwm;
		var html = '<div class="coverloaderon progressinondiv" style="height:'+height+'px;width:'+$(inside).width()+'px;margin-top:-'+height+'px;margin-left:0px;z-index:5;" id="'+idloader+'">'+
		'	<div style="margin-left:'+opt.left+'px; margin-top:'+opt.top+'px;" class="fl spinner-double-bounce progress2inside">'+
		'		<div class="double-bounce1" style="background-color:'+color+';"></div>'+
		'		<div class="double-bounce2" style="background-color:'+color+';"></div>'+
		'	</div>'+
		'</div>';
		
		$(inside).after(html);
		_Id_increment_lwm++;
		_last_idloader = '#'+idloader;
		return _last_idloader;
	};
	
	this.hide = function(idloader){
		idloader = typeof(idloader)!="undefined" ? idloader : _last_idloader;
		if(idloader!="")
			$(idloader).remove(); 
	}
	
}	

