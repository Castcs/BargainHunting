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
        storedToken: localStorage.getItem('token'),
      };
    },

    mounted() {
      this.fetchData();
    },

    methods: {
      removeComponent(index) {
        //Removes the item from the database
        axios.post('http://localhost:3000/removeItem', {
          // email: this.email,
          item: this.results[index],
        }, {
          headers: {
            Authorization: `Bearer ${this.storedToken}`,
          },
        })
        .then(response => {
          console.log(response.data);
          //Removes the item visually from the front end.
          this.results.splice(index, 1);
        })
        .catch(error => {
          console.error('Error deleting item from database:', error);
        })
      },

      truncatedURL(url) {
          const maxLength = 20;
          return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
        },

      fetchData() {
        axios.post('http://localhost:3000/fetchHistory', {
          email: this.email,
        }, {
          headers: {
            Authorization: `Bearer ${this.storedToken}`,
          }
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

