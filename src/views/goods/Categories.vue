<template>
	  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-row class="row">
      <el-col :span="24">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop=""
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="是否有效">
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
		data() {
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