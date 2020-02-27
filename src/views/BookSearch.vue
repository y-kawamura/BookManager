<template>
  <div class="search">
    <el-input
      placeholder="検索(タイトル,著者,...)"
      prefix-icon="el-icon-search"
      v-model="keyword"
      clearable
      @keyup.enter.native="searchAsync(1)"
    >
    </el-input>
    <book-info
      v-for="book in books"
      :key="book.id"
      :book="book"
      :addable="!isMyBook(book.id)"
      style="margin-top: 5px"
    />
    <el-pagination
      v-show="hasPage"
      background
      layout="prev, next"
      :page-size="numPerPage"
      :total="totalItems"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import BookInfo from "@/components/BookInfo.vue";
import { mapGetters } from "vuex";

export default {
  name: "BookSearch",
  components: {
    BookInfo
  },
  data() {
    return {
      keyword: "vue.js",
      books: [],
      totalItems: 0,
      numPerPage: 40
    };
  },
  methods: {
    searchAsync(page) {
      const q = `q=${this.keyword}`;
      const startIndex = (page - 1) * this.numPerPage;
      const opts = [
        `startIndex=${startIndex}`,
        `maxResults=${this.numPerPage}`
      ];
      const qeury = opts ? [q, ...opts].join("&") : q;
      this.$http(`https://www.googleapis.com/books/v1/volumes?${qeury}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.books = [];
          // Google books API returns different total items depends on start index!
          this.totalItems = data.totalItems;
          for (let book of data.items) {
            // some items may be blank
            let authors = book.volumeInfo.authors;
            let imageLink = book.volumeInfo.imageLinks;
            this.books.push({
              id: book.id,
              title: book.volumeInfo.title,
              author: authors ? authors.join(",") : "",
              publisher: book.volumeInfo.publisher,
              published: book.volumeInfo.publishedDate,
              image: imageLink ? imageLink.smallThumbnail : ""
            });
          }
        });
    },
    changePage(newPage) {
      console.log(newPage);
      this.searchAsync(newPage);
    }
  },
  computed: {
    hasPage() {
      return this.totalItems !== 0;
    },
    ...mapGetters(["isMyBook"])
  }
};
</script>
