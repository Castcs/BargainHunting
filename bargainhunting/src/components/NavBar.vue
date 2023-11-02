<template>
    <div class="navbar">
      <h3 id="brand">BargainHunting</h3>

      <!-- <img :src="require('@/assets/BHLogo.png')" alt="logo"/> -->
  
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
        <link rel="icon" href="../../public/BHLogo.png">
        <!-- <li><RouterLink v-if="isLoggedIn" to="/home">Home</RouterLink></li> -->
        <li><RouterLink v-if="notIsLoggedIn" to="/sign-up">Sign Up</RouterLink></li>
        <li><RouterLink v-if="notIsLoggedIn" to="/log-in">Log In</RouterLink></li>
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
      // Implement your search functionality here
    },
    signOut() {
        this.$store.commit('setLoggedIn', false);
        this.$router.push('/');
    }
  }
}
  </script>
  

  