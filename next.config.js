/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'assets.coingecko.com'
            },
            {
                protocol:'https',
                hostname:'images.cryptocompare.com'
            },
            {
                protocol:'https',
                hostname:'resources.cryptocompare.com'
            }
        ]
    }
}

module.exports = nextConfig
