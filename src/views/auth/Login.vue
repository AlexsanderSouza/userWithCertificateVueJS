<template>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
            <v-tabs v-model="tab" show-arrows background-color="accent-4" icons-and-text dark grow>
                <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                <v-tab v-for="i in tabs" :key="i.name">
                    <v-icon large>{{ i.icon }}</v-icon>
                    <div class="caption py-1">{{ i.name }}</div>
                </v-tab>
                <v-tab-item>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-form ref="loginForm" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="user.email"
                                            :rules="loginEmailRules"
                                            label="E-mail"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="user.password"
                                            :append-icon="show1 ? 'eye' : 'eye-off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="input-10-1"
                                            label="Senha"
                                            hint="Minimo de 6 caracteres'"
                                            counter
                                            @click:append="show1 = !show1"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                        <v-btn x-large block :disabled="!valid" color="success" @click="validate">
                                            Entrar
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card class="px-4">
                        <v-card-text>
                            <v-form ref="registerForm" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field
                                            v-model="user.name"
                                            :rules="[rules.required]"
                                            label="Nome"
                                            maxlength="20"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field
                                            v-model="user.cpf"
                                            :rules="[rules.required]"
                                            label="CPF"
                                            maxlength="20"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="user.email"
                                            :rules="emailRules"
                                            label="E-mail"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="user.password"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="password"
                                            label="Senha"
                                            hint="Minimo de 6 caracteres'"
                                            counter
                                            @click:append="show1 = !show1"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            block
                                            v-model="user.c_password"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, passwordMatch]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="c_password"
                                            label="Confirmar senha"
                                            counter
                                            @click:append="show1 = !show1"
                                        ></v-text-field>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                        <v-btn x-large block :disabled="!valid" color="success" @click="validate"
                                            >Registrar</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </div>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            dialog: true,
            tab: 0,
            tabs: [
                { name: 'Login', icon: 'mdi-account' },
                { name: 'Registrar', icon: 'mdi-account-outline' }
            ],
            valid: true,
            user: {
                name: '',
                email: '',
                cpf: '',
                password: '',
                c_password: ''
            },
            loginEmailRules: [v => !!v || 'Obrigatório', v => /.+@.+\..+/.test(v) || 'O E-mail não é valido'],
            emailRules: [v => !!v || 'Obrigatório', v => /.+@.+\..+/.test(v) || 'O E-mail não é valido'],

            show1: false,
            rules: {
                required: value => !!value || 'Obrigatório.',
                min: v => (v && v.length >= 6) || 'Minimo de 6 caracteres'
            }
        }
    },
    mounted() {
        this.$store.commit('setErrors', {})
    },
    watch: {
        'user.password'(val) {
            if (this.tab === 0) this.user.c_password = val
        }
    },
    computed: {
        passwordMatch() {
            return () => this.user.password === this.user.c_password || 'As senhas são diferentes'
        },
        ...mapGetters(['errors'])
    },
    methods: {
        ...mapActions('auth', ['sendLoginRequest', 'sendRegisterRequest']),
        validate() {
            if (this.$refs.loginForm.validate()) {
                this.onSubmit()
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        onSubmit() {
            if (this.tab === 0) {
                this.sendLoginRequest(this.user)
                    .then(() => {
                        this.$router.push({ name: 'Workarea' })
                    })
                    .catch(error => {
                        console.log(error.response)
                        this.error = 'Error verifying email'
                    })
            } else {
                this.sendRegisterRequest(this.user).then(() => {
                    this.$router.push({ name: 'Workarea' })
                })
            }
        }
    }
}
</script>

<style></style>
