// vite.config.ts
import { defineConfig } from "file:///E:/Dipak%20Data/Projects/Employee%20Schedule%20Management%20System/ESMS/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Dipak%20Data/Projects/Employee%20Schedule%20Management%20System/ESMS/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import { resolve } from "path";
import fs from "fs/promises";
import svgr from "file:///E:/Dipak%20Data/Projects/Employee%20Schedule%20Management%20System/ESMS/frontend/node_modules/@svgr/rollup/dist/index.js";
import flowbiteReact from "file:///E:/Dipak%20Data/Projects/Employee%20Schedule%20Management%20System/ESMS/frontend/node_modules/flowbite-react/dist/plugin/vite.js";
import tailwindcss from "file:///E:/Dipak%20Data/Projects/Employee%20Schedule%20Management%20System/ESMS/frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\Dipak Data\\Projects\\Employee Schedule Management System\\ESMS\\frontend";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      src: resolve(__vite_injected_original_dirname, "src"),
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.tsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-tsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "tsx",
              contents: await fs.readFile(args.path, "utf8")
            }));
          }
        }
      ]
    }
  },
  // ✅ Set custom output directory for build
  build: {
    outDir: "../backend/src/main/resources/static",
    emptyOutDir: true
    // clears the folder before build
  },
  plugins: [svgr(), react(), flowbiteReact(), tailwindcss()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEaXBhayBEYXRhXFxcXFByb2plY3RzXFxcXEVtcGxveWVlIFNjaGVkdWxlIE1hbmFnZW1lbnQgU3lzdGVtXFxcXEVTTVNcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXERpcGFrIERhdGFcXFxcUHJvamVjdHNcXFxcRW1wbG95ZWUgU2NoZWR1bGUgTWFuYWdlbWVudCBTeXN0ZW1cXFxcRVNNU1xcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovRGlwYWslMjBEYXRhL1Byb2plY3RzL0VtcGxveWVlJTIwU2NoZWR1bGUlMjBNYW5hZ2VtZW50JTIwU3lzdGVtL0VTTVMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnO1xyXG5pbXBvcnQgc3ZnciBmcm9tICdAc3Znci9yb2xsdXAnO1xyXG5pbXBvcnQgZmxvd2JpdGVSZWFjdCBmcm9tICdmbG93Yml0ZS1yZWFjdC9wbHVnaW4vdml0ZSc7XHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIHNyYzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBlc2J1aWxkOiB7XHJcbiAgICBsb2FkZXI6ICd0c3gnLFxyXG4gICAgaW5jbHVkZTogL3NyY1xcLy4qXFwudHN4PyQvLFxyXG4gICAgZXhjbHVkZTogW10sXHJcbiAgfSxcclxuXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ2xvYWQtanMtZmlsZXMtYXMtdHN4JyxcclxuICAgICAgICAgIHNldHVwKGJ1aWxkKSB7XHJcbiAgICAgICAgICAgIGJ1aWxkLm9uTG9hZCh7IGZpbHRlcjogL3NyY1xcLy4qXFwuanMkLyB9LCBhc3luYyAoYXJncykgPT4gKHtcclxuICAgICAgICAgICAgICBsb2FkZXI6ICd0c3gnLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnRzOiBhd2FpdCBmcy5yZWFkRmlsZShhcmdzLnBhdGgsICd1dGY4JyksXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLy8gXHUyNzA1IFNldCBjdXN0b20gb3V0cHV0IGRpcmVjdG9yeSBmb3IgYnVpbGRcclxuXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJy4uL2JhY2tlbmQvc3JjL21haW4vcmVzb3VyY2VzL3N0YXRpYycsXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSwgLy8gY2xlYXJzIHRoZSBmb2xkZXIgYmVmb3JlIGJ1aWxkXHJcbiAgfSxcclxuXHJcbiAgcGx1Z2luczogW3N2Z3IoKSwgcmVhY3QoKSwgZmxvd2JpdGVSZWFjdCgpLCB0YWlsd2luZGNzcygpXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFosU0FBUyxvQkFBb0I7QUFDM2IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxpQkFBaUI7QUFOeEIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUM3QixLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsU0FBUyxDQUFDO0FBQUEsRUFDWjtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTSxPQUFPO0FBQ1gsa0JBQU0sT0FBTyxFQUFFLFFBQVEsZUFBZSxHQUFHLE9BQU8sVUFBVTtBQUFBLGNBQ3hELFFBQVE7QUFBQSxjQUNSLFVBQVUsTUFBTSxHQUFHLFNBQVMsS0FBSyxNQUFNLE1BQU07QUFBQSxZQUMvQyxFQUFFO0FBQUEsVUFDSjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBSUEsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBO0FBQUEsRUFDZjtBQUFBLEVBRUEsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsY0FBYyxHQUFHLFlBQVksQ0FBQztBQUMzRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
