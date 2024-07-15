# Tech Talk Blog

**Tech Talk Blog** merupakan website blog yang dibuat untuk membagikan postingan artikel mengenai dunia programming / coding. 

## Official Plugins

Tech Talk Blog supports the following two official plugins for React development:

1. [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
   - **Description**: This plugin uses [Babel](https://babeljs.io/) for Fast Refresh.
   - **Installation**:
     ```bash
     npm install @vitejs/plugin-react
     ```
   - **Usage**:
     ```javascript
     import react from '@vitejs/plugin-react';

     export default {
       plugins: [react()],
     };
     ```
   - **Features**:
     - Fast Refresh
     - JSX Transform
     - Automatic import of React

2. [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
   - **Description**: This plugin uses [SWC](https://swc.rs/) for Fast Refresh.
   - **Installation**:
     ```bash
     npm install @vitejs/plugin-react-swc
     ```
   - **Usage**:
     ```javascript
     import react from '@vitejs/plugin-react-swc';

     export default {
       plugins: [react()],
     };
     ```
   - **Features**:
     - Fast Refresh
     - JSX Transform
     - Faster builds with SWC

## Getting Started

To get started with Tech Talk Blog, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/techtalk-blog.git
