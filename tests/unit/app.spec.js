import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("router link should be correct", () => {
    const wrapper = shallowMount(App, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    const links = wrapper.findAll(RouterLinkStub);

    expect(links.at(0).text()).toBe("Home");
    expect(links.at(0).props().to).toBe("/");
    expect(links.at(1).text()).toBe("Search");
    expect(links.at(1).props().to).toBe("/search");
    expect(links.at(2).text()).toBe("Form");
    expect(links.at(2).props().to).toBe("/form");
  });
});
