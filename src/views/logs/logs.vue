<template>
  <div>
    <div style="margin-top: 15px;">
<!--      <label style="color: #8C8C8C">客户姓名</label>-->
    </div>
    <el-table :data="tableData" border fit style="width: 100%" v-loading="loading">
      <el-table-column label="用户" prop="managerId">
<!--        <el-input placeholder="请输入giftsName" v-model="tableData.giftsName"></el-input>-->
      </el-table-column>
      <el-table-column label="日志" prop="logMessage">
          </el-table-column>
    <el-table-column label="时间" prop="time">
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
            GetAPI(`/api/gifts/logs/?page=${this.currentPage}&size=10`).then((data) => {
                this.tableData = data.data.data;
            })
        },
    },
    data() {
        return {
            tableData: [],
            total: 15,
            currentPage: 1,
            pageSize: 10,
            loading: true
        }
    },
    created() {
        GetAPI(`/api/gifts/logs/?page=1&size=10`).then((data) => {
            this.tableData = data.data.data;
            this.loading = false
        })
      GetAPI(`/api/gifts/logs/?page=1&size=10000`).then((data) => {
        this.total = data.data.data.length
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
