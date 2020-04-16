<template>
  <div>
    <div class="back">
      <el-button type="primary" icon="el-icon-back" @click="back">返回列表</el-button>
    </div>
    <div class="details_container">
      <table class="inner">
        <caption>设备信息</caption>
        <tr>
          <td class="msg_title">设备编号:</td>
          <td>QHW001G200290001</td>
          <td class="msg_title">负责人:</td>
          <td>裂开了</td>
        </tr>
        <tr>
          <td class="msg_title">内部编号:</td>
          <td>51</td>
         <td class="msg_title">SIM卡号:</td>
          <td>1440114106585</td>
        </tr>
        <tr>
          <td class="msg_title">工地名称:</td>
          <td>礼家地产</td>
         <td class="msg_title">手机:</td>
          <td>19689745136</td>
        </tr>
        <tr>
         <td class="msg_title">型号:</td>
          <td>称重</td>
         <td class="msg_title">容量:</td>
          <td>45吨</td>
        </tr>
        <tr>
          <td class="msg_title">归属企业:</td>
          <td>周口大公司</td>
          <td class="msg_title">注册状态:</td>
          <td>正式注册</td>
        </tr>
        <tr>
          <td class="msg_title">创建时间:</td>
          <td>2019-06-08 11:09:02</td>
          <td class="msg_title">创建人:</td>
          <td>zzxy123</td>
        </tr>
        <tr>
          <td class="msg_title">操作:</td>
          <td colspan="3">
            <el-button type="success" round icon="el-icon-edit" @click='edit'>编辑</el-button>
            <el-button type="danger" round icon="el-icon-delete" @click='dialogVisible = true'>删除</el-button>
          </td>
        </tr>
      </table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span class="el-icon-warning tips"> 确定要删除吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div class="view_container">
        <div class="view">
          <div>实时重量</div>
          <div>9131kg</div>
          <div>自动模式</div>
          <div class="speed">
            <el-progress :stroke-width="24" :percentage="percentage" status="success"></el-progress>
          </div>
          <div class="speed_number">{{percentage}}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        percentage:'70'
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      edit(){
        this.$router.push({path:'/modify_una'})
      }
    },
    created() {

    },
  }
</script>

<style>
  .details_container {
    width: 96%;
    margin-left: 2%;
    display: flex;
  }

  .inner,
  .inner tr th,
  .inner tr td {
    border: 1px solid gainsboro;
  }

  .details_container .inner tr td {
    width: 12.25rem;
    padding: 2%;
    font-size: 0.9375rem;
  }

  .details_container .inner {
    text-align: left;
    border-collapse: collapse;
  }

  .details_container .inner caption {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 2%;
    margin-top: 2%;
  }

  .view {
    background-image: url(../../assets/404_images/tc.png);
    background-size: 100% 100%;
    width: 28.125rem;
    height: 25.3125rem;
    margin: 2%;
    padding-top: 6.25rem;
    position: relative;
    text-align: center;
  }

  .speed {
    width: 25rem;
    margin-left: 28%;
    margin-top: 1.5625rem;
    transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    /* IE 9 */
    -webkit-transform: rotate(270deg);
    /* Safari and Chrome */
  }
  .speed_number{
    margin-left: 63%;
    margin-top: -11.5625rem;
  }

  .el-progress__text i {
    display: none !important;
  }
  .msg_title{
    background-color: #f9f9f9;
    text-align: right;
  }
  .back {
    width: 100%;
    background-color: #f9f9f9;
  }

  .back button {
    margin: 1%;
    margin-left: 2%;
  }
  .inner{
    -webkit-box-shadow: 1px 1px 3px;
  -moz-box-shadow: 1px 1px 3px;
  box-shadow: 1px 1px 3px;
  }
  .tips{
    font-size: 1.5rem;
  }
</style>
