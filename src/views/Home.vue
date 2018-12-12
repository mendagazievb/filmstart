<template>
  <div class="home">
    <h3 class="title home__title">{{ weather.title }}</h3>

    <ul class="list">
      <li class="list__item" v-for="(date, i) in weather.days" :key="`index-${i}`">
        <card-weather :data="date" :woeid="weather.woeid" />
      </li>
    </ul>

  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapState, mapActions } from 'vuex';
  import CardWeather from '@/components/CardWeather';

  export default {
    name: 'home',

    components: { CardWeather },

    computed: mapState([
      'location',
      'nearestCities',
      'weather',
    ]),

    created() {
      this.$store.dispatch('loadDefaultData');
    }
  };
</script>

<style>
  .home {
    text-align: center;
  }

  .home__title {
    font-size: 1.4rem;
  }
</style>
