/**
 * Main router
 */
addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('/links')) event.respondWith(linksHandler())
  else event.respondWith(htmlRewriterHandler())
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
 * Handle every route other than /links
 * Responds with an HTML page
 */
async function htmlRewriterHandler() {
  const res = await fetch('https://static-links-page.signalnerve.workers.dev')
  return await transformer.transform(res)
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

const social = [
  {
    name: 'Projects',
    url: 'https://abe.pink/code',
    svg: 'https://simpleicons.org/icons/javascript.svg',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/abe.baali/',
    svg: 'https://simpleicons.org/icons/instagram.svg',
  },
  {
    name: 'Github',
    url: 'https://github.com/trufflesprouts/',
    svg: 'https://simpleicons.org/icons/github.svg',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/abe-baali/',
    svg: 'https://simpleicons.org/icons/linkedin.svg',
  },
  {
    name: 'Unsplash',
    url: 'https://unsplash.com/@abe_baali',
    svg: 'https://simpleicons.org/icons/unsplash.svg',
  },
]

/**
 * Transformers
 */

// Changes page title.
class TitleTransformer {
  async element(element) {
    element.setInnerContent("Abe Baali's Wonderful Page")
  }
}

// Displays the profile element.
class ProfileTransformer {
  async element(element) {
    element.removeAttribute('style')
  }
}

// Sets the avatar picture.
class AvatarTransformer {
  async element(element) {
    element.setAttribute(
      'src',
      'https://avatars1.githubusercontent.com/u/22350261?s=460&u=ea0d1a44504af6ca3bf1693ec08e3b3dad44625e&v=4',
    )
  }
}

// Changes name.
class NameTransformer {
  async element(element) {
    element.setInnerContent('Abe "Hire Me" Baali')
  }
}

// Adds links.
class LinksTransformer {
  async element(element) {
    const listitems = links
      .map(
        (link) =>
          `<a href=${link.url} target="_blank" rel="noopener noreferrer">${link.name}</a>`,
      )
      .join('')
    element.setInnerContent(listitems, { html: true })
  }
}

// Adds social links.
class SocialTransformer {
  async element(element) {
    element.removeAttribute('style')
    const socialitems = social
      .map(
        (link) =>
          `<a href=${link.url} target="_blank" rel="noopener noreferrer"><img src=${link.svg} alt=${link.name}></a>`,
      )
      .join('')
    element.setInnerContent(socialitems, { html: true })
  }
}

// Change background color
class BodyTransformer {
  async element(element) {
    element.setAttribute(
      'style',
      'background: linear-gradient(0, #ffffff, #943d81);',
    )
  }
}

const transformer = new HTMLRewriter()
  .on('title', new TitleTransformer())
  .on('div#profile', new ProfileTransformer())
  .on('img#avatar', new AvatarTransformer())
  .on('h1#name', new NameTransformer())
  .on('div#links', new LinksTransformer(links))
  .on('div#social', new SocialTransformer(social))
  .on('body', new BodyTransformer())
