<template>
   <div class="row center-row">    
        <div class="col-sm-12 col-md-8 col-lg-6 col-lx-4 mx-auto">
            <h2>Ajouter une video</h2>
            <form>
                <div class="form-group">
                    <label for="urlVid">URL de votre video :</label>
                    <input id="urlVid" class="form-control" v-model="videoURL" required>
                </div>
                <div class="form-group">
                    <label for="catVid">Catégorie :</label>
                        <select id="catVid" class="form-control" v-model="videoCategorie" required>
                            <option v-bind:value="v" v-bind:index="i" v-bind:key="i" v-for="(v, i) in categories">
                            {{ categories[i].nom }}
                            </option>
                        </select>
                </div>
                <button v-on:click="ajoutVideo()" class="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase';
export default {
    data() {
        return {
            videoURL: '',
            videoCategorie: ''
        };
    },
    firebase() {
        return {
            videos: {
                source: firebase.database().ref('/videos')
            },
            categories: {
                source: firebase.database().ref('/categories/')
            }
        };
    },
    methods: {
        urlShortener(link) {
            return link.substr(32);
        },
        ajoutVideo() {
            this.$firebaseRefs.videos.push({url: this.urlShortener(this.videoURL)});
            this.$firebaseRefs.categories.nom.push({url: this.videoUrl});
            this.videoURL = '';
            this.videoCategorie = '';
        }
    }
};
</script>

<style>

</style>