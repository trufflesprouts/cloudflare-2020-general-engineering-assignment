/**
 * Main router
 */
addEventListener('fetch', (event) => {
  event.respondWith(linksHandler())
})

/**
 * Handle /links route
 * Responds with a list of links in JSON format
 */
async function linksHandler() {
  const headers = { 'Content-Type': 'application/json' }
  const json = JSON.stringify(links)
  return new Response(json, { status: 200, headers })
}

/**
 * Data
 */
const links = [
  {
    name: 'A link to a list of cool projects I worked on',
    url: 'https://abe.pink/code',
  },
  {
    name: 'Résumé because this is my dream job',
    url: 'https://abe.pink/static/cv.pdf',
  },
  {
    name: 'A blog post I wrote on how to use AWS’ Face Recognition',
    url: 'https://abe.pink/words/node-user-login-with-aws-face-recognition',
  },
  {
    name: 'Cool cycling video',
    url:
      'https://www.youtube.com/watch?v=GZHVVDcL6Fg&list=LLfQLLACtKf2-Y48FcKnDn7Q&index=4&t=1s',
  },
]
