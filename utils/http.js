const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效，请前往www.7yue.pro申请',
    3000: '期刊不存在'
}
const HTTP = {
    request({ url, data = {}, method = 'GET' }) {
        return new Promise((resolve, reject) => {
            HTTP._request(url, resolve, reject, data, method)
        })
    },
    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject()
                HTTP._show_error(1)
            }
        })
    },
    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export { HTTP }
