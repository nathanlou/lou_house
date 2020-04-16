<template>
  <div>
    <div class="back">
      <el-button type="success" icon="el-icon-back" @click="list">返回列表</el-button>
      <el-button type="primary" icon="el-icon-back" @click="back">返回上一页</el-button>
    </div>
    <div class="modify_container">
      <div class="title">修改设备信息</div>
    </div>
    <div class="modify_form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="企业" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="设备编号" prop="equipment">
              {{equipment_num}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="企业内部编号" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="SMI卡号" prop="SMI">
              <el-input v-model="ruleForm.SMI"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="工地名称" prop="field">
              <el-input v-model="ruleForm.field"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="负责人" prop="people">
              <el-input v-model="ruleForm.people"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="型号" prop="model">
              <el-input v-model="ruleForm.model"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="容量" prop="capacity">
              <el-input v-model="ruleForm.capacity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="归属企业" prop="model">
              <el-input v-model="ruleForm.ascription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        equipment_num: 'QHW001G209290002',
        ruleForm: {
          name: '德邦物流',
          region: '',
          SMI: '1440114354003',
          field: '里加的',
          people: '裂开了',
          phone:'13568594454',
          model:'称重',
          capacity:'45'+'吨',
          ascription:'周口大公司'
        },
        rules: {
          name: [{
            required: true,
            message: '请输入企业内部编号',
            trigger: 'blur'
          }],
          region: [{
            required: true,
            message: '请选择公司',
            trigger: 'change'
          }],
          SMI: [{
            required: true,
            message: '请输入SMI卡号',
            trigger: 'blur'
          }],
          field: [{
            required: true,
            message: '请输入工地名称',
            trigger: 'blur'
          }],
          people: [{
            required: true,
            message: '请输入负责人',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }],
          model: [{
            required: true,
            message: '请输入型号',
            trigger: 'blur'
          }],
          capacity:[{
            required: true,
            message: '请输入容量',
            trigger: 'blur'
          }],
          ascription:[{
            required: true,
            message: '请输入归属企业',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      list() {
        this.$router.go(-2);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created() {

    }
  }
</script>

<style scoped="scoped">
  .back {
    width: 100%;
    background-color: #f9f9f9;
  }

  .back button {
    margin: 1%;
    margin-left: 2%;
  }

  .modify_container {
    width: 90%;
    margin-left: 5%;
    margin-top: 2%;
    text-align: -moz-center;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .modify_form {
    width: 80%;
    margin-left: 10%;
    margin-top: 2%;
  }

  .el-form-item__label {
    width: 9.375rem !important;
  }

  .el-input {
    width: 17.5rem;
  }

  .el-form-item__error {
    left: 3.125rem;
  }
</style>
