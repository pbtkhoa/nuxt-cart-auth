import { getToken } from "~/utils/local-storage.js";

export default function({ server, store, req }) {
    if (!process.server) {
        store.dispatch("user/setUser", getToken());
    }
}
