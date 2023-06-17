import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "./components/Loader";
import Header from "./components/Header";
import ContactTop from "./components/ContactTop";
import Head from "next/head";
const profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session || (session && !session.user)) {
      router.push("/auth/signup");
    }
    if (session && session.user.email === "fayzullox512mi@gmail.com") {
      router.push("/admin");
    }
  }, []);
  if (session) {
    return (
      <div>
        <Head>
          <title>Profile</title>
        </Head>
        <ContactTop />
        <Header />
        {session.user.name}
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default profile;
