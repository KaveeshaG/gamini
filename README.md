# Gamini
Gamini is an Angular web application that integrates with Google's Generative AI for building intelligent applications.

## Installation
Clone the repository and install dependencies with npm:

```bash
git clone https://github.com/KaveeshaG/gamini.git
cd gamini
npm install
```

## Usage
First, add your AI Studio API key in the gemini.service file:
```typescript
this.genAI = new GoogleGenerativeAI('<paste API key here>');
```

Then start the development server:
```bash
ng serve
```

Your application will be running at `http://localhost:4200`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

For adding new features:
1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## Prerequisites
- Node.js (version 18.3 or higher)
- npm (comes with Node.js)
- Angular CLI
