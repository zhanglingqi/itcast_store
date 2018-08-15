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
              <el-cascader
              placeholder="请选择商品分类"
              clearable
              expand-trigger="hover"
              :options="options"
              :props="{ label: 'cat_name', value: 'cat_id', children: 'children' }"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
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
		created() {
			//加载商品分类
			this.loadOptions();
		},
		methods:{
			//点击tab栏的tab项
			handleTabClick(tab,event) {
				// tab 是当前点击的组件   index=“0”
			      // console.log(tab);
			      // console.log(event);
			      this.active = tab.index - 0;
			},
			handleChange () {
					 // 让多级下拉，只能选择3级分类
				      if (this.selectedOptions.length !== 3) {
				        this.$message.warning('请选择3级分类')
				        // 清空多级下拉中的内容
				        this.selectedOptions.length = 0;
				      }
				},
			// 加载多级下拉的数据
		    async loadOptions() {
		    const response = await this.$http.get('categories?type=3');
		    this.options = response.data.data;
    		},
    		
		},
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
			      },
			      // 多级选择器绑定的数据
      				options: [],
      				selectedOptions: []
			      
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