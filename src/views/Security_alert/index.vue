<template>
	<div class="app-container">
		<el-table ref='tableData' :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
		 border>
			<el-table-column label="设备编号" align="center" width="160" prop="equipment" column-key="equipment">
			</el-table-column>
			<el-table-column label="内部编号" align="center" width="120" prop="inside">
			</el-table-column>
			<el-table-column label="报警类型" align="center" width="150" prop="type">
			</el-table-column>
			<el-table-column label="报警描述" align="center" width="360" prop="describe">
			</el-table-column>
			<el-table-column label="处置状态" align="center" width="90" prop="status">
			</el-table-column>
			<el-table-column label="报警时间" align="center" width="160" prop="data">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">处置</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @current-change="current_change" layout="total,  prev, pager, next, jumper" :total="tableData.length">
			</el-pagination>
		</div>
		<!-- 处置弹窗开始 -->
		<el-dialog title="处置报警" :visible.sync="dialogVisible" width="80%" :before-close="handleClose" class='Handle'>
			<div>设备编号：{{equipment}}</div>
			<div>报警信息：{{describe}}</div>
			<div>
				处置周期：<el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="opinion">
				处置意见：<el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea">
				</el-input>
			</div>
			<div class='button'>
				<el-button type="primary" @click='Handle'>确认处置</el-button>
				<el-button @click='dialogVisible = false'>取消</el-button>
			</div>
		</el-dialog>
		<!-- 处置弹窗结束 -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				textarea: '',
				options: [{
						value: '选项1',
						label: '30分钟'
					}, {
						value: '选项2',
						label: '1小时'
					}, {
						value: '选项3',
						label: '3小时'
					}, {
						value: '选项4',
						label: '6小时'
					}, {
						value: '选项5',
						label: '12小时'
					},
					{
						value: '选项6',
						label: '一天'
					}
				],
				value: '',
				equipment: 'QHW001G200290001',
				describe: '缺料状态，当前砂浆罐重量：0kg',
				dialogVisible: false,
				total: 0, //默认数据总数
				pagesize: 10, //每页的数据条数
				currentPage: 1, //默认开始页面
				tableData: [{
						id: "1",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "2",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "3",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "4",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "5",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "6",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "7",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "8",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "9",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "10",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "11",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					},
					{
						id: "12",
						equipment: 'QHW001G200290001',
						inside: '阿发1',
						type: '缺料',
						describe: '缺料状态，当前砂浆罐重量：0kg',
						status: '未处置',
						data: '2020-04-23'
					}
				]
			}
		},
		methods: {
			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			handleEdit(index, row) {
				console.log(index, row);
				this.dialogVisible = true
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			Handle(){
				this.dialogVisible = false
			}
		},
		computed: {
			// 模糊搜索
			tables() {
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
		}
	}
</script>
<style scoped="scoped">
	.Handle{
		line-height: 2;
	}
	.button{
		margin-left: 55%;
		margin-top: 0.9375rem;
	}
	.el-textarea{
		width: 60%;
	}
	.el-select{
		width: 61%;
	}
	.opinion{
		margin-top: 2%;
	}
	.el-button{
		margin-left: 0rem;
	}
</style>
