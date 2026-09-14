export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    
    // 아이디: jane / 비밀번호: 2026
    if (user === 'jane' && pwd === '2026') {
      return; 
    }
  }
  return new Response('접근 권한이 없습니다.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}
