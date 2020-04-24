<template>
  <div class="dashboard-container">
    <!-- 顶部四个系统预览开始 -->
    <div class="system_container">
      <div class="system" v-for="(item,index) in system_list" :key='index' :style="{background:item.background}">
        <img :src="item.img" />
        <div class="system_name">{{item.name}}</div>
        <div class="system_number">{{item.number}}台</div>
      </div>
    </div>
    <!-- 顶部四个系统预览结束 -->
    <!-- 趋势折线图开始 -->
    <div class="chart_container">
      <div class="Line_graph_title">当前仓料信息</div>
      <div id="chart" ref="chart"></div>
    </div>
    <!-- 趋势折线图结束 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const echarts = require('echarts/lib/echarts');


export default {
  data(){
    return{
      system_list:[
        {
          id:'1',
          img:require('../../assets/404_images/登记总数.png'),
          name:'设备总量',
          number:'200',
          background:'#a771c7'
        },
        {
          id:'2',
          img:require('../../assets/404_images/在线.png'),
          name:'在线设备',
          number:'200',
          background:'#46b99c'
        },
        {
          id:'3',
          img:require('../../assets/404_images/离线.png'),
          name:'离线设备',
          number:'200',
          background:'#a1ca46'
        },
        {
          id:'4',
          img:require('../../assets/404_images/报警.png'),
          name:'报警设备',
          number:'200',
          background:'#46b99c'
        }
      ]
    }
  },
  methods: {
　　initCharts () {
  　　let myChart = this.$echarts.init(this.$refs.chart);
  　　console.log(this.$refs.chart)
  　　// 绘制图表
  　　myChart.setOption({
    　　tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        legend: {
            data: ['Growth', '2020', '2021'],
            itemGap: 5
        },
        grid: {
            top: '12%',
            left: '1%',
            right: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['58同城', '360', '腾讯','百度','阿里','万达','ss','阿达','撒大声地','的','个','改变','放大','丰富的非','发的发的发','58同城', '360', '腾讯','百度','阿里','万达','ss','阿达','撒大声地','的','个','改变','放大','丰富的非','发的发的发','58同城', '360', '腾讯','百度','阿里','村上春树']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        dataZoom: [
            {
                show: true,
                start: 94,
                end: 100
            },
            {
                type: 'inside',
                start: 94,
                end: 100
            },
            // {
            //     show: true,
            //     yAxisIndex: 0,
            //     filterMode: 'empty',
            //     width: 30,
            //     height: '80%',
            //     showDataShadow: false,
            //     left: '93%'
            // }
        ],
        series: [
            {
                name: '2020',
                type: 'bar',
                data: [39, 62, 123, 44, 65, 36, 82,
				39, 62, 123, 44, 65, 36, 82,
				39, 62, 123, 44, 65, 736, 82,
				39, 62, 123, 441, 65, 316, 182,
				39, 62, 123, 44, 65, 36, 82],
            },
            {
                name: '2021',
                type: 'bar',
                data: [309, 67, 13, 84, 65, 36, 82,
                39, 62, 123, 44, 65, 36, 82,
                39, 62, 123, 44, 65, 36, 82,
                39, 62, 123, 441, 65, 716, 182,
                39, 62, 123, 44, 65, 36, 82],
            }
        ]
  　　});
　　}
　},
　mounted () {
　 this.initCharts();
　}

}
</script>

<style lang="scss" scoped>
.system_container{
  width: 96%;
  margin-left: 2%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 3%;
  color: white;
}
.system{
  width: 23%
}
.system img{
  padding-top: 3%;
  width: 20%;
}
.system_name{
  font-size: 60rpx;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
}
.system_number{
  padding-bottom: 3%;
  font-size: 60rpx;
  font-weight: 600;
}
.Line_graph_title{
  font-size: 60rpx;
  font-weight: 600;
  width: 96%;
  margin-left: 2%;
}
.chart_container{
  width: 100%;
  margin-top: 3%
}
#chart{
  width: 96%;
  margin-left: 2%;
  height: 400px;
}
.tips{
  color: white;
  padding-bottom: 2%;
}
</style>
