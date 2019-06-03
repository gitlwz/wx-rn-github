// pages/my/my.js
export const MORE_MENU = {
    Custom_Language: { name: '自定义语言', icon: 'check-square' },
    Custom_Theme: { name: '自定义主题', icon: 'bg-colors' },
    Custom_Key: { name: '自定义标签', icon: 'check-square' },
    Sort_Key: { name: '标签排序', icon: 'sort' },
    Remove_Key: { name: '标签移除', icon: 'minus' },
    About_Author: { name: '关于作者', icon: 'smile' },
    About: { name: '关于', icon: 'logo-github' },
    Tutorial: { name: '教程', icon: 'reconciliation-fill' },
    Feedback: { name: '反馈', icon: 'sound-fill' },
    Share: { name: '分享', icon: 'md-share' },
    CodePush: { name: 'CodePush', icon: 'ios-planet' },
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        isUserInfo: false,
        userInfo: {},
        MORE_MENU: MORE_MENU
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    this.setData({
                        isUserInfo: true
                    })
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: (res) => {
                            this.setData({
                                userInfo: res.userInfo
                            })
                        }
                    })
                } else {
                    this.setData({
                        isUserInfo: false
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    bindGetUserInfo: function (e) {
        this.setData({
            isUserInfo: true,
            userInfo: e.detail.userInfo
        })
    }
})