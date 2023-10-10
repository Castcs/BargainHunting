<template>
    <div class="box">
        <button class="removeResult" @click="removeComponent">X</button>
        <div class="title">
            <h3>{{title}}</h3>
        </div>
        <br>
        <div class="details">
            <a href="https://www.amazon.com/">Amazon</a>
            <p>${{ price }}</p>
        </div>
    </div>
</template>

<script>
export default {
    Name: 'SearchResult',
    props: {
        title: String,
        price: String,
    },
    methods: {
        removeComponent() {
            this.$emit('remove');
        }
    }
}
</script>

<style>
    .box {
        min-height: 300px;
        min-width: 500px;
        margin: 25px;
        border: 2px solid black;
        border-radius: 10%;
        display: inline;
        /* align-items: center; */
        place-content: center;
        position: relative;
        background-color: white;
    }

    .details {
        display: inline;
    }

    .removeResult{
        background-color: transparent;
        border: none;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }

    .removeResult:hover {
        background-color: red;
        border-radius: 25%;
        color: White;
    }
</style>