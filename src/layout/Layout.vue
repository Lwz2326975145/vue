<template>
 <div class="box">
  <el-container>
    <el-aside width="240px">
            <el-menu   class="el-menu-vertical-demo" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b">
                <!--//没有二级导航的 -->
                 <el-menu-item index="1">
                    <span slot="title"> 
                      <router-link  to="/Home" active-class="active">首页</router-link>
                    </span>
                 </el-menu-item>
                
			 <!--	//有二级导航的 -->
                <el-submenu index="2">
                        <template slot="title">
                        <span>贷款管理</span>
                        </template>
                      <el-menu-item index="2-1">
                         <router-link to="/loan/indexview">申请</router-link>
                      </el-menu-item>
                </el-submenu>   
                <el-submenu index="3">
     <template slot="title">
         <span>申请管理</span>
     </template>
     <el-menu-item index="3-1">
         <router-link to='/ListView/index'>申请列表</router-link>
     </el-menu-item>
</el-submenu> 
<el-submenu index="4">
     <template slot="title">
         <span>带宽审批</span>
     </template>
     <el-menu-item index="4-1">
         <router-link to='/loan-approve/first'>初审</router-link>
     </el-menu-item>
     <el-menu-item index="4-2">
         <router-link to='/loan-approve/end'>终审</router-link>
     </el-menu-item>
</el-submenu> 
<el-submenu index="5">
     <template slot="title">
         <span>合同管理</span>
     </template>
     <el-menu-item index="5-1">
         <router-link to='/contract/list'>合同列表</router-link>
     </el-menu-item>
  
</el-submenu> 
<el-submenu index="6">
    <template slot="title">
        <span>权限管理</span>
    </template>
    <el-menu-item index="6-1">
        <router-link to='/permission/create'>创建管理员</router-link>
    </el-menu-item>
    <el-menu-item index="6-2">
        <router-link to='/permission/list'>列表展示</router-link>
    </el-menu-item>
</el-submenu> 

            </el-menu>

</el-aside>
  <el-container>
    <el-header>
               <!--//左侧面包屑-->
               <div class="left">
                   <Break></Break>
                </div>
     			<!--//右侧用户名-->
                <div class="right">
                   <!--// //下拉菜单-->
                   <el-dropdown @command="handleCommand">
                       
                    <span class="el-dropdown-link"> {{ username }}</span>
                       
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item  command="logout"> 
                          退出登录
                          <!-- <router-link to="/login"> <p >退出登录</p></router-link> -->
                        </el-dropdown-item>
                    </el-dropdown-menu>
                       
                  </el-dropdown>
                </div>
 </el-header>
 <el-main>
              <router-view></router-view>

                
</el-main>
  </el-container>
</el-container></div>
</template>

<script>
import user from "@/components/user.vue"
import Break from '../components/Break.vue'
import { logout } from '../apis/user'
export default {
components:{Break,user},
methods:{
//   async handleCommand(command){

//     if(command==="logout")
// { console.log('333');
//   const res =await logout()
//   console.log(res);
// }   
//   }
async  handleCommand(command){
    if(command==="logout"){
      
        let res =   await logout()
        if(res.data.code===603){
         console.log(res);
            this.$router.replace("/login")
            localStorage.clear()
            // window.location.reload()//清楚路由信息和缓存
        }
    }
}
},
computed:{

        menuList(){
            return this.$store.state.menulist
        },
    
  username(){
    return this.$store.state.username
  }
}
}
</script>

<style scoped>
 p{
  color: #333;
}
.el-header[data-v-82a49174]{
  background-color: gray;
}
a:link {
  text-decoration: none;
  color: #fff;

}

/* 状态二: 已经访问过的链接 */
a:visited {
  text-decoration: none;
  color: #fff;
}

/* 状态三: 鼠标划过(停留)的链接(默认红色) */
a:hover {
  text-decoration: none;
  color: #fff;
}
/* 状态四: 被点击的链接 */
a:active {
  text-decoration: none;
  color: #fff;
}
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
   
    background-color:#C0C0C0	 ;

}

.el-container {
    height: 100vh;
}
.el-menu-vertical-demo {
    border:none;
}
.router-link-exact-active{
color: rgb(255, 208, 75) !important;
}

</style>