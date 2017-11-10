
var locationStr = "";//域名

//判断单个图片是否加载完成
function loadImage(url, callback) { 
	var img = new Image(); 
	img.src = url; 
	if(img.complete) { 
		callback(url); 
		return; 
	} 
	img.onload = function () { 
		callback(url);
	}; 
}

//加载动画(封面)
function loadProcess(time,imagesArr,func){
	var count=0, index=0;
	var length = imagesArr.length;
	for(var i=0;i<length;i++){
		imagesArr[i] = locationStr + imagesArr[i];
	}		

	var interval = setInterval(function(){
		loadImage(imagesArr[index],countAdd);
		index++;
		if(index==length){
			clearInterval(interval);
		}
	},time)

	//单个图片加载完成后的回调
	function countAdd(src){
		var value1 = Math.floor(100/length);
		var value2 = 100%length;
		var $progress = $("#progress");	
		var $logoMask = $("#logoMask");
		
		if(count==value1*(length-1)){
			count= count+value1+value2;
			enterAnimate(func);//所有图片加载完成后执行封面过渡动画
		}else{
			count= count+value1;

		}
		$logoMask.width(function(){
			var widthNum = (100-count)+"%";
			return widthNum;
		})

		$progress.text(count);			
		
	}		
}

//计算穿过区域
function throughArea(element,callback){
	var $scene2 = element;
	var $area1 = $scene2.find(".area1");
	var $area2 = $scene2.find(".area2");
	var $area3 = $scene2.find(".area3");
	var $area4 = $scene2.find(".area4");
	var $area5 = $scene2.find(".area5");
	var throughArea = [];
	var $area = [$area1,$area2,$area3,$area4,$area5];
	var range = [];
	
	for(var i=0; i<$area.length;i++){
		range[i] = [];
		range[i][0] = $area[i].offset().left;
		range[i][1] = $area[i].offset().left+$area[i].width();
		range[i][2] = $area[i].offset().top;
		range[i][3] = $area[i].offset().top+$area[i].height();	
	}

	$scene2.on("touchmove",function(e){
		var touchX = event.targetTouches[0].pageX;
		var touchY = event.targetTouches[0].pageY;
		for(var i=0;i<$area.length;i++){
			if(touchX>=range[i][0] && touchX<=range[i][1] && touchY>=range[i][2] && touchY<=range[i][3])
			{
				throughArea[i] = true;
			}	
		}
		
	})
	$scene2.on("touchend",function(){
		var throughNum = 0;
		for(var i=0;i<throughArea.length;i++){
			if(throughArea[i]==true){
				throughNum++;
			}
		}
		if(throughNum>=3){
			callback();
		}
		for(var i=0;i<throughArea.length;i++){
			throughArea[i] = false;
		}	
	})
	
}

//封面过渡动画
function enterAnimate(func){
	var $cover = $("#cover");
	var $mainContent = $("#mainContent");
	
	$cover.addClass('coverHide');
	$cover.one("webkitTransitionEnd",function(){
		$cover.css("display","none");
		$mainContent.css("display","block");
		setTimeout(func,0);
	})
}

//音乐控制
+function(){
	$("#music").on("touchend",function(){
		var audio = $("#audio").get(0);
		$(this).toggleClass('rotate360 rotate0');
		if($(this).hasClass('rotate360')){
			audio.play();
		}else{
			audio.pause();
		}
	})
}(jQuery)

$(function(){
	$(document).on("touchmove",function(e){
		e.preventDefault();
	})
})

//开发阶段预览用，上线时删除
$(function(){
	var menu="<div style='position:fixed;left:10px; top:10px; max-height:90%; overflow:auto; text-align:right; background:rgba(122,122,122,0.5); z-index:100;text-align:left; font-size:1rem;'><p id='menuFix' style='color:red'>展开菜单</p><ul style='display:none'>"
					+"<li id='reload' style='color:red'>刷新多按几次</li>"
					+"<li><a href='index.html' style='color:red'>首页</a></li>"
					+"<li><a href='self-view-result.html' style='color:red'>自己查看结果</a></li>"
					+"<li><a href='other-index.html' style='color:red'>好友入口</a></li>"
					+"<li><a href='other-view-result.html' style='color:red'>好友查看结果</a></li>"
					+"</ul></div>"
	$("body").prepend(menu);
	$("#menuFix").click(function(){
		var next = $(this).next();
		var showOrHide =next.css("display")=="none"?true:false;
		var text = next.css("display")=="none"?"收起菜单":"展开菜单";
		$(this).text(text)
		next.toggle(showOrHide);
	})
	$("#reload").click(function(){
		location.reload(true);
	})
	
	//document.body.addEventListener('touchstart', function () { });  
})