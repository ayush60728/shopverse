import { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router';

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    contact: '',
    email: '',
    password: '',
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        fullname: formData.fullname,
        isSeller: formData.isSeller,
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#011230] text-[#d8e2ff] p-6 font-['Inter'] selection:bg-[#e9c349]/30">
      {/* Brand Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-extrabold tracking-[0.2em] text-white uppercase mb-2">
          Shopverse
        </h1>
        <div className="h-1 w-20 bg-[#e9c349] mx-auto rounded-full"></div>
      </div>

      <div className="max-w-xl w-full space-y-10 bg-[#0e1f3d]/40 backdrop-blur-2xl p-10 md:p-14 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="text-center space-y-3 font-['Montserrat']">
          <h2 className="text-3xl font-semibold tracking-tight text-white">Create Your Account</h2>
          <p className="text-[#c5c6cd] text-lg font-light">Join our exclusive shopping community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2 group">
              <label htmlFor="fullname" className="text-sm font-medium text-[#8f9097] ml-1 transition-colors group-focus-within:text-[#e9c349]">
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="w-full bg-[#011230]/50 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-[#44474d] focus:outline-none focus:ring-1 focus:ring-[#e9c349]/50 focus:border-[#e9c349] transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2 group">
              <label htmlFor="email" className="text-sm font-medium text-[#8f9097] ml-1 transition-colors group-focus-within:text-[#e9c349]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#011230]/50 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-[#44474d] focus:outline-none focus:ring-1 focus:ring-[#e9c349]/50 focus:border-[#e9c349] transition-all duration-300"
                placeholder="john@shopverse.com"
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2 group">
              <label htmlFor="contact" className="text-sm font-medium text-[#8f9097] ml-1 transition-colors group-focus-within:text-[#e9c349]">
                Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                type="tel"
                required
                value={formData.contact}
                onChange={handleChange}
                className="w-full bg-[#011230]/50 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-[#44474d] focus:outline-none focus:ring-1 focus:ring-[#e9c349]/50 focus:border-[#e9c349] transition-all duration-300"
                placeholder="+1 234 567 890"
              />
            </div>

            {/* Password */}
            <div className="space-y-2 group">
              <label htmlFor="password" className="text-sm font-medium text-[#8f9097] ml-1 transition-colors group-focus-within:text-[#e9c349]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#011230]/50 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-[#44474d] focus:outline-none focus:ring-1 focus:ring-[#e9c349]/50 focus:border-[#e9c349] transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* isSeller Checkbox styled as a toggle/switch for premium feel */}
          <div className="flex items-center justify-between bg-[#011230]/30 p-5 rounded-2xl border border-white/5 transition-all hover:border-white/10">
            <div className="space-y-1">
              <h4 className="text-base font-medium text-white">Become a Seller</h4>
              <p className="text-xs text-[#8f9097]">Start selling your products on Shopverse</p>
            </div>
            <label htmlFor="isSeller" className="relative inline-flex items-center cursor-pointer">
              <input
                id="isSeller"
                name="isSeller"
                type="checkbox"
                checked={formData.isSeller}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-[#112240] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e9c349]"></div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e9c349] hover:bg-[#d4af37] text-[#011230] font-bold py-5 rounded-xl shadow-[0_10px_30px_rgba(233,195,73,0.3)] transform transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg uppercase tracking-widest"
          >
            Get Started
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0e1f3d] px-4 text-[#8f9097] font-medium tracking-widest">Or continue with</span>
            </div>
          </div>
          <a href="/api/auth/google">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="fill-[#4285F4]"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="fill-[#34A853]"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="fill-[#FBBC05]"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="fill-[#EA4335]"
                />
              </svg>
              <span className="group-hover:text-[#e9c349] transition-colors">Continue with Google</span>
            </button>
          </a>
          <p className="text-center text-[#8f9097] font-light">
            Already have an account?{' '}
            <a href="/login" className="text-[#e9c349] hover:text-[#d4af37] font-semibold transition-colors underline-offset-8 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>

      <footer className="mt-12 text-[#44474d] text-sm tracking-widest uppercase">
        © 2026 Shopverse Luxury Retail
      </footer>
    </div>
  );
};

export default Register;
