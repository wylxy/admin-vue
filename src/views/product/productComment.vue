<template>
    <div>
      <div style="height: 20px;width: auto;"></div>
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
        <el-form-item label="评价" prop="customerAddress">
          <el-input v-model="ruleForm.comment" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发表评论</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>

  <script>
  import {GetAPI, PutApi,PostAPiTest} from "../../../request/api";
  import {Message} from "element-ui";

  export default {
    name: "updateInfo",
    data() {
      return {
        ruleForm: {
          name: '',
          streetId: null
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.productId = this.$route.query.id;
            PostAPiTest( `/api/product/edit`,this.ruleForm).then((data)=>{
              console.log(data)
              if(data.data.code === 200){
                Message.success('已评论')
                this.$router.push(`/product/product`) ;
              }else {
                  Message.error(data.data.message)
              }
            })
            console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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

  <style scoped>

  </style>
