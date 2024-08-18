let controller = null;
input.oninput = async () => {
  controller && controller.abort();
  controller = new AbortController()
  try {
    const list = await fetch(
      'http://localhost:9523/api/search?key=' + input.value, {
        signal: controller.signal
      }
    ).then((resp) => resp.json())
  }catch {
    console.log('abort error')
  }
}