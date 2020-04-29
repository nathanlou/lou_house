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
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>排队列表</span>
					</div>
					<div class="marquee">
						<div class="marquee_box" ref="marquee_box">
							<ul class="marquee_list" :class="{marquee_top:animate}">
								<li v-for="(item,index) in list" :key="index">
									<div>{{item.id}}</div>
									<div>{{item.driver}}</div>
									<div>{{item.car_number}}</div>
								</li>
							</ul>
						</div>
					</div>
				</el-card>
			</div>
		</div>
		<div id="myChart"></div>
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
				animate: false,
				showNum: 4, // 可见列表条数
				list: [{
						id: '1',
						driver: '张三',
						car_number: '豫G12345'
					},
					{
						id: '2',
						driver: '李三',
						car_number: '豫G12345'
					},
					{
						id: '3',
						driver: '王三',
						car_number: '豫G12345'
					},
					{
						id: '4',
						driver: '周三',
						car_number: '豫G12345'
					},
					{
						id: '5',
						driver: '张三',
						car_number: '豫G12345'
					},
					{
						id: '6',
						driver: '李三',
						car_number: '豫G12345'
					},
					{
						id: '7',
						driver: '王三',
						car_number: '豫G12345'
					},
					{
						id: '8',
						driver: '周三',
						car_number: '豫G12345'
					}
				],
				system_list: [{
						id: '1',
						img: require('../../assets/404_images/无人值守.png'),
						warehouse: '总仓数',
						number: '200',
						background: '#a771c7'
					},
					{
						id: '2',
						img: require('../../assets/404_images/安保服务.png'),
						warehouse: '在线仓数',
						number: '200',
						background: '#46b99c'
					},
					{
						id: '3',
						img: require('../../assets/404_images/站点管理.png'),
						warehouse: '今日上料(KG)',
						number: '200',
						background: '#a1ca46'
					},
					{
						id: '4',
						img: require('../../assets/404_images/实验室.png'),
						warehouse: '昨日用料(KG)',
						number: '200',
						background: '#46b99c'
					}
				]
			}
		},
		methods: {
			initData() {
				// 基于准备好的dom，初始化echarts实例
				var myChart1 = echarts.init(document.getElementById('main1'));
				var myChart2 = echarts.init(document.getElementById('main2'));
				// 绘制图表
				myChart1.setOption({
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
						data: [{
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
			// 处理数组方法
			showMarquee() {
				this.animate = true
				this.list.push(this.list[0])
				setTimeout(() => {
					this.list.shift()
					this.animate = false
				}, 1000)
			},
			init() {
				function randomData() {
					now = new Date(+now + 1000);
					value = value + Math.random() * 21 - 10;
					return {
						name: now.toString(),
						value: [
							now,
							Math.round(value)
						]
					}
				}
				var data = [];
				var now = new Date();
				var value = Math.random() * 1000;
				var myChart = echarts.init(document.getElementById('myChart'));
				myChart.setOption({
					title: {
						text: '动态数据 + 时间坐标轴'
					},
					tooltip: {
						trigger: 'axis',
						formatter: function(params) {
							params = params[0];
							var date = new Date(params.name);
							return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
						},
						axisPointer: {
							animation: false
						}
					},
					xAxis: {
						type: 'time',
						splitLine: {
							show: false
						}
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%'],
						splitLine: {
							show: false
						}
					},
					series: [{
						name: '模拟数据',
						type: 'line',
						showSymbol: false,
						hoverAnimation: false,
						data: data
					}]
				})
				setInterval(function() {
					//data.shift();
					data.push(randomData());
					myChart.setOption({
						series: [{
							data: data
						}]
					});
				}, 1000);
			}
		},
		mounted() {
			this.initData()
			this.init()
			// 可见数据高度
			this.$refs.marquee_box.style.height = this.showNum * 30 + 'px'
		},
		created() {
			// 页面显示
			setInterval(this.showMarquee, 2000)
		}
	}
</script>

<style scoped="scoped">
	/* body,#app{
      height: 100%;
      background-color: #FAFAFA;
    } */
	.system_container {
		width: 96%;
		margin-left: 2%;
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin-top: 3%;
		color: white;
	}

	.container {
		display: flex;
	}

	.system {
		width: 23%;
		display: flex;
		padding: 2%;
	}

	.system_right {
		margin-left: 3%;
	}

	.system img {
		width: 25%;
	}

	.system_name {
		font-size: 1.25rem;
		margin-top: 1.5%;
		margin-bottom: 1.5%;
	}

	.system_number {
		font-size: 1.5625rem;
		font-weight: 600;
		margin-top: 5%;
	}

	.echert_container {
		width: 96%;
		margin-left: 2%;
	}

	#pie1 {
		width: 24%;
		border: 0.0625rem solid gainsboro;
		box-shadow: 0rem 0rem 0.625rem rgb(211, 211, 211);
	}

	#main1 {
		width: 100%;
		height: 19.75rem;
		left: 1%;
		margin-top: 1.5%;
	}

	#pie2 {
		width: 24%;
		border: 0.0625rem solid gainsboro;
		box-shadow: 0rem 0rem 0.625rem rgb(211, 211, 211);
		margin-left: 2%;
	}

	#main2 {
		width: 100%;
		height: 19.75rem;
		left: 1%;
		margin-top: 1.5%;
	}

	.pie {
		display: flex;
		margin-top: 0.9375rem;
	}

	.box-card {
		width: 48%;
		margin-left: 2%;
	}

	.marquee {
		width: 100%;
		color: #3a3a3a;
		background-color: white;
		display: flex;
		box-sizing: border-box;
		overflow: hidden;
		height: 14.6875rem !important;
	}

	.marquee_title {
		/* padding: 0 20px; */
		height: 21px;
		font-size: 14px;
		border-right: 1px solid #d8d8d8;
	}

	.marquee_box {
		display: block;
		position: relative;
		width: 100%;
		overflow: hidden;
		margin: 0 auto;
		height: 200px !important;
		margin-top: 20px;
	}

	.marquee_list {
		display: block;
		position: absolute;
		top: 0px;
		left: 0;
		list-style: none;
		width: 100%;
	}

	.marquee_top {
		transition: all 1s;
		margin-top: -30px;
	}

	.marquee_list li {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		padding-left: 20px;
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	#myChart {
		width: 90%;
		margin-left: 5%;
		height: 18.75rem;
		margin-top: 1%;
	}
</style>
