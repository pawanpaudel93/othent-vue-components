// store.ts
import { LogInReturnProps } from 'othent';
import { reactive, watch } from 'vue';

const userDataKey = 'othent:userData';

// Define the initial state of the store
interface State {
  userData: LogInReturnProps | null;
}

// Create a reactive state object
const state: State = reactive({
  userData: JSON.parse(localStorage.getItem(userDataKey) || 'null')
});

// Watch for changes to the value and update LocalStorage
watch(
  () => state.userData,
  (newValue) => {
    localStorage.setItem(userDataKey, JSON.stringify(newValue));
  }
);

// Export a function to access the store state
export function useStore() {
  return state;
}

export function setUserData(userData: LogInReturnProps | null) {
  state.userData = userData;
}
