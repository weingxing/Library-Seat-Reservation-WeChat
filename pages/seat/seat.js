const { default: api } = require("../../utils/api");
const app = getApp();
// pages/seat/seat.js
var timer;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 座位数组
    seatArr: '',
    // 已选择座位数组
    selectArr: '',
    lid: '',
    //canvas top  left  width 百分比  caheight 
    top: 10,
    left: 10,
    cawidth: 48,
    caheigth: 20,
    isHidden: false,
    //可移动区域大小
    movableheight: 1000,
    floatwidth: 50,
    floatheight: 22,
    scale:1.3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载',
    });
    this.setData({lid: options.id})
    var that = this;
    wx.request({
      url: api.getSeats,
      data: {
        lid: options.id,
        openid: app.globalData.openid
      },
      success: function(res) {
        that.setData({
          seatArr: res.data.content
        })
        console.log(res.data.content)
      },
      fail: function(res) {
        wx.showToast({
          icon: "none",
          title: '加载失败',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  //选择座位
  bindGetLocation: function(e) {
    var that = this;
    var seatsrc = e.currentTarget.dataset.src;
    var seledata = {
      x: e.currentTarget.dataset.x + 1,
      y: e.currentTarget.dataset.y + 1,
    }
    var src = 'seatArr[' + e.currentTarget.dataset.x + '][' + e.currentTarget.dataset.y + '].src'
    if (seatsrc == "seat.png") {
      //console.log(e)
      if (that.data.selectArr.length < 1) {
        var arr = new Array();
        if (that.data.selectArr.length == 0) {
          arr.push(seledata)
        } else {
          arr = that.data.selectArr;
          arr.push(seledata)
        }
        that.setData({
          [src]: "select.png",
          selectArr: arr,
        })
        wx.showToast({
          title: (e.currentTarget.dataset.x + 1) + '排 ' + (e.currentTarget.dataset.y+1) + "座",
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '每人限选一个位置',
          icon: 'none'
        })
      }
    } else if (seatsrc == "select.png") {
      let arr = new Array();
      arr = that.data.selectArr;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].x == seledata.x && arr[i].y == seledata.y) {
          arr.splice(i, 1);
        }
      }
      that.setData({
        [src]: "seat.png",
        selectArr: arr,
      })
    } else if (seatsrc == "noseat.png") {
      wx.showToast({
        title: "座位不可选，换个试试吧",
        icon: "none"
      })
    }
  },
  
  //移动结束
  touchend: function(e) {
    let that = this;
    timer = setTimeout(function() {
      that.setData({
        isHidden: true
      })
    }, 3500)
  },
  //横向移动
  onChange: function(e) {
    clearTimeout(timer);
    if (this.data.scale == 1.3) {
      // console.log(this.data.floatwidth / 50)
      // console.log(e)
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.2,
        top: 10 + Math.abs(e.detail.y),
        isHidden: false
      })
    } else if (this.data.scale >= 1.4 && this.data.scale <= 1.5) {
      // console.log('aaa')
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.25,
        top: 10 + Math.abs(e.detail.y) * 0.9,
        isHidden: false
      })
    } else if (this.data.scale >= 1.6 && this.data.scale <= 1.7) {
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.4,
        top: 10 + Math.abs(e.detail.y) * 0.8,
        isHidden: false
      })
    } else if (this.data.scale >= 1.8 && this.data.scale <= 1.9) {
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.43,
        top: 10 + Math.abs(e.detail.y) * 0.7,
        isHidden: false
      })
    } else if (this.data.scale >= 2.0 && this.data.scale <= 2.2) {
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.41,
        top: 10 + Math.abs(e.detail.y) * 0.6,
        isHidden: false
      })
    } else if (this.data.scale >= 2.3 && this.data.scale <= 2.4) {
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.5,
        top: 10 + Math.abs(e.detail.y) * 0.5,
        isHidden: false
      })
    } else if (this.data.scale >= 2.5 && this.data.scale <= 2.7) {
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.37,
        top: 10 + Math.abs(e.detail.y) * 0.45,
        isHidden: false
      })
    } else {
      this.setData({
        left: 10 + Math.abs(e.detail.x) * 0.35,
        top: 10 + Math.abs(e.detail.y) * 0.38,
        isHidden: false
      })
    }

  },
  //放大比例
  onScale: function(e) {
    // console.log(e.detail.scale)
    let num = (e.detail.scale - 1.2) * 10
    if (e.detail.scale <= 1.9) {
      this.setData({
        cawidth: 55 - num,
        caheigth: 280 - num * 10,
        scale: e.detail.scale
      })
    } else if (e.detail.scale >= 2.0 && e.detail.scale <= 2.4) {
      let nums = (e.detail.scale - 2.0) * 20
      this.setData({
        cawidth: 28 - nums,
        caheigth: 180 - nums * 10,
        scale: e.detail.scale
      })

    } else if (e.detail.scale >= 2.5 && e.detail.scale <= 2.6) {
      this.setData({
        cawidth: 20,
        caheigth: 140,
        scale: e.detail.scale
      })
    } else {
      this.setData({
        cawidth: 20,
        caheigth: 120,
        scale: e.detail.scale
      })
    }
  },

  submit: function(e) {
    var that = this;
    if(this.data.selectArr) {
      wx.request({
        url: api.chooseSeat,
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data:{
          openid: app.globalData.openid,
          lid: that.data.lid,
          x: this.data.selectArr[0].x,
          y: this.data.selectArr[0].y
        },
        success: function(res) {
          wx.showModal({
            title: '选座结果',
            content: res.data.content,
            showCancel: false,
            success: function (res) {
              //弹窗成功的回调函数
              wx.request({
                url: api.getSeats,
                data: {
                  lid: that.data.lid,
                  openid: app.globalData.openid
                },
                success: function(res) {
                  that.setData({
                    seatArr: res.data.content
                  })
                  // console.log(res.data.content)
                },
                fail: function(res) {
                  wx.showToast({
                    icon: "none",
                    title: '加载失败',
                  })
                }
              })
            }
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '选座失败',
            icon: "none"
          })
        }
      })

    } else {
      wx.showToast({
        icon: "none",
        title: '请选择座位',
      })
    }
  }

})