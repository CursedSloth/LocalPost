<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br>
    <h2>{{ msg2 }}</h2>
    <button
      @click="switchPage">
      Go to register
    </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to LocalPost',
      msg2: 'Testing msg2'
    }
  },
  methods: {
    switchPage () {
      this.$router.push('register')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
