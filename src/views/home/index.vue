<template>
  <div class="home-container">
    <!-- pc-pad layout -->
    <div class="display-pc-and-pad">
      <div class="main-content">
        <div class="summary-wrapper">
          <div class="img-wrapper">
            <img src="@/assets/images/img_phone.png">
          </div>
          <div class="text-wrapper">
            <div class="item">
              <h4>产品简介</h4>
              <p>
                TJKey是一款提供区块链数字资产安全存储方案的硬件设备，目前支持BTC、ETH、Filecoin等主流数字货币资产和全部的ERC20标准代币，未来将通过升级支持更多的数字资产。通过将私钥等钱包信息存储在不联网的TJKey硬件钱包中，彻底杜绝黑客盗取私钥的可能性。
              </p>
            </div>

            <div class="item">
              <h4>产品构成</h4>
              <p>
                TJKey硬件钱包需要结合配套的TJWallet钱包APP使用；其中钱包APP负责展示用户操作交互界面，硬件钱包负责进行签名授权交易，两者之间只通过USB连接方式进行数据传输，交易更加安全可靠。
              </p>
            </div>
          </div>
        </div>

        <div class="service-wrapper">
          <h4>专业可信赖的数字资产管理服务</h4>
          <div class="item-wrapper">
            <div class="item">
              <div class="title">
                <h4>全新工艺</h4>
              </div>
              <ul>
                <li>生产工艺升级</li>
                <li>金属质感，精工细致</li>
                <li>防震抗潮数据更安全</li>
              </ul>
            </div>

            <div class="item">
              <div class="title">
                <h4>多重加密</h4>
              </div>
              <ul>
                <li>随机种子码</li>
                <li>软硬件加密</li>
                <li>安全可靠</li>
              </ul>
            </div>

            <div class="item">
              <div class="title">
                <h4>功能升级</h4>
              </div>
              <ul>
                <li>支持多链资产</li>
                <li>支持一键升级</li>
                <li>专属软件客户端</li>
              </ul>
            </div>

            <div class="item">
              <div class="title">
                <h4>7*24H客服支持</h4>
              </div>
              <ul>
                <li>严控产品质量</li>
                <li>专业客服指导教学</li>
                <li>让消费者无后顾之忧</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- phone layout -->
    <div class="display-phone">
      <div class="wallet-template">
        <div class="title-wrapper">
          <h3>
            {{ $t('home.wallet_title') }}
          </h3>
          <h5>
            {{ $t('home.wallet_description') }}
          </h5>
        </div>

        <div class="description">
          <img src="@/assets/images/img_wallet_logo.png" alt="">

          <template v-if="$i18n.locale == 'zh-CN'">
            <img src="@/assets/images/img_wallet_sample.png" alt="">
          </template>
          <template v-else>
            <img src="@/assets/images/img_wallet_sample_en.png" alt="">
          </template>

          <div class="text-wrapper">
            <div class="items-wrapper">
              <div class="item">
                <img src="@/assets/images/img_wallet_wallet_icon.png" alt="">
                <span>
                  {{ $t('home.wallet_item_app') }}
                </span>
              </div>
              <span>
                +
              </span>
              <div class="item">
                <img src="@/assets/images/img_wallet_hardward_icon.png" alt="">
                <span>
                  {{ $t('home.wallet_item_hardware') }}
                </span>
              </div>
              <span>
                +
              </span>
              <div class="item">
                <img src="@/assets/images/img_wallet_box_icon.png" alt="">
                <span>
                  {{ $t('home.wallet_item_box') }}
                </span>
              </div>
            </div>

            <!-- <el-button type="primary" @click="onClickWalletMore()">
              {{ $t('home.wallet_detail') }}
            </el-button> -->

            <div class="download-wrapper">
              <span @click="onClickDownload()">
                {{ $t('home.download_apk') }}
              </span>
              <img src="@/assets/images/img_wallet_qrcode_icon.png" alt="" @click="onClickOpenQrcode()">
            </div>
          </div>
        </div>
      </div>
      <div class="page-footer">
        <div class="copy-right">
          Copyright© 2018-2020 DappOnline
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="qrcodeDialogVisible"
      :show-close="false"
      :close-on-click-modal="true"
      class="wallet-qrcode-dialog">

      <div class="content-wrapper" @click="onClickWhiteSpace()">
        <img src="@/assets/images/img_wallet_qrcode_expend.png" alt="">
        <h4>
          {{ $t('home.long_press_to_save') }}
        </h4>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="openBrowserTipsVisible"
      :show-close="false"
      :close-on-click-modal="true"
      class="open-browser-tips-dialog">

      <div class="content-wrapper" @click="onClickWhiteSpace()">
        <img src="@/assets/images/img_open_in_browser.png" alt="">
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { formatNumber, parseTime } from '@/utils'
// import * as api from '@/api/common'

export default {
  name: 'Home',

  components: {},
  data() {
    return {
      qrcodeDialogVisible: false,
      openBrowserTipsVisible: false
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  watch: {},

  created() {

  },

  mounted() {

  },

  methods: {
    formatNumber,
    parseTime,

    onClickDownload() {
      const userAgent = window.navigator.userAgent.toLowerCase()
      if (userAgent.indexOf('micromessenger') > -1) {
        this.openBrowserTipsVisible = true
      } else {
        axios.request('https://api.tjwallet.net/v2/apkversion/lastest').then(response => {
          // window.open(response.url, '_blank')
          const src = response.url
          const form = document.createElement('form')
          form.action = src
          document.getElementsByTagName('body')[0].appendChild(form)
          form.submit()
        })
      }
    },

    onClickOpenQrcode() {
      this.qrcodeDialogVisible = true
    },

    onClickWhiteSpace() {
      this.openBrowserTipsVisible = false
      this.qrcodeDialogVisible = false
    }
  }
}

</script>

<style lang="scss">

</style>
