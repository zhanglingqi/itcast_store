<template>
	<el-card class="card">
		<!-- 面包屑组件 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索 -->
		<el-row class="searchRow">
			<el-col :span="24">
				<!--<el-input placeholder="请输入内容" class="searchInput">
					<el-button slot="append" icon="el-icon-search"></el-button>-->
					 <el-input
	          v-model="searchValue"
	          clearable
	          placeholder="请输入内容"
	          class="searchInput">
	          <el-button
	            @click="handleSearch"
	            slot="append"
	            icon="el-icon-search"></el-button>
				</el-input>
				<!--<el-button type="success" plain>成功按钮</el-button>-->
				 <el-button @click="addUserDialogFormVisible = true" type="success" plain>添加</el-button>
			</el-col>
		</el-row>
	<!-- 表格 -->
    <!-- border 加边框
      stripe 斑马纹
      序号列
    -->
    <el-table
      border
      stripe
      :data="data"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="80">
        <template slot-scope="scope">
          <!-- {{ scope.row.mg_state }} -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!-- scope.row 是当前行绑定的数据对象 -->
          <!-- {{ scope.$index }} -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain>
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain>
          </el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!--
      current-page 当前页码
      page-size 每页显示多少条数据
      pager-count 最多产生的数字按钮个数,大于等于 5 且小于等于 21 的奇数
      total   总共多少条数据，发送请求获取

      @size-change  每页显示多少条改变的时候
      @current-change 当前页码改变的时候
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="pagesize"
      :page-sizes="[2, 4, 6, 8]"
      :pager-count="9"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
    	<!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible="addUserDialogFormVisible">
      <el-form
        label-width="80px"
        :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
//	import axios from 'axios';
	export default {
  data() {
    return {
      data: [],
      // 分页相关数据
      // 页码
      pagenum: 1,
      // 每页显示多少条数据
      pagesize: 2,
      // 总共多少条数据
      count: 0,
      // 绑定搜索文本框
      searchValue: '',
       // 控制添加用户的对话框的显示隐藏
      addUserDialogFormVisible: false,
      form: {
      	username:'',
      	password:'',
      	email:'',
      	mobile:''
      }
    }
  },
 
 created() {
    this.loadData();
  },
 methods:{
 	async loadData() {
 		var token = sessionStorage.getItem('token');
// 		axios.defaults.headers.common['Authorization'] = token;
		this.$http.defaults.headers.common['Authorization'] = token;
 		
// 		var response = await axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=10');
//		var response = await this.$http.get('users?pagenum=1&pagesize=10');
//		var response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
		var response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
		
 		
 		var { meta: { status, msg } } = response.data;
      if (status === 200) {
      	//获取条数
      	this.count = response.data.data.total;
        this.data = response.data.data.users;
//      console.log(this.data)
//      console.log(response.data)
      } else {
        this.$message.error(msg);
      }
 	},
 	handleSizeChange (val) {
 		this.pagesize = val;
 		this.loadData()
 	},
 	handleCurrentChange (val) {
 		this.pagenum = val;
 		this.loadData()
 	},
 	handleSearch() {
 		this.loadData()
 	}
 }
 }
</script>

<style>
	.card {
		height: 100%;
	}
	
	.searchInput {
		width: 300px;
	}
	
	.searchRow {
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>