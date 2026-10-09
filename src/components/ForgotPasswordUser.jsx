import { useState } from "react";
import { useDispatch } from "react-redux";
import { userForgotPasswordRequest, userVerifyOtp, userResetPassword } from "@/redux/slice/UserAuth";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


const ForgotPassword = ({ onSuccess, onCancel,userType}) => {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  


  const dispatch = useDispatch();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }
    setLoading(true);
    try {
      await dispatch(userForgotPasswordRequest  ({email,type:userType})).unwrap();
      toast.success("OTP sent to your email");
      setStep(2);
      setErrors({});
    } catch (err) {
      toast.error(err || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    setLoading(true);
    try {
      await dispatch(userVerifyOtp({ email, otp ,type:userType})).unwrap();
      toast.success("OTP verified");
      setStep(3);
      setErrors({});
    } catch (err) {
      toast.error(err || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      await dispatch(userResetPassword({
        email,
        type:userType,
        password,
        password_confirmation: confirmPassword
      })).unwrap();
      toast.success("Password reset successfully! Please login.");
      // Call onSuccess instead of navigate
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step >= s ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {s}
            </div>
            <span className="text-xs mt-1">
              {s === 1 ? "Email" : s === 2 ? "OTP" : "Password"}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-2 ">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-2 ">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              required
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2 ">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
            />
            {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}

      {/* Back to Login Link */}
      <div className="text-center mt-4">
        <span
          onClick={onCancel}
          className="text-sm  cursor-pointer hover:underline text-orange-600  "
        >
          ← Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;











