<template>
    <div>
        <v-card persistent max-width="600px" min-width="360px" class="px-4">
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
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'User',
    props: {
        user: Object
    },
    data: () => ({
        valid: true,
        loginEmailRules: [v => !!v || 'Obrigatório', v => /.+@.+\..+/.test(v) || 'O E-mail não é valido'],
        emailRules: [v => !!v || 'Obrigatório', v => /.+@.+\..+/.test(v) || 'O E-mail não é valido'],

        show1: false,
        rules: {
            required: value => !!value || 'Obrigatório.',
            min: v => (v && v.length >= 6) || 'Minimo de 6 caracteres'
        }
    })
}
</script>

<style></style>
