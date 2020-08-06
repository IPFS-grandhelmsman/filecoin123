<template>
  <div class="peer-map-container">
    <div class="display-pc-and-pad">
      <div class="content">
        <div id="mapChart" :style="{width: '1200px', height: '800px'}"></div>
      </div>
    </div>
    <div class="display-phone">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import world from 'echarts/map/json/world.json'
import * as api from '@/api/common'
import { mapGetters } from 'vuex'

echarts.registerMap('world', world)
export default {
  name: '',
  data() {
    return {
      peers: []
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
      this.fetchPeerMap()
    }
  },

  created() {
  },

  mounted() {
    this.fetchPeerMap()
  },

  methods: {

    makeMapData(geoCoordMap, rawData) {
      const mapData = []
      for (let i = 0; i < rawData.length; i++) {
        const geoCoord = geoCoordMap[rawData[i][0]]
        if (geoCoord) {
          mapData.push({
            name: rawData[i][0],
            value: geoCoord.concat(rawData[i].slice(1))
          })
        }
      }
      return mapData
    },
    fetchPeerMap() {
      const that = this

      that.isLoading = true
      api.fetchPeerMap().then(response => {
        that.isLoading = false
        const result = response.res
        const data = response.data
        if (result) {
          console.info(result)
        }
        if (data) {
          const geoCoordMap = []
          const rawData = []
          let name = ''
          data.peer_point.forEach(item => {
            name = item.location_en
            if (that.language === 'zh') {
              name = item.location_cn
            }

            geoCoordMap[name] = [item.longitude, item.latitude]
            that.peers[name] = item.peers
            rawData.push([name])
          })
          that.assignMapData(that, geoCoordMap, rawData)
        }
      }).catch(error => {
        console.error(error)
      })
    },
    assignMapData(that, geoCoordMap, rawData) {
      const mapChart = echarts.init(document.getElementById('mapChart'), 'light')
      mapChart.resize()
      // 绘制图表
      mapChart.setOption({
        // backgroundColor:"#F5F6FC",
        tooltip: {
          trigger: 'item',
          textStyle: {
            align: 'left'
          },
          formatter: function(params) {
            let str = ''
            if (that.peers[params.name]) {
              that.peers[params.name].forEach(item => {
                if (str) {
                  str += '<br/>'
                }
                str += that.$t('common.peer') + 'ID : ' + item.peer_id + '<br/>' + 'IP : ' + item.ip
              })
            }
            // return str + '<br/>' + "位置 : " + params.name + ' : ' + value;
            return str + '<br/>' + that.$t('common.location') + ' : ' + params.name
          }
        },
        toolbox: {
          show: true,
          left: 'right',
          iconStyle: {
            normal: {
              borderColor: '#ddd'
            }
          },
          feature: {},
          z: 202
        },
        geo: {
          map: 'world',
          silent: true,
          emphasis: {
            label: {
              show: false,
              areaColor: '#eee'
            }
          },
          itemStyle: {
            borderWidth: 0.2,
            borderColor: '#404a59',
            areaColor: '#dadff2' // 区域颜色
          },
          left: '1%',
          top: 40,
          bottom: '10%',
          right: '1%',
          roam: true
        },
        grid: [{
          show: true,
          left: 0,
          right: 0,
          top: '100%',
          bottom: 0,
          borderColor: 'transparent',
          backgroundColor: '#404a59',
          z: 99
        }],
        parallel: {
          top: '50%',
          left: 60,
          right: 20,
          bottom: 100,
          axisExpandable: true,
          axisExpandCenter: 15,
          axisExpandCount: 10,
          axisExpandWidth: 60,
          axisExpandTriggerOn: 'mousemove',

          z: 100,
          parallelAxisDefault: {
            type: 'value',
            nameLocation: 'start',
            nameRotate: 25,
            // nameLocation: 'end',
            nameTextStyle: {
              fontSize: 12
            },
            nameTruncate: {
              maxWidth: 170
            },
            nameGap: 20,
            splitNumber: 3,
            tooltip: {
              show: true
            },
            axisLine: {
              // show: false,
              lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,0.3)'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            z: 100
          }
        },
        series: [{
          name: '',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: that.makeMapData(geoCoordMap, rawData),
          activeOpacity: 1,
          label: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          symbolSize: 10,
          itemStyle: {
            borderColor: '#fff',
            color: '#577ceb'
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        {
          name: 'parallel',
          type: 'parallel',
          smooth: true,
          lineStyle: {
            color: '#577ceb',
            width: 0.5,
            opacity: 0.6
          },
          z: 100,
          blendMode: 'lighter',
          data: rawData
        }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
