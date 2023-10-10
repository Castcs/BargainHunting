<template>
    <div class="navbar">
        <ul>
            <li><RouterLink v-if="isLoggedIn" to="/home">Home</RouterLink></li>
            <li><RouterLink v-if="notIsLoggedIn" to="/">Sign Up</RouterLink></li>
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
    margin-bottom: 20px;
    width: 99%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
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