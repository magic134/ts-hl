import { authApi } from "../api";
import { setSession } from "../auth";
import { renderDashboard } from "./dashboard";

const REMEMBER_KEY = "hlyx_remember";
const CREDENTIALS_KEY = "hlyx_credentials";

function getRememberedCredentials(): { account: string; password: string } | null {
    try {
        const raw = localStorage.getItem(CREDENTIALS_KEY);
        if (!raw) return null;
        const decoded = atob(raw);
        const [account, password] = decoded.split(":");
        return account !== undefined && password !== undefined ? { account, password } : null;
    } catch {
        return null;
    }
}

function saveCredentials(account: string, password: string): void {
    localStorage.setItem(CREDENTIALS_KEY, btoa(`${account}:${password}`));
    localStorage.setItem(REMEMBER_KEY, "1");
}

function clearCredentials(): void {
    localStorage.removeItem(CREDENTIALS_KEY);
    localStorage.removeItem(REMEMBER_KEY);
}

export function renderLogin(container: HTMLElement): void {
    const remembered = getRememberedCredentials();
    const accountValue = remembered ? remembered.account : "";
    const passwordValue = remembered ? remembered.password : "";
    const checkedAttr = remembered ? "checked" : "";

    container.innerHTML = `
        <div class="login-box">
            <h2>幻灵游戏登录</h2>
            <form id="login-form">
                <div class="form-group">
                    <label>账号</label>
                    <input type="text" id="account" value="${accountValue}" required />
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" id="password" value="${passwordValue}" required />
                </div>
                <div class="form-group remember-group">
                    <label class="remember-label">
                        <input type="checkbox" id="remember" ${checkedAttr} />
                        记住密码
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">登录</button>
                <div id="login-error" class="error"></div>
            </form>
        </div>
    `;

    const form = document.getElementById("login-form") as HTMLFormElement;
    const errorEl = document.getElementById("login-error")!;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const account = (document.getElementById("account") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const remember = (document.getElementById("remember") as HTMLInputElement).checked;

        try {
            const res = await authApi.login({ account, password });
            setSession({
                token: res.token,
                userId: res.user.id,
                accountId: res.user.account_id,
                name: res.user.name
            });
            if (remember) {
                saveCredentials(account, password);
            } else {
                clearCredentials();
            }
            renderDashboard(container);
        } catch (err: any) {
            errorEl.textContent = err.message;
        }
    });
}
