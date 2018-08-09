<template>
	<el-container class="container">
		<!--<el-header class="header">Header</el-header>-->
		<!-- 头部 -->
		<el-header class="header">
			<!-- 栅格 -->
			<el-row>
				<el-col :span="4">
					<img src="@/assets/logo.png" alt="">
				</el-col>
				<el-col :span="19">
					<div class="title">电商后台管理系统</div>
				</el-col>
				<el-col :span="1">
					<div class="logout">
						<a href="#">退出</a>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside class="aside" width="200px">Aside</el-aside>
			<el-main class="main">Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {

	};
</script>

<style>
	.container {
		height: 100%;
	}
	
	.header {
		background-color: #b3c0d1;
		padding: 0;
	}
	
	.header .title {
		text-align: center;
		color: white;
		font-size: 24px;
		line-height: 60px;
	}
	
	.header .logout {
		line-height: 60px;
	}
	
	.header .logout a {
		color: orange;
		text-decoration: none;
	}
	
	.aside {
		background-color: #d3dce6;
	}
	
	.main {
		background-color: #e9eef3;
	}
</style>