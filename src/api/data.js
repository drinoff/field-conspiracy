import * as api from './api.js';

const host = 'https://fieldconspiracy-1813-default-rtdb.europe-west1.firebasedatabase.app/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getNewsById(id){
    return await api.get(host + '/data/memes/' + id);
}

export async function createNews(data){
    return await api.post(host + '/data/memes',data);
}

export async function editNews(id,data){
    return await api.put(host + '/data/memes/' + id,data);
}

export async function deleteNews(id){
    return api.del(host + '/data/memes/' + id);

}

export async function getReleases(){
    return await api.get(host+ 'releases.json')
}

export async function getInstaVideos(){
    return await api.get(host + 'instaVideos.json');
}

export async function getArtists(){
    return await api.get(host + 'artists.json');
}

export async function getCreatives(){
    return await api.get(host + 'creatives.json');
}

export async function getBlogArticles(){
    return await api.get(host + 'blog.json');
}

export async function getShows(){
    return await api.get(host + 'shows.json');
}