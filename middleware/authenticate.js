export default function({ redirect, store }) {
    if (!store.getters["user/isAuthenticated"]) {
        return redirect("/login");
    }
}
