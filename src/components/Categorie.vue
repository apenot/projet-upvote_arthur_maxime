<template>
    <div>
        <h2><router-link :to="{ name: 'CategorieDetail', params: {slug: value.slug}}">{{value.nom}}</router-link></h2>
        <div class="row card-deck">
            <my-video  v-bind:categorieKey="value['.key']" v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in lastVideo"></my-video>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase';
import Video from './Video';
export default {
    props: ['value', 'index'],
    methods: {
        comptareNote: function (a, b) {
            if (a.nbVote == null || a.sommeVote == null || a.sommeVote === 0 || a.nbVote === 0) {
                a.moyenneVote = 0;
            } else {
                a.moyenneVote = a.sommeVote / a.nbVote;
            }

            if (b.nbVote == null || b.sommeVote == null || b.sommeVote === 0 || b.nbVote === 0) {
                b.moyenneVote = 0;
            } else {
                b.moyenneVote = b.sommeVote / b.nbVote;
            }

            if (a.moyenneVote < b.moyenneVote) {
                return 1;
            }
            if (a.moyenneVote > b.moyenneVote) {
                return -1;
            }
            return 0;
        }
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
        lastVideo() {
            // return this.videos.slice(Math.max(this.videos.length - 3, 0)).reverse();
            return this.videos.sort(this.comptareNote).slice(0, 3);
        }
    },
    components: {
        'my-video': Video
    }
};
</script>


<style>

</style>