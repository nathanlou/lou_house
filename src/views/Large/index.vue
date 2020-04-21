<template>
	<div id="app">
		<div class="system_container">
				<div class="system" v-for="(item,index) in system_list" :key='index' :style="{background:item.background}" @click="details(item.id)">
				  <img :src="item.img" />
				  <div class="system_right">
					  <div class="system_name">{{item.warehouse}}</div>
					   <div class="system_number">{{item.number}}</div>
				  </div>				  
				</div>  
		</div>
		<div class="echert_container">
			<div class="pie">
				<div id="pie1">
					<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
					<div id="main1"></div>
				</div>
				<div id="pie2">
					<div id="main2"></div>
				</div>
			</div>
			<div id="chart" ref="chart"></div>
		</div>	
	</div>
	</div>
</template>

<script>
	let echarts = require('echarts/lib/echarts')
	// 引入饼状图组件
	require('echarts/lib/chart/pie')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	export default {
		data() {
			return {
				system_list:[
				  {
				    id:'1',
				    img:require('../../assets/404_images/无人值守.png'),
					warehouse:'总仓数',
				    number:'200',
				    background:'#a771c7'
				  },
				  {
				    id:'2',
				    img:require('../../assets/404_images/安保服务.png'),
					warehouse:'在线仓数',
				    number:'200',
				    background:'#46b99c'
				  },
				  {
				    id:'3',
				    img:require('../../assets/404_images/站点管理.png'),
					warehouse:'今日上料(KG)',
				    number:'200',
				    background:'#a1ca46'
				  },
				  {
				    id:'4',
				    img:require('../../assets/404_images/实验室.png'),
					warehouse:'昨日用料(KG)',
				    number:'200',
				    background:'#46b99c'
				  }
				]
			}
		},
		methods: {
			initData() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main1'));
				var myChart2 = echarts.init(document.getElementById('main2'));
				// 绘制图表
				myChart.setOption({
					title: {
						text: '车辆类型统计', //主标题
						x: 'center', //x轴方向对齐方式
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						bottom: 'bottom',
						data: ['维修车辆', '休息车辆', '加急车辆', '值班车辆']
					},
					series: [{
						name: '车类型',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [{
								value: 5,
								name: '维修车辆'
							},
							{
								value: 20,
								name: '休息车辆'
							},
							{
								value: 4,
								name: '加急车辆'
							},
							{
								value: 35,
								name: '值班车辆'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
				myChart2.setOption({
					title: {
						text: '车辆状态统计', //主标题
						x: 'center', //x轴方向对齐方式
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						bottom: 'bottom',
						data: ['装货车辆', '等待车辆']
					},
					series: [{
						name: '车状态',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [
							{
								value: 5,
								name: '装货车辆'
							},
							{
								value: 20,
								name: '等待车辆'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
			},
			initCharts () {
			  　　let myChart = this.$echarts.init(this.$refs.chart);
			  　　console.log(this.$refs.chart)
			  　　// 绘制图表
			  　　myChart.setOption({
			    　　title: { },
			    　　tooltip: {
			          formatter: '{a0}:{c0}台'
			        },
			    　　xAxis: {
			    　　data: ["周一","周二","周三","周四","周五","周六","周日"]
			    　　},
			    　　yAxis: {},
			        legend: {
			          data: ['在线', '离线',]
			        },
			        series:[
			          {
			            name: '在线', // 系列名称
			            smooth:true,
			            type: 'bar', // 类型：线
			            data: [31,52,33,84,35,46,67], // 数据
			          },
			          {
			            name: '离线', // 系列名称
			            smooth:true,
			            type: 'bar', // 类型：线
			            data: [12,26,43,47,65,46,37], // 数据
			          }
			        ]
			  　　});
			　　}
		},
		mounted() {
			this.initData()
			this.initCharts()
		}
	}
</script>

<style scoped="scoped">
	/* body,#app{
      height: 100%;
      background-color: #FAFAFA;
    } */
	.system_container{
	  width: 96%;
	  margin-left: 2%;
	  display: flex;
	  justify-content: space-between;
	  text-align: center;
	  margin-top: 3%;
	  color: white;
	}
	.container{
		display: flex;
	}
	.system{
	  width: 23%;
	  display:flex;
	  padding: 2%;
	}
	.system_right{
		margin-left: 3%;
	}
	.system img{
	  width: 25%;
	}
	.system_name{
	  font-size: 1.25rem;
	  margin-top: 1.5%;
	  margin-bottom: 1.5%;
	}
	.system_number{
	  font-size: 1.5625rem;
	  font-weight: 600;
	  margin-top: 5%;
	}
	.echert_container{
		width: 96%;
		margin-left: 2%;
	}
	#main1{
		width: 25%;
		height: 19.75rem;
		left: 1%;
		margin-top: 1.5%;
	}
	#main2{
		width: 25%;
		height: 19.75rem;
		left: 1%;
		margin-top: 1.5%;
	}
	#chart{
	  width: 48%;
	  margin-left: 2%;
	  height: 400px;
	}
</style>
