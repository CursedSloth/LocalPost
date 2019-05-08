<template>
  <div class="hello">
    <v-layout align-center justify-center>
      <v-flex xs6>
        <panel title="welcome">
          <h3>Hello there, {{ msg }}! <br> {{ welcome }}!</h3>
          <p>
            Paragraph rider here :)
          </p>
        </panel>
        <br>
      </v-flex>
    </v-layout>
    <map-component></map-component>
  </div>
</template>

<script>
import Panel from './Panel'
import MapComponent from './MapComponent'
// import UsersService from '../services/UsersService'
export default {
  name: 'UserMap',
  components: {MapComponent, Panel},
  data () {
    return {
      msg: this.$store.state.user.email,
      welcome: 'Welcome to LocalPost'
      // users: null
    }
  },
  async mounted () {
    return this.data()
    // this.users = (await UsersService.index()).data
    // console.log('users', this.users)
  }
}

</script>

<style scoped>

</style>
