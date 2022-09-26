import userPic from '../../assets/img/TheHeader/PhilCollins.jpg'
import goBack from '../../assets/img/TheHeader/goBack.svg'
import goForward from '../../assets/img/TheHeader/goForward.svg'
import dropDown from '../../assets/img/TheHeader/dropDown.svg'
import '../../assets/css/TheHeader.css';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import config, { setUserDropDownMenu } from '../../store/config';
import {useEffect, useRef, useState} from 'react';
import {DatePicker, Form, Input, message, Modal, Radio, Switch} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {setAccount} from '../../api/account';
import {login} from '../../api/user';
import {setIsLogin, setUserId, setUsername} from '../../store/user';

const TheHeader = () => {

    const dispatch = useAppDispatch();
    const { userDropDownMenu } = useAppSelector((state) => state.config);
    const { isLogin, username } = useAppSelector((state) => state.user);

    const [userFormVisible, setUserFormVisible] = useState(false);
    const [userForm] = Form.useForm();
    const userMenu:any = useRef(null);

    useEffect(() => {
        document.addEventListener('click', function () {
            dispatch(setUserDropDownMenu(false));
        })
    },[])

    const onBtnClick = (e:any) => {
        if(!userDropDownMenu){
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            dispatch(setUserDropDownMenu(true));
        }
    }

    const handleOk = () => {
        userForm.validateFields().then((res) => {
            let params = new URLSearchParams();
            params.append('username',res.username);
            params.append('password',res.password);
            login(params).then(res => {
                // @ts-ignore
                if(res.code === 1) {
                    dispatch(setIsLogin());
                    console.log(res);
                    // @ts-ignore
                    dispatch(setUserId(res.data[0].id));
                    // @ts-ignore
                    dispatch(setUsername(res.data[0].username));
                    dispatch(setUserDropDownMenu(false));
                    message.success('登录成功');
                    setUserFormVisible(false);
                    userForm.resetFields();
                }else {
                    message.error('登录失败');
                }
            }).catch(err => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCancel = () => {
        setUserFormVisible(false);
    }

    const logOut = () => {
        dispatch(setIsLogin());
        dispatch(setUserId(0));
        dispatch(setUsername(''));
    }
    return (
        <div className="TheHeader">
            <div className="AvatarBar">
                <button onClick={onBtnClick} className="btn">
                    <img src={userPic} className="userpic"/>
                    <div className="username">{username}</div>
                    <div>
                        <img className="drop" src={dropDown}/>
                    </div>
                </button>
                <div ref={userMenu} className={userDropDownMenu? "userDropDownShow":"userDropDownHidden"}>
                    <button className={isLogin? "dropDownBtn":"dropDownBtnHidden"}>
                        <div className="">账户</div>
                    </button>
                    <button className={!isLogin? "dropDownBtn":"dropDownBtnHidden"}>
                        <div onClick={() => setUserFormVisible(true)} className="">登录</div>
                    </button>
                    <button className="dropDownBtn">
                        <div onClick={logOut} className="">登出</div>
                    </button>
                </div>
            </div>
            <Modal visible={userFormVisible} onOk={handleOk} onCancel={handleCancel} okText="登录" cancelText="取消">
                <Form form={userForm}>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TheHeader;