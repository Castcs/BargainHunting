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
.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;

}

.register button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background-color: skyblue;
    color: white;
    cursor: pointer;
}
</style>