<template>
  <div id="map" class="map">
      <label for="track">Track position</label>
      <input id="track" type="checkbox"/>
    <div id="info" style="display: none;">
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import {Tile as Tilelayer, Vector as VectorLayer} from 'ol/layer'
import Geolocation from 'ol/Geolocation'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {OSM, Vector as VectorSource} from 'ol/source'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'

export default {
  name: 'MapComponent',

  mounted () {
    let view = new View({
      center: [0, 0],
      zoom: 2
    })

    let map = new Map({
      layers: [
        new Tilelayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: view
    })

    let geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: view.getProjection()
    })

    function el (id) {
      return document.getElementById(id)
    }

    el('track').addEventListener('change', function () {
      geolocation.setTracking(this.checked)
    })

    geolocation.on('error', function (error) {
      const info = document.getElementById('info')
      info.innerHTML = error.message
      info.style.display = ''
    })

    let accuracyFeature = new Feature()
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry())
    })

    let positionFeature = new Feature()
    positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#3399CC'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }))

    geolocation.on('change:position', function () {
      let coordinates = geolocation.getPosition()
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null)
    })

    let vectorLayer = new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature]
      })
    })

    map.layers.addLayer(vectorLayer)
  }
}
</script>

<style scoped>

</style>
