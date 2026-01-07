import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export default async function DebugDBPage() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
        return (
            <div className="p-10 text-red-500">
                <h1 className="text-2xl font-bold">Configuration Error</h1>
                <p>Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.</p>
            </div>
        )
    }

    // Create absolute admin client (Bypasses RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // Fetch properties (Admin view)
    const { data: properties, error } = await supabaseAdmin.from("properties").select("*")

    return (
        <div className="p-10 max-w-4xl mx-auto font-mono">
            <h1 className="text-3xl font-bold mb-6">Database Debugger (Admin View)</h1>

            <div className="mb-8 p-4 bg-gray-100 rounded border">
                <h2 className="font-bold mb-2">Connection Status</h2>
                <p>URL: {supabaseUrl ? "✅ Found" : "❌ Missing"}</p>
                <p>Service Key: {supabaseServiceKey ? "✅ Found (Length: " + supabaseServiceKey.length + ")" : "❌ Missing"}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Properties Table (Raw Data)</h2>

                {error ? (
                    <div className="bg-red-50 p-4 border border-red-200 text-red-700 rounded">
                        <strong>Error Querying DB:</strong> {error.message} (Code: {error.code})
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-green-50 p-4 border border-green-200 text-green-700 rounded flex justify-between items-center">
                            <span><strong>Total Records Found:</strong> {properties?.length || 0}</span>
                            <span className="text-sm">(If &gt; 0, Data exists. If 0, Feed script failed.)</span>
                        </div>

                        {properties && properties.length > 0 ? (
                            <div className="grid gap-4">
                                {properties.map((prop) => (
                                    <div key={prop.id} className="border p-4 rounded bg-white shadow-sm text-sm">
                                        <p><strong>ID:</strong> {prop.id}</p>
                                        <p><strong>Title:</strong> {prop.title}</p>
                                        <p><strong>Price:</strong> {prop.price}</p>
                                        <p><strong>Status:</strong> {prop.status}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">Table is essentially empty.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-10 p-4 border-t text-sm text-gray-500">
                <p>
                    <strong>Diagnosis:</strong><br />
                    - If you see properties here but NOT on the website: <strong>RLS (Permission) Issue.</strong><br />
                    - If you see 0 properties here: <strong>Data Missing (Run Seed Script again).</strong>
                </p>
            </div>
        </div>
    )
}
