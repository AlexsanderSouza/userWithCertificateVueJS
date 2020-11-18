<template>
    <div>
        <v-flex xs12>
            <h2>Usuário</h2>
        </v-flex>

        <v-row v-if="user">
            <v-col cols="12" sm="6" md="6">
                <User :user="user" />
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <Certificate :user="user" />
            </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-btn x-large color="success" @click="logout">Sair</v-btn>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import User from '@/components/User'
import Certificate from '@/components/Certificate'

export default {
    name: 'Workarea',
    components: {
        User,
        Certificate
    },
    data: () => ({}),
    mounted() {
        if (localStorage.getItem('authToken')) {
            this.getUserData()
        }
    },
    computed: {
        ...mapGetters('auth', ['user'])
    },
    methods: {
        ...mapActions('auth', ['sendLogoutRequest', 'getUserData']),
        logout() {
            this.sendLogoutRequest()
                .then(() => {
                    this.$router.push({ name: 'Login' })
                })
                .catch(error => {
                    this.error = error.response
                })
        }
    }
}
</script>

<style></style>
