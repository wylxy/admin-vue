<template>
  <div>
    <div style="margin-top: 15px;">
<!--      <label style="color: #8C8C8C">客户姓名</label>-->
<el-input placeholder="请输入客户姓名" v-model="searchName" style="width: 200px">
<!--        <el-select v-model="SelectName" slot="prepend" placeholder="请选择">-->
<!--          <el-option label="客户姓名" value="nameOfThePersonResponsible"></el-option>-->
<!--        </el-select>-->
        <el-button slot="append" icon="el-icon-search" @click="searchlist()"></el-button>
        <!-- @click="SearchRecordByName" -->
      </el-input>
    </div>
    <el-table :data="tableData" border fit style="width: 100%" v-loading="loading">
      <!-- <el-table-column
            fixed
            prop="category"
            label="类别"
        > -->
      <!-- </el-table-column> -->searchName
      <el-table-column prop="customerName" label="姓名">
      </el-table-column>
<!--      <el-table-column prop="idNumber" label="身份证号">-->
<!--      </el-table-column>-->
      <el-table-column prop="customerPhone" label="联系方式">
      </el-table-column>
      <el-table-column prop="customerAddress" label="住址">
      </el-table-column>
<!--      <el-table-column prop="street" label="所在街道">-->
<!--      </el-table-column>-->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <!-- <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <el-button
                    size="mini"
                    type="primary"
                    round
                    plain
                >
                  取消
                </el-button>-->
          <el-button @click="handleClickDelete(scope.row)" type="text" size="small">
            删除
          </el-button>
          <!--  </div>
              <el-button type="text" size="small">删除</el-button>
            </el-tooltip> -->
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
import {DeleteApI, GetAPI, postAPI} from "../../../request/api";
import {Message} from "element-ui";

export default {
    methods: {
        handleCurrentChange() {
            GetAPI(`/api/resident/list/?page=${this.currentPage}&size=10`).then((data) => {
                this.tableData = data.data.data;
                this.tableData2 = data.data.data;
            })
        },
        searchlist() {
            this.tableData = this.tableData2.filter((v) => {
                return v.customerName.includes(this.searchName)
            })
          // if(this.searchName!=null && this.searchName!=''){
          //   this.total = this.tableData.length
          // }else{
          //   this.total = this.tableData[0].total
          // }
        },
        handleClick(e) {
            this.$router.push({path: "/resident/residentChange?id=", query: {id: e.customerId}});
        },
        handleClickDelete(e) {
            DeleteApI('/api/resident/delete', e.customerId).then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                    Message.success('删除成功')
                    this.$router.go(0)
                }else{
                    Message.error(res.data.message)
                }
            })
        }
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
            loading: true
        }
    },
    created() {

        GetAPI(`/api/resident/list/?page=1&size=10`).then((data) => {
            this.tableData = data.data.data;
            this.tableData2 = data.data.data;
            this.total = data.data.data[0].total,
            this.loading = false
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
