<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: '/getPatientData' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>患者信息查询</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >

        <span>患者信息查询</span>

      </div>

      <div class="find">

        <div class="search">
          <el-form :inline="true">
            <el-form-item label="患者姓名">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入患者姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="searchForm.sex"
                placeholder="请选择性别"
              >
                <el-option
                  label="男"
                  value="男"
                ></el-option>
                <el-option
                  label="女"
                  value="女"
                ></el-option>
                <el-option
                  label="全部"
                  value=""
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="家庭住址">
              <el-input
                v-model="searchForm.address"
                placeholder="请输入家庭住址"
              ></el-input>
            </el-form-item>

            <el-tooltip
              class="item"
              effect="dark"
              content="点击查询相关医生信息"
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
              content="点击新增患者信息"
              placement="top-start"
            >
              <el-button
                style="margin-left: 66px;"
                type="primary"
                @click="dialogVisible = true"
              >新增患者</el-button>
            </el-tooltip>

            <el-dialog
              title="添加患者"
              :visible.sync="dialogVisible"
              width="50%"
              @close="dialogVisibleClose"
            >
              <el-form
                :model="addPatient"
                :rules="addPatientRule"
                ref="addPatientRef"
                label-width="140px"
                style="margin-top: 8px;"
              >
                <el-form-item
                  label="患者姓名"
                  prop="name"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addPatient.name"></el-input>
                </el-form-item>
                <el-form-item
                  label="性别"
                  prop="sex"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addPatient.sex"></el-input>
                </el-form-item>
                <el-form-item
                  label="家庭住址"
                  prop="address"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addPatient.address"></el-input>
                </el-form-item>
                <el-form-item
                  label="电话号码"
                  prop="phoneNumber"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addPatient.phoneNumber"></el-input>
                </el-form-item>

                <el-form-item
                  label="分配的用户名"
                  prop="userName"
                  style="margin-top: 15px; "
                >
                  <el-input v-model="addPatient.userName"></el-input>
                </el-form-item>

              </el-form>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="addpatient"
                >确 定</el-button>
              </span>
            </el-dialog>

          </el-form>
        </div>

        <div class="data">
          <el-table
            :data="patientData"
            stripe
            style="width: 100%"
            border
          >

            <el-table-column
              prop="name"
              label="患者姓名"
              width="270"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="270"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              width="270"
              label="家庭住址"
            >
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="电话号码"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击为该用户重置密码"
                  placement="top-start"
                >
                  <el-button
                    type="primary"
                    round
                    size="small"
                    style="width: 80px;"
                    @click="reset(scope.row.userName)"
                  >重置密码</el-button>
                </el-tooltip>
              </template>
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
        name: '',
        sex: '',
        address: '',
        ptoneNumber: ''

      },

      patientData: [

      ],


      addPatient: {
        name: '',
        sex: '',
        address: '',
        phoneNumber: '',
        userName: ''
      },
      addPatientRule: {
        name: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入患者性别', trigger: 'blur' },
          { min: 1, max: 1, message: '长度为1个字符', trigger: 'blur' }

        ],
        address: [
          { required: true, message: '请输入家庭住址', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入患者电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11 个字符', trigger: 'blur' }
        ],

        userName: [
          { required: true, message: '请输入为患者分配的用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],


      },

    }
  },



  methods: {

    search () {


      let formdata = new FormData()
      for (let key in this.searchForm) {
        formdata.append(key, this.searchForm[key])
      }

      this.$http({
        url: '/manage/getPatientData',
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
        this.patientData = res.data.data.table;
        this.total = res.data.data.total;


        if (res.data.code === 1) {
          if (this.count == 0) {
            this.$message.success('查询成功,共查询到' + this.total + '条数据')
            this.count++;
          }
        }


      })

    },


    reset (userName) {
      this.$alert('确定重置该用户密码？', '提示', {
        confirmButtonText: '确定',
        callback: action => {

          console.log(userName);
          let formdata = new FormData()
          formdata.append('postUserName', userName)

          this.$http({
            url: '/manage/resetCode',
            method: "put",
            headers: {
              token: window.sessionStorage.getItem('token'),
              "Content-Type": "multipart/form-data",
            },
            data: formdata,

          }).then((res) => {
            console.log(res);

            if (res.data.code === 1)
              this.$message.success('重置密码成功')
            else
              this.$message.error('重置密码失败')


          })


        }
      });
    },
    dialogVisibleClose () {
      this.$refs.addPatientRef.resetFields()
    },
    addpatient () {
      this.$refs.addPatientRef.validate(async valid => {

        let data = {
          name: this.addPatient.name,
          sex: this.addPatient.sex,
          address: this.addPatient.address,
          phoneNumber: this.addPatient.phoneNumber,
          userName: this.addPatient.userName
        }
        let formdata = new FormData()
        for (let key in data) {
          formdata.append(key, data[key])
        }


        console.log(valid);
        if (!valid) return
        console.log(this.addPatient);

        await this.$http({
          url: '/manage/addPatient',
          method: "put",
          headers: {
            token: window.sessionStorage.getItem('token'),
            "Content-Type": "multipart/form-data",
          },
          data: formdata,

        }).then((res) => {
          if (res.data.code == 0) { this.$message.error("添加失败，用户名已存在!") }
          else {
            this.$message.success("添加患者成功")
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
</style>