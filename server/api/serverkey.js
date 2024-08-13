import { myPost } from './_utils';
export function GET() {
  return Response.json(
    {
      key: 'BAL5QGuWfW9UWg9SuW-fOgAAz2Ek2053oMaT34e5o69mgiR3IBFEUK7ZG3cNsQ2HdNQ4RQnviTVPePyTTKa0csM',
    },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  );
}

export const POST = myPost((req, res) => {
  let ip = '';
  if (req.headers.get('x-forwarded-for')) {
    ip = req.headers.get('x-forwarded-for').split(/\s*,\s*/)[0];
  }
  if (ip == '::1' || ip == '::ffff:127.0.0.1') {
    ip = '127.0.0.1';
  }
  const { key } = req.contents;
  return res.json(
    { key: 'oooook ' + key, ip },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  );
});
