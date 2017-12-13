<template>
<div>
    <h1>{{videoTitle}}</h1>
    <p>
        {{videoDescription}}
    </p>
    <img v-bind:src="videoThumbnails">
    
    
    
</div>
</template>

<script>
    
import axios from 'axios';
export default {
        data() {
            return {
                videoID: this.$route.params.id,
                videoThumbnails: '',
                videoURL: 'https://www.youtube.com/watch?v=' + this.$route.params.id,
                videoNbVue: 0,
                videoTitle: 'test ',
                videoDescription: '',
                dataLoaded: false
            };
        },
        methods: {

            loadData: function () {
                console.log('loadData');
                axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails+&id=' + this.videoID + '&key=AIzaSyBGlbmoiFO7_LR4BrRRmdEDijewDwdK4Aw').then(response => {
                    this.apiReply = response.data;
                    this.videoTitle = response.data.items[0].snippet.title;
                    this.videoDescription = response.data.items[0].snippet.description;
                    this.videoChannelTitle = response.data.items[0].snippet.channelTitle;
                    this.videoThumbnails = response.data.items[0].snippet.thumbnails.medium.url;
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
