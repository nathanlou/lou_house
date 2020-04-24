<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" label-width="80px" class="demo-form-inline">
      	<el-input v-model="tableDataName" placeholder="请输入企业名称" style="width:15rem"></el-input>
      	<el-button type="primary" @click="doFilter">搜索</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
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
   <el-table :data="tableDataEnd" border style="width: auto;margin-top: 0.9375rem;">
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
              <el-button type="primary" @click="dele(scope.$index, scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
       :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="totalItems">
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
        pagesize: 10, //每页的数据条数
        currentPage: 1, //默认开始页面
				tableDataName: "",
				tableDataEnd: [],
				totalItems: 0,
				pageSize: 10,
				filterTableDataEnd: [],
				flag: false,
        tableDataBegin: [
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
		deles:'',
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
	created(){
		this.totalItems = this.tableDataBegin.length;
		if (this.totalItems > this.pageSize) {
			for (let index = 0; index < this.pageSize; index++) {
				this.tableDataEnd.push(this.tableDataBegin[index]);
			}
		} else {
			this.tableDataEnd = this.tableDataBegin;
		}
	},
    methods: {
			//前端搜索功能需要区分是否检索,因为对应的字段的索引不同
			//用两个变量接收currentChangePage函数的参数
			doFilter() {
				if (this.tableDataName == "") {
					this.$message.warning("查询条件不能为空！");
					return;
				}
				this.tableDataEnd = []
				//每次手动将数据置空,因为会出现多次点击搜索情况
				this.filterTableDataEnd = []
				this.tableDataBegin.forEach((value, index) => {
					if (value.enterprise) {
						if (value.enterprise.indexOf(this.tableDataName) >= 0) {
							this.filterTableDataEnd.push(value)
						}
					}
				});
				//页面数据改变重新统计数据数量和当前页
				this.currentPage = 1
				this.totalItems = this.filterTableDataEnd.length
				//渲染表格,根据值
				this.currentChangePage(this.filterTableDataEnd)
				//页面初始化数据需要判断是否检索过
				this.flag = true
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pageSize = val;
				this.handleCurrentChange(this.currentPage);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				//需要判断是否检索
				if (!this.flag) {
					//tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
					this.currentChangePage(this.tableDataBegin)
				} else {
					this.currentChangePage(this.filterTableDataEnd)
				}
			}, //组件自带监控当前页码
			currentChangePage(list) {
				let from = (this.currentPage - 1) * this.pageSize;
				let to = this.currentPage * this.pageSize;
				this.tableDataEnd = [];
				for (; from < to; from++) {
					if (list[from]) {
						this.tableDataEnd.push(list[from]);
					}
				}
			},
		submitForm(formName) {
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
			this.tableDataEnd.unshift({name:this.ruleForm.name,equipment:this.ruleForm.equipment_num,
			inside:this.ruleForm.inside,enterprise:this.ruleForm.ascription,field:this.ruleForm.field,
			capacity:this.ruleForm.capacity,
			});
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
        // console.log('submit!');
      },
      handleEdit(index, row) {
        // console.log(index, row);
        this.$router.push({
          path: '/device_details'
        })
      },
      handleDelete(index,row) {
		  this.dialogVisible = true 
		   this.i = index
		   // this.tableDataEnd.splice(index,1)
      },
	  dele:function(index,row){
		  this.dialogVisible = false
	  	this.tableDataEnd.splice(this.i,1)
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
