<template>
  <div class="backMine">
    <div class="allButtons">
      <button class="minePlay" @click="buildBoard"><b>{{ startText }}</b></button>
      <input
      v-if="!iniciou"
        class="bombsNumber"
        type="number"
        @keyup="inputVal = processVal($event.target.value)"
        :value="inputVal"
        :placeholder="inputVal"
      />
      <div class="mineTempo"><h1>{{ tempo }}</h1></div>

      <div class="pontos"><h1>{{ found }}</h1></div>
    </div>

    <div class="mineBoard">
      <v-container grid-list-xs>
        <v-layout row wrap>
          <div
            class="dot"
            @click="clickDot(dot)"
            :class="classBomb(dot)"
            :style="dotStyle(dot)"
            v-for="dot in dots"
            :key="dot"
          >
            <h1>{{dot.around}}</h1>
          </div>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>


<script>

//{{ dot.reveal ? (dot.around ? dot.around : " ") : " " }}

import gameData from "../GameData.js";
import makeMineField from "../../items/MineDots/makeMineField";
import api from "../../Arch/api.js";

const game = gameData.mine;

export default {
  name: "Mine",
  components: {},
  computed: {
    startText() {
      return this.iniciou ? "Recomeçar" : "Play";
    },
  },

  data: () => ({
    dots: game.dotsArray,
    started: game.started,
    iniciou: false,
    bombs: 0,
    found: game.found,
    tempo: game.time,
    inputVal: 6,
  }),
  methods: {
    processVal(num) {
      if (num < 6) {
        return 6;
      }
      if (num > 20) {
        return 20;
      }
      return num;
    },
    dotStyle(dot) {
      return {
        backgroundColor: dot.reveal
          ? dot.bomb
            ? "red"
            : "rgb(218, 218, 218)"
          : "grey",
      };
    },
    buildBoard() {
      if (game.started) {
        game.started = false;
        this.started = false;
        this.iniciou = false;
        game.found = 0;
        this.found = 0;
        game.dotsArray = [];
        this.inputVal = 6;
        this.dots = [];
        this.contador("resetar");
        game.time = 0;
        this.tempo = 0;
        return;
      }
      game.over = false;
      game.time = 0;
      this.tempo = 0;
      game.dotsArray = makeMineField();
      this.distributeBombs();
    },
    contador(cc) {
      if (cc === "resetar") {
        clearInterval(this.timer);
        this.started = false;
        game.over = true;

        return;
      }

      this.iniciou = true;

      this.timer = setInterval(() => {
        game.time += 1;

        this.tempo = game.time;
      }, 1000);
    },

    clickDot(dot) {

      console.log(this.found)
      if (!this.started) {
        return;
      }
      if (dot.reveal) {
        return;
      }

      if (dot.bomb) {
        game.dotsArray.forEach((element) => {
          element.revealIt();
        });
        
        game.found = 'OVER';
        this.found = 'OVER';
        this.contador("resetar");

        return;
      }

      let newFound = 0;

      if (dot.around != 0 && dot.around !== "B") {
        
        dot.revealIt();
        newFound+= 1;

        if (this.found == (game.dotsArray.length - game.bombs - 1)) {
          game.dotsArray.forEach((element) => {
            element.revealIt();
          });

          api.postScore('Mines',game.time,null)

          this.contador("resetar");

          console.log("voce venceu");
          game.found= 'VICTORY';
          this.found = 'VICTORY';
          return;
        }
        game.found += newFound;

        this.found += newFound;

        return;
      }

      dot.revealIt();
        newFound+= 1;

      function revealAgain(mine) {
        mine.area.forEach((areaIndex2) => {
          if (game.dotsArray[areaIndex2].reveal) {
            return;
          }
          if (game.dotsArray[areaIndex2].around === "B") {
            return;
          }

          game.dotsArray[areaIndex2].revealIt();
        newFound+= 1;

          if (game.dotsArray[areaIndex2].around === 0) {
            new revealAgain(game.dotsArray[areaIndex2]);
          }
        });
      }

      dot.area.forEach((areaIndex) => {
        if (game.dotsArray[areaIndex].reveal) {
          return;
        }
        if (game.dotsArray[areaIndex].around === "B") {
          return;
        }

        game.dotsArray[areaIndex].revealIt();
        newFound+= 1;

        if (game.dotsArray[areaIndex].around === 0) {
          new revealAgain(game.dotsArray[areaIndex]);
        }
      });

      game.found += newFound;

      this.found += newFound;

    },
    distributeBombs() {
      if (this.inputVal < 6) {
        this.inputVal = 6;
      }
      if (this.inputVal > 20) {
        this.inputVal = 20;
      }

      this.dots = game.dotsArray;
      this.bombs = this.inputVal;
      game.bombs = this.bombs;
      this.inputVal = 6;

      function random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }

      while (this.bombs) {
        const index = random(0, game.dotsArray.length - 1);

        if (game.dotsArray[index].bomb === false) {
          game.dotsArray[index].addBomb();
          game.dotsArray[index].addAround();
          this.bombs -= 1;
        }
      }

      this.countPlaces();
    },
    countPlaces() {
      game.dotsArray.forEach((dot) => {
        dot.area.forEach((around) => {
          if (game.dotsArray[around].bomb) {
            dot.addAround(1);
          }
        });
      });

      game.started = true;
      this.started = game.started;
      this.iniciou = true;
      this.contador();
    },
    classBomb(dot) {
      return dot.bomb ? "dots bomba" : "dots";
    },
  },
  created() {
    clearInterval(gameData.memory.saveThis.timer);

    if (game.started) {
      delete game.saveThis;
      game.saveThis = this;

      if (!game.over) {
        this.contador();
        return;
      }
      game.dotsArray = [];
      this.iniciou = true;

      return;
    }

    if (game.over) {
      this.inicou = true;
    }

    delete game.saveThis;
    game.saveThis = this;
  },
};
</script>

<style>
@import "../../assets/styles/Mine.css";
</style>
