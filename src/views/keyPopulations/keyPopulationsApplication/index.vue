<template>
  <div>
    <div style="height: 20px;width: 20px;"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="residentId">
        <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            @select="handleSelect"
        ></el-autocomplete>
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
      <el-form-item label="申请理由" prop="reason">
        <el-input v-model="ruleForm.reason" style="width: 400px"></el-input>
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
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {GetAPI, PostAPiTest} from "../../../../request/api";
export default {
  name: "updateInfo",
  data() {
    return {
      ruleForm: {
        residentId: '',
        streetId: null,
        categoryId: null,
        reason: '',
        responsiblePersonId: null,
      },
      state: '',
      timeout:  null,
      streetData: [],
      responsiblePersonData: [],
      typeData: [],
      rules: {
        residentId: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
        ],
        streetId: [
          { required: true, message: '请选择街道', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        responsiblePersonId: [
          { required: true, message: '请选择负责人姓名', trigger: 'change' }
        ],
        reason: [
          { required: true, message: '请输入理由', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          PostAPiTest('/api/target-group/add',this.ruleForm).then((data)=>{
            if(data.data.code === 200){
              this.$message({
                message: '恭喜你，申请成功',
                type: 'success'
              });
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
      this.state = '';
    },
    async querySearchAsync(queryString, cb) {
      console.log(queryString,'queryString')
      // fixme 这里处理 queryString 传给后端然后做模糊查询，通过返回值直接复制给 restaurants
      var restaurants;
      await GetAPI(`/api/resident/all?name=${queryString}`).then((data)=>{
        console.log(data.data.data);
        restaurants = data.data.data;
      })
      let result = []
      for(const i of restaurants){
        result.push({value: i.name, id: i.id})
      }
      cb(result);
    },
    handleSelect(item) {
      this.ruleForm.residentId = item.id;
    }
  },
  mounted() {
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
  }
}
</script>

<style scoped>

</style>
