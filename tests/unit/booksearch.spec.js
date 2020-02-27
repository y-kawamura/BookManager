import { shallowMount, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Element from "element-ui";
import BookSearch from "@/views/BookSearch.vue";

const localVue = createLocalVue();
localVue.use(Element);

describe("BookSearch.vue", () => {
  let $http;

  beforeEach(() => {
    $http = () =>
      Promise.resolve({
        json() {
          return {
            totalItem: 2,
            items: [
              {
                id: "1",
                volumeInfo: {
                  title: "test",
                  authors: ["山田祥寛"],
                  publisher: "SBクリエイティブ",
                  publishedDate: "2018-01-01",
                  imageLinks: {
                    smallThumbnail:
                      "http://books.google.com/books/content?id=x1SqDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                  }
                }
              },
              {
                id: "2",
                volumeInfo: {
                  title: "test2",
                  authors: ["山田祥寛"],
                  publisher: "SBクリエイティブ",
                  publishedDate: "2018-01-02",
                  imageLinks: {
                    smallThumbnail:
                      "http://books.google.com/books/content?id=x1SqDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                  }
                }
              }
            ]
          };
        }
      });
  });

  it("fetch test", async () => {
    const wrapper = shallowMount(BookSearch, {
      mocks: { $http },
      localVue
    });

    wrapper.vm.searchAsync();
    
    console.log("before");
    await flushPromises();
    console.log("after");

    const temp = wrapper.vm.books;
    console.log(temp);
    expect(wrapper.vm.books[0].title).toBe("test");
  });
});
