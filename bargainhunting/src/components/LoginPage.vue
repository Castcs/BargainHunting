<template>
    <h1>Log In</h1>
    <div class="register">
        <input type="text" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />
        <button v-on:click="toggleLogin">Log In</button>
        <p>
            <RouterLink to="/sign-up">Sign Up</RouterLink>
        </p>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    methods: {
    toggleLogin() {
      // Dispatch the setLoggedIn mutation to toggle the state
      console.log(this.$store.isLoggedIn);
      if(!this.$store.isLoggedIn) {
          this.$store.commit('setLoggedIn', !this.$store.state.isLoggedIn);
          this.$router.push({name: 'HomeComponent'});
      }

      else {
        this.$router.push({name: 'LoginPage'});
      }
    },
  },
}
</script>

<style>
  @import '../public/style.css';
</style>