
import { HTTP } from "../utils/http";
import { handlData } from "../utils/util"
import { getStorage, setStorage } from "../utils/storage"
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export const KEY = "popular";
export default class PopularModel {
    constructor(key) {
        this.key = key;
        this.starKey = key + "star"
    }
    onRefreshPopular(key) {
        let url = URL + key + QUERY_STR;
        let storageKey = KEY + key;
        return new Promise((resolve, reject) => {
            getStorage(storageKey)
                .then(({ status, data }) => {
                    if (status) {
                        handlData(this.starKey, data)
                            .then(resolve)
                    } else {
                        HTTP.request({ url })
                            .then((res) => {
                                if (res.data && res.data.items) {
                                    let datas = res.data.items.map((ele) => {
                                        return {
                                            avatar_url: ele.owner.avatar_url,
                                            count: ele.stargazers_count,
                                            url: ele.html_url,
                                            name: ele.full_name,
                                            description: ele.description,
                                            id: ele.id
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