"use client";

// import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    // Sentry.captureException(error);
    // console.log('错误信息===>>>', error);
  }, [error]);

  return (
    <html>
      <body>
        这是错误页面~~ <Error />
      </body>
    </html>
  );
}