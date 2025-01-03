<script>
import axios from "axios";
import {open} from "@/ConstMsg/NormalMethod";
import {LOGIN_BY_UP_PATH_MSG} from "@/ConstMsg/CommonMsg";
import {ElMessage} from "element-plus";

export default {
  name: "SelectPageView",
  data() {
    return {
      users:[
      ],
      form:{
        name:null,
        username:null,
        phone:null,
        grender:null,
        userRole:null,
        begin:null,
        end:null,
        page:1,
        pageSize:20
      },
      totalPages:null,
      checkedUsers:null,
      options:[
        {
          value: true,
          label: '男性',
        },
        {
          value: false,
          label: '女性',
        }
      ]
    }
  },
  methods:{
    resetPasswords(index,row)
    {
      console.log("row:",row.username);
      console.log("current_user:",localStorage.getItem("user"));
      if (!this.checkedUsers.includes(row)) {
        open("请先勾选框,再进行操作","warnning");
        return;
      }
      const usernames = this.checkedUsers.map(item => item.username).toString();
      console.log("usernames:"+usernames);
      axios({
        url:this.$store.state.domains.localHost+"/main/users/reset",
        method:"put",
        params:{
          usernames:usernames
        },
        headers:{
          token:localStorage.getItem("user")
        }
      }).then(res => {
        if (res.data.code == 1) {
          open(res.data.msg,"success");
        } else {
          open(res.data.msg,"wranning");
        }
      }).catch(e => {
        console.error(e.message);
        open("系统错误","error");
      })
    },
    doCurrentPage(cur) {
      console.log("系统当前页:"+cur);
      console.log("当前页:"+this.form.page);
      this.form.page = cur;
      this.getPageData();
    },
    deleteUsers(index,row) {
      console.log(`username+${row.username}`);
      if (!this.checkedUsers.includes(row)) {
        open("请先勾选框,再进行操作","warnning");
        return;
      }
      const usernames = this.checkedUsers.map(item => item.username).toString();
      axios({
        url:this.$store.state.domains.localHost+"/main/users",
        method:"put",
        params:{
          usernames:usernames
        },
        headers:{
          token:localStorage.getItem("user")
        }
      }).then(res => {
        this.getPageData();
        open(res.data.msg,"success");

      }).catch(e => {
        console.log(e.message);
        open("系统错误","error");
      })
    },
    changeSelect(index) {
      this.checkedUsers = index;
      console.log("勾选的用户:"+index);
    },
    getRowKey(index) {
      // return index;
      return this.users[index];
    },
    selectChange() {
      console.log("用户角色:"+this.form.userRole);
    },
    getPageData() {
      console.log(this.form);
      axios({
        url:this.$store.state.domains.localHost+"/main/users/condition",
        method:"post",
        data:this.form,
        headers:{
          token:localStorage?.getItem("user")//如果没有user键返回null
        }
      }).then(res => {
        //res.data 才是后端返回的数据
        if(res.data.code == 1) {
          console.log(res.data);
          this.users=res.data.data.records;
          this.totalPages=res.data.data.pages;
        } else {
          open(res.data.msg,"warning");
        }
      }).catch(e => {
        console.log(e.message);
        open("发生错误","error");
      })
    },
    selectUsers() {
      console.log("查询");
      this.getPageData();
    },
  },
  //刷新会自动调用这玩意
  beforeMount () {
    console.log(this.form);
    let user = localStorage?.getItem("user");
    if(!user ) {
     //没有token时如何处理
      console.log("token不存在");
    }
  }
}
</script>

<template>
  <el-form :model="this.form" inline>
    <el-form-item label="用户昵称">
      <el-input v-model="this.form.name" placeholder="请输入用户昵称"/>
    </el-form-item>
    <el-form-item label="用户账号">
      <el-input v-model="this.form.username" placeholder="请输入用户账号" />
    </el-form-item>
    <el-form-item label="用户手机号">
      <el-input v-model="this.form.phone" placeholder="请输入用户手机号" />
    </el-form-item>
    <el-form-item label="性别" :name="this.form.grender">

      <el-select
          v-model="this.form.grender"
          placeholder="请输入性别"

          style="width: 240px"
      >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>



    </el-form-item>
    <el-form-item label="日期范围">
      <el-date-picker type="date" placeholder="请输入开始日期" v-model="this.form.begin" :disabled-date="disableDate"/>
      --
      <el-date-picker type="date" placeholder="请输入结束日期" v-model="this.form.end" :disabled-date="disableDate" style="margin-right: 5px"/>
      <el-button type="info" @click="selectUsers">查询</el-button>
    </el-form-item>

  </el-form>

  <el-table style="width:100%;margin-bottom:20px" :data="users" :row-key="getRowKey" @selection-change="changeSelect">
    <el-table-column v-if="this.$store.state.userInfo.role ==='超级用户'" type="selection"/>
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="image" label="头像" />
    <el-table-column prop="phone" label="手机号" />
    <el-table-column prop="grender" label="性别" />
    <el-table-column prop="description" label="描述" show-overflow-tooltip/>
    <el-table-column label="操作" v-if="this.$store.state.userInfo.role === '超级用户'">
      <template #default="scope">
        <el-button type="warning" @click="resetPasswords(scope.$index,scope.row)">
          重置密码
        </el-button>
        <el-button type="danger" @click="deleteUsers(scope.$index,scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row :gutter="20" justify="center">
    <el-col :span="6">
      <el-pagination background layout="prev, pager, next" :total="this.totalPages" @current-change="doCurrentPage" />
    </el-col>
  </el-row>
</template>

<style scoped>
  select {
    height: 30px;
    width: 50px;
  }


el-table el-table-column {
  margin-right: 4px;
}
</style>
