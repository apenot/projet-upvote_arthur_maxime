<template>
    <div class="col-sm-4 col-md-3 col-lg-4">
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" v-bind:src="videoThumbnails" alt="minuiature">
            <div class="card-body">
                <h4 class="card-title">{{videoTitle}}</h4>
                <p class="card-text">{{videoChannelTitle}} - {{ new Intl.NumberFormat().format(videoNbVue) }} vues</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" v-bind:data-target="'#Lecture_'+videoID">
                    Lecture
                </button>
                <!-- Modal -->
                <div class="modal fade" v-bind:id="'Lecture_'+videoID" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg animated zoomInLeft">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{videoTitle}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="video-container">
                                        <iframe   v-bind:src="'https://www.youtube-nocookie.com/embed/'+videoID" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                            <div class="row vote">
                                <div class="col-md-6">
                                    <div class="form-inline">
                                        <select v-bind:id="'rate-'+value.url">
                                            <option value=""></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <button v-on:click="setRating"  type="button" class="btn btn-info btn-sm">Voter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
import axios from 'axios';
import 'jquery-bar-rating/dist/jquery.barrating.min.js';
export default {
        props: ['value', 'index'],
        data() {
            return {
                videoID: this.value.url,
                videoThumbnails: '',
                videoURL: 'https://www.youtube.com/watch?v=' + this.value.url,
                videoNbVue: 0,
                videoTitle: 'test ',
                videoChannelTitle: '',
                videoDescription: '',
                dataLoaded: false
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
            setRating: function () {
                console.log($('#rate-' + this.value.url).barrating());
            }
        },
        mounted() {
            this.loadData();
            $('#rate-' + this.value.url).barrating({
                theme: 'fontawesome-stars',
                initialRating: null,
                allowEmpty: null
            });
        }
};
</script>

<style>

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
