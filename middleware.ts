// import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/auth";
// import rate_limiter from "./middlewares/rate-limiter";

// export default auth((req) => {
//   // console.log("hi");
//   return NextResponse.next();
// });

export default function middleware(req: NextRequest) {
  // const user = jwt.verify(
  //   req.cookies.get("authjs.session-token")?.value as string,
  //   process.env.AUTH_SECRET as string
  // );
  // console.log(user);
  return NextResponse.next();
  // return rate_limiter(req);
}

// export const config = {
//   matcher: "/api/:path*",
// };
