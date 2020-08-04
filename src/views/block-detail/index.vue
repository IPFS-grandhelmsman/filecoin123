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
              <span>
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
              <span>
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
              <span>
                {{ blockDetailData.block_header && blockDetailData.block_header.parent && blockDetailData.block_header.parent.length > 0 ? blockDetailData.block_header.parent[0] : '' }}
              </span>
            </div>

            <div class="parent-weight">
              <span>
                {{ $t('block_detail.parent_weight') }}
              </span>
              <span>

              </span>
            </div>

            <div class="ticket">
              <span>
                {{ $t('block_detail.ticket') }}
              </span>
              <span>

              </span>
            </div>

            <div class="state-root">
              <span>
                {{ $t('block_detail.state_root') }}
              </span>
              <span>

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
import { formatNumber, parseTime, formatHistoryTime, formatFileSize } from '@/utils'
// import * as api from '@/api/common'

export default {
  name: 'BlockDetail',

  data() {
    return {
      blockDetailData: {},
      blockMessageList: [],
      blockMessageTotal: 0
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
    this.mockBlockMessage()
    this.mockBlockDetailData()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,
    formatFileSize,

    // 模拟数据 # 区块消息 # =>messages/BlockMessages {method: "", begindex: "0", count: "25", block_cid: "bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i"}
    mockBlockMessage() {
      const data = {
        'msgs': [
          {
            'msg': {
              'to': 't04944',
              'from': 't3sl6vddsd4kh56wtibel3h7ttdwllhlgpazue5zntzmybyeuqbz7axbkhyaivfoxfobqaahwht7hw6ur32y3q',
              'nonce': '9409',
              'value': '13.079167101260781706',
              'gasprice': '0.000000000010000007',
              'gaslimit': '39633028',
              'method': '6',
              'params': 'igMZE2LYKlgpAAGC4gOB6AIgvUEUSywz73vIf0BkGPb64SPXFsJ6UKxfQ5BA5Oinf1AZF8CAGgAX10D0AAAA'
            },
            'cid': 'bafy2bzacedhuysoc6px3crbht3bzoznbocioz656yh453ylcji72w2e3hx7i2',
            'sign_cid': '',
            'size': '146',
            'msgcreate': '1596525990',
            'height': '9189',
            'block_cids': [
              'bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i'
            ],
            'exit_code': '0',
            'return': '',
            'gas_used': '26223789',
            'method_name': 'PreCommitSector'
          },
          {
            'msg': {
              'to': 't04944',
              'from': 't3sl6vddsd4kh56wtibel3h7ttdwllhlgpazue5zntzmybyeuqbz7axbkhyaivfoxfobqaahwht7hw6ur32y3q',
              'nonce': '9410',
              'value': '13.079167101260781706',
              'gasprice': '0.000000000010000007',
              'gaslimit': '38697028',
              'method': '6',
              'params': 'igMZFFDYKlgpAAGC4gOB6AIgtKcZTx7LQzvJbeD5MKHi92k2dRT5XRhpnVu37cUOUAAZF8CAGgAX10D0AAAA'
            },
            'cid': 'bafy2bzacecekchdxxxz5nqws2eq7gwnwq6y3gcckatevf2e6a5dsx2xwatyye',
            'sign_cid': '',
            'size': '146',
            'msgcreate': '1596525990',
            'height': '9189',
            'block_cids': [
              'bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i'
            ],
            'exit_code': '0',
            'return': '',
            'gas_used': '25934019',
            'method_name': 'PreCommitSector'
          },
          {
            'msg': {
              'to': 't04944',
              'from': 't3sl6vddsd4kh56wtibel3h7ttdwllhlgpazue5zntzmybyeuqbz7axbkhyaivfoxfobqaahwht7hw6ur32y3q',
              'nonce': '9411',
              'value': '13.077864543381960989',
              'gasprice': '0.000000000010000007',
              'gaslimit': '37085683',
              'method': '6',
              'params': 'igMZE9fYKlgpAAGC4gOB6AIgLjUEo9NzDunC6Q8fA312k0easC1BqMmNHSrjL8ecqSsZF8CAGgAX10D0AAAA'
            },
            'cid': 'bafy2bzaceancfehjo42qmbtbyk2uwemt7pptr6ohuou6waihbgoptrifupdus',
            'sign_cid': '',
            'size': '146',
            'msgcreate': '1596525990',
            'height': '9189',
            'block_cids': [
              'bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i'
            ],
            'exit_code': '0',
            'return': '',
            'gas_used': '25649019',
            'method_name': 'PreCommitSector'
          },
          {
            'msg': {
              'to': 't04944',
              'from': 't3sl6vddsd4kh56wtibel3h7ttdwllhlgpazue5zntzmybyeuqbz7axbkhyaivfoxfobqaahwht7hw6ur32y3q',
              'nonce': '9412',
              'value': '13.076547861924003756',
              'gasprice': '0.000000000010000008',
              'gaslimit': '38680528',
              'method': '6',
              'params': 'igMZFV/YKlgpAAGC4gOB6AIgGOc/8hvga57NXmHt/eK8HxrniWehSbWUwp4y80sW2hEZF8CAGgAX10D0AAAA'
            },
            'cid': 'bafy2bzacedyfl5mvj5bqzwrnltff7bkzuqdktdqiam4boordpeidzyrx5dxwg',
            'sign_cid': '',
            'size': '146',
            'msgcreate': '1596525990',
            'height': '9189',
            'block_cids': [
              'bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i'
            ],
            'exit_code': '0',
            'return': '',
            'gas_used': '25876019',
            'method_name': 'PreCommitSector'
          }
        ],
        'total': '4'
      }
    },

    // 模拟数据 # 区块详情 # => tipset/BlockByCid {cid: "bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i"}
    mockBlockDetailData() {
      const data = {
        'blocks': [
          {
            'block_header': {
              'miner': 't04944',
              'tickets': 'r78Vaks5ZRdm+kzFdZYKVHQfvMgctvXoKQITeApXPoZ0Lu011RAQKTzY09XXXakkA41XYiu6K//JpYFOZ/aK/trLbEHOq6nJO2ExlsGKAtHRUoMSd5RDpGslWePdpPuf',
              'e_post_proof_len': 1,
              'parents': [
                'bafy2bzacedmn4dwo2g6fxxh7cvitawou63y73for7yncqwllbavyn5p5axu2y'
              ],
              'parent_weight': '157097783',
              'height': '9189',
              'parent_state_root': 'bafy2bzacecxehuznblajk6imhheqbjakid4ogzfqokk4chc53kfjbg2q3hhhc',
              'parent_message_receipts': 'bafy2bzaceadjjj4lusmd47aftofxfurhf5c77xkti3i6c4ptkaq3dwj4grgcs',
              'messages': 'bafy2bzacebszjgvus3gsfz7pad3azudklbjjq5ba5gp5z3m25lldeeeasuugq',
              'bls_aggregate': {
                'type': '2',
                'data': 'jtHtfxUMPjsm18X+XjtM5WayNtZ1x5G3hcdGM/a3cectXMCg6aLzZAJexg6tdtvRDZCg8WiBZgexCj+K3ciBsjAodJlEITEesJojjnEyScSkOk/mNUM5ZEIbk8DJxADq'
              },
              'timestamp': '1596525990',
              'block_sig': {
                'type': '2',
                'data': 'ijJy6aJBY4uo2xkStWEBGHKjKs042gvm6ntixCj6zqPIE+SqVfIjPHtuCiRuaFQFDKrymybVEe99cOPSkIoJMlv5lguR4iQ6Rlav5lO/9HKwvUMVOXT5WJRJzNEe9bMB'
              }
            },
            'cid': 'bafy2bzacec7rsex3oggm6u3eisa4ga4qdmqhbfnf6jmkkbdelnioaph3zfc7i',
            'size': '890',
            'msg_cids': [
              'bafy2bzacedhuysoc6px3crbht3bzoznbocioz656yh453ylcji72w2e3hx7i2',
              'bafy2bzacecekchdxxxz5nqws2eq7gwnwq6y3gcckatevf2e6a5dsx2xwatyye',
              'bafy2bzaceancfehjo42qmbtbyk2uwemt7pptr6ohuou6waihbgoptrifupdus',
              'bafy2bzacedyfl5mvj5bqzwrnltff7bkzuqdktdqiam4boordpeidzyrx5dxwg'
            ],
            'reward': '7.26778669'
          }
        ]
      }

      this.blockDetailData = data.blocks && data.blocks.length > 0 ? data.blocks[0] : {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
