<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Store</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(component, index) in components" :key="index">
          <td>{{ component.title }}</td>
          <td>{{ component.store }}</td>
          <td>${{ component.price }}</td>
          <td>
            <button @click="removeComponent(index)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// Assuming SearchResult.vue is not being used for this component anymore.
// If it is, you can leave the import and components registration in place.

export default {
  name: 'HomeComponent',
  data() {
    return {
      components: [
        { title: 'MacBook Pro', store: 'Amazon', price: '849.99' },
        { title: 'AirPods', store: 'Amazon', price: '237.00' },
        { title: 'Pen', store: 'Amazon', price: '4.99' },
      ],
    };
  },
  methods: {
    removeComponent(index) {
      this.components.splice(index, 1);
    },
  },
};
</script>

<style>
/* Add any additional styles for your table here */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>

