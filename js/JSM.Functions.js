/*
 # JSM.Functions 1.0.0
 # Saleh Mosleh
 # www.SMProgram.com
*/

function GetMaxOfAnImageInToConvase(param){
		
	var res_width  =  param.img.w ;
	var res_height =  param.img.h ;
	

	res_height  = param.img.h - Math.floor( ( (param.img.w-param.div.w)*param.img.h) / param.img.w );
	res_width   = param.div.w; 
	param.img.h = res_height;
	param.img.w = res_width;
	
	if( param.img.h > param.div.h )
	{
		res_width  = param.img.w - Math.floor(((param.img.h-param.div.h)*param.img.w) / param.img.h);
		res_height = param.div.h;
		
	}
	
	return { w:res_width , h:res_height , mt:(param.div.h-res_height)/2 , ml:(param.div.w-res_width)/2 };
	
}

function fitImgToStaticBase(param){
	var res = {
		h:0 , w:0 , mt:0 , ml:0
	};
	var absH = (param.img.h*param.div.w)/param.img.w;
	if(absH >=  param.div.h)
	{
		res.w = param.div.w ;
		res.h =  absH;
	}
	else
	{	
		res.h = param.div.h ; 
		res.w = (param.img.w*param.div.h)/param.img.h ;
	}
	
	res.mt = res.h == param.div.h ? 0 : (param.div.h-res.h)/2 ;
	res.ml = res.w == param.div.w ? 0 : (param.div.w-res.w)/2 ;
	// transe to integer nummberic
	res.mt = parseInt(res.mt);
	res.ml = parseInt(res.ml);
	res.h = parseInt(res.h);
	res.w = parseInt(res.w);
	
	return res;
}

function fitImgToStaticBaseByWidth(param){
	var res = {
		h:0 , w:0 
	};
	
	res.h = param.div.h;
	
	
	
	res.w = parseInt((res.h*param.img.w)/param.img.h);
	
	return res;
};

function GetFitSizeOf_Max (  width , height )
{
	var FramePos = {
		height:$(window).height()-80 ,
		width:$(window).width()-200 ,
		left:0 , 
		top:0
	};
	var newPos = {
		height : height ,
		width : width ,
		top : 0 ,
		left : 0
	};
	
	newPos.width  =  width ;
	newPos.height =  height ;
	

	newPos.height  = height - Math.floor( ( (width-FramePos.width)*height) / width );
	newPos.width   = FramePos.width; 
	height       = newPos.height;
	width        = newPos.width;
	
	if( height > FramePos.height )
	{
		newPos.width  = width - Math.floor(((height-FramePos.height)*width) / height);
		newPos.height = FramePos.height;
		
	}
	
	newPos.top = parseInt(($(window).height() - newPos.height)/2);
	newPos.left = parseInt(($(window).width() - newPos.width)/2);
	
	return newPos;
}
function scrollbarWidth() { 
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scrollbar-measure";
	document.body.appendChild(scrollDiv);
	 
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	
	document.body.removeChild(scrollDiv); 
	return (scrollbarWidth); 
}
function ScrollGoto(which,id){
	$(which).scrollTo( $(id) ,1000  );
}
function ScrollGotopx(which,px){
	$(which).scrollTo( px ,1000  );
} 
var FitToDiv = function(Sel){ 
	var hdiv = $(Sel).parent("div").height();
	var wdiv = $(Sel).parent("div").width();
	var himg = $(Sel).height();
	var wimg = $(Sel).width();
	
	var opt = fitImgToStaticBase({img:{h:himg,w:wimg},div:{h:hdiv,w:wdiv}});
	
	$(Sel).css({"height":opt.h+"px","width":opt.w+"px","margin-top":opt.mt+"px","margin-left":opt.ml+"px"});
};

function getFileName(Addr){
	var ARR = Addr.split(/[\\]+/gm);
	return ARR[ ARR.length-1 ];
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function gotoUrl(Addr){
	window.location = Addr;
}

function postRipple(sel, selfSelector){
	selfSelector = typeof(selfSelector)=="undefined" ? false : selfSelector;
	var $sels;
	if(selfSelector)
		$sels = $(sel);
	else
		$sels = typeof(sel)=="undefined" ? $('.post-ripple') : $(sel).find('.post-ripple');
	
	$sels.rippleria({ 
	  duration: 500, 
	  easing: 'linear',  
	  detectBrightness: true
	});
}

function toPersiandigit(enDigit){
	enDigit = enDigit+'';
    var newValue="";
	try{
		for (var i=0;i<enDigit.length;i++)
		{
			var ch=enDigit.charCodeAt(i);
			if (ch>=48 && ch<=57)
			{ 
				var newChar=ch+1728;
				newValue=newValue+String.fromCharCode(newChar);
			}
			else
				newValue=newValue+String.fromCharCode(ch);
		}
	}catch(e){ return enDigit; }
    return newValue;
}
Array.prototype.map = Array.prototype.map || function(_x) {
    for(var o=[], i=0; i<this.length; i++) { 
        o[i] = _x(this[i]); 
    }
    return o;
};
function convertDTtoArray(dt){
	var arr = Array();
	try{
		var spall = dt.split(" ");
		var date = spall[0].split("-");
		var time = spall[1].split(":");
		arr = date.concat(time);
	}catch(e){}
	return arr.map(function (x) { 
		return parseInt(x); 
	});
}
function cl(msg){
	console.log(msg);
}
function run_async(codes){
	setTimeout(codes, 1);
}
Object.defineProperty(String.prototype, 'hashCode', {
  value: function() {
    var hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return (hash<0 ? 'N'+(-1*hash) : 'P'+hash);
  }
});

function isJson(gets){
	if(typeof(gets)=='undefined' || gets==null){
		return false;
	}
	if(typeof(gets)!='object'){
		try{
			JSON.parse(gets);
		}catch(e){
			return false;
		}
	}
	return true;
}
function arabicToPersian(txt){
	txt = ''+txt;
	var find = [  'ك' , 'ى' , 'ي' ];
	var replace = [ 'ک' ,'ی' , 'ی'];
	for (var i=0 ; i < find.length ; i++) { 
		txt = txt.replaceAll(find[i], replace[i]);
	} 
	return txt;
}
function setStorage(name,val){
	localStorage.setItem(name, JSON.stringify(val));
}
function getStorage(name){
	var res = localStorage.getItem(name);
	if(res==null) return null;
	return JSON.parse(res);
}
function deleteStorage(name){
	localStorage.removeItem(name);
}
function sendDataToWindow(idWin,data){
	var str = JSON.stringify(data);
	const {BrowserWindow} = require('electron').remote;
	var mainwin = BrowserWindow.fromId(idWin);
	if(mainwin!=null)
		mainwin.webContents.send('recivedata', str); 
}
function getDataFromWindows(reciver){
	const { ipcRenderer } = require('electron');
	ipcRenderer.on('recivedata', (event, arg) => {
		try{
			var data = JSON.parse(arg);
			reciver(data);
		}catch(e){
			cl(e);
		}
	});
}
function getRandomColor() {
	var letters = 'BCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * letters.length)];
	}
	return color;
}