<template>
    <div class="col-sm-6 col-md-6 col-lg-4 card-video">
        <div class="card h-100 cursor-pointer" data-toggle="modal" v-bind:data-target="'#Lecture_'+videoID">
            <img class="card-img-top" v-bind:src="videoThumbnails" alt="minuiature">
            <div class="card-body">
                <h4 class="card-title">{{videoTitle}}</h4>
                <p class="card-text">{{videoChannelTitle}} - {{ new Intl.NumberFormat().format(videoNbVue) }} vues</p>
                <div v-if="videoMoyenVote == 0">
                    <i class="fa fa-star fa-lg" aria-hidden="true"></i> -   
                </div>
                <div v-else>
                    <i class="fa fa-star fa-lg" aria-hidden="true"></i> {{videoMoyenVote}} / 5 
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" v-bind:id="'Lecture_'+videoID" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{videoTitle}}</h5>
                        <button type="button" class="close cursor-pointer" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="video-container">
                                        <iframe   v-bind:src="'https://www.youtube-nocookie.com/embed/'+videoID + '?showinfo=0'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                            <div class="row vote">
                                <div class="col-md-6">
                                    <div class="form-inline">
                                        <select v-bind:id="'rate-'+videoID">
                                            <option value=""></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div class="info-vote">
                                        <span>Moyen video: {{videoMoyenVote}} / 5 <i class="fa fa-star" aria-hidden="true"></i> </span>
                                        <span>Nombre de vote: {{videoNbVote}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary cursor-pointer" data-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
import axios from 'axios';
import 'jquery-bar-rating/dist/jquery.barrating.min.js';
import swal from 'sweetalert2/dist/sweetalert2.js';
import firebase from '../firebase';
export default {
        props: ['value', 'index', 'categorieKey'],
        data() {
            return {
                videoID: this.value.url,
                videoThumbnails: '',
                videoURL: 'https://www.youtube.com/watch?v=' + this.value.url,
                videoNbVue: 0,
                videoTitle: '',
                videoChannelTitle: '',
                videoDescription: ''
            };
        },
        methods: {
            loadData: function () {
                axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2C+statistics+&id=' + this.videoID + '&key=AIzaSyBGlbmoiFO7_LR4BrRRmdEDijewDwdK4Aw').then(response => {
                    this.videoTitle = response.data.items[0].snippet.title;
                    this.videoDescription = response.data.items[0].snippet.description;
                    this.videoChannelTitle = response.data.items[0].snippet.channelTitle;
                    this.videoThumbnails = response.data.items[0].snippet.thumbnails.medium.url;
                    this.videoNbVue = response.data.items[0].statistics.viewCount;
                    this.dataLoaded = true;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            addVote: function (valueVote) {
                this.setNbVote(this.videoNbVote + 1);
                this.setSommeVote(this.videoSommeVote + Number(valueVote));
            },
            setSommeVote: function (sommeVote) {
                firebase.database().ref('/categories/' + this.categorieKey + '/videos/' + this.value['.key'] + '/sommeVote').set(sommeVote);
            },
            setNbVote: function (nbVote) {
                firebase.database().ref('/categories/' + this.categorieKey + '/videos/' + this.value['.key'] + '/nbVote').set(nbVote);
            },
            intiRating() {
                const vm = this;
                $('#rate-' + this.videoID).barrating({
                    theme: 'fontawesome-stars',
                    initialRating: this.videoMoyenVote,
                    allowEmpty: null,
                    onSelect(value, text) {
                        swal(
                            'Vote enregistré!',
                            'Merci ! Votre vote a été enregistré avec succès! ' + 'vote: ' + value,
                            'success'
                        );
                        vm.addVote(value);
                    }
                });
            }

        },
        mounted() {
            this.loadData();
            this.intiRating();
        },
        computed: {
            videoMoyenVote: function () {
                if (this.value.nbVote == null || this.value.nbVote === 0 || this.value.sommeVote == null || this.value.sommeVote === 0) {
                    return 0;
                } else {
                    return Math.round((this.value.sommeVote / this.value.nbVote) * 10) / 10;
                }
            },
            videoNbVote: function () {
                if (this.value.nbVote == null) {
                    return 0;
                } else {
                    return this.value.nbVote;
                }
            },
            videoSommeVote: function () {
                if (this.value.sommeVote == null) {
                    return 0;
                } else {
                    return this.value.sommeVote;
                }
            }
        }
};
</script>

<style>
.cursor-pointer{
cursor: pointer;
}
.info-vote > span{
    display: block;
}
.modal{
cursor: default;
}
.card-video{
margin-bottom: 3%;
}

.fa-star{
    color: orange;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: orange
}

.vote{
    margin-top: 20px;
}
.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px;
height: 0;
overflow: hidden;
}
.video-container iframe,
.video-container object,
.video-container embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
</style>
