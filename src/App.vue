<script setup lang="ts">
import { LogInReturnProps, LogOutReturnProps } from 'othent';
import { OthentLogin } from '.';
import { ref } from 'vue';
const API_ID = import.meta.env.VITE_OTHENT_API_ID;

const width = 24;
const height = 24;

const darkMode = ref(false);

const toggle = () => {
  darkMode.value = !darkMode.value;
};

const handleLogin = (loginResponse: LogInReturnProps) => {
  console.log(loginResponse);
};

const handleLogout = (logoutResponse: LogOutReturnProps) => {
  console.log(logoutResponse);
};
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="https://vitejs.dev/logo.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <svg class="logo" viewBox="0 0 128 128" width="96" height="96" data-v-53ccc107="">
        <path
          fill="#42b883"
          d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
          data-v-53ccc107=""
        ></path>
        <path
          fill="#35495e"
          d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
          data-v-53ccc107=""
        ></path>
      </svg>
    </a>
  </div>
  <div class="container">
    <button :onclick="toggle">Dark Mode {{ darkMode ? 'ON' : 'OFF' }}</button>
    <OthentLogin
      :apiid="API_ID"
      login-button-height="25px"
      login-button-font-size="14px"
      :login-button-logo-height="16"
      :login-button-logo-width="36"
      avatar-size="2.5em"
      logout-button-color="#00a3c4"
      :dark-mode="darkMode"
      @logged-in="handleLogin"
      @logged-out="handleLogout"
    >
      <template #login-button-logo>
        <svg
          class="othent-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          :width="width"
          :height="height"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
      </template>
    </OthentLogin>
  </div>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 10px;
  flex-direction: column;
}
</style>
