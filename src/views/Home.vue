<template>
  <div class="home" style="overflow: scroll;">
    <book-info
      v-for="book in myBooks"
      :key="book.id"
      :book="book"
      :editable="true"
      style="margin-top: 5px;"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BookInfo from "@/components/BookInfo.vue";

export default {
  name: "Home",
  components: {
    BookInfo
  },
  computed: {
    ...mapState(["myBooks"])
  }
};
</script>
