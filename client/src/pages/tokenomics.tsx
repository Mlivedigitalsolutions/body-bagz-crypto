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

          {/* Tokenomics Overview */}
          <div className="neon-card p-8 rounded-xl mb-8">
            <h2 className="font-tech text-2xl text-toxic-green mb-6">Moonshot $BAGZ Tokenomics</h2>
            <div className="bg-toxic-green/5 border border-toxic-green/20 rounded-lg p-6 mb-6">
              <p className="text-ash-white font-semibold mb-4">
                Moonshot $BAGZ launched with no presale and no team allocation. 
                The majority of supply is distributed transparently through Moonshot's bonding curve and automatic burn system.
              </p>
              <p className="text-dim-enhanced">
                The Body Bagz ecosystem is anchored by a long-term reserve of 20M BAGZ locked until March 2026, 
                and a Treasury Wallet of 36M BAGZ for ecosystem growth and rewards. 
                Liquidity is permanently secured through Moonshot's LP burn process once bonding is complete.
              </p>
            </div>

            <div className="space-y-6">
              {/* Community Distribution */}
              <div className="bg-toxic-green/10 border border-toxic-green/30 rounded-lg p-6">
                <h3 className="font-tech text-xl text-toxic-green mb-4">Community Distribution — Dynamic (Majority of Supply)</h3>
                <p className="text-dim-enhanced mb-4">
                  Distributed directly through Moonshot's bonding curve mechanics. The final circulating amount depends on market participation and Moonshot's automatic supply burn when the bonding cap is reached.
                </p>
                <ul className="space-y-2 text-dim-enhanced">
                  <li>• Fair launch via bonding curve</li>
                  <li>• No presale or team allocation</li>
                  <li>• Automatic supply management</li>
                  <li>• Community-driven distribution</li>
                </ul>
              </div>

              {/* Long-Term Reserve */}
              <div className="bg-blood-red/10 border border-blood-red/30 rounded-lg p-6">
                <h3 className="font-tech text-xl text-blood-red mb-4">20M Long-Term Reserve (Locked)</h3>
                <p className="text-dim-enhanced mb-4">
                  Locked until March 18, 2026 via Streamflow for long-term ecosystem stability.
                </p>
                <div className="bg-jet-black/50 rounded p-3 mb-4">
                  <p className="text-ash-white font-semibold text-sm mb-2">📌 Proof of Lock:</p>
                  <a 
                    href="https://app.streamflow.finance/contract/solana/mainnet/35drUjYCwvTdbYaaXP6cPMAKRLcFSLTBnkaweCCMFFxd?ref=psychically-impish-marten"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-toxic-green hover:text-toxic-green/80 break-all text-xs"
                  >
                    35drUjYCwvTdbYaaXP6cPMAKRLcFSLTBnkaweCCMFFxd
                  </a>
                </div>
              </div>

              {/* Treasury Wallet */}
              <div className="bg-glitch-purple/10 border border-glitch-purple/30 rounded-lg p-6">
                <h3 className="font-tech text-xl text-glitch-purple mb-4">36M Treasury Wallet (Active)</h3>
                <p className="text-dim-enhanced mb-4">
                  Treasury funds are dedicated to ecosystem growth, staking rewards, buybacks, contests, marketing, and development.
                </p>
                <div className="bg-jet-black/50 rounded p-3 mb-4">
                  <p className="text-ash-white font-semibold text-sm mb-2">📌 Treasury Wallet Address:</p>
                  <a 
                    href="https://solscan.io/address/3jMTx4EHRXv5vUwgmbECUPFb1mGntQnczHfMfRMufKR7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-toxic-green hover:text-toxic-green/80 break-all text-xs"
                  >
                    3jMTx4EHRXv5vUwgmbECUPFb1mGntQnczHfMfRMufKR7
                  </a>
                </div>
              </div>

              {/* Liquidity Lock */}
              <div className="bg-ash-white/10 border border-ash-white/30 rounded-lg p-6">
                <h3 className="font-tech text-xl text-ash-white mb-4">Liquidity — Permanently Locked via Moonshot</h3>
                <p className="text-dim-enhanced">
                  Once the bonding cap is reached (~500 SOL market cap), Moonshot automatically creates the Raydium pool and burns LP tokens. 
                  This permanently locks liquidity and removes rug-pull risk.
                </p>
              </div>
            </div>
          </div>

          {/* Dual Token Ecosystem */}
          <div className="neon-card p-8 rounded-xl mb-8">
            <h2 className="font-tech text-2xl text-toxic-green mb-6">Dual Token Ecosystem</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-toxic-green/10 border border-toxic-green/30 rounded-lg p-6">
                <h3 className="font-tech text-xl text-toxic-green mb-4">Moonshot $BAGZ</h3>
                <p className="text-dim-enhanced mb-4">The primary ecosystem token with transparent tokenomics and community governance.</p>
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