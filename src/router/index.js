import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import CategorieDetail from '@/components/Categorie';
import VideoDetail from '@/components/Video';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/categorie/:libelle',
            name: 'CategorieDetail',
            component: CategorieDetail
        },
        {
            path: '/video/:id',
            name: 'VideoDetail',
            component: VideoDetail
        }
    ]
});
