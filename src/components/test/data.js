const data = {
  cards: {
    "red-1": { id: "red-1", title: "Red One" },
    "blue-3": { id: "blue-3", title: "Blue Three" },
    wild: { id: "wild", title: "Wild" },
    "red-reverse": { id: "red-reverse", title: "Red Reverse" },
    "swap-hands": { id: "swap-hands", title: "Swap Hands" },
    "plus-4": { id: "plus-4", title: "Plus Four" }
  },
  playableRegions: {
    "playable-region-1": {
      id: "playable-region-1",
      title: "Player 1",
      cards: ["red-1", "blue-3", "wild"]
    },
    "playable-region-2": {
      id: "playable-region-2",
      title: "Player 2",
      cards: ["red-reverse", "swap-hands", "plus-4"]
    }
  },
  playableRegionsOrder: ["playable-region-1", "playable-region-2"]
};

export default data;
