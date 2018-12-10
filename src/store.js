import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const METAWEATHER_API = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/';
const IP_API = 'https://ipapi.co/json/';

export default new Vuex.Store({
  state: {
    location: {},
    nearestCities: [],
    weather: {
      title: '',
      days: []
    }
  },

  mutations: {
    saveLocation(state, payload) {
      state.location = payload;
    },

    saveNearestCities(state, payload) {
      state.nearestCities = payload;
    },

    saveWeather(state, payload) {
      state.weather.title = payload.title;
      state.weather.days = payload.consolidated_weather;
    }
  },

  actions: {
    /**
     * Получаем данные для текущего местоположения
     *
     * @param context
     * @param payload
     */
    getLocation({ commit }, payload) {
      return fetch(IP_API)
        .then(response => response.json())
        .then(response => {
          commit('saveLocation', response);
        });
    },

    /**
     * Поиск по координатам, получаем woeid для работы с погодой
     *
     * @param commit
     * @param state
     */
    searchLocation({ commit, state }) {
      let { latitude, longitude } = state.location;

      return fetch(`${METAWEATHER_API}search/?lattlong=${latitude},${longitude}`)
        .then(response => response.json())
        .then(response => commit('saveNearestCities', response));
    },

    getWeather({ commit, state }, { woeid, date }) {
      let hasWoeid = woeid ? `${woeid}/` : '';
      let hasDate = date ? `${date}/` : '';

      fetch(`${METAWEATHER_API}${hasWoeid}${hasDate}`)
        .then(response => response.json())
        .then(response => {
          commit('saveWeather', response)
        });
    },

    async loadDefaultData({ commit, dispatch, state }) {
      // Долгое ожидание, так как запросы отправляются последовательно и зависят друг от друга
      await dispatch('getLocation');

      await dispatch('searchLocation');

      let { woeid } = state.nearestCities[0]; // Получаем ближайший город в списке

      dispatch('getWeather', { woeid })


    },
  },
});
