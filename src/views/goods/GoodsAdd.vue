<template>
	<el-card class="card">
	    <!-- 面包屑 -->
	    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
		
	     <el-alert
	      class="alert"
	      title="添加商品信息"
	      :closable="false"
	      type="info"
	      center
	      show-icon>
	    </el-alert>
	    
	     <!-- 步骤条 -->
	    <el-steps
	      :active="active"
	      finish-status="success"
	      align-center>
	      <el-step title="基本信息"></el-step>
	      <el-step title="商品参数"></el-step>
	      <el-step title="商品属性"></el-step>
	      <el-step title="商品图片"></el-step>
	      <el-step title="商品内容"></el-step>
	    </el-steps>
	    
	    <!-- 选项卡 -->
	    <el-tabs
	      @tab-click="handleTabClick"
	      tab-position="left"
	      style="height: 200px; margin-top: 20px">
	      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
	      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
	      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
	      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
	      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
	    </el-tabs>
  	</el-card>
</template>

<script>
</script>

<style>
	.alert {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>