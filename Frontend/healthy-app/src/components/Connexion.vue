<template>
    <div id="connexion-form">
        <form class="md-layout">
            <md-card class="md-layout-item">
                <md-card-header>
                    <div class="md-title">Connexion</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                                <label for="username">Pseudo</label>
                                <md-input type="text" name="username" id="pseudo" required v-model="user.pseudo"></md-input>
                            </md-field>
                            <span v-if="emptyPseudo">Ce champ est requis</span>
                            <span v-if="badPseudo">Le pseudo n'est pas reconnu</span>
                        </div>

                        <div class="md-layout-item">
                            <md-field>
                                <label for="password">Mot de passe</label>
                                <md-input type="password" name="password" id="password" required v-model="user.password"></md-input>
                            </md-field>
                            <span  v-if="emptyPassword">Ce champ est requis</span>
                            <span  v-if="badPassword">Le mot de passe est incorrect</span>
                        </div>
                    </div>
                    
                    <md-card-actions>
                        <md-button class="md-primary" @click="login">Connexion</md-button>
                    </md-card-actions>
                    
                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<script>
import DataService from "../services/dataService"

export default {
    name: 'connexion',
    data() {
        return {
            user: {
                pseudo: '',
                password: ''
            },
            badPseudo: false,
            badPassword: false,
            emptyPseudo: false,
            emptyPassword: false
        }
    },
    methods:{
        login(){
            var data = {
                username: this.user.pseudo,
                password: this.user.password
            }

            this.emptyPseudo = false
            this.emptyPassword = false
            this.badPassword = false
            this.badPseudo = false

            DataService.connect(data).then(res => {
                if(res.data === true){
                    this.$router.push('home')
                }else if(res.data == 'Utilisateur non trouvé'){
                    this.badPseudo = true
                }else if(res.data == 'Mot de Passe invalide'){
                    this.badPassword = true
                }else if(this.user.pseudo === ''){
                    this.emptyPseudo = true
                }else if(this.user.password === ''){
                    this.emptyPassword = true
                }
            }).catch(e => { console.log('erreur : '+ e) })
        }
    }
}
</script>

<style>
    #connexion-form > .md-layout{
        width: 25%;
        margin: auto;
        padding-top: 10%;
    }
    span{
        color:#ff1744
    }
</style>
