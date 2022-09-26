import '../../assets/css/SideBar.css';
import { Button } from 'antd'
import {Link, NavLink} from 'react-router-dom';
const SideBar = () => {

    return(
        <div className="SideBar">
            <p className="logo">记账系统</p>
            <div className="BtnGroup1">
                <NavLink to="Account" className={({ isActive }) => "" + (isActive ? "btnActive" : "")}>
                    <Button className="myButton" type="primary">Account</Button>
                </NavLink>
                <NavLink to="Accounting" className={({ isActive }) => "" + (isActive ? "btnActive" : "")}>
                    <Button className="myButton" type="primary">Accounting</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar;