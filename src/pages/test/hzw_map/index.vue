<template>
  <div class='g_con'>

    <div class="navigation">
      <div class="btn">
        <navigator open-type="navigateBack">
          <img src="/static/images/home/back.png" class="back">
        </navigator>

        <div style="border-left: 1px solid #e2e2e2;margin: 2px 10px 0 4px;height: 18px;"></div>

        <navigator open-type="reLaunch" url="/pages/home/main">
          <img src="/static/images/home/home.png" class="home">
        </navigator>
      </div>

      <div v-if="!showTitle" class="title">详情</div>
      <div v-else class="title">{{item.Title}}</div>
    </div>
    <!-- navigation -->

    <div class='topExpress'>

      <div class='topExpress-right'>
        <div class='topExpress-right-top'>宝贝回家小程序</div>
        <div class='topExpress-right-middle'>项目进度</div>
        <div class='topExpress-right-bottom'></div>
      </div>

    </div>

    <!-- 时间轴 -->
    <div class='expressRecord'>


      <!-- Target状态 -->
      <div class='expressRecord-getAddress'>
        <div class='expressRecord-top'>
          <div class='getAddress-icon'>
            Tar
          </div>
          <div class='getAddress-text' @click="navToTarget">小程序Target</div>
        </div>

        <!-- 顶部时间轴线 -->
        <div class='online-top-close'></div>
      </div>




      <!-- 单个时间轴结点 -->
      <div class='expressRecord-single-close' v-for="(item, index) in items" :key="index">
        <div class='expressRecord-single-noReach-online-top-close'>
          <div class='online-top-close'></div>
          <div class="dot">
            <img :style="[item.day.length == 4 ? 'width: 25px;height: 25px;margin-left: 75rpx;' : '']"
            :src="item.day.length == 2 ? images.now : (item.day.length==5 ? images.history: images.year)">
          </div>
          <div class='online-bottom'></div>
        </div>

        <div class='expressRecord-text'>
          <div class='expressRecord-status'></div>
          <div class='expressRecord-status-address' @click="showDetail(index)"
            :style="[item.day.length == 4 ? 'color: cyan;font-weight: 800;' : '']">
            {{item.content}}
          </div>
        </div>

        <div class='expressRecord-date' v-if="item.day.length == 4">
          <div class='expressRecord-date-time' style="color: cyan;">
            {{item.day}}
          </div>
        </div>
        <div class='expressRecord-date' v-else>
          <div class='expressRecord-date-time' :style="[index == 1 ? 'margin-left: 6px;' : '']">
            {{item.day}}
          </div>
        </div>
      </div>

    </div>

    <div class="bg" :hidden="!show" @click="hiddenDetail()">
      <div class="card">
        <div class="time">{{detailShowed.time}}</div>
        <div>
          <div class="title1">
            <div class="title1_container">
              <span><img src="/static/images/home/parter.png"></span>
              <span class="text">贡献者</span>
            </div>
            <div class="list">
              <ul>
                <li v-for="(contributer, index) in detailShowed.contributers" :key="index">
                  {{contributer}}
                </li>
              </ul>
            </div>
          </div>
          <div class="title1">
            <div class="title1_container">
              <span><img src="/static/images/home/achieve.png"></span>
              <span class="text">Achievement</span>
            </div>
            <div class="list">
              <p>{{detailShowed.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        day: '2018',
        content: '———————————————————'
      }, {
        content: '正在优化当前功能',
        day: '今天'
      }, {
        content: '实现 BBS 数据格式化, 关联图片抓取',
        day: '11-20'
      }, {
        content: '新加入一位',
        day: '11-05'
      }, {
        content: '第一期 首版本上线',
        day: '10-28'
      }, {
        content: '正式启动项目',
        day: '10-01'
      }
      ],
      images: {
        'now': '/static/images/home/now.png',
        'history': '/static/images/home/history.png',
        'year': '/static/images/home/year.png'
      },
      detailShowed: {
        time: '2018-7-12',
        content: '正在努力实现小程序插件的使用，欢迎大家加入实现xxx功能件的使用，欢迎大家加入实现xxx功能',
        contributers: [
          'IWTF',
          'Dean'
        ]
      },
      show: false
    }
  },
  methods: {
    navToTarget () {
      wx.navigateTo({ url: '/pages/hr/main' })
    },
    showDetail (index) {
      if (this.items[index].day.length === 4) {
        return
      }

      var year
      for (var i = index; i >= 0; i--) {
        if (this.items[i].day.length === 4) {
          year = this.items[i].day
        }
      }

      if (this.items[index].day.length === 5) {
        this.detailShowed.time = year + '-' + this.items[index].day
      }
      this.detailShowed.content = this.items[index].content

      this.show = true
    },
    hiddenDetail () {
      this.show = false
    }
  }
}
</script>


<style scoped lang='less'>
  @import 'index';
</style>