<script>
export default {
  name: "SelfInfoView",
  data() {
    return {
      name:"jack",
      username:"122491-3",
      description:"这是一个热爱学习的人",
      value:"",
      userrole:"管理员",
      phone:"125489541",
      options:[
        {
          label:"普通用户",
          value:1
        },
        {
          label:"超级用户",
          value:2
        }
      ],
      circleUrl:"https://ts2.cn.mm.bing.net/th?id=ORMS.6a58623e0b5718ea644c0240126daf51&pid=Wdp&w=268&h=140&qlt=90&c=1&rs=1&dpr=1&p=0"
    }
  }
}
</script>

<template>
<div>
  <el-row :gutter="10" class="userInfoDiv">
    <div>

    </div>
    <div>
      <p>{{name}}</p>
      <p>{{description}}</p>
      <p>{{userrole}}</p>
      <button>编辑</button>
    </div>
  </el-row>
  <el-row :gutter="10" class="userInfoCompleteDiv">
    <table>
      <tbody>
        <tr>
          <td>用户名字</td>
          <td>{{name}}</td>
          <td>用户简介</td>
          <td>{{description}}</td>

          <td>手机号</td>
          <td>{{phone}}</td>
        </tr>
      </tbody>
    </table>
  </el-row>

</div>
</template>

<style scoped>

  .userInfoDiv div:last-child {
    display: inline-block;
    text-align: left;
  }

  .userInfoDiv div:last-child button {
    display: inline-block;
    width: 100%;
  }

  .userInfoDiv div:first-child {
    background-size: cover;
    width: 160px;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position: center;
    background-image: url("https://ts2.cn.mm.bing.net/th?id=ORMS.6a58623e0b5718ea644c0240126daf51&pid=Wdp&w=268&h=140&qlt=90&c=1&rs=1&dpr=1&p=0");
    margin-right: 10px;
    margin-left: 10px;
  }

  .userInfoDiv {
    display: flex;
    align-content: start;
    justify-content: start;
  }



  input {
    outline: 0;
    border: 0;
    background-color: transparent;
    font-size: 20px;
    height: 1.5em;
    color: lightgreen;
  }

  label {
    height: 1.5em;
  }

  .mainFrom {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    text-align: left;
  }

</style>
