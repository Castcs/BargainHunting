<template>
    <div class="container">
        <!-- <img :src="require('@/assets/BHLogo.png')" alt="Example Image" /> -->
        <h1>Welcome to BargainHunting. Please Sign-up/Log-in to continue.</h1>
    </div>
</template>

<script>
export default {
    name : 'HomeComponent',
}
</script>

<style>

    .container {
        text-align: center;
        justify-content: center;
        width: 100%;
        display: flex;
        /* border: solid 1px green; */
    }

    img {
        width: 50px;
        height: 50px;
        /* border: solid 2px blue; */
        position:absolute;
    }

    h1 {
        justify-content: center;
        vertical-align: center;
        /* border: solid 2px red; */
    }
</style>