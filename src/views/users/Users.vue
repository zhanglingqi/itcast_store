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
				<el-input placeholder="请输入内容" class="searchInput">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
				<el-button type="success" plain>成功按钮</el-button>
			</el-col>
		</el-row>
	</el-card>
</template>

<script>
	export default {

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