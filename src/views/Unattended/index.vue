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
			<div class="Line_graph_title">近一周过磅信息趋势</div>
			<el-date-picker v-model="value1" type="date" placeholder="开始日期" :picker-options="pickerOptions0">
			</el-date-picker>&nbsp;&nbsp;&nbsp;-<el-date-picker v-model="value2" type="date" placeholder="结束日期" :picker-options="pickerOptions1">
			</el-date-picker>
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
				pickerOptions0: {
					disabledDate: (time) => {
						if (this.value2 != "") {
							return time.getTime() > Date.now() || time.getTime() > this.value2;
						} else {
							return time.getTime() > Date.now();
						}
				
					}
				},
				pickerOptions1: {
					disabledDate: (time) => {
						return time.getTime() < this.value1 || time.getTime() > Date.now();
					}
				},
				value1: '',
				value2:'',
				system_list: [{
						id: '1',
						img: require('../../assets/404_images/登记总数.png'),
						name: '设备总量',
						number: '200',
						background: '#a771c7'
					},
					{
						id: '2',
						img: require('../../assets/404_images/在线.png'),
						name: '在线设备',
						number: '200',
						background: '#46b99c'
					},
					{
						id: '3',
						img: require('../../assets/404_images/离线.png'),
						name: '离线设备',
						number: '200',
						background: '#a1ca46'
					},
					{
						id: '4',
						img: require('../../assets/404_images/报警.png'),
						name: '报警设备',
						number: '200',
						background: '#46b99c'
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
						formatter: '{a0}:{c0}台'
					},
					tooltip: {
						formatter: '{a0}:{c0}台',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					xAxis: {
						data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
					},
					yAxis: {},
					legend: {
						data: ['报警', '故障']
					},
					series: [{
							name: '报警', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [31, 52, 33, 84, 35, 46, 67], // 数据
						},
						{
							name: '故障', // 系列名称
							smooth: true,
							type: 'line', // 类型：线
							data: [12, 26, 43, 47, 65, 46, 37], // 数据
						}
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
		width: 23%
	}

	.system img {
		padding-top: 3%;
		width: 20%;
	}

	.system_name {
		font-size: 60rpx;
		margin-top: 1.5%;
		margin-bottom: 1.5%;
	}

	.system_number {
		padding-bottom: 3%;
		font-size: 60rpx;
		font-weight: 600;
	}

	.Line_graph_title {
		font-size: 60rpx;
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
		height: 400px;
	}

	.tips {
		color: white;
		padding-bottom: 2%;
	}
	.el-button{
		margin-left: 0rem;
	}
	.el-date-editor{
		margin-left: 1rem;
	}
</style>
