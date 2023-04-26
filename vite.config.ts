import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig((configEnv) => ({
	plugins: [
		dts({
			include: ['src/'],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'animated-outline',
			fileName: 'animated-outline',
		},
		rollupOptions: {},
	},
}));
