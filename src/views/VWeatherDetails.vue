<template>
  <div>
    <p>{{ $route.params.date }}</p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'v-weather-details',

    created() {
      let { woeid, date } = this.$route.params;
      date = date.split('-').join('/');

      this.getDataForWeather({woeid, date})
    },

    methods: {
      ...mapActions([
        'getDataForWeather'
      ])
    }

  };
</script>