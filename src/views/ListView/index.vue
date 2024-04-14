<!-- /<template>
  <div>
    <el-row :gutter="20">
  <el-col :span="22" ><div class="grid-content bg-purple"><el-input
  placeholder="请输入内容"
  v-model="input"
  clearable>
</el-input></div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-search" @click="setQueryName">搜索</el-button></div></el-col>
  </el-row>

  </div>
</template> -->
<template>
    <div id="ListView">
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
    <!--第一列序号-->   
    <el-table-column
                     type="index"
                     label="序号"
                     width="55"
                     align="center"
                     >
    </el-table-column>
  <el-table-column v-for="p,index in columns" :key="index" :label="p.label"
  :prop="p.prop" :width="p.width" align="center">
<template v-slot="{ column,row}">
<div v-if=" column.property==='status'">

  <el-tag :type='row[ column.property] |statusColor'>{{ row[  column.property] |status}}</el-tag>
</div>
<div v-else-if="column.property=='opts'">
  <el-button  @click="showEdit(row)" type="primary" :disabled="[0,2,3,6].indexOf(row['status'])===-1">编辑</el-button>
<!-- <el-button  @click="delLoan(row.id)"  type="danger">删除</el-button> -->
    <!-- <el-button :disabled="[0,2,3,6].indexOf(row['status'])===-1" @click="submit(row.id)"   type="success">提交审核</el-button> -->
  <!-- <el-button type="primary" @click="showEdit(row)" :disabled="[0,2,3,6].indexOf(row['status'])!==-1" >编辑</el-button> -->
 <el-button type="danger" @click="deleteApplication(row.id)">删除</el-button>
  <el-button type="success"@click="submitApplication(row.id)"  :disabled="[0,2,3,6].indexOf(row['status'])===-1">提交审核</el-button> 
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
               :page-size="parmas.pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="rows"
               >
</el-pagination >
  <el-dialog title="申请管理-编辑" :visible="dialogVisible"  @close="dialogVisible=false"  width="30%">
    <div class="form-box">
        <el-form ref="updateForm" :model="updateForm" :rules="rules" label-width="80px">
            <el-row>
                <el-col
                        :xl=20 :lg=20
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="姓名" prop="name">
                        <el-input  type='input' v-model="updateForm.name" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col
                        :xl=20 :lg=20
                        :md=12 :sm=24 :xs=24>
                    <el-form-item label="性别" prop="sex">
                        <el-select  v-model="updateForm.sex" >
                            <el-option
                                       key="man"
                                       label="男"
                                       value="man">
                            </el-option>
                            <el-option
                                       key="woman"
                                       label="女"
                                       value="woman">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="btns clear-fix">
            <div>
                <el-button type="primary" @click="submitUpdate">提交</el-button>
                <el-button @click="cleanFrom" >重置</el-button>
            </div>
        </div>

    </div>
</el-dialog>

    </div>
  </template>
<script>
import {getloanlist,updateloan,deleteloan,submitloan} from '@/apis/loan'
export default {
name:'ListView',
filters:{
  statusColor(status){
        switch (status) {
            case 0:
                return 'success'
                break
            case 1:
                return ''
                break
            case 2:
                return 'success'
                break
            case 3:
                return 'danger'
                break
            case 4:
                return 'warning'
                break
            case 5:
                return 'success'
                break
            case 6:
                return 'danger'
                break
            case 7:
                return 'success'
                break
            default:
              return 'danger'

        }
    },
    status(status){
        switch (status) {
            case 0:
                return '进件'
                break
            case 1:
                return '提交初审'
                break
            case 2:
                return '初审通过'
                break
            case 3:
                return '初审拒绝'
                break
            case 4:
                return '提交终审'
                break
            case 5:
                return '终审通过'
                break
            case 6:
                return '终审拒绝'
                break
            case 7:
                return '生成合同'
                break
            default:
                return '出错了'
    }
}
},
data() {
    return {
      rows:0,
      rules: {
            name: [
            { required: true, message: "请输入姓名", trigger: "change" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],

    },
      updateForm:{
        id:'',
        name:'',
        sex:''
      },
      dialogVisible :false,
        query:'',
        parmas:{
      pageNo:1,
      pageSize:10,
    },
        tableData: [],
       
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
            label: "性别",
            prop: "sex",
        },
        {
            label: "教育程度",
            prop: "education",
        },
        {
            label: "居住地址",
            prop: "address1",
        },
        {
            label: "手机号",
            prop: "mobile_phone",
        },
        {
            label: "申请状态",
            prop: "status",
        },
        {
            label: "操作",
            width: "280",
            prop: "opts",
        },
    ],
    }
    
  },

methods:{  
  handleCurrentChange(pageNo){
   this.parmas.pageNo=pageNo
   this.getloanlist()
  },
  updateSize(pageSize){
this.parmas.pageSize=pageSize
this.getloanlist()
  },
  showEdit(row){
    console.log('@@@@@@@@',row.id);
    this.updateForm.id=row.id
    this.updateForm.name=row.name
    this.updateForm.sex=row.sex
    this.dialogVisible=true
},
async submitUpdate(){
    let res =await updateloan(this.updateForm)
    console.log('@@',this.updateForm);
    console.log(res);
    if(res.data.code===20000){
        this.cleanFrom()

        this.dialogVisible=false
        this.getloanlist()         
    }

},
  cleanFrom(){
    this.updateForm.name=''
    this.updateForm.sex=''
  },
  async submitApplication(id){
   
    let res=await submitloan(id)
    if(res.data.code===20000){
        this.getloanlist()
       }
    
  },
  async deleteApplication(id){
   
    console.log(id);
    let res =  await deleteloan(id)
    //20000代表成功，成功后重新获取数据 
    if(res.data.code===20000){
        this.getloanlist()
    }
},
 
  editApplication(row){
    // console.log(row);
    this.dialogVisible = true
    // let ress=await updateloan(row)
    // console.log(ress);
  },
   setQueryName(){
        this.parmas.name=this.query
        console.log(this.parmas);
         this.getloanlist()
        // this.parmas.name=null
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
    getsex(sex){
      return sex==='man'?'男':'女'
    },
    geteducation(education){
      return education==='colloge'?'大学':'高中'
    },
   async getloanlist(){

    console.log('###',this.parmas);
    let res=await  getloanlist(this.parmas)
    console.log('&&&&&',res);
    if(res?.data?.code===20000){
    this.tableData=res.data.data.data.data.map(item=>{
      item.birthday=this.getbirthday(item.birthday)
      item.sex=this.getsex(item.sex)
      item.education=this.geteducation(item.education)
      return item
    })
    this.rows=res.data.data.rows
    }
    },
  
},
mounted(){
  this.getloanlist( )
}
}

</script>

<style scoped>                      
.el-row{
    margin-bottom:10px
}
</style>