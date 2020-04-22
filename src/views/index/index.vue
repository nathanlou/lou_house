<template>
	<div class="dashboard-container">
		<!-- 顶部四个系统预览开始 -->
		<div class="system_container">
			<div class="system" v-for="(item,index) in system_list" :key='index' :style="{background:item.background}" @click="details(item.id)">
				<img :src="item.img" />
				<div class="system_name">{{item.name}}</div>
				<div class="system_number">设备总量:{{item.number}}台</div>
			</div>
		</div>
		<div @click="big">大屏</div>
		<!-- 顶部四个系统预览结束 -->
		<!-- 趋势折线图开始 -->
		<div class="chart_container">
			<div class="Line_graph_title">近一周故障趋势</div>
			<div id="chart" ref="chart"></div>
		</div>
		<!-- 趋势折线图结束 -->
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	const echarts = require('echarts/lib/echarts');


	export default {
		data() {
			return {
				system_list: [
					{
						id: '1',
						img: require('../../assets/404_images/供应链.png'),
						name: '供应链管理',
						number: '200',
						background: '#a771c7'
					},
					{
						id: '2',
						img: require('../../assets/404_images/无人值守.png'),
						name: '无人值守地磅系统',
						number: '200',
						background: '#f87e3d'
					},
					{
						id: '3',
						img: require('../../assets/404_images/安保服务.png'),
						name: '安保智能系统',
						number: '200',
						background: '#46b99c'
					},
					{
						id: '4',
						img: require('../../assets/404_images/站点管理.png'),
						name: '拌合中控系统',
						number: '200',
						background: '#00acee'
					},
					{
						id: '5',
						img: require('../../assets/404_images/实验室.png'),
						name: '环保管理系统',
						number: '200',
						background: '#a1ca46'
					}
				]
			}
		},
		methods: {
			big() {
				this.$router.push({
					path: '/Large'
				})
			},
			details: function(id) {
				if (id == 1) {
					this.$router.push({
						path: '/Supply'
					})
				} else if (id == 2) {
					this.$router.push({
						path: '/Unattended'
					})
				} else if (id == 3) {
					this.$router.push({
						path: '/Security'
					})
				} else if (id == 4) {
					this.$router.push({
						path: '/Mixing'
					})
				}else if(id == 5){
					this.$router.push({
						path: '/Laboratory'
					})
						
					}
			},
			initCharts() {
				let myChart = this.$echarts.init(this.$refs.chart);
				console.log(this.$refs.chart)
				// 绘制图表
				myChart.setOption({
					title: {},
					tooltip: {
						formatter: '{a0}:{c0}台',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					toolbox: {
						feature: {
							saveAsImage: {},
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {
								readOnly: false
							},
							magicType: {
								type: ['bar', 'line']
							},
							restore: {}
						}
					},
					xAxis: {
						data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
					},
					yAxis: {},
					legend: {
						data: ['供应链管理', '无人值守地磅', '安保服务', '拌合站中控', '环保管理']
					},
					series: [{
							name: '供应链管理', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [39, 62, 123, 44, 65, 36, 82], // 数据
						}, {
							name: '无人值守地磅', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [31, 52, 33, 84, 35, 46, 67], // 数据
						},
						{
							name: '安保服务', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [12, 26, 43, 47, 65, 46, 37], // 数据
						},
						{
							name: '拌合站中控', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [51, 42, 43, 64, 35, 76, 67], // 数据
						},
						{
							name: '环保管理', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [31, 42, 63, 24, 65, 86, 47], // 数据
						},
					]
				});
			}
		},
		mounted() {
			this.initCharts();
		}

	}
</script>

<style lang="scss" scoped>
	.system_container {
		width: 96%;
		margin-left: 2%;
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin-top: 3%;
		color: white;
	}

	.system {
		width: 19%
	}

	.system img {
		padding-top: 3%;
		width: 45%;
	}

	.system_name {
		margin-top: 1.5%;
		margin-bottom: 1.5%;
	}

	.system_number {
		padding-bottom: 3%;
		font-weight: 600;
	}

	.Line_graph_title {
		font-weight: 600;
		width: 96%;
		margin-left: 2%;
	}

	.chart_container {
		width: 100%;
		margin-top: 3%
	}

	#chart {
		width: 96%;
		margin-left: 2%;
		height: 25rem;
	}

	.tips {
		color: white;
		padding-bottom: 2%;
	}
</style>
