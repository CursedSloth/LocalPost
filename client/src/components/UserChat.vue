<template>
  <div class="hello">
    <v-layout align-center justify-center>
      <v-flex xs6>
        <panel title="Chat">
          <div class="messages">
            <ul id="messageList">
              <li v-for="message in messages" v-bind:key="message.id">
                {{ message }}
              </li>
            </ul>
          </div>
          <div class="panel-footer">
            <form @submit.prevent="sendMessage">
              <div class="form-group">
                <input type="text" placeholder="Message..." v-model="message" >
              </div>
              <v-btn type="submit" class="btn btn-success">Send</v-btn>
            </form>
          </div>
        </panel>
        <br>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import io from 'socket.io-client'
import Panel from './Panel'
export default {
  name: 'UserChat',
  components: {Panel},
  data () {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('localhost:3000')
    }
  },
  methods: {
    sendMessage (e) {
      e.preventDefault()

      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      })
      this.socket.emit('MESSAGE', {
        message: this.message
      })
      console.log('Msg received: ' + this.message)
      this.messages.push(this.message)
      this.message = ''
    },
    mounted () {
      this.socket.on('MESSAGE', (data) => {
        this.messages.push(data)
      })
    }
  }
}
</script>

<style scoped>

</style>
