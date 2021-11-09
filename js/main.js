const numbersListRaw = [
  {
    name: "Alku? + isolaatio",
    participanst: "Al, Ja, To, Ma",
    time: 0
  },
  {
    name: "Snake",
    participanst: "Ka, Ma, El",
    time: 100
  },
  {
    name: "Biisn tempo muuttuu",
    participanst: "Ka, Ma, El",
    time: 160
  },
  {
    name: "Comet + Rope dart",
    participanst: "Al, Ka",
    time: 213
  },
  {
    name: "Sapeli",
    participanst: "Ja, Ma, To, Ka",
    time: 285
  },
  {
    name: "Poi/ Kontaktikeppi",
    participanst: "AL",
    time: 340
  },
  {
    name: "Hyppisduo",
    participanst: "Ka, Ma",
    time: 395
  },
  {
    name: "Viikate",
    participanst: "To?",
    time: 495
  },
  {
    name: "Fanit",
    participanst: "Ka, Ma, El",
    time: 570
  },
  {
    name: "Dragon",
    participanst: "Al",
    time: 670
  },
  {
    name: "Vanne",
    participanst: "Ka, Ma, El",
    time: 735
  },
  {
    name: "Tuplakeppi + lyco",
    participanst: "Ja, To, Ma",
    time: 810
  },
  {
    name: "Loppumusa",
    participanst: "Kaikki",
    time: 930
  },
  {
    name: "Kummarrusbiisi",
    participanst: "Kaikki",
    time: 997
  }
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
      isLocked: false,
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
    toggleLock() {
      this.isLocked = !this.isLocked
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
