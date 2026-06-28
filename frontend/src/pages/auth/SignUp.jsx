import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError(null);

    try {
      let profileImageUrl = "";

      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes?.data?.url || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          fullName,
          email,
          password,
          profileImageUrl,
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/Dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="glass-card rounded-2xl p-8 sweep-effect shadow-2xl">
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="flex justify-center mb-6">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            type="text"
            placeholder="Johnathan Doe"
            icon="person"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            icon="mail"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="••••••••"
            icon="lock"
          />

          {error && (
            <p className="text-error text-label-sm font-medium">{error}</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-primary text-on-primary font-title-md text-title-md py-4 rounded-xl neon-glow-primary transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Create Account
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-on-surface-variant font-body-md">
            Already have an account? 
            <Link
              className="text-primary font-bold hover:text-primary-container transition-colors ml-1"
              to="/Login"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;