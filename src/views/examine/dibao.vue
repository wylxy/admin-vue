<template>
    <div id="container">
    <el-table
     style="width: 90%;margin: 0 auto;"
      :data="tableData"
      border
  >
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所属街道"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="负责人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="理由"
        width="450">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row,'通过')" type="text" size="small">通过</el-button>
          <el-button @click="handleClick(scope.row,'驳回')" type="text" size="small">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
  </template>
  
  <script>
    export default {
      methods: {
        handleClick(row,state) {
          console.log(row.index);
          this.tableData[row.index].state=state;
      console.log(this.tableData)
        },
       
      },
  
      data() {
        return {
          tableData: [{
            date: '2023-05-02',
            name: '王一一',
            province: '一级低保',
            city: '和兴街道',
            address: '张三',
            state:"待审核",
            zip:"我没有钱",
            index:0
          }, {
            date: '2023-05-02',
            name: '李一一',
            province: '一级低保',
            city: '大有坊街道',
            address: '李四',
            state:"待审核",
            zip:"我没有钱",
            index:1
          }, {
            date: '2023-05-04',
            name: '孙一一',
            province: '二级低保',
            city: '化工街道',
            address: '孙七',
            state:"待审核",
            zip:"我没有钱",
            index:2
          }, {
            date: '2023-05-02',
            name: '周二',
            province: '一级低保',
            city: '南马街道',
            address: '于三',
            state:"待审核",
            zip:"我没有钱",
            index:3
          }]
        }
      }
    }
  </script>
  <style scoped>
  #container{
    padding:15px;
  }
  </style>