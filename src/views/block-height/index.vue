<template>
  <div class="block-height-container">
    <div class="display-pc-and-pad">
      <div class="main-content">
        <div class="table-title">
          <span>
            {{ $t('block_height.title') }}
          </span>
          <span>
            #{{ blockHeight }}
          </span>
        </div>
        <el-table :data="blockListData" :span-method="calcRowSpan" border stripe>
          <el-table-column
            :label="$t('common_list.block.block_height')"
            class-name="block-height-column"
            min-width="60">
            <template slot-scope="scope">
              #{{ scope.row.data ? scope.row.data.block_header.height : '' }}
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('common_list.block.hash')"
            :show-overflow-tooltip="true"
            class-name="hash-column"
            min-width="180">
            <template slot-scope="scope">
              <span :title="scope.row.data.cid" @click="navigate('block-detail',scope.row.data.cid)">{{ scope.row.data ? getAddrFormat(scope.row.data.cid,18) : '' }}</span>
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
              {{ scope.row.data ? scope.row.data.reward : '' }}
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
  name: 'BlockHeight',

  data() {
    return {
      blockHeight: this.$route.params.value,
      blockListData: []
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

  },

  created() {
    this.fetchBlockData()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,
    getAddrFormat,

    navigate(url, selector) {
      helper.navigate(this, url, selector)
    },

    calcRowSpan({ row, column, rowIndex, columnIndex }) {
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
      if (data && data.tipset && data.tipset.length > 0) {
        const groupList = data.tipset
        if (groupList && groupList.length > 0) {
          for (let i = 0; i < groupList.length; i++) {
            const blockItem = groupList[i]
            temp.push({ isRowSpan: i === 0, spanRows: groupList.length, data: blockItem })
          }
        }
      }
      this.blockListData = temp
    },

    fetchBlockData() {
      var that = this
      that.isLoading = true
      api.fetchBlockList(parseInt(that.blockHeight) + 7, 15).then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          data.tipsets.forEach(item => {
            if (item.tipset.length > 0 && item.tipset[0].block_header.height === that.blockHeight) {
              that.transferBlockData(item)
              return
            }
          })
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
