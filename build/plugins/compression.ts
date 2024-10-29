import Compression from 'vite-plugin-compression';

export default function createCompression() {
  return Compression({
    ext: '.gz',
    deleteOriginFile: false
  });
}
