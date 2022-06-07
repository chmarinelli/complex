import { shallowMount } from '@vue/test-utils'
import ErrorMessage from '@/components/ErrorMessage.vue'
import setupTest from '../setupTests'

describe('ErrorMessage.vue', () => {
  it('Match snapshot', () => {
    const wrapper = shallowMount(ErrorMessage, {
      localVue: setupTest.localVue,
      propsData: {
        value: ['Name is not valid.']
      }
    });
    expect(wrapper.html()).toMatchSnapshot()
  });
})
