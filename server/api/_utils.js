export function parse(request) {
  const reader = request.body.getReader();

  const decoder = new TextDecoder();
  let res = '';

  return reader.read().then(function processText({ done, value }) {
    if (done) {
      return JSON.parse(res);
    }
    res += decoder.decode(value);
    return reader.read().then(processText);
  });
}

export function myPost(func) {
  return function POST(request) {
    return parse(request).then((req) => {
      request.contents = req;
      return func(request, Response);
    });
  };
}
