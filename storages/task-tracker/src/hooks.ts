
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  // if (event.request.url.endsWith('/sendInfo')) {
    
  //   const body = await response.text();
  //   console.log(body)
  //   const res = await fetch("http://localhost:3000" + "/api/endpoint.json", {
  //     method: 'POST',
  //     body: "",
  //   });
    
  // }
  
  return response;
}