<template>
    <div class="navbar">
        <img :src="require('@/assets/BHLogo.png')" alt="Example Image" />
        <h3>BargainHunting</h3>
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

  methods: {
    signOut() {
        this.$store.commit('setLoggedIn', false);
        this.$router.push('/');
    }
  }
}
</script>

<style scoped>
    @import '../public/style.css';

    img {
        position:fixed;
        top:3px;
        left: 0px;
    }
</style>