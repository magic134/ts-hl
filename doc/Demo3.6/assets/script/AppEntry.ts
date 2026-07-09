import { Component, UIRenderer, _decorator } from 'cc';
import * as fgui from "fairygui-cc";
import yy, { Setup } from './manager/YY';
import { Alert } from './fgui/Alert';
import { RankPet } from './fgui/menu/RankPet';
import { RankPet2 } from './fgui/menu/RankPet2';
import { RankPet3 } from './fgui/menu/RankPet3';
import { RankPet4 } from './fgui/menu/RankPet4';
import { RankPet5 } from './fgui/menu/RankPet5';
import { RankPet6 } from './fgui/menu/RankPet6';
import { RankPet7 } from './fgui/menu/RankPet7';
import { RankPet72 } from './fgui/menu/RankPet72';
import { RankPet73 } from './fgui/menu/RankPet73';
import { RankPet74 } from './fgui/menu/RankPet74';
import { RankPet75 } from './fgui/menu/RankPet75';
import { RankPet76 } from './fgui/menu/RankPet76';
import { RankPlayer0 } from './fgui/menu/RankPlayer0';
import { RankPlayer1 } from './fgui/menu/RankPlayer1';
import { RankPlayer2 } from './fgui/menu/RankPlayer2';
import { RankPlayer3 } from './fgui/menu/RankPlayer3';
import { RankPlayer4 } from './fgui/menu/RankPlayer4';
import { RankPlayer5 } from './fgui/menu/RankPlayer5';
import { RankPlayer6 } from './fgui/menu/RankPlayer6';
import { RankPlayer7 } from './fgui/menu/RankPlayer7';
import { RankPlayer8 } from './fgui/menu/RankPlayer8';
import { RankPlayer9 } from './fgui/menu/RankPlayer9';

const { ccclass, property } = _decorator;

@ccclass('AppEntry')
export class AppEntry extends Component {

    private _view: fgui.GComponent = null;
    private _closeButton: fgui.GObject = null!;
    private _currentComp: Component = null!;

    onLoad() {

        console.log(">>> AppEntry onLoad");

        fgui.GRoot.create();

        // let str = "15:23:52 account: 同意玩家[1][2000]按[1]类型登录[黄金大地]。认证ID[0512CD2A]，IP[127.0.0.1]，计费帐号[]，通知[]";
        // let obj = {};
        // if (str.includes('同意玩家')) {
        //     var temp = str.split(/[\[\]\n\s+,，。]/g);
        //     console.log(temp);
        // }
    }

    start() {
        fgui.UIPackage.loadPackage("UI/App", this.onUILoaded.bind(this));
    }

    private onUILoaded(a: any, ui: fgui.UIPackage, c: any) {
        new Setup();
        console.log(">>> AppEntry onUILoaded");
        this._view = fgui.UIPackage.createObject("App", "Menu").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this.addComponent(Alert);
        this.show();
    }

    async show() {

        this._view.visible = true;

        // 按钮操作
        this._view.getChild("btn_player_rank0").onClick((a, b, c, d) => {
            this.startComp(RankPlayer0);
        });
        this._view.getChild("btn_player_rank1").onClick(() => {
            this.startComp(RankPlayer1);
        });
        this._view.getChild("btn_player_rank2").onClick(() => {
            this.startComp(RankPlayer2);
        });
        this._view.getChild("btn_player_rank3").onClick(() => {
            this.startComp(RankPlayer3);
        });
        this._view.getChild("btn_player_rank4").onClick(() => {
            this.startComp(RankPlayer4);
        });
        this._view.getChild("btn_player_rank5").onClick(() => {
            this.startComp(RankPlayer5);
        });
        this._view.getChild("btn_player_rank6").onClick(() => {
            this.startComp(RankPlayer6);
        });
        this._view.getChild("btn_player_rank7").onClick(() => {
            this.startComp(RankPlayer7);
        });
        this._view.getChild("btn_player_rank8").onClick(() => {
            this.startComp(RankPlayer8);
        });
        this._view.getChild("btn_player_rank9").onClick(() => {
            this.startComp(RankPlayer9);
        });
        // this._view.getChild("btn_player_rank10").onClick(() => {
        //     Alert.show("敬请期待", "玩法：\n1、由玩家提供拍卖物品或宠物。\n2、管理统一收集上架。\n3、拍卖成功的物品直接到玩家当铺或宠物店")
        // });


        this._view.getChild("btn_pet_rank1").onClick(() => {
            this.startComp(RankPet);
        });
        this._view.getChild("btn_pet_rank2").onClick(() => {
            this.startComp(RankPet2);
        });
        this._view.getChild("btn_pet_rank3").onClick(() => {
            this.startComp(RankPet3);
        });
        this._view.getChild("btn_pet_rank4").onClick(() => {
            this.startComp(RankPet4);
        });
        this._view.getChild("btn_pet_rank5").onClick(() => {
            this.startComp(RankPet5);
        });
        this._view.getChild("btn_pet_rank6").onClick(() => {
            this.startComp(RankPet6);
        });
        this._view.getChild("btn_pet_rank71").onClick(() => {
            this.startComp(RankPet7);
        });
        this._view.getChild("btn_pet_rank72").onClick(() => {
            this.startComp(RankPet72);
        });
        this._view.getChild("btn_pet_rank73").onClick(() => {
            this.startComp(RankPet73);
        });
        this._view.getChild("btn_pet_rank74").onClick(() => {
            this.startComp(RankPet74);
        });
        this._view.getChild("btn_pet_rank75").onClick(() => {
            this.startComp(RankPet75);
        });
        this._view.getChild("btn_pet_rank76").onClick(() => {
            this.startComp(RankPet76);
        });
    }

    private _onClicked(event: any) {
        const name = event.currentTarget.$gobj.name;
    }

    startComp(demoClass: typeof Component): void {
        let demo: Component = this.addComponent(demoClass)!;
        this._currentComp = demo;
        this._closeButton = fgui.UIPackage.createObject("App", "CloseButton");
        this._closeButton.setPosition(fgui.GRoot.inst.width - this._closeButton.width - 10, 10);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Right_Right);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Top_Top);
        // this._closeButton.setPosition(fgui.GRoot.inst.width - this._closeButton.width - 10, fgui.GRoot.inst.height - this._closeButton.height - 10);
        // this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Right_Right);
        // this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Bottom_Bottom);
        this._closeButton.sortingOrder = 100;
        this._closeButton.onClick(this.onCompClosed, this);
        fgui.GRoot.inst.addChild(this._closeButton);
        this._view.visible = false;
    }


    private onCompClosed() {

        if (this._currentComp) {
            // fgui.GRoot.inst.removeChildren(0, -1, true);
            fgui.GRoot.inst.removeChild(this._closeButton, true);
            this._currentComp.destroy();
            this._currentComp = null;
        }


        this._view.visible = true;
    }

}

