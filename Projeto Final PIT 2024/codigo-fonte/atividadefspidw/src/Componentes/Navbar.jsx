import {Link, Outlet} from 'react-router-dom'
import {FaHome, FaCalendar, FaBars, FaWifi, FaMoneyBill, FaUser} from 'react-icons/fa'
import {Container} from 'react-bootstrap'
import './Navbar.css'
import {useState} from 'react'

function Navbar ( ) {
    const [show, setShow] = useState(true)
    const handeShow = ( ) => {
        setShow(!show)
    }
    return (<>
        <div className={`side-navbar ${show?'active-nav':''}`} id="sidebar">
            <ul className="nav flex-column text-white w-100">
                <span className="nav-link h3 text-white my-2">CDH</span>
            </ul>
            <li className="nav-link">
                <Link to='/'>
                    <FaHome></FaHome>
                <span className="mx-2">Início</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to='/eventos'>
                    <FaCalendar></FaCalendar>
                <span className="mx-2">Eventos</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to='/despesas'>
                    <FaMoneyBill></FaMoneyBill>
                <span className="mx-2">Despesas</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to='/membros'>
                    <FaUser></FaUser>
                <span className="mx-2">Membros</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to='/doadores'>
                    <FaMoneyBill></FaMoneyBill>
                <span className="mx-2">Doadores</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to='/doacoes'>
                <FaMoneyBill></FaMoneyBill>
                <span className="mx-2">Doações</span>
                </Link>
            </li>
        </div>
        <div className={`p-1 my-container ${show?'active-cont':''}`}>
            <nav onClick={handeShow} class="navbar top-navbar px-1">
                <FaBars id="FaBars"></FaBars>
                <p>CDH</p>
            </nav>
        </div>
        <Container>
        <Outlet></Outlet>
        </Container>
    </>)
}

export default Navbar;