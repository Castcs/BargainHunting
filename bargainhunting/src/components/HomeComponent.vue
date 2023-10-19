<template>
    <div class="parent-container">
        <!-- <div v-for="(component, index) in components" :key="index" class="contentArea"> -->
            <SearchResult v-for="(component, index) in components" :key="index"
             @remove="removeComponent(index)"
             :title="component.title"
             :price="component.price"/>
        <!-- </div> -->
    </div>
    <button class="AddButton" @click="addComponent">Add</button>
</template>

<script>
import SearchResult from './SearchResult.vue'
export default {
    name : 'HomeComponent',
    components: {
        SearchResult,
    },
    data() {
        return {
            components: [ {title: 'MacBook Pro', price: '849.99'},
                          {title: 'AirPods', price: '237.00'},
                          {title: 'Pen', price: '4.99'}], // Array to track instances of MyComponent
        };
    },
    methods: {
        addComponent() {
            // Push a new instance of MyComponent to the components array
            this.components.push(SearchResult);
        },
        removeComponent(index) {
        // Remove the component at the specified index
            this.components.splice(index, 1);
        },
    },

}
</script>

