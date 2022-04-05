<template>
  <div class="editItem">
  <div class="heading">
    <h2>Edit the Episode</h2>
  </div>
  <div class="edit">
      <div class="form">
        <input id="title2" placeholder="New Title">
        <br>
        <textarea id="description2" name="description2" rows="4" cols="50" placeholder="New Description"></textarea>
      </div>
      <button @click="editItem()">Edit</button>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
export default {
  name: 'Edit',
  data() {
    return{
      id: 0,
    }
  },
  methods: {
    async editItem() {
      try {
        let description2 = document.getElementById("description2").value;
        let title2 = document.getElementById("title2").value;
        console.log(this.id);
        await axios.put("/api/items/" + this.id, {
          title: title2,
          description: description2,
        });
        this.findItem = null;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted: function() {
    this.id = this.$root._route.query.id;
  }
}
</script>
