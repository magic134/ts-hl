/**
 * 通用响应封装，与客户端 MResponse 保持一致
 */
export class MResponse<T> {
    code: number;
    data: T;
    msg: string;

    constructor(code: number, msg: string, data?: T) {
        this.code = code;
        this.msg = msg;
        this.data = data as T;
    }

    hasError(): boolean {
        return this.code > 0;
    }

    isOK(): boolean {
        return this.code === 0;
    }
}

export function success<T>(data: T, msg = ""): MResponse<T> {
    return new MResponse<T>(0, msg, data);
}

export function fail<T>(code: number, msg: string, data?: T): MResponse<T> {
    return new MResponse<T>(code, msg, data);
}
