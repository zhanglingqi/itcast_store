<template>
	<el-card class="card">
		<my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
		
		<!-- 添加按钮 -->
    <el-row class="add-row">
      <el-col :span="24">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      stripe
      border
      :data="data"
      style="width: 100%">
      
      <el-table-column type="expand">
        <template slot-scope="scope">
          		展开行
        </template>
      </el-table-column>
      
      <!-- 索引列 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="220">
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
          <el-button
            type="success"
            icon="el-icon-check"
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
      data: [],
      loading: true,
      // 控制分配权限的对话框的显示隐藏
      setRightsDialogVisible: false,
      // 绑定tree的数据
      treeData: [],
      defaultProps: {
        // 设置树节点上显示的属性
        label: 'authName',
        // 设置树的子节点的属性
        children: 'children'
      },
      // 树默认选中的节点的key
      checkedList: [],
      // 点击分配权限按钮的时候，记录当前要分配的角色id
      currentRoleId: -1
    };
  },
  created() {
  	// 组件创建完毕，发送请求，获取数据
    this.loadData();
  },
  methods: {
  	//加载角色列表
  	async loadData() {
  		 const response = await this.$http.get('roles');

      // 等请求结束，关闭loading
      this.loading = false;

      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.data = response.data.data;
      } else {
        this.$message.error(msg);
      }
  	}
  }
	};
</script>

<style>
.card {
  height: 100%;
  overflow: auto;
}
.add-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.level3 {
  margin-right: 5px;
  margin-bottom: 5px;
}
.level1 {
  margin-bottom: 10px;
}
</style>