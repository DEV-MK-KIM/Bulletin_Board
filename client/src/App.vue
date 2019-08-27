/* eslint-disable */

<template>
  <v-app>
    <div>
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" temporary></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary fixed>
        <v-list shaped>
          <v-subheader>REPORTS</v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-content>
      <router-view></router-view>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    item:0,
    items: [
      { text: "Home", icon: "mdi-home", to: {path: "/"}},
      { text: "User", icon: "mdi-face", to:"/user" }
    ]
  })
};
</script>
