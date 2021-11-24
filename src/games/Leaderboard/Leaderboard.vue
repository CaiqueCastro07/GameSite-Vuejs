<template>
  <div class="backLeader">
    <div class="holdLeader">
      <div class="memLeader">
        <li v-for="(score, index) in memDiv" :key="(score, index)">
          {{
            score.name +
              " venceu o jogo em " +
              score.time +
              "(t) " +
              "com " +
              score.turns +
              " tentativas"
          }}
        </li>
      </div>
      <div class="minesLeader">
        <li v-for="(score, index) in minesDiv" :key="(score, index)">
          {{ score.name + " venceu o jogo em " + score.time + "(t)" }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../Arch/http";

export default {
  name: "Leaderboard",
  components: {},

  data: () => ({
    apiData: false,
    memDiv: false,
    minesDiv: false,
    render: false,
  }),
  methods: {
    loadApi() {
      http.get("/Memory").then((res) => {
        const memData = res.data.sort((a, b) => a.time - b.time);

        http.get("/Mines").then((res2) => {

          this.memDiv = memData;

          this.minesDiv = res2.data.sort((a, b) => a.time - b.time);
        });
      });
    }, 
  }, 
  created() {
    this.loadApi();
  },
};
</script>

<style>
@import "../../assets/styles/leaderboard.css";
</style>
