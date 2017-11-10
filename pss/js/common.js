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



