<template>
    <div id="register-form">
        <form class="md-layout">
            <md-card class="md-layout-item">
                <md-card-header>
                    <div class="md-title">Inscription</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                                <label for="username">Pseudo</label>
                                <md-input type="text" name="username" id="new_user_pseudo" required v-model="new_user.pseudo"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item">
                            <md-field>
                                <label for="password">Mot de passe</label>
                                <md-input type="password" name="password" id="new_user_password" required v-model="new_user.password"></md-input>
                            </md-field>
                            <md-field>
                                <label for="confirmPassword">Confirmer le mot de passe</label>
                                <md-input type="password" name="confirmPassword" id="new_user_confirmPassword" required v-model="confirmPassword"></md-input>
                            </md-field>
                            <span v-if="differentPasswords" class="text-danger">Les deux mots de passe saisis sont différents</span>
                        </div>
                    </div>

                    <md-card-actions>
                        <md-button class="md-primary" @click="register">Inscription</md-button>
                    </md-card-actions>

                    <span v-if="userAlreadyExist" class="text-warning">Cet Utilisateur existe déjà!</span>
                    <span v-if="registrationSuccess" class="text-success">Enregistrement réussi!</span>
                    <span v-if="registrationError" class="text-danger">Une erreur est survenue! Réessayez plus tard!</span>

                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<script>
import DataService from '../services/dataService'

export default {
    name:'inscription',
    data() {
        return{
            new_user: {
                pseudo: '',
                password: ''
            },
            confirmPassword: '',
            required: false,
            userAlreadyExist: false,
            registrationError: false,
            registrationSuccess: false,
            differentPasswords: false
        }
    },
    methods:{
        register(){
            this.userAlreadyExist = false
            this.registrationError = false
            this.registrationSuccess = false
            this.required = false
            this.differentPasswords = false

            if(this.new_user.pseudo == '' &&  this.new_user.password == '') { this.required = true }
            if(this.new_user.pseudo != this.confirmPassword) { this.differentPasswords = true }

            var data = {
                username: this.new_user.pseudo,
                password: this.new_user.password
            }

            DataService.signup(data).then(res =>{
                if(res.data == 'Utilisateur existe déjà')  {
                    this.userAlreadyExist = true
                }else if(res.data == 'Enregistrement réussi'){
                    this.registrationSuccess = true
                }
            }).catch(e => { 
                console.log('erreur : '+e)
                this.registrationError = true    
            })

        }
    } 
}
</script>

<style>
    #register-form> .md-layout{
        width: 30%;
        margin: auto;
        padding-top: 10%;
    }
</style>