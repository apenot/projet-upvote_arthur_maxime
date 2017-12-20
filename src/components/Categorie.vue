<template>
    <div>
        <h2>{{value.nom}} <router-link :to="{ name: 'CategorieDetail', params: {slug: value.slug}}">+</router-link></h2>
        <my-video  v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in videos"></my-video>
    </div>
</template>

<script>
import firebase from '../firebase';
import Video from './Video';
export default {
    props: ['value', 'index'],
    methods: {
    },
    data() {
        return {
        };
    },
    firebase() {
        return {
            videos: {
                source: firebase.database().ref('categories/' + this.value['.key'] + '/videos')
            }
        };
    },
    computed: {
    },
    components: {
        'my-video': Video
    }
};
</script>


<style>

</style>