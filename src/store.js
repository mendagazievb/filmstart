import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: {}
  },

  mutations: {
    saveLocation(state, payload) {
      state.location = payload;
    }
  },

  actions: {
    /**
     * Получаем данные для текущего местоположения
     *
     * @param context
     * @param payload
     */
    async getLocation({ commit }, payload) {
      await fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(response => {
          commit('saveLocation', response)
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

      fetch(`https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`, { mode: 'cors'})
        .then(response => response.json())
        .then(response => {
          console.log(response)
        });
    },

    async loadDefaultData({ commit, dispatch, state }) {
      await dispatch('getLocation');

      dispatch('searchLocation')
    }
  },
});
