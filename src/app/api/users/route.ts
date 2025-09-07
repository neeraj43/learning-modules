import { NextRequest, NextResponse } from 'next/server'

// Mock user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user' },
  { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'moderator' }
]

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const role = searchParams.get('role')
  const limit = searchParams.get('limit')

  let filteredUsers = users

  // Filter by role if provided
  if (role) {
    filteredUsers = users.filter(user => user.role === role)
  }

  // Limit results if provided
  if (limit) {
    const limitNum = parseInt(limit)
    filteredUsers = filteredUsers.slice(0, limitNum)
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    data: filteredUsers,
    total: filteredUsers.length,
    timestamp: new Date().toISOString()
  })
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role = 'user' } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    if (users.find(user => user.email === email)) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      role
    }

    users.push(newUser)

    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}

// PUT /api/users
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, role } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user
    if (name) users[userIndex].name = name
    if (email) users[userIndex].email = email
    if (role) users[userIndex].role = role

    return NextResponse.json({
      success: true,
      data: users[userIndex],
      message: 'User updated successfully'
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}

// DELETE /api/users
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'User ID is required' },
      { status: 400 }
    )
  }

  const userIndex = users.findIndex(user => user.id === parseInt(id))
  if (userIndex === -1) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    )
  }

  const deletedUser = users.splice(userIndex, 1)[0]

  return NextResponse.json({
    success: true,
    data: deletedUser,
    message: 'User deleted successfully'
  })
}
