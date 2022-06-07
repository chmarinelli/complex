import { mount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'
import setupTest from '../setupTests'



describe('DatePicker.vue', () => {
  
  it('Match snapshot', () => {
    const wrapper = mount(DatePicker, {
      localVue: setupTest.localVue,
    });
    expect(wrapper.html()).toMatchSnapshot()
  });

  it('Date dialog open pressing space', async () => {
    const wrapper = mount(DatePicker, {
      localVue: setupTest.localVue,
      vuetify: setupTest.vuetify,
    });
    expect(wrapper.vm.dialog).toBe(false)
    expect(wrapper.find('.v-picker--date').exists()).toBe(false)

    const input = wrapper.find('input');
    await input.trigger('keyup.space');

    expect(wrapper.vm.dialog).toBe(true)
    expect(wrapper.find('.v-picker--date').exists()).toBe(true)
  })
})
