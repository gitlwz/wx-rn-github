// components/v-popular/index.js
import { getSystemInfo } from "../../utils/util";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs: { // 属性名
            type: Array,
            value: []
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        systemInfo: 44,
        titles: {
            0: true
        }
    },
    ready: function () {
        getSystemInfo(this);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onChange({ detail }) {
            let _titles = this.data.titles;
            wx.hideLoading();
            if (!_titles[detail.index]) {
                this.setData({
                    titles: { ..._titles, [detail.index]: true }
                })
            }
        }
    }
})
