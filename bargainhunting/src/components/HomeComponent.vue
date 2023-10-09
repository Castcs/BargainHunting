<template>
    <div class="contentArea">
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
        align-items: center;
        justify-content: center;
    }
</style>