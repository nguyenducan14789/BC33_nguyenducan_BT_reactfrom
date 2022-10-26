import {configureStore} from '@reduxjs/toolkit';
import studentReducer from './reducers/studentReducer';
import BaiTapDatVeReducer from './reducers/BaiTapDatVeReducer';

export const store = configureStore({
    reducer: {
        studentReducer:studentReducer,
        BaiTapDatVeReducer:BaiTapDatVeReducer
    }
})