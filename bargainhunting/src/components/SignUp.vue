<template>
  <div>
    <h1>Sign Up</h1>
    <div class="register">
      <form @submit.prevent="registerUser" class="register-form">
        <input v-model="name" type="text" placeholder="Enter Name" />
        <input v-model="email" type="text" placeholder="Enter Email" />
        <input v-model="password" type="password" placeholder="Enter Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    <p>
      <router-link to="/log-in">Log In</router-link>
    </p>
  </div>
</template> 

<script>
import axios from "@/services/axios";

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    registerUser() {
      // console.log("RegisterUser called:");
      axios.post('http://localhost:3000/newUser', {
        username: this.name,
        email: this.email,
        password: this.password,
      })
      .then(() => {
        // console.log(response);
        if(!this.$store.isLoggedIn) {
            this.$store.commit('setLoggedIn', !this.$store.state.isLoggedIn);
            this.$store.commit('setEmail', this.email);
            this.$router.push({name: 'HomeComponent'});
        }

        else {
          this.$router.push({name: 'LoginPage'});
        }
        // Handle successful registration
      })
      .catch((error) => {
        console.error(error.response.data.error);
        // Handle registration errors, such as duplicate usernames
      });
    },
  },
};
</script>