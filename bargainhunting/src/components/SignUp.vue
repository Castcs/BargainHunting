<template>
    <h1>Sign Up</h1>
    <div class="register">
        <input type="text" placeholder="Enter Name" />
        <input type="text" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />
        <button v-on:click="toggleLogin">Sign Up</button>
        <button v-on:click="registerUser">Sign Up</button>

        <p>
            <router-link to="/log-in">Log In</router-link>
        </p>

    </div>

</template>

<script>
import axios from "@/services/axios";

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

      registerUser() {
        axios.post('/register', {
          username: 'user123', // Replace with the actual username entered by the user
          password: 'password123', // Replace with the actual password entered by the user
        })
            .then((response) => {
              console.log(response.data.message);
              // Handle successful registration
            })
            .catch((error) => {
              console.error(error.response.data.error);
              // Handle registration errors, such as duplicate usernames
            });

      },
  },
}
</script>