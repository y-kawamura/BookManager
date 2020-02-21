import { shallowMount } from "@vue/test-utils";
import BookSearch from "@/views/BookSearch.vue";

describe("BookSearch.vue", () => {
  it("renders message", () => {
    const msg = "search";
    const wrapper = shallowMount(BookSearch);
    expect(wrapper.text()).toMatch(msg);
  });
});
