export default function Privacy() {
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
            PRIVACY POLICY
          </h1>
          
          <div className="space-y-8">
            <div className="neon-card p-8 rounded-xl">
              <p className="text-dim-enhanced mb-6">
                <strong>Last Updated:</strong> January 7, 2025
              </p>
              
              <h2 className="font-tech text-2xl text-toxic-green mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>We collect information you provide directly to us when you:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account on our platform</li>
                  <li>Use our chaos tools (PFP generator, meme creator, tweet generator)</li>
                  <li>Participate in community features (meetups, marketplace, mission posts)</li>
                  <li>Interact with our leaderboard and reward systems</li>
                  <li>Contact us for support or feedback</li>
                </ul>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Calculate leaderboard rankings and distribute rewards</li>
                  <li>Enable community features and social interactions</li>
                  <li>Improve our tools and user experience</li>
                  <li>Send important service notifications</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who assist in platform operations (under strict confidentiality)</li>
                </ul>
                <p className="mt-4">
                  <strong>Public Information:</strong> Your username, leaderboard position, and generated content 
                  may be visible to other users as part of the community features.
                </p>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">4. Data Security</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">5. Cookies and Tracking</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintain your login session</li>
                  <li>Remember your preferences</li>
                  <li>Analyze site usage and improve performance</li>
                  <li>Provide personalized experiences</li>
                </ul>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">6. Your Rights</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Export your data in a portable format</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us through our official channels.
                </p>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">7. Children's Privacy</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>Our service is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18.</p>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">8. Changes to This Policy</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new policy on this page with an updated "Last Updated" date.</p>
              </div>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <h2 className="font-tech text-2xl text-toxic-green mb-4">9. Contact Us</h2>
              <div className="space-y-4 text-dim-enhanced">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Telegram: <a href="https://t.me/BodyBagzs" className="text-toxic-green hover:text-toxic-green/80">https://t.me/BodyBagzs</a></li>
                  <li>X (Twitter): <a href="https://x.com/VillianEra187" className="text-toxic-green hover:text-toxic-green/80">@VillianEra187</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}