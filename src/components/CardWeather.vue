<template>
  <section v-if="Object.keys(data).length" class="card">
    <h1 class="card__title">
      <router-link :to="{ path: `/weather/${woeid}/${data.applicable_date}` }" class="card__link">
        {{ data.applicable_date }}
      </router-link>
    </h1>

    <img
        :src="`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`"
        width="32px"
        class="card__img"
        alt="weather state"
    >

    <ul class="card__list">
      <li class="card__item">
        <span>Температура:</span>
        <span>{{ temp }} °C</span>
      </li>
      <li class="card__item">
        <span>Давление:</span>
        <span>{{ pressure }} мм рт. ст.</span>
       </li>
      <li class="card__item">
        <span>Ветер:</span>
        <span>{{ windSpeed }} м/с</span>
      </li>
      <li class="card__item">
        <span>Видимость:</span>
        <span>{{ visibility }} км</span>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => ({})
      },
      woeid: {
        type: [String, Number]
      }
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

<style>
  .card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    text-align: center;
  }

  .card__title {
    font-size: 1.2rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  .card__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .card__item {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
  }

  .card__item span:first-child {
    margin-right: 1rem;
  }

  .card__link {
    color: #2c3e50;
    text-decoration: none;
  }

  .card__link:hover {
    color: #4884bf;
  }

  .card__img {
    margin-bottom: 1rem;
  }
</style>