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
<!--        <el-form-item label="住址" prop="customerAddress">-->
<!--          <el-input v-model="ruleForm.customerAddress" style="width: 400px"></el-input>-->
<!--        </el-form-item>-->
        <label id = "tj" style="margin-left: 27px">根据顾客购买记录，系统智能推荐，适合的赠品为：【<label id="sp" style="color:red">{{this.age}}</label>】岁</label>
        <el-form-item style="margin-top:20px;" label="赠品列表" prop="orderId">
          <el-select v-model="ruleForm.giftsId" placeholder="请选择赠品名称">
            <el-option
                v-for="(item) in streetData"
                :key="item.giftsName"
                :label="item.giftsName+'(适合年龄：'+item.giftsAge+'，所属类别：'+item.giftTypeId+')'"
                :value="item.giftsName"
            >
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="进货时间" prop="giftTime">-->
<!--                  <el-input placeholder="请输入进货时间" v-model="ruleForm.giftTime"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="生产日期" prop="productDate">-->
<!--        <el-date-picker-->
<!--            placeholder="请选择生产日期"-->
<!--            v-model="ruleForm.productDate"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            format="yyyy-MM-dd"-->
<!--            :picker-options="{ firstDayOfWeek: 1 }">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--        <el-form-item label="保质期" prop="productPeriod">-->
<!--          <el-date-picker-->
<!--              placeholder="请选择保质期"-->
<!--              v-model="ruleForm.productPeriod"-->
<!--              type="date"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              format="yyyy-MM-dd"-->
<!--              :picker-options="{ firstDayOfWeek: 1 }">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="年龄段" prop="agePeriod">-->
<!--          <el-input placeholder="请输入年龄段" v-model="ruleForm.giftsSource"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="赠品状态" prop="giftsStatus">-->
<!--          <el-input placeholder="请输入赠品状态" v-model="ruleForm.giftsStatus"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="数量" prop="giftsNumber">-->
<!--                  <el-input placeholder="请输入数量" v-model="ruleForm.giftsNumber"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="价格" prop="giftsPrize">-->
<!--                  <el-input placeholder="请输入价格" v-model="ruleForm.giftsPrize"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="损坏数量" prop="giftsDamageNumber">-->
<!--                  <el-input placeholder="请输入损坏数量" v-model="ruleForm.giftsDamageNumber"></el-input>-->
<!--        </el-form-item>-->
<!--        &lt;!&ndash;      <el-form-item label="giftsDamageKind" prop="giftsDamageKind">&ndash;&gt;-->
<!--        &lt;!&ndash;&lt;!&ndash;        <el-input placeholder="请输入giftsDamageKind" v-model="ruleForm.giftsDamageKind"></el-input>&ndash;&gt;&ndash;&gt;-->
<!--        &lt;!&ndash;      </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="损坏原因" prop="giftsDamageCause">-->
<!--                  <el-input placeholder="请输入损坏原因" v-model="ruleForm.giftsDamageCause"></el-input>-->
<!--        </el-form-item>-->
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
        age:null ,
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
            this.ruleForm.productId = this.$route.query.id;
            PostAPiTest( `/api/product/add`,this.ruleForm).then((data)=>{
              console.log(data)
              if(data.data.code === 200){
                Message.success('添加成功')
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
