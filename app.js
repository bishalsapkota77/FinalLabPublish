(()=>{"use strict";var e,t={494:(e,t,i)=>{var s=i(260),n=i.n(s);class a extends n().Scene{constructor(e,t){super(e),this.config=t,this.fontSize=34,this.lineHeight=42,this.fontOptions={fontSize:`${this.fontSize}px`,fill:"#fff"},this.screenCenter=[t.width/2,t.height/2]}create(){if(this.add.image(this.config.width/2,this.config.height/2,"land"),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setInteractive().setScale(2).setOrigin(1).on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let i=0;e.forEach((e=>{const s=[this.screenCenter[0],this.screenCenter[1]+i];e.textGO=this.add.text(...s,e.text,this.fontOptions).setOrigin(.5,1),i+=this.lineHeight,t(e)}))}}const r=a;const c=class extends r{constructor(e){super("PlayScene",e),this.bird=null,this.pipes=null,this.isPaused=!1,this.pipeHorizontalDistance=0,this.flapVelocity=300,this.currentDifficulty="easy",this.difficulties={easy:{pipeHorizontalDistanceRange:[300,350],pipeVerticalDistanceRange:[150,200]},normal:{pipeHorizontalDistanceRange:[250,300],pipeVerticalDistanceRange:[120,160]},hard:{pipeHorizontalDistanceRange:[220,270],pipeVerticalDistanceRange:[90,140]}},this.score=0,this.scoreText="",this.scorePosition={x:.02*this.config.width,y:.0267*this.config.height},this.pauseButtonPosition={x:this.config.width-10,y:this.config.height-10}}create(){this.currentDifficulty="easy",super.create(),this.createBird(),this.createPipes(),this.createColliders(),this.createScore(),this.createPause(),this.addFscreen(),this.handleInputs(),this.thumbStick(),this.listentoEvents(),this.createBirdAnim(),this.bird.play("birdAnim")}update(){this.checkGameStatus(),this.recyclePipes()}thumbStick(){this.add.image(this.config.width-10,this.config.height-this.config.height/10,"picshow").setInteractive().setScale(.2).setOrigin(1,0).on("pointerdown",(()=>{this.flap()}))}listentoEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in: "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Fly in: "+this.initialTime),this.initialTime<=0&&(this.isPaused=!1,this.countDownText.setText(""),this.physics.resume(),this.timedEvent.remove())}createBG(){this.add.image(this.config.width/2,this.config.height/2,"land")}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setOrigin(0).setScale(.3),this.bird.setBodySize(this.bird.width-30,this.bird.height/2),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,0);this.placePipes(e,t)}this.pipes.setVelocityX(-200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=localStorage.getItem("bestScore");this.scoreText=this.add.text(this.scorePosition.x,this.scorePosition.y,"Score: 0",{fontSize:"32px",fill:"#000"}),this.add.text(16,45,`Best Score: ${e||0}`,{fontSize:"20px",fill:"#000"})}addFscreen(){this.fscreen=this.add.sprite(this.config.width-350,this.config.height,"fscreen").setScale(.1),this.fscreen.setInteractive().on("pointerdown",(()=>{this.scale.toggleFullscreen()}))}createPause(){this.isPaused=!1;this.add.image(this.pauseButtonPosition.x,this.pauseButtonPosition.y,"pause").setInteractive().setScale(3).setOrigin(1).on("pointerdown",(()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown-J",this.flap,this)}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<0&&(e.push(t),2===e.length&&(this.placePipes(...e),this.increaseScore(),this.saveBestScore(),this.increaseDifficulty()))}))}increaseDifficulty(){10===this.score&&(this.currentDifficulty="normal"),20===this.score&&(this.currentDifficulty="hard")}placePipes(e,t){const i=this.difficulties[this.currentDifficulty],s=this.getRightMostPipe();let n=Phaser.Math.Between(...i.pipeVerticalDistanceRange),a=(Phaser.Math.Between(20,this.config.height-20-n),Phaser.Math.Between(...i.pipeHorizontalDistanceRange));e.x=s+a,e.y=n,t.x=e.x,t.y=e.y+n}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(15616036),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}flap(){this.isPaused||(this.bird.body.velocity.y=-this.flapVelocity)}increaseScore(){this.score++,this.scoreText.setText(`Score: ${this.score}`)}createBirdAnim(){this.anims.create({key:"birdAnim",frames:this.anims.generateFrameNumbers("bird",{start:0,end:5}),frameRate:6,repeat:-1})}};class h extends n().Scene{constructor(){super("PreloadScene")}preload(){this.load.image("land","assets/land.jpg"),this.load.spritesheet("bird","assets/mybird.png",{frameWidth:204,frameHeight:204}),this.load.image("pipe","assets/mypipee.png"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png"),this.load.image("fscreen","assets/fscreen.png"),this.load.image("picshow","assets/picshow.png")}create(){this.scene.start("MenuScene")}}const o=h;const l=class extends r{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"},{scene:null,text:"Exit"}]}create(){super.create(),this.createDevelopername(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}createDevelopername(){this.Text=this.add.text(0,this.config.height-30,"Developed by:-Bishal",{fontSize:"24px",fill:"#000"})}};const p=class extends r{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCenter,`Best Score:${e||0}`,this.fontOptions).setOrigin(.5)}};const d=class extends r{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&"Continue"==e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}},u={width:400,height:600,startPosition:{x:40,y:300}},f=[o,l,c,p,d],g=e=>new e(u),m={type:n().AUTO,scale:{mode:n().Scale.FIT,autoCenter:n().Scale.CENTER_BOTH,width:u.width,height:u.height},...u,physics:{default:"arcade",arcade:{debug:!1}},scene:f.map(g)};new(n().Game)(m)}},i={};function s(e){var n=i[e];if(void 0!==n)return n.exports;var a=i[e]={exports:{}};return t[e].call(a.exports,a,a.exports,s),a.exports}s.m=t,e=[],s.O=(t,i,n,a)=>{if(!i){var r=1/0;for(l=0;l<e.length;l++){for(var[i,n,a]=e[l],c=!0,h=0;h<i.length;h++)(!1&a||r>=a)&&Object.keys(s.O).every((e=>s.O[e](i[h])))?i.splice(h--,1):(c=!1,a<r&&(r=a));if(c){e.splice(l--,1);var o=n();void 0!==o&&(t=o)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[i,n,a]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var n,a,[r,c,h]=i,o=0;if(r.some((t=>0!==e[t]))){for(n in c)s.o(c,n)&&(s.m[n]=c[n]);if(h)var l=h(s)}for(t&&t(i);o<r.length;o++)a=r[o],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(l)},i=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var n=s.O(void 0,[736],(()=>s(494)));n=s.O(n)})();