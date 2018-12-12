<template>
  <div class="search">
    <label class="search__block">
      <input
          v-model.trim="searchQuery"
          @input="debounce"
          class="search__input"
          type="text"
          placeholder="Поиск"
      >

      <font-awesome-icon v-if="isLoading" class="search__icon" icon="spinner" spin />

    </label>


    <ul class="search__list" v-show="searchQueryResults.length">
      <li v-for="(item, i) in searchQueryResults" class="search__item">
        <router-link
            class="search__link"
            :to="{ name: 'v-weather', params: { woeid: item.woeid } }"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    props: {
      delay: {
        type: Number,
        default: 500
      }
    },

    data() {
      return {
        isLoading: false,
        searchQuery: '',
        timer: null
      }
    },

    computed: mapState([
      'searchQueryResults'
    ]),

    methods: {
      ...mapActions([
        'searchQueryForCities'
      ]),

      debounce() {
        this.isLoading = true;

        if (this.timer) {
          clearTimeout(this.timer)
        }

        this.timer = setTimeout(this.complete, this.delay)
      },

      async complete() {
        await this.searchQueryForCities(this.searchQuery);
        this.isLoading = false;
      }
    }
  };
</script>

<style>
  .search:hover ul {
    display: block;
  }
  .search__block {
    position: relative;
  }

  .search__input {
    padding: .5rem 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .search__icon {
    position: absolute;
    top: .1rem;
    right: .5rem;
  }

  .search__list {
    display: none;
    box-sizing: border-box;
    min-width: 203px;
    max-height: 600px;
    overflow-y: auto;
    margin: 0;
    padding: .5rem ;
    list-style-type: none;
    position: absolute;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1;
  }

  .search__item {
    padding: .5rem;
    max-width: 170px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .search__link {
    color: #2c3e50;
    text-decoration-line: none;
  }

  .search__link:hover {
    color: #4884bf;
  }

</style>