<template>
	<div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="用户管理" name="first">
				<div class="search_container">
					<!-- <el-input> -->
					<el-select v-model="valu" slot="prepend" placeholder="请选择企业">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select class='right' v-model="equipment" slot="prepend" placeholder="请选择设备">
						<el-option v-for="item in equipments" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search" @click='search'>搜索</el-button>
					<!-- </el-input> -->
				</div>
				<div class="mapbox">
					<baidu-map class="map" @ready="handler" center="中国" :map-click="false">
						<bml-marker-clusterer :averageCenter="true">
							<div v-for="(marker, i) of markers" :key="i">
								<bm-marker :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: marker.url, size: { width: 300, height: 171 }}"
								 :position="{lng: marker.lng, lat: marker.lat}" @click="infoWindowOpen(marker)">
									<bm-info-window title="弹窗信息" :position="{lng: marker.lng, lat: marker.lat}" :show="marker.showFlag" @close="infoWindowClose(marker)"
									 @open="infoWindowOpen(marker)">
										<p>123456789</p>
										<p>123456789</p>
										<p>123456789</p>
										<p>123456789</p>
										<p>123456789</p>
									</bm-info-window>
								</bm-marker>
							</div>
						</bml-marker-clusterer>
					</baidu-map>
				</div>
			</el-tab-pane>
			<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script>
	// 按需引入点聚合
	import {
		BmlMarkerClusterer
	} from 'vue-baidu-map'
	// 引入marker
	import BmMarker from 'vue-baidu-map/components/overlays/Marker'
	import iconCar from '../../assets/404_images/tc.png';
	// 插入 100 个随机点
	const markers = []
	for (let i = 0; i < 100; i++) {
		const position = {
			lng: Math.random() * 40 + 85,
			lat: Math.random() * 30 + 21,
			url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
			showFlag: false
		}
		const position1 = {
			lng: Math.random() * 40 + 85,
			lat: Math.random() * 30 + 21,
			url: 'https://cdn.tipe.io/tipe/tipe-cat-no-text.svg',
			showFlag: false
		}
		if (i % 2 === 0) {
			markers.push(position)
		} else {
			markers.push(position1)
		}
	}
	const carList = [{}]
	export default {
		name: 'Mapbox',
		components: {
			BmlMarkerClusterer,
			BmMarker
		},
		data() {
			return {
				BMap: '',
				map: '',
				markers,
				carList,
				show: false,
				activeName: 'first',
				equipment: '',
				valu: '',
				input: '',
				equipments: [{
						value: '1',
						label: '设备1'
					},
					{
						value: '2',
						label: '设备2'
					},
					{
						value: '3',
						label: '设备3'
					}
				],
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}]
			}
		},
		mounted: function() {},
		methods: {
			handler({
				BMap,
				map
			}) {
				map.enableScrollWheelZoom(true)
				// map.centerAndZoom('青岛市', 13)
				// 赋值，方便调用，本节没用到
				this.BMap = BMap
				this.map = map
			},
			// 关闭信息窗口 @close 自带的方法
			infoWindowClose(marker) {
				marker.showFlag = false
				console.log(marker)
			},
			// 首先点击marker时开启信息窗口，其实没必要在 bm-info-window 上写 @open 因为如果是关闭状态根本就点不到，所以就无法触发 @open
			// 如果在 bm-info-window 上写了 @open 在点击marker时会触发两次infoWindowOpen函数，而且可以很明显的看到有延时
			infoWindowOpen(marker) {
				marker.showFlag = true
				console.log(marker)
			},
			handleClick(tab, event) {

			},
			search: function() {

			},
		}
	}
</script>

<style scoped="scoped">
	.map {
		width: 100%;
		height: 86vh;
	}

	.search_container {
		margin-left: 3.5rem;
		margin-top: 1rem;
		position: absolute;
		z-index: 999;
	}

	.el-select {
		width: 7.5rem;
	}

	.right {
		margin-left: 0.625rem;
	}

	/* .el-input-group--append .el-input__inner, .el-input-group__prepend{
		width: 10rem;
	} */
</style>
