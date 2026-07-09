import { PetRankBean } from "../../entity/vo/PetRankBean";
import { UserVo } from "../../entity/vo/UserVo";

export class DataMgr {
    public petObj: { [key: string]: { time: number, pets: PetRankBean[] } };
    public userObj: { [key: string]: { time: number, users: UserVo[] } };

    constructor() {
        this.petObj = {};
        this.userObj = {};
    }
}

let inst: DataMgr = null;
export const dataMgr: DataMgr = (() => {
    if (inst == null) {
        inst = new DataMgr();
    }
    return inst;
}

)();