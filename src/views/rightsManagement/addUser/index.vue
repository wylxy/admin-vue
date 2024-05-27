<template>
  <div>
    <div style="height: 20px;width: auto;"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="ruleForm.username" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="ruleForm.name" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="contactInfo">
        <el-input v-model="ruleForm.contactInfo" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:20px;" label="是否管理员" prop="orderId">
        <el-select v-model="ruleForm.role">
          <el-option
              v-for="(item) in streetData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {GetAPI, PostAPiTest} from "../../../../request/api";
import {Message} from "element-ui";

export default {
  name: "updateInfo",
  data() {
    return {
      ruleForm: {
        name: '',
        description: null,
        permissionIds: [],
      },
      streetData: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      option: [],
      // rules: {
      //   name: [
      //     { required: true, message: '请填写姓名', trigger: 'change' }
      //   ],
      // }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          PostAPiTest(`/api/user/register`, this.ruleForm).then((data)=>{
            if(data.data.code === 200){
              Message.success('添加成功')
              this.$router.push(`/permissions/UsersManager`) ;
            }
          })
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
  created() {
    GetAPI(`/api/permission/listPermissions`).then((data)=>{
      console.log(data.data.data,'具体权限');
      this.option = data.data.data;
    })
  },
}
</script>

<style scoped>

</style>
