export async function onRequest(context) {
    // 1) URL から slug を取得
    const { slug } = context.params;
    if (!slug) {
      return new Response('Not Found', { status: 404 });
    }
  
    // 2) KV バインディングを env から呼び出し
    const kv = context.env.AFFILIATE_CLICKS;
  
    // 3) カウントアップ
    let count = await kv.get(slug) || "0";
    count = String(parseInt(count) + 1);
    await kv.put(slug, count);
  
    // 4) リダイレクト先 URL を取得
    const target = await kv.get(`${slug}:url`);
    if (!target) {
      return new Response('Redirect URL not set', { status: 500 });
    }
  
    // 5) 302 リダイレクト
    return Response.redirect(target, 302);
  }
  