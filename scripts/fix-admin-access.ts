
import { Client } from "pg"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"

// Load env vars
try {
    const envPath = path.resolve(process.cwd(), ".env.local")
    const envFile = fs.readFileSync(envPath, "utf8")
    envFile.split("\n").forEach((line) => {
        const [key, value] = line.split("=")
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, "")
        }
    })
} catch (e) {
    console.warn("Could not load .env.local")
}

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

if (!connectionString) {
    console.error("❌ Missing DATABASE_URL/POSTGRES_URL")
    process.exit(1)
}

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
})

async function run() {
    try {
        await client.connect()
        console.log("✅ Connected to DB")

        const sql = `
        -- SETTINGS
        ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Public settings access" ON settings;
        CREATE POLICY "Public settings access" ON settings FOR ALL TO public USING (true) WITH CHECK (true);

        -- PROPERTIES
        ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Public properties access" ON properties;
        CREATE POLICY "Public properties access" ON properties FOR ALL TO public USING (true) WITH CHECK (true);

        -- STORAGE
        ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Public storage access" ON storage.objects;
        CREATE POLICY "Public storage access" ON storage.objects FOR ALL TO public USING (true) WITH CHECK (true);
        
        -- Fix owner if needed (optional)
        -- GRANT ALL ON settings TO service_role;
        -- GRANT ALL ON properties TO service_role;
        `

        await client.query(sql)
        console.log("✅ Successfully reapplied all RLS policies (Permissive Mode)")

    } catch (err) {
        console.error("❌ Error applying policies:", err)
    } finally {
        await client.end()
    }
}

run()
