/<template>
   <div>
      <!-- 如果菜单没有children-->       <!-- index需要接收跳转路由的地址-->
    <el-menu-item v-if="!menu.children" :index="menu.path">
      <template slot="title">
        <span>{{menu.title}}</span>
        </template>
    </el-menu-item>
      
        <!-- 如果菜单有children-->  
    <el-submenu v-else :index="menu.path">
      <template slot="title">
        <span>{{menu.title}}</span>
        </template>
        		<!-- 递归调用本组件-->  
        <user v-for="(item,index) in menu.children" :key="index" :menu="item"/>
    </el-submenu>
  </div>
</template>

<script>
export default {
name:'user',
props:{
     
    menu:{
      type:Object
    }
  }
}
</script>

<style>

</style>