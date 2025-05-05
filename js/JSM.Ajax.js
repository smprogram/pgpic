var localCache = {
    data: {},
    remove: function(url) {
        delete localCache.data[url];
    },
    exist: function(url) {
        return localCache.data.hasOwnProperty(url) && localCache.data[url] !== null;
    },
    get: function(url) {
       // console.log('Getting in cache for url' + url);
        return localCache.data[url];
    },
    set: function(url, cachedData) {
        localCache.remove(url);
        localCache.data[url] = cachedData;
    }
};
var Ajax = {
	get : function(opt){
		opt.type = opt.hasOwnProperty("type") ? opt.type : "json";
		$.get(opt.url,opt.params,function(gets){
			if(opt.type=="json"){
				if(!isJson(gets)){
					opt.fail("خطا در دریافت اطلاعات معتبر از سرور!");
					return;
				}
			}
			try{
				opt.success(gets, opt);
			}catch(e){
				opt.fail(e);
			} 
		}).fail(function(e){cl(e);
			opt.fail("خطا در ارتباط با سرور!");
		});
	},
	post : function(opt){
		opt.type = opt.hasOwnProperty("type") ? opt.type : "json";
		$.post(opt.url,opt.params,function(gets){
			if(opt.type=="json"){
				if(!isJson(gets)){
					opt.fail("خطا در دریافت اطلاعات معتبر از سرور!");
					return;
				}
			}
			try{
				opt.success(gets, opt);
			}catch(e){
				opt.fail(e);
			} 
		}).fail(function(e){
			opt.fail("خطا در ارتباط با سرور!");
		});
	},
	submit : function(opt){
		opt.type = opt.hasOwnProperty("type") ? opt.type : "json";
		$(opt.form).ajaxSubmit({
			url : opt.url,
			method : 'post',
			dataType : null,
			success: function(response, statusText, xhr, $form){
				if(opt.type=="json"){
					if(!isJson(response)){
						opt.fail("خطا در دریافت اطلاعات معتبر از سرور!");
						return;
					}
				}
				try{
					opt.success(response, opt);
				}catch(e){  
					opt.fail(e);
				}
			}
		});
	},
	get_template : function(url, callback){
		$.ajax({
            url: url,
            cache: true,
			type : 'GET',
            beforeSend: function (xhr, opts) {
                if (localCache.exist(url)){
					callback(localCache.get(url));
					xhr.abort();
                    return false;
                }
                return true;
            },
            success: function (html, status, xhr) {
				localCache.set(url, html);
       			callback(html);
            },
            error: function (xhr, status, error) {
                callback(null);
            }
        });
	}
};