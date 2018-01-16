<template>  
    <div class="row">    
        <div class="col-sm-12 col-md-8 col-lg-6 col-lx-4 mx-auto">
            <h2>Ajouter une categorie</h2>
            <form action="javascript:void(0);">
                <div class="form-group">
                    <label for="nomCat">Nom</label>
                    <input id="nomCat" class="form-control" placeholder="Catégorie" v-model="categorieNom" required>
                </div>
                <div class="form-group">
                    <label for="nomSlug">Slug</label>
                    <input id="nomSlug" class="form-control" placeholder="Slug" v-model="categorieSlug" required>
                </div>
                <button v-on:click="ajoutCategorie()" class="btn btn-primary">Enregistrer</button>
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
            categorieNom: '',
            categorieSlug: ''
        };
    },
    firebase() {
        return {
            categories: {
                source: firebase.database().ref('/categories')
            }
        };
    },
    methods: {
        ajoutCategorie() {
            if (this.categorieNom === '' || this.categorieSlug === '') {
                swal(
                    'Champs incomplets!',
                    'Veuillez remplir tous les champs!',
                    'error'
                );
            } else {
                if (this.categorieSlug.indexOf(' ') !== -1) {
                    swal(
                        'Erreur!',
                        'Erreur le slug contient un espace!',
                        'error'
                    );
                } else {
                    this.$firebaseRefs.categories.push({slug: this.categorieSlug, nom: this.categorieNom});
                    swal(
                        'Catégorie ajoutée!',
                        'La catégorie a été enregistré avec succès!',
                        'success'
                    ).then((result) => {
                        window.location.replace('./');
                    });
                }
            }
        }
    }
};
</script>

<style>

</style>
