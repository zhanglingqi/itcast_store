<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="分类列表"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-row class="row">
      <el-col :span="24">
        <el-button @click="handleOpenAddDialog" type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="data"
      border
      stripe
      style="width: 100%">
      <el-table-tree-column
        prop="cat_name"
        label="分类名称"
        width="400"
        treeKey="cat_id"
        levelKey="cat_level"
        childKey="children"
        parentKey="cat_pid">
      </el-table-tree-column>
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="400">
      </el-table-column> -->
      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleOpenEditDialog(scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain>
          </el-button>
          <el-button
            @click="handleDelete(scope.row.cat_id)"
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
      :page-sizes="[6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addDialogFormVisible">
      <el-form
        :model="form"
        label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类列表">
          <!--
            expand-trigger="hover"  鼠标悬停的时候触发
            options 绑定的数据
            v-model 双向绑定 -- 绑定的是数组
            change-on-select  运行用户选择任意一级选项
            props 设置下拉框中显示数据源中的哪个属性的值
           -->
          <!-- {{ catIds }} -->
          <el-cascader
            placeholder="默认添加一级分类"
            clearable
            change-on-select
            expand-trigger="hover"
            :options="options"
            :props="defaultProps"
            v-model="catIds">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑分类的对话框 -->
    <el-dialog
      title="修改商品分类"
      :visible.sync="editDialogFormVisible">
      <el-form
        :model="form"
        label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 加载treegrid组件  - 局部组件
import ElementTreegrid from 'element-tree-grid';

export default {
  components: {
    'el-table-tree-column': ElementTreegrid
  },
  data() {
    return {
      data: [],
      // 分页数据
      pagenum: 1,
      pagesize: 6,
      // 总共有多少条数据
      total: 0,
      loading: true,
      // 添加商品分类需要的数据
      addDialogFormVisible: false,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: 0
      },
      // 绑定多级选择器使用的数据
      options: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      catIds: [],
      // 编辑的时候记录分类的id
      currentCatId: -1,
      editDialogFormVisible: false,
      // 点击编辑按钮的时候，存储当前行对应的分类对象
      currentCat: null
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 组件创建完毕，加载分类数据 3层的
    async loadData() {
      this.loading = true;

      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);

      this.loading = false;

      // 判断请求是否成功
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.total = response.data.data.total;
        this.data = response.data.data.result;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 点击添加分类按钮的时候，显示添加分类对话框
    async handleOpenAddDialog() {
      this.addDialogFormVisible = true;
      const response = await this.$http.get('categories?type=2');
      this.options = response.data.data;
    },
    // 点击添加对话框中的确认按钮，实现添加分类
    async handleAdd() {
      // cat_name 绑定的文本框

      // cat_level  级别
      // 一级分类  0
      // 二级分类  1
      // 三级分类  2

      // cat_pid  添加的分类的，父节点的id
      // 父id   当是一级分类   0
      // 父id   当是二级分类

      // this.catIds 绑定的多级选择器的值，是一个数组
      // this.catIds.length === 0  要添加的分类是一级分类
      // this.catIds.length === 1  要添加的分类是二级分类
      // this.catIds.length === 2  要添加的分类是三级分类

      // 设置父id
      if (this.catIds.length === 0) {
        // 添加一级分类，一级分类的pid=0
        this.form.cat_pid = 0;
      } else if (this.catIds.length === 1) {
        // 添加二级分类，二级分类的pid是 它所对应的一级分类的id
        this.form.cat_pid = this.catIds[0];
      } else if (this.catIds.length === 2) {
        // 添加三级分类，三级分类的pid是 它所对应的二级分类的id
        this.form.cat_pid = this.catIds[1];
      }
      // 设置级别
       this.form.cat_level = this.catIds.length;
      // 发送请求
      const response = await this.$http.post('categories', this.form);
      // 判断是否添加成功
      const { meta: { status, msg } } = response.data;
      if (status === 201) {
        this.addDialogFormVisible = false;
        this.loadData();
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 点击删除按钮
    handleDelete(catId) {
      // 删除提示
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const response = await this.$http.delete(`categories/${catId}`);
        // 判断是否删除成功
        const { meta: { status, msg } } = response.data;
        if (status === 200) {
          this.$message.success(msg);
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        // 点击取消按钮
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击编辑按钮的时候，弹出编辑对话框
    // 存储 分类的id，分类的名称
    handleOpenEditDialog(cat) {
      // cat 是当前行对应的分类对象
      this.form.cat_name = cat.cat_name;
      this.currentCatId = cat.cat_id;

      // 打开对话框
      this.editDialogFormVisible = true;

      // 存储分类对象
      this.currentCat = cat;
    },
    // 编辑对话框中的确定按钮
    async handleEdit() {
      const response = await this.$http.put(`categories/${this.currentCatId}`, {
        cat_name: this.form.cat_name
      });

      // 判断修改是否成功
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.editDialogFormVisible = false;
        // this.loadData();
        // 修改完毕后，只重新加载修改的数据
        this.currentCat.cat_name = response.data.data.cat_name;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
