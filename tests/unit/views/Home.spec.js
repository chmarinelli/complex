import { mount, RouterLinkStub } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import setupTest from "../setupTests";
import { flushAll } from "../utilities";
import UserField from "@/components/UserField";
import Vuex from 'vuex'


describe("Home.vue", () => {
  it("Match snapshot", () => {
    const wrapper = mount(Home, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $t: () => {}
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Navigate to projects", async () => {
    const wrapper = mount(Home, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $t: () => {}
      }
    });
    const button = wrapper.find(".v-btn--router");
    expect(button.props("to").name).toBe("projects");
  });

  it("Form invalid", async () => {
    const wrapper = mount(Home, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
      store: setupTest.store,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        model: {
          name: null,
          users: [],
        },
      },
      mocks: {
        $t: () => {}
      }
    });

    expect(wrapper.find(".v-snack--active").exists()).toBe(false);

    await wrapper.find("form").trigger("submit.prevent");
    await flushAll();

    const errors = wrapper.findAll(".v-messages.error--text");

    expect(errors.length).toBe(2);
    expect(wrapper.find(".v-snack--active").exists()).toBe(false);
  });

  let actions;
  let store;

  beforeEach(() => {
    actions = {
      addProject: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it("Form submitted successfully", async () => {
    const wrapper = mount(Home, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $t: () => {}
      }
    });

    expect(wrapper.find(".v-snack--active").exists()).toBe(false);
  
    wrapper.find("[name='name']").setValue("Example project name");
    
    const userField = wrapper.findComponent(UserField);
    userField.vm.$emit("input", [
      {
        username: "dogdoggy",
        name: "xiao",
        state: "active",
      },
    ]);

    

    await wrapper.find("form").trigger("submit.prevent");
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    await flushAll()

    expect(actions.addProject).toHaveBeenCalled()
    expect(wrapper.find('.v-snack--active').exists()).toBe(true)

    expect(wrapper.findAll(".v-messages.error--text").length).toBe(0);
    expect(wrapper.vm.$data.model.name).toBe(null);
  });
});
