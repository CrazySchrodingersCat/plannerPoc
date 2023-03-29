<script>
  import Router from "svelte-spa-router";
  import PractitionerDetail from "./Practitioners/PractitionerDetail.svelte";
  import PractitionerOverview from "./Practitioners/PractitionerOverview.svelte";


  let windowWidth = window.innerWidth;
  let clicked = false;

  function handleResize() {
    windowWidth = window.innerWidth;
    if (window.innerWidth >= 1024) clicked = false;
  }

  const handleClick = () => {
    clicked = !clicked;
  };
  const resetClick = () => {
    clicked = false;
  };
</script>

<svelte:window in:resize={handleResize} />
<div class="navbar">
  <span>Planner App SVELTE Test.V_0</span>
  <span class="menu-spacer" />
  <a href="#/planner">Planner</a>
  <a href="#/practitioners">Practitioners</a>
  <a href="#/login">Login</a>
</div>
<div style="clear: both;" />

<style>
  .menu-spacer {
    flex: 1 1 auto;
  }

  a,
  span {
    color: #3b5736;
    padding: 14px 18px 5px;
  }

  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 4rem;
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
</style>
