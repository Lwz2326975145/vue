/<template>

    <div class="login-box">
    <div class="login-input-box">
      <h1>后台管理洗通</h1>
      <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="user">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
 </el-form> -->
 <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
    
    <el-form-item prop="username">
      <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
    </el-form-item>

    <el-form-item prop="pass">
      <el-input prefix-icon="el-icon-s-order" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>

    <el-button type="primary" @click="submitForm">提交</el-button>
  </el-form>
    </div>
  </div>


</template>

<script>
import {doLogin, user} from '../apis/user'
import store from '@/store'
export default {
name:'Login',
data(){
    return{
     
        rules: {
        pass: [
          {
            validator: this.validatePass,
            trigger: "blur"
          }
        ],
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }]
      },
        ruleForm: {
                username: "",
                pass: ""
}
    }
},
methods:{
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于6位数"));
      } else {
        callback();
      }
    },
 submitForm(){
 this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 如果验证通过，
         //调用login方法，传入登录信息，下面会定义
         this.login(this.ruleForm)
        } else {
         
          return false;
        }
      });
  },
  async login(form){
    let cod=await doLogin(form)
    if(cod.data.code==20000){
      if (cod?.data?.data?.token) {
            localStorage.setItem('token',cod?.data?.data?.token)
             this.$store.commit('UPDATE',this.ruleForm.username)
            // 跳转到首页
             this.$router.replace("/home");
            
        }
        
      } else {
        this.$message.error('登录失败!!!');
      }
  
}
      
   
},

}
</script>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
.login-input-box {
  width: 650px;
  height: 320px;
  background: #fff;
  text-align: center;
  padding: 40px 40px 12px 12px;
}

.login-box {
    display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url(../assets/bg2.jpg);
  background-size: cover;
}

.el-button {
  width: 600px;
}

.el-input {
  width: 600px;
  margin-bottom: 16px;
}

::v-deep .el-input__inner {
  background: #e5e5e5;
}
</style>