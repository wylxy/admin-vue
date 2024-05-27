<template>
  <div>
    <div style="margin-top: 15px;">
<el-input placeholder="请输入客户名称" v-model="searchName" style="width: 200px">
<!--        <el-select v-model="SelectName" slot="prepend" placeholder="请选择">-->
<!--          <el-option label="客户姓名" value="nameOfThePersonResponsible"></el-option>-->
<!--        </el-select>-->
        <el-button slot="append" icon="el-icon-search" @click="searchlist()"></el-button>
        <!-- @click="SearchRecordByName" -->
      </el-input>
    </div>
    <el-table :data="tableData" border fit style="width: 100%" v-loading="loading">
      <el-table-column label="年份" prop="orderDate">
      </el-table-column>
      <el-table-column label="客户名称" prop="customerName">
      </el-table-column>
      <el-table-column label="商品名称" prop="productName">
      </el-table-column>
      <el-table-column label="赠品名称" prop="giftsName">
      </el-table-column>
      <el-table-column label="数量" prop="orderNum">
      </el-table-column>
      <el-table-column label="单价" prop="orderPrice">
      </el-table-column>
      <el-table-column label="总价" prop="orderTotal">
      </el-table-column>
      <el-table-column label="效益率" prop="evaluateRate">
      </el-table-column>
      <el-table-column label="效益评级" prop="evaluateGrade">
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
import {DeleteApI, GetAPI, postAPI} from "../../../request/api";
import {Message} from "element-ui";

export default {
    methods: {
        handleCurrentChange() {
            GetAPI(`/api/product/listEvaluateYear/?page=${this.currentPage}&size=10`).then((data) => {
                this.tableData = data.data.data;
                this.tableData2 = data.data.data;
            })
        },
        searchlist() {
            this.tableData = this.tableData2.filter((v) => {
                return v.productName.includes(this.searchName)
            })

        },

    },
    data() {
        return {
            tableData: [],
            tableData2: [],
            total: 15,
            currentPage: 1,
            pageSize: 10,
            searchName: '',
            SelectName: 'nameOfThePersonResponsible',
        }
    },
    created() {

        GetAPI(`/api/product/listEvaluateYear/?page=1&size=10`).then((data) => {
            this.tableData = data.data.data;
            this.tableData2 = data.data.data;
        })
      GetAPI(`/api/product/listEvaluateYear/?page=1&size=10000`).then((data) => {
        this.total = data.data.data[0].total
      })
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
