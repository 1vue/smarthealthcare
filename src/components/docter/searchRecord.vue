<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: '/docterBaseData' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出诊病历查询</el-breadcrumb-item>

    </el-breadcrumb>

    <el-card class="box-card">

      <div
        slot="header"
        class="clearfix"
      >

        <span>病历历史</span>

      </div>
      <div class="find">

        <div class="search">
          <el-form :inline="true">
            <el-form-item label="患者姓名">
              <el-input
                v-model="searchForm.patientName"
                placeholder="请输入患者姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="疾病名称">
              <el-input
                v-model="searchForm.kind"
                placeholder="请输入疾病名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="病情程度">
              <el-input
                v-model="searchForm.degree"
                placeholder="请输入病情程度"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-tooltip
                class="item"
                effect="dark"
                content="点击查询相关病历信息"
                placement="top-start"
              >
                <el-button
                  @click="search"
                  type="primary"
                >查询</el-button>

              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="点击新增病历信息"
                placement="top-start"
              >
                <el-button
                  style="margin-left: 180px;"
                  @click="dialogVisible = true"
                  type="primary"
                >新增病历</el-button>
              </el-tooltip>

              <el-dialog
                title="添加病历"
                :visible.sync="dialogVisible"
                width="50%"
                @close="dialogVisibleClose"
              >
                <el-form
                  id="printRecord"
                  :model="addHistory"
                  :rules="addHistoryRule"
                  ref="addHistoryRef"
                  label-width="100px"
                  style="margin-top: 8px;"
                >
                  <h2>患者病历信息</h2>
                  <el-form-item
                    label="患者姓名"
                    prop="patientName"
                    style="margin-top: 15px;"
                  >
                    <el-input v-model="addHistory.patientName"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="疾病种类"
                    prop="kind"
                    style="margin-top: 15px;"
                  >
                    <el-input v-model="addHistory.kind"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="病情程度"
                    prop="degree"
                    style="margin-top: 15px;"
                  >
                    <el-input v-model="addHistory.degree"></el-input>
                  </el-form-item>

                </el-form>
                <span
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button v-print="'#printRecord'">打印病历</el-button>
                  <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                  <el-button
                    type="primary"
                    @click="add"
                  >确 定</el-button>
                </span>
              </el-dialog>

            </el-form-item>
          </el-form>
        </div>

        <div class="data">
          <el-table
            :data="historyData"
            stripe
            style="width: 100%"
            border
          >
            <el-table-column
              prop="patientName"
              label="患者姓名"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="kind"
              label="疾病名称"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="degree"
              width="300"
              label="病情程度"
            >
            </el-table-column>

            <el-table-column
              prop="time"
              label="患病时间"
            >
            </el-table-column>

          </el-table>
        </div>

        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout=" prev, pager, next"
            :page-sizes="[5,6,7]"
            :page-size.sync="pageSize"
            :current-page.sync="currentPage"
            :total="total"
          >
          </el-pagination>

        </div>
      </div>

    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,

      count: 0,
      total: 100,

      currentPage: 1,
      pageSize: 5,

      searchForm: {
        patientName: '',
        kind: '',
        degree: '',
      },

      historyData: [

      ],
      addHistory: {
        patientName: '',
        kind: '',
        degree: ''
      },
      addHistoryRule: {
        patientName: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '请输入疾病种类', trigger: 'blur' },

        ],
        degree: [
          { required: true, message: '请输入患者病情程度', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],

      },
    }
  },
  methods: {


    search () {

      let data = {
        patientName: this.searchForm.patientName,
        kind: this.searchForm.kind,
        degree: this.searchForm.degree,
      }
      let formdata = new FormData()
      for (let key in data) {
        formdata.append(key, data[key])
      }

      this.$http({
        url: '/docter/searchRecord',
        method: "post",

        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        },
        headers: {
          token: window.sessionStorage.getItem('token'),
          "Content-Type": "multipart/form-data",
        },
        data: formdata,

      }).then((res) => {
        console.log(res);
        this.historyData = res.data.data.table;
        this.total = res.data.data.total;
        for (let index = 0; index < this.historyData.length; index++) {
          this.historyData[index].time = this.historyData[index].time.replace('T', ' ')

        }

        if (res.data.code === 1) {
          if (this.count == 0) {
            this.$message.success('查询成功,共查询到' + this.total + '条数据')
            this.count++;
          }
        }

      })



    },

    dialogVisibleClose () {
      this.$refs.addHistoryRef.resetFields()
    },

    add () {
      this.$refs.addHistoryRef.validate(async valid => {

        let data = {
          patientName: this.addHistory.patientName,
          kind: this.addHistory.kind,
          degree: this.addHistory.degree,
        }
        let formdata = new FormData()
        for (let key in data) {
          formdata.append(key, data[key])
        }


        console.log(valid);
        if (!valid) return
        console.log(this.addHistory);

        await this.$http({
          url: '/docter/addRecord',
          method: "put",
          headers: {
            token: window.sessionStorage.getItem('token'),
            "Content-Type": "multipart/form-data",
          },
          data: formdata,

        }).then((res) => {
          if (res.data.code == 0) { this.$message.error("提交失败，请检查填写是否正确，或该患者是否已录入系统") }
          else {
            this.$message.success("新建病历成功")
            this.search()
            this.dialogVisible = false;
          }
        })


      })
    },
    handleSizeChange (size) {
      this.$message.success("一页大小改变为：" + this.pageSize);
      this.search();
    },

    handleCurrentChange (currentPage) {


      this.$message.success("页码数改变为" + this.currentPage);
      this.search();

    },

  },
  mounted () {
    this.search()
  },



}
</script>

<style scoped lang="less">
.box-card {
  margin-top: 20px;
  height: 650px;
}
.find {
  display: flex;
  flex-direction: column;
  .data {
    height: 400px;
  }
}
.search {
  display: flex;
  flex-direction: row;
}

.page {
  // margin-top: 10px;
  // text-align: center;
  .el-pagination {
    margin-left: 400px;
  }
}
#printRecord h2 {
  margin: 16px;
  text-align: center; /* Center the title */
}
</style>