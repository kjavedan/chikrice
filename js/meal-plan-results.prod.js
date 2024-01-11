const { createApp, ref } = Vue;

createApp({
  setup() {
    const list = ref([
      { id: 1, name: "Abby", sport: "basket" },
      { id: 2, name: "Brooke", sport: "foot" },
      { id: 3, name: "Courtenay", sport: "volley" },
      { id: 4, name: "David", sport: "rugby" },
    ]);

    return {
      list,
    };
  },
}).mount("#meal-plan-results-app");
