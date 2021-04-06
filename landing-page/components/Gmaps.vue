<template>
<GmapMap
  :center="{lat:48.8534, lng:2.3488}"
  :zoom="5"
  :options="{
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: false,
   disableDefaultUi: false
  }"
  map-type-id="terrain"
  style="width: flex; height: 400px"
>
<GmapCluster
    :styles="clusterStyle"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in locations"
    :position="m.position"
    :clickable="true"
    :draggable="false"
    @click="setCenter(m)"
  />
</GmapCluster>
</GmapMap>
</template>
<style>
  .vue-map{
    width: 100%;
    height: 100%;
  }
</style>

<script>

export default {
  name: 'Gmaps',
  methods: {
    setCenter(center) {
      this.currentLocation = this.location;
      this.$emit('changeCenter', center);
    }
  },
  async fetch() {
    const rawLocations = await this.$axios.$get('https://www.data.gouv.fr/fr/datasets/r/d0566522-604d-4af6-be44-a26eefa01756');
    this.locations = rawLocations.features.map(feature => ({

      id: feature.properties.gid,
      position: {
        lat: parseFloat(feature.geometry.coordinates[0][1]),
        lng: parseFloat(feature.geometry.coordinates[0][0]),
      },
      name: feature.properties.c_nom,
      address: `${feature.properties.c_adr_num} ${feature.properties.c_adr_voie} ${feature.properties.c_com_cp} ${feature.properties.c_com_nom}`
    }));
  },
  data() {
  return {
    locations: [{ position: {lat: 48.8534, lng: 2.3488 }}],
    currentLocation: {lat: 48.8534, lng: 2.3488},
    clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 48,
          height: 48,
          textColor: "#000"
        }
    ],
  }
},
};
</script>