function getStorage(key) {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: key,
            success: ({ data: res }) => {
                if (!!res.timestamp && new Date().getTime() - res.timestamp > 7 * 60 * 60 * 1000) {
                    resolve({
                        status: false
                    })
                } else {
                    resolve({
                        status: true,
                        data: res.data
                    })
                }
            },
            fail: (res) => {
                resolve({
                    status: false
                })
            }
        })
    })
}

function setStorage(key, data) {
    let _data = {
        data: data,
        timestamp: new Date().getTime()
    }
    wx.setStorage({
        key: key,
        data: _data
    })
}

export { getStorage }
export { setStorage }
export const falg = { popular: "popular" }