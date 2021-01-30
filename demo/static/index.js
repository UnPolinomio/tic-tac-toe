function p(){let t=window.innerWidth,e=window.innerHeight;return t<e?t:e}function P(t){return t.every(e=>e===t[0])}function b(){return navigator.language.slice(0,2)}function h(t){return t.map(e=>Array.isArray(e)?h(e):e)}function m(t,e){return Math.floor(Math.random()*(e-t))+t}function w(t){let e=h(t);for(let r=0;r<e.length;r++){let s=m(0,e.length);[e[r],e[s]]=[e[s],e[r]]}return e}var l=[0,1,2],W=[[0,0,0],[0,0,0],[0,0,0]],c=class{constructor(e=W){this.status=e}arrayAllEqualAndNotZero(e){return P(e)&&!e.includes(0)}checkIfAllGridIsFilled(){return this.status.every(e=>e.every(r=>r!=0))}checkIfPlayerWins(e=!1){let r=this.status,s=n=>e?[!0,n]:!0;for(let n of l)if(this.arrayAllEqualAndNotZero(r[n]))return s(r[n][0]);for(let n of l){let a=r.map(d=>d[n]);if(this.arrayAllEqualAndNotZero(a))return s(a[0])}let i=[r[0][0],r[1][1],r[2][2]];if(this.arrayAllEqualAndNotZero(i))return s(i[0]);let o=[r[2][0],r[1][1],r[0][2]];return this.arrayAllEqualAndNotZero(o)?s(o[0]):e?[!1,null]:!1}};var g={en:{playerWins:"Player $player has won.",tie:"It's a tie.",restart:"Do you want to restart the game?"},es:{playerWins:"El jugador $player ha ganado.",tie:"Es empate.",restart:"\xBFDesea reiniciar el juego?"}};var A=b(),G={size:p(),translateDictionary:g[Object.keys(g).includes(A)?A:"en"],autoStart:!0,resetAspectRatioOnWindowResize:!0},S=class{constructor(t,e){this.stoped=!1,this.canvas=t,this.ctx=t.getContext("2d"),this.board=new c,this.config={...G,...e},this.currentPlayer=1,this.setSize(this.config.size),this.convertSize=this.convertSize.bind(this),this.convertSizeArray=this.convertSizeArray.bind(this),this.handleClick=this.handleClick.bind(this),this.handleWindowResize=this.handleWindowResize.bind(this),this.config.autoStart&&this.start(),this.config.resetAspectRatioOnWindowResize&&window.addEventListener("resize",this.handleWindowResize)}handleWindowResize(){this.setSize(p()),this.redraw()}setSize(t){this.config.size=t,this.canvas.width=t,this.canvas.height=t}convertSize(t){return t*this.config.size/100}convertSizeArray(...t){return t.map(this.convertSize)}getMousePosition(t){let e=this.canvas.getBoundingClientRect();return{x:(t.clientX-e.left)*100/this.config.size,y:(t.clientY-e.top)*100/this.config.size}}drawGrid(){let t=this.convertSize,e=this.ctx;e.lineWidth=7,e.beginPath(),e.moveTo(t(100/3),t(0)),e.lineTo(t(100/3),t(100)),e.moveTo(t(100*2/3),t(0)),e.lineTo(t(100*2/3),t(100)),e.moveTo(t(0),t(100/3)),e.lineTo(t(100),t(100/3)),e.moveTo(t(0),t(100*2/3)),e.lineTo(t(100),t(100*2/3)),e.stroke()}drawX(t,e){let r=this.convertSize(100/7);this.ctx.save(),this.ctx.translate(t,e),this.ctx.beginPath(),this.ctx.moveTo(-r/2,-r/2),this.ctx.lineTo(r/2,r/2),this.ctx.moveTo(-r/2,r/2),this.ctx.lineTo(r/2,-r/2),this.ctx.lineWidth=5,this.ctx.strokeStyle="rgb(200, 0, 0, 255)",this.ctx.stroke(),this.ctx.restore()}drawO(t,e){let r=this.convertSize(100/7);this.ctx.save(),this.ctx.translate(t,e),this.ctx.beginPath(),this.ctx.arc(0,0,r/2,0,Math.PI*2,!0),this.ctx.fillStyle="rgb(0, 0, 200, 255)",this.ctx.fill(),this.ctx.restore()}redraw(){let t=this.convertSize,e=this.convertSizeArray;this.ctx.clearRect(0,0,t(100),t(100));for(let r=0;r<this.board.status.length;r++){let s=this.board.status[r];for(let i=0;i<s.length;i++){let o=s[i],[n,a]=e(100/6+i*100/3,100/6+r*100/3);o===1?this.drawX(n,a):o===2&&this.drawO(n,a)}}this.drawGrid()}handleClick(t){let{x:e,y:r}=this.getMousePosition(t),s,i;s=Math.min(2,Math.floor(r/(100/3))),i=Math.min(2,Math.floor(e/(100/3)));let o=this.playIn(s,i),n=this.config.autoPlayer;n&&o&&!this.stoped&&this.playIn(...n(this.board,this.currentPlayer))}playIn(t,e){if(this.stoped)throw new Error("Game is stoped");if(this.board.status[t][e]===0){this.board.status[t][e]=this.currentPlayer;let[n,a]=this.convertSizeArray(100/6+e*100/3,100/6+t*100/3);this.currentPlayer===1?this.drawX(n,a):this.drawO(n,a)}else return!1;let r=this.config.translateDictionary,s=`"${S.playerSymbols[this.currentPlayer-1]}"`,i=!1,o=!1;return this.board.checkIfPlayerWins()?(i=confirm(`${r.playerWins.replace("$player",s)} ${r.restart}`),o=!0):this.board.checkIfAllGridIsFilled()&&(i=confirm(`${r.tie} ${r.restart}`),o=!0),o?(this.currentPlayer=1,i?this.restart():this.stop(),!0):(this.currentPlayer=this.currentPlayer===1?2:1,!0)}start(){this.drawGrid(),this.canvas.addEventListener("click",this.handleClick),this.stoped=!1}stop(){this.canvas.removeEventListener("click",this.handleClick),this.stoped=!0}restart(){this.board.status=[[0,0,0],[0,0,0],[0,0,0]],this.redraw(),this.stoped=!1}},x=S;x.playerSymbols=["X","O"];function z(t,e,r,s=!1){let[i,o]=t.checkIfPlayerWins(!0);if(i)return e===o?1:-1;if(t.checkIfAllGridIsFilled())return 0;let n=[1,1],a=r?-Infinity:Infinity,d=r?e:e===1?2:1;for(let u of w(l))for(let f of w(l)){if(r&&a===1||!r&&a===-1)break;if(t.status[u][f]===0){let v=h(t.status);v[u][f]=d;let E=new c(v),y=z(E,e,!r);(r&&y>a||!r&&y<a)&&(a=y,n=[u,f])}}return s?n:a}function I(t,e){return z(t,e,!0,!0)}function j(t){let e=t.status,r=[];for(let s of l){let i=e[s];for(let o of l)i[o]===0&&r.push([s,o])}if(r.length>0){let s=m(0,r.length);return r[s]}else throw new Error("Game already ended")}function k(t){if(!(t>=0&&t<=1))throw new Error(`Bad goodness argument. Expected value between 0 and 1. Got ${t}`);return function(e,r){return Math.random()<t?I(e,r):j(e)}}var T=document.createElement("canvas");document.body.appendChild(T);var V=new x(T,{autoPlayer:k(.6)});
