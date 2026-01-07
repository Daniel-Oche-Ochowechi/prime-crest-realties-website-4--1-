import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// Load env vars manually
try {
    const envPath = path.resolve(process.cwd(), ".env.local")
    if (fs.existsSync(envPath)) {
        const envFile = fs.readFileSync(envPath, "utf8")
        envFile.split("\n").forEach((line) => {
            const [key, value] = line.split("=")
            if (key && value) {
                process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, "")
            }
        })
    }
} catch (error) {
    console.warn("⚠️  Could not load .env.local file")
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
    process.exit(1)
}

// Note: Supabase JS client doesn't support running raw SQL directly via the client API 
// unless we use the rpc() interface and have a function for it, OR we use the postgres connection directly.
// Since we don't have direct postgres access info in .env usually (only URL/Key), 
// and we can't assume a 'exec_sql' RPC function exists.

// HOWEVER, for this environment, often the user might have postgres details. 
// But `package.json` suggests `pg` is not installed.

// ALTERNATIVE: checking if there is an existing method or if I should just use the `supabase` CLI if available?
// The user doesn't have CLI setup guaranteed.

// Wait, investigating existing scripts might reveal how they intended to run SQL.
// `scripts/001_create_tables.sql` exists.
// Codebase usually doesn't have a way to run these without direct DB access.
// BUT, `convex` was used before.

// Workaround: I will try to use the `pg` library if I can install it, but I need the connection string.
// Usually `DATABASE_URL` is in .env. Let's assume DATABASE_URL exists or can be constructed.
// Supabase DB URL format: postgres://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

// If I can't run SQL, I can't fix the missing tables efficiently without asking the user to run SQL in Supabase Dashboard.
// I will check if `DATABASE_URL` is in .env (I can't see .env, but I can check if code references it).

// Strategy change: I will notify the user that they must run the SQL in their dashboard SQL Editor,
// OR I can *try* to create a helper RPC function if one existed? No.

// Actually, `supabase-js` CANNOT run raw SQL.
// I will check if there is a `postgres` javascript dependency in the project?
// `package.json` did NOT have `pg`.

// I will try to install `pg` and use it.
// I'll check if `DATABASE_URL` is typically available.

// Let's first check if I can just assume the user can run `npm install pg`.
// I'll write the script to use `pg`, install `pg`, and try to connect using `process.env.DATABASE_URL` or `process.env.POSTGRES_URL`.

import { Client } from "pg"

async function runMigrations() {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    if (!connectionString) {
        console.error("❌ Missing DATABASE_URL or POSTGRES_URL environment variable.")
        console.error("Please add your Supabase connection string to .env.local")
        console.error("Format: postgres://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres")
        process.exit(1)
    }

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }, // Supabase needs this often
    })

    try {
        await client.connect()
        console.log("✅ Connected to database")

        const migrationFiles = [
            // "scripts/001_create_tables.sql",
            // "scripts/04-create-user-profiles-and-featured.sql",
            // "scripts/05-fix-rls.sql",
            // "scripts/06-create-settings.sql",
            // "scripts/07-relax-settings-rls.sql",
            // "scripts/08-setup-storage-policies.sql",
            // "scripts/09-fix-everything.sql",
            // "scripts/10-smart-rls-fix.sql",
            "scripts/11-final-fix-rls.sql",
        ]

        for (const file of migrationFiles) {
            console.log(`📂 Applying ${file}...`)
            const sql = fs.readFileSync(path.resolve(process.cwd(), file), "utf8")
            await client.query(sql)
            console.log(`✅ Applied ${file}`)
        }

        console.log("🎉 All migrations applied successfully!")
    } catch (err) {
        console.error("❌ Migration failed:", err)
        process.exit(1)
    } finally {
        await client.end()
    }
}

runMigrations()
