<template>
  <div class="block-detail-container">
    <div class="display-pc-and-pad">
      <div class="basic-info">
        <div class="main-content">
          <div class="title">
            {{ $t('block_detail.title') }}
          </div>
          <div class="content-wrapper">
            <div class="hash">
              <span>
                {{ $t('block_detail.hash') }}
              </span>
              <span>
                {{ blockDetailData.cid }}
              </span>
            </div>

            <div class="block-height">
              <span>
                {{ $t('block_detail.block_height') }}
              </span>
              <span class="cursor primary-color" @click="navigate('block-height',blockDetailData.block_header.height)">
                {{ blockDetailData.block_header ? blockDetailData.block_header.height : '' }}
              </span>
            </div>

            <div class="time">
              <span>
                {{ $t('block_detail.time') }}
              </span>
              <span>
                {{ blockDetailData.block_header ? formatHistoryTime(new Date().getTime() - blockDetailData.block_header.timestamp * 1000) : '' }}
              </span>
              <span>
                {{ blockDetailData.block_header ? parseTime(blockDetailData.block_header.timestamp * 1000) : '' }}
              </span>
            </div>

            <div class="block-size">
              <span>
                {{ $t('block_detail.block_size') }}
              </span>
              <span>
                {{ formatFileSize(blockDetailData.size) }}
              </span>
            </div>

            <div class="message-count">
              <span>
                {{ $t('block_detail.message_count') }}
              </span>
              <span>
                {{ blockDetailData.msg_cids ? blockDetailData.msg_cids.length : '' }}
              </span>
            </div>

            <div class="miner">
              <span>
                {{ $t('block_detail.miner') }}
              </span>
              <span class="cursor primary-color" @click="navigate('account-detail',blockDetailData.block_header.miner)">
                {{ blockDetailData.block_header ? blockDetailData.block_header.miner : '' }}
              </span>
            </div>

            <div class="reward">
              <span>
                {{ $t('block_detail.reward') }}
              </span>
              <span>
                {{ blockDetailData.reward ? blockDetailData.reward : '' }}
              </span>
            </div>

            <div class="parent-hash">
              <span>
                {{ $t('block_detail.parent_hash') }}
              </span>
              <div v-if="blockDetailData.block_header && blockDetailData.block_header.parent" class="hash-list">
                <span v-for="(item, index) in blockDetailData.block_header.parent" :key="index">
                  {{ item }}
                </span>
              </div>

            </div>

            <div class="parent-weight">
              <span>
                {{ $t('block_detail.parent_weight') }}
              </span>
              <span>
                {{ blockDetailData.block_header ? blockDetailData.block_header.parent_weight : '' }}
              </span>
            </div>

            <div class="ticket">
              <span>
                {{ $t('block_detail.ticket') }}
              </span>
              <span>
                {{ blockDetailData.block_header ? blockDetailData.block_header.tickets : '' }}
              </span>
            </div>

            <div class="state-root">
              <span>
                {{ $t('block_detail.state_root') }}
              </span>
              <span>
                {{ blockDetailData.block_header ? blockDetailData.block_header.parent_state_root : '' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="message-wrapper">
        <div class="main-content">
          <div class="title-wrapper">
            <div class="text-wrapper">
              <span>{{ $t('block_detail.message.title') }}</span>
              <span>{{ $t('block_detail.message.total', [blockMessageTotal]) }}</span>
            </div>
            <el-select v-model="selectedMessageMethod" placeholder="" @change="fetchBlockMessage(0)">
              <el-option
                v-for="item in messageMethodData"
                :key="item.code"
                :label="item.message"
                :value="item.value"/>
            </el-select>
          </div>
          <el-table :data="blockMessageList" border stripe>
            <!-- 消息哈希 -->
            <el-table-column
              :label="$t('block_detail.message.hash')"
              :show-overflow-tooltip="true"
              :min-width="140"
              class-name="hash-column">
              <template slot-scope="scope">
                <span :title="scope.row.cid" class="cursor" @click="navigate('message-detail',scope.row.cid)">{{ getAddrFormat(scope.row.cid,6) }}</span>
              </template>
            </el-table-column>

            <!-- 区块高度 -->
            <el-table-column
              :label="$t('block_detail.message.height')"
              :min-width="140"
              class-name="block-height-column">
              <template slot-scope="scope">
                <span class="cursor" @click="navigate('block-height',scope.row.height)">{{ scope.row.height }}</span>
              </template>
            </el-table-column>

            <!-- 时间 -->
            <el-table-column
              :label="$t('block_detail.message.time')"
              :show-overflow-tooltip="true"
              :min-width="140">
              <template slot-scope="scope">
                {{ formatHistoryTime(new Date().getTime() - scope.row.msgcreate * 1000) }}
              </template>
            </el-table-column>

            <!-- 发送地址 -->
            <el-table-column
              :label="$t('block_detail.message.sender')"
              :show-overflow-tooltip="true"
              :min-width="140"
              class-name="sender-column">
              <template slot-scope="scope">
                <span :title="scope.row.msg.from" class="cursor" @click="navigate('account-detail',scope.row.msg.from)">{{ getAddrFormat(scope.row.msg.from,6) }}</span>
              </template>
            </el-table-column>

            <!-- 接收地址 -->
            <el-table-column
              :label="$t('block_detail.message.receiver')"
              :show-overflow-tooltip="true"
              :min-width="140"
              class="receiver-column">
              <template slot-scope="scope">
                <span :title="scope.row.msg.to" class="cursor" @click="navigate('account-detail',scope.row.msg.to)">{{ scope.row.msg.to.length > 12 ? getAddrFormat(scope.row.msg.to,6) : scope.row.msg.to }}</span>
              </template>
            </el-table-column>

            <!-- 数值 -->
            <el-table-column
              :label="$t('block_detail.message.value')"
              :show-overflow-tooltip="true"
              :min-width="140">
              <template slot-scope="scope">
                {{ parseFloat(scope.row.msg.value).toFixed(4) + ' FIL' }}
              </template>
            </el-table-column>

            <!-- 状态 -->
            <el-table-column
              :label="$t('block_detail.message.status')"
              :min-width="140">
              <template slot-scope="scope">
                {{ scope.row.exit_code == 0 ? $t('app_constant.status.success') : $t('app_constant.status.fail') }}
              </template>
            </el-table-column>

            <!-- 类型 -->
            <el-table-column
              :label="$t('block_detail.message.type')"
              :show-overflow-tooltip="true"
              :min-width="140">
              <template slot-scope="scope">
                {{ getMessageMethodByCode(scope.row.msg.method) }}
              </template>
            </el-table-column>
          </el-table>
          <div class="page-container">
            <div class="left-wrapper">
              <span>{{ $t('common.show') }}</span>
              <span>
                <el-select v-model="messagePageSize" :placeholder="$t('common.selected')" size="mini" @change="fetchBlockMessage(messagePageIndex)">
                  <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </span>
              <span>{{ $t('common.records') }}</span>
            </div>
            <div class="page-wrapper">
              <span :class="messagePageIndex > 1 ? 'cursor' : 'gray' " class="space" @click="fetchBlockMessage(0)">{{ $t('common.firstPage') }}</span>
              <span :class="messagePageIndex > 1 ? 'cursor' : 'gray' " class="space symbol" @click="fetchBlockMessage(messagePageIndex-1)"> &lt; </span>
              <span>{{ messagePageIndex + 1 }}</span>/<span class="space">{{ messagePageTotal+1 }}</span>
              <span :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' " class="space symbol" @click="fetchBlockMessage(messagePageIndex+1)"> &gt; </span>
              <span :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' " @click="fetchBlockMessage(messagePageTotal)">{{ $t('common.lastPage') }}</span>
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
import { formatNumber, parseTime, formatHistoryTime, formatFileSize } from '@/utils'
import * as api from '@/api/common'
import * as helper from '@/utils/helper'
import { getAddrFormat } from '@/utils/helper'

export default {
  name: 'BlockDetail',

  data() {
    return {
      blockId: this.$route.params.id,
      blockDetailData: {},
      blockMessageList: [],
      blockMessageTotal: 0,
      messageMethodData: [],
      selectedMessageMethod: '',

      showNumbers: [{
        value: 10,
        label: '10'
      }, {
        value: 20,
        label: '20'
      }, {
        value: 50,
        label: '50'
      }, {
        value: 100,
        label: '100'
      }],

      messagePageIndex: 0,
      messagePageSize: 10,
      messageListData: [],
      messageTotal: 0,
      messagePageTotal: 1
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

  watch: {
    language: function(value) {
      this.fillMessageMethod()
    }
  },

  created() {
    this.fillMessageMethod()

    this.fetchBlockMessage()
    this.fetchBlockDetailData()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,
    formatFileSize,
    getAddrFormat,

    navigate(url, selector) {
      helper.navigate(this, url, selector)
    },

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

    // 模拟数据 # 区块消息 # =>messages/BlockMessages {method: "", begindex: "0", count: "25", block_cid: "bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i"}
    fetchBlockMessage(page = 0) {
      var that = this
      if (page < 0 || (that.messagePageTotal >= 0 && page > that.messagePageTotal)) {
        return
      }

      that.messagePageIndex = page

      that.isLoading = true
      api.fetchBlockMessages(that.selectedMessageMethod, page * that.messagePageSize, that.messagePageSize, that.blockId).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          that.blockMessageList = data.msgs
          that.blockMessageTotal = data.total
          that.messagePageTotal = Math.ceil(data.total / that.messagePageSize) - 1
          that.messagePageTotal = that.messagePageTotal < 1 ? 0 : that.messagePageTotal
        }
      }).catch(error => {
        console.error(error)
      })
    },

    // 模拟数据 # 区块详情 # => tipset/BlockByCid {cid: "bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i"}
    fetchBlockDetailData() {
      var that = this
      that.isLoading = true
      api.fetchBlockByCid(that.blockId).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          this.blockDetailData = data.blocks && data.blocks.length > 0 ? data.blocks[0] : {}
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
