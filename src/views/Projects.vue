<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Projects</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" :to="{ name: 'home' }"> Add project </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.startDate`]="{ item }">
      {{ item.startDate | date }}
    </template>
    <template v-slot:[`item.endDate`]="{ item }">
      {{ item.endDate | date }}
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-chip
          v-for="(user, i) in item.users"
          :key="i"
          class="ma-2"
          color="green"
          text-color="white"
        >
          Username: {{ user.username }}
        </v-chip>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Projects",
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Start date", value: "startDate" },
        { text: "End date", value: "endDate" },
        { text: "Detail", value: "detail" },
      ],
    };
  },
  computed: {
    ...mapGetters(["projects"]),
  },
};
</script>
