<template>
    <div>
        <v-file-input
            v-model="files"
            color="deep-purple accent-4"
            counter
            :rules="rules"
            label="Certificado"
            accept=".pem"
            placeholder="Enviar certificado"
            prepend-icon="mdi-paperclip"
            outlined
        >
            <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                    {{ text }}
                </v-chip>

                <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                    +{{ files.length - 2 }} File(s)
                </span>
            </template>
        </v-file-input>
        <v-btn color="success" @click="submitFile">Enviar certificado</v-btn>
        <div>
            <ul>
                <li>{{ certificate.DN }}</li>
                <li>{{ certificate.issuerDN }}</li>
                <li>{{ certificate.validity }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Certificate',
    props: {
        user: Object
    },
    data: () => ({
        files: [],
        rules: [value => !value || value.size < 2000000 || 'O certificado deve ter menos de 2 MB!'],
        certificate: ''
    }),
    mounted() {
        if (localStorage.getItem('authToken')) {
            this.getCertificate()
        }
    },
    methods: {
        getCertificate() {
            axios
                .get(process.env.VUE_APP_API_URL + `user/${this.user.id}/certificate`)
                .then(function(response) {
                    this.certificate = response.data
                })
                .catch(function() {
                    console.log('FAILURE!!')
                })
        },
        submitFile() {
            let formData = new FormData()
            formData.append('certificado', this.files)

            axios
                .post(process.env.VUE_APP_API_URL + `user/${this.user.id}/certificate`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function() {})
        }
    }
}
</script>

<style></style>
