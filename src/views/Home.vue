<template>
  <div class="home">
    <input
        v-model.lazy="message"
        @change="searchQueryForCities(message)"
        type="text"
        placeholder="search"
    >

    <ul>
      <li v-for="(item, i) in searchQueryResults">
        <router-link
            :to="{ name: 'v-weather', params: { woeid: item.woeid } }"
        >
          {{ item.title }}
        </router-link>
      </li>

    </ul>


    <h3>{{ weather.title }}</h3>

    <ul>
      <li v-for="(date, i) in weather.days" :key="`index-${i}`">
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
      'weather',
      'searchQueryResults'
    ]),

    created() {
      this.$store.dispatch('loadDefaultData');
    },

    methods: {
      ...mapActions([
        'searchQueryForCities'
      ])
    }
  };
</script>
