//index.js
//获取应用实例
const app = getApp()
const { pubsub } = app.globalData;
Page({
    data: {
        //,"JavaScript","IOS","Android","React Native"
        tabs: [{ "name": "最热", value: "popular" }, { "name": "趋势", value: "trending" }],
        // motto: 'Hello World',
        // userInfo: {},
        // hasUserInfo: false,
        // canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //   //事件处理函数
    //   bindViewTap: function() {
    //     wx.navigateTo({
    //       url: '../logs/logs'
    //     })
    //   },
    onLoad: function () {
    },
    onTabItemTap(item) {
        pubsub.publish("tab.favorite", item.index)
    },
    //   getUserInfo: function(e) {
    //     console.log(e)
    //     app.globalData.userInfo = e.detail.userInfo
    //     this.setData({
    //       userInfo: e.detail.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
})
