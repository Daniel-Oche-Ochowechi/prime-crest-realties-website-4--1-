// Simple script to run Convex database seeding
// This script provides instructions for seeding the database via Convex dashboard

console.log(`
==========================================
PrimeCrest Realties - Database Seeding
==========================================

To seed your database with properties:

1. Go to your Convex dashboard: https://dashboard.convex.dev
2. Navigate to your project
3. Go to the "Functions" tab
4. Find the "seed.seedProperties" function
5. Click "Run" to execute the seeding

Alternatively, you can use the Convex CLI:
$ npx convex run seed:seedProperties

To clear all properties:
$ npx convex run seed:clearProperties

To reseed (clear + seed fresh):
$ npx convex run seed:reseedDatabase

==========================================
`)

export {}
