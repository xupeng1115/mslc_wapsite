/*获取url参数列表*/
function getUrlParameter(){
    var url = location.search.substr(1);
    var result = {},arr1=[],arr2=[],name,value;

    if(url){
        arr1 = url.split("&");
        for(var i=0;i<arr1.length;i++){
            arr2=arr1[i].split("=");
            name = arr2[0];
            value = arr2[1];
            if(value=="null" || value=="undefined"){
                value = null;
            }

            result[name] = value;
        }
    }
    return result;
}

/*根据hostname判断是生产环境还是测试环境*/
var publicApiHost,subDirectory;

if(location.hostname=="static.mashanglc.com"){
    publicApiHost = "http://api.mashanglc.com";
}else if(location.hostname=="127.0.0.1" || location.hostname=="localhost"){
    publicApiHost = "http://api.sit.licai66.com";
}else{
    subDirectory = location.hostname.split(".")[1];
    publicApiHost = "http://api."+subDirectory+".licai66.com";
}

var publicObj = {
    banksAllUrl:publicApiHost+'/banks/all',
    serverTime:publicApiHost+'/serverTimestamp',
    combinationUrl:publicApiHost+'/v2/api/customize/combination',
    plan:publicApiHost+'/v2/api/customize/combination/get',
    customizeTrackUrl:publicApiHost+'/v2/api/customize/track',
    parameter:getUrlParameter()
}

publicObj.parameter.osVer && (publicObj.parameter.osVer = decodeURIComponent(publicObj.parameter.osVer));

//阻止页面滑动
function stopDefault(){
    $(document).on("touchmove",function(e){
        e.preventDefault();
    })
}

var iframeAction = {
    iframe : document.getElementById("iframe"),
    //to产品详情
    appShowProductDetail : function(productId){
        this.iframe.src = "mslcaction://showProductDetail?productId="+productId;
    },
    //to问卷调查(暂未生效)
    appReCustomize : function(){
        this.iframe.src = "mslcaction://reCustomize";
    },
    //to推荐方案首页
    appCustomSolution : function(){
        this.iframe.src = "mslcaction://customSolution";
    },
    //to理财经理推荐
    appManagerRecommend : function(){
        this.iframe.src = "mslcaction://managerRecommend";
    },
    //to随便逛逛
    appLookAround : function(){
        this.iframe.src = "mslcaction://lookAround";
    },
    //to猜你喜欢
    appGuessYouLike : function(){
        this.iframe.src = "mslcaction://guessYouLike";
    }
}

function linkAction(){
    $(".link-reset").on("click",function(){
        var str,plan,reset = "&reCustomize=1";
        if(publicObj.parameter.plan){
            plan = "&plan=" + publicObj.parameter.plan;
            str = location.search.replace(plan,"");
        }else{
            str = location.search;
        }
        if(!str){
            reset = "?reCustomize=1";
        }
        location.href = "questionnaire.html"+str+reset;
    })
    $(".link-guess-you-like").on("click",function(){
       iframeAction.appGuessYouLike();
    })
    $(".link-manager-recommend").on("click",function(){
        iframeAction.appManagerRecommend();
    })
    $(".link-look-around").on("click",function(){
        iframeAction.appLookAround();
    })
}

linkAction();

var commonMethod = {
    //touch默认横向滚动
    touchDefault:function(options){
        var touchData = {};
        var public = {
            $element : options.$element,
            minLeft : options.minLeft || 0,
            maxLeft : options.maxLeft,
            touchendFn : options.touchendFn
        }

        public.$element.on("touchstart",function(){
            touchData.oldLeft = translate3dValue($(this)[0].style.webkitTransform);
            touchData.oldPageX = touchData.newPageX = event.targetTouches[0].pageX;
            touchData.oldPageY = touchData.newPageY = event.targetTouches[0].pageY;
            touchData.distanceX = 0;
        })

        public.$element.on("touchmove",function(e){
            var endLeft;
            if($(this).hasClass('animateState')){
                return false;
            }
            touchData.newPageX = event.targetTouches[0].pageX;
            touchData.newPageY = event.targetTouches[0].pageY;
            touchData.distanceX = touchData.newPageX - touchData.oldPageX;
            touchData.distanceY = touchData.newPageY - touchData.oldPageY;
            
            if(Math.abs(touchData.distanceY)<Math.abs(touchData.distanceX)){
                e.preventDefault();
                if(touchData.oldLeft+touchData.distanceX>=public.minLeft){
                    $(this)[0].style.webkitTransform='translate3d(0,0,0)';
                }else if(touchData.oldLeft+touchData.distanceX<=public.maxLeft){
                    $(this)[0].style.webkitTransform='translate3d('+public.maxLeft+'px,0,0)';
                }else{
                    endLeft = touchData.oldLeft+touchData.distanceX;
                    $(this)[0].style.webkitTransform='translate3d('+endLeft+'px,0,0)';
                }
            }
        })

        public.$element.on("touchend",function(e){
            public.touchendFn(touchData,e);
        })
    },

    //设置links
    setLinks:function($links,callback){
        var windowWidth = $(window).width();
        var $linksUl = $links.find("ul");
        var $item = $linksUl.find("li");
        var itemWidth = $item.eq(0).width()+10;
        var $linkGuessYouLike = $links.find('.link-guess-you-like');
        var ulWidth,maxLeft,length = $item.length;

        if(publicObj.parameter.appVer=="2.1.0"){
            $linkGuessYouLike.hide();
            length--; 
        }
        
        ulWidth = itemWidth*length+10
        maxLeft = windowWidth-ulWidth;

        $linksUl.width(ulWidth);

        callback();

        if(ulWidth<=windowWidth){
            return;
        }

        this.touchDefault({
            $element : $linksUl,
            maxLeft : maxLeft,
            touchendFn : function(touchData,e){
                if(touchData.distanceX>0){
                    e.preventDefault();
                }
            }
        })
    },
    //设置波浪
    setWave:function(){
        var w = $(window).width();
        var profitWidth = 150;
        var $wave1 = $(".wave1");
        var $wave2 = $(".wave2");
        var $waveRed = $(".wave-red");
        var animateEnd = function($element){
            $element.addClass('waveAnimate');
            $element.one("webkitAnimationEnd",function(){
                if($(this).hasClass('wave1')){
                    $(this).hide();
                    $(this).next().show();
                    animateEnd($(this).next());
                }else if($(this).hasClass('wave2')){
                    $(this).hide();
                    $(this).prev().show();
                    animateEnd($(this).prev());
                }
            })
        }

        waveRedLeft = (profitWidth-w)/2;
        $waveRed.css("left",waveRedLeft);
        
        $wave1.forEach(function(item,index,array){
            animateEnd($(item));
        })
        
    },
    //计算单个产品的收益
    countSingleProfit : function(product,userDuration,recommendMoney){
        var purchase = parseFloat(recommendMoney) || parseFloat(product.purchaseAmount) || parseFloat(product.minimumPurchase);
        var duration = parseFloat(product.duration) || userDuration;
        var estimatedYearRate,singleResult;

        if(product.classify){
          for(var j=0;j<product.classify.length;j++){
            if(product.classify[j].start<=duration && duration<=product.classify[j].end){
                estimatedYearRate = parseFloat(product.classify[j].rate);
            }
          } 
        }else{
            estimatedYearRate = parseFloat(product.estimatedYearRate);
        }

        singleResult = (estimatedYearRate*purchase*duration)/365;
        return singleResult;
    },

    //切换方案时(预计收益金额)过渡动画
    profitAnimate:function($element,value){
        var $dl = $element.parent();
        $dl.removeClass('profitAnimateBottom').addClass('profitAnimateTop');
        $dl.one("webkitAnimationEnd",function(){
            $element.text(value);
            $(this).removeClass('profitAnimateTop').addClass('profitAnimateBottom');
        })
    },

    //推荐方案统计
    customizeTrack:function(target,answer){
        var requestData = {
            target:target,
            answer:answer || ""
        }
        $.extend(requestData, publicObj.parameter);
        $.ajax({
            url: publicObj.customizeTrackUrl,
            data :requestData,
            dataType: 'json',
            success: function (response) {
                
            }
        });
    }
}

//获取translate3d的值
function translate3dValue(str,index){
    var reg=/\-?[0-9]+/g, result;
    var index = index || 1

    if(!str){
        return 0;
    }
    result = str.match(reg);
    return parseInt(result[index]);
}





