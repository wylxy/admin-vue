<template>
  <div>
    <div style="margin-top: 15px;">
<!--      <label style="color: #8C8C8C">客户姓名</label>-->
<el-input placeholder="请输入订单名称" v-model="searchName" style="width: 200px">
<!--        <el-select v-model="SelectName" slot="prepend" placeholder="请选择">-->
<!--          <el-option label="客户姓名" value="nameOfThePersonResponsible"></el-option>-->
<!--        </el-select>-->
        <el-button slot="append" icon="el-icon-search" @click="searchlist()"></el-button>
        <!-- @click="SearchRecordByName" -->
      </el-input>
    </div>
    <el-table :data="tableData" border fit style="width: 98%" v-loading="loading">
      <el-table-column label="订单名称" prop="productName">
<!--        <el-input placeholder="请输入giftsName" v-model="tableData.giftsName"></el-input>-->
      </el-table-column>
      <el-table-column label="客户名称" prop="customerName">
        <!--        <el-input placeholder="请输入giftsName" v-model="tableData.giftsName"></el-input>-->
      </el-table-column>
      <el-table-column label="生产日期" prop="productDate">
          </el-table-column>
      <el-table-column label="保质期" prop="productPeriod">
<!--        <el-input placeholder="请输入giftTime" v-model="tableData.giftTime"></el-input>-->
      </el-table-column>
      <el-table-column label="年龄段" prop="agePeriod">
      </el-table-column>
      <el-table-column label="适宜人群" prop="suitablePopulation">
      </el-table-column>
      <el-table-column label="购买数量" prop="orderNum">
      </el-table-column>
      <el-table-column label="购买单价" prop="orderPrice">
      </el-table-column>
      <el-table-column label="下单日期" prop="orderDate">
      </el-table-column>
      <el-table-column label="发放赠品名称" prop="giftsName">
      </el-table-column>
      <el-table-column label="评论" prop="comment">
      </el-table-column>
      <el-table-column label="回复" prop="notes">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button v-show= "flag" @click="handleClick(scope.row)" type="text" size="small">选择赠品</el-button>
          <el-button v-show= "scope.row.flag=='确认'?false:true" @click="submit(scope.row)" type="text" size="small" style="margin-left:2px">确认签收</el-button>
          <el-button v-show= "scope.row.flag=='确认' && (scope.row.comment=='' || scope.row.comment==null)&& role!='admin'?true:false" @click="comment(scope.row)" type="text" size="small">评论</el-button>
          <el-button v-show= "scope.row.flag=='确认' && (scope.row.notes=='' || scope.row.notes==null) && role=='admin'?true:false" @click="comment1(scope.row)" type="text" size="small">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- @size-change="handleSizeChange" -->
    <div style="width: auto;height: 15px;"></div>
    <el-pagination style="float: right" @current-change="handleCurrentChange" background :current-page.sync="currentPage"
      :page-sizes="[10]" :page-size="pageSize" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {DeleteApI, GetAPI, postAPI, PostAPiTest} from "../../../request/api";
import {Message} from "element-ui";
import store from "@/store";

export default {
    methods: {
      handleCurrentChange() {
        GetAPI(`/api/product/list/?page=${this.currentPage}&size=10`).then((data) => {
          this.tableData = data.data.data;
          this.tableData2 = data.data.data;
        })
      },
      searchlist() {
        this.tableData = this.tableData2.filter((v) => {
          return v.productName.includes(this.searchName)
        })
        // if(this.searchName!=null && this.searchName!=''){
        //   this.total = this.tableData.length
        // }else{
        //   this.total = this.tableData[0].total
        // }
      },
      handleClick(e) {
        if (e.giftsName != null && e.giftsName != '') {
          alert("该订单已经发放过赠品，请选择其他订单")
        } else {
          this.$router.push({path: "/product/productAdd?", query: {id: e.productId, age: e.agePeriod}});
        }
      },
      submit(e) {
        this.ruleForm.productId = e.productId;
        PostAPiTest(`/api/product/edit`, this.ruleForm).then((data) => {
          if (data.data.code === 200) {
            Message.success('已确认收货')
            location.reload()
          } else {
            Message.error(data.data.message)
          }
        })

      },
      comment(e) {
        this.ruleForm.productId = e.productId;
        PostAPiTest(`/api/product/edit`, this.ruleForm).then((data) => {
          if (data.data.code === 200) {
            this.$router.push({path: "/product/productComment?", query: {id: e.productId}});
          } else {
            Message.error(data.data.message)
          }
        })
      },
      comment1(e) {
        this.ruleForm.productId = e.productId;
        PostAPiTest(`/api/product/edit`, this.ruleForm).then((data) => {
          if (data.data.code === 200) {
            this.$router.push({path: "/product/productComment1?", query: {id: e.productId}});
          } else {
            Message.error(data.data.message)
          }
        })
      }
    },
              // handleClickDelete(e) {
        //     DeleteApI('/api/gifts/delete', e.giftsId).then((res) => {
        //         console.log(res);
        //         if (res.data.code == 200) {
        //             Message.success('删除成功')
        //             this.$router.go(0)
        //         }else{
        //             Message.error(res.data.message)
        //         }
        //     })
        // }
    data() {
        return {
            tableData: [],
            tableData2: [],
            total: 15,
            currentPage: 1,
            pageSize: 10,
            searchName: '',
            SelectName: 'nameOfThePersonResponsible',
            loading: true,
            flag: true,
            flag1: false,
            flag2: true,
            ruleForm: {
              productId:null,
              flag:'确认'
          },
          role: store.getters.roles

        }
    },
    created() {
        // var name = localStorage.getItem('user_name')
      if(this.role != 'admin'){
        this.flag = false;
        this.flag1 = true;
        GetAPI(`/api/product/list/?page=1&size=10&name=${name}`).then((data) => {
          this.tableData = data.data.data;
          this.tableData2 = data.data.data;
          this.total = data.data.data.length>0?data.data.data[0].total:0,
          this.loading = false
        })
      }else{
        this.flag = true;
        this.flag1 = false;
        GetAPI(`/api/product/list/?page=1&size=10`).then((data) => {
          this.tableData = data.data.data;
          this.tableData2 = data.data.data;
          this.total = data.data.data.length>0?data.data.data[0].total:0,
          this.loading = false
        })
      }


    }

}
</script>

<style>
.input-with-select {
    width: 100%;
}

.el-select {
    width: 130px;
}
</style>
