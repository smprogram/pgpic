/* 
 # Saleh Mosleh
 # www.salehmosleh.ir
*/
var Incr_Noty = 0 ;
var hideFlatNoty = function(sel){
	$(sel).find(".flatnotyitemicon").transition({opacity:0},200,function(){
		$(sel).find(".flatnotyitemtext").transition({opacity:0,y:25},230,function(){
			$(sel).transition({opacity:0,x:-100},200,function(){
				$(this).remove();
			});
		});
	});
};
function FlatNoty(){ 
	var that = this ; 
	this.show = function(msg,swich,showtime){
		showtime = typeof(showtime) == "undefined" ? 5000 : showtime ;
		swich = typeof(swich) == "undefined" ? "err" : swich ;
		var color = "" ;
		var icon = "";
		if(swich=="err") {
			color = "#EC3C3C" ;
			icon = "fa-exclamation-circle";
		} else if(swich=="msg") {
			color = "#0066CC" ;
			icon = "fa-arrow-circle-left";
		} else {
			color = "#2D974A" ;
			icon = "fa-check-circle";
		} 
		Incr_Noty++ ;
		var ID = 'flatnotyitem'+Incr_Noty;
		var _timer = 0;
		var html = '<div CLASS="pendding fontsize0 flatnotyitem hide card-2" ALIGN="LEFT" style="background-color:'+
		color+'" id="'+ID+'" dir="rtl">'+
			'<i class="fa '+icon+' vam flatnotyitemicon opacity0"></i>'+
			'<div class="flatnotyitemtext pendding FAfont vam fontsize12 block opacity0" ALIGN="RIGHT">'+msg+'</div>'+
		'</div>' ;
		$("#flatnotyfram").append(html);
		
		$('#'+ID).show(180,function(){ 
			$('#'+ID).find(".flatnotyitemtext").css({opacity:0.6,y:25}).transition({opacity:1,y:0},290,function(){
				$('#'+ID).find(".flatnotyitemicon").css({opacity:0}).transition({opacity:0.7},320);
			});
		});  
		
		_timer = setTimeout(function(){
			try{
				hideFlatNoty('#'+ID);
			}catch(e){}
		},showtime);
	};
	
	 
}	

$(document).ready(function(){
	$(window).load(function(){ 
		var html = '<div class="flatnotyfram" ID="flatnotyfram" dir="ltr"></div>';
		$("body").append(html); 
	});
	$(".flatnotyitem").live("click",function(){
		hideFlatNoty(this);
	}); 
});