<template>
	<div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="百度地图" name="first">
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
			<el-tab-pane label="高德地图" name="second">
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
				<div class="amap-page-container">
					
				  <el-amap
				    vid="amapDemo"  
				    :center="center"
				    :zoom="zoom"
				    class="amap-demo"
				    :events="events">
					
				    <el-amap-marker v-for="marker in markerss" :position="marker.position" :content="marker.content" :events="marker.events">						
					</el-amap-marker>
				  </el-amap>
				</div>
			</el-tab-pane>
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
			BmMarker,
		},
		data() {
			let self = this;
			return {
				zoom: 12,
				center: [121.59996, 31.197646],
				markerss: [],
				markerRefs: [],
				events: {
				  init(o) {
				    setTimeout(() => {
				      console.log(self.markerRefs);
				      let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{
				        gridSize: 80,
				        renderCluserMarker: self._renderCluserMarker
				      });
				      console.log(cluster);
				    }, 1000);
				  }
				},
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
		created() {
		  let self = this;
		  let markers = [];
		  let index = 0;
		
		  let basePosition = [121.59996, 31.197646];
		
		  while (++index <= 30) {
		    markers.push({
		      position: [basePosition[0] + 0.01 * index, basePosition[1]],
		      content: '<img src="https://cdn.tipe.io/tipe/tipe-cat-no-text.svg" />',
		      events: {
		        init(o) {
		          self.markerRefs.push(o);
		        }
		      }
		    });
		  }		
		  this.markerss = markers;
		},
		methods: {
			_renderCluserMarker(context) {
			  const count = this.markerss.length;			
			  let factor = Math.pow(context.count/count, 1/18)
			  let div = document.createElement('div');
			  let Hue = 180 - factor* 180;
			  let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
			  let fontColor = 'hsla('+Hue+',100%,20%,1)';
			  let borderColor = 'hsla('+Hue+',100%,40%,1)';
			  let shadowColor = 'hsla('+Hue+',100%,50%,1)';
			  div.style.backgroundColor = bgColor
			  let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
			  div.style.width = div.style.height = size+'px';
			  div.style.border = 'solid 1px '+ borderColor;
			  div.style.borderRadius = size/2 + 'px';
			  div.style.boxShadow = '0 0 1px '+ shadowColor;
			  div.innerHTML = context.count;
			  div.style.lineHeight = size+'px';
			  div.style.color = fontColor;
			  div.style.fontSize = '14px';
			  div.style.textAlign = 'center';
			  context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
			  context.marker.setContent(div)
			},
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

	.amap-demo {
	  height: 86vh;
	}
</style>
