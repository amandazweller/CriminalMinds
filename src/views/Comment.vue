<template>
<div class="comments">
  <h3>Add a Comment</h3>
	<div class="form">
    <div><input id="name" placeholder="Name"></div>
    <div><input id="email" placeholder="Email Address"></div>
    <div><input id="date" placeholder="Current Date"></div>
    <textarea id="comment" placeholder="Comment"></textarea>
    <br><br>
  </div>
    <button @click="addComment">Post Comment</button>
<br>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'comment-comment',
  methods: {
    async addComment() {
     try {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let date = document.getElementById("date").value;
        let comment = document.getElementById("comment").value;
        let r2 = await axios.post('/api/comments', {
          name: name,
          email: email,
          date: date,
          comment: comment,
        });
        this.addComment = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style>
body {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding: 20px 100px 0px 100px;
    background: #f3f3f3;
}
button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
}

textarea {
    width: 100%;
    max-width: 500px;
    height: 100px;
}
.name {
  align: left;

}
.title {
  align: left;
  margin: 1%;
}
.text{
  align: center;
  margin: auto;
  width: 100%;
}
</style>

