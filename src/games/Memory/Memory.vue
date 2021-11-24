<template>
  <div class="backMemory">
    <div class="allButtons">
      <button class="play" @click="start">
        <b>{{ startText }}</b>
      </button>
      <div class="tempo"><h1>{{ tempo }}</h1></div>
      <div class="vezes"><h1>{{ vezes }}</h1></div>
    </div>
    <div class="cardsArea">
      <v-container grid-list-xs>
        <v-layout row wrap>
          <div
            @click="flipCard(index)"
            class="carta"
            v-for="(carta, index) in deckReady"
            :key="(carta.title, index)"
            :class="isFlipped(carta)"
          >
            <div class="costas"></div>
            <div class="frente" :style="backImage(carta.media)"></div>
          </div>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>

import deck from "../../items/Deck/makeDeck.js";
import gameData from "../GameData.js";
import api from "../../Arch/api.js";

const game = gameData.memory;

export default {
  name: "Memory",

  components: {},

  props: {},

  data: () => ({
    deckReady: game.deckReady,
    tempo: game.time,
    vezes: game.turns,
    iniciou: false,
  }),

  methods: {
    contador(cc) {
      if (cc === "resetar") {
        clearInterval(this.timer);
        game.started = false;
        this.iniciou = false;

        return;
      }

      game.started = true;
      this.iniciou = true;

      this.timer = setInterval(() => {
        game.time += 1;

        this.tempo = game.time;
      }, 1000);
    },
    embaralhar() {
      if (game.started) {
        return;
      }

      function randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }

      const copy = [...deck()];
      const arrLength = copy.length;

      for (let contagem = 0; contagem < arrLength; contagem++) {
        game.deckReady.push(
          copy.splice(randomNumber(0, copy.length - 1), 1)[0]
        );
      }

      game.started = false;

      this.deckReady = game.deckReady;

      game.deckReady.forEach((e) => {
        e.showAll();
      });

      game.cartasNaMesa = true;
    },
    start() {
      if (game.comparar.length) {
        return;
      }

      if (game.started) {
        this.gameOver();
        return;
      }

      game.comparar = [];
      game.achados = 0;
      this.contador();
      this.iniciou = true;

      game.deckReady.forEach((e) => {
        e.hideAll();
      });
    },
    flipCard(idx) {
      if (game.deckReady[idx].flipped) {
        return;
      }

      if (game.comparar.length === 2) {
        return;
      }

      game.comparar.push({
        title: game.deckReady[idx].title,
        position: idx,
      });
      game.deckReady[idx].flipIt();

      if (game.comparar.length === 2) {
        game.turns += 1;
        this.vezes = game.turns;

        const carta1 = game.comparar[0];
        const carta2 = game.comparar[1];

        if (carta1.title === carta2.title) {
          game.deckReady[carta1.position].foundIt();
          game.deckReady[carta2.position].foundIt();

          game.comparar = [];

          game.achados += 1;

          if (game.achados === game.deckReady.length / 2) {

             api.postScore('Memory',game.time,game.turns)

            setTimeout(() => {
              game.comparar = [];
              game.achados = 0;
              this.gameOver();
            }, 2000);

            return;
          }

          return;
        }

        setTimeout(() => {
          game.deckReady[carta1.position].flipIt();
          game.deckReady[carta2.position].flipIt();

          game.comparar = [];
        }, 1000);
      }
    },
    gameOver() {
      this.contador("resetar");
      game.turns = 0;
      this.vezes = 0;
      game.time = 0;
      this.tempo = 0;
      game.started = false;
      this.iniciou = false;
      game.deckReady = [];
      this.deckReady = [];
      this.embaralhar();
    },
    backImage(cartaImg) {
      return `background-image:url(${cartaImg})`;
    },
    isFlipped(carta) {
      return carta.flipped
        ? "virado" + " " + carta.title
        : "escondida" + " " + carta.title;
    },
  },

  computed: {
    startText() {
      return this.iniciou ? "Embaralhar" : "Começar";
    },
  },
  created() {
    clearInterval(gameData.mine.saveThis.timer);

    delete game.saveThis;
    game.saveThis = this;

    if (!game.cartasNaMesa) {
      this.embaralhar();

      return;
    }

    if (game.started) {
      this.contador();
    }
  },
};
</script>

<style>
@import "../../assets/styles/Memory.css";
</style>
