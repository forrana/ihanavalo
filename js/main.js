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
    participanst: "Ka, Ma, Os",
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

function secondsToMMSS(seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}

const EventHandling = {
  data() {
    return {
      currentTime: 0,
      isPaused: true,
      isRepeatMode: false,
      timeDelta: 5,
      activeElementIndex: 0,
      isManualChangeInProcess: false,
      selectedForRepeat: null,
    }
  },
  watch: {
    activeElementIndex(newIndex, oldIndex) {
      if(this.isManualChangeInProcess) {
        this.isManualChangeInProcess = false;
        return;
      }

      if(this.isRepeatMode) {
        let selectedIndex = this.numbersList.findIndex(({name}) => this.selectedForRepeat.name == name)
        if(newIndex != selectedIndex) {
          this.setNumberTime(this.selectedForRepeat);
        }
      }
    }
  },
  methods: {
    setNumberTime(number, isManual) {
      if(isManual) this.selectedForRepeat = number;
      this.$refs.audio.currentTime = number.time;
      this.isManualChangeInProcess = isManual;
    },
    play() {
      let audioElement = this.$refs.audio;
      audioElement.paused ? audioElement.play() : audioElement.pause();
      this.isPaused = audioElement.paused;
      audioElement.addEventListener('timeupdate', () => {
        this.currentTime = audioElement.currentTime.toFixed();
        this.activeElementIndex = this.numbersList.findIndex(({time, totalTime}) => this.currentTime >= time && this.currentTime < time+totalTime+this.timeDelta)
      });
    },
    toggleRepeat() {
      this.isRepeatMode = !this.isRepeatMode
    },
    totalTime(number) {
      let totalTime = number.totalTime;
      return secondsToMMSS(totalTime);
    }
  },
  computed: {
    numbersList() {
      return numbersListProcessed.map((element) => {
        element.time -= this.timeDelta;
        return element;
      })
    },
    timeLeft() {
      let startTime = this.numbersList[this.activeElementIndex].time + this.timeDelta;
      let totalTime = this.numbersList[this.activeElementIndex].totalTime;
      let timeLeft = startTime + totalTime - this.currentTime;
      return secondsToMMSS(timeLeft)
    }
  }
}

Vue.createApp(EventHandling).mount('#app')
