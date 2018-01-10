<template>
  <div>
      <h1>{{categorie.nom}}</h1>
        <div class="row">
            <my-video  v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in videos"></my-video>
        </div>
  </div>
</template>

<script>
import firebase from '../firebase';
import Video from './Video';
export default {
    props: ['value', 'index'],
    computed: {
        categorie() {
            return this.$root.categories.find(
            c => String(c.slug) === String(this.$route.params.slug));
        }
    },
    data() {
        return {
            videos: []
        };
    },
    mounted() {
        this.loadData();
    },
    watch: {
        '$root.categories': function () {
            this.loadData();
        }
    },
    methods: {
        loadData() {
            this.$bindAsArray('videos', firebase.database().ref('categories/' + this.categorie['.key'] + '/videos'));
        }
    },
    components: {
        'my-video': Video
    }
};
</script>

<style>

</style>