import axios from 'axios';

// Instance of axios ans store it in a variable and pass a object in create method with a property(baseURL) and give the value of the property called api,, By which we will fetch or get data
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// No create functions, which method we need to use on that function we will define
// EXP: get method

export const getPost = () => {
    return api.get("/posts");
}

// delete method
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
}

// post method
export const postData = (post) => {
    return api.post("/posts", post);
}

// Update method put/patch
// put method
export const updateData = (id, post) => {
    return api.put(`/posts/${id}`, post);
}