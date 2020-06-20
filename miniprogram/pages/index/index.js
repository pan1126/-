//Page Object
import { requsetGetuserInfo,requsetAdduserInfo } from '../../utils/auth'
Page({
    data: {
        userInfo: null,
        logged: false,
        getOpenID: null
    },
    //options(Object)
    onLoad: function(options){
        
    },
    onReady: function(){
        
    },
    onShow: function(){
        let that = this
        requsetGetuserInfo().then((res)=>{
            that.setData({
                userInfo:wx.getStorageSync('userInfo'),
                logged:true
            })
        })
    },
    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    },
    onGetUserInfo(e) {
        let that = this
        wx.showLoading({
            title: '登陆中...',
            mask: true,
        });
        console.log(e)
        wx.cloud.callFunction({
          name: 'openapi',
          data: {
            action: 'getOpenData',
            openData: {
              list: [
                e.detail.cloudID,
              ]
            }
          }
        }).then(res => {
            wx.hideLoading()
            let userInfo =  res.result.list[0].data
            console.log('[onGetUserInfo] 调用成功：', userInfo)
            requsetAdduserInfo(userInfo).then((adduser)=>{
                that.setData({
                    userInfo: userInfo,
                    logged:true
                },()=>{
                    wx.setStorageSync('userInfo', userInfo)
                    that.toGohome()
                })
            })
        }).catch(()=>{
            wx.hideLoading()
        })
    },
    toGohome(){
        wx.navigateTo({
            url: '../declare/index',
        });
    }
});