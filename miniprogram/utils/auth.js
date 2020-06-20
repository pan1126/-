export function requsetGetuserInfo(){
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'getuerinfo',
            success: res => {
              console.log("***userinfo");
              console.log(res)
              if(res.result && res.result.data.length==1){
                wx.setStorageSync('userInfo', res.result.data[0])
                resolve(res.result.data[0])
              }
            },
            fail: erro=> {
                reject('获取用户信息失败，等待重试!')
            }
        });
    })
};


export function requsetAdduserInfo(data){
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'adduserinfo',
            data:data,
            success: adduser => {
                console.log('新增用户成功')
                console.log(adduser)
               resolve(adduser)
            }
        });
    })
};