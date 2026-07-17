# FPT TELECOM PROJECT RULES

## 🛑 CRITICAL CONSTRAINTS

1. **Security**:
   - NEVER commit `.env` or files containing secrets.
   - Always check `.gitignore` before suggesting git commands.
2. **Data Consistency**:
   - Prisma Schema is the Source of Truth.
   - Frontend (React Hook Form) and Backend (Zod) MUST use the exact same field names as Prisma (e.g., `fullName`, `service`).
   - No local Zod schemas in API routes; always import from `src/lib/validations/`.
3. **Serverless Architecture**:
   - NEVER use in-memory variables (Map, Set, global let) for rate limiting or caching on Vercel. Use Redis (@upstash).
4. **Assets**:
   - No Unsplash/W3Schools placeholders in production code. Use Env Vars or CMS.
