<template>
  <div>
    <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select">
      <el-select v-model="SelectName" slot="prepend" placeholder="请选择">
        <el-option label="负责人姓名" value="1"></el-option>
        <el-option label="姓名" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </div>
    <el-table
        :data="tableData"
        border
        fit
        style="width: 100%">
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
                  size="mini"
                  round
                  type="danger"
                  plain
              >
                删除
              </el-button>
            </div>
            <el-button @click="handleClickDelete(scope.row)" type="text" size="small">删除</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        hide-on-single-page
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {GetAPI} from "../../../../request/api";
import {Message} from "element-ui";

export default {
  methods: {
    handleSizeChange(val) {
      // fixme 这里更改页面的时候传入(1， val) 并且重置 currentPage = 1
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // fixme 这里写入更改页面是传入(val,pageSize )
      console.log(`当前页: ${val}`);
      GetAPI(`/api/target-group/list/?page=${val}&pageSize=${this.pageSize}`).then((data)=>{
        console.log(data)
      }).catch((e)=>{
        console.log(e)
        Message.error('网络错误')
      })
    },
    handleClick(row) {
      this.$router.push(`/keyPopulations/update/${row.id}`) ;
      console.log(row);
    },
    handleClickDelete(row) {
      // fixme 这里发送删除的id row.id
      console.log(row.id);
    },
  },

  data() {
    return {
      tableData: [{
        category: '类别',
        contactInfo: '联系电话',
        id: 10,
        name: '重点人员姓名',
        responsiblePerson: '负责人姓名',
        street: '街道'
      }],
      total: 200,
      currentPage: 1,
      pageSize: 10,
      searchName: '',
      SelectName: '1'
    }
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
