<template>
  <div>
    <highcharts :options="options"/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'v-weather-details',

    data() {
      return {
        options: {
          chart: { type: 'line' },
          title: { text: 'История прогноза погоды' },
          xAxis: {
            categories: [],
          },
          yAxis: {
            title: {
              text: 'Температура (°C)',
            },
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
              },
            },
          },
          tooltip: { shared: true },
          series: [],
        },
      };
    },

    watch: {
      'historyWeather': function (data) {
        this.updateChart(data);
      },
    },

    computed: {
      ...mapState([
        'historyWeather',
      ]),
    },

    created() {
      let { woeid, date } = this.$route.params; // Получаем id города, дату
      date = date.split('-').join('/'); // Преобразовываем дату в y/m/d

      this.getDataForWeather({ woeid, date }); // Отправляем запрос для получения истории погоды
    },

    methods: {
      ...mapActions([
        'getDataForWeather',
      ]),

      /**
       * Обновляем данные для графика
       *
       * @param {array} data - история погоды за определенный промежуток
       */
      updateChart(data) {
        let categories = [];
        let series = [
          { name: 'Min temp', data: [] },
          { name: 'Max temp', data: [] },
          { name: 'Temp', data: [] },
        ];

        for (let item of data) {
          categories.push(new Date(item.created).toLocaleString('ru'));
          series[0].data.push(Math.floor(item.min_temp));
          series[1].data.push(Math.floor(item.max_temp));
          series[2].data.push(Math.floor(item.the_temp));
        }

        this.options.xAxis.categories = categories;
        this.options.series = series;
      },
    },

  };
</script>