<template>
  <v-layout align-center justify-center>
    <v-flex xs6>
      <panel title="Login">
          <v-text-field
            label="Email"
            v-model="email"
            single-line
            box
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            single-line
            box
            autocomplete="new-password"
          ></v-text-field>
          <div class="error" v-html="error"></div>
          <v-btn
            class="teal" dark
            @click="login">
            Login
          </v-btn>
          <br>
          <v-btn
            class="teal" dark
            @click="back">
            Go back
          </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
import Panel from './Panel'
export default {
  components: {Panel},
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log(response.data)
        this.$router.push({name: 'UserMap'})
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error{
    color: darkred;
  }
</style>
