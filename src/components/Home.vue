<template>
  <div class="pageHome">
        <h2>Page  Home.vue
        <router-link :to="{ name: 'CategorieAjout', params: {}}">
            <button type="button" class="btn btn-outline-success" link="">Ajouter une categorie</button>
        </router-link>
</h2>
        <my-categorie  v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in categories"></my-categorie>
  </div>
</template>

<script>
import firebase from '../firebase';
import Categorie from './Categorie';
export default {
    data() {
        return {
        };
    },
    firebase() {
        return {
            categories: {
                source: firebase.database().ref('/categories')
            }
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