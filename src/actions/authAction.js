
export const addUser = (data) => (dispatch) =>{

    dispatch({type: 'ADD_USERS_DATA',payload: data});
}