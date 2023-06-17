import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "../../styles/pak.module.css";
import Head from "next/head";
const Signup = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const navigateToProfile = () => {
    router.push("/profile");
  };
  console.log(session);
  useEffect(() => {
    if (session && session.user) {
      navigateToProfile();
    }
  });
  console.log();
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className={styles.signup}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias,
          neque.
        </p>
        <button onClick={() => signIn('google')}>Sign up</button>
      </div>
    </>
  );
};

export default Signup;
