<template>
  <div id="map" class="map">
    <label for="track">Track position</label>
    <input id="track" type="checkbox">
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
    var view = new View({
      center: [0, 0],
      zoom: 2
    })

    var map = new Map({
      layers: [
        new Tilelayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: view
    })

    var geolocation = new Geolocation({
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

    var accuracyFeature = new Feature()
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry())
    })

    var positionFeature = new Feature()
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
      var coordinates = geolocation.getPosition()
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null)
    })

    new VectorLayer ({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature]
      })
    })
  }
}
</script>

<style scoped>

</style>
