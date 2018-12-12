<template>
  <div class="weather">
    <h3 class="title weather__title">{{ weather.title }}</h3>

    <div v-if="$route.params.date" class="weather__card">
      <card-weather :data="getFilterData" :woeid="weather.woeid" />
    </div>

    <ul v-else class="list">
      <li v-for="(date, i) in weather.days" :key="`index-${i}`" class="list__item">
        <card-weather :data="date" :woeid="weather.woeid" />
      </li>
    </ul>

    <router-view/>

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

      /**
       * Получаем из списка данных с погодой переданную дату
       *
       * @returns {object}
       */
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

<style>
  .weather__card {
    margin-bottom: 1rem;
  }
</style>

