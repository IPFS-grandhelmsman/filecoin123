<template>
  <div class="account-detail-container">
    <div class="display-pc-and-pad">
      <div class="basic-info">
        <div class="main-content">
          <!-- 账户拥有者 -->
          <div v-if="flag == 'owner'" class="owner">
            <div class="title">
              {{ $t('account_detail.title') }}
            </div>
            <div class="content-wrapper">
              <!-- 地址 -->
              <div class="address">
                <span>
                  {{ $t('account_detail.address') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.address : '' }}
                </span>
              </div>

              <!-- 类型 -->
              <div class="type">
                <span>
                  {{ $t('account_detail.type') }}
                </span>
                <span>
                  {{ accountDetailData.data ? getAccountType(accountDetailData.data) : '' }}
                </span>
              </div>

              <!-- 余额 -->
              <div class="balance">
                <span>
                  {{ $t('account_detail.balance') }}
                </span>
                <span>
                  {{ accountDetailData.data ? parseFloat(accountDetailData.data.actor.Balance).toFixed(4) + ' FIL' : '' }}
                </span>
              </div>

              <!-- 代码 -->
              <div class="code">
                <span>
                  {{ $t('account_detail.code') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.actor.code : '' }}
                </span>
              </div>

              <!-- 随机数 -->
              <div class="random">
                <span>
                  {{ $t('account_detail.random') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.actor.nonce : '' }}
                </span>
              </div>

              <!-- 矿工列表 -->
              <div class="miner-list">
                <span>
                  {{ $t('account_detail.miner_list') }}
                </span>
                <div v-if="accountDetailData.work_list" class="miner-list-wrapper">
                  <span v-for="(item, index) in accountDetailData.work_list" :key="index">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 矿工账户 -->
          <div v-else-if="flag == 'miner'" class="miner">
            <div class="title">
              {{ $t('account_detail.title') }}
            </div>
            <div class="content-wrapper">
              <!-- 地址 -->
              <div class="address">
                <span>
                  {{ $t('account_detail.address') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.address : '' }}
                </span>
              </div>

              <!-- 类型 -->
              <div class="type">
                <span>
                  {{ $t('account_detail.type') }}
                </span>
                <span>
                  {{ accountDetailData.data ? getAccountType(accountDetailData.data) : '' }}
                </span>
              </div>

              <!-- 余额 -->
              <div class="balance">
                <span>
                  {{ $t('account_detail.balance') }}
                </span>
                <span>
                  {{ accountDetailData.data ? parseFloat(accountDetailData.data.actor.Balance).toFixed(4) + ' FIL' : '' }}
                </span>
              </div>

              <!-- 代码 -->
              <div class="code">
                <span>
                  {{ $t('account_detail.code') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.actor.code : '' }}
                </span>
              </div>

              <!-- 随机数 -->
              <div class="random">
                <span>
                  {{ $t('account_detail.random') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.actor.nonce : '' }}
                </span>
              </div>

              <!-- 所有者 -->
              <div class="owner">
                <span>
                  {{ $t('account_detail.owner') }}
                </span>
                <span>
                  <span class="cursor primary-color" @click="navigate('account-detail',accountDetailData.miner.owner_address)">
                    {{ accountDetailData.miner ? accountDetailData.miner.owner_address : '' }}
                  </span>
                </span>
              </div>

              <!-- 节点ID -->
              <div class="owner">
                <span>
                  {{ $t('account_detail.peer_id') }}
                </span>
                <span>
                  {{ accountDetailData.miner ? accountDetailData.miner.peer_id : '' }}
                </span>
              </div>

              <!-- 原值算力 -->
              <div class="raw-power">
                <span>
                  {{ $t('account_detail.raw_power') }}
                </span>
                <span>
                  {{ accountDetailData.miner ? accountDetailData.miner.power : '' }}
                </span>
              </div>

              <!-- 有效算力 -->
              <div class="quality-power">
                <span>
                  {{ $t('account_detail.quality_power') }}
                </span>
                <span>
                  {{ accountDetailData.miner ? accountDetailData.miner.qulity_ajuested_power : '' }}
                </span>
              </div>

              <!-- 数据块大小 -->
              <div class="sector-size">
                <span>
                  {{ $t('account_detail.sector_size') }}
                </span>
                <span>
                  {{ accountDetailData.miner ? accountDetailData.miner.sector_size : '' }}
                </span>
              </div>

              <!-- 数据块数量 -->
              <div class="sector-number">
                <span>
                  {{ $t('account_detail.sector_number') }}
                </span>
                <span>
                  {{ accountDetailData.miner ? accountDetailData.miner.sector_num : '' }}
                </span>
              </div>

              <!-- 证明中的数据块数量 -->
              <div class="proving-sector-number">
                <span>
                  {{ $t('account_detail.proving_sector_number') }}
                </span>
                <span>
                  {{ accountDetailData.miner ? accountDetailData.miner.proving_sector_num : '' }}
                </span>
              </div>

              <!-- 失败数量 -->
              <div class="fail-number">
                <span>
                  {{ $t('account_detail.fail_number') }}
                </span>
                <span>
                  {{ accountDetailData.miner ? accountDetailData.miner.fault_num : '' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 普通账户 -->
          <div v-else class="normal">
            <div class="title">
              {{ $t('account_detail.title') }}
            </div>
            <div class="content-wrapper">
              <!-- 地址 -->
              <div class="address">
                <span>
                  {{ $t('account_detail.address') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.address : '' }}
                </span>
              </div>

              <!-- 类型 -->
              <div class="type">
                <span>
                  {{ $t('account_detail.type') }}
                </span>
                <span>
                  {{ accountDetailData.data ? getAccountType(accountDetailData.data) : '' }}
                </span>
              </div>

              <!-- 余额 -->
              <div class="balance">
                <span>
                  {{ $t('account_detail.balance') }}
                </span>
                <span>
                  {{ accountDetailData.data ? parseFloat(accountDetailData.data.actor.Balance).toFixed(4) + ' FIL' : '' }}
                </span>
              </div>

              <!-- 代码 -->
              <div class="code">
                <span>
                  {{ $t('account_detail.code') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.actor.code : '' }}
                </span>
              </div>

              <!-- 随机数 -->
              <div class="random">
                <span>
                  {{ $t('account_detail.random') }}
                </span>
                <span>
                  {{ accountDetailData.data ? accountDetailData.data.actor.nonce : '' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="list-wrapper">
        <div v-if="flag == 'owner' || flag == 'miner'" class="tabs-wrapper">
          <div class="main-content">
            <div class="tab-item" @click="onClickTabItem(0)">
              <span :class="tabIndex == 0 ? 'active' : ''">
                {{ $t('account_detail.tabs.message') }}
              </span>
            </div>

            <div class="tab-item" @click="onClickTabItem(1)">
              <span :class="tabIndex == 1 ? 'active' : ''">
                {{ $t('account_detail.tabs.block') }}
              </span>
            </div>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-if="tabIndex == 0" class="message-wrapper">
          <div class="main-content">
            <div class="title-wrapper">
              <div class="text-wrapper">
                <span>{{ $t('account_detail.message.title') }}</span>
                <span>{{ $t('account_detail.message.total', [messageTotal]) }}</span>
              </div>
              <el-select v-model="selectedMessageMethod" placeholder="" @change="fetchMessagesByAddress(0)">
                <el-option
                  v-for="item in messageMethodData"
                  :key="item.code"
                  :label="item.message"
                  :value="item.value"/>
              </el-select>
            </div>
            <el-table :data="messageListData" header-row-class-name="table-header" border stripe>
              <!-- 消息哈希 -->
              <el-table-column
                :label="$t('account_detail.message.hash')"
                :show-overflow-tooltip="true"
                :min-width="140"
                class-name="hash-column">
                <template slot-scope="scope">
                  <span :title="scope.row.cid" @click="navigate('message-detail',scope.row.cid)">{{ getAddrFormat(scope.row.cid,8) }}</span>
                </template>
              </el-table-column>

              <!-- 区块高度 -->
              <el-table-column
                :label="$t('account_detail.message.height')"
                :min-width="80"
                class-name="block-height-column">
                <template slot-scope="scope">
                  <span @click="navigate('block-height',scope.row.height)">{{ scope.row.height }}</span>
                </template>
              </el-table-column>

              <!-- 时间 -->
              <el-table-column
                :label="$t('account_detail.message.time')"
                :min-width="140"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  {{ formatHistoryTime(new Date().getTime() - scope.row.msgcreate * 1000) }}
                </template>
              </el-table-column>

              <!-- 发送地址 -->
              <el-table-column
                :label="$t('account_detail.message.sender')"
                :min-width="140"
                :show-overflow-tooltip="true"
                class-name="sender-column">
                <template slot-scope="scope">
                  <span :title="scope.row.msg.from" @click="navigate('account-detail',scope.row.msg.from)">{{ getAddrFormat(scope.row.msg.from,8) }}</span>
                </template>
              </el-table-column>

              <!-- 接收地址 -->
              <el-table-column
                :label="$t('account_detail.message.receiver')"
                :show-overflow-tooltip="true"
                :min-width="100"
                class-name="receiver-column">
                <template slot-scope="scope">
                  <span @click="navigate('account-detail',scope.row.msg.to)">{{ scope.row.msg.to.length > 12 ? getAddrFormat(scope.row.msg.to,3) : scope.row.msg.to }}</span>
                </template>
              </el-table-column>

              <!-- 数值 -->
              <el-table-column
                :label="$t('account_detail.message.value')"
                :show-overflow-tooltip="true"
                :min-width="140">
                <template slot-scope="scope">
                  {{ parseFloat(scope.row.msg.value).toFixed(4) + ' FIL' }}
                </template>
              </el-table-column>

              <!-- 状态 -->
              <el-table-column
                :label="$t('account_detail.message.status')"
                :min-width="80">
                <template slot-scope="scope">
                  {{ scope.row.exit_code == 0 ? $t('app_constant.status.success') : $t('app_constant.status.fail') }}
                </template>
              </el-table-column>

              <!-- 类型 -->
              <el-table-column
                :label="$t('account_detail.message.type')"
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
                  <el-select v-model="messagePageSize" :placeholder="$t('common.selected')" size="mini" @change="fetchMessagesByAddress(0)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('common.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="messagePageIndex > 1 ? 'cursor' : 'gray' " class="space" @click="fetchMessagesByAddress(0)">{{ $t('common.firstPage') }}</span>
                <span :class="messagePageIndex > 1 ? 'cursor' : 'gray' " class="space symbol" @click="fetchMessagesByAddress(messagePageIndex-1)"> &lt; </span>
                <span>{{ messagePageIndex + 1 }}</span>/<span class="space">{{ messagePageTotal+1 }}</span>
                <span :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' " class="space symbol" @click="fetchMessagesByAddress(messagePageIndex+1)"> &gt; </span>
                <span :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' " @click="fetchMessagesByAddress(messagePageTotal)">{{ $t('common.lastPage') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 区块列表 -->
        <div v-if="tabIndex == 1" class="block-wrapper">
          <div class="main-content">
            <div class="title-wrapper">
              <div class="text-wrapper">
                <span>{{ $t('account_detail.block.title') }}</span>
                <span>{{ $t('account_detail.block.total', [blockTotal, parseFloat(tokenTotal).toFixed(4)]) }}</span>
              </div>
            </div>
            <el-table :data="blockListData" header-row-class-name="table-header" border stripe>
              <!-- 区块高度 -->
              <el-table-column
                :label="$t('account_detail.block.height')"
                :min-width="140">
                <template slot-scope="scope">
                  <span class="cursor primary-color" @click="navigate('block-height',scope.row.block_header.height)">{{ scope.row.block_header.height }}</span>
                </template>
              </el-table-column>

              <!-- 消息哈希 -->
              <el-table-column
                :label="$t('account_detail.block.hash')"
                :show-overflow-tooltip="true"
                :min-width="140">
                <template slot-scope="scope">
                  <span :title="scope.row.cid" class="cursor primary-color" @click="navigate('block-detail',scope.row.cid)">{{ getAddrFormat(scope.row.cid,8) }}</span>
                </template>
              </el-table-column>

              <!-- 时间 -->
              <el-table-column
                :label="$t('account_detail.block.time')"
                :min-width="140">
                <template slot-scope="scope">
                  {{ formatHistoryTime(new Date().getTime() - scope.row.block_header.timestamp * 1000) }}
                </template>
              </el-table-column>

              <!-- 消息 -->
              <el-table-column
                :label="$t('account_detail.block.messages')"
                :min-width="140">
                <template slot-scope="scope">
                  {{ scope.row.msg_cids.length }}
                </template>
              </el-table-column>

              <!-- 区块奖励 -->
              <el-table-column
                :label="$t('account_detail.block.reward')"
                :min-width="140">
                <template slot-scope="scope">
                  {{ scope.row.reward }}
                </template>
              </el-table-column>

              <!-- 矿工 -->
              <el-table-column
                :label="$t('account_detail.block.miner')"
                :min-width="140">
                <template slot-scope="scope">
                  <!-- <span class="cursor primary-color" @click="navigate('account-detail',scope.row.block_header.miner)">{{ scope.row.block_header.miner }}</span> -->
                  <span class="primary-color" >{{ scope.row.block_header.miner }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <div class="left-wrapper">
                <span>{{ $t('common.show') }}</span>
                <span>
                  <el-select v-model="blockPageSize" :placeholder="$t('common.selected')" size="mini" @change="fetchBlockByMiner(0)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('common.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="blockPageIndex > 1 ? 'cursor' : 'gray' " class="space" @click="fetchBlockByMiner(0)">{{ $t('common.firstPage') }}</span>
                <span :class="blockPageIndex > 1 ? 'cursor' : 'gray' " class="space symbol" @click="fetchBlockByMiner(blockPageIndex-1)"> &lt; </span>
                <span>{{ blockPageIndex + 1 }}</span>/<span class="space">{{ blockPageTotal+1 }}</span>
                <span :class="blockPageIndex == blockPageTotal ? 'gray' : 'cursor' " class="space symbol" @click="fetchBlockByMiner(blockPageIndex+1)"> &gt; </span>
                <span :class="blockPageIndex == blockPageTotal ? 'gray' : 'cursor' " @click="fetchBlockByMiner(blockPageTotal)">{{ $t('common.lastPage') }}</span>
              </div>
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
import { formatNumber, parseTime, formatHistoryTime } from '@/utils'
import * as api from '@/api/common'
import * as helper from '@/utils/helper'
import { getAddrFormat } from '@/utils/helper'

export default {
  name: 'AccountDetail',

  data() {
    return {
      actorId: this.$route.params.id,
      flag: 'normal',

      tabIndex: 0,

      accountDetailData: {},

      currentMethod: '',
      from_to: '',

      messageListData: [],
      messageTotal: 0,
      messagePageIndex: 1,
      messagePageSize: 10,
      messagePageTotal: 0,

      messageMethodData: [],
      selectedMessageMethod: '',

      miners: [],
      blockListData: [],
      blockTotal: 0,
      blockPageIndex: 1,
      blockPageSize: 10,
      blockPageTotal: 0,

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

      tokenTotal: 0
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

    this.fetchAccountDetailData()
    this.fetchMessagesByAddress()
    this.fetchBlockByMiner()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,
    getAddrFormat,

    navigate(url, selector) {
      helper.navigate(this, url, selector)
    },

    onClickTabItem(index) {
      this.tabIndex = index
    },

    getAccountType(data) {
      return data.is_owner ? this.$t('app_constant.account_type.owner') : data.is_miner ? this.$t('app_constant.account_type.miner') : data.is_wallet ? this.$t('app_constant.account_type.wallet') : this.$t('app_constant.account_type.normal')
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

    // 获取账户详情
    fetchAccountDetailData() {
      const loading = helper.loading(this)
      api.fetchAccountDetails(this.actorId).then(response => {
        loading.close()

        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }

        if (data) {
          this.accountDetailData = data
          if (data.data.is_owner === true) {
            this.flag = 'owner'
          } else if (data.data.is_miner === true) {
            this.flag = 'miner'
          } else {
            this.flag = 'normal'
          }
        }
      }).catch(error => {
        loading.close()
        console.error(error)
      })
    },

    // 获取消息列表
    fetchMessagesByAddress(page = 0) {
      if (page < 0 || (this.messagePageTotal >= 0 && page > this.messagePageTotal)) {
        return
      }

      const loading = helper.loading(this)

      this.messagePageIndex = page
      api.fetchMessagesByAddress(this.actorId, this.currentMethod, page * this.messagePageSize, this.messagePageSize, this.from_to).then(response => {
        loading.close()

        const data = response.data
        if (data) {
          this.messageListData = data.data
          this.messageTotal = data.total
          this.messagePageTotal = Math.ceil(data.total / this.messagePageSize) - 1
        }
      }).catch(error => {
        loading.close()
        console.error(error)
      })
    },

    // TODO 模拟数据 # 区块列表 # => tipset/BlockByMiner {begindex: "0", count: "25"}
    fetchBlockByMiner(page = 0) {
      if (page < 0 || (this.messagePageTotal >= 0 && page > this.messagePageTotal)) {
        return
      }

      this.blockPageIndex = page
      this.miners.push(this.actorId)
      const loading = helper.loading(this)

      api.fetchBlockByMiner(this.miners, page * this.blockPageSize, this.blockPageSize).then(response => {
        loading.close()

        const data = response.data
        if (data) {
          this.blockListData = data.blocks
          this.blockTotal = data.total
          this.tokenTotal = data.total_fil
          this.blockPageTotal = Math.ceil(data.total / this.blockPageSize) - 1
        }
      }).catch(error => {
        loading.close()
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
