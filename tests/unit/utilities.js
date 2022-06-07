import flushPromises from "flush-promises";

export async function flushAll() {
  // get rid of any pending validations on the leading edge
  await flushPromises();
  // any delayed or debounced state computations
  jest.useFakeTimers();
  // get rid of the pending rendering tick
  await flushPromises();
}
