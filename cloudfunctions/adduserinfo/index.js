// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();//注意，不是wx.cloud.database()，这种是小程序端操作数据库的写法。云端没有“wx.”
 
// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()//目的：获取_openid
  await db.collection("OpenidList").add({
    data: {
      avatarUrl: event.avatarUrl,
      city: event.city,
      country: event.country,
      gender: event.gender,
      language: event.language,
      nickName: event.nickName,
      openId: OPENID,
      province: event.province
    }, success: adduser => {
      return(adduser)
    }, fail: err => {
      wx.showToast({
        icon: 'none',
        title: '新增用户失败',
      })
    }
  })
}