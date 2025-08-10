import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';


const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req) {

  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing token' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const body = await req.json();
    const bookData = {
      ...body,
      price: parseFloat(body.price)
    };

    const saved = await prisma.book.create({ data: bookData });
    return new Response('Created', { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}



export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = (searchParams.get("search") || "").trim();
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  try {
    const whereClause = search
      ? { bookName: { contains: search} }
      : {};

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: whereClause,
        orderBy: { createdAt: sortOrder},
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.book.count({ where: whereClause })
    ]);


    return Response.json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch books' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}