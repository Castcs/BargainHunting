<template>
    <div>
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Store</th>
          <th>Price</th>
          <th>Remove</th>
          <th>Save</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(component, index) in components" :key="index">
          <td>{{ component.title }}</td>
          <td>{{ component.store }}</td>
          <td>${{ component.price }}</td>
          <td>
            <button id="remove" @click="removeComponent(index)">Remove</button>
          </td>
          <td>
            <button id="save" @click="saveComponent(index)">Save</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    Name: 'SearchResult',
    data() {
        return {
        components: [
            { title: 'result', store: 'Amazon', price: '849.99' },
        ],
        };
    },
    methods: {
        removeComponent(index) {
        this.components.splice(index, 1);
        },
        saveComponent(index) {
            //save to database
            return index;
        }
    }
}
</script>

