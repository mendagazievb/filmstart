<template>
  <div>
    <h3>{{ weather.title }}</h3>

    <div v-if="$route.params.date">
      <card-weather :data="getFilterData" :woeid="weather.woeid" />
    </div>

    <ul v-else>
      <li v-for="(date, i) in weather.days" :key="`index-${i}`">
        <card-weather :data="date" :woeid="weather.woeid" />
      </li>
    </ul>

    <router-view></router-view>


  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import CardWeather from '@/components/CardWeather';

  export default {
    name: 'v-weather',

    components: {
      CardWeather
    },

    computed: {
      ...mapState([
        'weather',
      ]),

      getFilterData() {
        return this.weather.days.find(prop => prop.applicable_date === this.$route.params.date)
      }
    },

    created() {
      this.getDataForWeather({ woeid: this.$route.params.woeid });
    },

    methods: {
      ...mapActions([
        'getDataForWeather',
      ]),
    },
  };
</script>