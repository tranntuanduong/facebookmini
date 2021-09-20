import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import CloseIcon from '@mui/icons-material/Close';
import { loginCall, registerCall } from '../../context/useAuth';
import { AuthContext } from '../../context/AuthProvider';

Login.propTypes = {};

function Login(props) {
    const [openRegister, setOpenRegister] = useState(false);

    const yyyy = new Date().getFullYear();

    const email = useRef();
    const password = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const dayOfBirth = useRef();
    const monthOfBirth = useRef();
    const yearOfBirth = useRef();
    const sex = useRef();

    const { user, isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
            birthDay: `${dayOfBirth.current.value}/${monthOfBirth.current.value}/${yearOfBirth.current.value}`,
            sex: sex.current.value,
        };
        registerCall(newUser, dispatch);
        window.location.reload();

        // setOpenRegister(false);
    };

    console.log(user);
    return (
        <div className="login">
            <div className="loginWrap">
                <div className="loginLeft">
                    <img src="./assets/loginLogo.svg" alt="" className="loginLeftLogo" />
                    <h3 className="loginLeftDesc">
                        Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                    </h3>
                </div>
                <div className="loginRight">
                    <form className="loginRightForm" onSubmit={handleLogin}>
                        <div className="loginRightFormInput">
                            <input type="text" placeholder="Email" ref={email} />
                        </div>
                        <div className="loginRightFormInput">
                            <input type="text" placeholder="Mật khẩu" ref={password} />
                        </div>

                        {isFetching ? (
                            <button type="submit" className="loginRightFormBtnSubmit disabled" disabled>
                                <div className="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </button>
                        ) : (
                            <button type="submit" className="loginRightFormBtnSubmit">
                                Đăng nhập
                            </button>
                        )}

                        <div className="loginRightFormForgotPassword">Quên mật khẩu?</div>
                        <hr className="loginRightFormHr" />
                        <div className="loginRightFormNav" onClick={() => setOpenRegister(true)}>
                            Tạo tài khoản mới
                        </div>
                    </form>
                </div>
            </div>
            {/* Register */}
            {openRegister && (
                <div className="registerModalWrap">
                    <div className="registerModal">
                        <div className="registerTop">
                            <div className="registerTopText">
                                <div className="registerTopTextTitle">Đăng ký</div>
                                <div className="registerTopTextDesc">Nhanh chóng và dễ dàng.</div>
                            </div>
                            <div className="registerTopIcon" onClick={() => setOpenRegister(false)}>
                                <CloseIcon />
                            </div>
                        </div>
                        <hr className="registerHr" />
                        <form className="registerForm" onSubmit={handleRegister}>
                            <div className="grid__row">
                                <div className=" grid__col-6-12">
                                    <div className="grid__col">
                                        <div className="registerInput">
                                            <input type="text" placeholder="Họ" ref={firstName} />
                                        </div>
                                    </div>
                                </div>
                                <div className=" grid__col-6-12">
                                    <div className="grid__col">
                                        <div className="registerInput">
                                            <input type="text" placeholder="Tên" ref={lastName} />
                                        </div>
                                    </div>
                                </div>
                                <div className=" grid__col-12-12">
                                    <div className="grid__col">
                                        <div className="registerInput">
                                            <input type="text" placeholder="Số di động hoặc email" ref={email} />
                                        </div>
                                    </div>
                                </div>
                                <div className=" grid__col-12-12">
                                    <div className="grid__col">
                                        <div className="registerInput">
                                            <input type="text" placeholder="Mật khẩu" ref={password} />
                                        </div>
                                    </div>
                                </div>
                                <div className="selectWrap">
                                    <div className="selectWrapDesc">Ngày sinh</div>
                                    <div className=" grid__col-4-12">
                                        <div className="grid__col">
                                            <div className="registerInput">
                                                <select ref={dayOfBirth}>
                                                    {Array.from(new Array(31)).map((x, index) => (
                                                        <option key={index} value={index + 1}>
                                                            {index + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" grid__col-4-12">
                                        <div className="grid__col">
                                            <div className="registerInput">
                                                <select ref={monthOfBirth}>
                                                    {Array.from(new Array(12)).map((x, index) => (
                                                        <option key={index} value={index + 1}>{`Tháng ${
                                                            index + 1
                                                        }`}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" grid__col-4-12">
                                        <div className="grid__col">
                                            <div className="registerInput">
                                                <select name="cars" id="cars" ref={yearOfBirth}>
                                                    {Array.from(new Array(120)).map((x, index) => (
                                                        <option key={index} value={yyyy - index}>
                                                            {yyyy - index}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="selectWrap">
                                    <div className=" grid__col-4-12">
                                        <div className="grid__col">
                                            <div className="registerInput">
                                                <label htmlFor="male">Nữ</label>
                                                <input type="radio" id="male" name="sex" ref={sex} value="male" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" grid__col-4-12">
                                        <div className="grid__col">
                                            <div className="registerInput">
                                                <label htmlFor="female">Nam</label>
                                                <input type="radio" id="female" name="sex" ref={sex} value="female" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" grid__col-4-12">
                                        <div className="grid__col">
                                            <div className="registerInput">
                                                <label htmlFor="orther">Khác</label>
                                                <input type="radio" id="orther" name="sex" ref={sex} value="orther" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="registerBtn">
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
