import { Scene, GameObjects } from 'phaser';

export class MainScene extends Scene {
  private player?: GameObjects.Sprite;
  private enemies?: GameObjects.Group;
  private coins?: GameObjects.Group;
  private obstacles?: GameObjects.Group;
  private background?: GameObjects.TileSprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  
  // Game state
  private score = 0;
  private combo = 0;
  private timeAlive = 0;
  private lives = 3;
  private isGameOver = false;
  private gameSpeed = 100;
  private difficulty = 1;
  private lastSpawn = 0;
  private invulnerable = false;
  private lastComboReset = 0;

  // Input handling
  private controlsMode: 'gestures' | 'buttons' = 'gestures';
  private inputBuffer: Array<{ action: string; time: number }> = [];
  private lastInputTime: { [key: string]: number } = {};
  private swipeStartPos?: { x: number; y: number };
  private isInputActive: { [key: string]: boolean } = {};

  // Performance settings
  private performanceMode = false;
  private soundEnabled = true;
  private particlePool?: GameObjects.Group;

  // Callbacks
  private onStatsUpdate?: (stats: any) => void;
  private onGameOver?: (stats: any) => void;
  private onPause?: () => void;

  // Sound effects
  private sounds: { [key: string]: Phaser.Sound.BaseSound } = {};

  constructor() {
    super({ key: 'MainScene' });
  }

  init(data: any) {
    this.controlsMode = data.controlsMode || 'gestures';
    this.performanceMode = data.performanceMode || false;
    this.soundEnabled = data.soundEnabled !== false;
    this.onStatsUpdate = data.onStatsUpdate;
    this.onGameOver = data.onGameOver;
    this.onPause = data.onPause;

    // Reset game state
    this.score = 0;
    this.combo = 0;
    this.timeAlive = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.gameSpeed = 100;
    this.difficulty = 1;
    this.lastSpawn = 0;
    this.invulnerable = false;
    this.inputBuffer = [];
    this.lastInputTime = {};
    this.isInputActive = {};
  }

  preload() {
    // Create large, vibrant sprites that are easy to see on mobile
    
    // Player - Bright green hero character
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x39FF14); // Bright green
    playerGraphics.fillRoundedRect(0, 0, 80, 100, 8);
    playerGraphics.fillStyle(0xFFFFFF); // White eyes
    playerGraphics.fillCircle(20, 25, 8);
    playerGraphics.fillCircle(60, 25, 8);
    playerGraphics.fillStyle(0x000000); // Black pupils
    playerGraphics.fillCircle(20, 25, 4);
    playerGraphics.fillCircle(60, 25, 4);
    playerGraphics.generateTexture('player', 80, 100);
    playerGraphics.destroy();

    // Enemy - Bright red villain
    const enemyGraphics = this.add.graphics();
    enemyGraphics.fillStyle(0xFF1439); // Bright red
    enemyGraphics.fillRoundedRect(0, 0, 70, 90, 8);
    enemyGraphics.fillStyle(0xFFFF00); // Yellow angry eyes
    enemyGraphics.fillCircle(18, 25, 8);
    enemyGraphics.fillCircle(52, 25, 8);
    enemyGraphics.fillStyle(0x000000); // Black pupils
    enemyGraphics.fillCircle(18, 25, 3);
    enemyGraphics.fillCircle(52, 25, 3);
    enemyGraphics.generateTexture('enemy', 70, 90);
    enemyGraphics.destroy();

    // Coin - Golden treasure
    const coinGraphics = this.add.graphics();
    coinGraphics.fillStyle(0xFFD700); // Gold
    coinGraphics.fillCircle(30, 30, 28);
    coinGraphics.fillStyle(0xFFA500); // Orange inner
    coinGraphics.fillCircle(30, 30, 20);
    coinGraphics.fillStyle(0xFFD700); // Gold center
    coinGraphics.fillCircle(30, 30, 12);
    coinGraphics.generateTexture('coin', 60, 60);
    coinGraphics.destroy();

    // Obstacle - Purple barrier
    const obstacleGraphics = this.add.graphics();
    obstacleGraphics.fillStyle(0x9013FE); // Purple
    obstacleGraphics.fillRect(0, 0, 80, 120);
    obstacleGraphics.fillStyle(0xBB33FF); // Lighter purple stripes
    obstacleGraphics.fillRect(10, 0, 10, 120);
    obstacleGraphics.fillRect(30, 0, 10, 120);
    obstacleGraphics.fillRect(50, 0, 10, 120);
    obstacleGraphics.generateTexture('obstacle', 80, 120);
    obstacleGraphics.destroy();

    // Create cyberpunk grid background
    const bgGraphics = this.add.graphics();
    bgGraphics.fillStyle(0x0A0A0A); // Dark background
    bgGraphics.fillRect(0, 0, 1920, 1080);
    
    // Add grid lines
    bgGraphics.lineStyle(1, 0x39FF14, 0.3); // Green grid lines
    for (let x = 0; x < 1920; x += 60) {
      bgGraphics.lineBetween(x, 0, x, 1080);
    }
    for (let y = 0; y < 1080; y += 60) {
      bgGraphics.lineBetween(0, y, 1920, y);
    }
    
    bgGraphics.generateTexture('game-bg', 1920, 1080);
    bgGraphics.destroy();
  }

  create() {
    const { width, height } = this.scale;

    // Create background
    this.background = this.add.tileSprite(0, 0, width, height, 'game-bg');
    this.background.setOrigin(0, 0);
    this.background.setScale(width / 1920, height / 1080); // Scale to fit

    // Create player - large and visible
    this.player = this.add.sprite(width * 0.15, height * 0.5, 'player');
    this.player.setScale(1.2);
    this.player.setInteractive();

    // Create groups
    this.enemies = this.add.group();
    this.coins = this.add.group();
    this.obstacles = this.add.group();
    this.particlePool = this.add.group();

    // Set up physics
    this.physics.world.enable(this.player);
    this.physics.world.setBounds(0, 0, width, height);
    
    // Set player physics properties
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setBounce(0);
    playerBody.setCollideWorldBounds(true);
    playerBody.setGravityY(600); // Add gravity for jumping

    // Set up input
    this.setupInput();
    
    // Set up collisions
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, undefined, this);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, undefined, this);
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, undefined, this);

    // Start game loop
    this.time.addEvent({
      delay: 100,
      callback: this.gameLoop,
      callbackScope: this,
      loop: true
    });

    // Difficulty progression
    this.time.addEvent({
      delay: 20000,
      callback: this.increaseDifficulty,
      callbackScope: this,
      loop: true
    });

    // Update stats
    this.time.addEvent({
      delay: 100,
      callback: this.updateStats,
      callbackScope: this,
      loop: true
    });

    // Show gameplay instructions at start
    this.showGameplayInstructions();
  }

  setupInput() {
    // Keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Touch/Mouse input for gestures
    this.input.on('pointerdown', this.onPointerDown, this);
    this.input.on('pointerup', this.onPointerUp, this);
    this.input.on('pointermove', this.onPointerMove, this);

    // Keyboard shortcuts
    this.input.keyboard?.on('keydown-SPACE', () => this.handleInput('tag'));
    this.input.keyboard?.on('keydown-UP', () => this.handleInput('jump'));
    this.input.keyboard?.on('keydown-DOWN', () => this.handleInput('slide'));
    this.input.keyboard?.on('keydown-ESC', () => this.onPause?.());
  }

  onPointerDown(pointer: Phaser.Input.Pointer) {
    this.swipeStartPos = { x: pointer.x, y: pointer.y };
  }

  onPointerUp(pointer: Phaser.Input.Pointer) {
    if (!this.swipeStartPos) return;

    const deltaX = pointer.x - this.swipeStartPos.x;
    const deltaY = pointer.y - this.swipeStartPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const minSwipeDistance = 50;

    if (distance < minSwipeDistance) {
      // Tap - tag action
      this.handleInput('tag');
    } else {
      // Swipe gesture
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.handleInput('right');
        } else {
          this.handleInput('left');
        }
      } else {
        // Vertical swipe
        if (deltaY < 0) {
          this.handleInput('jump');
        } else {
          this.handleInput('slide');
        }
      }
    }

    this.swipeStartPos = undefined;
  }

  onPointerMove(pointer: Phaser.Input.Pointer) {
    // Could add gesture preview here
  }

  handleInput(action: string, isPressed = true) {
    if (this.isGameOver) return;

    const now = Date.now();
    const cooldowns = { tag: 250, jump: 500, slide: 500 };
    
    // Check cooldown
    if (this.lastInputTime[action] && now - this.lastInputTime[action] < (cooldowns[action as keyof typeof cooldowns] || 0)) {
      return;
    }

    // Handle different actions
    switch (action) {
      case 'left':
        this.movePlayer(-1, isPressed);
        break;
      case 'right':
        this.movePlayer(1, isPressed);
        break;
      case 'jump':
        this.jumpPlayer();
        this.lastInputTime[action] = now;
        break;
      case 'slide':
        this.slidePlayer();
        this.lastInputTime[action] = now;
        break;
      case 'tag':
        this.tagEnemy();
        this.lastInputTime[action] = now;
        break;
    }
  }

  movePlayer(direction: number, isPressed: boolean) {
    if (!this.player) return;

    const { width } = this.scale;
    const speed = 200;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    
    // Set boundaries for player movement
    const leftBound = this.player.displayWidth / 2;
    const rightBound = width * 0.6; // Allow player to move up to 60% of screen width
    
    if (isPressed) {
      // Check boundaries before applying velocity
      if (direction > 0 && this.player.x >= rightBound) {
        body.setVelocityX(0);
        return;
      }
      if (direction < 0 && this.player.x <= leftBound) {
        body.setVelocityX(0);
        return;
      }
      body.setVelocityX(speed * direction);
    } else {
      body.setVelocityX(0);
    }
  }

  jumpPlayer() {
    if (!this.player) return;
    
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.touching.down) {
      body.setVelocityY(-400);
      this.playSound('jump');
      this.vibrate(15);
    }
  }

  slidePlayer() {
    if (!this.player) return;
    
    // Implement slide mechanic
    this.player.setScale(1.2, 0.8); // Make player shorter but keep proper scale
    this.time.delayedCall(500, () => {
      if (this.player) {
        this.player.setScale(1.2);
      }
    });
    
    this.playSound('slide');
    this.vibrate(15);
  }

  tagEnemy() {
    if (!this.player || !this.enemies) return;

    const playerBounds = this.player.getBounds();
    const tagRange = 80;

    // Find nearest enemy within range
    let nearestEnemy: GameObjects.Sprite | null = null;
    let nearestDistance = tagRange;

    this.enemies.children.entries.forEach(enemy => {
      const sprite = enemy as GameObjects.Sprite;
      const distance = Phaser.Math.Distance.Between(
        this.player!.x, this.player!.y,
        sprite.x, sprite.y
      );

      if (distance < nearestDistance) {
        nearestEnemy = sprite;
        nearestDistance = distance;
      }
    });

    if (nearestEnemy) {
      this.hitEnemy(this.player, nearestEnemy);
      this.playSound('tag');
      this.vibrate(15);
    }
  }

  gameLoop() {
    if (this.isGameOver) return;

    const now = Date.now();
    
    // Spawn enemies and obstacles
    if (now - this.lastSpawn > (2000 / this.difficulty)) {
      this.spawnGameObject();
      this.lastSpawn = now;
    }

    // Update background
    if (this.background) {
      this.background.tilePositionX += this.gameSpeed * 0.01;
    }

    // Clean up off-screen objects
    this.cleanupObjects();

    // Handle keyboard movement
    if (this.cursors && this.player) {
      const body = this.player.body as Phaser.Physics.Arcade.Body;
      
      if (this.cursors.left.isDown) {
        body.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        body.setVelocityX(200);
      } else if (!this.isInputActive.left && !this.isInputActive.right) {
        body.setVelocityX(0);
      }
    }
  }

  spawnGameObject() {
    const { width, height } = this.scale;
    const rand = Math.random();

    if (rand < 0.5) {
      this.spawnEnemy();
    } else if (rand < 0.8) {
      this.spawnCoin();
    } else {
      this.spawnObstacle();
    }
  }

  spawnEnemy() {
    if (!this.enemies) return;
    
    const { width, height } = this.scale;
    const enemy = this.add.sprite(width + 50, height * 0.5, 'enemy');
    enemy.setScale(1.0);
    
    this.physics.world.enable(enemy);
    const body = enemy.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(-this.gameSpeed);
    
    this.enemies.add(enemy);
  }

  spawnCoin() {
    if (!this.coins) return;
    
    const { width, height } = this.scale;
    const coin = this.add.sprite(width + 50, height * (0.3 + Math.random() * 0.4), 'coin');
    coin.setScale(1.0);
    
    this.physics.world.enable(coin);
    const body = coin.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(-this.gameSpeed);
    
    this.coins.add(coin);

    // Add spinning animation
    this.tweens.add({
      targets: coin,
      rotation: Math.PI * 2,
      duration: 1000,
      repeat: -1
    });
  }

  spawnObstacle() {
    if (!this.obstacles) return;
    
    const { width, height } = this.scale;
    const obstacle = this.add.sprite(width + 50, height * 0.75, 'obstacle');
    obstacle.setScale(0.7);
    
    this.physics.world.enable(obstacle);
    const body = obstacle.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(-this.gameSpeed);
    
    this.obstacles.add(obstacle);
  }

  hitEnemy(player: any, enemy: any) {
    if (this.invulnerable) return;

    // Remove enemy
    enemy.destroy();
    
    // Add score and combo
    this.score += 10 * this.combo;
    this.combo = Math.min(this.combo + 1, 10);
    this.lastComboReset = Date.now();

    // Create hit effect
    this.createHitEffect(enemy.x, enemy.y, 0x39FF14);
    
    this.playSound('hit');
    this.vibrate(15);
  }

  collectCoin(player: any, coin: any) {
    coin.destroy();
    this.score += 1;
    
    this.createHitEffect(coin.x, coin.y, 0xFFD700);
    this.playSound('coin');
  }

  hitObstacle(player: any, obstacle: any) {
    if (this.invulnerable) return;

    this.takeDamage();
    this.createHitEffect(obstacle.x, obstacle.y, 0xFF1439);
  }

  takeDamage() {
    this.lives--;
    this.combo = 0;
    this.invulnerable = true;
    
    // Flash player
    if (this.player) {
      this.tweens.add({
        targets: this.player,
        alpha: 0.3,
        duration: 100,
        yoyo: true,
        repeat: 4,
        onComplete: () => {
          this.invulnerable = false;
          if (this.player) this.player.alpha = 1;
        }
      });
    }

    this.playSound('damage');
    this.vibrate(35);

    if (this.lives <= 0) {
      this.endGame();
    }
  }

  createHitEffect(x: number, y: number, color: number) {
    if (this.performanceMode) return;

    // Simple particle effect
    const particles = this.add.particles(x, y, 'coin', {
      speed: { min: 50, max: 150 },
      scale: { start: 0.3, end: 0 },
      lifespan: 200,
      quantity: 3,
      tint: color
    });

    this.time.delayedCall(300, () => particles.destroy());
  }

  cleanupObjects() {
    [this.enemies, this.coins, this.obstacles].forEach(group => {
      group?.children.entries.forEach(obj => {
        const sprite = obj as GameObjects.Sprite;
        if (sprite.x < -100) {
          sprite.destroy();
        }
      });
    });
  }

  increaseDifficulty() {
    this.difficulty = Math.min(this.difficulty + 0.5, 5);
    this.gameSpeed = Math.min(this.gameSpeed + 20, 300);
  }

  updateStats() {
    if (this.isGameOver) return;

    this.timeAlive += 0.1;

    // Reset combo if no hits for 5 seconds
    if (Date.now() - this.lastComboReset > 5000) {
      this.combo = Math.max(this.combo - 1, 0);
      this.lastComboReset = Date.now();
    }

    // Update UI
    this.onStatsUpdate?.({
      score: this.score,
      combo: this.combo,
      timeAlive: this.timeAlive,
      isGameOver: false
    });
  }

  endGame() {
    this.isGameOver = true;
    this.physics.pause();

    const finalStats = {
      score: this.score,
      bestScore: parseInt(localStorage.getItem('rughunter_best') || '0'),
      combo: this.combo,
      timeAlive: this.timeAlive,
      isGameOver: true
    };

    this.playSound('gameover');
    this.vibrate(60);

    this.time.delayedCall(1000, () => {
      this.onGameOver?.(finalStats);
    });
  }

  playSound(key: string) {
    if (!this.soundEnabled) return;

    // Play sound effect (placeholder)
    try {
      if (this.sounds[key]) {
        this.sounds[key].play();
      }
    } catch (error) {
      console.log('Sound playback failed:', key);
    }
  }

  vibrate(duration: number) {
    try {
      if (navigator.vibrate) {
        navigator.vibrate(duration);
      }
    } catch (error) {
      // Vibration not supported
    }
  }

  update() {
    // Main update loop - handled by events above
  }

  // Add gameplay instructions
  showGameplayInstructions() {
    const { width, height } = this.scale;
    
    // Create instruction text that fades out after 5 seconds
    const instructionText = this.add.text(width / 2, height * 0.15, 
      'SWIPE TO MOVE • TAP TO ATTACK • COLLECT COINS', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#39FF14',
      align: 'center'
    });
    instructionText.setOrigin(0.5);
    instructionText.setShadow(2, 2, '#000000', 4);
    instructionText.setAlpha(0.9);
    
    // Fade out instructions after 5 seconds
    this.tweens.add({
      targets: instructionText,
      alpha: 0,
      duration: 2000,
      delay: 5000,
      onComplete: () => {
        instructionText.destroy();
      }
    });
  }
}