<template>
    <div class="contentArea">
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
    </div>
</template>

<script>
import SearchResult from './SearchResult.vue'
export default {
    name : 'HomeComponent',
    components: {
        SearchResult,
    }
}
</script>

<style>
    .contentArea {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: auto;
        overflow:visible;
    }
</style>