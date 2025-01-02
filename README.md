# AWS Portfolio Starter Kit

A modern, production-ready portfolio website starter kit built with React, TypeScript, and AWS CDK. Features a responsive design with dark mode support and automated infrastructure deployment.

## Features

### Frontend
- ⚡️ **Vite** - Lightning fast build tool
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🌓 **Dark Mode** - Persistent theme with Zustand
- 🔄 **React Router** - Client-side routing
- 📦 **TypeScript** - Type safety
- 🎯 **ESLint & Prettier** - Code quality tools

### Backend (AWS Infrastructure)
- 🚀 **CloudFront** - Global content delivery
- 🪣 **S3** - Static website hosting
- 🔒 **ACM** - SSL/TLS certificates
- 🌐 **Route53** - Domain management
- 🔌 **API Gateway** - RESTful API support
- ⚡️ **Lambda** - Serverless functions
- 🏗️ **CDK** - Infrastructure as code

## Project Structure

```
.
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── store/         # Global state management
│   ├── public/            # Static assets
│   └── index.html         # Entry point
│
└── backend/               # AWS CDK infrastructure
    ├── bin/              # CDK app entry point
    ├── lib/             # Stack definitions
    │   └── constructs/  # CDK constructs
    └── lambda/          # Lambda functions
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- AWS CLI configured with appropriate credentials
- A domain name (optional, for custom domain setup)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aws-portfolio-starter
cd aws-portfolio-starter
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

### Local Development

1. Start the frontend development server:
```bash
cd frontend
npm run dev
```

2. Build the frontend for production:
```bash
cd frontend
npm run build
```

### Deployment

1. Configure your environment variables in `backend/.env`:
```env
STACK_NAME=PortfolioStack
FRONTEND_PATH=../frontend/dist
DOMAIN_NAME=yourdomain.com       # Optional
HOSTED_ZONE_ID=ZXXXXXXXXXXXXX    # Optional
```

2. Deploy the infrastructure:
```bash
cd backend
cdk deploy
```

## Configuration

### Custom Domain Setup

1. Register a domain in AWS Route53 or use an existing domain
2. Note your Hosted Zone ID
3. Add domain configuration to `backend/.env`
4. Deploy the stack

### Frontend Configuration

The frontend uses Vite for building and development. Configuration can be modified in:
- `vite.config.ts` - Build and development settings
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration

### Infrastructure Configuration

Infrastructure settings can be modified in:
- `backend/lib/backend-stack.ts` - Main stack configuration
- `backend/lib/constructs/` - Individual AWS resource configurations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.