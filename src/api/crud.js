import Axios from 'axios';

export const GetWithToken = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGE0OTAzYzUxOThhN2EwZmQ0ODJkZTIwNTc5ZjE4MiIsInN1YiI6IjY0ODBiNDAwNjQ3NjU0MDEyNDk2ODczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TdnwBQIBCNPn67uHOahdbbrQ5XXwKRtNYkq-sjtUSJk'
        }
    };

    return Axios.get(url, options);
}