import { Client } from "pg"
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

async function runFix() {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    if (!connectionString) {
        console.error("❌ Missing DATABASE_URL or POSTGRES_URL environment variable.")
        console.error("Please add your Supabase connection string to .env.local")
        process.exit(1)
    }

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
    })

    try {
        await client.connect()
        console.log("✅ Connected to database")

        const file = "scripts/11-final-fix-rls.sql"
        console.log(`📂 Applying ${file}...`)
        const sql = fs.readFileSync(path.resolve(process.cwd(), file), "utf8")
        await client.query(sql)
        console.log(`✅ Applied ${file}`)

        console.log("🎉 RLS Fix applied successfully!")
    } catch (err) {
        console.error("❌ Fix failed:", err)
        process.exit(1)
    } finally {
        await client.end()
    }
}

runFix()
