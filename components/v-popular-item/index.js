// components/v-popular-item/index.js
import PopularModel from "../../models/popular";
import { getStorage } from "../../utils/storage"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        windowHeight: { // 属性名
            type: Number,
            value: 0
        },
        name: String

    },

    /**
     * 组件的初始数据
     */
    data: {
        items: []
    },
    ready: function () {
        this.modal = new PopularModel();
        wx.showLoading()
        this.modal.onRefreshPopular(this.data.name)
            .then((items) => {
                wx.hideLoading();
                this.setData({
                    items
                })
            })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onTap({ currentTarget: { dataset: { item } } }) {
            getStorage("222")
            return;
            wx.navigateTo({
                url: `/pages/detail/detail?item=${JSON.stringify({ url: item.html_url, name: item.full_name })}`
            })
        }
    }
})
