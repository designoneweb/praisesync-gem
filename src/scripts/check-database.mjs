import { createClient } from '@supabase/supabase-js'

// We'll use direct environment variables since this is a one-time script
const supabaseUrl = 'https://tdyfkazdythukndwoxjh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeWZrYXpkeXRodWtuZHdveGpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODI4MzYsImV4cCI6MjA2MTg1ODgzNn0.fV3VK6IAndS6dWjcfIt-RFxgk_LSh8-LBbPD0cWWKxw'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDatabase() {
  console.log('🔍 Checking PraiseSync Database...\n')
  
  // List of expected tables based on our spec
  const expectedTables = [
    'churches',
    'users',
    'services',
    'setlist_items',
    'bulletins',
    'songs',
    'team_members',
    'team_assignments'
  ]
  
  console.log('Checking for existing tables...')
  
  for (const tableName of expectedTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1)
      
      if (error) {
        if (error.message.includes('does not exist')) {
          console.log(`❌ Table '${tableName}' - Not found`)
        } else if (error.message.includes('permission denied')) {
          console.log(`🔒 Table '${tableName}' - Exists but no permissions`)
        } else {
          console.log(`⚠️  Table '${tableName}' - Error: ${error.message}`)
        }
      } else {
        console.log(`✅ Table '${tableName}' - Exists and accessible`)
      }
    } catch (e) {
      console.log(`❌ Table '${tableName}' - Unexpected error:`, e)
    }
  }
  
  console.log('\n📊 Summary:')
  console.log('If all tables show "Not found", the database is empty and ready for setup.')
  console.log('If any tables exist, we should examine their structure before making changes.')
}

checkDatabase()
  .then(() => {
    console.log('\n✅ Database check complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
