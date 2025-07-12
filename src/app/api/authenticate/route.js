export async function POST(req) {
  const body = await req.json();
  const userInfo = {
    jwt: body.token, // fake token return for simplicity
  };
  return new Response(JSON.stringify(userInfo), { status: 200 });
}