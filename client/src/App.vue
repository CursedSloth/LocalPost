<template>
  <div id="app">
    <v-app fluid>
      <page-header />
        <main>
          <v-container>
            <router-view/>
          </v-container>
        </main>
    </v-app>
    <v-footer dark>
      Made by Victor Ingvarsson
    </v-footer>
  </div>
</template>

<script>
import PageHeader from './components/Header'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
