// pages/user/user.js
const app = getApp();
import api from "../../utils/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: null,
    score: 100,
    show: false
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
    var that = this;
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    }

    wx.request({
      url: api.getMyInfo,
      data:{
        openid: app.globalData.openid
      },
      success: function(res) {
        if(res.data.content) {
          that.setData({score: res.data.content.reputation})
        }
      },
      fail: function(res) {

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
  getUserInfo: function (e) {
    // 获取用户信息
    if (e.detail.userInfo != undefined) {
      // 获得用户授权
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      app.globalData.userInfo = e.detail.userInfo
    }

    // 用户没有绑定
    if(this.data.hasUserInfo && !app.globalData.access) {
      wx.navigateTo({
        url: '../register/register',
      });
    }
  },

  reservation: function(e) {
    if(app.globalData.access) {
      wx.navigateTo({
        url: '../reservation/reservation',
      });
    } else if (!app.globalData.userInfo) {
      wx.showToast({
        icon: 'none',
        title: '请登录',
      });
    }
    if(!app.globalData.access) {
      wx.navigateTo({
        url: '../register/register',
      });
    }
  },

  share: function (e) {
    wx.navigateTo({
      url: '../share/share',
    });
  },

  about: function (e) {
    wx.showModal({
      title: '关于',
      content: '座位预约 Version 0.1.0',
      showCancel: false,
      success: function (res) {
        //弹窗成功的回调函数

      }
    });
  },

  score: function(e) {
    wx.showModal({
      title: '信誉值',
      content: '信誉值是您行为的综合体现，低于60将无法预约位置',
      showCancel: false,
      success: function (res) {
        //弹窗成功的回调函数

      }
    });
  },

  rule: function(e) {
    // wx.showModal({
    //   cancelColor: '预约规则',
      // content: '1. 每人每次仅可预约一个座位，信誉值低于60分将不可预约座位。\n' +
      //   '2. 外出时要在小程序设置状态为暂离且离开时间不得超过90分钟，否则扣除信誉值2分。\n'+
      //   '3. 未设置暂时离开状态的，扣除5信誉值。\n' + 
      //   '4. 被举报者扣除5信誉值。',
    //   showCancel: false,
    //   success: function (res) {
    //     //弹窗成功的回调函数

    //   }
    // })
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  }
})