<template>
  <div class="common-list-container">
    <div class="display-pc-and-pad">
      <div class="tabs-wrapper">
        <div class="main-content">
          <div class="tab-item" @click="onClickTab(0)">
            <span :class="tabIndex == 0 ? 'active' : ''">
              {{ $t('common_list.block_list') }}
            </span>
          </div>
          <div class="tab-item" @click="onClickTab(1)">
            <span :class="tabIndex == 1 ? 'active' : ''">
              {{ $t('common_list.message_list') }}
            </span>
          </div>
          <div class="tab-item" @click="onClickTab(2)">
            <span :class="tabIndex == 2 ? 'active' : ''">
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
              <div id="blockChart">
                <div class="block-height-wrapper">
                  <template v-for="(group, groupIndex) in blockGroupData">
                    <div :key="groupIndex" class="block-height-item">
                      <div :class="group.label == 'null' ? 'empty' : ''" class="label" @click="onClickBlockHeight(group.label)">
                        {{ group.label }}
                      </div>
                      <div class="block-list-wrapper">
                        <div v-for="(item, index) in group.data" :key="index" class="block-item">
                          <el-popover
                            placement="bottom"
                            width="600"
                            trigger="hover">
                            <div class="hover-content">
                              <div v-html="$t('common_list.tooltips.miner', [item.miner])"></div>
                              <div v-html="$t('common_list.tooltips.height', [item.height])"></div>
                              <div v-html="$t('common_list.tooltips.time', [parseTime(item.time * 1000)])"></div>
                              <div v-html="$t('common_list.tooltips.hash', [item.hash])"></div>
                            </div>
                            <div slot="reference" :class="item.type == 0 ? 'empty' : item.type == 1 ? 'min' : 'other'" class="item-text" @click="onClickMiner(item.miner)">{{ item.miner }}</div>
                          </el-popover>
                        </div>
                      </div>
                    </div>
                    <div :key="groupIndex + 100" class="arrow">
                      <img src="@/assets/images/icon_arrow_ios.png" alt="">
                    </div>
                  </template>
                </div>

                <div class="legend">
                  <div class="timer-countdown">
                    <el-progress :width="30" :stroke-width="2" :percentage="timerCountdownPercentage" :show-text="false" type="circle" status="success"/>
                    <div class="layer">
                      {{ timerCountdown }}
                    </div>
                  </div>
                  <ul>
                    <li>{{ $t('common_list.legend.empty_block') }}</li>
                    <li>{{ $t('common_list.legend.min_ticket_block') }}</li>
                    <li>{{ $t('common_list.legend.other_block') }}</li>
                  </ul>
                </div>
                <div class="slider-wrapp">
                  <el-slider v-model="currentBlockHeight" :min="10" :max="blockHeightMax" @change="onBlockHeightSliderChange" />
                </div>
                <div class="ruler">
                  <div v-for="(item, index) in rulerItems" :key="index" class="ruler-item">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            <div class="table-wrapper">
              <div class="table-title">
                <span>{{ $t('common_list.block.list_title') }}</span>
              </div>
              <el-table :data="blockListData" :span-method="calcRowSpan" header-row-class-name="table-header" border stripe>
                <el-table-column
                  :label="$t('common_list.block.block_height')"
                  class-name="block-height-column"
                  min-width="80">
                  <template slot-scope="scope">
                    <span @click="navigate('block-height',scope.row.data.block_header.height)">#{{ scope.row.data ? scope.row.data.block_header.height : '' }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  :show-overflow-tooltip="true"
                  :label="$t('common_list.block.hash')"
                  class-name="hash-column"
                  min-width="180">
                  <template slot-scope="scope">
                    <span :title="scope.row.data.cid" @click="navigate('block-detail',scope.row.data.cid)">{{ scope.row.data ? getAddrFormat(scope.row.data.cid,16) : '' }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('common_list.block.time')"
                  min-width="100">
                  <template slot-scope="scope">
                    {{ scope.row.data ? formatHistoryTime(new Date().getTime() - scope.row.data.block_header.timestamp * 1000) : '' }}
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('common_list.block.message')"
                  min-width="60">
                  <template slot-scope="scope">
                    {{ scope.row.data ? scope.row.data.msg_cids.length : '' }}
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('common_list.block.reward')"
                  min-width="100">
                  <template slot-scope="scope">
                    {{ scope.row.data ? parseFloat(scope.row.data.reward).toFixed(4) + ' FIL' : '' }}
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('common_list.block.miner')"
                  class-name="miner-column"
                  min-width="60">
                  <template slot-scope="scope">
                    <span @click="navigate('account-detail',scope.row.data.block_header.miner)">{{ scope.row.data ? scope.row.data.block_header.miner : '' }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!-- 消息列表 -->
        <div v-if="tabIndex == 1" class="message-tab-content">
          <div class="main-content">
            <div class="table-title">
              <span>{{ $t('common_list.message.list_title') }}</span>
              <span v-html="$t('common_list.message.list_total', [messageTotal])"></span>
            </div>
            <el-table :data="messageListData" header-row-class-name="table-header" border stripe>
              <el-table-column
                :label="$t('common_list.message.hash')"
                :show-overflow-tooltip="true"
                class-name="hash-column"
                min-width="120">
                <template slot-scope="scope">
                  <span :title="scope.row.cid" @click="navigate('message-detail',scope.row.cid)">{{ getAddrFormat(scope.row.cid,6) }}</span>
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('common_list.message.block_height')"
                class-name="block-height-column"
                min-width="80">
                <template slot-scope="scope">
                  <span @click="navigate('block-height',scope.row.height)">{{ scope.row.height }}</span>
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('common_list.message.time')"
                :show-overflow-tooltip="true"
                min-width="140">
                <template slot-scope="scope">
                  {{ formatHistoryTime(new Date().getTime() - scope.row.msgcreate * 1000) }}
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('common_list.message.sender')"
                :show-overflow-tooltip="true"
                class-name="sender-column"
                min-width="120">
                <template slot-scope="scope">
                  <span :title="scope.row.msg.from" @click="navigate('account-detail',scope.row.msg.from)">{{ scope.row.msg ? getAddrFormat(scope.row.msg.from,6) : '' }}</span>
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('common_list.message.receiver')"
                :show-overflow-tooltip="true"
                class-name="receiver-column"
                min-width="80">
                <template slot-scope="scope">
                  <span :title="scope.row.msg.to" @click="navigate('account-detail',scope.row.msg.to)">{{ scope.row.msg ? scope.row.msg.to_str : '' }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.value')" :show-overflow-tooltip="true" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.msg ? parseFloat(scope.row.msg.value).toFixed(4) : '' }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.status')" min-width="60">
                <template slot-scope="scope">
                  {{ scope.row.exit_code == 0 ? $t('app_constant.status.success') : $t('app_constant.status.fail') }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('common_list.message.type')" :show-overflow-tooltip="true" min-width="120">
                <template slot-scope="scope">
                  {{ scope.row.msg ? getMessageMethodByCode(scope.row.msg.method) : '' }}
                </template>
              </el-table-column>
            </el-table>

            <!-- <el-pagination
              :current-page="messagePageIndex"
              :page-sizes="[20, 40, 80, 100]"
              :page-size="messagePageSize"
              :total="messageTotal"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="onMessageSizeChange"
              @current-change="onMessageCurrentChange"/> -->

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
                <span
                  :class="messagePageIndex > 1 ? 'cursor' : 'gray' "
                  class="space"
                  @click="fetchMessageData(0)">
                  {{ $t('common.firstPage') }}
                </span>
                <span
                  :class="messagePageIndex > 1 ? 'cursor' : 'gray' "
                  class="space symbol"
                  @click="fetchMessageData(messagePageIndex-1)"> &lt; </span>
                <span>
                  {{ messagePageIndex + 1 }}
                </span>/<span class="space">
                  {{ messagePageTotal+1 }}
                </span>
                <span
                  :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' "
                  class="space symbol"
                  @click="fetchMessageData(messagePageIndex+1)"> &gt; </span>
                <span
                  :class="messagePageIndex == messagePageTotal ? 'gray' : 'cursor' "
                  @click="fetchMessageData(messagePageTotal)">{{ $t('common.lastPage') }}</span>
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
            <el-table :data="accountListData" header-row-class-name="table-header" border stripe>
              <el-table-column :label="$t('common_list.account.index')" type="index" min-width="100">
                <template slot-scope="scope">
                  {{ scope.row.rank }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('common_list.account.address')" class-name="address-column" min-width="160">
                <template slot-scope="scope">
                  <span @click="navigate('account-detail',scope.row.address)">{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common_list.account.type')" min-width="160">
                <template slot-scope="scope">
                  {{ getAccountType(scope.row) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('common_list.account.balance')" min-width="160">
                <template slot-scope="scope">
                  {{ parseFloat(scope.row.actor.Balance).toFixed(4) + ' FIL' }}
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
import * as helper from '@/utils/helper'
import { getAddrFormat } from '@/utils/helper'

export default {
  name: 'CommonList',

  data() {
    return {
      flag: this.$route.params.flag,
      tabIndex: 0,
      timerToken: null,
      timerInterval: 30000,
      timerCountdownPercentage: 100,
      timerCountdown: 30,
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
      blockGroupData: [],
      blockListPageSize: 10,
      blockHeightMax: 0,
      currentBlockHeight: 0,
      rulerItems: [],
      ruleItemsCount: 5,

      messagePageIndex: 0,
      messagePageSize: 50,
      messageListData: [],
      messageTotal: 0,
      messagePageTotal: 0,

      accountPageIndex: 0,
      accountPageSize: 50,
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
    this.analyzeRoute()

    if (this.tabIndex === 0) {
      this.fetchBlockData()
      this.startTimer()
    } else if (this.tabIndex === 1) {
      this.fetchMessageData()
    } else if (this.tabIndex === 2) {
      this.fetchAccountData()
    }
  },

  beforeDestroy() {
    this.clearTimer()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,
    getAddrFormat,

    navigate(url, selector) {
      helper.navigate(this, url, selector)
    },

    analyzeRoute() {
      this.tabIndex = this.$route.params.flag === 'block' ? 0 : this.$route.params.flag === 'message' ? 1 : 2
    },

    onClickTab(index) {
      this.tabIndex = index

      if (this.tabIndex === 0) {
        this.fetchBlockData()
      } else if (this.tabIndex === 1) {
        this.fetchMessageData()
      } else if (this.tabIndex === 2) {
        this.fetchAccountData()
      }
    },

    startTimer() {
      this.clearTimer()
      this.timerToken = setInterval(() => {
        this.timerCountdown = this.timerCountdown - 1

        if (this.timerCountdown <= 0) {
          if (this.tabIndex === 0) {
            this.fetchBlockData(true)
          }
          this.timerCountdown = 30
        }
        this.timerCountdownPercentage = this.timerCountdown * 100 / 30
      }, 1000)
    },

    clearTimer() {
      if (this.timerToken) {
        clearInterval(this.timerToken)
        this.timerToken = null
      }
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
          const blockList = item.tipset
          if (blockList && blockList.length > 0) {
            for (let i = 0; i < blockList.length; i++) {
              const blockItem = blockList[i]
              temp.push({
                isRowSpan: i === 0,
                spanRows: blockList.length,
                data: blockItem
              })
            }
          }
        })
      }
      this.blockListData = temp
    },

    transferBlockGroup(data) {
      const temp = []
      if (data && data.length > 0) {
        for (let index = data.length - 1; index >= 0; index--) {
          const item = data[index]
          let groupLabel = ''
          const tempList = []

          const minTicketBlock = item.min_ticket_block
          const blockList = item.tipset
          if (minTicketBlock && blockList && blockList.length > 0) {
            for (let i = 0; i < blockList.length; i++) {
              const blockItem = blockList[i]
              if (!groupLabel) {
                groupLabel = '#' + blockItem.block_header.height
              }
              tempList.push({
                type: blockItem.cid === minTicketBlock ? 1 : 2,
                miner: blockItem.block_header.miner,
                height: blockItem.block_header.height,
                time: blockItem.block_header.timestamp,
                hash: blockItem.cid
              })
            }
          } else {
            groupLabel = 'null'
            tempList.push({
              type: 0,
              miner: 'null',
              height: '',
              time: '',
              hash: ''
            })
          }

          temp.push({
            label: groupLabel,
            data: tempList
          })
        }
      }
      this.blockGroupData = temp
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

    // 获取账户信息
    fetchAccountData(page = 0) {
      if (page < 0 || (this.accountPagTotal > 0 && page > this.accountPagTotal)) {
        return
      }
      this.accountPageIndex = page
      const loading = helper.loading(this)
      api.fetchAccountList(page * this.accountPageSize, this.accountPageSize).then(response => {
        loading.close()

        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          var accounts = data.accounts
          var page = this.accountPageIndex * this.accountPageSize
          for (const i in accounts) {
            accounts[i].rank = parseInt(i) + 1 + page
          }
          this.accountListData = accounts
          this.accountTotal = data.total
          this.accountPagTotal = Math.floor(data.total / this.accountPageSize)
        }
      }).catch(error => {
        loading.close()
        console.error(error)
      })
    },

    // 获取消息数据
    fetchMessageData(page = 0) {
      if (page < 0 || (this.messagePageTotal > 0 && page > this.messagePageTotal)) {
        return
      }
      this.messagePageIndex = page
      var that = this

      const loading = helper.loading(this)
      api.fetchBlockMessages(this.currentMethod, page * this.messagePageSize, this.messagePageSize).then(response => {
        loading.close()

        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          for (var i in data.msgs) {
            data.msgs[i].msg.to_str = data.msgs[i].msg.to
            if (data.msgs[i].msg.to.length > 12) {
              data.msgs[i].msg.to_str = that.getAddrFormat(data.msgs[i].msg.to, 3)
            }
          }
          that.messageListData = data.msgs
          that.messageTotal = data.total
          that.messagePageTotal = Math.ceil(data.total / that.messagePageSize) - 1
        }
      }).catch(error => {
        loading.close()
        console.error(error)
      })
    },

    onBlockHeightSliderChange(value) {
      this.fetchBlockData()
      this.startTimer()
    },

    onClickBlockHeight(height) {
      if (height === 'null') {
        return
      }
      helper.navigate(this, 'block-height', height.replace('#', ''))
    },

    onClickMiner(miner) {
      if (miner === 'null') {
        return
      }
      helper.navigate(this, 'account-detail', miner)
    },

    // 获取区块详情数据
    fetchBlockData(refresh = false) {
      const loading = helper.loading(this)
      api.fetchBlockList(refresh ? 0 : this.currentBlockHeight, this.currentBlockHeight > this.blockListPageSize || this.currentBlockHeight === 0 ? this.blockListPageSize : this.currentBlockHeight).then(response => {
        loading.close()

        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          if (data.tipsets && data.tipsets.length > 0) {
            const blockList = data.tipsets.reverse()
            if (this.blockHeightMax === 0 || refresh) {
              refresh = false

              for (let index = 0; index < blockList.length; index++) {
                const item = blockList[index]
                if (item.tipset && item.tipset.length > 0) {
                  this.currentBlockHeight = this.blockHeightMax = parseInt(item.tipset[0].block_header.height)

                  this.rulerItems = []
                  const step = parseInt((this.currentBlockHeight - 10) / (this.ruleItemsCount - 1))
                  for (let index = 0; index < this.ruleItemsCount; index++) {
                    if (index === 0) {
                      this.rulerItems.push('#' + 10)
                    } else if (index === this.ruleItemsCount - 1) {
                      this.rulerItems.push('#' + this.currentBlockHeight)
                    } else {
                      this.rulerItems.push('#' + (10 + step * index))
                    }
                  }
                  break
                }
              }
            }
            this.transferBlockData(blockList)
            this.transferBlockGroup(blockList)
          }
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
