import axios from 'axios'

export default {
    namespaced: true,

    state: {
        userData: null
    },

    getters: {
        user: state => state.userData
    },

    mutations: {
        setUserData(state, user) {
            state.userData = user
        }
    },

    actions: {
        getUserData({ commit }) {
            axios
                .get(process.env.VUE_APP_API_URL + 'user')
                .then(response => {
                    commit('setUserData', response.data)
                })
                .catch(() => {
                    localStorage.removeItem('authToken')
                })
        },
        async sendLoginRequest({ commit }, data) {
            commit('setErrors', {}, { root: true })
            const response = await axios.post(process.env.VUE_APP_API_URL + 'login', data)
            commit('setUserData', response.data.user)
            localStorage.setItem('authToken', response.data.token)
        },
        async sendRegisterRequest({ commit }, data) {
            commit('setErrors', {}, { root: true })
            const response = await axios.post(process.env.VUE_APP_API_URL + 'user', data)
            commit('setUserData', response.data.user)
            localStorage.setItem('authToken', response.data.token)
        },
        async sendLogoutRequest({ commit }) {
            await axios.post(process.env.VUE_APP_API_URL + 'logout')
            commit('setUserData', null)
            localStorage.removeItem('authToken')
        }
    }
}
