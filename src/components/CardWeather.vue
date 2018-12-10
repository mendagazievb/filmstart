<template>
  <section v-if="Object.keys(data)">
    <h1><a href="#">{{ data.applicable_date }}</a></h1>

    <img
        :src="`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`"
        width="32px"
        alt="weather state"
    >

    <p>Температура: {{ temp }} °C</p>
    <p>Давление: {{ pressure }} мм рт. ст.</p>
    <p>Ветер: {{ windSpeed }} м/с</p>
    <p>Видимость: {{ visibility }} км</p>

  </section>
</template>

<script>
  export default {
    props: {
      data: Object,
      default: () => ({})
    },

    computed: {
      temp() {
        return Math.floor(this.data.the_temp);
      },

      pressure() {
        return Math.floor(this.data.air_pressure / 1.333);
      },

      windSpeed() {
        return Math.floor(this.data.wind_speed / 2.237);
      },

      visibility() {
        return Math.floor(this.data.visibility *  1.609);
      }
    }
  };
</script>

<style scoped>

</style>