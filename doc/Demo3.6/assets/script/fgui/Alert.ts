import { _decorator, Component, Node } from 'cc';
import * as fgui from "fairygui-cc";
const { ccclass, property } = _decorator;

@ccclass('Alert')
export class Alert extends Component {
    private _view: fgui.GComponent = null;

    private title: fgui.GTextField;
    private content: fgui.GTextField;
    private btn_ok: fgui.GButton;
    private btn_cancel: fgui.GButton;
    private callBackOK: Function;
    private callBackCanel: Function;

    private static inst: Alert;
    start() {
        Alert.inst = this;
        this._view = fgui.UIPackage.createObject("App", "Alert").asCom;
        this._view.makeFullScreen();
        this._view.sortingOrder = 1000;
        fgui.GRoot.inst.addChild(this._view);
        this._view.visible = false;
        this.title = this._view.getChild("title", fgui.GTextField);
        this.content = this._view.getChild("content", fgui.GTextField);
        this.btn_ok = this._view.getChild("btn_ok", fgui.GButton);
        this.btn_cancel = this._view.getChild("btn_cancel", fgui.GButton);
        this.btn_ok.onClick(this.onOkClicked, this);
        this.btn_cancel.onClick(this.onCancelClicked, this);
    }

    /**
 * 显示弹窗
 * @param title 标题，为空不显示 
 * @param content 内容，为空不显示
 * @param callBackOK 点击确定按钮回调，空则不返回，只关闭窗口
 * @param callBackCanel 点击取消按钮回调，空不显示取消按钮
 * @param lab_ok 确定按钮标题
 * @param lab_canel 取消按钮标题
 */
    static show(title: string, content: string, callBackOK?: Function, callBackCanel?: Function, lab_ok?: string, lab_canel?: string) {
        Alert.inst.showUI(title, content, callBackOK, callBackCanel, lab_ok, lab_canel);
    }
    showUI(title: string, content: string, callBackOK: Function, callBackCanel: Function, lab_ok: string, lab_canel: string) {
        this.title.text = title ?? "";
        this.content.text = content ?? "";
        this.callBackOK = callBackOK;
        this.callBackCanel = callBackCanel;
        this.btn_cancel.visible = callBackCanel != null;
        this.btn_ok.text = lab_ok ?? "确定";
        this.btn_cancel.text = lab_canel ?? "取消";

        this._view.visible = true;
    }

    static hide() {
        Alert.inst._view.visible = false;
    }



    private onOkClicked() {
        if (this.callBackOK != null) {
            this.callBackOK();
            this.callBackOK = null;
        }
        this._view.visible = false;
    }

    private onCancelClicked() {
        if (this.callBackCanel != null) {
            this.callBackCanel();
            this.callBackCanel = null;
        }
        this._view.visible = false;
    }

    // update(deltaTime: number) {

    // }
}

