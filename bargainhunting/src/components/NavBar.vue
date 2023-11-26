<template>
    <div class="navbar">

      <img :src="require('@/assets/BHLogo.png')" alt="logo"/>
      <h3>BargainHunting</h3>
  
      <div 
        class="search-bar"
        v-if="isLoggedIn"
        >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Look For Items..."
        />
        <button class="search-button" @click="search">Search</button>
      </div>
  
      <ul>
        <li><RouterLink v-if="notIsLoggedIn" to="/sign-up">Sign Up</RouterLink></li>
        <li><RouterLink v-if="notIsLoggedIn" to="/log-in">Log In</RouterLink></li>
        <li><RouterLink v-if="isLoggedIn" @click="signOut" to="/">Sign Out</RouterLink></li>
      </ul>
    </div>
  </template>
  
  <script>
  // import axios from "@/services/axios";

  export default {
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      notIsLoggedIn() {
          return !this.$store.state.isLoggedIn;
      }
    },

    data() {
        return {
        searchQuery: '', // Store the search query
        };
    },

    methods: {
        search() {
          if (this.searchQuery != '') {
            this.$store.commit('setSearchQuery', this.searchQuery);
            this.$router.push({name: 'SearchResults'});
          }
          // axios.post('http://localhost:3000/executeSearch', {
          //   searchQuery: this.searchQuery,
          // }, {
          //   timeout: 20000, // Set timeout length
          // })
          //   .then(response => {
          //     console.log(response.data);
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //     // Handle registration errors, such as duplicate usernames
          //   });
        },
      signOut() {
          this.$store.commit('setLoggedIn', false);
          this.$router.push('/');
      }
    }
  }
  </script>
  

  