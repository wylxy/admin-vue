<template>
  <div>
    <div style="width: auto;height: 20px;color: #fff;">u89</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类别名称" prop="giftTypeName">
        <el-input v-model="ruleForm.giftTypeName"></el-input>
      </el-form-item>
<!--      <el-form-item label="街道描述" prop="description">-->
<!--        <el-input v-model="ruleForm.description"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{this.id ? '修改': '添加'}}</el-button>
<!--        <el-button v-if="!id" @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {GetAPI, PostAPiTest, PutApi} from "../../../../request/api";
export default {
  name: "updateInfo",
  data() {
    return {
      id: null,
      ruleForm: {
        giftTypeName: null,
      },
      rules: {
        giftTypeName: [
          { required: true, message: '类别名称', trigger: ['blur', 'change'] },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id !== undefined ) {
            let params = {
              giftTypeName: this.ruleForm.giftTypeName,
            };
            params.giftTypeId = this.id
            PutApi('/api/street/update',params).then((data)=>{
              if(data.data.code === 200){
                this.$message({
                  message: '恭喜你，修改成功',
                  type: 'success'
                });
                this.$router.push(`/street/streetManager`) ;
              }
            })
          } else {
            PostAPiTest('/api/street/add',this.ruleForm).then((data)=>{
              if(data.data.code === 200){
                this.$message({
                  message: '恭喜你，添加成功',
                  type: 'success'
                });
                this.$router.push(`/street/streetManager`) ;
              }
            })
          }

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
      GetAPI(`/api/street/get?id=${this.id}`).then((data) => {
        this.ruleForm = data.data.data;
      })
    }
  },
  created() {
   console.log(this.$route.params.id,'this.$route.params.id')
  }
}
</script>

<style scoped>

</style>
