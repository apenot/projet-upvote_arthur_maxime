<template>
    <div>
    <h2>{{value.nom}} <router-link :to="{ name: 'CategorieDetail', params: {slug: value.slug}}">+</router-link></h2> 
    video 
    video 
    video 
        
    </div>
</template>

<script>

export default {
    props: ['value', 'index'],
    methods: {
    }
};
</script>


<style>

</style>