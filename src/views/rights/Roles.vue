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
          	 <!-- scope.row ---当前行的角色对象，roleName, roleDesc, children -->
          <!-- 一级权限 -->
          <el-row
            v-for="level1 in scope.row.children"
            :key="level1.id">
            <el-col :span="4">
              <!-- 显示一级权限的名称 -->
              <el-tag
              	 @close="handleClose(scope.row, level1.id)"
                closable>
                {{ level1.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级权限 -->
              <el-row
                v-for="level2 in level1.children"
                :key="level2.id">
                <el-col :span="4">
                  <!-- 显示二级权限的名称 -->
                  <el-tag
                  	 @close="handleClose(scope.row, level2.id)"
                    type="success"
                    closable>
                    {{ level2.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag
                  	 @close="handleClose(scope.row, level3.id)"
                    class="level3"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                    closable
                    type="warning">
                    {{ level3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
               <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">没有权限</el-col>
          </el-row>
            </el-col>
          </el-row>
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
          	 @click="handleOpenSetRightsDialog(scope.row)"
            type="success"
            icon="el-icon-check"
            size="mini"
            plain>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
     <!-- 点击分配权限按钮，弹出对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightsDialogVisible">
      <!--<span>这是一段信息</span>-->
      <el-tree
      	 ref="tree"
        :data="treeData"
        :props="defaultProps"
         node-key="id"
        :default-checked-keys="checkedList"
        default-expand-all
        show-checkbox>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRights">确 定</el-button>
      </span>
    </el-dialog>
	</el-card>
</template>

<script>
	export default {
		data () {
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
			}
		},
		created() {
		    // 组件创建完毕，发送请求，获取数据
		    this.loadData();
  		},
  		 methods: {
		    // 加载角色列表
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
    	},
        // 点击 tag的删除按钮，删除当前角色对应的权限
    async handleClose(role, rightId) {
      // roleId 角色id
      // rightId 权限id
      const response = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);

      console.log(response);
      console.log(response.data);
      // 判断是否成功
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        // 重新加载数据
//      this.loadData();

		 role.children = response.data.data;
      } else {
        this.$message.error(msg);
      }
    },
     // 点击分配权限的按钮，打开分配权限的对话框 
    async handleOpenSetRightsDialog(role) {
        // 记录roleId
      this.currentRoleId = role.id;
      // 清空数组
      this.checkedList = [];

      // role当前角色对象
      this.setRightsDialogVisible = true;
      // 发送请求
      const response = await this.$http.get('rights/tree');
      this.treeData = response.data.data;

      // 把当前角色所拥有的权限id，存储到checkedList
      role.children.forEach((level1) => {
        level1.children.forEach((level2) => {
          level2.children.forEach((level3) => {
            this.checkedList.push(level3.id);
          });
        })
      });
    },
    // 点击确定按钮，分配权限
    async handleSetRights() {
      // currentRoleId 角色id  -- 点击分配权限按钮记录
      // rids  权限id的列表
      // 全选的节点的id (3,5,6,7)
      const checkedList = this.$refs.tree.getCheckedKeys();
      // 半选的节点的id
      const halfCheckedList = this.$refs.tree.getHalfCheckedKeys();

      // const arr = checkedList.concat(halfCheckedList);
      // console.log(arr);
      const arr = [...checkedList, ...halfCheckedList];

      // 发送请求
      const response = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: arr.join(',')
      });

      // 判断是否成功
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.setRightsDialogVisible = false;
        // 重新加载数据
        this.loadData();
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