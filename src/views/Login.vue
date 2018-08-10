<template>
	<div class="login-wrap">
		<el-form class="login-form" label-position="top" label-width="80px" :model="formData">
			<h2>用户登录</h2>
			<el-form-item label="用户名">
				<el-input v-model="formData.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<!--<el-input type="password" v-model="formData.password"></el-input>-->
				<!-- 组件，vue有自己的事件机制，用的是vue事件机制实现的keyup事件 -->
				<!-- 想使用DOM中的keyup事件 
        		native是告诉组件，我要使用原生DOM事件 -->
				<el-input @keyup.enter.native="handleLogin" type="password" v-model="formData.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="handleLogin" class="btn" type="primary">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			handleLogin() {
				this.$http
					.post(`http://localhost:8888/api/private/v1/login`, this.formData)
					.then((response) => {
						var status = response.data.meta.status;
						var msg = response.data.meta.msg;

						if(status === 200) {
							//登录成功
							this.$message.success(msg);
							// 记录token
							var token = response.data.data.token;
							sessionStorage.setItem('token', token);
							//跳转到后台
							this.$router.push('/');
//							this.$router.push({name:'Home'});
						} else {
							this.$message.error(msg);
						}
					})
					.catch((err) => {
						console.log(err)
					})
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