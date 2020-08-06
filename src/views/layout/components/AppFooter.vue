<template>
  <div :class="withFooter ? '' : 'hidden'" class="app-footer">
    <div class="main-content">
      <div class="team">
        <div class="logo-wrapper">
          <span>{{ $t('footer.title') }}</span>
        </div>
        <span>
          {{ $t('footer.copyright') }}
        </span>
        <span class="link" @click="onClickCaseNumber()">
          {{ $t('footer.case_number') }}
        </span>
        <span>
          {{ $t('footer.powered_by') }}
        </span>
      </div>

      <div class="project">
        <span>
          {{ $t('footer.project_description') }}
        </span>
        <span class="link" @click="onClickFilecoinOfficialWebsite()">
          {{ $t('footer.filecoin_official_website') }}
        </span>
        <span class="link" @click="onClickWallet()">
          {{ $t('footer.wallet') }}
        </span>
        <!-- <span class="link" @click="onClickFilecoinManual()">
          {{ $t('footer.filecoin_manual') }}
        </span> -->
        <span class="link" @click="onClickOfficialBrowser()">
          {{ $t('footer.official_browser') }}
        </span>
      </div>

      <div class="blockchain">
        <span>
          {{ $t('footer.blockchain') }}
        </span>
        <span class="link" @click="onClickViewBlock()">
          {{ $t('footer.block') }}
        </span>
        <span class="link" @click="onClickViewMessage()">
          {{ $t('footer.message') }}
        </span>
        <span class="link" @click="onClickViewAccount()">
          {{ $t('footer.account') }}
        </span>
      </div>

      <div style="display:none" class="data">
        <span>
          {{ $t('footer.data') }}
        </span>
        <span class="link" @click="onClickMinerData()">
          {{ $t('footer.miner_data') }}
        </span>
        <span class="link" @click="onClickCoinData()">
          {{ $t('footer.coin_data') }}
        </span>
      </div>

      <div class="partner">
        <span>
          {{ $t('footer.partner') }}
        </span>
        <span class="link" @click="onClickDapponline()">
          {{ $t('footer.dapponline') }}
        </span>
        <span class="link" @click="onClickGrandhelmsman()">
          {{ $t('footer.grandhelmsman') }}
        </span>
      </div>

      <div class="contact-us">
        <span>
          {{ $t('footer.contact_us') }}
        </span>
        <!-- <span>
          {{ $t('footer.help_email') }}
        </span> -->
        <span>
          {{ $t('footer.email_address') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  props: {

  },

  data() {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'immersive',
      'color',
      'opacity',
      'withFooter'
    ])
  },

  watch: {

  },

  created() {

  },

  methods: {
    onClickCaseNumber() {
      // 备案号
      window.open('http://www.beian.miit.gov.cn/', '_blank')
    },

    onClickFilecoinOfficialWebsite() {
      // Filecoin 官网
      window.open('https://filecoin.io/', '_blank')
    },

    onClickWallet() {
      // 钱包官网
      window.open('https://tjwallet.net/', '_blank')
    },

    onClickFilecoinManual() {
      // Filecoin 技术说明书
      window.open('https://filecoin-project.github.io/specs/', '_blank')
    },

    onClickOfficialBrowser() {
      // 官方浏览器
      window.open('https://stats.testnet.filecoin.io/d/z6FtI92Zz/chain?orgId=1&refresh=45s&from=now-30m&to=now&kiosk', '_blank')
    },

    onClickViewBlock() {
      // 区块列表
      this.$router.push('/list/block')
    },

    onClickViewMessage() {
      // 消息列表
      this.$router.push('/list/message')
    },

    onClickViewAccount() {
      // 账户列表
      this.$router.push('/list/account')
    },

    onClickMinerData() {
      // 矿工数据
      // this.$router.push('/data/miner')
    },

    onClickCoinData() {
      // 代币数据
      // this.$router.push('/data/token')
    },

    onClickDapponline() {
      // Dapponline
      window.open('https://dapponline.io', '_blank')
    },

    onClickGrandhelmsman() {
      // 正舵者
      window.open('http://www.grandhelmsman.com', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
