<template>
  <v-app id="inspire">
    <v-system-bar app color="primary">
      <v-spacer />
      <h3 class="white--text">
        {{ currentDate }}
      </h3>
      <v-icon color="white" class="ml-1"> mdi-circle </v-icon>
    </v-system-bar>
    <v-navigation-drawer
      app
      permanent
    >
     <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            List Gitlab Users
          </v-list-item-title>
          <v-list-item-subtitle>
            Christian H. Marinelli
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item link :to="{ name: 'home' }" :exact="true">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'projects' }" :exact="true">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="background-color: #f5f5f5">
      <v-container >
        <router-view class="mt-10"/>
      </v-container>
    </v-main>

    <v-footer padless>
    <v-col
      class="text-center white"
      cols="12"
    >
      List Gitlab Users — <strong>Test II</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
import moment from "moment";

export default {
  name: "Layout",
  computed: {
    currentDate() {
      return moment(new Date()).format("dddd, MMMM Do YYYY");
    },
  },
};
</script>
