/<template>
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">{{ route }}</a></el-breadcrumb-item>
 
</el-breadcrumb>
</template>

<script>

export default {
computed:{

    route(){
        let matched =this.$route.matched
        return matched[matched.length-1].meta.title!=='首页'? matched[matched.length-1].meta.title:''

    }
}
}
</script>

<style>

</style>