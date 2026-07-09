import { math } from "cc";

export class ToolUtils {

    private static chenghaoArr: string[][];

    public static head(look: number) {
        let filename: string = "";
        if (look < 18) {
            filename = 'Man0' + Math.floor(look / 3 + 1);
        } else if (look < 36 && look > 17) {
            filename = 'Woman0' + Math.floor(look / 3 - 5);
        } else if (look == 190) {
            filename = 'man07';
        } else if (look == 191) {
            filename = 'man08';
        } else if (look == 192) {
            filename = 'woman07';
        } else if (look == 193) {
            filename = 'woman08';
        }
        return "ui://App/" + filename;
    }


    public static chenghao(metempsychosis: number): { chenghao: string, toutai: number } {
        if (metempsychosis == 0) {
            return { chenghao: '凡人', toutai: 0 };
        }
        const xian = metempsychosis % 10;
        const type = Math.floor(metempsychosis / 1000);
        if (this.chenghaoArr == null) {
            this.chenghaoArr = [[], [], []];
            this.chenghaoArr[0][0] = '凡人';
            this.chenghaoArr[0][1] = '散仙';
            this.chenghaoArr[1][0] = '凡人';
            this.chenghaoArr[1][1] = '散仙';
            this.chenghaoArr[1][2] = '地仙';
            this.chenghaoArr[1][3] = '天仙';
            this.chenghaoArr[1][4] = '大罗金仙';
            this.chenghaoArr[1][15] = '通灵天神';
            this.chenghaoArr[1][25] = '巡游天神';
            this.chenghaoArr[1][35] = '功德天神';
            this.chenghaoArr[1][45] = '火淬天神';
            this.chenghaoArr[1][55] = '尚武天神';
            this.chenghaoArr[2][0] = '凡人';
            this.chenghaoArr[2][1] = '散仙';
            this.chenghaoArr[2][2] = '夜叉';
            this.chenghaoArr[2][3] = '阿修罗';
            this.chenghaoArr[2][4] = '魔神';
            this.chenghaoArr[2][15] = '摄魂魔尊';
            this.chenghaoArr[2][25] = '堕天魔尊';
            this.chenghaoArr[2][35] = '泯灭魔尊';
            this.chenghaoArr[2][65] = '幻变魔尊';
            this.chenghaoArr[2][75] = '嗜血魔尊';
        }

        return { chenghao: this.chenghaoArr[xian][type], toutai: Math.floor(metempsychosis / 10) % 100 }
    }

    public static item_sort(item_sort: number): string {
        switch (item_sort) {
            case 0: return "剑"
            case 5: return "扇";
            case 100: return "防具";
            case 200: return "鞋子";
            case 300: return "身饰";
            case 400: return "头饰";
            case 500: return "暗器";
            case 600: return "毒药";
            case 700: return "治伤药";
            default: return item_sort.toString();
        }
    }

    public static fmtLocalString(val:any) {
        if(val !== null) {
           return Number(val).toLocaleString('zh-CN');
        }else {
            return val;
        }
        
    }

}

