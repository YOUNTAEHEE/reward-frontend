// import createNextIntlPlugin from 'next-intl/plugin';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
// };

// const withNextIntl = createNextIntlPlugin();

// export default withNextIntl(nextConfig);

// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ko/login',
        permanent: false, // true로 설정하면 영구 리디렉션(308), false는 임시 리디렉션(307)
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
