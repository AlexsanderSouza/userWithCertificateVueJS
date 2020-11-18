<template>
    <div>
        <div>Teste</div>
        <v-btn x-large color="success" @click="logout">Sair</v-btn>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Workarea',
    data: () => ({}),
    methods: {
        ...mapActions('auth', ['sendLogoutRequest']),
        logout() {
            this.sendLogoutRequest()
                .then(() => {
                    this.$router.push({ name: 'Login' })
                })
                .catch(error => {
                    console.log(error.response)
                    this.error = error.response
                })
        }
    }
}
</script>

<style></style>
