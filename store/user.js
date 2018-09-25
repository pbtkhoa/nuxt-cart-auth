import { setToken, unsetToken } from "~/utils/local-storage.js";

export const state = () => {
    return {
        user: null
    };
};

export const getters = {
    isAuthenticated(state) {
        return !!state.user;
    },
    loggedUser(state) {
        return state.user;
    }
};

export const actions = {
    async login({ commit }, payload) {
        const user = await this.$axios.$post(`auth`, {
            username: payload.username,
            password: payload.password
        });
        if (user) {
            commit("setUser", user);
        }
    },
    logout({ commit }) {
        commit("unsetUser");
    },
    async setUser({ commit }, payload) {
        if (payload) {
            const user = await this.$axios.$post(`auth/check`, {
                token: payload
            });
            if (user) {
                commit("setUser", user);
            }
        }
    }
};

export const mutations = {
    setUser(state, payload) {
        if (typeof Storage !== "undefined") {
            setToken(payload.token);
        }
        state.user = payload;
    },
    unsetUser(state) {
        if (typeof Storage !== "undefined") {
            unsetToken();
        }
        state.user = null;
    }
};
