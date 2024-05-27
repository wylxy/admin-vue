<template>
  <div>
    <div style="height: 20px;width: auto;"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="permissionIds">
        <el-select v-model="ruleForm.permissionIds" style="width: 600px" multiple placeholder="请选择">
          <el-option
              v-for="item in option"
              :key="item.id"
              :label="item.description"
              :value="item.id">
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
      option: [],
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm,'ruleForm')
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm,'ruleForm');
        if (valid) {
          PostAPiTest(`/api/permission/createRole`, this.ruleForm).then((data)=>{
            if(data.data.code === 200){
              Message.success('添加成功')
              this.$router.push(`/permissions/RolesManager`) ;
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
