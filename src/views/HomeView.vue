/<template>
<div class="box">
    <el-row :gutter="10">
        <el-row :gutter="10">
      <el-col :xl="6" :lg="6" :md="12" :sm="24" :xs="24" v-for="(item, index) in list"   :key="index">
          
        <div class="dashboard-item" :style="{ background: item.color }">
          <p>{{ item.title }}</p>
          <countTo :startVal='0' :endVal='item.val' :duration='3000'></countTo>
        </div>
      </el-col>
    </el-row>
</el-row>
<div class="echarts-box">
    <div class="echarts1">

    </div>

    <div class="echarts2">

    </div>
    <div class="echarts3">

    </div>
</div>
</div>
</template>

<script>
import CountTo from 'vue-count-to'
import echarts from 'echarts';
export default {
    components:{CountTo},
    data(){
        return {
            startVal:0,
            endVal:1,
            list: [
                { val: 13594, title: '最高可借金额', color: '#67ca3a', },
                { val: 9833, title: '回报率', color: '#ff6600' },
                { val: 8888, title: '业绩领跑', color: '#f56c6c' },
                { val: 6666, title: '安稳底薪战队', color: '#409eff' }
             ]
        }
    },
    methods:{
        initCharts() {
            this.echarts1 = echarts.init(document.querySelector('.echarts1'));
     //图表配置，复制就是
     let option1 = {
        title: {
   
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['one', 'two', 'three', 'four', 'five']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'one',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'two',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'three',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'four',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'five',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
     
     //应用配置生成图表
      this.echarts1.setOption(option1)
      this.echarts2 = echarts.init(document.querySelector('.echarts2'));
		//下面都是图表的配置，顺序不能错
    
      let posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ];
      let app = {};

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      };
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
          };
          this.echarts2.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };
      let option2 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Forest', 'Steppe', 'Desert', 'Wetland']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['2012', '2013', '2014', '2015', '2016']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
          },
          {
            name: 'Steppe',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
          },
          {
            name: 'Desert',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
          },
          {
            name: 'Wetland',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
          }
        ]
      };
      
      this.echarts2.setOption(option2);
      this.echarts3 = echarts.init(document.querySelector('.echarts3'));
    let option3  = {
        angleAxis: {},
        radiusAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu'],
          z: 10
        },
        polar: {},
        series: [
          {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: [2, 4, 6, 8],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          }
        ],
        legend: {
          show: true,
          data: ['A', 'B', 'C']
        }
      }
      this.echarts3.setOption(option3); 
 },
 resize(){
    this.echarts1.resize(),
    this.echarts2.resize(),
    this.echarts3.resize()
 }
    },
    mounted(){
    this.initCharts()
    this.resizeback=this.resize.bind(this)
    window.addEventListener('resize',this.resizeback)
    }
}
</script>

<style lang="scss">

.dashboard-item{
    height: 200px;
    line-height: 100px;
    font-weight:bold ;
     border-radius:40px ;
    margin: 0;
}
.dashboard-item p{
    color: black;
    height: 40px;
    margin: 0;

}
.echarts-box {
    .echarts1{
    height: 400px;
    width: 100%;
}

.echarts2{
    height: 500px;
    width: 50%;
 float:left
}
.echarts3{
    float:  right;
    height: 500px;
    width: 50%;
}
}

</style>
