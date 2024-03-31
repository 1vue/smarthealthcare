<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: '/getPatientData' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>医生信息查询</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >

        <span>医生信息查询</span>

      </div>

      <div class="find">

        <div class="search">
          <el-form :inline="true">
            <el-form-item label="医生姓名">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入医生姓名"
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
            <el-form-item label="科室">
              <el-input
                v-model="searchForm.room"
                placeholder="请输入医生所属科室"
              ></el-input>
            </el-form-item>
            <el-form-item label="职务">
              <!-- <el-input
                v-model="searchForm.degree"
                placeholder="请输入职务"
              ></el-input> -->
              <el-input
                type="textarea"
                v-model="searchForm.degree"
                :autosize="{ minRows: 1, maxRows: 10}"
                placeholder="请输入职务"
                resize="none"
              >
              </el-input>
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
              content="点击新增医生信息"
              placement="top-start"
            >
              <el-button
                style="margin-left: 4px;"
                @click="dialogVisible = true"
                type="primary"
              >新增医生</el-button>
            </el-tooltip>
            <el-dialog
              title="添加医生"
              :visible.sync="dialogVisible"
              width="50%"
              @close="dialogVisibleClose"
            >
              <el-form
                :model="addDocter"
                :rules="addDocterRule"
                ref="addDocterRef"
                label-width="140px"
                style="margin-top: 8px;"
              >
                <el-form-item
                  label="医生姓名"
                  prop="name"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addDocter.name"></el-input>
                </el-form-item>
                <el-form-item
                  label="性别"
                  prop="sex"
                  style="margin-top: 15px; "
                >
                  <el-input v-model="addDocter.sex"></el-input>
                </el-form-item>
                <el-form-item
                  label="电话号码"
                  prop="phoneNumber"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addDocter.phoneNumber"></el-input>
                </el-form-item>

                <el-form-item
                  label="科室"
                  prop="room"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addDocter.room"></el-input>
                </el-form-item>

                <el-form-item
                  label="职务"
                  prop="degree"
                  style="margin-top: 15px;"
                >
                  <el-input v-model="addDocter.degree"></el-input>
                </el-form-item>

                <el-form-item
                  label="分配的用户名"
                  prop="userName"
                  style="margin-top: 15px; "
                >
                  <el-input v-model="addDocter.userName"></el-input>
                </el-form-item>

              </el-form>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="adddocter"
                >确 定</el-button>
              </span>
            </el-dialog>

          </el-form>
        </div>

        <div class="data">
          <el-table
            :data="docterData"
            stripe
            style="width: 100%"
            border
          >

            <el-table-column
              prop="name"
              label="医生姓名"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
            >
            </el-table-column>
            <el-table-column
              prop="room"
              label="科室"
            >
            </el-table-column>
            <el-table-column
              prop="degree"
              label="职务"
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
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除该用户"
                  placement="top-start"
                >
                  <el-button
                    type="danger"
                    round
                    size="small"
                    style="width: 80px;"
                    @click="deleteDocter(scope.row.userName)"
                  >删除</el-button>
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

      count: 0,
      total: 100,

      currentPage: 1,
      pageSize: 5,

      searchForm: {
        name: '',
        sex: '',
        room: '',
        degree: '',

      },

      docterData: [

      ],
      dialogVisible: false,
      addDocter: {
        name: '',
        sex: '',

        phoneNumber: '',

        room: '',
        degree: '',
        userName: ''
      },

      addDocterRule: {
        name: [
          { required: true, message: '请输入医生姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
          { min: 1, max: 1, message: '长度为1个字符', trigger: 'blur' }

        ],

        phoneNumber: [
          { required: true, message: '请输入医生电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11 个字符', trigger: 'blur' }
        ],

        room: [
          { required: true, message: '请输入医生的科室', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        degree: [
          { required: true, message: '请输入医生的职务', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入为医生分配的用户名', trigger: 'blur' },
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
        url: '/patient/findDocter',
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
        this.docterData = res.data.data.table;
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

          if (action === 'confirm') {
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


        }
      });
    },
    deleteDocter (userName) {
      this.$alert('确定删除该医生？', '提示', {
        confirmButtonText: '确定',
        callback: action => {

          if (action === 'confirm') {
            console.log(userName);
            let formdata = new FormData()
            formdata.append('postUserName', userName)

            this.$http({
              url: '/manage/deleteDocter',
              method: "delete",
              headers: {
                token: window.sessionStorage.getItem('token'),
                "Content-Type": "multipart/form-data",
              },
              data: formdata,

            }).then((res) => {
              console.log(res);

              if (res.data.code === 1) {

                this.$message.success('删除成功')
                this.search()
              }

              else
                this.$message.error('删除失败')
            })
          }


        }
      });
    },
    dialogVisibleClose () {
      this.$refs.addDocterRef.resetFields()
    },
    adddocter () {
      this.$refs.addDocterRef.validate(async valid => {

        let data = {
          name: this.addDocter.name,
          sex: this.addDocter.sex,
          room: this.addDocter.room,
          phoneNumber: this.addDocter.phoneNumber,
          degree: this.addDocter.degree,
          userName: this.addDocter.userName
        }
        let formdata = new FormData()
        for (let key in data) {
          formdata.append(key, data[key])
        }


        console.log(valid);
        if (!valid) return
        console.log(this.addPatient);

        await this.$http({
          url: '/manage/addDocter',
          method: "put",
          headers: {
            token: window.sessionStorage.getItem('token'),
            "Content-Type": "multipart/form-data",
          },
          data: formdata,

        }).then((res) => {
          if (res.data.code == 0) { this.$message.error("添加失败，该用户名已存在") }
          else {
            this.$message.success("添加医生成功")
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
.el-input {
  width: 180px;
}
.el-input__icon {
  width: 55px;
}
</style>