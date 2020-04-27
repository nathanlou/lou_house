<template>
	<div class="app-container">
		<el-form :inline="true" ref="form" :model="form" label-width="80px" class="demo-form-inline">
			<el-input v-model="tableDataName" placeholder="请输入企业名称" style="width:10rem"></el-input>
			<el-button type="primary" @click="doFilter">搜索</el-button>
			<el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
			<el-button type="primary" @click="clearFilter">清除所有过滤器</el-button>
			<el-button type="primary" @click="exportExcel">导出Excel</el-button>
		</el-form>
		<!-- 添加 -->
		<el-dialog title="添加设备信息" :visible.sync="dialogFormVisible" width="85%" :before-close="handleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="企业" prop="region">
							<el-select v-model="ruleForm.region" placeholder="请选择">
								<el-option label="区域一" value="shanghai"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="设备编号" prop="equipment_num">
							<el-input v-model="ruleForm.equipment_num"></el-input>
						</el-form-item>
						<el-form-item label="内部编号" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="SMI卡号" prop="SMI">
							<el-input v-model="ruleForm.SMI"></el-input>
						</el-form-item>
						<el-form-item label="工地名称" prop="field">
							<el-input v-model="ruleForm.field"></el-input>
						</el-form-item>
						<el-form-item label="负责人" prop="people">
							<el-input v-model="ruleForm.people"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="ruleForm.phone"></el-input>
						</el-form-item>
						<el-form-item label="型号" prop="model">
							<el-input v-model="ruleForm.model"></el-input>
						</el-form-item>
						<el-form-item label="容量" prop="capacity">
							<el-input v-model="ruleForm.capacity"></el-input>
						</el-form-item>
						<el-form-item label="归属企业" prop="model">
							<el-input v-model="ruleForm.ascription"></el-input>
						</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 添加 -->
		<el-table :data="tableDataEnd" id='table' ref="filterTable" border style="width: auto;margin-top: 0.9375rem;">
			<el-table-column label="设备编号" align="center" width="160" sortable prop="equipment" column-key="equipment">
			</el-table-column>
			<el-table-column label="内部编号" align="center" width="120" prop="inside">
			</el-table-column>
			<el-table-column label="所属企业" align="center" width="150" prop="enterprise" :filters="this.enterprise" :filter-method="filterHandler">
			</el-table-column>
			<el-table-column label="工地名称" align="center" width="160" prop="field">
			</el-table-column>、
			<el-table-column label="模式" align="center" width="130" prop="pattern">
			</el-table-column>
			<el-table-column prop="status" label="状态" align="center" width="100" :filters="this.status" :filter-method="filterTag"
			 filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag :type="scope.row.tag === '在线' ? 'primary' : 'success'" disable-transitions>{{scope.row.status}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="开机状态" align="center" width="120" prop="boot">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
					<el-button size="mini" type="primary" @click="modifys(scope.$index, scope.row)">修改</el-button>
					<el-button size="mini" type="danger" @click='handleDelete(scope.$index, scope.row)'>删除</el-button>
					<el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
						<span class="el-icon-warning tips"> 确定要删除吗？</span>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="dele(scope.$index, scope.row)">确 定</el-button>
						</span>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页开始 -->
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="totalItems">
			</el-pagination>
		</div>
		<!-- 分页结束 -->
		<!-- 设备信息开始 -->
		<el-dialog title="查看设备信息" :visible.sync="adds" width="85%" :before-close="handleClose">
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
						<td class="msg_title">模式:</td>
						<td>单磅单向</td>
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
				</table>
			</div>
			<!-- <div class="view_container">
				<div class="view">
					<div>实时重量</div>
					<div>9131kg</div>
					<div>自动模式</div>
					<div class="speed">
						<el-progress :stroke-width="24" :percentage="percentage" status="success"></el-progress>
					</div>
					<div class="speed_number">{{percentage}}%</div>
				</div>
			</div> -->
		</el-dialog>
		<!-- 设备信息结束 -->
		<!-- 修改设备开始 -->
		<el-dialog title="修改设备信息" :visible.sync="modifyss" width="85%" :before-close="handleClose">
			<div class="modify_container">
			  <div class="title">修改设备信息</div>
			</div>
			<div class="modify_form">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			        <el-form-item label="企业" prop="region">
			          <el-select v-model="ruleForm.region" placeholder="请选择">
			            <el-option label="区域一" value="shanghai"></el-option>
			            <el-option label="区域二" value="beijing"></el-option>
			          </el-select>
			        </el-form-item>
			        <el-form-item label="设备编号" prop="equipment">
			          {{equipment_num}}
			        </el-form-item>
			        <el-form-item label="内部编号" prop="name">
			          <el-input v-model="ruleForm.name"></el-input>
			        </el-form-item>
			        <el-form-item label="SMI卡号" prop="SMI">
			          <el-input v-model="ruleForm.SMI"></el-input>
			        </el-form-item>
			        <el-form-item label="工地名称" prop="field">
			          <el-input v-model="ruleForm.field"></el-input>
			        </el-form-item>
			        <el-form-item label="负责人" prop="people">
			          <el-input v-model="ruleForm.people"></el-input>
			        </el-form-item>
			        <el-form-item label="手机号" prop="phone">
			          <el-input v-model="ruleForm.phone"></el-input>
			        </el-form-item>
			        <el-form-item label="模式" prop="pattern">
			          <el-select v-model="ruleForm.pattern" placeholder="请选择">
			            <el-option label="单磅单向" value="shanghai"></el-option>
						<el-option label="单磅双向" value="beijing"></el-option>
						<el-option label="双磅双向" value="shenzhen"></el-option>
			          </el-select>
			        </el-form-item>
			    <el-form-item>
			      <el-button type="primary" @click="submits('ruleForm')">确认修改</el-button>
			    </el-form-item>
			  </el-form>
			</div>
		</el-dialog>
		<!-- 修改设备结束 -->
	</div>
</template>

<script>
	import FileSaver from "file-saver";
	import XLSX from "xlsx";
	export default {
		data() {
			return {
				equipment_num: 'QHW001G209290002',
				modify: {
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
				  }]
				},
				percentage: '90',
				drawer: false,
				modifyss:false,
				ruleForm: {
					name: '',
					region: '',
					SMI: '',
					field: '',
					people: '',
					phone: '',
					pattern:''
				},
				dialogFormVisible: false,
				index: '',
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
				status: [{
					text: '在线',
					value: '在线'
				}, {
					text: '离线',
					value: '离线'
				}],
				enterprise: [{
					text: "大企业",
					value: '大企业'
				}, {
					text: "小企业",
					value: '小企业'
				}],
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
				adds:false,
				pagesize: 10, //每页的数据条数
				currentPage: 1, //默认开始页面
				tableDataName: "",
				tableDataEnd: [],
				totalItems: 0,
				pageSize: 10,
				filterTableDataEnd: [],
				flag: false,
				tableDataBegin: [{
						id: "1",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						enterprise: '大企业',
						field: '阿达西',
						pattern:'单磅单向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "2",
						equipment: 'QHW001G200290002',
						inside: '阿发2',
						enterprise: '大企业',
						field: '不急不急',
						pattern:'单磅双向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "3",
						equipment: 'QHW001G200290003',
						inside: '阿发2',
						enterprise: '大企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "4",
						equipment: 'QHW001G200290004',
						inside: '阿发2',
						enterprise: '大企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "5",
						equipment: 'QHW001G200290005',
						inside: '阿发2',
						enterprise: '大企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "6",
						equipment: 'QHW001G200290006',
						inside: '阿发2',
						enterprise: '小企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "7",
						equipment: 'QHW001G200290007',
						inside: '阿发2',
						enterprise: '大企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '离线',
						boot: '正常开机'
					},
					{
						id: "8",
						equipment: 'QHW001G200290008',
						inside: '阿发2',
						enterprise: '小企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "9",
						equipment: 'QHW001G200290009',
						inside: '阿发2',
						enterprise: '大企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '离线',
						boot: '正常开机'
					},
					{
						id: "10",
						equipment: 'QHW001G200290010',
						inside: '阿发10',
						enterprise: '小企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '离线',
						boot: '正常开机'
					},
					{
						id: "11",
						equipment: 'QHW001G200290011',
						inside: '阿发2',
						enterprise: '大企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '在线',
						boot: '正常开机'
					},
					{
						id: "12",
						equipment: 'QHW001G200290012',
						inside: '阿发2',
						enterprise: '小企业',
						field: '不急不急',
						pattern:'双磅双向',
						status: '离线',
						boot: '正常开机'
					},
				],
				search: '',
				deles: '',
				rules: {
					equipment_num: [{
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
					pattern: [{
						required: true,
						message: '请选择模式',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
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
			exportExcel(){
				/* 从表生成工作簿对象 */
				var wb = XLSX.utils.table_to_book(document.querySelector("#table"));
				/* 获取二进制字符串作为输出 */
				var wbout = XLSX.write(wb, {
					bookType: "xlsx",
					bookSST: true,
					type: "array"
				});
				try {
					FileSaver.saveAs(
						//Blob 对象表示一个不可变、原始数据的类文件对象。
						//Blob 表示的不一定是JavaScript原生格式的数据。
						//File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
						//返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
						new Blob([wbout], {
							type: "application/octet-stream"
						}),
						//设置导出文件名称
						"无人值守地磅设备列表.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			},
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
						this.tableDataEnd.unshift({
							name: this.ruleForm.name,
							equipment: this.ruleForm.equipment_num,
							inside: this.ruleForm.inside,
							field: this.ruleForm.field,
							capacity: this.ruleForm.capacity,
						});
						this.dialogFormVisible = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			add() {
				this.dialogFormVisible = false
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage;
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
				this.adds = true
			},
			modifys(index, row) {
				// console.log(index, row);
				this.modifyss = true
			},
			handleDelete(index, row) {
				this.dialogVisible = true
				this.i = index
				// this.tableDataEnd.splice(index,1)
			},
			dele: function(index, row) {
				this.dialogVisible = false
				this.tableDataEnd.splice(this.i, 1)
			},
			submits(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			      alert('submit!');
			    } else {
			      console.log('error submit!!');
			      return false;
			    }
			  });
			},
		}
	}
</script>
<style>
	.app-container {
		padding-bottom: 3%;
	}

	.block {
		left: 2%;
	}

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
		width: 26.125rem;
		height: 22.3125rem;
		margin: 2%;
		padding-top: 6.25rem;
		position: relative;
		text-align: center;
		line-height: 1.5;
	}

	.speed {
		width: 25rem;
		margin-left: 28%;
		transform: rotate(270deg);
		-ms-transform: rotate(270deg);
		/* IE 9 */
		-webkit-transform: rotate(270deg);
		/* Safari and Chrome */
	}

	.speed_number {
		margin-left: 18.125rem;
		margin-top: -11.5625rem;
	}

	.el-progress__text i {
		display: none !important;
	}

	.msg_title {
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

	.inner {
		-webkit-box-shadow: 1px 1px 3px;
		-moz-box-shadow: 1px 1px 3px;
		box-shadow: 1px 1px 3px;
	}

	.tips {
		font-size: 1.5rem;
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
	  margin-top: 5%;
	}
	.el-form-item{
		margin-bottom: 0.9375rem;
	}
	.el-form-item__error {
	  left: 3.125rem;
	}
	.el-button{
		margin-left: 0rem !important;
	}
</style>
