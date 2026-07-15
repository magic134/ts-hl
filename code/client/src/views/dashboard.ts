import { clearSession, getSession } from "../auth";
import { renderLogin } from "./login";
import { renderUserHongli } from "./userHongli";
import { renderUserDeed } from "./userDeed";
import { renderUserMoney } from "./userMoney";
import { renderPetAll } from "./petAll";
import { renderPetNonEvolution } from "./petNonEvolution";
import { renderPersonalInfo } from "./personalInfo";

type View = "personal" | "hongli" | "deed" | "money" | "petAll" | "petNonEvolution";

interface MenuChild {
    key: View;
    label: string;
}

interface MenuGroup {
    label: string;
    icon: string;
    children: MenuChild[];
}

type MenuItem = { key: View; label: string; icon: string } | MenuGroup;

function isGroup(item: MenuItem): item is MenuGroup {
    return "children" in item;
}

const MENU: MenuItem[] = [
    { key: "personal", label: "个人信息", icon: "👤" },
    {
        label: "人物排行榜",
        icon: "📊",
        children: [
            { key: "hongli", label: "人物红利榜" },
            { key: "deed", label: "人物功德榜" },
            { key: "money", label: "人物幻币榜" }
        ]
    },
    {
        label: "宠物排行榜",
        icon: "🐾",
        children: [
            { key: "petAll", label: "宠物总榜" },
            { key: "petNonEvolution", label: "不可进化宠榜" }
        ]
    }
];

function findMenuLabel(view: View): string {
    for (const item of MENU) {
        if (isGroup(item)) {
            const child = item.children.find(c => c.key === view);
            if (child) return child.label;
        } else if (item.key === view) {
            return item.label;
        }
    }
    return "";
}

function renderMenu(): string {
    return MENU.map(item => {
        if (isGroup(item)) {
            return `
                <div class="menu-group" data-expanded="true">
                    <button class="menu-group-header">
                        <span class="menu-icon">${item.icon}</span>
                        <span class="menu-text">${item.label}</span>
                        <span class="menu-arrow">▼</span>
                    </button>
                    <div class="submenu">
                        ${item.children.map(c => `
                            <button class="submenu-item" data-view="${c.key}" data-label="${c.label}">
                                ${c.label}
                            </button>
                        `).join("")}
                    </div>
                </div>
            `;
        }
        return `
            <button class="menu-item" data-view="${item.key}" data-label="${item.label}">
                <span class="menu-icon">${item.icon}</span>
                <span class="menu-text">${item.label}</span>
            </button>
        `;
    }).join("");
}

/**
 * 渲染后台管理布局
 */
export function renderDashboard(container: HTMLElement): void {
    const session = getSession();
    const userName = session?.name || "管理员";

    container.innerHTML = `
        <div class="admin-layout">
            <header class="admin-header">
                <div class="header-left">
                    <span class="admin-logo">🎮</span>
                    <span class="system-name">幻灵管理后台</span>
                </div>
                <div class="header-right">
                    <span class="current-user">${userName}</span>
                    <button id="logout-btn" class="btn btn-logout">退出登录</button>
                </div>
            </header>
            <div class="admin-body">
                <aside class="admin-sidebar">
                    <nav class="admin-menu">
                        ${renderMenu()}
                    </nav>
                </aside>
                <main class="admin-main">
                    <div class="admin-main-header">
                        <h3 id="page-title">个人信息</h3>
                    </div>
                    <div id="content" class="admin-content"></div>
                </main>
            </div>
            <footer class="admin-footer">
                <span>幻灵管理后台 v1.0</span>
            </footer>
        </div>
    `;

    const content = document.getElementById("content")!;
    const pageTitle = document.getElementById("page-title")!;

    // 一级菜单（无子菜单）点击直接切换页面
    document.querySelectorAll(".menu-item[data-view]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const view = (btn as HTMLElement).dataset.view as View;
            switchView(view, content, pageTitle);
        });
    });

    // 二级菜单折叠展开
    document.querySelectorAll(".menu-group-header").forEach((header) => {
        header.addEventListener("click", () => {
            const group = header.closest(".menu-group") as HTMLElement;
            const expanded = group.dataset.expanded === "true";
            group.dataset.expanded = String(!expanded);
        });
    });

    // 二级菜单子项点击切换页面
    document.querySelectorAll(".submenu-item[data-view]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const view = (btn as HTMLElement).dataset.view as View;
            switchView(view, content, pageTitle);
        });
    });

    document.getElementById("logout-btn")!.addEventListener("click", () => {
        clearSession();
        renderLogin(container);
    });

    switchView("personal", content, pageTitle);
}

function switchView(view: View, container: HTMLElement, titleEl: HTMLElement): void {
    const label = findMenuLabel(view);
    titleEl.textContent = label;

    // 菜单高亮
    document.querySelectorAll(".menu-item[data-view], .submenu-item[data-view]").forEach((btn) => {
        const isActive = (btn as HTMLElement).dataset.view === view;
        btn.classList.toggle("active", isActive);
    });

    // 父级菜单高亮（如果当前页面属于该分组）
    document.querySelectorAll(".menu-group").forEach((group) => {
        const hasActiveChild = group.querySelector(".submenu-item.active") !== null;
        const header = group.querySelector(".menu-group-header");
        header?.classList.toggle("active", hasActiveChild);
    });

    container.innerHTML = "<p>加载中...</p>";
    switch (view) {
        case "personal":
            renderPersonalInfo(container);
            break;
        case "hongli":
            renderUserHongli(container);
            break;
        case "deed":
            renderUserDeed(container);
            break;
        case "money":
            renderUserMoney(container);
            break;
        case "petAll":
            renderPetAll(container);
            break;
        case "petNonEvolution":
            renderPetNonEvolution(container);
            break;
    }
}
