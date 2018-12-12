import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const METAWEATHER_API = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/';
const IP_API = 'https://ipapi.co/json/';

export default new Vuex.Store({
  state: {
    location: {},
    coords: [],
    nearestCities: [],
    weather: {
      title: '',
      woeid: '',
      days: []
    },
    searchQueryResults: [],
    historyWeather: [],
    isLoading: false
  },

  mutations: {
    saveLocation(state, payload) {
      state.location = payload;
    },

    saveNearestCities(state, payload) {
      // Добавляем координаты ближайшего города
      state.coords = payload[0]['latt_long'].split(',').map(item => Number(item));
      state.nearestCities = payload;
    },

    saveWeather(state, payload) {
      state.weather.title = payload.title;
      state.weather.woeid = payload.woeid;
      state.weather.days = payload.consolidated_weather;
    },

    saveSearchQueryResult(state, result) {
      state.searchQueryResults = result;
    },

    saveHistoryWeather(state, history) {
      state.historyWeather = history;
    },

    toggleLoading(state, isLoading) {
      state.isLoading = isLoading;
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

    /**
     * Поиск городов
     *
     * @param commit
     * @param state
     * @param {string} searchQuery - поисковый запрос
     * @returns {Promise<any | never>}
     */
    searchQueryForCities({ commit, state }, searchQuery) {
      return fetch(`${METAWEATHER_API}search/?query=${searchQuery ? searchQuery : JSON.stringify('')}`)
        .then(response => response.json())
        .then(response => commit('saveSearchQueryResult', response));
    },

    /**
     * Получаем данные для погоды
     *
     * @param commit
     * @param state
     * @param {number} woeid - id города
     * @param {string} date - дата
     */
    getDataForWeather({ commit, state }, { woeid, date }) {
      commit('toggleLoading', true);
      let hasWoeid = woeid ? `${woeid}/` : '';
      let hasDate = date ? `${date}/` : '';

      fetch(`${METAWEATHER_API}${hasWoeid}${hasDate}`)
        .then(response => response.json())
        .then(response => {
          commit('toggleLoading', false);

          if (hasDate && hasWoeid) {
            commit('saveHistoryWeather', response);
            return;
          }

          commit('saveWeather', response)
        });
    },

    /**
     * Выполняем загрузку для начальной страницы, с учетом ip адреса
     *
     * @param commit
     * @param dispatch
     * @param state
     * @returns {Promise<void>}
     */
    async loadDefaultData({ commit, dispatch, state }) {
      commit('toggleLoading', true);
      // Долгое ожидание, так как запросы отправляются последовательно и зависят друг от друга
      await dispatch('getLocation');

      await dispatch('searchLocation');

      let { woeid } = state.nearestCities[0]; // Получаем ближайший город в списке

      dispatch('getDataForWeather', { woeid });
    },
  },
});
