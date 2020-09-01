<template>
  <div class="doc_detail">
    <wx-web-view :src="url"></wx-web-view>
  </div>
</template>

<script>
import Vue from 'vue'

const docUrl = {
  docs: 'https://docs.studygolang.com',
  docscn: 'http://docscn.studygolang.com',
  pkgdoc: 'https://studygolang.com/pkgdoc',
  tour: 'http://tour.studygolang.com',
}

export default Vue.extend({
  name: 'DocDetail',
  data() {
    return {
      id: 'docs',
      url: 'https://docs.studygolang.com',
    }
  },
  created() {
    this.id = this.$route.params.id
    this.url = docUrl[this.id]
    this.openShare(this.id)
  },
  methods: {
    openShare(id) {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline'],
      })
      window.onShareAppMessage = (res) => {
        console.log(res)
        return {
          path: `/doc/detail/${id}`,
        }
      }
      window.onShareTimeline = (res) => {
        console.log(res)
        return {
          path: `/doc/detail/${id}`,
        }
      }
    }
  }
})
</script>
<style lang="less">
.doc_detail {
  background: #fff;
}
</style>
