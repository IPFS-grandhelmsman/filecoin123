<template>
  <div class="home-container">

    <!-- pc-pad layout -->
    <div class="display-pc-and-pad">
      <!-- <div class="map-wrapper">
        <div id="mapChart" class="chart-container">
        </div>
      </div> -->

      <div class="statistics">
        <div class="main-content">
          <!-- 区块高度 -->
          <div class="item">
            <div class="title">
              <span :class="language">{{ $t('home.lastest_block_height') }}</span>
              <el-tooltip :content="$t('home.lastest_block_height_description')" placement="bottom" effect="dark">
                <img src="@/assets/images/icon_help.png" alt="">
              </el-tooltip>
            </div>
            <span>
              {{ tipset_height }}
            </span>
          </div>
          <!-- 全网算力 -->
          <div class="item">
            <div class="title">
              <span :class="language">{{ $t('home.computing_power_total') }}</span>
              <el-tooltip :content="$t('home.computing_power_total_description')" placement="bottom" effect="dark">
                <img src="@/assets/images/icon_help.png" alt="">
              </el-tooltip>
            </div>
            <span>
              {{ statisticsData.quality_adjusted_power ? formatFileSize(statisticsData.quality_adjusted_power) : emptyText }}
            </span>
          </div>
          <!-- 全网矿工数 -->
          <div class="item">
            <div class="title">
              <span :class="language">{{ $t('home.miner_total') }}</span>
              <el-tooltip :content="$t('home.miner_total_description')" placement="bottom" effect="dark">
                <img src="@/assets/images/icon_help.png" alt="">
              </el-tooltip>
            </div>
            <span>
              {{ totalMiners ? totalMiners : emptyText }}
            </span>
          </div>
          <!-- 全网可用 -->
          <div class="item">
            <div class="title">
              <span :class="language">{{ $t('home.available_total') }}</span>
              <el-tooltip :content="$t('home.available_total_description')" placement="bottom" effect="dark">
                <img src="@/assets/images/icon_help.png" alt="">
              </el-tooltip>
            </div>
            <span>
              {{ statisticsData.outstanding ? statisticsData.outstanding : emptyText }}
            </span>
          </div>
          <!-- 流通中 -->
          <div class="item">
            <div class="title">
              <span :class="language">{{ $t('home.in_circulation') }}</span>
              <el-tooltip :content="$t('home.in_circulation_description')" placement="bottom" effect="dark">
                <img src="@/assets/images/icon_help.png" alt="">
              </el-tooltip>
            </div>
            <span>
              {{ statisticsData.outstanding ? statisticsData.outstanding : emptyText }}
            </span>
          </div>
          <!-- 抵押数量 -->
          <div class="item">
            <div class="title">
              <span :class="language">{{ $t('home.mortgage') }}</span>
              <el-tooltip :content="$t('home.mortgage_description')" placement="bottom" effect="dark">
                <img src="@/assets/images/icon_help.png" alt="">
              </el-tooltip>
            </div>
            <span>
              {{ statisticsData.pledge_collateral ? statisticsData.pledge_collateral : emptyText }}
            </span>
          </div>
        </div>
      </div>

      <div class="charts-wrapper">
        <div class="main-content">
          <div class="bar-chart-wrapper">
            <div id="blockChart">
              <div id="blocksWonChart" :style="{width: '780px', height: '280px',bottom:'20px'}"></div>
            </div>
            <div class="layer">
              <div class="chart-labels">
                <div class="miner">
                  {{ $t('home.miner_no') }}
                </div>
                <div class="block-rate">
                  {{ $t('home.block_rate') }}
                </div>
              </div>
            </div>
          </div>
          <div class="statistics">
            <!-- 最新出块时间 -->
            <div class="item">
              <div class="title">
                <span :class="language">{{ $t('home.lastest_block_time') }}</span>
                <el-tooltip :content="$t('home.lastest_block_time_descriptin')" placement="bottom" effect="dark">
                  <img src="@/assets/images/icon_help.png" alt="">
                </el-tooltip>
              </div>
              <span>
                {{ statisticsData.head_update ? formatHistoryTime(parseInt(statisticsData.head_update) * 1000) : 0 }}
              </span>
              <span class="charts">
              <div id="newBlockTimeChart" :style="{width: '186px', height: '50px'}"></div>
            </span>
            </div>
            <!-- 平均出块时间 -->
            <div class="item">
              <div class="title">
                <span :class="language">{{ $t('home.average_time') }}</span>
                <el-tooltip :content="$t('home.average_time_description')" placement="bottom" effect="dark">
                  <img src="@/assets/images/icon_help.png" alt="">
                </el-tooltip>
              </div>
              <span>
                {{ statisticsData.avg_blocktime ? statisticsData.avg_blocktime + 's' : emptyText }}
              </span>
              <span class="charts">
              <div id="AvgBlockTimeChart" :style="{width: '186px', height: '50px'}"></div>
            </span>
            </div>
            <!-- 最新出块奖励 -->
            <div class="item">
              <div class="title">
                <span :class="language">{{ $t('home.lastest_block_reward') }}</span>
                <el-tooltip :content="$t('home.lastest_block_reward_description')" placement="bottom" effect="dark">
                  <img src="@/assets/images/icon_help.png" alt="">
                </el-tooltip>
              </div>
              <span>
                {{ statisticsData.block_reward ? statisticsData.block_reward.toFixed(4) + ' FIL' : emptyText }}
              </span>
              <span class="charts">
              <div id="blockRewardChart" :style="{width: '186px', height: '50px'}"></div>
            </span>
            </div>
            <!-- 平均gas价格 -->
            <div class="item">
              <div class="title">
                <span :class="language">{{ $t('home.average_gas_price') }}</span>
                <el-tooltip :content="$t('home.average_gas_price_description')" placement="bottom" effect="dark">
                  <img src="@/assets/images/icon_help.png" alt="">
                </el-tooltip>
              </div>
              <span>
                {{ statisticsData.avg_gas_price ? statisticsData.avg_gas_price > 1000000 ? statisticsData.avg_gas_price.toFixed(0) : statisticsData.avg_gas_price.toFixed(4) : emptyText }}
              </span>
              <span class="charts">
              <div id="avgGasPriceChart" :style="{width: '186px', height: '50px'}"></div>
            </span>
            </div>
            <!-- 平均消息数量 -->
            <div class="item">
              <div class="title">
                <span :class="language">{{ $t('home.average_message_count') }}</span>
                <el-tooltip :content="$t('home.average_message_count_description')" placement="bottom" effect="dark">
                  <img src="@/assets/images/icon_help.png" alt="">
                </el-tooltip>
              </div>
              <span>
                {{ statisticsData.avg_messages_tipset ? statisticsData.avg_messages_tipset.toFixed(2) : emptyText }}
              </span>
              <span class="charts">
              <div id="avgMessageNumberChart" :style="{width: '186px', height: '50px'}"></div>
            </span>
            </div>
            
            <!-- 平均消息大小 -->
            <div class="item">
              <div class="title">
                <span :class="language">{{ $t('home.average_message_size') }}</span>
                <el-tooltip :content="$t('home.average_message_size_description')" placement="bottom" effect="dark">
                  <img src="@/assets/images/icon_help.png" alt="">
                </el-tooltip>
              </div>
              <span>
                {{ statisticsData.avg_message_size ? statisticsData.avg_message_size.toFixed(2) : emptyText }} Bytes
              </span>
              <span class="charts">
              <div id="avgMessageSizeChart" :style="{width: '186px', height: '50px'}"></div>
            </span>
            </div>
          </div>
        </div>
      </div>

      <div class="recent-data">
        <div class="main-content">
          <div class="block-height">
            <div class="header">
              <span>
                {{ $t('home.block_height') }}
              </span>
              <span class="cursor" @click="navigate('block-height',latestBlockHeader[0].block_header.height)">
                #{{ latestBlockHeader && latestBlockHeader.length > 0 ? latestBlockHeader[0].block_header.height : emptyText }} ({{ latestBlockHeader.length }})
              </span>
              <div class="more cursor" @click="navigate('list/block','')">
                <span>
                  {{ $t('home.all_block') }}
                </span>
                <img src="@/assets/images/icon_arrow_ios.png" alt="">
              </div>
            </div>
            <div class="body">
              <div v-for="(item, index) in latestBlockHeader" :key="index" class="block-item">
                <div class="base-info">
                  <div class="miner">
                    <span>{{ $t('home.miner') }}</span>
                    <span class="cursor" @click="navigate('account-detail',item.block_header.miner)">{{ item.block_header.miner }}</span>
                    <span>{{ getTimeString(item.block_header.timestamp) }}</span>
                  </div>
                  <div class="hash">
                    <span>{{ $t('home.block_hash') }}</span>
                    <span :title="item.cid" class="cursor" @click="navigate('block-detail',item.cid)">{{ getAddrFormat(item.cid,16) }}</span>
                  </div>
                  <div class="reward">
                    <span>{{ $t('home.reward') }}</span>
                    <span>{{ parseFloat(item.reward).toFixed(4) }} FIL</span>
                  </div>
                </div>
                <div class="messages cursor" @click="navigate('block-detail',item.cid)">
                  <span>{{ $t('home.message_count', [item.msg_cids ? item.msg_cids.length : 0]) }}</span>
                  <img src="@/assets/images/icon_arrow_ios.png" alt="">
                </div>
              </div>
            </div>
          </div>

          <div class="latest-message">
            <div class="header">
              <span>
                {{ $t('home.lastest_message') }}
              </span>
              <div class="more cursor" @click="navigate('list/message','')">
                <span>
                  {{ $t('home.all_message') }}
                </span>
                <img src="@/assets/images/icon_arrow_ios.png" alt="">
              </div>
            </div>
            <div class="body">
              <div v-for="(item, index) in latestMessage" :key="index" class="block-item">
                <!-- <div class="icon-wrapper">
                  <img src="@/assets/images/icon_email.png" alt="">
                </div> -->
                <div class="base-info">
                  <div class="address">
                    <span :title="item.cid" class="cursor" @click="navigate('message-detail',item.cid)">{{ getAddrFormat(item.cid,15) }}</span>
                    <span :class="item.exit_code == '0' ? 'success' : 'fail'">{{ item.exit_code == '0' ? $t('home.status.success') : $t('home.status.fail') }}</span>
                    <span>{{ parseFloat(item.msg.value).toFixed(4) }} FIL</span>
                  </div>
                  <div class="status">
                    <span>{{ $t('home.sender') }}</span>
                    <span :title="item.msg.from" class="cursor" @click="navigate('account-detail',item.msg.from)">{{ getAddrFormat(item.msg.from,6) }}</span>
                    <img src="@/assets/images/icon_arrow.png" alt="">
                    <span>{{ $t('home.receiver') }}</span>
                    <span :title="item.msg.to" class="cursor" @click="navigate('account-detail',item.msg.to)">{{ item.msg.to.length > 12 ? getAddrFormat(item.msg.to,4) : item.msg.to }}</span>
                    <span>{{ getTimeString(item.msgcreate) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="miner-ranking">
        <div class="main-content">
          <div class="title">
            <div class="text-wrapper">
              <span>{{ $t('home.miner_ranking') }}</span>
              <img src="@/assets/images/icon_help.png" alt="">
            </div>
            <div class="more cursor" @click="navigate('list/miner','')">
              <span>{{ $t('home.all_miner') }}</span>
              <img src="@/assets/images/icon_arrow_ios.png" alt="">
            </div>
          </div>
          <el-table :data="minerRankingData" header-row-class-name="table-header" border stripe>
            <!-- 排名 -->
            <el-table-column
              :label="$t('home.ranking')"
              :min-width="80"
              align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.rank == 1">
                  <img class="ranking-icon" src="@/assets/images/icon_ranking1.png" alt="">
                </template>
                <template v-else-if="scope.row.rank == 2">
                  <img class="ranking-icon" src="@/assets/images/icon_ranking2.png" alt="">
                </template>
                <template v-else-if="scope.row.rank == 3">
                  <img class="ranking-icon" src="@/assets/images/icon_ranking3.png" alt="">
                </template>
                <template v-else>
                  <span class="ranking-text">{{ scope.row.rank }}</span>
                </template>
              </template>
            </el-table-column>
            <!-- 矿工节点 -->
            <el-table-column
              :label="$t('home.miner_node')"
              :min-width="100"
              class-name="miner-column">
              <template slot-scope="scope">
                <span class="cursor" @click="navigate('account-detail',scope.row.miner_address)">{{ scope.row.miner_address }}</span>
              </template>
            </el-table-column>
            <!-- 归属团队 -->
            <el-table-column
              :label="$t('home.team')"
              :min-width="100">
              <template slot-scope="scope">
                <div class="team-wrapper">
                  <span>{{ scope.row.miner_name }}</span>
                </div>
              </template>
            </el-table-column>
            <!-- 有效算力/占比 -->
            <el-table-column
              :label="$t('home.effective_computing_power')"
              :min-width="120">
              <template slot-scope="scope">
                <div class="merge-wrapper">
                  <span>{{ scope.row.increased_power_str }}</span>
                  <span>{{ scope.row.power_rate }}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 出块/占比 -->
            <el-table-column
              :label="$t('home.block_count')"
              :min-width="120">
              <template slot-scope="scope">
                <div class="merge-wrapper">
                  <span>{{ scope.row.reward_in_24h }}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 挖矿收益/占比 -->
            <el-table-column
              :label="$t('home.income')"
              :min-width="140">
              <template slot-scope="scope">
                <div class="merge-wrapper">
                  <span>{{ scope.row.mining_efficiency }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- phone layout -->
    <div class="display-phone">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import { formatNumber, parseTime, formatHistoryTime, formatFileSize } from '@/utils'
import * as api from '@/api/common'
import * as helper from '@/utils/helper'
import { getAddrFormat } from '@/utils/helper'

export default {
  name: 'Home',

  components: {},
  data() {
    return {
      intervalToken: null,
      refreshInterval: 30,
      timerCounter: 0,
      emptyText: '...',
      tipset_height: '',
      totalMiners: 0,

      statisticsData: {},
      latestBlockHeader: [],
      latestMessage: [],
      minerRankingData: [
        { ranking: 1 }, { ranking: 2 }, { ranking: 3 }, { ranking: 4 }, { ranking: 5 }
      ],
      mapDataSource: [],
      mapChartOptions: {
        backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{ offset: 0, color: '#0090ff' }, { offset: 1, color: '#403859' }]),
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const seriesName = params.seriesName
            const value = params.value

            console.error(seriesName)
            console.error(value)
            return seriesName + '<br/>' + value
          }
        },
        toolbox: {
          show: false
        },
        brush: {
          geoIndex: 0,
          brushLink: 'all',
          inBrush: {
            opacity: 1,
            symbolSize: 14
          },
          outOfBrush: {
            color: '#000000',
            opacity: 0.2
          },
          z: 10
        },
        geo: {
          map: 'world',
          silent: true,
          emphasis: {
            label: {
              show: false,
              areaColor: '#c8c8c8'
            }
          },
          itemStyle: {
            borderWidth: 0.8,
            borderColor: '#ffffff'
          },
          left: '6%',
          top: '6%',
          bottom: '6%',
          right: '6%',
          roam: true
        },
        series: [
          {
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 6,
            data: [],
            activeOpacity: 1,
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            itemStyle: {
              borderColor: '#ffffff',
              color: '#0090ff'
            },
            emphasis: {
              label: {
                show: true
              }
            }
          }
        ]
      }
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
    language: function() {

    },

    keyword: function(value) {
      if (value) {
        console.error('active search')
        console.error(value)

        this.$store.dispatch('SetKeyword', '')
      }
    }
  },

  created() {
    this.refresh()
    this.startTimer()
  },

  mounted() {
    // this.drawMapChart()
    
  },

  beforeDestroy() {
    this.clearTimer()
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

    // 获取基础信息
    fetchBaseInfo() {
      api.fetchBaseInformation().then(response => {
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          // "tipset_height": "1408",//区块高度
          // ?? 全网算力
          // ?? 全网矿工数
          // "outstanding": "1.250",//全网可用 && 流通中
          // "pledge_collateral": "0.000",//抵押代币
          // "head_update": "42",//最新出块时间
          // 平均出块时间：见下方
          // "block_reward": 5.4918373158284846,//每选票奖励
          // "avg_gas_price": 2.763,//平均gas
          // "avg_messages_tipset": 74.705,//平均消息数量
          // "avg_message_size": 236.261,//平均消息大小
          // "avg_block_tipset": "2.570"//平均每高度区块数量
          this.statisticsData = data
          this.tipset_height = data.tipset_height
        }
      }).catch(error => {
        console.error(error.message)
      })
    },

    fetchBlockTimeData() {
      api.fetchBlockTimeData().then(response => {
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          // "data": [
          //     {
          //         "time": "1595991600", //时间戳
          //         "block_time": "25"//出块时间
          //     },
          //     {
          //         "time": "1595995200",
          //         "block_time": "25"
          //     },
          // ],
          // "avg_blocktime": "25", //平均出块时间
          // "min": "25", //最小出块时间
          // "max": "25"//最大出块时间
          this.statisticsData.avg_blocktime = data.avg_blocktime
        }
      }).catch(error => {
        console.error(error.message)
      })
    },

    fetchLatestBlock(count = 10) {
      api.fetchLatestBlock(count).then(response => {
        // "block_header": [
        //   {
        //     "block_header": {
        //         "miner": "t08614",
        //         "tickets": "tiIzOs3RaEi/X2/phX1/ZfhCVp2MiV6WN4yrRmZB4FToRG+cJ7sL15guCqhY3yiKFT0BhQFPHnumbFfGllMA2yJ3WxIS+kEe/y4svCn9NHWFeOobg9nLscqKLWlcYq7a",
        //         "e_post_proof_len": 1,
        //         "parents": [],
        //         "parent_weight": "91180973",
        //         "height": "4948",
        //         "parent_state_root": "bafy2bzacedve5aat5vcuqrx5werwjqe5ip5ezq4fhufm4hqaa4hd6aeobgayq",
        //         "parent_message_receipts": "bafy2bzacediezoe7odmuua6ee2ihz766emj3fh5jrrth2ksxonjxxy7os3il6",
        //         "messages": "bafy2bzaceczzliklr2fzmik7fu46r7bycpnx7fhvac3uhxn4ikwekwf4akcpe",
        //         "bls_aggregate": {},
        //         "timestamp": "1596113260",
        //         "block_sig": {}
        //     },
        //     "cid": "bafy2bzacebfceoa5fex3c667qheslz6p75filsw6wnrnn4wcawnxal5h5mmgg",
        //     "size": "933",
        //     "msg_cids": [
        //         "bafy2bzaceay6qxpk7pgzdz52fgszqknb6bfdql5fusxzmwkc6ugwhrgqiexrw",
        //         "bafy2bzacedxykaulaxr4mnuf5wpnffepgaanvfoorjtyv6adjcblaoajf5mim"
        //     ],
        //     "reward": "5.49620466"
        //   },
        // ]
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          let blockHeight = 0

          if (data.block_header && data.block_header.length > 0) {
            const result = []
            blockHeight = data.block_header[0].block_header.height
            for (let index = 0; index < data.block_header.length; index++) {
              const element = data.block_header[index]
              if (element.block_header.height === blockHeight) {
                result.push(element)
              }
            }
            this.latestBlockHeader = result
          }
          this.tipset_height = data.block_header[0].block_header.height
        }
      }).catch(error => {
        console.error(error)
      })
    },

    fetchLatestMessage() {
      api.fetchLatestMsg().then(response => {
        //   "msg": [
        //     {
        //         "msg": {
        //             "to": "t05",
        //             "from": "t3slxe7vczkvljsuf5anfx6i3zuqtitcc6dussyxbkf7twqsazsmhidzveffbjvrtrcr53c32izhcfyfpxllma",
        //             "nonce": "2866",
        //             "value": "0",
        //             "gasprice": "0.000000000000000001",
        //             "gaslimit": "370979218",
        //             "method": "4",
        //             "params": "gYGCi9gqWCgAAYHiA5IgIID+iks8zL4WWUcK0CHxz82aWI4NrUexObofspOoEQ81GRAA9FgxA7NC87xSwMYTCvFVrd0jIKLWU4aWybB0Of6O5mRbiwpUGPTNTJN7c0r4Z2rpxRz0t0QA1LYBYBlGLRoACdSXRgALDzh7AEMAD+BAWGECif+lsGj8xygAtvGxvCUV8WXXwzMT1R+ITgumXbNWCj9VQV9Hg80oswVeEh1deqXlAgy2YCscqmL56fpvJGH3atgNfTrg3FkjILlW+kXbmpB4S5LXgpmbKhdhV8PH9RGl"
        //         },
        //         "cid": "bafy2bzaceaz3x2zw25q2ejpu5f2vvnnupu2wkndhboyerixjsuuji7dhh5yym",
        //         "sign_cid": "",
        //         "size": "299",
        //         "msgcreate": "1596182385",
        //         "height": "7713",
        //         "block_cids": [
        //             "bafy2bzacedeckv6eyfanyzdb2gczyhpwzb6dvp2wreelawaappmn33uxnmv4y",
        //             "bafy2bzaceawfsnc57trblw3spvpwjxr7fopgtqiwyjcokw6svrnt4kg2x6yxu",
        //             "bafy2bzacebmnv477exuxu74hbdjf3p57dgfns5ael6vndm4ha2c4cgyituena",
        //             "bafy2bzaceag57vivfusp5yp5ppnuupnsqxhsihmf7quwi5v3oct7y3mn4i6oa",
        //             "bafy2bzacecisevdodpwmx7o4viisybq343rufbpmmalwj6zi23q3gz4zrgrhi"
        //         ],
        //         "exit_code": "0",
        //         "return": "",
        //         "gas_used": "248229709",
        //         "method_name": "ChangePeerID"
        //     },
        //     {
        //         "msg": {
        //             "to": "t02276",
        //             "from": "t3xh6j5tpaldjhjb7wrcef5cy5rfegdeqitglroh3i4quszjq6kart7q4g65nwuss63ac6enspoxm5brcyuzca",
        //             "nonce": "261",
        //             "value": "8.278978215370450749",
        //             "gasprice": "0.000000000000000001",
        //             "gaslimit": "211225470",
        //             "method": "7",
        //             "params": "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"
        //         },
        //         "cid": "bafy2bzaceaccwr6uxv5hujfzn3cqic43vpb5hwadorssfur2o6xrp2zpy75ek",
        //         "sign_cid": "",
        //         "size": "2008",
        //         "msgcreate": "1596182385",
        //         "height": "7713",
        //         "block_cids": [
        //             "bafy2bzacedeckv6eyfanyzdb2gczyhpwzb6dvp2wreelawaappmn33uxnmv4y",
        //             "bafy2bzaceawfsnc57trblw3spvpwjxr7fopgtqiwyjcokw6svrnt4kg2x6yxu",
        //             "bafy2bzacebmnv477exuxu74hbdjf3p57dgfns5ael6vndm4ha2c4cgyituena",
        //             "bafy2bzaceag57vivfusp5yp5ppnuupnsqxhsihmf7quwi5v3oct7y3mn4i6oa",
        //             "bafy2bzacecisevdodpwmx7o4viisybq343rufbpmmalwj6zi23q3gz4zrgrhi"
        //         ],
        //         "exit_code": "0",
        //         "return": "",
        //         "gas_used": "140859980",
        //         "method_name": "ProveCommitSector"
        //     },
        //  ]
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          this.latestMessage = data.msg
        }
      }).catch(error => {
        console.error(error)
      })
    },

    getTimeString(time) {
      return formatHistoryTime(new Date().getTime() - time * 1000)
    },

    refresh() {
      this.fetchBaseInfo()
      this.fetchBlockTimeData()
      this.fetchLatestBlock()
      this.fetchLatestMessage()
      this.fetchBlocksWon()
      this.fetchTopPower()
      this.fetchAccountData()
      this.fetchTotalPowerGraphical()
      //获取基础信息列表
      this.fetchBaseInformationList()
    },

    secondRefresh() {
      this.statisticsData.head_update++
    },

    startTimer() {
      this.clearTimer()
      this.intervalToken = setInterval(() => {
        this.timerCounter++

        if (this.timerCounter >= this.refreshInterval) {
          this.timerCounter = 0
          this.refresh()
        } else {
          this.secondRefresh()
        }
      }, 1000)
    },

    clearTimer() {
      if (this.intervalToken) {
        clearInterval(this.intervalToken)
        this.intervalToken == null
      }
    },

    buildMapData() {
      const mapData = []
      if (this.mapDataSource && this.mapDataSource.length > 0) {
        this.mapDataSource.forEach(item => {
          const value = []
          const location = item.location
          value.concat(location)
          value.push(item.node_id)
          value.push(item.ip_address)

          mapData.push({ name: this.language === 'en' ? item.name_en : item.name, value: value })
        })
      }
      return mapData
    },

    drawMapChart() {
      const mapData = this.buildMapData()

      const mapChart = echarts.init(document.getElementById('mapChart'))
      this.mapChartOptions.series[0].data = []
      this.mapChartOptions.series[0].data.concat(mapData)
      console.error(this.mapChartOptions)
      mapChart.setOption(this.mapChartOptions)
    },

    // 获取 Blocks Won
    fetchBlocksWon() {
      api.fetchBlocksWon().then(response => {
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          const xdata = []
          const miners = []
          const series = []
          let maxLen = 0
          let tname, temp

          const minerList = data.list

          data.tipset_own = data.tipset_own.reverse()

          for (const i in data.tipset_own) {
            for (const y in data.tipset_own[i].tipset) {
              temp = data.tipset_own[i].tipset[y]
              tname = temp.miner_id
              if (!miners[tname]) {
                miners[tname] = []
                for (const item in data.tipset_own) {
                  miners[tname].push(0)
                }
              }
              if (maxLen < tname.length) {
                maxLen = tname.length
              }
              miners[tname][i] = temp.tick_count
            }
            xdata.push(data.tipset_own[i].height)
          }

          for (const name in miners) {
            series.push({
              name: name,
              type: 'bar',
              stack: 'one',
              data: miners[name]
            })
          }

          const blocksWonChart = echarts.init(document.getElementById('blocksWonChart'), 'light')
          blocksWonChart.resize()
          // 绘制图表
          blocksWonChart.setOption({
            title: {
              text: this.$t('home.lastest_block'),
              textStyle: {
                fontSize: 14, // 字体大小
                color: '#3C426B' // 字体颜色
              },
              left: 'center'
            },
            legend: {
              textStyle: {
                fontSize: 13, // 字体大小
                color: '#3C426B' // 字体颜色
              },
              type: 'scroll',
              orient: 'vertical',
              // pageIconColor: '#00a9eb',       // 可以点击的翻页按钮颜色
              //   pageIconInactiveColor: '#7f7f7f',  // 禁用的按钮颜色
              pageIconSize:11,
              pageButtonItemGap: 12,
              pageIcons:{
                vertical:[
                  "path://M247.68 693.44a32 32 0 1 1-47.36-42.88l288-320a32 32 0 0 1 47.36 0l288 320a32 32 0 1 1-47.36 42.88L512 399.68z",
                  "path://M512 624.32l264.32-293.76a32 32 0 1 1 47.36 42.88l-288 320a32 32 0 0 1-47.36 0l-288-320a32 32 0 0 1 47.36-42.88z"
                ],
              },
              right: 5,
              top: 35,
              itemWidth: 12,
              itemHeight: 3,
              // bottom: 1,
              formatter: function(params) {
                let str = params + '  '
                if (maxLen > params.length) {
                  str = params + '    '
                }
                for (const i in minerList) {
                  if (params === minerList[i].miner) {
                    str += Math.floor(minerList[i].percent * 100) / 100
                    // str += minerList[i].percent
                    break
                  }
                }
                return str + '  '
              }
            },
            grid: {
              top: '15%',
              right: '18%',
              left: '8%',
              bottom: '6%'
            },
            toolbox: {
              show: true
            },
            tooltip: {
              trigger: 'axis',
              textStyle: {
                align: 'left'
              },
              formatter: function(params) {
                let newParams = []
                const tooltipString = []
                newParams = [...params]
                newParams.sort((a, b) => {
                  return b.value - a.value
                })
                tooltipString.push(newParams[0].axisValue + ' <br/>')
                newParams.forEach((p) => {
                  const cont = p.marker + ' ' + p.seriesName + ': ' + p.value + '<br/>'
                  if (p.value > 0) {
                    tooltipString.push(cont)
                  }
                })
                return tooltipString.join('')
              }
            },
            xAxis: {
              data: xdata,
              axisLabel: {
                interval: 4, // 显示间隔
                textStyle: {
                  color: '#3C426B'
                }
                // rotate:30,
              },
              axisLine: {
                onZero: true,
                show: true,
                lineStyle: {
                  color: '#F5F6FC'
                }

              },
              axisTick: { // 刻度线
                show: false
              },
              splitLine: {
                show: true, // 显示分割线
                lineStyle: {
                  color: '#F5F6FC'
                }
              },
              splitArea: {
                show: false
              }
            },
            yAxis: {
              color: '#ffffff',
              axisLabel: {
                textStyle: {
                  color: '#3C426B'
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#F5F6FC'
                }
              },
              splitLine: {
                show: true, // 显示分割线
                lineStyle: {
                  color: '#F5F6FC'
                }
              },
              axisTick: { // y轴刻度线
                show: false
              },
              splitArea: {
                show: false
              }
            },
            series: series
          })
        }
      }).catch(error => {
        console.error(error)
      })
    },

    // 获取排行榜
    fetchTopPower() {
      this.isLoading = true
      api.fetchGrafanaRank(1, 10).then(response => {
        this.isLoading = false
        if (response.code !== 200) {
          return ''
        }

        const data = response.data.data
        // scope.row.mining_efficiency
        for (const i in data) {
          data[i].rank = 1 + parseInt(i)
          data[i].mining_efficiency = data[i].mining_efficiency.replace(/TiB/, 'TB')
          data[i].increased_power_str = data[i].increased_power_str.replace(/TiB/,"TB")
        }
        this.minerRankingData = data
      }).catch(error => {
        console.error(error)
      })
    },

    // 获取算力统计图表
    fetchTotalPowerGraphical() {
      api.fetchTotalPower().then(response => {
        const data = response.data
        if (data && data.data && data.data.length > 0) {
          this.statisticsData.quality_adjusted_power = data.data[data.data.length - 1].quality_adjusted_power
        }
      }).catch(error => {
        console.error(error)
      })
    },

    // 获取矿工列表
    fetchAccountData() {
      this.isLoading = true
      api.fetchAccountList(0, 1).then(response => {
        this.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          this.totalMiners = data.total
        }
      }).catch(error => {
        console.error(error)
      })
    },

     // 获取基础信息列表
    fetchBaseInformationList() {
      var that = this
      this.isLoading = true
      api.fetchBaseInformationList().then(response => {
        this.isLoading = false
        if (response.Status != 1) {
          console.info(result)
          return ""
        }

        var data = response.Result

      //         comCharts : {
      //   "newBlockTimeChart",
      //   "AvgBlockTimeChart",
      //   "blockRewardChart",
      //   "avgGasPriceChart",
      //   "avgMessageNumberChart",
      //   "avgMessageNumberChart",
      // },

        //that.comCharts
        var myCharts = {}
        var newData = []
        
        // for(var i = 0; i < that.myCharts.length;i++){
        //   data.forEach(item => {
        //     // newData[that.myCharts[i]] = item.
        //   });
        //   newData[that.myCharts[i]] = [];
        // }

        // this.setCommonChart()
        

      }).catch(error => {
        console.error(error)
      })
    },

    /**
     * 设置通用曲线
     */
    setCommonChart(name = 'avgMessageNumberChart',xdata = [1,1,1,1,1,1],seriesData = [1,1,1,1,1,1]){
      // 基于准备好的dom，初始化echarts实例
      const chart = echarts.init(document.getElementById(name))
      // const chart = echarts.init(document.getElementById('avgMessageChart'))
      chart.resize()
      chart.setOption({
        legend: {
            show: false,
        },
        grid: {
          left: 0,
          right:0,
          bottom: '100%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xdata,
          axisTick: { // y轴刻度线
            show: false,
          },
          axisLine: { // y轴
            show: false,
          },
          axisLabel: {
            show: false,
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show:false,
          },
          axisTick: { // y轴刻度线
            show: false,
          },
          axisLine: { // y轴
            show: false
          },
          min: 0,
          splitNumber: 5, // 显示点数
          axisLabel: {
            show: false,
          }
        },
        series: [{
          data: seriesData,
          lineStyle:{
            width:0.5,  //设置线条粗细
          },
          type: 'line',
          symbol: 'none',
          color: 'rgba(230,242,255,1)',
          name: '',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(237,244,255,1)'
              }, {
                offset: 1,
                color: 'rgba(249,251,254,0)'
              }]
            }
          }
        }]
      })
    }
  }
}

</script>

<style lang="scss">

</style>
