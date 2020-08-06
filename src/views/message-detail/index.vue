<template>
  <div class="message-detail-container">
    <div class="display-pc-and-pad">
      <div class="basic-info">
        <div class="main-content">
          <div class="title">
            {{ $t('message_detail.title') }}
          </div>
          <div class="content-wrapper">
            <div class="hash">
              <span>
                {{ $t('message_detail.message_hash') }}
              </span>
              <span>
                {{ messageDetailData.cid ? messageDetailData.cid : '' }}
              </span>
            </div>

            <div class="block-height">
              <span>
                {{ $t('message_detail.block_height') }}
              </span>
              <span>
                {{ messageDetailData.height ? messageDetailData.height : '' }} ({{ blockConfirmCount }} {{ $t("common.confirmations") }} )
              </span>
            </div>

            <div class="block">
              <span>
                {{ $t('message_detail.block') }}
              </span>
              <div v-if="messageDetailData.block_cids" class="block-list-wrapper">
                <span v-for="(item, index) in messageDetailData.block_cids" :key="index">
                  {{ item }}
                </span>
              </div>
            </div>

            <div class="time">
              <span>
                {{ $t('message_detail.time') }}
              </span>
              <span>
                {{ messageDetailData.msgcreate ? formatHistoryTime(new Date().getTime() - messageDetailData.msgcreate * 1000) : '' }}
              </span>
              <span>
                {{ messageDetailData.msgcreate ? parseTime(messageDetailData.msgcreate * 1000) : '' }}
              </span>
            </div>

            <div class="sender">
              <span>
                {{ $t('message_detail.sender') }}
              </span>
              <span>
                {{ messageDetailData.msg ? messageDetailData.msg.from : '' }}
              </span>
            </div>

            <div class="receiver">
              <span>
                {{ $t('message_detail.receiver') }}
              </span>
              <span>
                {{ messageDetailData.msg ? messageDetailData.msg.to : '' }}
              </span>
            </div>

            <div class="value">
              <span>
                {{ $t('message_detail.value') }}
              </span>
              <span>
                {{ messageDetailData.msg ? messageDetailData.msg.value : '' }}
              </span>
            </div>

            <div class="status">
              <span>
                {{ $t('message_detail.status') }}
              </span>
              <span>
                {{ messageDetailData.exit_code ? messageDetailData.exit_code == 0 ? $t('app_constant.status.success') : $t('app_constant.status.fail') : '' }}
              </span>
            </div>

            <div class="method">
              <span>
                {{ $t('message_detail.method') }}
              </span>
              <span>
                {{ messageDetailData.msg ? getMessageMethodByCode(messageDetailData.msg.method) : '' }}
              </span>
            </div>

            <div class="random">
              <span>
                {{ $t('message_detail.random') }}
              </span>
              <span>
                {{ messageDetailData.msg ? messageDetailData.msg.nonce : '' }}
              </span>
            </div>

            <div class="params">
              <span>
                {{ $t('message_detail.params') }}
              </span>
              <span>
                {{ messageDetailData.msg ? messageDetailData.msg.params : '' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="display-phone">

    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
import { mapGetters } from 'vuex'
import {
  formatNumber,
  parseTime,
  formatHistoryTime
} from '@/utils'
import * as api from '@/api/common'

export default {
  name: 'MessageDetail',

  data() {
    return {
      msgCid: this.$route.params.id,
      cid: '',
      messageDetailData: {},
      blockConfirmCount: 0
    }
  },

  computed: {
    ...mapGetters([
      'language',
      'keyword',
      'immersive',
      'color',
      'opacity'
    ])
  },

  created() {
    this.fillMessageMethod()

    this.fetchMessageDetailData()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,

    // 根据消息方法值查找消息方法名
    getMessageMethodByCode(code) {
      if (this.messageMethodData && this.messageMethodData.length > 0) {
        for (let index = 0; index < this.messageMethodData.length; index++) {
          const item = this.messageMethodData[index]
          if (item.code === parseInt(code)) {
            return item.message
          }
        }
      }
      return '-'
    },

    // 填充消息枚举
    fillMessageMethod() {
      this.messageMethodData = []
      this.messageMethodData.push({
        code: -1,
        message: this.$t('app_constant.message_method.method_all'),
        value: ''
      })
      this.messageMethodData.push({
        code: 0,
        message: this.$t('app_constant.message_method.method_0'),
        value: 'Transfer'
      })
      this.messageMethodData.push({
        code: 1,
        message: this.$t('app_constant.message_method.method_1'),
        value: 'Constructor'
      })
      this.messageMethodData.push({
        code: 2,
        message: this.$t('app_constant.message_method.method_2'),
        value: 'ControlAddresses'
      })
      this.messageMethodData.push({
        code: 4,
        message: this.$t('app_constant.message_method.method_4'),
        value: 'ChangePeerID'
      })
      this.messageMethodData.push({
        code: 5,
        message: this.$t('app_constant.message_method.method_5'),
        value: 'SubmitWindowedPoSt'
      })
      this.messageMethodData.push({
        code: 6,
        message: this.$t('app_constant.message_method.method_6'),
        value: 'PreCommitSector'
      })
      this.messageMethodData.push({
        code: 7,
        message: this.$t('app_constant.message_method.method_7'),
        value: 'ProveCommitSector'
      })
      this.messageMethodData.push({
        code: 14,
        message: this.$t('app_constant.message_method.method_14'),
        value: 'AddLockedFund'
      })
      this.messageMethodData.push({
        code: 16,
        message: this.$t('app_constant.message_method.method_16'),
        value: 'WithdrawBalance'
      })
      this.messageMethodData.push({
        code: 18,
        message: this.$t('app_constant.message_method.method_18'),
        value: 'ChangeMultiaddrs'
      })
    },

    fetchMessageDetailData() {
      var that = this
      that.isLoading = true
      api.fetchMessageDetails(that.msgCid).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          that.messageDetailData = data.msg
          that.cid = data.msg.block_cids[0]
          that.mockBlockConfirmCount()
        }
      }).catch(error => {
        console.error(error)
      })
    },

    mockBlockConfirmCount() {
      var that = this
      that.isLoading = true
      api.fetchBlockConfirmCount(that.cid).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          this.blockConfirmCount = data.count
        }
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
