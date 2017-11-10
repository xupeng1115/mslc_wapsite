    

//是否微信内置浏览器
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

//获取操作系统名称
function getOS() {
    //定义结果变量
    var name = 'Other';
    var version = '';
    //获取userAgent
    var ua = navigator.userAgent;
    //移动平台iOS探测
    var reg = /like Mac OS X|Android|Windows Phone|Symbian/ig;
    var regResult = reg.exec(ua);
    if(!regResult){
        reg = /Mac OS X|Windows NT|Linux/ig;
        regResult = reg.exec(ua);
    }
    if(!regResult){
        //返回UNKNOWN
        return name;
    }else{
        //操作系统检测
        switch(regResult[0]){
            case 'like Mac OS X':
                name = 'iOS';
                reg = /(iPhone|iPod|iPad).*?OS\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Android':
                name = 'Android';
                reg = /(Android)\s*(\d*[\.\d]*)/ig;
                break;
            case 'Windows Phone':
                name = 'Windows Phone';
                reg = /(Windows Phone)\s*[OS]*\s*(\d*[\.\d]*)/ig;
                break;
            case 'Symbian':
                name = 'Symbian';
                reg = /(Symbian)\s*[OS]*\/*\s*(\d[\.\d]*)/ig;
                break;
            case 'Mac OS X':
                name = 'OS X';
                reg = /(Mac OS X)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Windows NT':
                name = 'Windows NT';
                reg = /(Windows NT)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Linux':
                name = 'Linux';
                reg = /(Linux)\s*(i*\d*)/ig;
                break;
        }
        //获取版本号
        regResult = reg.exec(ua);
        if(regResult && regResult.length >= 3){
            version = regResult[2].replace(/\_+/ig, '.');
            reg = /^\d+\.*\d*/ig;
            regResult = reg.exec(version);
            if(regResult){
                version = regResult[0];
            }
        }
    }

    //返回操作系统名称+版本号
    //return [name, version].join(' ');

    //返回操作系统名称
    return name;
};

/*获取url指定参数值*/
function getUrlParameter(name){
    var url = location.search.substr(1);
    var value,arr1=[],arr2=[];

    if(url){
        arr1 = url.split("&");
        for(var i=0;i<arr1.length;i++){
            arr2=arr1[i].split("=");
            if(arr2[0]==name){
                value = arr2[1];
                if(value=="null" || value=="undefined"){
                    value = null;
                }
            }
        }
    }
    return value;
}

//倒计时
function countdownFn(second,s){
    var second = parseInt(second);
    var dd = parseInt(second / 60 / 60 / 24, 10);
    var hh = parseInt(second / 60 / 60 % 24, 10);
    var mm = parseInt(second / 60 % 60, 10);
    var ss = parseInt(second % 60, 10);
    var txt = "";

    var checkTime = function(i){
        if(i<10){
            i = "0"+i;
        }
        return i;
    }

    if(second<=0){
        dd = "00";
        hh = "00";
        mm = "00";
        ss = "00";
    }else{
        dd = checkTime(dd);
        hh = checkTime(hh);
        mm = checkTime(mm);
        ss = checkTime(ss);
    }

    if(s){
        txt = "<i>"+dd+"</i>"+"天<i>"+hh+"</i>时<i>"+mm+"</i>分<i>"+ss+"</i>秒";
    }else{
        txt = "<i>"+dd+"</i>"+"天<i>"+hh+"</i>时<i>"+mm+"</i>分";
    }
    
    return txt;
}

/*根据hostname判断是生产环境还是测试环境*/
var publicApiHost,subDirectory;

if(location.hostname=="static.mashanglc.com"){
    publicApiHost = "http://bb.mashanglc.com";
}else if(location.hostname=="127.0.0.1" || location.hostname=="localhost"){
    publicApiHost = "http://bb.sit.licai66.com";
}else{
    subDirectory = location.hostname.split(".")[1];
    publicApiHost = "http://bb."+subDirectory+".licai66.com";
}


var isSupportTouch = "ontouchend" in document ? true : false;//是否支持touch

var publicObj = {
    handleEvent : isSupportTouch ? "touchend" : "click",
    wxShareUrl:publicApiHost + "/v2/bb/matter/wx/share",//获取微信内分享参数
    wxMatterUrl:publicApiHost + "/v2/bb/matter/share/show/",//获取微信内活动数据
    wxBoostUrl:publicApiHost + "/v2/bb/matter/share/boost",//微信内帮抢
    appProductUrl:publicApiHost + "/v2/bb/api/matter/all",//获取app产品列表
    appShareUrl:publicApiHost + "/v2/bb/api/matter/share/create",//获取app内分享参数
    appMyMatterUrl:publicApiHost + "/v2/bb/api/matter/share/my",//我的人气收益
    appMyMatterDetailUrl:publicApiHost + "/v2/bb/api/matter/share/helper/",//人气收益详情
    userId : getUrlParameter("userId"),
    cityId : getUrlParameter("cityId")
} 

