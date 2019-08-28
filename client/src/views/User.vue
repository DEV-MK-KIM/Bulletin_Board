<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-col xs="12" sm="6" md="3" v-for="(user, index) in users" :key="index">
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="align-end fill-height"></v-card-title>

          <v-card-text>Name: {{ user.name}}</v-card-text>
          <v-card-text>Age: {{ user.age }}</v-card-text>

          <v-card-actions>
            <v-btn text color="warning" @click="putDialog(user)">Modify</v-btn>
            <v-btn text color="error" @click="delUser(user._id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>

    <!-- User Create Button -->
    <v-btn fixed right dark fab bottom color="pink" @click="dialogPopUp">
      <v-icon>add</v-icon>
    </v-btn>

    <!-- User Create Modal -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Full Name*" required v-model="user.name"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select :items="usersAge" label="Age*" required v-model="user.age"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="putId? putUser() : postUser()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar API Message -->
    <v-snackbar v-model="snackbar" top :timeout="6000" :color= type >
      {{ message }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      type: 'error',
      response: "",
      result: "",
      dialog: false,
      usersAge: [],
      snackbar: false,
      message: "",
      users: [],
      user: {
        name: null,
        age: null
      },
      putId: null
    };
  },
  mounted() {
    this.userAgesArray();
    this.fetchUsers();
  },
  methods: {
    dialogPopUp(){
      this.dialog = true
      this.user.name = null
      this.user.name = null
    },
    userAgesArray() {
      let i = 5;
      while (i < 60) {
        this.usersAge.push(i);
        i++;
      }
    },
    fetchUsers() {
      axios
        .get("http://localhost:3000/api/user")
        .then(res => {
          this.users = res.data.users;
        })
        .catch(err => {
          console.log(err);
        });
    },
    postUser() {
      axios
        .post("http://localhost:3000/api/user", {
          name: this.user.name,
          age: this.user.age

        })
        .then(res => {
          console.log(res);
          this.pop("Successfully Registered");
          this.fetchUsers();
          this.dialog = false
          this.type = 'success'

        })
        .catch(err => {
          console.log(err);
          this.pop(err.message);
        });
    },
    putDialog(user) {
      this.dialog = true;
      this.user.name = user.name;
      this.user.age = user.age;
      this.putId = user._id;
      console.log(this.putId);
    },
    putUser() {
      axios
        .put(`http://localhost:3000/api/user/${this.putId}`, {
          name: this.user.name,
          age: this.user.age
        })
        .then(res => {
          console.log(res);
          this.pop("Successfully Updated");
          this.fetchUsers();
          this.dialog = false
          this.type = 'success'

        })
        .catch(err => {
          console.log(err);
          this.pop(err.message);
        });
    },
    delUser(id) {
      axios
        .delete(`http://localhost:3000/api/user/${id}`)
        .then(res => {
          console.log(res);
          this.pop("Successfully Deleted");
          this.fetchUsers();
          this.type = 'warning'

        })
        .catch(err => {
          console.log(err);
          this.pop("Remove Failed");
          this.pop(err.message);
        });
    },
    pop(msg) {
      this.snackbar = true;
      this.message = msg;
    }
  }
};
</script>

<style>
</style>