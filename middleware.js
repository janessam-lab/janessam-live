export default function middleware(req) {
  try {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      if (authValue) {
        const decoded = atob(authValue);
        const [user, pwd] = decoded.split(':');
        
        // 아이디: jane / 비밀번호: 2026
        if (user === 'jane' && pwd === '2026') {
          return;
        }
      }
    }
  } catch (err) {
    // 디코딩 에러 시 튕김 방지
  }

  return new Response('접근 권한이 없습니다.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
