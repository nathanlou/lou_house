<template>
	<div class="dashboard-container">
		<!-- 顶部四个系统预览开始 -->
		<div class="system_container">
			<div class="system" v-for="(item,index) in system_list" :key='index' :style="{background:item.background}">
				<img :src="item.img" />
				<div class="system_name">{{item.name}}</div>
				<div class="system_number">{{item.number}}辆</div>
			</div>
		</div>
		<!-- 顶部四个系统预览结束 -->
		<!-- 趋势折线图开始 -->
		<div class="chart_container">
			<div class="Line_graph_title">近一周车辆趋势</div>
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
				system_list: [{
						id: '1',
						img: require('../../assets/404_images/预约.png'),
						name: '今日预约车辆',
						number: '200',
						background: '#a771c7'
					},
					{
						id: '2',
						img: require('../../assets/404_images/去除.png'),
						name: '去皮车辆',
						number: '200',
						background: '#f87e3d'
					},
					{
						id: '3',
						img: require('../../assets/404_images/待发货.png'),
						name: '待去皮车辆',
						number: '200',
						background: '#46b99c'
					},
					{
						id: '4',
						img: require('../../assets/404_images/原材料过磅统计.png'),
						name: '过磅车辆',
						number: '200',
						background: '#00acee'
					},
					{
						id: '5',
						img: require('../../assets/404_images/未读.png'),
						name: '待过磅车辆',
						number: '200',
						background: '#a1ca46'
					}
				]
			}
		},
		methods: {
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
						data: ['水泥', '矿粉', '粉煤灰', '膨胀剂']
					},
					series: [{
							name: '水泥', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [31, 52, 33, 84, 35, 46, 67], // 数据
						},
						{
							name: '矿粉', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [12, 26, 43, 47, 65, 46, 37], // 数据
						},
						{
							name: '粉煤灰', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [51, 42, 43, 64, 35, 76, 67], // 数据
						},
						{
							name: '膨胀剂', // 系列名称
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
