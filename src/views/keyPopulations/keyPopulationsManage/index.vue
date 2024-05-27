<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select">
        <el-select v-model="SelectName" slot="prepend" placeholder="请选择">
          <el-option label="姓名" value="nameOfThePersonResponsible"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchlist()"></el-button>
      </el-input>
    </div>
    <el-table
        :data="tableData"
        border
        fit
        style="width: 100%"
        v-loading="loading"
        >
      <el-table-column
          fixed
          prop="category"
          label="类别"
      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
      >
      </el-table-column>
      <el-table-column
          prop="responsiblePerson"
          label="负责人姓名"
      >
      </el-table-column>
      <el-table-column
          prop="contactInfo"
          label="联系方式"
      >
      </el-table-column>
      <el-table-column
          prop="street"
          label="街道"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  type="text" size="small">修改</el-button>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <el-button
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
    handleSizeChange(val) {
      GetAPI(`/api/target-group/list/?page=1&pageSize=${val}`).then((data)=>{
        console.log(data,'data')
      }).catch((e)=>{
        console.log(e)
        Message.error('网络错误')
      })
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      GetAPI(`/api/target-group/list/?page=${val}&pageSize=${this.pageSize}`).then((data)=>{
        console.log(data,'data')
      }).catch((e)=>{
        console.log(e)
        Message.error('网络错误')
      })
    },
    handleClick(row) {
      this.$router.push(`/keyPopulations/update/${row.id}`) ;
    },
    handleClickDelete(row) {
        //这里发送删除的id row.id
      DeleteApI(`/api/target-group/delete`,row.id).then((res)=>{
          if (res.data.code === 200){
              Message.success(res.data.message)
              GetAPI(`/api/target-group/list/?page=1&pageSize=10`).then((data)=>{
                  this.tableData = data.data.data;
                  this.tableData2 = data.data.data;
                  this.total=data.data.data.length;
                  this.loading=false
              }).catch((e)=>{
                  console.log(e)
                  Message.error('网络错误')
              })
          }else{
              Message.error(res.data.message)
          }
      })
    },
    // SearchRecordByName() {
    //   console.log(this.SelectName , this.searchName)
    // },
    searchlist(){
          this.tableData=this.tableData2.filter((v)=>{return v.name.includes(this.searchName)})
        }
  },

  data() {
    return {
      tableData: [],
      tableData2: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchName: '',
      SelectName: 'nameOfThePersonResponsible',
      loading:true
    }
  },
  created() {
    GetAPI(`/api/target-group/list/?page=1&pageSize=10`).then((data)=>{
      console.log(data,'data')
      this.tableData = data.data.data;
      this.tableData2 = data.data.data;
      this.total=data.data.data.length;
      this.loading=false
    }).catch((e)=>{
      console.log(e)
      Message.error('网络错误')
    })
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
