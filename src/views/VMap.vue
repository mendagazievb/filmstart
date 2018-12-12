<template>
  <div class="map">
    <yandex-map
        :coords="coords"
        zoom="4"
        style="width: 100%; height: 600px;"
        @map-was-initialized="initHandler"
    >
      <ymap-marker
          v-for="(city, i) in nearestCities"
          :marker-id="`index-${i}`"
          marker-type="placemark"
          :coords="city['latt_long'].split(',').map(num => Number(num))"
          :balloon="{
            header: city.title,
            body: `<a href='/weather/${city.woeid}'>Посмотреть погоду</a>`
          }"
      />

    </yandex-map>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {};
    },

    computed: {
      ...mapState([
        'nearestCities',
        'coords',
      ]),
    },

    created() {
      if (!this.coords.length) {
        this.loadDefaultData();
      } else {
        this.$store.commit('toggleLoading', true);
      }
    },

    methods: {
      ...mapActions([
        'loadDefaultData',
      ]),

      initHandler() {
        this.$store.commit('toggleLoading', false);
      },
    },
  };
</script>