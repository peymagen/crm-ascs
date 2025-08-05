import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.css";
import logo from "../../assets/images/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Div from "../../components/Div";
import { useLoginUserMutation } from "../../store/services/user.api";
import { toast } from "react-toastify";
import { setTokens } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ILoginFormInputs) => {
    setIsLoading(true);
    // Simulate API call
    try {
      console.log("Attempting to login with data:", data);
      const response = (await loginUser(data).unwrap()) as unknown as IResponse;
      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data;

        if (!accessToken || !refreshToken) {
          toast.error("Missing tokens in response");
          setIsLoading(false);
          return;
        }

        toast.success(response.message);
        dispatch(
          setTokens({
            accessToken,
            refreshToken,
            user: user ?? {},
          })
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
    setIsLoading(false);
  };

  const handleForgotPassword = (data: ILoginFormInputs) => {
    setIsLoading(true);
    console.log(data);
    // Simulate password reset API call
    //loginUser(data).unwrap()
    setTimeout(() => {
      setIsLoading(false);
      setResetEmailSent(true);
    }, 1500);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // optional if you want to persist
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <h1 className={styles.collegeName}>{t("welcome")}</h1>
          <p className={styles.portalTitle}>Placement Portal</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={logo}
            alt="National Fire Service College"
            className={styles.heroImage}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <AnimatePresence mode="wait">
          {!showForgotPassword ? (
            <Div key="login" direction="bottom" immediate>
              <h1 className={styles.title}>NFSC Placement Portal</h1>
              <p className={styles.subtitle}>Sign in to your account</p>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  errors={errors}
                  required
                />
                <Button
                  type="button"
                  onClick={() => changeLanguage("en")}
                  buttonType="link"
                  title="Forget Password?"
                />

                <Button
                  type="button"
                  isLoading={isLoading}
                  onClick={() => changeLanguage("hi")}
                  buttonType="primary"
                  title="Sign In"
                />
              </form>
            </Div>
          ) : (
            <Div key="forgot-password" direction="bottom" immediate>
              <h1 className={styles.title}>Reset Password</h1>
              <p className={styles.subtitle}>
                {resetEmailSent
                  ? "We've sent a password reset link to your email."
                  : "Enter your registered email to receive a reset link"}
              </p>

              {!resetEmailSent ? (
                <form
                  onSubmit={handleSubmit(handleForgotPassword)}
                  className={styles.form}
                >
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    register={register}
                    errors={errors}
                    required
                  />

                  <motion.div
                    className={styles.buttonGroup}
                    variants={itemVariants}
                  >
                    <Button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      isLoading={isLoading}
                      buttonType="secondary"
                      title="Back to Login"
                    />

                    <Button
                      type="submit"
                      isLoading={isLoading}
                      buttonType="primary"
                      title="Send Reset Link"
                    />
                  </motion.div>
                </form>
              ) : (
                <Button
                  type="button"
                  buttonType="primary"
                  title="Return to Login"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                  }}
                />
              )}
            </Div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
