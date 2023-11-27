<template>
  <div>
    <h1>Sign Up</h1>
    <div class="register">
      <form @submit.prevent="registerUser" class="register-form">
        <input
          v-model="name"
          type="text"
          placeholder="Enter Name" 
          :class="{ 'input-error': !isValidName }"
          />
        <input
          v-model="email"
          type="text"
          placeholder="Enter Email" 
          :class="{ 'input-error': !isValidEmail }"
          />
        <input
          v-model="password"
          type="password"
          placeholder="Enter Password" 
          :class="{ 'input-error': !isValidPassword }"
          />
          <div v-if="badResponse" class="error-message">Invalid Information</div>
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
      isValidName: true,
      isValidEmail: true,
      isValidPassword: true,
      badResponse: false,
    };
  },
  methods: {
    registerUser() {
      //Resets all validation booleans
      this.isValidName = true;
      this.isValidEmail = true;
      this.isValidPassword = true;
      this.badResponse = false;

      // Validate name
      if(!this.name) {
        this.isValidName = false;
      }
      // Validate email
      if (!this.email) {
        this.isValidEmail = false;
      }

      //Validate Password
      if (!this.password) {
        this.isValidPassword = false;
      }

      // If validation fails, return early
      if (!this.isValidEmail || !this.isValidPassword || !this.isValidName) {
        return;
      }
      
      axios.post('http://localhost:3000/newUser', {
        username: this.name,
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        // Token created from response data, contains userID from database.
        const token = response.data.token;
          // Token stored in localStorage
        localStorage.setItem('token', token);

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
        this.badResponse = true;
        // Handle registration errors, such as duplicate usernames
      });
    },
  },
};
</script>