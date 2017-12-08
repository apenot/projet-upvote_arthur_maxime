<template>
  <div>
      <h2>Detail de la categorie {{categorie.nom}}</h2>
      liste des videos
  </div>
</template>

<script>
export default {
    computed: {
        categorie() {
            return this.$root.categories.find(
            c => String(c.slug) === String(this.$route.params.slug)
        );
        }
    }
};
</script>

<style>

</style>