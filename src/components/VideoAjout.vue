<template>
   <div class="row">    
        <div class="col-sm-12 col-md-8 col-lg-6 col-lx-4 mx-auto">
            <h2>Ajouter une video</h2>
            <form>
                <div class="form-group">
                    <label for="urlVid">URL</label>
                    <input id="urlVId" class="form-control" v-model="videoURL" required>
                </div>
                <div class="form-group">
                    <label for="urlVid">Catégorie</label>
                        <select v-model="selected">
                            <option v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in categories">
                            {{ categories[i].nom }}
                            </option>
                        </select>
                        <span>Selected: {{ selected }}</span>
                </div>
                <button v-on:click="ajouterVideo()" class="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase';
export default {
    data() {
        return {
            videoURL: ''
        };
    },
    firebase() {
        return {
            videos: {
                source: firebase.database().ref('/videos')
            },
            categories: {
                source: firebase.database().ref('/categories')
            }
        };
    },
    methods: {
        ajoutVideo() {
            this.$firebaseRefs.videos.push({nom: this.videoNom, url: this.videoURL});
            this.videoNom = '';
            this.videoURL = '';
        }
    }
};
</script>

<style>

</style>