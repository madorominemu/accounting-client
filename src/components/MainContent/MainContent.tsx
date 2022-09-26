import {Navigate, Route} from 'react-router';
import { Routes } from 'react-router';
import '../../assets/css/MainContent.css';
import TheHeader from './TheHeader';
import Account from './Account';
import Accounting from './Accounting';

const MainContent = () => {

    return(
        <div className="MainContent">
            <TheHeader/>
            <Routes>
                <Route path="/" element={<Navigate to="Account"/>}/>
                <Route path="/Account" element={<Account/>}/>
                <Route path="/Accounting" element={<Accounting/>}/>
            </Routes>
        </div>
    )
}

export default MainContent;