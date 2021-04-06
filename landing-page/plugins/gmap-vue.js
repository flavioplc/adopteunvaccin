import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster' // replace src with dist if you have Babel issues

Vue.component('GmapCluster', GmapCluster);

Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.gmapsKey,
      libraries: 'places',
    },
    installComponents: true,
  });

