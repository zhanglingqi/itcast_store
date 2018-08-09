<template>
	<div class="login-wrap">
		<el-form class="login-form" label-position="top" label-width="80px" :model="formData">
			<h2>用户登录</h2>
			<el-form-item label="用户名">
				<el-input v-model="formData.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="formData.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button class="btn" type="primary">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				}
			}
		}
	}
</script>

<style scoped>
	/*
	  scoped 是html5中提供的属性

  会给当前页面所有的标签，添加一个data-v-xxx的一个属性作为标示
  当前页面的样式只为当前页面的元素服务
	 * */
	
	.login-wrap {
		background-color: #324152;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.login-wrap .login-form {
		background-color: #fff;
		width: 400px;
		border-radius: 5px;
		padding: 30px;
	}
	
	.login-wrap .login-form .btn {
		width: 100%;
	}
</style>