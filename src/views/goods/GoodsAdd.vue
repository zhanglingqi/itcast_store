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
	     <el-form
      label-position="top"
      :model="form"
      label-width="100px">
      <el-tabs
        @tab-click="handleTabClick"
        tab-position="left"
        style="margin-top: 20px">
        <el-tab-pane label="基本信息">
          <!-- 基本信息 -->
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
             <!--<el-input v-model="form.name"></el-input>--> 
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				// 绑定步骤条，显示第几步完成
			      active: 0,
			      // 表单数据
			      form: {
			        goods_name: '',
			        // 商品分类id,  1,2,3
			        goods_cat: '',
			        goods_price: '',
			        goods_number: '',
			        goods_weight: '',
			        pics: [],
			        goods_introduce: '',
			        attrs: []
			      }
			}
		}
	}
</script>

<style>
	.alert {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>