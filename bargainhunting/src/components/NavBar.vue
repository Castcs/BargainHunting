<template>
    <div class="navbar">
      <div style="display: flex;">

        <RouterLink v-if="isLoggedIn" to="/home" class="logo-link">
          <img :src="require('@/assets/BHLogo.png')" alt="logo" />
        </RouterLink>

        <RouterLink v-if="!isLoggedIn" to="/">
          <img :src="require('@/assets/BHLogo.png')" alt="logo" />
        </RouterLink>
        <h3>BargainHunting</h3>
      </div>
  
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
        <li><RouterLink v-if="!isLoggedIn" to="/sign-up">Sign Up</RouterLink></li>
        <li><RouterLink v-if="!isLoggedIn" to="/log-in">Log In</RouterLink></li>
        <li><RouterLink v-if="isLoggedIn" @click="signOut" to="/">Sign Out</RouterLink></li>
      </ul>
    </div>
  </template>
  
  <script>

  export default {
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
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
          this.searchQuery = '';
        }
      },

      signOut() {
          this.$store.commit('setLoggedIn', false);
          this.$router.push('/');
      },      
    }
  }
  </script>
  

  