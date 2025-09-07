import { NextRequest, NextResponse } from 'next/server'

// Static export configuration
export const dynamic = 'force-static'

// Mock posts data
const posts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful React framework that provides many features out of the box...',
    author: 'John Doe',
    category: 'Tutorial',
    tags: ['nextjs', 'react', 'web-development'],
    publishedAt: '2024-01-15T10:00:00Z',
    views: 1245,
    likes: 89
  },
  {
    id: 2,
    title: 'Understanding React Hooks',
    content: 'React Hooks revolutionized how we write React components...',
    author: 'Jane Smith',
    category: 'Guide',
    tags: ['react', 'hooks', 'javascript'],
    publishedAt: '2024-01-12T14:30:00Z',
    views: 892,
    likes: 67
  },
  {
    id: 3,
    title: 'Advanced TypeScript Patterns',
    content: 'TypeScript provides powerful type system features that can help you write better code...',
    author: 'Bob Wilson',
    category: 'Advanced',
    tags: ['typescript', 'patterns', 'programming'],
    publishedAt: '2024-01-10T09:15:00Z',
    views: 634,
    likes: 45
  },
  {
    id: 4,
    title: 'Building RESTful APIs',
    content: 'Learn how to build robust and scalable REST APIs with proper error handling...',
    author: 'Alice Johnson',
    category: 'Backend',
    tags: ['api', 'rest', 'backend'],
    publishedAt: '2024-01-08T16:45:00Z',
    views: 987,
    likes: 78
  }
]

// GET /api/posts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const author = searchParams.get('author')
  const tag = searchParams.get('tag')
  const limit = searchParams.get('limit')
  const sort = searchParams.get('sort') || 'publishedAt'
  const order = searchParams.get('order') || 'desc'

  let filteredPosts = [...posts]

  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter by author
  if (author) {
    filteredPosts = filteredPosts.filter(post => 
      post.author.toLowerCase().includes(author.toLowerCase())
    )
  }

  // Filter by tag
  if (tag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    )
  }

  // Sort posts
  filteredPosts.sort((a, b) => {
    let aValue, bValue

    switch (sort) {
      case 'title':
        aValue = a.title
        bValue = b.title
        break
      case 'author':
        aValue = a.author
        bValue = b.author
        break
      case 'views':
        aValue = a.views
        bValue = b.views
        break
      case 'likes':
        aValue = a.likes
        bValue = b.likes
        break
      case 'publishedAt':
      default:
        aValue = new Date(a.publishedAt)
        bValue = new Date(b.publishedAt)
        break
    }

    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  // Limit results
  if (limit) {
    const limitNum = parseInt(limit)
    filteredPosts = filteredPosts.slice(0, limitNum)
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))

  // Get unique categories and tags for metadata
  const categories = [...new Set(posts.map(post => post.category))]
  const tags = [...new Set(posts.flatMap(post => post.tags))]
  const authors = [...new Set(posts.map(post => post.author))]

  return NextResponse.json({
    success: true,
    data: filteredPosts,
    total: filteredPosts.length,
    totalPosts: posts.length,
    metadata: {
      categories,
      tags,
      authors,
      availableSort: ['publishedAt', 'title', 'author', 'views', 'likes'],
      availableOrder: ['asc', 'desc']
    },
    timestamp: new Date().toISOString()
  })
}

// POST /api/posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, author, category = 'General', tags = [] } = body

    // Validation
    if (!title || !content || !author) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Title, content, and author are required',
          details: {
            title: !title ? 'Title is required' : null,
            content: !content ? 'Content is required' : null,
            author: !author ? 'Author is required' : null
          }
        },
        { status: 400 }
      )
    }

    // Create new post
    const newPost = {
      id: Math.max(...posts.map(p => p.id)) + 1,
      title,
      content,
      author,
      category,
      tags: Array.isArray(tags) ? tags : [tags],
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0
    }

    posts.unshift(newPost) // Add to beginning

    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Post created successfully'
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}

// PUT /api/posts
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, category, tags } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const postIndex = posts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // Update post
    const post = posts[postIndex]
    if (title) post.title = title
    if (content) post.content = content
    if (category) post.category = category
    if (tags) post.tags = Array.isArray(tags) ? tags : [tags]

    return NextResponse.json({
      success: true,
      data: post,
      message: 'Post updated successfully'
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}

// DELETE /api/posts
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Post ID is required' },
      { status: 400 }
    )
  }

  const postIndex = posts.findIndex(post => post.id === parseInt(id))
  if (postIndex === -1) {
    return NextResponse.json(
      { success: false, error: 'Post not found' },
      { status: 404 }
    )
  }

  const deletedPost = posts.splice(postIndex, 1)[0]

  return NextResponse.json({
    success: true,
    data: deletedPost,
    message: 'Post deleted successfully'
  })
}
