<template>
  <div class="hello">
    <v-layout align-center justify-center>
      <v-flex xs6>
        <panel title="Map">
          <h3>Hello there, {{ msg }}! <br> {{ welcome }}!</h3>
          <p>
            Paragraph rider here :)
          </p>
        </panel>
        <br>
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                data-projection="EPSG:4326" style="height: 400px">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          <vl-geoloc @update:position="geolocPosition = $event">
              <template slot-scope="geoloc">
                <vl-feature v-if="geoloc" id="position-feature">
                  <vl-geom-point :coordinates="geolocPosition"></vl-geom-point>
                  <vl-style-box>
                    <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                  </vl-style-box>
                </vl-feature>
              </template>
            </vl-geoloc>
            <vl-layer-tile id="osm">
              <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
        </vl-map>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Panel from './Panel'
// import UsersService from '../services/UsersService'
export default {
  name: 'UserMap',
  components: {Panel},
  data () {
    return {
      msg: this.$store.state.user.email,
      welcome: 'Welcome to LocalPost',
      // users: null
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined
    }
  },
  async mounted () {
    // this.users = (await UsersService.index()).data
    // console.log('users', this.users)
  }
}

</script>

<style scoped>

</style>
