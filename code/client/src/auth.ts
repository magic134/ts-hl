export interface Session {
    token: string;
    userId: number;
    accountId: number;
    name: string;
}

const KEY = "hlyx_session";

export function getSession(): Session | null {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
}

export function setSession(session: Session): void {
    localStorage.setItem(KEY, JSON.stringify(session));
    localStorage.setItem("hlyx_token", session.token);
}

export function clearSession(): void {
    localStorage.removeItem(KEY);
    localStorage.removeItem("hlyx_token");
}

export function isLoggedIn(): boolean {
    return !!getSession();
}
