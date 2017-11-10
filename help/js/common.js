

function contact(){
    var contactHtml = '<p class="tip">以上都无法解决你的问题？请联系在线客服</p><p class="btn flex"><span class="txt">在线咨询</span></p>';
    var body = document.querySelector("body");
    var contact = body.getAttribute("data-contact");
    var element = document.createElement("DIV");
    element.setAttribute("class","contact");
    element.setAttribute("onclick","qimoChatClick()");
    element.innerHTML = contactHtml;
    var customService = document.createElement("SCRIPT");
    customService.setAttribute("src","http://webchat.7moor.com/javascripts/7moorInit.js?accessId=8af7cff0-7c81-11e5-8399-9b5c3ce295fe&autoShow=false");
    customService.setAttribute("async","async");

    if(contact=="contact"){
        body.appendChild(element);
        body.appendChild(customService);
    }
}

contact();

