<template>
  <div class="search">
    <el-input
      placeholder="検索(タイトル,著者,...)"
      prefix-icon="el-icon-search"
      v-model="keyword"
      clearable
      @keyup.enter.native="searchAsync(1)"
      style="margin-bottom: 30px"
    >
    </el-input>
    <template v-for="book in books">
      <div class="book-item" :key="book.id">
        <div class="image">
          <img v-if="book.image" :src="book.image" :alt="book.title" />
          <div v-else class="no-image">No Image</div>
        </div>
        <div class="description">
          <p>{{ book.title }}</p>
          <p class="desc-sub">{{ book.author }}</p>
          <p class="desc-sub">{{ book.publisher }}</p>
        </div>
      </div>
      <hr :key="book.id" />
    </template>
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
export default {
  name: "BookSearch",
  data() {
    return {
      keyword: "",
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
    }
  }
};
</script>

<style scoped>
.book-item {
  display: grid;
  grid-template-columns: 1fr 5fr;
  min-height: 100px;
  font-size: 0.8rem;
}
.image {
  align-self: center;
}
.image img {
  width: 100%;
}
.description {
  text-align: left;
  padding: 0 10px;
  font-weight: bold;
}
.desc-sub {
  font-size: 0.6rem;
  color: #7f8c8d;
}
@media (min-width: 768px) {
  .book-item {
    min-height: 200px;
    font-size: 1.2rem;
  }
  .desc-sub {
    font-size: 0.8rem;
}
}
</style>
