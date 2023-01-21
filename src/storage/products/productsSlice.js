
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';
import { SORTED } from '../../utils/constants';
import { isLiked } from '../../utils/product';
import { isError } from '../../utils/store';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async function (_,
        {rejectWithValue, fulfillWithValue, dispatch, getState, extra:api}){
        try{
            const {user} = getState();
            const data = await api.getProductList();
            return fulfillWithValue({...data, currentUser:user.data})
        } catch (error){
            return rejectWithValue(error)
        }
    }
)

export const fetchChangeLikeProduct = createAsyncThunk(
    'products/fetchChangeLikeProduct',
    async function (product,
        {rejectWithValue, fulfillWithValue, dispatch, getState, extra:api}){
        try{
            const {user} = getState();
            const liked = isLiked(product.likes, user.data._id)
            const data = await api.changeLikeProduct(product._id, liked);
            return fulfillWithValue({product:data, liked})
        } catch (error){
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: [],
    favoriteProducts:[],
    currentSort:"",
    total: null,
    loading: true,
    error: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        sortedProducts:(state,action)=>{
            switch(action.payload){
                case SORTED.LOW: state.data.sort((a,b)=>b.price -a.price)
                    state.currentSort= action.payload;
                    break;
                case SORTED.CHEAP: state.data.sort((a,b)=>a.price -b.price);
                    state.currentSort= action.payload;
                    break;
                case SORTED.SALE: state.data.sort((a,b)=>b.discount -a.discount);
                     state.currentSort= action.payload;
                     break;
                default:state.data.sort((a,b)=>b.discount -a.discount);
                state.currentSort= SORTED.SALE;
                break;
            }
        }
    },
    extraReducers: (builder)=>{
        builder
            //Ожидание
            .addCase(fetchProducts.pending, (state, action)=>{
                state.loading= true;
                state.error = null;
            })
            // Выполнено успешно
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                const {products, total, currentUser} = action.payload
                state.data = products;
                state.favoriteProducts = products.filter(item => isLiked(item.likes,currentUser._id))
                state.total = total;
                state.loading = false;
            })
            // 
            .addCase(fetchChangeLikeProduct.fulfilled, (state, action)=>{
                const {liked, product} = action.payload;

               state.data = state.data.map(cardState=>{
                return cardState._id=== product._id ? product: cardState
               })
               if (!liked) {
                    state.favoriteProducts.push(product);
                  } else {
                   state.favoriteProducts = state.favoriteProducts.filter(card => card._id !== product._id)
                  } 
                    })
            // Ошибка
            .addMatcher(isError, (state, action)=>{
                state.error = action.payload;
                state.loading= false;
            } )
    }
});


export const {sortedProducts}= productSlice.actions;
export default productSlice.reducer;
