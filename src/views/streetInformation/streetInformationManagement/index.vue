<template>

  <div> <div style="width: auto;height: 20px;"></div>
  <el-input placeholder="请输类别名称" v-model="searchName" class="input-with-select">
<!--        <el-select v-model="SelectName" slot="prepend" placeholder="请选择">-->
<!--          <el-option label="街道名称" value="nameOfThePersonResponsible"></el-option>-->
<!--        </el-select>-->
        <el-button slot="append" icon="el-icon-search" @click="searchlist()"></el-button>
        <!-- @click="SearchRecordByName" -->
      </el-input>
    <el-table
        :data="tableData"
        border
        fit
        style="width: 100%"
        v-loading="loading">

      <el-table-column
          prop="giftTypeName"
          label="类别名称"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="300px"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  type="text" size="small">修改</el-button>
          <el-tooltip :disabled="disabled" class="item" effect="dark" placement="top">
            <div slot="content">
              <el-button
                  @click="dealCancel()"
                  size="mini"
                  type="primary"
                  round
                  plain
              >
                取消
              </el-button>
              <el-button
                  @click="handleClickDelete(scope.row)"
                  size="mini"
                  round
                  type="danger"
                  plain
              >
                删除
              </el-button>
            </div>
            <el-button type="text" size="small">删除</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        hide-on-single-page
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {DeleteApI, GetAPI} from "../../../../request/api";
import {Message} from "element-ui";

export default {
  methods: {
    searchlist() {
      this.tableData = this.tableData2.filter((v) => { return v.giftTypeName.includes(this.searchName) })
    },
    reload(){
      this.loading=true
      GetAPI(`/api/street/list/?page=1&pageSize=10`).then((res)=>{
        this.tableData = res.data.data;
        this.tableData2 = res.data.data;
        this.loading=false
      }).catch((e)=>{
        console.log(e)
        Message.error('网络错误')
        this.loading=false
      })
      // GetAPI(`/api/street/count`).then((res)=>{
      //   console.log(res.data)
      //   this.total = res.data.data;
      // }).catch((e)=>{
      //   console.log(e)
      //   Message.error('网络错误')
      // })
    },
    handleSizeChange(val) {
      this.loading=true
      GetAPI(`/api/street/list/?page=1&pageSize=${val}`).then((data)=>{
        this.tableData = data.data.data;
        this.loading=false
      }).catch((e)=>{
        console.log(e)
        Message.error('网络错误')
      })
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.loading=true
      GetAPI(`/api/street/list/?page=${val}&pageSize=${this.pageSize}`).then((data)=>{
        this.tableData = data.data.data;
        this.loading=false
      }).catch((e)=>{
        console.log(e)
        Message.error('网络错误')
      })
    },
    dealCancel() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
    },
    handleClick(row) {
      this.$router.push(`/street/update/${row.giftTypeId}`);
    },
    handleClickDelete(row) {
      this.loading=true
      DeleteApI(`/api/street/delete`, row.giftTypeId).then((res)=>{
        if (res.data.code === 200){
          Message.success('删除成功')
          this.reload();
          this.currentPage = 1;

          this.loading=false
        }else{
          this.loading=false
          Message.error('该项不可删除')
        }
      })
      console.log(row.id);
    },
  },

  data() {
    return {
      searchName: '',
      tableData: [],
      tableData2: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      disabled: false,
      loading:false,
      SelectName:"街道名称"
    }
  },
  created() {
    this.reload();
  }

}
</script>

<style>
.input-with-select{
  width: 100%;
}
.el-select {
  width: 130px;
}
</style>
