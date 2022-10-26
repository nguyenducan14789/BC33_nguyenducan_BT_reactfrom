import React, { Component } from 'react'
import './BookingTicket.css'
import ThongTinDatGhe from './ThongTinDatGhe'
import danhSachGheData from './danhSachGhe.json'
import HangGhe from './HangGhe'

export default class BookingTicket extends Component {

    renderHangGhe = () => {
        return danhSachGheData.map((hangGhe,index) => {
            return <div key={index}>
                <HangGhe hangGhe={hangGhe} soHangGhe={index}/>
            </div>
        })
    }

    render() {
        return (
            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(./img/bookingTicket/bgmovie.jpg)',
                    backgroundSize: '100%',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8 text-center">
                                <h1 className="text-warning fs-2" style={{ fontWeight: '900' }}>
                                    ĐẶT VÉ XEM PHIM
                                </h1>
                                <div style={{ fontSize: '20px' }} className="text-light mt-2">
                                    Màn hình
                                </div>
                                <div
                                    style={{ flexDirection: 'column', justifyContent: 'center' }}
                                    className="d-flex mt-2"
                                >
                                    <div className="screen"></div>
                                    {this.renderHangGhe()}
                                </div>
                                
                            </div>
                            <div className="col-4">
                                <h1 className="text-success fs-3 mt-5" style={{ fontWeight: '900' }}>
                                    DANH SÁCH GHẾ BẠN CHỌN
                                </h1>
                                <ThongTinDatGhe/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
