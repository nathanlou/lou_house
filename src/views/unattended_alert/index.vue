<template>
	<div class="container">
		<div class="search">
			<el-input v-model="tableDataName" placeholder="请输入姓名或物料名" style="width:10rem"></el-input>
			<el-button type="primary" @click="doFilter">搜索</el-button>
			<el-button type="primary" @click="exportExcel">导出Excel</el-button>
		</div>
		<el-table :data="tableDataEnd" border style="width: auto;margin-top: 0.9375rem;">
			<el-table-column prop="date" align="center" label="日期" sortable width="180">
			</el-table-column>
			<el-table-column label="所属企业" align="center" width="150" prop="enterprise" :filters="this.enterprise" :filter-method="filterHandler">
			</el-table-column>
			<el-table-column label="车牌号" align="center" width="160" prop="car_number">
			</el-table-column>
			<el-table-column label="物料" align="center" width="90" prop="materiel">
			</el-table-column>
			<el-table-column label="毛重(吨)" align="center" width="90" prop="GW">
			</el-table-column>
			<el-table-column label="皮重(吨)" align="center" width="90" prop="TW">
			</el-table-column>
			<el-table-column label="净重(吨)" align="center" width="90" prop="NW">
			</el-table-column>
			<el-table-column label="金额(元)" align="center" width="100" prop="money">
			</el-table-column>
			<el-table-column prop="status" label="状态" align="center" width="100" :filters="[{ text: '在线', value: '在线' }, { text: '离线', value: '离线' }]"
			 :filter-method="filterTag" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag :type="scope.row.tag === '在线' ? 'primary' : 'success'" disable-transitions>{{scope.row.status}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
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
						date: '2016-05-02',
						car_number: '豫G90001',
						enterprise: '大企业',
						money: '10000',
						status: '在线',
						GW: '35',
						TW: '5',
						NW: '30',
						materiel: '物料1'
					},
					{
						id: "2",
						date: '2016-05-02',
						car_number: '豫G90002',
						enterprise: '大企业',
						money: '10000',
						status: '在线',
						GW: '35',
						TW: '5',
						NW: '30',
						materiel: '物料2'
					},
					{
						id: "3",
						date: '2016-05-02',
						car_number: '豫G90003',
						enterprise: '大企业',
						money: '10000',
						status: '在线',
						GW: '35',
						TW: '5',
						NW: '30',
						materiel: '物料3'
					},
					{
						id: "4",
						date: '2016-05-02',
						car_number: '豫G90004',
						enterprise: '大企业',
						money: '10000',
						status: '离线',
						GW: '35',
						TW: '5',
						NW: '30',
						materiel: '物料1'
					},
					{
						id: "5",
						date: '2016-05-02',
						car_number: '豫G90005',
						enterprise: '大企业',
						money: '10000',
						status: '在线',
						boot: '正常开机',
						GW: '35',
						TW: '5',
						NW: '30',
						materiel: '物料2'
					},
					{
						id: "6",
						date: '2016-05-02',
						car_number: '豫G90006',
						enterprise: '小企业',
						money: '10000',
						status: '离线',
						boot: '正常开机',
						GW: '35',
						TW: '5',
						NW: '30',
						materiel: '物料2'
					}
				],
				search: ''
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
			exportExcel() {
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
						"称重记录.xlsx"
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
			add() {
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
			handleDelete(index, row) {
				var that = this
				this.dialogVisible = true
				console.log(index, row)
				that.index = index
				// this.tableData.splice(index,1)
			},
			dele() {
				console.log(this.index)
				this.tableDataEnd.splice(this.index, 1)
				this.dialogVisible = false
			}
		}
	}
</script>
<style scoped>
	.container {
		width: 96%;
		margin-left: 2%;
	}

	.block {
		position: absolute;
		left: 2%;
	}

	.tips {
		font-size: 1.5rem;
	}
	.search {
		margin-top: 0.9375rem;
		margin-bottom: 0.9375rem;
	}
	.el-button{
		margin-left: 0rem;
	}
</style>
