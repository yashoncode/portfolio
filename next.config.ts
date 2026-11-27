import type { NextConfig } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Fingerprint of the resume PDF, appended to its link so browsers never serve a stale copy.
const cvVersion = createHash("md5").update(readFileSync("public/Yashwanth-D-Resume.pdf")).digest("hex").slice(0, 8);

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_CV_VERSION: cvVersion },
};

export default nextConfig;
