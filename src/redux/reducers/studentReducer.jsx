import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        values: {
            masv: '',
            hoten: '',
            sdt: '',
            email: '',
        },
        errors: {
            masv: '',
            hoten: '',
            sdt: '',
            email: '',
        },
        isSubmit: true,
        arrStudent: [
            { masv: '123', hoten: 'le cong tien', sdt: '113', email: 'email@gmail.com' },
            { masv: '123', hoten: 'le cong tien', sdt: '113', email: 'email@gmail.com' }
        ],
        search:[]
}

const studentReducer = createSlice({
  name: "studentReducer",
  initialState,
  reducers: {
    checkValue: (state,action) => {
        let values =action.payload;
        state.values=values;
    },
    checkErrors: (state,action) => {
        let errors =action.payload;
        state.errors=errors;
    },
    checkSubmit: (state,action) => {
        let isSubmit =action.payload;
        state.isSubmit=isSubmit;
    },
    addSV: (state,action) => {
        let student =action.payload;
        state.arrStudent.push(student);
        let strArrSV = JSON.stringify(state.arrStudent);
        localStorage.setItem("arrSV",strArrSV);
    },
    deleteSV: (state,action) => {
        let index =action.payload;
        let deleteSV = state.arrStudent.findIndex(sv => sv.masv = index);
        state.arrStudent.splice(deleteSV,1);
        let strArrSV = JSON.stringify(state.arrStudent);
        localStorage.setItem("arrSV",strArrSV);
    },
    handleEdit: (state,action) => {
        let svEdit =action.payload;
        state.values = svEdit;
    },
    saveEdit: (state,action) => {
        let value = action.payload;
        let svUpdate = state.arrStudent.find(prod => prod.masv === value.masv);
         svUpdate.hoten=value.hoten
         svUpdate.sdt=value.sdt
         svUpdate.email=value.email
        state.arrStudent = state.arrStudent;
        let strArrSV = JSON.stringify(state.arrStudent);
        localStorage.setItem("arrSV",strArrSV);
    },
    layStore: (state,action) => {
        let arrStudent = action.payload;
        state.arrStudent = arrStudent;
    },
    searchSV : (state,action) => {
        let arrSearch = action.payload;
       state.arrStudent=arrSearch
    },
  }
});

export const {checkValue,checkErrors,checkSubmit,addSV,deleteSV,handleEdit,saveEdit,layStore,searchSV} = studentReducer.actions

export default studentReducer.reducer