import { UserVo } from "./vo/UserVo";

export class Player {

    private static _inst: Player = null;
    public static get inst() {
        return this._inst = this._inst || new Player(); //实例化玩家类
    }

    http_host: string = '101.35.55.31'; http_port: string = '8081';
    // http_host: string = '127.0.0.1'; http_port: string = '8081';

    public get http(): string {
        // console.log(">>>当前连接", Player.inst.http_host, Player.inst.http_port);
        return 'http://' + Player.inst.http_host + ':' + Player.inst.http_port;
    }   // http 前缀

    token: string;

    userInfo: UserVo;
}