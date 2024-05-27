<template>
  <div>
    <div style="height: 20px;width: auto;"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" disabled style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="categoryId">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择类型">
          <el-option
              v-for="(item) in typeData"
              :key="item.id"
              :label="item.category"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人姓名" prop="responsiblePersonId">
        <el-select v-model="ruleForm.responsiblePersonId" placeholder="请选择负责人姓名">
          <el-option
              v-for="(item) in responsiblePersonData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="contactInfo">
        <el-input v-model="ruleForm.contactInfo" disabled style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="所属街道" prop="streetId">
        <el-select v-model="ruleForm.streetId" placeholder="请选择所属街道">
          <el-option
              v-for="(item) in streetData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
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
        streetId: null,
        categoryId: null,
        contactInfo: '',
        responsiblePersonId: null,
      },
      id: null,
      streetData: [],
      responsiblePersonData: [],
      typeData: [],
      rules: {
        streetId: [
          { required: true, message: '请选择街道', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        responsiblePersonId: [
          { required: true, message: '请选择负责人姓名', trigger: 'change' }
        ],
        contactInfo: [
          { required: true, message: '请输入理由', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          PutApi( `/api/target-group/update`,this.ruleForm).then((data)=>{
            if(data.data.code === 200){
              Message.success('修改成功')
              this.$router.push(`/keyPopulations/manage`) ;
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
    GetAPI(`/api/target-group/get?id=${this.$route.params.id}`).then((data)=>{
      console.log(data.data.data,'重点人群信息')
      this.ruleForm = data.data.data;
    })
    this.id = this.$route.params.id;
    console.log(this.$route.params.id);
  },
  created() {
    GetAPI('/api/street/list?page=1&pageSize=60').then((data)=>{
      console.log(data.data.data);
      this.streetData = data.data.data
    })
    GetAPI('/api/user/all').then((data)=>{
      console.log(data.data.data)
      this.responsiblePersonData = data.data.data;
    })
    GetAPI('/api/target-group/category').then((data)=>{
      console.log(data.data.data)
      this.typeData = data.data.data;
    })
  },
}
</script>

<style scoped>

</style>
