// import React, { useEffect, useState } from 'react';
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
// import { auth, googleProvider } from "../firebase_config/config";
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase_config/config';
// import { doc, setDoc } from 'firebase/firestore';

// const Signup = () => {
//   const [formVisible, setFormVisible] = useState(false);
//   const [error, setError] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       setFormVisible(true);
//     }, 100);
//   }, []);

//   const handleGoogleSignup = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       console.log("User Signed Up with Google:", result.user);
//       navigate('/');
//     } catch (err) {
//       console.error(err);
//       setError('Google Sign-Up failed');
//     }
//   };

//   const handleNormalSignup = async (e) => {
//     e.preventDefault();
//     const firstName = e.target.firstName.value;
//     const lastName = e.target.lastName.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const userCred = await createUserWithEmailAndPassword(auth, email, password);
//       const user= auth.currentUser;
//       if(user)
//       {
//         await setDoc(doc(db,"Users",user.uid),{
//           email:user.email,
//           firstName:firstName,
//           lastName : lastName,
//         });
//       }
//       await updateProfile(userCred.user, {
//         displayName: `${firstName} ${lastName}`,
//       });

//       // ✅ Send verification email
//       await sendEmailVerification(userCred.user, {
//         url: "http://localhost:5173/verify-email", handleCodeInApp: true,
//       });
//       setError("Verification email sent! Please check your inbox before logging in.");

//       console.log('User Signed Up : ', userCred.user);
//     } catch (err) {
//       console.error(err);
//       setError('Signup failed. Try again.');
//     }
//     e.target.reset();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 px-4">
//       <div className={`relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transition duration-300
//         ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transform transition-all duration-500 ease-out`}>

//         <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
//         <p className="text-gray-400 text-center mb-6">Sign up to get started</p>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleNormalSignup} className="space-y-6">
//           {/* Name Fields */}
//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label htmlFor="firstName" className="block text-gray-300 font-medium mb-1">First Name</label>
//               <input required type="text" name="firstName" id="firstName" placeholder="First Name" className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none" />
//             </div>
//             <div className="w-1/2">
//               <label htmlFor="lastName" className="block text-gray-300 font-medium mb-1">Last Name</label>
//               <input required type="text" name="lastName" id="lastName" placeholder="Last Name" className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none" />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-gray-300 font-medium mb-1">Email Address</label>
//             <input required type="email" name="email" id="email" placeholder="Enter Your Email" className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none" />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label htmlFor="password" className="block text-gray-300 font-medium mb-1">Password</label>
//             <input type={passwordVisible ? 'text' : 'password'} id="password" name="password" placeholder="Create a Password" className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none" />
//             <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-2 top-8 text-gray-400 hover:text-cyan-400 focus:outline-none">
//               {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
//             </button>
//           </div>

//           <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:bg-gradient-to-l hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 focus:ring focus:ring-cyan-300 focus:outline-none shadow-md hover:shadow-lg">
//             Sign Up
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="mt-8 flex items-center justify-between">
//           <span className="border-b w-1/4 border-gray-600"></span>
//           <span className="text-gray-400 text-sm">OR</span>
//           <span className="border-b w-1/4 border-gray-600"></span>
//         </div>

//         {/* Google Signup */}
//         <button onClick={handleGoogleSignup} className="mt-6 w-full flex items-center justify-center bg-gray-700 border border-gray-600 py-2 rounded-lg shadow-md hover:bg-gray-600 hover:shadow-lg transition-all duration-300 focus:ring focus:ring-cyan-300 focus:outline-none">
//           <FcGoogle className="h-6 w-6 mr-3" /> Continue with Google
//         </button>

//         <p className="text-center text-gray-400 text-sm mt-6">
//           Already have an account? <a href="/login" className="text-cyan-400 hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth, emailSignup } from "../firebase_config/authService";

const Signup = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFormVisible(true), 100);
  }, []);

 const handleGoogleSignup = async () => {
  try {
    const userData = await googleAuth(); // Firestore user object
    console.log("User Signed Up with Google:", userData); // now correctly logs data
    navigate("/");
  } catch (err) {
    console.error(err);
    setError("Google Sign-Up failed");
  }
};


  const handleNormalSignup = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await emailSignup(firstName, lastName, email, password);
      setError("✅ Verification email sent! Please check your inbox.");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Try again.");
    }
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 px-4">
      <div
        className={`relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transition duration-300
        ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
      >
        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
        <p className="text-gray-400 text-center mb-6">Sign up to get started</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleNormalSignup} className="space-y-6">
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300 font-medium mb-1">First Name</label>
              <input required type="text" name="firstName" placeholder="First Name"
                className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300 font-medium mb-1">Last Name</label>
              <input required type="text" name="lastName" placeholder="Last Name"
                className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">Email Address</label>
            <input required type="email" name="email" placeholder="Enter Your Email"
              className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-300 font-medium mb-1">Password</label>
            <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Create a Password"
              className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-8 text-gray-400 hover:text-cyan-400">
              {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5"/> : <AiOutlineEye className="h-5 w-5"/>}
            </button>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:bg-gradient-to-l transition-all duration-300">
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center justify-between">
          <span className="border-b w-1/4 border-gray-600"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="border-b w-1/4 border-gray-600"></span>
        </div>

        {/* Google Signup */}
        <button onClick={handleGoogleSignup} className="mt-6 w-full flex items-center justify-center bg-gray-700 border border-gray-600 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300">
          <FcGoogle className="h-6 w-6 mr-3"/> Continue with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account? <a href="/login" className="text-cyan-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
