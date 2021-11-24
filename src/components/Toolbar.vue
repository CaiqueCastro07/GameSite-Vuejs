<template>
  <div>
    <v-toolbar dark>
      <v-tabs fixed-tabs>
        <v-tab
          v-for="(element, index) in gamesArray"
          v-bind:key="index"
          :to="element.path"
        >
          {{ element.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
  </div>
</template>

<script>
import caminhos from "../items/caminhos";

export default {
  name: "Toolbar",
  components: {},
  data() {
    return {};
  },
  computed: {
    gamesArray() {
      return caminhos;
    },
  },
  created() {},
};
</script>

<!--

<v-toolbar >
    <v-tabs >
          <v-tabs-item background-color="black" dark v-for="(item, index) in abas" v-bind:key='index' >
              {{item.name}}
          </v-tabs-item>
    </v-tabs>
</v-toolbar>

 -->
