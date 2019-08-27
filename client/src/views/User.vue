<template>
<v-container grid-list-md text-xs-center>
  <v-btn @click="fetch">FETCH</v-btn>
  <v-layout row wrap>
    <v-col v-for="(user, index) in users" :key="index" xs="12" sm="3" >
      <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      
    </v-img>
    <v-card-title class="align-end fill-height">{{ user.name}}</v-card-title>

    <v-card-text>
      <div>{{ user.age }}</div>
            <div>{{ user.job }}</div>

      
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="orange"
      >
        Share
      </v-btn>
      <v-btn
        text
        color="orange"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
    </v-col>
  </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      users:[],
      }

  },
  methods:{
  fetch(){
    axios.get('http://localhost:3000/api/user')
    .then((res)=>{
      console.log(res.data)
      this.users = res.data.users
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  }

}
</script>

<style>

</style>