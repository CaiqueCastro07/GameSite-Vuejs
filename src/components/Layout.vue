<template>
  <div class="back">
    <v-card height="90%" width="95%">
      <toolbar dark>
        <v-tabs dark fixed-tabs>
          <v-tab
            v-for="(element, index) in gamesArray"
            v-bind:key="index"
            :to="element.path"
          >
            {{ element.name }}
          </v-tab>
        </v-tabs>
      </toolbar>
      <div class='conteiner'>
        <router-view>
        </router-view>
      </div>
    </v-card>
  </div>
</template>

<script>
import caminhos from "../items/caminhos";

export default {
  components: {},
  name: "Layout",

  data: () => ({
    
  }),
  computed: { // pode ser usado pra ganhar data
    gamesArray() {
      // 
      return caminhos;
    },
  
  },
  created(){
  }
};
</script>

<style>
@import '../assets/styles/Layout.css';
</style>
