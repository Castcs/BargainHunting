<template>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Store</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <div v-if="isLoading" class="loading-indicator">
          Loading...
        </div>

        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td style="width: 50%;">{{ result.title }}</td>
            <td>
              <a :href="result.url" target="_blank">
                {{ truncatedURL(result.url) }}
              </a>
            </td>
            <td>${{ result.price }}</td>
            <td>
              <button @click="saveResult(index)">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SearchResults',

    data() {
      return {
        results: [],
        saved: [],
        storedToken: localStorage.getItem('token'),
        isLoading: false,
      };
    },
    
    mounted() {
      this.fetchSearchResults();
    },

    methods: {
      saveResult(index) {
        const query = this.$store.state.searchQuery;

        axios.post('http://localhost:3000/saveResult', {
          saved: [this.results[index].title, this.results[index].url, this.results[index].price],
          query: query,
        }, {
          headers: {
            Authorization: `Bearer ${this.storedToken}`,
          }
        })
          .then(() => {
            this.$router.push({name: 'HomeComponent'});
            this.$store.commit('setSearchQuery', "");
          })
          .catch(error => {
            console.error('Error fetching data from backend:', error);
          })
      },

      truncatedURL(url) {
        const maxLength = 20;
        return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
      },
  
      fetchSearchResults() {
        this.isLoading = true;
        const searchQuery = this.$store.state.searchQuery;
  
        axios.post('http://localhost:3000/executeSearch', {
          searchQuery: searchQuery,
        })
          .then(response => {
            this.results = response.data;
          })
          .catch(error => {
            console.error('Error fetching data from backend:', error);
          })
          .finally(() => {
            this.isLoading = false;
          })
      },
    },
  };
  </script>