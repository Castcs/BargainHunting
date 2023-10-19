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

