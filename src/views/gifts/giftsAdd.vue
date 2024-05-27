<template>
    <div>
      <div style="height: 20px;width: auto;"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--        <el-form-item label="姓名" prop="customerName">-->
<!--          <el-input v-model="ruleForm.customerName" style="width: 400px"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" prop="customerPassword">-->
<!--        <el-input v-model="ruleForm.customerPassword" style="width: 400px"></el-input>-->
<!--       </el-form-item>-->
<!--        <el-form-item label="联系方式" prop="customerPhone">-->
<!--          <el-input v-model="ruleForm.customerPhone" style="width: 400px"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="住址" prop="customerAddress">-->
<!--          <el-input v-model="ruleForm.customerAddress" style="width: 400px"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="赠品名称" prop="giftsName">
                  <el-input placeholder="请输入赠品名称" v-model="ruleForm.giftsName"></el-input>
        </el-form-item>
        <el-form-item label="适合年龄" prop="giftsAge">
          <el-input placeholder="请输入适合年龄" v-model="ruleForm.giftsAge"></el-input>
        </el-form-item>
        <el-form-item label="赠品种类" prop="giftTypeId">
            <el-select v-model="ruleForm.giftTypeId" placeholder="请选择赠品种类">
             <el-option
                 v-for="(item) in streetData"
                  :key="item.giftTypeName"
                 :label="item.giftTypeName"
                 :value="item.giftTypeName"
             >
            </el-option>
            </el-select>
        </el-form-item>
<!--        <el-form-item label="进货时间" prop="giftTime">-->
<!--                  <el-input placeholder="请输入进货时间" v-model="ruleForm.giftTime"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="进货时间" prop="giftTime">
          <el-date-picker
              placeholder="请选择进货时间"
              v-model="ruleForm.giftTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :picker-options="{ firstDayOfWeek: 1 }">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="进货来源" prop="giftsSource">
                  <el-input placeholder="请输入进货来源" v-model="ruleForm.giftsSource"></el-input>
        </el-form-item>
        <el-form-item label="保质期" prop="giftsPeriod">
                  <el-input placeholder="请输入保质期" v-model="ruleForm.giftsPeriod"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="giftsNumber">
                  <el-input placeholder="请输入数量" v-model="ruleForm.giftsNumber"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="giftsPrize">
                  <el-input placeholder="请输入价格" v-model="ruleForm.giftsPrize"></el-input>
        </el-form-item>
        <el-form-item label="损坏数量" prop="giftsDamageNumber">
                  <el-input placeholder="请输入损坏数量" v-model="ruleForm.giftsDamageNumber"></el-input>
        </el-form-item>
        <!--      <el-form-item label="giftsDamageKind" prop="giftsDamageKind">-->
        <!--&lt;!&ndash;        <el-input placeholder="请输入giftsDamageKind" v-model="ruleForm.giftsDamageKind"></el-input>&ndash;&gt;-->
        <!--      </el-form-item>-->
        <el-form-item label="损坏原因" prop="giftsDamageCause">
                  <el-input placeholder="请输入损坏原因" v-model="ruleForm.giftsDamageCause"></el-input>
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
        // rules: {
        //   customerPassword: [
        //     { required: true, message: '请输入密码', trigger: 'change' }
        //   ],
        //   customerAddress: [
        //     { required: true, message: '请输入地址', trigger: 'blur' }
        //   ],
        //   customerPhone: [
        //     { required: true, message: '请输入联系方式', trigger: 'blur' }
        //   ],
        //   customerName: [
        //     { required: true, message: '请输入姓名', trigger: 'change' }
        //   ],
        // }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            PostAPiTest( `/api/gifts/add`,this.ruleForm).then((data)=>{
              if(data.data.code === 200){
                Message.success('添加成功')
                this.$router.push(`/gifts/gifts`) ;
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
      GetAPI('/api/street/list/?page=1&pageSize=600').then((data)=>{
        console.log(data.data.data);
        this.streetData = data.data.data
      })

    },
  }
  </script>

  <style scoped>

  </style>
