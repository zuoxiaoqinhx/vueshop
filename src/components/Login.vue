<template>
  <div class="login_container">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login-form">
        <el-form-item prop='username'>
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input type="password" prefix-icon="el-icon-key" v-model="loginForm.password">
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        // 登录表单数据绑定对象
        loginForm: {
          username: "",
          password: "",
        },
        // 表单验证规则对象
        loginFormRules: {
          // 验证用户名是否合法
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          // 验证密码是否合法
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ],

        }
      }
    },
    methods: {
      // 重置表单项
      resetLoginForm(){
        this.$refs.loginFormRef.resetFields();
      },
      // 登录预验证
      login(){
        // 接收一个valid 布尔值返回验证结果
        this.$refs.loginFormRef.validate(async valid=>{
          if(!valid)return;
          // 在Vue原型添加后就可以直接使用
          const {data:res}=await this.$http.post("login",this.loginForm)
          if(res.meta.status!==200)return this.$message.error("登录失败！");
          this.$message.success("登录成功！")
          // console.log(res)
          // 将登录成功之后的token保存在sessionStorage中
          window.sessionStorage.setItem("token",res.data.token)
          // 跳转到home主页
          this.$router.push("/home")
        });

      }
    }
  }
</script>

<!--可以用less写  -->
<style lang='less' scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login-box {
    background-color: #fff;
    width: 450px;
    height: 300px;
    border-radius: 3px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .avatar-box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>