<template>
    <h1>SignUp</h1>
    <div class="register">
        <input type="text" placeholder="Enter Name" />
        <input type="text" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />
        <button v-on:click="toggleLogin">Sign Up</button>
        <p>
            <router-link to="/log-in">Log In</router-link>
        </p>

    </div>

</template>

<script>
export default {
    name : 'SignUp',
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