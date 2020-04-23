<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" label-width="80px" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="search" placeholder="内部编号、工地名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
	<!-- 添加 -->
	<el-dialog title="添加设备信息" :visible.sync="dialogFormVisible">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-row type="flex" class="row-bg">
		    <el-col :span="10">
		      <el-form-item label="企业" prop="region">
		        <el-select v-model="ruleForm.region" placeholder="请选择">
		          <el-option label="区域一" value="shanghai"></el-option>
		        </el-select>
		      </el-form-item>
		    </el-col>
		    <el-col :span="14">
		      <el-form-item label="设备编号" prop="equipment_num">
		        <el-input v-model="ruleForm.equipment_num"></el-input>
		      </el-form-item>
		    </el-col>
		  </el-row>
		  <el-row type="flex" class="row-bg">
		    <el-col :span="10">
		      <el-form-item label="内部编号" prop="name">
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
		    <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
	<!-- 添加 -->
    <el-table border ref='tableData' :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="设备编号" align="center" width="160" sortable prop="equipment" column-key="equipment">
      </el-table-column>
      <el-table-column label="内部编号" align="center" width="120" prop="inside">
      </el-table-column>
      <el-table-column label="所属企业" align="center" width="150" prop="enterprise" :filters="this.enterprise"
      :filter-method="filterHandler">
      </el-table-column>
      <el-table-column label="工地名称" align="center" width="160" prop="field">
      </el-table-column>、
      <el-table-column label="容量(吨)" align="center" width="80" prop="capacity">
      </el-table-column>
      <el-table-column label="余量(KG)" align="center" width="80" prop="allowance">
      </el-table-column>
      <el-table-column label="缺料报警" align="center" width="80" prop="police">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100"
      :filters="this.status"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '在线' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.status}}</el-tag>
      </template>
	  </el-table-column>
      <el-table-column label="开机状态" align="center" width="120" prop="boot">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click='handleDelete(scope.$index, scope.row)'>删除</el-button>
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span class="el-icon-warning tips"> 确定要删除吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dele">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="current_change" layout="total,  prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
		  ruleForm: {
		    name: '',
		    region: '',
		    SMI: '',
		    field: '',
		    people: '',
		    phone:'',
		    model:'',
		    capacity:'',
		    ascription:''
		  },
		   dialogFormVisible: false,
        index:'',
        region: [{
            name: "上海",
            value: 'shanghai'
          },
          {
            name: '北京科技看接口',
            value: 'beijing'
          },
          {
            name: '深圳',
            value: 'shenzhen'
          }
        ],
        status: [{ text: '在线', value: '在线' }, { text: '离线', value: '离线' }],
		enterprise:[{text:"大企业",value:'大企业'},{text:"小企业",value:'小企业'}],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
		formLabelWidth: '120px',
        dialogVisible: false,
        total: 0, //默认数据总数
        pagesize: 10, //每页的数据条数
        currentPage: 1, //默认开始页面
        tableData: [
          {
            id:"1",
            equipment: 'QHW001G200290001',
            inside:'阿发1',
            enterprise:'大企业',
            field:'阿达西',
            capacity:'50',
            allowance:'4513',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"2",
            equipment: 'QHW001G200290002',
            inside:'阿发2',
            enterprise:'大企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"3",
            equipment: 'QHW001G200290003',
            inside:'阿发2',
            enterprise:'大企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"4",
            equipment: 'QHW001G200290004',
            inside:'阿发2',
            enterprise:'大企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"5",
            equipment: 'QHW001G200290005',
            inside:'阿发2',
            enterprise:'大企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"6",
            equipment: 'QHW001G200290006',
            inside:'阿发2',
            enterprise:'小企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"7",
            equipment: 'QHW001G200290007',
            inside:'阿发2',
            enterprise:'大企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'离线',
            boot:'正常开机'
          },
          {
            id:"8",
            equipment: 'QHW001G200290008',
            inside:'阿发2',
            enterprise:'小企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"9",
            equipment: 'QHW001G200290009',
            inside:'阿发2',
            enterprise:'大企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'离线',
            boot:'正常开机'
          },
          {
            id:"10",
            equipment: 'QHW001G200290010',
            inside:'阿发10',
           enterprise:'小企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'离线',
            boot:'正常开机'
          },
          {
            id:"11",
            equipment: 'QHW001G200290011',
            inside:'阿发2',
            enterprise:'大企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"12",
            equipment: 'QHW001G200290012',
            inside:'阿发2',
            enterprise:'小企业',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'离线',
            boot:'正常开机'
          },
        ],
        search: '',
		rules: {
		equipment_num:[{
		        required: true,
		        message: '请输入设备编号',
		        trigger: 'blur'
		      }],
		      name: [{
		        required: true,
		        message: '请输入内部编号',
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
      }
    },
	computed:{
		// 模糊搜索
	  tables () {
	    const search = this.search
	    if (search) {
	      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
	      // 注意： filter() 不会对空数组进行检测。
	      // 注意： filter() 不会改变原始数组。
	      return this.tableData.filter(data => {
	        // some() 方法用于检测数组中的元素是否满足指定条件;
	        // some() 方法会依次执行数组的每个元素：
	        // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
	        // 如果没有满足条件的元素，则返回false。
	        // 注意： some() 不会对空数组进行检测。
	        // 注意： some() 不会改变原始数组。
	        return Object.keys(data).some(key => {
	          // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
	          // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
	          return String(data[key]).toLowerCase().indexOf(search) > -1
	        })
	      })
	    }
	    return this.tableData
	  }
	},
    methods: {
		submitForm(formName) {
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
			  this.dialogFormVisible = false;
		    } else {
		      console.log('error submit!!');
		      return false;
		    }
		  });
		},
		add(){
			this.dialogFormVisible = false
		},
		current_change: function(currentPage) {
		  this.currentPage = currentPage;
		},
		resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.status === value;
      },
	  filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      onSubmit() {
        console.log('submit!');
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({
          path: '/device_details'
        })
      },
      handleDelete(index,row) {
        var that = this
        this.dialogVisible = true
        console.log(index,row)
        that.index = row
        // this.tableData.splice(index,1)
      },
      dele(){
          console.log(this.index)
          this.tableData.splice(this.index,1)
          this.dialogVisible = false
      }
    }
  }
</script>
<style scoped>
	.app-container{
		padding-bottom: 3%;
	}
  .block {
    position: absolute;
    left: 2%;
  }

  .tips {
    font-size: 1.5rem;
  }
</style>
