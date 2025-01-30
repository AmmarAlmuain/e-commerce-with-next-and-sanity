// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { LRUCache } from "lru-cache";

// const RATE_LIMIT = 5;
// const TIME_WINDOW = 60 * 1000;

// const cache = new LRUCache<string, { count: number; lastAccess: number }>({
//   max: 500,
//   ttl: TIME_WINDOW,
// });

// export default function rate_limiter(req: NextRequest) {
//   if (!req || !req.headers || typeof req.headers.get !== "function") {
//     return new NextResponse("Invalid request object", { status: 400 });
//   }

//   const ip: string = req.headers.get("x-forwarded-for") || "unknown";

//   if (ip === "unknown") {
//     return new NextResponse("Unable to determine IP", { status: 400 });
//   }

//   const now = Date.now();
//   const record = cache.get(ip);

//   if (record) {
//     if (record.count >= RATE_LIMIT) {
//       return new NextResponse("Too many requests, please try again later.", {
//         status: 429,
//       });
//     }
//     cache.set(ip, { count: record.count + 1, lastAccess: now });
//   } else {
//     cache.set(ip, { count: 1, lastAccess: now });
//   }

//   return NextResponse.next();
// }
