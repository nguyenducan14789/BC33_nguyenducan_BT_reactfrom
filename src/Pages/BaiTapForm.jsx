import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addSV,
    checkErrors,
    checkSubmit,
    checkValue,
    deleteSV,
    getSearch,
    handleEdit,
    layStore,
    saveEdit,
    searchSV,
} from '../redux/reducers/studentReducer'

export default function BaiTapForm() {
    let { arrStudent, values, errors, isSubmit ,search} = useSelector((state) => state.studentReducer)
    const dispatch = useDispatch()
    console.log(arrStudent)

    let newArrStudent = [...arrStudent]

    const valuesRef = useRef({
        masv: '',
        hoten: '',
        sdt: '',
        email: '',
    })

    valuesRef.current.masv = values.masv
    valuesRef.current.hoten = values.hoten
    valuesRef.current.sdt = values.sdt
    valuesRef.current.email = values.email
    const errorsRef = useRef({
        masv: '',
        hoten: '',
        sdt: '',
        email: '',
    })
    const studentRef = useRef({
        masv: '',
        hoten: '',
        sdt: '',
        email: '',
    })

    const handleChangeInput = (e) => {
        let { id, value } = e.target

        //let newValue = { ...values }
        valuesRef.current[id] = value

        //let newError = { ...errors }
        let messError = ''
        if (value.trim() == '') {
            messError = id + ' không được bỏ trống !'
        } else {
            let dataType = e.target.getAttribute('data-type')
            if (dataType === 'number') {
                let regex = /^\d+$/
                if (!regex.test(value)) {
                    messError = id + ' phải là số'
                }
            }
            if (dataType === 'string') {
                let regex = /^[A-Z  a-z]+$/
                if (!value.match(regex)) {
                    messError = id + ' phải là ký tự'
                }
            }
            if (dataType === 'email') {
                let regex =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!regex.test(value)) {
                    messError = id + ' phải đúng định dạng email@gmail.com !'
                }
            }
        }

        //errors[id] = messError
        errorsRef.current[id] = messError

        let submit = false
        for (let key in valuesRef.current) {
            if (valuesRef.current[key].trim() === '') {
                submit = true
            }
        }
        if (!submit) {
            for (let key in errorsRef.current) {
                if (errorsRef.current[key].trim() !== '') {
                    submit = true
                }
            }
        }

        studentRef.current[id] = value
        //const newArrStudent = [...arrStudent];

        const action1 = checkValue({ ...valuesRef.current })
        const action2 = checkErrors({ ...errorsRef.current })
        const action3 = checkSubmit(submit)

        dispatch(action1)
        dispatch(action2)
        dispatch(action3)

        // this.setState(
        //     {
        //         values: newValue,
        //         errors: newError,
        //         isSubmit: submit,
        //         //arrStudent:newArrStudent
        //     },
        //     () => {
        //         console.log(this.state)
        //     }
        // )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        for (let key in errorsRef.current) {
            if (errorsRef.current[key] !== '') {
                alert('Dữ liệu không hợp lệ !')
                return
            }
        }

        //let newSV = {...values};
        //this.state.arrStudent.push(newSV);
        const action = addSV({ ...valuesRef.current })
        dispatch(action)

        // this.setState({
        //   arrStudent:this.state.arrStudent
        // },() => {
        //   this.luuStorage()})
    }

    useEffect(() => {
        const action = layStore(layStorage())
        dispatch(action);
    },[])
    
    const deleteProduct = (id) => {
        //let index = arrStudent.findIndex(sv => sv.masv = id);
        const action = deleteSV(id)
        dispatch(action)
        //   this.setState({
        //     arrStudent:this.state.arrStudent
        //   },() => {
        //     this.luuStorage()
        //   })
    }

    const handleEditSV = (sv) => {
        const action = handleEdit(sv)
        dispatch(action)
        // this.setState({
        //   values:sv
        // })
    }

    const handleUpdate = () => {
        let svUpdate = arrStudent.find((prod) => prod.masv === values.masv)
        console.log(svUpdate)
        //svUpdate.hoten=valuesRef.hoten
        //svUpdate.sdt=values.sdt
        //svUpdate.email=values.email

        const action = saveEdit(valuesRef.current)
        dispatch(action)
        // this.setState({
        //   arrStudent:arrStudent
        // },
        // () => {
        //   this.luuStorage()
        // })
    }

    const layStorage = () => {
        if (localStorage.getItem('arrSV')) {
            let arrSV = JSON.parse(localStorage.getItem('arrSV'))
            return arrSV
        }
        return []
    }

    // componentDidMount(){
    //     this.setState({
    //         arrStudent: this.layStorage()
    //     })
    // }
    const searchSubmit = (e) =>{
        e.preventDefault();
        var searchKey = document.getElementById("search").value;
        console.log(searchKey);
        newArrStudent = newArrStudent.filter((sv) => sv.masv == searchKey);
        // if(newArrStudent.length==0){
        //     const action = searchSV(arrStudent);
        //     dispatch(action)
        // }else{
        //     const action = searchSV(newArrStudent);
        //     dispatch(action)
        // }
        const action = searchSV(newArrStudent);
            dispatch(action)
    }
    return (
        <div>
            <form className="container mt-5" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <h3>Thông tin sinh viên</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <p>Mã SV</p>
                                    <input
                                        className="form-control"
                                        id="masv"
                                        name="masv"
                                        onInput={handleChangeInput}
                                        value={values.masv}
                                    />
                                    <p className="text-danger">{errors.masv}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p>Họ tên</p>
                                    <input
                                        data-type="string"
                                        className="form-control"
                                        id="hoten"
                                        name="hoten"
                                        onInput={handleChangeInput}
                                        value={values.hoten}
                                    />
                                    <p className="text-danger">{errors.hoten}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <p>Số điện thoại</p>
                                    <input
                                        data-type="number"
                                        className="form-control"
                                        id="sdt"
                                        name="sdt"
                                        onInput={handleChangeInput}
                                        value={values.sdt}
                                    />
                                    <p className="text-danger">{errors.sdt}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p>Email</p>
                                    <input
                                        data-type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        onInput={handleChangeInput}
                                        value={values.email}
                                    />
                                    <p className="text-danger">{errors.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success" type="submit" disabled={isSubmit}>
                            Thêm sinh viên
                        </button>
                        <button
                            className="btn btn-primary ms-3"
                            type="button"
                            onClick={handleUpdate}
                        >
                            Lưu chỉnh sửa
                        </button>
                    </div>
                </div>
            </form>
            <table className="table container mt-5 ">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>
                            <form className="d-flex my-2 my-lg-0" onSubmit={searchSubmit}>
                                <input
                                    className="form-control w-50"
                                    type="text"
                                    placeholder="Search"
                                    id='search'
                                />
                                <button
                                    className="btn btn-outline-success my-2 my-sm-0"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </form>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {newArrStudent.map((student, index) => {
                        return (
                            <tr key={index}>
                                <td>{student.masv}</td>
                                <td>{student.hoten}</td>
                                <td>{student.sdt}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            deleteProduct(student.masv)
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleEditSV(student)
                                        }}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
