<template>
  <el-card
    shadow="hover"
    :body-style="{ padding: '10px' }"
    @click.native="onclick"
  >
    <div class="book-item">
      <div class="image">
        <img v-if="book.image" :src="book.image" :alt="book.title" />
        <div v-else class="no-image">No Image</div>
      </div>
      <div class="description">
        <p class="desc-main">{{ book.title }}</p>
        <p class="desc-sub">{{ book.author }}</p>
        <p class="desc-sub">{{ book.publisher }}</p>
        <p class="desc-sub">{{ book.published }}</p>
      </div>
      <el-button
        v-if="addable"
        icon="el-icon-plus"
        circle
        @click="addBook"
      ></el-button>
    </div>
  </el-card>
</template>

<script>
import { mapActions } from "vuex";
import { UPDATE_MYBOOK, UPDATE_CURRENT } from "@/mutation_types";
export default {
  name: "BookInfo",
  props: {
    book: {
      type: Object,
      required: true
    },
    addable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions([UPDATE_MYBOOK, UPDATE_CURRENT]),
    addBook() {
      this[UPDATE_MYBOOK](this.book);

      // 通知メッセージ
      this.$notify({
        title: "Book MindManager",
        message: `${this.book.title}を本棚に追加しました。`,
        duration: 1000
      });
    },
    onclick() {
      if (this.editable) {
        this[UPDATE_CURRENT](this.book);
        this.$router.push("/form");
      }
    }
  }
};
</script>

<style scoped>
.book-item {
  display: grid;
  grid-template-columns: 1fr 5fr;
  min-height: 80px;
  font-size: 0.8rem;
  position: relative;
}
.image {
  align-self: center;
}
.image img {
  width: 100%;
}
.description {
  text-align: left;
  padding: 0 15px;
}
.desc-main {
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 0 5px;
}
.desc-sub {
  font-size: 0.6rem;
  color: #7f8c8d;
  margin: 0;
}
@media (min-width: 768px) {
  .book-item {
    min-height: 200px;
  }
  .desc-main {
    font-size: 1.2rem;
  }
  .desc-sub {
    font-size: 0.8rem;
  }
}
.el-button {
  position: absolute;
  right: 0%;
  bottom: 0%;
}

.el-button:hover {
  color: #16a085;
}

.add-btn i {
  font-size: 3rem;
  color: #7f8c8d;
}

.add-btn:hover i {
  color: #16a085;
}
</style>
