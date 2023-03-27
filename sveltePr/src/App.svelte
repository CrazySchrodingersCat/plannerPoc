<script>

  import Navbar from "./components/Navbar.svelte";

  import PractitionerDetail from "./components/Practitioners/PractitionerDetail.svelte";
  import PractitionerOverview from "./components/Practitioners/PractitionerOverview.svelte";
  import Planner from "./components/Plan/Planner.svelte";


  import Router from "svelte-spa-router";
  let routes = {
    
    "/practitioners":PractitionerOverview,
    "/practitioners/:id":PractitionerDetail,
	"/planner":Planner,

    "*":PractitionerOverview,
  };
</script>

<div class="app">
  <Navbar />
  <div style="clear: both;" />
  <main>		
    <section class="container">
		<Router {routes} />
    </section>
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {

    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 2rem auto 0 0;
    box-sizing: border-box;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0.6;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
