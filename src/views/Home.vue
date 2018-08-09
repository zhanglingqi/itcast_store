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
			<!--<el-aside class="aside" width="200px">Aside</el-aside>-->
			<!--侧边栏-->
			<el-aside class="aside" width="200px">
				<!-- default-active 可以让某一个menu-item选中，值是menu-item的index的值 -->
				<el-menu default-active="1-3">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item-group>
							<template slot="title">分组一</template>
							<el-menu-item index="1-1">选项1</el-menu-item>
							<el-menu-item index="1-2">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item>
				</el-menu>
			</el-aside>

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