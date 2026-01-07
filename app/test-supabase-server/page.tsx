
import { createClient } from "@/lib/supabase/server"

export default async function TestSupabaseServer() {
    const supabase = await createClient()
    const { data, error } = await supabase.from("properties").select("*").limit(1)

    return (
        <div className="p-10">
            <h1>Supabase Server Test</h1>
            <pre>Data: {JSON.stringify(data, null, 2)}</pre>
            <pre>Error: {JSON.stringify(error, null, 2)}</pre>
        </div>
    )
}
