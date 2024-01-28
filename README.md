# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```
Visual Alg
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 0c
│  │  │  └─ 589eccd4d48e270e161a1ab91baee5e5f4b4bc
│  │  ├─ 20
│  │  │  ├─ 4ce5b3a269477ee8eceda7f6bd37deb65b0db8
│  │  │  └─ a12e5a0ae6254667b496ca66558d2917bff678
│  │  ├─ 2e
│  │  │  └─ 7af2b7f1a6f391da1631d93968a9d487ba977d
│  │  ├─ 3f
│  │  │  └─ f426015ac3cba6a828aabf4db1381bc6b5dc4d
│  │  ├─ 48
│  │  │  └─ 681ba0bd0065c809668fcc8a1f2c21b5ea550e
│  │  ├─ 4d
│  │  │  └─ cb43901a687f5fa7e3867d9964a76861973151
│  │  ├─ 54
│  │  │  └─ b39dd1d900e866bb91ee441d372a8924b9d87a
│  │  ├─ 59
│  │  │  └─ 33289f35fac7932a61e8c6a06f0f00b53a825d
│  │  ├─ 5a
│  │  │  └─ 33944a9b41b59a9cf06ee4bb5586c77510f06b
│  │  ├─ 5b
│  │  │  └─ cf74328df2f84749db8e4c6bd7b0f8f7fe69fa
│  │  ├─ 5d
│  │  │  └─ f1e27908b5ba3d1f9333052c50e4852132d85c
│  │  ├─ 6d
│  │  │  └─ 8aecb3b265467fe55079d7c884384568184074
│  │  ├─ 7a
│  │  │  └─ 969141aa7fc3b2cf5b2e1c69ffcc3f4b46a005
│  │  ├─ 84
│  │  │  └─ 1262c2349315933903f1649d972a33438516b0
│  │  ├─ 8c
│  │  │  └─ c96e757a6dd1d19cd87729450098c02dff1316
│  │  ├─ 8f
│  │  │  └─ b79486f53a9ac590c91f808b29bf00a1970b85
│  │  ├─ a1
│  │  │  └─ 2bd9a93e3b8a186caeea9cf6488404617e2efb
│  │  ├─ a3
│  │  │  └─ 2d3b45bf7e636f6a29c4cd447178b7a75de4c7
│  │  ├─ a4
│  │  │  └─ 3e308f93730fd8a0a98456d5edc48f7fc13855
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ b5
│  │  │  └─ 12f8855af75c2d2657ef0536c809eef95fc51a
│  │  ├─ bd
│  │  │  └─ 6213e1dfe6b0a79ce7d8b37d0d2dc70f0250bb
│  │  ├─ d3
│  │  │  └─ 7737fc01752cf4b395862b2aaebf67b4cdf596
│  │  ├─ d4
│  │  │  └─ 8a4a8556293e4fa83bd572ec8a9c4e8238d1a7
│  │  ├─ d6
│  │  │  └─ c519bf7749d1c60075849f6b1f653e64a169c3
│  │  ├─ db
│  │  │  └─ b8a6798f9fc1b4eb294719c592e30dab3a05ee
│  │  ├─ e7
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ f2
│  │  │  └─ 101080fe5e1ce64438e1a5bde56fddf9809b80
│  │  ├─ f7
│  │  │  └─ 68e33fc946e6074d6bd3ce5d454853adb3615e
│  │  ├─ f9
│  │  │  └─ dba1bd2efbd076bb1b2bda1ed033c49bfff84a
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ logo.png
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  ├─ components
│  │  ├─ Graph.jsx
│  │  ├─ graphAlgorithms.jsx
│  │  ├─ Navbar.jsx
│  │  └─ Visualization.jsx
│  ├─ Home.jsx
│  ├─ index.css
│  └─ main.jsx
├─ tailwind.config.js
└─ vite.config.js

```