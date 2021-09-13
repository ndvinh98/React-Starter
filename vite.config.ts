import {defineConfig} from 'vite';
import {getAliases} from 'vite-aliases';
import reactRefresh from '@vitejs/plugin-react-refresh';
import {uglify} from 'rollup-plugin-uglify';
import image from '@rollup/plugin-image';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: getAliases(),
  },
  plugins: [reactRefresh(), image(), uglify()],
});
