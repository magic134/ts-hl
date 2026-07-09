const TITLE_MAP: Record<number, Record<number, string>> = {
    0: { 0: "凡人", 1: "散仙" },
    1: {
        0: "凡人",
        1: "散仙",
        2: "地仙",
        3: "天仙",
        4: "大罗金仙",
        15: "通灵天神",
        25: "巡游天神",
        35: "功德天神",
        45: "火淬天神",
        55: "尚武天神"
    },
    2: {
        0: "凡人",
        1: "散仙",
        2: "夜叉",
        3: "阿修罗",
        4: "魔神",
        15: "摄魂魔尊",
        25: "堕天魔尊",
        35: "泯灭魔尊",
        65: "幻变魔尊",
        75: "嗜血魔尊"
    }
};

export function getTitle(metempsychosis: number): string {
    const xian = metempsychosis % 10;
    const type = Math.floor(metempsychosis / 1000);
    return TITLE_MAP[xian]?.[type] || "未知";
}

export function getToutai(metempsychosis: number): number {
    return Math.floor((metempsychosis % 1000) / 10);
}

export function getAvatarFilename(look: number): string {
    if (look < 18) return `Man0${Math.floor(look / 3 + 1)}`;
    if (look < 36 && look > 17) return `Woman0${Math.floor(look / 3 - 5)}`;
    if (look === 190) return "Man07";
    if (look === 191) return "Man08";
    if (look === 192) return "Woman07";
    if (look === 193) return "Woman08";
    return "";
}

export function renderAvatar(look: number, name: string, size: number): string {
    const filename = getAvatarFilename(look);
    const initial = name ? name[0] : "?";
    return `
        <span class="avatar" style="width:${size}px;height:${size}px;line-height:${size}px;" data-initial="${initial}">
            <img src="/img/${filename}.bmp" width="${size}" onerror="this.style.display='none'" />
        </span>
    `;
}
