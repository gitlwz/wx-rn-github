/**
 * 从https://github.com/trending获取数据
 * 项目地址:https://github.com/crazycodeboy/GitHubTrending
 * 博客地址:http://www.devio.org
 * @flow
 */
import TrendingUtil from './TrendingUtil';

export default class GitHubTrending {
    constructor() {//Singleton pattern
        if (typeof GitHubTrending.instance === 'object') {
            return GitHubTrending.instance;
        }
        GitHubTrending.instance = this;
    }

    fetchTrending(url) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                success: (responseData) => {
                    try {
                        resolve(TrendingUtil.htmlToRepo(responseData.data));
                    } catch (e) {
                        reject(e);
                    }
                },
                fail: (error) => {
                    reject()
                }
            })
        });
    }
}
