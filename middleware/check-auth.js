import { getToken } from "~/utils/local-storage.js";

export default function({ server ,store, req }) {
    store.dispatch("user/setUser", getToken());
}
