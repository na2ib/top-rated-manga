import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dynamically set the base path for GitHub Pages based on the repository name.
// If GITHUB_REPOSITORY is "username/my-repo", this sets base to "/my-repo/".
const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: repoName,
  server: { host: '0.0.0.0', port: 3000, allowedHosts: 'all' }
})
