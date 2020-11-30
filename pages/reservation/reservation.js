// pages/reservation/reservation.js
const { default: api } = require("../../utils/api");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasReservation: true,
    seat: '',
    seatInfo: ''
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: api.myChooseSeat,
      data: {
        openid: app.globalData.openid
      },
      success: function(res){
        // console.log(res.data.content)
        if(res.data.content){
          wx.request({
            url: api.getSeat,
            data: {
              sid: res.data.content.sid,
              openid: app.globalData.openid
            },
            success: function(res) {
              // console.log(res.data.content)
              that.setData({seatInfo: res.data.content})
              wx.hideLoading({
                success: (res) => {},
              })
            },
            fail: function(res){
              wx.hideLoading({
                success: (res) => {},
              })
              // wx.showModal({
              //   title: '请求失败',
              //   content: '查询失败',
              //   showCancel: false,
              //   success: function (res) {
              //     //弹窗成功的回调函数
              //   }
              // });
            }
          })
          that.setData({
            seat: res.data.content,
            hasReservation: true
          });
        } else {
          wx.hideLoading({
            success: (res) => {},
          })
          that.setData({
            hasReservation: false 
          });
        }
      },
      fail: function(res) {
        wx.hideLoading({
          success: (res) => {},
        })
        that.setData({
          seat: res.data.content,
          hasReservation: false
        });
        wx.showModal({
          title: '请求失败',
          content: '查询失败',
          showCancel: false,
          success: function (res) {
            //弹窗成功的回调函数
          }
        });
      }
    });
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

  release: function(res) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要释放座位吗？',
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
        // console.log('用户点击确定')
        wx.request({
          url: api.leave,
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            cid: that.data.seat.cid,
            openid: app.globalData.openid
          },
          success: function(res) {
            // console.log(res);
            wx.showModal({
              title: '释放结果',
              content: res.data.content,
              showCancel: false,
              success: function (res) {
                //弹窗成功的回调函数
                wx.request({
                  url: api.myChooseSeat,
                  data: {
                    openid: app.globalData.openid
                  },
                  success: function(res) {
                    that.setData({seat: res.data.content})
                  }
                });
              }
            });
          },
          fail: function(res) {
            wx.showModal({
              title: '释放失败',
              content: '释放失败，请检查网络',
              showCancel: false,
              success: function (res) {
                //弹窗成功的回调函数
              }
            });
          }
        })
        } else if (res.cancel) {
        // console.log('用户点击取消')
        }
      }
    })
  },

  pause: function(res) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要暂时离开吗？',
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
        // console.log('用户点击确定')
        wx.request({
          url: api.pause,
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            cid: that.data.seat.cid,
            openid: app.globalData.openid
          },
          success: function(res) {
            // console.log(res);
            wx.showModal({
              title: '请求结果',
              content: res.data.content,
              showCancel: false,
              success: function (res) {
                //弹窗成功的回调函数
                wx.request({
                  url: api.myChooseSeat,
                  data: {
                    openid: app.globalData.openid
                  },
                  success: function(res) {
                    that.setData({seat: res.data.content})
                  }
                });
              }
            });
          },
          fail: function(res) {
            wx.showModal({
              title: '提交失败',
              content: '提交失败，请检查网络',
              showCancel: false,
              success: function (res) {
                //弹窗成功的回调函数
              }
            });
          }
        })
        } else if (res.cancel) {
        // console.log('用户点击取消')
        }
      }
    })
  }
})