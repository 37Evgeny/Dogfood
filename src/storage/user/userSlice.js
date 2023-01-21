import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';
import { isError } from '../../utils/store';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async function (_, {rejectWithValue, fulfillWithValue, dispatch, getState, extra:api}){
        try{
            const data = await api.getUserInfo();
            return data;
        } catch (error){
            return rejectWithValue(error)
        }
    }
)

export const fetchUserAuthenticate = createAsyncThunk(
    'user/fetchUserAuthenticate',
    async function (
        dataAuth,
         {rejectWithValue, fulfillWithValue, dispatch, getState, extra:api}
         ) {
        try{
            const data = await api.authorize(dataAuth);
            if(data.token){
                localStorage.setItem('jwt', data.token)
            }else{
                return rejectWithValue(data)
            }
            return fulfillWithValue(data);

        } catch (error){
            return rejectWithValue(error)
        }
    }
)

export const fetchUserRegister = createAsyncThunk(
    'user/fetchUserRegister',
    async function (
        dataRegister,
         {rejectWithValue, fulfillWithValue, dispatch, getState, extra:api}
         ) {
        try{
            const data = await api.register(dataRegister);
            return fulfillWithValue(data);
            
        } catch (error){
            return rejectWithValue(error)
        }
    }
)

export const fetchUserTokenCheck = createAsyncThunk(
    'user/fetchUserTokenCheck',
    async function (
        token,
         {rejectWithValue, fulfillWithValue, dispatch, getState, extra:api}
         ) {
        try{
            const data = await api.checkToken(token);
            dispatch(authCheck())
            dispatch(loggedIn())
            return fulfillWithValue(data);
            
        } catch (error){
            localStorage.clear()
            return rejectWithValue(error)
        }finally{
            dispatch(authCheck())
        }
    }
)

const initialState = {
    data: null,
    loggedIn: false,
    getUserRequest: true,
    isAuthChecked: true,
    loginUserRequest: false,
    registerUserRequest: false,
    userError:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authCheck: (state) =>{
            state.isAuthChecked = true;
        },
        loggedIn: (state)=>{
            state.loggedIn= true
        },
        logout: (state)=>{
            state.data = null;
            localStorage.removeItem('jwt');
        }
    },
    extraReducers: (builder)=>{
        builder
            //Ожидание
            .addCase(fetchUser.pending, (state)=>{
                state.getUserRequest= true;
                state.userError = null;
            })
            // Выполнено успешно
            .addCase(fetchUser.fulfilled, (state, action)=>{
                state.data= action.payload;
                state.getUserRequest= false;
            })
              //Ожидание
              .addCase(fetchUserAuthenticate.pending, (state)=>{
                state.loginUserRequest= true;
                state.userError = null;
            })
            // Выполнено успешно
            .addCase(fetchUserAuthenticate.fulfilled, (state, action)=>{
                state.data= action.payload.data;
                state.loginUserRequest= false;
                state.loggedIn = true;
            })
              //Ожидание
              .addCase(fetchUserRegister.pending, (state)=>{
                state.registerUserRequest= true;
                state.userError = null;
            })
            // Выполнено успешно
            .addCase(fetchUserRegister.fulfilled, (state, action)=>{
                state.data= action.payload;
                state.registerUserRequest= false;
            })
              //Ожидание
              .addCase(fetchUserTokenCheck.pending, (state)=>{
                state.getUserRequest= true;
                state.userError = null;
            })
            // Выполнено успешно
            .addCase(fetchUserTokenCheck.fulfilled, (state, action)=>{
                state.data= action.payload;
                state.getUserRequest= false;
            })
            // Ошибка
            .addMatcher(isError, (state, action)=>{
                state.userError = action.payload;
                state.getUserRequest= false;
                state.loginUserRequest= false;
                state.registerUserRequest= false;
            } )
    }
})

export const { authCheck, logout, loggedIn } = userSlice.actions;
export default userSlice.reducer;
