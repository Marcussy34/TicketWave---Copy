import React, { useEffect } from "react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThirdwebProvider } from "thirdweb/react";
import Head from "next/head";
import InstallPWA from "../components/InstallPWA";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Check if current page is the landing page
  const isLandingPage = router.pathname === "/landingpage";

  return (
    <ThirdwebProvider
      cacheProvider={{
        type: "localStorage",
      }}
    >
      <Head>
        <title>TicketWave</title>
        <meta name="description" content="TicketWave" />
        <link rel="icon" href="/ticketwave.png" sizes="192x192" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TicketWave" />
      </Head>
      <NextUIProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {/* Only show Navbar if not on landing page */}
          {!isLandingPage && <Navbar />}

          <main className="flex-1">
            <Component {...pageProps} />
          </main>

          {/* Only show Footer if not on landing page */}
          {!isLandingPage && <Footer />}

          <InstallPWA />
        </div>
      </NextUIProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
