import apiService from "@services/apiService";
import store from "@redux";
import { getUser } from "@redux/modules/user/actions";
import { loggedIn, loggedOut } from "@redux/modules/auth/actions";

class AuthService {
    logIn(options) {
        return apiService.post("/login", { ...options })
            .then(({ headers: { location } }) => {
                if (location && /\/api\/users\/\d+$/.test(location)) {
                    const userId = location.replace(/.*\/(\d+)$/, '$1');

                    localStorage.setItem("ls_key", JSON.stringify({
                        id: userId
                    }));

                    this.checkLogin();
                }
            });
    };

    logOut() {
        localStorage.removeItem("ls_key");
        store.dispatch(loggedOut());
    };

    async checkLogin() {
        const user = this.getCachedUser();

        if(user && user.id) {
            try {
                await this.getUserDetails(user.id);
                store.dispatch(loggedIn());
            } finally {}
        }
    }

    async getUserDetails(userId) {
        try {
            await store.dispatch(getUser(userId));
        } finally {}
    }

    getCachedUser() {
        try {
            return JSON.parse(localStorage.getItem("ls_key"));
        } catch {
            return null;
        }
    }
}

export default new AuthService();