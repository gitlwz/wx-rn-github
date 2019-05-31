
export default class Star {
    constructor(key) {
        this.key = key;
        this.storageKey = key + "star"
    }
    onStar(item) {
        wx.getStorage({
            key: this.storageKey,
            success: (res) => {
                let datas = res.data;
                let dataIndex = datas.findIndex((ele) => ele.id === item.id);
                if (item.star) {
                    if (dataIndex !== -1) { //存在
                        if (!datas[dataIndex].star) {
                            datas[dataIndex].star = true;
                        }
                    } else {
                        datas.push(item)
                    }
                } else {
                    if (dataIndex !== -1) { //存在
                        datas.splice(dataIndex, 1);
                    }
                }
                this.setStorage(datas)
            },
            fail: (res) => {
                if (res.errMsg === "getStorage:fail data not found") {
                    let items = [item];
                    this.setStorage(items)
                }
            }
        })
    }
    setStorage(items) {
        wx.setStorage({
            key: this.storageKey,
            data: items
        })
    }
}