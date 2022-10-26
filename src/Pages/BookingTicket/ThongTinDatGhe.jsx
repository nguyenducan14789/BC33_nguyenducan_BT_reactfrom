import React, { Component } from 'react'
import { connect } from 'react-redux'
import { huyGheAction } from '../../redux/actions/BaiTapDatVeAction'
import { HUY_GHE } from '../../redux/types/BaiTapDatVeType'

class ThongTinDatGhe extends Component {
    render() {
        return (
            <div>
                <div className="mt-5">
                    <button className="gheDuocChon"></button>{' '}
                    <span className="text-light fs-4">ghế đã đặt</span>
                    <br />
                    <button className="gheDangChon"></button>{' '}
                    <span className="text-light fs-4">ghế đang chọn</span>
                    <br />
                    <button className="ghe" style={{ marginLeft: 0 }}></button>{' '}
                    <span className="text-light fs-4">Ghế chưa đặt</span>
                </div>

                <div className="mt-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr className="text-light" style={{ fontSize: 25 }}>
                                <th>Số ghế</th>
                                <th>Giá</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.danhSachGheDangDat.map((gheDangDat, index) => {
                                return (
                                    <tr key={index} className="text-warning">
                                        <th>{gheDangDat.soGhe}</th>
                                        <th>{gheDangDat.gia.toLocaleString()}</th>
                                        <th>
                                            <button
                                                onClick={() => {
                                                    this.props.dispatch(huyGheAction(gheDangDat.soGhe))
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot >
                            <tr className='text-warning'>
                                <td></td>
                                <td>Tổng tiền: </td>
                                <td>{this.props.danhSachGheDangDat.reduce((tongTien,gheDangDat,index) => {
                                    return tongTien += gheDangDat.gia
                                },0).toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        danhSachGheDangDat: state.BaiTapDatVeReducer.danhSachGheDangDat,
    }
}

export default connect(mapStateToProps)(ThongTinDatGhe)
