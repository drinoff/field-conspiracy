import * as api from "./api.js";

const host =
    "https://fieldconspiracy-1813-default-rtdb.europe-west1.firebasedatabase.app/";

api.settings.host = host;

export async function createRelease(data) {
    return await api.post(host + 'releases.json', data);
}

export async function createArtist(data) {
    return await api.post(host + 'artists.json', data);
}

export async function createCreative(data) {
    return await api.post(host + 'creatives.json', data);
}

export async function createBlogArticle(data) {
    return await api.post(host + 'blog.json', data);
}

export async function createShow(data) {
    return await api.post(host + 'shows.json', data);
}

export async function getReleases() {
    return await api.get(host + "releases.json");
}

export async function deleteRelease(id) {
    return api.del(host + "releases/" + `${id}.json`);
}

export async function getReleaseById(id) {
    return await api.get(`${host}/releases/${id}.json`);
}

export async function editRelease(id, data) {
    return await api.put(host + `/releases/${id}.json`, data);
}

export async function getArtists() {
    return await api.get(host + "artists.json");
}

export async function getArtistById(id) {
    return await api.get(`${host}/artists/${id}.json`);
}

export async function editArtist(id, data) {
    return await api.put(host + `/artists/${id}.json`, data);
}

export async function deleteArtist(id) {
    return api.del(host + "artists/" + `${id}.json`);
}

export async function getCreatives() {
    return await api.get(host + "creatives.json");
}

export async function getCreativeById(id) {
    return await api.get(`${host}/creatives/${id}.json`);
}

export async function editCreative(id, data) {
    return await api.put(host + `/creatives/${id}.json`, data);
}

export async function deleteCreative(id) {
    return api.del(host + "creatives/" + `${id}.json`);
}

export async function getInstaVideos() {
    return await api.get(host + `instaVideos.json`);
}

// export async function getBlogArticles() {
//     return await api.get(host + "blog.json?orderBy=createDate");
// }

export async function getBlog() {
    return await api.get(host + "blog.json?orderBy=\"createDate\"");
}

export async function getArticleById(id) {
    return await api.get(host + "blog/" + `${id}.json`);
}

export async function editBlogArticle(id, data) {
    return await api.put(host + `/blog/${id}.json`, data);
}

export async function deleteBlogArticle(id) {
    return api.del(host + "blog/" + `${id}.json`);
}

export async function getShows() {
    return await api.get(host + "shows.json?orderBy=\"createDate\"");
}

export async function deleteShow(id) {
    return api.del(host + "shows/" + `${id}.json`);
}

export async function getShowById(id) {
    return await api.get(host + "shows/" + `${id}.json`);
}

export async function editShow(id, data) {
    return await api.put(host + `/shows/${id}.json`, data);
}