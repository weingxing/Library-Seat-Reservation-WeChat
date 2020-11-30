//index.js
//获取应用实例
const app = getApp()
import api from "../../utils/api.js";

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    library: "",
    number: 0
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: api.getTodayCount,
      success: function (res) {
        that.setData({number: res.data.content});
      },
      fail: function(res){
        
      }
    });

    wx.request({
      url: api.library,
      data:{
        openid: app.globalData.openid
      },
      success(res) {
        // console.log(res.data.data)
        that.setData({library: res.data.data})
      }
    });
  },

  onShow: function() {
    var that = this;
    wx.request({
      url: api.getTodayCount,
      success: function (res) {
        that.setData({number: res.data.content});
      },
      fail: function(res){
        
      }
    });

    wx.request({
      url: api.library,
      data:{
        openid: app.globalData.openid
      },
      success(res) {
        // console.log(res.data.data)
        that.setData({library: res.data.data})
      }
    });
  },

  chooseSeat: function(e) {
    // console.log(e)
    if(!app.globalData.userInfo){
      wx.showToast({
        icon: 'none',
        title: '请登录',
      });
      setTimeout(function(){
        wx.switchTab({
          url: '../user/user',
        });
      }, 1000);
    } else if(app.globalData.access) {
      wx.showToast({
        title: '正在加载',
        icon: 'loading',
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../seat/seat?id=' + e.currentTarget.dataset.id,
        })
      }, 1500);
    } else {
      wx.navigateTo({
        url: '../register/register',
      })
    }
  },

  closed: function() {
    if(app.globalData.access) {
      wx.showToast({
        title: '书库未开放,请选择其他书库',
        icon: "none",
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: '../register/register',
      })
    }
  }
   
})
