<template>
   <div class="row center-row">    
        <div class="col-sm-12 col-md-8 col-lg-6 col-lx-4 mx-auto">
            <h2>Proposer une vidéo</h2>
            <form action="javascript:void(0);">
                <div class="form-group">
                    <label for="urlVid">URL de votre vidéo</label>
                    <input id="urlVid" class="form-control" placeholder="URL" v-model="videoURL" required>
                </div>
                <div class="form-group">
                    <label for="catVid">Catégorie</label>
                        <select id="catVid" class="form-control" v-model="videoCategorie" required>
                            <option value="" disabled selected hidden>Veuillez sélectionner une catégorie</option>
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
import swal from 'sweetalert2/dist/sweetalert2.js';

export default {
    data() {
        return {
            videoURL: '',
            videoCategorie: ''
        };
    },
    firebase() {
        return {
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
            console.log(this.videoCategorie);
            if (this.videoURL === '' || this.videoCategorie['.key'] == null) {
                swal(
                'Champs incomplets!',
                'Veuillez remplir tous les champs!',
                'error'
                );
            } else {
                firebase.database().ref('/categories/' + this.videoCategorie['.key'] + '/videos').push({url: this.urlShortener(this.videoURL)});
                swal(
                    'Vidéo enregistrée!',
                    'La vidéo a été enregistré avec succès!',
                    'success'
                ).then((result) => {
                    window.location.replace('./');
                });
            }
        }
    }
};
</script>

<style>

</style>