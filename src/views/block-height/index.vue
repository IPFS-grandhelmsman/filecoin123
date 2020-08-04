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
            min-width="60">
            <template slot-scope="scope">
              #{{ scope.row.data ? scope.row.data.block_header.height : '' }}
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('common_list.block.hash')"
            min-width="180">
            <template slot-scope="scope">
              {{ scope.row.data ? scope.row.data.cid : '' }}
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
            min-width="60">
            <template slot-scope="scope">
              {{ scope.row.data ? scope.row.data.block_header.miner : '' }}
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
// import * as api from '@/api/common'

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
    this.mockBlockData()
  },

  methods: {
    formatNumber,
    parseTime,
    formatHistoryTime,

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

    mockBlockData() {
      const data = {
        'tipset': [
          {
            'block_header': {
              'miner': 't05545',
              'tickets': 'sZ++RUQ8WNZiZcD6dG5IYRVs/NhiEp4fDXV88g1BdvFuaZdcYpr6EhYROEqt5nM1CvDakZpgSUoznfseYMWDMgQq+UXCTwDw35sbixgaNSIknzY8RMMbxtDg5E0QQU0O',
              'e_post_proof_len': 1,
              'parents': [],
              'parent_weight': '109703429',
              'height': '6515',
              'parent_state_root': 'bafy2bzacechybbe5b2dqekoghmok632jbzkwyzysauz7hk63dy7vfci65gsn6',
              'parent_message_receipts': 'bafy2bzacebchph5bv5s7xwru6dbgvdzul7sofldi7vo6pvoteurexa275gjr4',
              'messages': 'bafy2bzacedinxuq7bsdt6muo46nkoafutavruw6tg4za5lehirq747wgfwr5a',
              'bls_aggregate': {},
              'timestamp': '1596445770',
              'block_sig': {}
            },
            'cid': 'bafy2bzaceau7lf7v24q73l3htn6yalhivrkrjtb4pe36no7nntmhwbrimccyq',
            'size': '1062',
            'msg_cids': [
              'bafy2bzacecwiex65mqcabm5g7jzqb3utdxaftces3ooysf6vugyueslb6cbxm',
              'bafy2bzaced45mher7rg4wnhflx5vutqflmbrftgv7fzdexm5wcvyekysirp5q'
            ],
            'reward': '7.25651342'
          },
          {
            'block_header': {
              'miner': 't02644',
              'tickets': 'uNnQhae7IhbUXmwRT3DymKiiT+DMEa2lQDJpdbDhLEtDPKKiCqhLzjofKA0PzjE6FW2JewVckaMmQZYWzl4MqzzygRt3sy8HzoxqMUt7AY8BjYECmIf/xQJu6D1f0Bkw',
              'e_post_proof_len': 1,
              'parents': [
                'bafy2bzaceb6t5wqpb34vffwfxzscsireens52vsiguacozvv7r5tbr66v6txq',
                'bafy2bzacebtsertlr3vktwrdabrua6dlsw6mb7ra32e3ayh4eygkndcfkujhw',
                'bafy2bzacebmhxv65tbp2m3bmt3rnzm7lcivnzhsp742ei2zjxc4cbxzjseyj2',
                'bafy2bzacedvvqck3u5fh2fb7yg2ty7uz627bhcclzgkzzrtbf65bhwiblxgzc',
                'bafy2bzacecylkhjfmlfjcwfqqbciugpygskwppkcpe72ueg2tq7xp5q3lgplo'
              ],
              'parent_weight': '109703429',
              'height': '6515',
              'parent_state_root': 'bafy2bzacechybbe5b2dqekoghmok632jbzkwyzysauz7hk63dy7vfci65gsn6',
              'parent_message_receipts': 'bafy2bzacebchph5bv5s7xwru6dbgvdzul7sofldi7vo6pvoteurexa275gjr4',
              'messages': 'bafy2bzacebslizrl2qndbblv2wjimvzitingwsiuqq5vct23th25sgxobvai2',
              'bls_aggregate': {
                'type': '2',
                'data': 'tUN2IQ8EpC3fUlrBuB3wH9pVnDOcgDRUPVpMC1fnGLn+gLlVXUOoeuJ7dpul7+38AqWtPb0sVJrAuKfvfeHbU5iLvhpa1zXkRg+lIXHB5gtfeSYmzfKThQqDo0kLnFbG'
              },
              'timestamp': '1596445770',
              'block_sig': {
                'type': '2',
                'data': 'ljQF1Vo8Mj12QpB9N+eGJmdxy4/KviyIzW83trEKGZWhKfLuX0lXr0Dhs3r3Cmf9CYCCu57tDI4IVZAn1DSRomt3Qtm1L+H2JBCDhdGxhCrgHxmqHgkccQJubwKrfg3k'
              }
            },
            'cid': 'bafy2bzaceahefps27rpyzniaz6nikc5pyc6it4nja2pi7okgoyngmno2aewu2',
            'size': '1062',
            'msg_cids': [
              'bafy2bzacecroz6i5ugc6cntbejcrupk7f3mbi2swytmemvnfa72yeepgbdl7a',
              'bafy2bzacecxgq33y3cyvnzhif7i5y35e7vx3gceeez4foshrremom2hx2yyei',
              'bafy2bzacebnpuqihehh2jnbr3euaibrq7w2nljzj7spo7x7nh7nwf4vcgkhau',
              'bafy2bzaceduhggkg2ule7ya7cl45qfjcxofrmlgmwgt6elljes66truvbwiku',
              'bafy2bzacebi7mlhdts62wnxm4of3nxwtdffhc7gcqmqolky7siymtmjhbx3vs',
              'bafy2bzacecydcq4fnkle3lnenc3d4byc2zm63nf6gablo7qngjj5fp6l3jysk',
              'bafy2bzacebaacr4ih76vcvavv57dkwoymotztmzjdxvkk266g2i4wq2mjsnrm',
              'bafy2bzaceb2rt7xr52uedpnutp6t3snouktaqb5ygksta33yyygzgzlhhpbay',
              'bafy2bzaced6vht5evdniabzltmac7zwtzejseu2l3ajemwym46v4e2irz4hy6',
              'bafy2bzacedtha5ujfqsdz2ipayak62inikgzbtaq2wxepkjffj6kz23o6cf5m',
              'bafy2bzacea6dqza6cyjxpfooznrsir3bxufppbv45jl6mypmtgqm447bki5ma',
              'bafy2bzaceb22petfccwp3ivn2h57jpmhff5f5yixxxu2puqwn4hnrc775hhhc',
              'bafy2bzaceaq2lylzjw2ixi2iph5dfyvuysd6xyszejmzwy4yhpum3dsl633c4',
              'bafy2bzacecshmrg755vjdqnlu2h6xgbjtuvibtbzpbdxuasdswg4c2xcgsbae',
              'bafy2bzacebri73cjt647uzftuxioiv5y6lc7vabasiltubyp6ft7z3qjaf5t6',
              'bafy2bzacebg2bkxjvmtfkhgmdr3p66ftppyefc3rw6fwq4g7linjdc5p2rvx2',
              'bafy2bzacedkvejhzuua6rl2l3enain7yax2xwko6jpxolbezhcav4z6ufmb32',
              'bafy2bzacebg6haiiat3rhypphghxddjkdwhdwctg5hruta74kfc3nwhgjkv7i',
              'bafy2bzaceb76e7472xhwrjbiyjtgum6xdv6xytm64verholl3mecgof2menei',
              'bafy2bzacedthfj2pxrterzblw4evvwcwk4a3d245b34fzzp7ekrudrugimyfu',
              'bafy2bzaceav6bnziggdmdgstmz3tffvabqzyzkjdrxuxxaevos6piaw7ibwos',
              'bafy2bzacec7adzqnmvn3e7lgucorgbf4nba3kkd77qjt4k6vfijm57am3ml7m',
              'bafy2bzacebs463gsy6nk7njzybbkmroscgb7ksrk6djr66supmfircjd4o3as',
              'bafy2bzacecnlh4xq7i6bfaoszixe5cuarhyvuylapkepez7v7ps7iaiaedz6w'
            ],
            'reward': '284.30315503'
          },
          {
            'block_header': {
              'miner': 't03518',
              'tickets': 'qLz1TVxHyET1i81Rzz2TUMOGbrQflfWOWHsYm8AwmlthVlMkiH1DhR38HwiFZpJYELQTDruad+4AP7/+xOhGCG2NsWRHDZk9ZlvTqVXcwL7JJQsFoGWG1I8K/Qrap/ZT',
              'e_post_proof_len': 1,
              'parents': [
                'bafy2bzaceb6t5wqpb34vffwfxzscsireens52vsiguacozvv7r5tbr66v6txq',
                'bafy2bzacebtsertlr3vktwrdabrua6dlsw6mb7ra32e3ayh4eygkndcfkujhw',
                'bafy2bzacebmhxv65tbp2m3bmt3rnzm7lcivnzhsp742ei2zjxc4cbxzjseyj2',
                'bafy2bzacedvvqck3u5fh2fb7yg2ty7uz627bhcclzgkzzrtbf65bhwiblxgzc',
                'bafy2bzacecylkhjfmlfjcwfqqbciugpygskwppkcpe72ueg2tq7xp5q3lgplo'
              ],
              'parent_weight': '109703429',
              'height': '6515',
              'parent_state_root': 'bafy2bzacechybbe5b2dqekoghmok632jbzkwyzysauz7hk63dy7vfci65gsn6',
              'parent_message_receipts': 'bafy2bzacebchph5bv5s7xwru6dbgvdzul7sofldi7vo6pvoteurexa275gjr4',
              'messages': 'bafy2bzacechv7qzoww2o43xxnjqtg7fmgncy45jxva4aehptka7xo2ryivvqu',
              'bls_aggregate': {
                'type': '2',
                'data': 'mQexnxyxJitfpPM7HdlzyBaGbjX3tO7t0RZP310BmpBon63LE1sPQxvrGDaY9N08GbFY5tvA928ypt17UfawENzWhj0mZ+3SH8EJF3wNsjLCmQVOyacd8aeKH5NDN+FT'
              },
              'timestamp': '1596445770',
              'block_sig': {
                'type': '2',
                'data': 'oHqZjfjliL1CRBmh4N3TfrIWbMfq8VAvbHFQN8hBFl00/tZprdwc+tlyU9R5KGgZCOjBEvAW9UimV3noAfY8b3vddTW7M9lX62lhXjgudzJrVTNWRu0dI8vMdzL1UrcP'
              }
            },
            'cid': 'bafy2bzacebgwjylpgz2emgrobcf4nuc6udqjvq6oj3zbnhg5jgoytjvgh4orq',
            'size': '1062',
            'msg_cids': [
              'bafy2bzaceduhggkg2ule7ya7cl45qfjcxofrmlgmwgt6elljes66truvbwiku',
              'bafy2bzacebaacr4ih76vcvavv57dkwoymotztmzjdxvkk266g2i4wq2mjsnrm',
              'bafy2bzaced6vht5evdniabzltmac7zwtzejseu2l3ajemwym46v4e2irz4hy6',
              'bafy2bzacedtha5ujfqsdz2ipayak62inikgzbtaq2wxepkjffj6kz23o6cf5m',
              'bafy2bzacea6dqza6cyjxpfooznrsir3bxufppbv45jl6mypmtgqm447bki5ma',
              'bafy2bzaceaq2lylzjw2ixi2iph5dfyvuysd6xyszejmzwy4yhpum3dsl633c4',
              'bafy2bzacecshmrg755vjdqnlu2h6xgbjtuvibtbzpbdxuasdswg4c2xcgsbae',
              'bafy2bzacebri73cjt647uzftuxioiv5y6lc7vabasiltubyp6ft7z3qjaf5t6',
              'bafy2bzacebg2bkxjvmtfkhgmdr3p66ftppyefc3rw6fwq4g7linjdc5p2rvx2',
              'bafy2bzacebg6haiiat3rhypphghxddjkdwhdwctg5hruta74kfc3nwhgjkv7i',
              'bafy2bzaceb76e7472xhwrjbiyjtgum6xdv6xytm64verholl3mecgof2menei',
              'bafy2bzaceav6bnziggdmdgstmz3tffvabqzyzkjdrxuxxaevos6piaw7ibwos',
              'bafy2bzacec7adzqnmvn3e7lgucorgbf4nba3kkd77qjt4k6vfijm57am3ml7m',
              'bafy2bzacebrzgstzw37orxii6fsldpn7vmvb7ptjy5kyv3x7uozgh3rvc57z2',
              'bafy2bzacedijvdfvehvxpwxh24kjemgpsd5fcbvypg7cqnsoboiefhsayutwk',
              'bafy2bzacecabgwf6gclvnjvxcfiyqfnypnq3s4qshrbwzvifb2o77fepbetsm',
              'bafy2bzacebs463gsy6nk7njzybbkmroscgb7ksrk6djr66supmfircjd4o3as',
              'bafy2bzaceadmk4njpj6rkbd4pbrg2ukhfnxcr2pn2fafguyvdxgfo5jz3pogs',
              'bafy2bzaceaaoq72xlswhhd5reb4wb5d3bytinwf27oc4lo2retnsiwl2n7dam',
              'bafy2bzacec67ehf5vny6vwas2p5iwly7g6ebhfrqbt5hsgmvcsbredlkxhqai',
              'bafy2bzacecrbyhuqv7ufo7afuy2yrienhnncs6p2zswpsnn565qpzh26rfasu',
              'bafy2bzaceaoy6gtygwvaokxe33v3q5pa3e6dvaz52zmilwamahmz3endjolxe',
              'bafy2bzacebejy3e5toyzcracq43poitwey6hnwlnv5ohzwocg5sxplknajgeu',
              'bafy2bzaceb4h7n6l26j4fk2hd3wgr4kamd4pz3gjixgebiuwyemszo2w3cr72',
              'bafy2bzacedbtoehy4432lxfui6fwl7bdskyfjncvokt6et5h5rxlauxjzcths',
              'bafy2bzacedye6mdjecohwhngl7jr6rl5t3x3qswhljtc4zxw5shifsmwrdgdk',
              'bafy2bzacebfndkttrrye545ehbqywtojgpqet2cnybmfxtsklhxg2hnipkxky',
              'bafy2bzacedmnmdmh2lec6xjog5hqslqa5bi3mb345mxdoc72kg7skxuzcucl2',
              'bafy2bzaceb62lsz2iirmagedliee44sjuquklrwvnkw73s2wvffmnooad5fvk',
              'bafy2bzacecroz6i5ugc6cntbejcrupk7f3mbi2swytmemvnfa72yeepgbdl7a',
              'bafy2bzaceaa4ncgh4gg3hyfn7d4zuwql46dximzymm4bzzorqkjzq4qaiv64s',
              'bafy2bzaceatjyeg6zg3somtgpphl7onh3bf7kgzjkiywkndykwqvvb65sv44m',
              'bafy2bzacecc6cewmeorzqilhs74rsxtzlqxf44ugxxuogoulbeysabtgq4zi2',
              'bafy2bzacedfmdvdy2avzihvewkfrea65tjdu2kmmsyxiluqe5jtchpjrkrcg2'
            ],
            'reward': '255.24895534'
          },
          {
            'block_header': {
              'miner': 't01000',
              'tickets': 's53GKKxEWYogMalqsbCfqVAupAQFlS4dPXSrsij0/pFHUGUnHCNKV2ieGoJfYaC/AXtMa0wU+jVeTT2pGhl/+fYzoNS+cXiUixiCWCAIYRvISvC8arBZaf10ip3y6FWf',
              'e_post_proof_len': 1,
              'parents': [
                'bafy2bzaceb6t5wqpb34vffwfxzscsireens52vsiguacozvv7r5tbr66v6txq',
                'bafy2bzacebtsertlr3vktwrdabrua6dlsw6mb7ra32e3ayh4eygkndcfkujhw',
                'bafy2bzacebmhxv65tbp2m3bmt3rnzm7lcivnzhsp742ei2zjxc4cbxzjseyj2',
                'bafy2bzacedvvqck3u5fh2fb7yg2ty7uz627bhcclzgkzzrtbf65bhwiblxgzc',
                'bafy2bzacecylkhjfmlfjcwfqqbciugpygskwppkcpe72ueg2tq7xp5q3lgplo'
              ],
              'parent_weight': '109703429',
              'height': '6515',
              'parent_state_root': 'bafy2bzacechybbe5b2dqekoghmok632jbzkwyzysauz7hk63dy7vfci65gsn6',
              'parent_message_receipts': 'bafy2bzacebchph5bv5s7xwru6dbgvdzul7sofldi7vo6pvoteurexa275gjr4',
              'messages': 'bafy2bzacebgyz2d53arrvtjuplx6vuqdmiq6pqt2dr77phy62oqr2slmg475a',
              'bls_aggregate': {
                'type': '2',
                'data': 'k3UlYNgXW/JQEoc9kTgNJxtBE4UcKhjxmTUAuXjUCAWlMMWkYuFsa6+2unHRiIU4F9PwisUrBvmCUUjLi4BpxBecRe+WopS5XUZPsMz5raFtofqdI6v8SYwKduUeYLcT'
              },
              'timestamp': '1596445770',
              'block_sig': {
                'type': '2',
                'data': 'hcfK77N22AaQuNt/7fMZvLJ8G8SdYwdkLkD8JCvm9Tjtzxu1P3u5UTDh3PewLuUoDo4nZNckltSCGGSN9qy31G9NJR79zoN5Mqzsz8G/gOs658CBMnfiRxeskoXiLXJj'
              }
            },
            'cid': 'bafy2bzaceah77hhqxj3hgp65bg4qgudiro7n24evp7cyvlem4osjia32itnl6',
            'size': '1062',
            'msg_cids': [
              'bafy2bzaceduhggkg2ule7ya7cl45qfjcxofrmlgmwgt6elljes66truvbwiku',
              'bafy2bzacebi7mlhdts62wnxm4of3nxwtdffhc7gcqmqolky7siymtmjhbx3vs',
              'bafy2bzacecydcq4fnkle3lnenc3d4byc2zm63nf6gablo7qngjj5fp6l3jysk',
              'bafy2bzacebaacr4ih76vcvavv57dkwoymotztmzjdxvkk266g2i4wq2mjsnrm',
              'bafy2bzaced6vht5evdniabzltmac7zwtzejseu2l3ajemwym46v4e2irz4hy6',
              'bafy2bzacedtha5ujfqsdz2ipayak62inikgzbtaq2wxepkjffj6kz23o6cf5m',
              'bafy2bzacea6dqza6cyjxpfooznrsir3bxufppbv45jl6mypmtgqm447bki5ma',
              'bafy2bzaceaq2lylzjw2ixi2iph5dfyvuysd6xyszejmzwy4yhpum3dsl633c4',
              'bafy2bzacecshmrg755vjdqnlu2h6xgbjtuvibtbzpbdxuasdswg4c2xcgsbae',
              'bafy2bzacebri73cjt647uzftuxioiv5y6lc7vabasiltubyp6ft7z3qjaf5t6',
              'bafy2bzacebg2bkxjvmtfkhgmdr3p66ftppyefc3rw6fwq4g7linjdc5p2rvx2',
              'bafy2bzacebg6haiiat3rhypphghxddjkdwhdwctg5hruta74kfc3nwhgjkv7i',
              'bafy2bzaceb76e7472xhwrjbiyjtgum6xdv6xytm64verholl3mecgof2menei',
              'bafy2bzacec7adzqnmvn3e7lgucorgbf4nba3kkd77qjt4k6vfijm57am3ml7m',
              'bafy2bzacecabgwf6gclvnjvxcfiyqfnypnq3s4qshrbwzvifb2o77fepbetsm',
              'bafy2bzacec246ya27i5ryifc7yip6khsfv36fjrprsxnsmk7kgtgwxf5gzkoq',
              'bafy2bzaceahzfzgmpdg5dstmevi3ptqw2yry4iprkhjg56nktnfjhwzllh3qi',
              'bafy2bzacedapmx4l3w4tgmsk2ia4tsd652u3s4thohpvs2mt4tx4cqhn4jtyw',
              'bafy2bzaceblt35xg7yucwe2drbw6ziw6lenkdzrwpxqvsfymry47mgwlruxka',
              'bafy2bzacecrdvd7zcj7ebvxcknaci5vcrgmynamu7lnm4glgb2mia6yftnlfw',
              'bafy2bzaceay7awk4op4cbpddjhgt5ln52kgtk7d4ijjuqwfrlz7qsntamutne',
              'bafy2bzaced7xcpuicw76svnlwo5jkz4i4l5hcjd3mdpdjn4atx5pane4un674',
              'bafy2bzacecwiex65mqcabm5g7jzqb3utdxaftces3ooysf6vugyueslb6cbxm',
              'bafy2bzacecnlh4xq7i6bfaoszixe5cuarhyvuylapkepez7v7ps7iaiaedz6w',
              'bafy2bzacedeskzxflx4ihhqifttjlst2i2q35pk7mqg73mdaama5x5y32ikn2',
              'bafy2bzacedsr6ty5d4txfhkaw5kl2q5hvqdq6x6y6lfugryxhsq5mqu4cqwvu',
              'bafy2bzacebtpateikse4brzexyep7nehksjhuo7bjlaccek65xjcru7ajnboq'
            ],
            'reward': '274.49225457'
          }
        ],
        'min_ticket_block': 'bafy2bzaceau7lf7v24q73l3htn6yalhivrkrjtb4pe36no7nntmhwbrimccyq'
      }

      this.transferBlockData(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
