
import { POST_DATA, SEARCH_KEY, SELECT_KEY } from './action'
const initialState = {
    userList: [],
    searchKey: null,
    selectKey: '',
    checkedValues : []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_DATA:
            return { ...state, userList: action.payload };
        case SEARCH_KEY:
            return { ...state, searchKey: action.payload };
        case SELECT_KEY:
            return { ...state, selectKey: action.payload };
        default:
            return state;
    }
};
export default reducer