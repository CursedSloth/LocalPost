<template>
    <v-toolbar fixed class="teal" dark>
      <v-toolbar-title class="mr-4">LocalPost</v-toolbar-title>

      <v-toolbar-items>
        <v-btn flat dark router to="/">
          Index
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark router to="login">
          Log in
        </v-btn>
        <v-btn flat dark router to="register">
          Sign Up
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
