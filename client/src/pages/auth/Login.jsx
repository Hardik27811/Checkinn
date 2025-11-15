import {useEffect} from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';
import { useUser  } from '../../context/UserContext';
const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { setUser ,verifyUser,user ,setRole} = useUser(); 

    const [state, setState] = useState("login");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userlogin,setuserlogin] = useState(false)

    
  
    const userSignup = async () => {
        try {
            const res = await axios.post("http://localhost:3000/auth/user/signup", { firstName, lastName, email, password, phone })
            if (res.status === 200) {
                console.log("User registered", res);
                
            }
        } catch (error) {
            console.error('error in registeration', error)
        }
    }
    const userLogin = async ()=>{
        try {
            const res = await axios.post("http://localhost:3000/auth/user/login",{email,password},{ withCredentials: true }  )
            if(res.status   === 200){
                console.log("User login",res);

                 verifyUser();
                 setUser(res.data.user);
                 if(res.data.role === 'admin'){
                    navigate("/admin")
                 }
            }
            
        } catch (error) {
            console.error('error in registeration', error)
        }
    }    
    return (
        <div className='bg-gary-200'>
            <div className="flex flex-col items-center justify-center h-screen  bg-teal-100">
                {/* Toggle Buttons */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setState("login")}
                        className={`px-6 py-2 rounded-full font-medium transition ${state === "login"
                                ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => { setState("register"); }}
                        className={`px-6 py-2 rounded-full font-medium transition ${state === "register"
                                ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form
                    className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (state === "register"){ 
                            userSignup();
                            setState('login');setFirstName('');setLastName('');setPhone('');setEmail('');setPassword('');
                        }
                        else{
                            userLogin();
                            setEmail('');setPassword('');
                            navigate('/',)
                        }
                    }}
                >
                    <h1 className="text-gray-900 text-3xl mt-10 font-medium">
                        {state === "login" ? "Login" : "Sign Up"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        {state === "login"
                            ? "Please sign in to continue"
                            : "Create your account"}
                    </p>

                    {/* Signup fields */}
                    {state === "register" && (
                        <>
                            <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="border-none outline-none ring-0 w-full"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    name='firstName'
                                    required
                                />
                            </div>
                            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="border-none outline-none ring-0 w-full"
                                    value={lastName}
                                    name='lastName'
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                                <input
                                    type="phone"
                                    placeholder="Phone"
                                    className="border-none outline-none ring-0 w-full"
                                    value={phone}
                                    name='phone'
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Common fields */}
                    <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className="border-none outline-none ring-0 w-full"
                            value={email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-none outline-none ring-0 w-full"
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full h-11 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-white mb-10"
                    >
                        {state === "login" ? "Login" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login