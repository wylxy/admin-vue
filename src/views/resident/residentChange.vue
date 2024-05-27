<template>
  <div>
    <div style="height: 20px;width: auto;"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="customerName">
        <el-input v-model="ruleForm.customerName" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="customerPhone">
        <el-input v-model="ruleForm.customerPhone" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="住址" prop="customerAddress">
        <el-input v-model="ruleForm.customerAddress" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="customerAddress">
        <el-input v-model="ruleForm.customerPassword" style="width: 400px"></el-input>
      </el-form-item>
<!--      <el-form-item label="所属街道" prop="streetId">-->
<!--        <el-select v-model="ruleForm.streetId" placeholder="请选择所属街道">-->
<!--          <el-option v-for="(item) in streetData" :key="item.id" :label="item.name" :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>j

<script>
import { GetAPI, PutApi, postAPI } from "../../../request/api";
import { Message } from "element-ui";

export default {
  name: "updateInfo",
  data() {
    return {
        ruleForm: {
          customerName: '',
          customerPhone: '',
          customerAddress: '',
          customerPassword: ''
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
          PutApi(`/api/resident/update/`, this.ruleForm).then((data) => {
            if (data.data.code === 200) {
              Message.success('修改成功')
              this.$router.push(`/resident/residentControll`);
            } else {
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
    this.id = this.$route.query.id;
    this.ruleForm.customerId = this.$route.query.id;
    GetAPI('/api/resident/get?id=' + this.$route.query.id).then((res) => {
      let obj=res.data.data;
      this.ruleForm.customerName=obj.customerName;
      this.ruleForm.customerAddress=obj.customerAddress;
      this.ruleForm.customerPassword=null;
      this.ruleForm.customerPhone=obj.customerPhone
    })
  },
  created() {
    GetAPI('/api/street/list?page=1&pageSize=60').then((data) => {
      this.streetData = data.data.data
    })

  },
}
</script>

<style scoped></style>
