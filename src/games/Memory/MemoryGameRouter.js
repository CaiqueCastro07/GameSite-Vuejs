export default {
  name: 'Memory',
  path: '/memorygame',
  meta: {
    icon: 'videogame_asset',
    title: 'Memory Game',
  },
  component: () => import('./Memory.vue'), // será isso?
};
