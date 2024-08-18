async function getResponse() {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      content: '讲过故事'
    }),
  })
  // const msg = await resp.text();
  // console.log(msg);
  const reader = resp.body.getReader();
  // const {done, value} = await.reader.read()
  const textDecoder = new TextDecoder()
  while(1) {
    const {done, value} = await.reader.read()
    if(done) {
      break
    }
    const str = textDecoder.decode(value)
    console.log(str)
  }
}