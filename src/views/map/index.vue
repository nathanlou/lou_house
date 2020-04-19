<template>
  <div>
    <div class="search_container">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="valu" slot="prepend" placeholder="请选择企业">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
    <div id="allmap" class="Map">
    </div>
  </div>
</template>

<script>
  /* eslint-disable*/

  import iconCar from '../../assets/404_images/tc.png';
  export default {
    name: 'Mapbox',
    data() {
      return {
        valu: '',
        input: '',
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
    mounted: function() {
      this.$nextTick(() => {
        var map = new BMap.Map("allmap"); //初始化map, 绑定id=allmap
        var point = new BMap.Point(113.79924, 35.24453); // 初始化point, 给定一个默认x,y值
        map.centerAndZoom(point, 16); // 将point点放入map中，展示在页面中心展示，10=缩放程度
        map.enableScrollWheelZoom(); // 开启滚动鼠标滑轮
        map.addControl(new BMap.NavigationControl()); // 将控件（平移缩放控件）添加到地图上
        // 如有多个point去展示，可根据后端接口传入为主
        let data = [{
          x: 113.79924,
          y: 35.24453,
          name: '张三'
        }, {
          x: 113.69924,
          y: 35.24453,
          name: '李四'
        }, {
          x: 113.59924,
          y: 35.24453,
          name: '王五'
        }]

        data.forEach((e, i) => {
          // 创建point, 将x,y值传入
          let pointNumber = new BMap.Point(e.x, e.y)

          // 创建信息窗口对象
          let infoWindow = new BMap.InfoWindow("World", {
            width: 150, // 信息窗口宽度
            height: 100, // 信息窗口高度
            title: "Hello" + i // 信息窗口标题
          });
          // 将data中的name加入地图中
          var label = new BMap.Label(e.name, {
            offset: new BMap.Size(25, 15)
          });
          markerFun(pointNumber, infoWindow, label)
        })

        function markerFun(points, infoWindows, label) {
          const deviceSize = new BMap.Size(48, 48);
          const deviceIcon = new BMap.Icon(iconCar, deviceSize, { //会以base64的方式传参iconCar
            imageSize: deviceSize
          });
          let markers = new BMap.Marker(points, {
            icon: deviceIcon
          });
          map.addOverlay(markers); // 将标注添加到地图中
          markers.setLabel(label); // 将data中的name添加到地图中
          // 标注的点击事件
          markers.addEventListener("click", function(event) {
            map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
          });
        }

        // 获取当前地理位置
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
          } else {
            // alert('failed' + this.getStatus());
          }
        });

      })
    },
    methods: {

    }
  }
</script>

<style scoped="scoped">
  .Map {
    width: 100%;
    height: 92.8vh;
  }

  .search_container {
    width: 30%;
    margin-left: 4.5%;
    margin-top: 1rem;
    position: absolute;
    z-index: 999;
  }

  .el-select {
    width: 8.125rem;
  }
</style>
