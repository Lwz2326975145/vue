<template>
    <div id="input-manager">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column
                             v-for="(item, index) in columns"
                             :key="index"
                             :prop="item.prop"
                             :label="item.label"
                             :width="item.width"
                             align="center"
                             >
            </el-table-column>
        </el-table>
   
    </div>
</template>

<script>
import {userlist} from '@/apis/loan'
export default {
data(){
   return {
    rows:0,
    tableData:[],
    columns:[
    {
            label: "用户名",
            prop: "account",
            width: "80",
        },
        {
            label: "密码",
            prop: "password",
            width: "160",
        },
        {
            label: "创建时间",
            prop: "reg_time",
        },
        {
            label: "创建者",
            prop: "creator",
        },
        {
            label: "权限分配",
            prop: "role_name",
        },
       
    ]
   }

},
methods:{
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
    async getlist(){
         let res=await userlist()
         console.log(res);
         if(res.data.code==20000)
          { this.tableData=res.data.data.map((item)=>{
            item.reg_time=this.getbirthday(item.reg_time)
            if(item.role_name=='input'){
                item.role_name='销售人员'
            }
            else if(item.role_name=='administrator'){
                item.role_name='超级管理员'
            }
            else{
                item.role_name='初审专员'
            }
            return item
          })
        }
    }
},
mounted(){
    this.getlist()
}
}
</script>

<style>

</style>