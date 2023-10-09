<template>
    <div class="navbar">
        <ul>
        <li><router-link v-if="isLoggedIn" to="/home">Home</router-link></li>
        <li><router-link v-if="notIsLoggedIn" to="/">Sign Up</router-link></li>
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

  methods: {
    signOut() {
        this.$store.commit('setLoggedIn', false);
        this.$router.push('/log-in');
    }
  }
}
</script>

<style scoped>
/* Add some basic styling for the navbar */
.navbar {
    background-color: #333;
    padding: 15px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    text-align: right;
}

li {
    display: inline;
    margin-right: 20px;
}

a {
    color: white;
    text-decoration: none;
}
</style>