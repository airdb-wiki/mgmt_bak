<template>
  <div>
    <button @click="lu">{{btnContent}}</button>
    <div v-for="(talk, index) in talks" :key="talk.id" @click="play(index)" class="myTalk">{{talk}}</div>
  </div>
</template>

<script>
const recorderManager = wx.getRecorderManager()

export default {
  data () {
    return {
      talksUrl: [],
      btnContent: '开始',
      start: true,
      hidden: true,
      startTime: Number,
      myDuration: Number,
      talks: []
    }
  },
  methods: {
    lu () {
      if (this.start === true) {
        const options = {
          duration: 10000,
          sampleRate: 44100,
          numberOfChannels: 1,
          encodeBitRate: 192000,
          format: 'aac',
          frameSize: 50
        }

        var startDate = new Date()
        this.startTime = startDate.getSeconds()
        this.start = false
        this.btnContent = '结束'

        recorderManager.start(options)
      } else {
        recorderManager.onStop((res) => {
          console.log('recorder stop', res)

          // 储存音频的信息
          var endDate = new Date()
          this.myDuration = endDate.getSeconds() - this.startTime
          console.log('duration: ', this.myDuration)
          this.talks = this.talks.concat('（﹙·' + this.myDuration)
          this.talksUrl = this.talksUrl.concat(res.tempFilePath)
          console.log(this.tempPath)

          // 设置button样式
          this.start = true
          this.btnContent = '开始'
        })

        recorderManager.stop()
      }
    },
    play (index) {
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.onError((res) => {
        console.log('播放失败')
      })
      this.innerAudioContext.src = this.talksUrl[index]
      this.innerAudioContext.play()
    }
  }
}
</script>

<style scoped>
.myTalk{
  padding: 7px 10px;
  font-weight: bold;
  background-color: aquamarine;
  border-radius: 7px;
  margin: 5px 10px;
  width: 100px;
}
</style>
