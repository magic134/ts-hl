
/**
 * 类作用描述
 * @author iopq.net
 * @date 2021-04-01 10:09
 */

import { Axios, AxiosError, AxiosResponse } from 'axios';
import MResponse from '../entity/MResponse';
import { Player } from '../entity/Player';

export const axios: Axios = globalThis.axios || (<any>window).axios;

export class AxiosMgr {
    constructor() { }

    get(url: string, params: { [propname: string]: any }): Promise<AxiosResponse> {
        return axios.get(url, { params, headers: { Authorization: Player.inst.token } });
    }
    post(url: string, data: any): Promise<any> {
        return axios.post(url, data, { headers: { Authorization: Player.inst.token } });
    }

    put(url: string, data: any): Promise<any> {
        return axios.put(url, data, { headers: { Authorization: Player.inst.token } })
    }

    delete(url: string): Promise<any> {
        return axios.delete(url, { headers: { Authorization: Player.inst.token } })
    }

    /**
     * axios请求服务器数据(封装)
     * @param _name 接口名字
     * @param data 需要传的数据
     * @param cb 回调函数
     */
    AxiosGet<T>(url: string, params?: { [propname: string]: any }): Promise<MResponse<T>> {
        return new Promise((resolve, reject) => {
            url = Player.inst.http + url;
            this.get(url, params)
                .then((ret: AxiosResponse) => {
                    // WaitCtrl.hide();
                    if (ret.status == 200) {
                        resolve(ret.data);
                    } else {
                        resolve(new MResponse(ret.status, ret.statusText));
                    }

                })
                .catch((err: AxiosError) => {
                    resolve(new MResponse(500, err.message))
                })
        })
    }

    /**
     * axios的post请求
     * @param _name url:Player.inst.http + '/api/v1/game/' +_name 是url的game之后的路径
     * @param data  请求数据
     * @returns 
     */
    AxiosPost<T>(url: string, data: any): Promise<MResponse<T>> {
        return new Promise((resolve, reject) => {                          // promise 异步请求
            url = Player.inst.http + url;  // 请求接口的url
            this.post(url, data)
                .then((ret: AxiosResponse) => {
                    // WaitCtrl.hide();
                    let res: MResponse<T> = typeof ret.data == 'string' ? JSON.parse(ret.data) : ret.data; // 请求回来的数据
                    if (ret.status == 200) {
                        resolve(ret.data);
                    } else {
                        resolve(new MResponse(ret.status, ret.statusText));
                    }
                })
                .catch((err: AxiosError) => {
                    resolve(new MResponse(500, err.message))
                    // AlertCtrl.show('错误', '请刷新');
                })
        })
    }

    /**
     * axios的put请求
     * @param _name url拼接文件名
     * @param data 数据
     * @param ref 回调函数(主要执行刷新操作)
     * @returns 
     */
    AxiosPut<T>(url: string, data: any, ref?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            url = Player.inst.http + url;
            this.put(url, data)
                .then((ret: AxiosResponse) => {
                    // WaitCtrl.hide();
                    let res: MResponse<T> = ret.data;
                    if (res.code == 0) {
                        resolve(res.data);
                    } else if (res.code == 1) {
                        // res.msg && AlertCtrl.show('提示', res.msg);
                    } else if (res.code == 2) { // 刷新
                        // res.msg && AlertCtrl.show('提示', res.msg);
                        ref && ref()
                        resolve(null);
                    } else {
                        resolve(new MResponse(res.code, res.msg))
                    }
                })
                .catch((err) => {
                    resolve(new MResponse(500, err.message))
                })
        })
    }

    /**
     * axios的delete请求
     * @param _name  url拼接文件名
     * @returns 
     */
    AxiosDelete<T>(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            url = Player.inst.http + url;
            this.delete(url)
                .then((ret: AxiosResponse) => {
                    // WaitCtrl.hide();
                    let res: MResponse<T> = ret.data;
                    if (res.code == 0) {
                        resolve(res.data);
                    } else if (res.code == 1 || res.code == 2) {
                        // res.msg && AlertCtrl.show('提示', res.msg);
                    } else {
                        resolve(new MResponse(res.code, res.msg))
                    }
                })
                .catch((err) => {
                    resolve(new MResponse(500, err.message))
                    // AlertCtrl.show('错误', err.msg);
                })
        })
    }
}