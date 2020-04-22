<template>
  <div id="app">
    <md-toolbar class="md-transparent">
      <md-tabs id="connexionTab" md-sync-route v-if="!isConnected">
        <md-tab id="tab-connexion" md-label="Connexion" to="/" exact></md-tab>
        <md-tab id="tab-inscription" md-label="Inscription" to="/signup"></md-tab>
      </md-tabs>
      <md-tabs id="appTab" md-sync-route v-if="isConnected">
        <md-tab id="tab-home" md-label="home" to="/home" exact></md-tab>
      </md-tabs>
    </md-toolbar>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return{
      isConnected : false,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
