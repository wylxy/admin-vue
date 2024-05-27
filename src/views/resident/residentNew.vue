<template>
    <div>
      <div style="height: 20px;width: auto;"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="customerName">
          <el-input v-model="ruleForm.customerName" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="customerPassword">
        <el-input v-model="ruleForm.customerPassword" style="width: 400px"></el-input>
       </el-form-item>
        <el-form-item label="联系方式" prop="customerPhone">
          <el-input v-model="ruleForm.customerPhone" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="customerAddress">
          <el-input v-model="ruleForm.customerAddress" style="width: 400px"></el-input>
        </el-form-item>

<!--        <el-form-item label="所属街道" prop="streetId">-->
<!--          <el-select v-model="ruleForm.streetId" placeholder="请选择所属街道">-->
<!--            <el-option-->
<!--                v-for="(item) in streetData"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
        streetData: [],
        responsiblePersonData: [],
        typeData: [],
        rules: {
          customerPassword: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          customerAddress: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          customerPhone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
          customerName: [
            { required: true, message: '请输入姓名', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            PostAPiTest( `/api/resident/add`,this.ruleForm).then((data)=>{
              if(data.data.code === 200){
                Message.success('添加成功')
                this.$router.push(`/resident/residentControll`) ;
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
      GetAPI('/api/street/list?page=1&pageSize=60').then((data)=>{
        console.log(data.data.data);
        this.streetData = data.data.data
      })

    },
  }
  </script>

  <style scoped>

  </style>
