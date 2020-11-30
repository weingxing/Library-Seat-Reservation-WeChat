var domain = "https://test.mapletown.xyz"
// var domain= "http://localhost:8081"

export default {
  getDomain: domain,
  login: domain + "/wechat/login",
  register: domain + "/wechat/register",
  access: domain + "/wechat/access",
  library: domain + "/wechat/getLibrary",
  getSeats: domain + "/wechat/getSeats",
  chooseSeat: domain + "/wechat/chooseSeat",
  myChooseSeat: domain + "/wechat/getMyChooseSeat",
  getSeat: domain + "/wechat/getSeatBySid",
  getMyInfo: domain + "/wechat/getMyInfo",
  pause: domain + "/wechat/pause",
  // enter: domain + "/wechat/enter",
  getTodayCount: domain + "/wechat/reservationNum",
  leave: domain + "/wechat/leave"
}