
import { HTTP, TrandingGh } from "../utils/http";
import { handlData } from "../utils/util"
import { getStorage, setStorage } from "../utils/storage"
const URL = 'https://github.com/trending/';
const QUERY_STR = '?since=monthly';
export const KEY = "trending";
export default class TrendingModel {
    constructor(key) {
        this.key = key;
        this.starKey = key + "star"
    }
    onRefreshTrending(key) {
        let url = URL + key + QUERY_STR;
        let storageKey = KEY + key;
        return new Promise((resolve, reject) => {
            getStorage(storageKey)
                .then(({ status, data }) => {
                    if (status) {
                        handlData(this.starKey, data)
                            .then(resolve)
                    } else {
                        TrandingGh.fetchTrending(url)
                            .then((res) => {
                                if (res && res.length !== 0) {
                                    let datas = res.map((ele) => {
                                        return {
                                            avatar_url: ele.contributors[0],
                                            count: ele.forkCount,
                                            url: ele.url,
                                            name: ele.fullName,
                                            description: ele.description.replace(/(<g-emoji.*">)|(<\/g-emoji>)|(<a.*<\/a>)|(<img.*>)/g,""),
                                            id: ele.fullName
                                        }
                                    })
                                    setStorage(storageKey, datas)
                                    handlData(this.starKey, datas)
                                        .then(resolve)
                                } else {
                                    reject();
                                }
                            })
                    }
                })
        })
    }
}