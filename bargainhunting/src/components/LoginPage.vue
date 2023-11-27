<template>
  <div>
    <h1>Log In</h1>
    <div class="register">
      <form @submit.prevent="LogIn" class="register-form">
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
        <button type="submit">Log In</button>
      </form>
    </div>
    <p>
      <router-link to="/sign-up">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import axios from "@/services/axios";

export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      isValidEmail: true,
      isValidPassword: true,
      badResponse: false,
    };
  },

  methods: {
    LogIn() {
      // Reset validation status
      this.isValidEmail = true;
      this.isValidPassword = true;
      this.badResponse = false;

      // Validate email and password
      if (!this.email) {
        this.isValidEmail = false;
        console.log("Email Empty");
      }

      if (!this.password) {
        this.isValidPassword = false;
      }

      // If validation fails, return early
      if (!this.isValidEmail || !this.isValidPassword) {
        return;
      }

      axios
        .post("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Token created from response data, contains userID from database.
          const token = response.data.token;
          // Token stored in localStorage
          localStorage.setItem('token', token);
          
          if (!this.$store.isLoggedIn) {
            // this.$store.commit("setJwt", token);
            this.$store.commit(
              "setLoggedIn",
              !this.$store.state.isLoggedIn
            );
            this.$store.commit("setEmail", this.email);
            this.$router.push({ name: "HomeComponent" });
          } else {
            this.$router.push({ name: "LoginPage" });
          }
        })
        .catch((error) => {
          console.error(error.response.data.error);
          this.badResponse = true;
        });
    },
  },
};
</script>