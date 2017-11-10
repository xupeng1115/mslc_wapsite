$.ajax({
    url: _weixinJsUrl,
    data: {location: encodeURIComponent(_url)},
    async: false,
    dataType: 'json',
    success: function (data) {
        var _appId = data.data.appId;
        var _nonceStr = data.data.nonceStr;
        var _signature = data.data.signature;
        var _timestamp = data.data.timestamp;
        wx.config({
            debug: false,
            appId: _appId,
            timestamp: _timestamp,
            nonceStr: _nonceStr,
            signature: _signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ]
        });
    }
});

wx.ready(function () {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: _title, // 分享标题
        link: _link, // 分享链接
        imgUrl: _imgUrl, // 分享图标
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
        title: _title, // 分享标题
        desc: _desc, // 分享描述
        link: _link, // 分享链接
        imgUrl: _imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //分享到QQ
    wx.onMenuShareQQ({
        title: _title, // 分享标题
        desc: _desc, // 分享描述
        link: _link, // 分享链接
        imgUrl: _imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: _title, // 分享标题
        desc: _desc, // 分享描述
        link: _link, // 分享链接
        imgUrl: _imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
});