<template>
  <div class="common-list-container">
    <div class="display-pc-and-pad">
      <div class="tabs-wrapper">
        <div class="main-content">
          <div :class="tabIndex == 0 ? 'active' : ''" class="tab-item" @click="onClickTab(0)">
            <span>
              {{ $t('common_list.block_list') }}
            </span>
          </div>
          <div :class="tabIndex == 1 ? 'active' : ''" class="tab-item" @click="onClickTab(1)">
            <span>
              {{ $t('common_list.message_list') }}
            </span>
          </div>
          <div :class="tabIndex == 2 ? 'active' : ''" class="tab-item" @click="onClickTab(2)">
            <span>
              {{ $t('common_list.account_list') }}
            </span>
          </div>
        </div>
      </div>
      <div class="tab-content-wrapper">
        <!-- 区块列表 -->
        <div v-if="tabIndex == 0" class="block-tab-content">
          <div class="main-content">
            <div class="chart-wrapper">
              <div id="blockChart"></div>
            </div>
            <div class="table-title">
              <span>{{ $t('common_list.block.list_title') }}</span>
              <span v-html="$t('common_list.block.list_total', [4287])"></span>
            </div>
            <el-table :data="blockListData" :span-method="calcRowSpan" border stripe>
              <el-table-column :label="$t('common_list.block.block_height')" min-width="60">
                <template slot-scope="scope">
                  #{{ scope.row.data ? scope.row.data.block_header.height : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.block.hash')" min-width="180">
                <template slot-scope="scope">
                  {{ scope.row.data ? scope.row.data.cid : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.block.time')" min-width="100">
                <template slot-scope="scope">
                  {{ scope.row.data ? formatHistoryTime(new Date().getTime() - scope.row.data.block_header.timestamp * 1000) : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.block.message')" min-width="60">
                <template slot-scope="scope">
                  {{ scope.row.data ? scope.row.data.msg_cids.length : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.block.reward')" min-width="100">
                <template slot-scope="scope">
                  {{ scope.row.data ? scope.row.data.reward : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.block.miner')" min-width="60">
                <template slot-scope="scope">
                  {{ scope.row.data ? scope.row.data.block_header.miner : '' }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 消息列表 -->
        <div v-if="tabIndex == 1" class="message-tab-content">
          <div class="main-content">
            <div class="table-title">
              <span>{{ $t('common_list.message.list_title') }}</span>
              <span v-html="$t('common_list.message.list_total', [messageTotal])"></span>
            </div>
            <el-table :data="messageListData" border stripe>
              <el-table-column :label="$t('common_list.message.hash')" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.cid }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.block_height')" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.height }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.time')" min-width="120">
                <template slot-scope="scope">
                  {{ formatHistoryTime(new Date().getTime() - scope.row.msgcreate * 1000) }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.sender')" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.msg ? scope.row.msg.from : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.receiver')" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.msg ? scope.row.msg.to : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.value')" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.msg ? scope.row.msg.value : scope.row.msg }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.status')" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.exit_code == 0 ? $t('app_constant.status.success') : $t('app_constant.status.fail') }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.type')" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.msg ? getMessageMethodByCode(scope.row.msg.method) : '' }}
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <div class="left-wrapper">
                <span>{{ $t('common.show') }}</span>
                <span>
                  <el-select v-model="messagePageSize" :placeholder="$t('common.selected')" size="mini" @change="fetchMessageData(messagePageIndex)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('common.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="messagePageIndex > 1 ? 'cursor' : 'gray' " class="space" @click="fetchMessageData(0)">{{ $t('common.firstPage') }}</span>
                <span :class="messagePageIndex > 1 ? 'cursor' : 'gray' " class="space symbol" @click="fetchMessageData(messagePageIndex-1)"> &lt; </span>
                <span>{{ messagePageIndex + 1 }}</span>/<span class="space">{{ messagePageTotal+1 }}</span>
                <span :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' " class="space symbol" @click="fetchMessageData(messagePageIndex+1)"> &gt; </span>
                <span :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' " @click="fetchMessageData(messagePageTotal)">{{ $t('common.lastPage') }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 账户列表 -->
        <div v-if="tabIndex == 2" class="account-tab-content">
          <div class="main-content">
            <div class="table-title">
              <span>{{ $t('common_list.account.list_title') }}</span>
              <span v-html="$t('common_list.account.list_total', [accountTotal])"></span>
            </div>
            <el-table :data="accountListData" border stripe>
              <el-table-column :label="$t('common_list.account.index')" type="index" min-width="100">
                <template slot-scope="scope">
                  {{ scope.row.rank }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('common_list.account.address')" min-width="160">
                <template slot-scope="scope">
                  {{ scope.row.address }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('common_list.account.type')" min-width="160">
                <template slot-scope="scope">
                  {{ getAccountType(scope.row) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('common_list.account.balance')" min-width="160">
                <template slot-scope="scope">
                  {{ scope.row.actor.Balance }}
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <div class="left-wrapper">
                <span>{{ $t('common.show') }}</span>
                <span>
                  <el-select v-model="accountPageSize" :placeholder="$t('common.selected')" size="mini" @change="fetchAccountData(accountPageIndex)">
                    <el-option v-for="item in showNumbers" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </span>
                <span>{{ $t('common.records') }}</span>
              </div>
              <div class="page-wrapper">
                <span :class="accountPageIndex > 1 ? 'cursor' : 'gray' " class="space" @click="fetchAccountData(0)">{{ $t('common.firstPage') }}</span>
                <span :class="accountPageIndex > 1 ? 'cursor' : 'gray' " class="space symbol" @click="fetchAccountData(accountPageIndex-1)"> &lt; </span>
                <span>{{ accountPageIndex + 1 }}</span>/<span class="space">{{ accountPagTotal+1 }}</span>
                <span :class="accountPageIndex == accountPagTotal ? 'gray' : 'cursor' " class="space symbol" @click="fetchAccountData(accountPageIndex+1)"> &gt; </span>
                <span :class="accountPageIndex == accountPagTotal ? 'gray' : 'cursor' " @click="fetchAccountData(accountPagTotal)">{{ $t('common.lastPage') }}</span>
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
import {
  mapGetters
} from 'vuex'
import {
  formatNumber,
  parseTime,
  formatHistoryTime
} from '@/utils'
import * as api from '@/api/common'

export default {
  name: 'CommonList',

  data() {
    return {
      flag: this.$route.params.flag,
      tabIndex: 0,
      messageMethodData: [],
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

      blockListData: [],

      messagePageIndex: 0,
      messagePageSize: 10,
      messageListData: [],
      messageTotal: 0,
      messagePageTotal: 0,

      accountPageIndex: 0,
      accountPageSize: 10,
      accountListData: [],
      accountTotal: 0,
      accountPagTotal: 0,
      currentMethod: ''
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

    // 模拟数据
    this.fetchBlockData()
    this.fetchMessageData()
    this.fetchAccountData()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,

    onClickTab(index) {
      this.tabIndex = index
    },

    getTableAccountIndex(index) {
      return ((this.accountPageIndex - 1) * this.accountPageSize + index + 1)
    },

    getAccountType(item) {
      return item.is_owner ? this.$t('app_constant.account_type.owner') : item.is_miner ? this.$t('app_constant.account_type.miner') : item.is_wallet ? this.$t('app_constant.account_type.wallet') : this.$t('app_constant.account_type.normal')
    },

    calcRowSpan({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        if (this.blockListData[rowIndex].isRowSpan) {
          return {
            rowspan: this.blockListData[rowIndex].spanRows,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },

    transferBlockData(data) {
      const temp = []
      if (data && data.length > 0) {
        data.forEach(item => {
          const groupList = item.tipset
          if (groupList && groupList.length > 0) {
            for (let i = 0; i < groupList.length; i++) {
              const blockItem = groupList[i]
              temp.push({
                isRowSpan: i === 0,
                spanRows: groupList.length,
                data: blockItem
              })
            }
          }
        })
      }
      this.blockListData = temp
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

    // TODO 模拟 # 账户列表 # 数据，需要覆盖 => account/AccountList
    fetchAccountData(page = 0) {
      var that = this

      if (page < 0 || (that.accountPagTotal > 0 && page > that.accountPagTotal)) {
        return
      }

      that.accountPageIndex = page

      that.isLoading = true
      api.fetchAccountList(page * that.accountPageSize, that.accountPageSize).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          var accounts = data.accounts
          var page = that.accountPageIndex * that.accountPageSize
          for (const i in accounts) {
            accounts[i].rank = parseInt(i) + 1 + page
          }
          that.accountListData = accounts
          that.accountTotal = data.total
          that.accountPagTotal = Math.floor(data.total / that.accountPageSize)
        }
      }).catch(error => {
        console.error(error)
      })
    },

    // TODO 模拟 # 消息列表 # 数据，需要覆盖 => messages/BlockMessages
    fetchMessageData(page = 0) {
      var that = this
      if (page < 0 || (that.messagePageTotal > 0 && page > that.messagePageTotal)) {
        return
      }

      that.messagePageIndex = page

      that.isLoading = true
      api.fetchBlockMessages(that.currentMethod, page * that.messagePageSize, that.messagePageSize).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          that.messageListData = data.msgs
          that.messageTotal = data.total
          that.messagePageTotal = Math.ceil(data.total / that.messagePageSize) - 1
        }
      }).catch(error => {
        console.error(error)
      })
    },

    // TODO 模拟 # 区块列表 # 数据，需要覆盖 => tipset/TipSetTree
    fetchBlockData() {
      var that = this
      that.isLoading = true
      api.fetchBlockList(0, 15).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          that.transferBlockData(data.tipsets)
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
