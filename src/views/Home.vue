<template>
  <div class="home">
    <input type="text" placeholder="search">

    <p>{{ location }}</p>

    <p> блок с кратким прогнозом в текущем месте.</p>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapState } from 'vuex';

  export default {
    name: 'home',

    components: {},

    computed: mapState([
      'location'
    ]),

    created() {
      this.$store.dispatch('loadDefaultData');
    }
  };
</script>
