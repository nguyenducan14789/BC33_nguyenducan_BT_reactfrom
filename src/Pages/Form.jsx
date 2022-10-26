import React, { Component } from 'react'

export default class Form extends Component {
    state = {
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
        ]
    }

    handleChangeInput = (e) => {
        let { id, value } = e.target

        let newValue = { ...this.state.values }
        newValue[id] = value

        let newError = { ...this.state.errors }
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
                let regex = /^[A-Z  a-z]+$/;
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

        newError[id] = messError

        let submit = false
        for (let key in newValue) {
            if (newValue[key].trim() === '') {
                submit = true
            }
        }
        if (!submit) {
            for (let key in newError) {
                if (newError[key].trim() !== '') {
                    submit = true
                }
            }
        }
        const newArrStudent = [...this.state.arrStudent];

        this.setState(
            {
                values: newValue,
                errors: newError,
                isSubmit: submit,
                arrStudent:newArrStudent
            },
            () => {
                console.log(this.state)
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit', this.state)

        let { errors,values } = this.state
        for (let key in errors) {
            if (errors[key] !== '') {
                alert('Dữ liệu không hợp lệ !')
                return
            }
        }

        let newSV = {...this.state.values};
        this.state.arrStudent.push(newSV);
        
        this.setState({
          arrStudent:this.state.arrStudent
        },() => {
          this.luuStorage()})
    }

    deleteProduct = (id) => {
      console.log(id);
      //this.state.arrStudent = this.state.arrStudent.filter(sv => sv.masv !== id);

      let index = this.state.arrStudent.findIndex(sv => sv.masv = id);
      this.state.arrStudent.splice(index,1)
      this.setState({
        arrStudent:this.state.arrStudent
      },() => {
        this.luuStorage()
      })
    }

    handleEdit = (sv) => {
        this.setState({
          values:sv
        })
    }

    handleUpdate = () => {
        let {values,arrStudent} = this.state;
        let svUpdate = arrStudent.find(prod => prod.masv === values.masv);
        
        svUpdate.hoten=values.hoten
        svUpdate.sdt=values.sdt
        svUpdate.email=values.email
        this.setState({
          arrStudent:arrStudent
        },() => {
          this.luuStorage()
        })
    }

    luuStorage = () => {
      let strArrSV = JSON.stringify(this.state.arrStudent);
      localStorage.setItem("arrSV",strArrSV);
    }

    layStorage = () => {
        if(localStorage.getItem("arrSV")){
            let arrSV = JSON.parse(localStorage.getItem('arrSV'));
            return arrSV;
        }
        return [];
    }

    componentDidMount(){
        this.setState({
            arrStudent: this.layStorage()
        })
    }
    render() {
        return (
            <div>
                <form className="container mt-5" onSubmit={this.handleSubmit}>
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
                                            onInput={this.handleChangeInput}
                                            value={this.state.values.masv}
                                        />
                                        <p className="text-danger">{this.state.errors.masv}</p>
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
                                            onInput={this.handleChangeInput}
                                            value={this.state.values.hoten}
                                        />
                                        <p className="text-danger">{this.state.errors.hoten}</p>
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
                                            onInput={this.handleChangeInput}
                                            value={this.state.values.sdt}
                                        />
                                        <p className="text-danger">{this.state.errors.sdt}</p>
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
                                            onInput={this.handleChangeInput}
                                            value={this.state.values.email}
                                        />
                                        <p className="text-danger">{this.state.errors.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-success"
                                type="submit"
                                disabled={this.state.isSubmit}
                            >
                                Thêm sinh viên
                            </button>
                            <button
                                className="btn btn-primary ms-3"
                                type="button"
                                onClick={this.handleUpdate}
                          
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
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.arrStudent.map((student,index) => {
                            return <tr key={index}>
                                <td>{student.masv}</td>
                                <td>{student.hoten}</td>
                                <td>{student.sdt}</td>
                                <td>{student.email}</td>
                                <td>
                                  <button className='btn btn-danger' onClick={() =>{
                                    this.deleteProduct(student.masv)
                                  }}>Delete</button>
                                  <button className='btn btn-primary' onClick={() => {
                                    this.handleEdit(student)
                                  }}>Update</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
