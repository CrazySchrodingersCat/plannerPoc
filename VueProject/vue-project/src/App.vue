<template>
  <nav>
    <span>Planner App SVELTE Test.V_0</span>
    <span class="menu-spacer" />
    <router-link to="/">Planner</router-link> |
    <router-link to="/practitioners">Plactitioners</router-link> |
    <router-link to="/">Login</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.menu-spacer {
  flex: 1 1 auto;
}

a,
span {
  color: #3b5736;
  padding: 14px 18px 5px;
}

nav {
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  background-color: #f5f5f5;
  color: rgba(0, 0, 0, 0.87);
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: all 0.2s ease-out;
  font: 500 20px/32px Roboto, sans-serif;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
