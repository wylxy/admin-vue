<template>
    <div class="login">
        <!-- 登录面板 -->
        <div class="login-box">
            <div class="login-box-title">
              飞鹤乳业赠品发放跟踪与效益评价系统
            </div>
            <div class="login-box-from">
                <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="demo-ruleForm">
                  <!-- 用户名-->
                  <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" size="medium">
                            <el-button slot="prepend" icon="el-icon-user"></el-button>
                        </el-input>
                    </el-form-item>
                    <!--密码-->
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="medium">
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <!--登录按钮-->
                    <el-form-item>
                        <el-button type="primary" size="medium" :loading="loading" style="width:100%" @click="submitForm('loginForm')">立即登陆</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    data(){
        let letterRule = (rule, value, callback) => {
            let reg = /^[a-zA-Z0-9_-]{4,18}$/
            if (value === '') {
                callback(new Error('输入内容不能为空'));
            }else if(!reg.test(value)) {
                callback(new Error('请输入字母、数字、下划线'));
            }else{
                callback();
            }
        };
        return {
            loading: false, //登陆状态
            loginForm:{  // 登陆表单
                username: 'admin',
                password: '123456'
            },
            rules:{  //登陆验证规则
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' },
                    { validator: letterRule, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    { validator: letterRule, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 在这里登录
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.login()
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        login(){
            this.$store
                .dispatch('user/login',{username: this.loginForm.username,password:this.loginForm.password})
                .then(()=>{
                    this.loading = true
                    // 登陆成功后重定向
                    this.$router.push({
                        path: this.$route.query.redirect || '/index'
                    })

                })
                .catch(err=>{
                  console.log(err)
                    this.loading = false
                    alert("登录失败，请重新登录")
                })
        }
    }
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    /* display: flex;
    justify-content: center;
    align-items: center;*/
    background-image: url('../../assets/login.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #cccccc;
    position: relative;
}
.login-bg{
    width: 100%;
    height: 100%;
    background: #3E3E3E;
}
.login-box{
    width: 350px;
    /* height: 287px; */
    background: hsla(0,0%,100%,.3);
    border-radius: 5px;
    box-shadow: 0 0 2px #f7f7f7;
    border: 1px solid #f7f7f7;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -175px;
    margin-top: -150px;

}
.login-box-title{
    line-height: 50px;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    border-bottom: 1px solid #ffffff;
}
.login-box-from{
    width: 100%;
    height: auto;
    padding: 30px;
    box-sizing: border-box;
}
</style>
