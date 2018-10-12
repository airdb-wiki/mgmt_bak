<template>
  <div>
    <button @click="lu">开始</button>
    <button @click="stop">停止</button>
    <button @click="play">播放</button>
  </div>
</template>

<script>
const recorderManager = wx.getRecorderManager()

export default {
  data () {
    return {
      savedFilePath: ''
    }
  },
  methods: {
    lu () {
      const options = {
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'aac',
        frameSize: 50
      }

      recorderManager.start(options)
    },
    stop () {
      recorderManager.onStop((res) => {
        console.log('recorder stop', res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: res => {
            console.log(res)
            this.savedFilePath = res.savedFilePath
            wx.setStorageSync('voice', res.savedFilePath)
          }
        })
      })

      recorderManager.stop()
    },
    play () {
      if (this.savedFilePath === '') {
        var a = wx.getStorageSync('voice')
        console.log(a)
      }
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.onError((res) => {
        console.log('播放失败')
      })
      this.innerAudioContext.src = this.savedFilePath
      this.innerAudioContext.play()
    }
  }
}
</script>

<style scoped>

</style>
