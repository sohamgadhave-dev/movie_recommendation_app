import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers:{
        accept: 'application/json',
         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjMyZDNhNTM3NTkyZjJlY2FmMDc0MWQ0ZjI4MjM1YyIsIm5iZiI6MTc1NzM2NzM3Mi41NDQ5OTk4LCJzdWIiOiI2OGJmNGM0YzJlM2FkNmZkMzA0ZTY0ZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3-cq5i-u4_6fLqjf9Yx3wkcbOXpc7wyr5l_ZjbEWFvk`
    }
})

export default instance;