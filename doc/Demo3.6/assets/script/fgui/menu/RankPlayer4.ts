import { color, Component, _decorator } from 'cc';
import * as fgui from "fairygui-cc";
import { UserVo } from '../../entity/vo/UserVo';
import yy from '../../manager/YY';
import { ToolUtils } from '../../tools/ToolUtils';
import { Alert } from '../Alert';
import { dataMgr } from '../mgr/DataMgr';
const { ccclass, property } = _decorator;

@ccclass('RankPlayer4')
export class RankPlayer4 extends Component {
    private _view: fgui.GComponent = null;


    private datas: UserVo[];

    async start() {
        this._view = fgui.UIPackage.createObject("App", "RankPlayerToutai").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this.loadList("5");
    }


    private async loadList(rankType: string) {
        this._view.getChild('title').text = '人物功德排行榜'
        let key = rankType;
        if (rankType == null || rankType == '') {
            key = "0" + "0";
        }
        let obj = dataMgr.userObj[key];
        if (obj != null && (Date.now() - obj.time < 10 * 60 * 1000)) {
            this.datas = obj.users;
        } else {
            let res = await yy.axiosMgr.AxiosPost<UserVo[]>("/user/findRank", { rankType: rankType });
            if (res.code) {
                return Alert.show("错误" + res.code, res.msg);
            }
            dataMgr.userObj[key] = { time: Date.now(), users: res.data };
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
        cc.selectedIndex = index % 2
        button.title = "" + (index + 1);
        button.icon = ToolUtils.head(data.look);
        button.getChild("name").text = data.name;
        const ch = ToolUtils.chenghao(data.metempsychosis)
        button.getChild("chenghao").text = `${ch.chenghao} [${data.toutaishu}]`;// `${ch.chenghao}[${ch.toutai}]`;
        button.getChild("additional_point").text = "红利：" + ToolUtils.fmtLocalString(data.hongli); //Math.floor(data.additional_point / 100000);
        button.getChild("level").text = "等级：" + ToolUtils.fmtLocalString(data.level);
        button.getChild("love").text = "爱心：" + ToolUtils.fmtLocalString(data.love);

        button.getChild("mate").text = "配偶：" + data.mate;
        button.getChild("degree_lev").text = "修为：" + ToolUtils.fmtLocalString(data.degree_lev);
        button.getChild("money").text = "金钱：" + ToolUtils.fmtLocalString(data.money);
        button.getChild("deed").text = "功德：" + ToolUtils.fmtLocalString(data.deed);
        button.getChild("exp_medicine").text = "养宠：" + ToolUtils.fmtLocalString(data.exp_medicine);

        button.getChild("monicker").text = "绰号：" + data.monicker;
        button.getChild("repute").text = "声望：" + ToolUtils.fmtLocalString(data.repute);
        button.getChild("exp_smith").text = "炼化：" + ToolUtils.fmtLocalString(data.exp_smith);
        button.getChild("exp_steal").text = "偷窃：" + ToolUtils.fmtLocalString(data.exp_steal);
        button.getChild("exp_creative").text = "创招：" + ToolUtils.fmtLocalString(data.exp_creative);




        button.getChild("deed", fgui.GTextField).color = color().fromHEX('#FF0000');
    }

    // private onChanged() {
    //     this.loadList(this.cmb1.value); 
    // }


    onDestroy() {
        this._view.removeFromParent();
    }

    // update(deltaTime: number) {

    // }
}

