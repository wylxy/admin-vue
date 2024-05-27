<template>
  <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <!--        <el-form-item label="姓名" prop="customerName">-->
    <!--          <el-input v-model="ruleForm.customerName" style="width: 400px"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="密码" prop="customerPassword">-->
    <!--        <el-input v-model="ruleForm.customerPassword" style="width: 400px"></el-input>-->
    <!--       </el-form-item>-->
    <!--        <el-form-item label="联系方式" prop="customerPhone">-->
    <!--          <el-input v-model="ruleForm.customerPhone" style="width: 400px"></el-input>-->
    <!--        </el-form-item>-->
    <el-form-item label="原密码" prop="password">
      <el-input v-model="ruleForm.password" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input v-model="ruleForm.newPass" type="password" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="newPass1">
      <el-input v-model="ruleForm.newPass1" type="password" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {GetAPI, PostAPiTest} from "../../../request/api";
import {Message} from "element-ui";
import store from "@/store";

export default {
  name: "updateInfo",
  data() {
    return {
      ruleForm: {
        password: '',
        newPass: null,
        newPass1: null
      },
      id: null,
      age:null ,
      streetData: [],
      responsiblePersonData: [],
      typeData: []
    };
  },
  methods: {
    submitForm(formName) {
      if(this.ruleForm.newPass!=null){
        if(this.ruleForm.newPass!=this.ruleForm.newPass1){
          alert("两次输入密码不一致，请重新输入");
        }else{
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.username = localStorage.getItem('user_name')
              PostAPiTest( `/api/user/edit`,this.ruleForm).then((data)=>{
                if(data.data.code === 200){
                  Message.success('修改成功')
                  let src = this.$store.dispatch('user/resetToken')
                  this.$router.replace('/login')
                }else {
                  Message.error(data.data.message)
                }
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    console.log(this.$route.query.id);
  },
  created() {
    GetAPI(`/api/gifts/list/?page=1&size=1000`).then((data) => {
      this.streetData = data.data.data
    })
    this.age = this.$route.query.age;
    // GetAPI(`/api/gifts/getAge/?age=`).then((data) => {
    //   this.streetData = data.data.data
    // })
  },
}

</script>
