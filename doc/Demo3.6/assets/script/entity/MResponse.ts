/**
 * 服务器返回信息简单封装
 */
 export default class MResponse<T> {
    /** 结果码,0代表正常,其他为异常 */
    public code: number;
    /** 返回数据结构体 */
    public data: T;
    /** 错误时，错误消息 */
    public msg: string;
    // /** 提示结果码,不同数字代表不同的提示 */
    // public msgCode: number;

    /** 构造方法 */
    constructor(code:number,msg:string,data?:T) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    /** 判断是否有异常 */
    public hasError(): boolean {
        return this.code > 0;
    }
    /** 判断是否正常 */
    public isOK(): boolean {
        return this.code == 0;
    }
}