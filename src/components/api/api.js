import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38102784-37e9ad2cc652dbc0da2d9323c';

const getImages = async (search, page) => {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: search,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: page,
        },
    });
    return response;
};

export { getImages };