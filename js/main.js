const EventHandling = {
  data() {
    return {
      currentTime: "00:00",
      timeDelta: 5,
      numbersList: [
        {
          name: "Kalastus",
          participanst: "all",
          time: 0
        },
        {
          name: "Snake",
          participanst: "Ka, Ma, Os, To",
          time: 95
        },
        {
          name: "Keppi, Hyppis",
          participanst: "Ka, Al",
          time: 195
        },
        {
          name: "Magneetti-Isolaatio",
          participanst: "Os, To, Ma",
          time: 260
        },
        {
          name: "Poi",
          participanst: "Ka, Al",
          time: 400
        },
        {
          name: "Vanteet",
          participanst: "Ka, Ma",
          time: 480
        },
        {
          name: "Miekka",
          participanst: "Ka, Al",
          time: 540
        },
        {
          name: "Dragon + Fanit",
          participanst: "Al, Ma, To",
          time: 610
        },
        {
          name: "Tupla",
          participanst: "To, Os, Ma",
          time: 685
        },
        {
          name: "Loppubileet",
          participanst: "Kaikki",
          time: 795
        },
      ]
    }
  },
  methods: {
    setNumberTime(time) {
      this.$refs.audio.currentTime = time - this.timeDelta
    }
  }
}

Vue.createApp(EventHandling).mount('#app')
