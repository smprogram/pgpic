var Toast , maxLoading, winframe, insideLoading, winconf;

(function($){
	
	$(document).ready(function(){

		var eventData = [];
		Toast = new FlatNoty();
		winconf = new ConfirmWin("");
		winframe = new Windows("");
		insideLoading = new LoadingWaitingMin("");
		maxLoading = new FullScreenLoading("");
		maxLoading.show("#186b90");
		
        
		$(window).bind("load", function(){
            persianDate.toLeapYearMode('astronomical');
			var now = new persianDate();
            //cl(new persianDate([1404,1,1]).toLocale('fa').format('dddd'));
			showDays(now);
		});
		$(window).bind("resize", function(){
			resize();
		});

		var pdate = $(".datepiker").pDatepicker({
			autoClose: true, 
			format: 'YYYY MMMM',
			timePicker: {
				enabled: false
			},
			timePicker: {
				enabled: false
			},  
			viewMode : 'month',
			dayPicker: {
				enabled: false
			},
			monthPicker: {
				enabled: true
			},
			yearPicker: {
				enabled: true
			},
			onSelect: function(unixdate){ 
                persianDate.toLeapYearMode('astronomical');
				var selectedDate = new persianDate(unixdate);
				showDays(selectedDate); 
			}
		});
		
		
		$("#nextdate").live("click",function(){
            persianDate.toLeapYearMode('algorithmic');
			var selectedDate = new persianDate(pdate.getState().selected.unixDate);
			selectedDate = selectedDate.endOf("month").add('days', 1);
			pdate.setDate(selectedDate);
			showDays(selectedDate);
		});
		
		$("#backdate").live("click",function(){
            persianDate.toLeapYearMode('algorithmic');
			var selectedDate = new persianDate(pdate.getState().selected.unixDate);
			selectedDate = selectedDate.startOf("month").subtract('days', 1);
			pdate.setDate(selectedDate); 
			showDays(selectedDate);
		});
		
		
		var showDays = function(date){
            persianDate.toLeapYearMode('astronomical');
			var start = date.startOf("month").toCalendar('gregorian').toLocale('en');
			var end = date.endOf("month").toCalendar('gregorian').toLocale('en');
			
			var opt = {
				key : config.api_key,
				singleEvents: 'true',
				maxResults: 2000,
				timeMin: start.format('YYYY-MM-DDTHH:mm:ssZ'),
				timeMax: end.format('YYYY-MM-DDTHH:mm:ssZ'),
				orderBy: 'startTime'
			}; 
			if(!maxLoading.isShow())
				maxLoading.show("#186b90");
			Ajax.get({
				url : config.google_api_server,
				params : opt,
				success : function(gets, $ajax){cl(gets);
					if(gets.error){
						$ajax.fail(gets.error.message);
						return;
					}
					makeDays(start, end, gets.items);
					
					maxLoading.hide();
				},
				fail : function(msg){
					maxLoading.hide();
					Toast.show(msg);
				}
			});
		};
		
		var makeDays = function(start, end, items){
			eventData = items;
			start = start.toLocale('fa').toCalendar('persian');
			end = end.toLocale('fa').toCalendar('persian');
			var now = new persianDate();
			var days = end.diff(start, 'days');
			$("#dayscontent").html('');
			var daysweek = persianDate.rangeName().weekdays;
			var startDayName = start.format('dddd');
			startDayName = fixShortspace(startDayName);
			for(var i=0; i<daysweek.length ;i++){
				daysweek[i] = fixShortspace(daysweek[i]);
				if(daysweek[i]==startDayName) 
					break;
				$("#dayscontent").append('<div class="pendding block vat dayitem deactivedayitem trans-all Rudus-10" all="center">'+'</div>');
			}
			for(var i=1; i<=days ;i++){
				var vdate = start.add('days', i-1);
				var selectedClass = '';
				if(now.diff(vdate, 'days')==0)
					selectedClass = 'selecteddayitem';
				var copyvdate = new persianDate(vdate); 
				var events = getDateEvents(copyvdate.toCalendar('gregorian').toLocale('en').format('YYYY-MM-DD'), items);
				var eventHtml = '';
				for(var j=0; j<events.length ;j++){
					if(!events[j].hasOwnProperty('summary'))
						continue;
					var startEventdate = new persianDate(new Date(events[j]['start']['dateTime']));
					var endEventdate = new persianDate(new Date(events[j]['end']['dateTime']));
					eventHtml += '<div class="eventitem pendding FAfont post-ripple trans-all" align="right" data-rippleria-color="#47b9ce" value="'+events[j]['id']+'">'+
						'<div class="pendding FAfont fontsize13 eventitem-summer">'+events[j].summary+'</div>'+
						'<div class="pendding FAfont fontsize12 eventitem-times Rudus-10">'+
							'<li class="vam fas fa-clock eventitem-timesico"></li>'+
							toPersiandigit(startEventdate.format('HH:mm')+' تا '+endEventdate.format('HH:mm'))+
						'</div>'+
					'</div>';
				}
				$("#dayscontent").append('<div class="pendding block vat dayitem activedayitem trans-all Rudus-10 card-3-hover '+selectedClass+'" dir="rtl" all="center" id="day_'+i+'">'+
				'	<div class="dayitemtitle pendding fontsize0" align="right" id="daytitle_'+i+'">'+
				'		<div class="block vam dayitemtitlename pendding FAfont fontsize14" align="right" >'+
							vdate.format('dddd')+
				'		</div>'+
				'		<div class="block vam dayitemtitledate pendding FAfont fontsize12" align="left">'+
							vdate.format('YYYY/MM/DD')+
				'		</div>'+
				'	</div>'+
				'	<div class="pendding dayitemtitleevents" align="right" id="daycontent_'+i+'">'+
						eventHtml+
				'	</div>'+
				'</div> ');
			}
			var endDayName = end.format('dddd');
			endDayName = fixShortspace(endDayName);
			var _alowEmpety = false;
			for(var i=0; i<daysweek.length ;i++){
				daysweek[i] = fixShortspace(daysweek[i]);
				if(daysweek[i]==endDayName){
					_alowEmpety = true;
					continue;
				}
				if(_alowEmpety){
					$("#dayscontent").append('<div class="pendding block vat dayitem deactivedayitem trans-all Rudus-10" all="center">'+'</div>');
				}
			}
			postRipple("#dayscontent");
			resize();
		};
		
		var fixShortspace = function(dayname){
			return dayname.replaceAll('‌', ' ');
		};
		
		var getDateEvents = function(startDate, items){
			var events = [];
			for(var i=0; i<items.length ;i++){
				if(items[i]['start'].hasOwnProperty('dateTime') && items[i]['start']['dateTime'].startsWith(startDate))
					events.push(items[i]);
			}
			return events;
		};
		
		var resize = function(){ 
			//setTimeout(function(){
			var wwidth = $(window).width();
			var listclumns = 7;
			if(wwidth<=550){
				listclumns = 2;
			}else if(wwidth<=900){
				listclumns = 4;
			}
			
			var boxs = $(".dayitem");
			if(boxs.length<=0)
				return;
			var firstheight = $(boxs[0]).offset().top;
			for(var i=0 ; i<boxs.length ; ){
				var rowboxs = [];
				for(var j=i ; i<boxs.length && j<i+listclumns ; j++){
					rowboxs.push(boxs[j]);
					//cl(j);
				}
				i = j;
				var maxHeight = Math.max.apply(null, $(rowboxs).map(function(){ 
					//cl(this);
					return $(this).find('.dayitemtitle').outerHeight(true)+$(this).find('.dayitemtitleevents').outerHeight(true);
				}).get()); 
				//cl("-----------------------------------");
				$(rowboxs).height(maxHeight); 
			}
			
			//},30); 
		};
		
		$(".eventitem").live("click", function(e){
			var id = $(this).attr("value");
			var event = getEventById(id);
			winframe.open({
				page : "windows/event.html",
				data : {id: id} ,
				title : event.summary ,
				height : 400 ,
				width : 600 ,
				loaded : function(d){
					var startEventdate = new persianDate(new Date(event['start']['dateTime']));
					var endEventdate = new persianDate(new Date(event['end']['dateTime']));
					$("#startdateevent").html(startEventdate.format('YYYY/MM/DD HH:mm'));
					$("#enddateevent").html(endEventdate.format('YYYY/MM/DD HH:mm'));
					
					$("#nameevent").html(event.summary);
					if(event.hasOwnProperty('location'))
						$("#weblinkevent").html('<a href="'+event.location+'" target="_blank">'+event.location+'</a>');
					else
						$("#weblinkeventcov").addClass("hide");
					if(event.hasOwnProperty('description'))
						$("#discevent").html(event.description);
					else
						$("#disceventcov").addClass("hide");
					
					if(event.hasOwnProperty('attachments') && event.attachments.length>0){
						var attachs = '';
						for(var i=0; i<event.attachments.length ;i++){
							attachs += '<a href="'+event.attachments[i].fileUrl+'" target="_blank">'+
								'<div class="vam block pendding FAfont fontsize12 datafeild-attachbu trans-all Rudus-10 post-ripple JSMTitelshow" align="right" JSMTITLESHOW="'+event.attachments[i].title+'">'+
									'<img src="'+event.attachments[i].iconLink+'" class="vam datafeild-imgicon" /> '+ event.attachments[i].title
								'</div>'+
							'</a>';
						}
						$("#attachedevent").html(attachs);
					}else
						$("#attachedeventcov").addClass("hide");
					
					if(event.hasOwnProperty('htmlLink')){
						$("#morelinkscov").html('<a href="'+event.htmlLink+'" target="_blank"><span class="vam block pendding FAfont fontsize12 datafeild-link trans-all Rudus-5">جزئیات بیشتر</span></a>'); 
						var url = new URL(event.htmlLink);
						var eid = url.searchParams.get("eid");
						$("#morelinkscov").append('<a href="https://calendar.google.com/calendar/u/0/r/eventedit/copy/'+eid+'" target="_blank"><span class="vam block pendding FAfont fontsize12 datafeild-link trans-all Rudus-5">کپی به تقویم من</span></a>');
					}else{
						$("#morelinkscov").addClass("hide");
					}
						
					
					
				}
			});
			
		});
		
        
        
		var getEventById = function(id){
			for(var evn of eventData){
				if(evn.id==id)
					return evn;
			}
			return null;
		};
		
	});
		  	
})(jQuery);