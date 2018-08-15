<template>
	<el-card class="card">
		<!--面包屑-->
		<my-breadcrumb level1="商品管理" level2='商品列表'></my-breadcrumb>
		
		 <!-- 搜索栏 -->
	    <el-row class="row">
	      <el-col :span="24">
	        <el-input
	          style="width: 300px;"
	          clearable
	          placeholder="请输入内容"
	          class="searchInput">
	          <el-button
	            slot="append"
	            icon="el-icon-search"></el-button>
	        </el-input>
	        <el-button type="success" plain>添加商品</el-button>
	      </el-col>
	    </el-row>
	    
	     <!-- 表格 -->
	    <el-table
	      :data="data"
	      style="width: 100%">
	      <el-table-column
	        type="index"
	        width="50">
	      </el-table-column>
	      <el-table-column
	        prop=""
	        label="商品名称"
	        width="300">
	      </el-table-column>
	      <el-table-column
	        prop=""
	        label="商品价格(元)"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop=""
	        label="商品重量">
	      </el-table-column>
	      <el-table-column
	        prop=""
	        label="创建时间">
	      </el-table-column>
	      <el-table-column
	        label="操作">
	        <template slot-scope="scope">
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
	        </template>
	      </el-table-column>
	    </el-table>
	</el-card>
</template>

<script>
	export default {
		data () {
			return {
				data:[]
			}
		}
	}
</script>

<style>
	.row {
		margin-top: 10px;
  		margin-bottom: 10px;
	}
</style>