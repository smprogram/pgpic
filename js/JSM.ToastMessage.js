/*
 # JSM.ErrorViewer 1.2.0
 # Saleh Mosleh
 # www.SMProgram.com
*/
var Incr_ErrViewer = 0 ;
function ToastMessage(root){ 
	var that = this ;
	root = typeof(root) == "undefined" ? "" : root ;
	this.show = function(msg,swich,showtime){
		showtime = typeof(showtime) == "undefined" ? 4000 : showtime ;
		swich = typeof(swich) == "undefined" ? "err" : swich ;
		var color = "" ;
		var icon = "";
		if(swich=="err")
		{
			color = "#FFE6E7" ;
			icon = "images/newpng/001_30.png";
		}
		else if(swich=="msg")
		{
			color = "#FFFF99" ;
			icon = "images/newpng/001_23.png";
		}
		else
		{
			color = "#99FF00" ;
			icon = "images/newpng/001_06.png";
		}
		
		Incr_ErrViewer++ ;
		var ID = 'toastMessageItem'+Incr_ErrViewer;
		var _timer = 0;
		var html = '<div CLASS="pendding toastMessageItem hide" ALIGN="RIGHT" id="'+ID+'" dir="rtl">'+
			'<img SRC="'+root+icon+'" CLASS="icotoastmsg" /><span CLASS="fontsize12 FAfont" STYLE="color:'+color+';" ALIGN="RIGHT" DIR="RTL">'+msg+'</span></div>' ;
		$("#JSMErrorsViewers").append(html);
		
		$('#'+ID).slideDown(350);
		
		_timer = setTimeout(function(){
			try{
				$('#'+ID).slideUp(350,function(){ $('#'+ID).remove(); });
			}catch(e){}
		},showtime);
	};
	
	 
}	

$(document).ready(function(){
	$(window).load(function(){ 
		var html = '<div ALIGN="CENTER"  class="toastmessageframe" ID="JSMErrorsViewers"></div>';
		$("body").append(html); 
	});
	$(".toastMessageItem").live("click",function(){
		$(this).slideUp(350,function(){ $(this).remove(); }); 
	}); 
});