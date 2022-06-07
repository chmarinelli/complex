import { mount, RouterLinkStub } from "@vue/test-utils";
import Projects from "@/views/Projects.vue";
import setupTest from "../setupTests";
import Vuex from 'vuex'
import projects from "../data/projects";


describe("Home.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      projects: () => projects,
    }

    store = new Vuex.Store({
      getters
    })
  })

  it("Match snapshot", () => {
    const wrapper = mount(Projects, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Navigate to projects", async () => {
    const wrapper = mount(Projects, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    const button = wrapper.find(".v-btn--router");
    expect(button.props("to").name).toBe("home");
  });

  it("Show projects", async () => {
    const wrapper = mount(Projects, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
      store,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    const projects = getters.projects();
    const trs = wrapper.findAll("tr");
    for (let i = 0; i < projects.length; i++) {
        const tr = trs.at(i + 1);
        const tds = tr.findAll("td");
        expect(tds.at(1).text()).toBe(projects[i].name);
    }
  });

});
