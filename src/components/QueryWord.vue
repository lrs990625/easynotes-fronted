<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div>
          <input v-model="username" type="text" class="form-control form-control-lg query-input"
                 placeholder="您的名字，以此作为标识">
          <button @click="saveUserName" class="query-btn" type="button">保存到本地</button>
        </div>
        <br>
        <div>
          <input v-model="word" type="text" class="form-control form-control-lg query-input" placeholder="输入日语词汇">
          <button @click="query" class="query-btn" type="button">查词</button>
          <button @click="save" class="save-btn" type="button">保存</button>
        </div>
      </div>
      <br>
      <div class="showBox" v-show="excelWords.length > 0">
        <ul>
          <li v-for="(word, index) in excelWords" :key="index" class="word-item">
            <div class="word-header">{{ word.word }} ({{ word.kana }})</div>
            <div class="word-type">{{ word.type }}</div>
            <div class="word-meanings">
              <!-- 对 meanings 进行分隔并遍历显示 -->
              <div v-for="(meaning, idx) in word.meanings.split(/(?=\d\.)/g)" :key="idx">{{ meaning }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "QueryWord",
  data() {
    return {
      username: '',
      word: '',
      excelWords: [],
      usernameSaveFlg: false
    }
  },
  methods: {
    query() {
      // 检查 word 和 username 是否都不为空
      if (this.word && this.username) {
        axios.get(`http://localhost:8080/query/${this.word}`).then(res => {
          if (res.status === 200){
            ElMessage.success({
              message: '查询成功',
              duration: 3000 // 设置显示时间为 3 秒
            });
            this.excelWords = res.data.excelWords
          }
        }).catch(error => {
          ElMessage.error({
            message: error,
            duration: 3000 // 设置显示时间为 3 秒
          });
        });
      } else {
        // 如果有一个为空，则给出提示
        alert('请输入用户名和要查询的单词');
      }
    },
    save() {
      if (this.excelWords.length > 0) {
        this.excelWords.forEach(word => {
          // 将每个元素的 user 属性设置为 this.username
          word.user = this.username;
        });
        axios.post(`http://localhost:8080/save/`, this.excelWords).then(res => {
          if (res.status === 200) {
            ElMessage.success({
              message: res.data,
              duration: 3000 // 设置显示时间为 3 秒
            });
          }else {
            ElMessage.error({
              message: res.data,
              duration: 3000 // 设置显示时间为 3 秒
            });
          }
        }).catch(error => {
          ElMessage.error({
            message: error,
            duration: 3000 // 设置显示时间为 3 秒
          });
        });
      } else {
        ElMessage.warning('无内容');
      }
    },
    saveUserName() {
      // 将 this.username 存储到本地存储中
      localStorage.setItem('easyNotesUser', this.username);
    },

  },
  created() {
    // 从 localStorage 中获取 easyNotesUser
    let easyNotesUser = localStorage.getItem('easyNotesUser');
    // 如果 easyNotesUser 存在
    if (easyNotesUser) {
      this.username = easyNotesUser;
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

.query-input {
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
}

.input-group-append {
  display: flex;
}

.query-btn,
.save-btn {
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #007bff;
  border-radius: 5px;
  margin-left: 5px;
  cursor: pointer;
}

.query-btn:hover,
.save-btn:hover {
  background-color: #007bff;
  color: #fff;
}

.showBox {
  width: 50%; /* 设置宽度 */
  margin: 0 auto; /* 设置居中 */
  border: 1px solid #ccc; /* 添加边框 */
  border-radius: 10px; /* 设置圆角 */
  padding: 10px; /* 添加内边距 */
  text-align: left; /* 强制文本左对齐 */
}

.word-item {
  padding: 15px 0; /* 添加上下内边距 */
}

.word-header {
  font-weight: bold;
}

.word-type {
  color: #666; /* 添加字体颜色 */
}

.word-meanings {
  margin-top: 5px; /* 添加含义顶部间距 */
}

/* 添加条纹效果 */
.even {
  background-color: #f9f9f9;
}

.odd {
  background-color: #fff;
}

</style>
