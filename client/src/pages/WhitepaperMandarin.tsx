import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Download, Globe } from 'lucide-react';

export default function WhitepaperMandarin() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Set page title and language for SEO
    document.title = 'Body Bagz ($BAGZ) 白皮书 - 中文版 | 赛博朋克表情包代币';
    document.documentElement.lang = 'zh';
    document.documentElement.dir = 'ltr';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Body Bagz ($BAGZ) 完整白皮书中文版。基于Solana的终极赛博朋克表情包生态系统，配备混沌工具、社区奖励和透明代币经济学。');
    }
    
    // Cleanup on unmount
    return () => {
      document.title = 'Body Bagz ($BAGZ) - Cyberpunk Crypto Token | Chaos Tools & Meme Generator';
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-jet-black text-ash-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-toxic-green" />
            <span className="text-2xl font-orbitron text-toxic-green">🇨🇳</span>
          </div>
          <h1 className="text-6xl font-anton text-blood-red mb-4 tracking-wider">
            BODY BAGZ
          </h1>
          <div className="text-2xl font-orbitron text-toxic-green mb-2">
            反派时代已经开始
          </div>
          <div className="text-4xl font-bebas text-ash-white mb-4 tracking-wide">
            白皮书
          </div>
          <div className="text-xl text-glitch-purple mb-8">
            终极赛博朋克表情包生态系统
          </div>
          
          {/* Download Button */}
          <Button 
            className="cyber-button text-lg px-8 py-3"
            data-testid="button-download-mandarin-whitepaper"
          >
            <Download className="w-5 h-5 mr-2" />
            下载PDF版本
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'summary', label: '执行摘要' },
            { id: 'vision', label: '项目愿景' },
            { id: 'tokenomics', label: '代币经济学' },
            { id: 'ecosystem', label: '生态系统' },
            { id: 'tech', label: '技术架构' },
            { id: 'roadmap', label: '路线图' },
            { id: 'community', label: '社区' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 border border-toxic-green text-toxic-green hover:bg-toxic-green hover:text-jet-black transition-all duration-300 rounded font-orbitron"
              data-testid={`nav-${section.id}`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Executive Summary */}
        <section id="summary" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            执行摘要
          </h2>
          <div className="bg-onyx p-8 rounded-lg border border-toxic-green">
            <p className="text-lg mb-4 leading-relaxed">
              Body Bagz ($BAGZ) 不仅仅是一个表情包代币——它是一场<span className="text-toxic-green font-bold">赛博朋克文化运动</span>。
              基于Solana构建，由混沌驱动，为社区参与而设计，$BAGZ将表情包文化转变为一个充满工具、竞赛和奖励的生动生态系统。
            </p>
            <p className="text-lg leading-relaxed">
              通过我们的<span className="text-blood-red font-bold">表情包工厂</span>、<span className="text-blood-red font-bold">头像生成器</span>
              和<span className="text-blood-red font-bold">混沌排行榜</span>，Body Bagz 让代币持有者能够创造病毒式内容、竞争奖励，
              并构建他们的数字反派身份。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">11</div>
                <div className="text-sm text-glitch-purple">表情包模板</div>
              </div>
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">20</div>
                <div className="text-sm text-glitch-purple">精品头像</div>
              </div>
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">∞</div>
                <div className="text-sm text-glitch-purple">混沌潜力</div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Vision */}
        <section id="vision" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            项目愿景
          </h2>
          
          <div className="space-y-8">
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">使命</h3>
              <p className="text-lg">
                创建终极以反派为主题的加密生态系统，让代币持有者能够拥抱混沌，同时通过内容、文化和社区创造真正的价值。
              </p>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-glitch-purple">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">愿景</h3>
              <p className="text-lg">
                将 $BAGZ 建立为<span className="text-toxic-green font-bold">全球表情包战争中心</span>，
                在这里参与意味着奖励，混沌意味着文化，反派优先用餐。
              </p>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">核心价值观</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">混沌为货币：</strong> 
                    <span className="ml-2">奖励破坏和创造性毁灭</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">社区优先：</strong> 
                    <span className="ml-2">每个决策都有利于反派集体</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">质量胜过数量：</strong> 
                    <span className="ml-2">专业工具和资产</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">透明度：</strong> 
                    <span className="ml-2">开放开发和社区治理</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            代币经济学
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">代币名称</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">Body Bagz</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">代币符号</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">$BAGZ</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">区块链</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">Solana</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">类型</div>
              <div className="text-lg font-orbitron text-blood-red font-bold">表情包+实用</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-onyx to-jet-black p-8 rounded-lg border border-glitch-purple mb-6">
            <h3 className="text-2xl font-orbitron text-toxic-green mb-4">透明发布理念</h3>
            <p className="text-lg mb-4">
              <strong className="text-blood-red">Moonshot $BAGZ 在没有预售和团队分配的情况下启动。</strong> 
              大部分供应量通过 Moonshot 的联合曲线和自动销毁系统透明分配。
            </p>
            <p className="text-lg">
              Body Bagz 生态系统由 2000万 BAGZ 的长期储备支持，锁定至 2026年3月，
              以及 3600万 BAGZ 的国库钱包用于生态系统增长和奖励。
            </p>
          </div>
        </section>

        {/* Ecosystem Features */}
        <section id="ecosystem" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            生态系统功能
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-blood-red mb-4">1. 表情包工厂</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>11个自定义"看涨收割者"模板</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>病毒传播就绪，为社交媒体优化</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>混沌与收割者主题表情包库</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>使用自定义文本即时生成</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-glitch-purple">
              <h3 className="text-2xl font-orbitron text-glitch-purple mb-4">2. 推文生成器</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>AI驱动的反派声音推文</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>攻击性/战略性/混沌语调</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>专为在X上传播而设计</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>优化的参与算法</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">3. 精品头像收藏</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>20个高质量赛博朋克反派头像</li>
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>稀有级别：普通、稀有、传奇</li>
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>为未来NFT集成而准备</li>
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>即时下载，无AI延迟</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-blood-red mb-4">4. 混沌排行榜</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>表情包创建 → 4分</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>推文生成 → 5分</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>头像下载 → 3分</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>表情包分享 → 6分</li>
                <li className="flex items-center text-blood-red font-bold">
                  <span className="text-toxic-green mr-2">★</span>每月竞赛奖励1万 $BAGZ
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section id="tech" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            技术架构
          </h2>
          
          <div className="space-y-6">
            <div 
              className="bg-onyx p-6 rounded-lg border border-toxic-green cursor-pointer"
              onClick={() => toggleSection('frontend')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-orbitron text-toxic-green">前端技术栈</h3>
                {expandedSection === 'frontend' ? 
                  <ChevronUp className="w-6 h-6 text-toxic-green" /> : 
                  <ChevronDown className="w-6 h-6 text-toxic-green" />
                }
              </div>
              {expandedSection === 'frontend' && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">框架:</span>
                    <span>React + TypeScript 类型安全</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">构建工具:</span>
                    <span>Vite 优化性能</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">UI库:</span>
                    <span>Radix UI 配合 shadcn 组件</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">样式:</span>
                    <span>Tailwind CSS 赛博朋克主题</span>
                  </div>
                </div>
              )}
            </div>

            <div 
              className="bg-onyx p-6 rounded-lg border border-blood-red cursor-pointer"
              onClick={() => toggleSection('backend')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-orbitron text-blood-red">后端基础设施</h3>
                {expandedSection === 'backend' ? 
                  <ChevronUp className="w-6 h-6 text-blood-red" /> : 
                  <ChevronDown className="w-6 h-6 text-blood-red" />
                }
              </div>
              {expandedSection === 'backend' && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">服务器:</span>
                    <span>Express.js 配合 TypeScript</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">数据库:</span>
                    <span>PostgreSQL 配合 Drizzle ORM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">认证:</span>
                    <span>Replit Auth 集成</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">安全:</span>
                    <span>速率限制和 Helmet</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            路线图
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-toxic-green/20 to-onyx p-6 rounded-lg border-l-4 border-toxic-green">
              <h3 className="text-2xl font-bebas text-toxic-green mb-4">第1阶段: 基础 (已完成)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>表情包工厂 (11个模板)</div>
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>头像收藏 (20个资产)</div>
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>混沌排行榜游戏化</div>
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>社区平台上线</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-glitch-purple/20 to-onyx p-6 rounded-lg border-l-4 border-glitch-purple">
              <h3 className="text-2xl font-bebas text-glitch-purple mb-4">第2阶段: 扩张 (当前)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>增强分析仪表板</div>
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>移动优先升级</div>
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>创世反派池质押</div>
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>多语言支持</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blood-red/20 to-onyx p-6 rounded-lg border-l-4 border-blood-red">
              <h3 className="text-2xl font-bebas text-blood-red mb-4">第3阶段: 统治 (2025年Q1)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>NFT市场集成</div>
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>多链桥接</div>
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>商品商店</div>
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>移动应用测试版</div>
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="community" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            社区与联系方式
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🐦</div>
              <h3 className="font-orbitron text-white font-bold mb-2">Twitter/X</h3>
              <p className="text-blue-100 text-sm">@BodyBagzToken</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-orbitron text-white font-bold mb-2">Telegram</h3>
              <p className="text-blue-100 text-sm">t.me/BodyBagzOfficial</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-orbitron text-white font-bold mb-2">Discord</h3>
              <p className="text-purple-100 text-sm">discord.gg/BodyBagz</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-orbitron text-white font-bold mb-2">网站</h3>
              <p className="text-gray-100 text-sm">bodybagz.app</p>
            </div>
          </div>
          
          <div className="text-center bg-gradient-to-r from-jet-black via-onyx to-jet-black p-12 rounded-lg border border-toxic-green">
            <h2 className="text-4xl font-anton text-blood-red mb-4">欢迎进入反派时代</h2>
            <p className="text-2xl font-orbitron text-toxic-green mb-4">混沌. 文化. 社区.</p>
            <p className="text-xl text-glitch-purple">Body Bagz ($BAGZ) - 反派繁荣的地方</p>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 p-8 rounded-lg border-2 border-blood-red">
            <h2 className="text-3xl font-bebas text-blood-red mb-4 flex items-center">
              <span className="text-blood-red mr-3">⚠️</span>
              重要风险警告
            </h2>
            <p className="text-lg mb-4">
              <strong>加密货币具有高度波动性和风险性。</strong> Body Bagz ($BAGZ) 是一个实验性表情包代币，
              不保证价值或回报。
            </p>
            <p className="text-blood-red font-bold text-lg">
              请只投资您能够承受损失的资金。这不是财务建议。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}