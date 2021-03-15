import loginServices from '../services/login'
import blogServices from '../services/blogs'

const userReducer = (state=null, action) => {
    switch (action.type) {
      case "INIT_USER":
        return action.data;
      case "SET_USER":
        return action.data;
      default:
        return state;
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsPart7User')
        let user = null
        if (loggedUserJSON) {
            user = JSON.parse(loggedUserJSON)
            blogServices.setToken(user.token)
        }
        dispatch({
          type: "INIT_USER",
          data: user,
        });
    }
}

export const userLogin = (loginData) => {
    return async dispatch => {
        let user = null
        try {
            user = await loginServices.login(loginData)

            window.localStorage.setItem(
                'loggedBlogsPart7User', JSON.stringify(user)
            )
            blogServices.setToken(user.token)
            //console.log('login:',user)
            dispatch({
              type: "SET_USER",
              data: user,
            });
        } catch (error) {
            /*
            setErrorMessage({ type: 'error', txt: 'wrong username or password' })
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            */
            console.log('userReducer: kirjautuminen epäonnistui')
            dispatch({
              type: "SET_USER",
              data: null,
            });
        }
    }
}

export const userLogOut = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogsPart7User')
        dispatch({
          type: "SET_USER",
          data: null,
        });
    }
}

export default userReducer