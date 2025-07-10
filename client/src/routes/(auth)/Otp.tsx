import AppLogo from "@/components/AppLogo";

import { useForm } from "react-hook-form";
import { useApiMutation } from "@/hooks/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpForm } from "@/components/auth/forms/otp/otp-form-02";
import {
  otpSchema,
  type OtpSchemaType,
} from "@shared/schemas/auth/auth.schema";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const COOLDOWN_DURATION = 60;
const STORAGE_KEY = "otp_last_sent_at";

const Otp = () => {

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") ?? "";

  const [cooldown, setCooldown] = useState(0);

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
      email
    },
  });

  const { mutateAsync: sendOtp, isPending: isOtpPending } = useApiMutation(
    "POST",
    "/auth/send-otp",{
      onError: (err) => {
         toast.error(err.response?.data.message)
      }
    }
  );

  const { mutateAsync: verifyEmail, isPending: isOtpverifying } = useApiMutation(
    "PUT",
    "/auth/validate-otp",{
      onError: (err) => {
        toast.error(err.response?.data.message)
      },
      onSuccess: () => {
        navigate('/login')
      }
    }
  );

  const handleSubmit = useCallback(
    (data: OtpSchemaType) => {
      verifyEmail(data);
    },
    [verifyEmail]
  );

  const resendOtp = useCallback(async () => {
    await sendOtp({ email });

    if (cooldown > 0) return;

    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, now.toString());
    setCooldown(COOLDOWN_DURATION);
  }, [cooldown]);

  useEffect(() => {
    const lastSent = localStorage.getItem(STORAGE_KEY);
    if (lastSent) {
      const secondsPassed = Math.floor(
        (Date.now() - parseInt(lastSent, 10)) / 1000
      );
      const remaining = COOLDOWN_DURATION - secondsPassed;
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  return (
    <div>
      <div className="hidden lg:flex p-5 absolute">
        <AppLogo />
      </div>
      <OtpForm
        cooldown={cooldown}
        otpForm={otpForm}
        isOtpverifying={isOtpverifying}
        isOtpPending={isOtpPending}
        resendOtp={resendOtp}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Otp;
