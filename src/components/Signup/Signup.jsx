import {useState} from 'react';
import { BackgroundGradientAnimation } from '../../componentsAceternityUi/background-gradient-animation.jsx';
import {Link, useNavigate} from 'react-router-dom'
import authService from '../../appwrite/auth.js';
import {useDispatch} from 'react-redux'
import {login as authSliceLogin} from '../../store/authSlice.js'
import service from '../../appwrite/config.js';
import { ID } from 'appwrite';

function Signup() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup=async(e)=>{
    e.preventDefault();
    try {
      const session=await authService.createAccount({email,password,name});
      if(session){
        const userData=await authService.getCurrentUser();
        console.log(userData);
        
        await service.createUser({name,email,password,user_id: userData.$id})
        if(userData)dispatch(authSliceLogin(userData))
        navigate('/productlist')
      }
    } catch (error) {
      console.log("Error while signup: ",error);
    }
  }
  return (
    <div className="relative min-h-screen">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(255, 249, 229)"
        gradientBackgroundEnd="rgb(240, 255, 244)"
        firstColor="34, 139, 34"
        secondColor="255, 204, 0"
        thirdColor="255, 105, 97"
        fourthColor="72, 209, 204"
        fifthColor="255, 160, 122"
        pointerColor="255, 140, 0"
        blendingValue="soft-light"
      />

      {/* Signup form on top of gradient */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl border border-white/40 sm:max-w-md xl:p-0">
  <div className="p-6 space-y-6 sm:p-8">
    <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
      Create an account
    </h1>
    <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-semibold text-black/90">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="John Doe"
          className="bg-black/20 border border-white/40 placeholder-black/70 text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-black/90">
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="name@company.com"
          className="bg-black/20 border border-white/40 placeholder-black/70 text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-black/90">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}

          className="bg-black/20 border border-white/40 placeholder-black/70 text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full text-white bg-black hover:bg-black/90 focus:ring-2 focus:outline-none focus:ring-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition"
      >
        Create an account
      </button>

      {/* Footer Link */}
      <p className="text-sm font-light text-black text-center">
        Already have an account?{' '}
        <Link to='/login' className='font-bold text-blackc underline'>Login</Link>
      </p>
    </form>
  </div>
</div>

      </div>
    </div>
  );
}

export default Signup;
