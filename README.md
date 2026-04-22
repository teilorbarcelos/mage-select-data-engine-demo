# Mage Select Data Engine - Demo

This is a standalone demonstration of the **Mage Select Data Engine** ecosystem. It showcases an enterprise-grade solution for complex selection components in React, handling everything from local state to full-stack pagination and memory optimization.

## 📦 Official Packages

- [**mage-select-data-engine**](https://www.npmjs.com/package/mage-select-data-engine): Core engine logic and state management.
- [**mage-select-data-react**](https://www.npmjs.com/package/mage-select-data-react): React hooks and integration layer.
- [**mage-select-data-react-hook-form**](https://www.npmjs.com/package/mage-select-data-react-hook-form): Specialized controller for React Hook Form.

## ✨ Key Features Demonstrated

- **Full-Stack Pagination**: Seamlessly handles server-side pagination with infinite scroll.
- **Automatic Hydration**: Effortlessly synchronizes form IDs with full data objects from the backend.
- **Memory Optimization**: Bi-directional scrolling that prunes the DOM and memory, allowing lists with thousands of items to run smoothly.
- **RHF Integration**: Built-in support for validation rules and standard form flows.
- **Zero-Dependency Core**: The engine is framework-agnostic, while specialized packages provide first-class React support.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

## 🛠 Project Structure

- `src/mock/`: Backend simulation and engine configurations.
- `src/examples/`: Real-world implementation examples (Multi, Single, Vanilla).
- `src/components/`: Reusable UI components using the Mage hooks.

---
Built with ❤️ for the React ecosystem.
