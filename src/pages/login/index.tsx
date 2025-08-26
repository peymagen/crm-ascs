import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Div from "../../components/Div";
import { useLoginUserMutation } from "../../store/services/user.api";
import { toast } from "react-toastify";
import { setTokens } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useGetSettingByIdQuery } from "../../store/services/setting.api";

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
  const { data, isLoading: seetingLoading } = useGetSettingByIdQuery(1);

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

        if (!accessToken) {
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

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <h1 className={styles.collegeName}>{"welcome"}</h1>
            <p className={styles.portalTitle}>{data?.data?.name}</p>
          </div>
          <div className={styles.imageContainer}>
            {!seetingLoading && (
              <img
                src={import.meta.env.VITE_BACKEND_SERVER + data?.data?.logo}
                alt="Logo"
                className={styles.heroImage}
              />
            )}
          </div>
        </div>

        <div className={styles.rightSection}>
          <AnimatePresence mode="wait">
            {!showForgotPassword ? (
              <Div key="login" direction="bottom" immediate>
                <h1 className={styles.title}>Admin Portal</h1>
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
                  {/* <Button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    buttonType="link"
                    title="Forget Password?"
                  /> */}

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    buttonType="primaryFill"
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
                        buttonType="primaryFill"
                        title="Send Reset Link"
                      />
                    </motion.div>
                  </form>
                ) : (
                  <Button
                    type="button"
                    buttonType="primaryFill"
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
    </>
  );
};

export default Login;
