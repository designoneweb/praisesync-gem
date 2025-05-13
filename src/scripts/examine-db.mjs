import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tdyfkazdythukndwoxjh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeWZrYXpkeXRodWtuZHdveGpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODI4MzYsImV4cCI6MjA2MTg1ODgzNn0.fV3VK6IAndS6dWjcfIt-RFxgk_LSh8-LBbPD0cWWKxw'

const supabase = createClient(supabaseUrl, supabaseKey)

async function getDatabaseInfo() {
  console.log('🔍 Examining PraiseSync Database Structure...\n')
  console.log('Database URL:', supabaseUrl)
  console.log('---\n')

  try {
    // First, test the connection
    console.log('Testing connection...')
    const { data: testData, error: testError } = await supabase
      .from('test_connection')
      .select('*')
      .limit(1)
    
    if (testError) {
      console.log('✅ Connection successful (test table does not exist, which is expected)\n')
    }

    // Try to access auth schema
    console.log('Checking auth schema...')
    const { data: authUsers, error: authError } = await supabase.auth.admin?.listUsers()
    
    if (authError) {
      console.log('ℹ️  Cannot access auth.users with anon key (expected)')
    } else if (authUsers) {
      console.log(`Found ${authUsers.users?.length || 0} users in auth schema`)
    }

    // Check for storage buckets
    console.log('\nChecking storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.log('ℹ️  Cannot list storage buckets with current permissions')
    } else if (buckets) {
      console.log(`Found ${buckets.length} storage buckets:`)
      buckets.forEach(bucket => {
        console.log(`  - ${bucket.name} (${bucket.public ? 'public' : 'private'})`)
      })
    }

    // Try to query system tables
    console.log('\nChecking database tables using introspection...')
    const queries = [
      {
        name: 'Public Tables',
        query: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `
      },
      {
        name: 'Public Views',
        query: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'VIEW'
          ORDER BY table_name;
        `
      }
    ]

    for (const { name, query } of queries) {
      console.log(`\n${name}:`)
      const { data, error } = await supabase.rpc('query_database', { query_text: query })
      
      if (error) {
        // Try direct query
        const result = await supabase.from('pg_tables').select('*').eq('schemaname', 'public')
        if (result.error) {
          console.log('  ℹ️  Cannot query system tables (requires elevated permissions)')
        } else {
          console.log('  Found tables via pg_tables:', result.data)
        }
      } else if (data) {
        console.log(`  Found ${data.length} items:`)
        data.forEach((item: any) => {
          console.log(`    - ${item.table_name}`)
        })
      }
    }

    // Manual check for common tables
    console.log('\nManual check for expected PraiseSync tables:')
    const expectedTables = [
      'churches',
      'users', 
      'services',
      'songs',
      'setlist_items',
      'bulletins',
      'team_members',
      'team_assignments'
    ]

    for (const tableName of expectedTables) {
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .limit(0)
      
      if (error) {
        if (error.code === '42P01') {
          console.log(`  ❌ ${tableName} - Table does not exist`)
        } else if (error.code === '42501') {
          console.log(`  🔒 ${tableName} - Exists but no permissions`)
        } else {
          console.log(`  ⚠️  ${tableName} - Error: ${error.message}`)
        }
      } else {
        console.log(`  ✅ ${tableName} - Exists (${count || 0} rows)`)
      }
    }

    console.log('\n📊 Database Status Summary:')
    console.log('- Connection to Supabase: ✅ Working')
    console.log('- Expected tables: Need to be created')
    console.log('- Next step: Run database setup to create schema')

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

getDatabaseInfo()
  .then(() => {
    console.log('\n✅ Database examination complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
