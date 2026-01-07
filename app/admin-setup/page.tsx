import { Shield } from "lucide-react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export const metadata = {
  title: "Admin Setup - PrimeCrest Realties",
  description: "Administrator setup instructions",
}

export default function AdminSetupPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 min-h-screen bg-secondary">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/10 p-4 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Admin Portal Setup</h1>
                <p className="text-neutral-gray">PrimeCrest Realties</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">How to Create an Admin Account</h2>
                <p className="text-neutral-gray mb-6">
                  The PrimeCrest Realties admin portal is restricted to administrators only. Follow these steps to
                  create an admin account:
                </p>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-2">Go to Supabase Dashboard</h3>
                      <p className="text-neutral-gray">
                        Log in to your Supabase project dashboard and navigate to the Authentication section.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-2">Create a New User</h3>
                      <p className="text-neutral-gray">
                        Click "Create new user" and enter the admin email and password. You can use any valid email
                        address.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-2">Create User Profile</h3>
                      <p className="text-neutral-gray mb-4">
                        After creating the user, go to the user_profiles table in the SQL editor and insert a profile
                        record with:
                      </p>
                      <div className="bg-neutral-light p-4 rounded-lg font-mono text-sm text-neutral-gray overflow-x-auto">
                        <pre>{`INSERT INTO user_profiles (
  id,
  email,
  full_name,
  role,
  status,
  created_at
) VALUES (
  '[USER_ID]',
  'admin@example.com',
  'Admin Name',
  'admin',
  'active',
  now()
);`}</pre>
                      </div>
                      <p className="text-neutral-gray text-sm mt-4">
                        Replace [USER_ID] with the user ID from Supabase authentication, and update email/name as
                        needed.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-2">Access Admin Portal</h3>
                      <p className="text-neutral-gray">
                        Once the user profile is created with role "admin", you can log in at{" "}
                        <span className="font-semibold text-primary">/admin/login</span> using your email and password.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">Environment Variables</h2>
                <p className="text-neutral-gray mb-6">
                  Make sure these environment variables are set in your deployment platform (Vercel, etc.):
                </p>
                <div className="bg-neutral-light p-4 rounded-lg font-mono text-sm text-neutral-gray overflow-x-auto space-y-2">
                  <div>NEXT_PUBLIC_SUPABASE_URL = your_supabase_url</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key</div>
                </div>
                <p className="text-neutral-gray text-sm mt-4">
                  Get these values from your Supabase project settings → API section.
                </p>
              </section>

              {/* Important Note */}
              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded">
                <h3 className="font-bold text-accent mb-2">Important</h3>
                <ul className="text-sm text-neutral-gray space-y-2">
                  <li>✓ Only users with role "admin" can access the admin dashboard</li>
                  <li>✓ The user_id from Supabase must match the id in user_profiles</li>
                  <li>✓ Public signup and login are disabled for security</li>
                  <li>✓ All admin users must be created via Supabase dashboard</li>
                  <li>✓ Check diagnostics page if login doesn't work</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                <a
                  href="/admin-diagnostics"
                  className="px-12 py-4 bg-primary text-white font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  Run Diagnostics
                </a>
                <a
                  href="/admin/login"
                  className="px-12 py-4 bg-accent text-primary font-bold uppercase tracking-wider rounded-lg hover:bg-accent/90 transition-colors text-center"
                >
                  Go to Admin Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
