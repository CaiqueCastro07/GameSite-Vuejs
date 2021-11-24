export default {
    name: 'Mine',
    path: '/minegame',
    meta: {
      icon: 'videogame_asset',
      title: 'Memory Game',
    },
    component: () => import('./Mine.vue'), // será isso?
  };
  