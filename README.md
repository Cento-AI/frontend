# Cento AI - Intelligent DeFi Portfolio Management

Cento AI is an AI-powered DeFi portfolio manager built for the ETHGlobal Agentic Hackathon. It uses intelligent agents to optimize yield strategies across multiple protocols.

## Overview

Cento AI helps users maximize their DeFi yields by:
- Analyzing wallet holdings and market opportunities
- Creating personalized investment strategies
- Automatically managing positions across protocols
- Monitoring and rebalancing portfolios for optimal returns

## Features

- 🤖 AI-powered portfolio analysis and strategy creation
- 🔄 Automated yield optimization
- 📊 Real-time portfolio monitoring
- 🏦 Multi-protocol support (Aave, Compound)
- 🔐 Secure vault system for asset management

## Technology Stack

- Frontend: Next.js 14 with App Router
- Authentication: Coinbase's OnchainKit
- Agent System: AgentKit for intelligent automation
- Networks: Live on Base Sepolia and Arbitrum Sepolia
- Styling: Tailwind CSS with shadcn/ui components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cento-ai.git
cd cento-ai
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_RPC_URL=your_rpc_url
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Current Status

- ✅ Lending strategies with Aave and Compound
- ✅ Support for USDC and WETH
- 🚧 Liquidity provision (coming soon)
- 🚧 Flash loan arbitrage (coming soon)
- 🚧 Additional token support (coming soon)

## Networks

Currently deployed on:
- Base Sepolia
- Arbitrum Sepolia

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## Acknowledgments

Built during ETHGlobal Agentic Hackathon using:
- [Coinbase OnchainKit](https://github.com/coinbase/onchain-kit)
- [AgentKit](https://github.com/etherkit/agent-kit)
