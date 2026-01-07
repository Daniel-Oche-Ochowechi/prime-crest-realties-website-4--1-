
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

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
    console.log("📦 Setting up Supabase Storage...")

    const bucketName = "properties"

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
        console.error("❌ Error listing buckets:", listError)
        return
    }

    const bucketExists = buckets.find((b) => b.name === bucketName)

    if (bucketExists) {
        console.log(`✅ Bucket '${bucketName}' already exists`)
    } else {
        console.log(`📝 Creating bucket '${bucketName}'...`)
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
        })

        if (createError) {
            console.error(`❌ Error creating bucket '${bucketName}':`, createError)
            return
        }
        console.log(`✅ Bucket '${bucketName}' created successfully`)
    }

    // Since we are using Service Key, we bypass RLS, so simple public buckets usually work.
    // However, for user uploads via client, we might need policies. 
    // BUT policy management via API is limited. 
    // Standard Supabase pattern: Public buckets are readable.
    // We need to ensure logic allows uploads. 
    // The previous migration fix-rls.sql or similar usually handles storage.objects policies if needed.
    // By default, public buckets allow public reads. Uploads depend on 'storage.objects' RLS.

    // We can't easily script RLS policies for storage via JS Client without running SQL.
    // So we will assume the User/Admin is authenticated or we are using a workaround.
    // Actually, let's create a SQL script to set storage policies properly.

    console.log("⚠️  Note: Ensure 'storage' schema has RLS policies allowing uploads for authenticated users.")
}

setupStorage()
