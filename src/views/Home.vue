<template>
  <div class="home">
    <p>{{message}}</p>
    <input v-model.lazy="message" type="text" placeholder="search">

    <h3>{{weather.title}}</h3>
    <ul>
      <li v-for="(date, i) in weather.days" :key="`index-${i}`">
        <card-weather :data="date"/>
      </li>
    </ul>

  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapState } from 'vuex';
  import CardWeather from '@/components/CardWeather';

  export default {
    name: 'home',

    components: {
      CardWeather
    },

    data() {
      return {
        message: ''
      }
    },

    computed: mapState([
      'location',
      'nearestCities',
      'weather'
    ]),

    created() {
      this.$store.dispatch('loadDefaultData');
    }
  };
</script>
