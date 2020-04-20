<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" label-width="80px" class="demo-form-inline">
      <el-form-item label="企业">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option v-for="(item,index) in region" :key='index' :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="search" placeholder="编号、工地名称、SMI"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="全部">
          <el-option v-for="(item,index) in status" :key='index' :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="primary" @click="batch_add">批量添加</el-button>
      </el-form-item>
    </el-form>
    <el-table border ref='tableData' :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="设备编号" align="center" width="160" sortable prop="equipment" column-key="equipment">
      </el-table-column>
      <el-table-column label="内部编号" align="center" width="120" prop="inside">
      </el-table-column>
      <el-table-column label="SMI" align="center" width="150" prop="SMI">
      </el-table-column>
      <el-table-column label="工地名称" align="center" width="160" prop="field">
      </el-table-column>、
      <el-table-column label="容量(吨)" align="center" width="80" prop="capacity">
      </el-table-column>
      <el-table-column label="余量(KG)" align="center" width="80" prop="allowance">
      </el-table-column>
      <el-table-column label="缺料报警" align="center" width="80" prop="police">
      </el-table-column>
      <el-table-column label="状态" align="center" width="80" prop="status">
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
        status: [{
            name: "全部",
            value: 'all'
          },
          {
            name: '在线',
            value: 'on'
          },
          {
            name: '离线',
            value: 'off'
          }
        ],
        form: {
          region: '',
          crux: "",
          status: ''
        },
        dialogVisible: false,
        total: 0, //默认数据总数
        pagesize: 10, //每页的数据条数
        currentPage: 1, //默认开始页面
        tableData: [
          {
            id:"1",
            equipment: 'QHW001G200290001',
            inside:'阿发1',
            SMI:'14015632121',
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
            SMI:'14015632122',
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
            SMI:'14015632122',
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
            SMI:'14015632122',
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
            SMI:'14015632122',
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
            SMI:'14015632122',
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
            SMI:'14015632122',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"8",
            equipment: 'QHW001G200290008',
            inside:'阿发2',
            SMI:'14015632122',
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
            SMI:'14015632122',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"10",
            equipment: 'QHW001G200290010',
            inside:'阿发10',
            SMI:'14015632122',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
          {
            id:"11",
            equipment: 'QHW001G200290011',
            inside:'阿发2',
            SMI:'14015632122',
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
            SMI:'14015632122',
            field:'不急不急',
            capacity:'57',
            allowance:'4503',
            police:'5%',
            status:'在线',
            boot:'正常开机'
          },
        ],
        search: ''
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
      onSubmit() {
        console.log('submit!');
      },
      add(){
        this.$router.push({
			path:'/add_device'
		})
      },
      batch_add(){
        console.log('batch_add')
      },
      current_change: function(currentPage) {
        this.currentPage = currentPage;
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
  .block {
    position: absolute;
    left: 2%;
  }

  .tips {
    font-size: 1.5rem;
  }
</style>
