<template>
  <div class="security_container">
    <el-row :gutter="20">
      <el-col :span="6" class="security" v-for="(item,index) in security_list" :key="index">
        <div>{{index+1}}号仓</div>
        <div class="msg">
          <div>物料余量</div>
          <div>{{item.number}}吨</div>
         </div>
        <div class="status">状态：{{item.status}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    data(){
      return{
       security_list:[
         {
          number:"400",
          status:'离线'
         },
         {
          number:"400",
          status:'在线'
         },
          {
          number:"400",
          status:'离线'
         },
         {
          number:"400",
          status:'在线'
         },
          {
          number:"400",
          status:'离线'
         },
         {
          number:"400",
          status:'在线'
         },
          {
          number:"400",
          status:'离线'
         },
         {
          number:"400",
          status:'在线'
         },
         {
          number:"400",
          status:'离线'
         },
         {
          number:"400",
          status:'在线'
         }
       ]
      }
    }
  }
</script>

<style scoped="scoped">
  .security_container {
    width: 96%;
    margin-left: 2%;
    text-align: center;
  }

  .security {
    height: 16.875rem;
    background-image: url(../../assets/404_images/tc.png);
    background-size: 100% 100%;
    margin-top: 2%;
  }
  .msg{
    margin-top: 3.5rem;
  }
  .status{
    margin-top: 1.5%;
  }
</style>
