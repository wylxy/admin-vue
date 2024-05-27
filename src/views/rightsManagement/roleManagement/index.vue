<template>
    <el-table
        :data="tableData"
        border
        fit
        style="width: 100%"
        v-loading="loading"
    >
      <el-table-column
          fixed
          prop="name"
          label="姓名"
      >
      </el-table-column>
      <el-table-column
          fixed
          prop="description"
          label="描述"
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
</template>

<script>
import {DeleteApI, GetAPI} from "../../../../request/api";
import {Message} from "element-ui";

export default {
  methods: {
    handleClick(row) {
      this.$router.push(`/permissions/update/${row.id}`) ;
    },
    handleClickDelete(row) {
      DeleteApI(`/api/permission/delete`, row.id).then((data)=>{
        if(data.data.code === 200){
          Message.success('删除成功')
        } else {
          Message.error(data.data.message || '删除失败')
        }
      }).then(()=>{
        GetAPI(`/api/permission/listall`).then((data)=>{
          console.log(data,'data')
          this.tableData = data.data.data;
          this.loading = false;
        }).catch((e)=>{
          console.log(e)
          Message.error('网络错误')
        })
      })
      console.log(row.id);
    },
  },

  data() {
    return {
      tableData: [],
      loading: true,
    }
  },
  created() {
    GetAPI(`/api/permission/listall`).then((data)=>{
      console.log(data,'data')
      this.tableData = data.data.data;
      this.loading = false;
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
