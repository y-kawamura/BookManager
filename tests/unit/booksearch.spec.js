import { shallowMount } from "@vue/test-utils";
import BookForm from "@/views/BookForm.vue";

describe("BookForm.vue", () => {
  it("renders message", () => {
    const msg = "form";
    const wrapper = shallowMount(BookForm);
    expect(wrapper.text()).toMatch(msg);
  });
});
