/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
     
      config.externals = Array.isArray(config.externals)
        ? [...config.externals, { 'html2canvas': 'commonjs html2canvas', 'jspdf': 'commonjs jspdf' }]
        : { ...config.externals, 'html2canvas': 'commonjs html2canvas', 'jspdf': 'commonjs jspdf' };
      
     
      if (Array.isArray(config.externals)) {
          config.externals.push({ 'html2canvas': 'commonjs html2canvas', 'jspdf': 'commonjs jspdf' });
      } else if (typeof config.externals === 'object' && config.externals !== null) {
          config.externals = {
              ...config.externals,
              'html2canvas': 'commonjs html2canvas',
              'jspdf': 'commonjs jspdf',
          };
      } else {
         
          config.externals = { 'html2canvas': 'commonjs html2canvas', 'jspdf': 'commonjs jspdf' };
      }
    }
    return config;
  },
};

export default nextConfig;