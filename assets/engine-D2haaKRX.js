const Xc=["stacker","rgv","agv","shuttleCar","conveyor","turn","robot","machine","exhibitTransfer","exhibitRobot","exhibitAgv","exhibitHood"];function Yc(i){const e=i.params;return i.type==="barRack"?e.bays*e.lanes*e.levels:i.type==="shuttle"?e.bays*e.rows*e.levels:i.type==="binRack"?e.smallBays*e.smallLevels+e.largeBays*e.largeLevels:["rack","exhibitRack"].includes(i.type)?e.bays*e.levels:0}function In(i){let e=2166136261;for(const t of i)e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0}const ls=[["SKU-001","电机组件"],["SKU-002","铝型材"],["SKU-003","标准紧固件"],["SKU-004","传动轴"],["SKU-005","包装辅料"]];function Wr(i,e=2026){const t=[],n={};let s=0;for(const r of i){const a=r.params;for(let o=0;o<Yc(r);o++){const h=In(`${e}:${r.id}:${o}`),l=r.type==="exhibitRack"&&(o%a.bays+1===a.liftBay||o<a.bays&&o+1===a.exitBay)?!1:r.initialOccupiedSlots?r.initialOccupiedSlots.includes(o):h%100<68;t.push({id:`${r.id}:${o}`,deviceId:r.id,index:o,location:r.type==="binRack"?`${r.name} / ${o<a.smallBays*a.smallLevels?"小料框":"大料筐"} / ${String(o<a.smallBays*a.smallLevels?Math.floor(o/a.smallLevels)+1:a.smallBays+Math.floor((o-a.smallBays*a.smallLevels)/a.largeLevels)+1).padStart(2,"0")}排 / ${String(o<a.smallBays*a.smallLevels?o%a.smallLevels+1:(o-a.smallBays*a.smallLevels)%a.largeLevels+1).padStart(2,"0")}层`:`${r.name} / ${String(o+1).padStart(4,"0")}`,occupied:l,sku:l?ls[h%ls.length][0]:"",product:l?ls[h%ls.length][1]:"",quantity:l?1+h%24:0,batch:l?`B202610-${String(h%90+10)}`:""})}Xc.includes(r.type)&&(s++,n[r.id]={id:r.id,code:`DEV-${String(s).padStart(3,"0")}`,status:r.type==="machine"?"maintenance":"idle",completed:0,temperature:25+In(r.id)%9,power:0,travel:0,lift:1,alarm:""})}return{seed:e,elapsed:0,completed:0,slots:t,devices:n,tasks:[],events:[{time:0,message:"模拟库存与设备数据已生成"}]}}function qc(i,e,t=1){var r;i.elapsed+=t;const n=new Map(e.map(a=>[a.id,a]));let s=!1;for(const[a,o]of Object.entries(i.devices)){const h=n.get(a);if(!h)continue;if(o.status==="fault"||o.status==="maintenance"){o.power=0;continue}o.status="running",o.temperature=+(29+Math.sin(i.elapsed/18+In(a)%10)*3).toFixed(1),o.power=+(1.2+Math.abs(Math.sin(i.elapsed/9+In(a)%7))*2.8).toFixed(2);const l=h.params.railLength||8;o.travel=+((l/2-2)*Math.sin(i.elapsed/8+In(a)%5)).toFixed(2),o.lift=+(.5+((h.params.height||5)-1)*(.5+.5*Math.sin(i.elapsed/10))).toFixed(2)}for(const a of i.tasks.filter(o=>o.status==="running")){const o=i.devices[a.deviceId];if(!(!o||["fault","maintenance"].includes(o.status))&&(a.progress=Math.min(100,a.progress+t*20),a.progress===100)){const h=i.slots.find(c=>c.id===a.source),l=i.slots.find(c=>c.id===a.target);if(h!=null&&h.occupied&&l&&!l.occupied){for(const c of["sku","product","quantity","batch",...i.source==="SQL"?["boxCode","boxId","size","items"]:[]])l[c]=h[c],h[c]=c==="quantity"?null:c==="items"?[]:c==="boxId"?null:c==="size"?0:"";if(i.source==="SQL")for(const c of i.inventory)c.boxId===l.boxId&&(c.locationId=l.locationId);h.occupied=!1,l.occupied=!0,s=!0,i.completed++,o.completed++,a.status="completed",i.events.unshift({time:i.elapsed,message:`${a.code} 移库完成`})}else a.status="cancelled"}}if(!i.tasks.some(a=>a.status==="running")&&i.elapsed%3===0){const a=Object.values(i.devices).filter(p=>!["fault","maintenance"].includes(p.status)),o=a[Math.floor(i.elapsed/3)%a.length],h=o?(r=n.get(o.id))==null?void 0:r.aisle:null,l=p=>{var m;return!h||((m=n.get(p.deviceId))==null?void 0:m.aisle)===h},c=i.slots.find(p=>p.occupied&&l(p)),u=[...i.slots].reverse().find(p=>!p.occupied&&l(p));o&&c&&u&&(i.tasks.unshift({code:`MOCK-${String(i.completed+1).padStart(4,"0")}`,source:c.id,target:u.id,deviceId:o.id,from:c.location,to:u.location,status:"running",progress:0}),i.events.unshift({time:i.elapsed,message:`模拟移库任务分配给 ${o.code}`}))}return i.tasks=i.tasks.slice(0,30),i.events=i.events.slice(0,40),s}function jc(i,e){if(i.type==="exhibitTransfer")return{travel:e*.12,lift:0,extension:0};if(i.type==="exhibitHood"){const n=e%16;let s=n<3?0:n<7?(n-3)/4:n<10?1:n<14?1-(n-10)/4:0;return s=s*s*(3-2*s),{travel:0,lift:0,extension:90*s-(i.params.angle||0)}}if(i.type==="stacker"){const n=e%16,s=n>=5&&n<11,r=((i.params.railLength||8)/2-2)*Math.sin(Math.floor(e/16)*.7+In(i.id)%5),a=((i.params.railLength||8)/2-2)*Math.sin((Math.floor(e/16)-1)*.7+In(i.id)%5),o=Math.min(n/5,1),h=o*o*(3-2*o);return{travel:a+(r-a)*h,lift:.5+((i.params.height||5)-1)*(.5+.4*(Math.sin((Math.floor(e/16)-1)*.9)+(Math.sin(Math.floor(e/16)*.9)-Math.sin((Math.floor(e/16)-1)*.9))*h)),extension:s?Math.sin((n-5)/6*Math.PI)*.6*(Math.floor(e/16)%2?1:-1):0}}const t=In(i.id)%5;return{travel:((i.params.railLength||8)/2-2)*Math.sin(e/8+t),lift:.5+((i.params.height||5)-1)*(.5+.5*Math.sin(e/10))}}const Zc=(i,e,t)=>i+(e-i)*t;function ar(i){var e;return i.type==="inbound"?i.returnRoute:(e=i.station)==null?void 0:e.route}function cs(i){return i.type==="inbound"?0:9}function Vl(i,e){return Math.hypot(i[0]-e[0],i[2]-e[2])}function yo(i,e){const t=i.slice(1).map((r,a)=>Vl(i[a],r));let s=t.reduce((r,a)=>r+a,0)*e;for(let r=0;r<t.length;r++){if(s<=t[r]&&t[r]>0)return{leg:r,position:i[r].map((a,o)=>Zc(a,i[r+1][o],s/t[r]))};s-=t[r]}return{leg:t.length-1,position:i.at(-1)}}function $c(i,e){const t=(n,s)=>[Math.min(n[0][s],n[1][s]),Math.max(n[0][s],n[1][s])];return[0,2].every(n=>{const s=t(i,n),r=t(e,n);return s[0]<=r[1]+.05&&r[0]<=s[1]+.05})}function Gl(i,e,t){const n=ar(i);if(!n)return!0;const s=cs(i),r=Math.min(1,t/i.durations[s]),a=i.type==="inbound"?r:r*r*(3-2*r),o=yo(n,a),h=Math.max(i.geometry.width,i.geometry.depth)+.2,l=o.leg===0&&Vl(o.position,n[1])>h,c=[];if(!l){o.leg>0&&c.push([o.position,n[o.leg+1]]);for(let u=o.leg+1;u<n.length-1;u++)c.push(n.slice(u,u+2))}for(const u of e.tasks){if(u===i||u.collected)continue;if(!(JSON.stringify(ar(u))===JSON.stringify(n))&&u.status==="running"&&u.phase===cs(u)&&(u.transportSections||[]).some(m=>c.some(M=>$c(m,M))))return!1;if(u.cargoState==="conveyor"){const m=ar(u);if(!m)continue;const M=u.status==="completed"||u.returnRouteDone?1:u.phase===cs(u)?Math.min(1,u.phaseElapsed/u.durations[cs(u)]):0,S=u.type==="inbound"?M:M*M*(3-2*M),f=yo(m,S).position,d=(i.geometry.width+u.geometry.width)/2+.06,E=(i.geometry.depth+u.geometry.depth)/2+.06;if(Math.abs(f[0]-o.position[0])<d&&Math.abs(f[2]-o.position[2])<E)return!1}}return i.transportSections=c,!0}function Wl(i){i.transportSections=[],i.routeReserved=!1}function Un(i){return i.status!=="running"?!1:i.type==="outbound"?i.phase<9:i.type==="inbound"?!i.waitingForStacker&&(!i.returnRoute||i.phase>0):!1}function za(i){return["queued","submitting"].includes(i.status)||Un(i)}const ka=10;function Xl(i){return i.tasks.filter(e=>["outbound","inbound"].includes(e.type)&&!e.collected&&!["cancelled","failed"].includes(e.status)&&!(e.type==="inbound"&&e.cargoState==="rack")).length}function Yl(i,e,t,n){if(!i.serverTaskId)return!1;const s=e===t&&!i.dbPickupDone?"pickup":e===n&&!i.dbCompleteDone?"complete":null;return s?(i.needsDbAction=s,i.stage="等待数据库确认",!0):!1}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ha="180",Ei={ROTATE:0,DOLLY:1,PAN:2},Si={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kc=0,Eo=1,Jc=2,ql=1,jl=2,vn=3,Fn=0,Ct=1,xn=2,vt=0,bi=1,bo=2,To=3,wo=4,Zl=5,Jt=100,Qc=101,eh=102,th=103,nh=104,Zi=200,ih=201,sh=202,rh=203,Xr=204,Yr=205,qr=206,ah=207,jr=208,oh=209,lh=210,ch=211,hh=212,uh=213,dh=214,Zr=0,$r=1,Kr=2,wi=3,Jr=4,Qr=5,ea=6,ta=7,Va=0,fh=1,ph=2,Nn=0,$l=1,Kl=2,Jl=3,Ga=4,Ql=5,ec=6,tc=7,nc=300,Ai=301,Ri=302,na=303,ia=304,tr=306,On=1e3,$n=1001,sa=1002,Pt=1003,mh=1004,hs=1005,ln=1006,or=1007,Kn=1008,en=1009,ic=1010,sc=1011,es=1012,Wa=1013,Jn=1014,cn=1015,yn=1016,Xa=1017,Ya=1018,Ci=1020,rc=35902,ac=35899,oc=1021,lc=1022,qt=1023,ts=1026,Pi=1027,qa=1028,ja=1029,cc=1030,Za=1031,$a=1033,Hs=33776,Vs=33777,Gs=33778,Ws=33779,ra=35840,aa=35841,oa=35842,la=35843,ca=36196,ha=37492,ua=37496,da=37808,fa=37809,pa=37810,ma=37811,ga=37812,_a=37813,va=37814,xa=37815,Ma=37816,Sa=37817,ya=37818,Ea=37819,ba=37820,Ta=37821,wa=36492,Aa=36494,Ra=36495,Ca=36283,Pa=36284,Da=36285,La=36286,gh=3200,_h=3201,nr=0,vh=1,Dn="",Mt="srgb",Di="srgb-linear",$s="linear",Je="srgb",ti=7680,Ao=519,xh=512,Mh=513,Sh=514,hc=515,yh=516,Eh=517,bh=518,Th=519,Ia=35044,wh=35048,Ro="300 es",hn=2e3,Ks=2001;class Qn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Co=1234567;const Ji=Math.PI/180,ns=180/Math.PI;function Mn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yt[i&255]+yt[i>>8&255]+yt[i>>16&255]+yt[i>>24&255]+"-"+yt[e&255]+yt[e>>8&255]+"-"+yt[e>>16&15|64]+yt[e>>24&255]+"-"+yt[t&63|128]+yt[t>>8&255]+"-"+yt[t>>16&255]+yt[t>>24&255]+yt[n&255]+yt[n>>8&255]+yt[n>>16&255]+yt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function Ka(i,e){return(i%e+e)%e}function Ah(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Rh(i,e,t){return i!==e?(t-i)/(e-i):0}function Qi(i,e,t){return(1-t)*i+t*e}function Ch(i,e,t,n){return Qi(i,e,1-Math.exp(-t*n))}function Ph(i,e=1){return e-Math.abs(Ka(i,e*2)-e)}function Dh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Lh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ih(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Uh(i,e){return i+Math.random()*(e-i)}function Nh(i){return i*(.5-Math.random())}function Fh(i){i!==void 0&&(Co=i);let e=Co+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Oh(i){return i*Ji}function Bh(i){return i*ns}function zh(i){return(i&i-1)===0&&i!==0}function kh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vh(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),h=a(t/2),l=r((e+n)/2),c=a((e+n)/2),u=r((e-n)/2),p=a((e-n)/2),m=r((n-e)/2),M=a((n-e)/2);switch(s){case"XYX":i.set(o*c,h*u,h*p,o*l);break;case"YZY":i.set(h*p,o*c,h*u,o*l);break;case"ZXZ":i.set(h*u,h*p,o*c,o*l);break;case"XZX":i.set(o*c,h*M,h*m,o*l);break;case"YXY":i.set(h*m,o*c,h*M,o*l);break;case"ZYZ":i.set(h*M,h*m,o*c,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qe(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const tn={DEG2RAD:Ji,RAD2DEG:ns,generateUUID:Mn,clamp:Ge,euclideanModulo:Ka,mapLinear:Ah,inverseLerp:Rh,lerp:Qi,damp:Ch,pingpong:Ph,smoothstep:Dh,smootherstep:Lh,randInt:Ih,randFloat:Uh,randFloatSpread:Nh,seededRandom:Fh,degToRad:Oh,radToDeg:Bh,isPowerOfTwo:zh,ceilPowerOfTwo:kh,floorPowerOfTwo:Hh,setQuaternionFromProperEuler:Vh,normalize:Qe,denormalize:Qt};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class un{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let h=n[s+0],l=n[s+1],c=n[s+2],u=n[s+3];const p=r[a+0],m=r[a+1],M=r[a+2],S=r[a+3];if(o===0){e[t+0]=h,e[t+1]=l,e[t+2]=c,e[t+3]=u;return}if(o===1){e[t+0]=p,e[t+1]=m,e[t+2]=M,e[t+3]=S;return}if(u!==S||h!==p||l!==m||c!==M){let f=1-o;const d=h*p+l*m+c*M+u*S,E=d>=0?1:-1,w=1-d*d;if(w>Number.EPSILON){const C=Math.sqrt(w),y=Math.atan2(C,d*E);f=Math.sin(f*y)/C,o=Math.sin(o*y)/C}const b=o*E;if(h=h*f+p*b,l=l*f+m*b,c=c*f+M*b,u=u*f+S*b,f===1-o){const C=1/Math.sqrt(h*h+l*l+c*c+u*u);h*=C,l*=C,c*=C,u*=C}}e[t]=h,e[t+1]=l,e[t+2]=c,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],h=n[s+1],l=n[s+2],c=n[s+3],u=r[a],p=r[a+1],m=r[a+2],M=r[a+3];return e[t]=o*M+c*u+h*m-l*p,e[t+1]=h*M+c*p+l*u-o*m,e[t+2]=l*M+c*m+o*p-h*u,e[t+3]=c*M-o*u-h*p-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,l=o(n/2),c=o(s/2),u=o(r/2),p=h(n/2),m=h(s/2),M=h(r/2);switch(a){case"XYZ":this._x=p*c*u+l*m*M,this._y=l*m*u-p*c*M,this._z=l*c*M+p*m*u,this._w=l*c*u-p*m*M;break;case"YXZ":this._x=p*c*u+l*m*M,this._y=l*m*u-p*c*M,this._z=l*c*M-p*m*u,this._w=l*c*u+p*m*M;break;case"ZXY":this._x=p*c*u-l*m*M,this._y=l*m*u+p*c*M,this._z=l*c*M+p*m*u,this._w=l*c*u-p*m*M;break;case"ZYX":this._x=p*c*u-l*m*M,this._y=l*m*u+p*c*M,this._z=l*c*M-p*m*u,this._w=l*c*u+p*m*M;break;case"YZX":this._x=p*c*u+l*m*M,this._y=l*m*u+p*c*M,this._z=l*c*M-p*m*u,this._w=l*c*u-p*m*M;break;case"XZY":this._x=p*c*u-l*m*M,this._y=l*m*u-p*c*M,this._z=l*c*M+p*m*u,this._w=l*c*u+p*m*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],l=t[2],c=t[6],u=t[10],p=n+o+u;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(c-h)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(c-h)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(h+c)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(h+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,l=t._z,c=t._w;return this._x=n*c+a*o+s*l-r*h,this._y=s*c+a*h+r*o-n*l,this._z=r*c+a*l+n*h-s*o,this._w=a*c-n*o-s*h-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const h=1-o*o;if(h<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(h),c=Math.atan2(l,o),u=Math.sin((1-t)*c)/l,p=Math.sin(t*c)/l;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Po.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Po.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,l=2*(a*s-o*n),c=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+h*l+a*u-o*c,this.y=n+h*c+o*l-r*u,this.z=s+h*u+r*c-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-n*h,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lr.copy(this).projectOnVector(e),this.sub(lr)}reflect(e){return this.sub(lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lr=new N,Po=new un;class He{constructor(e,t,n,s,r,a,o,h,l){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,h,l)}set(e,t,n,s,r,a,o,h,l){const c=this.elements;return c[0]=e,c[1]=s,c[2]=o,c[3]=t,c[4]=r,c[5]=h,c[6]=n,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],h=n[6],l=n[1],c=n[4],u=n[7],p=n[2],m=n[5],M=n[8],S=s[0],f=s[3],d=s[6],E=s[1],w=s[4],b=s[7],C=s[2],y=s[5],x=s[8];return r[0]=a*S+o*E+h*C,r[3]=a*f+o*w+h*y,r[6]=a*d+o*b+h*x,r[1]=l*S+c*E+u*C,r[4]=l*f+c*w+u*y,r[7]=l*d+c*b+u*x,r[2]=p*S+m*E+M*C,r[5]=p*f+m*w+M*y,r[8]=p*d+m*b+M*x,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],c=e[8];return t*a*c-t*o*l-n*r*c+n*o*h+s*r*l-s*a*h}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],c=e[8],u=c*a-o*l,p=o*h-c*r,m=l*r-a*h,M=t*u+n*p+s*m;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/M;return e[0]=u*S,e[1]=(s*l-c*n)*S,e[2]=(o*n-s*a)*S,e[3]=p*S,e[4]=(c*t-s*h)*S,e[5]=(s*r-o*t)*S,e[6]=m*S,e[7]=(n*h-l*t)*S,e[8]=(a*t-n*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const h=Math.cos(r),l=Math.sin(r);return this.set(n*h,n*l,-n*(h*a+l*o)+a+e,-s*l,s*h,-s*(-l*a+h*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(cr.makeScale(e,t)),this}rotate(e){return this.premultiply(cr.makeRotation(-e)),this}translate(e,t){return this.premultiply(cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const cr=new He;function uc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Js(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gh(){const i=Js("canvas");return i.style.display="block",i}const Do={};function is(i){i in Do||(Do[i]=!0,console.warn(i))}function Wh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Lo=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Io=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xh(){const i={enabled:!0,workingColorSpace:Di,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Je&&(s.r=Sn(s.r),s.g=Sn(s.g),s.b=Sn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Dn?$s:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return is("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return is("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Di]:{primaries:e,whitePoint:n,transfer:$s,toXYZ:Lo,fromXYZ:Io,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:Lo,fromXYZ:Io,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),i}const qe=Xh();function Sn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ti(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ni;class Yh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ni===void 0&&(ni=Js("canvas")),ni.width=e.width,ni.height=e.height;const s=ni.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ni}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Js("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Sn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Sn(t[n]/255)*255):t[n]=Sn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qh=0;class Ja{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=Mn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(hr(s[a].image)):r.push(hr(s[a]))}else r=hr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function hr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jh=0;const ur=new N;class Tt extends Qn{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=$n,s=$n,r=ln,a=Kn,o=qt,h=en,l=Tt.DEFAULT_ANISOTROPY,c=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Mn(),this.name="",this.source=new Ja(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ur).x}get height(){return this.source.getSize(ur).y}get depth(){return this.source.getSize(ur).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case On:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case On:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=nc;Tt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,s=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const h=e.elements,l=h[0],c=h[4],u=h[8],p=h[1],m=h[5],M=h[9],S=h[2],f=h[6],d=h[10];if(Math.abs(c-p)<.01&&Math.abs(u-S)<.01&&Math.abs(M-f)<.01){if(Math.abs(c+p)<.1&&Math.abs(u+S)<.1&&Math.abs(M+f)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,b=(m+1)/2,C=(d+1)/2,y=(c+p)/4,x=(u+S)/4,A=(M+f)/4;return w>b&&w>C?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=y/n,r=x/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=y/s,r=A/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=x/r,s=A/r),this.set(n,s,r,t),this}let E=Math.sqrt((f-M)*(f-M)+(u-S)*(u-S)+(p-c)*(p-c));return Math.abs(E)<.001&&(E=1),this.x=(f-M)/E,this.y=(u-S)/E,this.z=(p-c)/E,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zh extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Tt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ja(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends Zh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dc extends Tt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $h extends Tt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kt{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zt):Zt.fromBufferAttribute(r,a),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),us.copy(n.boundingBox)),us.applyMatrix4(e.matrixWorld),this.union(us)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oi),ds.subVectors(this.max,Oi),ii.subVectors(e.a,Oi),si.subVectors(e.b,Oi),ri.subVectors(e.c,Oi),bn.subVectors(si,ii),Tn.subVectors(ri,si),Vn.subVectors(ii,ri);let t=[0,-bn.z,bn.y,0,-Tn.z,Tn.y,0,-Vn.z,Vn.y,bn.z,0,-bn.x,Tn.z,0,-Tn.x,Vn.z,0,-Vn.x,-bn.y,bn.x,0,-Tn.y,Tn.x,0,-Vn.y,Vn.x,0];return!dr(t,ii,si,ri,ds)||(t=[1,0,0,0,1,0,0,0,1],!dr(t,ii,si,ri,ds))?!1:(fs.crossVectors(bn,Tn),t=[fs.x,fs.y,fs.z],dr(t,ii,si,ri,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fn=[new N,new N,new N,new N,new N,new N,new N,new N],Zt=new N,us=new kt,ii=new N,si=new N,ri=new N,bn=new N,Tn=new N,Vn=new N,Oi=new N,ds=new N,fs=new N,Gn=new N;function dr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Gn.fromArray(i,r);const o=s.x*Math.abs(Gn.x)+s.y*Math.abs(Gn.y)+s.z*Math.abs(Gn.z),h=e.dot(Gn),l=t.dot(Gn),c=n.dot(Gn);if(Math.max(-Math.max(h,l,c),Math.min(h,l,c))>o)return!1}return!0}const Kh=new kt,Bi=new N,fr=new N;class rs{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Kh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);const t=Bi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Bi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(fr)),this.expandByPoint(Bi.copy(e.center).sub(fr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const pn=new N,pr=new N,ps=new N,wn=new N,mr=new N,ms=new N,gr=new N;class Qa{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pn.copy(this.origin).addScaledVector(this.direction,t),pn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pr.copy(e).add(t).multiplyScalar(.5),ps.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(pr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ps),o=wn.dot(this.direction),h=-wn.dot(ps),l=wn.lengthSq(),c=Math.abs(1-a*a);let u,p,m,M;if(c>0)if(u=a*h-o,p=a*o-h,M=r*c,u>=0)if(p>=-M)if(p<=M){const S=1/c;u*=S,p*=S,m=u*(u+a*p+2*o)+p*(a*u+p+2*h)+l}else p=r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*h)+l;else p=-r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*h)+l;else p<=-M?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-h),r),m=-u*u+p*(p+2*h)+l):p<=M?(u=0,p=Math.min(Math.max(-r,-h),r),m=p*(p+2*h)+l):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-h),r),m=-u*u+p*(p+2*h)+l);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*h)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(pr).addScaledVector(ps,p),m}intersectSphere(e,t){pn.subVectors(e.center,this.origin);const n=pn.dot(this.direction),s=pn.dot(pn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,h=n+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,h;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),c>=0?(r=(e.min.y-p.y)*c,a=(e.max.y-p.y)*c):(r=(e.max.y-p.y)*c,a=(e.min.y-p.y)*c),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-p.z)*u,h=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,h=(e.min.z-p.z)*u),n>h||o>s)||((o>n||n!==n)&&(n=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,pn)!==null}intersectTriangle(e,t,n,s,r){mr.subVectors(t,e),ms.subVectors(n,e),gr.crossVectors(mr,ms);let a=this.direction.dot(gr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wn.subVectors(this.origin,e);const h=o*this.direction.dot(ms.crossVectors(wn,ms));if(h<0)return null;const l=o*this.direction.dot(mr.cross(wn));if(l<0||h+l>a)return null;const c=-o*wn.dot(gr);return c<0?null:this.at(c/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(e,t,n,s,r,a,o,h,l,c,u,p,m,M,S,f){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,h,l,c,u,p,m,M,S,f)}set(e,t,n,s,r,a,o,h,l,c,u,p,m,M,S,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=h,d[2]=l,d[6]=c,d[10]=u,d[14]=p,d[3]=m,d[7]=M,d[11]=S,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ai.setFromMatrixColumn(e,0).length(),r=1/ai.setFromMatrixColumn(e,1).length(),a=1/ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),h=Math.cos(s),l=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const p=a*c,m=a*u,M=o*c,S=o*u;t[0]=h*c,t[4]=-h*u,t[8]=l,t[1]=m+M*l,t[5]=p-S*l,t[9]=-o*h,t[2]=S-p*l,t[6]=M+m*l,t[10]=a*h}else if(e.order==="YXZ"){const p=h*c,m=h*u,M=l*c,S=l*u;t[0]=p+S*o,t[4]=M*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*c,t[9]=-o,t[2]=m*o-M,t[6]=S+p*o,t[10]=a*h}else if(e.order==="ZXY"){const p=h*c,m=h*u,M=l*c,S=l*u;t[0]=p-S*o,t[4]=-a*u,t[8]=M+m*o,t[1]=m+M*o,t[5]=a*c,t[9]=S-p*o,t[2]=-a*l,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const p=a*c,m=a*u,M=o*c,S=o*u;t[0]=h*c,t[4]=M*l-m,t[8]=p*l+S,t[1]=h*u,t[5]=S*l+p,t[9]=m*l-M,t[2]=-l,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const p=a*h,m=a*l,M=o*h,S=o*l;t[0]=h*c,t[4]=S-p*u,t[8]=M*u+m,t[1]=u,t[5]=a*c,t[9]=-o*c,t[2]=-l*c,t[6]=m*u+M,t[10]=p-S*u}else if(e.order==="XZY"){const p=a*h,m=a*l,M=o*h,S=o*l;t[0]=h*c,t[4]=-u,t[8]=l*c,t[1]=p*u+S,t[5]=a*c,t[9]=m*u-M,t[2]=M*u-m,t[6]=o*c,t[10]=S*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jh,e,Qh)}lookAt(e,t,n){const s=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),An.crossVectors(n,Ft),An.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),An.crossVectors(n,Ft)),An.normalize(),gs.crossVectors(Ft,An),s[0]=An.x,s[4]=gs.x,s[8]=Ft.x,s[1]=An.y,s[5]=gs.y,s[9]=Ft.y,s[2]=An.z,s[6]=gs.z,s[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],h=n[8],l=n[12],c=n[1],u=n[5],p=n[9],m=n[13],M=n[2],S=n[6],f=n[10],d=n[14],E=n[3],w=n[7],b=n[11],C=n[15],y=s[0],x=s[4],A=s[8],_=s[12],g=s[1],T=s[5],L=s[9],P=s[13],I=s[2],z=s[6],B=s[10],X=s[14],k=s[3],W=s[7],ee=s[11],oe=s[15];return r[0]=a*y+o*g+h*I+l*k,r[4]=a*x+o*T+h*z+l*W,r[8]=a*A+o*L+h*B+l*ee,r[12]=a*_+o*P+h*X+l*oe,r[1]=c*y+u*g+p*I+m*k,r[5]=c*x+u*T+p*z+m*W,r[9]=c*A+u*L+p*B+m*ee,r[13]=c*_+u*P+p*X+m*oe,r[2]=M*y+S*g+f*I+d*k,r[6]=M*x+S*T+f*z+d*W,r[10]=M*A+S*L+f*B+d*ee,r[14]=M*_+S*P+f*X+d*oe,r[3]=E*y+w*g+b*I+C*k,r[7]=E*x+w*T+b*z+C*W,r[11]=E*A+w*L+b*B+C*ee,r[15]=E*_+w*P+b*X+C*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],l=e[13],c=e[2],u=e[6],p=e[10],m=e[14],M=e[3],S=e[7],f=e[11],d=e[15];return M*(+r*h*u-s*l*u-r*o*p+n*l*p+s*o*m-n*h*m)+S*(+t*h*m-t*l*p+r*a*p-s*a*m+s*l*c-r*h*c)+f*(+t*l*u-t*o*m-r*a*u+n*a*m+r*o*c-n*l*c)+d*(-s*o*c-t*h*u+t*o*p+s*a*u-n*a*p+n*h*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],c=e[8],u=e[9],p=e[10],m=e[11],M=e[12],S=e[13],f=e[14],d=e[15],E=u*f*l-S*p*l+S*h*m-o*f*m-u*h*d+o*p*d,w=M*p*l-c*f*l-M*h*m+a*f*m+c*h*d-a*p*d,b=c*S*l-M*u*l+M*o*m-a*S*m-c*o*d+a*u*d,C=M*u*h-c*S*h-M*o*p+a*S*p+c*o*f-a*u*f,y=t*E+n*w+s*b+r*C;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const x=1/y;return e[0]=E*x,e[1]=(S*p*r-u*f*r-S*s*m+n*f*m+u*s*d-n*p*d)*x,e[2]=(o*f*r-S*h*r+S*s*l-n*f*l-o*s*d+n*h*d)*x,e[3]=(u*h*r-o*p*r-u*s*l+n*p*l+o*s*m-n*h*m)*x,e[4]=w*x,e[5]=(c*f*r-M*p*r+M*s*m-t*f*m-c*s*d+t*p*d)*x,e[6]=(M*h*r-a*f*r-M*s*l+t*f*l+a*s*d-t*h*d)*x,e[7]=(a*p*r-c*h*r+c*s*l-t*p*l-a*s*m+t*h*m)*x,e[8]=b*x,e[9]=(M*u*r-c*S*r-M*n*m+t*S*m+c*n*d-t*u*d)*x,e[10]=(a*S*r-M*o*r+M*n*l-t*S*l-a*n*d+t*o*d)*x,e[11]=(c*o*r-a*u*r-c*n*l+t*u*l+a*n*m-t*o*m)*x,e[12]=C*x,e[13]=(c*S*s-M*u*s+M*n*p-t*S*p-c*n*f+t*u*f)*x,e[14]=(M*o*s-a*S*s-M*n*h+t*S*h+a*n*f-t*o*f)*x,e[15]=(a*u*s-c*o*s+c*n*h-t*u*h-a*n*p+t*o*p)*x,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,h=e.z,l=r*a,c=r*o;return this.set(l*a+n,l*o-s*h,l*h+s*o,0,l*o+s*h,c*o+n,c*h-s*a,0,l*h-s*o,c*h+s*a,r*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,l=r+r,c=a+a,u=o+o,p=r*l,m=r*c,M=r*u,S=a*c,f=a*u,d=o*u,E=h*l,w=h*c,b=h*u,C=n.x,y=n.y,x=n.z;return s[0]=(1-(S+d))*C,s[1]=(m+b)*C,s[2]=(M-w)*C,s[3]=0,s[4]=(m-b)*y,s[5]=(1-(p+d))*y,s[6]=(f+E)*y,s[7]=0,s[8]=(M+w)*x,s[9]=(f-E)*x,s[10]=(1-(p+S))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=ai.set(s[0],s[1],s[2]).length();const a=ai.set(s[4],s[5],s[6]).length(),o=ai.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],$t.copy(this);const l=1/r,c=1/a,u=1/o;return $t.elements[0]*=l,$t.elements[1]*=l,$t.elements[2]*=l,$t.elements[4]*=c,$t.elements[5]*=c,$t.elements[6]*=c,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=hn,h=!1){const l=this.elements,c=2*r/(t-e),u=2*r/(n-s),p=(t+e)/(t-e),m=(n+s)/(n-s);let M,S;if(h)M=r/(a-r),S=a*r/(a-r);else if(o===hn)M=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===Ks)M=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=M,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=hn,h=!1){const l=this.elements,c=2/(t-e),u=2/(n-s),p=-(t+e)/(t-e),m=-(n+s)/(n-s);let M,S;if(h)M=1/(a-r),S=a/(a-r);else if(o===hn)M=-2/(a-r),S=-(a+r)/(a-r);else if(o===Ks)M=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=M,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ai=new N,$t=new Xe,Jh=new N(0,0,0),Qh=new N(1,1,1),An=new N,gs=new N,Ft=new N,Uo=new Xe,No=new un;class It{constructor(e=0,t=0,n=0,s=It.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],l=s[5],c=s[9],u=s[2],p=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Uo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return No.setFromEuler(this),this.setFromQuaternion(No,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}It.DEFAULT_ORDER="XYZ";class eo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let eu=0;const Fo=new N,oi=new un,mn=new Xe,_s=new N,zi=new N,tu=new N,nu=new un,Oo=new N(1,0,0),Bo=new N(0,1,0),zo=new N(0,0,1),ko={type:"added"},iu={type:"removed"},li={type:"childadded",child:null},_r={type:"childremoved",child:null};class pt extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=Mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new N,t=new It,n=new un,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xe},normalMatrix:{value:new He}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis(Oo,e)}rotateY(e){return this.rotateOnAxis(Bo,e)}rotateZ(e){return this.rotateOnAxis(zo,e)}translateOnAxis(e,t){return Fo.copy(e).applyQuaternion(this.quaternion),this.position.add(Fo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oo,e)}translateY(e){return this.translateOnAxis(Bo,e)}translateZ(e){return this.translateOnAxis(zo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_s.copy(e):_s.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(zi,_s,this.up):mn.lookAt(_s,zi,this.up),this.quaternion.setFromRotationMatrix(mn),s&&(mn.extractRotation(s.matrixWorld),oi.setFromRotationMatrix(mn),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ko),li.child=e,this.dispatchEvent(li),li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(iu),_r.child=e,this.dispatchEvent(_r),_r.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ko),li.child=e,this.dispatchEvent(li),li.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,e,tu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,nu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,c=h.length;l<c;l++){const u=h[l];r(e.shapes,u)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),l=a(e.textures),c=a(e.images),u=a(e.shapes),p=a(e.skeletons),m=a(e.animations),M=a(e.nodes);o.length>0&&(n.geometries=o),h.length>0&&(n.materials=h),l.length>0&&(n.textures=l),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),M.length>0&&(n.nodes=M)}return n.object=s,n;function a(o){const h=[];for(const l in o){const c=o[l];delete c.metadata,h.push(c)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}pt.DEFAULT_UP=new N(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new N,gn=new N,vr=new N,_n=new N,ci=new N,hi=new N,Ho=new N,xr=new N,Mr=new N,Sr=new N,yr=new it,Er=new it,br=new it;class Yt{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Kt.subVectors(e,t),s.cross(Kt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Kt.subVectors(s,t),gn.subVectors(n,t),vr.subVectors(e,t);const a=Kt.dot(Kt),o=Kt.dot(gn),h=Kt.dot(vr),l=gn.dot(gn),c=gn.dot(vr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const p=1/u,m=(l*h-o*c)*p,M=(a*c-o*h)*p;return r.set(1-m-M,M,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(e,t,n,s,r,a,o,h){return this.getBarycoord(e,t,n,s,_n)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,_n.x),h.addScaledVector(a,_n.y),h.addScaledVector(o,_n.z),h)}static getInterpolatedAttribute(e,t,n,s,r,a){return yr.setScalar(0),Er.setScalar(0),br.setScalar(0),yr.fromBufferAttribute(e,t),Er.fromBufferAttribute(e,n),br.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(yr,r.x),a.addScaledVector(Er,r.y),a.addScaledVector(br,r.z),a}static isFrontFacing(e,t,n,s){return Kt.subVectors(n,t),gn.subVectors(e,t),Kt.cross(gn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),Kt.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ci.subVectors(s,n),hi.subVectors(r,n),xr.subVectors(e,n);const h=ci.dot(xr),l=hi.dot(xr);if(h<=0&&l<=0)return t.copy(n);Mr.subVectors(e,s);const c=ci.dot(Mr),u=hi.dot(Mr);if(c>=0&&u<=c)return t.copy(s);const p=h*u-c*l;if(p<=0&&h>=0&&c<=0)return a=h/(h-c),t.copy(n).addScaledVector(ci,a);Sr.subVectors(e,r);const m=ci.dot(Sr),M=hi.dot(Sr);if(M>=0&&m<=M)return t.copy(r);const S=m*l-h*M;if(S<=0&&l>=0&&M<=0)return o=l/(l-M),t.copy(n).addScaledVector(hi,o);const f=c*M-m*u;if(f<=0&&u-c>=0&&m-M>=0)return Ho.subVectors(r,s),o=(u-c)/(u-c+(m-M)),t.copy(s).addScaledVector(Ho,o);const d=1/(f+S+p);return a=S*d,o=p*d,t.copy(n).addScaledVector(ci,a).addScaledVector(hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const fc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},vs={h:0,s:0,l:0};function Tr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=Ka(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Tr(a,r,e+1/3),this.g=Tr(a,r,e),this.b=Tr(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=fc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Sn(e.r),this.g=Sn(e.g),this.b=Sn(e.b),this}copyLinearToSRGB(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return qe.workingToColorSpace(Et.copy(this),e),Math.round(Ge(Et.r*255,0,255))*65536+Math.round(Ge(Et.g*255,0,255))*256+Math.round(Ge(Et.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Et.copy(this),t);const n=Et.r,s=Et.g,r=Et.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let h,l;const c=(o+a)/2;if(o===a)h=0,l=0;else{const u=a-o;switch(l=c<=.5?u/(a+o):u/(2-a-o),a){case n:h=(s-r)/u+(s<r?6:0);break;case s:h=(r-n)/u+2;break;case r:h=(n-s)/u+4;break}h/=6}return e.h=h,e.s=l,e.l=c,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=Mt){qe.workingToColorSpace(Et.copy(this),e);const t=Et.r,n=Et.g,s=Et.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(vs);const n=Qi(Rn.h,vs.h,t),s=Qi(Rn.s,vs.s,t),r=Qi(Rn.l,vs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new ze;ze.NAMES=fc;let su=0;class Bn extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=Mn(),this.name="",this.type="Material",this.blending=bi,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xr,this.blendDst=Yr,this.blendEquation=Jt,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ao,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xr&&(n.blendSrc=this.blendSrc),this.blendDst!==Yr&&(n.blendDst=this.blendDst),this.blendEquation!==Jt&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ao&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class to extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new It,this.combine=Va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new N,xs=new Ee;let ru=0;class zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ru++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ia,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xs.fromBufferAttribute(this,t),xs.applyMatrix3(e),this.setXY(t,xs.x,xs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Qt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ia&&(e.usage=this.usage),e}}class pc extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class mc extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class jt extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let au=0;const Wt=new Xe,wr=new pt,ui=new N,Ot=new kt,ki=new kt,_t=new N;class sn extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=Mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(uc(e)?mc:pc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return wr.lookAt(e),wr.updateMatrix(),this.applyMatrix4(wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new jt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ot.setFromBufferAttribute(r),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ki.setFromBufferAttribute(o),this.morphTargetsRelative?(_t.addVectors(Ot.min,ki.min),Ot.expandByPoint(_t),_t.addVectors(Ot.max,ki.max),Ot.expandByPoint(_t)):(Ot.expandByPoint(ki.min),Ot.expandByPoint(ki.max))}Ot.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)_t.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(_t));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)_t.fromBufferAttribute(o,l),h&&(ui.fromBufferAttribute(e,l),_t.add(ui)),s=Math.max(s,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],h=[];for(let A=0;A<n.count;A++)o[A]=new N,h[A]=new N;const l=new N,c=new N,u=new N,p=new Ee,m=new Ee,M=new Ee,S=new N,f=new N;function d(A,_,g){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,g),p.fromBufferAttribute(r,A),m.fromBufferAttribute(r,_),M.fromBufferAttribute(r,g),c.sub(l),u.sub(l),m.sub(p),M.sub(p);const T=1/(m.x*M.y-M.x*m.y);isFinite(T)&&(S.copy(c).multiplyScalar(M.y).addScaledVector(u,-m.y).multiplyScalar(T),f.copy(u).multiplyScalar(m.x).addScaledVector(c,-M.x).multiplyScalar(T),o[A].add(S),o[_].add(S),o[g].add(S),h[A].add(f),h[_].add(f),h[g].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let A=0,_=E.length;A<_;++A){const g=E[A],T=g.start,L=g.count;for(let P=T,I=T+L;P<I;P+=3)d(e.getX(P+0),e.getX(P+1),e.getX(P+2))}const w=new N,b=new N,C=new N,y=new N;function x(A){C.fromBufferAttribute(s,A),y.copy(C);const _=o[A];w.copy(_),w.sub(C.multiplyScalar(C.dot(_))).normalize(),b.crossVectors(y,_);const T=b.dot(h[A])<0?-1:1;a.setXYZW(A,w.x,w.y,w.z,T)}for(let A=0,_=E.length;A<_;++A){const g=E[A],T=g.start,L=g.count;for(let P=T,I=T+L;P<I;P+=3)x(e.getX(P+0)),x(e.getX(P+1)),x(e.getX(P+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new N,r=new N,a=new N,o=new N,h=new N,l=new N,c=new N,u=new N;if(e)for(let p=0,m=e.count;p<m;p+=3){const M=e.getX(p+0),S=e.getX(p+1),f=e.getX(p+2);s.fromBufferAttribute(t,M),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,f),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),o.fromBufferAttribute(n,M),h.fromBufferAttribute(n,S),l.fromBufferAttribute(n,f),o.add(c),h.add(c),l.add(c),n.setXYZ(M,o.x,o.y,o.z),n.setXYZ(S,h.x,h.y,h.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,m=t.count;p<m;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),n.setXYZ(p+0,c.x,c.y,c.z),n.setXYZ(p+1,c.x,c.y,c.z),n.setXYZ(p+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(o,h){const l=o.array,c=o.itemSize,u=o.normalized,p=new l.constructor(h.length*c);let m=0,M=0;for(let S=0,f=h.length;S<f;S++){o.isInterleavedBufferAttribute?m=h[S]*o.data.stride+o.offset:m=h[S]*c;for(let d=0;d<c;d++)p[M++]=l[m++]}return new zt(p,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new sn,n=this.index.array,s=this.attributes;for(const o in s){const h=s[o],l=e(h,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const h=[],l=r[o];for(let c=0,u=l.length;c<u;c++){const p=l[c],m=e(p,n);h.push(m)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(e[l]=h[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const l=n[h];e.data.attributes[h]=l.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],c=[];for(let u=0,p=l.length;u<p;u++){const m=l[u];c.push(m.toJSON(e.data))}c.length>0&&(s[h]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const c=s[l];this.setAttribute(l,c.clone(t))}const r=e.morphAttributes;for(const l in r){const c=[],u=r[l];for(let p=0,m=u.length;p<m;p++)c.push(u[p].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,c=a.length;l<c;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vo=new Xe,Wn=new Qa,Ms=new rs,Go=new N,Ss=new N,ys=new N,Es=new N,Ar=new N,bs=new N,Wo=new N,Ts=new N;class $e extends pt{constructor(e=new sn,t=new to){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){bs.set(0,0,0);for(let h=0,l=r.length;h<l;h++){const c=o[h],u=r[h];c!==0&&(Ar.fromBufferAttribute(u,e),a?bs.addScaledVector(Ar,c):bs.addScaledVector(Ar.sub(t),c))}t.add(bs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ms.copy(n.boundingSphere),Ms.applyMatrix4(r),Wn.copy(e.ray).recast(e.near),!(Ms.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(Ms,Go)===null||Wn.origin.distanceToSquared(Go)>(e.far-e.near)**2))&&(Vo.copy(r).invert(),Wn.copy(e.ray).applyMatrix4(Vo),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let M=0,S=p.length;M<S;M++){const f=p[M],d=a[f.materialIndex],E=Math.max(f.start,m.start),w=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let b=E,C=w;b<C;b+=3){const y=o.getX(b),x=o.getX(b+1),A=o.getX(b+2);s=ws(this,d,e,n,l,c,u,y,x,A),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const M=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let f=M,d=S;f<d;f+=3){const E=o.getX(f),w=o.getX(f+1),b=o.getX(f+2);s=ws(this,a,e,n,l,c,u,E,w,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let M=0,S=p.length;M<S;M++){const f=p[M],d=a[f.materialIndex],E=Math.max(f.start,m.start),w=Math.min(h.count,Math.min(f.start+f.count,m.start+m.count));for(let b=E,C=w;b<C;b+=3){const y=b,x=b+1,A=b+2;s=ws(this,d,e,n,l,c,u,y,x,A),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const M=Math.max(0,m.start),S=Math.min(h.count,m.start+m.count);for(let f=M,d=S;f<d;f+=3){const E=f,w=f+1,b=f+2;s=ws(this,a,e,n,l,c,u,E,w,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function ou(i,e,t,n,s,r,a,o){let h;if(e.side===Ct?h=n.intersectTriangle(a,r,s,!0,o):h=n.intersectTriangle(s,r,a,e.side===Fn,o),h===null)return null;Ts.copy(o),Ts.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ts);return l<t.near||l>t.far?null:{distance:l,point:Ts.clone(),object:i}}function ws(i,e,t,n,s,r,a,o,h,l){i.getVertexPosition(o,Ss),i.getVertexPosition(h,ys),i.getVertexPosition(l,Es);const c=ou(i,e,t,n,Ss,ys,Es,Wo);if(c){const u=new N;Yt.getBarycoord(Wo,Ss,ys,Es,u),s&&(c.uv=Yt.getInterpolatedAttribute(s,o,h,l,u,new Ee)),r&&(c.uv1=Yt.getInterpolatedAttribute(r,o,h,l,u,new Ee)),a&&(c.normal=Yt.getInterpolatedAttribute(a,o,h,l,u,new N),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const p={a:o,b:h,c:l,normal:new N,materialIndex:0};Yt.getNormal(Ss,ys,Es,p.normal),c.face=p,c.barycoord=u}return c}class Ht extends sn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],l=[],c=[],u=[];let p=0,m=0;M("z","y","x",-1,-1,n,t,e,a,r,0),M("z","y","x",1,-1,n,t,-e,a,r,1),M("x","z","y",1,1,e,n,t,s,a,2),M("x","z","y",1,-1,e,n,-t,s,a,3),M("x","y","z",1,-1,e,t,n,s,r,4),M("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(h),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(u,2));function M(S,f,d,E,w,b,C,y,x,A,_){const g=b/x,T=C/A,L=b/2,P=C/2,I=y/2,z=x+1,B=A+1;let X=0,k=0;const W=new N;for(let ee=0;ee<B;ee++){const oe=ee*T-P;for(let pe=0;pe<z;pe++){const we=pe*g-L;W[S]=we*E,W[f]=oe*w,W[d]=I,l.push(W.x,W.y,W.z),W[S]=0,W[f]=0,W[d]=y>0?1:-1,c.push(W.x,W.y,W.z),u.push(pe/x),u.push(1-ee/A),X+=1}}for(let ee=0;ee<A;ee++)for(let oe=0;oe<x;oe++){const pe=p+oe+z*ee,we=p+oe+z*(ee+1),Re=p+(oe+1)+z*(ee+1),De=p+(oe+1)+z*ee;h.push(pe,we,De),h.push(we,Re,De),k+=6}o.addGroup(m,k,_),m+=k,p+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Li(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=Li(i[t]);for(const s in n)e[s]=n[s]}return e}function lu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function gc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Ln={clone:Li,merge:Rt};var cu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bt extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cu,this.fragmentShader=hu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Li(e.uniforms),this.uniformsGroups=lu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class _c extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new N,Xo=new Ee,Yo=new Ee;class Bt extends _c{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ns*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ji*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ns*2*Math.atan(Math.tan(Ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z)}getViewSize(e,t){return this.getViewBounds(e,Xo,Yo),t.subVectors(Yo,Xo)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ji*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*n/l,s*=a.width/h,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const di=-90,fi=1;class uu extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bt(di,fi,e,t);s.layers=this.layers,this.add(s);const r=new Bt(di,fi,e,t);r.layers=this.layers,this.add(r);const a=new Bt(di,fi,e,t);a.layers=this.layers,this.add(a);const o=new Bt(di,fi,e,t);o.layers=this.layers,this.add(o);const h=new Bt(di,fi,e,t);h.layers=this.layers,this.add(h);const l=new Bt(di,fi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,h]=t;for(const l of t)this.remove(l);if(e===hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,l,c]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,h),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),e.render(t,c),e.setRenderTarget(u,p,m),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class vc extends Tt{constructor(e=[],t=Ai,n,s,r,a,o,h,l,c){super(e,t,n,s,r,a,o,h,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class du extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new vc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ht(5,5,5),r=new bt({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:vt});r.uniforms.tEquirect.value=t;const a=new $e(s,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=ln),new uu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class St extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fu={type:"move"};class Rr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const S of e.hand.values()){const f=t.getJointPose(S,n),d=this._getHandJoint(l,S);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=c.position.distanceTo(u.position),m=.02,M=.005;l.inputState.pinching&&p>m+M?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=m-M&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fu)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new St;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class no{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ze(e),this.density=t}clone(){return new no(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xc extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new It,this.environmentIntensity=1,this.environmentRotation=new It,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class pu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ia,this.updateRanges=[],this.version=0,this.uuid=Mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const At=new N;class Qs{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Qt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Qt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Qt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Qt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Qt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Qs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class er extends Bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let pi;const Hi=new N,mi=new N,gi=new N,_i=new Ee,Vi=new Ee,Mc=new Xe,As=new N,Gi=new N,Rs=new N,qo=new Ee,Cr=new Ee,jo=new Ee;class Ua extends pt{constructor(e=new er){if(super(),this.isSprite=!0,this.type="Sprite",pi===void 0){pi=new sn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new pu(t,5);pi.setIndex([0,1,2,0,2,3]),pi.setAttribute("position",new Qs(n,3,0,!1)),pi.setAttribute("uv",new Qs(n,2,3,!1))}this.geometry=pi,this.material=e,this.center=new Ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),mi.setFromMatrixScale(this.matrixWorld),Mc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&mi.multiplyScalar(-gi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Cs(As.set(-.5,-.5,0),gi,a,mi,s,r),Cs(Gi.set(.5,-.5,0),gi,a,mi,s,r),Cs(Rs.set(.5,.5,0),gi,a,mi,s,r),qo.set(0,0),Cr.set(1,0),jo.set(1,1);let o=e.ray.intersectTriangle(As,Gi,Rs,!1,Hi);if(o===null&&(Cs(Gi.set(-.5,.5,0),gi,a,mi,s,r),Cr.set(0,1),o=e.ray.intersectTriangle(As,Rs,Gi,!1,Hi),o===null))return;const h=e.ray.origin.distanceTo(Hi);h<e.near||h>e.far||t.push({distance:h,point:Hi.clone(),uv:Yt.getInterpolation(Hi,As,Gi,Rs,qo,Cr,jo,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Cs(i,e,t,n,s,r){_i.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Vi.x=r*_i.x-s*_i.y,Vi.y=s*_i.x+r*_i.y):Vi.copy(_i),i.copy(e),i.x+=Vi.x,i.y+=Vi.y,i.applyMatrix4(Mc)}class io extends Tt{constructor(e=null,t=1,n=1,s,r,a,o,h,l=Pt,c=Pt,u,p){super(null,a,o,h,l,c,s,r,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zo extends zt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const vi=new Xe,$o=new Xe,Ps=[],Ko=new kt,mu=new Xe,Wi=new $e,Xi=new rs;class Sc extends $e{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,mu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),Ko.copy(e.boundingBox).applyMatrix4(vi),this.boundingBox.union(Ko)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new rs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),Xi.copy(e.boundingSphere).applyMatrix4(vi),this.boundingSphere.union(Xi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Wi.geometry=this.geometry,Wi.material=this.material,Wi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xi.copy(this.boundingSphere),Xi.applyMatrix4(n),e.ray.intersectsSphere(Xi)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,vi),$o.multiplyMatrices(n,vi),Wi.matrixWorld=$o,Wi.raycast(e,Ps);for(let a=0,o=Ps.length;a<o;a++){const h=Ps[a];h.instanceId=r,h.object=this,t.push(h)}Ps.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Zo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new io(new Float32Array(s*this.count),s,this.count,qa,cn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,h=s*e;r[h]=o,r.set(n,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pr=new N,gu=new N,_u=new He;class Pn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Pr.subVectors(n,t).cross(gu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||_u.getNormalMatrix(e),s=this.coplanarPoint(Pr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new rs,vu=new Ee(.5,.5),Ds=new N;class so{constructor(e=new Pn,t=new Pn,n=new Pn,s=new Pn,r=new Pn,a=new Pn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],l=r[3],c=r[4],u=r[5],p=r[6],m=r[7],M=r[8],S=r[9],f=r[10],d=r[11],E=r[12],w=r[13],b=r[14],C=r[15];if(s[0].setComponents(l-a,m-c,d-M,C-E).normalize(),s[1].setComponents(l+a,m+c,d+M,C+E).normalize(),s[2].setComponents(l+o,m+u,d+S,C+w).normalize(),s[3].setComponents(l-o,m-u,d-S,C-w).normalize(),n)s[4].setComponents(h,p,f,b).normalize(),s[5].setComponents(l-h,m-p,d-f,C-b).normalize();else if(s[4].setComponents(l-h,m-p,d-f,C-b).normalize(),t===hn)s[5].setComponents(l+h,m+p,d+f,C+b).normalize();else if(t===Ks)s[5].setComponents(h,p,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){Xn.center.set(0,0,0);const t=vu.distanceTo(e.center);return Xn.radius=.7071067811865476+t,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ds.x=s.normal.x>0?e.max.x:e.min.x,Ds.y=s.normal.y>0?e.max.y:e.min.y,Ds.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ds)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class En extends Tt{constructor(e,t,n,s,r,a,o,h,l){super(e,t,n,s,r,a,o,h,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ro extends Tt{constructor(e,t,n=Jn,s,r,a,o=Pt,h=Pt,l,c=ts,u=1){if(c!==ts&&c!==Pi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:u};super(p,s,r,a,o,h,c,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ja(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class yc extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ii extends sn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h};const l=this;s=Math.floor(s),r=Math.floor(r);const c=[],u=[],p=[],m=[];let M=0;const S=[],f=n/2;let d=0;E(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(c),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(p,3)),this.setAttribute("uv",new jt(m,2));function E(){const b=new N,C=new N;let y=0;const x=(t-e)/n;for(let A=0;A<=r;A++){const _=[],g=A/r,T=g*(t-e)+e;for(let L=0;L<=s;L++){const P=L/s,I=P*h+o,z=Math.sin(I),B=Math.cos(I);C.x=T*z,C.y=-g*n+f,C.z=T*B,u.push(C.x,C.y,C.z),b.set(z,x,B).normalize(),p.push(b.x,b.y,b.z),m.push(P,1-g),_.push(M++)}S.push(_)}for(let A=0;A<s;A++)for(let _=0;_<r;_++){const g=S[_][A],T=S[_+1][A],L=S[_+1][A+1],P=S[_][A+1];(e>0||_!==0)&&(c.push(g,T,P),y+=3),(t>0||_!==r-1)&&(c.push(T,L,P),y+=3)}l.addGroup(d,y,0),d+=y}function w(b){const C=M,y=new Ee,x=new N;let A=0;const _=b===!0?e:t,g=b===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,f*g,0),p.push(0,g,0),m.push(.5,.5),M++;const T=M;for(let L=0;L<=s;L++){const I=L/s*h+o,z=Math.cos(I),B=Math.sin(I);x.x=_*B,x.y=f*g,x.z=_*z,u.push(x.x,x.y,x.z),p.push(0,g,0),y.x=z*.5+.5,y.y=B*.5*g+.5,m.push(y.x,y.y),M++}for(let L=0;L<s;L++){const P=C+L,I=T+L;b===!0?c.push(I,I+1,P):c.push(I+1,I,P),A+=3}l.addGroup(d,A,b===!0?1:2),d+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ii(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zn extends sn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),h=Math.floor(s),l=o+1,c=h+1,u=e/o,p=t/h,m=[],M=[],S=[],f=[];for(let d=0;d<c;d++){const E=d*p-a;for(let w=0;w<l;w++){const b=w*u-r;M.push(b,-E,0),S.push(0,0,1),f.push(w/o),f.push(1-d/h)}}for(let d=0;d<h;d++)for(let E=0;E<o;E++){const w=E+l*d,b=E+l*(d+1),C=E+1+l*(d+1),y=E+1+l*d;m.push(w,b,y),m.push(b,C,y)}this.setIndex(m),this.setAttribute("position",new jt(M,3)),this.setAttribute("normal",new jt(S,3)),this.setAttribute("uv",new jt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zn(e.width,e.height,e.widthSegments,e.heightSegments)}}class xu extends bt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xt extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nr,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new It,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ao extends xt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Mu extends Bn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nr,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Su extends Bn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nr,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new It,this.combine=Va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yu extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Eu extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class oo extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class bu extends oo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Dr=new Xe,Jo=new N,Qo=new N;class Ec{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new so,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Jo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jo),Qo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qo),t.updateMatrixWorld(),Dr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dr,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const el=new Xe,Yi=new N,Lr=new N;class Tu extends Ec{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Yi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Yi),Lr.copy(n.position),Lr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Lr),n.updateMatrixWorld(),s.makeTranslation(-Yi.x,-Yi.y,-Yi.z),el.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(el,n.coordinateSystem,n.reversedDepth)}}class wu extends oo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Tu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class lo extends _c{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=c*this.view.offsetY,h=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Au extends Ec{constructor(){super(new lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tl extends oo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new Au}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ru extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Cu{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const nl=new Xe;class Pu{constructor(e,t,n=0,s=1/0){this.ray=new Qa(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new eo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return nl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(nl),this}intersectObject(e,t=!0,n=[]){return Na(e,this,n,t),n.sort(il),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Na(e[s],this,n,t);return n.sort(il),n}}function il(i,e){return i.distance-e.distance}function Na(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Na(r[a],e,t,!0)}}class sl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Du extends Qn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function rl(i,e,t,n){const s=Lu(n);switch(t){case oc:return i*e;case qa:return i*e/s.components*s.byteLength;case ja:return i*e/s.components*s.byteLength;case cc:return i*e*2/s.components*s.byteLength;case Za:return i*e*2/s.components*s.byteLength;case lc:return i*e*3/s.components*s.byteLength;case qt:return i*e*4/s.components*s.byteLength;case $a:return i*e*4/s.components*s.byteLength;case Hs:case Vs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Gs:case Ws:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case aa:case la:return Math.max(i,16)*Math.max(e,8)/4;case ra:case oa:return Math.max(i,8)*Math.max(e,8)/2;case ca:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case pa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ga:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case _a:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case va:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case xa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ya:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ba:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case wa:case Aa:case Ra:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ca:case Pa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Da:case La:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lu(i){switch(i){case en:case ic:return{byteLength:1,components:1};case es:case sc:case yn:return{byteLength:2,components:1};case Xa:case Ya:return{byteLength:2,components:4};case Jn:case Wa:case cn:return{byteLength:4,components:1};case rc:case ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ha);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bc(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Iu(i){const e=new WeakMap;function t(o,h){const l=o.array,c=o.usage,u=l.byteLength,p=i.createBuffer();i.bindBuffer(h,p),i.bufferData(h,l,c),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,h,l){const c=h.array,u=h.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,c);else{u.sort((m,M)=>m.start-M.start);let p=0;for(let m=1;m<u.length;m++){const M=u[p],S=u[m];S.start<=M.start+M.count+1?M.count=Math.max(M.count,S.start+S.count-M.start):(++p,u[p]=S)}u.length=p+1;for(let m=0,M=u.length;m<M;m++){const S=u[m];i.bufferSubData(l,S.start*c.BYTES_PER_ELEMENT,c,S.start,S.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(i.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,h),l.version=o.version}}return{get:s,remove:r,update:a}}var Uu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ou=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ku=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ju=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,td=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,id=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ad=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,od=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ld=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",ud=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_d=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Md=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ed=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Td=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ad=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ld=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Id=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Nd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Od=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$d=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,af=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,of=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,df=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ff=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ef=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Af=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,If=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Uf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Of=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,np=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ip=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ap=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,op=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Uu,alphahash_pars_fragment:Nu,alphamap_fragment:Fu,alphamap_pars_fragment:Ou,alphatest_fragment:Bu,alphatest_pars_fragment:zu,aomap_fragment:ku,aomap_pars_fragment:Hu,batching_pars_vertex:Vu,batching_vertex:Gu,begin_vertex:Wu,beginnormal_vertex:Xu,bsdfs:Yu,iridescence_fragment:qu,bumpmap_pars_fragment:ju,clipping_planes_fragment:Zu,clipping_planes_pars_fragment:$u,clipping_planes_pars_vertex:Ku,clipping_planes_vertex:Ju,color_fragment:Qu,color_pars_fragment:ed,color_pars_vertex:td,color_vertex:nd,common:id,cube_uv_reflection_fragment:sd,defaultnormal_vertex:rd,displacementmap_pars_vertex:ad,displacementmap_vertex:od,emissivemap_fragment:ld,emissivemap_pars_fragment:cd,colorspace_fragment:hd,colorspace_pars_fragment:ud,envmap_fragment:dd,envmap_common_pars_fragment:fd,envmap_pars_fragment:pd,envmap_pars_vertex:md,envmap_physical_pars_fragment:wd,envmap_vertex:gd,fog_vertex:_d,fog_pars_vertex:vd,fog_fragment:xd,fog_pars_fragment:Md,gradientmap_pars_fragment:Sd,lightmap_pars_fragment:yd,lights_lambert_fragment:Ed,lights_lambert_pars_fragment:bd,lights_pars_begin:Td,lights_toon_fragment:Ad,lights_toon_pars_fragment:Rd,lights_phong_fragment:Cd,lights_phong_pars_fragment:Pd,lights_physical_fragment:Dd,lights_physical_pars_fragment:Ld,lights_fragment_begin:Id,lights_fragment_maps:Ud,lights_fragment_end:Nd,logdepthbuf_fragment:Fd,logdepthbuf_pars_fragment:Od,logdepthbuf_pars_vertex:Bd,logdepthbuf_vertex:zd,map_fragment:kd,map_pars_fragment:Hd,map_particle_fragment:Vd,map_particle_pars_fragment:Gd,metalnessmap_fragment:Wd,metalnessmap_pars_fragment:Xd,morphinstance_vertex:Yd,morphcolor_vertex:qd,morphnormal_vertex:jd,morphtarget_pars_vertex:Zd,morphtarget_vertex:$d,normal_fragment_begin:Kd,normal_fragment_maps:Jd,normal_pars_fragment:Qd,normal_pars_vertex:ef,normal_vertex:tf,normalmap_pars_fragment:nf,clearcoat_normal_fragment_begin:sf,clearcoat_normal_fragment_maps:rf,clearcoat_pars_fragment:af,iridescence_pars_fragment:of,opaque_fragment:lf,packing:cf,premultiplied_alpha_fragment:hf,project_vertex:uf,dithering_fragment:df,dithering_pars_fragment:ff,roughnessmap_fragment:pf,roughnessmap_pars_fragment:mf,shadowmap_pars_fragment:gf,shadowmap_pars_vertex:_f,shadowmap_vertex:vf,shadowmask_pars_fragment:xf,skinbase_vertex:Mf,skinning_pars_vertex:Sf,skinning_vertex:yf,skinnormal_vertex:Ef,specularmap_fragment:bf,specularmap_pars_fragment:Tf,tonemapping_fragment:wf,tonemapping_pars_fragment:Af,transmission_fragment:Rf,transmission_pars_fragment:Cf,uv_pars_fragment:Pf,uv_pars_vertex:Df,uv_vertex:Lf,worldpos_vertex:If,background_vert:Uf,background_frag:Nf,backgroundCube_vert:Ff,backgroundCube_frag:Of,cube_vert:Bf,cube_frag:zf,depth_vert:kf,depth_frag:Hf,distanceRGBA_vert:Vf,distanceRGBA_frag:Gf,equirect_vert:Wf,equirect_frag:Xf,linedashed_vert:Yf,linedashed_frag:qf,meshbasic_vert:jf,meshbasic_frag:Zf,meshlambert_vert:$f,meshlambert_frag:Kf,meshmatcap_vert:Jf,meshmatcap_frag:Qf,meshnormal_vert:ep,meshnormal_frag:tp,meshphong_vert:np,meshphong_frag:ip,meshphysical_vert:sp,meshphysical_frag:rp,meshtoon_vert:ap,meshtoon_frag:op,points_vert:lp,points_frag:cp,shadow_vert:hp,shadow_frag:up,sprite_vert:dp,sprite_frag:fp},ue={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},on={basic:{uniforms:Rt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Rt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Rt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Rt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Rt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Rt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Rt([ue.points,ue.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Rt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Rt([ue.common,ue.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Rt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Rt([ue.sprite,ue.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Rt([ue.common,ue.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Rt([ue.lights,ue.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};on.physical={uniforms:Rt([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Ls={r:0,b:0,g:0},Yn=new It,pp=new Xe;function mp(i,e,t,n,s,r,a){const o=new ze(0);let h=r===!0?0:1,l,c,u=null,p=0,m=null;function M(w){let b=w.isScene===!0?w.background:null;return b&&b.isTexture&&(b=(w.backgroundBlurriness>0?t:e).get(b)),b}function S(w){let b=!1;const C=M(w);C===null?d(o,h):C&&C.isColor&&(d(C,1),b=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(w,b){const C=M(b);C&&(C.isCubeTexture||C.mapping===tr)?(c===void 0&&(c=new $e(new Ht(1,1,1),new bt({name:"BackgroundCubeMaterial",uniforms:Li(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,x,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),Yn.copy(b.backgroundRotation),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),c.material.uniforms.envMap.value=C,c.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(pp.makeRotationFromEuler(Yn)),c.material.toneMapped=qe.getTransfer(C.colorSpace)!==Je,(u!==C||p!==C.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,p=C.version,m=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new $e(new zn(2,2),new bt({name:"BackgroundMaterial",uniforms:Li(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=qe.getTransfer(C.colorSpace)!==Je,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||p!==C.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=C,p=C.version,m=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function d(w,b){w.getRGB(Ls,gc(i)),n.buffers.color.setClear(Ls.r,Ls.g,Ls.b,b,a)}function E(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,b=1){o.set(w),h=b,d(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(w){h=w,d(o,h)},render:S,addToRenderList:f,dispose:E}}function gp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(g,T,L,P,I){let z=!1;const B=u(P,L,T);r!==B&&(r=B,l(r.object)),z=m(g,P,L,I),z&&M(g,P,L,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,b(g,T,L,P),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function h(){return i.createVertexArray()}function l(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function u(g,T,L){const P=L.wireframe===!0;let I=n[g.id];I===void 0&&(I={},n[g.id]=I);let z=I[T.id];z===void 0&&(z={},I[T.id]=z);let B=z[P];return B===void 0&&(B=p(h()),z[P]=B),B}function p(g){const T=[],L=[],P=[];for(let I=0;I<t;I++)T[I]=0,L[I]=0,P[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:L,attributeDivisors:P,object:g,attributes:{},index:null}}function m(g,T,L,P){const I=r.attributes,z=T.attributes;let B=0;const X=L.getAttributes();for(const k in X)if(X[k].location>=0){const ee=I[k];let oe=z[k];if(oe===void 0&&(k==="instanceMatrix"&&g.instanceMatrix&&(oe=g.instanceMatrix),k==="instanceColor"&&g.instanceColor&&(oe=g.instanceColor)),ee===void 0||ee.attribute!==oe||oe&&ee.data!==oe.data)return!0;B++}return r.attributesNum!==B||r.index!==P}function M(g,T,L,P){const I={},z=T.attributes;let B=0;const X=L.getAttributes();for(const k in X)if(X[k].location>=0){let ee=z[k];ee===void 0&&(k==="instanceMatrix"&&g.instanceMatrix&&(ee=g.instanceMatrix),k==="instanceColor"&&g.instanceColor&&(ee=g.instanceColor));const oe={};oe.attribute=ee,ee&&ee.data&&(oe.data=ee.data),I[k]=oe,B++}r.attributes=I,r.attributesNum=B,r.index=P}function S(){const g=r.newAttributes;for(let T=0,L=g.length;T<L;T++)g[T]=0}function f(g){d(g,0)}function d(g,T){const L=r.newAttributes,P=r.enabledAttributes,I=r.attributeDivisors;L[g]=1,P[g]===0&&(i.enableVertexAttribArray(g),P[g]=1),I[g]!==T&&(i.vertexAttribDivisor(g,T),I[g]=T)}function E(){const g=r.newAttributes,T=r.enabledAttributes;for(let L=0,P=T.length;L<P;L++)T[L]!==g[L]&&(i.disableVertexAttribArray(L),T[L]=0)}function w(g,T,L,P,I,z,B){B===!0?i.vertexAttribIPointer(g,T,L,I,z):i.vertexAttribPointer(g,T,L,P,I,z)}function b(g,T,L,P){S();const I=P.attributes,z=L.getAttributes(),B=T.defaultAttributeValues;for(const X in z){const k=z[X];if(k.location>=0){let W=I[X];if(W===void 0&&(X==="instanceMatrix"&&g.instanceMatrix&&(W=g.instanceMatrix),X==="instanceColor"&&g.instanceColor&&(W=g.instanceColor)),W!==void 0){const ee=W.normalized,oe=W.itemSize,pe=e.get(W);if(pe===void 0)continue;const we=pe.buffer,Re=pe.type,De=pe.bytesPerElement,Z=Re===i.INT||Re===i.UNSIGNED_INT||W.gpuType===Wa;if(W.isInterleavedBufferAttribute){const K=W.data,he=K.stride,J=W.offset;if(K.isInstancedInterleavedBuffer){for(let le=0;le<k.locationSize;le++)d(k.location+le,K.meshPerAttribute);g.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let le=0;le<k.locationSize;le++)f(k.location+le);i.bindBuffer(i.ARRAY_BUFFER,we);for(let le=0;le<k.locationSize;le++)w(k.location+le,oe/k.locationSize,Re,ee,he*De,(J+oe/k.locationSize*le)*De,Z)}else{if(W.isInstancedBufferAttribute){for(let K=0;K<k.locationSize;K++)d(k.location+K,W.meshPerAttribute);g.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let K=0;K<k.locationSize;K++)f(k.location+K);i.bindBuffer(i.ARRAY_BUFFER,we);for(let K=0;K<k.locationSize;K++)w(k.location+K,oe/k.locationSize,Re,ee,oe*De,oe/k.locationSize*K*De,Z)}}else if(B!==void 0){const ee=B[X];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(k.location,ee);break;case 3:i.vertexAttrib3fv(k.location,ee);break;case 4:i.vertexAttrib4fv(k.location,ee);break;default:i.vertexAttrib1fv(k.location,ee)}}}}E()}function C(){A();for(const g in n){const T=n[g];for(const L in T){const P=T[L];for(const I in P)c(P[I].object),delete P[I];delete T[L]}delete n[g]}}function y(g){if(n[g.id]===void 0)return;const T=n[g.id];for(const L in T){const P=T[L];for(const I in P)c(P[I].object),delete P[I];delete T[L]}delete n[g.id]}function x(g){for(const T in n){const L=n[T];if(L[g.id]===void 0)continue;const P=L[g.id];for(const I in P)c(P[I].object),delete P[I];delete L[g.id]}}function A(){_(),a=!0,r!==s&&(r=s,l(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:_,dispose:C,releaseStatesOfGeometry:y,releaseStatesOfProgram:x,initAttributes:S,enableAttribute:f,disableUnusedAttributes:E}}function _p(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let m=0;for(let M=0;M<u;M++)m+=c[M];t.update(m,n,1)}function h(l,c,u,p){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let M=0;M<l.length;M++)a(l[M],c[M],p[M]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,c,0,p,0,u);let M=0;for(let S=0;S<u;S++)M+=c[S]*p[S];t.update(M,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=h}function vp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const x=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==qt&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){const A=x===yn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==en&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&x!==cn&&!A)}function h(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const c=h(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=M>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:M,maxTextureSize:S,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:b,vertexTextures:C,maxSamples:y}}function xp(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Pn,o=new He,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const m=u.length!==0||p||n!==0||s;return s=p,n=u.length,m},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){t=c(u,p,0)},this.setState=function(u,p,m){const M=u.clippingPlanes,S=u.clipIntersection,f=u.clipShadows,d=i.get(u);if(!s||M===null||M.length===0||r&&!f)r?c(null):l();else{const E=r?0:n,w=E*4;let b=d.clippingState||null;h.value=b,b=c(M,p,w,m);for(let C=0;C!==w;++C)b[C]=t[C];d.clippingState=b,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function l(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(u,p,m,M){const S=u!==null?u.length:0;let f=null;if(S!==0){if(f=h.value,M!==!0||f===null){const d=m+S*4,E=p.matrixWorldInverse;o.getNormalMatrix(E),(f===null||f.length<d)&&(f=new Float32Array(d));for(let w=0,b=m;w!==S;++w,b+=4)a.copy(u[w]).applyMatrix4(E,o),a.normal.toArray(f,b),f[b+3]=a.constant}h.value=f,h.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,f}}function Mp(i){let e=new WeakMap;function t(a,o){return o===na?a.mapping=Ai:o===ia&&(a.mapping=Ri),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===na||o===ia)if(e.has(a)){const h=e.get(a).texture;return t(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const l=new du(h.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const h=e.get(o);h!==void 0&&(e.delete(o),h.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const yi=4,al=[.125,.215,.35,.446,.526,.582],Zn=20,Ir=new lo,ol=new ze;let Ur=null,Nr=0,Fr=0,Or=!1;const jn=(1+Math.sqrt(5))/2,xi=1/jn,ll=[new N(-jn,xi,0),new N(jn,xi,0),new N(-xi,0,jn),new N(xi,0,jn),new N(0,jn,-xi),new N(0,jn,xi),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Sp=new N;class Fa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Sp}=r;Ur=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,n,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ur,Nr,Fr),this._renderer.xr.enabled=Or,e.scissorTest=!1,Is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ai||e.mapping===Ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ur=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:yn,format:qt,colorSpace:Di,depthBuffer:!1},s=cl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yp(r)),this._blurMaterial=Ep(r,e,t)}return s}_compileMaterial(e){const t=new $e(this._lodPlanes[0],e);this._renderer.compile(t,Ir)}_sceneToCubeUV(e,t,n,s,r){const h=new Bt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,m=u.toneMapping;u.getClearColor(ol),u.toneMapping=Nn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const S=new to({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),f=new $e(new Ht,S);let d=!1;const E=e.background;E?E.isColor&&(S.color.copy(E),e.background=null,d=!0):(S.color.copy(ol),d=!0);for(let w=0;w<6;w++){const b=w%3;b===0?(h.up.set(0,l[w],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+c[w],r.y,r.z)):b===1?(h.up.set(0,0,l[w]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+c[w],r.z)):(h.up.set(0,l[w],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+c[w]));const C=this._cubeSize;Is(s,b*C,w>2?C:0,C,C),u.setRenderTarget(s),d&&u.render(f,h),u.render(e,h)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=m,u.autoClear=p,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ai||e.mapping===Ri;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new $e(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;Is(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(a,Ir)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ll[(s-r-1)%ll.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const h=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new $e(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[n]-1,M=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Zn-1),S=r/M,f=isFinite(r)?1+Math.floor(c*S):Zn;f>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Zn}`);const d=[];let E=0;for(let x=0;x<Zn;++x){const A=x/S,_=Math.exp(-A*A/2);d.push(_),x===0?E+=_:x<f&&(E+=2*_)}for(let x=0;x<d.length;x++)d[x]=d[x]/E;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:w}=this;p.dTheta.value=M,p.mipInt.value=w-n;const b=this._sizeLods[s],C=3*b*(s>w-yi?s-w+yi:0),y=4*(this._cubeSize-b);Is(t,C,y,3*b,2*b),h.setRenderTarget(t),h.render(u,Ir)}}function yp(i){const e=[],t=[],n=[];let s=i;const r=i-yi+1+al.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let h=1/o;a>i-yi?h=al[a-i+yi-1]:a===0&&(h=0),n.push(h);const l=1/(o-2),c=-l,u=1+l,p=[c,c,u,c,u,u,c,c,u,u,c,u],m=6,M=6,S=3,f=2,d=1,E=new Float32Array(S*M*m),w=new Float32Array(f*M*m),b=new Float32Array(d*M*m);for(let y=0;y<m;y++){const x=y%3*2/3-1,A=y>2?0:-1,_=[x,A,0,x+2/3,A,0,x+2/3,A+1,0,x,A,0,x+2/3,A+1,0,x,A+1,0];E.set(_,S*M*y),w.set(p,f*M*y);const g=[y,y,y,y,y,y];b.set(g,d*M*y)}const C=new sn;C.setAttribute("position",new zt(E,S)),C.setAttribute("uv",new zt(w,f)),C.setAttribute("faceIndex",new zt(b,d)),e.push(C),s>yi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function cl(i,e,t){const n=new nn(i,e,t);return n.texture.mapping=tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Is(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ep(i,e,t){const n=new Float32Array(Zn),s=new N(0,1,0);return new bt({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vt,depthTest:!1,depthWrite:!1})}function hl(){return new bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vt,depthTest:!1,depthWrite:!1})}function ul(){return new bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vt,depthTest:!1,depthWrite:!1})}function co(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const h=o.mapping,l=h===na||h===ia,c=h===Ai||h===Ri;if(l||c){let u=e.get(o);const p=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new Fa(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return l&&m&&m.height>0||c&&m&&s(m)?(t===null&&(t=new Fa(i)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let h=0;const l=6;for(let c=0;c<l;c++)o[c]!==void 0&&h++;return h===l}function r(o){const h=o.target;h.removeEventListener("dispose",r);const l=e.get(h);l!==void 0&&(e.delete(h),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Tp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&is("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function wp(i,e,t,n){const s={},r=new WeakMap;function a(u){const p=u.target;p.index!==null&&e.remove(p.index);for(const M in p.attributes)e.remove(p.attributes[M]);p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function h(u){const p=u.attributes;for(const m in p)e.update(p[m],i.ARRAY_BUFFER)}function l(u){const p=[],m=u.index,M=u.attributes.position;let S=0;if(m!==null){const E=m.array;S=m.version;for(let w=0,b=E.length;w<b;w+=3){const C=E[w+0],y=E[w+1],x=E[w+2];p.push(C,y,y,x,x,C)}}else if(M!==void 0){const E=M.array;S=M.version;for(let w=0,b=E.length/3-1;w<b;w+=3){const C=w+0,y=w+1,x=w+2;p.push(C,y,y,x,x,C)}}else return;const f=new(uc(p)?mc:pc)(p,1);f.version=S;const d=r.get(u);d&&e.remove(d),r.set(u,f)}function c(u){const p=r.get(u);if(p){const m=u.index;m!==null&&p.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:h,getWireframeAttribute:c}}function Ap(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function h(p,m){i.drawElements(n,m,r,p*a),t.update(m,n,1)}function l(p,m,M){M!==0&&(i.drawElementsInstanced(n,m,r,p*a,M),t.update(m,n,M))}function c(p,m,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,M);let f=0;for(let d=0;d<M;d++)f+=m[d];t.update(f,n,1)}function u(p,m,M,S){if(M===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<p.length;d++)l(p[d]/a,m[d],S[d]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,S,0,M);let d=0;for(let E=0;E<M;E++)d+=m[E]*S[E];t.update(d,n,1)}}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function Rp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Cp(i,e,t){const n=new WeakMap,s=new it;function r(a,o,h){const l=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let p=n.get(o);if(p===void 0||p.count!==u){let _=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",_)};p!==void 0&&p.texture.dispose();const m=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let w=0;m===!0&&(w=1),M===!0&&(w=2),S===!0&&(w=3);let b=o.attributes.position.count*w,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const y=new Float32Array(b*C*4*u),x=new dc(y,b,C,u);x.type=cn,x.needsUpdate=!0;const A=w*4;for(let g=0;g<u;g++){const T=f[g],L=d[g],P=E[g],I=b*C*4*g;for(let z=0;z<T.count;z++){const B=z*A;m===!0&&(s.fromBufferAttribute(T,z),y[I+B+0]=s.x,y[I+B+1]=s.y,y[I+B+2]=s.z,y[I+B+3]=0),M===!0&&(s.fromBufferAttribute(L,z),y[I+B+4]=s.x,y[I+B+5]=s.y,y[I+B+6]=s.z,y[I+B+7]=0),S===!0&&(s.fromBufferAttribute(P,z),y[I+B+8]=s.x,y[I+B+9]=s.y,y[I+B+10]=s.z,y[I+B+11]=P.itemSize===4?s.w:1)}}p={count:u,texture:x,size:new Ee(b,C)},n.set(o,p),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let S=0;S<l.length;S++)m+=l[S];const M=o.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",M),h.getUniforms().setValue(i,"morphTargetInfluences",l)}h.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Pp(i,e,t,n){let s=new WeakMap;function r(h){const l=n.render.frame,c=h.geometry,u=e.get(h,c);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",o)===!1&&h.addEventListener("dispose",o),s.get(h)!==l&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),s.set(h,l))),h.isSkinnedMesh){const p=h.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function a(){s=new WeakMap}function o(h){const l=h.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Tc=new Tt,dl=new ro(1,1),wc=new dc,Ac=new $h,Rc=new vc,fl=[],pl=[],ml=new Float32Array(16),gl=new Float32Array(9),_l=new Float32Array(4);function Ui(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=fl[s];if(r===void 0&&(r=new Float32Array(s),fl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ir(i,e){let t=pl[e];t===void 0&&(t=new Int32Array(e),pl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Dp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Lp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function Ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function Up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function Np(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;_l.set(n),i.uniformMatrix2fv(this.addr,!1,_l),gt(t,n)}}function Fp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;gl.set(n),i.uniformMatrix3fv(this.addr,!1,gl),gt(t,n)}}function Op(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;ml.set(n),i.uniformMatrix4fv(this.addr,!1,ml),gt(t,n)}}function Bp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function Vp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function Wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function Xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function Yp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(dl.compareFunction=hc,r=dl):r=Tc,t.setTexture2D(e||r,s)}function qp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ac,s)}function jp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Rc,s)}function Zp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||wc,s)}function $p(i){switch(i){case 5126:return Dp;case 35664:return Lp;case 35665:return Ip;case 35666:return Up;case 35674:return Np;case 35675:return Fp;case 35676:return Op;case 5124:case 35670:return Bp;case 35667:case 35671:return zp;case 35668:case 35672:return kp;case 35669:case 35673:return Hp;case 5125:return Vp;case 36294:return Gp;case 36295:return Wp;case 36296:return Xp;case 35678:case 36198:case 36298:case 36306:case 35682:return Yp;case 35679:case 36299:case 36307:return qp;case 35680:case 36300:case 36308:case 36293:return jp;case 36289:case 36303:case 36311:case 36292:return Zp}}function Kp(i,e){i.uniform1fv(this.addr,e)}function Jp(i,e){const t=Ui(e,this.size,2);i.uniform2fv(this.addr,t)}function Qp(i,e){const t=Ui(e,this.size,3);i.uniform3fv(this.addr,t)}function em(i,e){const t=Ui(e,this.size,4);i.uniform4fv(this.addr,t)}function tm(i,e){const t=Ui(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function nm(i,e){const t=Ui(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function im(i,e){const t=Ui(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function sm(i,e){i.uniform1iv(this.addr,e)}function rm(i,e){i.uniform2iv(this.addr,e)}function am(i,e){i.uniform3iv(this.addr,e)}function om(i,e){i.uniform4iv(this.addr,e)}function lm(i,e){i.uniform1uiv(this.addr,e)}function cm(i,e){i.uniform2uiv(this.addr,e)}function hm(i,e){i.uniform3uiv(this.addr,e)}function um(i,e){i.uniform4uiv(this.addr,e)}function dm(i,e,t){const n=this.cache,s=e.length,r=ir(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Tc,r[a])}function fm(i,e,t){const n=this.cache,s=e.length,r=ir(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ac,r[a])}function pm(i,e,t){const n=this.cache,s=e.length,r=ir(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Rc,r[a])}function mm(i,e,t){const n=this.cache,s=e.length,r=ir(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||wc,r[a])}function gm(i){switch(i){case 5126:return Kp;case 35664:return Jp;case 35665:return Qp;case 35666:return em;case 35674:return tm;case 35675:return nm;case 35676:return im;case 5124:case 35670:return sm;case 35667:case 35671:return rm;case 35668:case 35672:return am;case 35669:case 35673:return om;case 5125:return lm;case 36294:return cm;case 36295:return hm;case 36296:return um;case 35678:case 36198:case 36298:case 36306:case 35682:return dm;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return pm;case 36289:case 36303:case 36311:case 36292:return mm}}class _m{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$p(t.type)}}class vm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gm(t.type)}}class xm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Br=/(\w+)(\])?(\[|\.)?/g;function vl(i,e){i.seq.push(e),i.map[e.id]=e}function Mm(i,e,t){const n=i.name,s=n.length;for(Br.lastIndex=0;;){const r=Br.exec(n),a=Br.lastIndex;let o=r[1];const h=r[2]==="]",l=r[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===s){vl(t,l===void 0?new _m(o,i,e):new vm(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new xm(o),vl(t,u)),t=u}}}class Xs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Mm(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=n[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function xl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Sm=37297;let ym=0;function Em(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Ml=new He;function bm(i){qe._getMatrix(Ml,qe.workingColorSpace,i);const e=`mat3( ${Ml.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case $s:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Sl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Em(i.getShaderSource(e),o)}else return r}function Tm(i,e){const t=bm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function wm(i,e){let t;switch(e){case $l:t="Linear";break;case Kl:t="Reinhard";break;case Jl:t="Cineon";break;case Ga:t="ACESFilmic";break;case ec:t="AgX";break;case tc:t="Neutral";break;case Ql:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Us=new N;function Am(){qe.getLuminanceCoefficients(Us);const i=Us.x.toFixed(4),e=Us.y.toFixed(4),t=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($i).join(`
`)}function Cm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Pm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function $i(i){return i!==""}function yl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function El(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Dm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oa(i){return i.replace(Dm,Im)}const Lm=new Map;function Im(i,e){let t=Ve[e];if(t===void 0){const n=Lm.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oa(t)}const Um=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(i){return i.replace(Um,Nm)}function Nm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Fm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ql?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===jl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function Om(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ai:case Ri:e="ENVMAP_TYPE_CUBE";break;case tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Bm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ri:e="ENVMAP_MODE_REFRACTION";break}return e}function zm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Va:e="ENVMAP_BLENDING_MULTIPLY";break;case fh:e="ENVMAP_BLENDING_MIX";break;case ph:e="ENVMAP_BLENDING_ADD";break}return e}function km(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Hm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=Fm(t),l=Om(t),c=Bm(t),u=zm(t),p=km(t),m=Rm(t),M=Cm(r),S=s.createProgram();let f,d,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($i).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($i).join(`
`),d.length>0&&(d+=`
`)):(f=[Tl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($i).join(`
`),d=[Tl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Nn?wm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Tm("linearToOutputTexel",t.outputColorSpace),Am(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($i).join(`
`)),a=Oa(a),a=yl(a,t),a=El(a,t),o=Oa(o),o=yl(o,t),o=El(o,t),a=bl(a),o=bl(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===Ro?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ro?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const w=E+f+a,b=E+d+o,C=xl(s,s.VERTEX_SHADER,w),y=xl(s,s.FRAGMENT_SHADER,b);s.attachShader(S,C),s.attachShader(S,y),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function x(T){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(S)||"",P=s.getShaderInfoLog(C)||"",I=s.getShaderInfoLog(y)||"",z=L.trim(),B=P.trim(),X=I.trim();let k=!0,W=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,C,y);else{const ee=Sl(s,C,"vertex"),oe=Sl(s,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+z+`
`+ee+`
`+oe)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(B===""||X==="")&&(W=!1);W&&(T.diagnostics={runnable:k,programLog:z,vertexShader:{log:B,prefix:f},fragmentShader:{log:X,prefix:d}})}s.deleteShader(C),s.deleteShader(y),A=new Xs(s,S),_=Pm(s,S)}let A;this.getUniforms=function(){return A===void 0&&x(this),A};let _;this.getAttributes=function(){return _===void 0&&x(this),_};let g=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(S,Sm)),g},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ym++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=C,this.fragmentShader=y,this}let Vm=0;class Gm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Wm(e),t.set(e,n)),n}}class Wm{constructor(e){this.id=Vm++,this.code=e,this.usedTimes=0}}function Xm(i,e,t,n,s,r,a){const o=new eo,h=new Gm,l=new Set,c=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let m=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(_){return l.add(_),_===0?"uv":`uv${_}`}function f(_,g,T,L,P){const I=L.fog,z=P.geometry,B=_.isMeshStandardMaterial?L.environment:null,X=(_.isMeshStandardMaterial?t:e).get(_.envMap||B),k=X&&X.mapping===tr?X.image.height:null,W=M[_.type];_.precision!==null&&(m=s.getMaxPrecision(_.precision),m!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",m,"instead."));const ee=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,oe=ee!==void 0?ee.length:0;let pe=0;z.morphAttributes.position!==void 0&&(pe=1),z.morphAttributes.normal!==void 0&&(pe=2),z.morphAttributes.color!==void 0&&(pe=3);let we,Re,De,Z;if(W){const Ke=on[W];we=Ke.vertexShader,Re=Ke.fragmentShader}else we=_.vertexShader,Re=_.fragmentShader,h.update(_),De=h.getVertexShaderID(_),Z=h.getFragmentShaderID(_);const K=i.getRenderTarget(),he=i.state.buffers.depth.getReversed(),J=P.isInstancedMesh===!0,le=P.isBatchedMesh===!0,Ne=!!_.map,at=!!_.matcap,U=!!X,je=!!_.aoMap,Ie=!!_.lightMap,Ae=!!_.bumpMap,me=!!_.normalMap,Ye=!!_.displacementMap,ge=!!_.emissiveMap,Fe=!!_.metalnessMap,ot=!!_.roughnessMap,et=_.anisotropy>0,D=_.clearcoat>0,v=_.dispersion>0,F=_.iridescence>0,V=_.sheen>0,$=_.transmission>0,Y=et&&!!_.anisotropyMap,_e=D&&!!_.clearcoatMap,re=D&&!!_.clearcoatNormalMap,xe=D&&!!_.clearcoatRoughnessMap,be=F&&!!_.iridescenceMap,ie=F&&!!_.iridescenceThicknessMap,de=V&&!!_.sheenColorMap,Le=V&&!!_.sheenRoughnessMap,Te=!!_.specularMap,ce=!!_.specularColorMap,Oe=!!_.specularIntensityMap,O=$&&!!_.transmissionMap,te=$&&!!_.thicknessMap,ae=!!_.gradientMap,Me=!!_.alphaMap,ne=_.alphaTest>0,Q=!!_.alphaHash,ye=!!_.extensions;let ke=Nn;_.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ke=i.toneMapping);const rt={shaderID:W,shaderType:_.type,shaderName:_.name,vertexShader:we,fragmentShader:Re,defines:_.defines,customVertexShaderID:De,customFragmentShaderID:Z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:m,batching:le,batchingColor:le&&P._colorsTexture!==null,instancing:J,instancingColor:J&&P.instanceColor!==null,instancingMorph:J&&P.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Di,alphaToCoverage:!!_.alphaToCoverage,map:Ne,matcap:at,envMap:U,envMapMode:U&&X.mapping,envMapCubeUVHeight:k,aoMap:je,lightMap:Ie,bumpMap:Ae,normalMap:me,displacementMap:p&&Ye,emissiveMap:ge,normalMapObjectSpace:me&&_.normalMapType===vh,normalMapTangentSpace:me&&_.normalMapType===nr,metalnessMap:Fe,roughnessMap:ot,anisotropy:et,anisotropyMap:Y,clearcoat:D,clearcoatMap:_e,clearcoatNormalMap:re,clearcoatRoughnessMap:xe,dispersion:v,iridescence:F,iridescenceMap:be,iridescenceThicknessMap:ie,sheen:V,sheenColorMap:de,sheenRoughnessMap:Le,specularMap:Te,specularColorMap:ce,specularIntensityMap:Oe,transmission:$,transmissionMap:O,thicknessMap:te,gradientMap:ae,opaque:_.transparent===!1&&_.blending===bi&&_.alphaToCoverage===!1,alphaMap:Me,alphaTest:ne,alphaHash:Q,combine:_.combine,mapUv:Ne&&S(_.map.channel),aoMapUv:je&&S(_.aoMap.channel),lightMapUv:Ie&&S(_.lightMap.channel),bumpMapUv:Ae&&S(_.bumpMap.channel),normalMapUv:me&&S(_.normalMap.channel),displacementMapUv:Ye&&S(_.displacementMap.channel),emissiveMapUv:ge&&S(_.emissiveMap.channel),metalnessMapUv:Fe&&S(_.metalnessMap.channel),roughnessMapUv:ot&&S(_.roughnessMap.channel),anisotropyMapUv:Y&&S(_.anisotropyMap.channel),clearcoatMapUv:_e&&S(_.clearcoatMap.channel),clearcoatNormalMapUv:re&&S(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&S(_.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&S(_.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&S(_.iridescenceThicknessMap.channel),sheenColorMapUv:de&&S(_.sheenColorMap.channel),sheenRoughnessMapUv:Le&&S(_.sheenRoughnessMap.channel),specularMapUv:Te&&S(_.specularMap.channel),specularColorMapUv:ce&&S(_.specularColorMap.channel),specularIntensityMapUv:Oe&&S(_.specularIntensityMap.channel),transmissionMapUv:O&&S(_.transmissionMap.channel),thicknessMapUv:te&&S(_.thicknessMap.channel),alphaMapUv:Me&&S(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(me||et),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!z.attributes.uv&&(Ne||Me),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.flatShading===!0&&_.wireframe===!1,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:he,skinning:P.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:pe,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ne&&_.map.isVideoTexture===!0&&qe.getTransfer(_.map.colorSpace)===Je,decodeVideoTextureEmissive:ge&&_.emissiveMap.isVideoTexture===!0&&qe.getTransfer(_.emissiveMap.colorSpace)===Je,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===xn,flipSided:_.side===Ct,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ye&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&_.extensions.multiDraw===!0||le)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return rt.vertexUv1s=l.has(1),rt.vertexUv2s=l.has(2),rt.vertexUv3s=l.has(3),l.clear(),rt}function d(_){const g=[];if(_.shaderID?g.push(_.shaderID):(g.push(_.customVertexShaderID),g.push(_.customFragmentShaderID)),_.defines!==void 0)for(const T in _.defines)g.push(T),g.push(_.defines[T]);return _.isRawShaderMaterial===!1&&(E(g,_),w(g,_),g.push(i.outputColorSpace)),g.push(_.customProgramCacheKey),g.join()}function E(_,g){_.push(g.precision),_.push(g.outputColorSpace),_.push(g.envMapMode),_.push(g.envMapCubeUVHeight),_.push(g.mapUv),_.push(g.alphaMapUv),_.push(g.lightMapUv),_.push(g.aoMapUv),_.push(g.bumpMapUv),_.push(g.normalMapUv),_.push(g.displacementMapUv),_.push(g.emissiveMapUv),_.push(g.metalnessMapUv),_.push(g.roughnessMapUv),_.push(g.anisotropyMapUv),_.push(g.clearcoatMapUv),_.push(g.clearcoatNormalMapUv),_.push(g.clearcoatRoughnessMapUv),_.push(g.iridescenceMapUv),_.push(g.iridescenceThicknessMapUv),_.push(g.sheenColorMapUv),_.push(g.sheenRoughnessMapUv),_.push(g.specularMapUv),_.push(g.specularColorMapUv),_.push(g.specularIntensityMapUv),_.push(g.transmissionMapUv),_.push(g.thicknessMapUv),_.push(g.combine),_.push(g.fogExp2),_.push(g.sizeAttenuation),_.push(g.morphTargetsCount),_.push(g.morphAttributeCount),_.push(g.numDirLights),_.push(g.numPointLights),_.push(g.numSpotLights),_.push(g.numSpotLightMaps),_.push(g.numHemiLights),_.push(g.numRectAreaLights),_.push(g.numDirLightShadows),_.push(g.numPointLightShadows),_.push(g.numSpotLightShadows),_.push(g.numSpotLightShadowsWithMaps),_.push(g.numLightProbes),_.push(g.shadowMapType),_.push(g.toneMapping),_.push(g.numClippingPlanes),_.push(g.numClipIntersection),_.push(g.depthPacking)}function w(_,g){o.disableAll(),g.supportsVertexTextures&&o.enable(0),g.instancing&&o.enable(1),g.instancingColor&&o.enable(2),g.instancingMorph&&o.enable(3),g.matcap&&o.enable(4),g.envMap&&o.enable(5),g.normalMapObjectSpace&&o.enable(6),g.normalMapTangentSpace&&o.enable(7),g.clearcoat&&o.enable(8),g.iridescence&&o.enable(9),g.alphaTest&&o.enable(10),g.vertexColors&&o.enable(11),g.vertexAlphas&&o.enable(12),g.vertexUv1s&&o.enable(13),g.vertexUv2s&&o.enable(14),g.vertexUv3s&&o.enable(15),g.vertexTangents&&o.enable(16),g.anisotropy&&o.enable(17),g.alphaHash&&o.enable(18),g.batching&&o.enable(19),g.dispersion&&o.enable(20),g.batchingColor&&o.enable(21),g.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),g.fog&&o.enable(0),g.useFog&&o.enable(1),g.flatShading&&o.enable(2),g.logarithmicDepthBuffer&&o.enable(3),g.reversedDepthBuffer&&o.enable(4),g.skinning&&o.enable(5),g.morphTargets&&o.enable(6),g.morphNormals&&o.enable(7),g.morphColors&&o.enable(8),g.premultipliedAlpha&&o.enable(9),g.shadowMapEnabled&&o.enable(10),g.doubleSided&&o.enable(11),g.flipSided&&o.enable(12),g.useDepthPacking&&o.enable(13),g.dithering&&o.enable(14),g.transmission&&o.enable(15),g.sheen&&o.enable(16),g.opaque&&o.enable(17),g.pointsUvs&&o.enable(18),g.decodeVideoTexture&&o.enable(19),g.decodeVideoTextureEmissive&&o.enable(20),g.alphaToCoverage&&o.enable(21),_.push(o.mask)}function b(_){const g=M[_.type];let T;if(g){const L=on[g];T=Ln.clone(L.uniforms)}else T=_.uniforms;return T}function C(_,g){let T;for(let L=0,P=c.length;L<P;L++){const I=c[L];if(I.cacheKey===g){T=I,++T.usedTimes;break}}return T===void 0&&(T=new Hm(i,g,_,r),c.push(T)),T}function y(_){if(--_.usedTimes===0){const g=c.indexOf(_);c[g]=c[c.length-1],c.pop(),_.destroy()}}function x(_){h.remove(_)}function A(){h.dispose()}return{getParameters:f,getProgramCacheKey:d,getUniforms:b,acquireProgram:C,releaseProgram:y,releaseShaderCache:x,programs:c,dispose:A}}function Ym(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,h){i.get(a)[o]=h}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function qm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function wl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Al(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,p,m,M,S,f){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:p,material:m,groupOrder:M,renderOrder:u.renderOrder,z:S,group:f},i[e]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=m,d.groupOrder=M,d.renderOrder=u.renderOrder,d.z=S,d.group=f),e++,d}function o(u,p,m,M,S,f){const d=a(u,p,m,M,S,f);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function h(u,p,m,M,S,f){const d=a(u,p,m,M,S,f);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,p){t.length>1&&t.sort(u||qm),n.length>1&&n.sort(p||wl),s.length>1&&s.sort(p||wl)}function c(){for(let u=e,p=i.length;u<p;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:h,finish:c,sort:l}}function jm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Al,i.set(n,[a])):s>=r.length?(a=new Al,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Zm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ze};break;case"SpotLight":t={position:new N,direction:new N,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function $m(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Km=0;function Jm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Qm(i){const e=new Zm,t=$m(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new Xe,a=new Xe;function o(l){let c=0,u=0,p=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let m=0,M=0,S=0,f=0,d=0,E=0,w=0,b=0,C=0,y=0,x=0;l.sort(Jm);for(let _=0,g=l.length;_<g;_++){const T=l[_],L=T.color,P=T.intensity,I=T.distance,z=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)c+=L.r*P,u+=L.g*P,p+=L.b*P;else if(T.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(T.sh.coefficients[B],P);x++}else if(T.isDirectionalLight){const B=e.get(T);if(B.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const X=T.shadow,k=t.get(T);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=z,n.directionalShadowMatrix[m]=T.shadow.matrix,E++}n.directional[m]=B,m++}else if(T.isSpotLight){const B=e.get(T);B.position.setFromMatrixPosition(T.matrixWorld),B.color.copy(L).multiplyScalar(P),B.distance=I,B.coneCos=Math.cos(T.angle),B.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),B.decay=T.decay,n.spot[S]=B;const X=T.shadow;if(T.map&&(n.spotLightMap[C]=T.map,C++,X.updateMatrices(T),T.castShadow&&y++),n.spotLightMatrix[S]=X.matrix,T.castShadow){const k=t.get(T);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,n.spotShadow[S]=k,n.spotShadowMap[S]=z,b++}S++}else if(T.isRectAreaLight){const B=e.get(T);B.color.copy(L).multiplyScalar(P),B.halfWidth.set(T.width*.5,0,0),B.halfHeight.set(0,T.height*.5,0),n.rectArea[f]=B,f++}else if(T.isPointLight){const B=e.get(T);if(B.color.copy(T.color).multiplyScalar(T.intensity),B.distance=T.distance,B.decay=T.decay,T.castShadow){const X=T.shadow,k=t.get(T);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,k.shadowCameraNear=X.camera.near,k.shadowCameraFar=X.camera.far,n.pointShadow[M]=k,n.pointShadowMap[M]=z,n.pointShadowMatrix[M]=T.shadow.matrix,w++}n.point[M]=B,M++}else if(T.isHemisphereLight){const B=e.get(T);B.skyColor.copy(T.color).multiplyScalar(P),B.groundColor.copy(T.groundColor).multiplyScalar(P),n.hemi[d]=B,d++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=p;const A=n.hash;(A.directionalLength!==m||A.pointLength!==M||A.spotLength!==S||A.rectAreaLength!==f||A.hemiLength!==d||A.numDirectionalShadows!==E||A.numPointShadows!==w||A.numSpotShadows!==b||A.numSpotMaps!==C||A.numLightProbes!==x)&&(n.directional.length=m,n.spot.length=S,n.rectArea.length=f,n.point.length=M,n.hemi.length=d,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=b+C-y,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=x,A.directionalLength=m,A.pointLength=M,A.spotLength=S,A.rectAreaLength=f,A.hemiLength=d,A.numDirectionalShadows=E,A.numPointShadows=w,A.numSpotShadows=b,A.numSpotMaps=C,A.numLightProbes=x,n.version=Km++)}function h(l,c){let u=0,p=0,m=0,M=0,S=0;const f=c.matrixWorldInverse;for(let d=0,E=l.length;d<E;d++){const w=l[d];if(w.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),u++}else if(w.isSpotLight){const b=n.spot[m];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),m++}else if(w.isRectAreaLight){const b=n.rectArea[M];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(f),a.identity(),r.copy(w.matrixWorld),r.premultiply(f),a.extractRotation(r),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),M++}else if(w.isPointLight){const b=n.point[p];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(f),p++}else if(w.isHemisphereLight){const b=n.hemi[S];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(f),S++}}}return{setup:o,setupView:h,state:n}}function Rl(i){const e=new Qm(i),t=[],n=[];function s(c){l.camera=c,t.length=0,n.length=0}function r(c){t.push(c)}function a(c){n.push(c)}function o(){e.setup(t)}function h(c){e.setupView(t,c)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:h,pushLight:r,pushShadow:a}}function e0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Rl(i),e.set(s,[o])):r>=a.length?(o=new Rl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const t0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,n0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function i0(i,e,t){let n=new so;const s=new Ee,r=new Ee,a=new it,o=new yu({depthPacking:_h}),h=new Eu,l={},c=t.maxTextureSize,u={[Fn]:Ct,[Ct]:Fn,[xn]:xn},p=new bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:t0,fragmentShader:n0}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const M=new sn;M.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new $e(M,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ql;let d=this.type;this.render=function(y,x,A){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||y.length===0)return;const _=i.getRenderTarget(),g=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),L=i.state;L.setBlending(vt),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const P=d!==vn&&this.type===vn,I=d===vn&&this.type!==vn;for(let z=0,B=y.length;z<B;z++){const X=y[z],k=X.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const W=k.getFrameExtents();if(s.multiply(W),r.copy(k.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/W.x),s.x=r.x*W.x,k.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/W.y),s.y=r.y*W.y,k.mapSize.y=r.y)),k.map===null||P===!0||I===!0){const oe=this.type!==vn?{minFilter:Pt,magFilter:Pt}:{};k.map!==null&&k.map.dispose(),k.map=new nn(s.x,s.y,oe),k.map.texture.name=X.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ee=k.getViewportCount();for(let oe=0;oe<ee;oe++){const pe=k.getViewport(oe);a.set(r.x*pe.x,r.y*pe.y,r.x*pe.z,r.y*pe.w),L.viewport(a),k.updateMatrices(X,oe),n=k.getFrustum(),b(x,A,k.camera,X,this.type)}k.isPointLightShadow!==!0&&this.type===vn&&E(k,A),k.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(_,g,T)};function E(y,x){const A=e.update(S);p.defines.VSM_SAMPLES!==y.blurSamples&&(p.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new nn(s.x,s.y)),p.uniforms.shadow_pass.value=y.map.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(x,null,A,p,S,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value=y.mapSize,m.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(x,null,A,m,S,null)}function w(y,x,A,_){let g=null;const T=A.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(T!==void 0)g=T;else if(g=A.isPointLight===!0?h:o,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){const L=g.uuid,P=x.uuid;let I=l[L];I===void 0&&(I={},l[L]=I);let z=I[P];z===void 0&&(z=g.clone(),I[P]=z,x.addEventListener("dispose",C)),g=z}if(g.visible=x.visible,g.wireframe=x.wireframe,_===vn?g.side=x.shadowSide!==null?x.shadowSide:x.side:g.side=x.shadowSide!==null?x.shadowSide:u[x.side],g.alphaMap=x.alphaMap,g.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,g.map=x.map,g.clipShadows=x.clipShadows,g.clippingPlanes=x.clippingPlanes,g.clipIntersection=x.clipIntersection,g.displacementMap=x.displacementMap,g.displacementScale=x.displacementScale,g.displacementBias=x.displacementBias,g.wireframeLinewidth=x.wireframeLinewidth,g.linewidth=x.linewidth,A.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const L=i.properties.get(g);L.light=A}return g}function b(y,x,A,_,g){if(y.visible===!1)return;if(y.layers.test(x.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&g===vn)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,y.matrixWorld);const P=e.update(y),I=y.material;if(Array.isArray(I)){const z=P.groups;for(let B=0,X=z.length;B<X;B++){const k=z[B],W=I[k.materialIndex];if(W&&W.visible){const ee=w(y,W,_,g);y.onBeforeShadow(i,y,x,A,P,ee,k),i.renderBufferDirect(A,null,P,ee,y,k),y.onAfterShadow(i,y,x,A,P,ee,k)}}}else if(I.visible){const z=w(y,I,_,g);y.onBeforeShadow(i,y,x,A,P,z,null),i.renderBufferDirect(A,null,P,z,y,null),y.onAfterShadow(i,y,x,A,P,z,null)}}const L=y.children;for(let P=0,I=L.length;P<I;P++)b(L[P],x,A,_,g)}function C(y){y.target.removeEventListener("dispose",C);for(const A in l){const _=l[A],g=y.target.uuid;g in _&&(_[g].dispose(),delete _[g])}}}const s0={[Zr]:$r,[Kr]:ea,[Jr]:ta,[wi]:Qr,[$r]:Zr,[ea]:Kr,[ta]:Jr,[Qr]:wi};function r0(i,e){function t(){let O=!1;const te=new it;let ae=null;const Me=new it(0,0,0,0);return{setMask:function(ne){ae!==ne&&!O&&(i.colorMask(ne,ne,ne,ne),ae=ne)},setLocked:function(ne){O=ne},setClear:function(ne,Q,ye,ke,rt){rt===!0&&(ne*=ke,Q*=ke,ye*=ke),te.set(ne,Q,ye,ke),Me.equals(te)===!1&&(i.clearColor(ne,Q,ye,ke),Me.copy(te))},reset:function(){O=!1,ae=null,Me.set(-1,0,0,0)}}}function n(){let O=!1,te=!1,ae=null,Me=null,ne=null;return{setReversed:function(Q){if(te!==Q){const ye=e.get("EXT_clip_control");Q?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),te=Q;const ke=ne;ne=null,this.setClear(ke)}},getReversed:function(){return te},setTest:function(Q){Q?K(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(Q){ae!==Q&&!O&&(i.depthMask(Q),ae=Q)},setFunc:function(Q){if(te&&(Q=s0[Q]),Me!==Q){switch(Q){case Zr:i.depthFunc(i.NEVER);break;case $r:i.depthFunc(i.ALWAYS);break;case Kr:i.depthFunc(i.LESS);break;case wi:i.depthFunc(i.LEQUAL);break;case Jr:i.depthFunc(i.EQUAL);break;case Qr:i.depthFunc(i.GEQUAL);break;case ea:i.depthFunc(i.GREATER);break;case ta:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=Q}},setLocked:function(Q){O=Q},setClear:function(Q){ne!==Q&&(te&&(Q=1-Q),i.clearDepth(Q),ne=Q)},reset:function(){O=!1,ae=null,Me=null,ne=null,te=!1}}}function s(){let O=!1,te=null,ae=null,Me=null,ne=null,Q=null,ye=null,ke=null,rt=null;return{setTest:function(Ke){O||(Ke?K(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(Ke){te!==Ke&&!O&&(i.stencilMask(Ke),te=Ke)},setFunc:function(Ke,dn,rn){(ae!==Ke||Me!==dn||ne!==rn)&&(i.stencilFunc(Ke,dn,rn),ae=Ke,Me=dn,ne=rn)},setOp:function(Ke,dn,rn){(Q!==Ke||ye!==dn||ke!==rn)&&(i.stencilOp(Ke,dn,rn),Q=Ke,ye=dn,ke=rn)},setLocked:function(Ke){O=Ke},setClear:function(Ke){rt!==Ke&&(i.clearStencil(Ke),rt=Ke)},reset:function(){O=!1,te=null,ae=null,Me=null,ne=null,Q=null,ye=null,ke=null,rt=null}}}const r=new t,a=new n,o=new s,h=new WeakMap,l=new WeakMap;let c={},u={},p=new WeakMap,m=[],M=null,S=!1,f=null,d=null,E=null,w=null,b=null,C=null,y=null,x=new ze(0,0,0),A=0,_=!1,g=null,T=null,L=null,P=null,I=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,X=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(k)[1]),B=X>=1):k.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),B=X>=2);let W=null,ee={};const oe=i.getParameter(i.SCISSOR_BOX),pe=i.getParameter(i.VIEWPORT),we=new it().fromArray(oe),Re=new it().fromArray(pe);function De(O,te,ae,Me){const ne=new Uint8Array(4),Q=i.createTexture();i.bindTexture(O,Q),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ye=0;ye<ae;ye++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(te,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,ne):i.texImage2D(te+ye,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ne);return Q}const Z={};Z[i.TEXTURE_2D]=De(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=De(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=De(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=De(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(wi),Ae(!1),me(Eo),K(i.CULL_FACE),je(vt);function K(O){c[O]!==!0&&(i.enable(O),c[O]=!0)}function he(O){c[O]!==!1&&(i.disable(O),c[O]=!1)}function J(O,te){return u[O]!==te?(i.bindFramebuffer(O,te),u[O]=te,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=te),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=te),!0):!1}function le(O,te){let ae=m,Me=!1;if(O){ae=p.get(te),ae===void 0&&(ae=[],p.set(te,ae));const ne=O.textures;if(ae.length!==ne.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,ye=ne.length;Q<ye;Q++)ae[Q]=i.COLOR_ATTACHMENT0+Q;ae.length=ne.length,Me=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,Me=!0);Me&&i.drawBuffers(ae)}function Ne(O){return M!==O?(i.useProgram(O),M=O,!0):!1}const at={[Jt]:i.FUNC_ADD,[Qc]:i.FUNC_SUBTRACT,[eh]:i.FUNC_REVERSE_SUBTRACT};at[th]=i.MIN,at[nh]=i.MAX;const U={[Zi]:i.ZERO,[ih]:i.ONE,[sh]:i.SRC_COLOR,[Xr]:i.SRC_ALPHA,[lh]:i.SRC_ALPHA_SATURATE,[jr]:i.DST_COLOR,[qr]:i.DST_ALPHA,[rh]:i.ONE_MINUS_SRC_COLOR,[Yr]:i.ONE_MINUS_SRC_ALPHA,[oh]:i.ONE_MINUS_DST_COLOR,[ah]:i.ONE_MINUS_DST_ALPHA,[ch]:i.CONSTANT_COLOR,[hh]:i.ONE_MINUS_CONSTANT_COLOR,[uh]:i.CONSTANT_ALPHA,[dh]:i.ONE_MINUS_CONSTANT_ALPHA};function je(O,te,ae,Me,ne,Q,ye,ke,rt,Ke){if(O===vt){S===!0&&(he(i.BLEND),S=!1);return}if(S===!1&&(K(i.BLEND),S=!0),O!==Zl){if(O!==f||Ke!==_){if((d!==Jt||b!==Jt)&&(i.blendEquation(i.FUNC_ADD),d=Jt,b=Jt),Ke)switch(O){case bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bo:i.blendFunc(i.ONE,i.ONE);break;case To:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case To:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}E=null,w=null,C=null,y=null,x.set(0,0,0),A=0,f=O,_=Ke}return}ne=ne||te,Q=Q||ae,ye=ye||Me,(te!==d||ne!==b)&&(i.blendEquationSeparate(at[te],at[ne]),d=te,b=ne),(ae!==E||Me!==w||Q!==C||ye!==y)&&(i.blendFuncSeparate(U[ae],U[Me],U[Q],U[ye]),E=ae,w=Me,C=Q,y=ye),(ke.equals(x)===!1||rt!==A)&&(i.blendColor(ke.r,ke.g,ke.b,rt),x.copy(ke),A=rt),f=O,_=!1}function Ie(O,te){O.side===xn?he(i.CULL_FACE):K(i.CULL_FACE);let ae=O.side===Ct;te&&(ae=!ae),Ae(ae),O.blending===bi&&O.transparent===!1?je(vt):je(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const Me=O.stencilWrite;o.setTest(Me),Me&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ge(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(O){g!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),g=O)}function me(O){O!==Kc?(K(i.CULL_FACE),O!==T&&(O===Eo?i.cullFace(i.BACK):O===Jc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),T=O}function Ye(O){O!==L&&(B&&i.lineWidth(O),L=O)}function ge(O,te,ae){O?(K(i.POLYGON_OFFSET_FILL),(P!==te||I!==ae)&&(i.polygonOffset(te,ae),P=te,I=ae)):he(i.POLYGON_OFFSET_FILL)}function Fe(O){O?K(i.SCISSOR_TEST):he(i.SCISSOR_TEST)}function ot(O){O===void 0&&(O=i.TEXTURE0+z-1),W!==O&&(i.activeTexture(O),W=O)}function et(O,te,ae){ae===void 0&&(W===null?ae=i.TEXTURE0+z-1:ae=W);let Me=ee[ae];Me===void 0&&(Me={type:void 0,texture:void 0},ee[ae]=Me),(Me.type!==O||Me.texture!==te)&&(W!==ae&&(i.activeTexture(ae),W=ae),i.bindTexture(O,te||Z[O]),Me.type=O,Me.texture=te)}function D(){const O=ee[W];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function V(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _e(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function re(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xe(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function be(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ie(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(O){we.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),we.copy(O))}function Le(O){Re.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Re.copy(O))}function Te(O,te){let ae=l.get(te);ae===void 0&&(ae=new WeakMap,l.set(te,ae));let Me=ae.get(O);Me===void 0&&(Me=i.getUniformBlockIndex(te,O.name),ae.set(O,Me))}function ce(O,te){const Me=l.get(te).get(O);h.get(te)!==Me&&(i.uniformBlockBinding(te,Me,O.__bindingPointIndex),h.set(te,Me))}function Oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},W=null,ee={},u={},p=new WeakMap,m=[],M=null,S=!1,f=null,d=null,E=null,w=null,b=null,C=null,y=null,x=new ze(0,0,0),A=0,_=!1,g=null,T=null,L=null,P=null,I=null,we.set(0,0,i.canvas.width,i.canvas.height),Re.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:he,bindFramebuffer:J,drawBuffers:le,useProgram:Ne,setBlending:je,setMaterial:Ie,setFlipSided:Ae,setCullFace:me,setLineWidth:Ye,setPolygonOffset:ge,setScissorTest:Fe,activeTexture:ot,bindTexture:et,unbindTexture:D,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:be,texImage3D:ie,updateUBOMapping:Te,uniformBlockBinding:ce,texStorage2D:re,texStorage3D:xe,texSubImage2D:V,texSubImage3D:$,compressedTexSubImage2D:Y,compressedTexSubImage3D:_e,scissor:de,viewport:Le,reset:Oe}}function a0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ee,c=new WeakMap;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(D,v){return m?new OffscreenCanvas(D,v):Js("canvas")}function S(D,v,F){let V=1;const $=et(D);if(($.width>F||$.height>F)&&(V=F/Math.max($.width,$.height)),V<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const Y=Math.floor(V*$.width),_e=Math.floor(V*$.height);u===void 0&&(u=M(Y,_e));const re=v?M(Y,_e):u;return re.width=Y,re.height=_e,re.getContext("2d").drawImage(D,0,0,Y,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Y+"x"+_e+")."),re}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),D;return D}function f(D){return D.generateMipmaps}function d(D){i.generateMipmap(D)}function E(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(D,v,F,V,$=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Y=v;if(v===i.RED&&(F===i.FLOAT&&(Y=i.R32F),F===i.HALF_FLOAT&&(Y=i.R16F),F===i.UNSIGNED_BYTE&&(Y=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.R8UI),F===i.UNSIGNED_SHORT&&(Y=i.R16UI),F===i.UNSIGNED_INT&&(Y=i.R32UI),F===i.BYTE&&(Y=i.R8I),F===i.SHORT&&(Y=i.R16I),F===i.INT&&(Y=i.R32I)),v===i.RG&&(F===i.FLOAT&&(Y=i.RG32F),F===i.HALF_FLOAT&&(Y=i.RG16F),F===i.UNSIGNED_BYTE&&(Y=i.RG8)),v===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RG8UI),F===i.UNSIGNED_SHORT&&(Y=i.RG16UI),F===i.UNSIGNED_INT&&(Y=i.RG32UI),F===i.BYTE&&(Y=i.RG8I),F===i.SHORT&&(Y=i.RG16I),F===i.INT&&(Y=i.RG32I)),v===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),F===i.UNSIGNED_INT&&(Y=i.RGB32UI),F===i.BYTE&&(Y=i.RGB8I),F===i.SHORT&&(Y=i.RGB16I),F===i.INT&&(Y=i.RGB32I)),v===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),F===i.UNSIGNED_INT&&(Y=i.RGBA32UI),F===i.BYTE&&(Y=i.RGBA8I),F===i.SHORT&&(Y=i.RGBA16I),F===i.INT&&(Y=i.RGBA32I)),v===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),v===i.RGBA){const _e=$?$s:qe.getTransfer(V);F===i.FLOAT&&(Y=i.RGBA32F),F===i.HALF_FLOAT&&(Y=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Y=_e===Je?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function b(D,v){let F;return D?v===null||v===Jn||v===Ci?F=i.DEPTH24_STENCIL8:v===cn?F=i.DEPTH32F_STENCIL8:v===es&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Jn||v===Ci?F=i.DEPTH_COMPONENT24:v===cn?F=i.DEPTH_COMPONENT32F:v===es&&(F=i.DEPTH_COMPONENT16),F}function C(D,v){return f(D)===!0||D.isFramebufferTexture&&D.minFilter!==Pt&&D.minFilter!==ln?Math.log2(Math.max(v.width,v.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?v.mipmaps.length:1}function y(D){const v=D.target;v.removeEventListener("dispose",y),A(v),v.isVideoTexture&&c.delete(v)}function x(D){const v=D.target;v.removeEventListener("dispose",x),g(v)}function A(D){const v=n.get(D);if(v.__webglInit===void 0)return;const F=D.source,V=p.get(F);if(V){const $=V[v.__cacheKey];$.usedTimes--,$.usedTimes===0&&_(D),Object.keys(V).length===0&&p.delete(F)}n.remove(D)}function _(D){const v=n.get(D);i.deleteTexture(v.__webglTexture);const F=D.source,V=p.get(F);delete V[v.__cacheKey],a.memory.textures--}function g(D){const v=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let $=0;$<v.__webglFramebuffer[V].length;$++)i.deleteFramebuffer(v.__webglFramebuffer[V][$]);else i.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)i.deleteFramebuffer(v.__webglFramebuffer[V]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=D.textures;for(let V=0,$=F.length;V<$;V++){const Y=n.get(F[V]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(F[V])}n.remove(D)}let T=0;function L(){T=0}function P(){const D=T;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),T+=1,D}function I(D){const v=[];return v.push(D.wrapS),v.push(D.wrapT),v.push(D.wrapR||0),v.push(D.magFilter),v.push(D.minFilter),v.push(D.anisotropy),v.push(D.internalFormat),v.push(D.format),v.push(D.type),v.push(D.generateMipmaps),v.push(D.premultiplyAlpha),v.push(D.flipY),v.push(D.unpackAlignment),v.push(D.colorSpace),v.join()}function z(D,v){const F=n.get(D);if(D.isVideoTexture&&Fe(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&F.__version!==D.version){const V=D.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(F,D,v);return}}else D.isExternalTexture&&(F.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function B(D,v){const F=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&F.__version!==D.version){Z(F,D,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function X(D,v){const F=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&F.__version!==D.version){Z(F,D,v);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function k(D,v){const F=n.get(D);if(D.version>0&&F.__version!==D.version){K(F,D,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}const W={[On]:i.REPEAT,[$n]:i.CLAMP_TO_EDGE,[sa]:i.MIRRORED_REPEAT},ee={[Pt]:i.NEAREST,[mh]:i.NEAREST_MIPMAP_NEAREST,[hs]:i.NEAREST_MIPMAP_LINEAR,[ln]:i.LINEAR,[or]:i.LINEAR_MIPMAP_NEAREST,[Kn]:i.LINEAR_MIPMAP_LINEAR},oe={[xh]:i.NEVER,[Th]:i.ALWAYS,[Mh]:i.LESS,[hc]:i.LEQUAL,[Sh]:i.EQUAL,[bh]:i.GEQUAL,[yh]:i.GREATER,[Eh]:i.NOTEQUAL};function pe(D,v){if(v.type===cn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===ln||v.magFilter===or||v.magFilter===hs||v.magFilter===Kn||v.minFilter===ln||v.minFilter===or||v.minFilter===hs||v.minFilter===Kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,W[v.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,W[v.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,W[v.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,ee[v.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,ee[v.minFilter]),v.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,oe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Pt||v.minFilter!==hs&&v.minFilter!==Kn||v.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function we(D,v){let F=!1;D.__webglInit===void 0&&(D.__webglInit=!0,v.addEventListener("dispose",y));const V=v.source;let $=p.get(V);$===void 0&&($={},p.set(V,$));const Y=I(v);if(Y!==D.__cacheKey){$[Y]===void 0&&($[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),$[Y].usedTimes++;const _e=$[D.__cacheKey];_e!==void 0&&($[D.__cacheKey].usedTimes--,_e.usedTimes===0&&_(v)),D.__cacheKey=Y,D.__webglTexture=$[Y].texture}return F}function Re(D,v,F){return Math.floor(Math.floor(D/F)/v)}function De(D,v,F,V){const Y=D.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,F,V,v.data);else{Y.sort((ie,de)=>ie.start-de.start);let _e=0;for(let ie=1;ie<Y.length;ie++){const de=Y[_e],Le=Y[ie],Te=de.start+de.count,ce=Re(Le.start,v.width,4),Oe=Re(de.start,v.width,4);Le.start<=Te+1&&ce===Oe&&Re(Le.start+Le.count-1,v.width,4)===ce?de.count=Math.max(de.count,Le.start+Le.count-de.start):(++_e,Y[_e]=Le)}Y.length=_e+1;const re=i.getParameter(i.UNPACK_ROW_LENGTH),xe=i.getParameter(i.UNPACK_SKIP_PIXELS),be=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ie=0,de=Y.length;ie<de;ie++){const Le=Y[ie],Te=Math.floor(Le.start/4),ce=Math.ceil(Le.count/4),Oe=Te%v.width,O=Math.floor(Te/v.width),te=ce,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Oe),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Oe,O,te,ae,F,V,v.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function Z(D,v,F){let V=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=i.TEXTURE_3D);const $=we(D,v),Y=v.source;t.bindTexture(V,D.__webglTexture,i.TEXTURE0+F);const _e=n.get(Y);if(Y.version!==_e.__version||$===!0){t.activeTexture(i.TEXTURE0+F);const re=qe.getPrimaries(qe.workingColorSpace),xe=v.colorSpace===Dn?null:qe.getPrimaries(v.colorSpace),be=v.colorSpace===Dn||re===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let ie=S(v.image,!1,s.maxTextureSize);ie=ot(v,ie);const de=r.convert(v.format,v.colorSpace),Le=r.convert(v.type);let Te=w(v.internalFormat,de,Le,v.colorSpace,v.isVideoTexture);pe(V,v);let ce;const Oe=v.mipmaps,O=v.isVideoTexture!==!0,te=_e.__version===void 0||$===!0,ae=Y.dataReady,Me=C(v,ie);if(v.isDepthTexture)Te=b(v.format===Pi,v.type),te&&(O?t.texStorage2D(i.TEXTURE_2D,1,Te,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Te,ie.width,ie.height,0,de,Le,null));else if(v.isDataTexture)if(Oe.length>0){O&&te&&t.texStorage2D(i.TEXTURE_2D,Me,Te,Oe[0].width,Oe[0].height);for(let ne=0,Q=Oe.length;ne<Q;ne++)ce=Oe[ne],O?ae&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ce.width,ce.height,de,Le,ce.data):t.texImage2D(i.TEXTURE_2D,ne,Te,ce.width,ce.height,0,de,Le,ce.data);v.generateMipmaps=!1}else O?(te&&t.texStorage2D(i.TEXTURE_2D,Me,Te,ie.width,ie.height),ae&&De(v,ie,de,Le)):t.texImage2D(i.TEXTURE_2D,0,Te,ie.width,ie.height,0,de,Le,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){O&&te&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Te,Oe[0].width,Oe[0].height,ie.depth);for(let ne=0,Q=Oe.length;ne<Q;ne++)if(ce=Oe[ne],v.format!==qt)if(de!==null)if(O){if(ae)if(v.layerUpdates.size>0){const ye=rl(ce.width,ce.height,v.format,v.type);for(const ke of v.layerUpdates){const rt=ce.data.subarray(ke*ye/ce.data.BYTES_PER_ELEMENT,(ke+1)*ye/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,ke,ce.width,ce.height,1,de,rt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ce.width,ce.height,ie.depth,de,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,Te,ce.width,ce.height,ie.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ce.width,ce.height,ie.depth,de,Le,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,Te,ce.width,ce.height,ie.depth,0,de,Le,ce.data)}else{O&&te&&t.texStorage2D(i.TEXTURE_2D,Me,Te,Oe[0].width,Oe[0].height);for(let ne=0,Q=Oe.length;ne<Q;ne++)ce=Oe[ne],v.format!==qt?de!==null?O?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ce.width,ce.height,de,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,Te,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ae&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ce.width,ce.height,de,Le,ce.data):t.texImage2D(i.TEXTURE_2D,ne,Te,ce.width,ce.height,0,de,Le,ce.data)}else if(v.isDataArrayTexture)if(O){if(te&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Te,ie.width,ie.height,ie.depth),ae)if(v.layerUpdates.size>0){const ne=rl(ie.width,ie.height,v.format,v.type);for(const Q of v.layerUpdates){const ye=ie.data.subarray(Q*ne/ie.data.BYTES_PER_ELEMENT,(Q+1)*ne/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,ie.width,ie.height,1,de,Le,ye)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(v.isData3DTexture)O?(te&&t.texStorage3D(i.TEXTURE_3D,Me,Te,ie.width,ie.height,ie.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Te,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(v.isFramebufferTexture){if(te)if(O)t.texStorage2D(i.TEXTURE_2D,Me,Te,ie.width,ie.height);else{let ne=ie.width,Q=ie.height;for(let ye=0;ye<Me;ye++)t.texImage2D(i.TEXTURE_2D,ye,Te,ne,Q,0,de,Le,null),ne>>=1,Q>>=1}}else if(Oe.length>0){if(O&&te){const ne=et(Oe[0]);t.texStorage2D(i.TEXTURE_2D,Me,Te,ne.width,ne.height)}for(let ne=0,Q=Oe.length;ne<Q;ne++)ce=Oe[ne],O?ae&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de,Le,ce):t.texImage2D(i.TEXTURE_2D,ne,Te,de,Le,ce);v.generateMipmaps=!1}else if(O){if(te){const ne=et(ie);t.texStorage2D(i.TEXTURE_2D,Me,Te,ne.width,ne.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Le,ie)}else t.texImage2D(i.TEXTURE_2D,0,Te,de,Le,ie);f(v)&&d(V),_e.__version=Y.version,v.onUpdate&&v.onUpdate(v)}D.__version=v.version}function K(D,v,F){if(v.image.length!==6)return;const V=we(D,v),$=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+F);const Y=n.get($);if($.version!==Y.__version||V===!0){t.activeTexture(i.TEXTURE0+F);const _e=qe.getPrimaries(qe.workingColorSpace),re=v.colorSpace===Dn?null:qe.getPrimaries(v.colorSpace),xe=v.colorSpace===Dn||_e===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const be=v.isCompressedTexture||v.image[0].isCompressedTexture,ie=v.image[0]&&v.image[0].isDataTexture,de=[];for(let Q=0;Q<6;Q++)!be&&!ie?de[Q]=S(v.image[Q],!0,s.maxCubemapSize):de[Q]=ie?v.image[Q].image:v.image[Q],de[Q]=ot(v,de[Q]);const Le=de[0],Te=r.convert(v.format,v.colorSpace),ce=r.convert(v.type),Oe=w(v.internalFormat,Te,ce,v.colorSpace),O=v.isVideoTexture!==!0,te=Y.__version===void 0||V===!0,ae=$.dataReady;let Me=C(v,Le);pe(i.TEXTURE_CUBE_MAP,v);let ne;if(be){O&&te&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Oe,Le.width,Le.height);for(let Q=0;Q<6;Q++){ne=de[Q].mipmaps;for(let ye=0;ye<ne.length;ye++){const ke=ne[ye];v.format!==qt?Te!==null?O?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,0,0,ke.width,ke.height,Te,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,Oe,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,0,0,ke.width,ke.height,Te,ce,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,Oe,ke.width,ke.height,0,Te,ce,ke.data)}}}else{if(ne=v.mipmaps,O&&te){ne.length>0&&Me++;const Q=et(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,Oe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ie){O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,de[Q].width,de[Q].height,Te,ce,de[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Oe,de[Q].width,de[Q].height,0,Te,ce,de[Q].data);for(let ye=0;ye<ne.length;ye++){const rt=ne[ye].image[Q].image;O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,0,0,rt.width,rt.height,Te,ce,rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,Oe,rt.width,rt.height,0,Te,ce,rt.data)}}else{O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Te,ce,de[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Oe,Te,ce,de[Q]);for(let ye=0;ye<ne.length;ye++){const ke=ne[ye];O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,0,0,Te,ce,ke.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,Oe,Te,ce,ke.image[Q])}}}f(v)&&d(i.TEXTURE_CUBE_MAP),Y.__version=$.version,v.onUpdate&&v.onUpdate(v)}D.__version=v.version}function he(D,v,F,V,$,Y){const _e=r.convert(F.format,F.colorSpace),re=r.convert(F.type),xe=w(F.internalFormat,_e,re,F.colorSpace),be=n.get(v),ie=n.get(F);if(ie.__renderTarget=v,!be.__hasExternalTextures){const de=Math.max(1,v.width>>Y),Le=Math.max(1,v.height>>Y);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,Y,xe,de,Le,v.depth,0,_e,re,null):t.texImage2D($,Y,xe,de,Le,0,_e,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,$,ie.__webglTexture,0,Ye(v)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,$,ie.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function J(D,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,D),v.depthBuffer){const V=v.depthTexture,$=V&&V.isDepthTexture?V.type:null,Y=b(v.stencilBuffer,$),_e=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=Ye(v);ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,Y,v.width,v.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,Y,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Y,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,D)}else{const V=v.textures;for(let $=0;$<V.length;$++){const Y=V[$],_e=r.convert(Y.format,Y.colorSpace),re=r.convert(Y.type),xe=w(Y.internalFormat,_e,re,Y.colorSpace),be=Ye(v);F&&ge(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,xe,v.width,v.height):ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,xe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,xe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function le(D,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=n.get(v.depthTexture);V.__renderTarget=v,(!V.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),z(v.depthTexture,0);const $=V.__webglTexture,Y=Ye(v);if(v.depthTexture.format===ts)ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(v.depthTexture.format===Pi)ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ne(D){const v=n.get(D),F=D.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==D.depthTexture){const V=D.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){const $=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",$)};V.addEventListener("dispose",$),v.__depthDisposeCallback=$}v.__boundDepthTexture=V}if(D.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const V=D.texture.mipmaps;V&&V.length>0?le(v.__webglFramebuffer[0],D):le(v.__webglFramebuffer,D)}else if(F){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=i.createRenderbuffer(),J(v.__webglDepthbuffer[V],D,!1);else{const $=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}else{const V=D.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),J(v.__webglDepthbuffer,D,!1);else{const $=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(D,v,F){const V=n.get(D);v!==void 0&&he(V.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ne(D)}function U(D){const v=D.texture,F=n.get(D),V=n.get(v);D.addEventListener("dispose",x);const $=D.textures,Y=D.isWebGLCubeRenderTarget===!0,_e=$.length>1;if(_e||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=v.version,a.memory.textures++),Y){F.__webglFramebuffer=[];for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[re]=[];for(let xe=0;xe<v.mipmaps.length;xe++)F.__webglFramebuffer[re][xe]=i.createFramebuffer()}else F.__webglFramebuffer[re]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let re=0;re<v.mipmaps.length;re++)F.__webglFramebuffer[re]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(_e)for(let re=0,xe=$.length;re<xe;re++){const be=n.get($[re]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&ge(D)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let re=0;re<$.length;re++){const xe=$[re];F.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[re]);const be=r.convert(xe.format,xe.colorSpace),ie=r.convert(xe.type),de=w(xe.internalFormat,be,ie,xe.colorSpace,D.isXRRenderTarget===!0),Le=Ye(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,de,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,F.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),J(F.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),pe(i.TEXTURE_CUBE_MAP,v);for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0)for(let xe=0;xe<v.mipmaps.length;xe++)he(F.__webglFramebuffer[re][xe],D,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,xe);else he(F.__webglFramebuffer[re],D,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);f(v)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let re=0,xe=$.length;re<xe;re++){const be=$[re],ie=n.get(be);let de=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(de=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,ie.__webglTexture),pe(de,be),he(F.__webglFramebuffer,D,be,i.COLOR_ATTACHMENT0+re,de,0),f(be)&&d(de)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(re=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,V.__webglTexture),pe(re,v),v.mipmaps&&v.mipmaps.length>0)for(let xe=0;xe<v.mipmaps.length;xe++)he(F.__webglFramebuffer[xe],D,v,i.COLOR_ATTACHMENT0,re,xe);else he(F.__webglFramebuffer,D,v,i.COLOR_ATTACHMENT0,re,0);f(v)&&d(re),t.unbindTexture()}D.depthBuffer&&Ne(D)}function je(D){const v=D.textures;for(let F=0,V=v.length;F<V;F++){const $=v[F];if(f($)){const Y=E(D),_e=n.get($).__webglTexture;t.bindTexture(Y,_e),d(Y),t.unbindTexture()}}}const Ie=[],Ae=[];function me(D){if(D.samples>0){if(ge(D)===!1){const v=D.textures,F=D.width,V=D.height;let $=i.COLOR_BUFFER_BIT;const Y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(D),re=v.length>1;if(re)for(let be=0;be<v.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const xe=D.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let be=0;be<v.length;be++){if(D.resolveDepthBuffer&&(D.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[be]);const ie=n.get(v[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,F,V,0,0,F,V,$,i.NEAREST),h===!0&&(Ie.length=0,Ae.length=0,Ie.push(i.COLOR_ATTACHMENT0+be),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ie.push(Y),Ae.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let be=0;be<v.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,_e.__webglColorRenderbuffer[be]);const ie=n.get(v[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&h){const v=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ye(D){return Math.min(s.maxSamples,D.samples)}function ge(D){const v=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Fe(D){const v=a.render.frame;c.get(D)!==v&&(c.set(D,v),D.update())}function ot(D,v){const F=D.colorSpace,V=D.format,$=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||F!==Di&&F!==Dn&&(qe.getTransfer(F)===Je?(V!==qt||$!==en)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function et(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=L,this.setTexture2D=z,this.setTexture2DArray=B,this.setTexture3D=X,this.setTextureCube=k,this.rebindTextures=at,this.setupRenderTarget=U,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=he,this.useMultisampledRTT=ge}function o0(i,e){function t(n,s=Dn){let r;const a=qe.getTransfer(s);if(n===en)return i.UNSIGNED_BYTE;if(n===Xa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ya)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ac)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ic)return i.BYTE;if(n===sc)return i.SHORT;if(n===es)return i.UNSIGNED_SHORT;if(n===Wa)return i.INT;if(n===Jn)return i.UNSIGNED_INT;if(n===cn)return i.FLOAT;if(n===yn)return i.HALF_FLOAT;if(n===oc)return i.ALPHA;if(n===lc)return i.RGB;if(n===qt)return i.RGBA;if(n===ts)return i.DEPTH_COMPONENT;if(n===Pi)return i.DEPTH_STENCIL;if(n===qa)return i.RED;if(n===ja)return i.RED_INTEGER;if(n===cc)return i.RG;if(n===Za)return i.RG_INTEGER;if(n===$a)return i.RGBA_INTEGER;if(n===Hs||n===Vs||n===Gs||n===Ws)if(a===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ws)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ra||n===aa||n===oa||n===la)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===la)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ca||n===ha||n===ua)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ca||n===ha)return a===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ua)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===va||n===xa||n===Ma||n===Sa||n===ya||n===Ea||n===ba||n===Ta)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===da)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ma)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ga)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_a)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===va)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ma)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ya)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ea)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ba)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ta)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wa||n===Aa||n===Ra)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===wa)return a===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Aa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ra)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ca||n===Pa||n===Da||n===La)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ca)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Da)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===La)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ci?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const l0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class h0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new yc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new bt({vertexShader:l0,fragmentShader:c0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $e(new zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class u0 extends Qn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",h=1,l=null,c=null,u=null,p=null,m=null,M=null;const S=typeof XRWebGLBinding<"u",f=new h0,d={},E=t.getContextAttributes();let w=null,b=null;const C=[],y=[],x=new Ee;let A=null;const _=new Bt;_.viewport=new it;const g=new Bt;g.viewport=new it;const T=[_,g],L=new Ru;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let K=C[Z];return K===void 0&&(K=new Rr,C[Z]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Z){let K=C[Z];return K===void 0&&(K=new Rr,C[Z]=K),K.getGripSpace()},this.getHand=function(Z){let K=C[Z];return K===void 0&&(K=new Rr,C[Z]=K),K.getHandSpace()};function z(Z){const K=y.indexOf(Z.inputSource);if(K===-1)return;const he=C[K];he!==void 0&&(he.update(Z.inputSource,Z.frame,l||a),he.dispatchEvent({type:Z.type,data:Z.inputSource}))}function B(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",X);for(let Z=0;Z<C.length;Z++){const K=y[Z];K!==null&&(y[Z]=null,C[Z].disconnect(K))}P=null,I=null,f.reset();for(const Z in d)delete d[Z];e.setRenderTarget(w),m=null,p=null,u=null,s=null,b=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(x.width,x.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u===null&&S&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",B),s.addEventListener("inputsourceschange",X),E.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(x),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,J=null,le=null;E.depth&&(le=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=E.stencil?Pi:ts,J=E.stencil?Ci:Jn);const Ne={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(Ne),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),b=new nn(p.textureWidth,p.textureHeight,{format:qt,type:en,depthTexture:new ro(p.textureWidth,p.textureHeight,J,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const he={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,he),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new nn(m.framebufferWidth,m.framebufferHeight,{format:qt,type:en,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await s.requestReferenceSpace(o),De.setContext(s),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function X(Z){for(let K=0;K<Z.removed.length;K++){const he=Z.removed[K],J=y.indexOf(he);J>=0&&(y[J]=null,C[J].disconnect(he))}for(let K=0;K<Z.added.length;K++){const he=Z.added[K];let J=y.indexOf(he);if(J===-1){for(let Ne=0;Ne<C.length;Ne++)if(Ne>=y.length){y.push(he),J=Ne;break}else if(y[Ne]===null){y[Ne]=he,J=Ne;break}if(J===-1)break}const le=C[J];le&&le.connect(he)}}const k=new N,W=new N;function ee(Z,K,he){k.setFromMatrixPosition(K.matrixWorld),W.setFromMatrixPosition(he.matrixWorld);const J=k.distanceTo(W),le=K.projectionMatrix.elements,Ne=he.projectionMatrix.elements,at=le[14]/(le[10]-1),U=le[14]/(le[10]+1),je=(le[9]+1)/le[5],Ie=(le[9]-1)/le[5],Ae=(le[8]-1)/le[0],me=(Ne[8]+1)/Ne[0],Ye=at*Ae,ge=at*me,Fe=J/(-Ae+me),ot=Fe*-Ae;if(K.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ot),Z.translateZ(Fe),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),le[10]===-1)Z.projectionMatrix.copy(K.projectionMatrix),Z.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const et=at+Fe,D=U+Fe,v=Ye-ot,F=ge+(J-ot),V=je*U/D*et,$=Ie*U/D*et;Z.projectionMatrix.makePerspective(v,F,V,$,et,D),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function oe(Z,K){K===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(K.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let K=Z.near,he=Z.far;f.texture!==null&&(f.depthNear>0&&(K=f.depthNear),f.depthFar>0&&(he=f.depthFar)),L.near=g.near=_.near=K,L.far=g.far=_.far=he,(P!==L.near||I!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),P=L.near,I=L.far),L.layers.mask=Z.layers.mask|6,_.layers.mask=L.layers.mask&3,g.layers.mask=L.layers.mask&5;const J=Z.parent,le=L.cameras;oe(L,J);for(let Ne=0;Ne<le.length;Ne++)oe(le[Ne],J);le.length===2?ee(L,_,g):L.projectionMatrix.copy(_.projectionMatrix),pe(Z,L,J)};function pe(Z,K,he){he===null?Z.matrix.copy(K.matrixWorld):(Z.matrix.copy(he.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(K.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(K.projectionMatrix),Z.projectionMatrixInverse.copy(K.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ns*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(p===null&&m===null))return h},this.setFoveation=function(Z){h=Z,p!==null&&(p.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(L)},this.getCameraTexture=function(Z){return d[Z]};let we=null;function Re(Z,K){if(c=K.getViewerPose(l||a),M=K,c!==null){const he=c.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let J=!1;he.length!==L.cameras.length&&(L.cameras.length=0,J=!0);for(let U=0;U<he.length;U++){const je=he[U];let Ie=null;if(m!==null)Ie=m.getViewport(je);else{const me=u.getViewSubImage(p,je);Ie=me.viewport,U===0&&(e.setRenderTargetTextures(b,me.colorTexture,me.depthStencilTexture),e.setRenderTarget(b))}let Ae=T[U];Ae===void 0&&(Ae=new Bt,Ae.layers.enable(U),Ae.viewport=new it,T[U]=Ae),Ae.matrix.fromArray(je.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(je.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),U===0&&(L.matrix.copy(Ae.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),J===!0&&L.cameras.push(Ae)}const le=s.enabledFeatures;if(le&&le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){u=n.getBinding();const U=u.getDepthInformation(he[0]);U&&U.isValid&&U.texture&&f.init(U,s.renderState)}if(le&&le.includes("camera-access")&&S){e.state.unbindTexture(),u=n.getBinding();for(let U=0;U<he.length;U++){const je=he[U].camera;if(je){let Ie=d[je];Ie||(Ie=new yc,d[je]=Ie);const Ae=u.getCameraImage(je);Ie.sourceTexture=Ae}}}}for(let he=0;he<C.length;he++){const J=y[he],le=C[he];J!==null&&le!==void 0&&le.update(J,K,l||a)}we&&we(Z,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),M=null}const De=new bc;De.setAnimationLoop(Re),this.setAnimationLoop=function(Z){we=Z},this.dispose=function(){}}}const qn=new It,d0=new Xe;function f0(i,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,gc(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,E,w,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(f,d):d.isMeshToonMaterial?(r(f,d),u(f,d)):d.isMeshPhongMaterial?(r(f,d),c(f,d)):d.isMeshStandardMaterial?(r(f,d),p(f,d),d.isMeshPhysicalMaterial&&m(f,d,b)):d.isMeshMatcapMaterial?(r(f,d),M(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),S(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?h(f,d,E,w):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Ct&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Ct&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const E=e.get(d),w=E.envMap,b=E.envMapRotation;w&&(f.envMap.value=w,qn.copy(b),qn.x*=-1,qn.y*=-1,qn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),f.envMapRotation.value.setFromMatrix4(d0.makeRotationFromEuler(qn)),f.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function h(f,d,E,w){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*E,f.scale.value=w*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function c(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function u(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,E){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ct&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function M(f,d){d.matcap&&(f.matcap.value=d.matcap)}function S(f,d){const E=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function p0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(E,w){const b=w.program;n.uniformBlockBinding(E,b)}function l(E,w){let b=s[E.id];b===void 0&&(M(E),b=c(E),s[E.id]=b,E.addEventListener("dispose",f));const C=w.program;n.updateUBOMapping(E,C);const y=e.render.frame;r[E.id]!==y&&(p(E),r[E.id]=y)}function c(E){const w=u();E.__bindingPointIndex=w;const b=i.createBuffer(),C=E.__size,y=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,b),b}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const w=s[E.id],b=E.uniforms,C=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let y=0,x=b.length;y<x;y++){const A=Array.isArray(b[y])?b[y]:[b[y]];for(let _=0,g=A.length;_<g;_++){const T=A[_];if(m(T,y,_,C)===!0){const L=T.__offset,P=Array.isArray(T.value)?T.value:[T.value];let I=0;for(let z=0;z<P.length;z++){const B=P[z],X=S(B);typeof B=="number"||typeof B=="boolean"?(T.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,L+I,T.__data)):B.isMatrix3?(T.__data[0]=B.elements[0],T.__data[1]=B.elements[1],T.__data[2]=B.elements[2],T.__data[3]=0,T.__data[4]=B.elements[3],T.__data[5]=B.elements[4],T.__data[6]=B.elements[5],T.__data[7]=0,T.__data[8]=B.elements[6],T.__data[9]=B.elements[7],T.__data[10]=B.elements[8],T.__data[11]=0):(B.toArray(T.__data,I),I+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,w,b,C){const y=E.value,x=w+"_"+b;if(C[x]===void 0)return typeof y=="number"||typeof y=="boolean"?C[x]=y:C[x]=y.clone(),!0;{const A=C[x];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return C[x]=y,!0}else if(A.equals(y)===!1)return A.copy(y),!0}return!1}function M(E){const w=E.uniforms;let b=0;const C=16;for(let x=0,A=w.length;x<A;x++){const _=Array.isArray(w[x])?w[x]:[w[x]];for(let g=0,T=_.length;g<T;g++){const L=_[g],P=Array.isArray(L.value)?L.value:[L.value];for(let I=0,z=P.length;I<z;I++){const B=P[I],X=S(B),k=b%C,W=k%X.boundary,ee=k+W;b+=W,ee!==0&&C-ee<X.storage&&(b+=C-ee),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=X.storage}}}const y=b%C;return y>0&&(b+=C-y),E.__size=b,E.__cache={},this}function S(E){const w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function f(E){const w=E.target;w.removeEventListener("dispose",f);const b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function d(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:h,update:l,dispose:d}}class m0{constructor(e={}){const{canvas:t=Gh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const M=new Uint32Array(4),S=new Int32Array(4);let f=null,d=null;const E=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let C=!1;this._outputColorSpace=Mt;let y=0,x=0,A=null,_=-1,g=null;const T=new it,L=new it;let P=null;const I=new ze(0);let z=0,B=t.width,X=t.height,k=1,W=null,ee=null;const oe=new it(0,0,B,X),pe=new it(0,0,B,X);let we=!1;const Re=new so;let De=!1,Z=!1;const K=new Xe,he=new N,J=new it,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ne=!1;function at(){return A===null?k:1}let U=n;function je(R,H){return t.getContext(R,H)}try{const R={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ha}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",ne,!1),U===null){const H="webgl2";if(U=je(H,R),U===null)throw je(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ie,Ae,me,Ye,ge,Fe,ot,et,D,v,F,V,$,Y,_e,re,xe,be,ie,de,Le,Te,ce,Oe;function O(){Ie=new Tp(U),Ie.init(),Te=new o0(U,Ie),Ae=new vp(U,Ie,e,Te),me=new r0(U,Ie),Ae.reversedDepthBuffer&&p&&me.buffers.depth.setReversed(!0),Ye=new Rp(U),ge=new Ym,Fe=new a0(U,Ie,me,ge,Ae,Te,Ye),ot=new Mp(b),et=new bp(b),D=new Iu(U),ce=new gp(U,D),v=new wp(U,D,Ye,ce),F=new Pp(U,v,D,Ye),ie=new Cp(U,Ae,Fe),re=new xp(ge),V=new Xm(b,ot,et,Ie,Ae,ce,re),$=new f0(b,ge),Y=new jm,_e=new e0(Ie),be=new mp(b,ot,et,me,F,m,h),xe=new i0(b,F,Ae),Oe=new p0(U,Ye,Ae,me),de=new _p(U,Ie,Ye),Le=new Ap(U,Ie,Ye),Ye.programs=V.programs,b.capabilities=Ae,b.extensions=Ie,b.properties=ge,b.renderLists=Y,b.shadowMap=xe,b.state=me,b.info=Ye}O();const te=new u0(b,U);this.xr=te,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=Ie.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ie.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(R){R!==void 0&&(k=R,this.setSize(B,X,!1))},this.getSize=function(R){return R.set(B,X)},this.setSize=function(R,H,q=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=R,X=H,t.width=Math.floor(R*k),t.height=Math.floor(H*k),q===!0&&(t.style.width=R+"px",t.style.height=H+"px"),this.setViewport(0,0,R,H)},this.getDrawingBufferSize=function(R){return R.set(B*k,X*k).floor()},this.setDrawingBufferSize=function(R,H,q){B=R,X=H,k=q,t.width=Math.floor(R*q),t.height=Math.floor(H*q),this.setViewport(0,0,R,H)},this.getCurrentViewport=function(R){return R.copy(T)},this.getViewport=function(R){return R.copy(oe)},this.setViewport=function(R,H,q,j){R.isVector4?oe.set(R.x,R.y,R.z,R.w):oe.set(R,H,q,j),me.viewport(T.copy(oe).multiplyScalar(k).round())},this.getScissor=function(R){return R.copy(pe)},this.setScissor=function(R,H,q,j){R.isVector4?pe.set(R.x,R.y,R.z,R.w):pe.set(R,H,q,j),me.scissor(L.copy(pe).multiplyScalar(k).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(R){me.setScissorTest(we=R)},this.setOpaqueSort=function(R){W=R},this.setTransparentSort=function(R){ee=R},this.getClearColor=function(R){return R.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(R=!0,H=!0,q=!0){let j=0;if(R){let G=!1;if(A!==null){const se=A.texture.format;G=se===$a||se===Za||se===ja}if(G){const se=A.texture.type,fe=se===en||se===Jn||se===es||se===Ci||se===Xa||se===Ya,Se=be.getClearColor(),ve=be.getClearAlpha(),Ue=Se.r,Be=Se.g,Ce=Se.b;fe?(M[0]=Ue,M[1]=Be,M[2]=Ce,M[3]=ve,U.clearBufferuiv(U.COLOR,0,M)):(S[0]=Ue,S[1]=Be,S[2]=Ce,S[3]=ve,U.clearBufferiv(U.COLOR,0,S))}else j|=U.COLOR_BUFFER_BIT}H&&(j|=U.DEPTH_BUFFER_BIT),q&&(j|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),be.dispose(),Y.dispose(),_e.dispose(),ge.dispose(),ot.dispose(),et.dispose(),F.dispose(),ce.dispose(),Oe.dispose(),V.dispose(),te.dispose(),te.removeEventListener("sessionstart",rn),te.removeEventListener("sessionend",go),kn.stop()};function ae(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const R=Ye.autoReset,H=xe.enabled,q=xe.autoUpdate,j=xe.needsUpdate,G=xe.type;O(),Ye.autoReset=R,xe.enabled=H,xe.autoUpdate=q,xe.needsUpdate=j,xe.type=G}function ne(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Q(R){const H=R.target;H.removeEventListener("dispose",Q),ye(H)}function ye(R){ke(R),ge.remove(R)}function ke(R){const H=ge.get(R).programs;H!==void 0&&(H.forEach(function(q){V.releaseProgram(q)}),R.isShaderMaterial&&V.releaseShaderCache(R))}this.renderBufferDirect=function(R,H,q,j,G,se){H===null&&(H=le);const fe=G.isMesh&&G.matrixWorld.determinant()<0,Se=zc(R,H,q,j,G);me.setMaterial(j,fe);let ve=q.index,Ue=1;if(j.wireframe===!0){if(ve=v.getWireframeAttribute(q),ve===void 0)return;Ue=2}const Be=q.drawRange,Ce=q.attributes.position;let We=Be.start*Ue,tt=(Be.start+Be.count)*Ue;se!==null&&(We=Math.max(We,se.start*Ue),tt=Math.min(tt,(se.start+se.count)*Ue)),ve!==null?(We=Math.max(We,0),tt=Math.min(tt,ve.count)):Ce!=null&&(We=Math.max(We,0),tt=Math.min(tt,Ce.count));const ut=tt-We;if(ut<0||ut===1/0)return;ce.setup(G,j,Se,q,ve);let lt,st=de;if(ve!==null&&(lt=D.get(ve),st=Le,st.setIndex(lt)),G.isMesh)j.wireframe===!0?(me.setLineWidth(j.wireframeLinewidth*at()),st.setMode(U.LINES)):st.setMode(U.TRIANGLES);else if(G.isLine){let Pe=j.linewidth;Pe===void 0&&(Pe=1),me.setLineWidth(Pe*at()),G.isLineSegments?st.setMode(U.LINES):G.isLineLoop?st.setMode(U.LINE_LOOP):st.setMode(U.LINE_STRIP)}else G.isPoints?st.setMode(U.POINTS):G.isSprite&&st.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)is("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Pe=G._multiDrawStarts,ct=G._multiDrawCounts,Ze=G._multiDrawCount,Ut=ve?D.get(ve).bytesPerElement:1,ei=ge.get(j).currentProgram.getUniforms();for(let Nt=0;Nt<Ze;Nt++)ei.setValue(U,"_gl_DrawID",Nt),st.render(Pe[Nt]/Ut,ct[Nt])}else if(G.isInstancedMesh)st.renderInstances(We,ut,G.count);else if(q.isInstancedBufferGeometry){const Pe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ct=Math.min(q.instanceCount,Pe);st.renderInstances(We,ut,ct)}else st.render(We,ut)};function rt(R,H,q){R.transparent===!0&&R.side===xn&&R.forceSinglePass===!1?(R.side=Ct,R.needsUpdate=!0,os(R,H,q),R.side=Fn,R.needsUpdate=!0,os(R,H,q),R.side=xn):os(R,H,q)}this.compile=function(R,H,q=null){q===null&&(q=R),d=_e.get(q),d.init(H),w.push(d),q.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),R!==q&&R.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const j=new Set;return R.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const se=G.material;if(se)if(Array.isArray(se))for(let fe=0;fe<se.length;fe++){const Se=se[fe];rt(Se,q,G),j.add(Se)}else rt(se,q,G),j.add(se)}),d=w.pop(),j},this.compileAsync=function(R,H,q=null){const j=this.compile(R,H,q);return new Promise(G=>{function se(){if(j.forEach(function(fe){ge.get(fe).currentProgram.isReady()&&j.delete(fe)}),j.size===0){G(R);return}setTimeout(se,10)}Ie.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Ke=null;function dn(R){Ke&&Ke(R)}function rn(){kn.stop()}function go(){kn.start()}const kn=new bc;kn.setAnimationLoop(dn),typeof self<"u"&&kn.setContext(self),this.setAnimationLoop=function(R){Ke=R,te.setAnimationLoop(R),R===null?kn.stop():kn.start()},te.addEventListener("sessionstart",rn),te.addEventListener("sessionend",go),this.render=function(R,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(H),H=te.getCamera()),R.isScene===!0&&R.onBeforeRender(b,R,H,A),d=_e.get(R,w.length),d.init(H),w.push(d),K.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Re.setFromProjectionMatrix(K,hn,H.reversedDepth),Z=this.localClippingEnabled,De=re.init(this.clippingPlanes,Z),f=Y.get(R,E.length),f.init(),E.push(f),te.enabled===!0&&te.isPresenting===!0){const se=b.xr.getDepthSensingMesh();se!==null&&sr(se,H,-1/0,b.sortObjects)}sr(R,H,0,b.sortObjects),f.finish(),b.sortObjects===!0&&f.sort(W,ee),Ne=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ne&&be.addToRenderList(f,R),this.info.render.frame++,De===!0&&re.beginShadows();const q=d.state.shadowsArray;xe.render(q,R,H),De===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=f.opaque,G=f.transmissive;if(d.setupLights(),H.isArrayCamera){const se=H.cameras;if(G.length>0)for(let fe=0,Se=se.length;fe<Se;fe++){const ve=se[fe];vo(j,G,R,ve)}Ne&&be.render(R);for(let fe=0,Se=se.length;fe<Se;fe++){const ve=se[fe];_o(f,R,ve,ve.viewport)}}else G.length>0&&vo(j,G,R,H),Ne&&be.render(R),_o(f,R,H);A!==null&&x===0&&(Fe.updateMultisampleRenderTarget(A),Fe.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(b,R,H),ce.resetDefaultState(),_=-1,g=null,w.pop(),w.length>0?(d=w[w.length-1],De===!0&&re.setGlobalState(b.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?f=E[E.length-1]:f=null};function sr(R,H,q,j){if(R.visible===!1)return;if(R.layers.test(H.layers)){if(R.isGroup)q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(H);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Re.intersectsSprite(R)){j&&J.setFromMatrixPosition(R.matrixWorld).applyMatrix4(K);const fe=F.update(R),Se=R.material;Se.visible&&f.push(R,fe,Se,q,J.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Re.intersectsObject(R))){const fe=F.update(R),Se=R.material;if(j&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),J.copy(R.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),J.copy(fe.boundingSphere.center)),J.applyMatrix4(R.matrixWorld).applyMatrix4(K)),Array.isArray(Se)){const ve=fe.groups;for(let Ue=0,Be=ve.length;Ue<Be;Ue++){const Ce=ve[Ue],We=Se[Ce.materialIndex];We&&We.visible&&f.push(R,fe,We,q,J.z,Ce)}}else Se.visible&&f.push(R,fe,Se,q,J.z,null)}}const se=R.children;for(let fe=0,Se=se.length;fe<Se;fe++)sr(se[fe],H,q,j)}function _o(R,H,q,j){const G=R.opaque,se=R.transmissive,fe=R.transparent;d.setupLightsView(q),De===!0&&re.setGlobalState(b.clippingPlanes,q),j&&me.viewport(T.copy(j)),G.length>0&&as(G,H,q),se.length>0&&as(se,H,q),fe.length>0&&as(fe,H,q),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function vo(R,H,q,j){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[j.id]===void 0&&(d.state.transmissionRenderTarget[j.id]=new nn(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?yn:en,minFilter:Kn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const se=d.state.transmissionRenderTarget[j.id],fe=j.viewport||T;se.setSize(fe.z*b.transmissionResolutionScale,fe.w*b.transmissionResolutionScale);const Se=b.getRenderTarget(),ve=b.getActiveCubeFace(),Ue=b.getActiveMipmapLevel();b.setRenderTarget(se),b.getClearColor(I),z=b.getClearAlpha(),z<1&&b.setClearColor(16777215,.5),b.clear(),Ne&&be.render(q);const Be=b.toneMapping;b.toneMapping=Nn;const Ce=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),d.setupLightsView(j),De===!0&&re.setGlobalState(b.clippingPlanes,j),as(R,q,j),Fe.updateMultisampleRenderTarget(se),Fe.updateRenderTargetMipmap(se),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let tt=0,ut=H.length;tt<ut;tt++){const lt=H[tt],st=lt.object,Pe=lt.geometry,ct=lt.material,Ze=lt.group;if(ct.side===xn&&st.layers.test(j.layers)){const Ut=ct.side;ct.side=Ct,ct.needsUpdate=!0,xo(st,q,j,Pe,ct,Ze),ct.side=Ut,ct.needsUpdate=!0,We=!0}}We===!0&&(Fe.updateMultisampleRenderTarget(se),Fe.updateRenderTargetMipmap(se))}b.setRenderTarget(Se,ve,Ue),b.setClearColor(I,z),Ce!==void 0&&(j.viewport=Ce),b.toneMapping=Be}function as(R,H,q){const j=H.isScene===!0?H.overrideMaterial:null;for(let G=0,se=R.length;G<se;G++){const fe=R[G],Se=fe.object,ve=fe.geometry,Ue=fe.group;let Be=fe.material;Be.allowOverride===!0&&j!==null&&(Be=j),Se.layers.test(q.layers)&&xo(Se,H,q,ve,Be,Ue)}}function xo(R,H,q,j,G,se){R.onBeforeRender(b,H,q,j,G,se),R.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),G.onBeforeRender(b,H,q,j,R,se),G.transparent===!0&&G.side===xn&&G.forceSinglePass===!1?(G.side=Ct,G.needsUpdate=!0,b.renderBufferDirect(q,H,j,G,R,se),G.side=Fn,G.needsUpdate=!0,b.renderBufferDirect(q,H,j,G,R,se),G.side=xn):b.renderBufferDirect(q,H,j,G,R,se),R.onAfterRender(b,H,q,j,G,se)}function os(R,H,q){H.isScene!==!0&&(H=le);const j=ge.get(R),G=d.state.lights,se=d.state.shadowsArray,fe=G.state.version,Se=V.getParameters(R,G.state,se,H,q),ve=V.getProgramCacheKey(Se);let Ue=j.programs;j.environment=R.isMeshStandardMaterial?H.environment:null,j.fog=H.fog,j.envMap=(R.isMeshStandardMaterial?et:ot).get(R.envMap||j.environment),j.envMapRotation=j.environment!==null&&R.envMap===null?H.environmentRotation:R.envMapRotation,Ue===void 0&&(R.addEventListener("dispose",Q),Ue=new Map,j.programs=Ue);let Be=Ue.get(ve);if(Be!==void 0){if(j.currentProgram===Be&&j.lightsStateVersion===fe)return So(R,Se),Be}else Se.uniforms=V.getUniforms(R),R.onBeforeCompile(Se,b),Be=V.acquireProgram(Se,ve),Ue.set(ve,Be),j.uniforms=Se.uniforms;const Ce=j.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ce.clippingPlanes=re.uniform),So(R,Se),j.needsLights=Hc(R),j.lightsStateVersion=fe,j.needsLights&&(Ce.ambientLightColor.value=G.state.ambient,Ce.lightProbe.value=G.state.probe,Ce.directionalLights.value=G.state.directional,Ce.directionalLightShadows.value=G.state.directionalShadow,Ce.spotLights.value=G.state.spot,Ce.spotLightShadows.value=G.state.spotShadow,Ce.rectAreaLights.value=G.state.rectArea,Ce.ltc_1.value=G.state.rectAreaLTC1,Ce.ltc_2.value=G.state.rectAreaLTC2,Ce.pointLights.value=G.state.point,Ce.pointLightShadows.value=G.state.pointShadow,Ce.hemisphereLights.value=G.state.hemi,Ce.directionalShadowMap.value=G.state.directionalShadowMap,Ce.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ce.spotShadowMap.value=G.state.spotShadowMap,Ce.spotLightMatrix.value=G.state.spotLightMatrix,Ce.spotLightMap.value=G.state.spotLightMap,Ce.pointShadowMap.value=G.state.pointShadowMap,Ce.pointShadowMatrix.value=G.state.pointShadowMatrix),j.currentProgram=Be,j.uniformsList=null,Be}function Mo(R){if(R.uniformsList===null){const H=R.currentProgram.getUniforms();R.uniformsList=Xs.seqWithValue(H.seq,R.uniforms)}return R.uniformsList}function So(R,H){const q=ge.get(R);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.batchingColor=H.batchingColor,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function zc(R,H,q,j,G){H.isScene!==!0&&(H=le),Fe.resetTextureUnits();const se=H.fog,fe=j.isMeshStandardMaterial?H.environment:null,Se=A===null?b.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Di,ve=(j.isMeshStandardMaterial?et:ot).get(j.envMap||fe),Ue=j.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Be=!!q.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ce=!!q.morphAttributes.position,We=!!q.morphAttributes.normal,tt=!!q.morphAttributes.color;let ut=Nn;j.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ut=b.toneMapping);const lt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,st=lt!==void 0?lt.length:0,Pe=ge.get(j),ct=d.state.lights;if(De===!0&&(Z===!0||R!==g)){const wt=R===g&&j.id===_;re.setState(j,R,wt)}let Ze=!1;j.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==ct.state.version||Pe.outputColorSpace!==Se||G.isBatchedMesh&&Pe.batching===!1||!G.isBatchedMesh&&Pe.batching===!0||G.isBatchedMesh&&Pe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Pe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Pe.instancing===!1||!G.isInstancedMesh&&Pe.instancing===!0||G.isSkinnedMesh&&Pe.skinning===!1||!G.isSkinnedMesh&&Pe.skinning===!0||G.isInstancedMesh&&Pe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Pe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Pe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Pe.instancingMorph===!1&&G.morphTexture!==null||Pe.envMap!==ve||j.fog===!0&&Pe.fog!==se||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==re.numPlanes||Pe.numIntersection!==re.numIntersection)||Pe.vertexAlphas!==Ue||Pe.vertexTangents!==Be||Pe.morphTargets!==Ce||Pe.morphNormals!==We||Pe.morphColors!==tt||Pe.toneMapping!==ut||Pe.morphTargetsCount!==st)&&(Ze=!0):(Ze=!0,Pe.__version=j.version);let Ut=Pe.currentProgram;Ze===!0&&(Ut=os(j,H,G));let ei=!1,Nt=!1,Fi=!1;const ht=Ut.getUniforms(),Vt=Pe.uniforms;if(me.useProgram(Ut.program)&&(ei=!0,Nt=!0,Fi=!0),j.id!==_&&(_=j.id,Nt=!0),ei||g!==R){me.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),ht.setValue(U,"projectionMatrix",R.projectionMatrix),ht.setValue(U,"viewMatrix",R.matrixWorldInverse);const Dt=ht.map.cameraPosition;Dt!==void 0&&Dt.setValue(U,he.setFromMatrixPosition(R.matrixWorld)),Ae.logarithmicDepthBuffer&&ht.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ht.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),g!==R&&(g=R,Nt=!0,Fi=!0)}if(G.isSkinnedMesh){ht.setOptional(U,G,"bindMatrix"),ht.setOptional(U,G,"bindMatrixInverse");const wt=G.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),ht.setValue(U,"boneTexture",wt.boneTexture,Fe))}G.isBatchedMesh&&(ht.setOptional(U,G,"batchingTexture"),ht.setValue(U,"batchingTexture",G._matricesTexture,Fe),ht.setOptional(U,G,"batchingIdTexture"),ht.setValue(U,"batchingIdTexture",G._indirectTexture,Fe),ht.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&ht.setValue(U,"batchingColorTexture",G._colorsTexture,Fe));const Gt=q.morphAttributes;if((Gt.position!==void 0||Gt.normal!==void 0||Gt.color!==void 0)&&ie.update(G,q,Ut),(Nt||Pe.receiveShadow!==G.receiveShadow)&&(Pe.receiveShadow=G.receiveShadow,ht.setValue(U,"receiveShadow",G.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Vt.envMap.value=ve,Vt.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&H.environment!==null&&(Vt.envMapIntensity.value=H.environmentIntensity),Nt&&(ht.setValue(U,"toneMappingExposure",b.toneMappingExposure),Pe.needsLights&&kc(Vt,Fi),se&&j.fog===!0&&$.refreshFogUniforms(Vt,se),$.refreshMaterialUniforms(Vt,j,k,X,d.state.transmissionRenderTarget[R.id]),Xs.upload(U,Mo(Pe),Vt,Fe)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Xs.upload(U,Mo(Pe),Vt,Fe),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ht.setValue(U,"center",G.center),ht.setValue(U,"modelViewMatrix",G.modelViewMatrix),ht.setValue(U,"normalMatrix",G.normalMatrix),ht.setValue(U,"modelMatrix",G.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const wt=j.uniformsGroups;for(let Dt=0,rr=wt.length;Dt<rr;Dt++){const Hn=wt[Dt];Oe.update(Hn,Ut),Oe.bind(Hn,Ut)}}return Ut}function kc(R,H){R.ambientLightColor.needsUpdate=H,R.lightProbe.needsUpdate=H,R.directionalLights.needsUpdate=H,R.directionalLightShadows.needsUpdate=H,R.pointLights.needsUpdate=H,R.pointLightShadows.needsUpdate=H,R.spotLights.needsUpdate=H,R.spotLightShadows.needsUpdate=H,R.rectAreaLights.needsUpdate=H,R.hemisphereLights.needsUpdate=H}function Hc(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,H,q){const j=ge.get(R);j.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),ge.get(R.texture).__webglTexture=H,ge.get(R.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:q,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,H){const q=ge.get(R);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0};const Vc=U.createFramebuffer();this.setRenderTarget=function(R,H=0,q=0){A=R,y=H,x=q;let j=!0,G=null,se=!1,fe=!1;if(R){const ve=ge.get(R);if(ve.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(U.FRAMEBUFFER,null),j=!1;else if(ve.__webglFramebuffer===void 0)Fe.setupRenderTarget(R);else if(ve.__hasExternalTextures)Fe.rebindTextures(R,ge.get(R.texture).__webglTexture,ge.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ce=R.depthTexture;if(ve.__boundDepthTexture!==Ce){if(Ce!==null&&ge.has(Ce)&&(R.width!==Ce.image.width||R.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(R)}}const Ue=R.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(fe=!0);const Be=ge.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Be[H])?G=Be[H][q]:G=Be[H],se=!0):R.samples>0&&Fe.useMultisampledRTT(R)===!1?G=ge.get(R).__webglMultisampledFramebuffer:Array.isArray(Be)?G=Be[q]:G=Be,T.copy(R.viewport),L.copy(R.scissor),P=R.scissorTest}else T.copy(oe).multiplyScalar(k).floor(),L.copy(pe).multiplyScalar(k).floor(),P=we;if(q!==0&&(G=Vc),me.bindFramebuffer(U.FRAMEBUFFER,G)&&j&&me.drawBuffers(R,G),me.viewport(T),me.scissor(L),me.setScissorTest(P),se){const ve=ge.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+H,ve.__webglTexture,q)}else if(fe){const ve=H;for(let Ue=0;Ue<R.textures.length;Ue++){const Be=ge.get(R.textures[Ue]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ue,Be.__webglTexture,q,ve)}}else if(R!==null&&q!==0){const ve=ge.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ve.__webglTexture,q)}_=-1},this.readRenderTargetPixels=function(R,H,q,j,G,se,fe,Se=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=ge.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve){me.bindFramebuffer(U.FRAMEBUFFER,ve);try{const Ue=R.textures[Se],Be=Ue.format,Ce=Ue.type;if(!Ae.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ae.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=R.width-j&&q>=0&&q<=R.height-G&&(R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Se),U.readPixels(H,q,j,G,Te.convert(Be),Te.convert(Ce),se))}finally{const Ue=A!==null?ge.get(A).__webglFramebuffer:null;me.bindFramebuffer(U.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(R,H,q,j,G,se,fe,Se=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=ge.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve)if(H>=0&&H<=R.width-j&&q>=0&&q<=R.height-G){me.bindFramebuffer(U.FRAMEBUFFER,ve);const Ue=R.textures[Se],Be=Ue.format,Ce=Ue.type;if(!Ae.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ae.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,We),U.bufferData(U.PIXEL_PACK_BUFFER,se.byteLength,U.STREAM_READ),R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Se),U.readPixels(H,q,j,G,Te.convert(Be),Te.convert(Ce),0);const tt=A!==null?ge.get(A).__webglFramebuffer:null;me.bindFramebuffer(U.FRAMEBUFFER,tt);const ut=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Wh(U,ut,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,We),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,se),U.deleteBuffer(We),U.deleteSync(ut),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,H=null,q=0){const j=Math.pow(2,-q),G=Math.floor(R.image.width*j),se=Math.floor(R.image.height*j),fe=H!==null?H.x:0,Se=H!==null?H.y:0;Fe.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,q,0,0,fe,Se,G,se),me.unbindTexture()};const Gc=U.createFramebuffer(),Wc=U.createFramebuffer();this.copyTextureToTexture=function(R,H,q=null,j=null,G=0,se=null){se===null&&(G!==0?(is("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=G,G=0):se=0);let fe,Se,ve,Ue,Be,Ce,We,tt,ut;const lt=R.isCompressedTexture?R.mipmaps[se]:R.image;if(q!==null)fe=q.max.x-q.min.x,Se=q.max.y-q.min.y,ve=q.isBox3?q.max.z-q.min.z:1,Ue=q.min.x,Be=q.min.y,Ce=q.isBox3?q.min.z:0;else{const Gt=Math.pow(2,-G);fe=Math.floor(lt.width*Gt),Se=Math.floor(lt.height*Gt),R.isDataArrayTexture?ve=lt.depth:R.isData3DTexture?ve=Math.floor(lt.depth*Gt):ve=1,Ue=0,Be=0,Ce=0}j!==null?(We=j.x,tt=j.y,ut=j.z):(We=0,tt=0,ut=0);const st=Te.convert(H.format),Pe=Te.convert(H.type);let ct;H.isData3DTexture?(Fe.setTexture3D(H,0),ct=U.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(Fe.setTexture2DArray(H,0),ct=U.TEXTURE_2D_ARRAY):(Fe.setTexture2D(H,0),ct=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,H.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,H.unpackAlignment);const Ze=U.getParameter(U.UNPACK_ROW_LENGTH),Ut=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ei=U.getParameter(U.UNPACK_SKIP_PIXELS),Nt=U.getParameter(U.UNPACK_SKIP_ROWS),Fi=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,lt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,lt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ue),U.pixelStorei(U.UNPACK_SKIP_ROWS,Be),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ce);const ht=R.isDataArrayTexture||R.isData3DTexture,Vt=H.isDataArrayTexture||H.isData3DTexture;if(R.isDepthTexture){const Gt=ge.get(R),wt=ge.get(H),Dt=ge.get(Gt.__renderTarget),rr=ge.get(wt.__renderTarget);me.bindFramebuffer(U.READ_FRAMEBUFFER,Dt.__webglFramebuffer),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,rr.__webglFramebuffer);for(let Hn=0;Hn<ve;Hn++)ht&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ge.get(R).__webglTexture,G,Ce+Hn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ge.get(H).__webglTexture,se,ut+Hn)),U.blitFramebuffer(Ue,Be,fe,Se,We,tt,fe,Se,U.DEPTH_BUFFER_BIT,U.NEAREST);me.bindFramebuffer(U.READ_FRAMEBUFFER,null),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||R.isRenderTargetTexture||ge.has(R)){const Gt=ge.get(R),wt=ge.get(H);me.bindFramebuffer(U.READ_FRAMEBUFFER,Gc),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,Wc);for(let Dt=0;Dt<ve;Dt++)ht?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Gt.__webglTexture,G,Ce+Dt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Gt.__webglTexture,G),Vt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.__webglTexture,se,ut+Dt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,wt.__webglTexture,se),G!==0?U.blitFramebuffer(Ue,Be,fe,Se,We,tt,fe,Se,U.COLOR_BUFFER_BIT,U.NEAREST):Vt?U.copyTexSubImage3D(ct,se,We,tt,ut+Dt,Ue,Be,fe,Se):U.copyTexSubImage2D(ct,se,We,tt,Ue,Be,fe,Se);me.bindFramebuffer(U.READ_FRAMEBUFFER,null),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Vt?R.isDataTexture||R.isData3DTexture?U.texSubImage3D(ct,se,We,tt,ut,fe,Se,ve,st,Pe,lt.data):H.isCompressedArrayTexture?U.compressedTexSubImage3D(ct,se,We,tt,ut,fe,Se,ve,st,lt.data):U.texSubImage3D(ct,se,We,tt,ut,fe,Se,ve,st,Pe,lt):R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,se,We,tt,fe,Se,st,Pe,lt.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,se,We,tt,lt.width,lt.height,st,lt.data):U.texSubImage2D(U.TEXTURE_2D,se,We,tt,fe,Se,st,Pe,lt);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ze),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ut),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ei),U.pixelStorei(U.UNPACK_SKIP_ROWS,Nt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Fi),se===0&&H.generateMipmaps&&U.generateMipmap(ct),me.unbindTexture()},this.initRenderTarget=function(R){ge.get(R).__webglFramebuffer===void 0&&Fe.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Fe.setTextureCube(R,0):R.isData3DTexture?Fe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Fe.setTexture2DArray(R,0):Fe.setTexture2D(R,0),me.unbindTexture()},this.resetState=function(){y=0,x=0,A=null,me.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const Ki=["前往库位","伸叉取框","抬升取框","收叉载货","运行到出口","下降到交接高度","伸叉交接","放框到输送线","收回货叉","输送至出口缓存"],Cc=i=>i*i*(3-2*i),Ys=(i,e,t)=>i+(e-i)*t;function Pc(i,e){const t=i.params,n=e.index<t.smallBays*t.smallLevels,s=n?e.index:e.index-t.smallBays*t.smallLevels,r=n?t.smallLevels:t.largeLevels,a=n?t.smallPitch:t.largePitch,o=n?t.smallStep:t.largeStep,h=t.smallBays*t.smallPitch+t.largeBays*t.largePitch,l=new N(-h/2+(n?0:t.smallBays*t.smallPitch)+(Math.floor(s/r)+.5)*a,.1775+s%r*o,0),c=new Xe().compose(new N(...i.position),new un().setFromEuler(new It(...i.rotation.map(tn.degToRad))),new N(...i.scale));return{position:l.applyMatrix4(c).toArray(),width:a*(e.size===2?.94:.82)*i.scale[0],height:o*(e.size===2?.82:.72)*i.scale[1],depth:t.depth*.85*i.scale[2],color:e.size===1?"#539fa7":e.size===2?"#718d9e":"#8b8b91"}}function ho(i){const e=i.find(n=>n.type==="hardwareConveyorAssembly");if(!e)return[];const t=e.params.laneCenters;return!Array.isArray(t)||t.length!==4?[]:[...t].sort((n,s)=>s-n).map((n,s)=>({code:String(101+s),z:e.position[2]+n*e.scale[2],x:e.position[0]-e.params.length*e.scale[0]/2+.35,assembly:e}))}function qs(i,e){return Number(i)!==2||["103","104"].includes(String(e))}function uo(i){var t;if(i.dockMode)return i.dockMode;const e=Number((t=i.id.match(/^hardware-rack-link-(\d)$/))==null?void 0:t[1]);return[0,2].includes(e)?"inbound":[1,3].includes(e)?"outbound":null}function Dc(i){const e=i.params,t=e.exhibitionDetail?e.chainDeck?.0555:e.crossBelt?.0355:e.flatDeck?.0645:.09:.185;return i.position[1]+(e.height+t)*i.scale[1]}function g0(i,e,t,n){const s=ho(i),r=s.find(S=>S.code===String(n));if(!r)throw Error("请选择目标出货口（101～104）");const a=i.filter(S=>S.type==="binRack"&&S.aisle===t.aisle),o=i.find(S=>S.type==="conveyor"&&S.id.startsWith("hardware-rack-link-")&&uo(S)==="outbound"&&a.some(f=>Math.abs(S.position[2]-f.position[2])<.01));if(!o)throw Error("该巷道缺少出库专用接驳工位");const h=r.assembly;if(h.rotation.some(S=>Math.abs(S)>.001)||h.scale.some(S=>Math.abs(S-1)>.001))throw Error("请保持输送线总装原始朝向与比例后下达任务");const l=o.position[0]+o.params.length/2-.45,c=o.position[2],u=Dc(o),p=h.position[1]+h.params.height,m=u-.185,M=[[l,u,c],[h.position[0]+.43,p,c],[h.position[0]+.43,p,r.z],[h.position[0]-.43,p,r.z],[r.x,p,r.z]];return{id:"hardware-port-"+r.code,portCode:r.code,aisle:t.aisle,side:"A",direction:-1,x:l,z:c,height:m,length:o.params.length,width:o.params.width,route:M,capacity:ka,dockId:o.id,dockMode:"outbound"}}const Lc=i=>i.slice(1).reduce((e,t,n)=>e+Math.hypot(...t.map((s,r)=>s-i[n][r])),0);function fo(i,e){let t=Lc(i)*Math.max(0,Math.min(1,e));for(let n=1;n<i.length;n++){const s=i[n-1],r=i[n],a=Math.hypot(...r.map((o,h)=>o-s[h]));if(t<=a&&a>0)return s.map((o,h)=>Ys(o,r[h],t/a));t-=a}return i.at(-1)}function _0(i,e,t,n,s){const r=i.slots.find(x=>x.id===t),a=e.find(x=>x.id===(r==null?void 0:r.deviceId));if(!(r!=null&&r.occupied)||(a==null?void 0:a.type)!=="binRack")throw Error("请选择有料框的料框库库位");if(n.route&&Xl(i)>=ka)throw Error("输送线已预留10个料框，请等待空位");if(n.portCode&&!qs(r.size,n.portCode))throw Error("大料筐只能出库至103、104工位");if(n.route){const x=e.find(A=>A.id===n.dockId);if(!x||uo(x)!=="outbound")throw Error("入库专用工位禁止放置出库料框")}if(i.tasks.some(x=>x.type==="outbound"&&x.source===t&&x.status!=="completed"))throw Error("该料框已有出库任务");const o=e.find(x=>x.type==="stacker"&&x.aisle===a.aisle);if(r.size===2&&a.aisle!==2)throw Error("大料筐只能从二号巷道出库");if(!o||!i.devices[o.id]||["fault","maintenance"].includes(i.devices[o.id].status))throw Error("对应巷道的堆垛机不可用");if(i.tasks.filter(x=>x.type==="outbound"&&x.station.id===n.id&&!x.collected).length>=(n.capacity||3))throw Error("该出口缓存已满，请先确认取走已完成的料框");if([a,o].some(x=>x.rotation.some(A=>Math.abs(A)>.001)||x.scale.some(A=>Math.abs(A-1)>.001)))throw Error("当前出库演示需要货架和堆垛机保持原始朝向与比例");const h=Pc(a,r),[l,c,u]=h.position,p=l-o.position[0],m=c-o.position[1]-.1775,M=u-o.position[2];if(Math.abs(p)+1.33>o.params.railLength/2||Math.abs(n.x-o.position[0])+1.33>o.params.railLength/2)throw Error("轨道长度不足，请延长堆垛机轨道后出库");const S={travel:s.travel,lift:s.lift,extension:0},f={travel:p,lift:Math.max(0,m-.04),extension:0},d={travel:n.x-o.position[0],lift:n.height+.185-o.position[1]-.1775+.04,extension:0},E=[f,{...f,extension:M},{...f,lift:m+.04,extension:M},{...f,lift:m+.04,extension:0},{...d,lift:Math.max(m,.8)},d,{...d,extension:n.z-o.position[2]},{...d,lift:d.lift-.04,extension:n.z-o.position[2]},{...d,lift:d.lift-.04},{...d,lift:d.lift-.04}],w=E.map((x,A)=>{const _=A?E[A-1]:S;return A===9?n.route?Math.max(4,Lc(n.route)/.45):4:Math.max(1.1,Math.abs(x.travel-_.travel)/3,Math.abs(x.lift-_.lift)/1.5,Math.abs(x.extension-_.extension)/.6)}),b=i.tasks.some(x=>x.deviceId===o.id&&za(x)),C={type:"outbound",code:`OUT-${String((i.outboundSequence||0)+1).padStart(4,"0")}`,source:r.id,deviceId:o.id,from:r.location,destinationPort:n.portCode||null,to:n.portCode?`${n.portCode} 出货口`:`${n.side}端 · 巷道${a.aisle}输送线`,status:b?"queued":"running",progress:0,phase:0,phaseElapsed:0,stage:b?"等待堆垛机":Ki[0],start:S,targets:E,durations:w,station:n,geometry:h,stackerPosition:[...o.position],cargo:{boxId:r.boxId??r.id,boxCode:r.boxCode||r.location,size:r.size,sku:r.sku,product:r.product,quantity:r.quantity,batch:r.batch,items:r.items||[]},cargoState:"rack",pose:S},y=i.tasks.filter(x=>x.type==="outbound"&&x.station.id===n.id&&!x.collected).map(x=>x.bufferIndex);if(C.bufferIndex=y.length?Math.max(...y)+1:0,C.bufferIndex>=(n.capacity||3))throw Error("出口剩余缓存暂不可到达，请待任务完成并取走出口料框后再下达");return i.outboundSequence=(i.outboundSequence||0)+1,i.manualOutbound=!0,i.tasks.unshift(C),i.events.unshift({time:i.elapsed,message:`${C.code}：${C.from} → ${C.to}，料框出库任务已下达`}),C}function zr(i,e,t){i.events.unshift({time:i.elapsed,message:`${e.code}：${t}`}),i.events=i.events.slice(0,40)}function Cl(i,e,t){for(const n of i.inventory||[])n.boxId===e.cargo.boxId&&(n.locationId=null,n.placement=t)}function v0(i,e,t){var s;let n=!1;for(const r of i.tasks.filter(a=>a.type==="outbound"&&a.status==="running")){const a=i.devices[r.deviceId];if(!a||["fault","maintenance"].includes(a.status))continue;let o=e;for(;o>0&&r.status==="running";){if(r.stage=Ki[r.phase],r.phase===6&&i.tasks.some(f=>f!==r&&!f.collected&&f.cargoState==="conveyor"&&(()=>{const d=f.type==="outbound"?Ic(f):f.returnRouteDone?[f.station.x,f.station.height+.185,f.station.z]:f.returnRoute?fo(f.returnRoute,f.phase===0?f.phaseElapsed/f.durations[0]:1):null;return d&&Math.abs(d[0]-r.station.x)<(r.geometry.width+f.geometry.width)/2+.06&&Math.abs(d[2]-r.station.z)<(r.geometry.depth+f.geometry.depth)/2+.06})())){r.stage="等待出库接驳空位";break}const h=r.phase,l=r.durations[h],c=Math.min(o,l-r.phaseElapsed,r.phase===9&&((s=r.station.route)!=null&&s.length)?.1:1/0);if(r.phase===9&&!Gl(r,i,r.phaseElapsed+c)){r.stage="等待交汇输送段";break}r.phaseElapsed+=c,o-=c;const u=h?r.targets[h-1]:r.start,p=r.targets[h],m=Cc(Math.min(1,r.phaseElapsed/l));r.pose={travel:Ys(u.travel,p.travel,m),lift:Ys(u.lift,p.lift,m),extension:Ys(u.extension,p.extension,m)};const M=r.durations.reduce((f,d)=>f+d,0),S=r.durations.slice(0,h).reduce((f,d)=>f+d,0)+r.phaseElapsed;if(r.progress=Math.min(100,Math.round(S/M*100)),Un(r)&&(a.status="running",a.travel=r.pose.travel,a.lift=r.pose.lift),r.phaseElapsed<l-1e-8){if(o>0)continue;break}if(Yl(r,h,2,9))break;if(h===2){const f=i.slots.find(d=>d.id===r.source);f.occupied=!1;for(const d of["sku","product","batch","boxCode"])f[d]="";f.boxId=null,f.quantity=null,f.items=[],f.size=0,r.cargoState="fork",Cl(i,r,"堆垛机货叉"),n=!0,zr(i,r,"料框已取上货叉，源库位已释放")}h===7&&(r.cargoState="conveyor",Cl(i,r,r.to),zr(i,r,"料框已交接到输送线")),h===9&&Wl(r),r.phase++,r.phaseElapsed=0,r.phase===9&&(a.status="idle"),r.phase===Ki.length?(r.status="completed",r.stage="已到出口缓存",r.progress=100,i.completed++,a.completed++,i.tasks.some(f=>f!==r&&f.deviceId===r.deviceId&&Un(f))||(a.status="idle"),zr(i,r,"出库完成，等待出口取走")):r.stage=Ki[r.phase]}}for(const r of[...i.tasks].reverse().filter(a=>a.type==="outbound"&&a.status==="queued")){if(i.tasks.some(h=>h!==r&&h.deviceId===r.deviceId&&Un(h)))continue;const a=i.tasks.find(h=>["outbound","inbound"].includes(h.type)&&h.deviceId===r.deviceId&&h.status==="completed"),o=t==null?void 0:t(r.deviceId);r.phase===0&&(o?r.start={...o,extension:o.extension??0}:a&&(r.start={...a.pose}),r.durations[0]=Math.max(1.1,Math.abs(r.targets[0].travel-r.start.travel)/3,Math.abs(r.targets[0].lift-r.start.lift)/1.5),r.pose={...r.start}),r.status="running",r.stage=Ki[r.phase]}return n}function Ic(i,e){const{pose:t,stackerPosition:n,station:s}=i;if(i.cargoState==="fork")return[n[0]+t.travel,n[1]+t.lift+.1775,n[2]+t.extension];if(i.cargoState==="conveyor"){const r=i.status==="completed"?1:i.phase===9?Cc(i.phaseElapsed/i.durations[9]):0;return s.route?fo(s.route,r):[s.x+s.direction*(4.6-i.bufferIndex*1.3)*r,s.height+.185,s.z]}return i.geometry.position}function x0(i,e=""){const t=new St,{width:n,height:s,depth:r,color:a}=i,o=(l,c,u,p,m,M,S)=>{const f=new $e(new Ht(p,m,M),new xt({color:S,roughness:.45,metalness:.25}));f.position.set(l,c,u),f.castShadow=!0,t.add(f)};o(0,.0125,0,n,.025,r,a);for(const l of[-1,1])o(0,s/2+.0225,l*r/2,n,s,.024,a),o(l*n/2,s/2+.0225,0,.024,s,r,a),o(0,s+.0225,l*r/2,n,.035,.045,"#8a9baa"),o(0,s*.55-.0275,l*(r/2+.016),.12,.055,.026,"#d9e0d9");const h=String(e??"").trim();if(h){const l=document.createElement("canvas");l.width=512,l.height=160;const c=l.getContext("2d");c.textAlign="center",c.textBaseline="middle";let u=80;for(c.font=`bold ${u}px Microsoft YaHei, sans-serif`;c.measureText(h).width>472&&u>16;)u-=2,c.font=`bold ${u}px Microsoft YaHei, sans-serif`;c.fillStyle="rgba(220,239,242,0.65)",c.fillText(h,256,84,472),c.fillStyle="#233c46",c.fillText(h,256,80,472);const p=new En(l);p.colorSpace=Mt;const m=n*.82,M=Math.min(s*.25,m*160/512);for(const S of[-1,1]){const f=new $e(new zn(m,M),new xt({map:p,transparent:!0,depthTest:!0,depthWrite:!1,roughness:.65,metalness:.2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));f.name="cargo-box-code",f.userData.boxCode=h,f.position.set(0,s*.78+.0225,S*(r/2+.013)),f.rotation.y=S===1?0:Math.PI,t.add(f)}t.userData.ownedTexture=p}return t}function M0(i,e){let t=!1,n=0,s=-1,r=0;const a=new Map,o=new Map;function h(p="连续演示已暂停"){e.enabled=!1,e.message=p,i.setRunning(!1)}function l(){e.started=!0,e.enabled=!0,e.error="",e.message="随机选择料框与空闲工位",i.setRunning(!0)}function c(){r++,n=0,s=-1,a.clear(),o.clear(),e.started=!1,e.enabled=!1,e.cycles=0,e.message="",e.error=""}async function u(p){var w,b;if(!e.enabled||!i.running()||(n+=p,t||i.dbBusy()||n-s<1))return;s=n;const m=i.state(),M=i.objects(),S=m.tasks;e.cycles=S.filter(C=>C.autoDemo&&!C.initialReset&&C.type==="inbound"&&C.status==="completed").length;let f;const d=[];for(const C of S.filter(y=>y.autoDemo&&y.type==="outbound"&&y.status==="completed"&&!y.collected)){if(!Pl({size:C.cargo.size,index:-1},M.filter(x=>x.type==="binRack"),m)){e.message=`${C.destinationPort} 工位等待大料筐匹配空库位，其他任务继续`;continue}if(S.some(x=>{var A;return x.type==="inbound"&&((A=x.cargo)==null?void 0:A.boxCode)===C.cargo.boxCode&&["submitting","queued","running"].includes(x.status)})||(((w=o.get(C.code))==null?void 0:w.until)??0)>n)continue;a.has(C.code)||a.set(C.code,n);const y=Math.max(0,Math.ceil(8-(n-a.get(C.code))));if(y){e.message=`${C.destinationPort} 工位模拟取货 · ${y}秒后回库`;continue}d.push(C)}if(!f){const C=Xl(m)>=ka?[]:i.ports().filter(P=>!S.some(I=>I.type==="inbound"&&I.entryPort===P.code&&I.status!=="completed"||I.type==="outbound"&&I.destinationPort===P.code&&I.status==="completed"&&!I.collected)),y=M.filter(P=>P.type==="binRack"),x=M.filter(P=>{var I;return P.type==="stacker"&&!["fault","maintenance"].includes((I=m.devices[P.id])==null?void 0:I.status)&&!S.some(z=>z.deviceId===P.id&&za(z))}),_=m.slots.filter(P=>P.occupied&&P.boxCode&&(m.source!=="SQL"||[1,2].includes(P.size))&&x.some(I=>y.some(z=>z.id===P.deviceId&&z.aisle===I.aisle&&(P.size!==2||z.aisle===2)))&&!S.some(I=>I.source===P.id&&I.status!=="completed")).filter(P=>C.some(I=>qs(P.size,I.code))&&Pl(P,y,m)),g=P=>S.find(I=>I.deviceId===P.id&&I.status==="completed"&&!I.initialReset),T=P=>{var I;return(I=y.find(z=>z.id===P.deviceId))==null?void 0:I.aisle},L=_.filter(P=>x.some(I=>{var z;return I.aisle===T(P)&&((z=g(I))==null?void 0:z.type)==="inbound"}));if(L.length){const P=L[Math.floor(Math.random()*L.length)],I=C.filter(z=>qs(P.size,z.code));f={type:"outbound",slotId:P.id,port:I[Math.floor(Math.random()*I.length)].code}}if(!f)for(const P of d){const I=x.filter(B=>Number(P.cargo.size)!==2||B.aisle===2),z=I.find(B=>{var X;return((X=g(B))==null?void 0:X.type)==="outbound"})??I[0];if(!(!z&&M.some(B=>B.type==="stacker"))){f={type:"inbound",boxCode:P.cargo.boxCode,port:P.destinationPort,returnTaskCode:P.code,preferredAisle:z==null?void 0:z.aisle};break}}if(!f&&_.length){const P=_[Math.floor(Math.random()*_.length)],I=C.filter(z=>qs(P.size,z.code));f={type:"outbound",slotId:P.id,port:I[Math.floor(Math.random()*I.length)].code}}}if(!f){S.some(C=>C.autoDemo&&C.type==="outbound"&&C.status==="completed"&&!C.collected)||(e.message="等待工位、堆垛机或可用料框");return}t=!0;const E=r;try{await i.dispatch(f),E===r&&(f.returnTaskCode&&o.delete(f.returnTaskCode),e.enabled&&(e.message=f.type==="inbound"?`${f.port} 工位料框自动回库`:`料框自动出库至 ${f.port} 工位`))}catch(C){if(E!==r)return;if(C.status===409||/繁忙|没有可用|已有待取|占用|预留/.test(C.message)){if(f.returnTaskCode){const y=(((b=o.get(f.returnTaskCode))==null?void 0:b.attempts)??0)+1;o.set(f.returnTaskCode,{attempts:y,until:n+Math.min(120,15*2**(y-1))})}else s=n+2;e.message=C.message+"，等待后重试，其他可用任务继续"}else e.error=C.message,h("连续演示暂停："+C.message),i.notify(e.message)}finally{t=!1}}return{start:l,pause:h,reset:c,advance:u}}function Pl(i,e,t){if(t.source!=="SQL"||Number(i.size)!==2)return!0;const n=s=>{const r=e.find(a=>a.id===s.deviceId);return(r==null?void 0:r.aisle)===2&&s.index>=r.params.smallBays*r.params.smallLevels};return n(i)||t.slots.some(s=>!s.occupied&&n(s)&&!t.tasks.some(r=>r.type==="inbound"&&r.target===s.id&&r.status!=="completed"))}const js=["前往入库工位","下降到取框高度","伸叉取框","抬升取框","收叉载货","运行到目标库位","伸叉入库","放框入库","收回货叉"],S0=i=>i*i*(3-2*i),kr=(i,e,t)=>i+(e-i)*t;function Ba(i){return i.filter(e=>e.type==="conveyor"&&e.id.startsWith("hardware-rack-link-")&&uo(e)==="inbound").map(e=>{var t;return{id:e.id,name:e.name,link:e,aisle:(t=i.find(n=>n.type==="binRack"&&Math.abs(n.position[2]-e.position[2])<.01))==null?void 0:t.aisle}})}function y0(i,e,{dockId:t,targetId:n,boxCode:s,product:r="",quantity:a=1,entryPort:o},h){var he;const l=Ba(e).find(J=>J.id===t),c=i.slots.find(J=>J.id===n),u=e.find(J=>J.id===(c==null?void 0:c.deviceId));if(!l)throw Error("请选择红色入库专用工位，出库工位不能接收入库料框");if(!c||(u==null?void 0:u.type)!=="binRack")throw Error("请选择空闲目标库位");if(c.occupied)throw Error(`目标库位 ${c.location} 已有料框 ${c.boxCode||""}，请选择其他空闲库位`);if(u.aisle!==l.aisle)throw Error("入库工位与目标库位必须位于同一巷道");if(!(s!=null&&s.trim()))throw Error("请输入料框编号");if(!Number.isFinite(a)||a<=0)throw Error("入库数量必须大于零");const p=i.slots.find(J=>J.occupied&&J.boxCode===s.trim());if(p)throw Error(`料框 ${s.trim()} 已在库位 ${p.location}，不能重复入库`);if(i.tasks.find(J=>{var le;return!J.collected&&((le=J.cargo)==null?void 0:le.boxCode)===s.trim()&&!(o&&J.type==="outbound"&&J.status==="completed"&&J.destinationPort===o)}))throw Error("该料框仍有未完成任务或所在工位不一致");if(i.tasks.some(J=>J.type==="inbound"&&J.target===n&&J.status!=="completed"))throw Error("该库位已被入库任务预留");if(i.tasks.some(J=>J.type==="inbound"&&J.dockId===t&&J.cargoState==="conveyor"))throw Error("入库工位已有料框，请等待堆垛机取走");const M=e.find(J=>J.type==="stacker"&&J.aisle===u.aisle),S=i.devices[M==null?void 0:M.id];if(!S||["fault","maintenance"].includes(S.status))throw Error("对应巷道堆垛机不可用");if([u,M,l.link].some(J=>J.rotation.some(le=>Math.abs(le)>.001)||J.scale.some(le=>Math.abs(le-1)>.001)))throw Error("入库演示需要设备保持原始朝向和比例");const f=i.source==="SQL"?(he=i.allBoxes)==null?void 0:he.find(J=>J.code===s.trim()):null;if(i.source==="SQL"&&!f)throw Error("真实入库需使用已有料框编号，请选择库外料框");const d=c.index<u.params.smallBays*u.params.smallLevels,E=(f==null?void 0:f.size)??(d?1:2);if(![1,2].includes(E))throw Error("料框规格未定义，禁止入库");if(E===1&&!d)throw Error("小料框只能存入小仓位");if(E===2&&(u.aisle!==2||d))throw Error("大料筐只能存入二号巷道的大筐库位");const w=Pc(u,{...c,size:E}),b={x:l.link.position[0]+l.link.params.length/2-.45,z:l.link.position[2],height:Dc(l.link)-.185},C=b.x-M.position[0],y=b.height+.185-M.position[1]-.1775,x=b.z-M.position[2],[A,_,g]=w.position,T=A-M.position[0],L=_-M.position[1]-.1775,P=g-M.position[2];if(Math.max(Math.abs(T),Math.abs(C))+1.33>M.params.railLength/2)throw Error("堆垛机轨道不足，无法到达工位或目标库位");const I={travel:h.travel,lift:h.lift,extension:0},z={travel:C,lift:y,extension:0},B={travel:T,lift:L+.04,extension:0},X=[{...z,lift:Math.min(I.lift,y)},z,{...z,extension:x},{...z,lift:y+.04,extension:x},{...z,lift:y+.04},B,{...B,extension:P},{...B,lift:L,extension:P},{...B,lift:L}],k=X.map((J,le)=>{const Ne=le?X[le-1]:I;return Math.max(1.1,Math.abs(J.travel-Ne.travel)/2,Math.abs(J.lift-Ne.lift),Math.abs(J.extension-Ne.extension)/.5)}),W=i.tasks.some(J=>J.deviceId===M.id&&za(J)),ee=`IN-${String((i.inboundSequence||0)+1).padStart(4,"0")}`,oe=f?(i.inventory||[]).filter(J=>J.boxId===f.id):[],pe=f?{boxId:f.id,boxCode:f.code,size:E,product:oe.map(J=>J.product).join("、"),sku:oe.map(J=>J.sku).join(", "),quantity:null,batch:"",items:oe}:{boxId:ee,boxCode:s.trim(),size:E,product:r.trim(),sku:"",quantity:a,batch:"",items:[]},we=o?ho(e).find(J=>J.code===o):null;if(o&&!we)throw Error("请选择101～104入库工位");const Re=we==null?void 0:we.assembly,De=Re?Re.position[1]+Re.params.height:0,Z=we?[[we.x,De,we.z],[Re.position[0]-.43,De,we.z],[Re.position[0]-.43,De,b.z],[Re.position[0]+.43,De,b.z],[b.x,b.height+.185,b.z]]:null;Z&&(X.unshift({...I}),k.unshift(Math.max(2,Z.slice(1).reduce((J,le,Ne)=>J+Math.hypot(...le.map((at,U)=>at-Z[Ne][U])),0)/.45)));const K={type:"inbound",code:ee,target:c.id,dockId:t,deviceId:M.id,from:l.name,to:c.location,status:W?"queued":"running",stage:W?"等待堆垛机":js[0],progress:0,phase:0,phaseElapsed:0,start:I,targets:X,durations:k,station:b,geometry:w,stackerPosition:[...M.position],cargo:pe,cargoState:"conveyor",pose:{...I},collected:!1};return Z&&(K.returnRoute=Z,K.entryPort=o,K.from=o+" 工位",K.stage=W?"等待堆垛机":"工位料框回流至入库接驳"),i.inboundSequence=(i.inboundSequence||0)+1,i.manualOutbound=!0,i.tasks.unshift(K),i.events.unshift({time:i.elapsed,message:`${ee}：${K.from} → ${K.to}，入库指令已下达`}),K}function E0(i){const e=i.stackerPosition,t=i.pose;return i.cargoState==="fork"?[e[0]+t.travel,e[1]+t.lift+.1775,e[2]+t.extension]:i.returnRoute&&!i.returnRouteDone?fo(i.returnRoute,i.phase===0?i.phaseElapsed/i.durations[0]:0):[i.station.x,i.station.height+.185,i.station.z]}function b0(i,e,t){let n=!1;for(const s of[...i.tasks].reverse().filter(r=>r.type==="inbound")){const r=i.devices[s.deviceId];if(!r||["fault","maintenance"].includes(r.status))continue;if(s.status==="queued"){if(!s.returnRoute&&i.tasks.some(u=>u!==s&&u.deviceId===s.deviceId&&Un(u)))continue;const l=i.tasks.find(u=>u.deviceId===s.deviceId&&u.status==="completed"&&u.pose),c=t==null?void 0:t(s.deviceId);if(s.phase===0){c?s.start={...c,extension:c.extension??0}:l&&(s.start={...l.pose,extension:0});const u=s.returnRoute?1:0;s.targets[u].lift=Math.min(s.start.lift,s.targets[u+1].lift),s.returnRoute&&(s.targets[0]={...s.start});for(let p=s.returnRoute?1:0;p<s.targets.length;p++){const m=p?s.targets[p-1]:s.start,M=s.targets[p];s.durations[p]=Math.max(1.1,Math.abs(M.travel-m.travel)/2,Math.abs(M.lift-m.lift),Math.abs(M.extension-m.extension)/.5)}s.pose={...s.start}}s.status="running",s.stage=s.returnRoute&&s.phase===0?"工位料框回流至入库接驳":js[s.phase-(s.returnRoute?1:0)]}if(s.status!=="running")continue;let a=e;const o=s.returnRoute?1:0,h=o?["工位料框回流至入库接驳",...js]:js;for(;a>0&&s.status==="running";){if(o&&s.phase===1){if(i.tasks.some(S=>S!==s&&S.deviceId===s.deviceId&&Un(S))){s.waitingForStacker=!0,s.stage="等待堆垛机接框";break}if(s.waitingForStacker=!1,!s.approachRebased){const S=t==null?void 0:t(s.deviceId);if(S){s.targets[0]={...S,extension:S.extension??0};const f=s.targets[1],d=s.targets[0];s.durations[1]=Math.max(1.1,Math.abs(f.travel-d.travel)/2,Math.abs(f.lift-d.lift),Math.abs(f.extension-d.extension)/.5)}s.approachRebased=!0}}s.stage=h[s.phase];const l=s.phase,c=s.durations[l],u=Math.min(a,c-s.phaseElapsed,o&&s.phase===0?.1:1/0);if(o&&s.phase===0&&!Gl(s,i,s.phaseElapsed+u)){s.stage="等待交汇输送段";break}s.phaseElapsed+=u,a-=u;const p=l?s.targets[l-1]:s.start,m=s.targets[l],M=S0(Math.min(1,s.phaseElapsed/c));if(s.pose={travel:kr(p.travel,m.travel,M),lift:kr(p.lift,m.lift,M),extension:kr(p.extension,m.extension,M)},s.progress=Math.round((s.durations.slice(0,l).reduce((S,f)=>S+f,0)+s.phaseElapsed)/s.durations.reduce((S,f)=>S+f,0)*100),Un(s)&&(r.status="running",r.travel=s.pose.travel,r.lift=s.pose.lift),s.phaseElapsed<c-1e-8){if(a>0)continue;break}if(Yl(s,l,3+o,7+o))break;if(o&&l===0&&(s.returnRouteDone=!0,Wl(s)),l===3+o&&(s.cargoState="fork"),l===7+o){const S=i.slots.find(f=>f.id===s.target);Object.assign(S,s.cargo,{occupied:!0}),s.cargoState="rack",n=!0,i.inventory&&!s.serverTaskId&&i.inventory.push({id:s.code,boxId:s.cargo.boxId,boxCode:s.cargo.boxCode,locationId:S.locationId,location:S.location,sku:s.cargo.sku,product:s.cargo.product,quantity:s.cargo.quantity,unit:"件",batch:""})}s.phase++,s.phaseElapsed=0,s.phase===h.length?(s.status="completed",s.stage="入库完成",s.progress=100,s.collected=!0,i.completed++,r.completed++,r.status="idle",i.events.unshift({time:i.elapsed,message:`${s.code}：${s.cargo.boxCode} 已存入 ${s.to}`})):s.stage=h[s.phase]}}return n}function Dl(i,{pose:e=()=>({travel:0,lift:1.2,extension:0}),notify:t=()=>{}}={}){const n=Wr(i,2026),s=new Map(i.map(l=>[l.id,l]));let r=!1;n.manualOutbound=!0;for(const[l,c]of n.slots.entries()){const u=s.get(c.deviceId),p=c.index<u.params.smallBays*u.params.smallLevels;c.occupied=c.index%100!==0,c.size=p?1:2,c.boxCode=c.occupied?"DEMO-"+String(l+1).padStart(5,"0"):"",c.boxId=c.occupied?c.id:null,c.occupied&&(c.quantity=1+l%24,c.sku="DEMO-SKU-"+(1+l%5),c.product="演示物料",c.batch="DEMO-BATCH"),c.occupied||(c.quantity=0,c.sku="",c.product="",c.batch="")}const a={started:!1,enabled:!1,cycles:0,message:"准备就绪",error:""};async function o(l){let c;if(l.type==="outbound"){const u=n.slots.find(M=>M.id===l.slotId),p=s.get(u==null?void 0:u.deviceId),m=i.find(M=>M.type==="stacker"&&M.aisle===(p==null?void 0:p.aisle));c=_0(n,i,u.id,g0(i,p,m,l.port),e(m.id))}else{const u=n.tasks.find(d=>d.type==="outbound"&&d.cargo.boxCode===l.boxCode&&d.status==="completed"&&!d.collected);if(!u)throw Error("没有等待回库的模拟料框");const m=n.slots.filter(d=>!d.occupied&&!n.tasks.some(E=>E.type==="inbound"&&E.target===d.id&&E.status!=="completed")).filter(d=>{const E=s.get(d.deviceId),w=d.index<E.params.smallBays*E.params.smallLevels;return u.cargo.size===2?!w&&E.aisle===2:w}).sort((d,E)=>+(s.get(E.deviceId).aisle===l.preferredAisle)-+(s.get(d.deviceId).aisle===l.preferredAisle)).find(d=>Ba(i).some(E=>E.aisle===s.get(d.deviceId).aisle&&!n.tasks.some(w=>w.type==="inbound"&&w.dockId===E.id&&w.cargoState==="conveyor")));if(!m)throw Error("没有可用的回库位置");const M=s.get(m.deviceId),S=Ba(i).find(d=>d.aisle===M.aisle),f=i.find(d=>d.type==="stacker"&&d.aisle===M.aisle);c=y0(n,i,{dockId:S.id,targetId:m.id,boxCode:l.boxCode,entryPort:l.port},e(f.id)),c.cargo={...u.cargo},u.collected=!0}return c.autoDemo=!0,c}const h=M0({state:()=>n,objects:()=>i,ports:()=>ho(i).filter(l=>!n.tasks.some(c=>c.type==="outbound"&&c.destinationPort===l.code&&!c.collected||c.type==="inbound"&&c.entryPort===l.code&&c.status!=="completed")),pose:e,running:()=>r,dbBusy:()=>!1,setRunning:l=>r=l,dispatch:o,notify:t},a);return{state:n,status:a,dispatch:o,start:()=>h.start(),pause:()=>h.pause(),dispose:()=>{h.pause(),h.reset()},get playing(){return r},async advance(l){if(!r)return!1;n.elapsed+=l;const c=b0(n,l,e),u=v0(n,l,e);return await h.advance(l),c||u}}}function T0(i,e="A",t=10){const n=new kt;for(const h of i){const l=h.params,c=l.smallBays*l.smallPitch+l.largeBays*l.largePitch,u=Math.max(l.smallBays?l.smallLevels*l.smallStep:0,l.largeBays?l.largeLevels*l.largeStep:0)+.2,p=new Xe().compose(new N(...h.position),new un().setFromEuler(new It(...h.rotation.map(tn.degToRad))),new N(...h.scale));n.union(new kt(new N(-c/2,0,-l.depth/2),new N(c/2,u,l.depth/2)).applyMatrix4(p))}if(n.isEmpty())return null;const s=t,r=n.max.z-n.min.z+4,a=e==="A"?n.min.x-1-s/2:n.max.x+1+s/2,o=(n.min.z+n.max.z)/2;return{bounds:n,side:e,x:a,z:o,width:r,depth:s}}function w0(i,e,t,n,s,r,a="#d5b76c"){const o=document.createElement("canvas");o.width=1024,o.height=512;const h=o.getContext("2d");h.strokeStyle=a,h.lineWidth=5,h.strokeRect(12,12,1e3,488);for(const u of[12,1012])for(const p of[12,500])h.fillStyle=a,h.fillRect(u===12?12:942,p===12?12:486,70,14);h.fillStyle=a,h.textAlign="left",h.font='600 28px "Segoe UI",sans-serif',h.fillText("DISPATCH / A",34,54),h.font="18px Microsoft YaHei",h.fillText(e,34,84);for(const u of[260,512,764])h.beginPath(),h.moveTo(u-24,470),h.lineTo(u+24,470),h.lineTo(u+24,452),h.lineTo(u+48,480),h.lineTo(u+24,508),h.lineTo(u+24,490),h.lineTo(u-24,490),h.closePath(),h.fill();const l=new En(o);l.colorSpace=Mt,l.anisotropy=4;const c=new $e(new zn(t,n),new xt({map:l,transparent:!0,roughness:.82,metalness:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}));return c.rotation.x=-Math.PI/2,c.position.set(s,.014,r),c.receiveShadow=!0,c}function A0(i){const e=new St;e.userData.annotation=!0;const{x:t,z:n,width:s,depth:r}=i;return e.add(w0("A 端出口","输送线作业区 / 深 "+r+" m",r,s,t,n)),e}const R0=["#68d4c0","#70b9f2","#eebd69","#c39bea"];function C0(i,e){var m;const t=i.params,n=t.smallBays*t.smallPitch+t.largeBays*t.largePitch,s=Math.max(t.smallBays?t.smallLevels*t.smallStep:0,t.largeBays?t.largeLevels*t.largeStep:0)+.2,r=new St,a=R0[e%4],o=((m=i.name.match(/第\s*(\d+)\s*[列排]/))==null?void 0:m[1])||String(e+1),h=document.createElement("canvas");h.width=256,h.height=160;const l=h.getContext("2d");l.fillStyle="#102335",l.fillRect(0,0,256,160),l.strokeStyle=a,l.lineWidth=8,l.strokeRect(4,4,248,152),l.font="bold 70px Microsoft YaHei, sans-serif",l.textAlign="center",l.fillStyle="#edf6ff",l.fillText(o+" 列",128,91),l.font="27px Microsoft YaHei, sans-serif",l.fillStyle=a,l.fillText(i.aisle?"巷道 "+i.aisle:"料框库",128,133);const c=new En(h);c.colorSpace=Mt;const u=new Ua(new er({map:c,depthTest:!0,depthWrite:!1}));u.position.set(-n/2-.2,1.4,0),u.scale.set(.96,.6,1),r.add(u);const p=new $e(new Ht(.06,Math.min(s,1.8),.08),new to({color:a}));return p.position.set(-n/2-.05,Math.min(s,1.8)/2,t.depth/2+.05),r.add(p),r.userData.annotation=!0,r.traverse(M=>{M.userData.id=i.id}),r}function P0(i,e){const t=i.bounds.clone();for(const o of e.filter(h=>h.type==="stacker"||h.type==="conveyor")){const h=o.params,l=o.type==="stacker"?h.railLength/2:h.length/2,c=o.type==="stacker"?.7:h.width/2+.4,u=new Xe().compose(new N(...o.position),new un().setFromEuler(new It(...o.rotation.map(tn.degToRad))),new N(...o.scale));t.union(new kt(new N(-l,0,-c),new N(l,1,c)).applyMatrix4(u))}const n=Math.min(i.x-i.depth/2,t.min.x)-1,s=t.max.x+1,r=Math.min(i.z-i.width/2,t.min.z)-.5,a=Math.max(i.z+i.width/2,t.max.z)+.5;return{width:Math.ceil(s-n),depth:Math.max(10,Math.ceil(a-r)),centerX:(n+s)/2,centerZ:(r+a)/2}}function Ll(i,e=1.5){const t=i.bounds.getSize(new N),n=i.bounds.getCenter(new N),s=Math.max(21,(t.z+4)/(2*Math.tan(tn.degToRad(21))*e)*1.2);return{target:new N(i.bounds.min.x+1,t.y*.29,n.z),position:new N(i.bounds.min.x-s,t.y*.94+1,n.z+t.z*.92)}}function Il(i,e=1.5){const t=i.bounds.clone(),n=t.getCenter(new N),s=new N(-1.8,1.4,1.1).normalize(),r=new Xe().lookAt(s,new N,new N(0,1,0)),a=new N().setFromMatrixColumn(r,0),o=new N().setFromMatrixColumn(r,1),h=Math.tan(tn.degToRad(21));let l=0;t.min.x-=10,t.getCenter(n);for(const c of[t.min.x,t.max.x])for(const u of[t.min.y,t.max.y])for(const p of[t.min.z,t.max.z]){const m=new N(c,u,p).sub(n);l=Math.max(l,m.dot(s)+Math.max(Math.abs(m.dot(o))/h,Math.abs(m.dot(a))/(h*Math.max(e,.2))))}return{target:n,position:n.clone().addScaledVector(s,Math.max(20,l*1.12))}}const Ul=new WeakMap;function Nl(i){const e=i.userData.carriage||i;let t=Ul.get(e);if(!t){e.updateWorldMatrix(!0,!0);const s=e.matrixWorld.clone().invert();t=new kt,e.traverse(r=>{let a=r;for(;a;){if(a.userData.annotation)return;a=a.parent}if(!r.geometry)return;let o;r.isInstancedMesh?(r.computeBoundingBox(),o=r.boundingBox):(r.geometry.boundingBox||r.geometry.computeBoundingBox(),o=r.geometry.boundingBox),o&&!o.isEmpty()&&t.union(o.clone().applyMatrix4(s.clone().multiply(r.matrixWorld)))}),Ul.set(e,t)}e.updateWorldMatrix(!0,!1);const n=t.clone().applyMatrix4(e.matrixWorld);return{center:n.getCenter(new N),size:n.getSize(new N)}}function D0(i,e,t,n){const s=t.clone().sub(e.target).multiplyScalar(1-Math.exp(-12*n));i.position.add(s),e.target.add(s)}const Zs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ni{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const L0=new lo(-1,1,1,-1,0,1);class I0 extends sn{constructor(){super(),this.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new jt([0,2,0,0,2,0],2))}}const U0=new I0;class po{constructor(e){this._mesh=new $e(U0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,L0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class N0 extends Ni{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof bt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ln.clone(e.uniforms),this.material=new bt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new po(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Fl extends Ni{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class F0 extends Ni{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class O0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Ee);this._width=n.width,this._height=n.height,t=new nn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:yn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new N0(Zs),this.copyPass.material.blending=vt,this.clock=new Cu}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Fl!==void 0&&(a instanceof Fl?n=!0:a instanceof F0&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class B0 extends Ni{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ze}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const Ns={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ee},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Xe},cameraProjectionMatrixInverse:{value:new Xe},cameraWorldMatrix:{value:new Xe},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new N(-1,-1,-1)},sceneBoxMax:{value:new N(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Fs={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Hr={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function z0(i=5){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=k0(e),n=t.length,s=new Uint8Array(n*4);for(let a=0;a<n;++a){const o=t[a],h=2*Math.PI*o/n,l=new N(Math.cos(h),Math.sin(h),0).normalize();s[a*4]=(l.x*.5+.5)*255,s[a*4+1]=(l.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}const r=new io(s,e,e);return r.wrapS=On,r.wrapT=On,r.needsUpdate=!0,r}function k0(i){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=e*e,n=Array(t).fill(0);let s=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(s===-1&&r===e?(r=e-2,s=0):(r===e&&(r=0),s<0&&(s=e-1)),n[s*e+r]!==0){r-=2,s++;continue}else n[s*e+r]=a++;r++,s--}return n}const Os={defines:{SAMPLES:16,SAMPLE_VECTORS:Uc(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ee},cameraProjectionMatrixInverse:{value:new Xe},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Uc(i,e,t){const n=H0(i,e,t);let s="vec3[SAMPLES](";for(let r=0;r<i;r++){const a=n[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<i-1?",":")"}`}return s}function H0(i,e,t){const n=[];for(let s=0;s<i;s++){const r=2*Math.PI*e*s/i,a=Math.pow(s/(i-1),t);n.push(new N(Math.cos(r),Math.sin(r),a))}return n}class V0{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,s,r;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,h=Math.floor(e+o),l=Math.floor(t+o),c=(3-Math.sqrt(3))/6,u=(h+l)*c,p=h-u,m=l-u,M=e-p,S=t-m;let f,d;M>S?(f=1,d=0):(f=0,d=1);const E=M-f+c,w=S-d+c,b=M-1+2*c,C=S-1+2*c,y=h&255,x=l&255,A=this.perm[y+this.perm[x]]%12,_=this.perm[y+f+this.perm[x+d]]%12,g=this.perm[y+1+this.perm[x+1]]%12;let T=.5-M*M-S*S;T<0?n=0:(T*=T,n=T*T*this._dot(this.grad3[A],M,S));let L=.5-E*E-w*w;L<0?s=0:(L*=L,s=L*L*this._dot(this.grad3[_],E,w));let P=.5-b*b-C*C;return P<0?r=0:(P*=P,r=P*P*this._dot(this.grad3[g],b,C)),70*(n+s+r)}noise3d(e,t,n){let s,r,a,o;const l=(e+t+n)*.3333333333333333,c=Math.floor(e+l),u=Math.floor(t+l),p=Math.floor(n+l),m=1/6,M=(c+u+p)*m,S=c-M,f=u-M,d=p-M,E=e-S,w=t-f,b=n-d;let C,y,x,A,_,g;E>=w?w>=b?(C=1,y=0,x=0,A=1,_=1,g=0):E>=b?(C=1,y=0,x=0,A=1,_=0,g=1):(C=0,y=0,x=1,A=1,_=0,g=1):w<b?(C=0,y=0,x=1,A=0,_=1,g=1):E<b?(C=0,y=1,x=0,A=0,_=1,g=1):(C=0,y=1,x=0,A=1,_=1,g=0);const T=E-C+m,L=w-y+m,P=b-x+m,I=E-A+2*m,z=w-_+2*m,B=b-g+2*m,X=E-1+3*m,k=w-1+3*m,W=b-1+3*m,ee=c&255,oe=u&255,pe=p&255,we=this.perm[ee+this.perm[oe+this.perm[pe]]]%12,Re=this.perm[ee+C+this.perm[oe+y+this.perm[pe+x]]]%12,De=this.perm[ee+A+this.perm[oe+_+this.perm[pe+g]]]%12,Z=this.perm[ee+1+this.perm[oe+1+this.perm[pe+1]]]%12;let K=.6-E*E-w*w-b*b;K<0?s=0:(K*=K,s=K*K*this._dot3(this.grad3[we],E,w,b));let he=.6-T*T-L*L-P*P;he<0?r=0:(he*=he,r=he*he*this._dot3(this.grad3[Re],T,L,P));let J=.6-I*I-z*z-B*B;J<0?a=0:(J*=J,a=J*J*this._dot3(this.grad3[De],I,z,B));let le=.6-X*X-k*k-W*W;return le<0?o=0:(le*=le,o=le*le*this._dot3(this.grad3[Z],X,k,W)),32*(s+r+a+o)}noise4d(e,t,n,s){const r=this.grad4,a=this.simplex,o=this.perm,h=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let c,u,p,m,M;const S=(e+t+n+s)*h,f=Math.floor(e+S),d=Math.floor(t+S),E=Math.floor(n+S),w=Math.floor(s+S),b=(f+d+E+w)*l,C=f-b,y=d-b,x=E-b,A=w-b,_=e-C,g=t-y,T=n-x,L=s-A,P=_>g?32:0,I=_>T?16:0,z=g>T?8:0,B=_>L?4:0,X=g>L?2:0,k=T>L?1:0,W=P+I+z+B+X+k,ee=a[W][0]>=3?1:0,oe=a[W][1]>=3?1:0,pe=a[W][2]>=3?1:0,we=a[W][3]>=3?1:0,Re=a[W][0]>=2?1:0,De=a[W][1]>=2?1:0,Z=a[W][2]>=2?1:0,K=a[W][3]>=2?1:0,he=a[W][0]>=1?1:0,J=a[W][1]>=1?1:0,le=a[W][2]>=1?1:0,Ne=a[W][3]>=1?1:0,at=_-ee+l,U=g-oe+l,je=T-pe+l,Ie=L-we+l,Ae=_-Re+2*l,me=g-De+2*l,Ye=T-Z+2*l,ge=L-K+2*l,Fe=_-he+3*l,ot=g-J+3*l,et=T-le+3*l,D=L-Ne+3*l,v=_-1+4*l,F=g-1+4*l,V=T-1+4*l,$=L-1+4*l,Y=f&255,_e=d&255,re=E&255,xe=w&255,be=o[Y+o[_e+o[re+o[xe]]]]%32,ie=o[Y+ee+o[_e+oe+o[re+pe+o[xe+we]]]]%32,de=o[Y+Re+o[_e+De+o[re+Z+o[xe+K]]]]%32,Le=o[Y+he+o[_e+J+o[re+le+o[xe+Ne]]]]%32,Te=o[Y+1+o[_e+1+o[re+1+o[xe+1]]]]%32;let ce=.6-_*_-g*g-T*T-L*L;ce<0?c=0:(ce*=ce,c=ce*ce*this._dot4(r[be],_,g,T,L));let Oe=.6-at*at-U*U-je*je-Ie*Ie;Oe<0?u=0:(Oe*=Oe,u=Oe*Oe*this._dot4(r[ie],at,U,je,Ie));let O=.6-Ae*Ae-me*me-Ye*Ye-ge*ge;O<0?p=0:(O*=O,p=O*O*this._dot4(r[de],Ae,me,Ye,ge));let te=.6-Fe*Fe-ot*ot-et*et-D*D;te<0?m=0:(te*=te,m=te*te*this._dot4(r[Le],Fe,ot,et,D));let ae=.6-v*v-F*F-V*V-$*$;return ae<0?M=0:(ae*=ae,M=ae*ae*this._dot4(r[Te],v,F,V,$)),27*(c+u+p+m+M)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}_dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}}class an extends Ni{constructor(e,t,n=512,s=512,r,a,o){super(),this.width=n,this.height=s,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=z0(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new nn(this.width,this.height,{type:yn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new bt({defines:Object.assign({},Ns.defines),uniforms:Ln.clone(Ns.uniforms),vertexShader:Ns.vertexShader,fragmentShader:Ns.fragmentShader,blending:vt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Mu,this.normalMaterial.blending=vt,this.pdMaterial=new bt({defines:Object.assign({},Os.defines),uniforms:Ln.clone(Os.uniforms),vertexShader:Os.vertexShader,fragmentShader:Os.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new bt({defines:Object.assign({},Fs.defines),uniforms:Ln.clone(Fs.uniforms),vertexShader:Fs.vertexShader,fragmentShader:Fs.fragmentShader,blending:vt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new bt({uniforms:Ln.clone(Zs.uniforms),vertexShader:Zs.vertexShader,fragmentShader:Zs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:jr,blendDst:Zi,blendEquation:Jt,blendSrcAlpha:qr,blendDstAlpha:Zi,blendEquationAlpha:Jt}),this.blendMaterial=new bt({uniforms:Ln.clone(Hr.uniforms),vertexShader:Hr.vertexShader,fragmentShader:Hr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Zl,blendSrc:jr,blendDst:Zi,blendEquation:Jt,blendSrcAlpha:qr,blendDstAlpha:Zi,blendEquationAlpha:Jt}),this._fsQuad=new po(null),this._originalClearColor=new ze,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new ro,this.depthTexture.format=Pi,this.depthTexture.type=Ci,this.normalRenderTarget=new nn(this.width,this.height,{minFilter:Pt,magFilter:Pt,type:yn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Uc(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case an.OUTPUT.Off:break;case an.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case an.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case an.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case an.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case an.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case an.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=vt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new V0,n=e*e*4,s=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const h=a,l=o;s[(a*e+o)*4]=(t.noise(h,l)*.5+.5)*255,s[(a*e+o)*4+1]=(t.noise(h+e,l)*.5+.5)*255,s[(a*e+o)*4+2]=(t.noise(h,l+e)*.5+.5)*255,s[(a*e+o)*4+3]=(t.noise(h+e,l+e)*.5+.5)*255}const r=new io(s,e,e,qt,en);return r.wrapS=On,r.wrapT=On,r.needsUpdate=!0,r}}an.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Bs={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class G0 extends Ni{constructor(){super(),this.uniforms=Ln.clone(Bs.uniforms),this.material=new xu({name:Bs.name,uniforms:this.uniforms,vertexShader:Bs.vertexShader,fragmentShader:Bs.fragmentShader}),this._fsQuad=new po(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===Je&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$l?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Kl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Jl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ga?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ec?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===tc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ql&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}function W0(i=()=>document.hidden){let e=!0;return{request(){e=!0},render(t,n=!1){if(i()||!e&&!n)return!1;e=!1;try{t()}catch(s){throw e=!0,s}return!0}}}const Ol={rendering:{maxPixelRatio:2,maxRenderPixels:5e6}};function X0(i,e,t){const n=Math.max(1,t||1),s=Math.max(1,Math.sqrt(Ol.rendering.maxRenderPixels/Math.max(1,i*e)));return Math.min(n,Ol.rendering.maxPixelRatio,s)}function Y0(i,e,t){const n=i.getSize(new Ee),s=new nn(n.x,n.y,{type:yn,samples:Math.min(4,i.capabilities.maxSamples)}),r=new O0(i,s);let a=i.getPixelRatio();r.setPixelRatio(a);const o=new B0(e,t),h=new an(e,t,512,512);h.updateGtaoMaterial({radius:.38,thickness:.7,distanceFallOff:1,samples:8,distanceExponent:2}),h.blendIntensity=.35;const l=new G0,c=[o,h,l];c.forEach(m=>r.addPass(m));const u=W0();function p(m,M){const S=X0(m,M,globalThis.devicePixelRatio);i.getPixelRatio()!==S&&i.setPixelRatio(S),a!==S&&(r.setPixelRatio(S),a=S),r.setSize(m,M),u.request()}return{invalidate:()=>u.request(),render:(m=!1)=>u.render(()=>r.render(),m),resize:p,dispose(){c.forEach(m=>m.dispose()),r.dispose()}}}class q0 extends xc{constructor(){super();const e=new Ht;e.deleteAttribute("uv");const t=new xt({side:Ct}),n=new xt,s=new wu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new $e(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Sc(e,n,6),o=new pt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const h=new $e(e,Mi(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const l=new $e(e,Mi(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const c=new $e(e,Mi(17));c.position.set(14.904,12.198,-1.832),c.scale.set(.15,4.265,6.331),this.add(c);const u=new $e(e,Mi(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const p=new $e(e,Mi(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const m=new $e(e,Mi(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Mi(i){return new Su({color:0,emissive:16777215,emissiveIntensity:i})}function j0(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=2048;const s=n.getContext("2d");s.fillStyle="#9da6a3",s.fillRect(0,0,2048,2048);let r=43;for(let l=0;l<8e4;l++){r=Math.imul(r,1664525)+1013904223>>>0;const c=r%2048;r=Math.imul(r,1664525)+1013904223>>>0,s.fillStyle=l%2?"#ffffff0a":"#2435380a",s.fillRect(c,r%2048,2,2)}const a=2048/i,o=2048/e;for(let l=0;l<70;l++){r=Math.imul(r,1664525)+1013904223>>>0;const c=r%2048;r=Math.imul(r,1664525)+1013904223>>>0;const u=r%2048,p=80+r%160,m=s.createRadialGradient(c,u,0,c,u,p);m.addColorStop(0,l%2?"#eff2e91a":"#3c494518"),m.addColorStop(1,"#66716d00"),s.fillStyle=m,s.fillRect(c-p,u-p,p*2,p*2)}for(const l of[.12,.88])for(const c of[-.28,.28])s.strokeStyle="#45504c0e",s.lineWidth=Math.max(2,o*.1),s.beginPath(),s.moveTo(a,2048*l+o*c),s.lineTo(2048-a,2048*l+o*c),s.stroke();s.strokeStyle="#66767938",s.lineWidth=1.4;for(let l=4;l<i;l+=4)s.beginPath(),s.moveTo(l*a,0),s.lineTo(l*a,2048),s.stroke();for(let l=4;l<e;l+=4)s.beginPath(),s.moveTo(0,l*o),s.lineTo(2048,l*o),s.stroke();s.strokeStyle="#f1c65d",s.lineWidth=Math.max(2,Math.min(a,o)*.09),s.strokeRect(a*.4,o*.4,2048-a*.8,2048-o*.8);const h=new En(n);return h.colorSpace=Mt,h.anisotropy=Math.min(8,t),h}function Z0(i,e,t=12){const n=i.getObjectByName("studio-sun");if(!n)return;const s=e.centerX||0,r=e.centerZ||0,a=Math.max(e.width,e.depth,20);n.position.set(s-a*.45,a*.85,r+a*.2),n.target.position.set(s,t*.2,r),n.updateWorldMatrix(!0,!1),n.target.updateWorldMatrix(!0,!1),n.shadow.updateMatrices(n);const o=n.shadow.camera,h=new kt;for(const l of[s-e.width/2-3,s+e.width/2+3])for(const c of[-.5,t])for(const u of[r-e.depth/2-3,r+e.depth/2+3])h.expandByPoint(new N(l,c,u).applyMatrix4(o.matrixWorldInverse));o.left=h.min.x-.5,o.right=h.max.x+.5,o.bottom=h.min.y-.5,o.top=h.max.y+.5,o.near=Math.max(.1,-h.max.z-2),o.far=-h.min.z+2,o.updateProjectionMatrix(),n.shadow.normalBias=.012,n.shadow.bias=-15e-5}function $0(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=512;const s=n.getContext("2d");s.fillStyle="#b8b8b8",s.fillRect(0,0,512,512);let r=237;for(let o=0;o<90;o++){r=Math.imul(r,1664525)+1013904223>>>0;const h=r%512;r=Math.imul(r,1664525)+1013904223>>>0;const l=r%512,c=15+r%85,u=s.createRadialGradient(h,l,0,h,l,c);u.addColorStop(0,o%2?"#eeeeee50":"#70707040"),u.addColorStop(1,"#b8b8b800"),s.fillStyle=u,s.fillRect(h-c,l-c,c*2,c*2)}s.strokeStyle="#e0e0e0",s.lineWidth=1;for(let o=4;o<i;o+=4)s.beginPath(),s.moveTo(o/i*512,0),s.lineTo(o/i*512,512),s.stroke();for(let o=4;o<e;o+=4)s.beginPath(),s.moveTo(0,o/e*512),s.lineTo(512,o/e*512),s.stroke();const a=new En(n);return a.anisotropy=Math.min(8,t),a}function K0(i,e=12,{wallsVisible:t=!0}={}){const n=new St;n.name="factory-architecture";const s=new St;s.name="factory-walls",s.visible=t,n.add(s);let r=n;const a=i.width+5,o=i.depth+6,h=i.centerX||0,l=i.centerZ||0,c={concrete:new xt({color:"#8e9491",roughness:.86}),wall:new xt({color:"#b5bbb5",roughness:.87}),steel:new xt({color:"#555f60",metalness:.65,roughness:.38}),dark:new xt({color:"#293336",metalness:.45,roughness:.5}),paint:new xt({color:"#d1a449",metalness:.12,roughness:.55}),glass:new ao({color:"#aec7ca",emissive:"#90acb2",emissiveIntensity:.13,metalness:.1,roughness:.24,clearcoat:.65}),lamp:new xt({color:"#fff5da",emissive:"#fff0cf",emissiveIntensity:2.5,roughness:.4})},u=(d,E,w,b,C,y,x)=>{const A=new $e(new Ht(b,C,y),c[x]);return A.position.set(h+d,E,l+w),A.receiveShadow=!0,A.castShadow=x!=="lamp",r.add(A),A},p=(d,E,w,b,C,y,x=0)=>{if(typeof document>"u")return;const A=document.createElement("canvas");A.width=768,A.height=256;const _=A.getContext("2d");_.fillStyle="#27383b",_.fillRect(0,0,768,256),_.fillStyle="#c7a65f",_.fillRect(0,0,12,256),_.fillStyle="#edf1e9",_.font='600 104px "Segoe UI",sans-serif',_.fillText(d,40,128),_.fillStyle="#a8bbb9",_.font='28px "Segoe UI",sans-serif',_.fillText(E,44,195);const g=new En(A);g.colorSpace=Mt,g.anisotropy=4;const T=new $e(new zn(y,y/3),new xt({map:g,roughness:.8}));T.position.set(h+w,b,l+C),T.rotation.y=x,r.add(T)};u(0,-.22,0,a,.4,o,"concrete"),r=s,u(0,e/2,-o/2,a,e,.18,"wall"),u(a/2,e/2,0,.18,e,o,"wall"),u(0,.55,-o/2+.11,a,1.1,.07,"dark"),u(a/2-.11,.55,0,.07,1.1,o,"dark");const m=Math.min(4.5,o*.5);u(a/2-.12,2.2,0,.08,4.4,m,"dark"),u(a/2-.18,2.18,0,.08,4.2,m-.22,"steel");for(let d=.25;d<4.3;d+=.22)u(a/2-.23,d,0,.025,.025,m-.3,"dark");for(const d of[-1,1])u(a/2-.25,1,d*(m/2+.16),.18,2,.15,"paint");p("WAREHOUSE A","AUTOMATED STORAGE / DISPATCH",a/2-.24,6.2,0,Math.min(o*.75,8),-Math.PI/2);const M=Math.max(2,Math.ceil(a/7.5)),S=a/M;for(let d=0;d<=M;d++){r=s;const E=-a/2+d*S;if(u(E,e/2,-o/2+.24,.22,e,.32,"steel"),u(E,.6,-o/2+.44,.3,1.2,.12,"paint"),d<M){const w=E+S/2;d%2===0&&p("A / "+String(d+1).padStart(2,"0"),"STORAGE ZONE",w,2.5,-o/2+.2,1.5),u(w,e*.73,-o/2+.12,S-.6,e*.22,.06,"glass");for(let b=0;b<=4;b++)u(E+.3+b*(S-.6)/4,e*.73,-o/2+.18,.045,e*.22,.06,"steel");u(w,e*.73,-o/2+.18,S-.6,.055,.06,"steel");for(let b=1.5;b<e*.58;b+=.65)u(w,b,-o/2+.11,S-.26,.022,.025,"concrete");r=n;for(const b of[-o*.23,o*.23]){u(w,e-.65,b,2.8,.09,.18,"dark"),u(w,e-.705,b,2.65,.025,.13,"lamp");for(const C of[-1,1])u(w+C,e-.32,b,.012,.6,.012,"steel")}}}r=s,u(0,e*.48,-o/2+.28,a,.1,.12,"steel");const f=new $e(new Ii(.035,.035,a,10),new xt({color:"#a54332",roughness:.55,metalness:.3}));f.rotation.z=Math.PI/2,f.position.set(h,e*.42,l-o/2+.29),s.add(f),r=n;for(const d of[-a/2+1,a/2-1])u(d,.48,o/2-.4,.12,.96,.12,"paint"),u(d,.055,o/2-.4,.3,.11,.3,"dark"),u(d,.65,o/2-.4,.125,.14,.125,"dark");return n}function J0(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=256;const s=n.getContext("2d"),r=s.createImageData(256,256);let a=91;for(let h=0;h<r.data.length;h+=4){a=Math.imul(a,1664525)+1013904223>>>0;const l=120+a%24;r.data.set([l,l,l,255],h)}s.putImageData(r,0,0);const o=new En(n);return o.wrapS=o.wrapT=On,o.repeat.set(i/3,e/3),o.anisotropy=Math.min(8,t),o}const Bl={type:"change"},mo={type:"start"},Nc={type:"end"},zs=new Qa,zl=new Pn,Q0=Math.cos(70*tn.DEG2RAD),ft=new N,Lt=2*Math.PI,nt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vr=1e-6;class eg extends Du{constructor(e,t=null){super(e,t),this.state=nt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ei.ROTATE,MIDDLE:Ei.DOLLY,RIGHT:Ei.PAN},this.touches={ONE:Si.ROTATE,TWO:Si.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new un,this._lastTargetPosition=new N,this._quat=new un().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new sl,this._sphericalDelta=new sl,this._scale=1,this._panOffset=new N,this._rotateStart=new Ee,this._rotateEnd=new Ee,this._rotateDelta=new Ee,this._panStart=new Ee,this._panEnd=new Ee,this._panDelta=new Ee,this._dollyStart=new Ee,this._dollyEnd=new Ee,this._dollyDelta=new Ee,this._dollyDirection=new N,this._mouse=new Ee,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ng.bind(this),this._onPointerDown=tg.bind(this),this._onPointerUp=ig.bind(this),this._onContextMenu=hg.bind(this),this._onMouseWheel=ag.bind(this),this._onKeyDown=og.bind(this),this._onTouchStart=lg.bind(this),this._onTouchMove=cg.bind(this),this._onMouseDown=sg.bind(this),this._onMouseMove=rg.bind(this),this._interceptControlDown=ug.bind(this),this._interceptControlUp=dg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Bl),this.update(),this.state=nt.NONE}update(e=null){const t=this.object.position;ft.copy(t).sub(this.target),ft.applyQuaternion(this._quat),this._spherical.setFromVector3(ft),this.autoRotate&&this.state===nt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Lt:n>Math.PI&&(n-=Lt),s<-Math.PI?s+=Lt:s>Math.PI&&(s-=Lt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ft.setFromSpherical(this._spherical),ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ft.length();a=this._clampDistance(o*this._scale);const h=o-a;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(zs.origin.copy(this.object.position),zs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zs.direction))<Q0?this.object.lookAt(this.target):(zl.setFromNormalAndCoplanarPoint(this.object.up,this.target),zs.intersectPlane(zl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vr||this._lastTargetPosition.distanceToSquared(this.target)>Vr?(this.dispatchEvent(Bl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Lt/60*this.autoRotateSpeed*e:Lt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ft.setFromMatrixColumn(t,0),ft.multiplyScalar(-e),this._panOffset.add(ft)}_panUp(e,t){this.screenSpacePanning===!0?ft.setFromMatrixColumn(t,1):(ft.setFromMatrixColumn(t,0),ft.crossVectors(this.object.up,ft)),ft.multiplyScalar(e),this._panOffset.add(ft)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ft.copy(s).sub(this.target);let r=ft.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Lt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Lt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ee,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function tg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function ng(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ig(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Nc),this.state=nt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function sg(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ei.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=nt.DOLLY;break;case Ei.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=nt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=nt.ROTATE}break;case Ei.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=nt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=nt.PAN}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(mo)}function rg(i){switch(this.state){case nt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case nt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ag(i){this.enabled===!1||this.enableZoom===!1||this.state!==nt.NONE||(i.preventDefault(),this.dispatchEvent(mo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Nc))}function og(i){this.enabled!==!1&&this._handleKeyDown(i)}function lg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Si.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=nt.TOUCH_ROTATE;break;case Si.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=nt.TOUCH_PAN;break;default:this.state=nt.NONE}break;case 2:switch(this.touches.TWO){case Si.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=nt.TOUCH_DOLLY_PAN;break;case Si.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=nt.TOUCH_DOLLY_ROTATE;break;default:this.state=nt.NONE}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(mo)}function cg(i){switch(this._trackPointer(i),this.state){case nt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case nt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case nt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case nt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=nt.NONE}}function hg(i){this.enabled!==!1&&i.preventDefault()}function ug(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function dg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const fg=2,pg="public-hardware",mg="五金立体库 · 模拟展示",gg={width:61,depth:12,exitSide:"A",exitReserve:10,centerX:-3.637500000000003,centerZ:0,centerGap:.15},_g=2026,vg=[{position:[0,0,2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 1 列料框库",metalness:.2,id:"public-hardware-1"},{position:[0,0,.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 2 列料框库",metalness:.2,id:"public-hardware-2"},{position:[0,0,-.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 3 列料框库",metalness:.2,id:"public-hardware-3"},{position:[0,0,-2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 4 列料框库",metalness:.2,id:"public-hardware-4"},{position:[0,0,1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:1,params:{height:9.4,travel:0,lift:1.2,railLength:51},name:"巷道 1 堆垛机",metalness:.2,id:"public-hardware-5"},{position:[0,0,-1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:2,params:{height:9.4,travel:0,lift:1.2,railLength:48},name:"巷道 2 堆垛机",metalness:.2,id:"public-hardware-6"},{position:[-27.3,0,0],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"hardwareConveyorAssembly",params:{length:4.8,width:6.7,height:.81,laneCenters:[-2.975,-.475,.475,2.975]},name:"五金 · 四列对齐输送线总装",metalness:.35,id:"public-hardware-7"},{position:[-23.7375,0,2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第1列入库专用接驳",metalness:.35,id:"hardware-rack-link-0",dockMode:"inbound"},{position:[-23.7375,0,.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第2列出库专用接驳",metalness:.35,id:"hardware-rack-link-1",dockMode:"outbound"},{position:[-23.0375,0,-.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第3列入库专用接驳",metalness:.35,id:"hardware-rack-link-2",dockMode:"inbound"},{position:[-23.0375,0,-2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第4列出库专用接驳",metalness:.35,id:"hardware-rack-link-3",dockMode:"outbound"}],xg={version:fg,id:pg,name:mg,floor:gg,seed:_g,objects:vg},Mg=new Set(["#242a2b","#283437","#343e40","#43484b","#35322b","#304b50"]),Sg=new Set(["#d0d8df","#c3cdd1","#9eafb9","#b0b3b1","#b8bdc1","#929a9f"]),yg=new Set(["#38434d","#293336","#263844","#39474a","#132335"]);function Fc(i,e={}){const s=new ze(i).getHSL({}).s<.22,r=["#98734d","#bd9669","#b28d62","#b18b5f","#d4b485"].includes(i),a=Mg.has(i),o=yg.has(i),h=!r&&!a&&(!s||Sg.has(i)||o),l=h?ao:xt,c=new l({color:i,roughness:r?.87:a?.9:o?.64:h?.48:.3,metalness:r||a?0:h?.04:.88,...h?{clearcoat:.12,clearcoatRoughness:.36}:{},...e});return c.userData.industrialSurface=!0,c.userData.surfaceRole=r?"wood":a?"rubber":h?"paint":"metal",c}function Eg(i){let e=i.userData.surfaceRole||"metal";!["wood","rubber"].includes(e)&&i.metalness===0&&i.roughness>=.9&&(e="cloth","clearcoat"in i&&(i.clearcoat=0)),i.userData.surfaceRole=e;const n={metal:{frequency:1600,amplitude:.025,expression:"sin(finishPoint.y * 1600.0 + sin(finishPoint.z * 13.0) * 0.4)"},paint:{frequency:1100,amplitude:.02,expression:"sin(finishPoint.x * 1100.0) * sin(finishPoint.y * 980.0 + finishPoint.z * 830.0)"},cloth:{frequency:950,amplitude:.04,expression:"sin(finishPoint.x * 950.0) * sin(finishPoint.z * 950.0 + finishPoint.y * 950.0)"},rubber:{frequency:1300,amplitude:.025,expression:"sin(finishPoint.x * 1300.0 + finishPoint.y * 710.0) * sin(finishPoint.z * 1100.0)"},wood:{frequency:160,amplitude:.05,expression:"sin(finishPoint.x * 160.0 + sin(finishPoint.z * 9.0) * 4.0)"}}[e];return i.onBeforeCompile=s=>{s.vertexShader=`varying vec3 finishPoint;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
finishPoint = position;`),s.fragmentShader=`varying vec3 finishPoint;
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <roughnessmap_fragment>",`
      #include <roughnessmap_fragment>
      float finishFootprint = length(fwidth(finishPoint * ${n.frequency.toFixed(1)}));
      float finishWeight = 1.0 - smoothstep(0.4, 2.0, finishFootprint);
      float finishGrain = ${n.expression};
      roughnessFactor = clamp(roughnessFactor + finishGrain * ${n.amplitude.toFixed(3)} * finishWeight, 0.04, 1.0);
    `)},i.customProgramCacheKey=()=>"industrial-finish-v1-"+e,i}function bg({box:i,cylinder:e},t,n,s=.18,r=.2){i(s,.018,r,t,.009,n,"#939d9e");for(const a of[-s*.32,s*.32])for(const o of[-r*.32,r*.32])e(.011,.003,t+a,.02,n+o,"y","#bcc1bf"),e(.008,.01,t+a,.026,n+o,"y","#566165")}function kl({box:i,cylinder:e,rod:t},{length:n,width:s,height:r}){for(const l of[-n*.43,n*.43])for(const c of[-s*.44,s*.44])e(.045,.012,l,.006,c,"y","#343e40"),e(.012,.06,l,.038,c,"y","#aab3b2"),e(.021,.012,l,.065,c,"y","#616c70");for(const l of[-n*.41,n*.41])for(const c of[-1,1]){const u=c*(s/2+.018);i(.11,.07,.012,l,r-.06,u,"#6f7e81"),e(.008,.014,l,r-.04,u+c*.012,"z","#b2bcba"),e(.009,.065,l,r-.095,u,"x","#b2bcba")}const a=s/2-.06;t([-n*.39,r-.23,a],[n*.35,r-.23,a],.012,"#283437");for(const l of[-n*.32,0,n*.32])i(.025,.025,.04,l,r-.23,a,"#707e7d");const o=-n*.24,h=s/2+.055;i(.13,.12,.05,o,r-.12,h,"#d1b454"),e(.017,.016,o,r-.1,h+.034,"z","#aa3d32"),e(.013,.035,o,r-.19,h,"y","#39474a")}function Tg({box:i,cylinder:e},{width:t,depth:n,height:s}){const r=s-.16,a=.16;for(const o of[-1,1]){const h=o*t*.34,l=-n*.38;i(.027,r-a,.036,h,(r+a)/2,l,"#333f42"),i(.012,r-a-.05,.018,h+o*.024,(r+a)/2,l,"#b3bcba");for(const c of[a,r])e(.052,.06,h,c,l,"z","#586567"),e(.023,.075,h,c,l,"z","#abb7b4");for(let c=a+.07;c<r-.06;c+=.14)i(.036,.025,.012,h,c,l+.025,"#8c9998");i(.08,.1,.045,h,r-.14,l+.055,"#485f64"),i(.015,.025,.008,h,r-.13,l+.083,"#bd9c4e")}}const qi=new N;function Xt(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),h=Math.PI/4;qi.copy(e),qi[n]=0,qi.normalize();const l=.5*a/(a+o),c=1-qi.angleTo(i)/h;return Math.sign(qi[t])===1?c*l:o/(a+o)+l+l*(1-c)}class ss extends Ht{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const h=new N,l=new N,c=new N(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,M=u.length/6,S=new N,f=.5/a;for(let d=0,E=0;d<u.length;d+=3,E+=2)switch(h.fromArray(u,d),l.copy(h),l.x-=Math.sign(l.x)*f,l.y-=Math.sign(l.y)*f,l.z-=Math.sign(l.z)*f,l.normalize(),u[d+0]=c.x*Math.sign(h.x)+l.x*r,u[d+1]=c.y*Math.sign(h.y)+l.y*r,u[d+2]=c.z*Math.sign(h.z)+l.z*r,p[d+0]=l.x,p[d+1]=l.y,p[d+2]=l.z,Math.floor(d/M)){case 0:S.set(1,0,0),m[E+0]=Xt(S,l,"z","y",r,n),m[E+1]=1-Xt(S,l,"y","z",r,t);break;case 1:S.set(-1,0,0),m[E+0]=1-Xt(S,l,"z","y",r,n),m[E+1]=1-Xt(S,l,"y","z",r,t);break;case 2:S.set(0,1,0),m[E+0]=1-Xt(S,l,"x","z",r,e),m[E+1]=Xt(S,l,"z","x",r,n);break;case 3:S.set(0,-1,0),m[E+0]=1-Xt(S,l,"x","z",r,e),m[E+1]=1-Xt(S,l,"z","x",r,n);break;case 4:S.set(0,0,1),m[E+0]=1-Xt(S,l,"x","y",r,e),m[E+1]=1-Xt(S,l,"y","x",r,t);break;case 5:S.set(0,0,-1),m[E+0]=Xt(S,l,"x","y",r,e),m[E+1]=1-Xt(S,l,"y","x",r,t);break}}static fromJSON(e){return new ss(e.width,e.height,e.depth,e.segments,e.radius)}}const Oc={hardwareConveyorAssembly:{length:4.8,width:4.4,height:.81},hardwareLift:{width:1.15,depth:1.25,height:1.9,platformHeight:.72}},wg={hardwareConveyorAssembly:[["length","总长 · m",2,8,.01],["width","总宽 · m",2,8,.01],["height","输送面高度 · m",.5,1.5,.01]],hardwareLift:[["width","平台宽度 · m",.6,3,.01],["depth","平台长度 · m",.6,3,.01],["height","机架高度 · m",1,4,.05],["platformHeight","平台高度 · m",.3,3,.01]]};function Ag(i,e){const t=i.params,n="#929a9f",s="#38434d",r="#c2c7c9";let a=e,o=null;const h=new Map;function l(f,d,E,w,b,C,y=n){h.has(y)||h.set(y,Fc(y));const x=new $e(Math.min(f,d,E)>=.15?new ss(f,d,E,1,Math.min(.018,Math.min(f,d,E)*.08)):new Ht(f,d,E),h.get(y).clone());return x.position.set(w,b,C),x.userData={id:i.id,slot:o,tint:!1},a.add(x),x}function c(f,d,E=.035,w=n){const b=new N(...f),C=new N(...d),y=C.clone().sub(b),x=b.clone().add(C).multiplyScalar(.5),A=l(E,y.length(),E,...x.toArray(),w);return A.quaternion.setFromUnitVectors(new N(0,1,0),y.normalize()),A}function u(f,d,E,w,b,C="z",y=r){const x=l(.1,.1,.1,E,w,b,y);return x.geometry.dispose(),x.geometry=new Ii(f,f,d,16),C==="z"&&(x.rotation.x=Math.PI/2),C==="x"&&(x.rotation.z=Math.PI/2),x}function p(f,d,E){for(const w of[-f*.44,f*.44])for(const b of[-d*.44,d*.44])l(.07,E,.07,w,E/2,b),l(.18,.025,.18,w,.02,b,s)}function m(f,d,E,w="x",b="#587f90"){u(.11,.27,f,d,E,w,b);for(let C=0;C<5;C++)u(.12,.015,f+(w==="x"?(C-2)*.045:0),d,E+(w==="z"?(C-2)*.045:0),w,s);l(.18,.12,.14,f,d+.12,E,n)}function M(f,d,E){l(.05,.2,.05,f,d,E,s);for(let w=0;w<3;w++)l(.065,.055,.065,f,d+.12+w*.06,E,["#61aa88","#deb24b","#c76459"][w])}function S(f,d,E,w=4,b="z"){for(let C=0;C<w;C++)u(.018,.014,f+(b==="z"?(C-(w-1)/2)*.085:0),d,E+(b==="x"?(C-(w-1)/2)*.085:0),b,s)}if(i.type==="conveyor"&&t.exhibitionDetail){const f=t.length,d=t.width,E=t.height;if(p(f,d,E-.13),kl({box:l,cylinder:u,rod:c},{length:f,width:d,height:E}),i.id.startsWith("hardware-rack-link-")){const w=Number(i.id.split("-").at(-1)),b=i.dockMode?i.dockMode==="inbound":[0,2].includes(w),C=b?"#e3594e":"#55c987",y=f/2-.45;for(const _ of[-1,1])l(.55,.022,.035,y,E+.085,_*d*.44,C);const x=b?1:-1,A=y+x*.18;for(const _ of[-1,1])c([A,E+.095,0],[A-x*.14,E+.095,_*.11],.025,C);if(typeof document<"u"){const _=document.createElement("canvas");_.width=256,_.height=96;const g=_.getContext("2d");g.fillStyle="#152b3e",g.fillRect(0,0,256,96),g.fillStyle=C,g.font="bold 44px sans-serif",g.textAlign="center",g.fillText(b?"仅入库":"仅出库",128,64);const T=new En(_),L=new Ua(new er({map:T,depthTest:!1}));L.userData.ownedTexture=T,L.position.set(y,E+.4,0),L.scale.set(.65,.24,1),e.add(L)}}for(const w of[-d/2,d/2])l(f,.16,.075,0,E-.04,w,n),l(f,.035,.025,0,E+.065,w,s),l(f,.055,.06,0,.22,w);if(t.chainDeck){for(const w of[-d*.34,0,d*.34]){l(f-.14,.07,.115,0,E-.005,w,s);const b=Math.round((f-.16)/.075);for(let C=0;C<b;C++){const y=-f/2+.1+C*(f-.2)/(b-1);l(.047,.025,.1,y,E+.043,w,r);for(const x of[-1,1])l(.058,.025,.018,y,E+.019,w+x*.057,n),u(.012,.14,y,E+.023,w,"z",s)}for(const C of[-f*.44,f*.44]){u(.09,.13,C,E-.025,w,"z",s);for(let y=0;y<10;y++){const x=y*Math.PI/5,A=l(.03,.025,.13,C+Math.cos(x)*.093,E-.025+Math.sin(x)*.093,w,n);A.rotation.z=x}}l(f-.16,.025,.08,0,E-.21,w,s)}for(const w of[-f*.44,f*.44])u(.026,d+.14,w,E-.025,0,"z",r),l(.16,.17,.1,w,E-.025,d/2,n)}else if(t.crossBelt){l(f-.12,.065,d-.1,0,E-.045,0,n),l(f-.18,.035,d-.15,0,E+.018,0,"#3c4851"),l(f-.18,.025,d-.15,0,E-.14,0,s);for(const w of[-d*.37,d*.37]){u(.085,f-.1,0,E-.055,w,"x",s);for(const b of[-f/2,f/2])l(.055,.16,.16,b,E-.055,w,n),u(.035,.09,b,E-.055,w,"x",r)}m(f/2+.16,E-.055,-d*.43,"x"),l(.16,.19,.21,f/2+.025,E-.055,-d*.43,n);for(const w of[-d*.4,d*.4])l(.18,.009,.035,0,E+.041,w,"#d5b54d")}else if(t.flatDeck){l(f-.12,.085,d-.11,0,E+.022,0,r);for(const w of[-f*.43,f*.43])S(w,E+.071,0,4,"x")}else{const w=Math.max(7,Math.round(f/.18));for(let b=0;b<w;b++){const C=-f/2+.1+b*(f-.2)/(w-1);u(.055,d-.11,C,E+.035,0,"z",r);for(const y of[-1,1])u(.022,.035,C,E+.035,y*d/2,"z",s)}}if(t.rightAngleEntry){const w=t.transferX??0;for(const b of[-.32,.32]){l(.065,.035,d-.14,w+b,E+.072,0,s);for(let C=0;C<Math.ceil(d/.075);C++)l(.075,.018,.04,w+b,E+.081,-d/2+.08+C*(d-.16)/(Math.ceil(d/.075)-1),r)}e.userData.cornerTransfer={axis:"z-to-x",surface:E+.09}}if(!t.crossBelt){l(f-.2,.035,.035,0,E-.09,d/2+.06,s);for(let w=0;w<Math.floor(f/.08);w++)l(.035,.025,.04,-f/2+.1+w*.08,E-.07,d/2+.06,n);m(f*.32,E-.22,d/2+.18,"z"),l(.26,.25,.08,f*.32,E-.1,d/2+.09,n)}for(const w of[-f*.43,f*.43])for(const b of[-d*.44,d*.44])l(.105,.04,.105,w,.1,b,s),u(.035,.12,w,.085,b,"y",r),S(w,E-.02,b+.055,2);for(const w of[-f*.4,f*.4])l(.07,.11,.055,w,E+.13,d*.49,"#d6b34c"),l(.025,.025,.025,w,E+.16,d*.51,s);t.chainDeck&&t.endHeight!=null&&e.traverse(w=>{if(!w.isMesh)return;w.updateMatrix(),w.geometry.applyMatrix4(w.matrix);const b=w.geometry.attributes.position;for(let C=0;C<b.count;C++){const y=b.getX(C),x=b.getY(C),A=(t.endHeight-E)*tn.clamp((f/2-.5-y)/Math.max(.01,f-1),0,1);b.setY(C,x+A*tn.clamp(x/(E-.13),0,1))}w.geometry.computeVertexNormals(),w.position.set(0,0,0),w.quaternion.identity(),w.scale.set(1,1,1)})}else if(i.type==="hardwareConveyorAssembly"){let y=function(A,_,g,T,L=!1){const P=L?A*d:A*f,I=L?_*f:_*(w?1:d),z=new St;e.add(z),z.position.set(g*f,0,T*d),L&&(z.rotation.y=Math.PI/2),a=z,kl({box:l,cylinder:u,rod:c},{length:P,width:I,height:E});for(const X of[-I/2,I/2])l(P,.09,.035,0,E-.075,X,n),l(P,.012,.023,0,E+.018,X-Math.sign(X)*.025,"#387b5c");const B=Math.max(5,Math.floor(P/.115));for(let X=0;X<B;X++)u(.026,I-.065,-P/2+.055+X*(P-.11)/(B-1),E-.026,0,"z",r);for(const X of[-P*.43,P*.43])for(const k of[-I*.44,I*.44])l(.04,E-.11,.045,X,(E-.11)/2,k,n),u(.028,.026,X,.018,k,"y",r);for(const X of[-P*.43,P*.43])l(.035,.05,I*.83,X,E*.35,0,n),c([X,.14,-I*.43],[X,E*.34,I*.43],.017,n);for(const X of[-P*.45,0,P*.45])for(const k of[-I*.49,I*.49])l(.025,.13,.025,X,E+.065,k,s),c([X,E+.12,k],[X+(X>0?-.16:.16),E+.12,k],.01,s);m(P*.14,E-.17,0,"z","#397ba2"),l(.17,.11,.12,-P*.13,E-.2,0,s);for(const X of[-1,1]){l(P-.08,.025,.025,0,E-.055,X*(I/2-.055),"#315f49");for(const k of[-P*.4,P*.4])l(.055,.04,.035,k,E+.1,X*I*.49,s),l(.015,.018,.006,k,E+.1,X*(I*.49+.021),"#cf9d45")}for(const X of[-P*.43,P*.43])for(const k of[-I*.44,I*.44])u(.011,.055,X,.047,k,"y",s);a=e};const f=t.length/4.8,d=t.width/4.4,E=t.height,w=Array.isArray(t.laneCenters)&&t.laneCenters.length===4,b=.66*(w?1:d),C=w?t.laneCenters.map(A=>A/d):[-1.73,-.47,.47,1.73],x=[-2.15*d,...C.slice(0,-1).map((A,_)=>(A+C[_+1])*d/2),2.15*d];for(const A of[-.43,.43])for(let _=0;_<x.length-1;_++){const g=x[_],T=x[_+1];y((T-g-.018)/d,.8,A,(g+T)/2/d,!0)}for(const A of C){y(1.55,.66,-1.625,A),y(1.55,.66,1.625,A);for(const _ of[-1,1])_>0&&l(.035,.14,b,_*2.38*f,E+.045,A*d,n),l(.045,.08,b-.04,_*.84*f,E-.065,A*d,n);for(const _ of[-.43,.43])for(const g of[-1,1])l(.73*f,.012,.025,_*f,E+.006,A*d+g*b*.32,"#34755b")}for(const A of[C[0],C[2]])l(.2,.26,.085,-.86*f,E-.32,A*d,n),l(.08,.05,.012,-.86*f,E-.26,A*d+.05,"#477e91");if(typeof document<"u")for(const[A,_]of[...C].sort((g,T)=>T-g).entries()){const g=document.createElement("canvas");g.width=256,g.height=112;const T=g.getContext("2d");T.fillStyle="#152b3e",T.fillRect(0,0,256,112),T.strokeStyle="#62d1bd",T.lineWidth=6,T.strokeRect(3,3,250,106),T.fillStyle="#ffffff",T.font="bold 66px sans-serif",T.textAlign="center",T.fillText(String(101+A),128,79);const L=new En(g),P=new Ua(new er({map:L,depthTest:!1}));P.userData.ownedTexture=L,P.position.set(-2.54*f,E+.35,_*d),P.scale.set(.55,.24,1),e.add(P)}e.userData.hardwareTransverseRows=2,e.userData.hardwareConveyorSize=[t.length,t.width,t.height],e.userData.hardwareLaneCenters=C.map(A=>A*d)}else if(i.type==="hardwareLift"){const f=t.width,d=t.depth,E=t.height,w=t.platformHeight;Tg({box:l,cylinder:u},{width:f,depth:d,height:E});for(const b of[-f*.48,f*.48])for(const C of[-d*.48,d*.48])l(.065,E,.065,b,E/2,C,n),l(.16,.035,.16,b,.018,C,r),l(.018,E-.1,.025,b*.9,E/2,C,s);for(const b of[-d*.48,d*.48])l(f,.08,.06,0,E,b,n);l(f,.045,d,0,.055,0,n);for(const b of[-f*.43,f*.43])l(.065,.12,d*.84,b,w-.09,0,n);for(let b=0;b<7;b++)u(.035,f*.8,0,w,-d*.36+b*d*.72/6,"x",r);for(const b of[-d*.44,d*.44])l(f*.86,.08,.035,0,w-.05,b,s);m(f*.55,E-.18,d*.38,"x"),M(-f*.55,E-.2,d*.48)}else throw Error("不属于公开五金设备类型")}function Rg(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,h=new sn;let l=0;for(let c=0;c<i.length;++c){const u=i[c];let p=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in u.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(u.attributes[m]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in u.morphAttributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;a[m]===void 0&&(a[m]=[]),a[m].push(u.morphAttributes[m])}if(e){let m;if(t)m=u.index.count;else if(u.attributes.position!==void 0)m=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;h.addGroup(l,m,c),l+=m}}if(t){let c=0;const u=[];for(let p=0;p<i.length;++p){const m=i[p].index;for(let M=0;M<m.count;++M)u.push(m.getX(M)+c);c+=i[p].attributes.position.count}h.setIndex(u)}for(const c in r){const u=Hl(r[c]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;h.setAttribute(c,u)}for(const c in a){const u=a[c][0].length;if(u===0)break;h.morphAttributes=h.morphAttributes||{},h.morphAttributes[c]=[];for(let p=0;p<u;++p){const m=[];for(let S=0;S<a[c].length;++S)m.push(a[c][S][p]);const M=Hl(m);if(!M)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;h.morphAttributes[c].push(M)}}return h}function Hl(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const c=i[l];if(e===void 0&&(e=c.array.constructor),e!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=c.itemSize),t!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*t}const a=new e(r),o=new zt(a,t,n);let h=0;for(let l=0;l<i.length;++l){const c=i[l];if(c.isInterleavedBufferAttribute){const u=h/t;for(let p=0,m=c.count;p<m;p++)for(let M=0;M<t;M++){const S=c.getComponent(p,M);o.setComponent(p+u,M,S)}}else a.set(c.array,h);h+=c.count*t}return s!==void 0&&(o.gpuType=s),o}const ks={...Oc,binRack:{smallBays:40,largeBays:24,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},rack:{bays:5,levels:4,bayWidth:1.8,levelHeight:1.55,depth:1.4,loaded:!0},shuttle:{bays:10,rows:2,levels:4,bayWidth:2.099,levelHeight:1.5,baseHeight:.525,depth:3.1,loaded:!0},barRack:{bays:6,lanes:6,levels:11,bayWidth:2.6,depth:1.55,height:6.5,loaded:!0},rgv:{railLength:23.3,travel:0},shuttleCar:{width:1.35},robot:{height:2.7},machine:{width:4.2,depth:2.5,height:1.8},stacker:{height:7,travel:0,lift:1.2,railLength:18},conveyor:{length:7,width:1.3,height:.8},turn:{width:1.3,height:.8},pallet:{cargo:!0},agv:{cargo:!0}},Cg={...wg,binRack:[["smallBays","小料框排数",0,100,1],["largeBays","大料筐排数",0,100,1],["smallLevels","小料框层数",1,30,1],["largeLevels","大料筐层数",1,30,1],["smallPitch","小框排距 · m",.3,2,.01],["largePitch","大筐排距 · m",.4,3,.01],["smallStep","小框层高 · m",.2,1.5,.01],["largeStep","大筐层高 · m",.3,2,.01],["depth","货架深度 · m",.4,2,.01]],rack:[["bays","货架列数",1,12,1],["levels","货架层数",1,8,1],["bayWidth","单列宽度 · m",1,3,.1],["levelHeight","层高 · m",1,2.5,.1],["depth","货架深度 · m",1,3,.1]],shuttle:[["bays","货架列数",1,16,1],["rows","深位数量",1,4,1],["levels","货架层数",1,8,1],["bayWidth","列间距 · m",1,3,.01],["levelHeight","层间距 · m",1,2.5,.1],["baseHeight","底层高度 · m",.2,1,.025],["depth","整体深度 · m",1,6,.1]],barRack:[["bays","货架列数",1,12,1],["lanes","每列条数",1,8,1],["levels","货架层数",1,15,1],["bayWidth","列间距 · m",1,4,.1],["depth","货架深度 · m",1,3,.1],["height","总高度 · m",3,10,.1]],rgv:[["railLength","轨道长度 · m",4,32,.1],["travel","行走位置 · m",-14,14,.1]],shuttleCar:[["width","车体宽度 · m",.8,2,.1]],robot:[["height","示意高度 · m",1.5,4,.1]],machine:[["width","设备宽度 · m",1,8,.1],["depth","设备深度 · m",1,6,.1],["height","设备高度 · m",.8,4,.1]],stacker:[["railLength","轨道长度 · m",4,120,.1],["height","立柱高度 · m",3,20,.1],["travel","行走位置 · m",-8,8,.1],["lift","载货台高度 · m",.5,13,.1]],conveyor:[["length","输送长度 · m",.2,18,.01],["width","输送宽度 · m",.4,2.5,.1],["height","输送高度 · m",.5,1.5,.1]],turn:[["width","转角宽度 · m",.8,2,.1],["height","输送高度 · m",.5,1.5,.1]],pallet:[],agv:[]};function ji(i){const e=new Set,t=new Set;i.userData.beltTexture&&e.add(i.userData.beltTexture),i.traverse(n=>{var s;if(n.userData.ownedTexture&&e.add(n.userData.ownedTexture),(s=n.geometry)==null||s.dispose(),n.material)for(const r of[n.material].flat()){t.add(r);for(const a of["map","bumpMap","roughnessMap","normalMap"])r[a]&&e.add(r[a])}}),e.forEach(n=>n.dispose()),t.forEach(n=>n.dispose())}function Pg(i){var b,C;const e=new St,t=i.params;let n=e,s=null;const r="#354148",a=i.color,o="#a4abad",h="#98734d",l="#bd9669";function c(y,x,A,_,g,T,L=a,P=!1){const I=new $e(s===null&&!["binRack","rack","shuttle","barRack"].includes(i.type)&&Math.min(y,x,A)>=.15?new ss(y,x,A,1,Math.min(.025,Math.min(y,x,A)*.1)):new Ht(y,x,A),Fc(L,P?{roughness:i.roughness,metalness:i.metalness}:{}));return I.position.set(_,g,T),I.castShadow=!0,I.receiveShadow=!0,I.userData.id=i.id,I.userData.tint=P,I.userData.slot=s,n.add(I),I}function u(y,x,A,_,g,T="z"){const L=new $e(new Ii(x,x,y,12),new xt({color:o,metalness:.65,roughness:.3}));L.rotation[T==="z"?"x":"z"]=Math.PI/2,L.position.set(A,_,g),L.castShadow=!0,L.userData.id=i.id,L.userData.slot=s,n.add(L)}function p(y,x,A,_,g,T,L=a){const P=c(y,x,A,_,g,T,L,L===a);return P.geometry.dispose(),P.geometry=new ss(y,x,A,2,Math.min(y,x,A)*.12),P}function m(y,x,A=o,_=.035){const g=new N(...y),T=new N(...x),L=T.clone().sub(g),P=g.clone().add(T).multiplyScalar(.5);c(_,L.length(),_,P.x,P.y,P.z,A).quaternion.setFromUnitVectors(new N(0,1,0),L.normalize())}function M(y,x,A){c(.07,.18,.07,y,x,A,r);for(let _=0;_<3;_++)c(.09,.055,.09,y,x+.12+_*.06,A,["#65d2a6","#efb84e","#d86363"][_])}function S(y,x,A){p(.35,.6,.3,y,x,A,"#d0d8df"),c(.21,.16,.014,y,x+.1,A+.16,"#132a3c"),c(.16,.09,.015,y,x+.11,A+.17,"#4fafa5");for(let _=0;_<3;_++)c(.035,.035,.016,y+(_-1)*.07,x-.05,A+.17,["#65d2a6","#efb84e","#d86363"][_]);M(y,x+.43,A)}function f(y,x,A,_,g){for(const T of[-y/2,y/2]){for(let L=0;L<Math.ceil(x/g);L++){const P=.18+L*g,I=Math.min(x-.1,P+g);I<=P||(m([T,P,-A/2],[T,I,A/2]),m([T,P,A/2],[T,I,-A/2]))}for(const L of[-A/2,A/2])c(.14,.5,.14,T,.3,L,"#e5aa3c"),c(.15,.055,.15,T,.2,L,r),c(.15,.055,.15,T,.4,L,r)}for(let T=0;T<=_;T++){const L=T*y/_-y/2;for(const P of[-A/2,A/2]){c(.24,.035,.24,L,.02,P,o);for(let I=.6;I<x;I+=.35)c(.027,.045,.004,L,I,P+Math.sign(P)*.047,"#132335")}}}function d(y,x,A,_=!0){for(let g=0;g<3;g++){c(1.15,.055,.16,y,x+.035,A+(g-1)*.4,h);for(const T of[-.43,0,.43])c(.16,.11,.16,y+T,x+.11,A+(g-1)*.4,h)}for(let g=0;g<5;g++)c(.17,.055,1.05,y+(g-2)*.24,x+.19,A,"#b18b5f");if(_){for(let g=0;g<2;g++)for(const T of[-1,1])for(const L of[-1,1]){const P=y+T*.258,I=A+L*.233,z=x+.39+g*.34;if(c(.502,.325,.45,P,z,I,g?l:"#b28d62"),c(.035,.012,.451,P,z+.168,I,"#d4b485"),L===1){c(.14,.09,.006,P+.09,z,I+.228,"#e4e1d3");for(let B=0;B<4;B++)c(.007,.05,.007,P+.04+B*.024,z,I+.233,"#344052")}}for(const g of[-.33,.33])c(.025,.7,.952,y+g,x+.57,A,"#445464"),c(.025,.012,.952,y+g,x+.923,A,"#445464")}}function E(y,x,A,_=0,g=0,T=!1){if(T){c(x,.18,y,_,A,g,r);for(let P=-y/2+.12;P<y/2;P+=.24)u(x-.12,.065,_,A+.12,g+P,"x");for(const P of[-1,1])c(.08,.25,y,_+P*x/2,A+.12,g,a,!0)}else{c(y,.18,x,_,A,g,r);for(let P=-y/2+.12;P<y/2;P+=.24)u(x-.12,.065,_+P,A+.12,g);for(const P of[-1,1])c(y,.25,.08,_,A+.12,g+P*x/2,a,!0)}for(const P of[-1,1])for(const I of[-1,1])c(.1,A,.1,_+P*(T?x:y)*.38,A/2,g+I*(T?y:x)*.38,r);for(const P of[-1,1])for(const I of[-1,1]){const z=_+P*(T?x:y)*.38,B=g+I*(T?y:x)*.38;c(.22,.035,.22,z,.02,B,o),c(.13,.12,.13,z,.1,B,r)}const L=c(.28,.25,.38,_+(T?x/2:y*.35),A-.2,g+(T?y*.35:x/2+.16),o);for(let P=0;P<4;P++)c(.29,.02,.4,L.position.x,A-.3+P*.045,L.position.z,r);for(const P of[-1,1]){const I=_+(T?x/2+.04:P*y*.35),z=g+(T?P*y*.35:x/2+.04);c(.07,.12,.08,I,A+.22,z,"#e4ae43"),c(.025,.04,.09,I,A+.24,z,"#132335")}}if(Oc[i.type]||i.type==="conveyor"&&t.exhibitionDetail)Ag(i,e);else if(i.type==="binRack"){let x=-(t.smallBays*t.smallPitch+t.largeBays*t.largePitch)/2,A=0;for(const[_,g,T,L,P]of[[t.smallBays,t.smallLevels,t.smallPitch,t.smallStep,!1],[t.largeBays,t.largeLevels,t.largePitch,t.largeStep,!0]]){if(!_)continue;const I=g*L+.2;for(let z=0;z<=_;z++)for(const B of[-1,1]){const X=x+z*T,k=B*t.depth/2;if(c(.045,I,.045,X,I/2,k,r),c(.012,I,.012,X-.028,I/2,k+B*.016,o),c(.012,I,.012,X+.028,I/2,k+B*.016,o),bg({box:c,cylinder:(W,ee,oe,pe,we,Re,De)=>{const Z=c(W*2,ee,W*2,oe,pe,we,De);return Z.geometry.dispose(),Z.geometry=new Ii(W,W,ee,6),Re==="z"&&(Z.rotation.x=Math.PI/2),Re==="x"&&(Z.rotation.z=Math.PI/2),Z}},X,k,.13,.17),z===0||z===_){for(let W=.22;W<I-.1;W+=L)c(.02,.04,.004,X,W,k+B*.026,"#1c292e"),c(.065,.085,.012,X,W-.045,k+B*.035,o);c(.09,.42,.07,X,.23,k,"#c3a24b")}}for(let z=0;z<g;z++){const B=.15+z*L;for(const X of[-1,1])c(_*T,.045,.04,x+_*T/2,B,X*t.depth/2,a,!0);for(let X=0;X<_;X++){const k=x+(X+.5)*T;for(const W of[-1,1])c(.035,.025,t.depth,k+W*T*.36,B,0,o);if(t.loaded){s=A+X*g+z;const W=(b=i.binSizes)==null?void 0:b[s],ee=T*(W===2?.94:.82),oe=L*(W===2?.82:.72),pe=t.depth*.85,we=i.binSizes?W===1?"#9ba9aa":W===2?"#aab0ac":"#8b8b91":P?"#aab0ac":"#9ba9aa";c(ee,.025,pe,k,B+.04,0,we);for(const Re of[-1,1]){c(ee,oe,.024,k,B+oe/2+.05,Re*pe/2,we),c(.024,oe,pe,k+Re*ee/2,B+oe/2+.05,0,we),c(ee,.035,.045,k,B+oe+.05,Re*pe/2,o),c(.12,.055,.026,k,B+oe*.55,Re*(pe/2+.016),"#d9e0d9"),c(.13,.035,.026,k,B+oe*.85,Re*(pe/2+.016),r);for(const De of[-1,1])c(.024,oe*.82,.012,k+De*(ee/2-.022),B+oe*.51+.05,Re*(pe/2+.02),o);for(const De of[-.32,0,.32])c(.018,oe*.65,.012,k+ee*De,B+oe*.43+.05,Re*(pe/2+.019),we);c(ee*.82,.018,.028,k,B+.1,Re*(pe/2+.012),o)}s=null}}}for(const z of[x,x+_*T])for(let B=0;B<g;B+=2)m([z,.15+B*L,-t.depth/2],[z,Math.min(I,(B+2)*L),t.depth/2]);A+=_*g,x+=_*T}}else if(i.type==="shuttle"){const y=t.bays*t.bayWidth,x=t.baseHeight+t.levels*t.levelHeight;f(y,x,t.depth,t.bays,t.levelHeight);for(let A=0;A<=t.bays;A++)for(let _=0;_<=t.rows;_++){const g=A*t.bayWidth-y/2,T=_*t.depth/t.rows-t.depth/2;c(.09,x,.09,g,x/2,T,r),c(.22,.05,.22,g,.025,T,r)}for(let A=0;A<t.levels;A++){const _=t.baseHeight+A*t.levelHeight;for(let g=0;g<=t.rows;g++)c(y,.12,.08,0,_,g*t.depth/t.rows-t.depth/2,a,!0);for(let g=0;g<t.bays;g++){const T=(g+.5)*t.bayWidth-y/2;for(let L=0;L<t.rows;L++){const P=(L+.5)*t.depth/t.rows-t.depth/2;for(const I of[-1,1])c(t.bayWidth-.15,.08,.07,T,_,P+I*.52,o);t.loaded&&(s=(A*t.bays+g)*t.rows+L,d(T,_+.06,P,!0),s=null)}}}}else if(i.type==="barRack"){const y=t.bays*t.bayWidth,x=(t.height-.4)/t.levels;f(y,t.height,t.depth,t.bays,x*2);for(let A=0;A<=t.bays;A++)for(const _ of[-1,1])c(.08,t.height,.08,A*t.bayWidth-y/2,t.height/2,_*t.depth/2,r);for(let A=0;A<t.levels;A++){const _=.25+A*x;for(const g of[-1,1])c(y,.055,.06,0,_,g*t.depth/2,a,!0);for(let g=0;g<t.bays;g++)for(let T=0;T<t.lanes;T++){const L=(g+(T+.5)/t.lanes)*t.bayWidth-y/2;c(.03,.04,t.depth,L,_,0,o),t.loaded&&(s=(A*t.bays+g)*t.lanes+T,u(t.depth-.08,.065,L,_+.1,0),s=null)}}}else if(i.type==="rgv"){for(const x of[-.7,.7])c(t.railLength,.05,.1,0,.03,x,o);const y=new St;e.add(y),e.userData.carriage=y,n=y,p(4.4,.35,1.8,t.travel,.35,0),S(t.travel+1.9,.78,-.65);for(const x of[-.94,.94]){c(4.2,.09,.08,t.travel,.33,x,"#162a3a");for(let A=-4;A<=4;A++)c(.19,.08,.09,t.travel+A*.43,.34,x,"#e5aa3c")}for(const x of[-1,1]){E(1.8,1.6,.7,t.travel+x*1.1,0);for(const A of[-.9,.9])u(.13,.19,t.travel+x*1.55,.22,A)}c(.4,.4,.3,t.travel+2,.85,0,r)}else if(i.type==="shuttleCar"){p(t.width,.23,1.05,0,.23,0),c(t.width*.8,.04,.5,0,.37,0,r);for(const y of[-t.width*.4,t.width*.4])c(.12,.04,.2,y,.38,0,"#e5aa3c");for(const y of[-1,1]){c(t.width-.1,.08,.12,0,.43,y*.4,o);for(const x of[-.4,.4])u(.12,.12,x,.14,y*.52)}}else if(i.type==="machine"){c(t.width,.25,t.depth,0,.15,0,r),p(t.width*.85,t.height*.7,t.depth*.6,0,t.height*.45,-t.depth*.15,"#9eafb9");for(const y of[-1,1])c(t.width*.28,t.height*.52,.025,y*t.width*.22,t.height*.47,t.depth*.155,"#172e3e"),c(.035,t.height*.44,.04,y*t.width*.08,t.height*.47,t.depth*.18,o);for(let y=0;y<6;y++)c(.24,.025,.028,t.width*.35,t.height*.24+y*.06,t.depth*.17,r);S(t.width*.43,t.height*.53,t.depth*.4),c(t.width*.65,.12,t.depth*.8,0,t.height*.4,0,o);for(const y of[-1,1])c(.15,t.height,.15,y*t.width*.4,t.height/2,-t.depth*.35,a,!0);c(t.width,.2,.4,0,t.height,-t.depth*.35,a,!0),c(.35,.5,.25,t.width*.4,t.height*.5,t.depth*.4,r),c(.25,.18,.02,t.width*.4,t.height*.58,t.depth*.4+.14,"#5ac6c0")}else if(i.type==="robot"){p(.8,.4,.8,0,.2,0,r),u(.4,.28,0,.6,0);for(const A of[-1,1])for(const _ of[-1,1])c(.09,.035,.09,A*.3,.42,_*.3,o);u(.38,.18,0,t.height*.43,0),u(.32,.15,t.height*.28,t.height*.7,0),u(.29,.12,t.height*.59,t.height*.64,0),c(.075,t.height*.38,.08,-.17,t.height*.4,-.12,r),m([0,t.height*.62,-.18],[t.height*.5,t.height*.75,-.18],r,.065);const y=c(.27,t.height*.5,.3,0,t.height*.43,0,a,!0);y.rotation.z=-.3;const x=c(t.height*.6,.24,.26,t.height*.28,t.height*.7,0,a,!0);x.rotation.z=.2,c(.2,.55,.2,t.height*.59,t.height*.64,0,o),c(.5,.07,.4,t.height*.59,t.height*.36,0,r)}else if(i.type==="rack"){const y=t.bays*t.bayWidth;f(y,t.levels*t.levelHeight+.3,t.depth,t.bays,t.levelHeight);for(let x=0;x<=t.bays;x++)for(const A of[-1,1]){const _=x*t.bayWidth-y/2;c(.09,t.levels*t.levelHeight+.3,.09,_,(t.levels*t.levelHeight+.3)/2,A*t.depth/2,r),c(.22,.06,.22,_,.03,A*t.depth/2,r)}for(let x=0;x<t.levels;x++){const A=.24+x*t.levelHeight;for(const _ of[-1,1])c(y,.13,.09,0,A,_*t.depth/2,a,!0);for(let _=0;_<t.bays;_++){const g=(_+.5)*t.bayWidth-y/2;c(t.bayWidth-.1,.05,t.depth-.1,g,A,0,o),t.loaded&&(s=x*t.bays+_,d(g,A+.04,0,!0),s=null)}}for(const x of[-y/2,y/2])for(let A=0;A<t.levels;A++){const _=c(.05,Math.hypot(t.levelHeight,t.depth),.05,x,(A+.5)*t.levelHeight,0,o);_.rotation.x=(A%2?1:-1)*Math.atan(t.depth/t.levelHeight)}}else if(i.type==="stacker"){const y="#e99832",x="#1d2b38",A="#c3cdd1",_="#8d9ca5",g=t.travel,T=0;c(t.railLength,.09,.17,0,.07,T,_),c(t.railLength,.045,.32,0,.022,T,x);for(let W=-t.railLength/2+.3;W<t.railLength/2;W+=.9){c(.34,.035,.65,W,.02,T,x);for(const ee of[-.22,.22])c(.07,.045,.07,W,.045,T+ee,_)}const L=new St;e.add(L),e.userData.carriage=L,n=L,p(2.65,.1,.8,g,.08,T,x),p(2.3,.04,.85,g,.16,T,A);for(const W of[-1.04,1.04])u(.26,.22,g+W,.24,T),c(.4,.12,.42,g+W,.48,T,y),c(.2,.11,.25,g+W*1.18,.32,T,x);const P=g+.67,I="#d5ae35",z=c(.28,t.height-.25,.32,P,(t.height+.25)/2,T,"#aeb4b6");z.userData.singleMast=!0;for(const W of[-1,1])c(.055,t.height-.3,.035,P+W*.11,(t.height+.3)/2,T+.178,x),c(.027,t.height-.35,.04,P+W*.075,(t.height+.35)/2,T+.197,_);c(.32,.2,.38,P,.25,T,x),p(.48,.1,.47,P,t.height+.05,T,x);for(const W of[-.16,.16])u(.12,.09,P,t.height+.12,T+W),c(.13,.055,.1,P-.24,t.height+.07,T+W,x);p(.36,.3,.34,g+1.02,.4,T,"#913f3c"),u(.3,.14,g+1.02,.4,T-.23);for(const W of[-.1,.1])c(.018,t.height-.3,.018,P+.19,(t.height+.3)/2,T+W,x);c(.045,t.height-.4,.065,P-.19,(t.height+.4)/2,T-.12,x);for(let W=.5;W<t.height;W+=.28)c(.055,.025,.08,P-.19,W,T-.12,_);p(.34,2.05,.44,g+1.06,1.45,T-.02,A),c(.025,1.85,.012,g+.94,1.45,T+.209,x),c(.17,.14,.016,g+1.06,1.65,T+.211,x),c(.13,.09,.018,g+1.06,1.66,T+.223,"#4c9b9b"),c(.022,.16,.022,g+.96,1.28,T+.215,x);for(let W=0;W<4;W++)c(.2,.014,.016,g+1.06,.63+W*.043,T+.209,x);M(g+1.06,2.6,T-.02);for(const W of[-1.15,1.15])c(.23,.1,.04,g+W,.58,T+.45,"#efb34e"),c(.08,.11,.045,g+W,.58,T+.475,x);const B=new St;L.add(B),e.userData.lift=B,n=B,p(1.08,.12,1.05,g,t.lift+.06,T,x),c(1.02,.025,1,g,t.lift+.13,T,A),c(.12,.58,.42,P-.16,t.lift+.32,T,I);for(const W of[.1,.51])for(const ee of[-.17,.17])u(.08,.055,P-.19,t.lift+W,T+ee);const X=new St;B.add(X),e.userData.loadGuard=X,n=X;for(const W of[-.52,.52]){for(const ee of[-.51,.51])c(.045,.76,.045,g+W,t.lift+.53,T+ee,I);for(const ee of[.4,.65,.91])c(.045,.045,1.065,g+W,t.lift+ee,T,I);for(const ee of[-.25,0,.25])c(.025,.72,.025,g+W,t.lift+.53,T+ee,I);c(.055,.08,1.065,g+W,t.lift+.18,T,x)}n=B;const k=new St;B.add(k),e.userData.fork=k,n=k;for(const W of[-.18,.18])p(.24,.09,1.12,g+W,t.lift+.07,T,_),c(.17,.07,.94,g+W,t.lift+.11,T,A),c(.105,.055,.78,g+W,t.lift+.145,T,_),c(.11,.045,.15,g+W,t.lift+.155,T+.315,x);n=B;for(const W of[-.63,.63])c(.055,.16,.08,g+W,t.lift+.24,T+.52,"#e7b54c"),c(.035,.07,.09,g+W,t.lift+.26,T+.57,x);n=L}else if(i.type==="conveyor")E(t.length,t.width,t.height);else if(i.type==="turn")E(2.8,t.width,t.height,-.75,0),E(2.8,t.width,t.height,.65,1.1,!0);else if(i.type==="pallet")d(0,0,0,t.cargo);else if(i.type==="agv"){p(1.55,.35,1.2,0,.32,0),p(1.6,.12,1.24,0,.2,0,"#152b3c"),c(1.35,.04,.1,0,.48,.58,"#60d4b2"),c(.16,.12,.16,.6,.57,-.4,"#152b3c"),c(.18,.025,.18,.6,.65,-.4,"#69ceb9");for(const y of[-.8,.8])c(.03,.08,.82,y,.31,0,"#e5aa3c"),c(.04,.06,.2,y,.32,.4,"#dce9ed");c(1.35,.14,1,0,.57,0,r);for(const y of[-.5,.5])for(const x of[-.59,.59])u(.12,.18,y,.22,x);c(.7,.05,.05,.6,.37,.62,"#67e6c0"),t.cargo&&d(0,.65,0,!0)}e.userData.stock=[];const w=[];e.traverse(y=>{y.isGroup&&w.push(y)});for(const y of w){const x=new Map,A=new Map;for(const _ of[...y.children]){if(!_.isMesh)continue;_.updateMatrix();const g=_.material,T=[g.type,g.color.getHex(),g.roughness,g.metalness,((C=g.map)==null?void 0:C.uuid)||"",g.side,g.transparent,g.opacity,!!_.userData.tint].join(":");if(_.userData.slot!==null){const L=T+JSON.stringify(_.geometry.parameters);A.has(L)||A.set(L,{geometry:_.geometry.clone(),material:g.clone(),entries:[]}),A.get(L).entries.push({slot:_.userData.slot,matrix:_.matrix.clone()})}else x.has(T)||x.set(T,{geometry:[],material:g.clone(),tint:_.userData.tint}),x.get(T).geometry.push((_.geometry.index?_.geometry.toNonIndexed():_.geometry.clone()).applyMatrix4(_.matrix));y.remove(_),_.geometry.dispose(),g.dispose()}for(const _ of x.values()){const g=Rg(_.geometry,!1);for(const L of _.geometry)L.dispose();const T=new $e(g,_.material);T.userData.id=i.id,T.userData.tint=_.tint,T.castShadow=!0,T.receiveShadow=!0,y.add(T)}for(const _ of A.values()){const g=new Sc(_.geometry,_.material,_.entries.length);g.instanceMatrix.setUsage(wh);for(let T=0;T<_.entries.length;T++){const P=.94+(Math.imul(_.entries[T].slot+1,2654435761)>>>0)%101/1e3;g.setColorAt(T,new ze(P,P,P))}g.userData.id=i.id,g.castShadow=!0,g.receiveShadow=!0,g.frustumCulled=!1,y.add(g),e.userData.stock.push({mesh:g,entries:_.entries})}}return e.traverse(y=>{var x;(x=y.material)!=null&&x.userData.industrialSurface&&Eg(y.material)}),e.userData.baseTravel=t.travel||0,e.userData.baseLift=t.lift||0,e.userData.id=i.id,e.userData.signature=JSON.stringify(t),Bc(e,i.occupiedSlots),e}const Dg=new Xe().makeScale(0,0,0);function Bc(i,e){for(const t of i.userData.stock||[]){for(let n=0;n<t.entries.length;n++){const s=t.entries[n];t.mesh.setMatrixAt(n,!e||e.has(s.slot)?s.matrix:Dg)}t.mesh.instanceMatrix.needsUpdate=!0,t.mesh.boundingSphere=null,t.mesh.boundingBox=null}}function Gr(i,e,t,n=0){i.userData.beltTexture&&(i.userData.beltTexture.offset.x=-e),i.userData.tipper&&(i.userData.tipper.rotation.x=-tn.degToRad(Math.max(0,Math.min(110,i.userData.baseTilt+n)))),i.userData.slide&&(i.userData.slide.position.x=Math.sin(e*.3)*1.6),i.userData.robotArm&&(i.userData.robotArm.rotation.y=Math.sin(e*.3)*.18),i.userData.fork&&(i.userData.fork.position.z=n),i.userData.carriage&&(i.userData.carriage.position.x=e-i.userData.baseTravel),i.userData.lift&&(i.userData.lift.position.y=t-i.userData.baseLift)}function Lg(i=globalThis.crypto){if(typeof(i==null?void 0:i.randomUUID)=="function")return i.randomUUID();const e=new Uint8Array(16);if(typeof(i==null?void 0:i.getRandomValues)=="function")i.getRandomValues(e);else for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=Array.from(e,n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const Ig={width:40,depth:28};function Ug(i){if(![1,2].includes(i.version)||!Array.isArray(i.objects)||i.objects.length>150)throw Error("场景最多支持150个设备");const e={...Ig,...i.floor};for(const r of["width","depth"])if(!Number.isFinite(e[r])||e[r]<10||e[r]>120)throw Error("厂房尺寸需要在10~120米之间");const t=new Set;let n=0;const s=i.objects.map(r=>{const a=JSON.parse(JSON.stringify(r));if(!ks[a.type]||typeof a.id!="string"||t.has(a.id)||typeof a.name!="string"||!/^#[0-9a-f]{6}$/i.test(a.color)||typeof a.visible!="boolean")throw Error("设备字段无效");t.add(a.id);for(const h of["position","rotation","scale"])if(!Array.isArray(a[h])||a[h].length!==3||!a[h].every(l=>Number.isFinite(l)&&Math.abs(l)<=1e4)||h==="scale"&&a[h].some(l=>l<=0))throw Error("变换数值无效");for(const h of["roughness","metalness"])if(!Number.isFinite(a[h])||a[h]<0||a[h]>1)throw Error("材质数值无效");a.type==="binRack"&&(a.name=a.name.replace(/^(第\s*\d+\s*)排料框库$/,"$1列料框库")),a.params={...ks[a.type],...a.params};for(const[h,l,c,u,p]of Cg[a.type])if(!Number.isFinite(a.params[h])||a.params[h]<c||a.params[h]>u||p===1&&!Number.isInteger(a.params[h]))throw Error(`${l}超出范围`);for(const h of Object.keys(ks[a.type]))if(typeof ks[a.type][h]=="boolean"&&typeof a.params[h]!="boolean")throw Error("设备开关无效");if(a.type==="stacker"&&a.params.lift>a.params.height-.2)throw Error("载货台超出立柱高度");const o=a.params;return n+=a.type==="shuttle"?o.bays*o.rows*o.levels:a.type==="barRack"?o.bays*o.lanes*o.levels:a.type==="binRack"?o.smallBays*o.smallLevels+o.largeBays*o.largeLevels:["rack","exhibitRack"].includes(a.type)?o.bays*o.levels:0,a});if(n>12e3)throw Error("单个方案最多支持12000个库位");return{version:2,id:typeof i.id=="string"?i.id:Lg(),name:typeof i.name=="string"?i.name:"导入场景",floor:e,objects:s,seed:Number.isInteger(i.seed)?i.seed:2026}}function Ng(i){if(i==="exhibition")throw Error("此场景暂未公开");if(!["general","hardware"].includes(i))throw Error("未知的演示场景");return Ug(structuredClone(xg))}function Fg(i,{kind:e,onState:t=()=>{},onPick:n=()=>{},onError:s=()=>{}}){const r=Ng(e),a=T0(r.objects.filter(v=>v.type==="binRack"),"A",r.floor.exitReserve||10);a&&Object.assign(r.floor,P0(a,r.objects));const o=new xc;o.background=new ze("#717b78"),o.fog=new no("#717b78",.006);const h=new m0({antialias:!0,powerPreference:"high-performance"});h.toneMapping=Ga,h.toneMappingExposure=1,h.shadowMap.type=jl,i.appendChild(h.domElement);const l=new Bt(42,1,.1,500),c=new eg(l,h.domElement);c.enableDamping=!0,c.dampingFactor=.08,c.minDistance=2,c.maxDistance=150,c.maxPolarAngle=Math.PI*.49;const u=new Fa(h),p=new q0,m=u.fromScene(p,.04);o.environment=m.texture,o.environmentIntensity=.6,p.dispose(),u.dispose(),o.add(new bu("#e9eee9","#525450",.8));const M=new tl("#fff0e2",2.35);M.name="studio-sun",M.castShadow=!0,M.shadow.mapSize.set(2048,2048),o.add(M,M.target);const S=new tl("#d7e8ed",.75);S.position.set(-12,9,-10),o.add(S);const f=new $e(new zn(2e3,2e3),new xt({color:"#343d3e",roughness:.92}));f.rotation.x=-Math.PI/2,f.position.y=-.28,f.receiveShadow=!0,o.add(f);const d=new St,E=r.floor,w=h.capabilities.getMaxAnisotropy(),b=new $e(new Ht(E.width,.25,E.depth),new ao({color:"#b3bbb4",map:j0(E.width,E.depth,w),bumpMap:J0(E.width,E.depth,w),bumpScale:.006,roughness:.84,roughnessMap:$0(E.width,E.depth,w),metalness:.02,clearcoat:.12,clearcoatRoughness:.58}));b.position.set(E.centerX||0,-.125,E.centerZ||0),b.receiveShadow=!0,d.add(b);const C=Math.max(7,...r.objects.map(v=>v.type==="binRack"?Math.max(v.params.smallLevels*v.params.smallStep,v.params.largeLevels*v.params.largeStep)+.2:v.params.height||3))+2,y=K0(E,C,{wallsVisible:!1});d.add(y),o.add(d),Z0(o,E);const x=new Map,A=new Map,_=r.objects;let g=Dl(_,{pose:v=>{var F;return(F=x.get(v))==null?void 0:F.userData.pose},notify:v=>t({message:v})}),T=(g==null?void 0:g.state)||Wr(_,2026),L="",P="entrance";for(const v of _.filter(F=>F.type==="binRack"))v.binSizes=T.slots.filter(F=>F.deviceId===v.id).map(F=>F.size);for(const v of _){const F=Pg(v);F.userData.pose={travel:v.params.travel||0,lift:v.params.lift||0,extension:0},F.position.fromArray(v.position),F.rotation.set(...v.rotation.map(tn.degToRad)),F.scale.fromArray(v.scale),F.visible=v.visible,x.set(v.id,F),o.add(F),v.type==="binRack"&&F.add(C0(v,_.filter(V=>V.type==="binRack").indexOf(v)))}a&&d.add(A0(a));let I=!1,z=!1,B,X=0,k=0,W=performance.now(),ee=0,oe=0,pe=!0,we=null;const Re=()=>{for(const v of _){const F=new Set(T.slots.filter(V=>V.deviceId===v.id&&V.occupied&&!0).map(V=>V.index));Bc(x.get(v.id),F)}pe=!0};Re();const De=new kt;for(const v of x.values())De.expandByObject(v);const Z=De.getCenter(new N),K=De.getSize(new N),he=Math.max(K.x,K.z,K.y*2,8);function J(v){L="",c.target.copy(v.target),l.position.copy(v.position),c.maxDistance=350,l.near=.1,l.far=500,l.updateProjectionMatrix(),c.update(),pe=!0}function le(){P="overview",J(a?Il(a,l.aspect):{target:Z,position:Z.clone().add(new N(1,.7,1).normalize().multiplyScalar(he*1.8))})}function Ne(){P="entrance",a&&J(Ll(a,l.aspect))}function at(v){const F=x.get(v);if(!F)return;const V=Nl(F),$=Math.max(V.size.length()/2,.8),Y=$/(Math.sin(tn.degToRad(l.fov/2))*Math.min(l.aspect,1))*1.2,_e=F.userData.carriage?new N(-.2,.3,1).normalize():l.position.clone().sub(c.target).normalize();_e.lengthSq()<.01&&_e.set(1,.6,1).normalize(),J({target:V.center,position:V.center.clone().addScaledVector(_e,Y)}),P=null}let U;const je=()=>{const v=i.clientWidth,F=i.clientHeight;if(!(!v||!F)){if(h.setSize(v,F),l.aspect=v/F,l.updateProjectionMatrix(),U==null||U.resize(v,F),P&&a){const V=P==="overview"?Il(a,l.aspect):Ll(a,l.aspect);J(V)}pe=!0}};h.shadowMap.enabled=!0,je(),U=Y0(h,o,l),je(),a?Ne():le();const Ie=new ResizeObserver(je);Ie.observe(i),c.addEventListener("start",()=>{P=null,L=""}),c.addEventListener("change",()=>{pe=!0});const Ae=new Pu,me=new Ee;let Ye;const ge=v=>{Ye={x:v.clientX,y:v.clientY}},Fe=v=>{if(!Ye||Math.hypot(v.clientX-Ye.x,v.clientY-Ye.y)>5)return;const F=h.domElement.getBoundingClientRect();me.set((v.clientX-F.left)/F.width*2-1,-(v.clientY-F.top)/F.height*2+1),Ae.setFromCamera(me,l);const V=Ae.intersectObjects([...x.values()],!0)[0];let $=V==null?void 0:V.object;for(;$&&!_.some(Y=>Y.id===$.userData.id);)$=$.parent;we=_.find(Y=>Y.id===($==null?void 0:$.userData.id))||null,n(we?{name:we.name,type:we.type}:null)};h.domElement.addEventListener("pointerdown",ge),h.domElement.addEventListener("pointerup",Fe);const ot=()=>{document.hidden&&(g==null||g.pause(),I=!1,t({playing:!1,message:"页面进入后台，动画已暂停。"}),W=performance.now()),pe=!0};document.addEventListener("visibilitychange",ot);const et=v=>{v.preventDefault(),I=!1,s("显卡上下文已丢失，请刷新页面后重试。")};h.domElement.addEventListener("webglcontextlost",et);function D(v){if(z)return;B=requestAnimationFrame(D);const F=Math.min((v-W)/1e3,.05);if(W=v,!document.hidden){if(c.update(),L&&(D0(l,c,Nl(x.get(L)).center,F),pe=!0),I){if(X+=F,g){g.advance(F).then(V=>{V&&!z&&Re()}).catch(V=>{g.pause(),I=!1,s(V.message)});for(const V of T.tasks){const $=x.get(V.deviceId);$&&Un(V)&&(Gr($,V.pose.travel,V.pose.lift,V.pose.extension),$.userData.pose={...V.pose});let Y=A.get(V.code);V.cargoState!=="rack"&&!V.collected?(Y||(Y=x0(V.geometry,V.cargo.boxCode),o.add(Y),A.set(V.code,Y)),Y.position.fromArray(V.type==="inbound"?E0(V):Ic(V))):Y&&(o.remove(Y),ji(Y),A.delete(V.code))}I=g.playing}else{Math.floor(X)>k&&(qc(T,_,Math.floor(X)-k),k=Math.floor(X),Re());for(const V of _){if(!T.devices[V.id])continue;const $=jc(V,X);Gr(x.get(V.id),$.travel,$.lift,$.extension)}}pe=!0}pe&&(U.invalidate(),U.render(I),pe=!1,oe++),v-ee>1e3&&(t({playing:I,elapsed:Math.floor(X),devices:_.length,slots:T.slots.length,occupied:T.slots.filter(V=>V.occupied).length,fps:Math.round(oe*1e3/(v-ee||1e3)),cycles:(g==null?void 0:g.status.cycles)||0,tasks:g?T.tasks.slice(0,8).map(V=>({code:V.code,stage:V.stage,progress:V.progress,type:V.type,boxCode:V.cargo.boxCode})):[],stage:g?g.status.message:"设备运动与模拟移库",progress:0}),oe=0,ee=v)}}return B=requestAnimationFrame(D),{toggle:async()=>{g?(g.playing?g.pause():g.start(),I=g.playing):I=!I,pe=!0,t({playing:I})},overview:le,entrance:Ne,devices:_.filter(v=>v.type==="stacker").map(v=>({id:v.id,name:v.name})),follow:v=>{v&&at(v),L=v},toggleFactory:()=>(y.visible=!y.visible,pe=!0,y.visible),focus:()=>{we&&at(we.id)},reset:()=>{I=!1,g==null||g.dispose();for(const v of A.values())o.remove(v),ji(v);A.clear(),X=0,k=0,g=Dl(_,{pose:v=>{var F;return(F=x.get(v))==null?void 0:F.userData.pose},notify:v=>t({message:v})}),T=(g==null?void 0:g.state)||Wr(_,2026);for(const v of _){const F=x.get(v.id);F.userData.pose={travel:v.params.travel||0,lift:v.params.lift||0,extension:0},Gr(F,F.userData.pose.travel,F.userData.pose.lift,0)}Re(),a?Ne():le(),t({playing:!1,elapsed:0,cycles:0,tasks:[],progress:0,message:"演示已重置。"})},dispose:()=>{var v;z=!0,g==null||g.dispose();for(const F of A.values())ji(F);U.dispose(),cancelAnimationFrame(B),Ie.disconnect(),document.removeEventListener("visibilitychange",ot),h.domElement.removeEventListener("pointerdown",ge),h.domElement.removeEventListener("pointerup",Fe),h.domElement.removeEventListener("webglcontextlost",et),c.dispose();for(const F of x.values())ji(F);f.geometry.dispose(),f.material.dispose(),ji(d),m.dispose(),(v=M.shadow.map)==null||v.dispose(),h.dispose(),h.domElement.remove()}}}export{Fg as startDemo};
