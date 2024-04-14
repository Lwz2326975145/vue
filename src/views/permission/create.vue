/<template>

    <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-row>
            <el-col
                :xl=12 :lg=12
                :md=12 :sm=24 :xs=24>
                <el-form-item label="用户名" prop="username">
                    <el-input  type='input' v-model="form.username" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col
                :xl=12 :lg=12
                :md=12 :sm=24 :xs=24>
                <el-form-item label="密码" prop="password">
                    <el-input  type='password' v-model="form.password" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col
                :xl=12 :lg=12
                :md=12 :sm=24 :xs=24>
                <el-form-item label="确认密码" prop="confirmPwd">
                    <el-input  type='password' v-model="form.confirmPwd" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col
                :xl=8 :lg=8
                :md=12 :sm=24 :xs=24>
                <el-form-item label="权限分配" prop="permission">
                    <el-radio v-model="form.permission"  label='2' >销售人员</el-radio>
                    <el-radio v-model="form.permission"  label='1' >初审人员</el-radio>
                </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        <div class="left">
    <el-button @click="doCreate" type="primary">创建管理员</el-button>
    <el-button @click="doReset">重置</el-button>
</div>
 
    </div>
     

</template>

<script>
import {create} from '@/apis/loan'
export default {
data(){
    return {
        form:{
     username:'',
     password:'',
     confirmPwd:'',
     permission:'2'
 },
 rules: {
        username: [{ required: true ,message:'必须输入用户名' }],
        password: [{ required: true ,message:'必须输入密码'}],
            //validatePass2方法检测两次密码是否一致
        confirmPwd:[{required: true , validator: this.validatePass2, trigger: 'blur' }],
        permission:[{ required: true  }]
 }
    }
},
methods:{
    validatePass2(){

    },
    async doCreate(){
        if(this.form.confirmPwd!==this.form.password){
            this.$message('两次密码不同')
        }
        else{
        let res =await create(this.form)
        console.log(res);
        if(res.data.code===20000){
            this.doReset()
        }
        }
    },
    doReset(){
        this.$refs['form'].resetFields()
    }

},
}
</script>

<style>

</style>