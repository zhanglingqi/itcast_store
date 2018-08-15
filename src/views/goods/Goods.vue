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
	        <!--<el-button type="success" plain>添加商品</el-button>-->
	        <el-button @click="$router.push('/goods/add')" type="success" plain>添加商品</el-button>
	      </el-col>
	    </el-row>
	    <!--rows 行   column列--> 
	     <!-- 表格 -->
	    <el-table
	    	height="600px"
	    	border
      		stripe
	      :data="data"
	      style="width: 100%">
	      <el-table-column
	        type="index"
	        width="50">
	      </el-table-column>
	      <el-table-column
	        prop="goods_name"
	        label="商品名称"
	        width="300">
	      </el-table-column>
	      <el-table-column
	        prop="goods_price"
	        label="商品价格(元)"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="goods_weight"
	        label="商品重量"
	        width="100">
	      </el-table-column>
	      <el-table-column
	        prop="add_time"
	        label="创建时间"
	        width="150">
	        <template slot-scope="scope">
          		{{ scope.row.add_time | fmtDate('YYYY-MM-DD') }}
        	</template>
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
	    
	     <!-- 分页 -->
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pagenum"
	      :page-sizes="[6, 20, 30, 40]"
	      :page-size="pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	</el-card>
</template>

<script>
	export default {
		data () {
			return {
				data:[],
				pagenum: 1,
			    pagesize: 6,
			    total: 0
			}
		},
		created() {
			this.loadData();
		},
		methods:{
			async loadData () {
				 const response = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
			      // 获取数据是否成功
			      const { meta: { status, msg } } = response.data;
			      if (status === 200) {
			        this.data = response.data.data.goods;
			        //获取总共多少页数据
			        this.total = response.data.data.total;
			      } else {
			        this.$message.error(msg);
			      }
			},
			//分页方法
			handleSizeChange(val) {
				this.pagesize = val;
				this.loadData();
			},
			handleCurrentChange (val) {
				this.pagenum = val;
	      		this.loadData();
			},
		}
	}
</script>

<style>
	.row {
		margin-top: 10px;
  		margin-bottom: 10px;
	}
</style>