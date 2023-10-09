<template>
    <div class="box">
        <div class="title">
            <h3>Item</h3>
        </div>
        <br>
        <div class="details">
            <a href="https://www.amazon.com/">Amazon</a>
            <p>$100</p>
        </div>
    </div>
</template>

<script>
export default {
    Name: 'SearchResult'
}
</script>

<style>
    .box {
        height: 300px;
        min-width: 500px;
        margin: 25px;
        border: 2px solid black;
        border-radius: 10%;
        display: block;
        /* align-items: center; */
        place-content: center;
    }

    .details {
        display: inline;
    }
</style>