
import { HTTP } from "../utils/http";
import { getStorage, setStorage, falg } from "../utils/storage"
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularModel {
    onRefreshPopular(key) {
        let url = URL + key + QUERY_STR;
        let storageKey = falg.popular + key;
        return new Promise((resolve, reject) => {
            getStorage(storageKey)
                .then(({ status, data }) => {
                    if (status) {
                        resolve(data)
                    } else {
                        HTTP.request({ url })
                            .then((res) => {
                                if (res.data && res.data.items) {
                                    setStorage(storageKey, res.data.items)
                                    resolve(res.data.items)
                                } else {
                                    reject();
                                }
                            })
                    }
                })

        })
    }
}