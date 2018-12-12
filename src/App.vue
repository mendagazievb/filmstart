<template>
  <div id="app">
    <div v-if="isLoading" class="overflow">
      <font-awesome-icon class="overflow__icon" icon="cog" size="6x" spin />
    </div>

    <div class="container">
      <header class="header">
        <div id="nav">
          <router-link to="/">Главная</router-link>
          <router-link to="/map">Карта</router-link>
        </div>

        <c-search />
      </header>

      <router-view/>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import CSearch from '@/components/CSearch';

  export default {
    components: {
      CSearch
    },

    computed: mapState([
      'isLoading'
    ])
  }
</script>

<style>

  body {
    margin: 0;
    position: relative;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 1rem;
  }

  #nav a {
    font-weight: bold;
    text-decoration: none;
    margin-right: .5rem;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .container {
    padding: 0 10px;
  }

  .overflow {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    background: rgba(0,0,0, .7);
    z-index: 10;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  @media screen and (max-width: 375px) {
    .header {
      justify-content: center;
    }
  }

  .title {
    text-align: center;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .list__item {
    margin-bottom: 1rem;
  }
</style>
