<template>
	<div class="tab_container">
		<el-tabs v-model="activeName">
			<el-tab-pane label="预约车辆" name="first">
				<div class="search">
					<el-input v-model="tableDataName" placeholder="请输入姓名或物料名" style="width:10rem"></el-input>
					<el-button type="primary" @click="doFilter">搜索</el-button>
					<el-button type="primary" @click="exportExcel">导出Excel</el-button>
				</div>
				<el-table :data="tableDataEnd" id="out-table" border style="width: auto">
					<el-table-column prop="date" label="日期" align="center" width="180">
					</el-table-column>
					<el-table-column prop="name" label="司机姓名" align="center" width="100">
					</el-table-column>
					<el-table-column prop="car_number" label="车牌号" align="center" width="120">
					</el-table-column>
					<el-table-column prop="materiel" label="物料" align="center" width="120">
					</el-table-column>
					<el-table-column prop="phone" label="手机号" align="center" width="120">
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
				 :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="totalItems">
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane label="待称重车辆" name="second">
				<div class="search">
					<el-input v-model="tableDataName" placeholder="请输入姓名或物料名" style="width:10rem"></el-input>
					<el-button type="primary" @click="doFilter">搜索</el-button>
					<el-button type="primary" @click="exportExcel2">导出Excel</el-button>
				</div>
				<el-table :data="tableDataEnd" id='table2' border style="width: auto">
					<el-table-column prop="date" label="日期" align="center" width="180">
					</el-table-column>
					<el-table-column prop="name" label="司机姓名" align="center" width="100">
					</el-table-column>
					<el-table-column prop="car_number" label="车牌号" align="center" width="120">
					</el-table-column>
					<el-table-column prop="materiel" label="物料" align="center" width="120">
					</el-table-column>
					<el-table-column prop="phone" label="手机号" align="center" width="120">
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
				 :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="totalItems">
				</el-pagination>
			</el-tab-pane>
			<el-tab-pane label="待去皮车辆" name="third">
				<div class="search">
					<el-input v-model="tableDataName" placeholder="请输入姓名或物料名" style="width:10rem"></el-input>
					<el-button type="primary" @click="doFilter">搜索</el-button>
					<el-button type="primary" @click="exportExcel3">导出Excel</el-button>
				</div>
				<el-table :data="tableDataEnd" id='table3' border style="width: auto">
					<el-table-column prop="date" label="日期" align="center" width="180">
					</el-table-column>
					<el-table-column prop="name" label="司机姓名" align="center" width="100">
					</el-table-column>
					<el-table-column prop="car_number" label="车牌号" align="center" width="120">
					</el-table-column>
					<el-table-column prop="materiel" label="物料" align="center" width="120">
					</el-table-column>
					<el-table-column prop="phone" label="手机号" align="center" width="120">
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
				 :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="totalItems">
				</el-pagination>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import FileSaver from "file-saver";
	import XLSX from "xlsx";
	export default {
		data() {
			return {
				activeName: 'first',
				tableDataBegin: [{
						date: "2016-05-01",
						name: "王小虎",
						materiel: "物料1",
						phone: '13544475555',
						car_number: '豫G12745'
					},
					{
						date: "2016-05-02",
						name: "王小虎",
						materiel: "物料2",
						phone: '13544445555',
						car_number: '豫G12385'
					},
					{
						date: "2016-05-03",
						name: "王二虎",
						materiel: "物料3",
						phone: '13544445555',
						car_number: '豫G17345'
					},
					{
						date: "2016-05-04",
						name: "王二虎",
						materiel: "物料1",
						phone: '13544445755',
						car_number: '豫G12845'
					},
					{
						date: "2016-05-05",
						name: "王三虎",
						materiel: "物料2",
						phone: '13544446666',
						car_number: '豫G54321'
					}
				],
				tableDataName: "",
				tableDataEnd: [],
				currentPage: 1,
				totalItems: 0,
				pageSize: 10,
				filterTableDataEnd: [],
				flag: false
			};
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
			//定义导出Excel表格事件
			exportExcel() {
				/* 从表生成工作簿对象 */
				var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
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
						"预约车辆.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			},
			exportExcel2(){
				/* 从表生成工作簿对象 */
				var wb = XLSX.utils.table_to_book(document.querySelector("#table2"));
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
						"待称重车辆.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			},
			exportExcel3(){
				/* 从表生成工作簿对象 */
				var wb = XLSX.utils.table_to_book(document.querySelector("#table3"));
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
						"待去皮车辆.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
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
					if (value.name) {
						if (value.name.indexOf(this.tableDataName) >= 0) {
							this.filterTableDataEnd.push(value)
						}
					}
					if (value.materiel) {
						if (value.materiel.indexOf(this.tableDataName) >= 0) {
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
			}
		}
	};
</script>
<style scoped="scoped">
	.tab_container {
		width: 96%;
		margin-left: 2%;
	}

	.search {
		margin-top: 0.9375rem;
		margin-bottom: 0.9375rem;
	}
	.el-button{
		margin-left: 0rem;
	}
</style>
