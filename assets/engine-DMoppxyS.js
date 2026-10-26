const jc=["stacker","rgv","agv","shuttleCar","conveyor","turn","robot","machine","exhibitTransfer","exhibitRobot","exhibitAgv","exhibitHood"];function Zc(i){const e=i.params;return i.type==="barRack"?e.bays*e.lanes*e.levels:i.type==="shuttle"?e.bays*e.rows*e.levels:i.type==="binRack"?e.smallBays*e.smallLevels+e.largeBays*e.largeLevels:["rack","exhibitRack"].includes(i.type)?e.bays*e.levels:0}function Un(i){let e=2166136261;for(const t of i)e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0}const us=[["SKU-001","电机组件"],["SKU-002","铝型材"],["SKU-003","标准紧固件"],["SKU-004","传动轴"],["SKU-005","包装辅料"]];function Kr(i,e=2026){const t=[],n={};let s=0;for(const r of i){const a=r.params;for(let o=0;o<Zc(r);o++){const h=Un(`${e}:${r.id}:${o}`),l=r.type==="exhibitRack"&&(o%a.bays+1===a.liftBay||o<a.bays&&o+1===a.exitBay)?!1:r.initialOccupiedSlots?r.initialOccupiedSlots.includes(o):h%100<68;t.push({id:`${r.id}:${o}`,deviceId:r.id,index:o,location:r.type==="binRack"?`${r.name} / ${o<a.smallBays*a.smallLevels?"小料框":"大料筐"} / ${String(o<a.smallBays*a.smallLevels?Math.floor(o/a.smallLevels)+1:a.smallBays+Math.floor((o-a.smallBays*a.smallLevels)/a.largeLevels)+1).padStart(2,"0")}排 / ${String(o<a.smallBays*a.smallLevels?o%a.smallLevels+1:(o-a.smallBays*a.smallLevels)%a.largeLevels+1).padStart(2,"0")}层`:`${r.name} / ${String(o+1).padStart(4,"0")}`,occupied:l,sku:l?us[h%us.length][0]:"",product:l?us[h%us.length][1]:"",quantity:l?1+h%24:0,batch:l?`B202610-${String(h%90+10)}`:""})}jc.includes(r.type)&&(s++,n[r.id]={id:r.id,code:`DEV-${String(s).padStart(3,"0")}`,status:r.type==="machine"?"maintenance":"idle",completed:0,temperature:25+Un(r.id)%9,power:0,travel:0,lift:1,alarm:""})}return{seed:e,elapsed:0,completed:0,slots:t,devices:n,tasks:[],events:[{time:0,message:"模拟库存与设备数据已生成"}]}}function Kc(i,e,t=1){var r;i.elapsed+=t;const n=new Map(e.map(a=>[a.id,a]));let s=!1;for(const[a,o]of Object.entries(i.devices)){const h=n.get(a);if(!h)continue;if(o.status==="fault"||o.status==="maintenance"){o.power=0;continue}o.status="running",o.temperature=+(29+Math.sin(i.elapsed/18+Un(a)%10)*3).toFixed(1),o.power=+(1.2+Math.abs(Math.sin(i.elapsed/9+Un(a)%7))*2.8).toFixed(2);const l=h.params.railLength||8;o.travel=+((l/2-2)*Math.sin(i.elapsed/8+Un(a)%5)).toFixed(2),o.lift=+(.5+((h.params.height||5)-1)*(.5+.5*Math.sin(i.elapsed/10))).toFixed(2)}for(const a of i.tasks.filter(o=>o.status==="running")){const o=i.devices[a.deviceId];if(!(!o||["fault","maintenance"].includes(o.status))&&(a.progress=Math.min(100,a.progress+t*20),a.progress===100)){const h=i.slots.find(c=>c.id===a.source),l=i.slots.find(c=>c.id===a.target);if(h!=null&&h.occupied&&l&&!l.occupied){for(const c of["sku","product","quantity","batch",...i.source==="SQL"?["boxCode","boxId","size","items"]:[]])l[c]=h[c],h[c]=c==="quantity"?null:c==="items"?[]:c==="boxId"?null:c==="size"?0:"";if(i.source==="SQL")for(const c of i.inventory)c.boxId===l.boxId&&(c.locationId=l.locationId);h.occupied=!1,l.occupied=!0,s=!0,i.completed++,o.completed++,a.status="completed",i.events.unshift({time:i.elapsed,message:`${a.code} 移库完成`})}else a.status="cancelled"}}if(!i.tasks.some(a=>a.status==="running")&&i.elapsed%3===0){const a=Object.values(i.devices).filter(p=>!["fault","maintenance"].includes(p.status)),o=a[Math.floor(i.elapsed/3)%a.length],h=o?(r=n.get(o.id))==null?void 0:r.aisle:null,l=p=>{var m;return!h||((m=n.get(p.deviceId))==null?void 0:m.aisle)===h},c=i.slots.find(p=>p.occupied&&l(p)),u=[...i.slots].reverse().find(p=>!p.occupied&&l(p));o&&c&&u&&(i.tasks.unshift({code:`MOCK-${String(i.completed+1).padStart(4,"0")}`,source:c.id,target:u.id,deviceId:o.id,from:c.location,to:u.location,status:"running",progress:0}),i.events.unshift({time:i.elapsed,message:`模拟移库任务分配给 ${o.code}`}))}return i.tasks=i.tasks.slice(0,30),i.events=i.events.slice(0,40),s}function Jc(i,e){if(i.type==="exhibitTransfer")return{travel:e*.12,lift:0,extension:0};if(i.type==="exhibitHood"){const n=e%16;let s=n<3?0:n<7?(n-3)/4:n<10?1:n<14?1-(n-10)/4:0;return s=s*s*(3-2*s),{travel:0,lift:0,extension:90*s-(i.params.angle||0)}}if(i.type==="stacker"){const n=e%16,s=n>=5&&n<11,r=((i.params.railLength||8)/2-2)*Math.sin(Math.floor(e/16)*.7+Un(i.id)%5),a=((i.params.railLength||8)/2-2)*Math.sin((Math.floor(e/16)-1)*.7+Un(i.id)%5),o=Math.min(n/5,1),h=o*o*(3-2*o);return{travel:a+(r-a)*h,lift:.5+((i.params.height||5)-1)*(.5+.4*(Math.sin((Math.floor(e/16)-1)*.9)+(Math.sin(Math.floor(e/16)*.9)-Math.sin((Math.floor(e/16)-1)*.9))*h)),extension:s?Math.sin((n-5)/6*Math.PI)*.6*(Math.floor(e/16)%2?1:-1):0}}const t=Un(i.id)%5;return{travel:((i.params.railLength||8)/2-2)*Math.sin(e/8+t),lift:.5+((i.params.height||5)-1)*(.5+.5*Math.sin(e/10))}}const Qc=(i,e,t)=>i+(e-i)*t;function ur(i){var e;return i.type==="inbound"?i.returnRoute:(e=i.station)==null?void 0:e.route}function ds(i){return i.type==="inbound"?0:9}function Xl(i,e){return Math.hypot(i[0]-e[0],i[2]-e[2])}function Ao(i,e){const t=i.slice(1).map((r,a)=>Xl(i[a],r));let s=t.reduce((r,a)=>r+a,0)*e;for(let r=0;r<t.length;r++){if(s<=t[r]&&t[r]>0)return{leg:r,position:i[r].map((a,o)=>Qc(a,i[r+1][o],s/t[r]))};s-=t[r]}return{leg:t.length-1,position:i.at(-1)}}function $c(i,e){const t=(n,s)=>[Math.min(n[0][s],n[1][s]),Math.max(n[0][s],n[1][s])];return[0,2].every(n=>{const s=t(i,n),r=t(e,n);return s[0]<=r[1]+.05&&r[0]<=s[1]+.05})}function Yl(i,e,t){const n=ur(i);if(!n)return!0;const s=ds(i),r=Math.min(1,t/i.durations[s]),a=i.type==="inbound"?r:r*r*(3-2*r),o=Ao(n,a),h=Math.max(i.geometry.width,i.geometry.depth)+.2,l=o.leg===0&&Xl(o.position,n[1])>h,c=[];if(!l){o.leg>0&&c.push([o.position,n[o.leg+1]]);for(let u=o.leg+1;u<n.length-1;u++)c.push(n.slice(u,u+2))}for(const u of e.tasks){if(u===i||u.collected)continue;if(!(JSON.stringify(ur(u))===JSON.stringify(n))&&u.status==="running"&&u.phase===ds(u)&&(u.transportSections||[]).some(m=>c.some(x=>$c(m,x))))return!1;if(u.cargoState==="conveyor"){const m=ur(u);if(!m)continue;const x=u.status==="completed"||u.returnRouteDone?1:u.phase===ds(u)?Math.min(1,u.phaseElapsed/u.durations[ds(u)]):0,M=u.type==="inbound"?x:x*x*(3-2*x),f=Ao(m,M).position,d=(i.geometry.width+u.geometry.width)/2+.06,E=(i.geometry.depth+u.geometry.depth)/2+.06;if(Math.abs(f[0]-o.position[0])<d&&Math.abs(f[2]-o.position[2])<E)return!1}}return i.transportSections=c,!0}function ql(i){i.transportSections=[],i.routeReserved=!1}function In(i){return i.status!=="running"?!1:i.type==="outbound"?i.phase<9:i.type==="inbound"?!i.waitingForStacker&&(!i.returnRoute||i.phase>0):!1}function Ya(i){return["queued","submitting"].includes(i.status)||In(i)}const qa=10;function jl(i){return i.tasks.filter(e=>["outbound","inbound"].includes(e.type)&&!e.collected&&!["cancelled","failed"].includes(e.status)&&!(e.type==="inbound"&&e.cargoState==="rack")).length}function Zl(i,e,t,n){if(!i.serverTaskId)return!1;const s=e===t&&!i.dbPickupDone?"pickup":e===n&&!i.dbCompleteDone?"complete":null;return s?(i.needsDbAction=s,i.stage="等待数据库确认",!0):!1}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ja="180",Ti={ROTATE:0,DOLLY:1,PAN:2},bi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},eh=0,Ro=1,th=2,Kl=1,Jl=2,Mn=3,Fn=0,Dt=1,Sn=2,Mt=0,wi=1,Jr=2,Co=3,Po=4,Ql=5,tn=100,nh=101,ih=102,sh=103,rh=104,Ji=200,ah=201,oh=202,lh=203,Qr=204,$r=205,ea=206,ch=207,ta=208,hh=209,uh=210,dh=211,fh=212,ph=213,mh=214,na=0,ia=1,sa=2,Ri=3,ra=4,aa=5,oa=6,la=7,Za=0,gh=1,vh=2,Nn=0,$l=1,ec=2,tc=3,Ka=4,nc=5,ic=6,sc=7,rc=300,Ci=301,Pi=302,ca=303,ha=304,rr=306,On=1e3,Jn=1001,ua=1002,Et=1003,xh=1004,fs=1005,sn=1006,dr=1007,Qn=1008,rn=1009,ac=1010,oc=1011,ns=1012,Ja=1013,ei=1014,un=1015,It=1016,Qa=1017,$a=1018,Di=1020,lc=35902,cc=35899,hc=1021,uc=1022,Zt=1023,is=1026,Li=1027,eo=1028,to=1029,dc=1030,no=1031,io=1033,Ys=33776,qs=33777,js=33778,Zs=33779,da=35840,fa=35841,pa=35842,ma=35843,ga=36196,va=37492,xa=37496,_a=37808,Ma=37809,Sa=37810,ya=37811,ba=37812,Ea=37813,Ta=37814,wa=37815,Aa=37816,Ra=37817,Ca=37818,Pa=37819,Da=37820,La=37821,Ua=36492,Ia=36494,Na=36495,Fa=36283,Oa=36284,Ba=36285,za=36286,_h=3200,Mh=3201,ar=0,Sh=1,Ln="",yt="srgb",Ui="srgb-linear",er="linear",Qe="srgb",ii=7680,Do=519,yh=512,bh=513,Eh=514,fc=515,Th=516,wh=517,Ah=518,Rh=519,ka=35044,Ch=35048,Lo="300 es",dn=2e3,tr=2001;class ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Uo=1234567;const es=Math.PI/180,ss=180/Math.PI;function yn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function We(i,e,t){return Math.max(e,Math.min(t,i))}function so(i,e){return(i%e+e)%e}function Ph(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Dh(i,e,t){return i!==e?(t-i)/(e-i):0}function ts(i,e,t){return(1-t)*i+t*e}function Lh(i,e,t,n){return ts(i,e,1-Math.exp(-t*n))}function Uh(i,e=1){return e-Math.abs(so(i,e*2)-e)}function Ih(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Nh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Fh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Oh(i,e){return i+Math.random()*(e-i)}function Bh(i){return i*(.5-Math.random())}function zh(i){i!==void 0&&(Uo=i);let e=Uo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kh(i){return i*es}function Hh(i){return i*ss}function Vh(i){return(i&i-1)===0&&i!==0}function Gh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xh(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),h=a(t/2),l=r((e+n)/2),c=a((e+n)/2),u=r((e-n)/2),p=a((e-n)/2),m=r((n-e)/2),x=a((n-e)/2);switch(s){case"XYX":i.set(o*c,h*u,h*p,o*l);break;case"YZY":i.set(h*p,o*c,h*u,o*l);break;case"ZXZ":i.set(h*u,h*p,o*c,o*l);break;case"XZX":i.set(o*c,h*x,h*m,o*l);break;case"YXY":i.set(h*m,o*c,h*x,o*l);break;case"ZYZ":i.set(h*x,h*m,o*c,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $e(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const an={DEG2RAD:es,RAD2DEG:ss,generateUUID:yn,clamp:We,euclideanModulo:so,mapLinear:Ph,inverseLerp:Dh,lerp:ts,damp:Lh,pingpong:Uh,smoothstep:Ih,smootherstep:Nh,randInt:Fh,randFloat:Oh,randFloatSpread:Bh,seededRandom:zh,degToRad:kh,radToDeg:Hh,isPowerOfTwo:Vh,ceilPowerOfTwo:Gh,floorPowerOfTwo:Wh,setQuaternionFromProperEuler:Xh,normalize:$e,denormalize:nn};class me{constructor(e=0,t=0){me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let h=n[s+0],l=n[s+1],c=n[s+2],u=n[s+3];const p=r[a+0],m=r[a+1],x=r[a+2],M=r[a+3];if(o===0){e[t+0]=h,e[t+1]=l,e[t+2]=c,e[t+3]=u;return}if(o===1){e[t+0]=p,e[t+1]=m,e[t+2]=x,e[t+3]=M;return}if(u!==M||h!==p||l!==m||c!==x){let f=1-o;const d=h*p+l*m+c*x+u*M,E=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){const C=Math.sqrt(T),y=Math.atan2(C,d*E);f=Math.sin(f*y)/C,o=Math.sin(o*y)/C}const b=o*E;if(h=h*f+p*b,l=l*f+m*b,c=c*f+x*b,u=u*f+M*b,f===1-o){const C=1/Math.sqrt(h*h+l*l+c*c+u*u);h*=C,l*=C,c*=C,u*=C}}e[t]=h,e[t+1]=l,e[t+2]=c,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],h=n[s+1],l=n[s+2],c=n[s+3],u=r[a],p=r[a+1],m=r[a+2],x=r[a+3];return e[t]=o*x+c*u+h*m-l*p,e[t+1]=h*x+c*p+l*u-o*m,e[t+2]=l*x+c*m+o*p-h*u,e[t+3]=c*x-o*u-h*p-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,l=o(n/2),c=o(s/2),u=o(r/2),p=h(n/2),m=h(s/2),x=h(r/2);switch(a){case"XYZ":this._x=p*c*u+l*m*x,this._y=l*m*u-p*c*x,this._z=l*c*x+p*m*u,this._w=l*c*u-p*m*x;break;case"YXZ":this._x=p*c*u+l*m*x,this._y=l*m*u-p*c*x,this._z=l*c*x-p*m*u,this._w=l*c*u+p*m*x;break;case"ZXY":this._x=p*c*u-l*m*x,this._y=l*m*u+p*c*x,this._z=l*c*x+p*m*u,this._w=l*c*u-p*m*x;break;case"ZYX":this._x=p*c*u-l*m*x,this._y=l*m*u+p*c*x,this._z=l*c*x-p*m*u,this._w=l*c*u+p*m*x;break;case"YZX":this._x=p*c*u+l*m*x,this._y=l*m*u+p*c*x,this._z=l*c*x-p*m*u,this._w=l*c*u-p*m*x;break;case"XZY":this._x=p*c*u-l*m*x,this._y=l*m*u-p*c*x,this._z=l*c*x+p*m*u,this._w=l*c*u+p*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],l=t[2],c=t[6],u=t[10],p=n+o+u;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(c-h)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(c-h)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(h+c)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(h+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,l=t._z,c=t._w;return this._x=n*c+a*o+s*l-r*h,this._y=s*c+a*h+r*o-n*l,this._z=r*c+a*l+n*h-s*o,this._w=a*c-n*o-s*h-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const h=1-o*o;if(h<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(h),c=Math.atan2(l,o),u=Math.sin((1-t)*c)/l,p=Math.sin(t*c)/l;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Io.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Io.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,l=2*(a*s-o*n),c=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+h*l+a*u-o*c,this.y=n+h*c+o*l-r*u,this.z=s+h*u+r*c-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-n*h,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fr.copy(this).projectOnVector(e),this.sub(fr)}reflect(e){return this.sub(fr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fr=new N,Io=new fn;class He{constructor(e,t,n,s,r,a,o,h,l){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,h,l)}set(e,t,n,s,r,a,o,h,l){const c=this.elements;return c[0]=e,c[1]=s,c[2]=o,c[3]=t,c[4]=r,c[5]=h,c[6]=n,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],h=n[6],l=n[1],c=n[4],u=n[7],p=n[2],m=n[5],x=n[8],M=s[0],f=s[3],d=s[6],E=s[1],T=s[4],b=s[7],C=s[2],y=s[5],_=s[8];return r[0]=a*M+o*E+h*C,r[3]=a*f+o*T+h*y,r[6]=a*d+o*b+h*_,r[1]=l*M+c*E+u*C,r[4]=l*f+c*T+u*y,r[7]=l*d+c*b+u*_,r[2]=p*M+m*E+x*C,r[5]=p*f+m*T+x*y,r[8]=p*d+m*b+x*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],c=e[8];return t*a*c-t*o*l-n*r*c+n*o*h+s*r*l-s*a*h}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],c=e[8],u=c*a-o*l,p=o*h-c*r,m=l*r-a*h,x=t*u+n*p+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/x;return e[0]=u*M,e[1]=(s*l-c*n)*M,e[2]=(o*n-s*a)*M,e[3]=p*M,e[4]=(c*t-s*h)*M,e[5]=(s*r-o*t)*M,e[6]=m*M,e[7]=(n*h-l*t)*M,e[8]=(a*t-n*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const h=Math.cos(r),l=Math.sin(r);return this.set(n*h,n*l,-n*(h*a+l*o)+a+e,-s*l,s*h,-s*(-l*a+h*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(pr.makeScale(e,t)),this}rotate(e){return this.premultiply(pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new He;function pc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Yh(){const i=nr("canvas");return i.style.display="block",i}const No={};function rs(i){i in No||(No[i]=!0,console.warn(i))}function qh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Fo=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Oo=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jh(){const i={enabled:!0,workingColorSpace:Ui,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qe&&(s.r=bn(s.r),s.g=bn(s.g),s.b=bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return rs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return rs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ui]:{primaries:e,whitePoint:n,transfer:er,toXYZ:Fo,fromXYZ:Oo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:Qe,toXYZ:Fo,fromXYZ:Oo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),i}const qe=jh();function bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ai(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let si;class Zh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{si===void 0&&(si=nr("canvas")),si.width=e.width,si.height=e.height;const s=si.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=si}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=nr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=bn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bn(t[n]/255)*255):t[n]=bn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Kh=0;class ro{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=yn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(mr(s[a].image)):r.push(mr(s[a]))}else r=mr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function mr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jh=0;const gr=new N;class _t extends ti{constructor(e=_t.DEFAULT_IMAGE,t=_t.DEFAULT_MAPPING,n=Jn,s=Jn,r=sn,a=Qn,o=Zt,h=rn,l=_t.DEFAULT_ANISOTROPY,c=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=yn(),this.name="",this.source=new ro(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(gr).x}get height(){return this.source.getSize(gr).y}get depth(){return this.source.getSize(gr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case On:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case On:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_t.DEFAULT_IMAGE=null;_t.DEFAULT_MAPPING=rc;_t.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,s=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const h=e.elements,l=h[0],c=h[4],u=h[8],p=h[1],m=h[5],x=h[9],M=h[2],f=h[6],d=h[10];if(Math.abs(c-p)<.01&&Math.abs(u-M)<.01&&Math.abs(x-f)<.01){if(Math.abs(c+p)<.1&&Math.abs(u+M)<.1&&Math.abs(x+f)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,b=(m+1)/2,C=(d+1)/2,y=(c+p)/4,_=(u+M)/4,A=(x+f)/4;return T>b&&T>C?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=y/n,r=_/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=y/s,r=A/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=_/r,s=A/r),this.set(n,s,r,t),this}let E=Math.sqrt((f-x)*(f-x)+(u-M)*(u-M)+(p-c)*(p-c));return Math.abs(E)<.001&&(E=1),this.x=(f-x)/E,this.y=(u-M)/E,this.z=(p-c)/E,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qh extends ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new _t(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ro(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class At extends Qh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class mc extends _t{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $h extends _t{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jt{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(r,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ps.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ps.copy(n.boundingBox)),ps.applyMatrix4(e.matrixWorld),this.union(ps)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),ms.subVectors(this.max,zi),ri.subVectors(e.a,zi),ai.subVectors(e.b,zi),oi.subVectors(e.c,zi),Tn.subVectors(ai,ri),wn.subVectors(oi,ai),Gn.subVectors(ri,oi);let t=[0,-Tn.z,Tn.y,0,-wn.z,wn.y,0,-Gn.z,Gn.y,Tn.z,0,-Tn.x,wn.z,0,-wn.x,Gn.z,0,-Gn.x,-Tn.y,Tn.x,0,-wn.y,wn.x,0,-Gn.y,Gn.x,0];return!vr(t,ri,ai,oi,ms)||(t=[1,0,0,0,1,0,0,0,1],!vr(t,ri,ai,oi,ms))?!1:(gs.crossVectors(Tn,wn),t=[gs.x,gs.y,gs.z],vr(t,ri,ai,oi,ms))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const mn=[new N,new N,new N,new N,new N,new N,new N,new N],Qt=new N,ps=new Jt,ri=new N,ai=new N,oi=new N,Tn=new N,wn=new N,Gn=new N,zi=new N,ms=new N,gs=new N,Wn=new N;function vr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Wn.fromArray(i,r);const o=s.x*Math.abs(Wn.x)+s.y*Math.abs(Wn.y)+s.z*Math.abs(Wn.z),h=e.dot(Wn),l=t.dot(Wn),c=n.dot(Wn);if(Math.max(-Math.max(h,l,c),Math.min(h,l,c))>o)return!1}return!0}const eu=new Jt,ki=new N,xr=new N;class os{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):eu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ki.subVectors(e,this.center);const t=ki.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ki,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ki.copy(e.center).add(xr)),this.expandByPoint(ki.copy(e.center).sub(xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const gn=new N,_r=new N,vs=new N,An=new N,Mr=new N,xs=new N,Sr=new N;class ao{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gn.copy(this.origin).addScaledVector(this.direction,t),gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){_r.copy(e).add(t).multiplyScalar(.5),vs.copy(t).sub(e).normalize(),An.copy(this.origin).sub(_r);const r=e.distanceTo(t)*.5,a=-this.direction.dot(vs),o=An.dot(this.direction),h=-An.dot(vs),l=An.lengthSq(),c=Math.abs(1-a*a);let u,p,m,x;if(c>0)if(u=a*h-o,p=a*o-h,x=r*c,u>=0)if(p>=-x)if(p<=x){const M=1/c;u*=M,p*=M,m=u*(u+a*p+2*o)+p*(a*u+p+2*h)+l}else p=r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*h)+l;else p=-r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*h)+l;else p<=-x?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-h),r),m=-u*u+p*(p+2*h)+l):p<=x?(u=0,p=Math.min(Math.max(-r,-h),r),m=p*(p+2*h)+l):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-h),r),m=-u*u+p*(p+2*h)+l);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),m=-u*u+p*(p+2*h)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(_r).addScaledVector(vs,p),m}intersectSphere(e,t){gn.subVectors(e.center,this.origin);const n=gn.dot(this.direction),s=gn.dot(gn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,h=n+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,h;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),c>=0?(r=(e.min.y-p.y)*c,a=(e.max.y-p.y)*c):(r=(e.max.y-p.y)*c,a=(e.min.y-p.y)*c),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-p.z)*u,h=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,h=(e.min.z-p.z)*u),n>h||o>s)||((o>n||n!==n)&&(n=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,gn)!==null}intersectTriangle(e,t,n,s,r){Mr.subVectors(t,e),xs.subVectors(n,e),Sr.crossVectors(Mr,xs);let a=this.direction.dot(Sr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;An.subVectors(this.origin,e);const h=o*this.direction.dot(xs.crossVectors(An,xs));if(h<0)return null;const l=o*this.direction.dot(Mr.cross(An));if(l<0||h+l>a)return null;const c=-o*An.dot(Sr);return c<0?null:this.at(c/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ye{constructor(e,t,n,s,r,a,o,h,l,c,u,p,m,x,M,f){Ye.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,h,l,c,u,p,m,x,M,f)}set(e,t,n,s,r,a,o,h,l,c,u,p,m,x,M,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=h,d[2]=l,d[6]=c,d[10]=u,d[14]=p,d[3]=m,d[7]=x,d[11]=M,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ye().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/li.setFromMatrixColumn(e,0).length(),r=1/li.setFromMatrixColumn(e,1).length(),a=1/li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),h=Math.cos(s),l=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const p=a*c,m=a*u,x=o*c,M=o*u;t[0]=h*c,t[4]=-h*u,t[8]=l,t[1]=m+x*l,t[5]=p-M*l,t[9]=-o*h,t[2]=M-p*l,t[6]=x+m*l,t[10]=a*h}else if(e.order==="YXZ"){const p=h*c,m=h*u,x=l*c,M=l*u;t[0]=p+M*o,t[4]=x*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*c,t[9]=-o,t[2]=m*o-x,t[6]=M+p*o,t[10]=a*h}else if(e.order==="ZXY"){const p=h*c,m=h*u,x=l*c,M=l*u;t[0]=p-M*o,t[4]=-a*u,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*c,t[9]=M-p*o,t[2]=-a*l,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const p=a*c,m=a*u,x=o*c,M=o*u;t[0]=h*c,t[4]=x*l-m,t[8]=p*l+M,t[1]=h*u,t[5]=M*l+p,t[9]=m*l-x,t[2]=-l,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const p=a*h,m=a*l,x=o*h,M=o*l;t[0]=h*c,t[4]=M-p*u,t[8]=x*u+m,t[1]=u,t[5]=a*c,t[9]=-o*c,t[2]=-l*c,t[6]=m*u+x,t[10]=p-M*u}else if(e.order==="XZY"){const p=a*h,m=a*l,x=o*h,M=o*l;t[0]=h*c,t[4]=-u,t[8]=l*c,t[1]=p*u+M,t[5]=a*c,t[9]=m*u-x,t[2]=x*u-m,t[6]=o*c,t[10]=M*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tu,e,nu)}lookAt(e,t,n){const s=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Rn.crossVectors(n,Bt),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Rn.crossVectors(n,Bt)),Rn.normalize(),_s.crossVectors(Bt,Rn),s[0]=Rn.x,s[4]=_s.x,s[8]=Bt.x,s[1]=Rn.y,s[5]=_s.y,s[9]=Bt.y,s[2]=Rn.z,s[6]=_s.z,s[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],h=n[8],l=n[12],c=n[1],u=n[5],p=n[9],m=n[13],x=n[2],M=n[6],f=n[10],d=n[14],E=n[3],T=n[7],b=n[11],C=n[15],y=s[0],_=s[4],A=s[8],v=s[12],g=s[1],S=s[5],L=s[9],P=s[13],U=s[2],B=s[6],z=s[10],q=s[14],H=s[3],X=s[7],ee=s[11],oe=s[15];return r[0]=a*y+o*g+h*U+l*H,r[4]=a*_+o*S+h*B+l*X,r[8]=a*A+o*L+h*z+l*ee,r[12]=a*v+o*P+h*q+l*oe,r[1]=c*y+u*g+p*U+m*H,r[5]=c*_+u*S+p*B+m*X,r[9]=c*A+u*L+p*z+m*ee,r[13]=c*v+u*P+p*q+m*oe,r[2]=x*y+M*g+f*U+d*H,r[6]=x*_+M*S+f*B+d*X,r[10]=x*A+M*L+f*z+d*ee,r[14]=x*v+M*P+f*q+d*oe,r[3]=E*y+T*g+b*U+C*H,r[7]=E*_+T*S+b*B+C*X,r[11]=E*A+T*L+b*z+C*ee,r[15]=E*v+T*P+b*q+C*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],l=e[13],c=e[2],u=e[6],p=e[10],m=e[14],x=e[3],M=e[7],f=e[11],d=e[15];return x*(+r*h*u-s*l*u-r*o*p+n*l*p+s*o*m-n*h*m)+M*(+t*h*m-t*l*p+r*a*p-s*a*m+s*l*c-r*h*c)+f*(+t*l*u-t*o*m-r*a*u+n*a*m+r*o*c-n*l*c)+d*(-s*o*c-t*h*u+t*o*p+s*a*u-n*a*p+n*h*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],c=e[8],u=e[9],p=e[10],m=e[11],x=e[12],M=e[13],f=e[14],d=e[15],E=u*f*l-M*p*l+M*h*m-o*f*m-u*h*d+o*p*d,T=x*p*l-c*f*l-x*h*m+a*f*m+c*h*d-a*p*d,b=c*M*l-x*u*l+x*o*m-a*M*m-c*o*d+a*u*d,C=x*u*h-c*M*h-x*o*p+a*M*p+c*o*f-a*u*f,y=t*E+n*T+s*b+r*C;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const _=1/y;return e[0]=E*_,e[1]=(M*p*r-u*f*r-M*s*m+n*f*m+u*s*d-n*p*d)*_,e[2]=(o*f*r-M*h*r+M*s*l-n*f*l-o*s*d+n*h*d)*_,e[3]=(u*h*r-o*p*r-u*s*l+n*p*l+o*s*m-n*h*m)*_,e[4]=T*_,e[5]=(c*f*r-x*p*r+x*s*m-t*f*m-c*s*d+t*p*d)*_,e[6]=(x*h*r-a*f*r-x*s*l+t*f*l+a*s*d-t*h*d)*_,e[7]=(a*p*r-c*h*r+c*s*l-t*p*l-a*s*m+t*h*m)*_,e[8]=b*_,e[9]=(x*u*r-c*M*r-x*n*m+t*M*m+c*n*d-t*u*d)*_,e[10]=(a*M*r-x*o*r+x*n*l-t*M*l-a*n*d+t*o*d)*_,e[11]=(c*o*r-a*u*r-c*n*l+t*u*l+a*n*m-t*o*m)*_,e[12]=C*_,e[13]=(c*M*s-x*u*s+x*n*p-t*M*p-c*n*f+t*u*f)*_,e[14]=(x*o*s-a*M*s-x*n*h+t*M*h+a*n*f-t*o*f)*_,e[15]=(a*u*s-c*o*s+c*n*h-t*u*h-a*n*p+t*o*p)*_,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,h=e.z,l=r*a,c=r*o;return this.set(l*a+n,l*o-s*h,l*h+s*o,0,l*o+s*h,c*o+n,c*h-s*a,0,l*h-s*o,c*h+s*a,r*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,l=r+r,c=a+a,u=o+o,p=r*l,m=r*c,x=r*u,M=a*c,f=a*u,d=o*u,E=h*l,T=h*c,b=h*u,C=n.x,y=n.y,_=n.z;return s[0]=(1-(M+d))*C,s[1]=(m+b)*C,s[2]=(x-T)*C,s[3]=0,s[4]=(m-b)*y,s[5]=(1-(p+d))*y,s[6]=(f+E)*y,s[7]=0,s[8]=(x+T)*_,s[9]=(f-E)*_,s[10]=(1-(p+M))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=li.set(s[0],s[1],s[2]).length();const a=li.set(s[4],s[5],s[6]).length(),o=li.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],$t.copy(this);const l=1/r,c=1/a,u=1/o;return $t.elements[0]*=l,$t.elements[1]*=l,$t.elements[2]*=l,$t.elements[4]*=c,$t.elements[5]*=c,$t.elements[6]*=c,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=dn,h=!1){const l=this.elements,c=2*r/(t-e),u=2*r/(n-s),p=(t+e)/(t-e),m=(n+s)/(n-s);let x,M;if(h)x=r/(a-r),M=a*r/(a-r);else if(o===dn)x=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===tr)x=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=dn,h=!1){const l=this.elements,c=2/(t-e),u=2/(n-s),p=-(t+e)/(t-e),m=-(n+s)/(n-s);let x,M;if(h)x=1/(a-r),M=a/(a-r);else if(o===dn)x=-2/(a-r),M=-(a+r)/(a-r);else if(o===tr)x=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const li=new N,$t=new Ye,tu=new N(0,0,0),nu=new N(1,1,1),Rn=new N,_s=new N,Bt=new N,Bo=new Ye,zo=new fn;class Nt{constructor(e=0,t=0,n=0,s=Nt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],l=s[5],c=s[9],u=s[2],p=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(We(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zo.setFromEuler(this),this.setFromQuaternion(zo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nt.DEFAULT_ORDER="XYZ";class oo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let iu=0;const ko=new N,ci=new fn,vn=new Ye,Ms=new N,Hi=new N,su=new N,ru=new fn,Ho=new N(1,0,0),Vo=new N(0,1,0),Go=new N(0,0,1),Wo={type:"added"},au={type:"removed"},hi={type:"childadded",child:null},yr={type:"childremoved",child:null};class mt extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new N,t=new Nt,n=new fn,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new He}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.multiply(ci),this}rotateOnWorldAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.premultiply(ci),this}rotateX(e){return this.rotateOnAxis(Ho,e)}rotateY(e){return this.rotateOnAxis(Vo,e)}rotateZ(e){return this.rotateOnAxis(Go,e)}translateOnAxis(e,t){return ko.copy(e).applyQuaternion(this.quaternion),this.position.add(ko.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ho,e)}translateY(e){return this.translateOnAxis(Vo,e)}translateZ(e){return this.translateOnAxis(Go,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ms.copy(e):Ms.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(Hi,Ms,this.up):vn.lookAt(Ms,Hi,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),ci.setFromRotationMatrix(vn),this.quaternion.premultiply(ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wo),hi.child=e,this.dispatchEvent(hi),hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(au),yr.child=e,this.dispatchEvent(yr),yr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wo),hi.child=e,this.dispatchEvent(hi),hi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,su),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,ru,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,c=h.length;l<c;l++){const u=h[l];r(e.shapes,u)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),l=a(e.textures),c=a(e.images),u=a(e.shapes),p=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),h.length>0&&(n.materials=h),l.length>0&&(n.textures=l),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){const h=[];for(const l in o){const c=o[l];delete c.metadata,h.push(c)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}mt.DEFAULT_UP=new N(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new N,xn=new N,br=new N,_n=new N,ui=new N,di=new N,Xo=new N,Er=new N,Tr=new N,wr=new N,Ar=new it,Rr=new it,Cr=new it;class jt{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),en.subVectors(e,t),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){en.subVectors(s,t),xn.subVectors(n,t),br.subVectors(e,t);const a=en.dot(en),o=en.dot(xn),h=en.dot(br),l=xn.dot(xn),c=xn.dot(br),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const p=1/u,m=(l*h-o*c)*p,x=(a*c-o*h)*p;return r.set(1-m-x,x,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(e,t,n,s,r,a,o,h){return this.getBarycoord(e,t,n,s,_n)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,_n.x),h.addScaledVector(a,_n.y),h.addScaledVector(o,_n.z),h)}static getInterpolatedAttribute(e,t,n,s,r,a){return Ar.setScalar(0),Rr.setScalar(0),Cr.setScalar(0),Ar.fromBufferAttribute(e,t),Rr.fromBufferAttribute(e,n),Cr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ar,r.x),a.addScaledVector(Rr,r.y),a.addScaledVector(Cr,r.z),a}static isFrontFacing(e,t,n,s){return en.subVectors(n,t),xn.subVectors(e,t),en.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),en.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return jt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ui.subVectors(s,n),di.subVectors(r,n),Er.subVectors(e,n);const h=ui.dot(Er),l=di.dot(Er);if(h<=0&&l<=0)return t.copy(n);Tr.subVectors(e,s);const c=ui.dot(Tr),u=di.dot(Tr);if(c>=0&&u<=c)return t.copy(s);const p=h*u-c*l;if(p<=0&&h>=0&&c<=0)return a=h/(h-c),t.copy(n).addScaledVector(ui,a);wr.subVectors(e,r);const m=ui.dot(wr),x=di.dot(wr);if(x>=0&&m<=x)return t.copy(r);const M=m*l-h*x;if(M<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(di,o);const f=c*x-m*u;if(f<=0&&u-c>=0&&m-x>=0)return Xo.subVectors(r,s),o=(u-c)/(u-c+(m-x)),t.copy(s).addScaledVector(Xo,o);const d=1/(f+M+p);return a=M*d,o=p*d,t.copy(n).addScaledVector(ui,a).addScaledVector(di,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const gc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},Ss={h:0,s:0,l:0};function Pr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=so(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Pr(a,r,e+1/3),this.g=Pr(a,r,e),this.b=Pr(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=gc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bn(e.r),this.g=bn(e.g),this.b=bn(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return qe.workingToColorSpace(wt.copy(this),e),Math.round(We(wt.r*255,0,255))*65536+Math.round(We(wt.g*255,0,255))*256+Math.round(We(wt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(wt.copy(this),t);const n=wt.r,s=wt.g,r=wt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let h,l;const c=(o+a)/2;if(o===a)h=0,l=0;else{const u=a-o;switch(l=c<=.5?u/(a+o):u/(2-a-o),a){case n:h=(s-r)/u+(s<r?6:0);break;case s:h=(r-n)/u+2;break;case r:h=(n-s)/u+4;break}h/=6}return e.h=h,e.s=l,e.l=c,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=yt){qe.workingToColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,s=wt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Cn),this.setHSL(Cn.h+e,Cn.s+t,Cn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cn),e.getHSL(Ss);const n=ts(Cn.h,Ss.h,t),s=ts(Cn.s,Ss.s,t),r=ts(Cn.l,Ss.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new ze;ze.NAMES=gc;let ou=0;class Bn extends ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=yn(),this.name="",this.type="Material",this.blending=wi,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qr,this.blendDst=$r,this.blendEquation=tn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Do,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ii,this.stencilZFail=ii,this.stencilZPass=ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qr&&(n.blendSrc=this.blendSrc),this.blendDst!==$r&&(n.blendDst=this.blendDst),this.blendEquation!==tn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ri&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Do&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class or extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nt,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new N,ys=new me;let lu=0;class Vt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ka,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ys.fromBufferAttribute(this,t),ys.applyMatrix3(e),this.setXY(t,ys.x,ys.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$e(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ka&&(e.usage=this.usage),e}}class vc extends Vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class xc extends Vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Kt extends Vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let cu=0;const Yt=new Ye,Dr=new mt,fi=new N,zt=new Jt,Vi=new Jt,xt=new N;class on extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pc(e)?xc:vc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return Dr.lookAt(e),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];zt.setFromBufferAttribute(r),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Vi.setFromBufferAttribute(o),this.morphTargetsRelative?(xt.addVectors(zt.min,Vi.min),zt.expandByPoint(xt),xt.addVectors(zt.max,Vi.max),zt.expandByPoint(xt)):(zt.expandByPoint(Vi.min),zt.expandByPoint(Vi.max))}zt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(xt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)xt.fromBufferAttribute(o,l),h&&(fi.fromBufferAttribute(e,l),xt.add(fi)),s=Math.max(s,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],h=[];for(let A=0;A<n.count;A++)o[A]=new N,h[A]=new N;const l=new N,c=new N,u=new N,p=new me,m=new me,x=new me,M=new N,f=new N;function d(A,v,g){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,v),u.fromBufferAttribute(n,g),p.fromBufferAttribute(r,A),m.fromBufferAttribute(r,v),x.fromBufferAttribute(r,g),c.sub(l),u.sub(l),m.sub(p),x.sub(p);const S=1/(m.x*x.y-x.x*m.y);isFinite(S)&&(M.copy(c).multiplyScalar(x.y).addScaledVector(u,-m.y).multiplyScalar(S),f.copy(u).multiplyScalar(m.x).addScaledVector(c,-x.x).multiplyScalar(S),o[A].add(M),o[v].add(M),o[g].add(M),h[A].add(f),h[v].add(f),h[g].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let A=0,v=E.length;A<v;++A){const g=E[A],S=g.start,L=g.count;for(let P=S,U=S+L;P<U;P+=3)d(e.getX(P+0),e.getX(P+1),e.getX(P+2))}const T=new N,b=new N,C=new N,y=new N;function _(A){C.fromBufferAttribute(s,A),y.copy(C);const v=o[A];T.copy(v),T.sub(C.multiplyScalar(C.dot(v))).normalize(),b.crossVectors(y,v);const S=b.dot(h[A])<0?-1:1;a.setXYZW(A,T.x,T.y,T.z,S)}for(let A=0,v=E.length;A<v;++A){const g=E[A],S=g.start,L=g.count;for(let P=S,U=S+L;P<U;P+=3)_(e.getX(P+0)),_(e.getX(P+1)),_(e.getX(P+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new N,r=new N,a=new N,o=new N,h=new N,l=new N,c=new N,u=new N;if(e)for(let p=0,m=e.count;p<m;p+=3){const x=e.getX(p+0),M=e.getX(p+1),f=e.getX(p+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,f),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),o.fromBufferAttribute(n,x),h.fromBufferAttribute(n,M),l.fromBufferAttribute(n,f),o.add(c),h.add(c),l.add(c),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(M,h.x,h.y,h.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,m=t.count;p<m;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),n.setXYZ(p+0,c.x,c.y,c.z),n.setXYZ(p+1,c.x,c.y,c.z),n.setXYZ(p+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(o,h){const l=o.array,c=o.itemSize,u=o.normalized,p=new l.constructor(h.length*c);let m=0,x=0;for(let M=0,f=h.length;M<f;M++){o.isInterleavedBufferAttribute?m=h[M]*o.data.stride+o.offset:m=h[M]*c;for(let d=0;d<c;d++)p[x++]=l[m++]}return new Vt(p,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,n=this.index.array,s=this.attributes;for(const o in s){const h=s[o],l=e(h,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const h=[],l=r[o];for(let c=0,u=l.length;c<u;c++){const p=l[c],m=e(p,n);h.push(m)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(e[l]=h[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const l=n[h];e.data.attributes[h]=l.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],c=[];for(let u=0,p=l.length;u<p;u++){const m=l[u];c.push(m.toJSON(e.data))}c.length>0&&(s[h]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const c=s[l];this.setAttribute(l,c.clone(t))}const r=e.morphAttributes;for(const l in r){const c=[],u=r[l];for(let p=0,m=u.length;p<m;p++)c.push(u[p].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,c=a.length;l<c;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yo=new Ye,Xn=new ao,bs=new os,qo=new N,Es=new N,Ts=new N,ws=new N,Lr=new N,As=new N,jo=new N,Rs=new N;class Ze extends mt{constructor(e=new on,t=new or){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){As.set(0,0,0);for(let h=0,l=r.length;h<l;h++){const c=o[h],u=r[h];c!==0&&(Lr.fromBufferAttribute(u,e),a?As.addScaledVector(Lr,c):As.addScaledVector(Lr.sub(t),c))}t.add(As)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(r),Xn.copy(e.ray).recast(e.near),!(bs.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(bs,qo)===null||Xn.origin.distanceToSquared(qo)>(e.far-e.near)**2))&&(Yo.copy(r).invert(),Xn.copy(e.ray).applyMatrix4(Yo),!(n.boundingBox!==null&&Xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,M=p.length;x<M;x++){const f=p[x],d=a[f.materialIndex],E=Math.max(f.start,m.start),T=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let b=E,C=T;b<C;b+=3){const y=o.getX(b),_=o.getX(b+1),A=o.getX(b+2);s=Cs(this,d,e,n,l,c,u,y,_,A),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let f=x,d=M;f<d;f+=3){const E=o.getX(f),T=o.getX(f+1),b=o.getX(f+2);s=Cs(this,a,e,n,l,c,u,E,T,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let x=0,M=p.length;x<M;x++){const f=p[x],d=a[f.materialIndex],E=Math.max(f.start,m.start),T=Math.min(h.count,Math.min(f.start+f.count,m.start+m.count));for(let b=E,C=T;b<C;b+=3){const y=b,_=b+1,A=b+2;s=Cs(this,d,e,n,l,c,u,y,_,A),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(h.count,m.start+m.count);for(let f=x,d=M;f<d;f+=3){const E=f,T=f+1,b=f+2;s=Cs(this,a,e,n,l,c,u,E,T,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function hu(i,e,t,n,s,r,a,o){let h;if(e.side===Dt?h=n.intersectTriangle(a,r,s,!0,o):h=n.intersectTriangle(s,r,a,e.side===Fn,o),h===null)return null;Rs.copy(o),Rs.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Rs);return l<t.near||l>t.far?null:{distance:l,point:Rs.clone(),object:i}}function Cs(i,e,t,n,s,r,a,o,h,l){i.getVertexPosition(o,Es),i.getVertexPosition(h,Ts),i.getVertexPosition(l,ws);const c=hu(i,e,t,n,Es,Ts,ws,jo);if(c){const u=new N;jt.getBarycoord(jo,Es,Ts,ws,u),s&&(c.uv=jt.getInterpolatedAttribute(s,o,h,l,u,new me)),r&&(c.uv1=jt.getInterpolatedAttribute(r,o,h,l,u,new me)),a&&(c.normal=jt.getInterpolatedAttribute(a,o,h,l,u,new N),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const p={a:o,b:h,c:l,normal:new N,materialIndex:0};jt.getNormal(Es,Ts,ws,p.normal),c.face=p,c.barycoord=u}return c}class Gt extends on{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],l=[],c=[],u=[];let p=0,m=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(h),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(u,2));function x(M,f,d,E,T,b,C,y,_,A,v){const g=b/_,S=C/A,L=b/2,P=C/2,U=y/2,B=_+1,z=A+1;let q=0,H=0;const X=new N;for(let ee=0;ee<z;ee++){const oe=ee*S-P;for(let Me=0;Me<B;Me++){const Ee=Me*g-L;X[M]=Ee*E,X[f]=oe*T,X[d]=U,l.push(X.x,X.y,X.z),X[M]=0,X[f]=0,X[d]=y>0?1:-1,c.push(X.x,X.y,X.z),u.push(Me/_),u.push(1-ee/A),q+=1}}for(let ee=0;ee<A;ee++)for(let oe=0;oe<_;oe++){const Me=p+oe+B*ee,Ee=p+oe+B*(ee+1),Ae=p+(oe+1)+B*(ee+1),Pe=p+(oe+1)+B*ee;h.push(Me,Ee,Pe),h.push(Ee,Ae,Pe),H+=6}o.addGroup(m,H,v),m+=H,p+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ii(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Pt(i){const e={};for(let t=0;t<i.length;t++){const n=Ii(i[t]);for(const s in n)e[s]=n[s]}return e}function uu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function _c(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Ht={clone:Ii,merge:Pt};var du=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ut extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=du,this.fragmentShader=fu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=uu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Mc extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new N,Zo=new me,Ko=new me;class kt extends Mc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z)}getViewSize(e,t){return this.getViewBounds(e,Zo,Ko),t.subVectors(Ko,Zo)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(es*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*n/l,s*=a.width/h,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pi=-90,mi=1;class pu extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new kt(pi,mi,e,t);s.layers=this.layers,this.add(s);const r=new kt(pi,mi,e,t);r.layers=this.layers,this.add(r);const a=new kt(pi,mi,e,t);a.layers=this.layers,this.add(a);const o=new kt(pi,mi,e,t);o.layers=this.layers,this.add(o);const h=new kt(pi,mi,e,t);h.layers=this.layers,this.add(h);const l=new kt(pi,mi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,h]=t;for(const l of t)this.remove(l);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,l,c]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,h),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,s),e.render(t,c),e.setRenderTarget(u,p,m),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Sc extends _t{constructor(e=[],t=Ci,n,s,r,a,o,h,l,c){super(e,t,n,s,r,a,o,h,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mu extends At{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Sc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gt(5,5,5),r=new ut({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dt,blending:Mt});r.uniforms.tEquirect.value=t;const a=new Ze(s,r),o=t.minFilter;return t.minFilter===Qn&&(t.minFilter=sn),new pu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class bt extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gu={type:"move"};class Ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const f=t.getJointPose(M,n),d=this._getHandJoint(l,M);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=c.position.distanceTo(u.position),m=.02,x=.005;l.inputState.pinching&&p>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gu)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class lo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ze(e),this.density=t}clone(){return new lo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yc extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nt,this.environmentIntensity=1,this.environmentRotation=new Nt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class vu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ka,this.updateRanges=[],this.version=0,this.uuid=yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ct=new N;class ir{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$e(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ir(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class sr extends Bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let gi;const Gi=new N,vi=new N,xi=new N,_i=new me,Wi=new me,bc=new Ye,Ps=new N,Xi=new N,Ds=new N,Jo=new me,Ir=new me,Qo=new me;class Ha extends mt{constructor(e=new sr){if(super(),this.isSprite=!0,this.type="Sprite",gi===void 0){gi=new on;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new vu(t,5);gi.setIndex([0,1,2,0,2,3]),gi.setAttribute("position",new ir(n,3,0,!1)),gi.setAttribute("uv",new ir(n,2,3,!1))}this.geometry=gi,this.material=e,this.center=new me(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vi.setFromMatrixScale(this.matrixWorld),bc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),xi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vi.multiplyScalar(-xi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Ls(Ps.set(-.5,-.5,0),xi,a,vi,s,r),Ls(Xi.set(.5,-.5,0),xi,a,vi,s,r),Ls(Ds.set(.5,.5,0),xi,a,vi,s,r),Jo.set(0,0),Ir.set(1,0),Qo.set(1,1);let o=e.ray.intersectTriangle(Ps,Xi,Ds,!1,Gi);if(o===null&&(Ls(Xi.set(-.5,.5,0),xi,a,vi,s,r),Ir.set(0,1),o=e.ray.intersectTriangle(Ps,Ds,Xi,!1,Gi),o===null))return;const h=e.ray.origin.distanceTo(Gi);h<e.near||h>e.far||t.push({distance:h,point:Gi.clone(),uv:jt.getInterpolation(Gi,Ps,Xi,Ds,Jo,Ir,Qo,new me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ls(i,e,t,n,s,r){_i.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Wi.x=r*_i.x-s*_i.y,Wi.y=s*_i.x+r*_i.y):Wi.copy(_i),i.copy(e),i.x+=Wi.x,i.y+=Wi.y,i.applyMatrix4(bc)}class co extends _t{constructor(e=null,t=1,n=1,s,r,a,o,h,l=Et,c=Et,u,p){super(null,a,o,h,l,c,s,r,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $o extends Vt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Mi=new Ye,el=new Ye,Us=[],tl=new Jt,xu=new Ye,Yi=new Ze,qi=new os;class Ec extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $o(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,xu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mi),tl.copy(e.boundingBox).applyMatrix4(Mi),this.boundingBox.union(tl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new os),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Mi),qi.copy(e.boundingSphere).applyMatrix4(Mi),this.boundingSphere.union(qi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Yi.geometry=this.geometry,Yi.material=this.material,Yi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qi.copy(this.boundingSphere),qi.applyMatrix4(n),e.ray.intersectsSphere(qi)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Mi),el.multiplyMatrices(n,Mi),Yi.matrixWorld=el,Yi.raycast(e,Us);for(let a=0,o=Us.length;a<o;a++){const h=Us[a];h.instanceId=r,h.object=this,t.push(h)}Us.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new $o(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new co(new Float32Array(s*this.count),s,this.count,eo,un));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,h=s*e;r[h]=o,r.set(n,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Nr=new N,_u=new N,Mu=new He;class Dn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Nr.subVectors(n,t).cross(_u.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Nr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mu.getNormalMatrix(e),s=this.coplanarPoint(Nr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new os,Su=new me(.5,.5),Is=new N;class ho{constructor(e=new Dn,t=new Dn,n=new Dn,s=new Dn,r=new Dn,a=new Dn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],l=r[3],c=r[4],u=r[5],p=r[6],m=r[7],x=r[8],M=r[9],f=r[10],d=r[11],E=r[12],T=r[13],b=r[14],C=r[15];if(s[0].setComponents(l-a,m-c,d-x,C-E).normalize(),s[1].setComponents(l+a,m+c,d+x,C+E).normalize(),s[2].setComponents(l+o,m+u,d+M,C+T).normalize(),s[3].setComponents(l-o,m-u,d-M,C-T).normalize(),n)s[4].setComponents(h,p,f,b).normalize(),s[5].setComponents(l-h,m-p,d-f,C-b).normalize();else if(s[4].setComponents(l-h,m-p,d-f,C-b).normalize(),t===dn)s[5].setComponents(l+h,m+p,d+f,C+b).normalize();else if(t===tr)s[5].setComponents(h,p,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){Yn.center.set(0,0,0);const t=Su.distanceTo(e.center);return Yn.radius=.7071067811865476+t,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Is.x=s.normal.x>0?e.max.x:e.min.x,Is.y=s.normal.y>0?e.max.y:e.min.y,Is.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Is)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class En extends _t{constructor(e,t,n,s,r,a,o,h,l){super(e,t,n,s,r,a,o,h,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class uo extends _t{constructor(e,t,n=ei,s,r,a,o=Et,h=Et,l,c=is,u=1){if(c!==is&&c!==Li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:u};super(p,s,r,a,o,h,c,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ro(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Tc extends _t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ni extends on{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h};const l=this;s=Math.floor(s),r=Math.floor(r);const c=[],u=[],p=[],m=[];let x=0;const M=[],f=n/2;let d=0;E(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(c),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(p,3)),this.setAttribute("uv",new Kt(m,2));function E(){const b=new N,C=new N;let y=0;const _=(t-e)/n;for(let A=0;A<=r;A++){const v=[],g=A/r,S=g*(t-e)+e;for(let L=0;L<=s;L++){const P=L/s,U=P*h+o,B=Math.sin(U),z=Math.cos(U);C.x=S*B,C.y=-g*n+f,C.z=S*z,u.push(C.x,C.y,C.z),b.set(B,_,z).normalize(),p.push(b.x,b.y,b.z),m.push(P,1-g),v.push(x++)}M.push(v)}for(let A=0;A<s;A++)for(let v=0;v<r;v++){const g=M[v][A],S=M[v+1][A],L=M[v+1][A+1],P=M[v][A+1];(e>0||v!==0)&&(c.push(g,S,P),y+=3),(t>0||v!==r-1)&&(c.push(S,L,P),y+=3)}l.addGroup(d,y,0),d+=y}function T(b){const C=x,y=new me,_=new N;let A=0;const v=b===!0?e:t,g=b===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,f*g,0),p.push(0,g,0),m.push(.5,.5),x++;const S=x;for(let L=0;L<=s;L++){const U=L/s*h+o,B=Math.cos(U),z=Math.sin(U);_.x=v*z,_.y=f*g,_.z=v*B,u.push(_.x,_.y,_.z),p.push(0,g,0),y.x=B*.5+.5,y.y=z*.5*g+.5,m.push(y.x,y.y),x++}for(let L=0;L<s;L++){const P=C+L,U=S+L;b===!0?c.push(U,U+1,P):c.push(U+1,U,P),A+=3}l.addGroup(d,A,b===!0?1:2),d+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zn extends on{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),h=Math.floor(s),l=o+1,c=h+1,u=e/o,p=t/h,m=[],x=[],M=[],f=[];for(let d=0;d<c;d++){const E=d*p-a;for(let T=0;T<l;T++){const b=T*u-r;x.push(b,-E,0),M.push(0,0,1),f.push(T/o),f.push(1-d/h)}}for(let d=0;d<h;d++)for(let E=0;E<o;E++){const T=E+l*d,b=E+l*(d+1),C=E+1+l*(d+1),y=E+1+l*d;m.push(T,b,y),m.push(b,C,y)}this.setIndex(m),this.setAttribute("position",new Kt(x,3)),this.setAttribute("normal",new Kt(M,3)),this.setAttribute("uv",new Kt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zn(e.width,e.height,e.widthSegments,e.heightSegments)}}class yu extends ut{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class St extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ar,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fo extends St{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class bu extends Bn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ar,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Eu extends Bn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ar,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nt,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tu extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wu extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class po extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Au extends po{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Fr=new Ye,nl=new N,il=new N;class wc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ho,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;nl.setFromMatrixPosition(e.matrixWorld),t.position.copy(nl),il.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(il),t.updateMatrixWorld(),Fr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fr,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const sl=new Ye,ji=new N,Or=new N;class Ru extends wc{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new me(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ji.setFromMatrixPosition(e.matrixWorld),n.position.copy(ji),Or.copy(n.position),Or.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Or),n.updateMatrixWorld(),s.makeTranslation(-ji.x,-ji.y,-ji.z),sl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sl,n.coordinateSystem,n.reversedDepth)}}class Cu extends po{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ru}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class mo extends Mc{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=c*this.view.offsetY,h=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Pu extends wc{constructor(){super(new mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rl extends po{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new Pu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Du extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Lu{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const al=new Ye;class Uu{constructor(e,t,n=0,s=1/0){this.ray=new ao(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new oo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return al.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(al),this}intersectObject(e,t=!0,n=[]){return Va(e,this,n,t),n.sort(ol),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Va(e[s],this,n,t);return n.sort(ol),n}}function ol(i,e){return i.distance-e.distance}function Va(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Va(r[a],e,t,!0)}}class ll{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(We(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Iu extends ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function cl(i,e,t,n){const s=Nu(n);switch(t){case hc:return i*e;case eo:return i*e/s.components*s.byteLength;case to:return i*e/s.components*s.byteLength;case dc:return i*e*2/s.components*s.byteLength;case no:return i*e*2/s.components*s.byteLength;case uc:return i*e*3/s.components*s.byteLength;case Zt:return i*e*4/s.components*s.byteLength;case io:return i*e*4/s.components*s.byteLength;case Ys:case qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case js:case Zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fa:case ma:return Math.max(i,16)*Math.max(e,8)/4;case da:case pa:return Math.max(i,8)*Math.max(e,8)/2;case ga:case va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ya:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ea:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case wa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case La:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ua:case Ia:case Na:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fa:case Oa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ba:case za:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nu(i){switch(i){case rn:case ac:return{byteLength:1,components:1};case ns:case oc:case It:return{byteLength:2,components:1};case Qa:case $a:return{byteLength:2,components:4};case ei:case Ja:case un:return{byteLength:4,components:1};case lc:case cc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ac(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Fu(i){const e=new WeakMap;function t(o,h){const l=o.array,c=o.usage,u=l.byteLength,p=i.createBuffer();i.bindBuffer(h,p),i.bufferData(h,l,c),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,h,l){const c=h.array,u=h.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,c);else{u.sort((m,x)=>m.start-x.start);let p=0;for(let m=1;m<u.length;m++){const x=u[p],M=u[m];M.start<=x.start+x.count+1?x.count=Math.max(x.count,M.start+M.count-x.start):(++p,u[p]=M)}u.length=p+1;for(let m=0,x=u.length;m<x;m++){const M=u[m];i.bufferSubData(l,M.start*c.BYTES_PER_ELEMENT,c,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(i.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,h),l.version=o.version}}return{get:s,remove:r,update:a}}var Ou=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bu=`#ifdef USE_ALPHAHASH
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
#endif`,zu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ku=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gu=`#ifdef USE_AOMAP
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
#endif`,Wu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xu=`#ifdef USE_BATCHING
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
#endif`,Yu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ku=`#ifdef USE_IRIDESCENCE
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
#endif`,Ju=`#ifdef USE_BUMPMAP
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
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ad=`#define PI 3.141592653589793
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
} // validated`,od=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ld=`vec3 transformedNormal = objectNormal;
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
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ud=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fd="gl_FragColor = linearToOutputTexel( gl_FragColor );",pd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,md=`#ifdef USE_ENVMAP
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
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vd=`#ifdef USE_ENVMAP
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
#endif`,xd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
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
#endif`,Md=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ed=`#ifdef USE_GRADIENTMAP
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
}`,Td=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rd=`uniform bool receiveShadow;
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
#endif`,Cd=`#ifdef USE_ENVMAP
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
#endif`,Pd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ld=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Id=`PhysicalMaterial material;
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
#endif`,Nd=`struct PhysicalMaterial {
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
}`,Fd=`
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
#endif`,Od=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yd=`#if defined( USE_POINTS_UV )
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
#endif`,qd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qd=`#ifdef USE_MORPHTARGETS
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
#endif`,ef=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,af=`#ifdef USE_NORMALMAP
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
#endif`,of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,df=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ff=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yf=`float getShadowMask() {
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
}`,bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ef=`#ifdef USE_SKINNING
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
#endif`,Tf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wf=`#ifdef USE_SKINNING
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
#endif`,Af=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Df=`#ifdef USE_TRANSMISSION
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
#endif`,Lf=`#ifdef USE_TRANSMISSION
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
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ff=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Of=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bf=`uniform sampler2D t2D;
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
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gf=`#include <common>
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
}`,Wf=`#if DEPTH_PACKING == 3200
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
}`,Xf=`#define DISTANCE
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
}`,Yf=`#define DISTANCE
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
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zf=`uniform float scale;
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
}`,Kf=`uniform vec3 diffuse;
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
}`,Jf=`#include <common>
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
}`,Qf=`uniform vec3 diffuse;
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
}`,ep=`#define LAMBERT
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
}`,tp=`#define MATCAP
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
}`,np=`#define MATCAP
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
}`,ip=`#define NORMAL
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
}`,sp=`#define NORMAL
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
}`,rp=`#define PHONG
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
}`,ap=`#define PHONG
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
}`,op=`#define STANDARD
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
}`,lp=`#define STANDARD
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
}`,cp=`#define TOON
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
}`,hp=`#define TOON
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
}`,up=`uniform float size;
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
}`,dp=`uniform vec3 diffuse;
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
}`,fp=`#include <common>
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
}`,pp=`uniform vec3 color;
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
}`,mp=`uniform float rotation;
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
}`,gp=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Ou,alphahash_pars_fragment:Bu,alphamap_fragment:zu,alphamap_pars_fragment:ku,alphatest_fragment:Hu,alphatest_pars_fragment:Vu,aomap_fragment:Gu,aomap_pars_fragment:Wu,batching_pars_vertex:Xu,batching_vertex:Yu,begin_vertex:qu,beginnormal_vertex:ju,bsdfs:Zu,iridescence_fragment:Ku,bumpmap_pars_fragment:Ju,clipping_planes_fragment:Qu,clipping_planes_pars_fragment:$u,clipping_planes_pars_vertex:ed,clipping_planes_vertex:td,color_fragment:nd,color_pars_fragment:id,color_pars_vertex:sd,color_vertex:rd,common:ad,cube_uv_reflection_fragment:od,defaultnormal_vertex:ld,displacementmap_pars_vertex:cd,displacementmap_vertex:hd,emissivemap_fragment:ud,emissivemap_pars_fragment:dd,colorspace_fragment:fd,colorspace_pars_fragment:pd,envmap_fragment:md,envmap_common_pars_fragment:gd,envmap_pars_fragment:vd,envmap_pars_vertex:xd,envmap_physical_pars_fragment:Cd,envmap_vertex:_d,fog_vertex:Md,fog_pars_vertex:Sd,fog_fragment:yd,fog_pars_fragment:bd,gradientmap_pars_fragment:Ed,lightmap_pars_fragment:Td,lights_lambert_fragment:wd,lights_lambert_pars_fragment:Ad,lights_pars_begin:Rd,lights_toon_fragment:Pd,lights_toon_pars_fragment:Dd,lights_phong_fragment:Ld,lights_phong_pars_fragment:Ud,lights_physical_fragment:Id,lights_physical_pars_fragment:Nd,lights_fragment_begin:Fd,lights_fragment_maps:Od,lights_fragment_end:Bd,logdepthbuf_fragment:zd,logdepthbuf_pars_fragment:kd,logdepthbuf_pars_vertex:Hd,logdepthbuf_vertex:Vd,map_fragment:Gd,map_pars_fragment:Wd,map_particle_fragment:Xd,map_particle_pars_fragment:Yd,metalnessmap_fragment:qd,metalnessmap_pars_fragment:jd,morphinstance_vertex:Zd,morphcolor_vertex:Kd,morphnormal_vertex:Jd,morphtarget_pars_vertex:Qd,morphtarget_vertex:$d,normal_fragment_begin:ef,normal_fragment_maps:tf,normal_pars_fragment:nf,normal_pars_vertex:sf,normal_vertex:rf,normalmap_pars_fragment:af,clearcoat_normal_fragment_begin:of,clearcoat_normal_fragment_maps:lf,clearcoat_pars_fragment:cf,iridescence_pars_fragment:hf,opaque_fragment:uf,packing:df,premultiplied_alpha_fragment:ff,project_vertex:pf,dithering_fragment:mf,dithering_pars_fragment:gf,roughnessmap_fragment:vf,roughnessmap_pars_fragment:xf,shadowmap_pars_fragment:_f,shadowmap_pars_vertex:Mf,shadowmap_vertex:Sf,shadowmask_pars_fragment:yf,skinbase_vertex:bf,skinning_pars_vertex:Ef,skinning_vertex:Tf,skinnormal_vertex:wf,specularmap_fragment:Af,specularmap_pars_fragment:Rf,tonemapping_fragment:Cf,tonemapping_pars_fragment:Pf,transmission_fragment:Df,transmission_pars_fragment:Lf,uv_pars_fragment:Uf,uv_pars_vertex:If,uv_vertex:Nf,worldpos_vertex:Ff,background_vert:Of,background_frag:Bf,backgroundCube_vert:zf,backgroundCube_frag:kf,cube_vert:Hf,cube_frag:Vf,depth_vert:Gf,depth_frag:Wf,distanceRGBA_vert:Xf,distanceRGBA_frag:Yf,equirect_vert:qf,equirect_frag:jf,linedashed_vert:Zf,linedashed_frag:Kf,meshbasic_vert:Jf,meshbasic_frag:Qf,meshlambert_vert:$f,meshlambert_frag:ep,meshmatcap_vert:tp,meshmatcap_frag:np,meshnormal_vert:ip,meshnormal_frag:sp,meshphong_vert:rp,meshphong_frag:ap,meshphysical_vert:op,meshphysical_frag:lp,meshtoon_vert:cp,meshtoon_frag:hp,points_vert:up,points_frag:dp,shadow_vert:fp,shadow_frag:pp,sprite_vert:mp,sprite_frag:gp},de={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},hn={basic:{uniforms:Pt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Pt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Pt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Pt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Pt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Pt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Pt([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Pt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Pt([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Pt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Pt([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Pt([de.common,de.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Pt([de.lights,de.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};hn.physical={uniforms:Pt([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Ns={r:0,b:0,g:0},qn=new Nt,vp=new Ye;function xp(i,e,t,n,s,r,a){const o=new ze(0);let h=r===!0?0:1,l,c,u=null,p=0,m=null;function x(T){let b=T.isScene===!0?T.background:null;return b&&b.isTexture&&(b=(T.backgroundBlurriness>0?t:e).get(b)),b}function M(T){let b=!1;const C=x(T);C===null?d(o,h):C&&C.isColor&&(d(C,1),b=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(T,b){const C=x(b);C&&(C.isCubeTexture||C.mapping===rr)?(c===void 0&&(c=new Ze(new Gt(1,1,1),new ut({name:"BackgroundCubeMaterial",uniforms:Ii(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,_,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),qn.copy(b.backgroundRotation),qn.x*=-1,qn.y*=-1,qn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),c.material.uniforms.envMap.value=C,c.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(vp.makeRotationFromEuler(qn)),c.material.toneMapped=qe.getTransfer(C.colorSpace)!==Qe,(u!==C||p!==C.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,p=C.version,m=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Ze(new zn(2,2),new ut({name:"BackgroundMaterial",uniforms:Ii(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=qe.getTransfer(C.colorSpace)!==Qe,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||p!==C.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=C,p=C.version,m=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function d(T,b){T.getRGB(Ns,_c(i)),n.buffers.color.setClear(Ns.r,Ns.g,Ns.b,b,a)}function E(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,b=1){o.set(T),h=b,d(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(T){h=T,d(o,h)},render:M,addToRenderList:f,dispose:E}}function _p(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(g,S,L,P,U){let B=!1;const z=u(P,L,S);r!==z&&(r=z,l(r.object)),B=m(g,P,L,U),B&&x(g,P,L,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,b(g,S,L,P),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function h(){return i.createVertexArray()}function l(g){return i.bindVertexArray(g)}function c(g){return i.deleteVertexArray(g)}function u(g,S,L){const P=L.wireframe===!0;let U=n[g.id];U===void 0&&(U={},n[g.id]=U);let B=U[S.id];B===void 0&&(B={},U[S.id]=B);let z=B[P];return z===void 0&&(z=p(h()),B[P]=z),z}function p(g){const S=[],L=[],P=[];for(let U=0;U<t;U++)S[U]=0,L[U]=0,P[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:L,attributeDivisors:P,object:g,attributes:{},index:null}}function m(g,S,L,P){const U=r.attributes,B=S.attributes;let z=0;const q=L.getAttributes();for(const H in q)if(q[H].location>=0){const ee=U[H];let oe=B[H];if(oe===void 0&&(H==="instanceMatrix"&&g.instanceMatrix&&(oe=g.instanceMatrix),H==="instanceColor"&&g.instanceColor&&(oe=g.instanceColor)),ee===void 0||ee.attribute!==oe||oe&&ee.data!==oe.data)return!0;z++}return r.attributesNum!==z||r.index!==P}function x(g,S,L,P){const U={},B=S.attributes;let z=0;const q=L.getAttributes();for(const H in q)if(q[H].location>=0){let ee=B[H];ee===void 0&&(H==="instanceMatrix"&&g.instanceMatrix&&(ee=g.instanceMatrix),H==="instanceColor"&&g.instanceColor&&(ee=g.instanceColor));const oe={};oe.attribute=ee,ee&&ee.data&&(oe.data=ee.data),U[H]=oe,z++}r.attributes=U,r.attributesNum=z,r.index=P}function M(){const g=r.newAttributes;for(let S=0,L=g.length;S<L;S++)g[S]=0}function f(g){d(g,0)}function d(g,S){const L=r.newAttributes,P=r.enabledAttributes,U=r.attributeDivisors;L[g]=1,P[g]===0&&(i.enableVertexAttribArray(g),P[g]=1),U[g]!==S&&(i.vertexAttribDivisor(g,S),U[g]=S)}function E(){const g=r.newAttributes,S=r.enabledAttributes;for(let L=0,P=S.length;L<P;L++)S[L]!==g[L]&&(i.disableVertexAttribArray(L),S[L]=0)}function T(g,S,L,P,U,B,z){z===!0?i.vertexAttribIPointer(g,S,L,U,B):i.vertexAttribPointer(g,S,L,P,U,B)}function b(g,S,L,P){M();const U=P.attributes,B=L.getAttributes(),z=S.defaultAttributeValues;for(const q in B){const H=B[q];if(H.location>=0){let X=U[q];if(X===void 0&&(q==="instanceMatrix"&&g.instanceMatrix&&(X=g.instanceMatrix),q==="instanceColor"&&g.instanceColor&&(X=g.instanceColor)),X!==void 0){const ee=X.normalized,oe=X.itemSize,Me=e.get(X);if(Me===void 0)continue;const Ee=Me.buffer,Ae=Me.type,Pe=Me.bytesPerElement,K=Ae===i.INT||Ae===i.UNSIGNED_INT||X.gpuType===Ja;if(X.isInterleavedBufferAttribute){const J=X.data,ue=J.stride,$=X.offset;if(J.isInstancedInterleavedBuffer){for(let le=0;le<H.locationSize;le++)d(H.location+le,J.meshPerAttribute);g.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let le=0;le<H.locationSize;le++)f(H.location+le);i.bindBuffer(i.ARRAY_BUFFER,Ee);for(let le=0;le<H.locationSize;le++)T(H.location+le,oe/H.locationSize,Ae,ee,ue*Pe,($+oe/H.locationSize*le)*Pe,K)}else{if(X.isInstancedBufferAttribute){for(let J=0;J<H.locationSize;J++)d(H.location+J,X.meshPerAttribute);g.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let J=0;J<H.locationSize;J++)f(H.location+J);i.bindBuffer(i.ARRAY_BUFFER,Ee);for(let J=0;J<H.locationSize;J++)T(H.location+J,oe/H.locationSize,Ae,ee,oe*Pe,oe/H.locationSize*J*Pe,K)}}else if(z!==void 0){const ee=z[q];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(H.location,ee);break;case 3:i.vertexAttrib3fv(H.location,ee);break;case 4:i.vertexAttrib4fv(H.location,ee);break;default:i.vertexAttrib1fv(H.location,ee)}}}}E()}function C(){A();for(const g in n){const S=n[g];for(const L in S){const P=S[L];for(const U in P)c(P[U].object),delete P[U];delete S[L]}delete n[g]}}function y(g){if(n[g.id]===void 0)return;const S=n[g.id];for(const L in S){const P=S[L];for(const U in P)c(P[U].object),delete P[U];delete S[L]}delete n[g.id]}function _(g){for(const S in n){const L=n[S];if(L[g.id]===void 0)continue;const P=L[g.id];for(const U in P)c(P[U].object),delete P[U];delete L[g.id]}}function A(){v(),a=!0,r!==s&&(r=s,l(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:v,dispose:C,releaseStatesOfGeometry:y,releaseStatesOfProgram:_,initAttributes:M,enableAttribute:f,disableUnusedAttributes:E}}function Mp(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let m=0;for(let x=0;x<u;x++)m+=c[x];t.update(m,n,1)}function h(l,c,u,p){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<l.length;x++)a(l[x],c[x],p[x]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,c,0,p,0,u);let x=0;for(let M=0;M<u;M++)x+=c[M]*p[M];t.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=h}function Sp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==Zt&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const A=_===It&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==rn&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&_!==un&&!A)}function h(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const c=h(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=x>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:x,maxTextureSize:M,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:b,vertexTextures:C,maxSamples:y}}function yp(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Dn,o=new He,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const m=u.length!==0||p||n!==0||s;return s=p,n=u.length,m},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){t=c(u,p,0)},this.setState=function(u,p,m){const x=u.clippingPlanes,M=u.clipIntersection,f=u.clipShadows,d=i.get(u);if(!s||x===null||x.length===0||r&&!f)r?c(null):l();else{const E=r?0:n,T=E*4;let b=d.clippingState||null;h.value=b,b=c(x,p,T,m);for(let C=0;C!==T;++C)b[C]=t[C];d.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=E}};function l(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(u,p,m,x){const M=u!==null?u.length:0;let f=null;if(M!==0){if(f=h.value,x!==!0||f===null){const d=m+M*4,E=p.matrixWorldInverse;o.getNormalMatrix(E),(f===null||f.length<d)&&(f=new Float32Array(d));for(let T=0,b=m;T!==M;++T,b+=4)a.copy(u[T]).applyMatrix4(E,o),a.normal.toArray(f,b),f[b+3]=a.constant}h.value=f,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,f}}function bp(i){let e=new WeakMap;function t(a,o){return o===ca?a.mapping=Ci:o===ha&&(a.mapping=Pi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ca||o===ha)if(e.has(a)){const h=e.get(a).texture;return t(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const l=new mu(h.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const h=e.get(o);h!==void 0&&(e.delete(o),h.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Ei=4,hl=[.125,.215,.35,.446,.526,.582],Kn=20,Br=new mo,ul=new ze;let zr=null,kr=0,Hr=0,Vr=!1;const Zn=(1+Math.sqrt(5))/2,Si=1/Zn,dl=[new N(-Zn,Si,0),new N(Zn,Si,0),new N(-Si,0,Zn),new N(Si,0,Zn),new N(0,Zn,-Si),new N(0,Zn,Si),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Ep=new N;class Ga{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Ep}=r;zr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,n,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zr,kr,Hr),this._renderer.xr.enabled=Vr,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ci||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:It,format:Zt,colorSpace:Ui,depthBuffer:!1},s=fl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tp(r)),this._blurMaterial=wp(r,e,t)}return s}_compileMaterial(e){const t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,Br)}_sceneToCubeUV(e,t,n,s,r){const h=new kt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,m=u.toneMapping;u.getClearColor(ul),u.toneMapping=Nn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const M=new or({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),f=new Ze(new Gt,M);let d=!1;const E=e.background;E?E.isColor&&(M.color.copy(E),e.background=null,d=!0):(M.color.copy(ul),d=!0);for(let T=0;T<6;T++){const b=T%3;b===0?(h.up.set(0,l[T],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+c[T],r.y,r.z)):b===1?(h.up.set(0,0,l[T]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+c[T],r.z)):(h.up.set(0,l[T],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+c[T]));const C=this._cubeSize;Fs(s,b*C,T>2?C:0,C,C),u.setRenderTarget(s),d&&u.render(f,h),u.render(e,h)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=m,u.autoClear=p,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ci||e.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ze(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;Fs(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(a,Br)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=dl[(s-r-1)%dl.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const h=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new Ze(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Kn-1),M=r/x,f=isFinite(r)?1+Math.floor(c*M):Kn;f>Kn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Kn}`);const d=[];let E=0;for(let _=0;_<Kn;++_){const A=_/M,v=Math.exp(-A*A/2);d.push(v),_===0?E+=v:_<f&&(E+=2*v)}for(let _=0;_<d.length;_++)d[_]=d[_]/E;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:T}=this;p.dTheta.value=x,p.mipInt.value=T-n;const b=this._sizeLods[s],C=3*b*(s>T-Ei?s-T+Ei:0),y=4*(this._cubeSize-b);Fs(t,C,y,3*b,2*b),h.setRenderTarget(t),h.render(u,Br)}}function Tp(i){const e=[],t=[],n=[];let s=i;const r=i-Ei+1+hl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let h=1/o;a>i-Ei?h=hl[a-i+Ei-1]:a===0&&(h=0),n.push(h);const l=1/(o-2),c=-l,u=1+l,p=[c,c,u,c,u,u,c,c,u,u,c,u],m=6,x=6,M=3,f=2,d=1,E=new Float32Array(M*x*m),T=new Float32Array(f*x*m),b=new Float32Array(d*x*m);for(let y=0;y<m;y++){const _=y%3*2/3-1,A=y>2?0:-1,v=[_,A,0,_+2/3,A,0,_+2/3,A+1,0,_,A,0,_+2/3,A+1,0,_,A+1,0];E.set(v,M*x*y),T.set(p,f*x*y);const g=[y,y,y,y,y,y];b.set(g,d*x*y)}const C=new on;C.setAttribute("position",new Vt(E,M)),C.setAttribute("uv",new Vt(T,f)),C.setAttribute("faceIndex",new Vt(b,d)),e.push(C),s>Ei&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function fl(i,e,t){const n=new At(i,e,t);return n.texture.mapping=rr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function wp(i,e,t){const n=new Float32Array(Kn),s=new N(0,1,0);return new ut({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:go(),fragmentShader:`

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
		`,blending:Mt,depthTest:!1,depthWrite:!1})}function pl(){return new ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:go(),fragmentShader:`

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
		`,blending:Mt,depthTest:!1,depthWrite:!1})}function ml(){return new ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mt,depthTest:!1,depthWrite:!1})}function go(){return`

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
	`}function Ap(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const h=o.mapping,l=h===ca||h===ha,c=h===Ci||h===Pi;if(l||c){let u=e.get(o);const p=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new Ga(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return l&&m&&m.height>0||c&&m&&s(m)?(t===null&&(t=new Ga(i)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let h=0;const l=6;for(let c=0;c<l;c++)o[c]!==void 0&&h++;return h===l}function r(o){const h=o.target;h.removeEventListener("dispose",r);const l=e.get(h);l!==void 0&&(e.delete(h),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Rp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&rs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Cp(i,e,t,n){const s={},r=new WeakMap;function a(u){const p=u.target;p.index!==null&&e.remove(p.index);for(const x in p.attributes)e.remove(p.attributes[x]);p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function h(u){const p=u.attributes;for(const m in p)e.update(p[m],i.ARRAY_BUFFER)}function l(u){const p=[],m=u.index,x=u.attributes.position;let M=0;if(m!==null){const E=m.array;M=m.version;for(let T=0,b=E.length;T<b;T+=3){const C=E[T+0],y=E[T+1],_=E[T+2];p.push(C,y,y,_,_,C)}}else if(x!==void 0){const E=x.array;M=x.version;for(let T=0,b=E.length/3-1;T<b;T+=3){const C=T+0,y=T+1,_=T+2;p.push(C,y,y,_,_,C)}}else return;const f=new(pc(p)?xc:vc)(p,1);f.version=M;const d=r.get(u);d&&e.remove(d),r.set(u,f)}function c(u){const p=r.get(u);if(p){const m=u.index;m!==null&&p.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:h,getWireframeAttribute:c}}function Pp(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function h(p,m){i.drawElements(n,m,r,p*a),t.update(m,n,1)}function l(p,m,x){x!==0&&(i.drawElementsInstanced(n,m,r,p*a,x),t.update(m,n,x))}function c(p,m,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,x);let f=0;for(let d=0;d<x;d++)f+=m[d];t.update(f,n,1)}function u(p,m,x,M){if(x===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<p.length;d++)l(p[d]/a,m[d],M[d]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,M,0,x);let d=0;for(let E=0;E<x;E++)d+=m[E]*M[E];t.update(d,n,1)}}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function Dp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Lp(i,e,t){const n=new WeakMap,s=new it;function r(a,o,h){const l=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let p=n.get(o);if(p===void 0||p.count!==u){let v=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",v)};p!==void 0&&p.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let T=0;m===!0&&(T=1),x===!0&&(T=2),M===!0&&(T=3);let b=o.attributes.position.count*T,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const y=new Float32Array(b*C*4*u),_=new mc(y,b,C,u);_.type=un,_.needsUpdate=!0;const A=T*4;for(let g=0;g<u;g++){const S=f[g],L=d[g],P=E[g],U=b*C*4*g;for(let B=0;B<S.count;B++){const z=B*A;m===!0&&(s.fromBufferAttribute(S,B),y[U+z+0]=s.x,y[U+z+1]=s.y,y[U+z+2]=s.z,y[U+z+3]=0),x===!0&&(s.fromBufferAttribute(L,B),y[U+z+4]=s.x,y[U+z+5]=s.y,y[U+z+6]=s.z,y[U+z+7]=0),M===!0&&(s.fromBufferAttribute(P,B),y[U+z+8]=s.x,y[U+z+9]=s.y,y[U+z+10]=s.z,y[U+z+11]=P.itemSize===4?s.w:1)}}p={count:u,texture:_,size:new me(b,C)},n.set(o,p),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let M=0;M<l.length;M++)m+=l[M];const x=o.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",x),h.getUniforms().setValue(i,"morphTargetInfluences",l)}h.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Up(i,e,t,n){let s=new WeakMap;function r(h){const l=n.render.frame,c=h.geometry,u=e.get(h,c);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",o)===!1&&h.addEventListener("dispose",o),s.get(h)!==l&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),s.set(h,l))),h.isSkinnedMesh){const p=h.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function a(){s=new WeakMap}function o(h){const l=h.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const Rc=new _t,gl=new uo(1,1),Cc=new mc,Pc=new $h,Dc=new Sc,vl=[],xl=[],_l=new Float32Array(16),Ml=new Float32Array(9),Sl=new Float32Array(4);function Oi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=vl[s];if(r===void 0&&(r=new Float32Array(s),vl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function lr(i,e){let t=xl[e];t===void 0&&(t=new Int32Array(e),xl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ip(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Np(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2fv(this.addr,e),vt(t,e)}}function Fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;i.uniform3fv(this.addr,e),vt(t,e)}}function Op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4fv(this.addr,e),vt(t,e)}}function Bp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(gt(t,n))return;Sl.set(n),i.uniformMatrix2fv(this.addr,!1,Sl),vt(t,n)}}function zp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(gt(t,n))return;Ml.set(n),i.uniformMatrix3fv(this.addr,!1,Ml),vt(t,n)}}function kp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(gt(t,n))return;_l.set(n),i.uniformMatrix4fv(this.addr,!1,_l),vt(t,n)}}function Hp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2iv(this.addr,e),vt(t,e)}}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3iv(this.addr,e),vt(t,e)}}function Wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4iv(this.addr,e),vt(t,e)}}function Xp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2uiv(this.addr,e),vt(t,e)}}function qp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3uiv(this.addr,e),vt(t,e)}}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4uiv(this.addr,e),vt(t,e)}}function Zp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(gl.compareFunction=fc,r=gl):r=Rc,t.setTexture2D(e||r,s)}function Kp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Pc,s)}function Jp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Dc,s)}function Qp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Cc,s)}function $p(i){switch(i){case 5126:return Ip;case 35664:return Np;case 35665:return Fp;case 35666:return Op;case 35674:return Bp;case 35675:return zp;case 35676:return kp;case 5124:case 35670:return Hp;case 35667:case 35671:return Vp;case 35668:case 35672:return Gp;case 35669:case 35673:return Wp;case 5125:return Xp;case 36294:return Yp;case 36295:return qp;case 36296:return jp;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return Kp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return Qp}}function em(i,e){i.uniform1fv(this.addr,e)}function tm(i,e){const t=Oi(e,this.size,2);i.uniform2fv(this.addr,t)}function nm(i,e){const t=Oi(e,this.size,3);i.uniform3fv(this.addr,t)}function im(i,e){const t=Oi(e,this.size,4);i.uniform4fv(this.addr,t)}function sm(i,e){const t=Oi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function rm(i,e){const t=Oi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function am(i,e){const t=Oi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function om(i,e){i.uniform1iv(this.addr,e)}function lm(i,e){i.uniform2iv(this.addr,e)}function cm(i,e){i.uniform3iv(this.addr,e)}function hm(i,e){i.uniform4iv(this.addr,e)}function um(i,e){i.uniform1uiv(this.addr,e)}function dm(i,e){i.uniform2uiv(this.addr,e)}function fm(i,e){i.uniform3uiv(this.addr,e)}function pm(i,e){i.uniform4uiv(this.addr,e)}function mm(i,e,t){const n=this.cache,s=e.length,r=lr(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Rc,r[a])}function gm(i,e,t){const n=this.cache,s=e.length,r=lr(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Pc,r[a])}function vm(i,e,t){const n=this.cache,s=e.length,r=lr(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Dc,r[a])}function xm(i,e,t){const n=this.cache,s=e.length,r=lr(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Cc,r[a])}function _m(i){switch(i){case 5126:return em;case 35664:return tm;case 35665:return nm;case 35666:return im;case 35674:return sm;case 35675:return rm;case 35676:return am;case 5124:case 35670:return om;case 35667:case 35671:return lm;case 35668:case 35672:return cm;case 35669:case 35673:return hm;case 5125:return um;case 36294:return dm;case 36295:return fm;case 36296:return pm;case 35678:case 36198:case 36298:case 36306:case 35682:return mm;case 35679:case 36299:case 36307:return gm;case 35680:case 36300:case 36308:case 36293:return vm;case 36289:case 36303:case 36311:case 36292:return xm}}class Mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$p(t.type)}}class Sm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_m(t.type)}}class ym{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Gr=/(\w+)(\])?(\[|\.)?/g;function yl(i,e){i.seq.push(e),i.map[e.id]=e}function bm(i,e,t){const n=i.name,s=n.length;for(Gr.lastIndex=0;;){const r=Gr.exec(n),a=Gr.lastIndex;let o=r[1];const h=r[2]==="]",l=r[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===s){yl(t,l===void 0?new Mm(o,i,e):new Sm(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new ym(o),yl(t,u)),t=u}}}class Ks{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);bm(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=n[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function bl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Em=37297;let Tm=0;function wm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const El=new He;function Am(i){qe._getMatrix(El,qe.workingColorSpace,i);const e=`mat3( ${El.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case er:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Tl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+wm(i.getShaderSource(e),o)}else return r}function Rm(i,e){const t=Am(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Cm(i,e){let t;switch(e){case $l:t="Linear";break;case ec:t="Reinhard";break;case tc:t="Cineon";break;case Ka:t="ACESFilmic";break;case ic:t="AgX";break;case sc:t="Neutral";break;case nc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Os=new N;function Pm(){qe.getLuminanceCoefficients(Os);const i=Os.x.toFixed(4),e=Os.y.toFixed(4),t=Os.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qi).join(`
`)}function Lm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Um(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Qi(i){return i!==""}function wl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Al(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Im=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wa(i){return i.replace(Im,Fm)}const Nm=new Map;function Fm(i,e){let t=Ge[e];if(t===void 0){const n=Nm.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Wa(t)}const Om=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(i){return i.replace(Om,Bm)}function Bm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function zm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Kl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Jl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Mn&&(e="SHADOWMAP_TYPE_VSM"),e}function km(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ci:case Pi:e="ENVMAP_TYPE_CUBE";break;case rr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Hm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pi:e="ENVMAP_MODE_REFRACTION";break}return e}function Vm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Za:e="ENVMAP_BLENDING_MULTIPLY";break;case gh:e="ENVMAP_BLENDING_MIX";break;case vh:e="ENVMAP_BLENDING_ADD";break}return e}function Gm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Wm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=zm(t),l=km(t),c=Hm(t),u=Vm(t),p=Gm(t),m=Dm(t),x=Lm(r),M=s.createProgram();let f,d,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Qi).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Qi).join(`
`),d.length>0&&(d+=`
`)):(f=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qi).join(`
`),d=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Nn?Cm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Rm("linearToOutputTexel",t.outputColorSpace),Pm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qi).join(`
`)),a=Wa(a),a=wl(a,t),a=Al(a,t),o=Wa(o),o=wl(o,t),o=Al(o,t),a=Rl(a),o=Rl(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===Lo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const T=E+f+a,b=E+d+o,C=bl(s,s.VERTEX_SHADER,T),y=bl(s,s.FRAGMENT_SHADER,b);s.attachShader(M,C),s.attachShader(M,y),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function _(S){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(M)||"",P=s.getShaderInfoLog(C)||"",U=s.getShaderInfoLog(y)||"",B=L.trim(),z=P.trim(),q=U.trim();let H=!0,X=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,C,y);else{const ee=Tl(s,C,"vertex"),oe=Tl(s,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+B+`
`+ee+`
`+oe)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(z===""||q==="")&&(X=!1);X&&(S.diagnostics={runnable:H,programLog:B,vertexShader:{log:z,prefix:f},fragmentShader:{log:q,prefix:d}})}s.deleteShader(C),s.deleteShader(y),A=new Ks(s,M),v=Um(s,M)}let A;this.getUniforms=function(){return A===void 0&&_(this),A};let v;this.getAttributes=function(){return v===void 0&&_(this),v};let g=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(M,Em)),g},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tm++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=C,this.fragmentShader=y,this}let Xm=0;class Ym{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new qm(e),t.set(e,n)),n}}class qm{constructor(e){this.id=Xm++,this.code=e,this.usedTimes=0}}function jm(i,e,t,n,s,r,a){const o=new oo,h=new Ym,l=new Set,c=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(v){return l.add(v),v===0?"uv":`uv${v}`}function f(v,g,S,L,P){const U=L.fog,B=P.geometry,z=v.isMeshStandardMaterial?L.environment:null,q=(v.isMeshStandardMaterial?t:e).get(v.envMap||z),H=q&&q.mapping===rr?q.image.height:null,X=x[v.type];v.precision!==null&&(m=s.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const ee=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,oe=ee!==void 0?ee.length:0;let Me=0;B.morphAttributes.position!==void 0&&(Me=1),B.morphAttributes.normal!==void 0&&(Me=2),B.morphAttributes.color!==void 0&&(Me=3);let Ee,Ae,Pe,K;if(X){const Je=hn[X];Ee=Je.vertexShader,Ae=Je.fragmentShader}else Ee=v.vertexShader,Ae=v.fragmentShader,h.update(v),Pe=h.getVertexShaderID(v),K=h.getFragmentShaderID(v);const J=i.getRenderTarget(),ue=i.state.buffers.depth.getReversed(),$=P.isInstancedMesh===!0,le=P.isBatchedMesh===!0,Fe=!!v.map,rt=!!v.matcap,I=!!q,Ve=!!v.aoMap,Ue=!!v.lightMap,Re=!!v.bumpMap,ve=!!v.normalMap,Ke=!!v.displacementMap,xe=!!v.emissiveMap,Ie=!!v.metalnessMap,ot=!!v.roughnessMap,et=v.anisotropy>0,D=v.clearcoat>0,w=v.dispersion>0,W=v.iridescence>0,F=v.sheen>0,Y=v.transmission>0,k=et&&!!v.anisotropyMap,ce=D&&!!v.clearcoatMap,te=D&&!!v.clearcoatNormalMap,ge=D&&!!v.clearcoatRoughnessMap,Te=W&&!!v.iridescenceMap,se=W&&!!v.iridescenceThicknessMap,fe=F&&!!v.sheenColorMap,Le=F&&!!v.sheenRoughnessMap,we=!!v.specularMap,he=!!v.specularColorMap,Oe=!!v.specularIntensityMap,O=Y&&!!v.transmissionMap,ne=Y&&!!v.thicknessMap,ae=!!v.gradientMap,Se=!!v.alphaMap,ie=v.alphaTest>0,Q=!!v.alphaHash,be=!!v.extensions;let ke=Nn;v.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ke=i.toneMapping);const at={shaderID:X,shaderType:v.type,shaderName:v.name,vertexShader:Ee,fragmentShader:Ae,defines:v.defines,customVertexShaderID:Pe,customFragmentShaderID:K,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:le,batchingColor:le&&P._colorsTexture!==null,instancing:$,instancingColor:$&&P.instanceColor!==null,instancingMorph:$&&P.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ui,alphaToCoverage:!!v.alphaToCoverage,map:Fe,matcap:rt,envMap:I,envMapMode:I&&q.mapping,envMapCubeUVHeight:H,aoMap:Ve,lightMap:Ue,bumpMap:Re,normalMap:ve,displacementMap:p&&Ke,emissiveMap:xe,normalMapObjectSpace:ve&&v.normalMapType===Sh,normalMapTangentSpace:ve&&v.normalMapType===ar,metalnessMap:Ie,roughnessMap:ot,anisotropy:et,anisotropyMap:k,clearcoat:D,clearcoatMap:ce,clearcoatNormalMap:te,clearcoatRoughnessMap:ge,dispersion:w,iridescence:W,iridescenceMap:Te,iridescenceThicknessMap:se,sheen:F,sheenColorMap:fe,sheenRoughnessMap:Le,specularMap:we,specularColorMap:he,specularIntensityMap:Oe,transmission:Y,transmissionMap:O,thicknessMap:ne,gradientMap:ae,opaque:v.transparent===!1&&v.blending===wi&&v.alphaToCoverage===!1,alphaMap:Se,alphaTest:ie,alphaHash:Q,combine:v.combine,mapUv:Fe&&M(v.map.channel),aoMapUv:Ve&&M(v.aoMap.channel),lightMapUv:Ue&&M(v.lightMap.channel),bumpMapUv:Re&&M(v.bumpMap.channel),normalMapUv:ve&&M(v.normalMap.channel),displacementMapUv:Ke&&M(v.displacementMap.channel),emissiveMapUv:xe&&M(v.emissiveMap.channel),metalnessMapUv:Ie&&M(v.metalnessMap.channel),roughnessMapUv:ot&&M(v.roughnessMap.channel),anisotropyMapUv:k&&M(v.anisotropyMap.channel),clearcoatMapUv:ce&&M(v.clearcoatMap.channel),clearcoatNormalMapUv:te&&M(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&M(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&M(v.iridescenceMap.channel),iridescenceThicknessMapUv:se&&M(v.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&M(v.sheenColorMap.channel),sheenRoughnessMapUv:Le&&M(v.sheenRoughnessMap.channel),specularMapUv:we&&M(v.specularMap.channel),specularColorMapUv:he&&M(v.specularColorMap.channel),specularIntensityMapUv:Oe&&M(v.specularIntensityMap.channel),transmissionMapUv:O&&M(v.transmissionMap.channel),thicknessMapUv:ne&&M(v.thicknessMap.channel),alphaMapUv:Se&&M(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ve||et),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!B.attributes.uv&&(Fe||Se),fog:!!U,useFog:v.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ue,skinning:P.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:Me,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&S.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Fe&&v.map.isVideoTexture===!0&&qe.getTransfer(v.map.colorSpace)===Qe,decodeVideoTextureEmissive:xe&&v.emissiveMap.isVideoTexture===!0&&qe.getTransfer(v.emissiveMap.colorSpace)===Qe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Sn,flipSided:v.side===Dt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:be&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&v.extensions.multiDraw===!0||le)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return at.vertexUv1s=l.has(1),at.vertexUv2s=l.has(2),at.vertexUv3s=l.has(3),l.clear(),at}function d(v){const g=[];if(v.shaderID?g.push(v.shaderID):(g.push(v.customVertexShaderID),g.push(v.customFragmentShaderID)),v.defines!==void 0)for(const S in v.defines)g.push(S),g.push(v.defines[S]);return v.isRawShaderMaterial===!1&&(E(g,v),T(g,v),g.push(i.outputColorSpace)),g.push(v.customProgramCacheKey),g.join()}function E(v,g){v.push(g.precision),v.push(g.outputColorSpace),v.push(g.envMapMode),v.push(g.envMapCubeUVHeight),v.push(g.mapUv),v.push(g.alphaMapUv),v.push(g.lightMapUv),v.push(g.aoMapUv),v.push(g.bumpMapUv),v.push(g.normalMapUv),v.push(g.displacementMapUv),v.push(g.emissiveMapUv),v.push(g.metalnessMapUv),v.push(g.roughnessMapUv),v.push(g.anisotropyMapUv),v.push(g.clearcoatMapUv),v.push(g.clearcoatNormalMapUv),v.push(g.clearcoatRoughnessMapUv),v.push(g.iridescenceMapUv),v.push(g.iridescenceThicknessMapUv),v.push(g.sheenColorMapUv),v.push(g.sheenRoughnessMapUv),v.push(g.specularMapUv),v.push(g.specularColorMapUv),v.push(g.specularIntensityMapUv),v.push(g.transmissionMapUv),v.push(g.thicknessMapUv),v.push(g.combine),v.push(g.fogExp2),v.push(g.sizeAttenuation),v.push(g.morphTargetsCount),v.push(g.morphAttributeCount),v.push(g.numDirLights),v.push(g.numPointLights),v.push(g.numSpotLights),v.push(g.numSpotLightMaps),v.push(g.numHemiLights),v.push(g.numRectAreaLights),v.push(g.numDirLightShadows),v.push(g.numPointLightShadows),v.push(g.numSpotLightShadows),v.push(g.numSpotLightShadowsWithMaps),v.push(g.numLightProbes),v.push(g.shadowMapType),v.push(g.toneMapping),v.push(g.numClippingPlanes),v.push(g.numClipIntersection),v.push(g.depthPacking)}function T(v,g){o.disableAll(),g.supportsVertexTextures&&o.enable(0),g.instancing&&o.enable(1),g.instancingColor&&o.enable(2),g.instancingMorph&&o.enable(3),g.matcap&&o.enable(4),g.envMap&&o.enable(5),g.normalMapObjectSpace&&o.enable(6),g.normalMapTangentSpace&&o.enable(7),g.clearcoat&&o.enable(8),g.iridescence&&o.enable(9),g.alphaTest&&o.enable(10),g.vertexColors&&o.enable(11),g.vertexAlphas&&o.enable(12),g.vertexUv1s&&o.enable(13),g.vertexUv2s&&o.enable(14),g.vertexUv3s&&o.enable(15),g.vertexTangents&&o.enable(16),g.anisotropy&&o.enable(17),g.alphaHash&&o.enable(18),g.batching&&o.enable(19),g.dispersion&&o.enable(20),g.batchingColor&&o.enable(21),g.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),g.fog&&o.enable(0),g.useFog&&o.enable(1),g.flatShading&&o.enable(2),g.logarithmicDepthBuffer&&o.enable(3),g.reversedDepthBuffer&&o.enable(4),g.skinning&&o.enable(5),g.morphTargets&&o.enable(6),g.morphNormals&&o.enable(7),g.morphColors&&o.enable(8),g.premultipliedAlpha&&o.enable(9),g.shadowMapEnabled&&o.enable(10),g.doubleSided&&o.enable(11),g.flipSided&&o.enable(12),g.useDepthPacking&&o.enable(13),g.dithering&&o.enable(14),g.transmission&&o.enable(15),g.sheen&&o.enable(16),g.opaque&&o.enable(17),g.pointsUvs&&o.enable(18),g.decodeVideoTexture&&o.enable(19),g.decodeVideoTextureEmissive&&o.enable(20),g.alphaToCoverage&&o.enable(21),v.push(o.mask)}function b(v){const g=x[v.type];let S;if(g){const L=hn[g];S=Ht.clone(L.uniforms)}else S=v.uniforms;return S}function C(v,g){let S;for(let L=0,P=c.length;L<P;L++){const U=c[L];if(U.cacheKey===g){S=U,++S.usedTimes;break}}return S===void 0&&(S=new Wm(i,g,v,r),c.push(S)),S}function y(v){if(--v.usedTimes===0){const g=c.indexOf(v);c[g]=c[c.length-1],c.pop(),v.destroy()}}function _(v){h.remove(v)}function A(){h.dispose()}return{getParameters:f,getProgramCacheKey:d,getUniforms:b,acquireProgram:C,releaseProgram:y,releaseShaderCache:_,programs:c,dispose:A}}function Zm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,h){i.get(a)[o]=h}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Km(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Pl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Dl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,p,m,x,M,f){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:p,material:m,groupOrder:x,renderOrder:u.renderOrder,z:M,group:f},i[e]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=m,d.groupOrder=x,d.renderOrder=u.renderOrder,d.z=M,d.group=f),e++,d}function o(u,p,m,x,M,f){const d=a(u,p,m,x,M,f);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function h(u,p,m,x,M,f){const d=a(u,p,m,x,M,f);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,p){t.length>1&&t.sort(u||Km),n.length>1&&n.sort(p||Pl),s.length>1&&s.sort(p||Pl)}function c(){for(let u=e,p=i.length;u<p;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:h,finish:c,sort:l}}function Jm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Dl,i.set(n,[a])):s>=r.length?(a=new Dl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Qm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ze};break;case"SpotLight":t={position:new N,direction:new N,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function $m(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let eg=0;function tg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ng(i){const e=new Qm,t=$m(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new Ye,a=new Ye;function o(l){let c=0,u=0,p=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let m=0,x=0,M=0,f=0,d=0,E=0,T=0,b=0,C=0,y=0,_=0;l.sort(tg);for(let v=0,g=l.length;v<g;v++){const S=l[v],L=S.color,P=S.intensity,U=S.distance,B=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)c+=L.r*P,u+=L.g*P,p+=L.b*P;else if(S.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(S.sh.coefficients[z],P);_++}else if(S.isDirectionalLight){const z=e.get(S);if(z.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const q=S.shadow,H=t.get(S);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,n.directionalShadow[m]=H,n.directionalShadowMap[m]=B,n.directionalShadowMatrix[m]=S.shadow.matrix,E++}n.directional[m]=z,m++}else if(S.isSpotLight){const z=e.get(S);z.position.setFromMatrixPosition(S.matrixWorld),z.color.copy(L).multiplyScalar(P),z.distance=U,z.coneCos=Math.cos(S.angle),z.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),z.decay=S.decay,n.spot[M]=z;const q=S.shadow;if(S.map&&(n.spotLightMap[C]=S.map,C++,q.updateMatrices(S),S.castShadow&&y++),n.spotLightMatrix[M]=q.matrix,S.castShadow){const H=t.get(S);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,n.spotShadow[M]=H,n.spotShadowMap[M]=B,b++}M++}else if(S.isRectAreaLight){const z=e.get(S);z.color.copy(L).multiplyScalar(P),z.halfWidth.set(S.width*.5,0,0),z.halfHeight.set(0,S.height*.5,0),n.rectArea[f]=z,f++}else if(S.isPointLight){const z=e.get(S);if(z.color.copy(S.color).multiplyScalar(S.intensity),z.distance=S.distance,z.decay=S.decay,S.castShadow){const q=S.shadow,H=t.get(S);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,H.shadowCameraNear=q.camera.near,H.shadowCameraFar=q.camera.far,n.pointShadow[x]=H,n.pointShadowMap[x]=B,n.pointShadowMatrix[x]=S.shadow.matrix,T++}n.point[x]=z,x++}else if(S.isHemisphereLight){const z=e.get(S);z.skyColor.copy(S.color).multiplyScalar(P),z.groundColor.copy(S.groundColor).multiplyScalar(P),n.hemi[d]=z,d++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=p;const A=n.hash;(A.directionalLength!==m||A.pointLength!==x||A.spotLength!==M||A.rectAreaLength!==f||A.hemiLength!==d||A.numDirectionalShadows!==E||A.numPointShadows!==T||A.numSpotShadows!==b||A.numSpotMaps!==C||A.numLightProbes!==_)&&(n.directional.length=m,n.spot.length=M,n.rectArea.length=f,n.point.length=x,n.hemi.length=d,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=b+C-y,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=_,A.directionalLength=m,A.pointLength=x,A.spotLength=M,A.rectAreaLength=f,A.hemiLength=d,A.numDirectionalShadows=E,A.numPointShadows=T,A.numSpotShadows=b,A.numSpotMaps=C,A.numLightProbes=_,n.version=eg++)}function h(l,c){let u=0,p=0,m=0,x=0,M=0;const f=c.matrixWorldInverse;for(let d=0,E=l.length;d<E;d++){const T=l[d];if(T.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),u++}else if(T.isSpotLight){const b=n.spot[m];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),m++}else if(T.isRectAreaLight){const b=n.rectArea[x];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(f),a.identity(),r.copy(T.matrixWorld),r.premultiply(f),a.extractRotation(r),b.halfWidth.set(T.width*.5,0,0),b.halfHeight.set(0,T.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){const b=n.point[p];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(f),p++}else if(T.isHemisphereLight){const b=n.hemi[M];b.direction.setFromMatrixPosition(T.matrixWorld),b.direction.transformDirection(f),M++}}}return{setup:o,setupView:h,state:n}}function Ll(i){const e=new ng(i),t=[],n=[];function s(c){l.camera=c,t.length=0,n.length=0}function r(c){t.push(c)}function a(c){n.push(c)}function o(){e.setup(t)}function h(c){e.setupView(t,c)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:h,pushLight:r,pushShadow:a}}function ig(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Ll(i),e.set(s,[o])):r>=a.length?(o=new Ll(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const sg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rg=`uniform sampler2D shadow_pass;
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
}`;function ag(i,e,t){let n=new ho;const s=new me,r=new me,a=new it,o=new Tu({depthPacking:Mh}),h=new wu,l={},c=t.maxTextureSize,u={[Fn]:Dt,[Dt]:Fn,[Sn]:Sn},p=new ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:sg,fragmentShader:rg}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const x=new on;x.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Ze(x,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kl;let d=this.type;this.render=function(y,_,A){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||y.length===0)return;const v=i.getRenderTarget(),g=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Mt),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const P=d!==Mn&&this.type===Mn,U=d===Mn&&this.type!==Mn;for(let B=0,z=y.length;B<z;B++){const q=y[B],H=q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const X=H.getFrameExtents();if(s.multiply(X),r.copy(H.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/X.x),s.x=r.x*X.x,H.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/X.y),s.y=r.y*X.y,H.mapSize.y=r.y)),H.map===null||P===!0||U===!0){const oe=this.type!==Mn?{minFilter:Et,magFilter:Et}:{};H.map!==null&&H.map.dispose(),H.map=new At(s.x,s.y,oe),H.map.texture.name=q.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const ee=H.getViewportCount();for(let oe=0;oe<ee;oe++){const Me=H.getViewport(oe);a.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),L.viewport(a),H.updateMatrices(q,oe),n=H.getFrustum(),b(_,A,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===Mn&&E(H,A),H.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(v,g,S)};function E(y,_){const A=e.update(M);p.defines.VSM_SAMPLES!==y.blurSamples&&(p.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new At(s.x,s.y)),p.uniforms.shadow_pass.value=y.map.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(_,null,A,p,M,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value=y.mapSize,m.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(_,null,A,m,M,null)}function T(y,_,A,v){let g=null;const S=A.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(S!==void 0)g=S;else if(g=A.isPointLight===!0?h:o,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const L=g.uuid,P=_.uuid;let U=l[L];U===void 0&&(U={},l[L]=U);let B=U[P];B===void 0&&(B=g.clone(),U[P]=B,_.addEventListener("dispose",C)),g=B}if(g.visible=_.visible,g.wireframe=_.wireframe,v===Mn?g.side=_.shadowSide!==null?_.shadowSide:_.side:g.side=_.shadowSide!==null?_.shadowSide:u[_.side],g.alphaMap=_.alphaMap,g.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,g.map=_.map,g.clipShadows=_.clipShadows,g.clippingPlanes=_.clippingPlanes,g.clipIntersection=_.clipIntersection,g.displacementMap=_.displacementMap,g.displacementScale=_.displacementScale,g.displacementBias=_.displacementBias,g.wireframeLinewidth=_.wireframeLinewidth,g.linewidth=_.linewidth,A.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const L=i.properties.get(g);L.light=A}return g}function b(y,_,A,v,g){if(y.visible===!1)return;if(y.layers.test(_.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&g===Mn)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,y.matrixWorld);const P=e.update(y),U=y.material;if(Array.isArray(U)){const B=P.groups;for(let z=0,q=B.length;z<q;z++){const H=B[z],X=U[H.materialIndex];if(X&&X.visible){const ee=T(y,X,v,g);y.onBeforeShadow(i,y,_,A,P,ee,H),i.renderBufferDirect(A,null,P,ee,y,H),y.onAfterShadow(i,y,_,A,P,ee,H)}}}else if(U.visible){const B=T(y,U,v,g);y.onBeforeShadow(i,y,_,A,P,B,null),i.renderBufferDirect(A,null,P,B,y,null),y.onAfterShadow(i,y,_,A,P,B,null)}}const L=y.children;for(let P=0,U=L.length;P<U;P++)b(L[P],_,A,v,g)}function C(y){y.target.removeEventListener("dispose",C);for(const A in l){const v=l[A],g=y.target.uuid;g in v&&(v[g].dispose(),delete v[g])}}}const og={[na]:ia,[sa]:oa,[ra]:la,[Ri]:aa,[ia]:na,[oa]:sa,[la]:ra,[aa]:Ri};function lg(i,e){function t(){let O=!1;const ne=new it;let ae=null;const Se=new it(0,0,0,0);return{setMask:function(ie){ae!==ie&&!O&&(i.colorMask(ie,ie,ie,ie),ae=ie)},setLocked:function(ie){O=ie},setClear:function(ie,Q,be,ke,at){at===!0&&(ie*=ke,Q*=ke,be*=ke),ne.set(ie,Q,be,ke),Se.equals(ne)===!1&&(i.clearColor(ie,Q,be,ke),Se.copy(ne))},reset:function(){O=!1,ae=null,Se.set(-1,0,0,0)}}}function n(){let O=!1,ne=!1,ae=null,Se=null,ie=null;return{setReversed:function(Q){if(ne!==Q){const be=e.get("EXT_clip_control");Q?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),ne=Q;const ke=ie;ie=null,this.setClear(ke)}},getReversed:function(){return ne},setTest:function(Q){Q?J(i.DEPTH_TEST):ue(i.DEPTH_TEST)},setMask:function(Q){ae!==Q&&!O&&(i.depthMask(Q),ae=Q)},setFunc:function(Q){if(ne&&(Q=og[Q]),Se!==Q){switch(Q){case na:i.depthFunc(i.NEVER);break;case ia:i.depthFunc(i.ALWAYS);break;case sa:i.depthFunc(i.LESS);break;case Ri:i.depthFunc(i.LEQUAL);break;case ra:i.depthFunc(i.EQUAL);break;case aa:i.depthFunc(i.GEQUAL);break;case oa:i.depthFunc(i.GREATER);break;case la:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=Q}},setLocked:function(Q){O=Q},setClear:function(Q){ie!==Q&&(ne&&(Q=1-Q),i.clearDepth(Q),ie=Q)},reset:function(){O=!1,ae=null,Se=null,ie=null,ne=!1}}}function s(){let O=!1,ne=null,ae=null,Se=null,ie=null,Q=null,be=null,ke=null,at=null;return{setTest:function(Je){O||(Je?J(i.STENCIL_TEST):ue(i.STENCIL_TEST))},setMask:function(Je){ne!==Je&&!O&&(i.stencilMask(Je),ne=Je)},setFunc:function(Je,pn,ln){(ae!==Je||Se!==pn||ie!==ln)&&(i.stencilFunc(Je,pn,ln),ae=Je,Se=pn,ie=ln)},setOp:function(Je,pn,ln){(Q!==Je||be!==pn||ke!==ln)&&(i.stencilOp(Je,pn,ln),Q=Je,be=pn,ke=ln)},setLocked:function(Je){O=Je},setClear:function(Je){at!==Je&&(i.clearStencil(Je),at=Je)},reset:function(){O=!1,ne=null,ae=null,Se=null,ie=null,Q=null,be=null,ke=null,at=null}}}const r=new t,a=new n,o=new s,h=new WeakMap,l=new WeakMap;let c={},u={},p=new WeakMap,m=[],x=null,M=!1,f=null,d=null,E=null,T=null,b=null,C=null,y=null,_=new ze(0,0,0),A=0,v=!1,g=null,S=null,L=null,P=null,U=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,q=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(H)[1]),z=q>=1):H.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),z=q>=2);let X=null,ee={};const oe=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),Ee=new it().fromArray(oe),Ae=new it().fromArray(Me);function Pe(O,ne,ae,Se){const ie=new Uint8Array(4),Q=i.createTexture();i.bindTexture(O,Q),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<ae;be++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(ne+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return Q}const K={};K[i.TEXTURE_2D]=Pe(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(Ri),Re(!1),ve(Ro),J(i.CULL_FACE),Ve(Mt);function J(O){c[O]!==!0&&(i.enable(O),c[O]=!0)}function ue(O){c[O]!==!1&&(i.disable(O),c[O]=!1)}function $(O,ne){return u[O]!==ne?(i.bindFramebuffer(O,ne),u[O]=ne,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ne),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function le(O,ne){let ae=m,Se=!1;if(O){ae=p.get(ne),ae===void 0&&(ae=[],p.set(ne,ae));const ie=O.textures;if(ae.length!==ie.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,be=ie.length;Q<be;Q++)ae[Q]=i.COLOR_ATTACHMENT0+Q;ae.length=ie.length,Se=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,Se=!0);Se&&i.drawBuffers(ae)}function Fe(O){return x!==O?(i.useProgram(O),x=O,!0):!1}const rt={[tn]:i.FUNC_ADD,[nh]:i.FUNC_SUBTRACT,[ih]:i.FUNC_REVERSE_SUBTRACT};rt[sh]=i.MIN,rt[rh]=i.MAX;const I={[Ji]:i.ZERO,[ah]:i.ONE,[oh]:i.SRC_COLOR,[Qr]:i.SRC_ALPHA,[uh]:i.SRC_ALPHA_SATURATE,[ta]:i.DST_COLOR,[ea]:i.DST_ALPHA,[lh]:i.ONE_MINUS_SRC_COLOR,[$r]:i.ONE_MINUS_SRC_ALPHA,[hh]:i.ONE_MINUS_DST_COLOR,[ch]:i.ONE_MINUS_DST_ALPHA,[dh]:i.CONSTANT_COLOR,[fh]:i.ONE_MINUS_CONSTANT_COLOR,[ph]:i.CONSTANT_ALPHA,[mh]:i.ONE_MINUS_CONSTANT_ALPHA};function Ve(O,ne,ae,Se,ie,Q,be,ke,at,Je){if(O===Mt){M===!0&&(ue(i.BLEND),M=!1);return}if(M===!1&&(J(i.BLEND),M=!0),O!==Ql){if(O!==f||Je!==v){if((d!==tn||b!==tn)&&(i.blendEquation(i.FUNC_ADD),d=tn,b=tn),Je)switch(O){case wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jr:i.blendFunc(i.ONE,i.ONE);break;case Co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Po:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Co:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Po:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}E=null,T=null,C=null,y=null,_.set(0,0,0),A=0,f=O,v=Je}return}ie=ie||ne,Q=Q||ae,be=be||Se,(ne!==d||ie!==b)&&(i.blendEquationSeparate(rt[ne],rt[ie]),d=ne,b=ie),(ae!==E||Se!==T||Q!==C||be!==y)&&(i.blendFuncSeparate(I[ae],I[Se],I[Q],I[be]),E=ae,T=Se,C=Q,y=be),(ke.equals(_)===!1||at!==A)&&(i.blendColor(ke.r,ke.g,ke.b,at),_.copy(ke),A=at),f=O,v=!1}function Ue(O,ne){O.side===Sn?ue(i.CULL_FACE):J(i.CULL_FACE);let ae=O.side===Dt;ne&&(ae=!ae),Re(ae),O.blending===wi&&O.transparent===!1?Ve(Mt):Ve(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const Se=O.stencilWrite;o.setTest(Se),Se&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),xe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function Re(O){g!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),g=O)}function ve(O){O!==eh?(J(i.CULL_FACE),O!==S&&(O===Ro?i.cullFace(i.BACK):O===th?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ue(i.CULL_FACE),S=O}function Ke(O){O!==L&&(z&&i.lineWidth(O),L=O)}function xe(O,ne,ae){O?(J(i.POLYGON_OFFSET_FILL),(P!==ne||U!==ae)&&(i.polygonOffset(ne,ae),P=ne,U=ae)):ue(i.POLYGON_OFFSET_FILL)}function Ie(O){O?J(i.SCISSOR_TEST):ue(i.SCISSOR_TEST)}function ot(O){O===void 0&&(O=i.TEXTURE0+B-1),X!==O&&(i.activeTexture(O),X=O)}function et(O,ne,ae){ae===void 0&&(X===null?ae=i.TEXTURE0+B-1:ae=X);let Se=ee[ae];Se===void 0&&(Se={type:void 0,texture:void 0},ee[ae]=Se),(Se.type!==O||Se.texture!==ne)&&(X!==ae&&(i.activeTexture(ae),X=ae),i.bindTexture(O,ne||K[O]),Se.type=O,Se.texture=ne)}function D(){const O=ee[X];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function F(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Y(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ce(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ge(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Te(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function se(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(O){Ee.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Ee.copy(O))}function Le(O){Ae.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Ae.copy(O))}function we(O,ne){let ae=l.get(ne);ae===void 0&&(ae=new WeakMap,l.set(ne,ae));let Se=ae.get(O);Se===void 0&&(Se=i.getUniformBlockIndex(ne,O.name),ae.set(O,Se))}function he(O,ne){const Se=l.get(ne).get(O);h.get(ne)!==Se&&(i.uniformBlockBinding(ne,Se,O.__bindingPointIndex),h.set(ne,Se))}function Oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},X=null,ee={},u={},p=new WeakMap,m=[],x=null,M=!1,f=null,d=null,E=null,T=null,b=null,C=null,y=null,_=new ze(0,0,0),A=0,v=!1,g=null,S=null,L=null,P=null,U=null,Ee.set(0,0,i.canvas.width,i.canvas.height),Ae.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:ue,bindFramebuffer:$,drawBuffers:le,useProgram:Fe,setBlending:Ve,setMaterial:Ue,setFlipSided:Re,setCullFace:ve,setLineWidth:Ke,setPolygonOffset:xe,setScissorTest:Ie,activeTexture:ot,bindTexture:et,unbindTexture:D,compressedTexImage2D:w,compressedTexImage3D:W,texImage2D:Te,texImage3D:se,updateUBOMapping:we,uniformBlockBinding:he,texStorage2D:te,texStorage3D:ge,texSubImage2D:F,texSubImage3D:Y,compressedTexSubImage2D:k,compressedTexSubImage3D:ce,scissor:fe,viewport:Le,reset:Oe}}function cg(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new me,c=new WeakMap;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(D,w){return m?new OffscreenCanvas(D,w):nr("canvas")}function M(D,w,W){let F=1;const Y=et(D);if((Y.width>W||Y.height>W)&&(F=W/Math.max(Y.width,Y.height)),F<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const k=Math.floor(F*Y.width),ce=Math.floor(F*Y.height);u===void 0&&(u=x(k,ce));const te=w?x(k,ce):u;return te.width=k,te.height=ce,te.getContext("2d").drawImage(D,0,0,k,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+k+"x"+ce+")."),te}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),D;return D}function f(D){return D.generateMipmaps}function d(D){i.generateMipmap(D)}function E(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(D,w,W,F,Y=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let k=w;if(w===i.RED&&(W===i.FLOAT&&(k=i.R32F),W===i.HALF_FLOAT&&(k=i.R16F),W===i.UNSIGNED_BYTE&&(k=i.R8)),w===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.R8UI),W===i.UNSIGNED_SHORT&&(k=i.R16UI),W===i.UNSIGNED_INT&&(k=i.R32UI),W===i.BYTE&&(k=i.R8I),W===i.SHORT&&(k=i.R16I),W===i.INT&&(k=i.R32I)),w===i.RG&&(W===i.FLOAT&&(k=i.RG32F),W===i.HALF_FLOAT&&(k=i.RG16F),W===i.UNSIGNED_BYTE&&(k=i.RG8)),w===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.RG8UI),W===i.UNSIGNED_SHORT&&(k=i.RG16UI),W===i.UNSIGNED_INT&&(k=i.RG32UI),W===i.BYTE&&(k=i.RG8I),W===i.SHORT&&(k=i.RG16I),W===i.INT&&(k=i.RG32I)),w===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.RGB8UI),W===i.UNSIGNED_SHORT&&(k=i.RGB16UI),W===i.UNSIGNED_INT&&(k=i.RGB32UI),W===i.BYTE&&(k=i.RGB8I),W===i.SHORT&&(k=i.RGB16I),W===i.INT&&(k=i.RGB32I)),w===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(k=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(k=i.RGBA16UI),W===i.UNSIGNED_INT&&(k=i.RGBA32UI),W===i.BYTE&&(k=i.RGBA8I),W===i.SHORT&&(k=i.RGBA16I),W===i.INT&&(k=i.RGBA32I)),w===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(k=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(k=i.R11F_G11F_B10F)),w===i.RGBA){const ce=Y?er:qe.getTransfer(F);W===i.FLOAT&&(k=i.RGBA32F),W===i.HALF_FLOAT&&(k=i.RGBA16F),W===i.UNSIGNED_BYTE&&(k=ce===Qe?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(k=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(k=i.RGB5_A1)}return(k===i.R16F||k===i.R32F||k===i.RG16F||k===i.RG32F||k===i.RGBA16F||k===i.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function b(D,w){let W;return D?w===null||w===ei||w===Di?W=i.DEPTH24_STENCIL8:w===un?W=i.DEPTH32F_STENCIL8:w===ns&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ei||w===Di?W=i.DEPTH_COMPONENT24:w===un?W=i.DEPTH_COMPONENT32F:w===ns&&(W=i.DEPTH_COMPONENT16),W}function C(D,w){return f(D)===!0||D.isFramebufferTexture&&D.minFilter!==Et&&D.minFilter!==sn?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function y(D){const w=D.target;w.removeEventListener("dispose",y),A(w),w.isVideoTexture&&c.delete(w)}function _(D){const w=D.target;w.removeEventListener("dispose",_),g(w)}function A(D){const w=n.get(D);if(w.__webglInit===void 0)return;const W=D.source,F=p.get(W);if(F){const Y=F[w.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&v(D),Object.keys(F).length===0&&p.delete(W)}n.remove(D)}function v(D){const w=n.get(D);i.deleteTexture(w.__webglTexture);const W=D.source,F=p.get(W);delete F[w.__cacheKey],a.memory.textures--}function g(D){const w=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(w.__webglFramebuffer[F]))for(let Y=0;Y<w.__webglFramebuffer[F].length;Y++)i.deleteFramebuffer(w.__webglFramebuffer[F][Y]);else i.deleteFramebuffer(w.__webglFramebuffer[F]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[F])}else{if(Array.isArray(w.__webglFramebuffer))for(let F=0;F<w.__webglFramebuffer.length;F++)i.deleteFramebuffer(w.__webglFramebuffer[F]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let F=0;F<w.__webglColorRenderbuffer.length;F++)w.__webglColorRenderbuffer[F]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[F]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const W=D.textures;for(let F=0,Y=W.length;F<Y;F++){const k=n.get(W[F]);k.__webglTexture&&(i.deleteTexture(k.__webglTexture),a.memory.textures--),n.remove(W[F])}n.remove(D)}let S=0;function L(){S=0}function P(){const D=S;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),S+=1,D}function U(D){const w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function B(D,w){const W=n.get(D);if(D.isVideoTexture&&Ie(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&W.__version!==D.version){const F=D.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(W,D,w);return}}else D.isExternalTexture&&(W.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+w)}function z(D,w){const W=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&W.__version!==D.version){K(W,D,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+w)}function q(D,w){const W=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&W.__version!==D.version){K(W,D,w);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+w)}function H(D,w){const W=n.get(D);if(D.version>0&&W.__version!==D.version){J(W,D,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+w)}const X={[On]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[ua]:i.MIRRORED_REPEAT},ee={[Et]:i.NEAREST,[xh]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[dr]:i.LINEAR_MIPMAP_NEAREST,[Qn]:i.LINEAR_MIPMAP_LINEAR},oe={[yh]:i.NEVER,[Rh]:i.ALWAYS,[bh]:i.LESS,[fc]:i.LEQUAL,[Eh]:i.EQUAL,[Ah]:i.GEQUAL,[Th]:i.GREATER,[wh]:i.NOTEQUAL};function Me(D,w){if(w.type===un&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===sn||w.magFilter===dr||w.magFilter===fs||w.magFilter===Qn||w.minFilter===sn||w.minFilter===dr||w.minFilter===fs||w.minFilter===Qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,X[w.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,X[w.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,X[w.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,ee[w.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,ee[w.minFilter]),w.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,oe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Et||w.minFilter!==fs&&w.minFilter!==Qn||w.type===un&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Ee(D,w){let W=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",y));const F=w.source;let Y=p.get(F);Y===void 0&&(Y={},p.set(F,Y));const k=U(w);if(k!==D.__cacheKey){Y[k]===void 0&&(Y[k]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),Y[k].usedTimes++;const ce=Y[D.__cacheKey];ce!==void 0&&(Y[D.__cacheKey].usedTimes--,ce.usedTimes===0&&v(w)),D.__cacheKey=k,D.__webglTexture=Y[k].texture}return W}function Ae(D,w,W){return Math.floor(Math.floor(D/W)/w)}function Pe(D,w,W,F){const k=D.updateRanges;if(k.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,W,F,w.data);else{k.sort((se,fe)=>se.start-fe.start);let ce=0;for(let se=1;se<k.length;se++){const fe=k[ce],Le=k[se],we=fe.start+fe.count,he=Ae(Le.start,w.width,4),Oe=Ae(fe.start,w.width,4);Le.start<=we+1&&he===Oe&&Ae(Le.start+Le.count-1,w.width,4)===he?fe.count=Math.max(fe.count,Le.start+Le.count-fe.start):(++ce,k[ce]=Le)}k.length=ce+1;const te=i.getParameter(i.UNPACK_ROW_LENGTH),ge=i.getParameter(i.UNPACK_SKIP_PIXELS),Te=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let se=0,fe=k.length;se<fe;se++){const Le=k[se],we=Math.floor(Le.start/4),he=Math.ceil(Le.count/4),Oe=we%w.width,O=Math.floor(we/w.width),ne=he,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Oe),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Oe,O,ne,ae,W,F,w.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,te),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,Te)}}function K(D,w,W){let F=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(F=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(F=i.TEXTURE_3D);const Y=Ee(D,w),k=w.source;t.bindTexture(F,D.__webglTexture,i.TEXTURE0+W);const ce=n.get(k);if(k.version!==ce.__version||Y===!0){t.activeTexture(i.TEXTURE0+W);const te=qe.getPrimaries(qe.workingColorSpace),ge=w.colorSpace===Ln?null:qe.getPrimaries(w.colorSpace),Te=w.colorSpace===Ln||te===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let se=M(w.image,!1,s.maxTextureSize);se=ot(w,se);const fe=r.convert(w.format,w.colorSpace),Le=r.convert(w.type);let we=T(w.internalFormat,fe,Le,w.colorSpace,w.isVideoTexture);Me(F,w);let he;const Oe=w.mipmaps,O=w.isVideoTexture!==!0,ne=ce.__version===void 0||Y===!0,ae=k.dataReady,Se=C(w,se);if(w.isDepthTexture)we=b(w.format===Li,w.type),ne&&(O?t.texStorage2D(i.TEXTURE_2D,1,we,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,we,se.width,se.height,0,fe,Le,null));else if(w.isDataTexture)if(Oe.length>0){O&&ne&&t.texStorage2D(i.TEXTURE_2D,Se,we,Oe[0].width,Oe[0].height);for(let ie=0,Q=Oe.length;ie<Q;ie++)he=Oe[ie],O?ae&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,he.width,he.height,fe,Le,he.data):t.texImage2D(i.TEXTURE_2D,ie,we,he.width,he.height,0,fe,Le,he.data);w.generateMipmaps=!1}else O?(ne&&t.texStorage2D(i.TEXTURE_2D,Se,we,se.width,se.height),ae&&Pe(w,se,fe,Le)):t.texImage2D(i.TEXTURE_2D,0,we,se.width,se.height,0,fe,Le,se.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){O&&ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,we,Oe[0].width,Oe[0].height,se.depth);for(let ie=0,Q=Oe.length;ie<Q;ie++)if(he=Oe[ie],w.format!==Zt)if(fe!==null)if(O){if(ae)if(w.layerUpdates.size>0){const be=cl(he.width,he.height,w.format,w.type);for(const ke of w.layerUpdates){const at=he.data.subarray(ke*be/he.data.BYTES_PER_ELEMENT,(ke+1)*be/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ke,he.width,he.height,1,fe,at)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,se.depth,fe,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,we,he.width,he.height,se.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,se.depth,fe,Le,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,we,he.width,he.height,se.depth,0,fe,Le,he.data)}else{O&&ne&&t.texStorage2D(i.TEXTURE_2D,Se,we,Oe[0].width,Oe[0].height);for(let ie=0,Q=Oe.length;ie<Q;ie++)he=Oe[ie],w.format!==Zt?fe!==null?O?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,we,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ae&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,he.width,he.height,fe,Le,he.data):t.texImage2D(i.TEXTURE_2D,ie,we,he.width,he.height,0,fe,Le,he.data)}else if(w.isDataArrayTexture)if(O){if(ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,we,se.width,se.height,se.depth),ae)if(w.layerUpdates.size>0){const ie=cl(se.width,se.height,w.format,w.type);for(const Q of w.layerUpdates){const be=se.data.subarray(Q*ie/se.data.BYTES_PER_ELEMENT,(Q+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,se.width,se.height,1,fe,Le,be)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,fe,Le,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,se.width,se.height,se.depth,0,fe,Le,se.data);else if(w.isData3DTexture)O?(ne&&t.texStorage3D(i.TEXTURE_3D,Se,we,se.width,se.height,se.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,fe,Le,se.data)):t.texImage3D(i.TEXTURE_3D,0,we,se.width,se.height,se.depth,0,fe,Le,se.data);else if(w.isFramebufferTexture){if(ne)if(O)t.texStorage2D(i.TEXTURE_2D,Se,we,se.width,se.height);else{let ie=se.width,Q=se.height;for(let be=0;be<Se;be++)t.texImage2D(i.TEXTURE_2D,be,we,ie,Q,0,fe,Le,null),ie>>=1,Q>>=1}}else if(Oe.length>0){if(O&&ne){const ie=et(Oe[0]);t.texStorage2D(i.TEXTURE_2D,Se,we,ie.width,ie.height)}for(let ie=0,Q=Oe.length;ie<Q;ie++)he=Oe[ie],O?ae&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe,Le,he):t.texImage2D(i.TEXTURE_2D,ie,we,fe,Le,he);w.generateMipmaps=!1}else if(O){if(ne){const ie=et(se);t.texStorage2D(i.TEXTURE_2D,Se,we,ie.width,ie.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Le,se)}else t.texImage2D(i.TEXTURE_2D,0,we,fe,Le,se);f(w)&&d(F),ce.__version=k.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function J(D,w,W){if(w.image.length!==6)return;const F=Ee(D,w),Y=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+W);const k=n.get(Y);if(Y.version!==k.__version||F===!0){t.activeTexture(i.TEXTURE0+W);const ce=qe.getPrimaries(qe.workingColorSpace),te=w.colorSpace===Ln?null:qe.getPrimaries(w.colorSpace),ge=w.colorSpace===Ln||ce===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Te=w.isCompressedTexture||w.image[0].isCompressedTexture,se=w.image[0]&&w.image[0].isDataTexture,fe=[];for(let Q=0;Q<6;Q++)!Te&&!se?fe[Q]=M(w.image[Q],!0,s.maxCubemapSize):fe[Q]=se?w.image[Q].image:w.image[Q],fe[Q]=ot(w,fe[Q]);const Le=fe[0],we=r.convert(w.format,w.colorSpace),he=r.convert(w.type),Oe=T(w.internalFormat,we,he,w.colorSpace),O=w.isVideoTexture!==!0,ne=k.__version===void 0||F===!0,ae=Y.dataReady;let Se=C(w,Le);Me(i.TEXTURE_CUBE_MAP,w);let ie;if(Te){O&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,Oe,Le.width,Le.height);for(let Q=0;Q<6;Q++){ie=fe[Q].mipmaps;for(let be=0;be<ie.length;be++){const ke=ie[be];w.format!==Zt?we!==null?O?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,ke.width,ke.height,we,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Oe,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,ke.width,ke.height,we,he,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Oe,ke.width,ke.height,0,we,he,ke.data)}}}else{if(ie=w.mipmaps,O&&ne){ie.length>0&&Se++;const Q=et(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,Oe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(se){O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,fe[Q].width,fe[Q].height,we,he,fe[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Oe,fe[Q].width,fe[Q].height,0,we,he,fe[Q].data);for(let be=0;be<ie.length;be++){const at=ie[be].image[Q].image;O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,at.width,at.height,we,he,at.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Oe,at.width,at.height,0,we,he,at.data)}}else{O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,we,he,fe[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Oe,we,he,fe[Q]);for(let be=0;be<ie.length;be++){const ke=ie[be];O?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,we,he,ke.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Oe,we,he,ke.image[Q])}}}f(w)&&d(i.TEXTURE_CUBE_MAP),k.__version=Y.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function ue(D,w,W,F,Y,k){const ce=r.convert(W.format,W.colorSpace),te=r.convert(W.type),ge=T(W.internalFormat,ce,te,W.colorSpace),Te=n.get(w),se=n.get(W);if(se.__renderTarget=w,!Te.__hasExternalTextures){const fe=Math.max(1,w.width>>k),Le=Math.max(1,w.height>>k);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,k,ge,fe,Le,w.depth,0,ce,te,null):t.texImage2D(Y,k,ge,fe,Le,0,ce,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),xe(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,F,Y,se.__webglTexture,0,Ke(w)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,F,Y,se.__webglTexture,k),t.bindFramebuffer(i.FRAMEBUFFER,null)}function $(D,w,W){if(i.bindRenderbuffer(i.RENDERBUFFER,D),w.depthBuffer){const F=w.depthTexture,Y=F&&F.isDepthTexture?F.type:null,k=b(w.stencilBuffer,Y),ce=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=Ke(w);xe(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,k,w.width,w.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,k,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,k,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,D)}else{const F=w.textures;for(let Y=0;Y<F.length;Y++){const k=F[Y],ce=r.convert(k.format,k.colorSpace),te=r.convert(k.type),ge=T(k.internalFormat,ce,te,k.colorSpace),Te=Ke(w);W&&xe(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,ge,w.width,w.height):xe(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te,ge,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ge,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function le(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const F=n.get(w.depthTexture);F.__renderTarget=w,(!F.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),B(w.depthTexture,0);const Y=F.__webglTexture,k=Ke(w);if(w.depthTexture.format===is)xe(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(w.depthTexture.format===Li)xe(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Fe(D){const w=n.get(D),W=D.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==D.depthTexture){const F=D.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),F){const Y=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,F.removeEventListener("dispose",Y)};F.addEventListener("dispose",Y),w.__depthDisposeCallback=Y}w.__boundDepthTexture=F}if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const F=D.texture.mipmaps;F&&F.length>0?le(w.__webglFramebuffer[0],D):le(w.__webglFramebuffer,D)}else if(W){w.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[F]),w.__webglDepthbuffer[F]===void 0)w.__webglDepthbuffer[F]=i.createRenderbuffer(),$(w.__webglDepthbuffer[F],D,!1);else{const Y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=w.__webglDepthbuffer[F];i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,k)}}else{const F=D.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),$(w.__webglDepthbuffer,D,!1);else{const Y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,k)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(D,w,W){const F=n.get(D);w!==void 0&&ue(F.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Fe(D)}function I(D){const w=D.texture,W=n.get(D),F=n.get(w);D.addEventListener("dispose",_);const Y=D.textures,k=D.isWebGLCubeRenderTarget===!0,ce=Y.length>1;if(ce||(F.__webglTexture===void 0&&(F.__webglTexture=i.createTexture()),F.__version=w.version,a.memory.textures++),k){W.__webglFramebuffer=[];for(let te=0;te<6;te++)if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer[te]=[];for(let ge=0;ge<w.mipmaps.length;ge++)W.__webglFramebuffer[te][ge]=i.createFramebuffer()}else W.__webglFramebuffer[te]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer=[];for(let te=0;te<w.mipmaps.length;te++)W.__webglFramebuffer[te]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(ce)for(let te=0,ge=Y.length;te<ge;te++){const Te=n.get(Y[te]);Te.__webglTexture===void 0&&(Te.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&xe(D)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let te=0;te<Y.length;te++){const ge=Y[te];W.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[te]);const Te=r.convert(ge.format,ge.colorSpace),se=r.convert(ge.type),fe=T(ge.internalFormat,Te,se,ge.colorSpace,D.isXRRenderTarget===!0),Le=Ke(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,fe,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,W.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),$(W.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(k){t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture),Me(i.TEXTURE_CUBE_MAP,w);for(let te=0;te<6;te++)if(w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)ue(W.__webglFramebuffer[te][ge],D,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ge);else ue(W.__webglFramebuffer[te],D,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);f(w)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let te=0,ge=Y.length;te<ge;te++){const Te=Y[te],se=n.get(Te);let fe=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(fe=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,se.__webglTexture),Me(fe,Te),ue(W.__webglFramebuffer,D,Te,i.COLOR_ATTACHMENT0+te,fe,0),f(Te)&&d(fe)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(te=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,F.__webglTexture),Me(te,w),w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)ue(W.__webglFramebuffer[ge],D,w,i.COLOR_ATTACHMENT0,te,ge);else ue(W.__webglFramebuffer,D,w,i.COLOR_ATTACHMENT0,te,0);f(w)&&d(te),t.unbindTexture()}D.depthBuffer&&Fe(D)}function Ve(D){const w=D.textures;for(let W=0,F=w.length;W<F;W++){const Y=w[W];if(f(Y)){const k=E(D),ce=n.get(Y).__webglTexture;t.bindTexture(k,ce),d(k),t.unbindTexture()}}}const Ue=[],Re=[];function ve(D){if(D.samples>0){if(xe(D)===!1){const w=D.textures,W=D.width,F=D.height;let Y=i.COLOR_BUFFER_BIT;const k=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(D),te=w.length>1;if(te)for(let Te=0;Te<w.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const ge=D.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let Te=0;Te<w.length;Te++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[Te]);const se=n.get(w[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,W,F,0,0,W,F,Y,i.NEAREST),h===!0&&(Ue.length=0,Re.length=0,Ue.push(i.COLOR_ATTACHMENT0+Te),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ue.push(k),Re.push(k),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Re)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let Te=0;Te<w.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,ce.__webglColorRenderbuffer[Te]);const se=n.get(w[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&h){const w=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function Ke(D){return Math.min(s.maxSamples,D.samples)}function xe(D){const w=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ie(D){const w=a.render.frame;c.get(D)!==w&&(c.set(D,w),D.update())}function ot(D,w){const W=D.colorSpace,F=D.format,Y=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||W!==Ui&&W!==Ln&&(qe.getTransfer(W)===Qe?(F!==Zt||Y!==rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),w}function et(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=L,this.setTexture2D=B,this.setTexture2DArray=z,this.setTexture3D=q,this.setTextureCube=H,this.rebindTextures=rt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=xe}function hg(i,e){function t(n,s=Ln){let r;const a=qe.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===Qa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$a)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ac)return i.BYTE;if(n===oc)return i.SHORT;if(n===ns)return i.UNSIGNED_SHORT;if(n===Ja)return i.INT;if(n===ei)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===It)return i.HALF_FLOAT;if(n===hc)return i.ALPHA;if(n===uc)return i.RGB;if(n===Zt)return i.RGBA;if(n===is)return i.DEPTH_COMPONENT;if(n===Li)return i.DEPTH_STENCIL;if(n===eo)return i.RED;if(n===to)return i.RED_INTEGER;if(n===dc)return i.RG;if(n===no)return i.RG_INTEGER;if(n===io)return i.RGBA_INTEGER;if(n===Ys||n===qs||n===js||n===Zs)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ys)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ys)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===da||n===fa||n===pa||n===ma)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===da)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ga||n===va||n===xa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ga||n===va)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_a||n===Ma||n===Sa||n===ya||n===ba||n===Ea||n===Ta||n===wa||n===Aa||n===Ra||n===Ca||n===Pa||n===Da||n===La)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_a)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ya)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ba)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ea)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ta)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Aa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ra)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ca)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Da)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===La)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ua||n===Ia||n===Na)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ua)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fa||n===Oa||n===Ba||n===za)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Di?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const ug=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dg=`
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

}`;class fg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Tc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ut({vertexShader:ug,fragmentShader:dg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pg extends ti{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",h=1,l=null,c=null,u=null,p=null,m=null,x=null;const M=typeof XRWebGLBinding<"u",f=new fg,d={},E=t.getContextAttributes();let T=null,b=null;const C=[],y=[],_=new me;let A=null;const v=new kt;v.viewport=new it;const g=new kt;g.viewport=new it;const S=[v,g],L=new Du;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let J=C[K];return J===void 0&&(J=new Ur,C[K]=J),J.getTargetRaySpace()},this.getControllerGrip=function(K){let J=C[K];return J===void 0&&(J=new Ur,C[K]=J),J.getGripSpace()},this.getHand=function(K){let J=C[K];return J===void 0&&(J=new Ur,C[K]=J),J.getHandSpace()};function B(K){const J=y.indexOf(K.inputSource);if(J===-1)return;const ue=C[J];ue!==void 0&&(ue.update(K.inputSource,K.frame,l||a),ue.dispatchEvent({type:K.type,data:K.inputSource}))}function z(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",q);for(let K=0;K<C.length;K++){const J=y[K];J!==null&&(y[K]=null,C[K].disconnect(J))}P=null,U=null,f.reset();for(const K in d)delete d[K];e.setRenderTarget(T),m=null,p=null,u=null,s=null,b=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(_.width,_.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",z),s.addEventListener("inputsourceschange",q),E.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(_),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,$=null,le=null;E.depth&&(le=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=E.stencil?Li:is,$=E.stencil?Di:ei);const Fe={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(Fe),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),b=new At(p.textureWidth,p.textureHeight,{format:Zt,type:rn,depthTexture:new uo(p.textureWidth,p.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ue={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new At(m.framebufferWidth,m.framebufferHeight,{format:Zt,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await s.requestReferenceSpace(o),Pe.setContext(s),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function q(K){for(let J=0;J<K.removed.length;J++){const ue=K.removed[J],$=y.indexOf(ue);$>=0&&(y[$]=null,C[$].disconnect(ue))}for(let J=0;J<K.added.length;J++){const ue=K.added[J];let $=y.indexOf(ue);if($===-1){for(let Fe=0;Fe<C.length;Fe++)if(Fe>=y.length){y.push(ue),$=Fe;break}else if(y[Fe]===null){y[Fe]=ue,$=Fe;break}if($===-1)break}const le=C[$];le&&le.connect(ue)}}const H=new N,X=new N;function ee(K,J,ue){H.setFromMatrixPosition(J.matrixWorld),X.setFromMatrixPosition(ue.matrixWorld);const $=H.distanceTo(X),le=J.projectionMatrix.elements,Fe=ue.projectionMatrix.elements,rt=le[14]/(le[10]-1),I=le[14]/(le[10]+1),Ve=(le[9]+1)/le[5],Ue=(le[9]-1)/le[5],Re=(le[8]-1)/le[0],ve=(Fe[8]+1)/Fe[0],Ke=rt*Re,xe=rt*ve,Ie=$/(-Re+ve),ot=Ie*-Re;if(J.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ot),K.translateZ(Ie),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),le[10]===-1)K.projectionMatrix.copy(J.projectionMatrix),K.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const et=rt+Ie,D=I+Ie,w=Ke-ot,W=xe+($-ot),F=Ve*I/D*et,Y=Ue*I/D*et;K.projectionMatrix.makePerspective(w,W,F,Y,et,D),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function oe(K,J){J===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(J.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let J=K.near,ue=K.far;f.texture!==null&&(f.depthNear>0&&(J=f.depthNear),f.depthFar>0&&(ue=f.depthFar)),L.near=g.near=v.near=J,L.far=g.far=v.far=ue,(P!==L.near||U!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),P=L.near,U=L.far),L.layers.mask=K.layers.mask|6,v.layers.mask=L.layers.mask&3,g.layers.mask=L.layers.mask&5;const $=K.parent,le=L.cameras;oe(L,$);for(let Fe=0;Fe<le.length;Fe++)oe(le[Fe],$);le.length===2?ee(L,v,g):L.projectionMatrix.copy(v.projectionMatrix),Me(K,L,$)};function Me(K,J,ue){ue===null?K.matrix.copy(J.matrixWorld):(K.matrix.copy(ue.matrixWorld),K.matrix.invert(),K.matrix.multiply(J.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(J.projectionMatrix),K.projectionMatrixInverse.copy(J.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ss*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(p===null&&m===null))return h},this.setFoveation=function(K){h=K,p!==null&&(p.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(L)},this.getCameraTexture=function(K){return d[K]};let Ee=null;function Ae(K,J){if(c=J.getViewerPose(l||a),x=J,c!==null){const ue=c.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let $=!1;ue.length!==L.cameras.length&&(L.cameras.length=0,$=!0);for(let I=0;I<ue.length;I++){const Ve=ue[I];let Ue=null;if(m!==null)Ue=m.getViewport(Ve);else{const ve=u.getViewSubImage(p,Ve);Ue=ve.viewport,I===0&&(e.setRenderTargetTextures(b,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(b))}let Re=S[I];Re===void 0&&(Re=new kt,Re.layers.enable(I),Re.viewport=new it,S[I]=Re),Re.matrix.fromArray(Ve.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(Ve.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),I===0&&(L.matrix.copy(Re.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),$===!0&&L.cameras.push(Re)}const le=s.enabledFeatures;if(le&&le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const I=u.getDepthInformation(ue[0]);I&&I.isValid&&I.texture&&f.init(I,s.renderState)}if(le&&le.includes("camera-access")&&M){e.state.unbindTexture(),u=n.getBinding();for(let I=0;I<ue.length;I++){const Ve=ue[I].camera;if(Ve){let Ue=d[Ve];Ue||(Ue=new Tc,d[Ve]=Ue);const Re=u.getCameraImage(Ve);Ue.sourceTexture=Re}}}}for(let ue=0;ue<C.length;ue++){const $=y[ue],le=C[ue];$!==null&&le!==void 0&&le.update($,J,l||a)}Ee&&Ee(K,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),x=null}const Pe=new Ac;Pe.setAnimationLoop(Ae),this.setAnimationLoop=function(K){Ee=K},this.dispose=function(){}}}const jn=new Nt,mg=new Ye;function gg(i,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,_c(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,E,T,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(f,d):d.isMeshToonMaterial?(r(f,d),u(f,d)):d.isMeshPhongMaterial?(r(f,d),c(f,d)):d.isMeshStandardMaterial?(r(f,d),p(f,d),d.isMeshPhysicalMaterial&&m(f,d,b)):d.isMeshMatcapMaterial?(r(f,d),x(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),M(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?h(f,d,E,T):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Dt&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Dt&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const E=e.get(d),T=E.envMap,b=E.envMapRotation;T&&(f.envMap.value=T,jn.copy(b),jn.x*=-1,jn.y*=-1,jn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),f.envMapRotation.value.setFromMatrix4(mg.makeRotationFromEuler(jn)),f.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function h(f,d,E,T){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*E,f.scale.value=T*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function c(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function u(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,E){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Dt&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function x(f,d){d.matcap&&(f.matcap.value=d.matcap)}function M(f,d){const E=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function vg(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(E,T){const b=T.program;n.uniformBlockBinding(E,b)}function l(E,T){let b=s[E.id];b===void 0&&(x(E),b=c(E),s[E.id]=b,E.addEventListener("dispose",f));const C=T.program;n.updateUBOMapping(E,C);const y=e.render.frame;r[E.id]!==y&&(p(E),r[E.id]=y)}function c(E){const T=u();E.__bindingPointIndex=T;const b=i.createBuffer(),C=E.__size,y=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const T=s[E.id],b=E.uniforms,C=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let y=0,_=b.length;y<_;y++){const A=Array.isArray(b[y])?b[y]:[b[y]];for(let v=0,g=A.length;v<g;v++){const S=A[v];if(m(S,y,v,C)===!0){const L=S.__offset,P=Array.isArray(S.value)?S.value:[S.value];let U=0;for(let B=0;B<P.length;B++){const z=P[B],q=M(z);typeof z=="number"||typeof z=="boolean"?(S.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,L+U,S.__data)):z.isMatrix3?(S.__data[0]=z.elements[0],S.__data[1]=z.elements[1],S.__data[2]=z.elements[2],S.__data[3]=0,S.__data[4]=z.elements[3],S.__data[5]=z.elements[4],S.__data[6]=z.elements[5],S.__data[7]=0,S.__data[8]=z.elements[6],S.__data[9]=z.elements[7],S.__data[10]=z.elements[8],S.__data[11]=0):(z.toArray(S.__data,U),U+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,T,b,C){const y=E.value,_=T+"_"+b;if(C[_]===void 0)return typeof y=="number"||typeof y=="boolean"?C[_]=y:C[_]=y.clone(),!0;{const A=C[_];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return C[_]=y,!0}else if(A.equals(y)===!1)return A.copy(y),!0}return!1}function x(E){const T=E.uniforms;let b=0;const C=16;for(let _=0,A=T.length;_<A;_++){const v=Array.isArray(T[_])?T[_]:[T[_]];for(let g=0,S=v.length;g<S;g++){const L=v[g],P=Array.isArray(L.value)?L.value:[L.value];for(let U=0,B=P.length;U<B;U++){const z=P[U],q=M(z),H=b%C,X=H%q.boundary,ee=H+X;b+=X,ee!==0&&C-ee<q.storage&&(b+=C-ee),L.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=q.storage}}}const y=b%C;return y>0&&(b+=C-y),E.__size=b,E.__cache={},this}function M(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),T}function f(E){const T=E.target;T.removeEventListener("dispose",f);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function d(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:h,update:l,dispose:d}}class xg{constructor(e={}){const{canvas:t=Yh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const x=new Uint32Array(4),M=new Int32Array(4);let f=null,d=null;const E=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let C=!1;this._outputColorSpace=yt;let y=0,_=0,A=null,v=-1,g=null;const S=new it,L=new it;let P=null;const U=new ze(0);let B=0,z=t.width,q=t.height,H=1,X=null,ee=null;const oe=new it(0,0,z,q),Me=new it(0,0,z,q);let Ee=!1;const Ae=new ho;let Pe=!1,K=!1;const J=new Ye,ue=new N,$=new it,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function rt(){return A===null?H:1}let I=n;function Ve(R,V){return t.getContext(R,V)}try{const R={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ja}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",ie,!1),I===null){const V="webgl2";if(I=Ve(V,R),I===null)throw Ve(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ue,Re,ve,Ke,xe,Ie,ot,et,D,w,W,F,Y,k,ce,te,ge,Te,se,fe,Le,we,he,Oe;function O(){Ue=new Rp(I),Ue.init(),we=new hg(I,Ue),Re=new Sp(I,Ue,e,we),ve=new lg(I,Ue),Re.reversedDepthBuffer&&p&&ve.buffers.depth.setReversed(!0),Ke=new Dp(I),xe=new Zm,Ie=new cg(I,Ue,ve,xe,Re,we,Ke),ot=new bp(b),et=new Ap(b),D=new Fu(I),he=new _p(I,D),w=new Cp(I,D,Ke,he),W=new Up(I,w,D,Ke),se=new Lp(I,Re,Ie),te=new yp(xe),F=new jm(b,ot,et,Ue,Re,he,te),Y=new gg(b,xe),k=new Jm,ce=new ig(Ue),Te=new xp(b,ot,et,ve,W,m,h),ge=new ag(b,W,Re),Oe=new vg(I,Ke,Re,ve),fe=new Mp(I,Ue,Ke),Le=new Pp(I,Ue,Ke),Ke.programs=F.programs,b.capabilities=Re,b.extensions=Ue,b.properties=xe,b.renderLists=k,b.shadowMap=ge,b.state=ve,b.info=Ke}O();const ne=new pg(b,I);this.xr=ne,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Ue.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ue.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(R){R!==void 0&&(H=R,this.setSize(z,q,!1))},this.getSize=function(R){return R.set(z,q)},this.setSize=function(R,V,j=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=R,q=V,t.width=Math.floor(R*H),t.height=Math.floor(V*H),j===!0&&(t.style.width=R+"px",t.style.height=V+"px"),this.setViewport(0,0,R,V)},this.getDrawingBufferSize=function(R){return R.set(z*H,q*H).floor()},this.setDrawingBufferSize=function(R,V,j){z=R,q=V,H=j,t.width=Math.floor(R*j),t.height=Math.floor(V*j),this.setViewport(0,0,R,V)},this.getCurrentViewport=function(R){return R.copy(S)},this.getViewport=function(R){return R.copy(oe)},this.setViewport=function(R,V,j,Z){R.isVector4?oe.set(R.x,R.y,R.z,R.w):oe.set(R,V,j,Z),ve.viewport(S.copy(oe).multiplyScalar(H).round())},this.getScissor=function(R){return R.copy(Me)},this.setScissor=function(R,V,j,Z){R.isVector4?Me.set(R.x,R.y,R.z,R.w):Me.set(R,V,j,Z),ve.scissor(L.copy(Me).multiplyScalar(H).round())},this.getScissorTest=function(){return Ee},this.setScissorTest=function(R){ve.setScissorTest(Ee=R)},this.setOpaqueSort=function(R){X=R},this.setTransparentSort=function(R){ee=R},this.getClearColor=function(R){return R.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(R=!0,V=!0,j=!0){let Z=0;if(R){let G=!1;if(A!==null){const re=A.texture.format;G=re===io||re===no||re===to}if(G){const re=A.texture.type,pe=re===rn||re===ei||re===ns||re===Di||re===Qa||re===$a,ye=Te.getClearColor(),_e=Te.getClearAlpha(),Ne=ye.r,Be=ye.g,Ce=ye.b;pe?(x[0]=Ne,x[1]=Be,x[2]=Ce,x[3]=_e,I.clearBufferuiv(I.COLOR,0,x)):(M[0]=Ne,M[1]=Be,M[2]=Ce,M[3]=_e,I.clearBufferiv(I.COLOR,0,M))}else Z|=I.COLOR_BUFFER_BIT}V&&(Z|=I.DEPTH_BUFFER_BIT),j&&(Z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),Te.dispose(),k.dispose(),ce.dispose(),xe.dispose(),ot.dispose(),et.dispose(),W.dispose(),he.dispose(),Oe.dispose(),F.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",ln),ne.removeEventListener("sessionend",So),Hn.stop()};function ae(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const R=Ke.autoReset,V=ge.enabled,j=ge.autoUpdate,Z=ge.needsUpdate,G=ge.type;O(),Ke.autoReset=R,ge.enabled=V,ge.autoUpdate=j,ge.needsUpdate=Z,ge.type=G}function ie(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Q(R){const V=R.target;V.removeEventListener("dispose",Q),be(V)}function be(R){ke(R),xe.remove(R)}function ke(R){const V=xe.get(R).programs;V!==void 0&&(V.forEach(function(j){F.releaseProgram(j)}),R.isShaderMaterial&&F.releaseShaderCache(R))}this.renderBufferDirect=function(R,V,j,Z,G,re){V===null&&(V=le);const pe=G.isMesh&&G.matrixWorld.determinant()<0,ye=Vc(R,V,j,Z,G);ve.setMaterial(Z,pe);let _e=j.index,Ne=1;if(Z.wireframe===!0){if(_e=w.getWireframeAttribute(j),_e===void 0)return;Ne=2}const Be=j.drawRange,Ce=j.attributes.position;let Xe=Be.start*Ne,tt=(Be.start+Be.count)*Ne;re!==null&&(Xe=Math.max(Xe,re.start*Ne),tt=Math.min(tt,(re.start+re.count)*Ne)),_e!==null?(Xe=Math.max(Xe,0),tt=Math.min(tt,_e.count)):Ce!=null&&(Xe=Math.max(Xe,0),tt=Math.min(tt,Ce.count));const dt=tt-Xe;if(dt<0||dt===1/0)return;he.setup(G,Z,ye,j,_e);let lt,st=fe;if(_e!==null&&(lt=D.get(_e),st=Le,st.setIndex(lt)),G.isMesh)Z.wireframe===!0?(ve.setLineWidth(Z.wireframeLinewidth*rt()),st.setMode(I.LINES)):st.setMode(I.TRIANGLES);else if(G.isLine){let De=Z.linewidth;De===void 0&&(De=1),ve.setLineWidth(De*rt()),G.isLineSegments?st.setMode(I.LINES):G.isLineLoop?st.setMode(I.LINE_LOOP):st.setMode(I.LINE_STRIP)}else G.isPoints?st.setMode(I.POINTS):G.isSprite&&st.setMode(I.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)rs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const De=G._multiDrawStarts,ct=G._multiDrawCounts,je=G._multiDrawCount,Ft=_e?D.get(_e).bytesPerElement:1,ni=xe.get(Z).currentProgram.getUniforms();for(let Ot=0;Ot<je;Ot++)ni.setValue(I,"_gl_DrawID",Ot),st.render(De[Ot]/Ft,ct[Ot])}else if(G.isInstancedMesh)st.renderInstances(Xe,dt,G.count);else if(j.isInstancedBufferGeometry){const De=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,ct=Math.min(j.instanceCount,De);st.renderInstances(Xe,dt,ct)}else st.render(Xe,dt)};function at(R,V,j){R.transparent===!0&&R.side===Sn&&R.forceSinglePass===!1?(R.side=Dt,R.needsUpdate=!0,hs(R,V,j),R.side=Fn,R.needsUpdate=!0,hs(R,V,j),R.side=Sn):hs(R,V,j)}this.compile=function(R,V,j=null){j===null&&(j=R),d=ce.get(j),d.init(V),T.push(d),j.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),R!==j&&R.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const Z=new Set;return R.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const re=G.material;if(re)if(Array.isArray(re))for(let pe=0;pe<re.length;pe++){const ye=re[pe];at(ye,j,G),Z.add(ye)}else at(re,j,G),Z.add(re)}),d=T.pop(),Z},this.compileAsync=function(R,V,j=null){const Z=this.compile(R,V,j);return new Promise(G=>{function re(){if(Z.forEach(function(pe){xe.get(pe).currentProgram.isReady()&&Z.delete(pe)}),Z.size===0){G(R);return}setTimeout(re,10)}Ue.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Je=null;function pn(R){Je&&Je(R)}function ln(){Hn.stop()}function So(){Hn.start()}const Hn=new Ac;Hn.setAnimationLoop(pn),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(R){Je=R,ne.setAnimationLoop(R),R===null?Hn.stop():Hn.start()},ne.addEventListener("sessionstart",ln),ne.addEventListener("sessionend",So),this.render=function(R,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(V),V=ne.getCamera()),R.isScene===!0&&R.onBeforeRender(b,R,V,A),d=ce.get(R,T.length),d.init(V),T.push(d),J.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Ae.setFromProjectionMatrix(J,dn,V.reversedDepth),K=this.localClippingEnabled,Pe=te.init(this.clippingPlanes,K),f=k.get(R,E.length),f.init(),E.push(f),ne.enabled===!0&&ne.isPresenting===!0){const re=b.xr.getDepthSensingMesh();re!==null&&cr(re,V,-1/0,b.sortObjects)}cr(R,V,0,b.sortObjects),f.finish(),b.sortObjects===!0&&f.sort(X,ee),Fe=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,Fe&&Te.addToRenderList(f,R),this.info.render.frame++,Pe===!0&&te.beginShadows();const j=d.state.shadowsArray;ge.render(j,R,V),Pe===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=f.opaque,G=f.transmissive;if(d.setupLights(),V.isArrayCamera){const re=V.cameras;if(G.length>0)for(let pe=0,ye=re.length;pe<ye;pe++){const _e=re[pe];bo(Z,G,R,_e)}Fe&&Te.render(R);for(let pe=0,ye=re.length;pe<ye;pe++){const _e=re[pe];yo(f,R,_e,_e.viewport)}}else G.length>0&&bo(Z,G,R,V),Fe&&Te.render(R),yo(f,R,V);A!==null&&_===0&&(Ie.updateMultisampleRenderTarget(A),Ie.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(b,R,V),he.resetDefaultState(),v=-1,g=null,T.pop(),T.length>0?(d=T[T.length-1],Pe===!0&&te.setGlobalState(b.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?f=E[E.length-1]:f=null};function cr(R,V,j,Z){if(R.visible===!1)return;if(R.layers.test(V.layers)){if(R.isGroup)j=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(V);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Ae.intersectsSprite(R)){Z&&$.setFromMatrixPosition(R.matrixWorld).applyMatrix4(J);const pe=W.update(R),ye=R.material;ye.visible&&f.push(R,pe,ye,j,$.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Ae.intersectsObject(R))){const pe=W.update(R),ye=R.material;if(Z&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),$.copy(R.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),$.copy(pe.boundingSphere.center)),$.applyMatrix4(R.matrixWorld).applyMatrix4(J)),Array.isArray(ye)){const _e=pe.groups;for(let Ne=0,Be=_e.length;Ne<Be;Ne++){const Ce=_e[Ne],Xe=ye[Ce.materialIndex];Xe&&Xe.visible&&f.push(R,pe,Xe,j,$.z,Ce)}}else ye.visible&&f.push(R,pe,ye,j,$.z,null)}}const re=R.children;for(let pe=0,ye=re.length;pe<ye;pe++)cr(re[pe],V,j,Z)}function yo(R,V,j,Z){const G=R.opaque,re=R.transmissive,pe=R.transparent;d.setupLightsView(j),Pe===!0&&te.setGlobalState(b.clippingPlanes,j),Z&&ve.viewport(S.copy(Z)),G.length>0&&cs(G,V,j),re.length>0&&cs(re,V,j),pe.length>0&&cs(pe,V,j),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function bo(R,V,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Z.id]===void 0&&(d.state.transmissionRenderTarget[Z.id]=new At(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?It:rn,minFilter:Qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const re=d.state.transmissionRenderTarget[Z.id],pe=Z.viewport||S;re.setSize(pe.z*b.transmissionResolutionScale,pe.w*b.transmissionResolutionScale);const ye=b.getRenderTarget(),_e=b.getActiveCubeFace(),Ne=b.getActiveMipmapLevel();b.setRenderTarget(re),b.getClearColor(U),B=b.getClearAlpha(),B<1&&b.setClearColor(16777215,.5),b.clear(),Fe&&Te.render(j);const Be=b.toneMapping;b.toneMapping=Nn;const Ce=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),d.setupLightsView(Z),Pe===!0&&te.setGlobalState(b.clippingPlanes,Z),cs(R,j,Z),Ie.updateMultisampleRenderTarget(re),Ie.updateRenderTargetMipmap(re),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let tt=0,dt=V.length;tt<dt;tt++){const lt=V[tt],st=lt.object,De=lt.geometry,ct=lt.material,je=lt.group;if(ct.side===Sn&&st.layers.test(Z.layers)){const Ft=ct.side;ct.side=Dt,ct.needsUpdate=!0,Eo(st,j,Z,De,ct,je),ct.side=Ft,ct.needsUpdate=!0,Xe=!0}}Xe===!0&&(Ie.updateMultisampleRenderTarget(re),Ie.updateRenderTargetMipmap(re))}b.setRenderTarget(ye,_e,Ne),b.setClearColor(U,B),Ce!==void 0&&(Z.viewport=Ce),b.toneMapping=Be}function cs(R,V,j){const Z=V.isScene===!0?V.overrideMaterial:null;for(let G=0,re=R.length;G<re;G++){const pe=R[G],ye=pe.object,_e=pe.geometry,Ne=pe.group;let Be=pe.material;Be.allowOverride===!0&&Z!==null&&(Be=Z),ye.layers.test(j.layers)&&Eo(ye,V,j,_e,Be,Ne)}}function Eo(R,V,j,Z,G,re){R.onBeforeRender(b,V,j,Z,G,re),R.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),G.onBeforeRender(b,V,j,Z,R,re),G.transparent===!0&&G.side===Sn&&G.forceSinglePass===!1?(G.side=Dt,G.needsUpdate=!0,b.renderBufferDirect(j,V,Z,G,R,re),G.side=Fn,G.needsUpdate=!0,b.renderBufferDirect(j,V,Z,G,R,re),G.side=Sn):b.renderBufferDirect(j,V,Z,G,R,re),R.onAfterRender(b,V,j,Z,G,re)}function hs(R,V,j){V.isScene!==!0&&(V=le);const Z=xe.get(R),G=d.state.lights,re=d.state.shadowsArray,pe=G.state.version,ye=F.getParameters(R,G.state,re,V,j),_e=F.getProgramCacheKey(ye);let Ne=Z.programs;Z.environment=R.isMeshStandardMaterial?V.environment:null,Z.fog=V.fog,Z.envMap=(R.isMeshStandardMaterial?et:ot).get(R.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&R.envMap===null?V.environmentRotation:R.envMapRotation,Ne===void 0&&(R.addEventListener("dispose",Q),Ne=new Map,Z.programs=Ne);let Be=Ne.get(_e);if(Be!==void 0){if(Z.currentProgram===Be&&Z.lightsStateVersion===pe)return wo(R,ye),Be}else ye.uniforms=F.getUniforms(R),R.onBeforeCompile(ye,b),Be=F.acquireProgram(ye,_e),Ne.set(_e,Be),Z.uniforms=ye.uniforms;const Ce=Z.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ce.clippingPlanes=te.uniform),wo(R,ye),Z.needsLights=Wc(R),Z.lightsStateVersion=pe,Z.needsLights&&(Ce.ambientLightColor.value=G.state.ambient,Ce.lightProbe.value=G.state.probe,Ce.directionalLights.value=G.state.directional,Ce.directionalLightShadows.value=G.state.directionalShadow,Ce.spotLights.value=G.state.spot,Ce.spotLightShadows.value=G.state.spotShadow,Ce.rectAreaLights.value=G.state.rectArea,Ce.ltc_1.value=G.state.rectAreaLTC1,Ce.ltc_2.value=G.state.rectAreaLTC2,Ce.pointLights.value=G.state.point,Ce.pointLightShadows.value=G.state.pointShadow,Ce.hemisphereLights.value=G.state.hemi,Ce.directionalShadowMap.value=G.state.directionalShadowMap,Ce.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ce.spotShadowMap.value=G.state.spotShadowMap,Ce.spotLightMatrix.value=G.state.spotLightMatrix,Ce.spotLightMap.value=G.state.spotLightMap,Ce.pointShadowMap.value=G.state.pointShadowMap,Ce.pointShadowMatrix.value=G.state.pointShadowMatrix),Z.currentProgram=Be,Z.uniformsList=null,Be}function To(R){if(R.uniformsList===null){const V=R.currentProgram.getUniforms();R.uniformsList=Ks.seqWithValue(V.seq,R.uniforms)}return R.uniformsList}function wo(R,V){const j=xe.get(R);j.outputColorSpace=V.outputColorSpace,j.batching=V.batching,j.batchingColor=V.batchingColor,j.instancing=V.instancing,j.instancingColor=V.instancingColor,j.instancingMorph=V.instancingMorph,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function Vc(R,V,j,Z,G){V.isScene!==!0&&(V=le),Ie.resetTextureUnits();const re=V.fog,pe=Z.isMeshStandardMaterial?V.environment:null,ye=A===null?b.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ui,_e=(Z.isMeshStandardMaterial?et:ot).get(Z.envMap||pe),Ne=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Be=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ce=!!j.morphAttributes.position,Xe=!!j.morphAttributes.normal,tt=!!j.morphAttributes.color;let dt=Nn;Z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(dt=b.toneMapping);const lt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,st=lt!==void 0?lt.length:0,De=xe.get(Z),ct=d.state.lights;if(Pe===!0&&(K===!0||R!==g)){const Rt=R===g&&Z.id===v;te.setState(Z,R,Rt)}let je=!1;Z.version===De.__version?(De.needsLights&&De.lightsStateVersion!==ct.state.version||De.outputColorSpace!==ye||G.isBatchedMesh&&De.batching===!1||!G.isBatchedMesh&&De.batching===!0||G.isBatchedMesh&&De.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&De.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&De.instancing===!1||!G.isInstancedMesh&&De.instancing===!0||G.isSkinnedMesh&&De.skinning===!1||!G.isSkinnedMesh&&De.skinning===!0||G.isInstancedMesh&&De.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&De.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&De.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&De.instancingMorph===!1&&G.morphTexture!==null||De.envMap!==_e||Z.fog===!0&&De.fog!==re||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==te.numPlanes||De.numIntersection!==te.numIntersection)||De.vertexAlphas!==Ne||De.vertexTangents!==Be||De.morphTargets!==Ce||De.morphNormals!==Xe||De.morphColors!==tt||De.toneMapping!==dt||De.morphTargetsCount!==st)&&(je=!0):(je=!0,De.__version=Z.version);let Ft=De.currentProgram;je===!0&&(Ft=hs(Z,V,G));let ni=!1,Ot=!1,Bi=!1;const ht=Ft.getUniforms(),Wt=De.uniforms;if(ve.useProgram(Ft.program)&&(ni=!0,Ot=!0,Bi=!0),Z.id!==v&&(v=Z.id,Ot=!0),ni||g!==R){ve.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),ht.setValue(I,"projectionMatrix",R.projectionMatrix),ht.setValue(I,"viewMatrix",R.matrixWorldInverse);const Lt=ht.map.cameraPosition;Lt!==void 0&&Lt.setValue(I,ue.setFromMatrixPosition(R.matrixWorld)),Re.logarithmicDepthBuffer&&ht.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&ht.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),g!==R&&(g=R,Ot=!0,Bi=!0)}if(G.isSkinnedMesh){ht.setOptional(I,G,"bindMatrix"),ht.setOptional(I,G,"bindMatrixInverse");const Rt=G.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),ht.setValue(I,"boneTexture",Rt.boneTexture,Ie))}G.isBatchedMesh&&(ht.setOptional(I,G,"batchingTexture"),ht.setValue(I,"batchingTexture",G._matricesTexture,Ie),ht.setOptional(I,G,"batchingIdTexture"),ht.setValue(I,"batchingIdTexture",G._indirectTexture,Ie),ht.setOptional(I,G,"batchingColorTexture"),G._colorsTexture!==null&&ht.setValue(I,"batchingColorTexture",G._colorsTexture,Ie));const Xt=j.morphAttributes;if((Xt.position!==void 0||Xt.normal!==void 0||Xt.color!==void 0)&&se.update(G,j,Ft),(Ot||De.receiveShadow!==G.receiveShadow)&&(De.receiveShadow=G.receiveShadow,ht.setValue(I,"receiveShadow",G.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Wt.envMap.value=_e,Wt.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&V.environment!==null&&(Wt.envMapIntensity.value=V.environmentIntensity),Ot&&(ht.setValue(I,"toneMappingExposure",b.toneMappingExposure),De.needsLights&&Gc(Wt,Bi),re&&Z.fog===!0&&Y.refreshFogUniforms(Wt,re),Y.refreshMaterialUniforms(Wt,Z,H,q,d.state.transmissionRenderTarget[R.id]),Ks.upload(I,To(De),Wt,Ie)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ks.upload(I,To(De),Wt,Ie),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&ht.setValue(I,"center",G.center),ht.setValue(I,"modelViewMatrix",G.modelViewMatrix),ht.setValue(I,"normalMatrix",G.normalMatrix),ht.setValue(I,"modelMatrix",G.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Rt=Z.uniformsGroups;for(let Lt=0,hr=Rt.length;Lt<hr;Lt++){const Vn=Rt[Lt];Oe.update(Vn,Ft),Oe.bind(Vn,Ft)}}return Ft}function Gc(R,V){R.ambientLightColor.needsUpdate=V,R.lightProbe.needsUpdate=V,R.directionalLights.needsUpdate=V,R.directionalLightShadows.needsUpdate=V,R.pointLights.needsUpdate=V,R.pointLightShadows.needsUpdate=V,R.spotLights.needsUpdate=V,R.spotLightShadows.needsUpdate=V,R.rectAreaLights.needsUpdate=V,R.hemisphereLights.needsUpdate=V}function Wc(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return _},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,V,j){const Z=xe.get(R);Z.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),xe.get(R.texture).__webglTexture=V,xe.get(R.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:j,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,V){const j=xe.get(R);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0};const Xc=I.createFramebuffer();this.setRenderTarget=function(R,V=0,j=0){A=R,y=V,_=j;let Z=!0,G=null,re=!1,pe=!1;if(R){const _e=xe.get(R);if(_e.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(I.FRAMEBUFFER,null),Z=!1;else if(_e.__webglFramebuffer===void 0)Ie.setupRenderTarget(R);else if(_e.__hasExternalTextures)Ie.rebindTextures(R,xe.get(R.texture).__webglTexture,xe.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ce=R.depthTexture;if(_e.__boundDepthTexture!==Ce){if(Ce!==null&&xe.has(Ce)&&(R.width!==Ce.image.width||R.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(R)}}const Ne=R.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(pe=!0);const Be=xe.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Be[V])?G=Be[V][j]:G=Be[V],re=!0):R.samples>0&&Ie.useMultisampledRTT(R)===!1?G=xe.get(R).__webglMultisampledFramebuffer:Array.isArray(Be)?G=Be[j]:G=Be,S.copy(R.viewport),L.copy(R.scissor),P=R.scissorTest}else S.copy(oe).multiplyScalar(H).floor(),L.copy(Me).multiplyScalar(H).floor(),P=Ee;if(j!==0&&(G=Xc),ve.bindFramebuffer(I.FRAMEBUFFER,G)&&Z&&ve.drawBuffers(R,G),ve.viewport(S),ve.scissor(L),ve.setScissorTest(P),re){const _e=xe.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+V,_e.__webglTexture,j)}else if(pe){const _e=V;for(let Ne=0;Ne<R.textures.length;Ne++){const Be=xe.get(R.textures[Ne]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ne,Be.__webglTexture,j,_e)}}else if(R!==null&&j!==0){const _e=xe.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_e.__webglTexture,j)}v=-1},this.readRenderTargetPixels=function(R,V,j,Z,G,re,pe,ye=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=xe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&pe!==void 0&&(_e=_e[pe]),_e){ve.bindFramebuffer(I.FRAMEBUFFER,_e);try{const Ne=R.textures[ye],Be=Ne.format,Ce=Ne.type;if(!Re.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Re.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=R.width-Z&&j>=0&&j<=R.height-G&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ye),I.readPixels(V,j,Z,G,we.convert(Be),we.convert(Ce),re))}finally{const Ne=A!==null?xe.get(A).__webglFramebuffer:null;ve.bindFramebuffer(I.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(R,V,j,Z,G,re,pe,ye=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=xe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&pe!==void 0&&(_e=_e[pe]),_e)if(V>=0&&V<=R.width-Z&&j>=0&&j<=R.height-G){ve.bindFramebuffer(I.FRAMEBUFFER,_e);const Ne=R.textures[ye],Be=Ne.format,Ce=Ne.type;if(!Re.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Re.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Xe),I.bufferData(I.PIXEL_PACK_BUFFER,re.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ye),I.readPixels(V,j,Z,G,we.convert(Be),we.convert(Ce),0);const tt=A!==null?xe.get(A).__webglFramebuffer:null;ve.bindFramebuffer(I.FRAMEBUFFER,tt);const dt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await qh(I,dt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Xe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,re),I.deleteBuffer(Xe),I.deleteSync(dt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,V=null,j=0){const Z=Math.pow(2,-j),G=Math.floor(R.image.width*Z),re=Math.floor(R.image.height*Z),pe=V!==null?V.x:0,ye=V!==null?V.y:0;Ie.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,j,0,0,pe,ye,G,re),ve.unbindTexture()};const Yc=I.createFramebuffer(),qc=I.createFramebuffer();this.copyTextureToTexture=function(R,V,j=null,Z=null,G=0,re=null){re===null&&(G!==0?(rs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=G,G=0):re=0);let pe,ye,_e,Ne,Be,Ce,Xe,tt,dt;const lt=R.isCompressedTexture?R.mipmaps[re]:R.image;if(j!==null)pe=j.max.x-j.min.x,ye=j.max.y-j.min.y,_e=j.isBox3?j.max.z-j.min.z:1,Ne=j.min.x,Be=j.min.y,Ce=j.isBox3?j.min.z:0;else{const Xt=Math.pow(2,-G);pe=Math.floor(lt.width*Xt),ye=Math.floor(lt.height*Xt),R.isDataArrayTexture?_e=lt.depth:R.isData3DTexture?_e=Math.floor(lt.depth*Xt):_e=1,Ne=0,Be=0,Ce=0}Z!==null?(Xe=Z.x,tt=Z.y,dt=Z.z):(Xe=0,tt=0,dt=0);const st=we.convert(V.format),De=we.convert(V.type);let ct;V.isData3DTexture?(Ie.setTexture3D(V,0),ct=I.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Ie.setTexture2DArray(V,0),ct=I.TEXTURE_2D_ARRAY):(Ie.setTexture2D(V,0),ct=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,V.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,V.unpackAlignment);const je=I.getParameter(I.UNPACK_ROW_LENGTH),Ft=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ni=I.getParameter(I.UNPACK_SKIP_PIXELS),Ot=I.getParameter(I.UNPACK_SKIP_ROWS),Bi=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,lt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,lt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ne),I.pixelStorei(I.UNPACK_SKIP_ROWS,Be),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ce);const ht=R.isDataArrayTexture||R.isData3DTexture,Wt=V.isDataArrayTexture||V.isData3DTexture;if(R.isDepthTexture){const Xt=xe.get(R),Rt=xe.get(V),Lt=xe.get(Xt.__renderTarget),hr=xe.get(Rt.__renderTarget);ve.bindFramebuffer(I.READ_FRAMEBUFFER,Lt.__webglFramebuffer),ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,hr.__webglFramebuffer);for(let Vn=0;Vn<_e;Vn++)ht&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,xe.get(R).__webglTexture,G,Ce+Vn),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,xe.get(V).__webglTexture,re,dt+Vn)),I.blitFramebuffer(Ne,Be,pe,ye,Xe,tt,pe,ye,I.DEPTH_BUFFER_BIT,I.NEAREST);ve.bindFramebuffer(I.READ_FRAMEBUFFER,null),ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(G!==0||R.isRenderTargetTexture||xe.has(R)){const Xt=xe.get(R),Rt=xe.get(V);ve.bindFramebuffer(I.READ_FRAMEBUFFER,Yc),ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,qc);for(let Lt=0;Lt<_e;Lt++)ht?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Xt.__webglTexture,G,Ce+Lt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Xt.__webglTexture,G),Wt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rt.__webglTexture,re,dt+Lt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Rt.__webglTexture,re),G!==0?I.blitFramebuffer(Ne,Be,pe,ye,Xe,tt,pe,ye,I.COLOR_BUFFER_BIT,I.NEAREST):Wt?I.copyTexSubImage3D(ct,re,Xe,tt,dt+Lt,Ne,Be,pe,ye):I.copyTexSubImage2D(ct,re,Xe,tt,Ne,Be,pe,ye);ve.bindFramebuffer(I.READ_FRAMEBUFFER,null),ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Wt?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(ct,re,Xe,tt,dt,pe,ye,_e,st,De,lt.data):V.isCompressedArrayTexture?I.compressedTexSubImage3D(ct,re,Xe,tt,dt,pe,ye,_e,st,lt.data):I.texSubImage3D(ct,re,Xe,tt,dt,pe,ye,_e,st,De,lt):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,re,Xe,tt,pe,ye,st,De,lt.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,re,Xe,tt,lt.width,lt.height,st,lt.data):I.texSubImage2D(I.TEXTURE_2D,re,Xe,tt,pe,ye,st,De,lt);I.pixelStorei(I.UNPACK_ROW_LENGTH,je),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ft),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ni),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ot),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Bi),re===0&&V.generateMipmaps&&I.generateMipmap(ct),ve.unbindTexture()},this.initRenderTarget=function(R){xe.get(R).__webglFramebuffer===void 0&&Ie.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ie.setTextureCube(R,0):R.isData3DTexture?Ie.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ie.setTexture2DArray(R,0):Ie.setTexture2D(R,0),ve.unbindTexture()},this.resetState=function(){y=0,_=0,A=null,ve.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const $i=["前往库位","伸叉取框","抬升取框","收叉载货","运行到出口","下降到交接高度","伸叉交接","放框到输送线","收回货叉","输送至出口缓存"],Lc=i=>i*i*(3-2*i),Js=(i,e,t)=>i+(e-i)*t;function Uc(i,e){const t=i.params,n=e.index<t.smallBays*t.smallLevels,s=n?e.index:e.index-t.smallBays*t.smallLevels,r=n?t.smallLevels:t.largeLevels,a=n?t.smallPitch:t.largePitch,o=n?t.smallStep:t.largeStep,h=t.smallBays*t.smallPitch+t.largeBays*t.largePitch,l=new N(-h/2+(n?0:t.smallBays*t.smallPitch)+(Math.floor(s/r)+.5)*a,.1775+s%r*o,0),c=new Ye().compose(new N(...i.position),new fn().setFromEuler(new Nt(...i.rotation.map(an.degToRad))),new N(...i.scale));return{position:l.applyMatrix4(c).toArray(),width:a*(e.size===2?.94:.82)*i.scale[0],height:o*(e.size===2?.82:.72)*i.scale[1],depth:t.depth*.85*i.scale[2],color:e.size===1?"#539fa7":e.size===2?"#718d9e":"#8b8b91"}}function vo(i){const e=i.find(n=>n.type==="hardwareConveyorAssembly");if(!e)return[];const t=e.params.laneCenters;return!Array.isArray(t)||t.length!==4?[]:[...t].sort((n,s)=>s-n).map((n,s)=>({code:String(101+s),z:e.position[2]+n*e.scale[2],x:e.position[0]-e.params.length*e.scale[0]/2+.35,assembly:e}))}function Qs(i,e){return Number(i)!==2||["103","104"].includes(String(e))}function xo(i){var t;if(i.dockMode)return i.dockMode;const e=Number((t=i.id.match(/^hardware-rack-link-(\d)$/))==null?void 0:t[1]);return[0,2].includes(e)?"inbound":[1,3].includes(e)?"outbound":null}function Ic(i){const e=i.params,t=e.exhibitionDetail?e.chainDeck?.0555:e.crossBelt?.0355:e.flatDeck?.0645:.09:.185;return i.position[1]+(e.height+t)*i.scale[1]}function _g(i,e,t,n){const s=vo(i),r=s.find(M=>M.code===String(n));if(!r)throw Error("请选择目标出货口（101～104）");const a=i.filter(M=>M.type==="binRack"&&M.aisle===t.aisle),o=i.find(M=>M.type==="conveyor"&&M.id.startsWith("hardware-rack-link-")&&xo(M)==="outbound"&&a.some(f=>Math.abs(M.position[2]-f.position[2])<.01));if(!o)throw Error("该巷道缺少出库专用接驳工位");const h=r.assembly;if(h.rotation.some(M=>Math.abs(M)>.001)||h.scale.some(M=>Math.abs(M-1)>.001))throw Error("请保持输送线总装原始朝向与比例后下达任务");const l=o.position[0]+o.params.length/2-.45,c=o.position[2],u=Ic(o),p=h.position[1]+h.params.height,m=u-.185,x=[[l,u,c],[h.position[0]+.43,p,c],[h.position[0]+.43,p,r.z],[h.position[0]-.43,p,r.z],[r.x,p,r.z]];return{id:"hardware-port-"+r.code,portCode:r.code,aisle:t.aisle,side:"A",direction:-1,x:l,z:c,height:m,length:o.params.length,width:o.params.width,route:x,capacity:qa,dockId:o.id,dockMode:"outbound"}}const Nc=i=>i.slice(1).reduce((e,t,n)=>e+Math.hypot(...t.map((s,r)=>s-i[n][r])),0);function _o(i,e){let t=Nc(i)*Math.max(0,Math.min(1,e));for(let n=1;n<i.length;n++){const s=i[n-1],r=i[n],a=Math.hypot(...r.map((o,h)=>o-s[h]));if(t<=a&&a>0)return s.map((o,h)=>Js(o,r[h],t/a));t-=a}return i.at(-1)}function Mg(i,e,t,n,s){const r=i.slots.find(_=>_.id===t),a=e.find(_=>_.id===(r==null?void 0:r.deviceId));if(!(r!=null&&r.occupied)||(a==null?void 0:a.type)!=="binRack")throw Error("请选择有料框的料框库库位");if(n.route&&jl(i)>=qa)throw Error("输送线已预留10个料框，请等待空位");if(n.portCode&&!Qs(r.size,n.portCode))throw Error("大料筐只能出库至103、104工位");if(n.route){const _=e.find(A=>A.id===n.dockId);if(!_||xo(_)!=="outbound")throw Error("入库专用工位禁止放置出库料框")}if(i.tasks.some(_=>_.type==="outbound"&&_.source===t&&_.status!=="completed"))throw Error("该料框已有出库任务");const o=e.find(_=>_.type==="stacker"&&_.aisle===a.aisle);if(r.size===2&&a.aisle!==2)throw Error("大料筐只能从二号巷道出库");if(!o||!i.devices[o.id]||["fault","maintenance"].includes(i.devices[o.id].status))throw Error("对应巷道的堆垛机不可用");if(i.tasks.filter(_=>_.type==="outbound"&&_.station.id===n.id&&!_.collected).length>=(n.capacity||3))throw Error("该出口缓存已满，请先确认取走已完成的料框");if([a,o].some(_=>_.rotation.some(A=>Math.abs(A)>.001)||_.scale.some(A=>Math.abs(A-1)>.001)))throw Error("当前出库演示需要货架和堆垛机保持原始朝向与比例");const h=Uc(a,r),[l,c,u]=h.position,p=l-o.position[0],m=c-o.position[1]-.1775,x=u-o.position[2];if(Math.abs(p)+1.33>o.params.railLength/2||Math.abs(n.x-o.position[0])+1.33>o.params.railLength/2)throw Error("轨道长度不足，请延长堆垛机轨道后出库");const M={travel:s.travel,lift:s.lift,extension:0},f={travel:p,lift:Math.max(0,m-.04),extension:0},d={travel:n.x-o.position[0],lift:n.height+.185-o.position[1]-.1775+.04,extension:0},E=[f,{...f,extension:x},{...f,lift:m+.04,extension:x},{...f,lift:m+.04,extension:0},{...d,lift:Math.max(m,.8)},d,{...d,extension:n.z-o.position[2]},{...d,lift:d.lift-.04,extension:n.z-o.position[2]},{...d,lift:d.lift-.04},{...d,lift:d.lift-.04}],T=E.map((_,A)=>{const v=A?E[A-1]:M;return A===9?n.route?Math.max(4,Nc(n.route)/.45):4:Math.max(1.1,Math.abs(_.travel-v.travel)/3,Math.abs(_.lift-v.lift)/1.5,Math.abs(_.extension-v.extension)/.6)}),b=i.tasks.some(_=>_.deviceId===o.id&&Ya(_)),C={type:"outbound",code:`OUT-${String((i.outboundSequence||0)+1).padStart(4,"0")}`,source:r.id,deviceId:o.id,from:r.location,destinationPort:n.portCode||null,to:n.portCode?`${n.portCode} 出货口`:`${n.side}端 · 巷道${a.aisle}输送线`,status:b?"queued":"running",progress:0,phase:0,phaseElapsed:0,stage:b?"等待堆垛机":$i[0],start:M,targets:E,durations:T,station:n,geometry:h,stackerPosition:[...o.position],cargo:{boxId:r.boxId??r.id,boxCode:r.boxCode||r.location,size:r.size,sku:r.sku,product:r.product,quantity:r.quantity,batch:r.batch,items:r.items||[]},cargoState:"rack",pose:M},y=i.tasks.filter(_=>_.type==="outbound"&&_.station.id===n.id&&!_.collected).map(_=>_.bufferIndex);if(C.bufferIndex=y.length?Math.max(...y)+1:0,C.bufferIndex>=(n.capacity||3))throw Error("出口剩余缓存暂不可到达，请待任务完成并取走出口料框后再下达");return i.outboundSequence=(i.outboundSequence||0)+1,i.manualOutbound=!0,i.tasks.unshift(C),i.events.unshift({time:i.elapsed,message:`${C.code}：${C.from} → ${C.to}，料框出库任务已下达`}),C}function Wr(i,e,t){i.events.unshift({time:i.elapsed,message:`${e.code}：${t}`}),i.events=i.events.slice(0,40)}function Ul(i,e,t){for(const n of i.inventory||[])n.boxId===e.cargo.boxId&&(n.locationId=null,n.placement=t)}function Sg(i,e,t){var s;let n=!1;for(const r of i.tasks.filter(a=>a.type==="outbound"&&a.status==="running")){const a=i.devices[r.deviceId];if(!a||["fault","maintenance"].includes(a.status))continue;let o=e;for(;o>0&&r.status==="running";){if(r.stage=$i[r.phase],r.phase===6&&i.tasks.some(f=>f!==r&&!f.collected&&f.cargoState==="conveyor"&&(()=>{const d=f.type==="outbound"?Fc(f):f.returnRouteDone?[f.station.x,f.station.height+.185,f.station.z]:f.returnRoute?_o(f.returnRoute,f.phase===0?f.phaseElapsed/f.durations[0]:1):null;return d&&Math.abs(d[0]-r.station.x)<(r.geometry.width+f.geometry.width)/2+.06&&Math.abs(d[2]-r.station.z)<(r.geometry.depth+f.geometry.depth)/2+.06})())){r.stage="等待出库接驳空位";break}const h=r.phase,l=r.durations[h],c=Math.min(o,l-r.phaseElapsed,r.phase===9&&((s=r.station.route)!=null&&s.length)?.1:1/0);if(r.phase===9&&!Yl(r,i,r.phaseElapsed+c)){r.stage="等待交汇输送段";break}r.phaseElapsed+=c,o-=c;const u=h?r.targets[h-1]:r.start,p=r.targets[h],m=Lc(Math.min(1,r.phaseElapsed/l));r.pose={travel:Js(u.travel,p.travel,m),lift:Js(u.lift,p.lift,m),extension:Js(u.extension,p.extension,m)};const x=r.durations.reduce((f,d)=>f+d,0),M=r.durations.slice(0,h).reduce((f,d)=>f+d,0)+r.phaseElapsed;if(r.progress=Math.min(100,Math.round(M/x*100)),In(r)&&(a.status="running",a.travel=r.pose.travel,a.lift=r.pose.lift),r.phaseElapsed<l-1e-8){if(o>0)continue;break}if(Zl(r,h,2,9))break;if(h===2){const f=i.slots.find(d=>d.id===r.source);f.occupied=!1;for(const d of["sku","product","batch","boxCode"])f[d]="";f.boxId=null,f.quantity=null,f.items=[],f.size=0,r.cargoState="fork",Ul(i,r,"堆垛机货叉"),n=!0,Wr(i,r,"料框已取上货叉，源库位已释放")}h===7&&(r.cargoState="conveyor",Ul(i,r,r.to),Wr(i,r,"料框已交接到输送线")),h===9&&ql(r),r.phase++,r.phaseElapsed=0,r.phase===9&&(a.status="idle"),r.phase===$i.length?(r.status="completed",r.stage="已到出口缓存",r.progress=100,i.completed++,a.completed++,i.tasks.some(f=>f!==r&&f.deviceId===r.deviceId&&In(f))||(a.status="idle"),Wr(i,r,"出库完成，等待出口取走")):r.stage=$i[r.phase]}}for(const r of[...i.tasks].reverse().filter(a=>a.type==="outbound"&&a.status==="queued")){if(i.tasks.some(h=>h!==r&&h.deviceId===r.deviceId&&In(h)))continue;const a=i.tasks.find(h=>["outbound","inbound"].includes(h.type)&&h.deviceId===r.deviceId&&h.status==="completed"),o=t==null?void 0:t(r.deviceId);r.phase===0&&(o?r.start={...o,extension:o.extension??0}:a&&(r.start={...a.pose}),r.durations[0]=Math.max(1.1,Math.abs(r.targets[0].travel-r.start.travel)/3,Math.abs(r.targets[0].lift-r.start.lift)/1.5),r.pose={...r.start}),r.status="running",r.stage=$i[r.phase]}return n}function Fc(i,e){const{pose:t,stackerPosition:n,station:s}=i;if(i.cargoState==="fork")return[n[0]+t.travel,n[1]+t.lift+.1775,n[2]+t.extension];if(i.cargoState==="conveyor"){const r=i.status==="completed"?1:i.phase===9?Lc(i.phaseElapsed/i.durations[9]):0;return s.route?_o(s.route,r):[s.x+s.direction*(4.6-i.bufferIndex*1.3)*r,s.height+.185,s.z]}return i.geometry.position}function yg(i,e=""){const t=new bt,{width:n,height:s,depth:r,color:a}=i,o=(l,c,u,p,m,x,M)=>{const f=new Ze(new Gt(p,m,x),new St({color:M,roughness:.45,metalness:.25}));f.position.set(l,c,u),f.castShadow=!0,t.add(f)};o(0,.0125,0,n,.025,r,a);for(const l of[-1,1])o(0,s/2+.0225,l*r/2,n,s,.024,a),o(l*n/2,s/2+.0225,0,.024,s,r,a),o(0,s+.0225,l*r/2,n,.035,.045,"#8a9baa"),o(0,s*.55-.0275,l*(r/2+.016),.12,.055,.026,"#d9e0d9");const h=String(e??"").trim();if(h){const l=document.createElement("canvas");l.width=512,l.height=160;const c=l.getContext("2d");c.textAlign="center",c.textBaseline="middle";let u=80;for(c.font=`bold ${u}px Microsoft YaHei, sans-serif`;c.measureText(h).width>472&&u>16;)u-=2,c.font=`bold ${u}px Microsoft YaHei, sans-serif`;c.fillStyle="rgba(220,239,242,0.65)",c.fillText(h,256,84,472),c.fillStyle="#233c46",c.fillText(h,256,80,472);const p=new En(l);p.colorSpace=yt;const m=n*.82,x=Math.min(s*.25,m*160/512);for(const M of[-1,1]){const f=new Ze(new zn(m,x),new St({map:p,transparent:!0,depthTest:!0,depthWrite:!1,roughness:.65,metalness:.2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));f.name="cargo-box-code",f.userData.boxCode=h,f.position.set(0,s*.78+.0225,M*(r/2+.013)),f.rotation.y=M===1?0:Math.PI,t.add(f)}t.userData.ownedTexture=p}return t}function bg(i,e){let t=!1,n=0,s=-1,r=0;const a=new Map,o=new Map;function h(p="连续演示已暂停"){e.enabled=!1,e.message=p,i.setRunning(!1)}function l(){e.started=!0,e.enabled=!0,e.error="",e.message="随机选择料框与空闲工位",i.setRunning(!0)}function c(){r++,n=0,s=-1,a.clear(),o.clear(),e.started=!1,e.enabled=!1,e.cycles=0,e.message="",e.error=""}async function u(p){var T,b;if(!e.enabled||!i.running()||(n+=p,t||i.dbBusy()||n-s<1))return;s=n;const m=i.state(),x=i.objects(),M=m.tasks;e.cycles=M.filter(C=>C.autoDemo&&!C.initialReset&&C.type==="inbound"&&C.status==="completed").length;let f;const d=[];for(const C of M.filter(y=>y.autoDemo&&y.type==="outbound"&&y.status==="completed"&&!y.collected)){if(!Il({size:C.cargo.size,index:-1},x.filter(_=>_.type==="binRack"),m)){e.message=`${C.destinationPort} 工位等待大料筐匹配空库位，其他任务继续`;continue}if(M.some(_=>{var A;return _.type==="inbound"&&((A=_.cargo)==null?void 0:A.boxCode)===C.cargo.boxCode&&["submitting","queued","running"].includes(_.status)})||(((T=o.get(C.code))==null?void 0:T.until)??0)>n)continue;a.has(C.code)||a.set(C.code,n);const y=Math.max(0,Math.ceil(8-(n-a.get(C.code))));if(y){e.message=`${C.destinationPort} 工位模拟取货 · ${y}秒后回库`;continue}d.push(C)}if(!f){const C=jl(m)>=qa?[]:i.ports().filter(P=>!M.some(U=>U.type==="inbound"&&U.entryPort===P.code&&U.status!=="completed"||U.type==="outbound"&&U.destinationPort===P.code&&U.status==="completed"&&!U.collected)),y=x.filter(P=>P.type==="binRack"),_=x.filter(P=>{var U;return P.type==="stacker"&&!["fault","maintenance"].includes((U=m.devices[P.id])==null?void 0:U.status)&&!M.some(B=>B.deviceId===P.id&&Ya(B))}),v=m.slots.filter(P=>P.occupied&&P.boxCode&&(m.source!=="SQL"||[1,2].includes(P.size))&&_.some(U=>y.some(B=>B.id===P.deviceId&&B.aisle===U.aisle&&(P.size!==2||B.aisle===2)))&&!M.some(U=>U.source===P.id&&U.status!=="completed")).filter(P=>C.some(U=>Qs(P.size,U.code))&&Il(P,y,m)),g=P=>M.find(U=>U.deviceId===P.id&&U.status==="completed"&&!U.initialReset),S=P=>{var U;return(U=y.find(B=>B.id===P.deviceId))==null?void 0:U.aisle},L=v.filter(P=>_.some(U=>{var B;return U.aisle===S(P)&&((B=g(U))==null?void 0:B.type)==="inbound"}));if(L.length){const P=L[Math.floor(Math.random()*L.length)],U=C.filter(B=>Qs(P.size,B.code));f={type:"outbound",slotId:P.id,port:U[Math.floor(Math.random()*U.length)].code}}if(!f)for(const P of d){const U=_.filter(z=>Number(P.cargo.size)!==2||z.aisle===2),B=U.find(z=>{var q;return((q=g(z))==null?void 0:q.type)==="outbound"})??U[0];if(!(!B&&x.some(z=>z.type==="stacker"))){f={type:"inbound",boxCode:P.cargo.boxCode,port:P.destinationPort,returnTaskCode:P.code,preferredAisle:B==null?void 0:B.aisle};break}}if(!f&&v.length){const P=v[Math.floor(Math.random()*v.length)],U=C.filter(B=>Qs(P.size,B.code));f={type:"outbound",slotId:P.id,port:U[Math.floor(Math.random()*U.length)].code}}}if(!f){M.some(C=>C.autoDemo&&C.type==="outbound"&&C.status==="completed"&&!C.collected)||(e.message="等待工位、堆垛机或可用料框");return}t=!0;const E=r;try{await i.dispatch(f),E===r&&(f.returnTaskCode&&o.delete(f.returnTaskCode),e.enabled&&(e.message=f.type==="inbound"?`${f.port} 工位料框自动回库`:`料框自动出库至 ${f.port} 工位`))}catch(C){if(E!==r)return;if(C.status===409||/繁忙|没有可用|已有待取|占用|预留/.test(C.message)){if(f.returnTaskCode){const y=(((b=o.get(f.returnTaskCode))==null?void 0:b.attempts)??0)+1;o.set(f.returnTaskCode,{attempts:y,until:n+Math.min(120,15*2**(y-1))})}else s=n+2;e.message=C.message+"，等待后重试，其他可用任务继续"}else e.error=C.message,h("连续演示暂停："+C.message),i.notify(e.message)}finally{t=!1}}return{start:l,pause:h,reset:c,advance:u}}function Il(i,e,t){if(t.source!=="SQL"||Number(i.size)!==2)return!0;const n=s=>{const r=e.find(a=>a.id===s.deviceId);return(r==null?void 0:r.aisle)===2&&s.index>=r.params.smallBays*r.params.smallLevels};return n(i)||t.slots.some(s=>!s.occupied&&n(s)&&!t.tasks.some(r=>r.type==="inbound"&&r.target===s.id&&r.status!=="completed"))}const $s=["前往入库工位","下降到取框高度","伸叉取框","抬升取框","收叉载货","运行到目标库位","伸叉入库","放框入库","收回货叉"],Eg=i=>i*i*(3-2*i),Xr=(i,e,t)=>i+(e-i)*t;function Xa(i){return i.filter(e=>e.type==="conveyor"&&e.id.startsWith("hardware-rack-link-")&&xo(e)==="inbound").map(e=>{var t;return{id:e.id,name:e.name,link:e,aisle:(t=i.find(n=>n.type==="binRack"&&Math.abs(n.position[2]-e.position[2])<.01))==null?void 0:t.aisle}})}function Tg(i,e,{dockId:t,targetId:n,boxCode:s,product:r="",quantity:a=1,entryPort:o},h){var ue;const l=Xa(e).find($=>$.id===t),c=i.slots.find($=>$.id===n),u=e.find($=>$.id===(c==null?void 0:c.deviceId));if(!l)throw Error("请选择红色入库专用工位，出库工位不能接收入库料框");if(!c||(u==null?void 0:u.type)!=="binRack")throw Error("请选择空闲目标库位");if(c.occupied)throw Error(`目标库位 ${c.location} 已有料框 ${c.boxCode||""}，请选择其他空闲库位`);if(u.aisle!==l.aisle)throw Error("入库工位与目标库位必须位于同一巷道");if(!(s!=null&&s.trim()))throw Error("请输入料框编号");if(!Number.isFinite(a)||a<=0)throw Error("入库数量必须大于零");const p=i.slots.find($=>$.occupied&&$.boxCode===s.trim());if(p)throw Error(`料框 ${s.trim()} 已在库位 ${p.location}，不能重复入库`);if(i.tasks.find($=>{var le;return!$.collected&&((le=$.cargo)==null?void 0:le.boxCode)===s.trim()&&!(o&&$.type==="outbound"&&$.status==="completed"&&$.destinationPort===o)}))throw Error("该料框仍有未完成任务或所在工位不一致");if(i.tasks.some($=>$.type==="inbound"&&$.target===n&&$.status!=="completed"))throw Error("该库位已被入库任务预留");if(i.tasks.some($=>$.type==="inbound"&&$.dockId===t&&$.cargoState==="conveyor"))throw Error("入库工位已有料框，请等待堆垛机取走");const x=e.find($=>$.type==="stacker"&&$.aisle===u.aisle),M=i.devices[x==null?void 0:x.id];if(!M||["fault","maintenance"].includes(M.status))throw Error("对应巷道堆垛机不可用");if([u,x,l.link].some($=>$.rotation.some(le=>Math.abs(le)>.001)||$.scale.some(le=>Math.abs(le-1)>.001)))throw Error("入库演示需要设备保持原始朝向和比例");const f=i.source==="SQL"?(ue=i.allBoxes)==null?void 0:ue.find($=>$.code===s.trim()):null;if(i.source==="SQL"&&!f)throw Error("真实入库需使用已有料框编号，请选择库外料框");const d=c.index<u.params.smallBays*u.params.smallLevels,E=(f==null?void 0:f.size)??(d?1:2);if(![1,2].includes(E))throw Error("料框规格未定义，禁止入库");if(E===1&&!d)throw Error("小料框只能存入小仓位");if(E===2&&(u.aisle!==2||d))throw Error("大料筐只能存入二号巷道的大筐库位");const T=Uc(u,{...c,size:E}),b={x:l.link.position[0]+l.link.params.length/2-.45,z:l.link.position[2],height:Ic(l.link)-.185},C=b.x-x.position[0],y=b.height+.185-x.position[1]-.1775,_=b.z-x.position[2],[A,v,g]=T.position,S=A-x.position[0],L=v-x.position[1]-.1775,P=g-x.position[2];if(Math.max(Math.abs(S),Math.abs(C))+1.33>x.params.railLength/2)throw Error("堆垛机轨道不足，无法到达工位或目标库位");const U={travel:h.travel,lift:h.lift,extension:0},B={travel:C,lift:y,extension:0},z={travel:S,lift:L+.04,extension:0},q=[{...B,lift:Math.min(U.lift,y)},B,{...B,extension:_},{...B,lift:y+.04,extension:_},{...B,lift:y+.04},z,{...z,extension:P},{...z,lift:L,extension:P},{...z,lift:L}],H=q.map(($,le)=>{const Fe=le?q[le-1]:U;return Math.max(1.1,Math.abs($.travel-Fe.travel)/2,Math.abs($.lift-Fe.lift),Math.abs($.extension-Fe.extension)/.5)}),X=i.tasks.some($=>$.deviceId===x.id&&Ya($)),ee=`IN-${String((i.inboundSequence||0)+1).padStart(4,"0")}`,oe=f?(i.inventory||[]).filter($=>$.boxId===f.id):[],Me=f?{boxId:f.id,boxCode:f.code,size:E,product:oe.map($=>$.product).join("、"),sku:oe.map($=>$.sku).join(", "),quantity:null,batch:"",items:oe}:{boxId:ee,boxCode:s.trim(),size:E,product:r.trim(),sku:"",quantity:a,batch:"",items:[]},Ee=o?vo(e).find($=>$.code===o):null;if(o&&!Ee)throw Error("请选择101～104入库工位");const Ae=Ee==null?void 0:Ee.assembly,Pe=Ae?Ae.position[1]+Ae.params.height:0,K=Ee?[[Ee.x,Pe,Ee.z],[Ae.position[0]-.43,Pe,Ee.z],[Ae.position[0]-.43,Pe,b.z],[Ae.position[0]+.43,Pe,b.z],[b.x,b.height+.185,b.z]]:null;K&&(q.unshift({...U}),H.unshift(Math.max(2,K.slice(1).reduce(($,le,Fe)=>$+Math.hypot(...le.map((rt,I)=>rt-K[Fe][I])),0)/.45)));const J={type:"inbound",code:ee,target:c.id,dockId:t,deviceId:x.id,from:l.name,to:c.location,status:X?"queued":"running",stage:X?"等待堆垛机":$s[0],progress:0,phase:0,phaseElapsed:0,start:U,targets:q,durations:H,station:b,geometry:T,stackerPosition:[...x.position],cargo:Me,cargoState:"conveyor",pose:{...U},collected:!1};return K&&(J.returnRoute=K,J.entryPort=o,J.from=o+" 工位",J.stage=X?"等待堆垛机":"工位料框回流至入库接驳"),i.inboundSequence=(i.inboundSequence||0)+1,i.manualOutbound=!0,i.tasks.unshift(J),i.events.unshift({time:i.elapsed,message:`${ee}：${J.from} → ${J.to}，入库指令已下达`}),J}function wg(i){const e=i.stackerPosition,t=i.pose;return i.cargoState==="fork"?[e[0]+t.travel,e[1]+t.lift+.1775,e[2]+t.extension]:i.returnRoute&&!i.returnRouteDone?_o(i.returnRoute,i.phase===0?i.phaseElapsed/i.durations[0]:0):[i.station.x,i.station.height+.185,i.station.z]}function Ag(i,e,t){let n=!1;for(const s of[...i.tasks].reverse().filter(r=>r.type==="inbound")){const r=i.devices[s.deviceId];if(!r||["fault","maintenance"].includes(r.status))continue;if(s.status==="queued"){if(!s.returnRoute&&i.tasks.some(u=>u!==s&&u.deviceId===s.deviceId&&In(u)))continue;const l=i.tasks.find(u=>u.deviceId===s.deviceId&&u.status==="completed"&&u.pose),c=t==null?void 0:t(s.deviceId);if(s.phase===0){c?s.start={...c,extension:c.extension??0}:l&&(s.start={...l.pose,extension:0});const u=s.returnRoute?1:0;s.targets[u].lift=Math.min(s.start.lift,s.targets[u+1].lift),s.returnRoute&&(s.targets[0]={...s.start});for(let p=s.returnRoute?1:0;p<s.targets.length;p++){const m=p?s.targets[p-1]:s.start,x=s.targets[p];s.durations[p]=Math.max(1.1,Math.abs(x.travel-m.travel)/2,Math.abs(x.lift-m.lift),Math.abs(x.extension-m.extension)/.5)}s.pose={...s.start}}s.status="running",s.stage=s.returnRoute&&s.phase===0?"工位料框回流至入库接驳":$s[s.phase-(s.returnRoute?1:0)]}if(s.status!=="running")continue;let a=e;const o=s.returnRoute?1:0,h=o?["工位料框回流至入库接驳",...$s]:$s;for(;a>0&&s.status==="running";){if(o&&s.phase===1){if(i.tasks.some(M=>M!==s&&M.deviceId===s.deviceId&&In(M))){s.waitingForStacker=!0,s.stage="等待堆垛机接框";break}if(s.waitingForStacker=!1,!s.approachRebased){const M=t==null?void 0:t(s.deviceId);if(M){s.targets[0]={...M,extension:M.extension??0};const f=s.targets[1],d=s.targets[0];s.durations[1]=Math.max(1.1,Math.abs(f.travel-d.travel)/2,Math.abs(f.lift-d.lift),Math.abs(f.extension-d.extension)/.5)}s.approachRebased=!0}}s.stage=h[s.phase];const l=s.phase,c=s.durations[l],u=Math.min(a,c-s.phaseElapsed,o&&s.phase===0?.1:1/0);if(o&&s.phase===0&&!Yl(s,i,s.phaseElapsed+u)){s.stage="等待交汇输送段";break}s.phaseElapsed+=u,a-=u;const p=l?s.targets[l-1]:s.start,m=s.targets[l],x=Eg(Math.min(1,s.phaseElapsed/c));if(s.pose={travel:Xr(p.travel,m.travel,x),lift:Xr(p.lift,m.lift,x),extension:Xr(p.extension,m.extension,x)},s.progress=Math.round((s.durations.slice(0,l).reduce((M,f)=>M+f,0)+s.phaseElapsed)/s.durations.reduce((M,f)=>M+f,0)*100),In(s)&&(r.status="running",r.travel=s.pose.travel,r.lift=s.pose.lift),s.phaseElapsed<c-1e-8){if(a>0)continue;break}if(Zl(s,l,3+o,7+o))break;if(o&&l===0&&(s.returnRouteDone=!0,ql(s)),l===3+o&&(s.cargoState="fork"),l===7+o){const M=i.slots.find(f=>f.id===s.target);Object.assign(M,s.cargo,{occupied:!0}),s.cargoState="rack",n=!0,i.inventory&&!s.serverTaskId&&i.inventory.push({id:s.code,boxId:s.cargo.boxId,boxCode:s.cargo.boxCode,locationId:M.locationId,location:M.location,sku:s.cargo.sku,product:s.cargo.product,quantity:s.cargo.quantity,unit:"件",batch:""})}s.phase++,s.phaseElapsed=0,s.phase===h.length?(s.status="completed",s.stage="入库完成",s.progress=100,s.collected=!0,i.completed++,r.completed++,r.status="idle",i.events.unshift({time:i.elapsed,message:`${s.code}：${s.cargo.boxCode} 已存入 ${s.to}`})):s.stage=h[s.phase]}}return n}function Nl(i,{pose:e=()=>({travel:0,lift:1.2,extension:0}),notify:t=()=>{}}={}){const n=Kr(i,2026),s=new Map(i.map(l=>[l.id,l]));let r=!1;n.manualOutbound=!0;for(const[l,c]of n.slots.entries()){const u=s.get(c.deviceId),p=c.index<u.params.smallBays*u.params.smallLevels;c.occupied=c.index%100!==0,c.size=p?1:2,c.boxCode=c.occupied?"DEMO-"+String(l+1).padStart(5,"0"):"",c.boxId=c.occupied?c.id:null,c.occupied&&(c.quantity=1+l%24,c.sku="DEMO-SKU-"+(1+l%5),c.product="演示物料",c.batch="DEMO-BATCH"),c.occupied||(c.quantity=0,c.sku="",c.product="",c.batch="")}const a={started:!1,enabled:!1,cycles:0,message:"准备就绪",error:""};async function o(l){let c;if(l.type==="outbound"){const u=n.slots.find(x=>x.id===l.slotId),p=s.get(u==null?void 0:u.deviceId),m=i.find(x=>x.type==="stacker"&&x.aisle===(p==null?void 0:p.aisle));c=Mg(n,i,u.id,_g(i,p,m,l.port),e(m.id))}else{const u=n.tasks.find(d=>d.type==="outbound"&&d.cargo.boxCode===l.boxCode&&d.status==="completed"&&!d.collected);if(!u)throw Error("没有等待回库的模拟料框");const m=n.slots.filter(d=>!d.occupied&&!n.tasks.some(E=>E.type==="inbound"&&E.target===d.id&&E.status!=="completed")).filter(d=>{const E=s.get(d.deviceId),T=d.index<E.params.smallBays*E.params.smallLevels;return u.cargo.size===2?!T&&E.aisle===2:T}).sort((d,E)=>+(s.get(E.deviceId).aisle===l.preferredAisle)-+(s.get(d.deviceId).aisle===l.preferredAisle)).find(d=>Xa(i).some(E=>E.aisle===s.get(d.deviceId).aisle&&!n.tasks.some(T=>T.type==="inbound"&&T.dockId===E.id&&T.cargoState==="conveyor")));if(!m)throw Error("没有可用的回库位置");const x=s.get(m.deviceId),M=Xa(i).find(d=>d.aisle===x.aisle),f=i.find(d=>d.type==="stacker"&&d.aisle===x.aisle);c=Tg(n,i,{dockId:M.id,targetId:m.id,boxCode:l.boxCode,entryPort:l.port},e(f.id)),c.cargo={...u.cargo},u.collected=!0}return c.autoDemo=!0,c}const h=bg({state:()=>n,objects:()=>i,ports:()=>vo(i).filter(l=>!n.tasks.some(c=>c.type==="outbound"&&c.destinationPort===l.code&&!c.collected||c.type==="inbound"&&c.entryPort===l.code&&c.status!=="completed")),pose:e,running:()=>r,dbBusy:()=>!1,setRunning:l=>r=l,dispatch:o,notify:t},a);return{state:n,status:a,dispatch:o,start:()=>h.start(),pause:()=>h.pause(),dispose:()=>{h.pause(),h.reset()},get playing(){return r},async advance(l){if(!r)return!1;n.elapsed+=l;const c=Ag(n,l,e),u=Sg(n,l,e);return await h.advance(l),c||u}}}function Rg(i,e="A",t=10){const n=new Jt;for(const h of i){const l=h.params,c=l.smallBays*l.smallPitch+l.largeBays*l.largePitch,u=Math.max(l.smallBays?l.smallLevels*l.smallStep:0,l.largeBays?l.largeLevels*l.largeStep:0)+.2,p=new Ye().compose(new N(...h.position),new fn().setFromEuler(new Nt(...h.rotation.map(an.degToRad))),new N(...h.scale));n.union(new Jt(new N(-c/2,0,-l.depth/2),new N(c/2,u,l.depth/2)).applyMatrix4(p))}if(n.isEmpty())return null;const s=t,r=n.max.z-n.min.z+4,a=e==="A"?n.min.x-1-s/2:n.max.x+1+s/2,o=(n.min.z+n.max.z)/2;return{bounds:n,side:e,x:a,z:o,width:r,depth:s}}function Cg(i,e,t,n,s,r,a="#d5b76c"){const o=document.createElement("canvas");o.width=1024,o.height=512;const h=o.getContext("2d");h.strokeStyle=a,h.lineWidth=5,h.strokeRect(12,12,1e3,488);for(const u of[12,1012])for(const p of[12,500])h.fillStyle=a,h.fillRect(u===12?12:942,p===12?12:486,70,14);h.fillStyle=a,h.textAlign="left",h.font='600 28px "Segoe UI",sans-serif',h.fillText("DISPATCH / A",34,54),h.font="18px Microsoft YaHei",h.fillText(e,34,84);for(const u of[260,512,764])h.beginPath(),h.moveTo(u-24,470),h.lineTo(u+24,470),h.lineTo(u+24,452),h.lineTo(u+48,480),h.lineTo(u+24,508),h.lineTo(u+24,490),h.lineTo(u-24,490),h.closePath(),h.fill();const l=new En(o);l.colorSpace=yt,l.anisotropy=4;const c=new Ze(new zn(t,n),new St({map:l,transparent:!0,roughness:.82,metalness:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}));return c.rotation.x=-Math.PI/2,c.position.set(s,.014,r),c.receiveShadow=!0,c}function Pg(i){const e=new bt;e.userData.annotation=!0;const{x:t,z:n,width:s,depth:r}=i;return e.add(Cg("A 端出口","输送线作业区 / 深 "+r+" m",r,s,t,n)),e}const Dg=["#68d4c0","#70b9f2","#eebd69","#c39bea"];function Lg(i,e){var m;const t=i.params,n=t.smallBays*t.smallPitch+t.largeBays*t.largePitch,s=Math.max(t.smallBays?t.smallLevels*t.smallStep:0,t.largeBays?t.largeLevels*t.largeStep:0)+.2,r=new bt,a=Dg[e%4],o=((m=i.name.match(/第\s*(\d+)\s*[列排]/))==null?void 0:m[1])||String(e+1),h=document.createElement("canvas");h.width=256,h.height=160;const l=h.getContext("2d");l.fillStyle="#102335",l.fillRect(0,0,256,160),l.strokeStyle=a,l.lineWidth=8,l.strokeRect(4,4,248,152),l.font="bold 70px Microsoft YaHei, sans-serif",l.textAlign="center",l.fillStyle="#edf6ff",l.fillText(o+" 列",128,91),l.font="27px Microsoft YaHei, sans-serif",l.fillStyle=a,l.fillText(i.aisle?"巷道 "+i.aisle:"料框库",128,133);const c=new En(h);c.colorSpace=yt;const u=new Ha(new sr({map:c,depthTest:!0,depthWrite:!1}));u.position.set(-n/2-.2,1.4,0),u.scale.set(.96,.6,1),r.add(u);const p=new Ze(new Gt(.06,Math.min(s,1.8),.08),new or({color:a}));return p.position.set(-n/2-.05,Math.min(s,1.8)/2,t.depth/2+.05),r.add(p),r.userData.annotation=!0,r.traverse(x=>{x.userData.id=i.id}),r}function Ug(i,e){const t=i.bounds.clone();for(const o of e.filter(h=>h.type==="stacker"||h.type==="conveyor")){const h=o.params,l=o.type==="stacker"?h.railLength/2:h.length/2,c=o.type==="stacker"?.7:h.width/2+.4,u=new Ye().compose(new N(...o.position),new fn().setFromEuler(new Nt(...o.rotation.map(an.degToRad))),new N(...o.scale));t.union(new Jt(new N(-l,0,-c),new N(l,1,c)).applyMatrix4(u))}const n=Math.min(i.x-i.depth/2,t.min.x)-1,s=t.max.x+1,r=Math.min(i.z-i.width/2,t.min.z)-.5,a=Math.max(i.z+i.width/2,t.max.z)+.5;return{width:Math.ceil(s-n),depth:Math.max(10,Math.ceil(a-r)),centerX:(n+s)/2,centerZ:(r+a)/2}}function Fl(i,e=1.5){const t=i.bounds.getSize(new N),n=i.bounds.getCenter(new N),s=Math.max(21,(t.z+4)/(2*Math.tan(an.degToRad(21))*e)*1.2);return{target:new N(i.bounds.min.x+1,t.y*.29,n.z),position:new N(i.bounds.min.x-s,t.y*.94+1,n.z+t.z*.92)}}function Ol(i,e=1.5){const t=i.bounds.clone(),n=t.getCenter(new N),s=new N(-1.8,1.4,1.1).normalize(),r=new Ye().lookAt(s,new N,new N(0,1,0)),a=new N().setFromMatrixColumn(r,0),o=new N().setFromMatrixColumn(r,1),h=Math.tan(an.degToRad(21));let l=0;t.min.x-=10,t.getCenter(n);for(const c of[t.min.x,t.max.x])for(const u of[t.min.y,t.max.y])for(const p of[t.min.z,t.max.z]){const m=new N(c,u,p).sub(n);l=Math.max(l,m.dot(s)+Math.max(Math.abs(m.dot(o))/h,Math.abs(m.dot(a))/(h*Math.max(e,.2))))}return{target:n,position:n.clone().addScaledVector(s,Math.max(20,l*1.12))}}const Bl=new WeakMap;function zl(i){const e=i.userData.carriage||i;let t=Bl.get(e);if(!t){e.updateWorldMatrix(!0,!0);const s=e.matrixWorld.clone().invert();t=new Jt,e.traverse(r=>{let a=r;for(;a;){if(a.userData.annotation)return;a=a.parent}if(!r.geometry)return;let o;r.isInstancedMesh?(r.computeBoundingBox(),o=r.boundingBox):(r.geometry.boundingBox||r.geometry.computeBoundingBox(),o=r.geometry.boundingBox),o&&!o.isEmpty()&&t.union(o.clone().applyMatrix4(s.clone().multiply(r.matrixWorld)))}),Bl.set(e,t)}e.updateWorldMatrix(!0,!1);const n=t.clone().applyMatrix4(e.matrixWorld);return{center:n.getCenter(new N),size:n.getSize(new N)}}function Ig(i,e,t,n){const s=t.clone().sub(e.target).multiplyScalar(1-Math.exp(-12*n));i.position.add(s),e.target.add(s)}const $n={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class kn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ng=new mo(-1,1,1,-1,0,1);class Fg extends on{constructor(){super(),this.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Kt([0,2,0,0,2,0],2))}}const Og=new Fg;class ls{constructor(e){this._mesh=new Ze(Og,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ng)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Bg extends kn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ht.clone(e.uniforms),this.material=new ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ls(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class kl extends kn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class zg extends kn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class kg{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new me);this._width=n.width,this._height=n.height,t=new At(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:It}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Bg($n),this.copyPass.material.blending=Mt,this.clock=new Lu}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}kl!==void 0&&(a instanceof kl?n=!0:a instanceof zg&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new me);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Hg extends kn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ze}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const Bs={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new me},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ye},cameraProjectionMatrixInverse:{value:new Ye},cameraWorldMatrix:{value:new Ye},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new N(-1,-1,-1)},sceneBoxMax:{value:new N(1,1,1)}},vertexShader:`

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
		}`},zs={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Yr={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Vg(i=5){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=Gg(e),n=t.length,s=new Uint8Array(n*4);for(let a=0;a<n;++a){const o=t[a],h=2*Math.PI*o/n,l=new N(Math.cos(h),Math.sin(h),0).normalize();s[a*4]=(l.x*.5+.5)*255,s[a*4+1]=(l.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}const r=new co(s,e,e);return r.wrapS=On,r.wrapT=On,r.needsUpdate=!0,r}function Gg(i){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=e*e,n=Array(t).fill(0);let s=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(s===-1&&r===e?(r=e-2,s=0):(r===e&&(r=0),s<0&&(s=e-1)),n[s*e+r]!==0){r-=2,s++;continue}else n[s*e+r]=a++;r++,s--}return n}const ks={defines:{SAMPLES:16,SAMPLE_VECTORS:Oc(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new me},cameraProjectionMatrixInverse:{value:new Ye},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Oc(i,e,t){const n=Wg(i,e,t);let s="vec3[SAMPLES](";for(let r=0;r<i;r++){const a=n[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<i-1?",":")"}`}return s}function Wg(i,e,t){const n=[];for(let s=0;s<i;s++){const r=2*Math.PI*e*s/i,a=Math.pow(s/(i-1),t);n.push(new N(Math.cos(r),Math.sin(r),a))}return n}class Xg{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,s,r;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,h=Math.floor(e+o),l=Math.floor(t+o),c=(3-Math.sqrt(3))/6,u=(h+l)*c,p=h-u,m=l-u,x=e-p,M=t-m;let f,d;x>M?(f=1,d=0):(f=0,d=1);const E=x-f+c,T=M-d+c,b=x-1+2*c,C=M-1+2*c,y=h&255,_=l&255,A=this.perm[y+this.perm[_]]%12,v=this.perm[y+f+this.perm[_+d]]%12,g=this.perm[y+1+this.perm[_+1]]%12;let S=.5-x*x-M*M;S<0?n=0:(S*=S,n=S*S*this._dot(this.grad3[A],x,M));let L=.5-E*E-T*T;L<0?s=0:(L*=L,s=L*L*this._dot(this.grad3[v],E,T));let P=.5-b*b-C*C;return P<0?r=0:(P*=P,r=P*P*this._dot(this.grad3[g],b,C)),70*(n+s+r)}noise3d(e,t,n){let s,r,a,o;const l=(e+t+n)*.3333333333333333,c=Math.floor(e+l),u=Math.floor(t+l),p=Math.floor(n+l),m=1/6,x=(c+u+p)*m,M=c-x,f=u-x,d=p-x,E=e-M,T=t-f,b=n-d;let C,y,_,A,v,g;E>=T?T>=b?(C=1,y=0,_=0,A=1,v=1,g=0):E>=b?(C=1,y=0,_=0,A=1,v=0,g=1):(C=0,y=0,_=1,A=1,v=0,g=1):T<b?(C=0,y=0,_=1,A=0,v=1,g=1):E<b?(C=0,y=1,_=0,A=0,v=1,g=1):(C=0,y=1,_=0,A=1,v=1,g=0);const S=E-C+m,L=T-y+m,P=b-_+m,U=E-A+2*m,B=T-v+2*m,z=b-g+2*m,q=E-1+3*m,H=T-1+3*m,X=b-1+3*m,ee=c&255,oe=u&255,Me=p&255,Ee=this.perm[ee+this.perm[oe+this.perm[Me]]]%12,Ae=this.perm[ee+C+this.perm[oe+y+this.perm[Me+_]]]%12,Pe=this.perm[ee+A+this.perm[oe+v+this.perm[Me+g]]]%12,K=this.perm[ee+1+this.perm[oe+1+this.perm[Me+1]]]%12;let J=.6-E*E-T*T-b*b;J<0?s=0:(J*=J,s=J*J*this._dot3(this.grad3[Ee],E,T,b));let ue=.6-S*S-L*L-P*P;ue<0?r=0:(ue*=ue,r=ue*ue*this._dot3(this.grad3[Ae],S,L,P));let $=.6-U*U-B*B-z*z;$<0?a=0:($*=$,a=$*$*this._dot3(this.grad3[Pe],U,B,z));let le=.6-q*q-H*H-X*X;return le<0?o=0:(le*=le,o=le*le*this._dot3(this.grad3[K],q,H,X)),32*(s+r+a+o)}noise4d(e,t,n,s){const r=this.grad4,a=this.simplex,o=this.perm,h=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let c,u,p,m,x;const M=(e+t+n+s)*h,f=Math.floor(e+M),d=Math.floor(t+M),E=Math.floor(n+M),T=Math.floor(s+M),b=(f+d+E+T)*l,C=f-b,y=d-b,_=E-b,A=T-b,v=e-C,g=t-y,S=n-_,L=s-A,P=v>g?32:0,U=v>S?16:0,B=g>S?8:0,z=v>L?4:0,q=g>L?2:0,H=S>L?1:0,X=P+U+B+z+q+H,ee=a[X][0]>=3?1:0,oe=a[X][1]>=3?1:0,Me=a[X][2]>=3?1:0,Ee=a[X][3]>=3?1:0,Ae=a[X][0]>=2?1:0,Pe=a[X][1]>=2?1:0,K=a[X][2]>=2?1:0,J=a[X][3]>=2?1:0,ue=a[X][0]>=1?1:0,$=a[X][1]>=1?1:0,le=a[X][2]>=1?1:0,Fe=a[X][3]>=1?1:0,rt=v-ee+l,I=g-oe+l,Ve=S-Me+l,Ue=L-Ee+l,Re=v-Ae+2*l,ve=g-Pe+2*l,Ke=S-K+2*l,xe=L-J+2*l,Ie=v-ue+3*l,ot=g-$+3*l,et=S-le+3*l,D=L-Fe+3*l,w=v-1+4*l,W=g-1+4*l,F=S-1+4*l,Y=L-1+4*l,k=f&255,ce=d&255,te=E&255,ge=T&255,Te=o[k+o[ce+o[te+o[ge]]]]%32,se=o[k+ee+o[ce+oe+o[te+Me+o[ge+Ee]]]]%32,fe=o[k+Ae+o[ce+Pe+o[te+K+o[ge+J]]]]%32,Le=o[k+ue+o[ce+$+o[te+le+o[ge+Fe]]]]%32,we=o[k+1+o[ce+1+o[te+1+o[ge+1]]]]%32;let he=.6-v*v-g*g-S*S-L*L;he<0?c=0:(he*=he,c=he*he*this._dot4(r[Te],v,g,S,L));let Oe=.6-rt*rt-I*I-Ve*Ve-Ue*Ue;Oe<0?u=0:(Oe*=Oe,u=Oe*Oe*this._dot4(r[se],rt,I,Ve,Ue));let O=.6-Re*Re-ve*ve-Ke*Ke-xe*xe;O<0?p=0:(O*=O,p=O*O*this._dot4(r[fe],Re,ve,Ke,xe));let ne=.6-Ie*Ie-ot*ot-et*et-D*D;ne<0?m=0:(ne*=ne,m=ne*ne*this._dot4(r[Le],Ie,ot,et,D));let ae=.6-w*w-W*W-F*F-Y*Y;return ae<0?x=0:(ae*=ae,x=ae*ae*this._dot4(r[we],w,W,F,Y)),27*(c+u+p+m+x)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}_dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}}class cn extends kn{constructor(e,t,n=512,s=512,r,a,o){super(),this.width=n,this.height=s,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Vg(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new At(this.width,this.height,{type:It}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ut({defines:Object.assign({},Bs.defines),uniforms:Ht.clone(Bs.uniforms),vertexShader:Bs.vertexShader,fragmentShader:Bs.fragmentShader,blending:Mt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new bu,this.normalMaterial.blending=Mt,this.pdMaterial=new ut({defines:Object.assign({},ks.defines),uniforms:Ht.clone(ks.uniforms),vertexShader:ks.vertexShader,fragmentShader:ks.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ut({defines:Object.assign({},zs.defines),uniforms:Ht.clone(zs.uniforms),vertexShader:zs.vertexShader,fragmentShader:zs.fragmentShader,blending:Mt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ut({uniforms:Ht.clone($n.uniforms),vertexShader:$n.vertexShader,fragmentShader:$n.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ta,blendDst:Ji,blendEquation:tn,blendSrcAlpha:ea,blendDstAlpha:Ji,blendEquationAlpha:tn}),this.blendMaterial=new ut({uniforms:Ht.clone(Yr.uniforms),vertexShader:Yr.vertexShader,fragmentShader:Yr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Ql,blendSrc:ta,blendDst:Ji,blendEquation:tn,blendSrcAlpha:ea,blendDstAlpha:Ji,blendEquationAlpha:tn}),this._fsQuad=new ls(null),this._originalClearColor=new ze,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new uo,this.depthTexture.format=Li,this.depthTexture.type=Di,this.normalRenderTarget=new At(this.width,this.height,{minFilter:Et,magFilter:Et,type:It,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Oc(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case cn.OUTPUT.Off:break;case cn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Mt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case cn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Mt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case cn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Mt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case cn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case cn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Mt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case cn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Mt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new Xg,n=e*e*4,s=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const h=a,l=o;s[(a*e+o)*4]=(t.noise(h,l)*.5+.5)*255,s[(a*e+o)*4+1]=(t.noise(h+e,l)*.5+.5)*255,s[(a*e+o)*4+2]=(t.noise(h,l+e)*.5+.5)*255,s[(a*e+o)*4+3]=(t.noise(h+e,l+e)*.5+.5)*255}const r=new co(s,e,e,Zt,rn);return r.wrapS=On,r.wrapT=On,r.needsUpdate=!0,r}}cn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Hs={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Yg extends kn{constructor(){super(),this.uniforms=Ht.clone(Hs.uniforms),this.material=new yu({name:Hs.name,uniforms:this.uniforms,vertexShader:Hs.vertexShader,fragmentShader:Hs.fragmentShader}),this._fsQuad=new ls(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===Qe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$l?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ec?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===tc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ka?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ic?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===sc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===nc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Vs={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new me(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Gs={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new me(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},qr={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new me(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class qg extends kn{constructor(){super(),this._edgesRT=new At(1,1,{depthBuffer:!1,type:It}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new At(1,1,{depthBuffer:!1,type:It}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new _t,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=sn,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const n=new Image;n.src=this._getSearchTexture(),n.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new _t,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=n,this._searchTexture.magFilter=Et,this._searchTexture.minFilter=Et,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=Ht.clone(Vs.uniforms),this._materialEdges=new ut({defines:Object.assign({},Vs.defines),uniforms:this._uniformsEdges,vertexShader:Vs.vertexShader,fragmentShader:Vs.fragmentShader}),this._uniformsWeights=Ht.clone(Gs.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new ut({defines:Object.assign({},Gs.defines),uniforms:this._uniformsWeights,vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader}),this._uniformsBlend=Ht.clone(qr.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new ut({uniforms:this._uniformsBlend,vertexShader:qr.vertexShader,fragmentShader:qr.fragmentShader}),this._fsQuad=new ls(null)}render(e,t,n){this._uniformsEdges.tDiffuse.value=n.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=n.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}const jg={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ze(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Fi extends kn{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new me(e.x,e.y):new me(256,256),this.clearColor=new ze(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new At(r,a,{type:It}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let c=0;c<this.nMips;c++){const u=new At(r,a,{type:It});u.texture.name="UnrealBloomPass.h"+c,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const p=new At(r,a,{type:It});p.texture.name="UnrealBloomPass.v"+c,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}const o=jg;this.highPassUniforms=Ht.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ut({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let c=0;c<this.nMips;c++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(h[c])),this.separableBlurMaterials[c].uniforms.invSize.value=new me(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ht.clone($n.uniforms),this.blendMaterial=new ut({uniforms:this.copyUniforms,vertexShader:$n.vertexShader,fragmentShader:$n.fragmentShader,blending:Jr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ze,this._oldClearAlpha=1,this._basic=new or,this._fsQuad=new ls(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new me(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this._fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[h].uniforms.direction.value=Fi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=Fi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[h];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new ut({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new me(.5,.5)},direction:{value:new me(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new ut({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Fi.BlurDirectionX=new me(1,0);Fi.BlurDirectionY=new me(0,1);function Zg(i=()=>document.hidden){let e=!0;return{request(){e=!0},render(t,n=!1){if(i()||!e&&!n)return!1;e=!1;try{t()}catch(s){throw e=!0,s}return!0}}}function Kg(i,e,t){const n=i.getSize(new me),s=new At(n.x,n.y,{type:It,samples:Math.min(4,i.capabilities.maxSamples)}),r=new kg(i,s);r.setPixelRatio(Math.min(i.getPixelRatio(),1.5));const a=new Hg(e,t),o=new cn(e,t,512,512);o.updateGtaoMaterial({radius:.38,thickness:.7,distanceFallOff:1,samples:8,distanceExponent:2}),o.blendIntensity=.55;const h=new Fi(n,.13,.35,1.5),l=new Yg,c=new qg,u=[a,o,h,l,c];u.forEach(m=>r.addPass(m));const p=Zg();return{invalidate:()=>p.request(),render:(m=!1)=>p.render(()=>r.render(),m),setQuality(m){p.request(),o.enabled=h.enabled=m;const x=m?Math.min(4,i.capabilities.maxSamples):0;for(const M of[r.renderTarget1,r.renderTarget2])M.samples!==x&&(M.samples=x,M.dispose())},resize(m,x){r.setSize(m,x),p.request()},dispose(){u.forEach(m=>m.dispose()),r.dispose()}}}class Jg extends yc{constructor(){super();const e=new Gt;e.deleteAttribute("uv");const t=new St({side:Dt}),n=new St,s=new Cu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ze(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Ec(e,n,6),o=new mt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const h=new Ze(e,yi(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const l=new Ze(e,yi(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const c=new Ze(e,yi(17));c.position.set(14.904,12.198,-1.832),c.scale.set(.15,4.265,6.331),this.add(c);const u=new Ze(e,yi(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const p=new Ze(e,yi(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const m=new Ze(e,yi(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function yi(i){return new Eu({color:0,emissive:16777215,emissiveIntensity:i})}function Qg(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=2048;const s=n.getContext("2d");s.fillStyle="#9da6a3",s.fillRect(0,0,2048,2048);let r=43;for(let l=0;l<8e4;l++){r=Math.imul(r,1664525)+1013904223>>>0;const c=r%2048;r=Math.imul(r,1664525)+1013904223>>>0,s.fillStyle=l%2?"#ffffff0a":"#2435380a",s.fillRect(c,r%2048,2,2)}const a=2048/i,o=2048/e;for(let l=0;l<70;l++){r=Math.imul(r,1664525)+1013904223>>>0;const c=r%2048;r=Math.imul(r,1664525)+1013904223>>>0;const u=r%2048,p=80+r%160,m=s.createRadialGradient(c,u,0,c,u,p);m.addColorStop(0,l%2?"#eff2e91a":"#3c494518"),m.addColorStop(1,"#66716d00"),s.fillStyle=m,s.fillRect(c-p,u-p,p*2,p*2)}for(const l of[.12,.88])for(const c of[-.28,.28])s.strokeStyle="#45504c0e",s.lineWidth=Math.max(2,o*.1),s.beginPath(),s.moveTo(a,2048*l+o*c),s.lineTo(2048-a,2048*l+o*c),s.stroke();s.strokeStyle="#66767938",s.lineWidth=1.4;for(let l=4;l<i;l+=4)s.beginPath(),s.moveTo(l*a,0),s.lineTo(l*a,2048),s.stroke();for(let l=4;l<e;l+=4)s.beginPath(),s.moveTo(0,l*o),s.lineTo(2048,l*o),s.stroke();s.strokeStyle="#f1c65d",s.lineWidth=Math.max(2,Math.min(a,o)*.09),s.strokeRect(a*.4,o*.4,2048-a*.8,2048-o*.8);const h=new En(n);return h.colorSpace=yt,h.anisotropy=Math.min(8,t),h}function $g(i,e){const t=i.getObjectByName("studio-sun");if(!t)return;const n=e.centerX||0,s=e.centerZ||0,r=Math.max(e.width,e.depth,20);t.position.set(n+r*.25,r*.85,s+r*.35),t.target.position.set(n,0,s);const a=t.shadow.camera;a.left=a.bottom=-r*.75,a.right=a.top=r*.75,a.near=.5,a.far=r*3,a.updateProjectionMatrix(),t.shadow.normalBias=.025,t.shadow.bias=-15e-5}function e0(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=512;const s=n.getContext("2d");s.fillStyle="#b8b8b8",s.fillRect(0,0,512,512);let r=237;for(let o=0;o<90;o++){r=Math.imul(r,1664525)+1013904223>>>0;const h=r%512;r=Math.imul(r,1664525)+1013904223>>>0;const l=r%512,c=15+r%85,u=s.createRadialGradient(h,l,0,h,l,c);u.addColorStop(0,o%2?"#eeeeee50":"#70707040"),u.addColorStop(1,"#b8b8b800"),s.fillStyle=u,s.fillRect(h-c,l-c,c*2,c*2)}s.strokeStyle="#e0e0e0",s.lineWidth=1;for(let o=4;o<i;o+=4)s.beginPath(),s.moveTo(o/i*512,0),s.lineTo(o/i*512,512),s.stroke();for(let o=4;o<e;o+=4)s.beginPath(),s.moveTo(0,o/e*512),s.lineTo(512,o/e*512),s.stroke();const a=new En(n);return a.anisotropy=Math.min(8,t),a}function t0(i,e=12,{wallsVisible:t=!0}={}){const n=new bt;n.name="factory-architecture";const s=new bt;s.name="factory-walls",s.visible=t,n.add(s);let r=n;const a=i.width+5,o=i.depth+6,h=i.centerX||0,l=i.centerZ||0,c={concrete:new St({color:"#8e9491",roughness:.86}),wall:new St({color:"#b5bbb5",roughness:.87}),steel:new St({color:"#555f60",metalness:.65,roughness:.38}),dark:new St({color:"#293336",metalness:.45,roughness:.5}),paint:new St({color:"#d1a449",metalness:.12,roughness:.55}),glass:new fo({color:"#aec7ca",emissive:"#90acb2",emissiveIntensity:.13,metalness:.1,roughness:.24,clearcoat:.65}),lamp:new St({color:"#fff5da",emissive:"#fff0cf",emissiveIntensity:2.5,roughness:.4})},u=(d,E,T,b,C,y,_)=>{const A=new Ze(new Gt(b,C,y),c[_]);return A.position.set(h+d,E,l+T),A.receiveShadow=!0,A.castShadow=_!=="lamp",r.add(A),A},p=(d,E,T,b,C,y,_=0)=>{if(typeof document>"u")return;const A=document.createElement("canvas");A.width=768,A.height=256;const v=A.getContext("2d");v.fillStyle="#27383b",v.fillRect(0,0,768,256),v.fillStyle="#c7a65f",v.fillRect(0,0,12,256),v.fillStyle="#edf1e9",v.font='600 104px "Segoe UI",sans-serif',v.fillText(d,40,128),v.fillStyle="#a8bbb9",v.font='28px "Segoe UI",sans-serif',v.fillText(E,44,195);const g=new En(A);g.colorSpace=yt,g.anisotropy=4;const S=new Ze(new zn(y,y/3),new St({map:g,roughness:.8}));S.position.set(h+T,b,l+C),S.rotation.y=_,r.add(S)};u(0,-.22,0,a,.4,o,"concrete"),r=s,u(0,e/2,-o/2,a,e,.18,"wall"),u(a/2,e/2,0,.18,e,o,"wall"),u(0,.55,-o/2+.11,a,1.1,.07,"dark"),u(a/2-.11,.55,0,.07,1.1,o,"dark");const m=Math.min(4.5,o*.5);u(a/2-.12,2.2,0,.08,4.4,m,"dark"),u(a/2-.18,2.18,0,.08,4.2,m-.22,"steel");for(let d=.25;d<4.3;d+=.22)u(a/2-.23,d,0,.025,.025,m-.3,"dark");for(const d of[-1,1])u(a/2-.25,1,d*(m/2+.16),.18,2,.15,"paint");p("WAREHOUSE A","AUTOMATED STORAGE / DISPATCH",a/2-.24,6.2,0,Math.min(o*.75,8),-Math.PI/2);const x=Math.max(2,Math.ceil(a/7.5)),M=a/x;for(let d=0;d<=x;d++){r=s;const E=-a/2+d*M;if(u(E,e/2,-o/2+.24,.22,e,.32,"steel"),u(E,.6,-o/2+.44,.3,1.2,.12,"paint"),d<x){const T=E+M/2;d%2===0&&p("A / "+String(d+1).padStart(2,"0"),"STORAGE ZONE",T,2.5,-o/2+.2,1.5),u(T,e*.73,-o/2+.12,M-.6,e*.22,.06,"glass");for(let b=0;b<=4;b++)u(E+.3+b*(M-.6)/4,e*.73,-o/2+.18,.045,e*.22,.06,"steel");u(T,e*.73,-o/2+.18,M-.6,.055,.06,"steel");for(let b=1.5;b<e*.58;b+=.65)u(T,b,-o/2+.11,M-.26,.022,.025,"concrete");r=n;for(const b of[-o*.23,o*.23]){u(T,e-.65,b,2.8,.09,.18,"dark"),u(T,e-.705,b,2.65,.025,.13,"lamp");for(const C of[-1,1])u(T+C,e-.32,b,.012,.6,.012,"steel")}}}r=s,u(0,e*.48,-o/2+.28,a,.1,.12,"steel");const f=new Ze(new Ni(.035,.035,a,10),new St({color:"#a54332",roughness:.55,metalness:.3}));f.rotation.z=Math.PI/2,f.position.set(h,e*.42,l-o/2+.29),s.add(f),r=n;for(const d of[-a/2+1,a/2-1])u(d,.48,o/2-.4,.12,.96,.12,"paint"),u(d,.055,o/2-.4,.3,.11,.3,"dark"),u(d,.65,o/2-.4,.125,.14,.125,"dark");return n}function n0(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=256;const s=n.getContext("2d"),r=s.createImageData(256,256);let a=91;for(let h=0;h<r.data.length;h+=4){a=Math.imul(a,1664525)+1013904223>>>0;const l=120+a%24;r.data.set([l,l,l,255],h)}s.putImageData(r,0,0);const o=new En(n);return o.wrapS=o.wrapT=On,o.repeat.set(i/3,e/3),o.anisotropy=Math.min(8,t),o}const Hl={type:"change"},Mo={type:"start"},Bc={type:"end"},Ws=new ao,Vl=new Dn,i0=Math.cos(70*an.DEG2RAD),pt=new N,Ut=2*Math.PI,nt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},jr=1e-6;class s0 extends Iu{constructor(e,t=null){super(e,t),this.state=nt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ti.ROTATE,MIDDLE:Ti.DOLLY,RIGHT:Ti.PAN},this.touches={ONE:bi.ROTATE,TWO:bi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new fn,this._lastTargetPosition=new N,this._quat=new fn().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ll,this._sphericalDelta=new ll,this._scale=1,this._panOffset=new N,this._rotateStart=new me,this._rotateEnd=new me,this._rotateDelta=new me,this._panStart=new me,this._panEnd=new me,this._panDelta=new me,this._dollyStart=new me,this._dollyEnd=new me,this._dollyDelta=new me,this._dollyDirection=new N,this._mouse=new me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=a0.bind(this),this._onPointerDown=r0.bind(this),this._onPointerUp=o0.bind(this),this._onContextMenu=p0.bind(this),this._onMouseWheel=h0.bind(this),this._onKeyDown=u0.bind(this),this._onTouchStart=d0.bind(this),this._onTouchMove=f0.bind(this),this._onMouseDown=l0.bind(this),this._onMouseMove=c0.bind(this),this._interceptControlDown=m0.bind(this),this._interceptControlUp=g0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hl),this.update(),this.state=nt.NONE}update(e=null){const t=this.object.position;pt.copy(t).sub(this.target),pt.applyQuaternion(this._quat),this._spherical.setFromVector3(pt),this.autoRotate&&this.state===nt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ut:n>Math.PI&&(n-=Ut),s<-Math.PI?s+=Ut:s>Math.PI&&(s-=Ut),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(pt.setFromSpherical(this._spherical),pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=pt.length();a=this._clampDistance(o*this._scale);const h=o-a;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ws.origin.copy(this.object.position),Ws.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ws.direction))<i0?this.object.lookAt(this.target):(Vl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ws.intersectPlane(Vl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>jr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>jr||this._lastTargetPosition.distanceToSquared(this.target)>jr?(this.dispatchEvent(Hl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ut/60*this.autoRotateSpeed*e:Ut/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){pt.setFromMatrixColumn(t,0),pt.multiplyScalar(-e),this._panOffset.add(pt)}_panUp(e,t){this.screenSpacePanning===!0?pt.setFromMatrixColumn(t,1):(pt.setFromMatrixColumn(t,0),pt.crossVectors(this.object.up,pt)),pt.multiplyScalar(e),this._panOffset.add(pt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;pt.copy(s).sub(this.target);let r=pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ut*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ut*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ut*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ut*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ut*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ut*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ut*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ut*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function r0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function a0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function o0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Bc),this.state=nt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function l0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ti.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=nt.DOLLY;break;case Ti.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=nt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=nt.ROTATE}break;case Ti.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=nt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=nt.PAN}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(Mo)}function c0(i){switch(this.state){case nt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case nt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function h0(i){this.enabled===!1||this.enableZoom===!1||this.state!==nt.NONE||(i.preventDefault(),this.dispatchEvent(Mo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Bc))}function u0(i){this.enabled!==!1&&this._handleKeyDown(i)}function d0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case bi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=nt.TOUCH_ROTATE;break;case bi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=nt.TOUCH_PAN;break;default:this.state=nt.NONE}break;case 2:switch(this.touches.TWO){case bi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=nt.TOUCH_DOLLY_PAN;break;case bi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=nt.TOUCH_DOLLY_ROTATE;break;default:this.state=nt.NONE}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(Mo)}function f0(i){switch(this._trackPointer(i),this.state){case nt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case nt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case nt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case nt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=nt.NONE}}function p0(i){this.enabled!==!1&&i.preventDefault()}function m0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function g0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const v0=2,x0="public-hardware",_0="五金立体库 · 模拟展示",M0={width:61,depth:12,exitSide:"A",exitReserve:10,centerX:-3.637500000000003,centerZ:0,centerGap:.15},S0=2026,y0=[{position:[0,0,2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 1 列料框库",metalness:.2,id:"public-hardware-1"},{position:[0,0,.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 2 列料框库",metalness:.2,id:"public-hardware-2"},{position:[0,0,-.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 3 列料框库",metalness:.2,id:"public-hardware-3"},{position:[0,0,-2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 4 列料框库",metalness:.2,id:"public-hardware-4"},{position:[0,0,1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:1,params:{height:9.4,travel:0,lift:1.2,railLength:51},name:"巷道 1 堆垛机",metalness:.2,id:"public-hardware-5"},{position:[0,0,-1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:2,params:{height:9.4,travel:0,lift:1.2,railLength:48},name:"巷道 2 堆垛机",metalness:.2,id:"public-hardware-6"},{position:[-27.3,0,0],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"hardwareConveyorAssembly",params:{length:4.8,width:6.7,height:.81,laneCenters:[-2.975,-.475,.475,2.975]},name:"五金 · 四列对齐输送线总装",metalness:.35,id:"public-hardware-7"},{position:[-23.7375,0,2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第1列入库专用接驳",metalness:.35,id:"hardware-rack-link-0",dockMode:"inbound"},{position:[-23.7375,0,.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第2列出库专用接驳",metalness:.35,id:"hardware-rack-link-1",dockMode:"outbound"},{position:[-23.0375,0,-.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第3列入库专用接驳",metalness:.35,id:"hardware-rack-link-2",dockMode:"inbound"},{position:[-23.0375,0,-2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第4列出库专用接驳",metalness:.35,id:"hardware-rack-link-3",dockMode:"outbound"}],b0={version:v0,id:x0,name:_0,floor:M0,seed:S0,objects:y0},E0=new Set(["#242a2b","#283437","#343e40","#43484b","#35322b","#304b50"]),T0=new Set(["#d0d8df","#c3cdd1","#9eafb9","#b0b3b1","#b8bdc1","#929a9f"]);function zc(i,e={}){const s=new ze(i).getHSL({}).s<.22,r=["#98734d","#bd9669","#b28d62","#b18b5f","#d4b485"].includes(i),a=E0.has(i),o=!r&&!a&&(!s||T0.has(i)),h=o?fo:St,l=new h({color:i,roughness:r?.87:a?.88:o?.56:.46,metalness:r||a?0:o?.12:.52,...o?{clearcoat:.18,clearcoatRoughness:.45}:{},...e});return l.userData.industrialSurface=!0,l.userData.surfaceRole=r?"wood":a?"rubber":o?"paint":"metal",l}function w0(i){let e=i.userData.surfaceRole||"metal";!["wood","rubber"].includes(e)&&i.metalness===0&&i.roughness>=.9&&(e="cloth","clearcoat"in i&&(i.clearcoat=0)),i.userData.surfaceRole=e;const n={metal:{frequency:1600,amplitude:.025,expression:"sin(finishPoint.y * 1600.0 + sin(finishPoint.z * 13.0) * 0.4)"},paint:{frequency:1100,amplitude:.02,expression:"sin(finishPoint.x * 1100.0) * sin(finishPoint.y * 980.0 + finishPoint.z * 830.0)"},cloth:{frequency:950,amplitude:.04,expression:"sin(finishPoint.x * 950.0) * sin(finishPoint.z * 950.0 + finishPoint.y * 950.0)"},rubber:{frequency:1300,amplitude:.025,expression:"sin(finishPoint.x * 1300.0 + finishPoint.y * 710.0) * sin(finishPoint.z * 1100.0)"},wood:{frequency:160,amplitude:.05,expression:"sin(finishPoint.x * 160.0 + sin(finishPoint.z * 9.0) * 4.0)"}}[e];return i.onBeforeCompile=s=>{s.vertexShader=`varying vec3 finishPoint;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
finishPoint = position;`),s.fragmentShader=`varying vec3 finishPoint;
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <roughnessmap_fragment>",`
      #include <roughnessmap_fragment>
      float finishFootprint = length(fwidth(finishPoint * ${n.frequency.toFixed(1)}));
      float finishWeight = 1.0 - smoothstep(0.4, 2.0, finishFootprint);
      float finishGrain = ${n.expression};
      roughnessFactor = clamp(roughnessFactor + finishGrain * ${n.amplitude.toFixed(3)} * finishWeight, 0.04, 1.0);
    `)},i.customProgramCacheKey=()=>"industrial-finish-v1-"+e,i}function A0({box:i,cylinder:e},t,n,s=.18,r=.2){i(s,.018,r,t,.009,n,"#939d9e");for(const a of[-s*.32,s*.32])for(const o of[-r*.32,r*.32])e(.011,.003,t+a,.02,n+o,"y","#bcc1bf"),e(.008,.01,t+a,.026,n+o,"y","#566165")}function Gl({box:i,cylinder:e,rod:t},{length:n,width:s,height:r}){for(const l of[-n*.43,n*.43])for(const c of[-s*.44,s*.44])e(.045,.012,l,.006,c,"y","#343e40"),e(.012,.06,l,.038,c,"y","#aab3b2"),e(.021,.012,l,.065,c,"y","#616c70");for(const l of[-n*.41,n*.41])for(const c of[-1,1]){const u=c*(s/2+.018);i(.11,.07,.012,l,r-.06,u,"#6f7e81"),e(.008,.014,l,r-.04,u+c*.012,"z","#b2bcba"),e(.009,.065,l,r-.095,u,"x","#b2bcba")}const a=s/2-.06;t([-n*.39,r-.23,a],[n*.35,r-.23,a],.012,"#283437");for(const l of[-n*.32,0,n*.32])i(.025,.025,.04,l,r-.23,a,"#707e7d");const o=-n*.24,h=s/2+.055;i(.13,.12,.05,o,r-.12,h,"#d1b454"),e(.017,.016,o,r-.1,h+.034,"z","#aa3d32"),e(.013,.035,o,r-.19,h,"y","#39474a")}function R0({box:i,cylinder:e},{width:t,depth:n,height:s}){const r=s-.16,a=.16;for(const o of[-1,1]){const h=o*t*.34,l=-n*.38;i(.027,r-a,.036,h,(r+a)/2,l,"#333f42"),i(.012,r-a-.05,.018,h+o*.024,(r+a)/2,l,"#b3bcba");for(const c of[a,r])e(.052,.06,h,c,l,"z","#586567"),e(.023,.075,h,c,l,"z","#abb7b4");for(let c=a+.07;c<r-.06;c+=.14)i(.036,.025,.012,h,c,l+.025,"#8c9998");i(.08,.1,.045,h,r-.14,l+.055,"#485f64"),i(.015,.025,.008,h,r-.13,l+.083,"#bd9c4e")}}const Zi=new N;function qt(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),h=Math.PI/4;Zi.copy(e),Zi[n]=0,Zi.normalize();const l=.5*a/(a+o),c=1-Zi.angleTo(i)/h;return Math.sign(Zi[t])===1?c*l:o/(a+o)+l+l*(1-c)}class as extends Gt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const h=new N,l=new N,c=new N(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,x=u.length/6,M=new N,f=.5/a;for(let d=0,E=0;d<u.length;d+=3,E+=2)switch(h.fromArray(u,d),l.copy(h),l.x-=Math.sign(l.x)*f,l.y-=Math.sign(l.y)*f,l.z-=Math.sign(l.z)*f,l.normalize(),u[d+0]=c.x*Math.sign(h.x)+l.x*r,u[d+1]=c.y*Math.sign(h.y)+l.y*r,u[d+2]=c.z*Math.sign(h.z)+l.z*r,p[d+0]=l.x,p[d+1]=l.y,p[d+2]=l.z,Math.floor(d/x)){case 0:M.set(1,0,0),m[E+0]=qt(M,l,"z","y",r,n),m[E+1]=1-qt(M,l,"y","z",r,t);break;case 1:M.set(-1,0,0),m[E+0]=1-qt(M,l,"z","y",r,n),m[E+1]=1-qt(M,l,"y","z",r,t);break;case 2:M.set(0,1,0),m[E+0]=1-qt(M,l,"x","z",r,e),m[E+1]=qt(M,l,"z","x",r,n);break;case 3:M.set(0,-1,0),m[E+0]=1-qt(M,l,"x","z",r,e),m[E+1]=1-qt(M,l,"z","x",r,n);break;case 4:M.set(0,0,1),m[E+0]=1-qt(M,l,"x","y",r,e),m[E+1]=1-qt(M,l,"y","x",r,t);break;case 5:M.set(0,0,-1),m[E+0]=qt(M,l,"x","y",r,e),m[E+1]=1-qt(M,l,"y","x",r,t);break}}static fromJSON(e){return new as(e.width,e.height,e.depth,e.segments,e.radius)}}const kc={hardwareConveyorAssembly:{length:4.8,width:4.4,height:.81},hardwareLift:{width:1.15,depth:1.25,height:1.9,platformHeight:.72}},C0={hardwareConveyorAssembly:[["length","总长 · m",2,8,.01],["width","总宽 · m",2,8,.01],["height","输送面高度 · m",.5,1.5,.01]],hardwareLift:[["width","平台宽度 · m",.6,3,.01],["depth","平台长度 · m",.6,3,.01],["height","机架高度 · m",1,4,.05],["platformHeight","平台高度 · m",.3,3,.01]]};function P0(i,e){const t=i.params,n="#929a9f",s="#38434d",r="#c2c7c9";let a=e,o=null;const h=new Map;function l(f,d,E,T,b,C,y=n){h.has(y)||h.set(y,zc(y));const _=new Ze(Math.min(f,d,E)>=.15?new as(f,d,E,1,Math.min(.018,Math.min(f,d,E)*.08)):new Gt(f,d,E),h.get(y).clone());return _.position.set(T,b,C),_.userData={id:i.id,slot:o,tint:!1},a.add(_),_}function c(f,d,E=.035,T=n){const b=new N(...f),C=new N(...d),y=C.clone().sub(b),_=b.clone().add(C).multiplyScalar(.5),A=l(E,y.length(),E,..._.toArray(),T);return A.quaternion.setFromUnitVectors(new N(0,1,0),y.normalize()),A}function u(f,d,E,T,b,C="z",y=r){const _=l(.1,.1,.1,E,T,b,y);return _.geometry.dispose(),_.geometry=new Ni(f,f,d,16),C==="z"&&(_.rotation.x=Math.PI/2),C==="x"&&(_.rotation.z=Math.PI/2),_}function p(f,d,E){for(const T of[-f*.44,f*.44])for(const b of[-d*.44,d*.44])l(.07,E,.07,T,E/2,b),l(.18,.025,.18,T,.02,b,s)}function m(f,d,E,T="x",b="#587f90"){u(.11,.27,f,d,E,T,b);for(let C=0;C<5;C++)u(.12,.015,f+(T==="x"?(C-2)*.045:0),d,E+(T==="z"?(C-2)*.045:0),T,s);l(.18,.12,.14,f,d+.12,E,n)}function x(f,d,E){l(.05,.2,.05,f,d,E,s);for(let T=0;T<3;T++)l(.065,.055,.065,f,d+.12+T*.06,E,["#61aa88","#deb24b","#c76459"][T])}function M(f,d,E,T=4,b="z"){for(let C=0;C<T;C++)u(.018,.014,f+(b==="z"?(C-(T-1)/2)*.085:0),d,E+(b==="x"?(C-(T-1)/2)*.085:0),b,s)}if(i.type==="conveyor"&&t.exhibitionDetail){const f=t.length,d=t.width,E=t.height;if(p(f,d,E-.13),Gl({box:l,cylinder:u,rod:c},{length:f,width:d,height:E}),i.id.startsWith("hardware-rack-link-")){const T=Number(i.id.split("-").at(-1)),b=i.dockMode?i.dockMode==="inbound":[0,2].includes(T),C=b?"#e3594e":"#55c987",y=f/2-.45;for(const v of[-1,1])l(.55,.022,.035,y,E+.085,v*d*.44,C);const _=b?1:-1,A=y+_*.18;for(const v of[-1,1])c([A,E+.095,0],[A-_*.14,E+.095,v*.11],.025,C);if(typeof document<"u"){const v=document.createElement("canvas");v.width=256,v.height=96;const g=v.getContext("2d");g.fillStyle="#152b3e",g.fillRect(0,0,256,96),g.fillStyle=C,g.font="bold 44px sans-serif",g.textAlign="center",g.fillText(b?"仅入库":"仅出库",128,64);const S=new En(v),L=new Ha(new sr({map:S,depthTest:!1}));L.userData.ownedTexture=S,L.position.set(y,E+.4,0),L.scale.set(.65,.24,1),e.add(L)}}for(const T of[-d/2,d/2])l(f,.16,.075,0,E-.04,T,n),l(f,.035,.025,0,E+.065,T,s),l(f,.055,.06,0,.22,T);if(t.chainDeck){for(const T of[-d*.34,0,d*.34]){l(f-.14,.07,.115,0,E-.005,T,s);const b=Math.round((f-.16)/.075);for(let C=0;C<b;C++){const y=-f/2+.1+C*(f-.2)/(b-1);l(.047,.025,.1,y,E+.043,T,r);for(const _ of[-1,1])l(.058,.025,.018,y,E+.019,T+_*.057,n),u(.012,.14,y,E+.023,T,"z",s)}for(const C of[-f*.44,f*.44]){u(.09,.13,C,E-.025,T,"z",s);for(let y=0;y<10;y++){const _=y*Math.PI/5,A=l(.03,.025,.13,C+Math.cos(_)*.093,E-.025+Math.sin(_)*.093,T,n);A.rotation.z=_}}l(f-.16,.025,.08,0,E-.21,T,s)}for(const T of[-f*.44,f*.44])u(.026,d+.14,T,E-.025,0,"z",r),l(.16,.17,.1,T,E-.025,d/2,n)}else if(t.crossBelt){l(f-.12,.065,d-.1,0,E-.045,0,n),l(f-.18,.035,d-.15,0,E+.018,0,"#3c4851"),l(f-.18,.025,d-.15,0,E-.14,0,s);for(const T of[-d*.37,d*.37]){u(.085,f-.1,0,E-.055,T,"x",s);for(const b of[-f/2,f/2])l(.055,.16,.16,b,E-.055,T,n),u(.035,.09,b,E-.055,T,"x",r)}m(f/2+.16,E-.055,-d*.43,"x"),l(.16,.19,.21,f/2+.025,E-.055,-d*.43,n);for(const T of[-d*.4,d*.4])l(.18,.009,.035,0,E+.041,T,"#d5b54d")}else if(t.flatDeck){l(f-.12,.085,d-.11,0,E+.022,0,r);for(const T of[-f*.43,f*.43])M(T,E+.071,0,4,"x")}else{const T=Math.max(7,Math.round(f/.18));for(let b=0;b<T;b++){const C=-f/2+.1+b*(f-.2)/(T-1);u(.055,d-.11,C,E+.035,0,"z",r);for(const y of[-1,1])u(.022,.035,C,E+.035,y*d/2,"z",s)}}if(t.rightAngleEntry){const T=t.transferX??0;for(const b of[-.32,.32]){l(.065,.035,d-.14,T+b,E+.072,0,s);for(let C=0;C<Math.ceil(d/.075);C++)l(.075,.018,.04,T+b,E+.081,-d/2+.08+C*(d-.16)/(Math.ceil(d/.075)-1),r)}e.userData.cornerTransfer={axis:"z-to-x",surface:E+.09}}if(!t.crossBelt){l(f-.2,.035,.035,0,E-.09,d/2+.06,s);for(let T=0;T<Math.floor(f/.08);T++)l(.035,.025,.04,-f/2+.1+T*.08,E-.07,d/2+.06,n);m(f*.32,E-.22,d/2+.18,"z"),l(.26,.25,.08,f*.32,E-.1,d/2+.09,n)}for(const T of[-f*.43,f*.43])for(const b of[-d*.44,d*.44])l(.105,.04,.105,T,.1,b,s),u(.035,.12,T,.085,b,"y",r),M(T,E-.02,b+.055,2);for(const T of[-f*.4,f*.4])l(.07,.11,.055,T,E+.13,d*.49,"#d6b34c"),l(.025,.025,.025,T,E+.16,d*.51,s);t.chainDeck&&t.endHeight!=null&&e.traverse(T=>{if(!T.isMesh)return;T.updateMatrix(),T.geometry.applyMatrix4(T.matrix);const b=T.geometry.attributes.position;for(let C=0;C<b.count;C++){const y=b.getX(C),_=b.getY(C),A=(t.endHeight-E)*an.clamp((f/2-.5-y)/Math.max(.01,f-1),0,1);b.setY(C,_+A*an.clamp(_/(E-.13),0,1))}T.geometry.computeVertexNormals(),T.position.set(0,0,0),T.quaternion.identity(),T.scale.set(1,1,1)})}else if(i.type==="hardwareConveyorAssembly"){let y=function(A,v,g,S,L=!1){const P=L?A*d:A*f,U=L?v*f:v*(T?1:d),B=new bt;e.add(B),B.position.set(g*f,0,S*d),L&&(B.rotation.y=Math.PI/2),a=B,Gl({box:l,cylinder:u,rod:c},{length:P,width:U,height:E});for(const q of[-U/2,U/2])l(P,.09,.035,0,E-.075,q,n),l(P,.012,.023,0,E+.018,q-Math.sign(q)*.025,"#387b5c");const z=Math.max(5,Math.floor(P/.115));for(let q=0;q<z;q++)u(.026,U-.065,-P/2+.055+q*(P-.11)/(z-1),E-.026,0,"z",r);for(const q of[-P*.43,P*.43])for(const H of[-U*.44,U*.44])l(.04,E-.11,.045,q,(E-.11)/2,H,n),u(.028,.026,q,.018,H,"y",r);for(const q of[-P*.43,P*.43])l(.035,.05,U*.83,q,E*.35,0,n),c([q,.14,-U*.43],[q,E*.34,U*.43],.017,n);for(const q of[-P*.45,0,P*.45])for(const H of[-U*.49,U*.49])l(.025,.13,.025,q,E+.065,H,s),c([q,E+.12,H],[q+(q>0?-.16:.16),E+.12,H],.01,s);m(P*.14,E-.17,0,"z","#397ba2"),l(.17,.11,.12,-P*.13,E-.2,0,s);for(const q of[-1,1]){l(P-.08,.025,.025,0,E-.055,q*(U/2-.055),"#315f49");for(const H of[-P*.4,P*.4])l(.055,.04,.035,H,E+.1,q*U*.49,s),l(.015,.018,.006,H,E+.1,q*(U*.49+.021),"#cf9d45")}for(const q of[-P*.43,P*.43])for(const H of[-U*.44,U*.44])u(.011,.055,q,.047,H,"y",s);a=e};const f=t.length/4.8,d=t.width/4.4,E=t.height,T=Array.isArray(t.laneCenters)&&t.laneCenters.length===4,b=.66*(T?1:d),C=T?t.laneCenters.map(A=>A/d):[-1.73,-.47,.47,1.73],_=[-2.15*d,...C.slice(0,-1).map((A,v)=>(A+C[v+1])*d/2),2.15*d];for(const A of[-.43,.43])for(let v=0;v<_.length-1;v++){const g=_[v],S=_[v+1];y((S-g-.018)/d,.8,A,(g+S)/2/d,!0)}for(const A of C){y(1.55,.66,-1.625,A),y(1.55,.66,1.625,A);for(const v of[-1,1])v>0&&l(.035,.14,b,v*2.38*f,E+.045,A*d,n),l(.045,.08,b-.04,v*.84*f,E-.065,A*d,n);for(const v of[-.43,.43])for(const g of[-1,1])l(.73*f,.012,.025,v*f,E+.006,A*d+g*b*.32,"#34755b")}for(const A of[C[0],C[2]])l(.2,.26,.085,-.86*f,E-.32,A*d,n),l(.08,.05,.012,-.86*f,E-.26,A*d+.05,"#477e91");if(typeof document<"u")for(const[A,v]of[...C].sort((g,S)=>S-g).entries()){const g=document.createElement("canvas");g.width=256,g.height=112;const S=g.getContext("2d");S.fillStyle="#152b3e",S.fillRect(0,0,256,112),S.strokeStyle="#62d1bd",S.lineWidth=6,S.strokeRect(3,3,250,106),S.fillStyle="#ffffff",S.font="bold 66px sans-serif",S.textAlign="center",S.fillText(String(101+A),128,79);const L=new En(g),P=new Ha(new sr({map:L,depthTest:!1}));P.userData.ownedTexture=L,P.position.set(-2.54*f,E+.35,v*d),P.scale.set(.55,.24,1),e.add(P)}e.userData.hardwareTransverseRows=2,e.userData.hardwareConveyorSize=[t.length,t.width,t.height],e.userData.hardwareLaneCenters=C.map(A=>A*d)}else if(i.type==="hardwareLift"){const f=t.width,d=t.depth,E=t.height,T=t.platformHeight;R0({box:l,cylinder:u},{width:f,depth:d,height:E});for(const b of[-f*.48,f*.48])for(const C of[-d*.48,d*.48])l(.065,E,.065,b,E/2,C,n),l(.16,.035,.16,b,.018,C,r),l(.018,E-.1,.025,b*.9,E/2,C,s);for(const b of[-d*.48,d*.48])l(f,.08,.06,0,E,b,n);l(f,.045,d,0,.055,0,n);for(const b of[-f*.43,f*.43])l(.065,.12,d*.84,b,T-.09,0,n);for(let b=0;b<7;b++)u(.035,f*.8,0,T,-d*.36+b*d*.72/6,"x",r);for(const b of[-d*.44,d*.44])l(f*.86,.08,.035,0,T-.05,b,s);m(f*.55,E-.18,d*.38,"x"),x(-f*.55,E-.2,d*.48)}else throw Error("不属于公开五金设备类型")}function D0(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,h=new on;let l=0;for(let c=0;c<i.length;++c){const u=i[c];let p=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in u.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(u.attributes[m]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in u.morphAttributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;a[m]===void 0&&(a[m]=[]),a[m].push(u.morphAttributes[m])}if(e){let m;if(t)m=u.index.count;else if(u.attributes.position!==void 0)m=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;h.addGroup(l,m,c),l+=m}}if(t){let c=0;const u=[];for(let p=0;p<i.length;++p){const m=i[p].index;for(let x=0;x<m.count;++x)u.push(m.getX(x)+c);c+=i[p].attributes.position.count}h.setIndex(u)}for(const c in r){const u=Wl(r[c]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;h.setAttribute(c,u)}for(const c in a){const u=a[c][0].length;if(u===0)break;h.morphAttributes=h.morphAttributes||{},h.morphAttributes[c]=[];for(let p=0;p<u;++p){const m=[];for(let M=0;M<a[c].length;++M)m.push(a[c][M][p]);const x=Wl(m);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;h.morphAttributes[c].push(x)}}return h}function Wl(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const c=i[l];if(e===void 0&&(e=c.array.constructor),e!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=c.itemSize),t!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*t}const a=new e(r),o=new Vt(a,t,n);let h=0;for(let l=0;l<i.length;++l){const c=i[l];if(c.isInterleavedBufferAttribute){const u=h/t;for(let p=0,m=c.count;p<m;p++)for(let x=0;x<t;x++){const M=c.getComponent(p,x);o.setComponent(p+u,x,M)}}else a.set(c.array,h);h+=c.count*t}return s!==void 0&&(o.gpuType=s),o}const Xs={...kc,binRack:{smallBays:40,largeBays:24,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},rack:{bays:5,levels:4,bayWidth:1.8,levelHeight:1.55,depth:1.4,loaded:!0},shuttle:{bays:10,rows:2,levels:4,bayWidth:2.099,levelHeight:1.5,baseHeight:.525,depth:3.1,loaded:!0},barRack:{bays:6,lanes:6,levels:11,bayWidth:2.6,depth:1.55,height:6.5,loaded:!0},rgv:{railLength:23.3,travel:0},shuttleCar:{width:1.35},robot:{height:2.7},machine:{width:4.2,depth:2.5,height:1.8},stacker:{height:7,travel:0,lift:1.2,railLength:18},conveyor:{length:7,width:1.3,height:.8},turn:{width:1.3,height:.8},pallet:{cargo:!0},agv:{cargo:!0}},L0={...C0,binRack:[["smallBays","小料框排数",0,100,1],["largeBays","大料筐排数",0,100,1],["smallLevels","小料框层数",1,30,1],["largeLevels","大料筐层数",1,30,1],["smallPitch","小框排距 · m",.3,2,.01],["largePitch","大筐排距 · m",.4,3,.01],["smallStep","小框层高 · m",.2,1.5,.01],["largeStep","大筐层高 · m",.3,2,.01],["depth","货架深度 · m",.4,2,.01]],rack:[["bays","货架列数",1,12,1],["levels","货架层数",1,8,1],["bayWidth","单列宽度 · m",1,3,.1],["levelHeight","层高 · m",1,2.5,.1],["depth","货架深度 · m",1,3,.1]],shuttle:[["bays","货架列数",1,16,1],["rows","深位数量",1,4,1],["levels","货架层数",1,8,1],["bayWidth","列间距 · m",1,3,.01],["levelHeight","层间距 · m",1,2.5,.1],["baseHeight","底层高度 · m",.2,1,.025],["depth","整体深度 · m",1,6,.1]],barRack:[["bays","货架列数",1,12,1],["lanes","每列条数",1,8,1],["levels","货架层数",1,15,1],["bayWidth","列间距 · m",1,4,.1],["depth","货架深度 · m",1,3,.1],["height","总高度 · m",3,10,.1]],rgv:[["railLength","轨道长度 · m",4,32,.1],["travel","行走位置 · m",-14,14,.1]],shuttleCar:[["width","车体宽度 · m",.8,2,.1]],robot:[["height","示意高度 · m",1.5,4,.1]],machine:[["width","设备宽度 · m",1,8,.1],["depth","设备深度 · m",1,6,.1],["height","设备高度 · m",.8,4,.1]],stacker:[["railLength","轨道长度 · m",4,120,.1],["height","立柱高度 · m",3,20,.1],["travel","行走位置 · m",-8,8,.1],["lift","载货台高度 · m",.5,13,.1]],conveyor:[["length","输送长度 · m",.2,18,.01],["width","输送宽度 · m",.4,2.5,.1],["height","输送高度 · m",.5,1.5,.1]],turn:[["width","转角宽度 · m",.8,2,.1],["height","输送高度 · m",.5,1.5,.1]],pallet:[],agv:[]};function Ki(i){const e=new Set,t=new Set;i.userData.beltTexture&&e.add(i.userData.beltTexture),i.traverse(n=>{var s;if(n.userData.ownedTexture&&e.add(n.userData.ownedTexture),(s=n.geometry)==null||s.dispose(),n.material)for(const r of[n.material].flat()){t.add(r);for(const a of["map","bumpMap","roughnessMap","normalMap"])r[a]&&e.add(r[a])}}),e.forEach(n=>n.dispose()),t.forEach(n=>n.dispose())}function U0(i){var b,C;const e=new bt,t=i.params;let n=e,s=null;const r="#354148",a=i.color,o="#a4abad",h="#98734d",l="#bd9669";function c(y,_,A,v,g,S,L=a,P=!1){const U=new Ze(s===null&&!["binRack","rack","shuttle","barRack"].includes(i.type)&&Math.min(y,_,A)>=.15?new as(y,_,A,1,Math.min(.025,Math.min(y,_,A)*.1)):new Gt(y,_,A),zc(L,P?{roughness:i.roughness,metalness:i.metalness}:{}));return U.position.set(v,g,S),U.castShadow=!0,U.receiveShadow=!0,U.userData.id=i.id,U.userData.tint=P,U.userData.slot=s,n.add(U),U}function u(y,_,A,v,g,S="z"){const L=new Ze(new Ni(_,_,y,12),new St({color:o,metalness:.65,roughness:.3}));L.rotation[S==="z"?"x":"z"]=Math.PI/2,L.position.set(A,v,g),L.castShadow=!0,L.userData.id=i.id,L.userData.slot=s,n.add(L)}function p(y,_,A,v,g,S,L=a){const P=c(y,_,A,v,g,S,L,L===a);return P.geometry.dispose(),P.geometry=new as(y,_,A,2,Math.min(y,_,A)*.12),P}function m(y,_,A=o,v=.035){const g=new N(...y),S=new N(..._),L=S.clone().sub(g),P=g.clone().add(S).multiplyScalar(.5);c(v,L.length(),v,P.x,P.y,P.z,A).quaternion.setFromUnitVectors(new N(0,1,0),L.normalize())}function x(y,_,A){c(.07,.18,.07,y,_,A,r);for(let v=0;v<3;v++)c(.09,.055,.09,y,_+.12+v*.06,A,["#65d2a6","#efb84e","#d86363"][v])}function M(y,_,A){p(.35,.6,.3,y,_,A,"#d0d8df"),c(.21,.16,.014,y,_+.1,A+.16,"#132a3c"),c(.16,.09,.015,y,_+.11,A+.17,"#4fafa5");for(let v=0;v<3;v++)c(.035,.035,.016,y+(v-1)*.07,_-.05,A+.17,["#65d2a6","#efb84e","#d86363"][v]);x(y,_+.43,A)}function f(y,_,A,v,g){for(const S of[-y/2,y/2]){for(let L=0;L<Math.ceil(_/g);L++){const P=.18+L*g,U=Math.min(_-.1,P+g);U<=P||(m([S,P,-A/2],[S,U,A/2]),m([S,P,A/2],[S,U,-A/2]))}for(const L of[-A/2,A/2])c(.14,.5,.14,S,.3,L,"#e5aa3c"),c(.15,.055,.15,S,.2,L,r),c(.15,.055,.15,S,.4,L,r)}for(let S=0;S<=v;S++){const L=S*y/v-y/2;for(const P of[-A/2,A/2]){c(.24,.035,.24,L,.02,P,o);for(let U=.6;U<_;U+=.35)c(.027,.045,.004,L,U,P+Math.sign(P)*.047,"#132335")}}}function d(y,_,A,v=!0){for(let g=0;g<3;g++){c(1.15,.055,.16,y,_+.035,A+(g-1)*.4,h);for(const S of[-.43,0,.43])c(.16,.11,.16,y+S,_+.11,A+(g-1)*.4,h)}for(let g=0;g<5;g++)c(.17,.055,1.05,y+(g-2)*.24,_+.19,A,"#b18b5f");if(v){for(let g=0;g<2;g++)for(const S of[-1,1])for(const L of[-1,1]){const P=y+S*.258,U=A+L*.233,B=_+.39+g*.34;if(c(.502,.325,.45,P,B,U,g?l:"#b28d62"),c(.035,.012,.451,P,B+.168,U,"#d4b485"),L===1){c(.14,.09,.006,P+.09,B,U+.228,"#e4e1d3");for(let z=0;z<4;z++)c(.007,.05,.007,P+.04+z*.024,B,U+.233,"#344052")}}for(const g of[-.33,.33])c(.025,.7,.952,y+g,_+.57,A,"#445464"),c(.025,.012,.952,y+g,_+.923,A,"#445464")}}function E(y,_,A,v=0,g=0,S=!1){if(S){c(_,.18,y,v,A,g,r);for(let P=-y/2+.12;P<y/2;P+=.24)u(_-.12,.065,v,A+.12,g+P,"x");for(const P of[-1,1])c(.08,.25,y,v+P*_/2,A+.12,g,a,!0)}else{c(y,.18,_,v,A,g,r);for(let P=-y/2+.12;P<y/2;P+=.24)u(_-.12,.065,v+P,A+.12,g);for(const P of[-1,1])c(y,.25,.08,v,A+.12,g+P*_/2,a,!0)}for(const P of[-1,1])for(const U of[-1,1])c(.1,A,.1,v+P*(S?_:y)*.38,A/2,g+U*(S?y:_)*.38,r);for(const P of[-1,1])for(const U of[-1,1]){const B=v+P*(S?_:y)*.38,z=g+U*(S?y:_)*.38;c(.22,.035,.22,B,.02,z,o),c(.13,.12,.13,B,.1,z,r)}const L=c(.28,.25,.38,v+(S?_/2:y*.35),A-.2,g+(S?y*.35:_/2+.16),o);for(let P=0;P<4;P++)c(.29,.02,.4,L.position.x,A-.3+P*.045,L.position.z,r);for(const P of[-1,1]){const U=v+(S?_/2+.04:P*y*.35),B=g+(S?P*y*.35:_/2+.04);c(.07,.12,.08,U,A+.22,B,"#e4ae43"),c(.025,.04,.09,U,A+.24,B,"#132335")}}if(kc[i.type]||i.type==="conveyor"&&t.exhibitionDetail)P0(i,e);else if(i.type==="binRack"){let _=-(t.smallBays*t.smallPitch+t.largeBays*t.largePitch)/2,A=0;for(const[v,g,S,L,P]of[[t.smallBays,t.smallLevels,t.smallPitch,t.smallStep,!1],[t.largeBays,t.largeLevels,t.largePitch,t.largeStep,!0]]){if(!v)continue;const U=g*L+.2;for(let B=0;B<=v;B++)for(const z of[-1,1]){const q=_+B*S,H=z*t.depth/2;if(c(.045,U,.045,q,U/2,H,r),c(.012,U,.012,q-.028,U/2,H+z*.016,o),c(.012,U,.012,q+.028,U/2,H+z*.016,o),A0({box:c,cylinder:(X,ee,oe,Me,Ee,Ae,Pe)=>{const K=c(X*2,ee,X*2,oe,Me,Ee,Pe);return K.geometry.dispose(),K.geometry=new Ni(X,X,ee,6),Ae==="z"&&(K.rotation.x=Math.PI/2),Ae==="x"&&(K.rotation.z=Math.PI/2),K}},q,H,.13,.17),B===0||B===v){for(let X=.22;X<U-.1;X+=L)c(.02,.04,.004,q,X,H+z*.026,"#1c292e"),c(.065,.085,.012,q,X-.045,H+z*.035,o);c(.09,.42,.07,q,.23,H,"#c3a24b")}}for(let B=0;B<g;B++){const z=.15+B*L;for(const q of[-1,1])c(v*S,.045,.04,_+v*S/2,z,q*t.depth/2,a,!0);for(let q=0;q<v;q++){const H=_+(q+.5)*S;for(const X of[-1,1])c(.035,.025,t.depth,H+X*S*.36,z,0,o);if(t.loaded){s=A+q*g+B;const X=(b=i.binSizes)==null?void 0:b[s],ee=S*(X===2?.94:.82),oe=L*(X===2?.82:.72),Me=t.depth*.85,Ee=i.binSizes?X===1?"#9ba9aa":X===2?"#aab0ac":"#8b8b91":P?"#aab0ac":"#9ba9aa";c(ee,.025,Me,H,z+.04,0,Ee);for(const Ae of[-1,1]){c(ee,oe,.024,H,z+oe/2+.05,Ae*Me/2,Ee),c(.024,oe,Me,H+Ae*ee/2,z+oe/2+.05,0,Ee),c(ee,.035,.045,H,z+oe+.05,Ae*Me/2,o),c(.12,.055,.026,H,z+oe*.55,Ae*(Me/2+.016),"#d9e0d9"),c(.13,.035,.026,H,z+oe*.85,Ae*(Me/2+.016),r);for(const Pe of[-1,1])c(.024,oe*.82,.012,H+Pe*(ee/2-.022),z+oe*.51+.05,Ae*(Me/2+.02),o);for(const Pe of[-.32,0,.32])c(.018,oe*.65,.012,H+ee*Pe,z+oe*.43+.05,Ae*(Me/2+.019),Ee);c(ee*.82,.018,.028,H,z+.1,Ae*(Me/2+.012),o)}s=null}}}for(const B of[_,_+v*S])for(let z=0;z<g;z+=2)m([B,.15+z*L,-t.depth/2],[B,Math.min(U,(z+2)*L),t.depth/2]);A+=v*g,_+=v*S}}else if(i.type==="shuttle"){const y=t.bays*t.bayWidth,_=t.baseHeight+t.levels*t.levelHeight;f(y,_,t.depth,t.bays,t.levelHeight);for(let A=0;A<=t.bays;A++)for(let v=0;v<=t.rows;v++){const g=A*t.bayWidth-y/2,S=v*t.depth/t.rows-t.depth/2;c(.09,_,.09,g,_/2,S,r),c(.22,.05,.22,g,.025,S,r)}for(let A=0;A<t.levels;A++){const v=t.baseHeight+A*t.levelHeight;for(let g=0;g<=t.rows;g++)c(y,.12,.08,0,v,g*t.depth/t.rows-t.depth/2,a,!0);for(let g=0;g<t.bays;g++){const S=(g+.5)*t.bayWidth-y/2;for(let L=0;L<t.rows;L++){const P=(L+.5)*t.depth/t.rows-t.depth/2;for(const U of[-1,1])c(t.bayWidth-.15,.08,.07,S,v,P+U*.52,o);t.loaded&&(s=(A*t.bays+g)*t.rows+L,d(S,v+.06,P,!0),s=null)}}}}else if(i.type==="barRack"){const y=t.bays*t.bayWidth,_=(t.height-.4)/t.levels;f(y,t.height,t.depth,t.bays,_*2);for(let A=0;A<=t.bays;A++)for(const v of[-1,1])c(.08,t.height,.08,A*t.bayWidth-y/2,t.height/2,v*t.depth/2,r);for(let A=0;A<t.levels;A++){const v=.25+A*_;for(const g of[-1,1])c(y,.055,.06,0,v,g*t.depth/2,a,!0);for(let g=0;g<t.bays;g++)for(let S=0;S<t.lanes;S++){const L=(g+(S+.5)/t.lanes)*t.bayWidth-y/2;c(.03,.04,t.depth,L,v,0,o),t.loaded&&(s=(A*t.bays+g)*t.lanes+S,u(t.depth-.08,.065,L,v+.1,0),s=null)}}}else if(i.type==="rgv"){for(const _ of[-.7,.7])c(t.railLength,.05,.1,0,.03,_,o);const y=new bt;e.add(y),e.userData.carriage=y,n=y,p(4.4,.35,1.8,t.travel,.35,0),M(t.travel+1.9,.78,-.65);for(const _ of[-.94,.94]){c(4.2,.09,.08,t.travel,.33,_,"#162a3a");for(let A=-4;A<=4;A++)c(.19,.08,.09,t.travel+A*.43,.34,_,"#e5aa3c")}for(const _ of[-1,1]){E(1.8,1.6,.7,t.travel+_*1.1,0);for(const A of[-.9,.9])u(.13,.19,t.travel+_*1.55,.22,A)}c(.4,.4,.3,t.travel+2,.85,0,r)}else if(i.type==="shuttleCar"){p(t.width,.23,1.05,0,.23,0),c(t.width*.8,.04,.5,0,.37,0,r);for(const y of[-t.width*.4,t.width*.4])c(.12,.04,.2,y,.38,0,"#e5aa3c");for(const y of[-1,1]){c(t.width-.1,.08,.12,0,.43,y*.4,o);for(const _ of[-.4,.4])u(.12,.12,_,.14,y*.52)}}else if(i.type==="machine"){c(t.width,.25,t.depth,0,.15,0,r),p(t.width*.85,t.height*.7,t.depth*.6,0,t.height*.45,-t.depth*.15,"#9eafb9");for(const y of[-1,1])c(t.width*.28,t.height*.52,.025,y*t.width*.22,t.height*.47,t.depth*.155,"#172e3e"),c(.035,t.height*.44,.04,y*t.width*.08,t.height*.47,t.depth*.18,o);for(let y=0;y<6;y++)c(.24,.025,.028,t.width*.35,t.height*.24+y*.06,t.depth*.17,r);M(t.width*.43,t.height*.53,t.depth*.4),c(t.width*.65,.12,t.depth*.8,0,t.height*.4,0,o);for(const y of[-1,1])c(.15,t.height,.15,y*t.width*.4,t.height/2,-t.depth*.35,a,!0);c(t.width,.2,.4,0,t.height,-t.depth*.35,a,!0),c(.35,.5,.25,t.width*.4,t.height*.5,t.depth*.4,r),c(.25,.18,.02,t.width*.4,t.height*.58,t.depth*.4+.14,"#5ac6c0")}else if(i.type==="robot"){p(.8,.4,.8,0,.2,0,r),u(.4,.28,0,.6,0);for(const A of[-1,1])for(const v of[-1,1])c(.09,.035,.09,A*.3,.42,v*.3,o);u(.38,.18,0,t.height*.43,0),u(.32,.15,t.height*.28,t.height*.7,0),u(.29,.12,t.height*.59,t.height*.64,0),c(.075,t.height*.38,.08,-.17,t.height*.4,-.12,r),m([0,t.height*.62,-.18],[t.height*.5,t.height*.75,-.18],r,.065);const y=c(.27,t.height*.5,.3,0,t.height*.43,0,a,!0);y.rotation.z=-.3;const _=c(t.height*.6,.24,.26,t.height*.28,t.height*.7,0,a,!0);_.rotation.z=.2,c(.2,.55,.2,t.height*.59,t.height*.64,0,o),c(.5,.07,.4,t.height*.59,t.height*.36,0,r)}else if(i.type==="rack"){const y=t.bays*t.bayWidth;f(y,t.levels*t.levelHeight+.3,t.depth,t.bays,t.levelHeight);for(let _=0;_<=t.bays;_++)for(const A of[-1,1]){const v=_*t.bayWidth-y/2;c(.09,t.levels*t.levelHeight+.3,.09,v,(t.levels*t.levelHeight+.3)/2,A*t.depth/2,r),c(.22,.06,.22,v,.03,A*t.depth/2,r)}for(let _=0;_<t.levels;_++){const A=.24+_*t.levelHeight;for(const v of[-1,1])c(y,.13,.09,0,A,v*t.depth/2,a,!0);for(let v=0;v<t.bays;v++){const g=(v+.5)*t.bayWidth-y/2;c(t.bayWidth-.1,.05,t.depth-.1,g,A,0,o),t.loaded&&(s=_*t.bays+v,d(g,A+.04,0,!0),s=null)}}for(const _ of[-y/2,y/2])for(let A=0;A<t.levels;A++){const v=c(.05,Math.hypot(t.levelHeight,t.depth),.05,_,(A+.5)*t.levelHeight,0,o);v.rotation.x=(A%2?1:-1)*Math.atan(t.depth/t.levelHeight)}}else if(i.type==="stacker"){const y="#e99832",_="#1d2b38",A="#c3cdd1",v="#8d9ca5",g=t.travel,S=0;c(t.railLength,.09,.17,0,.07,S,v),c(t.railLength,.045,.32,0,.022,S,_);for(let X=-t.railLength/2+.3;X<t.railLength/2;X+=.9){c(.34,.035,.65,X,.02,S,_);for(const ee of[-.22,.22])c(.07,.045,.07,X,.045,S+ee,v)}const L=new bt;e.add(L),e.userData.carriage=L,n=L,p(2.65,.1,.8,g,.08,S,_),p(2.3,.04,.85,g,.16,S,A);for(const X of[-1.04,1.04])u(.26,.22,g+X,.24,S),c(.4,.12,.42,g+X,.48,S,y),c(.2,.11,.25,g+X*1.18,.32,S,_);const P=g+.67,U="#d5ae35",B=c(.28,t.height-.25,.32,P,(t.height+.25)/2,S,"#aeb4b6");B.userData.singleMast=!0;for(const X of[-1,1])c(.055,t.height-.3,.035,P+X*.11,(t.height+.3)/2,S+.178,_),c(.027,t.height-.35,.04,P+X*.075,(t.height+.35)/2,S+.197,v);c(.32,.2,.38,P,.25,S,_),p(.48,.1,.47,P,t.height+.05,S,_);for(const X of[-.16,.16])u(.12,.09,P,t.height+.12,S+X),c(.13,.055,.1,P-.24,t.height+.07,S+X,_);p(.36,.3,.34,g+1.02,.4,S,"#913f3c"),u(.3,.14,g+1.02,.4,S-.23);for(const X of[-.1,.1])c(.018,t.height-.3,.018,P+.19,(t.height+.3)/2,S+X,_);c(.045,t.height-.4,.065,P-.19,(t.height+.4)/2,S-.12,_);for(let X=.5;X<t.height;X+=.28)c(.055,.025,.08,P-.19,X,S-.12,v);p(.34,2.05,.44,g+1.06,1.45,S-.02,A),c(.025,1.85,.012,g+.94,1.45,S+.209,_),c(.17,.14,.016,g+1.06,1.65,S+.211,_),c(.13,.09,.018,g+1.06,1.66,S+.223,"#4c9b9b"),c(.022,.16,.022,g+.96,1.28,S+.215,_);for(let X=0;X<4;X++)c(.2,.014,.016,g+1.06,.63+X*.043,S+.209,_);x(g+1.06,2.6,S-.02);for(const X of[-1.15,1.15])c(.23,.1,.04,g+X,.58,S+.45,"#efb34e"),c(.08,.11,.045,g+X,.58,S+.475,_);const z=new bt;L.add(z),e.userData.lift=z,n=z,p(1.08,.12,1.05,g,t.lift+.06,S,_),c(1.02,.025,1,g,t.lift+.13,S,A),c(.12,.58,.42,P-.16,t.lift+.32,S,U);for(const X of[.1,.51])for(const ee of[-.17,.17])u(.08,.055,P-.19,t.lift+X,S+ee);const q=new bt;z.add(q),e.userData.loadGuard=q,n=q;for(const X of[-.52,.52]){for(const ee of[-.51,.51])c(.045,.76,.045,g+X,t.lift+.53,S+ee,U);for(const ee of[.4,.65,.91])c(.045,.045,1.065,g+X,t.lift+ee,S,U);for(const ee of[-.25,0,.25])c(.025,.72,.025,g+X,t.lift+.53,S+ee,U);c(.055,.08,1.065,g+X,t.lift+.18,S,_)}n=z;const H=new bt;z.add(H),e.userData.fork=H,n=H;for(const X of[-.18,.18])p(.24,.09,1.12,g+X,t.lift+.07,S,v),c(.17,.07,.94,g+X,t.lift+.11,S,A),c(.105,.055,.78,g+X,t.lift+.145,S,v),c(.11,.045,.15,g+X,t.lift+.155,S+.315,_);n=z;for(const X of[-.63,.63])c(.055,.16,.08,g+X,t.lift+.24,S+.52,"#e7b54c"),c(.035,.07,.09,g+X,t.lift+.26,S+.57,_);n=L}else if(i.type==="conveyor")E(t.length,t.width,t.height);else if(i.type==="turn")E(2.8,t.width,t.height,-.75,0),E(2.8,t.width,t.height,.65,1.1,!0);else if(i.type==="pallet")d(0,0,0,t.cargo);else if(i.type==="agv"){p(1.55,.35,1.2,0,.32,0),p(1.6,.12,1.24,0,.2,0,"#152b3c"),c(1.35,.04,.1,0,.48,.58,"#60d4b2"),c(.16,.12,.16,.6,.57,-.4,"#152b3c"),c(.18,.025,.18,.6,.65,-.4,"#69ceb9");for(const y of[-.8,.8])c(.03,.08,.82,y,.31,0,"#e5aa3c"),c(.04,.06,.2,y,.32,.4,"#dce9ed");c(1.35,.14,1,0,.57,0,r);for(const y of[-.5,.5])for(const _ of[-.59,.59])u(.12,.18,y,.22,_);c(.7,.05,.05,.6,.37,.62,"#67e6c0"),t.cargo&&d(0,.65,0,!0)}e.userData.stock=[];const T=[];e.traverse(y=>{y.isGroup&&T.push(y)});for(const y of T){const _=new Map,A=new Map;for(const v of[...y.children]){if(!v.isMesh)continue;v.updateMatrix();const g=v.material,S=[g.type,g.color.getHex(),g.roughness,g.metalness,((C=g.map)==null?void 0:C.uuid)||"",g.side,g.transparent,g.opacity,!!v.userData.tint].join(":");if(v.userData.slot!==null){const L=S+JSON.stringify(v.geometry.parameters);A.has(L)||A.set(L,{geometry:v.geometry.clone(),material:g.clone(),entries:[]}),A.get(L).entries.push({slot:v.userData.slot,matrix:v.matrix.clone()})}else _.has(S)||_.set(S,{geometry:[],material:g.clone(),tint:v.userData.tint}),_.get(S).geometry.push((v.geometry.index?v.geometry.toNonIndexed():v.geometry.clone()).applyMatrix4(v.matrix));y.remove(v),v.geometry.dispose(),g.dispose()}for(const v of _.values()){const g=D0(v.geometry,!1);for(const L of v.geometry)L.dispose();const S=new Ze(g,v.material);S.userData.id=i.id,S.userData.tint=v.tint,S.castShadow=!0,S.receiveShadow=!0,y.add(S)}for(const v of A.values()){const g=new Ec(v.geometry,v.material,v.entries.length);g.instanceMatrix.setUsage(Ch);for(let S=0;S<v.entries.length;S++){const P=.94+(Math.imul(v.entries[S].slot+1,2654435761)>>>0)%101/1e3;g.setColorAt(S,new ze(P,P,P))}g.userData.id=i.id,g.castShadow=!0,g.receiveShadow=!0,g.frustumCulled=!1,y.add(g),e.userData.stock.push({mesh:g,entries:v.entries})}}return e.traverse(y=>{var _;(_=y.material)!=null&&_.userData.industrialSurface&&w0(y.material)}),e.userData.baseTravel=t.travel||0,e.userData.baseLift=t.lift||0,e.userData.id=i.id,e.userData.signature=JSON.stringify(t),Hc(e,i.occupiedSlots),e}const I0=new Ye().makeScale(0,0,0);function Hc(i,e){for(const t of i.userData.stock||[]){for(let n=0;n<t.entries.length;n++){const s=t.entries[n];t.mesh.setMatrixAt(n,!e||e.has(s.slot)?s.matrix:I0)}t.mesh.instanceMatrix.needsUpdate=!0,t.mesh.boundingSphere=null,t.mesh.boundingBox=null}}function Zr(i,e,t,n=0){i.userData.beltTexture&&(i.userData.beltTexture.offset.x=-e),i.userData.tipper&&(i.userData.tipper.rotation.x=-an.degToRad(Math.max(0,Math.min(110,i.userData.baseTilt+n)))),i.userData.slide&&(i.userData.slide.position.x=Math.sin(e*.3)*1.6),i.userData.robotArm&&(i.userData.robotArm.rotation.y=Math.sin(e*.3)*.18),i.userData.fork&&(i.userData.fork.position.z=n),i.userData.carriage&&(i.userData.carriage.position.x=e-i.userData.baseTravel),i.userData.lift&&(i.userData.lift.position.y=t-i.userData.baseLift)}function N0(i=globalThis.crypto){if(typeof(i==null?void 0:i.randomUUID)=="function")return i.randomUUID();const e=new Uint8Array(16);if(typeof(i==null?void 0:i.getRandomValues)=="function")i.getRandomValues(e);else for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=Array.from(e,n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const F0={width:40,depth:28};function O0(i){if(![1,2].includes(i.version)||!Array.isArray(i.objects)||i.objects.length>150)throw Error("场景最多支持150个设备");const e={...F0,...i.floor};for(const r of["width","depth"])if(!Number.isFinite(e[r])||e[r]<10||e[r]>120)throw Error("厂房尺寸需要在10~120米之间");const t=new Set;let n=0;const s=i.objects.map(r=>{const a=JSON.parse(JSON.stringify(r));if(!Xs[a.type]||typeof a.id!="string"||t.has(a.id)||typeof a.name!="string"||!/^#[0-9a-f]{6}$/i.test(a.color)||typeof a.visible!="boolean")throw Error("设备字段无效");t.add(a.id);for(const h of["position","rotation","scale"])if(!Array.isArray(a[h])||a[h].length!==3||!a[h].every(l=>Number.isFinite(l)&&Math.abs(l)<=1e4)||h==="scale"&&a[h].some(l=>l<=0))throw Error("变换数值无效");for(const h of["roughness","metalness"])if(!Number.isFinite(a[h])||a[h]<0||a[h]>1)throw Error("材质数值无效");a.type==="binRack"&&(a.name=a.name.replace(/^(第\s*\d+\s*)排料框库$/,"$1列料框库")),a.params={...Xs[a.type],...a.params};for(const[h,l,c,u,p]of L0[a.type])if(!Number.isFinite(a.params[h])||a.params[h]<c||a.params[h]>u||p===1&&!Number.isInteger(a.params[h]))throw Error(`${l}超出范围`);for(const h of Object.keys(Xs[a.type]))if(typeof Xs[a.type][h]=="boolean"&&typeof a.params[h]!="boolean")throw Error("设备开关无效");if(a.type==="stacker"&&a.params.lift>a.params.height-.2)throw Error("载货台超出立柱高度");const o=a.params;return n+=a.type==="shuttle"?o.bays*o.rows*o.levels:a.type==="barRack"?o.bays*o.lanes*o.levels:a.type==="binRack"?o.smallBays*o.smallLevels+o.largeBays*o.largeLevels:["rack","exhibitRack"].includes(a.type)?o.bays*o.levels:0,a});if(n>12e3)throw Error("单个方案最多支持12000个库位");return{version:2,id:typeof i.id=="string"?i.id:N0(),name:typeof i.name=="string"?i.name:"导入场景",floor:e,objects:s,seed:Number.isInteger(i.seed)?i.seed:2026}}function B0(i){if(i==="exhibition")throw Error("此场景暂未公开");if(!["general","hardware"].includes(i))throw Error("未知的演示场景");return O0(structuredClone(b0))}function z0(i,{kind:e,quality:t="balanced",onState:n=()=>{},onPick:s=()=>{},onError:r=()=>{}}){const a=B0(e),o=Rg(a.objects.filter(F=>F.type==="binRack"),"A",a.floor.exitReserve||10);o&&Object.assign(a.floor,Ug(o,a.objects));const h=new yc;h.background=new ze("#717b78"),h.fog=new lo("#717b78",.006);const l=new xg({antialias:!0,powerPreference:"high-performance"});l.toneMapping=Ka,l.toneMappingExposure=1,l.shadowMap.type=Jl,i.appendChild(l.domElement);const c=new kt(42,1,.1,500),u=new s0(c,l.domElement);u.enableDamping=!0,u.dampingFactor=.08,u.minDistance=2,u.maxDistance=150,u.maxPolarAngle=Math.PI*.49;const p=new Ga(l),m=new Jg,x=p.fromScene(m,.04);h.environment=x.texture,h.environmentIntensity=.6,m.dispose(),p.dispose(),h.add(new Au("#e9eee9","#525450",.8));const M=new rl("#fff0e2",2.35);M.name="studio-sun",M.castShadow=!0,M.shadow.mapSize.set(2048,2048),h.add(M,M.target);const f=new rl("#d7e8ed",.75);f.position.set(-12,9,-10),h.add(f);const d=new Ze(new zn(2e3,2e3),new St({color:"#343d3e",roughness:.92}));d.rotation.x=-Math.PI/2,d.position.y=-.28,d.receiveShadow=!0,h.add(d);const E=new bt,T=a.floor,b=l.capabilities.getMaxAnisotropy(),C=new Ze(new Gt(T.width,.25,T.depth),new fo({color:"#b3bbb4",map:Qg(T.width,T.depth,b),bumpMap:n0(T.width,T.depth,b),bumpScale:.006,roughness:.84,roughnessMap:e0(T.width,T.depth,b),metalness:.02,clearcoat:.12,clearcoatRoughness:.58}));C.position.set(T.centerX||0,-.125,T.centerZ||0),C.receiveShadow=!0,E.add(C);const y=Math.max(7,...a.objects.map(F=>F.type==="binRack"?Math.max(F.params.smallLevels*F.params.smallStep,F.params.largeLevels*F.params.largeStep)+.2:F.params.height||3))+2,_=t0(T,y,{wallsVisible:!1});E.add(_),h.add(E),$g(h,T);const A=new Map,v=new Map,g=a.objects;let S=Nl(g,{pose:F=>{var Y;return(Y=A.get(F))==null?void 0:Y.userData.pose},notify:F=>n({message:F})}),L=(S==null?void 0:S.state)||Kr(g,2026),P="",U="entrance";for(const F of g.filter(Y=>Y.type==="binRack"))F.binSizes=L.slots.filter(Y=>Y.deviceId===F.id).map(Y=>Y.size);for(const F of g){const Y=U0(F);Y.userData.pose={travel:F.params.travel||0,lift:F.params.lift||0,extension:0},Y.position.fromArray(F.position),Y.rotation.set(...F.rotation.map(an.degToRad)),Y.scale.fromArray(F.scale),Y.visible=F.visible,A.set(F.id,Y),h.add(Y),F.type==="binRack"&&Y.add(Lg(F,g.filter(k=>k.type==="binRack").indexOf(F)))}o&&E.add(Pg(o));let B=!1,z=!1,q,H=0,X=0,ee=performance.now(),oe=0,Me=0,Ee=!0,Ae=null;const Pe=()=>{for(const F of g){const Y=new Set(L.slots.filter(k=>k.deviceId===F.id&&k.occupied&&!0).map(k=>k.index));Hc(A.get(F.id),Y)}Ee=!0};Pe();const K=new Jt;for(const F of A.values())K.expandByObject(F);const J=K.getCenter(new N),ue=K.getSize(new N),$=Math.max(ue.x,ue.z,ue.y*2,8);function le(F){P="",u.target.copy(F.target),c.position.copy(F.position),u.maxDistance=350,c.near=.1,c.far=500,c.updateProjectionMatrix(),u.update(),Ee=!0}function Fe(){U="overview",le(o?Ol(o,c.aspect):{target:J,position:J.clone().add(new N(1,.7,1).normalize().multiplyScalar($*1.8))})}function rt(){U="entrance",o&&le(Fl(o,c.aspect))}function I(F){const Y=A.get(F);if(!Y)return;const k=zl(Y),ce=Math.max(k.size.length()/2,.8),te=ce/(Math.sin(an.degToRad(c.fov/2))*Math.min(c.aspect,1))*1.2,ge=Y.userData.carriage?new N(-.2,.3,1).normalize():c.position.clone().sub(u.target).normalize();ge.lengthSq()<.01&&ge.set(1,.6,1).normalize(),le({target:k.center,position:k.center.clone().addScaledVector(ge,te)}),U=null}let Ve;const Ue=()=>{const F=i.clientWidth,Y=i.clientHeight;if(!(!F||!Y)){if(l.setSize(F,Y),c.aspect=F/Y,c.updateProjectionMatrix(),Ve==null||Ve.resize(F,Y),U&&o){const k=U==="overview"?Ol(o,c.aspect):Fl(o,c.aspect);le(k)}Ee=!0}};function Re(F){l.setPixelRatio(Math.min(devicePixelRatio,F==="low"?1:1.35)),l.shadowMap.enabled=F!=="low",Ve==null||Ve.setQuality(F!=="low"),Ue()}Re(t),Ve=Kg(l,h,c),Ve.setQuality(t!=="low"),o?rt():Fe();const ve=new ResizeObserver(Ue);ve.observe(i),u.addEventListener("start",()=>{U=null,P=""}),u.addEventListener("change",()=>{Ee=!0});const Ke=new Uu,xe=new me;let Ie;const ot=F=>{Ie={x:F.clientX,y:F.clientY}},et=F=>{if(!Ie||Math.hypot(F.clientX-Ie.x,F.clientY-Ie.y)>5)return;const Y=l.domElement.getBoundingClientRect();xe.set((F.clientX-Y.left)/Y.width*2-1,-(F.clientY-Y.top)/Y.height*2+1),Ke.setFromCamera(xe,c);const k=Ke.intersectObjects([...A.values()],!0)[0];let ce=k==null?void 0:k.object;for(;ce&&!g.some(te=>te.id===ce.userData.id);)ce=ce.parent;Ae=g.find(te=>te.id===(ce==null?void 0:ce.userData.id))||null,s(Ae?{name:Ae.name,type:Ae.type}:null)};l.domElement.addEventListener("pointerdown",ot),l.domElement.addEventListener("pointerup",et);const D=()=>{document.hidden&&(S==null||S.pause(),B=!1,n({playing:!1,message:"页面进入后台，动画已暂停。"}),ee=performance.now()),Ee=!0};document.addEventListener("visibilitychange",D);const w=F=>{F.preventDefault(),B=!1,r("显卡上下文已丢失，请刷新页面，或切换轻量画质后重试。")};l.domElement.addEventListener("webglcontextlost",w);function W(F){if(z)return;q=requestAnimationFrame(W);const Y=Math.min((F-ee)/1e3,.05);if(ee=F,!document.hidden){if(u.update(),P&&(Ig(c,u,zl(A.get(P)).center,Y),Ee=!0),B){if(H+=Y,S){S.advance(Y).then(k=>{k&&!z&&Pe()}).catch(k=>{S.pause(),B=!1,r(k.message)});for(const k of L.tasks){const ce=A.get(k.deviceId);ce&&In(k)&&(Zr(ce,k.pose.travel,k.pose.lift,k.pose.extension),ce.userData.pose={...k.pose});let te=v.get(k.code);k.cargoState!=="rack"&&!k.collected?(te||(te=yg(k.geometry,k.cargo.boxCode),h.add(te),v.set(k.code,te)),te.position.fromArray(k.type==="inbound"?wg(k):Fc(k))):te&&(h.remove(te),Ki(te),v.delete(k.code))}B=S.playing}else{Math.floor(H)>X&&(Kc(L,g,Math.floor(H)-X),X=Math.floor(H),Pe());for(const k of g){if(!L.devices[k.id])continue;const ce=Jc(k,H);Zr(A.get(k.id),ce.travel,ce.lift,ce.extension)}}Ee=!0}Ee&&(Ve.invalidate(),Ve.render(B),Ee=!1,Me++),F-oe>1e3&&(n({playing:B,elapsed:Math.floor(H),devices:g.length,slots:L.slots.length,occupied:L.slots.filter(k=>k.occupied).length,fps:Math.round(Me*1e3/(F-oe||1e3)),cycles:(S==null?void 0:S.status.cycles)||0,tasks:S?L.tasks.slice(0,8).map(k=>({code:k.code,stage:k.stage,progress:k.progress,type:k.type,boxCode:k.cargo.boxCode})):[],stage:S?S.status.message:"设备运动与模拟移库",progress:0}),Me=0,oe=F)}}return q=requestAnimationFrame(W),{toggle:async()=>{S?(S.playing?S.pause():S.start(),B=S.playing):B=!B,Ee=!0,n({playing:B})},overview:Fe,entrance:rt,devices:g.filter(F=>F.type==="stacker").map(F=>({id:F.id,name:F.name})),follow:F=>{F&&I(F),P=F},toggleFactory:()=>(_.visible=!_.visible,Ee=!0,_.visible),setQuality:Re,focus:()=>{Ae&&I(Ae.id)},reset:()=>{B=!1,S==null||S.dispose();for(const F of v.values())h.remove(F),Ki(F);v.clear(),H=0,X=0,S=Nl(g,{pose:F=>{var Y;return(Y=A.get(F))==null?void 0:Y.userData.pose},notify:F=>n({message:F})}),L=(S==null?void 0:S.state)||Kr(g,2026);for(const F of g){const Y=A.get(F.id);Y.userData.pose={travel:F.params.travel||0,lift:F.params.lift||0,extension:0},Zr(Y,Y.userData.pose.travel,Y.userData.pose.lift,0)}Pe(),o?rt():Fe(),n({playing:!1,elapsed:0,cycles:0,tasks:[],progress:0,message:"演示已重置。"})},dispose:()=>{var F;z=!0,S==null||S.dispose();for(const Y of v.values())Ki(Y);Ve.dispose(),cancelAnimationFrame(q),ve.disconnect(),document.removeEventListener("visibilitychange",D),l.domElement.removeEventListener("pointerdown",ot),l.domElement.removeEventListener("pointerup",et),l.domElement.removeEventListener("webglcontextlost",w),u.dispose();for(const Y of A.values())Ki(Y);d.geometry.dispose(),d.material.dispose(),Ki(E),x.dispose(),(F=M.shadow.map)==null||F.dispose(),l.dispose(),l.domElement.remove()}}}export{z0 as startDemo};
