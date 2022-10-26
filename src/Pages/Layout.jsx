import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default class Layout extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                        <NavLink className="navbar-brand" to="/form">
                            <img src='https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-flat-smile-image_1127961.jpg' style={{width:"40px",height:"40px"}}></img>
                        </NavLink>
                        <button
                            className="navbar-toggler d-lg-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsibleNavId"
                            aria-controls="collapsibleNavId"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        />
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" to="/form" aria-current="page">
                                        Bài Tập Form
                                    </NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/baitapform" aria-current="page">
                                        Bài Tập Form
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/bookingticket">
                                        Bài tập Đặt Vé
                                    </NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="dropdownId"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Dropdown
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                                        <a className="dropdown-item" href="#">
                                            Action 1
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            Action 2
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            <form className="d-flex my-2 my-lg-0">
                                <input
                                    className="form-control me-sm-2"
                                    type="text"
                                    placeholder="Search"
                                />
                                <button
                                    className="btn btn-outline-success my-2 my-sm-0"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </nav>
                </header>

                <div style={{ minHeight: '600px' }}>
                    <Outlet />
                </div>
                <footer className="bg-dark text-light p-5 text-center">Footer</footer>
            </div>
        )
    }
}
