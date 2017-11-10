window.onload = function(){
	
	var oBtn = $(".btn");
	var oYanzhengGet = $(".yanzheng-get");
	var oRegisterUrl = "http://server_url/v2/api/web/register";
	var oYanzheng = "http://server_url/v2/api/web/code";
	var oNumber = $("#user-number");
	var oPassword = $("#user-password");
	var oYanzheng = $("#user-yanzheng");
	var oAgainPassword = $("#again-password");
	var oRegisterInput = $(".register-input");
	
	var oRegNumber = /^1[0-9]{10}$/;
	var oRegYanzheng = /^[0-9]{6}$/;
	var oRegPassword = /^[a-zA-Z0-9]{6,}$/;
	
	var oPost = {
		
	};
	
	var oPostYan = {
		"reasonType":1
	};
	
//	输入项验证
	oNumber.blur(function(){
		
		if((oNumber.val().length>0)&&(oRegNumber.test(oNumber.val()))){
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","none");
			
			oPost.phone = oNumber.val();
			oPostYan.phone = oNumber.val();
			console.log(oPost.phone);
		}else if(oNumber.val().length===0){
			$(".prompt-empty").css("display","block");
			$(".prompt-again-password").css("display","none");
			$(".prompt-mode").css("display","none");
		}else{
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","block");
			$(".prompt-again-password").css("display","none");
			
		}
	})
	
	oYanzheng.blur(function(){
		if((oYanzheng.val().length>0)&&oRegYanzheng.test(oYanzheng.val())){
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","none");
			oPost.code = oYanzheng.val();
			console.log(oPost.code);
		}else if(oNumber.val().length===0){
			$(".prompt-empty").css("display","block");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","none");
		}else{
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","block");
			$(".prompt-again-password").css("display","none");
		}
	})
	
	oPassword.blur(function(){
		if((oPassword.val().length>0)&&oRegPassword.test(oPassword.val())){
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","none");
			oPost.password = hex_md5(oPassword.val()+1+20141101);
			console.log(oPost.password);
		}else if(oPassword.val().length===0){
			$(".prompt-empty").css("display","block");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","none");
		}else{
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","block");
			$(".prompt-again-password").css("display","none");
		}
	})
	oAgainPassword.blur(function(){
		if((oAgainPassword.val().length>0)&&oAgainPassword.val()===oPassword.val()){
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","none");
			
			oBtn.css("background","#ff6060");
			
		}else if(oAgainPassword.val().length===0){
			$(".prompt-empty").css("display","block");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","none");
		}else{
			$(".prompt-empty").css("display","none");
			$(".prompt-mode").css("display","none");
			$(".prompt-again-password").css("display","block");
		}
	})

	
//	获取验证码
	oYanzhengGet.click(function(){
		
		console.log(oPostYan);
		
		$.ajax({
			url:oYanzheng,
			type:"POST",
			async:true,
			data:oPostYan,
			success:function(callback){
				console.log(callback);
			}
		})
	})
	
	
//	提交用户注册信息
//	oBtn.click(function(){
//		
//		console.log(oPost);
//		
//		$.ajax({
//			url:oRegisterUrl,
//			type:"POST",
//			data:oPost,
//			async:true,
//			success:function(callback){
//				console.log(callback);
//				
//				if(callback.data.status===0){
//					$(".register").css("display","none");
//					$(".register-suc").css("display","block");
//				}else if(callback.data.status===100){
//					alert("该手机号码已被注册过！");
//				}else{
//					alert("服务器出错！");
//				}
//			}
//		})
//		
//	})
	
//	切换页面
	oBtn.click(function(){
		$(".register").css("display","none");
		$(".register-suc").css("display","block");
	})
	
}
