<template>
  <div class="pageHome">
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