"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function TestSupabase() {
    const [status, setStatus] = useState("Loading...")
    const [config, setConfig] = useState<any>({})
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        async function test() {
            try {
                const url = process.env.NEXT_PUBLIC_SUPABASE_URL
                const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

                setConfig({
                    urlExists: !!url,
                    urlLength: url?.length,
                    keyExists: !!key,
                    keyLength: key?.length
                })

                if (!url || !key) {
                    setStatus("Missing Config")
                    return
                }

                const supabase = createClient()

                const promise = supabase.from("properties").select("*").limit(1)

                // Timeout after 3 seconds
                const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))

                const result: any = await Promise.race([promise, timeout])

                const { data, error } = result
                if (error) {
                    setStatus("Error")
                    setError(error)
                } else {
                    setStatus("Success")
                    setData(data)
                }
            } catch (e: any) {
                setStatus("Exception: " + e.message)
                setError(e)
            }
        }
        test()
    }, [])

    return (
        <div className="p-10">
            <h1>Supabase Client Test V2</h1>
            <p>Status: {status}</p>
            <pre>Config: {JSON.stringify(config, null, 2)}</pre>
            <pre>Result: {JSON.stringify({ data, error }, null, 2)}</pre>
        </div>
    )
}
