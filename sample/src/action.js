import axios from 'axios'

export const POST_DATA = 'POST_DATA';

export const SEARCH_KEY = 'SEARCH_KEY';

export const SELECT_KEY = 'SELECT_KEY'

export const updatePostData = (value) => ({
    type: POST_DATA,
    payload: value
})



export const fetchData = () => async (dispatch) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch(updatePostData(response.data))
    } catch (error) {
        console.log(error)
    }
}



export const setSearchKey = (searchKey)=>({
    type: SEARCH_KEY,
    payload: searchKey
})


export const setSelectKey = (selectKey)=>({
    type: SELECT_KEY,
    payload: selectKey
})