//app.js
import pubsub from "./utils/pubsub"
App({
    onLaunch: function (a, b) {
    },
    globalData: {
        userInfo: null,
        pubsub: pubsub,
        theme: "#2196F3"
    }
})