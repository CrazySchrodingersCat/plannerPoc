<script type>
  const url = "https://localhost:7034/api";

  function getPractitioners() {
    fetch(url + "/Practitioner")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
</script>
