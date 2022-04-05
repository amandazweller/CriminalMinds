<template>
<div class="home">
    <div class="card" v-for="character in characters" :key="character.id">
        <div class="container">
            <img :src="character.image">
            <h3><b>{{ character.name }}</b></h3>
            <h4> Alias: {{ character.alias }} </h4>
            <h5>Job: {{ character.job }}</h5>
            <p> Gender: {{ character.gender }} </p>
            <h5>Portrayed by: {{ character.actor }}</h5>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'characters',
  data() {
    return {
     characters: [],
    }
  },
  created() {
    this.getCharacters();
  },
  methods: {
    async getCharacters() {
      try {
        let response = await axios.get("/api/characters");
        this.characters = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>
    .card {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
      border-radius: 5px; /* 5px rounded corners */
    }

    /* On mouse-over, add a deeper shadow */
    .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    /* Add some padding inside the card container */
    .container {
    padding: 2px 16px;
    }
    img {
  border-radius: 5px 5px 0 0;
}
</style>