// components/v-popular-item/index.js
import PopularModel from "../../models/popular";
import TrendingModel from "../../models/trending";
import StarModel from "../../models/star";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        windowHeight: { // 属性名
            type: Number,
            value: 0
        },
        name: String,
        key: String

    },

    /**
     * 组件的初始数据
     */
    data: {
        items: []
    },
    ready: function () {
        this.modal = new PopularModel(this.data.key);
        this.TrendingModel = new TrendingModel(this.data.key)
        this.starModal = new StarModel(this.data.key);
        wx.showLoading()
        if (this.data.key === "trending") {
            this.TrendingModel.onRefreshTrending(this.data.name)
                .then((items) => {
                    wx.hideLoading();
                    this.setData({
                        items
                    })
                })
        } else {
            this.modal.onRefreshPopular(this.data.name)
                .then((items) => {
                    wx.hideLoading();
                    this.setData({
                        items
                    })
                })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onTap({ currentTarget: { dataset: { item } } }) {
            let url = this.data.key === "trending" ? 'https://github.com/' + item.url : item.url;
            wx.navigateTo({
                url: `/pages/detail/detail?item=${JSON.stringify({ url: url, name: item.name })}`
            })
        },
        starClick({ currentTarget: { dataset: { star, id } } }) {
            let items = this.data.items;
            let item = items.find((ele) => ele.id === id);
            item.star = !star;
            this.starModal.onStar({ ...item });
            this.setData({
                items: [...items]
            })
        }
    }
})
