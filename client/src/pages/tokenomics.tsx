export default function Tokenomics() {
  return (
    <div className="min-h-screen bg-black text-ash-white">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 border-b border-dim-gray">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center space-x-4">
            <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
          </a>
          <a href="/" className="text-toxic-green hover:text-toxic-green/80 transition-colors">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-brand text-4xl md:text-5xl text-blood-red mb-8 text-center">
            TOKENOMICS
          </h1>
          
          {/* Token Overview */}
          <div className="neon-card p-8 rounded-xl mb-8">
            <h2 className="font-tech text-2xl text-toxic-green mb-6">Token Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-tech text-lg text-blood-red mb-3">Moonshot Token ($BAGZ)</h3>
                <div className="space-y-2 text-dim-enhanced">
                  <p><span className="text-ash-white font-semibold">Contract:</span> 7eyYetAuD84SFfANFKmhUDqpTgGfJUQExVUZxhNBmoon</p>
                  <p><span className="text-ash-white font-semibold">Blockchain:</span> Solana</p>
                  <p><span className="text-ash-white font-semibold">Symbol:</span> $BAGZ</p>
                  <p><span className="text-ash-white font-semibold">Decimals:</span> 9</p>
                </div>
              </div>
              <div>
                <h3 className="font-tech text-lg text-blood-red mb-3">Pump.fun Token ($BAGZ)</h3>
                <div className="space-y-2 text-dim-enhanced">
                  <p><span className="text-ash-white font-semibold">Contract:</span> 6sw8wayQp769fAHrJxo6brH9D8BwghYHRSnZ1xeHpump</p>
                  <p><span className="text-ash-white font-semibold">Blockchain:</span> Solana</p>
                  <p><span className="text-ash-white font-semibold">Symbol:</span> $BAGZ</p>
                  <p><span className="text-ash-white font-semibold">Decimals:</span> 6</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Token Ecosystem */}
          <div className="neon-card p-8 rounded-xl mb-8">
            <h2 className="font-tech text-2xl text-toxic-green mb-6">Dual Token Ecosystem</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-toxic-green/10 border border-toxic-green/30 rounded-lg p-6">
                <h3 className="font-tech text-xl text-toxic-green mb-4">Moonshot $BAGZ</h3>
                <p className="text-dim-enhanced mb-4">The stable, community-focused token for long-term holders and ecosystem governance.</p>
                <ul className="space-y-2 text-dim-enhanced">
                  <li>• Community governance rights</li>
                  <li>• Monthly reward eligibility</li>
                  <li>• Leaderboard competitions</li>
                  <li>• Premium tool access</li>
                </ul>
              </div>
              <div className="bg-blood-red/10 border border-blood-red/30 rounded-lg p-6">
                <h3 className="font-tech text-xl text-blood-red mb-4">Pump.fun $BAGZ</h3>
                <p className="text-dim-enhanced mb-4">The volatile, high-energy token for traders and chaos enthusiasts.</p>
                <ul className="space-y-2 text-dim-enhanced">
                  <li>• High volatility trading</li>
                  <li>• Meme warfare rewards</li>
                  <li>• Viral marketing incentives</li>
                  <li>• Chaos energy multipliers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Community Features */}
          <div className="neon-card p-8 rounded-xl mb-8">
            <h2 className="font-tech text-2xl text-toxic-green mb-6">Community Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-toxic-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-tech text-lg text-toxic-green mb-2">Monthly Rewards</h3>
                <p className="text-dim-enhanced text-sm">Top leaderboard performers earn up to 10,000 $BAGZ tokens monthly</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blood-red/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-tech text-lg text-blood-red mb-2">Creation Tools</h3>
                <p className="text-dim-enhanced text-sm">Generate PFPs, memes, and tweets with our premium chaos tools</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-glitch-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-tech text-lg text-glitch-purple mb-2">Community Platform</h3>
                <p className="text-dim-enhanced text-sm">Mission posts, meetups, and P2P marketplace for the community</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-blood-red/10 border border-blood-red/30 rounded-lg p-6">
            <h3 className="font-tech text-lg text-blood-red mb-3">⚠️ Important Disclaimer</h3>
            <p className="text-dim-enhanced text-sm leading-relaxed">
              Body Bagz ($BAGZ) tokens are experimental meme tokens created for entertainment and community engagement. 
              This is not financial advice. Cryptocurrency investments carry high risk. Only invest what you can afford to lose. 
              Token values can be extremely volatile. Always do your own research before making any investment decisions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}