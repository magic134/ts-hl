import { Component, _decorator } from 'cc';
import * as fgui from "fairygui-cc";
import { PetRankBean } from '../../entity/vo/PetRankBean';
import yy from '../../manager/YY';
import { Alert } from '../Alert';
import { dataMgr } from '../mgr/DataMgr';
const { ccclass, property } = _decorator;

@ccclass('RankPet')
export class RankPet extends Component {
    private _view: fgui.GComponent = null;

    private datas: PetRankBean[];

    private cmb1: fgui.GComboBox;
    private cmb2: fgui.GComboBox;

    async start() {
        this._view = fgui.UIPackage.createObject("App", "RankPet").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this.loadList("", "1");

        this.cmb1 = this._view.getChild("cmb1", fgui.GComboBox);
        this.cmb2 = this._view.getChild("cmb2", fgui.GComboBox);
        this.cmb1.on(fgui.Event.STATUS_CHANGED, this.onChanged, this);
        this.cmb2.on(fgui.Event.STATUS_CHANGED, this.onChanged, this);
    }

    private onChanged() {
        this.loadList(this.cmb1.value, this.cmb2.value);
    }

    /**
     * 加载排行版数据
     * @param catena 水2，火3，金4，木5，土6，无属性7
     * @param isEvolution 进化1，不进化7
     * @returns 
     */
    private async loadList(catena: string, isEvolution: string) {
        let key = catena + "_" + isEvolution;
        if ((catena == null || catena == '') && (isEvolution == null || isEvolution == '')) {
            key = "0" + "0";
        }
        let obj = dataMgr.petObj[key];
        if (obj != null && (Date.now() - obj.time < 10 * 60 * 1000)) {
            this.datas = obj.pets;
        } else {
            let res = await yy.axiosMgr.AxiosPost<PetRankBean[]>("/pet/findPetRank", { catena: catena, isEvolution: isEvolution });
            if (res.code) {
                return Alert.show("错误" + res.code, res.msg);
            }
            dataMgr.petObj[key] = { time: Date.now(), pets: res.data };
            this.datas = res.data;
        }



        let list = this._view.getChild("list", fgui.GList);
        list.itemRenderer = this.renderListItem.bind(this);
        list.setVirtual();
        list.numItems = this.datas.length;
    }

    private renderListItem(index: number, button: fgui.GButton) {
        let data = this.datas[index];
        let cc = button.getController('c1');
        cc.selectedIndex = index %2
        button.title = "" + (index + 1);
        button.getChild("owner_name").text = data.owner_name;
        button.getChild("pet_name").text = data.pet_name;
        button.getChild("pet_origin_name").text = data.pet_origin_name;
        button.getChild("grow_rate").text = Number(data.grow_point).toFixed(2) + "/" + Number(data.grow_rate).toFixed(2);//data.level > 1 ? (data.grow_point / (data.level - 1)).toFixed(2) : data.grow_rate;
        button.getChild("level").text = data.level + "";
        button.getChild("attack").text = data.attack + "";
        button.getChild("defence").text = data.defence + "";
        button.getChild("dexterity").text = data.dexterity + "";
        button.getChild("life").text = data.life + "";
        button.getChild("medal_attack").text = data.medal_attack + "";
        button.getChild("medal_defence").text = data.medal_defence + "";
        button.getChild("medal_dexterity").text = data.medal_dexterity + "";
    }


    onDestroy() {
        this._view.removeFromParent();
    }

    // update(deltaTime: number) {

    // }
}

