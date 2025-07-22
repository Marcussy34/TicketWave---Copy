# 🎫 TicketWave
### *"Where Getting Tickets are no longer a hassle"*

**🌐 Live Platform:** [https://ticket-wave-five.vercel.app/](https://ticket-wave-five.vercel.app/)

![TicketWave Logo](public/ticketwave.svg)

TicketWave is a revolutionary blockchain-powered ticketing platform that eliminates ticket scams through secure NFT tickets and certificates. **Currently live** with core ticketing functionality and NFT certificate generation, we're expanding to combat scalping and unfair distribution through our comprehensive roadmap. Built with Next.js and powered by smart contracts, we're transforming how fans buy tickets and how organizers manage events.

## 🚀 What is TicketWave?

TicketWave addresses the $1M+ problem of ticket fraud and scalping that plagues the music industry. **Currently deployed** with secure NFT ticketing and event management, we're building the future of fair ticketing through blockchain technology.

### 🎯 **What's Live Now:**
- **Zero Counterfeit Tickets** - Each ticket is a unique, tamper-proof NFT ✅
- **Transparent Process** - All transactions recorded on immutable blockchain ledger ✅
- **Event Creation & Management** - Full concert/event organization tools ✅
- **NFT Certificates** - Automated certificate generation for event attendance ✅

### 🛣️ **Coming Soon:**
- **Bot-Free Sales** - World ID verification ensures only humans buy tickets ⏳
- **Payment System** - Integrated Stripe payment processing ⏳
- **Memory Minting** - Convert event photos into NFT memories ⏳
- **Secondary Marketplace** - Safe, regulated ticket resales ⏳
- **NFT Collectibles** - Exclusive digital memorabilia ⏳

## 🎯 Core Problems We Solve

### The Current Ticketing Crisis
- **Scalping**: Bots buy tickets in bulk, reselling at 400%+ markup
- **Fraud**: Fans lose $1M+ annually to fake ticket scams
- **Unfair Distribution**: Organizers secretly sell to scalpers before public release
- **Price Gouging**: Third-party platforms exploit desperate fans

### Our Solution
- **Smart Contracts** automate fair ticket distribution ✅ **(Live)**
- **NFT Tickets** prevent duplication and counterfeiting ✅ **(Live)**
- **NFT Certificates** provide verifiable event attendance proof ✅ **(Live)**
- **World ID** ensures one ticket per verified human ⏳ **(Roadmap)**
- **Memory Minting** turns event memories into NFTs ⏳ **(Roadmap)**
- **Regulated Marketplace** enables safe, transparent resales ⏳ **(Roadmap)**

## ✨ Features

### 🚀 **Currently Deployed**

#### 🔒 **Secure NFT Ticketing** ✅
- Unique, immutable tickets that cannot be duplicated
- Blockchain verification prevents fraud
- Smart contract automation ensures fair distribution

#### 🎪 **Event Management** ✅
- Concert and event creation
- Ticket sales and distribution
- Advanced event organization tools

#### 🏆 **NFT Certificates** ✅
- Automated certificate generation for attendees
- Verifiable proof of event attendance
- Blockchain-based authenticity
- Digital collectible memories

### 🔮 **Planned Features**

#### 🌍 **World ID Integration** ⏳
- Human verification prevents bot purchases
- One ticket per verified individual
- Eliminates bulk buying by scalpers

#### 💳 **Payment System** ⏳
- Integrated Stripe payment processing
- Secure fiat-to-crypto transactions
- Multiple payment options

#### 🖼️ **Memory Minting** ⏳
- Convert concert photos into NFTs
- Create lasting digital memories
- Additional revenue stream for organizers

#### 🏪 **Secondary Marketplace** ⏳
- Safe, regulated ticket resales
- Transparent pricing controls
- Transaction fees shared with organizers

#### 🎨 **NFT Collectibles** ⏳
- Exclusive digital memorabilia
- Artist artwork and concert highlights
- Enhanced fan engagement

#### 👤 **ENS Profiles** ⏳
- Personalized Ethereum addresses
- Showcase NFT collections
- Build connected fan communities

## 🛠️ Technology Stack

### **Currently Implemented** ✅
- **Frontend**: Next.js, React, Tailwind CSS
- **Blockchain**: Optimism Layer 2 (low gas fees)
- **Smart Contracts**: Solidity, Hardhat
- **Storage**: Hybrid on-chain/Firebase approach
- **Graph**: The Graph Protocol for indexing

### **Planned** ⏳
- **Identity**: World ID verification
- **Payments**: Stripe integration
- **Secondary Market**: Advanced marketplace contracts
- **Enhanced Analytics**: User behavior tracking
- **Multi-chain Support**: Ethereum, Polygon expansion
- **Mobile SDK**: React Native implementation

## 📊 Market Validation

### Proven Demand
- **300+ survey respondents** validate market need
- **88.54%** demand safer secondary market
- **96.52%** want transparent ticketing
- **RM 35,000+** lost to scams by surveyed users alone

### Beta Testing Success
- **80 tickets sold** with **75% attendance rate**
- **9.1/10** rating for purchase process
- **88%** would use TicketWave for future events
- **65%** willing to pay for premium features

## 🎯 Target Market

### Primary: Event Organizers
- Concert venues and festivals
- University events and clubs
- Small to large-scale music events
- Theater and live performances

### Secondary: Event Attendees  
- Frequent concert-goers aged 18-35
- Blockchain-savvy early adopters
- Fans seeking secure ticket experiences
- University students and young professionals

## 💰 Business Model

### Revenue Streams
- **Platform Fees**: 3.1% + RM 2 per ticket
- **NFT Collectibles**: RM 2 per collectible
- **Secondary Market**: 3% of resale price
- **Memory Minting**: RM 2 per mint

### Financial Projections
- **Year 1 (2025)**: RM 2,274 revenue (500 users)
- **Year 2 (2026)**: RM 45,480 revenue (10,000 users)
- **Year 3 (2027)**: RM 181,920 revenue (40,000 users)

## 🏆 Competitive Advantage

Unlike traditional platforms (Ticketmaster) or other Web3 solutions (Seatlab, Open Ticketing):

### **Current Advantages** ✅
- **Lower fees** than traditional platforms  
- **Complete fraud prevention** through NFT tickets  
- **NFT certificates** for verifiable event attendance
- **User-friendly** Web3 experience with Google wallet integration
- **Transparent transactions** on blockchain

### **Upcoming Advantages** ⏳
- **Bot-proof sales** via World ID verification
- **Memory minting** for enhanced fan experience
- **Regulated resales** prevent scalping
- **NFT collectibles marketplace**
- **Enhanced analytics** for organizers  

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or Web3 wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ticketwave.git

# Navigate to project directory
cd ticketwave

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Smart Contract Deployment

```bash
# Navigate to smart contract directory
cd smartcontract

# Install dependencies
npm install

# Deploy contracts
npx hardhat run scripts/deploy.js --network optimism
```

## 📁 Project Structure

```
TicketWave/
├── components/          # React components
├── pages/              # Next.js pages
├── smartcontract/      # Solidity contracts
├── graph/             # The Graph subgraph
├── public/            # Static assets
├── styles/            # CSS styles
├── utils/             # Utility functions
└── data/              # JSON data files
```

## 🔧 Smart Contract Features

- **Event Creation**: Organizers can create events with ticket limits
- **NFT Minting**: Automatic ticket minting upon purchase
- **Access Control**: Role-based permissions for organizers
- **Resale Management**: Controlled secondary market transactions
- **Revenue Sharing**: Automatic fee distribution

## 🌟 Roadmap

### ✅ **Completed (2024-2025)**
- **Market Validation** - 300+ survey respondents
- **Beta Testing** - 80 tickets sold, 75% attendance
- **Core NFT Ticketing** - Smart contracts deployed
- **Event Management** - Full event creation & organization
- **NFT Certificates** - Automated attendance certificate generation
- **Web3 Frontend** - User-friendly blockchain interface

### ⏳ **Upcoming Milestones**
- **Q3-Q4 2025**: World ID Integration (bot prevention)
- **Q4 2025**: Payment System Integration (Stripe)
- **Q1 2026**: Memory Minting Feature
- **Q2 2026**: Secondary Marketplace Launch
- **Q3 2026**: NFT Collectibles Platform
- **2026**: 500+ Event Participants Target

### 🚀 **Future Plans (2026+)**
- Multi-chain support (Ethereum, Polygon)
- Mobile app development
- Artist collaboration tools
- Advanced analytics dashboard
- International market expansion
- ENS Profile integration

## 👥 Team

**Phen Jing Yuan** - Founder & CEO  
*2+ years event management, 2+ year Web3 development*

**Marcus Tan Chi Yau** - Chief Technology Officer  
*1+ Year Web3 development, 2+ year frontend experience*

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website**: [Ticketwave](https://ticket-wave-five.vercel.app/)

## 🙏 Acknowledgments

- Taylor's Blockchain Club
- Malaysia Digital Economy Corporation (MDEC)
- Optimism Foundation
- World ID by Worldcoin
- The Graph Protocol

---

*Built with ❤️ by the TicketWave team in Taylor's University, Mal*

