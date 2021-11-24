export default {
  name: "Leaderboard",
  path: "/leaderboard",
  meta: {
    icon: "videogame_asset",
    title: "Memory Game",
  },
  component: () => import("./Leaderboard.vue"), // será isso?
};
