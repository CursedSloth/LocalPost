<template>
  <v-layout align-center justify-center>
    <v-flex xs6>
      <div class="white elevation-2">
        <v-toolbar flat dense class="teal" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
          <div class="pl-4 pr-4 pt-3 pb-2">
            <form
              name="LocalPost-form"
              autocomplete="off">
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
            </form>
            <div class="error" v-html="error"></div>
            <v-btn
              class="teal" dark
              @click="register">
              Register
            </v-btn>
            <br>
            <v-btn
              class="teal" dark
              @click="back">
              Go back
            </v-btn>
          </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log(response.data)
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
