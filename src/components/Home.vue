<template>
  <div class="pageHome">
      <h2>Home.vue</h2>
        <my-personne  v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in listeCategorie"></my-personne>
  </div>
</template>

<script>
import Categorie from './Categorie';
export default {
    data() {
        return {
            personnes: this.$root.personnes
        };
    },
    computed: {
    },
    methods: {
    },
    filters: {
    },
    components: {
        'my-categorie': Categorie
    }
};
</script>

<style>

</style>