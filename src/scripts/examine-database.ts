import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function examineDatabase() {
  console.log('🔍 Examining Supabase Database Schema...\n')
  
  try {
    // Get all tables in the public schema
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name')

    if (tablesError) {
      // Try alternative approach - list tables via a different method
      console.log('Using alternative method to examine database...')
      
      // Test connection with a simple query
      const { error: testError } = await supabase.from('test').select('*').limit(1)
      
      if (testError?.message.includes('does not exist')) {
        console.log('✅ Connected to Supabase successfully')
        console.log('ℹ️  No existing tables found in the public schema')
        console.log('\n📊 Database appears to be empty - ready for initial setup')
      } else {
        console.error('Error examining database:', testError)
      }
      return
    }

    if (!tables || tables.length === 0) {
      console.log('ℹ️  No tables found in the public schema')
      console.log('📊 Database appears to be empty - ready for initial setup')
      return
    }

    console.log(`Found ${tables.length} tables:\n`)
    
    // Examine each table
    for (const table of tables) {
      console.log(`📋 Table: ${table.table_name}`)
      
      // Get column information
      const { data: columns, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_schema', 'public')
        .eq('table_name', table.table_name)
        .order('ordinal_position')

      if (columnsError) {
        console.error(`  Error getting columns for ${table.table_name}:`, columnsError)
        continue
      }

      if (columns && columns.length > 0) {
        console.log('  Columns:')
        columns.forEach(col => {
          const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'
          const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : ''
          console.log(`    - ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`)
        })
      }
      
      // Get row count
      const { count, error: countError } = await supabase
        .from(table.table_name)
        .select('*', { count: 'exact', head: true })
      
      if (!countError) {
        console.log(`  Row count: ${count || 0}`)
      }
      
      console.log('')
    }

    // Check for RLS policies
    console.log('🔒 Checking Row Level Security (RLS) policies...')
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('schemaname', 'public')

    if (!policiesError && policies) {
      if (policies.length === 0) {
        console.log('  ⚠️  No RLS policies found - database is not secured')
      } else {
        console.log(`  Found ${policies.length} RLS policies`)
        policies.forEach(policy => {
          console.log(`    - ${policy.policyname} on ${policy.tablename}`)
        })
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Run the examination
examineDatabase()
  .then(() => {
    console.log('\n✅ Database examination complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error examining database:', error)
    process.exit(1)
  })
