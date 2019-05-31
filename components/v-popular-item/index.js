// components/v-popular-item/index.js
import PopularModel from "../../models/popular";
import TrendingModel from "../../models/trending";
import StarModel from "../../models/star";
const app = getApp()
const { pubsub } = app.globalData;
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
        wx.showLoading()
        console.log(this)
        if (this.data.key === "favorite") {
            pubsub.subscribe("tab.favorite", () => {
                this.favorite()
            })
            this.favorite()
        } else if (this.data.key === "trending") {
            pubsub.subscribe("tab.trending", () => {
                this.trending()
            })
            this.trending()
        } else {
            pubsub.subscribe("tab.popular", () => {
                this.popular()
            })
            this.popular()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onTap({ currentTarget: { dataset: { item } } }) {
            let key = this.data.key === "favorite" ? this.data.name : this.data.key;
            let url = key === "trending" ? 'https://github.com/' + item.url : item.url;
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
        },
        favorite() {
            console.log("favorite")
            this.starModal = new StarModel(this.data.name);
            this.starModal.onGetStar()
                .then((items) => {
                    wx.hideLoading();
                    this.setData({
                        items
                    })
                })
        },
        trending() {
            console.log("trending")
            this.starModal = new StarModel(this.data.key);
            this.TrendingModel.onRefreshTrending(this.data.name)
                .then((items) => {
                    wx.hideLoading();
                    this.setData({
                        items
                    })
                })
        },
        popular() {
            console.log("popular")
            this.starModal = new StarModel(this.data.key);
            this.modal.onRefreshPopular(this.data.name)
                .then((items) => {
                    wx.hideLoading();
                    this.setData({
                        items
                    })
                })
        }
    }
})
