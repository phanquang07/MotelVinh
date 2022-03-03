export const state = () => ({
    name: "aaaa",
    role: null,
    id: "",
    isLogin: false,
})

export const mutations = {
    setLogin(state, data) {
        state.name = data.name;
        state.role = data.role;
        state.id = data._id
        state.isLogin = data.isLogin
    }
}