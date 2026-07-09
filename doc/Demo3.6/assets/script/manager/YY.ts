import { AxiosMgr } from "./AxiosMgr";

export class Setup {
    constructor() {
        globalThis.yy = yy;
        yy.axiosMgr = new AxiosMgr();
    }
}

export default class yy {

    static axiosMgr: AxiosMgr;
}