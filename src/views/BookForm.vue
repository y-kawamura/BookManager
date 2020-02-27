<template>
  <div class="form">
    <book-info :book="current"></book-info>
    <el-form>
      <div class="date">
        <span>本を読み始めた日</span>
        <el-date-picker
          style="width: 150px;"
          type="date"
          v-model="form.startDate"
        ></el-date-picker>
      </div>
      <div class="date">
        <span>本を読み終えた日</span>
        <el-date-picker
          style="width: 150px;"
          type="date"
          v-model="form.endDate"
        ></el-date-picker>
      </div>
      <el-form-item label="要点1">
        <el-input type="textarea" autosize v-model="form.summary1"></el-input>
      </el-form-item>
      <el-form-item label="要点2">
        <el-input type="textarea" autosize v-model="form.summary2"></el-input>
      </el-form-item>
      <el-form-item label="要点3">
        <el-input type="textarea" autosize v-model="form.summary3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onsubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BookInfo from "@/components/BookInfo.vue";
import { UPDATE_MYBOOK } from "@/mutation_types";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "BookForm",
  components: {
    BookInfo
  },
  data() {
    return {
      book: {},
      form: {
        summary1: "",
        summary2: "",
        summary3: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  methods: {
    ...mapActions([UPDATE_MYBOOK]),
    onsubmit() {
      this[UPDATE_MYBOOK](Object.assign(this.book, this.form));

      this.$notify({
        title: "Book MindManager",
        message: `保存しました。`,
        duration: 1000
      });
    }
  },
  computed: {
    ...mapState(["current"]),
    ...mapGetters(["isMyBook"])
  },
  created() {
    if (!this.current) {
      this.$router.push("/");
    }
    this.book = Object.assign({}, this.current);
  },
  mounted() {
    console.log("mounted");
    if (this.isMyBook(this.book.id)) {
      console.log(this.book);
      this.form.summary1 = this.book.summary1;
      this.form.summary2 = this.book.summary2;
      this.form.summary3 = this.book.summary3;
      this.form.startDate = this.book.startDate;
      this.form.endDate = this.book.endDate;
    }
  }
};
</script>

<style scoped>
.date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}
</style>