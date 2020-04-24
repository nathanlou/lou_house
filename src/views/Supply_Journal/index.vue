<template>
	<div class="tab_container">
		<el-table :data="tableDataEnd" border style="width: auto">
			<el-table-column prop="date" align="center" label="日期" sortable width="180">
			</el-table-column>
			<el-table-column prop="time" align="center" label="时间" sortable width="180">
			</el-table-column>
			<el-table-column prop="operation" align="center" label="操作内容">
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
		 :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="totalItems">
		</el-pagination>
	</div>	
</template>

<script>
	export default {
		data() {
			return {
				tableDataBegin: [{
					date: '2016-05-02',
					time: '13.25',
					operation: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					time: '13.05',
					operation: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					time: '13.45',
					operation: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					time: '10.45',
					operation: '上海市普陀区金沙江路 1516 弄'
				}],
				tableDataName: "",
				tableDataEnd: [],
				currentPage: 1,
				totalItems: 0,
				pageSize: 10,
				filterTableDataEnd: [],
				flag: false
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
		},
	}
</script>
<style scoped="scoped">
	.tab_container{
		width: 96%;
		margin-left: 2%;
		margin-top: 0.9375rem;
	}
</style>