<template>
  <div>
    <button @click="lu">点击</button>
    <button @click="stop">停止</button>
  </div>
</template>

<script>
export default {
  methods: {
    lu () {
      const recorderManager = wx.getRecorderManager()

      recorderManager.onStart(() => {
        console.log('recorder start')
      })
      recorderManager.onPause(() => {
        console.log('recorder pause')
      })
      recorderManager.onStop((res) => {
        console.log('recorder stop', res)
        const tempPath = res.tempFilePath
        this.innerAudioContext = wx.createInnerAudioContext()
        this.innerAudioContext.onError((res) => {
        // 播放音频失败的回调
        })
        this.innerAudioContext.src = tempPath
        this.innerAudioContext.play()
      })
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })

      const options = {
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'aac',
        frameSize: 50
      }

      recorderManager.start(options)
    }
  }
}
</script>

<style scoped>

</style>
