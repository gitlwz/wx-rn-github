
const app = getApp()
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


const getSystemInfo = _this => {
    if (!!_this.data.systemInfo && Object.keys(_this.data.systemInfo).length !== 0) {
        return;
    } else if (app.globalData.systemInfo) {
        _this.setData({
            systemInfo: app.globalData.systemInfo,
        })
    } else {
        wx.getSystemInfo({
            success: (res) => {
                _this.setData({
                    systemInfo: res,
                })
                app.globalData.systemInfo = res;
            }
        })
    }
}

export {
    formatTime,
    getSystemInfo
}

