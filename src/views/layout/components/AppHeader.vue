<template>
  <div :style="getHeaderRootStyle()" :class="withHeader ? '' : 'hidden'" class="app-header">
    <div class="main-content">
      <div class="logo-wrapper" @click="onClickLogo()">
        <img src="@/assets/images/img_logo.png" alt="">
        <span>{{ $t('header.title') }}</span>
      </div>

      <div class="feature-wrapper">
        <div class="navigation">
          <span :class="navIndex == 0 ? 'selected' : ''" @click="onClickNavigationItem(0)">{{ $t('header.home') }}</span>
          <span :class="navIndex == 1 ? 'selected' : ''" @click="onClickNavigationItem(1)">{{ $t('header.blockchain') }}</span>
          <span :class="navIndex == 2 ? 'selected' : ''" @click="onClickNavigationItem(2)">{{ $t('header.data') }}</span>
          <span :class="navIndex == 3 ? 'selected' : ''" @click="onClickNavigationItem(3)">{{ $t('header.map') }}</span>

          <div class="search">
            <el-input v-model="searchKeyword" :placeholder="$t('header.input_hint')" @keyup.enter.native="onClickSearch()">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="onClickSearch()"></i>
            </el-input>
          </div>
        </div>

        <div class="language-wrappe">
          <div :class="language == 'zh' ? 'selected' : ''" class="chinese" @click="onClickToggleLanguage('zh')">
            {{ $t('header.lang_zh') }}
          </div>
          <div :class="language == 'en' ? 'selected' : ''" class="english" @click="onClickToggleLanguage('en')">
            {{ $t('header.lang_en') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  props: {

  },

  data() {
    return {
      navIndex: 0,
      searchKeyword: ''
    }
  },

  computed: {
    ...mapGetters([
      'language',
      'immersive',
      'color',
      'opacity',
      'withHeader'
    ])
  },

  watch: {
  },

  created() {
    this.$store.dispatch('SetImmersive', false).then(response => {})
    this.$store.dispatch('SetColor', '#fff').then(response => {})
    this.$store.dispatch('SetOpacity', 0).then(response => {})
  },

  methods: {
    onClickToggleLanguage(language = 'en') {
      this.$i18n.locale = language
      this.$store.dispatch('ToggleLanguage', language)
    },

    onClickNavigationItem(navIndex) {
      this.navIndex = navIndex
      switch (navIndex) {
        case 0: // home
          this.$router.push('/')
          break
        case 1: // blockchain
          this.$router.push('/list/block')
          break
        case 2: // data
          this.$router.push('/data/miner')
          break
        case 3: // peer map
          this.$router.push('/peer-map')
          break
      }
    },

    onClickSearch() {
      this.$store.dispatch('SetKeyword', this.searchKeyword)
    },

    backTop() {
      const back = setInterval(() => {
        if (document.body.scrollTop || document.documentElement.scrollTop) {
          document.body.scrollTop -= 50
          document.documentElement.scrollTop -= 50
        } else {
          clearInterval(back)
        }
      })
    },

    onClickLogo() {
      const path = window.location.href
      if (path.endsWith('/') || path.indexOf('/home') !== -1) {
        this.backTop()
      } else {
        this.$router.push('/')
      }
    },

    transferHexColor(color = '#333', opacity = 1.0) {
      color = color.toLowerCase()
      const pattern = /^#([0-9|a-f]{3}|[0-9|a-f]{6})$/
      if (color && pattern.test(color)) {
        if (color.length === 4) {
          color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
        }
        const temp = []
        for (let i = 1; i < 7; i += 2) {
          temp.push(parseInt('0x' + color.slice(i, i + 2)))
        }
        return 'rgba(' + temp.join(',') + ',' + opacity + ')'
      }
      return color
    },

    getHeaderRootStyle() {
      let result = ''
      if (this.immersive) {
        result = 'background: ' + this.transferHexColor(this.color, this.opacity)
      } else {
        result = 'background: ' + this.color
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
