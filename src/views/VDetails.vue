<template>
  <div>
    <p>{{ $route.params.woeid }}</p>

    <h3>{{ weather.title }}</h3>

    <ul>
      <li v-for="(date, i) in weather.days" :key="`index-${i}`">
        <card-weather :data="date" :woeid="weather.woeid" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import CardWeather from '@/components/CardWeather';

  export default {
    name: 'v-details',

    components: {
      CardWeather
    },

    computed: {
      ...mapState([
        'weather',
      ]),
    },

    created() {
      this.getWeather({ woeid: this.$route.params.woeid });
    },

    methods: {
      ...mapActions([
        'getWeather',
      ]),
    },
  };
</script>

<style scoped>

</style>