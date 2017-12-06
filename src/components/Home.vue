<template>
  <div class="pageHome">
      <h2>Page  Home.vue</h2>
        <my-categorie  v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in categories"></my-categorie>
  </div>
</template>

<script>
import Categorie from './Categorie';
export default {
    data() {
        return {
            categories: this.$root.categories
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