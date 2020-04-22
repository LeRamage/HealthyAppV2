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
                                <md-input type="text" name="username" id="new_user_pseudo" required v-model="new_user_pseudo"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item">
                            <md-field>
                                <label for="password">Mot de passe</label>
                                <md-input type="password" name="password" id="new_user_password" required v-model="new_user_password"></md-input>
                            </md-field>
                            <md-field>
                                <label for="confirmPassword">Confirmer le mot de passe</label>
                                <md-input type="password" name="confirmPassword" id="new_user-confirmPassword" required></md-input>
                            </md-field>
                        </div>
                    </div>
                    <md-card-actions>
                        <md-button class="md-primary" @click="register">Inscription</md-button>
                    </md-card-actions>
                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<script>
export default {
    name:'inscription',
    data() {
        return{
            new_user: {
                new_user_pseudo: '',
                new_user_password: ''
            }
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