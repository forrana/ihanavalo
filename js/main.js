const numbersListRaw = [
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

const numbersListProcessed = numbersListRaw.map((element, index, array) => {
  element.totalTime = array[index+1] ? array[index+1].time  - element.time : 1251 - element.time;
  return element;
})

const EventHandling = {
  data() {
    return {
      currentTime: 0,
      isPaused: true,
      timeDelta: 5,
      numbersList: numbersListProcessed,
      activeElementIndex: 0
    }
  },
  methods: {
    setNumberTime(time) {
      this.$refs.audio.currentTime = time - this.timeDelta
    },
    play() {
      console.log(this.$refs.audio.currentTime)
      let audioElement = this.$refs.audio;
      audioElement.paused ? audioElement.play() : audioElement.pause();
      this.isPaused = audioElement.paused;
      audioElement.addEventListener('timeupdate', () => {
        this.currentTime = audioElement.currentTime.toFixed();
        this.activeElementIndex = this.numbersList.findIndex(({time, totalTime}) => this.currentTime >= time && this.currentTime < time+totalTime)
      });
    }
  }
}

Vue.createApp(EventHandling).mount('#app')
