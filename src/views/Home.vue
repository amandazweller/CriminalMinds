<template>
<div class="home">
 <table id="tasks" class="ui celled compact table">
      <thead>
        <tr>
         <th style="width:10%"> Image</th>
         <th>Episode Title</th>
          <th style="width:10%">Description</th>
          <th style="width:6%"><img src="../assets/comment.svg" width="25" height="25"></th>
          <th style="width:4%"><img src="../assets/edit.svg" width="25" height="25"></th>
          <th style="width:5%"><img src="../assets/delete.svg" width="25" height="25"></th>
          <th style="width:35%">Comments</th>
        </tr>
      </thead>
      <tr v-for="item in items" :key="item.id">
        <td><img :src="item.path" width="100" height="75"/></td>
        <td>{{ item.title }}</td>
        <td>{{ item.desc }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'comment', params: { id: item._id }}">Add Comment</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="'/edit?id=' + item._id">Edit</router-link>
        </td>
        <td width="75" class="center aligned">
          <button @click="deleteItem(item)">Delete</button>
        </td>
        <div v-for="comment in comments" :key="comment.id">
          <h4><em>{{comment.comment}}</em></h4>
          <p> Written by: {{comment.name}} on {{comment.date}}</p>
          <h5>Email: {{comment.email}}</h5>
        </div>
      </tr>
    </table>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
     comments: [],
    }
  },
  created() {
    this.getItems();
    this.getComments();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments");
        this.comments = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* spacing */

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid green;
}

th, td {
  padding: 20px;
  border: 1px solid green;
}

/* typography */

html {
  font-family: 'helvetica neue', helvetica, arial, sans-serif;
}

thead th, tfoot th {
  font-family: 'Rock Salt', cursive;
}

th {
  letter-spacing: 2px;
}

td {
  letter-spacing: 1px;
}

tbody td {
  text-align: center;
}

tfoot th {
  text-align: right;
}

/* graphics and colors */

thead, tfoot {
  color: white;
  text-shadow: 1px 1px 1px black;
}

thead th, tfoot th, tfoot td {
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
  border: 3px solid green;
}


/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>

