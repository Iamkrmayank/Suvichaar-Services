// import React, { useEffect, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import { googleAuth, emailSignup } from "../firebase_config/authService";

// const Signup = () => {
//   const [formVisible, setFormVisible] = useState(false);
//   const [error, setError] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => setFormVisible(true), 100);
//   }, []);

//  const handleGoogleSignup = async () => {
//   try {
//     const userData = await googleAuth(); // Firestore user object
//     console.log("User Signed Up with Google:", userData); // now correctly logs data
//     navigate("/");
//   } catch (err) {
//     console.error(err);
//     setError("Google Sign-Up failed");
//   }
// };


//   const handleNormalSignup = async (e) => {
//     e.preventDefault();
//     const firstName = e.target.firstName.value;
//     const lastName = e.target.lastName.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       await emailSignup(firstName, lastName, email, password);
//       setError("✅ Verification email sent! Please check your inbox.");
//     } catch (err) {
//       console.error(err);
//       setError("Signup failed. Try again.");
//     }
//     e.target.reset();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 px-4">
//       <div
//         className={`relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transition duration-300
//         ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
//       >
//         <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
//         <p className="text-gray-400 text-center mb-6">Sign up to get started</p>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleNormalSignup} className="space-y-6">
//           {/* Name Fields */}
//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block text-gray-300 font-medium mb-1">First Name</label>
//               <input required type="text" name="firstName" placeholder="First Name"
//                 className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
//             </div>
//             <div className="w-1/2">
//               <label className="block text-gray-300 font-medium mb-1">Last Name</label>
//               <input required type="text" name="lastName" placeholder="Last Name"
//                 className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-300 font-medium mb-1">Email Address</label>
//             <input required type="email" name="email" placeholder="Enter Your Email"
//               className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-gray-300 font-medium mb-1">Password</label>
//             <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Create a Password"
//               className="w-full border-b border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none"/>
//             <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}
//               className="absolute right-2 top-8 text-gray-400 hover:text-cyan-400">
//               {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5"/> : <AiOutlineEye className="h-5 w-5"/>}
//             </button>
//           </div>

//           <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:bg-gradient-to-l transition-all duration-300">
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
//         <button onClick={handleGoogleSignup} className="mt-6 w-full flex items-center justify-center bg-gray-700 border border-gray-600 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300">
//           <FcGoogle className="h-6 w-6 mr-3"/> Continue with Google
//         </button>

//         <p className="text-center text-gray-400 text-sm mt-6">
//           Already have an account? <a href="/login" className="text-cyan-400 hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useEffect, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import { googleAuth, emailSignup } from "../firebase_config/authService";

// const Signup = () => {
//   const [formVisible, setFormVisible] = useState(false);
//   const [error, setError] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => setFormVisible(true), 100);
//   }, []);

//   const handleGoogleSignup = async () => {
//     try {
//       const userData = await googleAuth();
//       console.log("User Signed Up with Google:", userData);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Google Sign-Up failed");
//     }
//   };

//   const handleNormalSignup = async (e) => {
//     e.preventDefault();
//     const firstName = e.target.firstName.value;
//     const lastName = e.target.lastName.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       await emailSignup(firstName, lastName, email, password);
//       setError("✅ Verification email sent! Please check your inbox.");
//     } catch (err) {
//       console.error(err);
//       setError("Signup failed. Try again.");
//     }
//     e.target.reset();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center 
//       bg-gradient-to-br px-4">

//       <div
//         className={`relative bg-white text-black shadow-lg rounded-2xl p-10 max-w-md w-full border  border-gray-400
//         ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
//       >
//         <h2 className="text-3xl font-bold text-center mb-4 text-[#E6A24B]">
//           Create Account
//         </h2>
//         <p className="text-gray-600 text-center mb-6">
//           Sign up to get started
//         </p>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleNormalSignup} className="space-y-6">
//           {/* Name Fields */}
//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block text-gray-700 font-medium mb-1">First Name</label>
//               <input
//                 required
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 className="w-full border-b  border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-gray-700 font-medium mb-1">Last Name</label>
//               <input
//                 required
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 className="w-full border-b  border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email Address</label>
//             <input
//               required
//               type="email"
//               name="email"
//               placeholder="Enter Your Email"
//               className="w-full border-b  border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               type={passwordVisible ? "text" : "password"}
//               name="password"
//               placeholder="Create a Password"
//               className="w-full border-b  border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//               className="absolute right-2 top-8 text-gray-400 hover:text-[#E6A24B]"
//             >
//               {passwordVisible ? (
//                 <AiOutlineEyeInvisible className="h-5 w-5" />
//               ) : (
//                 <AiOutlineEye className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#E6A24B] text-white py-2 rounded-lg hover:bg-[#d68d32] transition-all duration-300"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="mt-8 flex items-center justify-between">
//           <span className="border-b w-1/4 border-gray-300"></span>
//           <span className="text-gray-500 text-sm">OR</span>
//           <span className="border-b w-1/4 border-gray-300"></span>
//         </div>

//         {/* Google Signup */}
//         <button
//           onClick={handleGoogleSignup}
//           className="mt-6 w-full flex items-center justify-center bg-white border  border-gray-400 py-2 rounded-lg shadow-sm hover:bg-[#B7D4E9]/20"
//         >
//           <FcGoogle className="h-6 w-6 mr-3" /> Continue with Google
//         </button>

//         <p className="text-center text-gray-600 text-sm mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-[#df8815] hover:underline">
//             Login
//           </a>
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
import logo from "/ContentLabs_2.png";// make sure the logo path is correct

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
      const userData = await googleAuth();
      console.log("User Signed Up with Google:", userData);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      <div
        className={`relative bg-white text-black shadow-lg rounded-2xl p-10 max-w-md w-full border border-gray-400
        ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transform transition-all duration-500 ease-out`}
      >
        {/* Logo Header instead of "Create Account" */}
        {/* <div className="flex items-center justify-start h-16 border-black/20 px-4 mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto"
            style={{ position: "absolute" }}
          />
          <span className="ml-8 text-xl font-bold text-black">
            Content{" "}
            <span className="text-white bg-[#E6A24B] rounded px-1">LABS</span>
          </span>
        </div> */}
        {/* Logo Header Centered */}
        {/* <div className="flex items-center justify-center h-16  border-black/20 mb-6">
  <img
    src={logo}
    alt="Logo"
    className="h-12 w-auto mr-2"
  />
  <span className="text-xl font-bold text-black">
    Content{" "}
    <span className="text-white bg-[#E6A24B] rounded px-1">LABS</span>
  </span>
</div> */}

        {/* <div className="flex items-center justify-center h-16  mb-2 relative">
  <img
    src={logo}
    alt="Logo"
    className="h-16 w-auto -mr-6 -ml-6" // negative margin-right pulls it closer
  />
  <span className=" ml-2 text-xl font-bold text-black">
    Content{" "}
    <span className="text-white bg-[#E6A24B] rounded px-1">LABS</span>
  </span>
</div> */}

        <div className="flex items-center justify-center h-14  mb-6 relative">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-auto" // negative margin-right pulls it closer
          />
        </div>



        <p className="text-gray-600 text-center mb-6">
          Sign up to get started
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleNormalSignup} className="space-y-6">
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                First Name
              </label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Last Name
              </label>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Create a Password"
              className="w-full border-b border-gray-400 bg-transparent text-black px-2 py-1 focus:border-[#E6A24B] outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-8 text-gray-400 hover:text-[#E6A24B]"
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible className="h-5 w-5" />
              ) : (
                <AiOutlineEye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E6A24B] text-white py-2 rounded-lg hover:bg-[#d68d32] transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center justify-between">
          <span className="border-b w-1/4 border-gray-300"></span>
          <span className="text-gray-500 text-sm">OR</span>
          <span className="border-b w-1/4 border-gray-300"></span>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="mt-6 w-full flex items-center justify-center bg-white border border-gray-400 py-2 rounded-lg shadow-sm hover:bg-[#B7D4E9]/20"
        >
          <FcGoogle className="h-6 w-6 mr-3" /> Continue with Google
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#df8815] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
