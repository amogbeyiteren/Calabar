
const withPWA = require('next-pwa')



const nextConfig = {



...withPWA({

dest: 'public',

register: true,

skipWaiting: true

}),

experimental: {

appDir: true,

},

webpack: (config) => {

config.externals = [...config.externals, 'bcrypt'];

return config;

},

images: {

domains: [

'res.cloudinary.com',

'avatars.githubusercontent.com',

'lh3.googleusercontent.com'

]

}

}



module.exports = nextConfig