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
          <td style="width: 50%;">{{ result.resultName }}</td>
          <td>
            <a :href="result.resultURL" target="_blank">
              {{ truncatedURL(result.resultURL) }}</a>
          </td>
          <td>${{ result.resultPrice }}</td>
          <td>
            <button @click="removeComponent(index)">Remove</button>
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
  name: 'HomeComponent',
   data() {
    return {
      results: [],
    };
  },
  mounted() {
    // console.log(this.$store.state.email);
    this.fetchData();
    this.$store.commit('setSearchQuery', '');
  },
  methods: {
    removeComponent(index) {
      this.results.splice(index, 1);
    },

    truncatedURL(url) {
        const maxLength = 20;
        return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
      },

    fetchData() {
      const email = this.$store.state.email;

      axios.post('http://localhost:3000/fetchHistory', {
        email: email,
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

