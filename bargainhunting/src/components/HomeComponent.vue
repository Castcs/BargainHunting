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

export default {
  name: 'HomeComponent',
    data() {
      return {
        results: [],
        email: this.$store.state.email,
      };
    },

    mounted() {
      this.fetchData();
      this.$store.commit('setSearchQuery', '');
    },

    methods: {
      removeComponent(index) {
        //Removes the item from the database
        console.log("Item: " + this.results[index].resultName)
        axios.post('http://localhost:3000/removeItem', {
          email: this.email,
          item: this.results[index],
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error deleting item from database:', error);
        })


        //Removes the item visually from the front end.
        this.results.splice(index, 1);
      },

      truncatedURL(url) {
          const maxLength = 20;
          return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
        },

      fetchData() {
        axios.post('http://localhost:3000/fetchHistory', {
          email: this.email,
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

