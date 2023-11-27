<template>
    <h1>Log In</h1>
    <div class="register">
      <form @submit.prevent="LogIn" class="register-form">
        <input v-model="email" type="text" placeholder="Enter Email" />
        <input v-model="password" type="password" placeholder="Enter Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
    <p>
        <RouterLink to="/sign-up">Sign Up</RouterLink>
    </p>
</template>

<script>
import axios from "@/services/axios";
export default {
    name: 'LoginPage',

    data() {
      return {
        email: '',
        password: '',
      };
    },

    methods: {
      LogIn() {
        axios.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password,
        }).then(response => {
            const token = response.data;
            if(!this.$store.isLoggedIn) {
                this.$store.commit('setJwt', token);
                this.$store.commit('setLoggedIn', !this.$store.state.isLoggedIn);
                this.$store.commit('setEmail', this.email);
                this.$router.push({name: 'HomeComponent'});
            }
            else {
              this.$router.push({name: 'LoginPage'});
            }
          }).catch((error) => {
              console.error(error.response.data.error);
            });
      },
    },
}
</script>
