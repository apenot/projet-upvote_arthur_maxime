<template>
    <div class="col-sm-4 col-md-3 col-lg-4">
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" v-bind:src="videoThumbnails" alt="minuiature">
            <div class="card-body">
                <h4 class="card-title">{{videoTitle}}</h4>
                <p class="card-text">{{videoNbVue}} vues</p>
                <p class="card-text">{{videoChannelTitle}}</p>
                <a href="#" class="btn btn-primary">Lecture</a>
            </div>
        </div>
    </div>
</template>

<script>
    
import axios from 'axios';
export default {
        props: ['value', 'index'],
        data() {
            return {
                // videoID: this.$route.params.id,
                videoID: this.value.url,
                videoThumbnails: '',
                videoURL: 'https://www.youtube.com/watch?v=' + this.$route.params.id,
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
            }
        },
        created() { // or mounted
            this.loadData();
        }
};
</script>

<style>

</style>
