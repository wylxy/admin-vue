<template>
  <div id="container">
    <el-table style="width: 90%;margin: 0 auto;" :data="tableData" border v-loading="loading">
      <el-table-column fixed prop="date" label="日期" width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="province" label="理由" width="230">
      </el-table-column>
      <el-table-column prop="street" label="所属街道" width="150">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="350">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="debounce(handleClick(scope.row, '通过'),2000)" type="text" size="small">通过</el-button>
          <el-button @click="debounce(handleClick(scope.row, '驳回'),2000)" type="text" size="small">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div style="height: 15px;width: auto"></div>
      <el-pagination
          style="float: right;"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          :page-sizes="[10]">
      </el-pagination>
  </div>
</template>
<script>
import {DeleteApI, GetAPI, PutApi} from "../../../request/api";
import {Message} from "element-ui";
export default {
  mounted() {
      GetAPI("/api/target-group/application/count").then((res) => {
            console.log(res.data.data);
          this.total=res.data.data
      })
    GetAPI("/api/target-group/application?page=1&pageSize=10").then((res) => {
      console.log(res.data.data);
      res.data.data.forEach((val, index) => {
        console.log(val, index);
        this.tableData.push({
          date: "",
          name: "",
          province: "",
          index: 0,
          street: "",
          address: "",
          id: 0,
          state: "",
            total:0
        })

          // this.total=res.data.length
        this.tableData[index].date = this.timeChange(val.date);
        this.tableData[index].province = val.reason;
        this.tableData[index].state = val.status;
        this.tableData[index].index = index;
        this.tableData[index].id = val.id;
        let payload = JSON.parse(val.payload)
        GetAPI("/api/resident/get?id=" + payload.residentId).then((res2) => {
          console.log(res2.data.data);//street,address
          this.tableData[index].street = res2.data.data.street;
          this.tableData[index].name = res2.data.data.name;
          this.tableData[index].address = res2.data.data.address;

          this.loading=false;

        })
      })
    })
  },
  methods: {
    debounce(fn, wait) {
    var timeout = null;
    return function() {
        if(timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
},
    handleClick(row, state) {
      console.log(row);

      console.log(this.tableData)
      PutApi('/api/target-group/approve', {
        applicationId: this.tableData[row.index].id,
        comment: state,
        statusId: state == "通过" ? 1 : 2
      }).then((res3) => {
        console.log(res3);
        if(res3.data.code==200){
          this.tableData[row.index].state = state;
        }

      })
    },
    //时间戳转时间
    timeChange(timestamp) {

      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear(),
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
        h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
        m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()),
        s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    },
      handleSizeChange(val) {
          GetAPI(`/api/target-group/application?page=1&pageSize=${val}`).then((data)=>{
              console.log(data,'data')
          }).catch((e)=>{
              console.log(e)
              Message.error('网络错误')
          })
          this.currentPage = 1;
      },
      handleCurrentChange(val) {
          GetAPI(`/api/target-group/application?page=${val}&pageSize=10`).then((res)=>{
              console.log(res.data.data);
              this.tableData=[]
              res.data.data.forEach((val, index) => {
                  console.log(val, index);
                  this.tableData.push({
                      date: "",
                      name: "",
                      province: "",
                      index: 0,
                      street: "",
                      address: "",
                      id: 0,
                      state: "",
                      total:0
                  })

                  // this.total=res.data.length
                  this.tableData[index].date = this.timeChange(val.date);
                  this.tableData[index].province = val.reason;
                  this.tableData[index].state = val.status;
                  this.tableData[index].index = index;
                  this.tableData[index].id = val.id;
                  let payload = JSON.parse(val.payload)
                  GetAPI("/api/resident/get?id=" + payload.residentId).then((res2) => {
                      console.log(res2.data.data);//street,address
                      this.tableData[index].street = res2.data.data.street;
                      this.tableData[index].name = res2.data.data.name;
                      this.tableData[index].address = res2.data.data.address;

                      this.loading=false;

                  })
              })
          })
      },
  },
  data() {
    return {
      tableData: [],
      loading:true,
      total: 0,
      currentPage: 1,
      pageSize: 100,
    }
  }
}
</script>
<style scoped>
#container {
  padding: 15px;
}
</style>