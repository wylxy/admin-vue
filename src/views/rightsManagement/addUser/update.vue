<template>
  <div>
    <div style="height: 20px;width: auto;"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" disabled style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" disabled style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="permissions">
        <el-select v-model="ruleForm.permissions" style="width: 600px" multiple placeholder="请选择">
          <el-option
              v-for="item in option"
              :key="item.id"
              :label="item.description"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {GetAPI, PutApi} from "../../../../request/api";
import {Message} from "element-ui";

export default {
  name: "updateInfo",
  data() {
    return {
      ruleForm: {
        name: '',
        description: null,
        permissions: [],
      },
      option: [],
      id: null,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm,'ruleForm');
        if (valid) {
          PutApi( `/api/permission/edit`, {
            "permissionIds": this.ruleForm.permissions,
            "roleId": this.id
          }).then((data)=>{
            if(data.data.code === 200){
              Message.success('修改成功')
              this.$router.push(`/permissions/RolesManager`) ;
            } else {
              Message.error(data.data.message || '修改失败')
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
    this.id = this.$route.params.id;
    if (this.id) {
      GetAPI(`/api/permission/role-info?roleId=${this.id}`).then((data) => {
        console.log(data.data.data,'角色信息')
        this.ruleForm = data.data.data;
        const {permissions} = data.data.data;
        this.ruleForm.permissions = permissions.map((item) => {
          return item.id
        })
      })
    }
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
