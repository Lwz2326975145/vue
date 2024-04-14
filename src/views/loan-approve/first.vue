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

<div v-if="column.property=='opts'">
  <el-button  @click="showfirst(row)" type="primary" >查看</el-button>
 <el-button type="danger" @click="submit(row.id,'pass')">同过</el-button>
  <el-button type="success"@click="submit(row.id,'reject')"  >拒绝</el-button> 
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
<el-dialog title="贷款审批-查看详情" :visible="dialogVisible"  @close="dialogVisible=false"  width="30%">
    <div class="form-box" v-if="dialogVisible">
        <el-form ref="form" :model="form"  label-width="80px">
            <el-row>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="id" prop="id">
                        <el-input  type='input' v-model="form.id" disabled ></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="姓名" prop="name">
                        <el-input  type='input' v-model="form.name" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="出生日期" prop="birthday">
                        <el-input  type='input' v-model="form.birthday" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="性别" prop="sex">
                        <el-input  type='input' v-model="form.sex" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="教育程度" prop="education">
                        <el-input  type='input' v-model="form.education" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="地址" prop="address1">
                        <el-input  type='input' v-model="form.address1" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="手机号" prop="phone">
                        <el-input  type='input' v-model="form.phone" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=24 :lg=24
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="身份证" prop="identity_card">
                        <el-input  type='input' v-model="form.identity_card" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="btns clear-fix">
            <div>
                <el-button type="primary" @click="dialogVisible=!dialogVisible">取消</el-button>

            </div>
        </div>

    </div>
</el-dialog></div>

</template>

<script>
import {searchloan,searchfirst,passfirst, approvefirst} from '@/apis/loan'
export default {
name:'first',
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
          label: "出生日期",
          prop: "birthday",
          width: "160",
        },
        {
          label: "身份证",
          prop: "identity_card",
          width: "260",
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
   this.getfirst()
  },
  updateSize(pageSize){
this.params.pageSize=pageSize
this.getfirst()
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
    this.getfirst()
  }
  },
    async getfirst(){
  let res=await searchloan(this.params)
  console.log(res);
 this.tableData=res.data.data.data.data.map((item)=>{
  item.birthday=this.getbirthday(item.birthday)
  return item
 })
 this.rows=res.data.data.rows
    },
    async showfirst(row){
    this.form.id=row.id
    this.form.name=row.name
    this.form.address1=row.address1
    this.form.education=row.education
    this.form.identity_card=row.identity_card
    this.form.sex=row.sex
    this.form.phone=row.phone
    this.form.birthday=row.birthday
    this.dialogVisible=true

    },
    async submit(id,zt){
     
        let res=await approvefirst(id,zt)
      
        this.getfirst()
      
    }
},
mounted(){
    this.getfirst()
}
}
</script>

<style>

</style>