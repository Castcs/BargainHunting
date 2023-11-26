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
  
  // Assuming SearchResult.vue is not being used for this component anymore.
  // If it is, you can leave the import and components registration in place.
  // import axios from "@/services/axios";
  
  export default {
    name: 'SearchResults',
     data() {
      return {
        results: [],
        saved: [],
      };
    },
    mounted() {
      // console.log(this.$store.state.email);
      this.fetchSearchResults();
    },
    methods: {
      saveResult(index) {
        const email = this.$store.state.email;
        const query = this.$store.state.searchQuery;

        axios.post('http://localhost:3000/saveResult', {
          email: email,
          saved: [this.results[index].title, this.results[index].url, this.results[index].price],
          query: query,
        })
          .then(() => {
            this.$router.push({name: 'HomeComponent'});
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
        const searchQuery = this.$store.state.searchQuery;
  
        axios.post('http://localhost:3000/executeSearch', {
          searchQuery: searchQuery,
        })
          .then(response => {
            console.log(response.data);
            this.results = response.data;
          })
          .catch(error => {
            console.error('Error fetching data from backend:', error);
          })
      },
    },
  };
  </script>

