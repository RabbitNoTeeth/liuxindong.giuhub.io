**XYZ** 是OpenStreetMap规范的别名，又叫Slippy Map Tilenames，其实就是地图瓦片与经纬度的换算，即将经纬度换算成对应的地图瓦片，并且通过x、y、z三个参数在加载。



简单来理解，XYZ就是加载地图瓦片的一种方式，常用于加载WMTS和TMS服务发布的瓦片地图，通过在地图服务URL后添加 `/z/x/y.png` 格式后缀来加载指定的瓦片，其中x、y、z的定义为：

- **x**

  瓦片所在列，即瓦片组织坐标的x轴，<font color="red">方向为从左到右，这与WMTS和TMS的瓦片组织的x方向是一致的</font>。

- **y**

  瓦片所在行，即瓦片组织坐标的y轴，<font color="red">一般默认方向为从上到下，这与WMTS的瓦片组织的y方向是一致的，但是与TMS恰好是相反的，在使用时要注意</font>。

- **z**

  缩放级别



OpenLayers支持使用XYZ来加载WMTS和TMS服务发布的地图：

（下面示例代码中加载的TMS和WMTS瓦片地图都由GeoServer发布，此处仅供参考，如果是其他地图服务器发布的瓦片地图，可能有些许不同之处）

- **加载TMS瓦片地图**

  ```vue
  <template>
    <div id="map"></div>
  </template>
  
  <script>
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  import Projection from 'ol/proj/Projection';
  
  export default {
    name: "LoadTMSByXYZ",
    data() {
      return {
        map: null
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const app = this;
        const bounds = [13203197.206783397,4788454.964696088,13218733.03278226,4799595.661568641];
        const map = new Map({
          target: 'map',
          view: new View({
            projection: new Projection({
              code: 'EPSG:3857',
              units: 'm',
              global: false
            })
          }),
          layers: [
            new TileLayer({
              source: new XYZ({
                url: "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/LuanNan%3ALuanNan_tiles@EPSG%3A3857x18@png/{z}/{x}/{-y}.png"
              })
            })
          ]
        });
        map.getView().fit(bounds, map.getSize());
        app.map = map;
      }
    }
  }
  </script>
  
  <style scoped>
  
  #map {
    width: 1000px;
    height: 800px;
    border: 1px solid black;
  }
  
  </style>
  ```

  

- **加载WMTS瓦片地图**

  ```vue
  <template>
    <div id="map"></div>
  </template>
  
  <script>
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  import Projection from 'ol/proj/Projection';
  
  export default {
    name: "LoadWMTSByXYZ",
    data() {
      return {
        map: null
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const app = this;
        const bounds = [13203197.206783397, 4788454.964696088, 13218733.03278226, 4799595.661568641];
        const map = new Map({
          target: 'map',
          view: new View({
            projection: new Projection({
              code: 'EPSG:3857',
              units: 'm',
              global: false
            })
          }),
          layers: [
            new TileLayer({
              source: new XYZ({
                url: "http://localhost:8080/geoserver/gwc/service/wmts/rest/LuanNan:LuanNan_tiles/EPSG:3857x18/{z}/{y}/{x}?format=image/png"
              })
            })
          ]
        });
        map.getView().fit(bounds, map.getSize());
        app.map = map;
      }
    }
  }
  </script>
  
  <style scoped>
  
  #map {
    width: 1000px;
    height: 800px;
    border: 1px solid black;
  }
  
  </style>
  ```

  

:bulb: 源代码可参见 https://github.com/RabbitNoTeeth/openlayers-demo
