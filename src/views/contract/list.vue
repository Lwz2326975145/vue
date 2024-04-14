/<template>
    <div>
   <el-row>
          <el-col :span="22">
              <el-input placeholder="请输入名称" type="text" v-model="query"></el-input>
          </el-col>
          <el-col :span="2">
             <el-button type="primary" @click="setQueryName">搜索</el-button>
             <!-- <el-button type="primary" @click="setName">搜索</el-button> -->
          </el-col>
        </el-row>
        <el-table :data="tableData" id="gbox"  :useIndex="true"
          :stripe="true" :border="true" :fit="true" :useMultiSelect="false"
          >
    <el-table-column
                     type="index"
                     label="序号"
                     width="55"
                     align="center"
                     >
    </el-table-column>
    <el-table-column
                     v-for="(col,index) in columns"
                     :key="index"
                     :label="col.label"
                     :prop="col.prop"
                     :width="col.width"
                     >
                     <template v-slot="{ column,row}">
<div v-if="column.property=='status'">
    <el-tag :type='row[ column.property] |statusColor'>{{ row[ column.property] |status}}</el-tag>
</div>
<div v-else-if="column.property=='opts'">
  <el-button  @click="showfirst(row.id)" type="primary" :disabled="[0,1,2,3,4,5,6].indexOf(row['status'])===-1">生成合同</el-button>
  <el-button type="success"@click="download(row.id)" :disabled="[7].indexOf(row['status'])===-1">下载合同</el-button> 
</div>
<div v-else>
  {{ row[ column.property] }}
</div>
</template>
    </el-table-column>
 

</el-table>
<el-pagination 
               @current-change="handleCurrentChange"
               @size-change="updateSize"
               :page-sizes="[10,20,30,40]"
               :page-size="params.pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="rows"
               >
</el-pagination >
</div>

</template>

<script>
import {searchfirst,contractList,downloadContract,generateContract} from '@/apis/loan'
import request from '@/utils/request'
export default {
name:'first',
filters:{
  statusColor(status){
    if(status==7){
            return 'success'
        }
        else{
            return 'danger'
        }
    },
    status(status){
        if(status==7){
            return '生成合同状态'
        }
        else{
            return '未生成'
        }
     
}
},
data(){
    return {
      rows:0,
      form:{
        id:'',
        name:'',
        birthday:'',
        sex:'',
        address1:'',
        education:'',
        phone:'',
        identity_card:''
      },
      dialogVisible:false,
        query:'',
        tableData:[],
        params:{
      pageNo:1,
      pageSize:10,
    },
columns: [
        {
          label: "姓名",
          prop: "name",
          width: "80",
        },
     
        {
          label: "身份证",
          prop: "identity_card",
          width: "260",
        },
        {
            label:'合同状态',
            prop:'status'
        },
        {
          label: "操作",
          // width: "280",
          prop: "opts",
        },
      ],
    }
},
methods:{
  handleCurrentChange(pageNo){
   this.params.pageNo=pageNo
   this.contractList()
  },
  updateSize(pageSize){
this.params.pageSize=pageSize
this.contractList()
  },
    getbirthday(date){
     let dat=new Date(date)
    
     let years=dat.getFullYear()
    
     let month=(+dat.getMonth()+1)
     let dates=dat.getDate()
    
     let hours=dat.getUTCHours()
   
     let minute =dat.getMinutes()
     let second =dat.getSeconds()
    minute= minute<10?'0'+minute:minute
    second=second<10?'0'+second:second
     return years+'-'+month+'-'+dates+' '+hours+':'+minute+':'+second
    },
    async setQueryName(){
    this.params.name=this.query
    let res=await searchfirst(this.params)
    console.log('!!!!',res);  
  if(res.data.code===20000){
    this.contractList()
  }
  },
    async contractList(){
  let res=await contractList(this.params)
  console.log(res);
 this.tableData=res.data.data.data.data.map((item)=>{
  item.birthday=this.getbirthday(item.birthday)
  return item
 })
 this.rows=res.data.data.rows
    },
    async showfirst(id){
    let res=await generateContract(id)
  console.log('##',res);
  this.contractList()
    },
    async download(id){
        let res =  await downloadContract(id)
        if(res.data.code===20000){
            //对请求回来的地址去除/api
            let url=res.data.data.url.replace('/api','')
          
            let fileName='贷款合同-' + id + '.docx'
            //使用拆分的url再次请求，并指定请求返回的数据类型为'blob
            let res2 =await request({
                url,
                responseType:'blob'
            })
            
            // 内存中的临时指向
            let link = window.URL.createObjectURL(res2.data)
            // 创建a标签
            let tagA = document.createElement('a')
            // tag
            tagA.href = link
            tagA.download = fileName
            // 隐藏a标签
            tagA.style.display = 'none'
            // 插入到body中
            document.body.appendChild(tagA)
            // 点击a标签
            tagA.click()
            // 释放资源 
            document.body.removeChild(tagA)
            // 释放临时url
            window.URL.revokeObjectURL(url)
        }
    }
},
mounted(){
    this.contractList()
}
}
</script>

<style>

</style>