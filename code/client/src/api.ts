import type {
    LoginRequest,
    LoginResponse,
    MResponse,
    PetLeaderboardRow,
    UserInfoRequest,
    UserLeaderboardRow,
    UserVo,
    EquippedItem,
    BackpackItem,
    UserPet
} from "./types/api";

const BASE = "/api";

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("hlyx_token") || "";
    const res = await fetch(BASE + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
            ...options.headers
        }
    });
    const json: MResponse<T> = await res.json();
    if (json.code !== 0) {
        throw new Error(json.msg || "请求失败");
    }
    return json.data;
}

export const authApi = {
    login(data: LoginRequest) {
        return request<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
};

export const leaderboardApi = {
    userLeaderboard(type: "hongli" | "deed" | "money") {
        return request<UserLeaderboardRow[]>("/user/leaderboard", {
            method: "POST",
            body: JSON.stringify({ type })
        });
    },
    petLeaderboard(type: "all" | "nonEvolution") {
        return request<PetLeaderboardRow[]>("/pet/leaderboard", {
            method: "POST",
            body: JSON.stringify({ type })
        });
    }
};

export const userApi = {
    info(data: UserInfoRequest) {
        return request<UserVo>("/user/info", {
            method: "POST",
            body: JSON.stringify(data)
        });
    },
    equipment(user_id: number) {
        return request<EquippedItem[]>("/user/equipment", {
            method: "POST",
            body: JSON.stringify({ user_id })
        });
    },
    backpack(user_id: number) {
        return request<BackpackItem[]>("/user/backpack", {
            method: "POST",
            body: JSON.stringify({ user_id })
        });
    },
    pets(user_id: number) {
        return request<UserPet[]>("/user/pets", {
            method: "POST",
            body: JSON.stringify({ user_id })
        });
    }
};
