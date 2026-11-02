import{c as Ir,r as Sn}from"./demo-CGls7Xew.js";const tu=["stacker","rgv","agv","shuttleCar","conveyor","turn","robot","machine","exhibitTransfer","exhibitRobot","exhibitAgv","exhibitHood"];function nu(i){const e=i.params;return i.type==="barRack"?e.bays*e.lanes*e.levels:i.type==="shuttle"?e.bays*e.rows*e.levels:i.type==="binRack"?e.smallBays*e.smallLevels+e.largeBays*e.largeLevels:["rack","exhibitRack"].includes(i.type)?e.bays*e.levels:0}function Wn(i){let e=2166136261;for(const t of i)e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0}const Rs=[["SKU-001","电机组件"],["SKU-002","铝型材"],["SKU-003","标准紧固件"],["SKU-004","传动轴"],["SKU-005","包装辅料"]];function bo(i,e=2026){const t=[],n={};let s=0;for(const r of i){const o=r.params;for(let a=0;a<nu(r);a++){const h=Wn(`${e}:${r.id}:${a}`),c=r.type==="exhibitRack"&&(a%o.bays+1===o.liftBay||a<o.bays&&a+1===o.exitBay)?!1:r.initialOccupiedSlots?r.initialOccupiedSlots.includes(a):h%100<68;t.push({id:`${r.id}:${a}`,deviceId:r.id,index:a,location:r.type==="binRack"?`${r.name} / ${a<o.smallBays*o.smallLevels?"小料框":"大料筐"} / ${String(a<o.smallBays*o.smallLevels?Math.floor(a/o.smallLevels)+1:o.smallBays+Math.floor((a-o.smallBays*o.smallLevels)/o.largeLevels)+1).padStart(2,"0")}排 / ${String(a<o.smallBays*o.smallLevels?a%o.smallLevels+1:(a-o.smallBays*o.smallLevels)%o.largeLevels+1).padStart(2,"0")}层`:`${r.name} / ${String(a+1).padStart(4,"0")}`,occupied:c,sku:c?Rs[h%Rs.length][0]:"",product:c?Rs[h%Rs.length][1]:"",quantity:c?1+h%24:0,batch:c?`B202610-${String(h%90+10)}`:""})}tu.includes(r.type)&&(s++,n[r.id]={id:r.id,code:`DEV-${String(s).padStart(3,"0")}`,status:r.type==="machine"?"maintenance":"idle",completed:0,temperature:25+Wn(r.id)%9,power:0,travel:0,lift:1,alarm:""})}return{seed:e,elapsed:0,completed:0,slots:t,devices:n,tasks:[],events:[{time:0,message:"模拟库存与设备数据已生成"}]}}function iu(i,e,t=1){var r;i.elapsed+=t;const n=new Map(e.map(o=>[o.id,o]));let s=!1;for(const[o,a]of Object.entries(i.devices)){const h=n.get(o);if(!h)continue;if(a.status==="fault"||a.status==="maintenance"){a.power=0;continue}a.status="running",a.temperature=+(29+Math.sin(i.elapsed/18+Wn(o)%10)*3).toFixed(1),a.power=+(1.2+Math.abs(Math.sin(i.elapsed/9+Wn(o)%7))*2.8).toFixed(2);const c=h.params.railLength||8;a.travel=+((c/2-2)*Math.sin(i.elapsed/8+Wn(o)%5)).toFixed(2),a.lift=+(.5+((h.params.height||5)-1)*(.5+.5*Math.sin(i.elapsed/10))).toFixed(2)}for(const o of i.tasks.filter(a=>a.status==="running")){const a=i.devices[o.deviceId];if(!(!a||["fault","maintenance"].includes(a.status))&&(o.progress=Math.min(100,o.progress+t*20),o.progress===100)){const h=i.slots.find(l=>l.id===o.source),c=i.slots.find(l=>l.id===o.target);if(h!=null&&h.occupied&&c&&!c.occupied){for(const l of["sku","product","quantity","batch",...i.source==="SQL"?["boxCode","boxId","size","items"]:[]])c[l]=h[l],h[l]=l==="quantity"?null:l==="items"?[]:l==="boxId"?null:l==="size"?0:"";if(i.source==="SQL")for(const l of i.inventory)l.boxId===c.boxId&&(l.locationId=c.locationId);h.occupied=!1,c.occupied=!0,s=!0,i.completed++,a.completed++,o.status="completed",i.events.unshift({time:i.elapsed,message:`${o.code} 移库完成`})}else o.status="cancelled"}}if(!i.tasks.some(o=>o.status==="running")&&i.elapsed%3===0){const o=Object.values(i.devices).filter(d=>!["fault","maintenance"].includes(d.status)),a=o[Math.floor(i.elapsed/3)%o.length],h=a?(r=n.get(a.id))==null?void 0:r.aisle:null,c=d=>{var x;return!h||((x=n.get(d.deviceId))==null?void 0:x.aisle)===h},l=i.slots.find(d=>d.occupied&&c(d)),u=[...i.slots].reverse().find(d=>!d.occupied&&c(d));a&&l&&u&&(i.tasks.unshift({code:`MOCK-${String(i.completed+1).padStart(4,"0")}`,source:l.id,target:u.id,deviceId:a.id,from:l.location,to:u.location,status:"running",progress:0}),i.events.unshift({time:i.elapsed,message:`模拟移库任务分配给 ${a.code}`}))}return i.tasks=i.tasks.slice(0,30),i.events=i.events.slice(0,40),s}function su(i,e){if(i.type==="exhibitTransfer")return{travel:e*.12,lift:0,extension:0};if(i.type==="exhibitHood"){const n=e%16;let s=n<3?0:n<7?(n-3)/4:n<10?1:n<14?1-(n-10)/4:0;return s=s*s*(3-2*s),{travel:0,lift:0,extension:90*s-(i.params.angle||0)}}if(i.type==="stacker"){const n=e%16,s=n>=5&&n<11,r=((i.params.railLength||8)/2-2)*Math.sin(Math.floor(e/16)*.7+Wn(i.id)%5),o=((i.params.railLength||8)/2-2)*Math.sin((Math.floor(e/16)-1)*.7+Wn(i.id)%5),a=Math.min(n/5,1),h=a*a*(3-2*a);return{travel:o+(r-o)*h,lift:.5+((i.params.height||5)-1)*(.5+.4*(Math.sin((Math.floor(e/16)-1)*.9)+(Math.sin(Math.floor(e/16)*.9)-Math.sin((Math.floor(e/16)-1)*.9))*h)),extension:s?Math.sin((n-5)/6*Math.PI)*.6*(Math.floor(e/16)%2?1:-1):0}}const t=Wn(i.id)%5;return{travel:((i.params.railLength||8)/2-2)*Math.sin(e/8+t),lift:.5+((i.params.height||5)-1)*(.5+.5*Math.sin(e/10))}}const ru=(i,e,t)=>i+(e-i)*t;function Ur(i){var e;return i.type==="inbound"?i.returnRoute:(e=i.station)==null?void 0:e.route}function Cs(i){return i.type==="inbound"?0:9}function Oc(i,e){return Math.hypot(i[0]-e[0],i[2]-e[2])}function cl(i,e){const t=i.slice(1).map((r,o)=>Oc(i[o],r));let s=t.reduce((r,o)=>r+o,0)*e;for(let r=0;r<t.length;r++){if(s<=t[r]&&t[r]>0)return{leg:r,position:i[r].map((o,a)=>ru(o,i[r+1][a],s/t[r]))};s-=t[r]}return{leg:t.length-1,position:i.at(-1)}}function ou(i,e){const t=(n,s)=>[Math.min(n[0][s],n[1][s]),Math.max(n[0][s],n[1][s])];return[0,2].every(n=>{const s=t(i,n),r=t(e,n);return s[0]<=r[1]+.05&&r[0]<=s[1]+.05})}function zc(i,e,t){const n=Ur(i);if(!n)return!0;const s=Cs(i),r=Math.min(1,t/i.durations[s]),o=i.type==="inbound"?r:r*r*(3-2*r),a=cl(n,o),h=Math.max(i.geometry.width,i.geometry.depth)+.2,c=a.leg===0&&Oc(a.position,n[1])>h,l=[];if(!c){a.leg>0&&l.push([a.position,n[a.leg+1]]);for(let u=a.leg+1;u<n.length-1;u++)l.push(n.slice(u,u+2))}for(const u of e.tasks){if(u===i||u.collected)continue;if(!(JSON.stringify(Ur(u))===JSON.stringify(n))&&u.status==="running"&&u.phase===Cs(u)&&(u.transportSections||[]).some(x=>l.some(b=>ou(x,b))))return!1;if(u.cargoState==="conveyor"){const x=Ur(u);if(!x)continue;const b=u.status==="completed"||u.returnRouteDone?1:u.phase===Cs(u)?Math.min(1,u.phaseElapsed/u.durations[Cs(u)]):0,w=u.type==="inbound"?b:b*b*(3-2*b),m=cl(x,w).position,f=(i.geometry.width+u.geometry.width)/2+.06,v=(i.geometry.depth+u.geometry.depth)/2+.06;if(Math.abs(m[0]-a.position[0])<f&&Math.abs(m[2]-a.position[2])<v)return!1}}return i.transportSections=l,!0}function Bc(i){i.transportSections=[],i.routeReserved=!1}function Xn(i){return i.status!=="running"?!1:i.type==="outbound"?i.phase<9:i.type==="inbound"?!i.waitingForStacker&&(!i.returnRoute||i.phase>0):!1}function Ma(i){return["queued","submitting"].includes(i.status)||Xn(i)}const Sa=10;function kc(i){return i.tasks.filter(e=>["outbound","inbound"].includes(e.type)&&!e.collected&&!["cancelled","failed"].includes(e.status)&&!(e.type==="inbound"&&e.cargoState==="rack")).length}function Hc(i,e,t,n){if(!i.serverTaskId)return!1;const s=e===t&&!i.dbPickupDone?"pickup":e===n&&!i.dbCompleteDone?"complete":null;return s?(i.needsDbAction=s,i.stage="等待数据库确认",!0):!1}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ba="180",Oi={ROTATE:0,DOLLY:1,PAN:2},Ui={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},au=0,hl=1,lu=2,Vc=1,Gc=2,Rn=3,Yn=0,Bt=1,Cn=2,At=0,zi=1,ul=2,fl=3,dl=4,Wc=5,cn=100,cu=101,hu=102,uu=103,fu=104,cs=200,du=201,pu=202,mu=203,Eo=204,wo=205,To=206,gu=207,Ao=208,vu=209,_u=210,xu=211,yu=212,Mu=213,Su=214,Ro=0,Co=1,Po=2,ki=3,Do=4,Lo=5,Io=6,Uo=7,Ea=0,bu=1,Eu=2,qn=0,Xc=1,qc=2,Yc=3,wa=4,Zc=5,jc=6,$c=7,Kc=300,Hi=301,Vi=302,No=303,Fo=304,Ar=306,Dn=1e3,ai=1001,Oo=1002,kt=1003,wu=1004,Ps=1005,gn=1006,Nr=1007,li=1008,un=1009,Jc=1010,Qc=1011,vs=1012,Ta=1013,ci=1014,vn=1015,Ln=1016,Aa=1017,Ra=1018,Gi=1020,eh=35902,th=35899,nh=1021,ih=1022,Kt=1023,_s=1026,Wi=1027,Ca=1028,Pa=1029,sh=1030,Da=1031,La=1033,ur=33776,fr=33777,dr=33778,pr=33779,zo=35840,Bo=35841,ko=35842,Ho=35843,Vo=36196,Go=37492,Wo=37496,Xo=37808,qo=37809,Yo=37810,Zo=37811,jo=37812,$o=37813,Ko=37814,Jo=37815,Qo=37816,ea=37817,ta=37818,na=37819,ia=37820,sa=37821,ra=36492,oa=36494,aa=36495,la=36283,ca=36284,ha=36285,ua=36286,Tu=3200,Au=3201,Rr=0,Ru=1,Vn="",wt="srgb",Xi="srgb-linear",yr="linear",it="srgb",di=7680,pl=519,Cu=512,Pu=513,Du=514,rh=515,Lu=516,Iu=517,Uu=518,Nu=519,fa=35044,Fu=35048,ml="300 es",_n=2e3,Mr=2001;class ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let gl=1234567;const ds=Math.PI/180,xs=180/Math.PI;function xn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function Ia(i,e){return(i%e+e)%e}function Ou(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function zu(i,e,t){return i!==e?(t-i)/(e-i):0}function ps(i,e,t){return(1-t)*i+t*e}function Bu(i,e,t,n){return ps(i,e,1-Math.exp(-t*n))}function ku(i,e=1){return e-Math.abs(Ia(i,e*2)-e)}function Hu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Vu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Gu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Wu(i,e){return i+Math.random()*(e-i)}function Xu(i){return i*(.5-Math.random())}function qu(i){i!==void 0&&(gl=i);let e=gl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Yu(i){return i*ds}function Zu(i){return i*xs}function ju(i){return(i&i-1)===0&&i!==0}function $u(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ku(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ju(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),h=o(t/2),c=r((e+n)/2),l=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),x=r((n-e)/2),b=o((n-e)/2);switch(s){case"XYX":i.set(a*l,h*u,h*d,a*c);break;case"YZY":i.set(h*d,a*l,h*u,a*c);break;case"ZXZ":i.set(h*u,h*d,a*l,a*c);break;case"XZX":i.set(a*l,h*b,h*x,a*c);break;case"YXY":i.set(h*x,a*l,h*b,a*c);break;case"ZYZ":i.set(h*b,h*x,a*l,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function hn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Tt={DEG2RAD:ds,RAD2DEG:xs,generateUUID:xn,clamp:Ze,euclideanModulo:Ia,mapLinear:Ou,inverseLerp:zu,lerp:ps,damp:Bu,pingpong:ku,smoothstep:Hu,smootherstep:Vu,randInt:Gu,randFloat:Wu,randFloatSpread:Xu,seededRandom:qu,degToRad:Yu,radToDeg:Zu,isPowerOfTwo:ju,ceilPowerOfTwo:$u,floorPowerOfTwo:Ku,setQuaternionFromProperEuler:Ju,normalize:st,denormalize:hn};class de{constructor(e=0,t=0){de.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let h=n[s+0],c=n[s+1],l=n[s+2],u=n[s+3];const d=r[o+0],x=r[o+1],b=r[o+2],w=r[o+3];if(a===0){e[t+0]=h,e[t+1]=c,e[t+2]=l,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=x,e[t+2]=b,e[t+3]=w;return}if(u!==w||h!==d||c!==x||l!==b){let m=1-a;const f=h*d+c*x+l*b+u*w,v=f>=0?1:-1,g=1-f*f;if(g>Number.EPSILON){const T=Math.sqrt(g),M=Math.atan2(T,f*v);m=Math.sin(m*M)/T,a=Math.sin(a*M)/T}const p=a*v;if(h=h*m+d*p,c=c*m+x*p,l=l*m+b*p,u=u*m+w*p,m===1-a){const T=1/Math.sqrt(h*h+c*c+l*l+u*u);h*=T,c*=T,l*=T,u*=T}}e[t]=h,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],h=n[s+1],c=n[s+2],l=n[s+3],u=r[o],d=r[o+1],x=r[o+2],b=r[o+3];return e[t]=a*b+l*u+h*x-c*d,e[t+1]=h*b+l*d+c*u-a*x,e[t+2]=c*b+l*x+a*d-h*u,e[t+3]=l*b-a*u-h*d-c*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,h=Math.sin,c=a(n/2),l=a(s/2),u=a(r/2),d=h(n/2),x=h(s/2),b=h(r/2);switch(o){case"XYZ":this._x=d*l*u+c*x*b,this._y=c*x*u-d*l*b,this._z=c*l*b+d*x*u,this._w=c*l*u-d*x*b;break;case"YXZ":this._x=d*l*u+c*x*b,this._y=c*x*u-d*l*b,this._z=c*l*b-d*x*u,this._w=c*l*u+d*x*b;break;case"ZXY":this._x=d*l*u-c*x*b,this._y=c*x*u+d*l*b,this._z=c*l*b+d*x*u,this._w=c*l*u-d*x*b;break;case"ZYX":this._x=d*l*u-c*x*b,this._y=c*x*u+d*l*b,this._z=c*l*b-d*x*u,this._w=c*l*u+d*x*b;break;case"YZX":this._x=d*l*u+c*x*b,this._y=c*x*u+d*l*b,this._z=c*l*b-d*x*u,this._w=c*l*u-d*x*b;break;case"XZY":this._x=d*l*u-c*x*b,this._y=c*x*u-d*l*b,this._z=c*l*b+d*x*u,this._w=c*l*u+d*x*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],h=t[9],c=t[2],l=t[6],u=t[10],d=n+a+u;if(d>0){const x=.5/Math.sqrt(d+1);this._w=.25/x,this._x=(l-h)*x,this._y=(r-c)*x,this._z=(o-s)*x}else if(n>a&&n>u){const x=2*Math.sqrt(1+n-a-u);this._w=(l-h)/x,this._x=.25*x,this._y=(s+o)/x,this._z=(r+c)/x}else if(a>u){const x=2*Math.sqrt(1+a-n-u);this._w=(r-c)/x,this._x=(s+o)/x,this._y=.25*x,this._z=(h+l)/x}else{const x=2*Math.sqrt(1+u-n-a);this._w=(o-s)/x,this._x=(r+c)/x,this._y=(h+l)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,h=t._y,c=t._z,l=t._w;return this._x=n*l+o*a+s*c-r*h,this._y=s*l+o*h+r*a-n*c,this._z=r*l+o*c+n*h-s*a,this._w=o*l-n*a-s*h-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const h=1-a*a;if(h<=Number.EPSILON){const x=1-t;return this._w=x*o+t*this._w,this._x=x*n+t*this._x,this._y=x*s+t*this._y,this._z=x*r+t*this._z,this.normalize(),this}const c=Math.sqrt(h),l=Math.atan2(c,a),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,h=e.w,c=2*(o*s-a*n),l=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+h*c+o*u-a*l,this.y=n+h*l+a*c-r*u,this.z=s+h*u+r*l-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,h=t.z;return this.x=s*h-r*a,this.y=r*o-n*h,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fr.copy(this).projectOnVector(e),this.sub(Fr)}reflect(e){return this.sub(Fr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fr=new U,vl=new zt;class Ye{constructor(e,t,n,s,r,o,a,h,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,h,c)}set(e,t,n,s,r,o,a,h,c){const l=this.elements;return l[0]=e,l[1]=s,l[2]=a,l[3]=t,l[4]=r,l[5]=h,l[6]=n,l[7]=o,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],h=n[6],c=n[1],l=n[4],u=n[7],d=n[2],x=n[5],b=n[8],w=s[0],m=s[3],f=s[6],v=s[1],g=s[4],p=s[7],T=s[2],M=s[5],S=s[8];return r[0]=o*w+a*v+h*T,r[3]=o*m+a*g+h*M,r[6]=o*f+a*p+h*S,r[1]=c*w+l*v+u*T,r[4]=c*m+l*g+u*M,r[7]=c*f+l*p+u*S,r[2]=d*w+x*v+b*T,r[5]=d*m+x*g+b*M,r[8]=d*f+x*p+b*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],h=e[6],c=e[7],l=e[8];return t*o*l-t*a*c-n*r*l+n*a*h+s*r*c-s*o*h}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],h=e[6],c=e[7],l=e[8],u=l*o-a*c,d=a*h-l*r,x=c*r-o*h,b=t*u+n*d+s*x;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/b;return e[0]=u*w,e[1]=(s*c-l*n)*w,e[2]=(a*n-s*o)*w,e[3]=d*w,e[4]=(l*t-s*h)*w,e[5]=(s*r-a*t)*w,e[6]=x*w,e[7]=(n*h-c*t)*w,e[8]=(o*t-n*r)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const h=Math.cos(r),c=Math.sin(r);return this.set(n*h,n*c,-n*(h*o+c*a)+o+e,-s*c,s*h,-s*(-c*o+h*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Or.makeScale(e,t)),this}rotate(e){return this.premultiply(Or.makeRotation(-e)),this}translate(e,t){return this.premultiply(Or.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Or=new Ye;function oh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qu(){const i=Sr("canvas");return i.style.display="block",i}const _l={};function ys(i){i in _l||(_l[i]=!0,console.warn(i))}function ef(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const xl=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yl=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tf(){const i={enabled:!0,workingColorSpace:Xi,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Vn?yr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ys("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ys("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xi]:{primaries:e,whitePoint:n,transfer:yr,toXYZ:xl,fromXYZ:yl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:xl,fromXYZ:yl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),i}const Je=tf();function Pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let pi;class nf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{pi===void 0&&(pi=Sr("canvas")),pi.width=e.width,pi.height=e.height;const s=pi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=pi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Sr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Pn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Pn(t[n]/255)*255):t[n]=Pn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sf=0;class Ua{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=xn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(zr(s[o].image)):r.push(zr(s[o]))}else r=zr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rf=0;const Br=new U;class Dt extends ui{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=ai,s=ai,r=gn,o=li,a=Kt,h=un,c=Dt.DEFAULT_ANISOTROPY,l=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=xn(),this.name="",this.source=new Ua(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=h,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Br).x}get height(){return this.source.getSize(Br).y}get depth(){return this.source.getSize(Br).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dn:e.x=e.x-Math.floor(e.x);break;case ai:e.x=e.x<0?0:1;break;case Oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dn:e.y=e.y-Math.floor(e.y);break;case ai:e.y=e.y<0?0:1;break;case Oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Kc;Dt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const h=e.elements,c=h[0],l=h[4],u=h[8],d=h[1],x=h[5],b=h[9],w=h[2],m=h[6],f=h[10];if(Math.abs(l-d)<.01&&Math.abs(u-w)<.01&&Math.abs(b-m)<.01){if(Math.abs(l+d)<.1&&Math.abs(u+w)<.1&&Math.abs(b+m)<.1&&Math.abs(c+x+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(c+1)/2,p=(x+1)/2,T=(f+1)/2,M=(l+d)/4,S=(u+w)/4,E=(b+m)/4;return g>p&&g>T?g<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(g),s=M/n,r=S/n):p>T?p<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(p),n=M/s,r=E/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=S/r,s=E/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-b)*(m-b)+(u-w)*(u-w)+(d-l)*(d-l));return Math.abs(v)<.001&&(v=1),this.x=(m-b)/v,this.y=(u-w)/v,this.z=(d-l)/v,this.w=Math.acos((c+x+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class of extends ui{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Dt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ua(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends of{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ah extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class af extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qt{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,on):on.fromBufferAttribute(r,o),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),Ls.subVectors(this.max,Ji),mi.subVectors(e.a,Ji),gi.subVectors(e.b,Ji),vi.subVectors(e.c,Ji),Un.subVectors(gi,mi),Nn.subVectors(vi,gi),Jn.subVectors(mi,vi);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-Jn.z,Jn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,Jn.z,0,-Jn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-Jn.y,Jn.x,0];return!kr(t,mi,gi,vi,Ls)||(t=[1,0,0,0,1,0,0,0,1],!kr(t,mi,gi,vi,Ls))?!1:(Is.crossVectors(Un,Nn),t=[Is.x,Is.y,Is.z],kr(t,mi,gi,vi,Ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bn=[new U,new U,new U,new U,new U,new U,new U,new U],on=new U,Ds=new Qt,mi=new U,gi=new U,vi=new U,Un=new U,Nn=new U,Jn=new U,Ji=new U,Ls=new U,Is=new U,Qn=new U;function kr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Qn.fromArray(i,r);const a=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),h=e.dot(Qn),c=t.dot(Qn),l=n.dot(Qn);if(Math.max(-Math.max(h,c,l),Math.min(h,c,l))>a)return!1}return!0}const lf=new Qt,Qi=new U,Hr=new U;class ws{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(Hr)),this.expandByPoint(Qi.copy(e.center).sub(Hr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const En=new U,Vr=new U,Us=new U,Fn=new U,Gr=new U,Ns=new U,Wr=new U;class Na{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Vr.copy(e).add(t).multiplyScalar(.5),Us.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(Vr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Us),a=Fn.dot(this.direction),h=-Fn.dot(Us),c=Fn.lengthSq(),l=Math.abs(1-o*o);let u,d,x,b;if(l>0)if(u=o*h-a,d=o*a-h,b=r*l,u>=0)if(d>=-b)if(d<=b){const w=1/l;u*=w,d*=w,x=u*(u+o*d+2*a)+d*(o*u+d+2*h)+c}else d=r,u=Math.max(0,-(o*d+a)),x=-u*u+d*(d+2*h)+c;else d=-r,u=Math.max(0,-(o*d+a)),x=-u*u+d*(d+2*h)+c;else d<=-b?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-h),r),x=-u*u+d*(d+2*h)+c):d<=b?(u=0,d=Math.min(Math.max(-r,-h),r),x=d*(d+2*h)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-h),r),x=-u*u+d*(d+2*h)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),x=-u*u+d*(d+2*h)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Vr).addScaledVector(Us,d),x}intersectSphere(e,t){En.subVectors(e.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,h=n+o;return h<0?null:a<0?this.at(h,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,h;const c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),l>=0?(r=(e.min.y-d.y)*l,o=(e.max.y-d.y)*l):(r=(e.max.y-d.y)*l,o=(e.min.y-d.y)*l),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,h=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,h=(e.min.z-d.z)*u),n>h||a>s)||((a>n||n!==n)&&(n=a),(h<s||s!==s)&&(s=h),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,s,r){Gr.subVectors(t,e),Ns.subVectors(n,e),Wr.crossVectors(Gr,Ns);let o=this.direction.dot(Wr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fn.subVectors(this.origin,e);const h=a*this.direction.dot(Ns.crossVectors(Fn,Ns));if(h<0)return null;const c=a*this.direction.dot(Gr.cross(Fn));if(c<0||h+c>o)return null;const l=-a*Fn.dot(Wr);return l<0?null:this.at(l/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $e{constructor(e,t,n,s,r,o,a,h,c,l,u,d,x,b,w,m){$e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,h,c,l,u,d,x,b,w,m)}set(e,t,n,s,r,o,a,h,c,l,u,d,x,b,w,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=h,f[2]=c,f[6]=l,f[10]=u,f[14]=d,f[3]=x,f[7]=b,f[11]=w,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $e().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/_i.setFromMatrixColumn(e,0).length(),r=1/_i.setFromMatrixColumn(e,1).length(),o=1/_i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),h=Math.cos(s),c=Math.sin(s),l=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*l,x=o*u,b=a*l,w=a*u;t[0]=h*l,t[4]=-h*u,t[8]=c,t[1]=x+b*c,t[5]=d-w*c,t[9]=-a*h,t[2]=w-d*c,t[6]=b+x*c,t[10]=o*h}else if(e.order==="YXZ"){const d=h*l,x=h*u,b=c*l,w=c*u;t[0]=d+w*a,t[4]=b*a-x,t[8]=o*c,t[1]=o*u,t[5]=o*l,t[9]=-a,t[2]=x*a-b,t[6]=w+d*a,t[10]=o*h}else if(e.order==="ZXY"){const d=h*l,x=h*u,b=c*l,w=c*u;t[0]=d-w*a,t[4]=-o*u,t[8]=b+x*a,t[1]=x+b*a,t[5]=o*l,t[9]=w-d*a,t[2]=-o*c,t[6]=a,t[10]=o*h}else if(e.order==="ZYX"){const d=o*l,x=o*u,b=a*l,w=a*u;t[0]=h*l,t[4]=b*c-x,t[8]=d*c+w,t[1]=h*u,t[5]=w*c+d,t[9]=x*c-b,t[2]=-c,t[6]=a*h,t[10]=o*h}else if(e.order==="YZX"){const d=o*h,x=o*c,b=a*h,w=a*c;t[0]=h*l,t[4]=w-d*u,t[8]=b*u+x,t[1]=u,t[5]=o*l,t[9]=-a*l,t[2]=-c*l,t[6]=x*u+b,t[10]=d-w*u}else if(e.order==="XZY"){const d=o*h,x=o*c,b=a*h,w=a*c;t[0]=h*l,t[4]=-u,t[8]=c*l,t[1]=d*u+w,t[5]=o*l,t[9]=x*u-b,t[2]=b*u-x,t[6]=a*l,t[10]=w*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cf,e,hf)}lookAt(e,t,n){const s=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),On.crossVectors(n,Yt),On.lengthSq()===0&&(Math.abs(n.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),On.crossVectors(n,Yt)),On.normalize(),Fs.crossVectors(Yt,On),s[0]=On.x,s[4]=Fs.x,s[8]=Yt.x,s[1]=On.y,s[5]=Fs.y,s[9]=Yt.y,s[2]=On.z,s[6]=Fs.z,s[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],h=n[8],c=n[12],l=n[1],u=n[5],d=n[9],x=n[13],b=n[2],w=n[6],m=n[10],f=n[14],v=n[3],g=n[7],p=n[11],T=n[15],M=s[0],S=s[4],E=s[8],_=s[12],y=s[1],A=s[5],P=s[9],C=s[13],D=s[2],I=s[6],F=s[10],B=s[14],k=s[3],H=s[7],J=s[11],ne=s[15];return r[0]=o*M+a*y+h*D+c*k,r[4]=o*S+a*A+h*I+c*H,r[8]=o*E+a*P+h*F+c*J,r[12]=o*_+a*C+h*B+c*ne,r[1]=l*M+u*y+d*D+x*k,r[5]=l*S+u*A+d*I+x*H,r[9]=l*E+u*P+d*F+x*J,r[13]=l*_+u*C+d*B+x*ne,r[2]=b*M+w*y+m*D+f*k,r[6]=b*S+w*A+m*I+f*H,r[10]=b*E+w*P+m*F+f*J,r[14]=b*_+w*C+m*B+f*ne,r[3]=v*M+g*y+p*D+T*k,r[7]=v*S+g*A+p*I+T*H,r[11]=v*E+g*P+p*F+T*J,r[15]=v*_+g*C+p*B+T*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],h=e[9],c=e[13],l=e[2],u=e[6],d=e[10],x=e[14],b=e[3],w=e[7],m=e[11],f=e[15];return b*(+r*h*u-s*c*u-r*a*d+n*c*d+s*a*x-n*h*x)+w*(+t*h*x-t*c*d+r*o*d-s*o*x+s*c*l-r*h*l)+m*(+t*c*u-t*a*x-r*o*u+n*o*x+r*a*l-n*c*l)+f*(-s*a*l-t*h*u+t*a*d+s*o*u-n*o*d+n*h*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],h=e[6],c=e[7],l=e[8],u=e[9],d=e[10],x=e[11],b=e[12],w=e[13],m=e[14],f=e[15],v=u*m*c-w*d*c+w*h*x-a*m*x-u*h*f+a*d*f,g=b*d*c-l*m*c-b*h*x+o*m*x+l*h*f-o*d*f,p=l*w*c-b*u*c+b*a*x-o*w*x-l*a*f+o*u*f,T=b*u*h-l*w*h-b*a*d+o*w*d+l*a*m-o*u*m,M=t*v+n*g+s*p+r*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/M;return e[0]=v*S,e[1]=(w*d*r-u*m*r-w*s*x+n*m*x+u*s*f-n*d*f)*S,e[2]=(a*m*r-w*h*r+w*s*c-n*m*c-a*s*f+n*h*f)*S,e[3]=(u*h*r-a*d*r-u*s*c+n*d*c+a*s*x-n*h*x)*S,e[4]=g*S,e[5]=(l*m*r-b*d*r+b*s*x-t*m*x-l*s*f+t*d*f)*S,e[6]=(b*h*r-o*m*r-b*s*c+t*m*c+o*s*f-t*h*f)*S,e[7]=(o*d*r-l*h*r+l*s*c-t*d*c-o*s*x+t*h*x)*S,e[8]=p*S,e[9]=(b*u*r-l*w*r-b*n*x+t*w*x+l*n*f-t*u*f)*S,e[10]=(o*w*r-b*a*r+b*n*c-t*w*c-o*n*f+t*a*f)*S,e[11]=(l*a*r-o*u*r-l*n*c+t*u*c+o*n*x-t*a*x)*S,e[12]=T*S,e[13]=(l*w*s-b*u*s+b*n*d-t*w*d-l*n*m+t*u*m)*S,e[14]=(b*a*s-o*w*s-b*n*h+t*w*h+o*n*m-t*a*m)*S,e[15]=(o*u*s-l*a*s+l*n*h-t*u*h-o*n*d+t*a*d)*S,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,h=e.z,c=r*o,l=r*a;return this.set(c*o+n,c*a-s*h,c*h+s*a,0,c*a+s*h,l*a+n,l*h-s*o,0,c*h-s*a,l*h+s*o,r*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,h=t._w,c=r+r,l=o+o,u=a+a,d=r*c,x=r*l,b=r*u,w=o*l,m=o*u,f=a*u,v=h*c,g=h*l,p=h*u,T=n.x,M=n.y,S=n.z;return s[0]=(1-(w+f))*T,s[1]=(x+p)*T,s[2]=(b-g)*T,s[3]=0,s[4]=(x-p)*M,s[5]=(1-(d+f))*M,s[6]=(m+v)*M,s[7]=0,s[8]=(b+g)*S,s[9]=(m-v)*S,s[10]=(1-(d+w))*S,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=_i.set(s[0],s[1],s[2]).length();const o=_i.set(s[4],s[5],s[6]).length(),a=_i.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],an.copy(this);const c=1/r,l=1/o,u=1/a;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=l,an.elements[5]*=l,an.elements[6]*=l,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,t.setFromRotationMatrix(an),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=_n,h=!1){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),x=(n+s)/(n-s);let b,w;if(h)b=r/(o-r),w=o*r/(o-r);else if(a===_n)b=-(o+r)/(o-r),w=-2*o*r/(o-r);else if(a===Mr)b=-o/(o-r),w=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=x,c[13]=0,c[2]=0,c[6]=0,c[10]=b,c[14]=w,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=_n,h=!1){const c=this.elements,l=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),x=-(n+s)/(n-s);let b,w;if(h)b=1/(o-r),w=o/(o-r);else if(a===_n)b=-2/(o-r),w=-(o+r)/(o-r);else if(a===Mr)b=-1/(o-r),w=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=x,c[2]=0,c[6]=0,c[10]=b,c[14]=w,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const _i=new U,an=new $e,cf=new U(0,0,0),hf=new U(1,1,1),On=new U,Fs=new U,Yt=new U,Ml=new $e,Sl=new zt;class Wt{constructor(e=0,t=0,n=0,s=Wt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],h=s[1],c=s[5],l=s[9],u=s[2],d=s[6],x=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,x),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,x),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,x),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,x),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,x));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sl.setFromEuler(this),this.setFromQuaternion(Sl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wt.DEFAULT_ORDER="XYZ";class Fa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uf=0;const bl=new U,xi=new zt,wn=new $e,Os=new U,es=new U,ff=new U,df=new zt,El=new U(1,0,0),wl=new U(0,1,0),Tl=new U(0,0,1),Al={type:"added"},pf={type:"removed"},yi={type:"childadded",child:null},Xr={type:"childremoved",child:null};class Mt extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new U,t=new Wt,n=new zt,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new $e},normalMatrix:{value:new Ye}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis(El,e)}rotateY(e){return this.rotateOnAxis(wl,e)}rotateZ(e){return this.rotateOnAxis(Tl,e)}translateOnAxis(e,t){return bl.copy(e).applyQuaternion(this.quaternion),this.position.add(bl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(El,e)}translateY(e){return this.translateOnAxis(wl,e)}translateZ(e){return this.translateOnAxis(Tl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Os.copy(e):Os.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(es,Os,this.up):wn.lookAt(Os,es,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),xi.setFromRotationMatrix(wn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Al),yi.child=e,this.dispatchEvent(yi),yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pf),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Al),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,ff),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,h){return a[h.uuid]===void 0&&(a[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const h=a.shapes;if(Array.isArray(h))for(let c=0,l=h.length;c<l;c++){const u=h[c];r(e.shapes,u)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let h=0,c=this.material.length;h<c;h++)a.push(r(e.materials,this.material[h]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const h=this.animations[a];s.animations.push(r(e.animations,h))}}if(t){const a=o(e.geometries),h=o(e.materials),c=o(e.textures),l=o(e.images),u=o(e.shapes),d=o(e.skeletons),x=o(e.animations),b=o(e.nodes);a.length>0&&(n.geometries=a),h.length>0&&(n.materials=h),c.length>0&&(n.textures=c),l.length>0&&(n.images=l),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),x.length>0&&(n.animations=x),b.length>0&&(n.nodes=b)}return n.object=s,n;function o(a){const h=[];for(const c in a){const l=a[c];delete l.metadata,h.push(l)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Mt.DEFAULT_UP=new U(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new U,Tn=new U,qr=new U,An=new U,Mi=new U,Si=new U,Rl=new U,Yr=new U,Zr=new U,jr=new U,$r=new at,Kr=new at,Jr=new at;class rn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ln.subVectors(e,t),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ln.subVectors(s,t),Tn.subVectors(n,t),qr.subVectors(e,t);const o=ln.dot(ln),a=ln.dot(Tn),h=ln.dot(qr),c=Tn.dot(Tn),l=Tn.dot(qr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,x=(c*h-a*l)*d,b=(o*l-a*h)*d;return r.set(1-x-b,b,x)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,n,s,r,o,a,h){return this.getBarycoord(e,t,n,s,An)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,An.x),h.addScaledVector(o,An.y),h.addScaledVector(a,An.z),h)}static getInterpolatedAttribute(e,t,n,s,r,o){return $r.setScalar(0),Kr.setScalar(0),Jr.setScalar(0),$r.fromBufferAttribute(e,t),Kr.fromBufferAttribute(e,n),Jr.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector($r,r.x),o.addScaledVector(Kr,r.y),o.addScaledVector(Jr,r.z),o}static isFrontFacing(e,t,n,s){return ln.subVectors(n,t),Tn.subVectors(e,t),ln.cross(Tn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),ln.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return rn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Mi.subVectors(s,n),Si.subVectors(r,n),Yr.subVectors(e,n);const h=Mi.dot(Yr),c=Si.dot(Yr);if(h<=0&&c<=0)return t.copy(n);Zr.subVectors(e,s);const l=Mi.dot(Zr),u=Si.dot(Zr);if(l>=0&&u<=l)return t.copy(s);const d=h*u-l*c;if(d<=0&&h>=0&&l<=0)return o=h/(h-l),t.copy(n).addScaledVector(Mi,o);jr.subVectors(e,r);const x=Mi.dot(jr),b=Si.dot(jr);if(b>=0&&x<=b)return t.copy(r);const w=x*c-h*b;if(w<=0&&c>=0&&b<=0)return a=c/(c-b),t.copy(n).addScaledVector(Si,a);const m=l*b-x*u;if(m<=0&&u-l>=0&&x-b>=0)return Rl.subVectors(r,s),a=(u-l)/(u-l+(x-b)),t.copy(s).addScaledVector(Rl,a);const f=1/(m+w+d);return o=w*f,a=d*f,t.copy(n).addScaledVector(Mi,o).addScaledVector(Si,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Qr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class We{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Je.workingColorSpace){if(e=Ia(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Qr(o,r,e+1/3),this.g=Qr(o,r,e),this.b=Qr(o,r,e-1/3)}return Je.colorSpaceToWorking(this,s),this}setStyle(e,t=wt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const n=lh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pn(e.r),this.g=Pn(e.g),this.b=Pn(e.b),this}copyLinearToSRGB(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return Je.workingToColorSpace(Ct.copy(this),e),Math.round(Ze(Ct.r*255,0,255))*65536+Math.round(Ze(Ct.g*255,0,255))*256+Math.round(Ze(Ct.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Ct.copy(this),t);const n=Ct.r,s=Ct.g,r=Ct.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let h,c;const l=(a+o)/2;if(a===o)h=0,c=0;else{const u=o-a;switch(c=l<=.5?u/(o+a):u/(2-o-a),o){case n:h=(s-r)/u+(s<r?6:0);break;case s:h=(r-n)/u+2;break;case r:h=(n-s)/u+4;break}h/=6}return e.h=h,e.s=c,e.l=l,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=wt){Je.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,s=Ct.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(zs);const n=ps(zn.h,zs.h,t),s=ps(zn.s,zs.s,t),r=ps(zn.l,zs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new We;We.NAMES=lh;let mf=0;class Zn extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=xn(),this.name="",this.type="Material",this.blending=zi,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=wo,this.blendEquation=cn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zi&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Eo&&(n.blendSrc=this.blendSrc),this.blendDst!==wo&&(n.blendDst=this.blendDst),this.blendEquation!==cn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ki&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const h=r[a];delete h.metadata,o.push(h)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Oa extends Zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new U,Bs=new de;let gf=0;class Jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fa,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.applyMatrix3(e),this.setXY(t,Bs.x,Bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fa&&(e.usage=this.usage),e}}class ch extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class hh extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let vf=0;const nn=new $e,eo=new Mt,bi=new U,Zt=new Qt,ts=new Qt,Et=new U;class Ht extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(oh(e)?hh:ch)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return eo.lookAt(e),eo.updateMatrix(),this.applyMatrix4(eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new vt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Zt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ts.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(Zt.min,ts.min),Zt.expandByPoint(Et),Et.addVectors(Zt.max,ts.max),Zt.expandByPoint(Et)):(Zt.expandByPoint(ts.min),Zt.expandByPoint(ts.max))}Zt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Et));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],h=this.morphTargetsRelative;for(let c=0,l=a.count;c<l;c++)Et.fromBufferAttribute(a,c),h&&(bi.fromBufferAttribute(e,c),Et.add(bi)),s=Math.max(s,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],h=[];for(let E=0;E<n.count;E++)a[E]=new U,h[E]=new U;const c=new U,l=new U,u=new U,d=new de,x=new de,b=new de,w=new U,m=new U;function f(E,_,y){c.fromBufferAttribute(n,E),l.fromBufferAttribute(n,_),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,E),x.fromBufferAttribute(r,_),b.fromBufferAttribute(r,y),l.sub(c),u.sub(c),x.sub(d),b.sub(d);const A=1/(x.x*b.y-b.x*x.y);isFinite(A)&&(w.copy(l).multiplyScalar(b.y).addScaledVector(u,-x.y).multiplyScalar(A),m.copy(u).multiplyScalar(x.x).addScaledVector(l,-b.x).multiplyScalar(A),a[E].add(w),a[_].add(w),a[y].add(w),h[E].add(m),h[_].add(m),h[y].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let E=0,_=v.length;E<_;++E){const y=v[E],A=y.start,P=y.count;for(let C=A,D=A+P;C<D;C+=3)f(e.getX(C+0),e.getX(C+1),e.getX(C+2))}const g=new U,p=new U,T=new U,M=new U;function S(E){T.fromBufferAttribute(s,E),M.copy(T);const _=a[E];g.copy(_),g.sub(T.multiplyScalar(T.dot(_))).normalize(),p.crossVectors(M,_);const A=p.dot(h[E])<0?-1:1;o.setXYZW(E,g.x,g.y,g.z,A)}for(let E=0,_=v.length;E<_;++E){const y=v[E],A=y.start,P=y.count;for(let C=A,D=A+P;C<D;C+=3)S(e.getX(C+0)),S(e.getX(C+1)),S(e.getX(C+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,x=n.count;d<x;d++)n.setXYZ(d,0,0,0);const s=new U,r=new U,o=new U,a=new U,h=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,x=e.count;d<x;d+=3){const b=e.getX(d+0),w=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,b),r.fromBufferAttribute(t,w),o.fromBufferAttribute(t,m),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),a.fromBufferAttribute(n,b),h.fromBufferAttribute(n,w),c.fromBufferAttribute(n,m),a.add(l),h.add(l),c.add(l),n.setXYZ(b,a.x,a.y,a.z),n.setXYZ(w,h.x,h.y,h.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,x=t.count;d<x;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),n.setXYZ(d+0,l.x,l.y,l.z),n.setXYZ(d+1,l.x,l.y,l.z),n.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,h){const c=a.array,l=a.itemSize,u=a.normalized,d=new c.constructor(h.length*l);let x=0,b=0;for(let w=0,m=h.length;w<m;w++){a.isInterleavedBufferAttribute?x=h[w]*a.data.stride+a.offset:x=h[w]*l;for(let f=0;f<l;f++)d[b++]=c[x++]}return new Jt(d,l,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ht,n=this.index.array,s=this.attributes;for(const a in s){const h=s[a],c=e(h,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const h=[],c=r[a];for(let l=0,u=c.length;l<u;l++){const d=c[l],x=e(d,n);h.push(x)}t.morphAttributes[a]=h}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,h=o.length;a<h;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const c=n[h];e.data.attributes[h]=c.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],l=[];for(let u=0,d=c.length;u<d;u++){const x=c[u];l.push(x.toJSON(e.data))}l.length>0&&(s[h]=l,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const l=s[c];this.setAttribute(c,l.clone(t))}const r=e.morphAttributes;for(const c in r){const l=[],u=r[c];for(let d=0,x=u.length;d<x;d++)l.push(u[d].clone(t));this.morphAttributes[c]=l}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,l=o.length;c<l;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cl=new $e,ei=new Na,ks=new ws,Pl=new U,Hs=new U,Vs=new U,Gs=new U,to=new U,Ws=new U,Dl=new U,Xs=new U;class Ge extends Mt{constructor(e=new Ht,t=new Oa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Ws.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const l=a[h],u=r[h];l!==0&&(to.fromBufferAttribute(u,e),o?Ws.addScaledVector(to,l):Ws.addScaledVector(to.sub(t),l))}t.add(Ws)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(r),ei.copy(e.ray).recast(e.near),!(ks.containsPoint(ei.origin)===!1&&(ei.intersectSphere(ks,Pl)===null||ei.origin.distanceToSquared(Pl)>(e.far-e.near)**2))&&(Cl.copy(r).invert(),ei.copy(e.ray).applyMatrix4(Cl),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,h=r.attributes.position,c=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,d=r.groups,x=r.drawRange;if(a!==null)if(Array.isArray(o))for(let b=0,w=d.length;b<w;b++){const m=d[b],f=o[m.materialIndex],v=Math.max(m.start,x.start),g=Math.min(a.count,Math.min(m.start+m.count,x.start+x.count));for(let p=v,T=g;p<T;p+=3){const M=a.getX(p),S=a.getX(p+1),E=a.getX(p+2);s=qs(this,f,e,n,c,l,u,M,S,E),s&&(s.faceIndex=Math.floor(p/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const b=Math.max(0,x.start),w=Math.min(a.count,x.start+x.count);for(let m=b,f=w;m<f;m+=3){const v=a.getX(m),g=a.getX(m+1),p=a.getX(m+2);s=qs(this,o,e,n,c,l,u,v,g,p),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(o))for(let b=0,w=d.length;b<w;b++){const m=d[b],f=o[m.materialIndex],v=Math.max(m.start,x.start),g=Math.min(h.count,Math.min(m.start+m.count,x.start+x.count));for(let p=v,T=g;p<T;p+=3){const M=p,S=p+1,E=p+2;s=qs(this,f,e,n,c,l,u,M,S,E),s&&(s.faceIndex=Math.floor(p/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const b=Math.max(0,x.start),w=Math.min(h.count,x.start+x.count);for(let m=b,f=w;m<f;m+=3){const v=m,g=m+1,p=m+2;s=qs(this,o,e,n,c,l,u,v,g,p),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function _f(i,e,t,n,s,r,o,a){let h;if(e.side===Bt?h=n.intersectTriangle(o,r,s,!0,a):h=n.intersectTriangle(s,r,o,e.side===Yn,a),h===null)return null;Xs.copy(a),Xs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Xs);return c<t.near||c>t.far?null:{distance:c,point:Xs.clone(),object:i}}function qs(i,e,t,n,s,r,o,a,h,c){i.getVertexPosition(a,Hs),i.getVertexPosition(h,Vs),i.getVertexPosition(c,Gs);const l=_f(i,e,t,n,Hs,Vs,Gs,Dl);if(l){const u=new U;rn.getBarycoord(Dl,Hs,Vs,Gs,u),s&&(l.uv=rn.getInterpolatedAttribute(s,a,h,c,u,new de)),r&&(l.uv1=rn.getInterpolatedAttribute(r,a,h,c,u,new de)),o&&(l.normal=rn.getInterpolatedAttribute(o,a,h,c,u,new U),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));const d={a,b:h,c,normal:new U,materialIndex:0};rn.getNormal(Hs,Vs,Gs,d.normal),l.face=d,l.barycoord=u}return l}class Lt extends Ht{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const h=[],c=[],l=[],u=[];let d=0,x=0;b("z","y","x",-1,-1,n,t,e,o,r,0),b("z","y","x",1,-1,n,t,-e,o,r,1),b("x","z","y",1,1,e,n,t,s,o,2),b("x","z","y",1,-1,e,n,-t,s,o,3),b("x","y","z",1,-1,e,t,n,s,r,4),b("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(h),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(l,3)),this.setAttribute("uv",new vt(u,2));function b(w,m,f,v,g,p,T,M,S,E,_){const y=p/S,A=T/E,P=p/2,C=T/2,D=M/2,I=S+1,F=E+1;let B=0,k=0;const H=new U;for(let J=0;J<F;J++){const ne=J*A-C;for(let ue=0;ue<I;ue++){const Q=ue*y-P;H[w]=Q*v,H[m]=ne*g,H[f]=D,c.push(H.x,H.y,H.z),H[w]=0,H[m]=0,H[f]=M>0?1:-1,l.push(H.x,H.y,H.z),u.push(ue/S),u.push(1-J/E),B+=1}}for(let J=0;J<E;J++)for(let ne=0;ne<S;ne++){const ue=d+ne+I*J,Q=d+ne+I*(J+1),G=d+(ne+1)+I*(J+1),K=d+(ne+1)+I*J;h.push(ue,Q,K),h.push(Q,G,K),k+=6}a.addGroup(x,k,_),x+=k,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ft(i){const e={};for(let t=0;t<i.length;t++){const n=qi(i[t]);for(const s in n)e[s]=n[s]}return e}function xf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function uh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const Gn={clone:qi,merge:Ft};var yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pt extends Zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yf,this.fragmentShader=Mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qi(e.uniforms),this.uniformsGroups=xf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class fh extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new U,Ll=new de,Il=new de;class jt extends fh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,Ll,Il),t.subVectors(Il,Ll)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ds*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const h=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/h,t-=o.offsetY*n/c,s*=o.width/h,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ei=-90,wi=1;class Sf extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(Ei,wi,e,t);s.layers=this.layers,this.add(s);const r=new jt(Ei,wi,e,t);r.layers=this.layers,this.add(r);const o=new jt(Ei,wi,e,t);o.layers=this.layers,this.add(o);const a=new jt(Ei,wi,e,t);a.layers=this.layers,this.add(a);const h=new jt(Ei,wi,e,t);h.layers=this.layers,this.add(h);const c=new jt(Ei,wi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,h]=t;for(const c of t)this.remove(c);if(e===_n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,h,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,h),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=w,e.setRenderTarget(n,5,s),e.render(t,l),e.setRenderTarget(u,d,x),e.xr.enabled=b,n.texture.needsPMREMUpdate=!0}}class dh extends Dt{constructor(e=[],t=Hi,n,s,r,o,a,h,c,l){super(e,t,n,s,r,o,a,h,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bf extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new dh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Lt(5,5,5),r=new Pt({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:At});r.uniforms.tEquirect.value=t;const o=new Ge(s,r),a=t.minFilter;return t.minFilter===li&&(t.minFilter=gn),new Sf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class tt extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ef={type:"move"};class no{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,h=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const w of e.hand.values()){const m=t.getJointPose(w,n),f=this._getHandJoint(c,w);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const l=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=l.position.distanceTo(u.position),x=.02,b=.005;c.inputState.pinching&&d>x+b?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=x-b&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ef)))}return a!==null&&(a.visible=s!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class za{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new za(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ph extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class wf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fa,this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new U;class br{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=hn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=hn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=hn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=hn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new br(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Er extends Zn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ti;const ns=new U,Ai=new U,Ri=new U,Ci=new de,is=new de,mh=new $e,Ys=new U,ss=new U,Zs=new U,Ul=new de,io=new de,Nl=new de;class da extends Mt{constructor(e=new Er){if(super(),this.isSprite=!0,this.type="Sprite",Ti===void 0){Ti=new Ht;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new wf(t,5);Ti.setIndex([0,1,2,0,2,3]),Ti.setAttribute("position",new br(n,3,0,!1)),Ti.setAttribute("uv",new br(n,2,3,!1))}this.geometry=Ti,this.material=e,this.center=new de(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ai.setFromMatrixScale(this.matrixWorld),mh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ri.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ai.multiplyScalar(-Ri.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;js(Ys.set(-.5,-.5,0),Ri,o,Ai,s,r),js(ss.set(.5,-.5,0),Ri,o,Ai,s,r),js(Zs.set(.5,.5,0),Ri,o,Ai,s,r),Ul.set(0,0),io.set(1,0),Nl.set(1,1);let a=e.ray.intersectTriangle(Ys,ss,Zs,!1,ns);if(a===null&&(js(ss.set(-.5,.5,0),Ri,o,Ai,s,r),io.set(0,1),a=e.ray.intersectTriangle(Ys,Zs,ss,!1,ns),a===null))return;const h=e.ray.origin.distanceTo(ns);h<e.near||h>e.far||t.push({distance:h,point:ns.clone(),uv:rn.getInterpolation(ns,Ys,ss,Zs,Ul,io,Nl,new de),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function js(i,e,t,n,s,r){Ci.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(is.x=r*Ci.x-s*Ci.y,is.y=s*Ci.x+r*Ci.y):is.copy(Ci),i.copy(e),i.x+=is.x,i.y+=is.y,i.applyMatrix4(mh)}class Cr extends Dt{constructor(e=null,t=1,n=1,s,r,o,a,h,c=kt,l=kt,u,d){super(null,o,a,h,c,l,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fl extends Jt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Pi=new $e,Ol=new $e,$s=[],zl=new Qt,Tf=new $e,rs=new Ge,os=new ws;class gh extends Ge{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Tf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),zl.copy(e.boundingBox).applyMatrix4(Pi),this.boundingBox.union(zl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ws),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),os.copy(e.boundingSphere).applyMatrix4(Pi),this.boundingSphere.union(os)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),os.copy(this.boundingSphere),os.applyMatrix4(n),e.ray.intersectsSphere(os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Pi),Ol.multiplyMatrices(n,Pi),rs.matrixWorld=Ol,rs.raycast(e,$s);for(let o=0,a=$s.length;o<a;o++){const h=$s[o];h.instanceId=r,h.object=this,t.push(h)}$s.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cr(new Float32Array(s*this.count),s,this.count,Ca,vn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,h=s*e;r[h]=a,r.set(n,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const so=new U,Af=new U,Rf=new Ye;class kn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=so.subVectors(n,t).cross(Af.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(so),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Rf.getNormalMatrix(e),s=this.coplanarPoint(so).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new ws,Cf=new de(.5,.5),Ks=new U;class Ba{constructor(e=new kn,t=new kn,n=new kn,s=new kn,r=new kn,o=new kn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_n,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],h=r[2],c=r[3],l=r[4],u=r[5],d=r[6],x=r[7],b=r[8],w=r[9],m=r[10],f=r[11],v=r[12],g=r[13],p=r[14],T=r[15];if(s[0].setComponents(c-o,x-l,f-b,T-v).normalize(),s[1].setComponents(c+o,x+l,f+b,T+v).normalize(),s[2].setComponents(c+a,x+u,f+w,T+g).normalize(),s[3].setComponents(c-a,x-u,f-w,T-g).normalize(),n)s[4].setComponents(h,d,m,p).normalize(),s[5].setComponents(c-h,x-d,f-m,T-p).normalize();else if(s[4].setComponents(c-h,x-d,f-m,T-p).normalize(),t===_n)s[5].setComponents(c+h,x+d,f+m,T+p).normalize();else if(t===Mr)s[5].setComponents(h,d,m,p).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){ti.center.set(0,0,0);const t=Cf.distanceTo(e.center);return ti.radius=.7071067811865476+t,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ks.x=s.normal.x>0?e.max.x:e.min.x,Ks.y=s.normal.y>0?e.max.y:e.min.y,Ks.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class In extends Dt{constructor(e,t,n,s,r,o,a,h,c){super(e,t,n,s,r,o,a,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ka extends Dt{constructor(e,t,n=ci,s,r,o,a=kt,h=kt,c,l=_s,u=1){if(l!==_s&&l!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,o,a,h,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ua(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class vh extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $t extends Ht{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:h};const c=this;s=Math.floor(s),r=Math.floor(r);const l=[],u=[],d=[],x=[];let b=0;const w=[],m=n/2;let f=0;v(),o===!1&&(e>0&&g(!0),t>0&&g(!1)),this.setIndex(l),this.setAttribute("position",new vt(u,3)),this.setAttribute("normal",new vt(d,3)),this.setAttribute("uv",new vt(x,2));function v(){const p=new U,T=new U;let M=0;const S=(t-e)/n;for(let E=0;E<=r;E++){const _=[],y=E/r,A=y*(t-e)+e;for(let P=0;P<=s;P++){const C=P/s,D=C*h+a,I=Math.sin(D),F=Math.cos(D);T.x=A*I,T.y=-y*n+m,T.z=A*F,u.push(T.x,T.y,T.z),p.set(I,S,F).normalize(),d.push(p.x,p.y,p.z),x.push(C,1-y),_.push(b++)}w.push(_)}for(let E=0;E<s;E++)for(let _=0;_<r;_++){const y=w[_][E],A=w[_+1][E],P=w[_+1][E+1],C=w[_][E+1];(e>0||_!==0)&&(l.push(y,A,C),M+=3),(t>0||_!==r-1)&&(l.push(A,P,C),M+=3)}c.addGroup(f,M,0),f+=M}function g(p){const T=b,M=new de,S=new U;let E=0;const _=p===!0?e:t,y=p===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,m*y,0),d.push(0,y,0),x.push(.5,.5),b++;const A=b;for(let P=0;P<=s;P++){const D=P/s*h+a,I=Math.cos(D),F=Math.sin(D);S.x=_*F,S.y=m*y,S.z=_*I,u.push(S.x,S.y,S.z),d.push(0,y,0),M.x=I*.5+.5,M.y=F*.5*y+.5,x.push(M.x,M.y),b++}for(let P=0;P<s;P++){const C=T+P,D=A+P;p===!0?l.push(D,D+1,C):l.push(D+1,D,C),E+=3}c.addGroup(f,E,p===!0?1:2),f+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $t(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,h=r-1,c;for(;a<=h;)if(s=Math.floor(a+(h-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)h=s-1;else{h=s;break}if(s=h,n[s]===o)return s/(r-1);const l=n[s],d=n[s+1]-l,x=(o-l)/d;return(s+x)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),h=t||(o.isVector2?new de:new U);return h.copy(a).sub(o).normalize(),h}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new U,s=[],r=[],o=[],a=new U,h=new $e;for(let x=0;x<=e;x++){const b=x/e;s[x]=this.getTangentAt(b,new U)}r[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const l=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let x=1;x<=e;x++){if(r[x]=r[x-1].clone(),o[x]=o[x-1].clone(),a.crossVectors(s[x-1],s[x]),a.length()>Number.EPSILON){a.normalize();const b=Math.acos(Ze(s[x-1].dot(s[x]),-1,1));r[x].applyMatrix4(h.makeRotationAxis(a,b))}o[x].crossVectors(s[x],r[x])}if(t===!0){let x=Math.acos(Ze(r[0].dot(r[e]),-1,1));x/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(x=-x);for(let b=1;b<=e;b++)r[b].applyMatrix4(h.makeRotationAxis(s[b],x*b)),o[b].crossVectors(s[b],r[b])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ha extends yn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=h}getPoint(e,t=new de){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let h=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const l=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=h-this.aX,x=c-this.aY;h=d*l-x*u+this.aX,c=d*u+x*l+this.aY}return n.set(h,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Pf extends Ha{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Va(){let i=0,e=0,t=0,n=0;function s(r,o,a,h){i=r,e=a,t=-3*r+3*o-2*a-h,n=2*r-2*o+a+h}return{initCatmullRom:function(r,o,a,h,c){s(o,a,c*(a-r),c*(h-o))},initNonuniformCatmullRom:function(r,o,a,h,c,l,u){let d=(o-r)/c-(a-r)/(c+l)+(a-o)/l,x=(a-o)/l-(h-o)/(l+u)+(h-a)/u;d*=l,x*=l,s(o,a,d,x)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Js=new U,ro=new Va,oo=new Va,ao=new Va;class _h extends yn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),h=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:h===0&&a===r-1&&(a=r-2,h=1);let c,l;this.closed||a>0?c=s[(a-1)%r]:(Js.subVectors(s[0],s[1]).add(s[0]),c=Js);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?l=s[(a+2)%r]:(Js.subVectors(s[r-1],s[r-2]).add(s[r-1]),l=Js),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let b=Math.pow(c.distanceToSquared(u),x),w=Math.pow(u.distanceToSquared(d),x),m=Math.pow(d.distanceToSquared(l),x);w<1e-4&&(w=1),b<1e-4&&(b=w),m<1e-4&&(m=w),ro.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,b,w,m),oo.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,b,w,m),ao.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,b,w,m)}else this.curveType==="catmullrom"&&(ro.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),oo.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),ao.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ro.calc(h),oo.calc(h),ao.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Bl(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,h=i*a;return(2*t-2*n+r+o)*h+(-3*t+3*n-2*r-o)*a+r*i+t}function Df(i,e){const t=1-i;return t*t*e}function Lf(i,e){return 2*(1-i)*i*e}function If(i,e){return i*i*e}function ms(i,e,t,n){return Df(i,e)+Lf(i,t)+If(i,n)}function Uf(i,e){const t=1-i;return t*t*t*e}function Nf(i,e){const t=1-i;return 3*t*t*i*e}function Ff(i,e){return 3*(1-i)*i*i*e}function Of(i,e){return i*i*i*e}function gs(i,e,t,n,s){return Uf(i,e)+Nf(i,t)+Ff(i,n)+Of(i,s)}class xh extends yn{constructor(e=new de,t=new de,n=new de,s=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new de){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gs(e,s.x,r.x,o.x,a.x),gs(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class zf extends yn{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gs(e,s.x,r.x,o.x,a.x),gs(e,s.y,r.y,o.y,a.y),gs(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class yh extends yn{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bf extends yn{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mh extends yn{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(ms(e,s.x,r.x,o.x),ms(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sh extends yn{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(ms(e,s.x,r.x,o.x),ms(e,s.y,r.y,o.y),ms(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bh extends yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,h=s[o===0?o:o-1],c=s[o],l=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Bl(a,h.x,c.x,l.x,u.x),Bl(a,h.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new de().fromArray(s))}return this}}var wr=Object.freeze({__proto__:null,ArcCurve:Pf,CatmullRomCurve3:_h,CubicBezierCurve:xh,CubicBezierCurve3:zf,EllipseCurve:Ha,LineCurve:yh,LineCurve3:Bf,QuadraticBezierCurve:Mh,QuadraticBezierCurve3:Sh,SplineCurve:bh});class kf extends yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wr[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],h=a.getLength(),c=h===0?0:1-o/h;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,h=o.getPoints(a);for(let c=0;c<h.length;c++){const l=h[c];n&&n.equals(l)||(t.push(l),n=l)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new wr[s.type]().fromJSON(s))}return this}}class kl extends kf{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new yh(this.currentPoint.clone(),new de(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Mh(this.currentPoint.clone(),new de(e,t),new de(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new xh(this.currentPoint.clone(),new de(e,t),new de(n,s),new de(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new bh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(e+a,t+h,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,h){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,s,r,o,a,h),this}absellipse(e,t,n,s,r,o,a,h){const c=new Ha(e,t,n,s,r,o,a,h);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class si extends kl{constructor(e){super(e),this.uuid=xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new kl().fromJSON(s))}return this}}function Hf(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Eh(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,h,c;if(n&&(r=qf(i,e,r,t)),i.length>80*t){a=1/0,h=1/0;let l=-1/0,u=-1/0;for(let d=t;d<s;d+=t){const x=i[d],b=i[d+1];x<a&&(a=x),b<h&&(h=b),x>l&&(l=x),b>u&&(u=b)}c=Math.max(l-a,u-h),c=c!==0?32767/c:0}return Ms(r,o,t,a,h,c,0),o}function Eh(i,e,t,n,s){let r;if(s===id(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Hl(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Hl(o/n|0,i[o],i[o+1],r);return r&&Yi(r,r.next)&&(bs(r),r=r.next),r}function hi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Yi(t,t.next)||gt(t.prev,t,t.next)===0)){if(bs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ms(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Kf(i,n,s,r);let a=i;for(;i.prev!==i.next;){const h=i.prev,c=i.next;if(r?Gf(i,n,s,r):Vf(i)){e.push(h.i,i.i,c.i),bs(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Wf(hi(i),e),Ms(i,e,t,n,s,r,2)):o===2&&Xf(i,e,t,n,s,r):Ms(hi(i),e,t,n,s,r,1);break}}}function Vf(i){const e=i.prev,t=i,n=i.next;if(gt(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,h=t.y,c=n.y,l=Math.min(s,r,o),u=Math.min(a,h,c),d=Math.max(s,r,o),x=Math.max(a,h,c);let b=n.next;for(;b!==e;){if(b.x>=l&&b.x<=d&&b.y>=u&&b.y<=x&&hs(s,a,r,h,o,c,b.x,b.y)&&gt(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function Gf(i,e,t,n){const s=i.prev,r=i,o=i.next;if(gt(s,r,o)>=0)return!1;const a=s.x,h=r.x,c=o.x,l=s.y,u=r.y,d=o.y,x=Math.min(a,h,c),b=Math.min(l,u,d),w=Math.max(a,h,c),m=Math.max(l,u,d),f=pa(x,b,e,t,n),v=pa(w,m,e,t,n);let g=i.prevZ,p=i.nextZ;for(;g&&g.z>=f&&p&&p.z<=v;){if(g.x>=x&&g.x<=w&&g.y>=b&&g.y<=m&&g!==s&&g!==o&&hs(a,l,h,u,c,d,g.x,g.y)&&gt(g.prev,g,g.next)>=0||(g=g.prevZ,p.x>=x&&p.x<=w&&p.y>=b&&p.y<=m&&p!==s&&p!==o&&hs(a,l,h,u,c,d,p.x,p.y)&&gt(p.prev,p,p.next)>=0))return!1;p=p.nextZ}for(;g&&g.z>=f;){if(g.x>=x&&g.x<=w&&g.y>=b&&g.y<=m&&g!==s&&g!==o&&hs(a,l,h,u,c,d,g.x,g.y)&&gt(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;p&&p.z<=v;){if(p.x>=x&&p.x<=w&&p.y>=b&&p.y<=m&&p!==s&&p!==o&&hs(a,l,h,u,c,d,p.x,p.y)&&gt(p.prev,p,p.next)>=0)return!1;p=p.nextZ}return!0}function Wf(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Yi(n,s)&&Th(n,t,t.next,s)&&Ss(n,s)&&Ss(s,n)&&(e.push(n.i,t.i,s.i),bs(t),bs(t.next),t=i=s),t=t.next}while(t!==i);return hi(t)}function Xf(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ed(o,a)){let h=Ah(o,a);o=hi(o,o.next),h=hi(h,h.next),Ms(o,e,t,n,s,r,0),Ms(h,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function qf(i,e,t,n){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*n,h=r<o-1?e[r+1]*n:i.length,c=Eh(i,a,h,n,!1);c===c.next&&(c.steiner=!0),s.push(Qf(c))}s.sort(Yf);for(let r=0;r<s.length;r++)t=Zf(s[r],t);return t}function Yf(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Zf(i,e){const t=jf(i,e);if(!t)return e;const n=Ah(t,i);return hi(n,n.next),hi(t,t.next)}function jf(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,o;if(Yi(i,t))return t;do{if(Yi(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,h=o.x,c=o.y;let l=1/0;t=o;do{if(n>=t.x&&t.x>=h&&n!==t.x&&wh(s<c?n:r,s,h,c,s<c?r:n,s,t.x,t.y)){const u=Math.abs(s-t.y)/(n-t.x);Ss(t,i)&&(u<l||u===l&&(t.x>o.x||t.x===o.x&&$f(o,t)))&&(o=t,l=u)}t=t.next}while(t!==a);return o}function $f(i,e){return gt(i.prev,i,e.prev)<0&&gt(e.next,i,i.next)<0}function Kf(i,e,t,n){let s=i;do s.z===0&&(s.z=pa(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Jf(s)}function Jf(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let h=t;for(;a>0||h>0&&o;)a!==0&&(h===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,h--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function pa(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Qf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function wh(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function hs(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&wh(i,e,t,n,s,r,o,a)}function ed(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!td(i,e)&&(Ss(i,e)&&Ss(e,i)&&nd(i,e)&&(gt(i.prev,i,e.prev)||gt(i,e.prev,e))||Yi(i,e)&&gt(i.prev,i,i.next)>0&&gt(e.prev,e,e.next)>0)}function gt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Yi(i,e){return i.x===e.x&&i.y===e.y}function Th(i,e,t,n){const s=er(gt(i,e,t)),r=er(gt(i,e,n)),o=er(gt(t,n,i)),a=er(gt(t,n,e));return!!(s!==r&&o!==a||s===0&&Qs(i,t,e)||r===0&&Qs(i,n,e)||o===0&&Qs(t,i,n)||a===0&&Qs(t,e,n))}function Qs(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function er(i){return i>0?1:i<0?-1:0}function td(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Th(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ss(i,e){return gt(i.prev,i,i.next)<0?gt(i,e,i.next)>=0&&gt(i,i.prev,e)>=0:gt(i,e,i.prev)<0||gt(i,i.next,e)<0}function nd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ah(i,e){const t=ma(i.i,i.x,i.y),n=ma(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Hl(i,e,t,n){const s=ma(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function bs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ma(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function id(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class sd{static triangulate(e,t,n=2){return Hf(e,t,n)}}class Ni{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Ni.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Vl(e),Gl(n,e);let o=e.length;t.forEach(Vl);for(let h=0;h<t.length;h++)s.push(o),o+=t[h].length,Gl(n,t[h]);const a=sd.triangulate(n,s);for(let h=0;h<a.length;h+=3)r.push(a.slice(h,h+3));return r}}function Vl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Gl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Hn extends Ht{constructor(e=new si([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,h=e.length;a<h;a++){const c=e[a];o(c)}this.setAttribute("position",new vt(s,3)),this.setAttribute("uv",new vt(r,2)),this.computeVertexNormals();function o(a){const h=[],c=t.curveSegments!==void 0?t.curveSegments:12,l=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,x=t.bevelThickness!==void 0?t.bevelThickness:.2,b=t.bevelSize!==void 0?t.bevelSize:x-.1,w=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const f=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:rd;let g,p=!1,T,M,S,E;f&&(g=f.getSpacedPoints(l),p=!0,d=!1,T=f.computeFrenetFrames(l,!1),M=new U,S=new U,E=new U),d||(m=0,x=0,b=0,w=0);const _=a.extractPoints(c);let y=_.shape;const A=_.holes;if(!Ni.isClockWise(y)){y=y.reverse();for(let le=0,se=A.length;le<se;le++){const re=A[le];Ni.isClockWise(re)&&(A[le]=re.reverse())}}function C(le){const re=10000000000000001e-36;let oe=le[0];for(let ve=1;ve<=le.length;ve++){const fe=ve%le.length,me=le[fe],Fe=me.x-oe.x,Ne=me.y-oe.y,N=Fe*Fe+Ne*Ne,R=Math.max(Math.abs(me.x),Math.abs(me.y),Math.abs(oe.x),Math.abs(oe.y)),Y=re*R*R;if(N<=Y){le.splice(fe,1),ve--;continue}oe=me}}C(y),A.forEach(C);const D=A.length,I=y;for(let le=0;le<D;le++){const se=A[le];y=y.concat(se)}function F(le,se,re){return se||console.error("THREE.ExtrudeGeometry: vec does not exist"),le.clone().addScaledVector(se,re)}const B=y.length;function k(le,se,re){let oe,ve,fe;const me=le.x-se.x,Fe=le.y-se.y,Ne=re.x-le.x,N=re.y-le.y,R=me*me+Fe*Fe,Y=me*N-Fe*Ne;if(Math.abs(Y)>Number.EPSILON){const z=Math.sqrt(R),$=Math.sqrt(Ne*Ne+N*N),X=se.x-Fe/z,Se=se.y+me/z,he=re.x-N/$,Ae=re.y+Ne/$,Pe=((he-X)*N-(Ae-Se)*Ne)/(me*N-Fe*Ne);oe=X+me*Pe-le.x,ve=Se+Fe*Pe-le.y;const ge=oe*oe+ve*ve;if(ge<=2)return new de(oe,ve);fe=Math.sqrt(ge/2)}else{let z=!1;me>Number.EPSILON?Ne>Number.EPSILON&&(z=!0):me<-Number.EPSILON?Ne<-Number.EPSILON&&(z=!0):Math.sign(Fe)===Math.sign(N)&&(z=!0),z?(oe=-Fe,ve=me,fe=Math.sqrt(R)):(oe=me,ve=Fe,fe=Math.sqrt(R/2))}return new de(oe/fe,ve/fe)}const H=[];for(let le=0,se=I.length,re=se-1,oe=le+1;le<se;le++,re++,oe++)re===se&&(re=0),oe===se&&(oe=0),H[le]=k(I[le],I[re],I[oe]);const J=[];let ne,ue=H.concat();for(let le=0,se=D;le<se;le++){const re=A[le];ne=[];for(let oe=0,ve=re.length,fe=ve-1,me=oe+1;oe<ve;oe++,fe++,me++)fe===ve&&(fe=0),me===ve&&(me=0),ne[oe]=k(re[oe],re[fe],re[me]);J.push(ne),ue=ue.concat(ne)}let Q;if(m===0)Q=Ni.triangulateShape(I,A);else{const le=[],se=[];for(let re=0;re<m;re++){const oe=re/m,ve=x*Math.cos(oe*Math.PI/2),fe=b*Math.sin(oe*Math.PI/2)+w;for(let me=0,Fe=I.length;me<Fe;me++){const Ne=F(I[me],H[me],fe);ie(Ne.x,Ne.y,-ve),oe===0&&le.push(Ne)}for(let me=0,Fe=D;me<Fe;me++){const Ne=A[me];ne=J[me];const N=[];for(let R=0,Y=Ne.length;R<Y;R++){const z=F(Ne[R],ne[R],fe);ie(z.x,z.y,-ve),oe===0&&N.push(z)}oe===0&&se.push(N)}}Q=Ni.triangulateShape(le,se)}const G=Q.length,K=b+w;for(let le=0;le<B;le++){const se=d?F(y[le],ue[le],K):y[le];p?(S.copy(T.normals[0]).multiplyScalar(se.x),M.copy(T.binormals[0]).multiplyScalar(se.y),E.copy(g[0]).add(S).add(M),ie(E.x,E.y,E.z)):ie(se.x,se.y,0)}for(let le=1;le<=l;le++)for(let se=0;se<B;se++){const re=d?F(y[se],ue[se],K):y[se];p?(S.copy(T.normals[le]).multiplyScalar(re.x),M.copy(T.binormals[le]).multiplyScalar(re.y),E.copy(g[le]).add(S).add(M),ie(E.x,E.y,E.z)):ie(re.x,re.y,u/l*le)}for(let le=m-1;le>=0;le--){const se=le/m,re=x*Math.cos(se*Math.PI/2),oe=b*Math.sin(se*Math.PI/2)+w;for(let ve=0,fe=I.length;ve<fe;ve++){const me=F(I[ve],H[ve],oe);ie(me.x,me.y,u+re)}for(let ve=0,fe=A.length;ve<fe;ve++){const me=A[ve];ne=J[ve];for(let Fe=0,Ne=me.length;Fe<Ne;Fe++){const N=F(me[Fe],ne[Fe],oe);p?ie(N.x,N.y+g[l-1].y,g[l-1].x+re):ie(N.x,N.y,u+re)}}}W(),q();function W(){const le=s.length/3;if(d){let se=0,re=B*se;for(let oe=0;oe<G;oe++){const ve=Q[oe];ye(ve[2]+re,ve[1]+re,ve[0]+re)}se=l+m*2,re=B*se;for(let oe=0;oe<G;oe++){const ve=Q[oe];ye(ve[0]+re,ve[1]+re,ve[2]+re)}}else{for(let se=0;se<G;se++){const re=Q[se];ye(re[2],re[1],re[0])}for(let se=0;se<G;se++){const re=Q[se];ye(re[0]+B*l,re[1]+B*l,re[2]+B*l)}}n.addGroup(le,s.length/3-le,0)}function q(){const le=s.length/3;let se=0;ae(I,se),se+=I.length;for(let re=0,oe=A.length;re<oe;re++){const ve=A[re];ae(ve,se),se+=ve.length}n.addGroup(le,s.length/3-le,1)}function ae(le,se){let re=le.length;for(;--re>=0;){const oe=re;let ve=re-1;ve<0&&(ve=le.length-1);for(let fe=0,me=l+m*2;fe<me;fe++){const Fe=B*fe,Ne=B*(fe+1),N=se+oe+Fe,R=se+ve+Fe,Y=se+ve+Ne,z=se+oe+Ne;Ue(N,R,Y,z)}}}function ie(le,se,re){h.push(le),h.push(se),h.push(re)}function ye(le,se,re){qe(le),qe(se),qe(re);const oe=s.length/3,ve=v.generateTopUV(n,s,oe-3,oe-2,oe-1);O(ve[0]),O(ve[1]),O(ve[2])}function Ue(le,se,re,oe){qe(le),qe(se),qe(oe),qe(se),qe(re),qe(oe);const ve=s.length/3,fe=v.generateSideWallUV(n,s,ve-6,ve-3,ve-2,ve-1);O(fe[0]),O(fe[1]),O(fe[3]),O(fe[1]),O(fe[2]),O(fe[3])}function qe(le){s.push(h[le*3+0]),s.push(h[le*3+1]),s.push(h[le*3+2])}function O(le){r.push(le.x),r.push(le.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return od(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new wr[s.type]().fromJSON(s)),new Hn(n,e.options)}}const rd={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],h=e[n*3+1],c=e[s*3],l=e[s*3+1];return[new de(r,o),new de(a,h),new de(c,l)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],h=e[t*3+2],c=e[n*3],l=e[n*3+1],u=e[n*3+2],d=e[s*3],x=e[s*3+1],b=e[s*3+2],w=e[r*3],m=e[r*3+1],f=e[r*3+2];return Math.abs(a-l)<Math.abs(o-c)?[new de(o,1-h),new de(c,1-u),new de(d,1-b),new de(w,1-f)]:[new de(a,1-h),new de(l,1-u),new de(x,1-b),new de(m,1-f)]}};function od(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class jn extends Ht{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),h=Math.floor(s),c=a+1,l=h+1,u=e/a,d=t/h,x=[],b=[],w=[],m=[];for(let f=0;f<l;f++){const v=f*d-o;for(let g=0;g<c;g++){const p=g*u-r;b.push(p,-v,0),w.push(0,0,1),m.push(g/a),m.push(1-f/h)}}for(let f=0;f<h;f++)for(let v=0;v<a;v++){const g=v+c*f,p=v+c*(f+1),T=v+1+c*(f+1),M=v+1+c*f;x.push(g,p,M),x.push(p,T,M)}this.setIndex(x),this.setAttribute("position",new vt(b,3)),this.setAttribute("normal",new vt(w,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ga extends Ht{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],h=[],c=[],l=[];let u=e;const d=(t-e)/s,x=new U,b=new de;for(let w=0;w<=s;w++){for(let m=0;m<=n;m++){const f=r+m/n*o;x.x=u*Math.cos(f),x.y=u*Math.sin(f),h.push(x.x,x.y,x.z),c.push(0,0,1),b.x=(x.x/t+1)/2,b.y=(x.y/t+1)/2,l.push(b.x,b.y)}u+=d}for(let w=0;w<s;w++){const m=w*(n+1);for(let f=0;f<n;f++){const v=f+m,g=v,p=v+n+1,T=v+n+2,M=v+1;a.push(g,p,M),a.push(p,T,M)}}this.setIndex(a),this.setAttribute("position",new vt(h,3)),this.setAttribute("normal",new vt(c,3)),this.setAttribute("uv",new vt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ga(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Wa extends Ht{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(o+a,Math.PI);let c=0;const l=[],u=new U,d=new U,x=[],b=[],w=[],m=[];for(let f=0;f<=n;f++){const v=[],g=f/n;let p=0;f===0&&o===0?p=.5/t:f===n&&h===Math.PI&&(p=-.5/t);for(let T=0;T<=t;T++){const M=T/t;u.x=-e*Math.cos(s+M*r)*Math.sin(o+g*a),u.y=e*Math.cos(o+g*a),u.z=e*Math.sin(s+M*r)*Math.sin(o+g*a),b.push(u.x,u.y,u.z),d.copy(u).normalize(),w.push(d.x,d.y,d.z),m.push(M+p,1-g),v.push(c++)}l.push(v)}for(let f=0;f<n;f++)for(let v=0;v<t;v++){const g=l[f][v+1],p=l[f][v],T=l[f+1][v],M=l[f+1][v+1];(f!==0||o>0)&&x.push(g,p,M),(f!==n-1||h<Math.PI)&&x.push(p,T,M)}this.setIndex(x),this.setAttribute("position",new vt(b,3)),this.setAttribute("normal",new vt(w,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wa(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Xa extends Ht{constructor(e=new Sh(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new U,h=new U,c=new de;let l=new U;const u=[],d=[],x=[],b=[];w(),this.setIndex(b),this.setAttribute("position",new vt(u,3)),this.setAttribute("normal",new vt(d,3)),this.setAttribute("uv",new vt(x,2));function w(){for(let g=0;g<t;g++)m(g);m(r===!1?t:0),v(),f()}function m(g){l=e.getPointAt(g/t,l);const p=o.normals[g],T=o.binormals[g];for(let M=0;M<=s;M++){const S=M/s*Math.PI*2,E=Math.sin(S),_=-Math.cos(S);h.x=_*p.x+E*T.x,h.y=_*p.y+E*T.y,h.z=_*p.z+E*T.z,h.normalize(),d.push(h.x,h.y,h.z),a.x=l.x+n*h.x,a.y=l.y+n*h.y,a.z=l.z+n*h.z,u.push(a.x,a.y,a.z)}}function f(){for(let g=1;g<=t;g++)for(let p=1;p<=s;p++){const T=(s+1)*(g-1)+(p-1),M=(s+1)*g+(p-1),S=(s+1)*g+p,E=(s+1)*(g-1)+p;b.push(T,M,E),b.push(M,S,E)}}function v(){for(let g=0;g<=t;g++)for(let p=0;p<=s;p++)c.x=g/t,c.y=p/s,x.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Xa(new wr[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ad extends Pt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ft extends Zn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rr,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qa extends ft{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ld extends Zn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rr,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class cd extends Zn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rr,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class hd extends Zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ud extends Zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ya extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class fd extends Ya{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const lo=new $e,Wl=new U,Xl=new U;class Rh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ba,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Wl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wl),Xl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xl),t.updateMatrixWorld(),lo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(lo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ql=new $e,as=new U,co=new U;class dd extends Rh{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),as.setFromMatrixPosition(e.matrixWorld),n.position.copy(as),co.copy(n.position),co.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(co),n.updateMatrixWorld(),s.makeTranslation(-as.x,-as.y,-as.z),ql.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ql,n.coordinateSystem,n.reversedDepth)}}class pd extends Ya{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new dd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Za extends fh{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=l*this.view.offsetY,h=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class md extends Rh{constructor(){super(new Za(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yl extends Ya{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new md}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class gd extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class vd{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Zl=new $e;class _d{constructor(e,t,n=0,s=1/0){this.ray=new Na(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Fa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zl),this}intersectObject(e,t=!0,n=[]){return ga(e,this,n,t),n.sort(jl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)ga(e[s],this,n,t);return n.sort(jl),n}}function jl(i,e){return i.distance-e.distance}function ga(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ga(r[o],e,t,!0)}}class $l{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class xd extends ui{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Kl(i,e,t,n){const s=yd(n);switch(t){case nh:return i*e;case Ca:return i*e/s.components*s.byteLength;case Pa:return i*e/s.components*s.byteLength;case sh:return i*e*2/s.components*s.byteLength;case Da:return i*e*2/s.components*s.byteLength;case ih:return i*e*3/s.components*s.byteLength;case Kt:return i*e*4/s.components*s.byteLength;case La:return i*e*4/s.components*s.byteLength;case ur:case fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dr:case pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bo:case Ho:return Math.max(i,16)*Math.max(e,8)/4;case zo:case ko:return Math.max(i,8)*Math.max(e,8)/2;case Vo:case Go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Zo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case jo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $o:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ko:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Jo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Qo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ea:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ta:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case na:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ia:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case sa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ra:case oa:case aa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case la:case ca:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ha:case ua:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function yd(i){switch(i){case un:case Jc:return{byteLength:1,components:1};case vs:case Qc:case Ln:return{byteLength:2,components:1};case Aa:case Ra:return{byteLength:2,components:4};case ci:case Ta:case vn:return{byteLength:4,components:1};case eh:case th:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ba}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ba);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ch(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Md(i){const e=new WeakMap;function t(a,h){const c=a.array,l=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(h,d),i.bufferData(h,c,l),a.onUploadCallback();let x;if(c instanceof Float32Array)x=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)x=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?x=i.HALF_FLOAT:x=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)x=i.SHORT;else if(c instanceof Uint32Array)x=i.UNSIGNED_INT;else if(c instanceof Int32Array)x=i.INT;else if(c instanceof Int8Array)x=i.BYTE;else if(c instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:x,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,h,c){const l=h.array,u=h.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,l);else{u.sort((x,b)=>x.start-b.start);let d=0;for(let x=1;x<u.length;x++){const b=u[d],w=u[x];w.start<=b.start+b.count+1?b.count=Math.max(b.count,w.start+w.count-b.start):(++d,u[d]=w)}u.length=d+1;for(let x=0,b=u.length;x<b;x++){const w=u[x];i.bufferSubData(c,w.start*l.BYTES_PER_ELEMENT,l,w.start,w.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const h=e.get(a);h&&(i.deleteBuffer(h.buffer),e.delete(a))}function o(a,h){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const l=e.get(a);(!l||l.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,h));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,h),c.version=a.version}}return{get:s,remove:r,update:o}}var Sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bd=`#ifdef USE_ALPHAHASH
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
#endif`,Ed=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Td=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rd=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pd=`#ifdef USE_BATCHING
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
#endif`,Dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ld=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ud=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
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
#endif`,Fd=`#ifdef USE_BUMPMAP
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
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Xd=`#define PI 3.141592653589793
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
} // validated`,qd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yd=`vec3 transformedNormal = objectNormal;
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
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,e0=`#ifdef USE_ENVMAP
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
#endif`,t0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,n0=`#ifdef USE_ENVMAP
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
#endif`,i0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,s0=`#ifdef USE_ENVMAP
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
#endif`,r0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,o0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,a0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,l0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,c0=`#ifdef USE_GRADIENTMAP
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
}`,h0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,u0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,f0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,d0=`uniform bool receiveShadow;
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
#endif`,p0=`#ifdef USE_ENVMAP
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
#endif`,m0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,g0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,v0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,x0=`PhysicalMaterial material;
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
#endif`,y0=`struct PhysicalMaterial {
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
}`,M0=`
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
#endif`,S0=`#if defined( RE_IndirectDiffuse )
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
#endif`,b0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,E0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,w0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,T0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,R0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,C0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,P0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,D0=`#if defined( USE_POINTS_UV )
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
#endif`,L0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,I0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,U0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,N0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,F0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O0=`#ifdef USE_MORPHTARGETS
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
#endif`,z0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,B0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,k0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,H0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,V0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,W0=`#ifdef USE_NORMALMAP
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
#endif`,X0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,q0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Y0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Z0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,j0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,K0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,J0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Q0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,op=`float getShadowMask() {
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
}`,ap=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hp=`#ifdef USE_SKINNING
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
#endif`,up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#ifdef USE_TRANSMISSION
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`#include <common>
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
}`,Rp=`#if DEPTH_PACKING == 3200
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
}`,Cp=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
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
}`,Dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ip=`uniform float scale;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Np=`#include <common>
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
}`,Fp=`uniform vec3 diffuse;
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
}`,Op=`#define LAMBERT
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
}`,zp=`#define LAMBERT
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
}`,Bp=`#define MATCAP
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
}`,kp=`#define MATCAP
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
}`,Hp=`#define NORMAL
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
}`,Vp=`#define NORMAL
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
}`,Gp=`#define PHONG
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
}`,Wp=`#define PHONG
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
}`,Xp=`#define STANDARD
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
}`,qp=`#define STANDARD
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
}`,Yp=`#define TOON
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
}`,Zp=`#define TOON
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
}`,jp=`uniform float size;
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
}`,$p=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,Jp=`uniform vec3 color;
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
}`,Qp=`uniform float rotation;
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
}`,em=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:Sd,alphahash_pars_fragment:bd,alphamap_fragment:Ed,alphamap_pars_fragment:wd,alphatest_fragment:Td,alphatest_pars_fragment:Ad,aomap_fragment:Rd,aomap_pars_fragment:Cd,batching_pars_vertex:Pd,batching_vertex:Dd,begin_vertex:Ld,beginnormal_vertex:Id,bsdfs:Ud,iridescence_fragment:Nd,bumpmap_pars_fragment:Fd,clipping_planes_fragment:Od,clipping_planes_pars_fragment:zd,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:kd,color_fragment:Hd,color_pars_fragment:Vd,color_pars_vertex:Gd,color_vertex:Wd,common:Xd,cube_uv_reflection_fragment:qd,defaultnormal_vertex:Yd,displacementmap_pars_vertex:Zd,displacementmap_vertex:jd,emissivemap_fragment:$d,emissivemap_pars_fragment:Kd,colorspace_fragment:Jd,colorspace_pars_fragment:Qd,envmap_fragment:e0,envmap_common_pars_fragment:t0,envmap_pars_fragment:n0,envmap_pars_vertex:i0,envmap_physical_pars_fragment:p0,envmap_vertex:s0,fog_vertex:r0,fog_pars_vertex:o0,fog_fragment:a0,fog_pars_fragment:l0,gradientmap_pars_fragment:c0,lightmap_pars_fragment:h0,lights_lambert_fragment:u0,lights_lambert_pars_fragment:f0,lights_pars_begin:d0,lights_toon_fragment:m0,lights_toon_pars_fragment:g0,lights_phong_fragment:v0,lights_phong_pars_fragment:_0,lights_physical_fragment:x0,lights_physical_pars_fragment:y0,lights_fragment_begin:M0,lights_fragment_maps:S0,lights_fragment_end:b0,logdepthbuf_fragment:E0,logdepthbuf_pars_fragment:w0,logdepthbuf_pars_vertex:T0,logdepthbuf_vertex:A0,map_fragment:R0,map_pars_fragment:C0,map_particle_fragment:P0,map_particle_pars_fragment:D0,metalnessmap_fragment:L0,metalnessmap_pars_fragment:I0,morphinstance_vertex:U0,morphcolor_vertex:N0,morphnormal_vertex:F0,morphtarget_pars_vertex:O0,morphtarget_vertex:z0,normal_fragment_begin:B0,normal_fragment_maps:k0,normal_pars_fragment:H0,normal_pars_vertex:V0,normal_vertex:G0,normalmap_pars_fragment:W0,clearcoat_normal_fragment_begin:X0,clearcoat_normal_fragment_maps:q0,clearcoat_pars_fragment:Y0,iridescence_pars_fragment:Z0,opaque_fragment:j0,packing:$0,premultiplied_alpha_fragment:K0,project_vertex:J0,dithering_fragment:Q0,dithering_pars_fragment:ep,roughnessmap_fragment:tp,roughnessmap_pars_fragment:np,shadowmap_pars_fragment:ip,shadowmap_pars_vertex:sp,shadowmap_vertex:rp,shadowmask_pars_fragment:op,skinbase_vertex:ap,skinning_pars_vertex:lp,skinning_vertex:cp,skinnormal_vertex:hp,specularmap_fragment:up,specularmap_pars_fragment:fp,tonemapping_fragment:dp,tonemapping_pars_fragment:pp,transmission_fragment:mp,transmission_pars_fragment:gp,uv_pars_fragment:vp,uv_pars_vertex:_p,uv_vertex:xp,worldpos_vertex:yp,background_vert:Mp,background_frag:Sp,backgroundCube_vert:bp,backgroundCube_frag:Ep,cube_vert:wp,cube_frag:Tp,depth_vert:Ap,depth_frag:Rp,distanceRGBA_vert:Cp,distanceRGBA_frag:Pp,equirect_vert:Dp,equirect_frag:Lp,linedashed_vert:Ip,linedashed_frag:Up,meshbasic_vert:Np,meshbasic_frag:Fp,meshlambert_vert:Op,meshlambert_frag:zp,meshmatcap_vert:Bp,meshmatcap_frag:kp,meshnormal_vert:Hp,meshnormal_frag:Vp,meshphong_vert:Gp,meshphong_frag:Wp,meshphysical_vert:Xp,meshphysical_frag:qp,meshtoon_vert:Yp,meshtoon_frag:Zp,points_vert:jp,points_frag:$p,shadow_vert:Kp,shadow_frag:Jp,sprite_vert:Qp,sprite_frag:em},Ee={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},mn={basic:{uniforms:Ft([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Ft([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new We(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Ft([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Ft([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Ft([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new We(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Ft([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Ft([Ee.points,Ee.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Ft([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Ft([Ee.common,Ee.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Ft([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Ft([Ee.sprite,Ee.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Ft([Ee.common,Ee.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Ft([Ee.lights,Ee.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};mn.physical={uniforms:Ft([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const tr={r:0,b:0,g:0},ni=new Wt,tm=new $e;function nm(i,e,t,n,s,r,o){const a=new We(0);let h=r===!0?0:1,c,l,u=null,d=0,x=null;function b(g){let p=g.isScene===!0?g.background:null;return p&&p.isTexture&&(p=(g.backgroundBlurriness>0?t:e).get(p)),p}function w(g){let p=!1;const T=b(g);T===null?f(a,h):T&&T.isColor&&(f(T,1),p=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||p)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(g,p){const T=b(p);T&&(T.isCubeTexture||T.mapping===Ar)?(l===void 0&&(l=new Ge(new Lt(1,1,1),new Pt({name:"BackgroundCubeMaterial",uniforms:qi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(l)),ni.copy(p.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),l.material.uniforms.envMap.value=T,l.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(ni)),l.material.toneMapped=Je.getTransfer(T.colorSpace)!==it,(u!==T||d!==T.version||x!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,d=T.version,x=i.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Ge(new jn(2,2),new Pt({name:"BackgroundMaterial",uniforms:qi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Je.getTransfer(T.colorSpace)!==it,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||x!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,x=i.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function f(g,p){g.getRGB(tr,uh(i)),n.buffers.color.setClear(tr.r,tr.g,tr.b,p,o)}function v(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(g,p=1){a.set(g),h=p,f(a,h)},getClearAlpha:function(){return h},setClearAlpha:function(g){h=g,f(a,h)},render:w,addToRenderList:m,dispose:v}}function im(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(y,A,P,C,D){let I=!1;const F=u(C,P,A);r!==F&&(r=F,c(r.object)),I=x(y,C,P,D),I&&b(y,C,P,D),D!==null&&e.update(D,i.ELEMENT_ARRAY_BUFFER),(I||o)&&(o=!1,p(y,A,P,C),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function h(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function l(y){return i.deleteVertexArray(y)}function u(y,A,P){const C=P.wireframe===!0;let D=n[y.id];D===void 0&&(D={},n[y.id]=D);let I=D[A.id];I===void 0&&(I={},D[A.id]=I);let F=I[C];return F===void 0&&(F=d(h()),I[C]=F),F}function d(y){const A=[],P=[],C=[];for(let D=0;D<t;D++)A[D]=0,P[D]=0,C[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:P,attributeDivisors:C,object:y,attributes:{},index:null}}function x(y,A,P,C){const D=r.attributes,I=A.attributes;let F=0;const B=P.getAttributes();for(const k in B)if(B[k].location>=0){const J=D[k];let ne=I[k];if(ne===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(ne=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(ne=y.instanceColor)),J===void 0||J.attribute!==ne||ne&&J.data!==ne.data)return!0;F++}return r.attributesNum!==F||r.index!==C}function b(y,A,P,C){const D={},I=A.attributes;let F=0;const B=P.getAttributes();for(const k in B)if(B[k].location>=0){let J=I[k];J===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(J=y.instanceColor));const ne={};ne.attribute=J,J&&J.data&&(ne.data=J.data),D[k]=ne,F++}r.attributes=D,r.attributesNum=F,r.index=C}function w(){const y=r.newAttributes;for(let A=0,P=y.length;A<P;A++)y[A]=0}function m(y){f(y,0)}function f(y,A){const P=r.newAttributes,C=r.enabledAttributes,D=r.attributeDivisors;P[y]=1,C[y]===0&&(i.enableVertexAttribArray(y),C[y]=1),D[y]!==A&&(i.vertexAttribDivisor(y,A),D[y]=A)}function v(){const y=r.newAttributes,A=r.enabledAttributes;for(let P=0,C=A.length;P<C;P++)A[P]!==y[P]&&(i.disableVertexAttribArray(P),A[P]=0)}function g(y,A,P,C,D,I,F){F===!0?i.vertexAttribIPointer(y,A,P,D,I):i.vertexAttribPointer(y,A,P,C,D,I)}function p(y,A,P,C){w();const D=C.attributes,I=P.getAttributes(),F=A.defaultAttributeValues;for(const B in I){const k=I[B];if(k.location>=0){let H=D[B];if(H===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(H=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(H=y.instanceColor)),H!==void 0){const J=H.normalized,ne=H.itemSize,ue=e.get(H);if(ue===void 0)continue;const Q=ue.buffer,G=ue.type,K=ue.bytesPerElement,W=G===i.INT||G===i.UNSIGNED_INT||H.gpuType===Ta;if(H.isInterleavedBufferAttribute){const q=H.data,ae=q.stride,ie=H.offset;if(q.isInstancedInterleavedBuffer){for(let ye=0;ye<k.locationSize;ye++)f(k.location+ye,q.meshPerAttribute);y.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ye=0;ye<k.locationSize;ye++)m(k.location+ye);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let ye=0;ye<k.locationSize;ye++)g(k.location+ye,ne/k.locationSize,G,J,ae*K,(ie+ne/k.locationSize*ye)*K,W)}else{if(H.isInstancedBufferAttribute){for(let q=0;q<k.locationSize;q++)f(k.location+q,H.meshPerAttribute);y.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let q=0;q<k.locationSize;q++)m(k.location+q);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let q=0;q<k.locationSize;q++)g(k.location+q,ne/k.locationSize,G,J,ne*K,ne/k.locationSize*q*K,W)}}else if(F!==void 0){const J=F[B];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(k.location,J);break;case 3:i.vertexAttrib3fv(k.location,J);break;case 4:i.vertexAttrib4fv(k.location,J);break;default:i.vertexAttrib1fv(k.location,J)}}}}v()}function T(){E();for(const y in n){const A=n[y];for(const P in A){const C=A[P];for(const D in C)l(C[D].object),delete C[D];delete A[P]}delete n[y]}}function M(y){if(n[y.id]===void 0)return;const A=n[y.id];for(const P in A){const C=A[P];for(const D in C)l(C[D].object),delete C[D];delete A[P]}delete n[y.id]}function S(y){for(const A in n){const P=n[A];if(P[y.id]===void 0)continue;const C=P[y.id];for(const D in C)l(C[D].object),delete C[D];delete P[y.id]}}function E(){_(),o=!0,r!==s&&(r=s,c(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:_,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfProgram:S,initAttributes:w,enableAttribute:m,disableUnusedAttributes:v}}function sm(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let x=0;for(let b=0;b<u;b++)x+=l[b];t.update(x,n,1)}function h(c,l,u,d){if(u===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let b=0;b<c.length;b++)o(c[b],l[b],d[b]);else{x.multiDrawArraysInstancedWEBGL(n,c,0,l,0,d,0,u);let b=0;for(let w=0;w<u;w++)b+=l[w]*d[w];t.update(b,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=h}function rm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(S){return!(S!==Kt&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const E=S===Ln&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==un&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==vn&&!E)}function h(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const l=h(c);l!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",l,"instead."),c=l);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),x=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),g=i.getParameter(i.MAX_VARYING_VECTORS),p=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=b>0,M=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:x,maxVertexTextures:b,maxTextureSize:w,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:g,maxFragmentUniforms:p,vertexTextures:T,maxSamples:M}}function om(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new kn,a=new Ye,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const x=u.length!==0||d||n!==0||s;return s=d,n=u.length,x},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=l(u,d,0)},this.setState=function(u,d,x){const b=u.clippingPlanes,w=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||b===null||b.length===0||r&&!m)r?l(null):c();else{const v=r?0:n,g=v*4;let p=f.clippingState||null;h.value=p,p=l(b,d,g,x);for(let T=0;T!==g;++T)p[T]=t[T];f.clippingState=p,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=v}};function c(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function l(u,d,x,b){const w=u!==null?u.length:0;let m=null;if(w!==0){if(m=h.value,b!==!0||m===null){const f=x+w*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let g=0,p=x;g!==w;++g,p+=4)o.copy(u[g]).applyMatrix4(v,a),o.normal.toArray(m,p),m[p+3]=o.constant}h.value=m,h.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,m}}function am(i){let e=new WeakMap;function t(o,a){return a===No?o.mapping=Hi:a===Fo&&(o.mapping=Vi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===No||a===Fo)if(e.has(o)){const h=e.get(o).texture;return t(h,o.mapping)}else{const h=o.image;if(h&&h.height>0){const c=new bf(h.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const h=e.get(a);h!==void 0&&(e.delete(a),h.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Fi=4,Jl=[.125,.215,.35,.446,.526,.582],oi=20,ho=new Za,Ql=new We;let uo=null,fo=0,po=0,mo=!1;const ri=(1+Math.sqrt(5))/2,Di=1/ri,ec=[new U(-ri,Di,0),new U(ri,Di,0),new U(-Di,0,ri),new U(Di,0,ri),new U(0,ri,-Di),new U(0,ri,Di),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],lm=new U;class va{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=lm}=r;uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,n,s,h,a),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(uo,fo,po),this._renderer.xr.enabled=mo,e.scissorTest=!1,nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Ln,format:Kt,colorSpace:Xi,depthBuffer:!1},s=tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cm(r)),this._blurMaterial=hm(r,e,t)}return s}_compileMaterial(e){const t=new Ge(this._lodPlanes[0],e);this._renderer.compile(t,ho)}_sceneToCubeUV(e,t,n,s,r){const h=new jt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,x=u.toneMapping;u.getClearColor(Ql),u.toneMapping=qn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const w=new Oa({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),m=new Ge(new Lt,w);let f=!1;const v=e.background;v?v.isColor&&(w.color.copy(v),e.background=null,f=!0):(w.color.copy(Ql),f=!0);for(let g=0;g<6;g++){const p=g%3;p===0?(h.up.set(0,c[g],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+l[g],r.y,r.z)):p===1?(h.up.set(0,0,c[g]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+l[g],r.z)):(h.up.set(0,c[g],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+l[g]));const T=this._cubeSize;nr(s,p*T,g>2?T:0,T,T),u.setRenderTarget(s),f&&u.render(m,h),u.render(e,h)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=x,u.autoClear=d,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Hi||e.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ge(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const h=this._cubeSize;nr(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(o,ho)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ec[(s-r-1)%ec.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const h=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,u=new Ge(this._lodPlanes[s],c),d=c.uniforms,x=this._sizeLods[n]-1,b=isFinite(r)?Math.PI/(2*x):2*Math.PI/(2*oi-1),w=r/b,m=isFinite(r)?1+Math.floor(l*w):oi;m>oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const f=[];let v=0;for(let S=0;S<oi;++S){const E=S/w,_=Math.exp(-E*E/2);f.push(_),S===0?v+=_:S<m&&(v+=2*_)}for(let S=0;S<f.length;S++)f[S]=f[S]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:g}=this;d.dTheta.value=b,d.mipInt.value=g-n;const p=this._sizeLods[s],T=3*p*(s>g-Fi?s-g+Fi:0),M=4*(this._cubeSize-p);nr(t,T,M,3*p,2*p),h.setRenderTarget(t),h.render(u,ho)}}function cm(i){const e=[],t=[],n=[];let s=i;const r=i-Fi+1+Jl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let h=1/a;o>i-Fi?h=Jl[o-i+Fi-1]:o===0&&(h=0),n.push(h);const c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],x=6,b=6,w=3,m=2,f=1,v=new Float32Array(w*b*x),g=new Float32Array(m*b*x),p=new Float32Array(f*b*x);for(let M=0;M<x;M++){const S=M%3*2/3-1,E=M>2?0:-1,_=[S,E,0,S+2/3,E,0,S+2/3,E+1,0,S,E,0,S+2/3,E+1,0,S,E+1,0];v.set(_,w*b*M),g.set(d,m*b*M);const y=[M,M,M,M,M,M];p.set(y,f*b*M)}const T=new Ht;T.setAttribute("position",new Jt(v,w)),T.setAttribute("uv",new Jt(g,m)),T.setAttribute("faceIndex",new Jt(p,f)),e.push(T),s>Fi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function tc(i,e,t){const n=new fn(i,e,t);return n.texture.mapping=Ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function nr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function hm(i,e,t){const n=new Float32Array(oi),s=new U(0,1,0);return new Pt({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ja(),fragmentShader:`

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
		`,blending:At,depthTest:!1,depthWrite:!1})}function nc(){return new Pt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ja(),fragmentShader:`

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
		`,blending:At,depthTest:!1,depthWrite:!1})}function ic(){return new Pt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:At,depthTest:!1,depthWrite:!1})}function ja(){return`

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
	`}function um(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const h=a.mapping,c=h===No||h===Fo,l=h===Hi||h===Vi;if(c||l){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new va(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const x=a.image;return c&&x&&x.height>0||l&&x&&s(x)?(t===null&&(t=new va(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let h=0;const c=6;for(let l=0;l<c;l++)a[l]!==void 0&&h++;return h===c}function r(a){const h=a.target;h.removeEventListener("dispose",r);const c=e.get(h);c!==void 0&&(e.delete(h),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function fm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ys("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function dm(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const b in d.attributes)e.remove(d.attributes[b]);d.removeEventListener("dispose",o),delete s[d.id];const x=r.get(d);x&&(e.remove(x),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function h(u){const d=u.attributes;for(const x in d)e.update(d[x],i.ARRAY_BUFFER)}function c(u){const d=[],x=u.index,b=u.attributes.position;let w=0;if(x!==null){const v=x.array;w=x.version;for(let g=0,p=v.length;g<p;g+=3){const T=v[g+0],M=v[g+1],S=v[g+2];d.push(T,M,M,S,S,T)}}else if(b!==void 0){const v=b.array;w=b.version;for(let g=0,p=v.length/3-1;g<p;g+=3){const T=g+0,M=g+1,S=g+2;d.push(T,M,M,S,S,T)}}else return;const m=new(oh(d)?hh:ch)(d,1);m.version=w;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function l(u){const d=r.get(u);if(d){const x=u.index;x!==null&&d.version<x.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:h,getWireframeAttribute:l}}function pm(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function h(d,x){i.drawElements(n,x,r,d*o),t.update(x,n,1)}function c(d,x,b){b!==0&&(i.drawElementsInstanced(n,x,r,d*o,b),t.update(x,n,b))}function l(d,x,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,x,0,r,d,0,b);let m=0;for(let f=0;f<b;f++)m+=x[f];t.update(m,n,1)}function u(d,x,b,w){if(b===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,x[f],w[f]);else{m.multiDrawElementsInstancedWEBGL(n,x,0,r,d,0,w,0,b);let f=0;for(let v=0;v<b;v++)f+=x[v]*w[v];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=h,this.renderInstances=c,this.renderMultiDraw=l,this.renderMultiDrawInstances=u}function mm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function gm(i,e,t){const n=new WeakMap,s=new at;function r(o,a,h){const c=o.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=l!==void 0?l.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let _=function(){S.dispose(),n.delete(a),a.removeEventListener("dispose",_)};d!==void 0&&d.texture.dispose();const x=a.morphAttributes.position!==void 0,b=a.morphAttributes.normal!==void 0,w=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let g=0;x===!0&&(g=1),b===!0&&(g=2),w===!0&&(g=3);let p=a.attributes.position.count*g,T=1;p>e.maxTextureSize&&(T=Math.ceil(p/e.maxTextureSize),p=e.maxTextureSize);const M=new Float32Array(p*T*4*u),S=new ah(M,p,T,u);S.type=vn,S.needsUpdate=!0;const E=g*4;for(let y=0;y<u;y++){const A=m[y],P=f[y],C=v[y],D=p*T*4*y;for(let I=0;I<A.count;I++){const F=I*E;x===!0&&(s.fromBufferAttribute(A,I),M[D+F+0]=s.x,M[D+F+1]=s.y,M[D+F+2]=s.z,M[D+F+3]=0),b===!0&&(s.fromBufferAttribute(P,I),M[D+F+4]=s.x,M[D+F+5]=s.y,M[D+F+6]=s.z,M[D+F+7]=0),w===!0&&(s.fromBufferAttribute(C,I),M[D+F+8]=s.x,M[D+F+9]=s.y,M[D+F+10]=s.z,M[D+F+11]=C.itemSize===4?s.w:1)}}d={count:u,texture:S,size:new de(p,T)},n.set(a,d),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let x=0;for(let w=0;w<c.length;w++)x+=c[w];const b=a.morphTargetsRelative?1:1-x;h.getUniforms().setValue(i,"morphTargetBaseInfluence",b),h.getUniforms().setValue(i,"morphTargetInfluences",c)}h.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function vm(i,e,t,n){let s=new WeakMap;function r(h){const c=n.render.frame,l=h.geometry,u=e.get(h,l);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),h.isInstancedMesh&&(h.hasEventListener("dispose",a)===!1&&h.addEventListener("dispose",a),s.get(h)!==c&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),s.set(h,c))),h.isSkinnedMesh){const d=h.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(h){const c=h.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Ph=new Dt,sc=new ka(1,1),Dh=new ah,Lh=new af,Ih=new dh,rc=[],oc=[],ac=new Float32Array(16),lc=new Float32Array(9),cc=new Float32Array(4);function ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=rc[s];if(r===void 0&&(r=new Float32Array(s),rc[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function St(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Pr(i,e){let t=oc[e];t===void 0&&(t=new Int32Array(e),oc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _m(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2fv(this.addr,e),bt(t,e)}}function ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;i.uniform3fv(this.addr,e),bt(t,e)}}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4fv(this.addr,e),bt(t,e)}}function Sm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(St(t,n))return;cc.set(n),i.uniformMatrix2fv(this.addr,!1,cc),bt(t,n)}}function bm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(St(t,n))return;lc.set(n),i.uniformMatrix3fv(this.addr,!1,lc),bt(t,n)}}function Em(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(St(t,n))return;ac.set(n),i.uniformMatrix4fv(this.addr,!1,ac),bt(t,n)}}function wm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2iv(this.addr,e),bt(t,e)}}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3iv(this.addr,e),bt(t,e)}}function Rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4iv(this.addr,e),bt(t,e)}}function Cm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2uiv(this.addr,e),bt(t,e)}}function Dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3uiv(this.addr,e),bt(t,e)}}function Lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4uiv(this.addr,e),bt(t,e)}}function Im(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(sc.compareFunction=rh,r=sc):r=Ph,t.setTexture2D(e||r,s)}function Um(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Lh,s)}function Nm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ih,s)}function Fm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Dh,s)}function Om(i){switch(i){case 5126:return _m;case 35664:return xm;case 35665:return ym;case 35666:return Mm;case 35674:return Sm;case 35675:return bm;case 35676:return Em;case 5124:case 35670:return wm;case 35667:case 35671:return Tm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Dm;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Nm;case 36289:case 36303:case 36311:case 36292:return Fm}}function zm(i,e){i.uniform1fv(this.addr,e)}function Bm(i,e){const t=ji(e,this.size,2);i.uniform2fv(this.addr,t)}function km(i,e){const t=ji(e,this.size,3);i.uniform3fv(this.addr,t)}function Hm(i,e){const t=ji(e,this.size,4);i.uniform4fv(this.addr,t)}function Vm(i,e){const t=ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gm(i,e){const t=ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wm(i,e){const t=ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xm(i,e){i.uniform1iv(this.addr,e)}function qm(i,e){i.uniform2iv(this.addr,e)}function Ym(i,e){i.uniform3iv(this.addr,e)}function Zm(i,e){i.uniform4iv(this.addr,e)}function jm(i,e){i.uniform1uiv(this.addr,e)}function $m(i,e){i.uniform2uiv(this.addr,e)}function Km(i,e){i.uniform3uiv(this.addr,e)}function Jm(i,e){i.uniform4uiv(this.addr,e)}function Qm(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Ph,r[o])}function eg(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Lh,r[o])}function tg(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ih,r[o])}function ng(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),bt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Dh,r[o])}function ig(i){switch(i){case 5126:return zm;case 35664:return Bm;case 35665:return km;case 35666:return Hm;case 35674:return Vm;case 35675:return Gm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return qm;case 35668:case 35672:return Ym;case 35669:case 35673:return Zm;case 5125:return jm;case 36294:return $m;case 36295:return Km;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return ng}}class sg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Om(t.type)}}class rg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ig(t.type)}}class og{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const go=/(\w+)(\])?(\[|\.)?/g;function hc(i,e){i.seq.push(e),i.map[e.id]=e}function ag(i,e,t){const n=i.name,s=n.length;for(go.lastIndex=0;;){const r=go.exec(n),o=go.lastIndex;let a=r[1];const h=r[2]==="]",c=r[3];if(h&&(a=a|0),c===void 0||c==="["&&o+2===s){hc(t,c===void 0?new sg(a,i,e):new rg(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new og(a),hc(t,u)),t=u}}}class mr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);ag(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],h=n[a.id];h.needsUpdate!==!1&&a.setValue(e,h.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function uc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const lg=37297;let cg=0;function hg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const fc=new Ye;function ug(i){Je._getMatrix(fc,Je.workingColorSpace,i);const e=`mat3( ${fc.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case yr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function dc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+hg(i.getShaderSource(e),a)}else return r}function fg(i,e){const t=ug(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function dg(i,e){let t;switch(e){case Xc:t="Linear";break;case qc:t="Reinhard";break;case Yc:t="Cineon";break;case wa:t="ACESFilmic";break;case jc:t="AgX";break;case $c:t="Neutral";break;case Zc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ir=new U;function pg(){Je.getLuminanceCoefficients(ir);const i=ir.x.toFixed(4),e=ir.y.toFixed(4),t=ir.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function gg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function us(i){return i!==""}function pc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _g=/^[ \t]*#include +<([\w\d./]+)>/gm;function _a(i){return i.replace(_g,yg)}const xg=new Map;function yg(i,e){let t=je[e];if(t===void 0){const n=xg.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return _a(t)}const Mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gc(i){return i.replace(Mg,Sg)}function Sg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function bg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Vc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Gc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(e="SHADOWMAP_TYPE_VSM"),e}function Eg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hi:case Vi:e="ENVMAP_TYPE_CUBE";break;case Ar:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function Tg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ea:e="ENVMAP_BLENDING_MULTIPLY";break;case bu:e="ENVMAP_BLENDING_MIX";break;case Eu:e="ENVMAP_BLENDING_ADD";break}return e}function Ag(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Rg(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const h=bg(t),c=Eg(t),l=wg(t),u=Tg(t),d=Ag(t),x=mg(t),b=gg(r),w=s.createProgram();let m,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(us).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(us).join(`
`),f.length>0&&(f+=`
`)):(m=[vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),f=[vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?je.tonemapping_pars_fragment:"",t.toneMapping!==qn?dg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,fg("linearToOutputTexel",t.outputColorSpace),pg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(us).join(`
`)),o=_a(o),o=pc(o,t),o=mc(o,t),a=_a(a),a=pc(a,t),a=mc(a,t),o=gc(o),a=gc(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const g=v+m+o,p=v+f+a,T=uc(s,s.VERTEX_SHADER,g),M=uc(s,s.FRAGMENT_SHADER,p);s.attachShader(w,T),s.attachShader(w,M),t.index0AttributeName!==void 0?s.bindAttribLocation(w,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(w,0,"position"),s.linkProgram(w);function S(A){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(w)||"",C=s.getShaderInfoLog(T)||"",D=s.getShaderInfoLog(M)||"",I=P.trim(),F=C.trim(),B=D.trim();let k=!0,H=!0;if(s.getProgramParameter(w,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,w,T,M);else{const J=dc(s,T,"vertex"),ne=dc(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(w,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+I+`
`+J+`
`+ne)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(F===""||B==="")&&(H=!1);H&&(A.diagnostics={runnable:k,programLog:I,vertexShader:{log:F,prefix:m},fragmentShader:{log:B,prefix:f}})}s.deleteShader(T),s.deleteShader(M),E=new mr(s,w),_=vg(s,w)}let E;this.getUniforms=function(){return E===void 0&&S(this),E};let _;this.getAttributes=function(){return _===void 0&&S(this),_};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(w,lg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cg++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=T,this.fragmentShader=M,this}let Cg=0;class Pg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dg(e),t.set(e,n)),n}}class Dg{constructor(e){this.id=Cg++,this.code=e,this.usedTimes=0}}function Lg(i,e,t,n,s,r,o){const a=new Fa,h=new Pg,c=new Set,l=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let x=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,y,A,P,C){const D=P.fog,I=C.geometry,F=_.isMeshStandardMaterial?P.environment:null,B=(_.isMeshStandardMaterial?t:e).get(_.envMap||F),k=B&&B.mapping===Ar?B.image.height:null,H=b[_.type];_.precision!==null&&(x=s.getMaxPrecision(_.precision),x!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",x,"instead."));const J=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ne=J!==void 0?J.length:0;let ue=0;I.morphAttributes.position!==void 0&&(ue=1),I.morphAttributes.normal!==void 0&&(ue=2),I.morphAttributes.color!==void 0&&(ue=3);let Q,G,K,W;if(H){const nt=mn[H];Q=nt.vertexShader,G=nt.fragmentShader}else Q=_.vertexShader,G=_.fragmentShader,h.update(_),K=h.getVertexShaderID(_),W=h.getFragmentShaderID(_);const q=i.getRenderTarget(),ae=i.state.buffers.depth.getReversed(),ie=C.isInstancedMesh===!0,ye=C.isBatchedMesh===!0,Ue=!!_.map,qe=!!_.matcap,O=!!B,le=!!_.aoMap,se=!!_.lightMap,re=!!_.bumpMap,oe=!!_.normalMap,ve=!!_.displacementMap,fe=!!_.emissiveMap,me=!!_.metalnessMap,Fe=!!_.roughnessMap,Ne=_.anisotropy>0,N=_.clearcoat>0,R=_.dispersion>0,Y=_.iridescence>0,z=_.sheen>0,$=_.transmission>0,X=Ne&&!!_.anisotropyMap,Se=N&&!!_.clearcoatMap,he=N&&!!_.clearcoatNormalMap,Ae=N&&!!_.clearcoatRoughnessMap,Pe=Y&&!!_.iridescenceMap,ge=Y&&!!_.iridescenceThicknessMap,we=z&&!!_.sheenColorMap,Be=z&&!!_.sheenRoughnessMap,Ie=!!_.specularMap,be=!!_.specularColorMap,He=!!_.specularIntensityMap,V=$&&!!_.transmissionMap,pe=$&&!!_.thicknessMap,Me=!!_.gradientMap,Ce=!!_.alphaMap,_e=_.alphaTest>0,ce=!!_.alphaHash,Le=!!_.extensions;let Xe=qn;_.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Xe=i.toneMapping);const ct={shaderID:H,shaderType:_.type,shaderName:_.name,vertexShader:Q,fragmentShader:G,defines:_.defines,customVertexShaderID:K,customFragmentShaderID:W,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:x,batching:ye,batchingColor:ye&&C._colorsTexture!==null,instancing:ie,instancingColor:ie&&C.instanceColor!==null,instancingMorph:ie&&C.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:q===null?i.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Xi,alphaToCoverage:!!_.alphaToCoverage,map:Ue,matcap:qe,envMap:O,envMapMode:O&&B.mapping,envMapCubeUVHeight:k,aoMap:le,lightMap:se,bumpMap:re,normalMap:oe,displacementMap:d&&ve,emissiveMap:fe,normalMapObjectSpace:oe&&_.normalMapType===Ru,normalMapTangentSpace:oe&&_.normalMapType===Rr,metalnessMap:me,roughnessMap:Fe,anisotropy:Ne,anisotropyMap:X,clearcoat:N,clearcoatMap:Se,clearcoatNormalMap:he,clearcoatRoughnessMap:Ae,dispersion:R,iridescence:Y,iridescenceMap:Pe,iridescenceThicknessMap:ge,sheen:z,sheenColorMap:we,sheenRoughnessMap:Be,specularMap:Ie,specularColorMap:be,specularIntensityMap:He,transmission:$,transmissionMap:V,thicknessMap:pe,gradientMap:Me,opaque:_.transparent===!1&&_.blending===zi&&_.alphaToCoverage===!1,alphaMap:Ce,alphaTest:_e,alphaHash:ce,combine:_.combine,mapUv:Ue&&w(_.map.channel),aoMapUv:le&&w(_.aoMap.channel),lightMapUv:se&&w(_.lightMap.channel),bumpMapUv:re&&w(_.bumpMap.channel),normalMapUv:oe&&w(_.normalMap.channel),displacementMapUv:ve&&w(_.displacementMap.channel),emissiveMapUv:fe&&w(_.emissiveMap.channel),metalnessMapUv:me&&w(_.metalnessMap.channel),roughnessMapUv:Fe&&w(_.roughnessMap.channel),anisotropyMapUv:X&&w(_.anisotropyMap.channel),clearcoatMapUv:Se&&w(_.clearcoatMap.channel),clearcoatNormalMapUv:he&&w(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&w(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&w(_.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&w(_.iridescenceThicknessMap.channel),sheenColorMapUv:we&&w(_.sheenColorMap.channel),sheenRoughnessMapUv:Be&&w(_.sheenRoughnessMap.channel),specularMapUv:Ie&&w(_.specularMap.channel),specularColorMapUv:be&&w(_.specularColorMap.channel),specularIntensityMapUv:He&&w(_.specularIntensityMap.channel),transmissionMapUv:V&&w(_.transmissionMap.channel),thicknessMapUv:pe&&w(_.thicknessMap.channel),alphaMapUv:Ce&&w(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(oe||Ne),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!I.attributes.uv&&(Ue||Ce),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.flatShading===!0&&_.wireframe===!1,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ae,skinning:C.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ue,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xe,decodeVideoTexture:Ue&&_.map.isVideoTexture===!0&&Je.getTransfer(_.map.colorSpace)===it,decodeVideoTextureEmissive:fe&&_.emissiveMap.isVideoTexture===!0&&Je.getTransfer(_.emissiveMap.colorSpace)===it,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Cn,flipSided:_.side===Bt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Le&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&_.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ct.vertexUv1s=c.has(1),ct.vertexUv2s=c.has(2),ct.vertexUv3s=c.has(3),c.clear(),ct}function f(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const A in _.defines)y.push(A),y.push(_.defines[A]);return _.isRawShaderMaterial===!1&&(v(y,_),g(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function v(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function g(_,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),_.push(a.mask)}function p(_){const y=b[_.type];let A;if(y){const P=mn[y];A=Gn.clone(P.uniforms)}else A=_.uniforms;return A}function T(_,y){let A;for(let P=0,C=l.length;P<C;P++){const D=l[P];if(D.cacheKey===y){A=D,++A.usedTimes;break}}return A===void 0&&(A=new Rg(i,y,_,r),l.push(A)),A}function M(_){if(--_.usedTimes===0){const y=l.indexOf(_);l[y]=l[l.length-1],l.pop(),_.destroy()}}function S(_){h.remove(_)}function E(){h.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:p,acquireProgram:T,releaseProgram:M,releaseShaderCache:S,programs:l,dispose:E}}function Ig(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,h){i.get(o)[a]=h}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ug(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function _c(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,x,b,w,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:x,groupOrder:b,renderOrder:u.renderOrder,z:w,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=x,f.groupOrder=b,f.renderOrder=u.renderOrder,f.z=w,f.group=m),e++,f}function a(u,d,x,b,w,m){const f=o(u,d,x,b,w,m);x.transmission>0?n.push(f):x.transparent===!0?s.push(f):t.push(f)}function h(u,d,x,b,w,m){const f=o(u,d,x,b,w,m);x.transmission>0?n.unshift(f):x.transparent===!0?s.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||Ug),n.length>1&&n.sort(d||_c),s.length>1&&s.sort(d||_c)}function l(){for(let u=e,d=i.length;u<d;u++){const x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:h,finish:l,sort:c}}function Ng(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new xc,i.set(n,[o])):s>=r.length?(o=new xc,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Fg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new We};break;case"SpotLight":t={position:new U,direction:new U,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Og(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let zg=0;function Bg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function kg(i){const e=new Fg,t=Og(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new $e,o=new $e;function a(c){let l=0,u=0,d=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let x=0,b=0,w=0,m=0,f=0,v=0,g=0,p=0,T=0,M=0,S=0;c.sort(Bg);for(let _=0,y=c.length;_<y;_++){const A=c[_],P=A.color,C=A.intensity,D=A.distance,I=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)l+=P.r*C,u+=P.g*C,d+=P.b*C;else if(A.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(A.sh.coefficients[F],C);S++}else if(A.isDirectionalLight){const F=e.get(A);if(F.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const B=A.shadow,k=t.get(A);k.shadowIntensity=B.intensity,k.shadowBias=B.bias,k.shadowNormalBias=B.normalBias,k.shadowRadius=B.radius,k.shadowMapSize=B.mapSize,n.directionalShadow[x]=k,n.directionalShadowMap[x]=I,n.directionalShadowMatrix[x]=A.shadow.matrix,v++}n.directional[x]=F,x++}else if(A.isSpotLight){const F=e.get(A);F.position.setFromMatrixPosition(A.matrixWorld),F.color.copy(P).multiplyScalar(C),F.distance=D,F.coneCos=Math.cos(A.angle),F.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),F.decay=A.decay,n.spot[w]=F;const B=A.shadow;if(A.map&&(n.spotLightMap[T]=A.map,T++,B.updateMatrices(A),A.castShadow&&M++),n.spotLightMatrix[w]=B.matrix,A.castShadow){const k=t.get(A);k.shadowIntensity=B.intensity,k.shadowBias=B.bias,k.shadowNormalBias=B.normalBias,k.shadowRadius=B.radius,k.shadowMapSize=B.mapSize,n.spotShadow[w]=k,n.spotShadowMap[w]=I,p++}w++}else if(A.isRectAreaLight){const F=e.get(A);F.color.copy(P).multiplyScalar(C),F.halfWidth.set(A.width*.5,0,0),F.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=F,m++}else if(A.isPointLight){const F=e.get(A);if(F.color.copy(A.color).multiplyScalar(A.intensity),F.distance=A.distance,F.decay=A.decay,A.castShadow){const B=A.shadow,k=t.get(A);k.shadowIntensity=B.intensity,k.shadowBias=B.bias,k.shadowNormalBias=B.normalBias,k.shadowRadius=B.radius,k.shadowMapSize=B.mapSize,k.shadowCameraNear=B.camera.near,k.shadowCameraFar=B.camera.far,n.pointShadow[b]=k,n.pointShadowMap[b]=I,n.pointShadowMatrix[b]=A.shadow.matrix,g++}n.point[b]=F,b++}else if(A.isHemisphereLight){const F=e.get(A);F.skyColor.copy(A.color).multiplyScalar(C),F.groundColor.copy(A.groundColor).multiplyScalar(C),n.hemi[f]=F,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=u,n.ambient[2]=d;const E=n.hash;(E.directionalLength!==x||E.pointLength!==b||E.spotLength!==w||E.rectAreaLength!==m||E.hemiLength!==f||E.numDirectionalShadows!==v||E.numPointShadows!==g||E.numSpotShadows!==p||E.numSpotMaps!==T||E.numLightProbes!==S)&&(n.directional.length=x,n.spot.length=w,n.rectArea.length=m,n.point.length=b,n.hemi.length=f,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=p,n.spotShadowMap.length=p,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=p+T-M,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=S,E.directionalLength=x,E.pointLength=b,E.spotLength=w,E.rectAreaLength=m,E.hemiLength=f,E.numDirectionalShadows=v,E.numPointShadows=g,E.numSpotShadows=p,E.numSpotMaps=T,E.numLightProbes=S,n.version=zg++)}function h(c,l){let u=0,d=0,x=0,b=0,w=0;const m=l.matrixWorldInverse;for(let f=0,v=c.length;f<v;f++){const g=c[f];if(g.isDirectionalLight){const p=n.directional[u];p.direction.setFromMatrixPosition(g.matrixWorld),s.setFromMatrixPosition(g.target.matrixWorld),p.direction.sub(s),p.direction.transformDirection(m),u++}else if(g.isSpotLight){const p=n.spot[x];p.position.setFromMatrixPosition(g.matrixWorld),p.position.applyMatrix4(m),p.direction.setFromMatrixPosition(g.matrixWorld),s.setFromMatrixPosition(g.target.matrixWorld),p.direction.sub(s),p.direction.transformDirection(m),x++}else if(g.isRectAreaLight){const p=n.rectArea[b];p.position.setFromMatrixPosition(g.matrixWorld),p.position.applyMatrix4(m),o.identity(),r.copy(g.matrixWorld),r.premultiply(m),o.extractRotation(r),p.halfWidth.set(g.width*.5,0,0),p.halfHeight.set(0,g.height*.5,0),p.halfWidth.applyMatrix4(o),p.halfHeight.applyMatrix4(o),b++}else if(g.isPointLight){const p=n.point[d];p.position.setFromMatrixPosition(g.matrixWorld),p.position.applyMatrix4(m),d++}else if(g.isHemisphereLight){const p=n.hemi[w];p.direction.setFromMatrixPosition(g.matrixWorld),p.direction.transformDirection(m),w++}}}return{setup:a,setupView:h,state:n}}function yc(i){const e=new kg(i),t=[],n=[];function s(l){c.camera=l,t.length=0,n.length=0}function r(l){t.push(l)}function o(l){n.push(l)}function a(){e.setup(t)}function h(l){e.setupView(t,l)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:h,pushLight:r,pushShadow:o}}function Hg(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new yc(i),e.set(s,[a])):r>=o.length?(a=new yc(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gg=`uniform sampler2D shadow_pass;
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
}`;function Wg(i,e,t){let n=new Ba;const s=new de,r=new de,o=new at,a=new hd({depthPacking:Au}),h=new ud,c={},l=t.maxTextureSize,u={[Yn]:Bt,[Bt]:Yn,[Cn]:Cn},d=new Pt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:Vg,fragmentShader:Gg}),x=d.clone();x.defines.HORIZONTAL_PASS=1;const b=new Ht;b.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Ge(b,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vc;let f=this.type;this.render=function(M,S,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const _=i.getRenderTarget(),y=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),P=i.state;P.setBlending(At),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const C=f!==Rn&&this.type===Rn,D=f===Rn&&this.type!==Rn;for(let I=0,F=M.length;I<F;I++){const B=M[I],k=B.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const H=k.getFrameExtents();if(s.multiply(H),r.copy(k.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/H.x),s.x=r.x*H.x,k.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/H.y),s.y=r.y*H.y,k.mapSize.y=r.y)),k.map===null||C===!0||D===!0){const ne=this.type!==Rn?{minFilter:kt,magFilter:kt}:{};k.map!==null&&k.map.dispose(),k.map=new fn(s.x,s.y,ne),k.map.texture.name=B.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const J=k.getViewportCount();for(let ne=0;ne<J;ne++){const ue=k.getViewport(ne);o.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),P.viewport(o),k.updateMatrices(B,ne),n=k.getFrustum(),p(S,E,k.camera,B,this.type)}k.isPointLightShadow!==!0&&this.type===Rn&&v(k,E),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(_,y,A)};function v(M,S){const E=e.update(w);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,x.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,x.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new fn(s.x,s.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(S,null,E,d,w,null),x.uniforms.shadow_pass.value=M.mapPass.texture,x.uniforms.resolution.value=M.mapSize,x.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(S,null,E,x,w,null)}function g(M,S,E,_){let y=null;const A=E.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(A!==void 0)y=A;else if(y=E.isPointLight===!0?h:a,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0||S.alphaToCoverage===!0){const P=y.uuid,C=S.uuid;let D=c[P];D===void 0&&(D={},c[P]=D);let I=D[C];I===void 0&&(I=y.clone(),D[C]=I,S.addEventListener("dispose",T)),y=I}if(y.visible=S.visible,y.wireframe=S.wireframe,_===Rn?y.side=S.shadowSide!==null?S.shadowSide:S.side:y.side=S.shadowSide!==null?S.shadowSide:u[S.side],y.alphaMap=S.alphaMap,y.alphaTest=S.alphaToCoverage===!0?.5:S.alphaTest,y.map=S.map,y.clipShadows=S.clipShadows,y.clippingPlanes=S.clippingPlanes,y.clipIntersection=S.clipIntersection,y.displacementMap=S.displacementMap,y.displacementScale=S.displacementScale,y.displacementBias=S.displacementBias,y.wireframeLinewidth=S.wireframeLinewidth,y.linewidth=S.linewidth,E.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const P=i.properties.get(y);P.light=E}return y}function p(M,S,E,_,y){if(M.visible===!1)return;if(M.layers.test(S.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&y===Rn)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,M.matrixWorld);const C=e.update(M),D=M.material;if(Array.isArray(D)){const I=C.groups;for(let F=0,B=I.length;F<B;F++){const k=I[F],H=D[k.materialIndex];if(H&&H.visible){const J=g(M,H,_,y);M.onBeforeShadow(i,M,S,E,C,J,k),i.renderBufferDirect(E,null,C,J,M,k),M.onAfterShadow(i,M,S,E,C,J,k)}}}else if(D.visible){const I=g(M,D,_,y);M.onBeforeShadow(i,M,S,E,C,I,null),i.renderBufferDirect(E,null,C,I,M,null),M.onAfterShadow(i,M,S,E,C,I,null)}}const P=M.children;for(let C=0,D=P.length;C<D;C++)p(P[C],S,E,_,y)}function T(M){M.target.removeEventListener("dispose",T);for(const E in c){const _=c[E],y=M.target.uuid;y in _&&(_[y].dispose(),delete _[y])}}}const Xg={[Ro]:Co,[Po]:Io,[Do]:Uo,[ki]:Lo,[Co]:Ro,[Io]:Po,[Uo]:Do,[Lo]:ki};function qg(i,e){function t(){let V=!1;const pe=new at;let Me=null;const Ce=new at(0,0,0,0);return{setMask:function(_e){Me!==_e&&!V&&(i.colorMask(_e,_e,_e,_e),Me=_e)},setLocked:function(_e){V=_e},setClear:function(_e,ce,Le,Xe,ct){ct===!0&&(_e*=Xe,ce*=Xe,Le*=Xe),pe.set(_e,ce,Le,Xe),Ce.equals(pe)===!1&&(i.clearColor(_e,ce,Le,Xe),Ce.copy(pe))},reset:function(){V=!1,Me=null,Ce.set(-1,0,0,0)}}}function n(){let V=!1,pe=!1,Me=null,Ce=null,_e=null;return{setReversed:function(ce){if(pe!==ce){const Le=e.get("EXT_clip_control");ce?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),pe=ce;const Xe=_e;_e=null,this.setClear(Xe)}},getReversed:function(){return pe},setTest:function(ce){ce?q(i.DEPTH_TEST):ae(i.DEPTH_TEST)},setMask:function(ce){Me!==ce&&!V&&(i.depthMask(ce),Me=ce)},setFunc:function(ce){if(pe&&(ce=Xg[ce]),Ce!==ce){switch(ce){case Ro:i.depthFunc(i.NEVER);break;case Co:i.depthFunc(i.ALWAYS);break;case Po:i.depthFunc(i.LESS);break;case ki:i.depthFunc(i.LEQUAL);break;case Do:i.depthFunc(i.EQUAL);break;case Lo:i.depthFunc(i.GEQUAL);break;case Io:i.depthFunc(i.GREATER);break;case Uo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ce=ce}},setLocked:function(ce){V=ce},setClear:function(ce){_e!==ce&&(pe&&(ce=1-ce),i.clearDepth(ce),_e=ce)},reset:function(){V=!1,Me=null,Ce=null,_e=null,pe=!1}}}function s(){let V=!1,pe=null,Me=null,Ce=null,_e=null,ce=null,Le=null,Xe=null,ct=null;return{setTest:function(nt){V||(nt?q(i.STENCIL_TEST):ae(i.STENCIL_TEST))},setMask:function(nt){pe!==nt&&!V&&(i.stencilMask(nt),pe=nt)},setFunc:function(nt,Mn,dn){(Me!==nt||Ce!==Mn||_e!==dn)&&(i.stencilFunc(nt,Mn,dn),Me=nt,Ce=Mn,_e=dn)},setOp:function(nt,Mn,dn){(ce!==nt||Le!==Mn||Xe!==dn)&&(i.stencilOp(nt,Mn,dn),ce=nt,Le=Mn,Xe=dn)},setLocked:function(nt){V=nt},setClear:function(nt){ct!==nt&&(i.clearStencil(nt),ct=nt)},reset:function(){V=!1,pe=null,Me=null,Ce=null,_e=null,ce=null,Le=null,Xe=null,ct=null}}}const r=new t,o=new n,a=new s,h=new WeakMap,c=new WeakMap;let l={},u={},d=new WeakMap,x=[],b=null,w=!1,m=null,f=null,v=null,g=null,p=null,T=null,M=null,S=new We(0,0,0),E=0,_=!1,y=null,A=null,P=null,C=null,D=null;const I=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,B=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(k)[1]),F=B>=1):k.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),F=B>=2);let H=null,J={};const ne=i.getParameter(i.SCISSOR_BOX),ue=i.getParameter(i.VIEWPORT),Q=new at().fromArray(ne),G=new at().fromArray(ue);function K(V,pe,Me,Ce){const _e=new Uint8Array(4),ce=i.createTexture();i.bindTexture(V,ce),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<Me;Le++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,Ce,0,i.RGBA,i.UNSIGNED_BYTE,_e):i.texImage2D(pe+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_e);return ce}const W={};W[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),W[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),W[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),q(i.DEPTH_TEST),o.setFunc(ki),re(!1),oe(hl),q(i.CULL_FACE),le(At);function q(V){l[V]!==!0&&(i.enable(V),l[V]=!0)}function ae(V){l[V]!==!1&&(i.disable(V),l[V]=!1)}function ie(V,pe){return u[V]!==pe?(i.bindFramebuffer(V,pe),u[V]=pe,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=pe),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function ye(V,pe){let Me=x,Ce=!1;if(V){Me=d.get(pe),Me===void 0&&(Me=[],d.set(pe,Me));const _e=V.textures;if(Me.length!==_e.length||Me[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,Le=_e.length;ce<Le;ce++)Me[ce]=i.COLOR_ATTACHMENT0+ce;Me.length=_e.length,Ce=!0}}else Me[0]!==i.BACK&&(Me[0]=i.BACK,Ce=!0);Ce&&i.drawBuffers(Me)}function Ue(V){return b!==V?(i.useProgram(V),b=V,!0):!1}const qe={[cn]:i.FUNC_ADD,[cu]:i.FUNC_SUBTRACT,[hu]:i.FUNC_REVERSE_SUBTRACT};qe[uu]=i.MIN,qe[fu]=i.MAX;const O={[cs]:i.ZERO,[du]:i.ONE,[pu]:i.SRC_COLOR,[Eo]:i.SRC_ALPHA,[_u]:i.SRC_ALPHA_SATURATE,[Ao]:i.DST_COLOR,[To]:i.DST_ALPHA,[mu]:i.ONE_MINUS_SRC_COLOR,[wo]:i.ONE_MINUS_SRC_ALPHA,[vu]:i.ONE_MINUS_DST_COLOR,[gu]:i.ONE_MINUS_DST_ALPHA,[xu]:i.CONSTANT_COLOR,[yu]:i.ONE_MINUS_CONSTANT_COLOR,[Mu]:i.CONSTANT_ALPHA,[Su]:i.ONE_MINUS_CONSTANT_ALPHA};function le(V,pe,Me,Ce,_e,ce,Le,Xe,ct,nt){if(V===At){w===!0&&(ae(i.BLEND),w=!1);return}if(w===!1&&(q(i.BLEND),w=!0),V!==Wc){if(V!==m||nt!==_){if((f!==cn||p!==cn)&&(i.blendEquation(i.FUNC_ADD),f=cn,p=cn),nt)switch(V){case zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFunc(i.ONE,i.ONE);break;case fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case fl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}v=null,g=null,T=null,M=null,S.set(0,0,0),E=0,m=V,_=nt}return}_e=_e||pe,ce=ce||Me,Le=Le||Ce,(pe!==f||_e!==p)&&(i.blendEquationSeparate(qe[pe],qe[_e]),f=pe,p=_e),(Me!==v||Ce!==g||ce!==T||Le!==M)&&(i.blendFuncSeparate(O[Me],O[Ce],O[ce],O[Le]),v=Me,g=Ce,T=ce,M=Le),(Xe.equals(S)===!1||ct!==E)&&(i.blendColor(Xe.r,Xe.g,Xe.b,ct),S.copy(Xe),E=ct),m=V,_=!1}function se(V,pe){V.side===Cn?ae(i.CULL_FACE):q(i.CULL_FACE);let Me=V.side===Bt;pe&&(Me=!Me),re(Me),V.blending===zi&&V.transparent===!1?le(At):le(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const Ce=V.stencilWrite;a.setTest(Ce),Ce&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),fe(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?q(i.SAMPLE_ALPHA_TO_COVERAGE):ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function re(V){y!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),y=V)}function oe(V){V!==au?(q(i.CULL_FACE),V!==A&&(V===hl?i.cullFace(i.BACK):V===lu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ae(i.CULL_FACE),A=V}function ve(V){V!==P&&(F&&i.lineWidth(V),P=V)}function fe(V,pe,Me){V?(q(i.POLYGON_OFFSET_FILL),(C!==pe||D!==Me)&&(i.polygonOffset(pe,Me),C=pe,D=Me)):ae(i.POLYGON_OFFSET_FILL)}function me(V){V?q(i.SCISSOR_TEST):ae(i.SCISSOR_TEST)}function Fe(V){V===void 0&&(V=i.TEXTURE0+I-1),H!==V&&(i.activeTexture(V),H=V)}function Ne(V,pe,Me){Me===void 0&&(H===null?Me=i.TEXTURE0+I-1:Me=H);let Ce=J[Me];Ce===void 0&&(Ce={type:void 0,texture:void 0},J[Me]=Ce),(Ce.type!==V||Ce.texture!==pe)&&(H!==Me&&(i.activeTexture(Me),H=Me),i.bindTexture(V,pe||W[V]),Ce.type=V,Ce.texture=pe)}function N(){const V=J[H];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function R(){try{i.compressedTexImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Y(){try{i.compressedTexImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function z(){try{i.texSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function $(){try{i.texSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Se(){try{i.compressedTexSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function he(){try{i.texStorage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ae(){try{i.texStorage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Pe(){try{i.texImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ge(){try{i.texImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function we(V){Q.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),Q.copy(V))}function Be(V){G.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),G.copy(V))}function Ie(V,pe){let Me=c.get(pe);Me===void 0&&(Me=new WeakMap,c.set(pe,Me));let Ce=Me.get(V);Ce===void 0&&(Ce=i.getUniformBlockIndex(pe,V.name),Me.set(V,Ce))}function be(V,pe){const Ce=c.get(pe).get(V);h.get(pe)!==Ce&&(i.uniformBlockBinding(pe,Ce,V.__bindingPointIndex),h.set(pe,Ce))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},H=null,J={},u={},d=new WeakMap,x=[],b=null,w=!1,m=null,f=null,v=null,g=null,p=null,T=null,M=null,S=new We(0,0,0),E=0,_=!1,y=null,A=null,P=null,C=null,D=null,Q.set(0,0,i.canvas.width,i.canvas.height),G.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:q,disable:ae,bindFramebuffer:ie,drawBuffers:ye,useProgram:Ue,setBlending:le,setMaterial:se,setFlipSided:re,setCullFace:oe,setLineWidth:ve,setPolygonOffset:fe,setScissorTest:me,activeTexture:Fe,bindTexture:Ne,unbindTexture:N,compressedTexImage2D:R,compressedTexImage3D:Y,texImage2D:Pe,texImage3D:ge,updateUBOMapping:Ie,uniformBlockBinding:be,texStorage2D:he,texStorage3D:Ae,texSubImage2D:z,texSubImage3D:$,compressedTexSubImage2D:X,compressedTexSubImage3D:Se,scissor:we,viewport:Be,reset:He}}function Yg(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,l=new WeakMap;let u;const d=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(N,R){return x?new OffscreenCanvas(N,R):Sr("canvas")}function w(N,R,Y){let z=1;const $=Ne(N);if(($.width>Y||$.height>Y)&&(z=Y/Math.max($.width,$.height)),z<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const X=Math.floor(z*$.width),Se=Math.floor(z*$.height);u===void 0&&(u=b(X,Se));const he=R?b(X,Se):u;return he.width=X,he.height=Se,he.getContext("2d").drawImage(N,0,0,X,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+X+"x"+Se+")."),he}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),N;return N}function m(N){return N.generateMipmaps}function f(N){i.generateMipmap(N)}function v(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function g(N,R,Y,z,$=!1){if(N!==null){if(i[N]!==void 0)return i[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let X=R;if(R===i.RED&&(Y===i.FLOAT&&(X=i.R32F),Y===i.HALF_FLOAT&&(X=i.R16F),Y===i.UNSIGNED_BYTE&&(X=i.R8)),R===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(X=i.R8UI),Y===i.UNSIGNED_SHORT&&(X=i.R16UI),Y===i.UNSIGNED_INT&&(X=i.R32UI),Y===i.BYTE&&(X=i.R8I),Y===i.SHORT&&(X=i.R16I),Y===i.INT&&(X=i.R32I)),R===i.RG&&(Y===i.FLOAT&&(X=i.RG32F),Y===i.HALF_FLOAT&&(X=i.RG16F),Y===i.UNSIGNED_BYTE&&(X=i.RG8)),R===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(X=i.RG8UI),Y===i.UNSIGNED_SHORT&&(X=i.RG16UI),Y===i.UNSIGNED_INT&&(X=i.RG32UI),Y===i.BYTE&&(X=i.RG8I),Y===i.SHORT&&(X=i.RG16I),Y===i.INT&&(X=i.RG32I)),R===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(X=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(X=i.RGB16UI),Y===i.UNSIGNED_INT&&(X=i.RGB32UI),Y===i.BYTE&&(X=i.RGB8I),Y===i.SHORT&&(X=i.RGB16I),Y===i.INT&&(X=i.RGB32I)),R===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),Y===i.UNSIGNED_INT&&(X=i.RGBA32UI),Y===i.BYTE&&(X=i.RGBA8I),Y===i.SHORT&&(X=i.RGBA16I),Y===i.INT&&(X=i.RGBA32I)),R===i.RGB&&(Y===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),R===i.RGBA){const Se=$?yr:Je.getTransfer(z);Y===i.FLOAT&&(X=i.RGBA32F),Y===i.HALF_FLOAT&&(X=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(X=Se===it?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function p(N,R){let Y;return N?R===null||R===ci||R===Gi?Y=i.DEPTH24_STENCIL8:R===vn?Y=i.DEPTH32F_STENCIL8:R===vs&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===ci||R===Gi?Y=i.DEPTH_COMPONENT24:R===vn?Y=i.DEPTH_COMPONENT32F:R===vs&&(Y=i.DEPTH_COMPONENT16),Y}function T(N,R){return m(N)===!0||N.isFramebufferTexture&&N.minFilter!==kt&&N.minFilter!==gn?Math.log2(Math.max(R.width,R.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?R.mipmaps.length:1}function M(N){const R=N.target;R.removeEventListener("dispose",M),E(R),R.isVideoTexture&&l.delete(R)}function S(N){const R=N.target;R.removeEventListener("dispose",S),y(R)}function E(N){const R=n.get(N);if(R.__webglInit===void 0)return;const Y=N.source,z=d.get(Y);if(z){const $=z[R.__cacheKey];$.usedTimes--,$.usedTimes===0&&_(N),Object.keys(z).length===0&&d.delete(Y)}n.remove(N)}function _(N){const R=n.get(N);i.deleteTexture(R.__webglTexture);const Y=N.source,z=d.get(Y);delete z[R.__cacheKey],o.memory.textures--}function y(N){const R=n.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),n.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(R.__webglFramebuffer[z]))for(let $=0;$<R.__webglFramebuffer[z].length;$++)i.deleteFramebuffer(R.__webglFramebuffer[z][$]);else i.deleteFramebuffer(R.__webglFramebuffer[z]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[z])}else{if(Array.isArray(R.__webglFramebuffer))for(let z=0;z<R.__webglFramebuffer.length;z++)i.deleteFramebuffer(R.__webglFramebuffer[z]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let z=0;z<R.__webglColorRenderbuffer.length;z++)R.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[z]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const Y=N.textures;for(let z=0,$=Y.length;z<$;z++){const X=n.get(Y[z]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(Y[z])}n.remove(N)}let A=0;function P(){A=0}function C(){const N=A;return N>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+s.maxTextures),A+=1,N}function D(N){const R=[];return R.push(N.wrapS),R.push(N.wrapT),R.push(N.wrapR||0),R.push(N.magFilter),R.push(N.minFilter),R.push(N.anisotropy),R.push(N.internalFormat),R.push(N.format),R.push(N.type),R.push(N.generateMipmaps),R.push(N.premultiplyAlpha),R.push(N.flipY),R.push(N.unpackAlignment),R.push(N.colorSpace),R.join()}function I(N,R){const Y=n.get(N);if(N.isVideoTexture&&me(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Y.__version!==N.version){const z=N.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(Y,N,R);return}}else N.isExternalTexture&&(Y.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+R)}function F(N,R){const Y=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Y.__version!==N.version){W(Y,N,R);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+R)}function B(N,R){const Y=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Y.__version!==N.version){W(Y,N,R);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+R)}function k(N,R){const Y=n.get(N);if(N.version>0&&Y.__version!==N.version){q(Y,N,R);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+R)}const H={[Dn]:i.REPEAT,[ai]:i.CLAMP_TO_EDGE,[Oo]:i.MIRRORED_REPEAT},J={[kt]:i.NEAREST,[wu]:i.NEAREST_MIPMAP_NEAREST,[Ps]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[Nr]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},ne={[Cu]:i.NEVER,[Nu]:i.ALWAYS,[Pu]:i.LESS,[rh]:i.LEQUAL,[Du]:i.EQUAL,[Uu]:i.GEQUAL,[Lu]:i.GREATER,[Iu]:i.NOTEQUAL};function ue(N,R){if(R.type===vn&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===gn||R.magFilter===Nr||R.magFilter===Ps||R.magFilter===li||R.minFilter===gn||R.minFilter===Nr||R.minFilter===Ps||R.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,H[R.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,H[R.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,H[R.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,J[R.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,J[R.minFilter]),R.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,ne[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===kt||R.minFilter!==Ps&&R.minFilter!==li||R.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(N,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function Q(N,R){let Y=!1;N.__webglInit===void 0&&(N.__webglInit=!0,R.addEventListener("dispose",M));const z=R.source;let $=d.get(z);$===void 0&&($={},d.set(z,$));const X=D(R);if(X!==N.__cacheKey){$[X]===void 0&&($[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),$[X].usedTimes++;const Se=$[N.__cacheKey];Se!==void 0&&($[N.__cacheKey].usedTimes--,Se.usedTimes===0&&_(R)),N.__cacheKey=X,N.__webglTexture=$[X].texture}return Y}function G(N,R,Y){return Math.floor(Math.floor(N/Y)/R)}function K(N,R,Y,z){const X=N.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,R.width,R.height,Y,z,R.data);else{X.sort((ge,we)=>ge.start-we.start);let Se=0;for(let ge=1;ge<X.length;ge++){const we=X[Se],Be=X[ge],Ie=we.start+we.count,be=G(Be.start,R.width,4),He=G(we.start,R.width,4);Be.start<=Ie+1&&be===He&&G(Be.start+Be.count-1,R.width,4)===be?we.count=Math.max(we.count,Be.start+Be.count-we.start):(++Se,X[Se]=Be)}X.length=Se+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),Ae=i.getParameter(i.UNPACK_SKIP_PIXELS),Pe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,R.width);for(let ge=0,we=X.length;ge<we;ge++){const Be=X[ge],Ie=Math.floor(Be.start/4),be=Math.ceil(Be.count/4),He=Ie%R.width,V=Math.floor(Ie/R.width),pe=be,Me=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,He),i.pixelStorei(i.UNPACK_SKIP_ROWS,V),t.texSubImage2D(i.TEXTURE_2D,0,He,V,pe,Me,Y,z,R.data)}N.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ae),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pe)}}function W(N,R,Y){let z=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(z=i.TEXTURE_3D);const $=Q(N,R),X=R.source;t.bindTexture(z,N.__webglTexture,i.TEXTURE0+Y);const Se=n.get(X);if(X.version!==Se.__version||$===!0){t.activeTexture(i.TEXTURE0+Y);const he=Je.getPrimaries(Je.workingColorSpace),Ae=R.colorSpace===Vn?null:Je.getPrimaries(R.colorSpace),Pe=R.colorSpace===Vn||he===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let ge=w(R.image,!1,s.maxTextureSize);ge=Fe(R,ge);const we=r.convert(R.format,R.colorSpace),Be=r.convert(R.type);let Ie=g(R.internalFormat,we,Be,R.colorSpace,R.isVideoTexture);ue(z,R);let be;const He=R.mipmaps,V=R.isVideoTexture!==!0,pe=Se.__version===void 0||$===!0,Me=X.dataReady,Ce=T(R,ge);if(R.isDepthTexture)Ie=p(R.format===Wi,R.type),pe&&(V?t.texStorage2D(i.TEXTURE_2D,1,Ie,ge.width,ge.height):t.texImage2D(i.TEXTURE_2D,0,Ie,ge.width,ge.height,0,we,Be,null));else if(R.isDataTexture)if(He.length>0){V&&pe&&t.texStorage2D(i.TEXTURE_2D,Ce,Ie,He[0].width,He[0].height);for(let _e=0,ce=He.length;_e<ce;_e++)be=He[_e],V?Me&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,be.width,be.height,we,Be,be.data):t.texImage2D(i.TEXTURE_2D,_e,Ie,be.width,be.height,0,we,Be,be.data);R.generateMipmaps=!1}else V?(pe&&t.texStorage2D(i.TEXTURE_2D,Ce,Ie,ge.width,ge.height),Me&&K(R,ge,we,Be)):t.texImage2D(i.TEXTURE_2D,0,Ie,ge.width,ge.height,0,we,Be,ge.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){V&&pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Ie,He[0].width,He[0].height,ge.depth);for(let _e=0,ce=He.length;_e<ce;_e++)if(be=He[_e],R.format!==Kt)if(we!==null)if(V){if(Me)if(R.layerUpdates.size>0){const Le=Kl(be.width,be.height,R.format,R.type);for(const Xe of R.layerUpdates){const ct=be.data.subarray(Xe*Le/be.data.BYTES_PER_ELEMENT,(Xe+1)*Le/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,Xe,be.width,be.height,1,we,ct)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,be.width,be.height,ge.depth,we,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,_e,Ie,be.width,be.height,ge.depth,0,be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else V?Me&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,be.width,be.height,ge.depth,we,Be,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,_e,Ie,be.width,be.height,ge.depth,0,we,Be,be.data)}else{V&&pe&&t.texStorage2D(i.TEXTURE_2D,Ce,Ie,He[0].width,He[0].height);for(let _e=0,ce=He.length;_e<ce;_e++)be=He[_e],R.format!==Kt?we!==null?V?Me&&t.compressedTexSubImage2D(i.TEXTURE_2D,_e,0,0,be.width,be.height,we,be.data):t.compressedTexImage2D(i.TEXTURE_2D,_e,Ie,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):V?Me&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,be.width,be.height,we,Be,be.data):t.texImage2D(i.TEXTURE_2D,_e,Ie,be.width,be.height,0,we,Be,be.data)}else if(R.isDataArrayTexture)if(V){if(pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Ie,ge.width,ge.height,ge.depth),Me)if(R.layerUpdates.size>0){const _e=Kl(ge.width,ge.height,R.format,R.type);for(const ce of R.layerUpdates){const Le=ge.data.subarray(ce*_e/ge.data.BYTES_PER_ELEMENT,(ce+1)*_e/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ce,ge.width,ge.height,1,we,Be,Le)}R.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,we,Be,ge.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,ge.width,ge.height,ge.depth,0,we,Be,ge.data);else if(R.isData3DTexture)V?(pe&&t.texStorage3D(i.TEXTURE_3D,Ce,Ie,ge.width,ge.height,ge.depth),Me&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,we,Be,ge.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,ge.width,ge.height,ge.depth,0,we,Be,ge.data);else if(R.isFramebufferTexture){if(pe)if(V)t.texStorage2D(i.TEXTURE_2D,Ce,Ie,ge.width,ge.height);else{let _e=ge.width,ce=ge.height;for(let Le=0;Le<Ce;Le++)t.texImage2D(i.TEXTURE_2D,Le,Ie,_e,ce,0,we,Be,null),_e>>=1,ce>>=1}}else if(He.length>0){if(V&&pe){const _e=Ne(He[0]);t.texStorage2D(i.TEXTURE_2D,Ce,Ie,_e.width,_e.height)}for(let _e=0,ce=He.length;_e<ce;_e++)be=He[_e],V?Me&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,we,Be,be):t.texImage2D(i.TEXTURE_2D,_e,Ie,we,Be,be);R.generateMipmaps=!1}else if(V){if(pe){const _e=Ne(ge);t.texStorage2D(i.TEXTURE_2D,Ce,Ie,_e.width,_e.height)}Me&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,Be,ge)}else t.texImage2D(i.TEXTURE_2D,0,Ie,we,Be,ge);m(R)&&f(z),Se.__version=X.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function q(N,R,Y){if(R.image.length!==6)return;const z=Q(N,R),$=R.source;t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+Y);const X=n.get($);if($.version!==X.__version||z===!0){t.activeTexture(i.TEXTURE0+Y);const Se=Je.getPrimaries(Je.workingColorSpace),he=R.colorSpace===Vn?null:Je.getPrimaries(R.colorSpace),Ae=R.colorSpace===Vn||Se===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Pe=R.isCompressedTexture||R.image[0].isCompressedTexture,ge=R.image[0]&&R.image[0].isDataTexture,we=[];for(let ce=0;ce<6;ce++)!Pe&&!ge?we[ce]=w(R.image[ce],!0,s.maxCubemapSize):we[ce]=ge?R.image[ce].image:R.image[ce],we[ce]=Fe(R,we[ce]);const Be=we[0],Ie=r.convert(R.format,R.colorSpace),be=r.convert(R.type),He=g(R.internalFormat,Ie,be,R.colorSpace),V=R.isVideoTexture!==!0,pe=X.__version===void 0||z===!0,Me=$.dataReady;let Ce=T(R,Be);ue(i.TEXTURE_CUBE_MAP,R);let _e;if(Pe){V&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,He,Be.width,Be.height);for(let ce=0;ce<6;ce++){_e=we[ce].mipmaps;for(let Le=0;Le<_e.length;Le++){const Xe=_e[Le];R.format!==Kt?Ie!==null?V?Me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le,0,0,Xe.width,Xe.height,Ie,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le,He,Xe.width,Xe.height,0,Xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?Me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le,0,0,Xe.width,Xe.height,Ie,be,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le,He,Xe.width,Xe.height,0,Ie,be,Xe.data)}}}else{if(_e=R.mipmaps,V&&pe){_e.length>0&&Ce++;const ce=Ne(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,He,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(ge){V?Me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,we[ce].width,we[ce].height,Ie,be,we[ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,He,we[ce].width,we[ce].height,0,Ie,be,we[ce].data);for(let Le=0;Le<_e.length;Le++){const ct=_e[Le].image[ce].image;V?Me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le+1,0,0,ct.width,ct.height,Ie,be,ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le+1,He,ct.width,ct.height,0,Ie,be,ct.data)}}else{V?Me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ie,be,we[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,He,Ie,be,we[ce]);for(let Le=0;Le<_e.length;Le++){const Xe=_e[Le];V?Me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le+1,0,0,Ie,be,Xe.image[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Le+1,He,Ie,be,Xe.image[ce])}}}m(R)&&f(i.TEXTURE_CUBE_MAP),X.__version=$.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function ae(N,R,Y,z,$,X){const Se=r.convert(Y.format,Y.colorSpace),he=r.convert(Y.type),Ae=g(Y.internalFormat,Se,he,Y.colorSpace),Pe=n.get(R),ge=n.get(Y);if(ge.__renderTarget=R,!Pe.__hasExternalTextures){const we=Math.max(1,R.width>>X),Be=Math.max(1,R.height>>X);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,X,Ae,we,Be,R.depth,0,Se,he,null):t.texImage2D($,X,Ae,we,Be,0,Se,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,N),fe(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,$,ge.__webglTexture,0,ve(R)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,$,ge.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(N,R,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,N),R.depthBuffer){const z=R.depthTexture,$=z&&z.isDepthTexture?z.type:null,X=p(R.stencilBuffer,$),Se=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=ve(R);fe(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,X,R.width,R.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,X,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,X,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,N)}else{const z=R.textures;for(let $=0;$<z.length;$++){const X=z[$],Se=r.convert(X.format,X.colorSpace),he=r.convert(X.type),Ae=g(X.internalFormat,Se,he,X.colorSpace),Pe=ve(R);Y&&fe(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,Ae,R.width,R.height):fe(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pe,Ae,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ye(N,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,N),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=n.get(R.depthTexture);z.__renderTarget=R,(!z.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),I(R.depthTexture,0);const $=z.__webglTexture,X=ve(R);if(R.depthTexture.format===_s)fe(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(R.depthTexture.format===Wi)fe(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ue(N){const R=n.get(N),Y=N.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==N.depthTexture){const z=N.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),z){const $=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,z.removeEventListener("dispose",$)};z.addEventListener("dispose",$),R.__depthDisposeCallback=$}R.__boundDepthTexture=z}if(N.depthTexture&&!R.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");const z=N.texture.mipmaps;z&&z.length>0?ye(R.__webglFramebuffer[0],N):ye(R.__webglFramebuffer,N)}else if(Y){R.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[z]),R.__webglDepthbuffer[z]===void 0)R.__webglDepthbuffer[z]=i.createRenderbuffer(),ie(R.__webglDepthbuffer[z],N,!1);else{const $=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=R.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,X)}}else{const z=N.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),ie(R.__webglDepthbuffer,N,!1);else{const $=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(N,R,Y){const z=n.get(N);R!==void 0&&ae(z.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&Ue(N)}function O(N){const R=N.texture,Y=n.get(N),z=n.get(R);N.addEventListener("dispose",S);const $=N.textures,X=N.isWebGLCubeRenderTarget===!0,Se=$.length>1;if(Se||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=R.version,o.memory.textures++),X){Y.__webglFramebuffer=[];for(let he=0;he<6;he++)if(R.mipmaps&&R.mipmaps.length>0){Y.__webglFramebuffer[he]=[];for(let Ae=0;Ae<R.mipmaps.length;Ae++)Y.__webglFramebuffer[he][Ae]=i.createFramebuffer()}else Y.__webglFramebuffer[he]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){Y.__webglFramebuffer=[];for(let he=0;he<R.mipmaps.length;he++)Y.__webglFramebuffer[he]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Se)for(let he=0,Ae=$.length;he<Ae;he++){const Pe=n.get($[he]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&fe(N)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let he=0;he<$.length;he++){const Ae=$[he];Y.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[he]);const Pe=r.convert(Ae.format,Ae.colorSpace),ge=r.convert(Ae.type),we=g(Ae.internalFormat,Pe,ge,Ae.colorSpace,N.isXRRenderTarget===!0),Be=ve(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,we,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,Y.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),ie(Y.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),ue(i.TEXTURE_CUBE_MAP,R);for(let he=0;he<6;he++)if(R.mipmaps&&R.mipmaps.length>0)for(let Ae=0;Ae<R.mipmaps.length;Ae++)ae(Y.__webglFramebuffer[he][Ae],N,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ae);else ae(Y.__webglFramebuffer[he],N,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(R)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let he=0,Ae=$.length;he<Ae;he++){const Pe=$[he],ge=n.get(Pe);let we=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(we=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(we,ge.__webglTexture),ue(we,Pe),ae(Y.__webglFramebuffer,N,Pe,i.COLOR_ATTACHMENT0+he,we,0),m(Pe)&&f(we)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(he=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,z.__webglTexture),ue(he,R),R.mipmaps&&R.mipmaps.length>0)for(let Ae=0;Ae<R.mipmaps.length;Ae++)ae(Y.__webglFramebuffer[Ae],N,R,i.COLOR_ATTACHMENT0,he,Ae);else ae(Y.__webglFramebuffer,N,R,i.COLOR_ATTACHMENT0,he,0);m(R)&&f(he),t.unbindTexture()}N.depthBuffer&&Ue(N)}function le(N){const R=N.textures;for(let Y=0,z=R.length;Y<z;Y++){const $=R[Y];if(m($)){const X=v(N),Se=n.get($).__webglTexture;t.bindTexture(X,Se),f(X),t.unbindTexture()}}}const se=[],re=[];function oe(N){if(N.samples>0){if(fe(N)===!1){const R=N.textures,Y=N.width,z=N.height;let $=i.COLOR_BUFFER_BIT;const X=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(N),he=R.length>1;if(he)for(let Pe=0;Pe<R.length;Pe++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const Ae=N.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Pe=0;Pe<R.length;Pe++){if(N.resolveDepthBuffer&&(N.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[Pe]);const ge=n.get(R[Pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ge,0)}i.blitFramebuffer(0,0,Y,z,0,0,Y,z,$,i.NEAREST),h===!0&&(se.length=0,re.length=0,se.push(i.COLOR_ATTACHMENT0+Pe),N.depthBuffer&&N.resolveDepthBuffer===!1&&(se.push(X),re.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,re)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,se))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Pe=0;Pe<R.length;Pe++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,Se.__webglColorRenderbuffer[Pe]);const ge=n.get(R[Pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&h){const R=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function ve(N){return Math.min(s.maxSamples,N.samples)}function fe(N){const R=n.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function me(N){const R=o.render.frame;l.get(N)!==R&&(l.set(N,R),N.update())}function Fe(N,R){const Y=N.colorSpace,z=N.format,$=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Y!==Xi&&Y!==Vn&&(Je.getTransfer(Y)===it?(z!==Kt||$!==un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),R}function Ne(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=C,this.resetTextureUnits=P,this.setTexture2D=I,this.setTexture2DArray=F,this.setTexture3D=B,this.setTextureCube=k,this.rebindTextures=qe,this.setupRenderTarget=O,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=fe}function Zg(i,e){function t(n,s=Vn){let r;const o=Je.getTransfer(s);if(n===un)return i.UNSIGNED_BYTE;if(n===Aa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ra)return i.UNSIGNED_SHORT_5_5_5_1;if(n===eh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===th)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Jc)return i.BYTE;if(n===Qc)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===Ta)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===Ln)return i.HALF_FLOAT;if(n===nh)return i.ALPHA;if(n===ih)return i.RGB;if(n===Kt)return i.RGBA;if(n===_s)return i.DEPTH_COMPONENT;if(n===Wi)return i.DEPTH_STENCIL;if(n===Ca)return i.RED;if(n===Pa)return i.RED_INTEGER;if(n===sh)return i.RG;if(n===Da)return i.RG_INTEGER;if(n===La)return i.RGBA_INTEGER;if(n===ur||n===fr||n===dr||n===pr)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zo||n===Bo||n===ko||n===Ho)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===zo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ko)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ho)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vo||n===Go||n===Wo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vo||n===Go)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xo||n===qo||n===Yo||n===Zo||n===jo||n===$o||n===Ko||n===Jo||n===Qo||n===ea||n===ta||n===na||n===ia||n===sa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Yo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Zo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$o)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ko)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ea)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ta)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===na)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ia)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ra||n===oa||n===aa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ra)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===oa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===aa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===la||n===ca||n===ha||n===ua)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===la)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ca)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ua)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const jg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$g=`
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

}`;class Kg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new vh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pt({vertexShader:jg,fragmentShader:$g,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ge(new jn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jg extends ui{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",h=1,c=null,l=null,u=null,d=null,x=null,b=null;const w=typeof XRWebGLBinding<"u",m=new Kg,f={},v=t.getContextAttributes();let g=null,p=null;const T=[],M=[],S=new de;let E=null;const _=new jt;_.viewport=new at;const y=new jt;y.viewport=new at;const A=[_,y],P=new gd;let C=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let q=T[W];return q===void 0&&(q=new no,T[W]=q),q.getTargetRaySpace()},this.getControllerGrip=function(W){let q=T[W];return q===void 0&&(q=new no,T[W]=q),q.getGripSpace()},this.getHand=function(W){let q=T[W];return q===void 0&&(q=new no,T[W]=q),q.getHandSpace()};function I(W){const q=M.indexOf(W.inputSource);if(q===-1)return;const ae=T[q];ae!==void 0&&(ae.update(W.inputSource,W.frame,c||o),ae.dispatchEvent({type:W.type,data:W.inputSource}))}function F(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",B);for(let W=0;W<T.length;W++){const q=M[W];q!==null&&(M[W]=null,T[W].disconnect(q))}C=null,D=null,m.reset();for(const W in f)delete f[W];e.setRenderTarget(g),x=null,d=null,u=null,s=null,p=null,K.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:x},this.getBinding=function(){return u===null&&w&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return b},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",F),s.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(S),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,ie=null,ye=null;v.depth&&(ye=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=v.stencil?Wi:_s,ie=v.stencil?Gi:ci);const Ue={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ue),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new fn(d.textureWidth,d.textureHeight,{format:Kt,type:un,depthTexture:new ka(d.textureWidth,d.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ae={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};x=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),p=new fn(x.framebufferWidth,x.framebufferHeight,{format:Kt,type:un,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}p.isXRRenderTarget=!0,this.setFoveation(h),c=null,o=await s.requestReferenceSpace(a),K.setContext(s),K.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B(W){for(let q=0;q<W.removed.length;q++){const ae=W.removed[q],ie=M.indexOf(ae);ie>=0&&(M[ie]=null,T[ie].disconnect(ae))}for(let q=0;q<W.added.length;q++){const ae=W.added[q];let ie=M.indexOf(ae);if(ie===-1){for(let Ue=0;Ue<T.length;Ue++)if(Ue>=M.length){M.push(ae),ie=Ue;break}else if(M[Ue]===null){M[Ue]=ae,ie=Ue;break}if(ie===-1)break}const ye=T[ie];ye&&ye.connect(ae)}}const k=new U,H=new U;function J(W,q,ae){k.setFromMatrixPosition(q.matrixWorld),H.setFromMatrixPosition(ae.matrixWorld);const ie=k.distanceTo(H),ye=q.projectionMatrix.elements,Ue=ae.projectionMatrix.elements,qe=ye[14]/(ye[10]-1),O=ye[14]/(ye[10]+1),le=(ye[9]+1)/ye[5],se=(ye[9]-1)/ye[5],re=(ye[8]-1)/ye[0],oe=(Ue[8]+1)/Ue[0],ve=qe*re,fe=qe*oe,me=ie/(-re+oe),Fe=me*-re;if(q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Fe),W.translateZ(me),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),ye[10]===-1)W.projectionMatrix.copy(q.projectionMatrix),W.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const Ne=qe+me,N=O+me,R=ve-Fe,Y=fe+(ie-Fe),z=le*O/N*Ne,$=se*O/N*Ne;W.projectionMatrix.makePerspective(R,Y,z,$,Ne,N),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ne(W,q){q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let q=W.near,ae=W.far;m.texture!==null&&(m.depthNear>0&&(q=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),P.near=y.near=_.near=q,P.far=y.far=_.far=ae,(C!==P.near||D!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),C=P.near,D=P.far),P.layers.mask=W.layers.mask|6,_.layers.mask=P.layers.mask&3,y.layers.mask=P.layers.mask&5;const ie=W.parent,ye=P.cameras;ne(P,ie);for(let Ue=0;Ue<ye.length;Ue++)ne(ye[Ue],ie);ye.length===2?J(P,_,y):P.projectionMatrix.copy(_.projectionMatrix),ue(W,P,ie)};function ue(W,q,ae){ae===null?W.matrix.copy(q.matrixWorld):(W.matrix.copy(ae.matrixWorld),W.matrix.invert(),W.matrix.multiply(q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(q.projectionMatrix),W.projectionMatrixInverse.copy(q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=xs*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&x===null))return h},this.setFoveation=function(W){h=W,d!==null&&(d.fixedFoveation=W),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=W)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(P)},this.getCameraTexture=function(W){return f[W]};let Q=null;function G(W,q){if(l=q.getViewerPose(c||o),b=q,l!==null){const ae=l.views;x!==null&&(e.setRenderTargetFramebuffer(p,x.framebuffer),e.setRenderTarget(p));let ie=!1;ae.length!==P.cameras.length&&(P.cameras.length=0,ie=!0);for(let O=0;O<ae.length;O++){const le=ae[O];let se=null;if(x!==null)se=x.getViewport(le);else{const oe=u.getViewSubImage(d,le);se=oe.viewport,O===0&&(e.setRenderTargetTextures(p,oe.colorTexture,oe.depthStencilTexture),e.setRenderTarget(p))}let re=A[O];re===void 0&&(re=new jt,re.layers.enable(O),re.viewport=new at,A[O]=re),re.matrix.fromArray(le.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(le.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(se.x,se.y,se.width,se.height),O===0&&(P.matrix.copy(re.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),ie===!0&&P.cameras.push(re)}const ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&w){u=n.getBinding();const O=u.getDepthInformation(ae[0]);O&&O.isValid&&O.texture&&m.init(O,s.renderState)}if(ye&&ye.includes("camera-access")&&w){e.state.unbindTexture(),u=n.getBinding();for(let O=0;O<ae.length;O++){const le=ae[O].camera;if(le){let se=f[le];se||(se=new vh,f[le]=se);const re=u.getCameraImage(le);se.sourceTexture=re}}}}for(let ae=0;ae<T.length;ae++){const ie=M[ae],ye=T[ae];ie!==null&&ye!==void 0&&ye.update(ie,q,c||o)}Q&&Q(W,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),b=null}const K=new Ch;K.setAnimationLoop(G),this.setAnimationLoop=function(W){Q=W},this.dispose=function(){}}}const ii=new Wt,Qg=new $e;function ev(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,uh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,v,g,p){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),l(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&x(m,f,p)):f.isMeshMatcapMaterial?(r(m,f),b(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),w(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?h(m,f,v,g):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Bt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Bt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=e.get(f),g=v.envMap,p=v.envMapRotation;g&&(m.envMap.value=g,ii.copy(p),ii.x*=-1,ii.y*=-1,ii.z*=-1,g.isCubeTexture&&g.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),m.envMapRotation.value.setFromMatrix4(Qg.makeRotationFromEuler(ii)),m.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function h(m,f,v,g){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=g*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function x(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Bt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function b(m,f){f.matcap&&(m.matcap.value=f.matcap)}function w(m,f){const v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function tv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(v,g){const p=g.program;n.uniformBlockBinding(v,p)}function c(v,g){let p=s[v.id];p===void 0&&(b(v),p=l(v),s[v.id]=p,v.addEventListener("dispose",m));const T=g.program;n.updateUBOMapping(v,T);const M=e.render.frame;r[v.id]!==M&&(d(v),r[v.id]=M)}function l(v){const g=u();v.__bindingPointIndex=g;const p=i.createBuffer(),T=v.__size,M=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,p),i.bufferData(i.UNIFORM_BUFFER,T,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,p),p}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const g=s[v.id],p=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let M=0,S=p.length;M<S;M++){const E=Array.isArray(p[M])?p[M]:[p[M]];for(let _=0,y=E.length;_<y;_++){const A=E[_];if(x(A,M,_,T)===!0){const P=A.__offset,C=Array.isArray(A.value)?A.value:[A.value];let D=0;for(let I=0;I<C.length;I++){const F=C[I],B=w(F);typeof F=="number"||typeof F=="boolean"?(A.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,P+D,A.__data)):F.isMatrix3?(A.__data[0]=F.elements[0],A.__data[1]=F.elements[1],A.__data[2]=F.elements[2],A.__data[3]=0,A.__data[4]=F.elements[3],A.__data[5]=F.elements[4],A.__data[6]=F.elements[5],A.__data[7]=0,A.__data[8]=F.elements[6],A.__data[9]=F.elements[7],A.__data[10]=F.elements[8],A.__data[11]=0):(F.toArray(A.__data,D),D+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function x(v,g,p,T){const M=v.value,S=g+"_"+p;if(T[S]===void 0)return typeof M=="number"||typeof M=="boolean"?T[S]=M:T[S]=M.clone(),!0;{const E=T[S];if(typeof M=="number"||typeof M=="boolean"){if(E!==M)return T[S]=M,!0}else if(E.equals(M)===!1)return E.copy(M),!0}return!1}function b(v){const g=v.uniforms;let p=0;const T=16;for(let S=0,E=g.length;S<E;S++){const _=Array.isArray(g[S])?g[S]:[g[S]];for(let y=0,A=_.length;y<A;y++){const P=_[y],C=Array.isArray(P.value)?P.value:[P.value];for(let D=0,I=C.length;D<I;D++){const F=C[D],B=w(F),k=p%T,H=k%B.boundary,J=k+H;p+=H,J!==0&&T-J<B.storage&&(p+=T-J),P.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=p,p+=B.storage}}}const M=p%T;return M>0&&(p+=T-M),v.__size=p,v.__cache={},this}function w(v){const g={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(g.boundary=4,g.storage=4):v.isVector2?(g.boundary=8,g.storage=8):v.isVector3||v.isColor?(g.boundary=16,g.storage=12):v.isVector4?(g.boundary=16,g.storage=16):v.isMatrix3?(g.boundary=48,g.storage=48):v.isMatrix4?(g.boundary=64,g.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),g}function m(v){const g=v.target;g.removeEventListener("dispose",m);const p=o.indexOf(g.__bindingPointIndex);o.splice(p,1),i.deleteBuffer(s[g.id]),delete s[g.id],delete r[g.id]}function f(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:h,update:c,dispose:f}}class nv{constructor(e={}){const{canvas:t=Qu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const b=new Uint32Array(4),w=new Int32Array(4);let m=null,f=null;const v=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const p=this;let T=!1;this._outputColorSpace=wt;let M=0,S=0,E=null,_=-1,y=null;const A=new at,P=new at;let C=null;const D=new We(0);let I=0,F=t.width,B=t.height,k=1,H=null,J=null;const ne=new at(0,0,F,B),ue=new at(0,0,F,B);let Q=!1;const G=new Ba;let K=!1,W=!1;const q=new $e,ae=new U,ie=new at,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function qe(){return E===null?k:1}let O=n;function le(L,Z){return t.getContext(L,Z)}try{const L={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ba}`),t.addEventListener("webglcontextlost",Me,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",_e,!1),O===null){const Z="webgl2";if(O=le(Z,L),O===null)throw le(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let se,re,oe,ve,fe,me,Fe,Ne,N,R,Y,z,$,X,Se,he,Ae,Pe,ge,we,Be,Ie,be,He;function V(){se=new fm(O),se.init(),Ie=new Zg(O,se),re=new rm(O,se,e,Ie),oe=new qg(O,se),re.reversedDepthBuffer&&d&&oe.buffers.depth.setReversed(!0),ve=new mm(O),fe=new Ig,me=new Yg(O,se,oe,fe,re,Ie,ve),Fe=new am(p),Ne=new um(p),N=new Md(O),be=new im(O,N),R=new dm(O,N,ve,be),Y=new vm(O,R,N,ve),ge=new gm(O,re,me),he=new om(fe),z=new Lg(p,Fe,Ne,se,re,be,he),$=new ev(p,fe),X=new Ng,Se=new Hg(se),Pe=new nm(p,Fe,Ne,oe,Y,x,h),Ae=new Wg(p,Y,re),He=new tv(O,ve,re,oe),we=new sm(O,se,ve),Be=new pm(O,se,ve),ve.programs=z.programs,p.capabilities=re,p.extensions=se,p.properties=fe,p.renderLists=X,p.shadowMap=Ae,p.state=oe,p.info=ve}V();const pe=new Jg(p,O);this.xr=pe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const L=se.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=se.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(L){L!==void 0&&(k=L,this.setSize(F,B,!1))},this.getSize=function(L){return L.set(F,B)},this.setSize=function(L,Z,ee=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=L,B=Z,t.width=Math.floor(L*k),t.height=Math.floor(Z*k),ee===!0&&(t.style.width=L+"px",t.style.height=Z+"px"),this.setViewport(0,0,L,Z)},this.getDrawingBufferSize=function(L){return L.set(F*k,B*k).floor()},this.setDrawingBufferSize=function(L,Z,ee){F=L,B=Z,k=ee,t.width=Math.floor(L*ee),t.height=Math.floor(Z*ee),this.setViewport(0,0,L,Z)},this.getCurrentViewport=function(L){return L.copy(A)},this.getViewport=function(L){return L.copy(ne)},this.setViewport=function(L,Z,ee,te){L.isVector4?ne.set(L.x,L.y,L.z,L.w):ne.set(L,Z,ee,te),oe.viewport(A.copy(ne).multiplyScalar(k).round())},this.getScissor=function(L){return L.copy(ue)},this.setScissor=function(L,Z,ee,te){L.isVector4?ue.set(L.x,L.y,L.z,L.w):ue.set(L,Z,ee,te),oe.scissor(P.copy(ue).multiplyScalar(k).round())},this.getScissorTest=function(){return Q},this.setScissorTest=function(L){oe.setScissorTest(Q=L)},this.setOpaqueSort=function(L){H=L},this.setTransparentSort=function(L){J=L},this.getClearColor=function(L){return L.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(L=!0,Z=!0,ee=!0){let te=0;if(L){let j=!1;if(E!==null){const xe=E.texture.format;j=xe===La||xe===Da||xe===Pa}if(j){const xe=E.texture.type,Te=xe===un||xe===ci||xe===vs||xe===Gi||xe===Aa||xe===Ra,De=Pe.getClearColor(),Re=Pe.getClearAlpha(),ke=De.r,Ve=De.g,Oe=De.b;Te?(b[0]=ke,b[1]=Ve,b[2]=Oe,b[3]=Re,O.clearBufferuiv(O.COLOR,0,b)):(w[0]=ke,w[1]=Ve,w[2]=Oe,w[3]=Re,O.clearBufferiv(O.COLOR,0,w))}else te|=O.COLOR_BUFFER_BIT}Z&&(te|=O.DEPTH_BUFFER_BIT),ee&&(te|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),Pe.dispose(),X.dispose(),Se.dispose(),fe.dispose(),Fe.dispose(),Ne.dispose(),Y.dispose(),be.dispose(),He.dispose(),z.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",dn),pe.removeEventListener("sessionend",il),$n.stop()};function Me(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const L=ve.autoReset,Z=Ae.enabled,ee=Ae.autoUpdate,te=Ae.needsUpdate,j=Ae.type;V(),ve.autoReset=L,Ae.enabled=Z,Ae.autoUpdate=ee,Ae.needsUpdate=te,Ae.type=j}function _e(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function ce(L){const Z=L.target;Z.removeEventListener("dispose",ce),Le(Z)}function Le(L){Xe(L),fe.remove(L)}function Xe(L){const Z=fe.get(L).programs;Z!==void 0&&(Z.forEach(function(ee){z.releaseProgram(ee)}),L.isShaderMaterial&&z.releaseShaderCache(L))}this.renderBufferDirect=function(L,Z,ee,te,j,xe){Z===null&&(Z=ye);const Te=j.isMesh&&j.matrixWorld.determinant()<0,De=jh(L,Z,ee,te,j);oe.setMaterial(te,Te);let Re=ee.index,ke=1;if(te.wireframe===!0){if(Re=R.getWireframeAttribute(ee),Re===void 0)return;ke=2}const Ve=ee.drawRange,Oe=ee.attributes.position;let Ke=Ve.start*ke,rt=(Ve.start+Ve.count)*ke;xe!==null&&(Ke=Math.max(Ke,xe.start*ke),rt=Math.min(rt,(xe.start+xe.count)*ke)),Re!==null?(Ke=Math.max(Ke,0),rt=Math.min(rt,Re.count)):Oe!=null&&(Ke=Math.max(Ke,0),rt=Math.min(rt,Oe.count));const _t=rt-Ke;if(_t<0||_t===1/0)return;be.setup(j,te,De,ee,Re);let ht,lt=we;if(Re!==null&&(ht=N.get(Re),lt=Be,lt.setIndex(ht)),j.isMesh)te.wireframe===!0?(oe.setLineWidth(te.wireframeLinewidth*qe()),lt.setMode(O.LINES)):lt.setMode(O.TRIANGLES);else if(j.isLine){let ze=te.linewidth;ze===void 0&&(ze=1),oe.setLineWidth(ze*qe()),j.isLineSegments?lt.setMode(O.LINES):j.isLineLoop?lt.setMode(O.LINE_LOOP):lt.setMode(O.LINE_STRIP)}else j.isPoints?lt.setMode(O.POINTS):j.isSprite&&lt.setMode(O.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)ys("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(se.get("WEBGL_multi_draw"))lt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const ze=j._multiDrawStarts,pt=j._multiDrawCounts,Qe=j._multiDrawCount,Xt=Re?N.get(Re).bytesPerElement:1,fi=fe.get(te).currentProgram.getUniforms();for(let qt=0;qt<Qe;qt++)fi.setValue(O,"_gl_DrawID",qt),lt.render(ze[qt]/Xt,pt[qt])}else if(j.isInstancedMesh)lt.renderInstances(Ke,_t,j.count);else if(ee.isInstancedBufferGeometry){const ze=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,pt=Math.min(ee.instanceCount,ze);lt.renderInstances(Ke,_t,pt)}else lt.render(Ke,_t)};function ct(L,Z,ee){L.transparent===!0&&L.side===Cn&&L.forceSinglePass===!1?(L.side=Bt,L.needsUpdate=!0,As(L,Z,ee),L.side=Yn,L.needsUpdate=!0,As(L,Z,ee),L.side=Cn):As(L,Z,ee)}this.compile=function(L,Z,ee=null){ee===null&&(ee=L),f=Se.get(ee),f.init(Z),g.push(f),ee.traverseVisible(function(j){j.isLight&&j.layers.test(Z.layers)&&(f.pushLight(j),j.castShadow&&f.pushShadow(j))}),L!==ee&&L.traverseVisible(function(j){j.isLight&&j.layers.test(Z.layers)&&(f.pushLight(j),j.castShadow&&f.pushShadow(j))}),f.setupLights();const te=new Set;return L.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const xe=j.material;if(xe)if(Array.isArray(xe))for(let Te=0;Te<xe.length;Te++){const De=xe[Te];ct(De,ee,j),te.add(De)}else ct(xe,ee,j),te.add(xe)}),f=g.pop(),te},this.compileAsync=function(L,Z,ee=null){const te=this.compile(L,Z,ee);return new Promise(j=>{function xe(){if(te.forEach(function(Te){fe.get(Te).currentProgram.isReady()&&te.delete(Te)}),te.size===0){j(L);return}setTimeout(xe,10)}se.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let nt=null;function Mn(L){nt&&nt(L)}function dn(){$n.stop()}function il(){$n.start()}const $n=new Ch;$n.setAnimationLoop(Mn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(L){nt=L,pe.setAnimationLoop(L),L===null?$n.stop():$n.start()},pe.addEventListener("sessionstart",dn),pe.addEventListener("sessionend",il),this.render=function(L,Z){if(Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(Z),Z=pe.getCamera()),L.isScene===!0&&L.onBeforeRender(p,L,Z,E),f=Se.get(L,g.length),f.init(Z),g.push(f),q.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G.setFromProjectionMatrix(q,_n,Z.reversedDepth),W=this.localClippingEnabled,K=he.init(this.clippingPlanes,W),m=X.get(L,v.length),m.init(),v.push(m),pe.enabled===!0&&pe.isPresenting===!0){const xe=p.xr.getDepthSensingMesh();xe!==null&&Dr(xe,Z,-1/0,p.sortObjects)}Dr(L,Z,0,p.sortObjects),m.finish(),p.sortObjects===!0&&m.sort(H,J),Ue=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,Ue&&Pe.addToRenderList(m,L),this.info.render.frame++,K===!0&&he.beginShadows();const ee=f.state.shadowsArray;Ae.render(ee,L,Z),K===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=m.opaque,j=m.transmissive;if(f.setupLights(),Z.isArrayCamera){const xe=Z.cameras;if(j.length>0)for(let Te=0,De=xe.length;Te<De;Te++){const Re=xe[Te];rl(te,j,L,Re)}Ue&&Pe.render(L);for(let Te=0,De=xe.length;Te<De;Te++){const Re=xe[Te];sl(m,L,Re,Re.viewport)}}else j.length>0&&rl(te,j,L,Z),Ue&&Pe.render(L),sl(m,L,Z);E!==null&&S===0&&(me.updateMultisampleRenderTarget(E),me.updateRenderTargetMipmap(E)),L.isScene===!0&&L.onAfterRender(p,L,Z),be.resetDefaultState(),_=-1,y=null,g.pop(),g.length>0?(f=g[g.length-1],K===!0&&he.setGlobalState(p.clippingPlanes,f.state.camera)):f=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Dr(L,Z,ee,te){if(L.visible===!1)return;if(L.layers.test(Z.layers)){if(L.isGroup)ee=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(Z);else if(L.isLight)f.pushLight(L),L.castShadow&&f.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||G.intersectsSprite(L)){te&&ie.setFromMatrixPosition(L.matrixWorld).applyMatrix4(q);const Te=Y.update(L),De=L.material;De.visible&&m.push(L,Te,De,ee,ie.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||G.intersectsObject(L))){const Te=Y.update(L),De=L.material;if(te&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),ie.copy(L.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ie.copy(Te.boundingSphere.center)),ie.applyMatrix4(L.matrixWorld).applyMatrix4(q)),Array.isArray(De)){const Re=Te.groups;for(let ke=0,Ve=Re.length;ke<Ve;ke++){const Oe=Re[ke],Ke=De[Oe.materialIndex];Ke&&Ke.visible&&m.push(L,Te,Ke,ee,ie.z,Oe)}}else De.visible&&m.push(L,Te,De,ee,ie.z,null)}}const xe=L.children;for(let Te=0,De=xe.length;Te<De;Te++)Dr(xe[Te],Z,ee,te)}function sl(L,Z,ee,te){const j=L.opaque,xe=L.transmissive,Te=L.transparent;f.setupLightsView(ee),K===!0&&he.setGlobalState(p.clippingPlanes,ee),te&&oe.viewport(A.copy(te)),j.length>0&&Ts(j,Z,ee),xe.length>0&&Ts(xe,Z,ee),Te.length>0&&Ts(Te,Z,ee),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function rl(L,Z,ee,te){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[te.id]===void 0&&(f.state.transmissionRenderTarget[te.id]=new fn(1,1,{generateMipmaps:!0,type:se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float")?Ln:un,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const xe=f.state.transmissionRenderTarget[te.id],Te=te.viewport||A;xe.setSize(Te.z*p.transmissionResolutionScale,Te.w*p.transmissionResolutionScale);const De=p.getRenderTarget(),Re=p.getActiveCubeFace(),ke=p.getActiveMipmapLevel();p.setRenderTarget(xe),p.getClearColor(D),I=p.getClearAlpha(),I<1&&p.setClearColor(16777215,.5),p.clear(),Ue&&Pe.render(ee);const Ve=p.toneMapping;p.toneMapping=qn;const Oe=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),f.setupLightsView(te),K===!0&&he.setGlobalState(p.clippingPlanes,te),Ts(L,ee,te),me.updateMultisampleRenderTarget(xe),me.updateRenderTargetMipmap(xe),se.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let rt=0,_t=Z.length;rt<_t;rt++){const ht=Z[rt],lt=ht.object,ze=ht.geometry,pt=ht.material,Qe=ht.group;if(pt.side===Cn&&lt.layers.test(te.layers)){const Xt=pt.side;pt.side=Bt,pt.needsUpdate=!0,ol(lt,ee,te,ze,pt,Qe),pt.side=Xt,pt.needsUpdate=!0,Ke=!0}}Ke===!0&&(me.updateMultisampleRenderTarget(xe),me.updateRenderTargetMipmap(xe))}p.setRenderTarget(De,Re,ke),p.setClearColor(D,I),Oe!==void 0&&(te.viewport=Oe),p.toneMapping=Ve}function Ts(L,Z,ee){const te=Z.isScene===!0?Z.overrideMaterial:null;for(let j=0,xe=L.length;j<xe;j++){const Te=L[j],De=Te.object,Re=Te.geometry,ke=Te.group;let Ve=Te.material;Ve.allowOverride===!0&&te!==null&&(Ve=te),De.layers.test(ee.layers)&&ol(De,Z,ee,Re,Ve,ke)}}function ol(L,Z,ee,te,j,xe){L.onBeforeRender(p,Z,ee,te,j,xe),L.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),j.onBeforeRender(p,Z,ee,te,L,xe),j.transparent===!0&&j.side===Cn&&j.forceSinglePass===!1?(j.side=Bt,j.needsUpdate=!0,p.renderBufferDirect(ee,Z,te,j,L,xe),j.side=Yn,j.needsUpdate=!0,p.renderBufferDirect(ee,Z,te,j,L,xe),j.side=Cn):p.renderBufferDirect(ee,Z,te,j,L,xe),L.onAfterRender(p,Z,ee,te,j,xe)}function As(L,Z,ee){Z.isScene!==!0&&(Z=ye);const te=fe.get(L),j=f.state.lights,xe=f.state.shadowsArray,Te=j.state.version,De=z.getParameters(L,j.state,xe,Z,ee),Re=z.getProgramCacheKey(De);let ke=te.programs;te.environment=L.isMeshStandardMaterial?Z.environment:null,te.fog=Z.fog,te.envMap=(L.isMeshStandardMaterial?Ne:Fe).get(L.envMap||te.environment),te.envMapRotation=te.environment!==null&&L.envMap===null?Z.environmentRotation:L.envMapRotation,ke===void 0&&(L.addEventListener("dispose",ce),ke=new Map,te.programs=ke);let Ve=ke.get(Re);if(Ve!==void 0){if(te.currentProgram===Ve&&te.lightsStateVersion===Te)return ll(L,De),Ve}else De.uniforms=z.getUniforms(L),L.onBeforeCompile(De,p),Ve=z.acquireProgram(De,Re),ke.set(Re,Ve),te.uniforms=De.uniforms;const Oe=te.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Oe.clippingPlanes=he.uniform),ll(L,De),te.needsLights=Kh(L),te.lightsStateVersion=Te,te.needsLights&&(Oe.ambientLightColor.value=j.state.ambient,Oe.lightProbe.value=j.state.probe,Oe.directionalLights.value=j.state.directional,Oe.directionalLightShadows.value=j.state.directionalShadow,Oe.spotLights.value=j.state.spot,Oe.spotLightShadows.value=j.state.spotShadow,Oe.rectAreaLights.value=j.state.rectArea,Oe.ltc_1.value=j.state.rectAreaLTC1,Oe.ltc_2.value=j.state.rectAreaLTC2,Oe.pointLights.value=j.state.point,Oe.pointLightShadows.value=j.state.pointShadow,Oe.hemisphereLights.value=j.state.hemi,Oe.directionalShadowMap.value=j.state.directionalShadowMap,Oe.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Oe.spotShadowMap.value=j.state.spotShadowMap,Oe.spotLightMatrix.value=j.state.spotLightMatrix,Oe.spotLightMap.value=j.state.spotLightMap,Oe.pointShadowMap.value=j.state.pointShadowMap,Oe.pointShadowMatrix.value=j.state.pointShadowMatrix),te.currentProgram=Ve,te.uniformsList=null,Ve}function al(L){if(L.uniformsList===null){const Z=L.currentProgram.getUniforms();L.uniformsList=mr.seqWithValue(Z.seq,L.uniforms)}return L.uniformsList}function ll(L,Z){const ee=fe.get(L);ee.outputColorSpace=Z.outputColorSpace,ee.batching=Z.batching,ee.batchingColor=Z.batchingColor,ee.instancing=Z.instancing,ee.instancingColor=Z.instancingColor,ee.instancingMorph=Z.instancingMorph,ee.skinning=Z.skinning,ee.morphTargets=Z.morphTargets,ee.morphNormals=Z.morphNormals,ee.morphColors=Z.morphColors,ee.morphTargetsCount=Z.morphTargetsCount,ee.numClippingPlanes=Z.numClippingPlanes,ee.numIntersection=Z.numClipIntersection,ee.vertexAlphas=Z.vertexAlphas,ee.vertexTangents=Z.vertexTangents,ee.toneMapping=Z.toneMapping}function jh(L,Z,ee,te,j){Z.isScene!==!0&&(Z=ye),me.resetTextureUnits();const xe=Z.fog,Te=te.isMeshStandardMaterial?Z.environment:null,De=E===null?p.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Xi,Re=(te.isMeshStandardMaterial?Ne:Fe).get(te.envMap||Te),ke=te.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,Ve=!!ee.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Oe=!!ee.morphAttributes.position,Ke=!!ee.morphAttributes.normal,rt=!!ee.morphAttributes.color;let _t=qn;te.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(_t=p.toneMapping);const ht=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,lt=ht!==void 0?ht.length:0,ze=fe.get(te),pt=f.state.lights;if(K===!0&&(W===!0||L!==y)){const It=L===y&&te.id===_;he.setState(te,L,It)}let Qe=!1;te.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==pt.state.version||ze.outputColorSpace!==De||j.isBatchedMesh&&ze.batching===!1||!j.isBatchedMesh&&ze.batching===!0||j.isBatchedMesh&&ze.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&ze.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&ze.instancing===!1||!j.isInstancedMesh&&ze.instancing===!0||j.isSkinnedMesh&&ze.skinning===!1||!j.isSkinnedMesh&&ze.skinning===!0||j.isInstancedMesh&&ze.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&ze.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&ze.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&ze.instancingMorph===!1&&j.morphTexture!==null||ze.envMap!==Re||te.fog===!0&&ze.fog!==xe||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==he.numPlanes||ze.numIntersection!==he.numIntersection)||ze.vertexAlphas!==ke||ze.vertexTangents!==Ve||ze.morphTargets!==Oe||ze.morphNormals!==Ke||ze.morphColors!==rt||ze.toneMapping!==_t||ze.morphTargetsCount!==lt)&&(Qe=!0):(Qe=!0,ze.__version=te.version);let Xt=ze.currentProgram;Qe===!0&&(Xt=As(te,Z,j));let fi=!1,qt=!1,Ki=!1;const mt=Xt.getUniforms(),en=ze.uniforms;if(oe.useProgram(Xt.program)&&(fi=!0,qt=!0,Ki=!0),te.id!==_&&(_=te.id,qt=!0),fi||y!==L){oe.buffers.depth.getReversed()&&L.reversedDepth!==!0&&(L._reversedDepth=!0,L.updateProjectionMatrix()),mt.setValue(O,"projectionMatrix",L.projectionMatrix),mt.setValue(O,"viewMatrix",L.matrixWorldInverse);const Vt=mt.map.cameraPosition;Vt!==void 0&&Vt.setValue(O,ae.setFromMatrixPosition(L.matrixWorld)),re.logarithmicDepthBuffer&&mt.setValue(O,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&mt.setValue(O,"isOrthographic",L.isOrthographicCamera===!0),y!==L&&(y=L,qt=!0,Ki=!0)}if(j.isSkinnedMesh){mt.setOptional(O,j,"bindMatrix"),mt.setOptional(O,j,"bindMatrixInverse");const It=j.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),mt.setValue(O,"boneTexture",It.boneTexture,me))}j.isBatchedMesh&&(mt.setOptional(O,j,"batchingTexture"),mt.setValue(O,"batchingTexture",j._matricesTexture,me),mt.setOptional(O,j,"batchingIdTexture"),mt.setValue(O,"batchingIdTexture",j._indirectTexture,me),mt.setOptional(O,j,"batchingColorTexture"),j._colorsTexture!==null&&mt.setValue(O,"batchingColorTexture",j._colorsTexture,me));const tn=ee.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&ge.update(j,ee,Xt),(qt||ze.receiveShadow!==j.receiveShadow)&&(ze.receiveShadow=j.receiveShadow,mt.setValue(O,"receiveShadow",j.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(en.envMap.value=Re,en.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&Z.environment!==null&&(en.envMapIntensity.value=Z.environmentIntensity),qt&&(mt.setValue(O,"toneMappingExposure",p.toneMappingExposure),ze.needsLights&&$h(en,Ki),xe&&te.fog===!0&&$.refreshFogUniforms(en,xe),$.refreshMaterialUniforms(en,te,k,B,f.state.transmissionRenderTarget[L.id]),mr.upload(O,al(ze),en,me)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(mr.upload(O,al(ze),en,me),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&mt.setValue(O,"center",j.center),mt.setValue(O,"modelViewMatrix",j.modelViewMatrix),mt.setValue(O,"normalMatrix",j.normalMatrix),mt.setValue(O,"modelMatrix",j.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const It=te.uniformsGroups;for(let Vt=0,Lr=It.length;Vt<Lr;Vt++){const Kn=It[Vt];He.update(Kn,Xt),He.bind(Kn,Xt)}}return Xt}function $h(L,Z){L.ambientLightColor.needsUpdate=Z,L.lightProbe.needsUpdate=Z,L.directionalLights.needsUpdate=Z,L.directionalLightShadows.needsUpdate=Z,L.pointLights.needsUpdate=Z,L.pointLightShadows.needsUpdate=Z,L.spotLights.needsUpdate=Z,L.spotLightShadows.needsUpdate=Z,L.rectAreaLights.needsUpdate=Z,L.hemisphereLights.needsUpdate=Z}function Kh(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(L,Z,ee){const te=fe.get(L);te.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),fe.get(L.texture).__webglTexture=Z,fe.get(L.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:ee,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,Z){const ee=fe.get(L);ee.__webglFramebuffer=Z,ee.__useDefaultFramebuffer=Z===void 0};const Jh=O.createFramebuffer();this.setRenderTarget=function(L,Z=0,ee=0){E=L,M=Z,S=ee;let te=!0,j=null,xe=!1,Te=!1;if(L){const Re=fe.get(L);if(Re.__useDefaultFramebuffer!==void 0)oe.bindFramebuffer(O.FRAMEBUFFER,null),te=!1;else if(Re.__webglFramebuffer===void 0)me.setupRenderTarget(L);else if(Re.__hasExternalTextures)me.rebindTextures(L,fe.get(L.texture).__webglTexture,fe.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const Oe=L.depthTexture;if(Re.__boundDepthTexture!==Oe){if(Oe!==null&&fe.has(Oe)&&(L.width!==Oe.image.width||L.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(L)}}const ke=L.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Te=!0);const Ve=fe.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ve[Z])?j=Ve[Z][ee]:j=Ve[Z],xe=!0):L.samples>0&&me.useMultisampledRTT(L)===!1?j=fe.get(L).__webglMultisampledFramebuffer:Array.isArray(Ve)?j=Ve[ee]:j=Ve,A.copy(L.viewport),P.copy(L.scissor),C=L.scissorTest}else A.copy(ne).multiplyScalar(k).floor(),P.copy(ue).multiplyScalar(k).floor(),C=Q;if(ee!==0&&(j=Jh),oe.bindFramebuffer(O.FRAMEBUFFER,j)&&te&&oe.drawBuffers(L,j),oe.viewport(A),oe.scissor(P),oe.setScissorTest(C),xe){const Re=fe.get(L.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Re.__webglTexture,ee)}else if(Te){const Re=Z;for(let ke=0;ke<L.textures.length;ke++){const Ve=fe.get(L.textures[ke]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+ke,Ve.__webglTexture,ee,Re)}}else if(L!==null&&ee!==0){const Re=fe.get(L.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Re.__webglTexture,ee)}_=-1},this.readRenderTargetPixels=function(L,Z,ee,te,j,xe,Te,De=0){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=fe.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re){oe.bindFramebuffer(O.FRAMEBUFFER,Re);try{const ke=L.textures[De],Ve=ke.format,Oe=ke.type;if(!re.textureFormatReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=L.width-te&&ee>=0&&ee<=L.height-j&&(L.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+De),O.readPixels(Z,ee,te,j,Ie.convert(Ve),Ie.convert(Oe),xe))}finally{const ke=E!==null?fe.get(E).__webglFramebuffer:null;oe.bindFramebuffer(O.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(L,Z,ee,te,j,xe,Te,De=0){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=fe.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re)if(Z>=0&&Z<=L.width-te&&ee>=0&&ee<=L.height-j){oe.bindFramebuffer(O.FRAMEBUFFER,Re);const ke=L.textures[De],Ve=ke.format,Oe=ke.type;if(!re.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ke),O.bufferData(O.PIXEL_PACK_BUFFER,xe.byteLength,O.STREAM_READ),L.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+De),O.readPixels(Z,ee,te,j,Ie.convert(Ve),Ie.convert(Oe),0);const rt=E!==null?fe.get(E).__webglFramebuffer:null;oe.bindFramebuffer(O.FRAMEBUFFER,rt);const _t=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await ef(O,_t,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ke),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xe),O.deleteBuffer(Ke),O.deleteSync(_t),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,Z=null,ee=0){const te=Math.pow(2,-ee),j=Math.floor(L.image.width*te),xe=Math.floor(L.image.height*te),Te=Z!==null?Z.x:0,De=Z!==null?Z.y:0;me.setTexture2D(L,0),O.copyTexSubImage2D(O.TEXTURE_2D,ee,0,0,Te,De,j,xe),oe.unbindTexture()};const Qh=O.createFramebuffer(),eu=O.createFramebuffer();this.copyTextureToTexture=function(L,Z,ee=null,te=null,j=0,xe=null){xe===null&&(j!==0?(ys("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=j,j=0):xe=0);let Te,De,Re,ke,Ve,Oe,Ke,rt,_t;const ht=L.isCompressedTexture?L.mipmaps[xe]:L.image;if(ee!==null)Te=ee.max.x-ee.min.x,De=ee.max.y-ee.min.y,Re=ee.isBox3?ee.max.z-ee.min.z:1,ke=ee.min.x,Ve=ee.min.y,Oe=ee.isBox3?ee.min.z:0;else{const tn=Math.pow(2,-j);Te=Math.floor(ht.width*tn),De=Math.floor(ht.height*tn),L.isDataArrayTexture?Re=ht.depth:L.isData3DTexture?Re=Math.floor(ht.depth*tn):Re=1,ke=0,Ve=0,Oe=0}te!==null?(Ke=te.x,rt=te.y,_t=te.z):(Ke=0,rt=0,_t=0);const lt=Ie.convert(Z.format),ze=Ie.convert(Z.type);let pt;Z.isData3DTexture?(me.setTexture3D(Z,0),pt=O.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(me.setTexture2DArray(Z,0),pt=O.TEXTURE_2D_ARRAY):(me.setTexture2D(Z,0),pt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,Z.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,Z.unpackAlignment);const Qe=O.getParameter(O.UNPACK_ROW_LENGTH),Xt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),fi=O.getParameter(O.UNPACK_SKIP_PIXELS),qt=O.getParameter(O.UNPACK_SKIP_ROWS),Ki=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ht.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ht.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ke),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ve),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Oe);const mt=L.isDataArrayTexture||L.isData3DTexture,en=Z.isDataArrayTexture||Z.isData3DTexture;if(L.isDepthTexture){const tn=fe.get(L),It=fe.get(Z),Vt=fe.get(tn.__renderTarget),Lr=fe.get(It.__renderTarget);oe.bindFramebuffer(O.READ_FRAMEBUFFER,Vt.__webglFramebuffer),oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,Lr.__webglFramebuffer);for(let Kn=0;Kn<Re;Kn++)mt&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,fe.get(L).__webglTexture,j,Oe+Kn),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,fe.get(Z).__webglTexture,xe,_t+Kn)),O.blitFramebuffer(ke,Ve,Te,De,Ke,rt,Te,De,O.DEPTH_BUFFER_BIT,O.NEAREST);oe.bindFramebuffer(O.READ_FRAMEBUFFER,null),oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(j!==0||L.isRenderTargetTexture||fe.has(L)){const tn=fe.get(L),It=fe.get(Z);oe.bindFramebuffer(O.READ_FRAMEBUFFER,Qh),oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,eu);for(let Vt=0;Vt<Re;Vt++)mt?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,tn.__webglTexture,j,Oe+Vt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,tn.__webglTexture,j),en?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,It.__webglTexture,xe,_t+Vt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,It.__webglTexture,xe),j!==0?O.blitFramebuffer(ke,Ve,Te,De,Ke,rt,Te,De,O.COLOR_BUFFER_BIT,O.NEAREST):en?O.copyTexSubImage3D(pt,xe,Ke,rt,_t+Vt,ke,Ve,Te,De):O.copyTexSubImage2D(pt,xe,Ke,rt,ke,Ve,Te,De);oe.bindFramebuffer(O.READ_FRAMEBUFFER,null),oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else en?L.isDataTexture||L.isData3DTexture?O.texSubImage3D(pt,xe,Ke,rt,_t,Te,De,Re,lt,ze,ht.data):Z.isCompressedArrayTexture?O.compressedTexSubImage3D(pt,xe,Ke,rt,_t,Te,De,Re,lt,ht.data):O.texSubImage3D(pt,xe,Ke,rt,_t,Te,De,Re,lt,ze,ht):L.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,xe,Ke,rt,Te,De,lt,ze,ht.data):L.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,xe,Ke,rt,ht.width,ht.height,lt,ht.data):O.texSubImage2D(O.TEXTURE_2D,xe,Ke,rt,Te,De,lt,ze,ht);O.pixelStorei(O.UNPACK_ROW_LENGTH,Qe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Xt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,fi),O.pixelStorei(O.UNPACK_SKIP_ROWS,qt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ki),xe===0&&Z.generateMipmaps&&O.generateMipmap(pt),oe.unbindTexture()},this.initRenderTarget=function(L){fe.get(L).__webglFramebuffer===void 0&&me.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?me.setTextureCube(L,0):L.isData3DTexture?me.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?me.setTexture2DArray(L,0):me.setTexture2D(L,0),oe.unbindTexture()},this.resetState=function(){M=0,S=0,E=null,oe.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}const fs=["前往库位","伸叉取框","抬升取框","收叉载货","运行到出口","下降到交接高度","伸叉交接","放框到输送线","收回货叉","输送至出口缓存"],Uh=i=>i*i*(3-2*i),gr=(i,e,t)=>i+(e-i)*t;function Nh(i,e){const t=i.params,n=e.index<t.smallBays*t.smallLevels,s=n?e.index:e.index-t.smallBays*t.smallLevels,r=n?t.smallLevels:t.largeLevels,o=n?t.smallPitch:t.largePitch,a=n?t.smallStep:t.largeStep,h=t.smallBays*t.smallPitch+t.largeBays*t.largePitch,c=new U(-h/2+(n?0:t.smallBays*t.smallPitch)+(Math.floor(s/r)+.5)*o,.1775+s%r*a,0),l=new $e().compose(new U(...i.position),new zt().setFromEuler(new Wt(...i.rotation.map(Tt.degToRad))),new U(...i.scale));return{position:c.applyMatrix4(l).toArray(),width:o*(e.size===2?.94:.82)*i.scale[0],height:a*(e.size===2?.82:.72)*i.scale[1],depth:t.depth*.85*i.scale[2],color:e.size===1?"#539fa7":e.size===2?"#718d9e":"#8b8b91"}}function $a(i){const e=i.find(n=>n.type==="hardwareConveyorAssembly");if(!e)return[];const t=e.params.laneCenters;return!Array.isArray(t)||t.length!==4?[]:[...t].sort((n,s)=>s-n).map((n,s)=>({code:String(101+s),z:e.position[2]+n*e.scale[2],x:e.position[0]-e.params.length*e.scale[0]/2+.35,assembly:e}))}function vr(i,e){return Number(i)!==2||["103","104"].includes(String(e))}function Ka(i){var t;if(i.dockMode)return i.dockMode;const e=Number((t=i.id.match(/^hardware-rack-link-(\d)$/))==null?void 0:t[1]);return[0,2].includes(e)?"inbound":[1,3].includes(e)?"outbound":null}function Fh(i){const e=i.params,t=e.exhibitionDetail?e.chainDeck?.0555:e.crossBelt?.0355:e.flatDeck?.0645:.09:.185;return i.position[1]+(e.height+t)*i.scale[1]}function iv(i,e,t,n){const s=$a(i),r=s.find(w=>w.code===String(n));if(!r)throw Error("请选择目标出货口（101～104）");const o=i.filter(w=>w.type==="binRack"&&w.aisle===t.aisle),a=i.find(w=>w.type==="conveyor"&&w.id.startsWith("hardware-rack-link-")&&Ka(w)==="outbound"&&o.some(m=>Math.abs(w.position[2]-m.position[2])<.01));if(!a)throw Error("该巷道缺少出库专用接驳工位");const h=r.assembly;if(h.rotation.some(w=>Math.abs(w)>.001)||h.scale.some(w=>Math.abs(w-1)>.001))throw Error("请保持输送线总装原始朝向与比例后下达任务");const c=a.position[0]+a.params.length/2-.45,l=a.position[2],u=Fh(a),d=h.position[1]+h.params.height,x=u-.185,b=[[c,u,l],[h.position[0]+.43,d,l],[h.position[0]+.43,d,r.z],[h.position[0]-.43,d,r.z],[r.x,d,r.z]];return{id:"hardware-port-"+r.code,portCode:r.code,aisle:t.aisle,side:"A",direction:-1,x:c,z:l,height:x,length:a.params.length,width:a.params.width,route:b,capacity:Sa,dockId:a.id,dockMode:"outbound"}}const Oh=i=>i.slice(1).reduce((e,t,n)=>e+Math.hypot(...t.map((s,r)=>s-i[n][r])),0);function Ja(i,e){let t=Oh(i)*Math.max(0,Math.min(1,e));for(let n=1;n<i.length;n++){const s=i[n-1],r=i[n],o=Math.hypot(...r.map((a,h)=>a-s[h]));if(t<=o&&o>0)return s.map((a,h)=>gr(a,r[h],t/o));t-=o}return i.at(-1)}function sv(i,e,t,n,s){const r=i.slots.find(S=>S.id===t),o=e.find(S=>S.id===(r==null?void 0:r.deviceId));if(!(r!=null&&r.occupied)||(o==null?void 0:o.type)!=="binRack")throw Error("请选择有料框的料框库库位");if(n.route&&kc(i)>=Sa)throw Error("输送线已预留10个料框，请等待空位");if(n.portCode&&!vr(r.size,n.portCode))throw Error("大料筐只能出库至103、104工位");if(n.route){const S=e.find(E=>E.id===n.dockId);if(!S||Ka(S)!=="outbound")throw Error("入库专用工位禁止放置出库料框")}if(i.tasks.some(S=>S.type==="outbound"&&S.source===t&&S.status!=="completed"))throw Error("该料框已有出库任务");const a=e.find(S=>S.type==="stacker"&&S.aisle===o.aisle);if(r.size===2&&o.aisle!==2)throw Error("大料筐只能从二号巷道出库");if(!a||!i.devices[a.id]||["fault","maintenance"].includes(i.devices[a.id].status))throw Error("对应巷道的堆垛机不可用");if(i.tasks.filter(S=>S.type==="outbound"&&S.station.id===n.id&&!S.collected).length>=(n.capacity||3))throw Error("该出口缓存已满，请先确认取走已完成的料框");if([o,a].some(S=>S.rotation.some(E=>Math.abs(E)>.001)||S.scale.some(E=>Math.abs(E-1)>.001)))throw Error("当前出库演示需要货架和堆垛机保持原始朝向与比例");const h=Nh(o,r),[c,l,u]=h.position,d=c-a.position[0],x=l-a.position[1]-.1775,b=u-a.position[2];if(Math.abs(d)+1.33>a.params.railLength/2||Math.abs(n.x-a.position[0])+1.33>a.params.railLength/2)throw Error("轨道长度不足，请延长堆垛机轨道后出库");const w={travel:s.travel,lift:s.lift,extension:0},m={travel:d,lift:Math.max(0,x-.04),extension:0},f={travel:n.x-a.position[0],lift:n.height+.185-a.position[1]-.1775+.04,extension:0},v=[m,{...m,extension:b},{...m,lift:x+.04,extension:b},{...m,lift:x+.04,extension:0},{...f,lift:Math.max(x,.8)},f,{...f,extension:n.z-a.position[2]},{...f,lift:f.lift-.04,extension:n.z-a.position[2]},{...f,lift:f.lift-.04},{...f,lift:f.lift-.04}],g=v.map((S,E)=>{const _=E?v[E-1]:w;return E===9?n.route?Math.max(4,Oh(n.route)/.45):4:Math.max(1.1,Math.abs(S.travel-_.travel)/3,Math.abs(S.lift-_.lift)/1.5,Math.abs(S.extension-_.extension)/.6)}),p=i.tasks.some(S=>S.deviceId===a.id&&Ma(S)),T={type:"outbound",code:`OUT-${String((i.outboundSequence||0)+1).padStart(4,"0")}`,source:r.id,deviceId:a.id,from:r.location,destinationPort:n.portCode||null,to:n.portCode?`${n.portCode} 出货口`:`${n.side}端 · 巷道${o.aisle}输送线`,status:p?"queued":"running",progress:0,phase:0,phaseElapsed:0,stage:p?"等待堆垛机":fs[0],start:w,targets:v,durations:g,station:n,geometry:h,stackerPosition:[...a.position],cargo:{boxId:r.boxId??r.id,boxCode:r.boxCode||r.location,size:r.size,sku:r.sku,product:r.product,quantity:r.quantity,batch:r.batch,items:r.items||[]},cargoState:"rack",pose:w},M=i.tasks.filter(S=>S.type==="outbound"&&S.station.id===n.id&&!S.collected).map(S=>S.bufferIndex);if(T.bufferIndex=M.length?Math.max(...M)+1:0,T.bufferIndex>=(n.capacity||3))throw Error("出口剩余缓存暂不可到达，请待任务完成并取走出口料框后再下达");return i.outboundSequence=(i.outboundSequence||0)+1,i.manualOutbound=!0,i.tasks.unshift(T),i.events.unshift({time:i.elapsed,message:`${T.code}：${T.from} → ${T.to}，料框出库任务已下达`}),T}function vo(i,e,t){i.events.unshift({time:i.elapsed,message:`${e.code}：${t}`}),i.events=i.events.slice(0,40)}function Mc(i,e,t){for(const n of i.inventory||[])n.boxId===e.cargo.boxId&&(n.locationId=null,n.placement=t)}function rv(i,e,t){var s;let n=!1;for(const r of i.tasks.filter(o=>o.type==="outbound"&&o.status==="running")){const o=i.devices[r.deviceId];if(!o||["fault","maintenance"].includes(o.status))continue;let a=e;for(;a>0&&r.status==="running";){if(r.stage=fs[r.phase],r.phase===6&&i.tasks.some(m=>m!==r&&!m.collected&&m.cargoState==="conveyor"&&(()=>{const f=m.type==="outbound"?zh(m):m.returnRouteDone?[m.station.x,m.station.height+.185,m.station.z]:m.returnRoute?Ja(m.returnRoute,m.phase===0?m.phaseElapsed/m.durations[0]:1):null;return f&&Math.abs(f[0]-r.station.x)<(r.geometry.width+m.geometry.width)/2+.06&&Math.abs(f[2]-r.station.z)<(r.geometry.depth+m.geometry.depth)/2+.06})())){r.stage="等待出库接驳空位";break}const h=r.phase,c=r.durations[h],l=Math.min(a,c-r.phaseElapsed,r.phase===9&&((s=r.station.route)!=null&&s.length)?.1:1/0);if(r.phase===9&&!zc(r,i,r.phaseElapsed+l)){r.stage="等待交汇输送段";break}r.phaseElapsed+=l,a-=l;const u=h?r.targets[h-1]:r.start,d=r.targets[h],x=Uh(Math.min(1,r.phaseElapsed/c));r.pose={travel:gr(u.travel,d.travel,x),lift:gr(u.lift,d.lift,x),extension:gr(u.extension,d.extension,x)};const b=r.durations.reduce((m,f)=>m+f,0),w=r.durations.slice(0,h).reduce((m,f)=>m+f,0)+r.phaseElapsed;if(r.progress=Math.min(100,Math.round(w/b*100)),Xn(r)&&(o.status="running",o.travel=r.pose.travel,o.lift=r.pose.lift),r.phaseElapsed<c-1e-8){if(a>0)continue;break}if(Hc(r,h,2,9))break;if(h===2){const m=i.slots.find(f=>f.id===r.source);m.occupied=!1;for(const f of["sku","product","batch","boxCode"])m[f]="";m.boxId=null,m.quantity=null,m.items=[],m.size=0,r.cargoState="fork",Mc(i,r,"堆垛机货叉"),n=!0,vo(i,r,"料框已取上货叉，源库位已释放")}h===7&&(r.cargoState="conveyor",Mc(i,r,r.to),vo(i,r,"料框已交接到输送线")),h===9&&Bc(r),r.phase++,r.phaseElapsed=0,r.phase===9&&(o.status="idle"),r.phase===fs.length?(r.status="completed",r.stage="已到出口缓存",r.progress=100,i.completed++,o.completed++,i.tasks.some(m=>m!==r&&m.deviceId===r.deviceId&&Xn(m))||(o.status="idle"),vo(i,r,"出库完成，等待出口取走")):r.stage=fs[r.phase]}}for(const r of[...i.tasks].reverse().filter(o=>o.type==="outbound"&&o.status==="queued")){if(i.tasks.some(h=>h!==r&&h.deviceId===r.deviceId&&Xn(h)))continue;const o=i.tasks.find(h=>["outbound","inbound"].includes(h.type)&&h.deviceId===r.deviceId&&h.status==="completed"),a=t==null?void 0:t(r.deviceId);r.phase===0&&(a?r.start={...a,extension:a.extension??0}:o&&(r.start={...o.pose}),r.durations[0]=Math.max(1.1,Math.abs(r.targets[0].travel-r.start.travel)/3,Math.abs(r.targets[0].lift-r.start.lift)/1.5),r.pose={...r.start}),r.status="running",r.stage=fs[r.phase]}return n}function zh(i,e){const{pose:t,stackerPosition:n,station:s}=i;if(i.cargoState==="fork")return[n[0]+t.travel,n[1]+t.lift+.1775,n[2]+t.extension];if(i.cargoState==="conveyor"){const r=i.status==="completed"?1:i.phase===9?Uh(i.phaseElapsed/i.durations[9]):0;return s.route?Ja(s.route,r):[s.x+s.direction*(4.6-i.bufferIndex*1.3)*r,s.height+.185,s.z]}return i.geometry.position}function ov(i,e=""){const t=new tt,{width:n,height:s,depth:r,color:o}=i,a=(c,l,u,d,x,b,w)=>{const m=new Ge(new Lt(d,x,b),new ft({color:w,roughness:.45,metalness:.25}));m.position.set(c,l,u),m.castShadow=!0,t.add(m)};a(0,.0125,0,n,.025,r,o);for(const c of[-1,1])a(0,s/2+.0225,c*r/2,n,s,.024,o),a(c*n/2,s/2+.0225,0,.024,s,r,o),a(0,s+.0225,c*r/2,n,.035,.045,"#8a9baa"),a(0,s*.55-.0275,c*(r/2+.016),.12,.055,.026,"#d9e0d9");const h=String(e??"").trim();if(h){const c=document.createElement("canvas");c.width=512,c.height=160;const l=c.getContext("2d");l.textAlign="center",l.textBaseline="middle";let u=80;for(l.font=`bold ${u}px Microsoft YaHei, sans-serif`;l.measureText(h).width>472&&u>16;)u-=2,l.font=`bold ${u}px Microsoft YaHei, sans-serif`;l.fillStyle="rgba(220,239,242,0.65)",l.fillText(h,256,84,472),l.fillStyle="#233c46",l.fillText(h,256,80,472);const d=new In(c);d.colorSpace=wt;const x=n*.82,b=Math.min(s*.25,x*160/512);for(const w of[-1,1]){const m=new Ge(new jn(x,b),new ft({map:d,transparent:!0,depthTest:!0,depthWrite:!1,roughness:.65,metalness:.2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));m.name="cargo-box-code",m.userData.boxCode=h,m.position.set(0,s*.78+.0225,w*(r/2+.013)),m.rotation.y=w===1?0:Math.PI,t.add(m)}t.userData.ownedTexture=d}return t}function av(i,e){let t=!1,n=0,s=-1,r=0;const o=new Map,a=new Map;function h(d="连续演示已暂停"){e.enabled=!1,e.message=d,i.setRunning(!1)}function c(){e.started=!0,e.enabled=!0,e.error="",e.message="随机选择料框与空闲工位",i.setRunning(!0)}function l(){r++,n=0,s=-1,o.clear(),a.clear(),e.started=!1,e.enabled=!1,e.cycles=0,e.message="",e.error=""}async function u(d){var g,p;if(!e.enabled||!i.running()||(n+=d,t||i.dbBusy()||n-s<1))return;s=n;const x=i.state(),b=i.objects(),w=x.tasks;e.cycles=w.filter(T=>T.autoDemo&&!T.initialReset&&T.type==="inbound"&&T.status==="completed").length;let m;const f=[];for(const T of w.filter(M=>M.autoDemo&&M.type==="outbound"&&M.status==="completed"&&!M.collected)){if(!Sc({size:T.cargo.size,index:-1},b.filter(S=>S.type==="binRack"),x)){e.message=`${T.destinationPort} 工位等待大料筐匹配空库位，其他任务继续`;continue}if(w.some(S=>{var E;return S.type==="inbound"&&((E=S.cargo)==null?void 0:E.boxCode)===T.cargo.boxCode&&["submitting","queued","running"].includes(S.status)})||(((g=a.get(T.code))==null?void 0:g.until)??0)>n)continue;o.has(T.code)||o.set(T.code,n);const M=Math.max(0,Math.ceil(8-(n-o.get(T.code))));if(M){e.message=`${T.destinationPort} 工位模拟取货 · ${M}秒后回库`;continue}f.push(T)}if(!m){const T=kc(x)>=Sa?[]:i.ports().filter(C=>!w.some(D=>D.type==="inbound"&&D.entryPort===C.code&&D.status!=="completed"||D.type==="outbound"&&D.destinationPort===C.code&&D.status==="completed"&&!D.collected)),M=b.filter(C=>C.type==="binRack"),S=b.filter(C=>{var D;return C.type==="stacker"&&!["fault","maintenance"].includes((D=x.devices[C.id])==null?void 0:D.status)&&!w.some(I=>I.deviceId===C.id&&Ma(I))}),_=x.slots.filter(C=>C.occupied&&C.boxCode&&(x.source!=="SQL"||[1,2].includes(C.size))&&S.some(D=>M.some(I=>I.id===C.deviceId&&I.aisle===D.aisle&&(C.size!==2||I.aisle===2)))&&!w.some(D=>D.source===C.id&&D.status!=="completed")).filter(C=>T.some(D=>vr(C.size,D.code))&&Sc(C,M,x)),y=C=>w.find(D=>D.deviceId===C.id&&D.status==="completed"&&!D.initialReset),A=C=>{var D;return(D=M.find(I=>I.id===C.deviceId))==null?void 0:D.aisle},P=_.filter(C=>S.some(D=>{var I;return D.aisle===A(C)&&((I=y(D))==null?void 0:I.type)==="inbound"}));if(P.length){const C=P[Math.floor(Math.random()*P.length)],D=T.filter(I=>vr(C.size,I.code));m={type:"outbound",slotId:C.id,port:D[Math.floor(Math.random()*D.length)].code}}if(!m)for(const C of f){const D=S.filter(F=>Number(C.cargo.size)!==2||F.aisle===2),I=D.find(F=>{var B;return((B=y(F))==null?void 0:B.type)==="outbound"})??D[0];if(!(!I&&b.some(F=>F.type==="stacker"))){m={type:"inbound",boxCode:C.cargo.boxCode,port:C.destinationPort,returnTaskCode:C.code,preferredAisle:I==null?void 0:I.aisle};break}}if(!m&&_.length){const C=_[Math.floor(Math.random()*_.length)],D=T.filter(I=>vr(C.size,I.code));m={type:"outbound",slotId:C.id,port:D[Math.floor(Math.random()*D.length)].code}}}if(!m){w.some(T=>T.autoDemo&&T.type==="outbound"&&T.status==="completed"&&!T.collected)||(e.message="等待工位、堆垛机或可用料框");return}t=!0;const v=r;try{await i.dispatch(m),v===r&&(m.returnTaskCode&&a.delete(m.returnTaskCode),e.enabled&&(e.message=m.type==="inbound"?`${m.port} 工位料框自动回库`:`料框自动出库至 ${m.port} 工位`))}catch(T){if(v!==r)return;if(T.status===409||/繁忙|没有可用|已有待取|占用|预留/.test(T.message)){if(m.returnTaskCode){const M=(((p=a.get(m.returnTaskCode))==null?void 0:p.attempts)??0)+1;a.set(m.returnTaskCode,{attempts:M,until:n+Math.min(120,15*2**(M-1))})}else s=n+2;e.message=T.message+"，等待后重试，其他可用任务继续"}else e.error=T.message,h("连续演示暂停："+T.message),i.notify(e.message)}finally{t=!1}}return{start:c,pause:h,reset:l,advance:u}}function Sc(i,e,t){if(t.source!=="SQL"||Number(i.size)!==2)return!0;const n=s=>{const r=e.find(o=>o.id===s.deviceId);return(r==null?void 0:r.aisle)===2&&s.index>=r.params.smallBays*r.params.smallLevels};return n(i)||t.slots.some(s=>!s.occupied&&n(s)&&!t.tasks.some(r=>r.type==="inbound"&&r.target===s.id&&r.status!=="completed"))}const _r=["前往入库工位","下降到取框高度","伸叉取框","抬升取框","收叉载货","运行到目标库位","伸叉入库","放框入库","收回货叉"],lv=i=>i*i*(3-2*i),_o=(i,e,t)=>i+(e-i)*t;function xa(i){return i.filter(e=>e.type==="conveyor"&&e.id.startsWith("hardware-rack-link-")&&Ka(e)==="inbound").map(e=>{var t;return{id:e.id,name:e.name,link:e,aisle:(t=i.find(n=>n.type==="binRack"&&Math.abs(n.position[2]-e.position[2])<.01))==null?void 0:t.aisle}})}function cv(i,e,{dockId:t,targetId:n,boxCode:s,product:r="",quantity:o=1,entryPort:a},h){var ae;const c=xa(e).find(ie=>ie.id===t),l=i.slots.find(ie=>ie.id===n),u=e.find(ie=>ie.id===(l==null?void 0:l.deviceId));if(!c)throw Error("请选择红色入库专用工位，出库工位不能接收入库料框");if(!l||(u==null?void 0:u.type)!=="binRack")throw Error("请选择空闲目标库位");if(l.occupied)throw Error(`目标库位 ${l.location} 已有料框 ${l.boxCode||""}，请选择其他空闲库位`);if(u.aisle!==c.aisle)throw Error("入库工位与目标库位必须位于同一巷道");if(!(s!=null&&s.trim()))throw Error("请输入料框编号");if(!Number.isFinite(o)||o<=0)throw Error("入库数量必须大于零");const d=i.slots.find(ie=>ie.occupied&&ie.boxCode===s.trim());if(d)throw Error(`料框 ${s.trim()} 已在库位 ${d.location}，不能重复入库`);if(i.tasks.find(ie=>{var ye;return!ie.collected&&((ye=ie.cargo)==null?void 0:ye.boxCode)===s.trim()&&!(a&&ie.type==="outbound"&&ie.status==="completed"&&ie.destinationPort===a)}))throw Error("该料框仍有未完成任务或所在工位不一致");if(i.tasks.some(ie=>ie.type==="inbound"&&ie.target===n&&ie.status!=="completed"))throw Error("该库位已被入库任务预留");if(i.tasks.some(ie=>ie.type==="inbound"&&ie.dockId===t&&ie.cargoState==="conveyor"))throw Error("入库工位已有料框，请等待堆垛机取走");const b=e.find(ie=>ie.type==="stacker"&&ie.aisle===u.aisle),w=i.devices[b==null?void 0:b.id];if(!w||["fault","maintenance"].includes(w.status))throw Error("对应巷道堆垛机不可用");if([u,b,c.link].some(ie=>ie.rotation.some(ye=>Math.abs(ye)>.001)||ie.scale.some(ye=>Math.abs(ye-1)>.001)))throw Error("入库演示需要设备保持原始朝向和比例");const m=i.source==="SQL"?(ae=i.allBoxes)==null?void 0:ae.find(ie=>ie.code===s.trim()):null;if(i.source==="SQL"&&!m)throw Error("真实入库需使用已有料框编号，请选择库外料框");const f=l.index<u.params.smallBays*u.params.smallLevels,v=(m==null?void 0:m.size)??(f?1:2);if(![1,2].includes(v))throw Error("料框规格未定义，禁止入库");if(v===1&&!f)throw Error("小料框只能存入小仓位");if(v===2&&(u.aisle!==2||f))throw Error("大料筐只能存入二号巷道的大筐库位");const g=Nh(u,{...l,size:v}),p={x:c.link.position[0]+c.link.params.length/2-.45,z:c.link.position[2],height:Fh(c.link)-.185},T=p.x-b.position[0],M=p.height+.185-b.position[1]-.1775,S=p.z-b.position[2],[E,_,y]=g.position,A=E-b.position[0],P=_-b.position[1]-.1775,C=y-b.position[2];if(Math.max(Math.abs(A),Math.abs(T))+1.33>b.params.railLength/2)throw Error("堆垛机轨道不足，无法到达工位或目标库位");const D={travel:h.travel,lift:h.lift,extension:0},I={travel:T,lift:M,extension:0},F={travel:A,lift:P+.04,extension:0},B=[{...I,lift:Math.min(D.lift,M)},I,{...I,extension:S},{...I,lift:M+.04,extension:S},{...I,lift:M+.04},F,{...F,extension:C},{...F,lift:P,extension:C},{...F,lift:P}],k=B.map((ie,ye)=>{const Ue=ye?B[ye-1]:D;return Math.max(1.1,Math.abs(ie.travel-Ue.travel)/2,Math.abs(ie.lift-Ue.lift),Math.abs(ie.extension-Ue.extension)/.5)}),H=i.tasks.some(ie=>ie.deviceId===b.id&&Ma(ie)),J=`IN-${String((i.inboundSequence||0)+1).padStart(4,"0")}`,ne=m?(i.inventory||[]).filter(ie=>ie.boxId===m.id):[],ue=m?{boxId:m.id,boxCode:m.code,size:v,product:ne.map(ie=>ie.product).join("、"),sku:ne.map(ie=>ie.sku).join(", "),quantity:null,batch:"",items:ne}:{boxId:J,boxCode:s.trim(),size:v,product:r.trim(),sku:"",quantity:o,batch:"",items:[]},Q=a?$a(e).find(ie=>ie.code===a):null;if(a&&!Q)throw Error("请选择101～104入库工位");const G=Q==null?void 0:Q.assembly,K=G?G.position[1]+G.params.height:0,W=Q?[[Q.x,K,Q.z],[G.position[0]-.43,K,Q.z],[G.position[0]-.43,K,p.z],[G.position[0]+.43,K,p.z],[p.x,p.height+.185,p.z]]:null;W&&(B.unshift({...D}),k.unshift(Math.max(2,W.slice(1).reduce((ie,ye,Ue)=>ie+Math.hypot(...ye.map((qe,O)=>qe-W[Ue][O])),0)/.45)));const q={type:"inbound",code:J,target:l.id,dockId:t,deviceId:b.id,from:c.name,to:l.location,status:H?"queued":"running",stage:H?"等待堆垛机":_r[0],progress:0,phase:0,phaseElapsed:0,start:D,targets:B,durations:k,station:p,geometry:g,stackerPosition:[...b.position],cargo:ue,cargoState:"conveyor",pose:{...D},collected:!1};return W&&(q.returnRoute=W,q.entryPort=a,q.from=a+" 工位",q.stage=H?"等待堆垛机":"工位料框回流至入库接驳"),i.inboundSequence=(i.inboundSequence||0)+1,i.manualOutbound=!0,i.tasks.unshift(q),i.events.unshift({time:i.elapsed,message:`${J}：${q.from} → ${q.to}，入库指令已下达`}),q}function hv(i){const e=i.stackerPosition,t=i.pose;return i.cargoState==="fork"?[e[0]+t.travel,e[1]+t.lift+.1775,e[2]+t.extension]:i.returnRoute&&!i.returnRouteDone?Ja(i.returnRoute,i.phase===0?i.phaseElapsed/i.durations[0]:0):[i.station.x,i.station.height+.185,i.station.z]}function uv(i,e,t){let n=!1;for(const s of[...i.tasks].reverse().filter(r=>r.type==="inbound")){const r=i.devices[s.deviceId];if(!r||["fault","maintenance"].includes(r.status))continue;if(s.status==="queued"){if(!s.returnRoute&&i.tasks.some(u=>u!==s&&u.deviceId===s.deviceId&&Xn(u)))continue;const c=i.tasks.find(u=>u.deviceId===s.deviceId&&u.status==="completed"&&u.pose),l=t==null?void 0:t(s.deviceId);if(s.phase===0){l?s.start={...l,extension:l.extension??0}:c&&(s.start={...c.pose,extension:0});const u=s.returnRoute?1:0;s.targets[u].lift=Math.min(s.start.lift,s.targets[u+1].lift),s.returnRoute&&(s.targets[0]={...s.start});for(let d=s.returnRoute?1:0;d<s.targets.length;d++){const x=d?s.targets[d-1]:s.start,b=s.targets[d];s.durations[d]=Math.max(1.1,Math.abs(b.travel-x.travel)/2,Math.abs(b.lift-x.lift),Math.abs(b.extension-x.extension)/.5)}s.pose={...s.start}}s.status="running",s.stage=s.returnRoute&&s.phase===0?"工位料框回流至入库接驳":_r[s.phase-(s.returnRoute?1:0)]}if(s.status!=="running")continue;let o=e;const a=s.returnRoute?1:0,h=a?["工位料框回流至入库接驳",..._r]:_r;for(;o>0&&s.status==="running";){if(a&&s.phase===1){if(i.tasks.some(w=>w!==s&&w.deviceId===s.deviceId&&Xn(w))){s.waitingForStacker=!0,s.stage="等待堆垛机接框";break}if(s.waitingForStacker=!1,!s.approachRebased){const w=t==null?void 0:t(s.deviceId);if(w){s.targets[0]={...w,extension:w.extension??0};const m=s.targets[1],f=s.targets[0];s.durations[1]=Math.max(1.1,Math.abs(m.travel-f.travel)/2,Math.abs(m.lift-f.lift),Math.abs(m.extension-f.extension)/.5)}s.approachRebased=!0}}s.stage=h[s.phase];const c=s.phase,l=s.durations[c],u=Math.min(o,l-s.phaseElapsed,a&&s.phase===0?.1:1/0);if(a&&s.phase===0&&!zc(s,i,s.phaseElapsed+u)){s.stage="等待交汇输送段";break}s.phaseElapsed+=u,o-=u;const d=c?s.targets[c-1]:s.start,x=s.targets[c],b=lv(Math.min(1,s.phaseElapsed/l));if(s.pose={travel:_o(d.travel,x.travel,b),lift:_o(d.lift,x.lift,b),extension:_o(d.extension,x.extension,b)},s.progress=Math.round((s.durations.slice(0,c).reduce((w,m)=>w+m,0)+s.phaseElapsed)/s.durations.reduce((w,m)=>w+m,0)*100),Xn(s)&&(r.status="running",r.travel=s.pose.travel,r.lift=s.pose.lift),s.phaseElapsed<l-1e-8){if(o>0)continue;break}if(Hc(s,c,3+a,7+a))break;if(a&&c===0&&(s.returnRouteDone=!0,Bc(s)),c===3+a&&(s.cargoState="fork"),c===7+a){const w=i.slots.find(m=>m.id===s.target);Object.assign(w,s.cargo,{occupied:!0}),s.cargoState="rack",n=!0,i.inventory&&!s.serverTaskId&&i.inventory.push({id:s.code,boxId:s.cargo.boxId,boxCode:s.cargo.boxCode,locationId:w.locationId,location:w.location,sku:s.cargo.sku,product:s.cargo.product,quantity:s.cargo.quantity,unit:"件",batch:""})}s.phase++,s.phaseElapsed=0,s.phase===h.length?(s.status="completed",s.stage="入库完成",s.progress=100,s.collected=!0,i.completed++,r.completed++,r.status="idle",i.events.unshift({time:i.elapsed,message:`${s.code}：${s.cargo.boxCode} 已存入 ${s.to}`})):s.stage=h[s.phase]}}return n}function bc(i,{pose:e=()=>({travel:0,lift:1.2,extension:0}),notify:t=()=>{}}={}){const n=bo(i,2026),s=new Map(i.map(c=>[c.id,c]));let r=!1;n.manualOutbound=!0;for(const[c,l]of n.slots.entries()){const u=s.get(l.deviceId),d=l.index<u.params.smallBays*u.params.smallLevels;l.occupied=l.index%100!==0,l.size=d?1:2,l.boxCode=l.occupied?"DEMO-"+String(c+1).padStart(5,"0"):"",l.boxId=l.occupied?l.id:null,l.occupied&&(l.quantity=1+c%24,l.sku="DEMO-SKU-"+(1+c%5),l.product="演示物料",l.batch="DEMO-BATCH"),l.occupied||(l.quantity=0,l.sku="",l.product="",l.batch="")}const o={started:!1,enabled:!1,cycles:0,message:"准备就绪",error:""};async function a(c){let l;if(c.type==="outbound"){const u=n.slots.find(b=>b.id===c.slotId),d=s.get(u==null?void 0:u.deviceId),x=i.find(b=>b.type==="stacker"&&b.aisle===(d==null?void 0:d.aisle));l=sv(n,i,u.id,iv(i,d,x,c.port),e(x.id))}else{const u=n.tasks.find(f=>f.type==="outbound"&&f.cargo.boxCode===c.boxCode&&f.status==="completed"&&!f.collected);if(!u)throw Error("没有等待回库的模拟料框");const x=n.slots.filter(f=>!f.occupied&&!n.tasks.some(v=>v.type==="inbound"&&v.target===f.id&&v.status!=="completed")).filter(f=>{const v=s.get(f.deviceId),g=f.index<v.params.smallBays*v.params.smallLevels;return u.cargo.size===2?!g&&v.aisle===2:g}).sort((f,v)=>+(s.get(v.deviceId).aisle===c.preferredAisle)-+(s.get(f.deviceId).aisle===c.preferredAisle)).find(f=>xa(i).some(v=>v.aisle===s.get(f.deviceId).aisle&&!n.tasks.some(g=>g.type==="inbound"&&g.dockId===v.id&&g.cargoState==="conveyor")));if(!x)throw Error("没有可用的回库位置");const b=s.get(x.deviceId),w=xa(i).find(f=>f.aisle===b.aisle),m=i.find(f=>f.type==="stacker"&&f.aisle===b.aisle);l=cv(n,i,{dockId:w.id,targetId:x.id,boxCode:c.boxCode,entryPort:c.port},e(m.id)),l.cargo={...u.cargo},u.collected=!0}return l.autoDemo=!0,l}const h=av({state:()=>n,objects:()=>i,ports:()=>$a(i).filter(c=>!n.tasks.some(l=>l.type==="outbound"&&l.destinationPort===c.code&&!l.collected||l.type==="inbound"&&l.entryPort===c.code&&l.status!=="completed")),pose:e,running:()=>r,dbBusy:()=>!1,setRunning:c=>r=c,dispatch:a,notify:t},o);return{state:n,status:o,dispatch:a,start:()=>h.start(),pause:()=>h.pause(),dispose:()=>{h.pause(),h.reset()},get playing(){return r},async advance(c){if(!r)return!1;n.elapsed+=c;const l=uv(n,c,e),u=rv(n,c,e);return await h.advance(c),l||u}}}function fv(i,e="A",t=10){const n=new Qt;for(const h of i){const c=h.params,l=c.smallBays*c.smallPitch+c.largeBays*c.largePitch,u=Math.max(c.smallBays?c.smallLevels*c.smallStep:0,c.largeBays?c.largeLevels*c.largeStep:0)+.2,d=new $e().compose(new U(...h.position),new zt().setFromEuler(new Wt(...h.rotation.map(Tt.degToRad))),new U(...h.scale));n.union(new Qt(new U(-l/2,0,-c.depth/2),new U(l/2,u,c.depth/2)).applyMatrix4(d))}if(n.isEmpty())return null;const s=t,r=n.max.z-n.min.z+4,o=e==="A"?n.min.x-1-s/2:n.max.x+1+s/2,a=(n.min.z+n.max.z)/2;return{bounds:n,side:e,x:o,z:a,width:r,depth:s}}function dv(i,e,t,n,s,r,o="#d5b76c"){const a=document.createElement("canvas");a.width=1024,a.height=512;const h=a.getContext("2d");h.strokeStyle=o,h.lineWidth=5,h.strokeRect(12,12,1e3,488);for(const u of[12,1012])for(const d of[12,500])h.fillStyle=o,h.fillRect(u===12?12:942,d===12?12:486,70,14);h.fillStyle=o,h.textAlign="left",h.font='600 28px "Segoe UI",sans-serif',h.fillText("DISPATCH / A",34,54),h.font="18px Microsoft YaHei",h.fillText(e,34,84);for(const u of[260,512,764])h.beginPath(),h.moveTo(u-24,470),h.lineTo(u+24,470),h.lineTo(u+24,452),h.lineTo(u+48,480),h.lineTo(u+24,508),h.lineTo(u+24,490),h.lineTo(u-24,490),h.closePath(),h.fill();const c=new In(a);c.colorSpace=wt,c.anisotropy=4;const l=new Ge(new jn(t,n),new ft({map:c,transparent:!0,roughness:.82,metalness:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}));return l.rotation.x=-Math.PI/2,l.position.set(s,.014,r),l.receiveShadow=!0,l}function pv(i){const e=new tt;e.userData.annotation=!0;const{x:t,z:n,width:s,depth:r}=i;return e.add(dv("A 端出口","输送线作业区 / 深 "+r+" m",r,s,t,n)),e}const mv=["#68d4c0","#70b9f2","#eebd69","#c39bea"];function gv(i,e){var x;const t=i.params,n=t.smallBays*t.smallPitch+t.largeBays*t.largePitch,s=Math.max(t.smallBays?t.smallLevels*t.smallStep:0,t.largeBays?t.largeLevels*t.largeStep:0)+.2,r=new tt,o=mv[e%4],a=((x=i.name.match(/第\s*(\d+)\s*[列排]/))==null?void 0:x[1])||String(e+1),h=document.createElement("canvas");h.width=256,h.height=160;const c=h.getContext("2d");c.fillStyle="#102335",c.fillRect(0,0,256,160),c.strokeStyle=o,c.lineWidth=8,c.strokeRect(4,4,248,152),c.font="bold 70px Microsoft YaHei, sans-serif",c.textAlign="center",c.fillStyle="#edf6ff",c.fillText(a+" 列",128,91),c.font="27px Microsoft YaHei, sans-serif",c.fillStyle=o,c.fillText(i.aisle?"巷道 "+i.aisle:"料框库",128,133);const l=new In(h);l.colorSpace=wt;const u=new da(new Er({map:l,depthTest:!0,depthWrite:!1}));u.position.set(-n/2-.2,1.4,0),u.scale.set(.96,.6,1),r.add(u);const d=new Ge(new Lt(.06,Math.min(s,1.8),.08),new Oa({color:o}));return d.position.set(-n/2-.05,Math.min(s,1.8)/2,t.depth/2+.05),r.add(d),r.userData.annotation=!0,r.traverse(b=>{b.userData.id=i.id}),r}function vv(i,e){const t=i.bounds.clone();for(const a of e.filter(h=>h.type==="stacker"||h.type==="conveyor")){const h=a.params,c=a.type==="stacker"?h.railLength/2:h.length/2,l=a.type==="stacker"?.7:h.width/2+.4,u=new $e().compose(new U(...a.position),new zt().setFromEuler(new Wt(...a.rotation.map(Tt.degToRad))),new U(...a.scale));t.union(new Qt(new U(-c,0,-l),new U(c,1,l)).applyMatrix4(u))}const n=Math.min(i.x-i.depth/2,t.min.x)-1,s=t.max.x+1,r=Math.min(i.z-i.width/2,t.min.z)-.5,o=Math.max(i.z+i.width/2,t.max.z)+.5;return{width:Math.ceil(s-n),depth:Math.max(10,Math.ceil(o-r)),centerX:(n+s)/2,centerZ:(r+o)/2}}function Ec(i,e=1.5){const t=i.bounds.getSize(new U),n=i.bounds.getCenter(new U),s=Math.max(21,(t.z+4)/(2*Math.tan(Tt.degToRad(21))*e)*1.2);return{target:new U(i.bounds.min.x+1,t.y*.29,n.z),position:new U(i.bounds.min.x-s,t.y*.94+1,n.z+t.z*.92)}}function wc(i,e=1.5){const t=i.bounds.clone(),n=t.getCenter(new U),s=new U(-1.8,1.4,1.1).normalize(),r=new $e().lookAt(s,new U,new U(0,1,0)),o=new U().setFromMatrixColumn(r,0),a=new U().setFromMatrixColumn(r,1),h=Math.tan(Tt.degToRad(21));let c=0;t.min.x-=10,t.getCenter(n);for(const l of[t.min.x,t.max.x])for(const u of[t.min.y,t.max.y])for(const d of[t.min.z,t.max.z]){const x=new U(l,u,d).sub(n);c=Math.max(c,x.dot(s)+Math.max(Math.abs(x.dot(a))/h,Math.abs(x.dot(o))/(h*Math.max(e,.2))))}return{target:n,position:n.clone().addScaledVector(s,Math.max(20,c*1.12))}}const Tc=new WeakMap;function Ac(i){const e=i.userData.carriage||i;let t=Tc.get(e);if(!t){e.updateWorldMatrix(!0,!0);const s=e.matrixWorld.clone().invert();t=new Qt,e.traverse(r=>{let o=r;for(;o;){if(o.userData.annotation)return;o=o.parent}if(!r.geometry)return;let a;r.isInstancedMesh?(r.computeBoundingBox(),a=r.boundingBox):(r.geometry.boundingBox||r.geometry.computeBoundingBox(),a=r.geometry.boundingBox),a&&!a.isEmpty()&&t.union(a.clone().applyMatrix4(s.clone().multiply(r.matrixWorld)))}),Tc.set(e,t)}e.updateWorldMatrix(!0,!1);const n=t.clone().applyMatrix4(e.matrixWorld);return{center:n.getCenter(new U),size:n.getSize(new U)}}function _v(i,e,t,n){const s=t.clone().sub(e.target).multiplyScalar(1-Math.exp(-12*n));i.position.add(s),e.target.add(s)}const xr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class $i{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const xv=new Za(-1,1,1,-1,0,1);class yv extends Ht{constructor(){super(),this.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vt([0,2,0,0,2,0],2))}}const Mv=new yv;class Qa{constructor(e){this._mesh=new Ge(Mv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,xv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Sv extends $i{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Pt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Gn.clone(e.uniforms),this.material=new Pt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Qa(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Rc extends $i{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class bv extends $i{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ev{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new de);this._width=n.width,this._height=n.height,t=new fn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ln}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Sv(xr),this.copyPass.material.blending=At,this.clock=new vd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Rc!==void 0&&(o instanceof Rc?n=!0:o instanceof bv&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new de);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class wv extends $i{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new We}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const sr={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new de},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new $e},cameraProjectionMatrixInverse:{value:new $e},cameraWorldMatrix:{value:new $e},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new U(-1,-1,-1)},sceneBoxMax:{value:new U(1,1,1)}},vertexShader:`

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
		}`},rr={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},xo={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Tv(i=5){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=Av(e),n=t.length,s=new Uint8Array(n*4);for(let o=0;o<n;++o){const a=t[o],h=2*Math.PI*a/n,c=new U(Math.cos(h),Math.sin(h),0).normalize();s[o*4]=(c.x*.5+.5)*255,s[o*4+1]=(c.y*.5+.5)*255,s[o*4+2]=127,s[o*4+3]=255}const r=new Cr(s,e,e);return r.wrapS=Dn,r.wrapT=Dn,r.needsUpdate=!0,r}function Av(i){const e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=e*e,n=Array(t).fill(0);let s=Math.floor(e/2),r=e-1;for(let o=1;o<=t;){if(s===-1&&r===e?(r=e-2,s=0):(r===e&&(r=0),s<0&&(s=e-1)),n[s*e+r]!==0){r-=2,s++;continue}else n[s*e+r]=o++;r++,s--}return n}const or={defines:{SAMPLES:16,SAMPLE_VECTORS:Bh(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new de},cameraProjectionMatrixInverse:{value:new $e},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Bh(i,e,t){const n=Rv(i,e,t);let s="vec3[SAMPLES](";for(let r=0;r<i;r++){const o=n[r];s+=`vec3(${o.x}, ${o.y}, ${o.z})${r<i-1?",":")"}`}return s}function Rv(i,e,t){const n=[];for(let s=0;s<i;s++){const r=2*Math.PI*e*s/i,o=Math.pow(s/(i-1),t);n.push(new U(Math.cos(r),Math.sin(r),o))}return n}class Cv{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,s,r;const o=.5*(Math.sqrt(3)-1),a=(e+t)*o,h=Math.floor(e+a),c=Math.floor(t+a),l=(3-Math.sqrt(3))/6,u=(h+c)*l,d=h-u,x=c-u,b=e-d,w=t-x;let m,f;b>w?(m=1,f=0):(m=0,f=1);const v=b-m+l,g=w-f+l,p=b-1+2*l,T=w-1+2*l,M=h&255,S=c&255,E=this.perm[M+this.perm[S]]%12,_=this.perm[M+m+this.perm[S+f]]%12,y=this.perm[M+1+this.perm[S+1]]%12;let A=.5-b*b-w*w;A<0?n=0:(A*=A,n=A*A*this._dot(this.grad3[E],b,w));let P=.5-v*v-g*g;P<0?s=0:(P*=P,s=P*P*this._dot(this.grad3[_],v,g));let C=.5-p*p-T*T;return C<0?r=0:(C*=C,r=C*C*this._dot(this.grad3[y],p,T)),70*(n+s+r)}noise3d(e,t,n){let s,r,o,a;const c=(e+t+n)*.3333333333333333,l=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(n+c),x=1/6,b=(l+u+d)*x,w=l-b,m=u-b,f=d-b,v=e-w,g=t-m,p=n-f;let T,M,S,E,_,y;v>=g?g>=p?(T=1,M=0,S=0,E=1,_=1,y=0):v>=p?(T=1,M=0,S=0,E=1,_=0,y=1):(T=0,M=0,S=1,E=1,_=0,y=1):g<p?(T=0,M=0,S=1,E=0,_=1,y=1):v<p?(T=0,M=1,S=0,E=0,_=1,y=1):(T=0,M=1,S=0,E=1,_=1,y=0);const A=v-T+x,P=g-M+x,C=p-S+x,D=v-E+2*x,I=g-_+2*x,F=p-y+2*x,B=v-1+3*x,k=g-1+3*x,H=p-1+3*x,J=l&255,ne=u&255,ue=d&255,Q=this.perm[J+this.perm[ne+this.perm[ue]]]%12,G=this.perm[J+T+this.perm[ne+M+this.perm[ue+S]]]%12,K=this.perm[J+E+this.perm[ne+_+this.perm[ue+y]]]%12,W=this.perm[J+1+this.perm[ne+1+this.perm[ue+1]]]%12;let q=.6-v*v-g*g-p*p;q<0?s=0:(q*=q,s=q*q*this._dot3(this.grad3[Q],v,g,p));let ae=.6-A*A-P*P-C*C;ae<0?r=0:(ae*=ae,r=ae*ae*this._dot3(this.grad3[G],A,P,C));let ie=.6-D*D-I*I-F*F;ie<0?o=0:(ie*=ie,o=ie*ie*this._dot3(this.grad3[K],D,I,F));let ye=.6-B*B-k*k-H*H;return ye<0?a=0:(ye*=ye,a=ye*ye*this._dot3(this.grad3[W],B,k,H)),32*(s+r+o+a)}noise4d(e,t,n,s){const r=this.grad4,o=this.simplex,a=this.perm,h=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let l,u,d,x,b;const w=(e+t+n+s)*h,m=Math.floor(e+w),f=Math.floor(t+w),v=Math.floor(n+w),g=Math.floor(s+w),p=(m+f+v+g)*c,T=m-p,M=f-p,S=v-p,E=g-p,_=e-T,y=t-M,A=n-S,P=s-E,C=_>y?32:0,D=_>A?16:0,I=y>A?8:0,F=_>P?4:0,B=y>P?2:0,k=A>P?1:0,H=C+D+I+F+B+k,J=o[H][0]>=3?1:0,ne=o[H][1]>=3?1:0,ue=o[H][2]>=3?1:0,Q=o[H][3]>=3?1:0,G=o[H][0]>=2?1:0,K=o[H][1]>=2?1:0,W=o[H][2]>=2?1:0,q=o[H][3]>=2?1:0,ae=o[H][0]>=1?1:0,ie=o[H][1]>=1?1:0,ye=o[H][2]>=1?1:0,Ue=o[H][3]>=1?1:0,qe=_-J+c,O=y-ne+c,le=A-ue+c,se=P-Q+c,re=_-G+2*c,oe=y-K+2*c,ve=A-W+2*c,fe=P-q+2*c,me=_-ae+3*c,Fe=y-ie+3*c,Ne=A-ye+3*c,N=P-Ue+3*c,R=_-1+4*c,Y=y-1+4*c,z=A-1+4*c,$=P-1+4*c,X=m&255,Se=f&255,he=v&255,Ae=g&255,Pe=a[X+a[Se+a[he+a[Ae]]]]%32,ge=a[X+J+a[Se+ne+a[he+ue+a[Ae+Q]]]]%32,we=a[X+G+a[Se+K+a[he+W+a[Ae+q]]]]%32,Be=a[X+ae+a[Se+ie+a[he+ye+a[Ae+Ue]]]]%32,Ie=a[X+1+a[Se+1+a[he+1+a[Ae+1]]]]%32;let be=.6-_*_-y*y-A*A-P*P;be<0?l=0:(be*=be,l=be*be*this._dot4(r[Pe],_,y,A,P));let He=.6-qe*qe-O*O-le*le-se*se;He<0?u=0:(He*=He,u=He*He*this._dot4(r[ge],qe,O,le,se));let V=.6-re*re-oe*oe-ve*ve-fe*fe;V<0?d=0:(V*=V,d=V*V*this._dot4(r[we],re,oe,ve,fe));let pe=.6-me*me-Fe*Fe-Ne*Ne-N*N;pe<0?x=0:(pe*=pe,x=pe*pe*this._dot4(r[Be],me,Fe,Ne,N));let Me=.6-R*R-Y*Y-z*z-$*$;return Me<0?b=0:(Me*=Me,b=Me*Me*this._dot4(r[Ie],R,Y,z,$)),27*(l+u+d+x+b)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}_dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}}class pn extends $i{constructor(e,t,n=512,s=512,r,o,a){super(),this.width=n,this.height=s,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Tv(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new fn(this.width,this.height,{type:Ln}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Pt({defines:Object.assign({},sr.defines),uniforms:Gn.clone(sr.uniforms),vertexShader:sr.vertexShader,fragmentShader:sr.fragmentShader,blending:At,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new ld,this.normalMaterial.blending=At,this.pdMaterial=new Pt({defines:Object.assign({},or.defines),uniforms:Gn.clone(or.uniforms),vertexShader:or.vertexShader,fragmentShader:or.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Pt({defines:Object.assign({},rr.defines),uniforms:Gn.clone(rr.uniforms),vertexShader:rr.vertexShader,fragmentShader:rr.fragmentShader,blending:At}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Pt({uniforms:Gn.clone(xr.uniforms),vertexShader:xr.vertexShader,fragmentShader:xr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Ao,blendDst:cs,blendEquation:cn,blendSrcAlpha:To,blendDstAlpha:cs,blendEquationAlpha:cn}),this.blendMaterial=new Pt({uniforms:Gn.clone(xo.uniforms),vertexShader:xo.vertexShader,fragmentShader:xo.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Wc,blendSrc:Ao,blendDst:cs,blendEquation:cn,blendSrcAlpha:To,blendDstAlpha:cs,blendEquationAlpha:cn}),this._fsQuad=new Qa(null),this._originalClearColor=new We,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),a!==void 0&&this.updatePdMaterial(a)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new ka,this.depthTexture.format=Wi,this.depthTexture.type=Gi,this.normalRenderTarget=new fn(this.width,this.height,{minFilter:kt,magFilter:kt,type:Ln,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Bh(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case pn.OUTPUT.Off:break;case pn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=At,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case pn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=At,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case pn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=At,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case pn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case pn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=At,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case pn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=At,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,s,r){e.getClearColor(this._originalClearColor);const o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_renderOverride(e,t,n,s,r){e.getClearColor(this._originalClearColor);const o=e.getClearAlpha(),a=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=a,e.setClearColor(this._originalClearColor),e.setClearAlpha(o)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new Cv,n=e*e*4,s=new Uint8Array(n);for(let o=0;o<e;o++)for(let a=0;a<e;a++){const h=o,c=a;s[(o*e+a)*4]=(t.noise(h,c)*.5+.5)*255,s[(o*e+a)*4+1]=(t.noise(h+e,c)*.5+.5)*255,s[(o*e+a)*4+2]=(t.noise(h,c+e)*.5+.5)*255,s[(o*e+a)*4+3]=(t.noise(h+e,c+e)*.5+.5)*255}const r=new Cr(s,e,e,Kt,un);return r.wrapS=Dn,r.wrapT=Dn,r.needsUpdate=!0,r}}pn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const ar={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Pv extends $i{constructor(){super(),this.uniforms=Gn.clone(ar.uniforms),this.material=new ad({name:ar.name,uniforms:this.uniforms,vertexShader:ar.vertexShader,fragmentShader:ar.fragmentShader}),this._fsQuad=new Qa(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Je.getTransfer(this._outputColorSpace)===it&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===qc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Yc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===wa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===jc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===$c?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Zc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}function Dv(i=()=>document.hidden){let e=!0;return{request(){e=!0},render(t,n=!1){if(i()||!e&&!n)return!1;e=!1;try{t()}catch(s){throw e=!0,s}return!0}}}const Cc={rendering:{maxPixelRatio:2,maxRenderPixels:5e6}};function Lv(i,e,t){const n=Math.max(1,t||1),s=Math.max(1,Math.sqrt(Cc.rendering.maxRenderPixels/Math.max(1,i*e)));return Math.min(n,Cc.rendering.maxPixelRatio,s)}function Iv(i,e,t){const n=i.getSize(new de),s=new fn(n.x,n.y,{type:Ln,samples:Math.min(4,i.capabilities.maxSamples)}),r=new Ev(i,s);let o=i.getPixelRatio();r.setPixelRatio(o);const a=new wv(e,t),h=new pn(e,t,512,512);h.updateGtaoMaterial({radius:.38,thickness:.7,distanceFallOff:1,samples:8,distanceExponent:2}),h.blendIntensity=.35;const c=new Pv,l=[a,h,c];l.forEach(x=>r.addPass(x));const u=Dv();function d(x,b){const w=Lv(x,b,globalThis.devicePixelRatio);i.getPixelRatio()!==w&&i.setPixelRatio(w),o!==w&&(r.setPixelRatio(w),o=w),r.setSize(x,b),u.request()}return{invalidate:()=>u.request(),render:(x=!1)=>u.render(()=>r.render(),x),resize:d,dispose(){l.forEach(x=>x.dispose()),r.dispose()}}}class Uv extends ph{constructor(){super();const e=new Lt;e.deleteAttribute("uv");const t=new ft({side:Bt}),n=new ft,s=new pd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ge(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new gh(e,n,6),a=new Mt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const h=new Ge(e,Li(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const c=new Ge(e,Li(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const l=new Ge(e,Li(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);const u=new Ge(e,Li(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new Ge(e,Li(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const x=new Ge(e,Li(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Li(i){return new cd({color:0,emissive:16777215,emissiveIntensity:i})}function Nv(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=2048;const s=n.getContext("2d");s.fillStyle="#9da6a3",s.fillRect(0,0,2048,2048);let r=43;for(let c=0;c<8e4;c++){r=Math.imul(r,1664525)+1013904223>>>0;const l=r%2048;r=Math.imul(r,1664525)+1013904223>>>0,s.fillStyle=c%2?"#ffffff0a":"#2435380a",s.fillRect(l,r%2048,2,2)}const o=2048/i,a=2048/e;for(let c=0;c<70;c++){r=Math.imul(r,1664525)+1013904223>>>0;const l=r%2048;r=Math.imul(r,1664525)+1013904223>>>0;const u=r%2048,d=80+r%160,x=s.createRadialGradient(l,u,0,l,u,d);x.addColorStop(0,c%2?"#eff2e91a":"#3c494518"),x.addColorStop(1,"#66716d00"),s.fillStyle=x,s.fillRect(l-d,u-d,d*2,d*2)}for(const c of[.12,.88])for(const l of[-.28,.28])s.strokeStyle="#45504c0e",s.lineWidth=Math.max(2,a*.1),s.beginPath(),s.moveTo(o,2048*c+a*l),s.lineTo(2048-o,2048*c+a*l),s.stroke();s.strokeStyle="#66767938",s.lineWidth=1.4;for(let c=4;c<i;c+=4)s.beginPath(),s.moveTo(c*o,0),s.lineTo(c*o,2048),s.stroke();for(let c=4;c<e;c+=4)s.beginPath(),s.moveTo(0,c*a),s.lineTo(2048,c*a),s.stroke();s.strokeStyle="#f1c65d",s.lineWidth=Math.max(2,Math.min(o,a)*.09),s.strokeRect(o*.4,a*.4,2048-o*.8,2048-a*.8);const h=new In(n);return h.colorSpace=wt,h.anisotropy=Math.min(8,t),h}function Fv(i,e,t=12){const n=i.getObjectByName("studio-sun");if(!n)return;const s=e.centerX||0,r=e.centerZ||0,o=Math.max(e.width,e.depth,20);n.position.set(s-o*.45,o*.85,r+o*.2),n.target.position.set(s,t*.2,r),n.updateWorldMatrix(!0,!1),n.target.updateWorldMatrix(!0,!1),n.shadow.updateMatrices(n);const a=n.shadow.camera,h=new Qt;for(const c of[s-e.width/2-3,s+e.width/2+3])for(const l of[-.5,t])for(const u of[r-e.depth/2-3,r+e.depth/2+3])h.expandByPoint(new U(c,l,u).applyMatrix4(a.matrixWorldInverse));a.left=h.min.x-.5,a.right=h.max.x+.5,a.bottom=h.min.y-.5,a.top=h.max.y+.5,a.near=Math.max(.1,-h.max.z-2),a.far=-h.min.z+2,a.updateProjectionMatrix(),n.shadow.normalBias=.012,n.shadow.bias=-15e-5}function Ov(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=512;const s=n.getContext("2d");s.fillStyle="#b8b8b8",s.fillRect(0,0,512,512);let r=237;for(let a=0;a<90;a++){r=Math.imul(r,1664525)+1013904223>>>0;const h=r%512;r=Math.imul(r,1664525)+1013904223>>>0;const c=r%512,l=15+r%85,u=s.createRadialGradient(h,c,0,h,c,l);u.addColorStop(0,a%2?"#eeeeee50":"#70707040"),u.addColorStop(1,"#b8b8b800"),s.fillStyle=u,s.fillRect(h-l,c-l,l*2,l*2)}s.strokeStyle="#e0e0e0",s.lineWidth=1;for(let a=4;a<i;a+=4)s.beginPath(),s.moveTo(a/i*512,0),s.lineTo(a/i*512,512),s.stroke();for(let a=4;a<e;a+=4)s.beginPath(),s.moveTo(0,a/e*512),s.lineTo(512,a/e*512),s.stroke();const o=new In(n);return o.anisotropy=Math.min(8,t),o}function zv(i,e=12,{wallsVisible:t=!0}={}){const n=new tt;n.name="factory-architecture";const s=new tt;s.name="factory-walls",s.visible=t,n.add(s);let r=n;const o=i.width+5,a=i.depth+6,h=i.centerX||0,c=i.centerZ||0,l={concrete:new ft({color:"#8e9491",roughness:.86}),wall:new ft({color:"#b5bbb5",roughness:.87}),steel:new ft({color:"#555f60",metalness:.65,roughness:.38}),dark:new ft({color:"#293336",metalness:.45,roughness:.5}),paint:new ft({color:"#d1a449",metalness:.12,roughness:.55}),glass:new qa({color:"#aec7ca",emissive:"#90acb2",emissiveIntensity:.13,metalness:.1,roughness:.24,clearcoat:.65}),lamp:new ft({color:"#fff5da",emissive:"#fff0cf",emissiveIntensity:2.5,roughness:.4})},u=(f,v,g,p,T,M,S)=>{const E=new Ge(new Lt(p,T,M),l[S]);return E.position.set(h+f,v,c+g),E.receiveShadow=!0,E.castShadow=S!=="lamp",r.add(E),E},d=(f,v,g,p,T,M,S=0)=>{if(typeof document>"u")return;const E=document.createElement("canvas");E.width=768,E.height=256;const _=E.getContext("2d");_.fillStyle="#27383b",_.fillRect(0,0,768,256),_.fillStyle="#c7a65f",_.fillRect(0,0,12,256),_.fillStyle="#edf1e9",_.font='600 104px "Segoe UI",sans-serif',_.fillText(f,40,128),_.fillStyle="#a8bbb9",_.font='28px "Segoe UI",sans-serif',_.fillText(v,44,195);const y=new In(E);y.colorSpace=wt,y.anisotropy=4;const A=new Ge(new jn(M,M/3),new ft({map:y,roughness:.8}));A.position.set(h+g,p,c+T),A.rotation.y=S,r.add(A)};u(0,-.22,0,o,.4,a,"concrete"),r=s,u(0,e/2,-a/2,o,e,.18,"wall"),u(o/2,e/2,0,.18,e,a,"wall"),u(0,.55,-a/2+.11,o,1.1,.07,"dark"),u(o/2-.11,.55,0,.07,1.1,a,"dark");const x=Math.min(4.5,a*.5);u(o/2-.12,2.2,0,.08,4.4,x,"dark"),u(o/2-.18,2.18,0,.08,4.2,x-.22,"steel");for(let f=.25;f<4.3;f+=.22)u(o/2-.23,f,0,.025,.025,x-.3,"dark");for(const f of[-1,1])u(o/2-.25,1,f*(x/2+.16),.18,2,.15,"paint");d("WAREHOUSE A","AUTOMATED STORAGE / DISPATCH",o/2-.24,6.2,0,Math.min(a*.75,8),-Math.PI/2);const b=Math.max(2,Math.ceil(o/7.5)),w=o/b;for(let f=0;f<=b;f++){r=s;const v=-o/2+f*w;if(u(v,e/2,-a/2+.24,.22,e,.32,"steel"),u(v,.6,-a/2+.44,.3,1.2,.12,"paint"),f<b){const g=v+w/2;f%2===0&&d("A / "+String(f+1).padStart(2,"0"),"STORAGE ZONE",g,2.5,-a/2+.2,1.5),u(g,e*.73,-a/2+.12,w-.6,e*.22,.06,"glass");for(let p=0;p<=4;p++)u(v+.3+p*(w-.6)/4,e*.73,-a/2+.18,.045,e*.22,.06,"steel");u(g,e*.73,-a/2+.18,w-.6,.055,.06,"steel");for(let p=1.5;p<e*.58;p+=.65)u(g,p,-a/2+.11,w-.26,.022,.025,"concrete");r=n;for(const p of[-a*.23,a*.23]){u(g,e-.65,p,2.8,.09,.18,"dark"),u(g,e-.705,p,2.65,.025,.13,"lamp");for(const T of[-1,1])u(g+T,e-.32,p,.012,.6,.012,"steel")}}}r=s,u(0,e*.48,-a/2+.28,o,.1,.12,"steel");const m=new Ge(new $t(.035,.035,o,10),new ft({color:"#a54332",roughness:.55,metalness:.3}));m.rotation.z=Math.PI/2,m.position.set(h,e*.42,c-a/2+.29),s.add(m),r=n;for(const f of[-o/2+1,o/2-1])u(f,.48,a/2-.4,.12,.96,.12,"paint"),u(f,.055,a/2-.4,.3,.11,.3,"dark"),u(f,.65,a/2-.4,.125,.14,.125,"dark");return n}function Bv(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=256;const s=n.getContext("2d"),r=s.createImageData(256,256);let o=91;for(let h=0;h<r.data.length;h+=4){o=Math.imul(o,1664525)+1013904223>>>0;const c=120+o%24;r.data.set([c,c,c,255],h)}s.putImageData(r,0,0);const a=new In(n);return a.wrapS=a.wrapT=Dn,a.repeat.set(i/3,e/3),a.anisotropy=Math.min(8,t),a}const Pc={type:"change"},el={type:"start"},kh={type:"end"},lr=new Na,Dc=new kn,kv=Math.cos(70*Tt.DEG2RAD),yt=new U,Gt=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},yo=1e-6;class Hv extends xd{constructor(e,t=null){super(e,t),this.state=ot.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Oi.ROTATE,MIDDLE:Oi.DOLLY,RIGHT:Oi.PAN},this.touches={ONE:Ui.ROTATE,TWO:Ui.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new zt,this._lastTargetPosition=new U,this._quat=new zt().setFromUnitVectors(e.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $l,this._sphericalDelta=new $l,this._scale=1,this._panOffset=new U,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new U,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Gv.bind(this),this._onPointerDown=Vv.bind(this),this._onPointerUp=Wv.bind(this),this._onContextMenu=Kv.bind(this),this._onMouseWheel=Yv.bind(this),this._onKeyDown=Zv.bind(this),this._onTouchStart=jv.bind(this),this._onTouchMove=$v.bind(this),this._onMouseDown=Xv.bind(this),this._onMouseMove=qv.bind(this),this._interceptControlDown=Jv.bind(this),this._interceptControlUp=Qv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Pc),this.update(),this.state=ot.NONE}update(e=null){const t=this.object.position;yt.copy(t).sub(this.target),yt.applyQuaternion(this._quat),this._spherical.setFromVector3(yt),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Gt:n>Math.PI&&(n-=Gt),s<-Math.PI?s+=Gt:s>Math.PI&&(s-=Gt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(yt.setFromSpherical(this._spherical),yt.applyQuaternion(this._quatInverse),t.copy(this.target).add(yt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=yt.length();o=this._clampDistance(a*this._scale);const h=a-o;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=yt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(lr.origin.copy(this.object.position),lr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(lr.direction))<kv?this.object.lookAt(this.target):(Dc.setFromNormalAndCoplanarPoint(this.object.up,this.target),lr.intersectPlane(Dc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>yo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>yo||this._lastTargetPosition.distanceToSquared(this.target)>yo?(this.dispatchEvent(Pc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Gt/60*this.autoRotateSpeed*e:Gt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){yt.setFromMatrixColumn(t,0),yt.multiplyScalar(-e),this._panOffset.add(yt)}_panUp(e,t){this.screenSpacePanning===!0?yt.setFromMatrixColumn(t,1):(yt.setFromMatrixColumn(t,0),yt.crossVectors(this.object.up,yt)),yt.multiplyScalar(e),this._panOffset.add(yt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;yt.copy(s).sub(this.target);let r=yt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new de,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Vv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Gv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Wv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(kh),this.state=ot.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Xv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Oi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ot.DOLLY;break;case Oi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}break;case Oi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(el)}function qv(i){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Yv(i){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(i.preventDefault(),this.dispatchEvent(el),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(kh))}function Zv(i){this.enabled!==!1&&this._handleKeyDown(i)}function jv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ui.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ot.TOUCH_ROTATE;break;case Ui.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case Ui.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ot.TOUCH_DOLLY_PAN;break;case Ui.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(el)}function $v(i){switch(this._trackPointer(i),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ot.NONE}}function Kv(i){this.enabled!==!1&&i.preventDefault()}function Jv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Qv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const e_=2,t_="public-hardware",n_="五金立体库 · 模拟展示",i_={width:61,depth:12,exitSide:"A",exitReserve:10,centerX:-3.637500000000003,centerZ:0,centerGap:.15},s_=2026,r_=[{position:[0,0,2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 1 列料框库",metalness:.2,id:"public-hardware-1"},{position:[0,0,.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 2 列料框库",metalness:.2,id:"public-hardware-2"},{position:[0,0,-.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 3 列料框库",metalness:.2,id:"public-hardware-3"},{position:[0,0,-2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 4 列料框库",metalness:.2,id:"public-hardware-4"},{position:[0,0,1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:1,params:{height:9.4,travel:0,lift:1.2,railLength:51},name:"巷道 1 堆垛机",metalness:.2,id:"public-hardware-5"},{position:[0,0,-1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:2,params:{height:9.4,travel:0,lift:1.2,railLength:48},name:"巷道 2 堆垛机",metalness:.2,id:"public-hardware-6"},{position:[-27.3,0,0],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"hardwareConveyorAssembly",params:{length:4.8,width:6.7,height:.81,laneCenters:[-2.975,-.475,.475,2.975]},name:"五金 · 四列对齐输送线总装",metalness:.35,id:"public-hardware-7"},{position:[-23.7375,0,2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第1列入库专用接驳",metalness:.35,id:"hardware-rack-link-0",dockMode:"inbound"},{position:[-23.7375,0,.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第2列出库专用接驳",metalness:.35,id:"hardware-rack-link-1",dockMode:"outbound"},{position:[-23.0375,0,-.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第3列入库专用接驳",metalness:.35,id:"hardware-rack-link-2",dockMode:"inbound"},{position:[-23.0375,0,-2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81,exhibitionDetail:!0},name:"五金 · 第4列出库专用接驳",metalness:.35,id:"hardware-rack-link-3",dockMode:"outbound"}],o_={version:e_,id:t_,name:n_,floor:i_,seed:s_,objects:r_},a_=new Set(["#242a2b","#283437","#343e40","#43484b","#35322b","#304b50"]),l_=new Set(["#d0d8df","#c3cdd1","#9eafb9","#b0b3b1","#b8bdc1","#929a9f"]),c_=new Set(["#38434d","#293336","#263844","#39474a","#132335"]);function tl(i,e={}){const s=new We(i).getHSL({}).s<.22,r=["#98734d","#bd9669","#b28d62","#b18b5f","#d4b485"].includes(i),o=a_.has(i),a=c_.has(i),h=!r&&!o&&(!s||l_.has(i)||a),c=h?qa:ft,l=new c({color:i,roughness:r?.87:o?.9:a?.64:h?.48:.3,metalness:r||o?0:h?.04:.88,...h?{clearcoat:.12,clearcoatRoughness:.36}:{},...e});return l.userData.industrialSurface=!0,l.userData.surfaceRole=r?"wood":o?"rubber":h?"paint":"metal",l}function h_(i){let e=i.userData.surfaceRole||"metal";!["wood","rubber"].includes(e)&&i.metalness===0&&i.roughness>=.9&&(e="cloth","clearcoat"in i&&(i.clearcoat=0)),i.userData.surfaceRole=e;const n={metal:{frequency:1600,amplitude:.025,expression:"sin(finishPoint.y * 1600.0 + sin(finishPoint.z * 13.0) * 0.4)"},paint:{frequency:1100,amplitude:.02,expression:"sin(finishPoint.x * 1100.0) * sin(finishPoint.y * 980.0 + finishPoint.z * 830.0)"},cloth:{frequency:950,amplitude:.04,expression:"sin(finishPoint.x * 950.0) * sin(finishPoint.z * 950.0 + finishPoint.y * 950.0)"},rubber:{frequency:1300,amplitude:.025,expression:"sin(finishPoint.x * 1300.0 + finishPoint.y * 710.0) * sin(finishPoint.z * 1100.0)"},wood:{frequency:160,amplitude:.05,expression:"sin(finishPoint.x * 160.0 + sin(finishPoint.z * 9.0) * 4.0)"}}[e];return i.onBeforeCompile=s=>{s.vertexShader=`varying vec3 finishPoint;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
finishPoint = position;`),s.fragmentShader=`varying vec3 finishPoint;
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <roughnessmap_fragment>",`
      #include <roughnessmap_fragment>
      float finishFootprint = length(fwidth(finishPoint * ${n.frequency.toFixed(1)}));
      float finishWeight = 1.0 - smoothstep(0.4, 2.0, finishFootprint);
      float finishGrain = ${n.expression};
      roughnessFactor = clamp(roughnessFactor + finishGrain * ${n.amplitude.toFixed(3)} * finishWeight, 0.04, 1.0);
    `)},i.customProgramCacheKey=()=>"industrial-finish-v1-"+e,i}function ya({box:i,cylinder:e},t,n,s=.18,r=.2){i(s,.018,r,t,.009,n,"#939d9e");for(const o of[-s*.32,s*.32])for(const a of[-r*.32,r*.32])e(.011,.003,t+o,.02,n+a,"y","#bcc1bf"),e(.008,.01,t+o,.026,n+a,"y","#566165")}function u_({box:i,cylinder:e},{width:t,depth:n,height:s,x:r=0,y:o=0,z:a=0}){for(const h of[-1,1])for(const c of[-1,1]){const l=r+h*(t/2-.015),u=a+c*(n/2-.015);i(.038,s-.09,.012,l-h*.013,o+s/2,u,"#9fa8a7"),i(.012,s-.09,.038,l,o+s/2,u-c*.013,"#9fa8a7");for(const d of[.13,s-.09])e(.006,.009,l-h*.018,o+d,u+c*.012,"z","#596365")}for(const h of[-1,1])i(.06,.026,n*.86,r+h*t*.29,o+.026,a,"#626e71"),i(.018,.04,n*.86,r+h*t*.29,o+.045,a,"#9fa8a7")}function Tr({box:i,cylinder:e,rod:t},{length:n,width:s,height:r}){for(const c of[-n*.43,n*.43])for(const l of[-s*.44,s*.44])e(.045,.012,c,.006,l,"y","#343e40"),e(.012,.06,c,.038,l,"y","#aab3b2"),e(.021,.012,c,.065,l,"y","#616c70");for(const c of[-n*.41,n*.41])for(const l of[-1,1]){const u=l*(s/2+.018);i(.11,.07,.012,c,r-.06,u,"#6f7e81"),e(.008,.014,c,r-.04,u+l*.012,"z","#b2bcba"),e(.009,.065,c,r-.095,u,"x","#b2bcba")}const o=s/2-.06;t([-n*.39,r-.23,o],[n*.35,r-.23,o],.012,"#283437");for(const c of[-n*.32,0,n*.32])i(.025,.025,.04,c,r-.23,o,"#707e7d");const a=-n*.24,h=s/2+.055;i(.13,.12,.05,a,r-.12,h,"#d1b454"),e(.017,.016,a,r-.1,h+.034,"z","#aa3d32"),e(.013,.035,a,r-.19,h,"y","#39474a")}function Hh({box:i,cylinder:e},{width:t,depth:n,height:s}){const r=s-.16,o=.16;for(const a of[-1,1]){const h=a*t*.34,c=-n*.38;i(.027,r-o,.036,h,(r+o)/2,c,"#333f42"),i(.012,r-o-.05,.018,h+a*.024,(r+o)/2,c,"#b3bcba");for(const l of[o,r])e(.052,.06,h,l,c,"z","#586567"),e(.023,.075,h,l,c,"z","#abb7b4");for(let l=o+.07;l<r-.06;l+=.14)i(.036,.025,.012,h,l,c+.025,"#8c9998");i(.08,.1,.045,h,r-.14,c+.055,"#485f64"),i(.015,.025,.008,h,r-.13,c+.083,"#bd9c4e")}}function f_({box:i,cylinder:e},{width:t,depth:n}){for(const s of[-1,1]){const r=s*t*.34,o=-n*.38;for(const a of[-.04,.12])i(.085,.07,.07,r,a,o,"#667e7c"),e(.023,.075,r,a,o+.035,"z","#b2bbb7")}}function Vh({cylinder:i},{radius:e,length:t,x:n=0,y:s=0,z:r=0,axis:o="x",color:a="#c7b495"}){for(const h of[-1,1]){const c=[n,s,r],l={x:0,y:1,z:2}[o];c[l]+=h*(t/2+.002);for(const[x,b]of[[e*.94,a],[e*.72,"#9f947f"],[e*.49,a]]){const w=i(x,.001,...c,o,b);w.geometry.dispose(),w.geometry=new Ga(Math.max(.005,x-.002),x,32),w.rotation.set(o==="y"?-h*Math.PI/2:0,o==="x"?h*Math.PI/2:o==="z"&&h<0?Math.PI:0,0),w.material.metalness=0,w.material.roughness=.96}const u=i(e*.22,.004,...c,o,"#98734d");u.material.metalness=0,u.material.roughness=.9,c[l]+=h*.004;const d=i(e*.14,.004,...c,o,"#35322b");d.material.metalness=0,d.material.roughness=1}}const ls=new U;function sn(i,e,t,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),h=Math.PI/4;ls.copy(e),ls[n]=0,ls.normalize();const c=.5*o/(o+a),l=1-ls.angleTo(i)/h;return Math.sign(ls[t])===1?l*c:a/(o+a)+c+c*(1-l)}class Zi extends Lt{constructor(e=1,t=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const h=new U,c=new U,l=new U(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,x=this.attributes.uv.array,b=u.length/6,w=new U,m=.5/o;for(let f=0,v=0;f<u.length;f+=3,v+=2)switch(h.fromArray(u,f),c.copy(h),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[f+0]=l.x*Math.sign(h.x)+c.x*r,u[f+1]=l.y*Math.sign(h.y)+c.y*r,u[f+2]=l.z*Math.sign(h.z)+c.z*r,d[f+0]=c.x,d[f+1]=c.y,d[f+2]=c.z,Math.floor(f/b)){case 0:w.set(1,0,0),x[v+0]=sn(w,c,"z","y",r,n),x[v+1]=1-sn(w,c,"y","z",r,t);break;case 1:w.set(-1,0,0),x[v+0]=1-sn(w,c,"z","y",r,n),x[v+1]=1-sn(w,c,"y","z",r,t);break;case 2:w.set(0,1,0),x[v+0]=1-sn(w,c,"x","z",r,e),x[v+1]=sn(w,c,"z","x",r,n);break;case 3:w.set(0,-1,0),x[v+0]=1-sn(w,c,"x","z",r,e),x[v+1]=1-sn(w,c,"z","x",r,n);break;case 4:w.set(0,0,1),x[v+0]=1-sn(w,c,"x","y",r,e),x[v+1]=1-sn(w,c,"y","x",r,t);break;case 5:w.set(0,0,-1),x[v+0]=sn(w,c,"x","y",r,e),x[v+1]=1-sn(w,c,"y","x",r,t);break}}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.segments,e.radius)}}function d_(i,e){const t=i.params,n="#929a9f",s="#38434d",r="#c2c7c9";let o=e,a=null;const h=new Map;function c(m,f,v,g,p,T,M=n){h.has(M)||h.set(M,tl(M));const S=new Ge(Math.min(m,f,v)>=.15?new Zi(m,f,v,1,Math.min(.018,Math.min(m,f,v)*.08)):new Lt(m,f,v),h.get(M).clone());return S.position.set(g,p,T),S.userData={id:i.id,slot:a,tint:!1},o.add(S),S}function l(m,f,v=.035,g=n){const p=new U(...m),T=new U(...f),M=T.clone().sub(p),S=p.clone().add(T).multiplyScalar(.5),E=c(v,M.length(),v,...S.toArray(),g);return E.quaternion.setFromUnitVectors(new U(0,1,0),M.normalize()),E}function u(m,f,v,g,p,T="z",M=r){const S=c(.1,.1,.1,v,g,p,M);return S.geometry.dispose(),S.geometry=new $t(m,m,f,16),T==="z"&&(S.rotation.x=Math.PI/2),T==="x"&&(S.rotation.z=Math.PI/2),S}function d(m,f,v){for(const g of[-m*.44,m*.44])for(const p of[-f*.44,f*.44])c(.07,v,.07,g,v/2,p),c(.18,.025,.18,g,.02,p,s)}function x(m,f,v,g="x",p="#587f90"){u(.11,.27,m,f,v,g,p);for(let T=0;T<5;T++)u(.12,.015,m+(g==="x"?(T-2)*.045:0),f,v+(g==="z"?(T-2)*.045:0),g,s);c(.18,.12,.14,m,f+.12,v,n)}function b(m,f,v){c(.05,.2,.05,m,f,v,s);for(let g=0;g<3;g++)c(.065,.055,.065,m,f+.12+g*.06,v,["#61aa88","#deb24b","#c76459"][g])}function w(m,f,v,g=4,p="z"){for(let T=0;T<g;T++)u(.018,.014,m+(p==="z"?(T-(g-1)/2)*.085:0),f,v+(p==="x"?(T-(g-1)/2)*.085:0),p,s)}if(i.type==="conveyor"&&t.exhibitionDetail){const m=t.length,f=t.width,v=t.height;if(d(m,f,v-.13),Tr({box:c,cylinder:u,rod:l},{length:m,width:f,height:v}),i.id.startsWith("hardware-rack-link-")){const g=Number(i.id.split("-").at(-1)),p=i.dockMode?i.dockMode==="inbound":[0,2].includes(g),T=p?"#e3594e":"#55c987",M=m/2-.45;for(const _ of[-1,1])c(.55,.022,.035,M,v+.085,_*f*.44,T);const S=p?1:-1,E=M+S*.18;for(const _ of[-1,1])l([E,v+.095,0],[E-S*.14,v+.095,_*.11],.025,T);if(typeof document<"u"){const _=document.createElement("canvas");_.width=256,_.height=96;const y=_.getContext("2d");y.fillStyle="#152b3e",y.fillRect(0,0,256,96),y.fillStyle=T,y.font="bold 44px sans-serif",y.textAlign="center",y.fillText(p?"仅入库":"仅出库",128,64);const A=new In(_),P=new da(new Er({map:A,depthTest:!1}));P.userData.ownedTexture=A,P.position.set(M,v+.4,0),P.scale.set(.65,.24,1),e.add(P)}}for(const g of[-f/2,f/2])c(m,.16,.075,0,v-.04,g,n),c(m,.035,.025,0,v+.065,g,s),c(m,.055,.06,0,.22,g);if(t.chainDeck){for(const g of[-f*.34,0,f*.34]){c(m-.14,.07,.115,0,v-.005,g,s);const p=Math.round((m-.16)/.075);for(let T=0;T<p;T++){const M=-m/2+.1+T*(m-.2)/(p-1);c(.047,.025,.1,M,v+.043,g,r);for(const S of[-1,1])c(.058,.025,.018,M,v+.019,g+S*.057,n),u(.012,.14,M,v+.023,g,"z",s)}for(const T of[-m*.44,m*.44]){u(.09,.13,T,v-.025,g,"z",s);for(let M=0;M<10;M++){const S=M*Math.PI/5,E=c(.03,.025,.13,T+Math.cos(S)*.093,v-.025+Math.sin(S)*.093,g,n);E.rotation.z=S}}c(m-.16,.025,.08,0,v-.21,g,s)}for(const g of[-m*.44,m*.44])u(.026,f+.14,g,v-.025,0,"z",r),c(.16,.17,.1,g,v-.025,f/2,n)}else if(t.crossBelt){c(m-.12,.065,f-.1,0,v-.045,0,n),c(m-.18,.035,f-.15,0,v+.018,0,"#3c4851"),c(m-.18,.025,f-.15,0,v-.14,0,s);for(const g of[-f*.37,f*.37]){u(.085,m-.1,0,v-.055,g,"x",s);for(const p of[-m/2,m/2])c(.055,.16,.16,p,v-.055,g,n),u(.035,.09,p,v-.055,g,"x",r)}x(m/2+.16,v-.055,-f*.43,"x"),c(.16,.19,.21,m/2+.025,v-.055,-f*.43,n);for(const g of[-f*.4,f*.4])c(.18,.009,.035,0,v+.041,g,"#d5b54d")}else if(t.flatDeck){c(m-.12,.085,f-.11,0,v+.022,0,r);for(const g of[-m*.43,m*.43])w(g,v+.071,0,4,"x")}else{const g=Math.max(7,Math.round(m/.18));for(let p=0;p<g;p++){const T=-m/2+.1+p*(m-.2)/(g-1);u(.055,f-.11,T,v+.035,0,"z",r);for(const M of[-1,1])u(.022,.035,T,v+.035,M*f/2,"z",s)}}if(t.rightAngleEntry){const g=t.transferX??0;for(const p of[-.32,.32]){c(.065,.035,f-.14,g+p,v+.072,0,s);for(let T=0;T<Math.ceil(f/.075);T++)c(.075,.018,.04,g+p,v+.081,-f/2+.08+T*(f-.16)/(Math.ceil(f/.075)-1),r)}e.userData.cornerTransfer={axis:"z-to-x",surface:v+.09}}if(!t.crossBelt){c(m-.2,.035,.035,0,v-.09,f/2+.06,s);for(let g=0;g<Math.floor(m/.08);g++)c(.035,.025,.04,-m/2+.1+g*.08,v-.07,f/2+.06,n);x(m*.32,v-.22,f/2+.18,"z"),c(.26,.25,.08,m*.32,v-.1,f/2+.09,n)}for(const g of[-m*.43,m*.43])for(const p of[-f*.44,f*.44])c(.105,.04,.105,g,.1,p,s),u(.035,.12,g,.085,p,"y",r),w(g,v-.02,p+.055,2);for(const g of[-m*.4,m*.4])c(.07,.11,.055,g,v+.13,f*.49,"#d6b34c"),c(.025,.025,.025,g,v+.16,f*.51,s);t.chainDeck&&t.endHeight!=null&&e.traverse(g=>{if(!g.isMesh)return;g.updateMatrix(),g.geometry.applyMatrix4(g.matrix);const p=g.geometry.attributes.position;for(let T=0;T<p.count;T++){const M=p.getX(T),S=p.getY(T),E=(t.endHeight-v)*Tt.clamp((m/2-.5-M)/Math.max(.01,m-1),0,1);p.setY(T,S+E*Tt.clamp(S/(v-.13),0,1))}g.geometry.computeVertexNormals(),g.position.set(0,0,0),g.quaternion.identity(),g.scale.set(1,1,1)})}else if(i.type==="hardwareConveyorAssembly"){let M=function(E,_,y,A,P=!1){const C=P?E*f:E*m,D=P?_*m:_*(g?1:f),I=new tt;e.add(I),I.position.set(y*m,0,A*f),P&&(I.rotation.y=Math.PI/2),o=I,Tr({box:c,cylinder:u,rod:l},{length:C,width:D,height:v});for(const B of[-D/2,D/2])c(C,.09,.035,0,v-.075,B,n),c(C,.012,.023,0,v+.018,B-Math.sign(B)*.025,"#387b5c");const F=Math.max(5,Math.floor(C/.115));for(let B=0;B<F;B++)u(.026,D-.065,-C/2+.055+B*(C-.11)/(F-1),v-.026,0,"z",r);for(const B of[-C*.43,C*.43])for(const k of[-D*.44,D*.44])c(.04,v-.11,.045,B,(v-.11)/2,k,n),u(.028,.026,B,.018,k,"y",r);for(const B of[-C*.43,C*.43])c(.035,.05,D*.83,B,v*.35,0,n),l([B,.14,-D*.43],[B,v*.34,D*.43],.017,n);for(const B of[-C*.45,0,C*.45])for(const k of[-D*.49,D*.49])c(.025,.13,.025,B,v+.065,k,s),l([B,v+.12,k],[B+(B>0?-.16:.16),v+.12,k],.01,s);x(C*.14,v-.17,0,"z","#397ba2"),c(.17,.11,.12,-C*.13,v-.2,0,s);for(const B of[-1,1]){c(C-.08,.025,.025,0,v-.055,B*(D/2-.055),"#315f49");for(const k of[-C*.4,C*.4])c(.055,.04,.035,k,v+.1,B*D*.49,s),c(.015,.018,.006,k,v+.1,B*(D*.49+.021),"#cf9d45")}for(const B of[-C*.43,C*.43])for(const k of[-D*.44,D*.44])u(.011,.055,B,.047,k,"y",s);o=e};const m=t.length/4.8,f=t.width/4.4,v=t.height,g=Array.isArray(t.laneCenters)&&t.laneCenters.length===4,p=.66*(g?1:f),T=g?t.laneCenters.map(E=>E/f):[-1.73,-.47,.47,1.73],S=[-2.15*f,...T.slice(0,-1).map((E,_)=>(E+T[_+1])*f/2),2.15*f];for(const E of[-.43,.43])for(let _=0;_<S.length-1;_++){const y=S[_],A=S[_+1];M((A-y-.018)/f,.8,E,(y+A)/2/f,!0)}for(const E of T){M(1.55,.66,-1.625,E),M(1.55,.66,1.625,E);for(const _ of[-1,1])_>0&&c(.035,.14,p,_*2.38*m,v+.045,E*f,n),c(.045,.08,p-.04,_*.84*m,v-.065,E*f,n);for(const _ of[-.43,.43])for(const y of[-1,1])c(.73*m,.012,.025,_*m,v+.006,E*f+y*p*.32,"#34755b")}for(const E of[T[0],T[2]])c(.2,.26,.085,-.86*m,v-.32,E*f,n),c(.08,.05,.012,-.86*m,v-.26,E*f+.05,"#477e91");if(typeof document<"u")for(const[E,_]of[...T].sort((y,A)=>A-y).entries()){const y=document.createElement("canvas");y.width=256,y.height=112;const A=y.getContext("2d");A.fillStyle="#152b3e",A.fillRect(0,0,256,112),A.strokeStyle="#62d1bd",A.lineWidth=6,A.strokeRect(3,3,250,106),A.fillStyle="#ffffff",A.font="bold 66px sans-serif",A.textAlign="center",A.fillText(String(101+E),128,79);const P=new In(y),C=new da(new Er({map:P,depthTest:!1}));C.userData.ownedTexture=P,C.position.set(-2.54*m,v+.35,_*f),C.scale.set(.55,.24,1),e.add(C)}e.userData.hardwareTransverseRows=2,e.userData.hardwareConveyorSize=[t.length,t.width,t.height],e.userData.hardwareLaneCenters=T.map(E=>E*f)}else if(i.type==="hardwareLift"){const m=t.width,f=t.depth,v=t.height,g=t.platformHeight;Hh({box:c,cylinder:u},{width:m,depth:f,height:v});for(const p of[-m*.48,m*.48])for(const T of[-f*.48,f*.48])c(.065,v,.065,p,v/2,T,n),c(.16,.035,.16,p,.018,T,r),c(.018,v-.1,.025,p*.9,v/2,T,s);for(const p of[-f*.48,f*.48])c(m,.08,.06,0,v,p,n);c(m,.045,f,0,.055,0,n);for(const p of[-m*.43,m*.43])c(.065,.12,f*.84,p,g-.09,0,n);for(let p=0;p<7;p++)u(.035,m*.8,0,g,-f*.36+p*f*.72/6,"x",r);for(const p of[-f*.44,f*.44])c(m*.86,.08,.035,0,g-.05,p,s);x(m*.55,v-.18,f*.38,"x"),b(-m*.55,v-.2,f*.48)}else throw Error("不属于公开五金设备类型")}const Ot=i=>i.baseHeight??.5;function Gh(i){const e=Math.max(i.trayLength??.45,.44),t=Math.max(i.length*.12,.3);return{guideX:t,pickupX:t-e*.6,trayLength:e,surfaceY:0}}function p_(i){const e=Math.max(i.height*.65-.2,i.height*.7+.04)+.035;return Math.hypot(e,i.depth*.46+.035)}function m_(i){if(i.floor.exportLayoutRevision!=="537d2e544a20")return i;if(i.floor.physicalHandoffRevision>=1)return Lc(i);const e=d=>i.objects.find(x=>x.name==="展机 · "+d),t=e("料框翻转机"),n=e("右侧交接辊道"),s=e("前端接驳辊道"),r=e("平台接驳段 02"),o=e("平台接驳段");if(!t||!n||!s||!r||!o)return i;const a=t.position[1]+t.params.height*.62-.0875;s.position[2]=t.position[2],s.position[0]=(t.position[0]+t.params.width*.43+n.position[0]+n.params.width/2)/2,s.params.length=n.position[0]+n.params.width/2-(t.position[0]+t.params.width*.43),s.params.width=1.5,s.params.height=a-s.position[1]-.09,s.params.rightAngleEntry=!0,s.params.transferX=n.position[0]-s.position[0],n.params.length=2*(s.position[2]-s.params.width/2-.04-n.position[2]),n.params.endHeight=a-n.position[1]-.0555;const h=i.objects.find(d=>d.type==="exhibitRack");h&&(n.params.startHeight=h.position[1]+.5+(h.params.pickupClearance??.24)-n.position[1]-.0555,n.params.height=n.params.startHeight);const c=t.position[2]-p_(t.params)-.15;r.params.width=1.16,r.position[2]=c-r.params.width/2,o.position[2]=r.position[2]-r.params.width/2-o.params.width/2-.04;const l=i.objects.find(d=>d.type==="exhibitIncline"),u=e("布卷加工机架");return l&&u&&(l.params.upperHeight=u.position[1]+u.params.height+.009-l.position[1]),i.floor.physicalHandoffRevision=1,Lc(i)}function Lc(i){if(i.floor.physicalHandoffRevision>=2)return i;const e=i.objects.find(a=>a.type==="exhibitRack"),t=i.objects.find(a=>a.name==="展机 · 料框翻转机"),n=i.objects.find(a=>a.name==="展机 · 右侧交接辊道");if(!e||!t||!n)return i;const s=t.position[1]+(t.params.height*.62-.0875)*t.scale[1],r=Ot(e.params);e.params.baseHeight=(s-e.position[1])/e.scale[1]-(e.params.pickupClearance??.24),n.params.height=(s-n.position[1])/n.scale[1]-.0555,delete n.params.startHeight,delete n.params.endHeight;const o=i.objects.find(a=>a.name==="展机 · 机器人交接载具");return o&&(o.position[1]+=(e.params.baseHeight-r)*e.scale[1]),i.floor.physicalHandoffRevision=2,i}function Es(i,e,t,n=0){const r=Math.min(1.1,i-.08),o=Math.min(.13,t*.14)+.0175,a=["#b78e59","#d1bd96","#a7b8c2","#7d8f9e","#c5b7a8"],h=[];for(let c=-e/2+.07+.17;c+.17<=e/2-.06&&!(o+.17*2>t-.06);c+=.17*2+.025)h.push({radius:.17,length:r,color:a[(n+h.length)%a.length],offset:[0,o+.17,c]});return h}function g_(i=globalThis.crypto){if(typeof(i==null?void 0:i.randomUUID)=="function")return i.randomUUID();const e=new Uint8Array(16);if(typeof(i==null?void 0:i.getRandomValues)=="function")i.getRandomValues(e);else for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=Array.from(e,n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const v_=2,__="exhibition-assembly",x_="展会总装 · 图片重建",y_={width:16,depth:12,centerZ:1.2,referenceRevision:1,exitSide:"A",exitReserve:10,looseCargoCleared:1,secondPlatformAdded:!0,arrangementRevision:1,rackDockRevision:1,clothBeltWidthRevision:1,assemblyOutlineRevision:1,zhufengAdded:1,sideSealAdded:1,exportLayoutRevision:"537d2e544a20",physicalHandoffRevision:2},M_=[{id:"0719b53f-4ccb-4026-86d1-52253a3517f5",type:"exhibitRack",name:"展机 · 三层载具货架",position:[.012,0,-2.272],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{bays:7,levels:3,bayWidth:2,levelHeight:1.35,depth:1.8,loaded:!0,shuttleLane:!0,laneWidth:1.8,pickupClearance:.24,liftBay:5,frontDocks:[{bay:1,length:4.0280000000000005,gauge:.96},{bay:6,length:5.904999999999999}],exitBay:6,baseHeight:.6954999999999999},initialOccupiedSlots:[1,3,8,10,12,15,17,19]},{id:"50298fac-c76b-447e-aef7-225a0e6f8103",type:"exhibitRobot",name:"展机 · 机器人工作站",position:[-5.988,0,2.156],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{height:2.65}},{id:"daec6fbb-bb4c-41ff-8cc0-9f831ae1b33a",type:"exhibitHood",name:"展机 · 料框翻转机",position:[2.05,0,4.674],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{width:2,depth:1.8,height:1.65,angle:0,loaded:!1}},{id:"bc8655ab-95a7-4357-912e-43c70dc9490e",type:"conveyor",name:"展机 · 左侧辊道",position:[-5.465,0,3.927],rotation:[0,0,0],scale:[1,1,1],color:"#abb6bf",visible:!0,roughness:.55,metalness:.2,params:{length:2.1,width:.5,height:.7,exhibitionDetail:!0}},{id:"db1cf9d5-ed27-48bb-8ebf-0aef5caebcbf",type:"conveyor",name:"展机 · 右侧交接辊道",position:[3.95,0,1.433],rotation:[0,90,0],scale:[1,1,1],color:"#abb6bf",visible:!0,roughness:.55,metalness:.2,params:{length:4.902000000000001,width:1.15,height:.8799999999999999,exhibitionDetail:!0,chainDeck:!0}},{id:"5ec1ed84-2207-4c29-9254-4d7d7ed098f7",type:"conveyor",name:"展机 · 平台接驳段",position:[2.05,0,1.1714458412423205],rotation:[0,0,0],scale:[1,1,1],color:"#abb6bf",visible:!0,roughness:.55,metalness:.2,params:{length:2,width:1.3,height:.55,exhibitionDetail:!0,flatDeck:!1,crossBelt:!0}},{id:"bfb30416-b591-4459-9ea3-04bdde0e9c14",type:"conveyor",name:"展机 · 前端接驳辊道",position:[3.7175,0,4.674],rotation:[0,0,0],scale:[1,1,1],color:"#abb6bf",visible:!0,roughness:.55,metalness:.2,params:{length:1.6150000000000007,width:1.5,height:.8454999999999999,exhibitionDetail:!0,rightAngleEntry:!0,transferX:.23250000000000037}},{id:"05bc2a3c-fbdd-4a24-bf46-08e0a9d498c7",type:"exhibitCarrier",name:"展机 · 机器人交接载具",position:[-5.988,.9354999999999999,.6499999999999999],rotation:[0,0,0],scale:[1,1,1],color:"#b0b3b1",visible:!0,roughness:.55,metalness:.2,params:{width:1.52,depth:1.368,height:.9500000000000001},note:"沿第一列前伸导轨回库的装卷料框"},{id:"0e3e7935-1240-49ec-a314-0c83cedbcc75",type:"exhibitCarrier",name:"展机 · 辊道载具",position:[3.95,.78,2.65],rotation:[0,0,0],scale:[1,1,1],color:"#b0b3b1",visible:!1,roughness:.55,metalness:.2,params:{width:1.08,depth:1.3,height:1.05}},{id:"1bdf1775-968f-458d-8a88-1b853ffaf106",type:"exhibitAgv",name:"展机 · 移动底盘",position:[6.022,0,-.629],rotation:[0,0,0],scale:[1,1,1],color:"#e8ad24",visible:!0,roughness:.55,metalness:.2,params:{width:1.1,depth:1.05,height:.32}},{id:"7f200718-b227-4729-a703-ca0d88e06068",type:"exhibitCarrier",name:"展机 · 小车载具",position:[5.15,.38,.15],rotation:[0,0,0],scale:[1,1,1],color:"#b0b3b1",visible:!1,roughness:.55,metalness:.2,params:{width:1.08,depth:1.3,height:1.05},followDevice:"1bdf1775-968f-458d-8a88-1b853ffaf106"},{id:"328fdde1-6118-4625-ad12-59b064010588",type:"conveyor",name:"展机 · 平台接驳段 02",position:[2.05,0,2.4414458412423206],rotation:[0,0,0],scale:[1,1,1],color:"#abb6bf",visible:!0,roughness:.55,metalness:.2,params:{length:2,width:1.16,height:.55,exhibitionDetail:!0,flatDeck:!1,crossBelt:!0}},{id:"d9f37291-6e6a-427a-bae9-6e7364bcd5d2",type:"exhibitProcess",name:"展机 · 布卷加工机架",position:[1.773,0,-.163],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{width:3,depth:.5,height:1.1,photoBeltRevision:1},note:"按照片制作的平皮带输送机，整面黑色皮带、金属护板和四腿支架。"},{id:"044ccad8-3b65-48d8-bf12-8dbb46794949",type:"exhibitZhufeng",name:"展机 · 主峰机械",position:[-1.649,0,.059],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{width:3.8,depth:2,height:2.1},note:"按设备照片制作：顶部三根长辊、宽横梁、开口侧板、传动机构和底座。"},{id:"586e6227-c75a-4d62-aeb8-e27fc8eaa547",type:"exhibitSideSeal",name:"展机 · 侧封侧拍机械",position:[-1.599,0,2.709],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{width:3.8,depth:2.3,height:1.7,internalLowering:.15},note:"按照片还原两侧圆弧罩壳、多组窄皮带、侧拍执行机构、网罩和弯管。"},{id:"929b4768-0e2a-4799-a437-34acc85582e7",type:"exhibitBeltModule",name:"窄皮带移载机构",position:[-1.583,0,1.416],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{width:1.6,depth:.8,height:.75,lanes:3}},{id:"a9e61f09-ba36-4a05-a390-d3c52d9230c6",type:"exhibitProcess",name:"展机 · 布卷加工机架 副本",position:[-2.184,-.047,3.949],rotation:[0,0,0],scale:[1,1,1],color:"#a9afb1",visible:!0,roughness:.55,metalness:.2,params:{width:4.5,depth:.5,height:.8,photoBeltRevision:1}},{id:"exhibition-cloth-incline",type:"exhibitIncline",name:"展机 · 布卷链条提升机",position:[2.05,0,.355],rotation:[0,90,0],scale:[1,1,1],visible:!0,color:"#a9afb1",roughness:.55,metalness:.3,params:{length:1.2870000000000001,width:1.52,lowerHeight:.55,upperHeight:1.109,trayLength:.45,trayWidth:.12,visualGap:.22}}],S_=2026,b_={version:v_,id:__,name:x_,floor:y_,objects:M_,seed:S_},Wh={hardwareConveyorAssembly:{length:4.8,width:4.4,height:.81},hardwareLift:{width:1.15,depth:1.25,height:1.9,platformHeight:.72},exhibitIncline:{length:1.3,width:1.5,lowerHeight:.55,upperHeight:.8,trayLength:.45,trayWidth:.12},exhibitLift:{width:1.9,depth:1.8,height:4.2},exhibitRack:{bays:7,levels:3,bayWidth:1.35,levelHeight:1.35,depth:1.8,loaded:!0,shuttleLane:!0,laneWidth:1.8,pickupClearance:.24,baseHeight:.5},exhibitCarrier:{width:1.08,depth:1.3,height:1.05},exhibitTransfer:{width:3.8,depth:.5,height:.8,clothBeltVersion:0},exhibitProcess:{width:3.8,depth:.5,height:.8},exhibitZhufeng:{width:3.8,depth:.9,height:2.1},exhibitSideSeal:{width:3.8,depth:2.3,height:1.7,internalLowering:.15},exhibitBeltModule:{width:2.4,depth:1.6,height:.75,lanes:3},exhibitHood:{width:2,depth:1.8,height:1.65,angle:0,loaded:!1},exhibitRobot:{height:2.65},exhibitAgv:{width:1.1,depth:1.05,height:.32}},E_={hardwareConveyorAssembly:[["length","总长 · m",2,8,.01],["width","总宽 · m",2,8,.01],["height","输送面高度 · m",.5,1.5,.01]],hardwareLift:[["width","平台宽度 · m",.6,3,.01],["depth","平台长度 · m",.6,3,.01],["height","机架高度 · m",1,4,.05],["platformHeight","平台高度 · m",.3,3,.01]],exhibitIncline:[["length","水平长度 · m",.2,6,.01],["width","皮带宽度 · m",.3,3,.01],["lowerHeight","低端高度 · m",.2,3,.01],["upperHeight","高端高度 · m",.3,4,.01],["trayLength","承托板长度 · m",.15,.8,.01],["trayWidth","承托板宽度 · m",.06,.25,.01]],exhibitLift:[["width","平台宽度 · m",1,3,.05],["depth","平台深度 · m",1,3,.05],["height","提升机高度 · m",2,8,.05]],exhibitRack:[["baseHeight","首层轨道高度 · m",.2,2,.01],["bays","货架列数",1,16,1],["levels","货架层数",1,8,1],["bayWidth","列间距 · m",.8,3,.05],["levelHeight","层间距 · m",.8,2.5,.05],["depth","存放区深度 · m",1,4,.05],["laneWidth","穿梭通道宽度 · m",.6,4,.05],["pickupClearance","料框底部净空 · m",.12,.35,.01]],exhibitCarrier:[["width","载具宽度 · m",.5,3,.05],["depth","载具深度 · m",.5,3,.05],["height","载具高度 · m",.5,2,.05]],exhibitTransfer:[["width","输送长度 · m",.5,8,.01],["depth","输送宽度 · m",.3,4,.01],["height","输送面高度 · m",.5,4,.05]],exhibitProcess:[["width","输送长度 · m",.5,8,.01],["depth","输送宽度 · m",.3,4,.01],["height","输送面高度 · m",.5,3.5,.05]],exhibitZhufeng:[["width","设备长度 · m",1.5,8,.05],["depth","设备深度 · m",.5,2.5,.05],["height","设备高度 · m",1,4,.05]],exhibitSideSeal:[["width","设备宽度 · m",2.5,6,.05],["depth","设备深度 · m",1.5,4,.05],["height","设备高度 · m",1.2,3,.05],["internalLowering","内部机构降低 · m",0,.3,.01]],exhibitBeltModule:[["width","机构宽度 · m",1,6,.05],["depth","皮带长度 · m",.4,4,.01],["height","输送面高度 · m",.4,2,.05],["lanes","皮带组数",2,6,1]],exhibitHood:[["width","设备宽度 · m",1,4,.1],["depth","设备深度 · m",1,4,.1],["height","设备高度 · m",1,3,.1],["angle","翻转角度 · °",0,110,1]],exhibitRobot:[["height","机器人高度 · m",1.5,4,.05]],exhibitAgv:[["width","底盘宽度 · m",.6,2,.05],["depth","底盘深度 · m",.6,2,.05],["height","底盘高度 · m",.2,.6,.02]]};function w_(){return m_(JSON.parse(JSON.stringify(b_)))}function T_(i,e){if(["hardwareConveyorAssembly","hardwareLift"].includes(i.type)||i.type==="conveyor"&&i.params.exhibitionDetail)return d_(i,e);const t=i.params,n="#929a9f",s="#38434d",r="#c2c7c9",o="#c3ad6d";let a=e,h=null;const c=new Map;function l(v,g,p,T,M,S,E=n){c.has(E)||c.set(E,tl(E));const _=new Ge(Math.min(v,g,p)>=.15&&!["exhibitRack","exhibitCarrier"].includes(i.type)?new Zi(v,g,p,1,Math.min(.018,Math.min(v,g,p)*.08)):new Lt(v,g,p),c.get(E).clone());return _.position.set(T,M,S),_.userData={id:i.id,slot:h,tint:!1},a.add(_),_}function u(v,g,p=.035,T=n){const M=new U(...v),S=new U(...g),E=S.clone().sub(M),_=M.clone().add(S).multiplyScalar(.5),y=l(p,E.length(),p,..._.toArray(),T);return y.quaternion.setFromUnitVectors(new U(0,1,0),E.normalize()),y}function d(v,g,p,T,M,S="z",E=r){const _=l(.1,.1,.1,p,T,M,E);return _.geometry.dispose(),_.geometry=new $t(v,v,g,16),S==="z"&&(_.rotation.x=Math.PI/2),S==="x"&&(_.rotation.z=Math.PI/2),_}function x(v,g,p){for(const T of[-v*.44,v*.44])for(const M of[-g*.44,g*.44])l(.07,p,.07,T,p/2,M),l(.18,.025,.18,T,.02,M,s)}function b(v,g,p,T=0,M=0,S=0,E=!1){const _=Math.min(.13,p*.14),y=M+_,A=p-_,P=A*.62,C=.025;u_({box:l,cylinder:d},{width:v,depth:g,height:p,x:T,y:M,z:S});for(const D of[-v/2,v/2])l(.035,.03,g,T+D,M+.015,S,r);for(const D of[-g/2,g/2]){l(v,.03,.035,T,M+.015,S+D,r),l(v,.03,.035,T,y-.025,S+D,r);for(const I of[-v/2,-v*.25,v*.25,v/2])l(.025,_-.03,.03,T+I,M+_/2,S+D,n)}for(const D of[-v*.447,v*.447])l(.035,.03,g,T+D,M+.015,S,r);if(l(v,.035,g,T,y,S,i.color),E)for(const D of Es(v,g,p,h??0)){const I=T+D.offset[0],F=M+D.offset[1],B=S+D.offset[2],k=d(D.radius,D.length,I,F,B,"x",D.color);k.material.metalness=0,k.material.roughness=.94,Vh({cylinder:d},{radius:D.radius,length:D.length,x:I,y:F,z:B,color:D.color})}for(const D of[-1,1]){const I=S+D*g/2,F=I+D*.022;l(v,P,C,T,y+P/2,I,i.color);for(const B of[-v*.335,v*.335])l(v*.33,A-P,C,T+B,y+(A+P)/2,I,i.color);for(const B of[-v*.335,v*.335]){const k=v*.33-.035,H=A-.035;for(const J of[-1,1])l(.012,H,.012,T+B+J*k/2,y+A/2,F,r);for(const J of[y+.018,y+A-.018])l(k,.012,.012,T+B,J,F,r)}l(v*.34,.012,.012,T,y+P-.008,F,r),l(v,.018,.018,T,y+.018,F,r)}}function w(v,g,p){l(.05,.2,.05,v,g,p,s);for(let T=0;T<3;T++)l(.065,.055,.065,v,g+.12+T*.06,p,["#61aa88","#deb24b","#c76459"][T])}function m(v,g,p,T=4,M="z"){for(let S=0;S<T;S++)d(.018,.014,v+(M==="z"?(S-(T-1)/2)*.085:0),g,p+(M==="x"?(S-(T-1)/2)*.085:0),M,s)}function f(v,g,p,T="x",M="#587f90"){d(.11,.27,v,g,p,T,M);for(let S=0;S<5;S++)d(.12,.015,v+(T==="x"?(S-2)*.045:0),g,p+(T==="z"?(S-2)*.045:0),T,s);l(.18,.12,.14,v,g+.12,p,n)}if(i.type==="exhibitRack"){const v=Ot(t),g=t.bays*t.bayWidth,p=v+.1+t.levels*t.levelHeight,T=t.pickupClearance??.24;for(let M=0;M<=t.bays;M++)for(const S of[-t.depth/2,t.depth/2]){const E=M*t.bayWidth-g/2;l(.065,p,.065,E,p/2,S),ya({box:l,cylinder:d},E,S)}for(let M=0;M<=t.bays;M++)l(.09,.11,t.depth+.08,M*t.bayWidth-g/2,p,0,s);for(let M=0;M<t.levels;M++){const S=v+M*t.levelHeight;for(const E of[-t.depth/2,t.depth/2])l(g,.075,.07,0,S,E);for(let E=0;E<t.bays;E++){const _=(E+.5)*t.bayWidth-g/2;if(E+1===t.liftBay)continue;for(const D of[-t.bayWidth*.43,t.bayWidth*.43])l(.05,.065,t.depth,_+D,S,0);const y=Math.min(.07,T*.3),A=T-y;for(const D of[-1,1])l(t.bayWidth*.26,A,t.depth*.86,_+D*t.bayWidth*.37,S+A/2,0,n),l(t.bayWidth*.22,y,t.depth*.86,_+D*t.bayWidth*.39,S+A+y/2,0,n),l(t.bayWidth*.22,.012,t.depth*.86,_+D*t.bayWidth*.39,S+T-.006,0,r);const P=Math.max(t.laneWidth??1.8,t.depth*.76+.24),C=t.depth+P-.2;for(const D of[-1,1]){const I=_+D*t.bayWidth*.2;l(.055,.035,C,I,S+.0175,-P/2,r),l(.018,.03,C,I+D*.026,S-.012,-P/2,s);for(const F of[-t.depth*.4,0,t.depth*.4])l(.1,.025,.09,I,S-.025,F,n)}t.loaded&&!(M===0&&E+1===t.exitBay)&&(h=M*t.bays+E,b(t.bayWidth*.76,t.depth*.76,Math.min(t.levelHeight*.76,t.levelHeight-T-.16),_,S+T,0,!0),h=null)}}for(const M of t.frontDocks||[]){const S=(M.bay-.5)*t.bayWidth-g/2,E=t.depth/2-.12,_=M.length+.12,y=E+_/2,A=v;for(const P of[-1,1]){const C=S+P*(M.gauge??t.bayWidth*.4)/2;if(M.gauge){const D=S+P*t.bayWidth*.2;u([D,A+.0175,E-.08],[C,A+.0175,E+.15],.028,r)}l(.055,.035,_,C,A+.0175,y,r),l(.018,.055,_,C+P*.026,A-.0275,y,s);for(const D of[E+.12,E+_*.5,E+_-.12])l(.12,.07,.14,C,A-.075,D,n),l(.07,A-.15,.07,C,(A-.15)/2,D,n),l(.16,.04,.16,C,.02,D,s);l(.04,.055,.08,C,A+.045,E+_,"#d5b73e")}for(const P of[E+.12,E+_*.5,E+_-.12])l(t.bayWidth*.46,.05,.055,S,A-.11,P,n)}if(t.liftBay){const M=(t.liftBay-.5)*t.bayWidth-g/2;for(const E of[-t.bayWidth*.42,t.bayWidth*.42])l(.06,p-.15,.08,M+E,p/2,0,r),l(.09,.15,.13,M+E,p-.12,0,s);l(t.bayWidth*.8,.15,.22,M,p-.12,0,n),f(M,p-.18,.25,"z");const S=new tt;e.add(S),S.position.set(M,v,0),e.userData.rackLift=S,a=S,l(t.bayWidth*.78,.1,t.depth*.86,0,-.08,0,n);for(const E of[-t.bayWidth*.2,t.bayWidth*.2])l(.055,.035,t.depth*.92,E,.0175,0,r);for(const E of[-t.bayWidth*.37,t.bayWidth*.37])l(.035,.08,t.depth*.86,E,.02,0,"#d5b73e");a=e}for(const M of[-g/2,g/2])for(let S=0;S<t.levels;S++){const E=v-.2+S*t.levelHeight;u([M,E,-t.depth/2],[M,E+t.levelHeight,t.depth/2]),u([M,E,t.depth/2],[M,E+t.levelHeight,-t.depth/2])}for(let M=1;M<=t.levels;M++)l(g,.045,.04,0,v+M*t.levelHeight,-t.depth/2);if(t.shuttleLane!==!1){const M=Math.max(t.laneWidth??1.8,t.depth*.76+.24),S=-t.depth/2,E=S-M;for(let _=0;_<=t.bays;_++){const y=_*t.bayWidth-g/2;l(.065,p,.065,y,p/2,E,n),ya({box:l,cylinder:d},y,E),l(.09,.11,M,y,p,S-M/2,s);for(let A=0;A<t.levels;A++)l(.06,.085,M,y,v+A*t.levelHeight-.025,S-M/2,n)}for(let _=0;_<t.levels;_++){const y=v+_*t.levelHeight;for(let A=0;A<t.bays;A++){const P=(A+.5)*t.bayWidth-g/2;for(let C=0;C<12;C++)l(t.bayWidth-.12,.012,.012,P,y-.07,S-.09-C*(M-.18)/11,o);for(let C=0;C<12;C++)l(.012,.012,M-.18,P-t.bayWidth*.44+C*t.bayWidth*.88/11,y-.072,S-M/2,o)}l(g,.09,.065,0,y-.015,E,n);for(const A of[S-.12,E+.12]){l(g,.035,.065,0,y+.0175,A,r),l(g,.03,.02,0,y-.012,A+.031,s);for(let P=0;P<=t.bays;P++)l(.15,.025,.12,P*t.bayWidth-g/2,y+.028,A,n)}for(const A of[-g/2+.055,g/2-.055])for(const P of[S-.12,E+.12])l(.045,.09,.09,A,y+.12,P,n),l(.02,.065,.065,A,y+.12,P,s)}for(const _ of[-g/2,g/2])u([_,.12,E],[_,.42,S],.028,n)}}else if(i.type==="exhibitLift"){const v=t.width,g=t.depth,p=t.height;Hh({box:l,cylinder:d},{width:v,depth:g,height:p});for(const M of[-v/2,v/2])for(const S of[-g/2,g/2])l(.1,p,.1,M,p/2,S,n),l(.24,.045,.24,M,.023,S,s),l(.026,p-.15,.035,M*.9,p/2,S,r);for(const M of[-g/2,g/2])l(v+.1,.12,.1,0,p,M,s),l(v+.1,.1,.1,0,.1,M,n);l(v+.1,.035,g+.1,0,p+.08,0,n),f(v/2+.2,p-.18,0,"x");const T=new tt;e.add(T),e.userData.lift=T,e.userData.baseLift=0,a=T,f_({box:l,cylinder:d},{width:v,depth:g}),l(v-.08,.12,g-.06,0,-.07,0,n);for(const M of[-g*.43,g*.43])l(v-.04,.04,.055,0,.02,M,r),l(v-.1,.05,.035,0,-.05,M,s);for(const M of[-v*.3,v*.3])l(.055,.04,g-.06,M,.02,0,r);a=e}else if(i.type==="exhibitCarrier")b(t.width,t.depth,t.height);else if(i.type==="exhibitBeltModule"){const v=t.width,g=t.depth,p=t.height,T=v/t.lanes,M=Math.min(.16,T*.23),S=g*.9;for(const E of[-g*.37,g*.37])l(v,.1,.08,0,p-.21,E,n),d(.025,v+.08,0,p-.12,E,"x",r),l(v,.06,.07,0,.2,E,n);for(const E of[-v*.43,v*.43])for(const _ of[-g*.36,g*.36])l(.06,p-.21,.06,E,(p-.21)/2,_,n),l(.14,.025,.14,E,.015,_,s);for(let E=0;E<t.lanes;E++){const _=(E+.5)*T-v/2;for(const y of[-1,1]){const A=_+y*T*.2;l(M,.023,S,A,p,0,"#43484b"),l(M,.018,S,A,p-.11,0,s);for(const P of[-1,1])l(.024,.11,S,A+P*(M/2+.012),p-.052,0,n);for(const P of[-S/2,S/2]){d(.055,M+.065,A,p-.047,P,"x",r);for(const C of[-1,1])l(.04,.12,.12,A+C*(M/2+.04),p-.05,P,n),d(.018,.055,A+C*(M/2+.045),p-.047,P,"x",s)}for(const P of[-g*.34,g*.34])l(.09,.08,.12,A,p-.16,P,"#429475"),d(.033,.065,A,p-.125,P,"x",r)}l(.055,.05,S,_,p+.025,0,r);for(const y of[-g*.24,0,g*.24])l(.15,.035,.1,_,p+.067,y,n),d(.017,.07,_,p+.116,y,"y",r),l(.065,.045,.065,_,p+.084,y,s);l(T*.64,.04,.16,_,p-.18,0,r),d(.035,.22,_,p-.27,0,"z",n),d(.013,.23,_,p-.27,.19,"z",r),u([_-T*.14,p-.17,-g*.25],[_-T*.14,p-.07,-g*.12],.018,n)}for(const E of[-g*.26,g*.26]){d(.025,v*.91,0,p-.27,E,"x",r);for(const _ of[-v*.35,v*.35])d(.04,.09,_,p-.27,E,"x","#cad23a"),l(.095,.11,.095,_,p-.31,E,"#429475")}for(const E of[-v*.42,v*.42]){l(.06,.035,g*.7,E,p-.34,0,s);for(let _=0;_<18;_++)l(.045,.017,.025,E,p-.31,-g*.33+_*g*.66/17,n)}f(0,p-.39,-g*.18,"x","#267d67"),l(.25,.14,.23,0,p-.26,-g*.18,n)}else if(i.type==="exhibitSideSeal"){const v=t.width,g=t.depth,p=t.height,T=p*.51,M=v*.19,S=v-M*2,E="#278dcc",_="#c4d42d",y=(I,F,B,k,H,J,ne)=>{const ue=new si;ue.moveTo(-I/2+ne,-F/2),ue.lineTo(I/2-ne,-F/2),ue.quadraticCurveTo(I/2,-F/2,I/2,-F/2+ne),ue.lineTo(I/2,F/2-ne),ue.quadraticCurveTo(I/2,F/2,I/2-ne,F/2),ue.lineTo(-I/2+ne,F/2),ue.quadraticCurveTo(-I/2,F/2,-I/2,F/2-ne),ue.lineTo(-I/2,-F/2+ne),ue.quadraticCurveTo(-I/2,-F/2,-I/2+ne,-F/2);const Q=l(I,F,B,k,H,J,r);return Q.geometry.dispose(),Q.geometry=new Hn(ue,{depth:B,bevelEnabled:!1,curveSegments:12}),Q.geometry.translate(0,0,-B/2),Q};for(const I of[-1,1]){const F=I*(v/2-M/2);y(M,p*.84,g*.76,F,p*.45,0,.07);for(const ne of[p*.32,p*.58])l(M-.025,.012,g*.77,F,ne,0,s);const B=new si,k=M*.67,H=p*.72;B.moveTo(-k/2,0),B.lineTo(k/2,0),B.lineTo(k/2,H-k/2),B.absarc(0,H-k/2,k/2,0,Math.PI,!1),B.closePath();const J=l(k,H,.2,F,p*.07,-g*.4,r);J.geometry.dispose(),J.geometry=new Hn(B,{depth:.22,bevelEnabled:!1,curveSegments:24}),J.geometry.translate(0,0,-.11),J.position.y=p*.07,l(M*.85,.024,g*.68,F,p*.88,0,n),d(.075,.008,F,p*.898,g*.04,"y",s),d(.062,.01,F,p*.903,g*.04,"y",n);for(const ne of[-g*.26,g*.27])for(const ue of[-M*.36,M*.36])d(.009,.008,F+ue,p*.9,ne,"y",s);if(d(p*.105,.018,I*(v/2-M-.014),p*.65,g*.1,"x",s),d(p*.075,.023,I*(v/2-M-.028),p*.65,g*.1,"x",n),l(.018,p*.27,g*.25,I*(v/2-M-.018),p*.68,-g*.22,n),I<0){l(M*.61,p*.18,.025,F,p*.66,g*.39,s),l(M*.53,p*.13,.028,F,p*.68,g*.407,"#76969e");for(let ne=0;ne<3;ne++)d(.017,.015,F+(ne-1)*.08,p*.55,g*.417,"z",["#5fa78d","#d8bc4e","#bd6660"][ne])}for(const ne of[-g*.31,g*.31])d(.017,.12,F,.055,ne,"y",r),d(.05,.018,F,.013,ne,"y",s)}const A=new tt;e.add(A),a=A,A.position.y=-Math.min(t.internalLowering??.15,p*.2);for(const I of[-g*.35,g*.35])l(S,.11,.09,0,T-.08,I,n),l(S,.05,.06,0,.25,I,s);for(const I of[-S*.32,0,S*.32]){for(const F of[-.075,.075])l(.1,.035,g*.69,I+F,T+.026,0,s),l(.11,.08,g*.72,I+F,T-.035,0,n);for(const F of[-g*.33,g*.33]){d(.06,.28,I,T-.02,F,"x",r);for(const B of[-.13,.13])l(.06,.12,.12,I+B,T-.02,F,"#56988b")}l(.055,.11,g*.69,I,T+.08,0,n);for(const F of[-g*.25,0,g*.25])l(.23,.04,.12,I,T+.14,F,r),d(.018,.075,I,T+.19,F,"y",r)}for(const I of[-g*.24,g*.24]){d(.022,S,0,T+.02,I,"x",r),l(S*.78,.08,.1,0,T+.11,I,E);for(const F of[-S*.29,S*.29])l(S*.2,.035,.13,F,T+.19,I,_),l(.095,.1,.16,F,T+.08,I,"#4b9a8f")}for(const I of[-S*.35,S*.35])f(I,T-.2,-g*.25,"x","#397f78"),l(.18,.13,.2,I,T-.08,-g*.25,n);a=e;const P=g*.56,C=v*.67,D=p*.27;for(const I of[P-.2,P+.2])for(const F of[.07,D+.07])l(C,.035,.035,0,F,I,n);for(const I of[-C/2,0,C/2])for(const F of[P-.2,P+.2])l(.035,D,.035,I,D/2+.07,F,n);for(let I=0;I<=32;I++){const F=-C/2+I*C/32;l(.007,D,.007,F,D/2+.07,P+.2,s),l(.007,.007,.4,F,.07,P,s)}for(let I=1;I<8;I++)l(C,.007,.007,0,.07+I*D/8,P+.2,s);for(const I of[-1,1]){const F=I*(v/2-M*.5),B=new _h([new U(F,.19,g*.36),new U(F,.19,g*.55),new U(I*(C/2+.12),.19,P),new U(I*C/2,.19,P)]),k=l(.1,.1,.1,0,0,0,r);k.geometry.dispose(),k.geometry=new Xa(B,20,.085,12,!1)}}else if(i.type==="exhibitZhufeng"){const v=t.width,g=t.depth,p=t.height,T=.055,M=p*.77;for(const E of[-v*.48,v*.48]){for(const _ of[-g*.37,g*.37])l(T,p,.12,E,p/2,_,n),l(.18,.025,.21,E,.013,_,s);l(T,.34,g,E,p-.17,0,n),l(T,.13,g,E,.22,0,n);for(const _ of[-g*.32,g*.32])d(.08,.065,E,p+.07,_,"x",n),d(.04,.069,E,p+.07,_,"x",s);l(.09,p*.64,.06,E,p*.39,g*.44,s),l(.025,p*.61,.015,E+.052,p*.4,g*.48,"#5380a0"),l(.13,p*.56,.025,E*.95,p*.36,g*.46,r);for(let _=0;_<18;_++)for(let y=0;y<3;y++)l(.018,.022,.008,E*.95+(y-1)*.031,p*.1+_*p*.025,g*.478,s);for(const _ of[-g*.37,g*.37])for(const y of[.32,p*.6,p-.1])d(.012,.065,E,y,_,"x",s)}for(const E of[-g*.37,g*.37])l(v,.08,.08,0,.12,E,n),l(v,.055,.065,0,p*.34,E,s);for(const E of[-v*.27,0,v*.27])l(.07,p*.52,.07,E,p*.26+.12,-g*.32,n),l(.14,.025,.14,E,.13,-g*.32,r);for(const E of[-g*.37,g*.37])l(v,.38,.035,0,M,E,r),l(v,.04,.065,0,M+.21,E,n);for(const[E,_,y]of[[-g*.28,p+.015,.075],[0,p-.05,.06],[g*.28,p-.07,.06]]){d(y,v-.14,0,_,E,"x",r);for(const A of[-v*.47,v*.47])d(y*.65,.065,A,_,E,"x",s),l(.09,.11,.12,A,_-.035,E,"#579b94")}l(v-.18,.12,.08,0,p*.48,g*.35,n),l(v-.16,.035,.07,0,p*.44,g*.395,s);const S=Math.max(12,Math.round(v/.12));for(let E=0;E<S;E++){const _=-v*.45+E*v*.9/(S-1);d(.013,.045,_,p*.49,g*.4,"z",s),l(.025,.055,.02,_,p*.56,g*.39,n)}d(.075,g*.7,v*.46,p*.32,0,"z",s),f(-v/2-.17,p*.55,-g*.34,"y","#477990"),l(.22,.19,.24,-v/2-.12,p*.68,-g*.34,n),f(v/2+.16,p*.87,g*.24,"x",s),f(v/2+.15,p*.22,g*.18,"y",s);for(const E of[-g*.23,g*.23]){l(v*.88,.075,.07,0,p*.39,E,n),d(.025,v*.84,0,p*.43,E,"x",r),d(.035,v*.84,0,p*.27,E,"x",s);for(const _ of[-v*.42,v*.42])l(.11,.12,.12,_,p*.43,E,n),d(.055,.07,_,p*.27,E,"x","#579b94")}for(const E of[-v*.33,-v*.11,v*.11,v*.33]){l(.15,.045,g*.63,E,p*.47,0,n),d(.045,g*.56,E,p*.51,0,"z",r);for(const _ of[-g*.27,g*.27])l(.08,.09,.08,E,p*.49,_,s)}for(const E of[-v*.29,v*.29]){l(v*.13,.08,g*.56,E,p*.32,0,r);for(const _ of[-g*.23,g*.23])l(.14,.075,.11,E,p*.39,_,"#537c91"),d(.032,p*.18,E,p*.53,_,"y",r),d(.052,p*.11,E,p*.43,_,"y",s);l(.19,.16,.16,E,p*.22,0,n),u([E,p*.24,g*.08],[E+.12,p*.38,g*.22],.018,"#31556a")}for(const E of[-v*.4,v*.4]){d(.105,.06,E,p*.27,-g*.23,"x",n),d(.078,.065,E,p*.52,-g*.23,"x",s),l(.065,p*.25,.025,E,p*.395,-g*.31,s);for(let _=0;_<10;_++)l(.018,.025,.03,E,p*.28+_*p*.023,-g*.33,r);l(.21,.17,.17,E,p*.2,g*.06,n)}l(v*.68,.035,g*.5,0,p*.16,0,n);for(const E of[-v*.2,0,v*.2])l(.055,p*.16,.055,E,p*.24,-g*.23,n);w(-v*.42,p+.2,-g*.4)}else if(i.type==="exhibitIncline"){t.length;const v=t.width,g=t.lowerHeight,p=t.upperHeight,T=p+.3,M=Gh(t),S=M.trayLength,E=t.trayWidth??.12,_=M.guideX;for(const P of[-v*.48,v*.48])l(.09,T,.1,_,T/2,P,n),l(.2,.03,.2,_,.015,P,r),l(.05,T-.15,.04,_-.05,T/2,P,r);for(const P of[.12,T-.05])l(.1,.09,v,_,P,0,n);for(const P of[-v*.35,0,v*.35]){l(.025,T-.12,.03,_,T/2,P,s);for(let C=0;C<Math.ceil(T/.055);C++)l(.035,.022,.033,_-.015,.075+C*.055,P,r);for(const C of[.1,T-.08])d(.055,.075,_,C,P,"z",s);d(.025,T-.1,_+.1,T/2,P,"y",r),l(.1,.02,.12,_+.1,.06,P,r);for(const C of[-.035,.035])d(.008,.012,_+.1+C,.077,P,"y",s)}const y=Math.max(.18,g-.2);d(.028,v+.12,_,y,0,"z",r);for(const P of[-v*.35,0,v*.35])l(.09,.085,.115,_,y-.018,P,"#408c70"),d(.049,.08,_,y,P,"z","#408c70"),l(.15,.02,.13,_,y-.07,P,r);f(_,y,v/2+.18,"z","#3575a1"),l(.19,.21,.13,_,y+.04,v/2+.085,"#477caa");const A=new tt;e.add(A),A.position.y=g,e.userData.clothLift=A,e.userData.baseClothLift=g,e.userData.clothLiftSupport={...M,trayWidth:E},e.userData.clothLiftAssembly={carriers:3,reinforcement:"triangular",drive:"shared-shaft"},a=A;for(const P of[-v*.35,0,v*.35]){l(S,.035,E,_-S*.5,-.0175,P,r),l(.08,.13,.16,_,-.08,P,n);const C=new si;C.moveTo(_,-.035),C.lineTo(_-S*.9,-.035),C.lineTo(_,-.23),C.closePath();for(const D of[-1,1]){const I=new Ge(new Hn(C,{depth:.017,bevelEnabled:!1}),new ft({color:n,metalness:.6,roughness:.4}));I.position.z=P+D*E*.35,I.userData={id:i.id,slot:null,tint:!1},A.add(I)}for(const D of[_-S*.92,_-.02])d(.008,.008,D,-.004,P,"y",s);l(.035,.035,E,_-.015,.0175,P,"#b55f50")}l(.06,.055,v*.87,_,-.12,0,n),a=e}else if(i.type==="exhibitProcess"){const v=t.width,g=t.depth,p=t.height,T=.055,M=Math.min(.075,g*.15),S=p-.12;Tr({box:l,cylinder:d,rod:u},{length:v,width:g,height:p});for(const y of[-v*.37,v*.37]){for(const A of[-g*.37,g*.37]){l(.065,S,.065,y,S/2,A,n),l(.14,.018,.12,y,.009,A,r);for(const P of[-.045,.045])d(.01,.009,y+P,.022,A,"y",s)}l(.05,.06,g*.8,y,p*.38,0,n)}for(const y of[-g/2,g/2]){l(v,.11,.035,0,p-.065,y,n),l(v-.12,.018,M,0,p+.008,y-Math.sign(y)*M/2,r),l(v-.15,.03,.028,0,p-.11,y,s);const A=Math.max(3,Math.round(v/.45));for(let P=0;P<A;P++)d(.009,.009,-v*.43+P*v*.86/(A-1),p+.022,y-Math.sign(y)*M*.48,"y",s)}const E=g-M*2-.015;l(v-.13,.018,E,0,p,0,"#242a2b"),l(v-.13,.015,E,0,p-.11,0,s);for(const y of[-v/2+.065,v/2-.065]){d(T,E,y,p-T,0,"z","#242a2b");for(const A of[-g/2,g/2])l(.13,.12,.055,y,p-.055,A,n),d(.024,.065,y,p-T,A,"z",r)}const _=-v/2+.065;l(.16,.16,.15,_,p-.035,-g/2-.085,n),f(_,p-.035,-g/2-.23,"z",s);for(const y of[-v*.2,v*.2])l(.045,.035,g-.04,y,p-.115,0,n)}else if(i.type==="exhibitTransfer"){const v=t.width,g=t.depth,p=t.height;x(v,g,p-.16),Tr({box:l,cylinder:d,rod:u},{length:v,width:g,height:p});for(const E of[-g/2,g/2])l(v,.2,.09,0,p-.11,E,n),l(v,.055,.06,0,.22,E,s),l(v,.07,.045,0,p+.1,E,r);for(const E of[-v*.44,v*.44]){d(.105,g-.14,E,p-.09,0,"z",s);for(const _ of[-g*.5,g*.5])l(.2,.18,.06,E,p-.09,_,n),d(.04,.1,E,p-.09,_,"z",r)}const T=l(v-.28,.04,g-.18,0,p+.015,0,"#304b50");l(v-.28,.025,g-.18,0,p-.25,0,s);const M=new Uint8Array(4096*4);for(let E=0;E<64;E++)for(let _=0;_<64;_++){const y=(E*64+_)*4,A=_<3?22:0;M[y]=48+A,M[y+1]=75+A,M[y+2]=80+A,M[y+3]=255}const S=new Cr(M,64,64,Kt);S.wrapS=S.wrapT=Dn,S.repeat.set(8,2),S.needsUpdate=!0,S.colorSpace=wt,T.material.color.set("#ffffff"),T.material.map=S,e.userData.beltTexture=S;for(const E of[-v*.35,0,v*.35])l(.07,p-.2,.07,E,(p-.2)/2,-g*.44,n),l(.08,.055,g*.9,E,.22,0,n);f(v*.44,p-.12,g/2+.2,"z"),l(.23,.22,.13,v*.44,p-.1,g/2+.08,n);for(const E of[-v*.4,v*.4])l(.055,.15,.07,E,p+.1,g*.47,"#d4b344"),l(.025,.035,.025,E,p+.15,g*.49,s);l(.3,.36,.24,-v*.37,p-.16,g/2+.2,r),l(.18,.11,.014,-v*.37,p-.08,g/2+.325,"#477a87"),w(-v*.4,p+.25,g*.48)}else if(i.type==="exhibitHood"){const v=t.width,g=t.depth,p=t.height,T=p*.62;x(v,g,.28);for(const K of[-g*.37,g*.37])l(v,.12,.1,0,.3,K,s);for(const K of[-v*.46]){l(.12,T,.35,K,T/2,-.02,n),d(.18,.18,K,T,0,"x",s),d(.105,.24,K,T,0,"x",r);const W=new si,q=g*.43,ae=q-.11;W.absarc(0,0,q,-Math.PI/2,Math.PI/2,!1),W.lineTo(0,ae),W.absarc(0,0,ae,Math.PI/2,-Math.PI/2,!0),W.closePath();const ie=new Ge(new Hn(W,{depth:.065,bevelEnabled:!1,curveSegments:30}),new ft({color:n,metalness:.5,roughness:.4}));ie.rotation.y=Math.PI/2,ie.position.set(K,T,0),ie.userData={id:i.id,slot:null,tint:!1},e.add(ie);for(const ye of[T-.18,T+.18])m(K+.08,ye,0,3,"x");u([K,.35,g*.4],[K,T+.18,g*.2],.06)}const M=p*.54,S=g*.67,E=g*.47,_=T+Math.max(p*.65-.2,p*.7+.04);l(v,.08,g,0,.09,0,n),l(v,M,.045,0,.12+M/2,S,n);for(const K of[-v*.25,v*.25]){l(v*.475,M-.045,.02,K,.12+M/2,S+.026,"#899092"),l(.018,M-.055,.022,K+v*.22,.12+M/2,S+.041,s),l(.018,.11,.022,K+v*.13,.12+M*.62,S+.051,s);for(const W of[.23,.12+M-.12])l(.026,.065,.026,K-v*.21,W,S+.045,r)}const y=S-E,A=_-(M+.12),P=Math.hypot(y,A),C=new tt;e.add(C),C.position.set(0,(_+M+.12)/2,(S+E)/2),C.rotation.x=Math.atan2(A,y);const D=a;a=C;for(const K of[-v/3,0,v/3])l(v/3-.012,.035,P,K,0,0,n),l(v/3-.04,.012,.025,K,.021,-P/2+.035,r);a=D;for(const K of[-v*.49,v*.49]){const W=new si;W.moveTo(S,.1),W.lineTo(S,M+.12),W.lineTo(E,_),W.lineTo(E,.1),W.closePath();const q=new Ge(new Hn(W,{depth:.028,bevelEnabled:!1}),new ft({color:n,metalness:.5,roughness:.45}));q.rotation.y=-Math.PI/2,q.position.x=K,q.userData={id:i.id,slot:null,tint:!1},e.add(q)}const I=new tt;e.add(I),a=I;for(const K of[-v*.28,v*.28])u([K,_+.04,-g*.47],[K,_+.04,E+.04],.028,r),d(.045,.09,K,_-.01,E+.035,"x",s),u([K,_-.01,E+.04],[K,_-.18,E+.11],.035,n),l(.08,.04,.08,K,_-.2,E+.12,n),l(.028,.065,.05,K,_+.075,E+.035,s);l(.075,.3,.025,0,_-.05,E-.02,n),a=e;const F=new si,B=g*.45,k=-.105,H=Math.max(p*.65-.2,p*.7+.04)-.025;F.moveTo(0,k-.14),F.lineTo(B+.12,k-.14),F.quadraticCurveTo(B+.36,(k+H)/2,B+.12,H+.14),F.lineTo(0,H+.14),F.lineTo(0,H),F.lineTo(B,H),F.lineTo(B,k),F.lineTo(0,k),F.closePath(),e.userData.tipperOpening={shape:"rectangular",depth:B*2,height:H-k,bottom:T+k};const J=new Ge(new Hn(F,{depth:.05,bevelEnabled:!1,curveSegments:32}),new ft({color:n,metalness:.55,roughness:.4}));J.rotation.y=Math.PI/2,J.position.set(v*.52,T,0),J.userData={id:i.id,slot:null,tint:!1},e.add(J),l(v+.08,.04,g+.13,0,.04,0,n);for(const K of[-v*.43,v*.43])for(const W of[-g*.37,g*.37])m(K,.075,W,2);l(.32,.36,.34,-v*.57,T-.08,0,s),d(.15,.28,-v*.7,T-.08,0,"x",r);const ne=new tt;e.add(ne),ne.position.y=T,e.userData.tipper=ne,e.userData.tipperEntry={side:"positiveX",driveSide:"negativeX"},e.userData.baseTilt=t.angle,a=ne;for(const K of[-v*.35,v*.35])l(.075,.12,g*.83,K,-.23,0,r);const ue=-v*.46;l(.065,p*.65,.065,ue,p*.325-.2,-g*.46),l(.12,.055,.32,ue,p*.65-.2,-g*.43,"#d5b73e"),l(v*.86,.035,g*.9,0,-.105,0,"#bdc1c1");for(const K of[-g*.45,g*.45])l(v*.86,.025,.035,0,-.122,K,r);const Q=Math.max(p*.65-.2,p*.7+.04);for(const K of[-g*.46,0,g*.46])l(v*.84,.055,.055,0,Q,K,n);for(const K of[-v*.42,-v*.14,v*.14,v*.42])l(.055,.055,g*.8,K,Q,0,n);for(const K of[-v*.46])l(.04,p*.65,.04,K,p*.325-.2,g*.46),l(.12,.06,.25,K,p*.65-.25,g*.25,"#d5b73e"),u([K,-.2,-g*.46],[K,p*.65-.2,g*.46],.023,s);l(v*.76,.085,.07,0,-.12,-g*.37,s),l(v*.72,.06,.08,0,p*.65-.2,-g*.36,n),e.updateMatrixWorld(!0);const G=new tt;G.name="tipper-fixed-cover",e.add(G),G.attach(C),G.attach(I),ne.name="tipper-rotating-frame",e.userData.tipperCargoOffset=[0,-.0875,0],e.userData.tipperClearance={width:v*.86,depth:g*.9,height:Q+.0875},t.loaded&&b(v*.62,g*.66,p*.46,0,-.09,0),ne.rotation.x=-Tt.degToRad(t.angle),a=e,w(-v*.55,p*.66,g*.28)}else if(i.type==="exhibitRobot"){const v=t.height/2.65,g=new tt;e.add(g),g.scale.setScalar(v),a=g,x(.85,.85,.65),l(.9,.12,.9,0,.66,0,r);for(const M of[-.35,.35])for(const S of[-.35,.35])l(.1,.04,.1,M,.75,S,n),d(.022,.035,M,.785,S,"y",s);d(.29,.13,0,.8,0,"y",s),d(.25,.17,0,.94,0,"y",r);const p=new tt;g.add(p),e.userData.robotArm=p,a=p,l(.3,.32,.34,0,1.08,0,r),d(.22,.39,0,1.15,0,"z",r),d(.16,.045,0,1.15,.22,"z",n),f(0,1.15,-.34,"z",s),l(.14,.13,.18,.12,1.28,-.34,n);for(let M=0;M<8;M++){const S=M*Math.PI/4;d(.014,.02,Math.cos(S)*.18,1.15+Math.sin(S)*.18,.247,"z",s)}u([0,1.15,0],[-.15,1.95,0],.23,r);for(const M of[-.145,.145])u([-.02,1.2,M],[-.17,1.91,M],.055,n);u([.12,1.24,-.22],[.01,1.94,-.22],.035,r),d(.18,.4,-.15,1.95,0,"z",r),d(.125,.03,-.15,1.95,.224,"z",s),f(-.15,1.95,-.34,"z",s),u([-.15,1.95,0],[1,2.45,0],.18,r);for(const M of[-.125,.125])u([-.17,2.02,M],[.97,2.5,M],.045,n);u([-.24,2.13,-.22],[.95,2.65,-.22],.028,r);for(const M of[[-.24,2.13,-.22],[.95,2.65,-.22]])d(.05,.045,...M,"z",n);d(.14,.33,1,2.45,0,"z",r),d(.095,.035,1,2.45,.19,"z",s),u([1,2.45,0],[1.36,2.15,0],.13,r),d(.095,.19,1.36,2.15,0,"y",n);const T=new tt;e.userData.robotGrip=T,p.add(T),T.position.set(1.36,2.08,0),T.rotation.z=-.28,a=T,d(.085,.08,0,.035,0,"y",r);for(const M of[-.32,.32])l(1.05,.055,.055,0,-.055,M,n);for(const M of[-.525,.525])l(.055,.055,.64,M,-.055,0,n);for(const M of[-.44,.44])for(const S of[-.27,.27])l(.055,.22,.055,M,-.16,S,"#d5c426"),l(.14,.04,.13,M,-.28,S,"#d5c426");for(const M of[-.48,.48]){l(.045,.2,.58,M,-.145,0,"#c8b91e");for(const S of[-.22,.22])d(.015,.055,M,-.12,S,"x",s)}for(const M of[-.23,.23])l(.76,.06,.09,0,-.15,M,"#d5c426"),d(.025,.62,0,-.1,M,"x",r),l(.13,.09,.11,0,-.1,M,n);for(const M of[-.26,.26])l(.11,.15,.055,M,-.21,0,n),l(.18,.045,.24,M,-.3,0,"#d5c426");a=p,u([-.21,1.1,.24],[-.31,1.93,.24],.024,s),u([-.31,1.93,.24],[.99,2.58,.24],.024,s),u([.99,2.58,.24],[1.36,2.22,.12],.019,s),a=g,l(.48,.58,.4,-.58,.5,.38,r),w(-.62,1.05,.38),a=e}else if(i.type==="exhibitAgv"){const v=t.width,g=t.depth,p=t.height;l(v,p,g,0,p/2+.04,0,i.color),l(v+.015,.075,g+.015,0,.11,0,s);for(const T of[-v*.38,v*.38])for(const M of[-g*.48,g*.48])d(.12,.11,T,.14,M,"z",s);l(v*.8,.04,g*.8,0,p+.06,0,n),l(.25,.06,.02,0,p*.62,g/2+.012,"#77c2bc");for(const T of[-v*.4,v*.4])l(.09,.09,.02,T,p*.65,g/2+.018,s)}for(const v of c.values())v.dispose()}function A_(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,h=new Ht;let c=0;for(let l=0;l<i.length;++l){const u=i[l];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in u.attributes){if(!n.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;r[x]===void 0&&(r[x]=[]),r[x].push(u.attributes[x]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in u.morphAttributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;o[x]===void 0&&(o[x]=[]),o[x].push(u.morphAttributes[x])}if(e){let x;if(t)x=u.index.count;else if(u.attributes.position!==void 0)x=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;h.addGroup(c,x,l),c+=x}}if(t){let l=0;const u=[];for(let d=0;d<i.length;++d){const x=i[d].index;for(let b=0;b<x.count;++b)u.push(x.getX(b)+l);l+=i[d].attributes.position.count}h.setIndex(u)}for(const l in r){const u=Ic(r[l]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;h.setAttribute(l,u)}for(const l in o){const u=o[l][0].length;if(u===0)break;h.morphAttributes=h.morphAttributes||{},h.morphAttributes[l]=[];for(let d=0;d<u;++d){const x=[];for(let w=0;w<o[l].length;++w)x.push(o[l][w][d]);const b=Ic(x);if(!b)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;h.morphAttributes[l].push(b)}}return h}function Ic(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const l=i[c];if(e===void 0&&(e=l.array.constructor),e!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=l.itemSize),t!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=l.normalized),n!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=l.gpuType),s!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=l.count*t}const o=new e(r),a=new Jt(o,t,n);let h=0;for(let c=0;c<i.length;++c){const l=i[c];if(l.isInterleavedBufferAttribute){const u=h/t;for(let d=0,x=l.count;d<x;d++)for(let b=0;b<t;b++){const w=l.getComponent(d,b);a.setComponent(d+u,b,w)}}else o.set(l.array,h);h+=l.count*t}return s!==void 0&&(a.gpuType=s),a}const cr={...Wh,binRack:{smallBays:40,largeBays:24,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},rack:{bays:5,levels:4,bayWidth:1.8,levelHeight:1.55,depth:1.4,loaded:!0},shuttle:{bays:10,rows:2,levels:4,bayWidth:2.099,levelHeight:1.5,baseHeight:.525,depth:3.1,loaded:!0},barRack:{bays:6,lanes:6,levels:11,bayWidth:2.6,depth:1.55,height:6.5,loaded:!0},rgv:{railLength:23.3,travel:0},shuttleCar:{width:1.35},robot:{height:2.7},machine:{width:4.2,depth:2.5,height:1.8},stacker:{height:7,travel:0,lift:1.2,railLength:18},conveyor:{length:7,width:1.3,height:.8},turn:{width:1.3,height:.8},pallet:{cargo:!0},agv:{cargo:!0}},R_={...E_,binRack:[["smallBays","小料框排数",0,100,1],["largeBays","大料筐排数",0,100,1],["smallLevels","小料框层数",1,30,1],["largeLevels","大料筐层数",1,30,1],["smallPitch","小框排距 · m",.3,2,.01],["largePitch","大筐排距 · m",.4,3,.01],["smallStep","小框层高 · m",.2,1.5,.01],["largeStep","大筐层高 · m",.3,2,.01],["depth","货架深度 · m",.4,2,.01]],rack:[["bays","货架列数",1,12,1],["levels","货架层数",1,8,1],["bayWidth","单列宽度 · m",1,3,.1],["levelHeight","层高 · m",1,2.5,.1],["depth","货架深度 · m",1,3,.1]],shuttle:[["bays","货架列数",1,16,1],["rows","深位数量",1,4,1],["levels","货架层数",1,8,1],["bayWidth","列间距 · m",1,3,.01],["levelHeight","层间距 · m",1,2.5,.1],["baseHeight","底层高度 · m",.2,1,.025],["depth","整体深度 · m",1,6,.1]],barRack:[["bays","货架列数",1,12,1],["lanes","每列条数",1,8,1],["levels","货架层数",1,15,1],["bayWidth","列间距 · m",1,4,.1],["depth","货架深度 · m",1,3,.1],["height","总高度 · m",3,10,.1]],rgv:[["railLength","轨道长度 · m",4,32,.1],["travel","行走位置 · m",-14,14,.1]],shuttleCar:[["width","车体宽度 · m",.8,2,.1]],robot:[["height","示意高度 · m",1.5,4,.1]],machine:[["width","设备宽度 · m",1,8,.1],["depth","设备深度 · m",1,6,.1],["height","设备高度 · m",.8,4,.1]],stacker:[["railLength","轨道长度 · m",4,120,.1],["height","立柱高度 · m",3,20,.1],["travel","行走位置 · m",-8,8,.1],["lift","载货台高度 · m",.5,13,.1]],conveyor:[["length","输送长度 · m",.2,18,.01],["width","输送宽度 · m",.4,2.5,.1],["height","输送高度 · m",.5,1.5,.1]],turn:[["width","转角宽度 · m",.8,2,.1],["height","输送高度 · m",.5,1.5,.1]],pallet:[],agv:[]};function Ii(i){const e=new Set,t=new Set;i.userData.beltTexture&&e.add(i.userData.beltTexture),i.traverse(n=>{var s;if(n.userData.ownedTexture&&e.add(n.userData.ownedTexture),(s=n.geometry)==null||s.dispose(),n.material)for(const r of[n.material].flat()){t.add(r);for(const o of["map","bumpMap","roughnessMap","normalMap"])r[o]&&e.add(r[o])}}),e.forEach(n=>n.dispose()),t.forEach(n=>n.dispose())}function Xh(i){var p,T;const e=new tt,t=i.params;let n=e,s=null;const r="#354148",o=i.color,a="#a4abad",h="#98734d",c="#bd9669";function l(M,S,E,_,y,A,P=o,C=!1){const D=new Ge(s===null&&!["binRack","rack","shuttle","barRack"].includes(i.type)&&Math.min(M,S,E)>=.15?new Zi(M,S,E,1,Math.min(.025,Math.min(M,S,E)*.1)):new Lt(M,S,E),tl(P,C?{roughness:i.roughness,metalness:i.metalness}:{}));return D.position.set(_,y,A),D.castShadow=!0,D.receiveShadow=!0,D.userData.id=i.id,D.userData.tint=C,D.userData.slot=s,n.add(D),D}function u(M,S,E,_,y,A="z"){const P=new Ge(new $t(S,S,M,12),new ft({color:a,metalness:.65,roughness:.3}));P.rotation[A==="z"?"x":"z"]=Math.PI/2,P.position.set(E,_,y),P.castShadow=!0,P.userData.id=i.id,P.userData.slot=s,n.add(P)}function d(M,S,E,_,y,A,P=o){const C=l(M,S,E,_,y,A,P,P===o);return C.geometry.dispose(),C.geometry=new Zi(M,S,E,2,Math.min(M,S,E)*.12),C}function x(M,S,E=a,_=.035){const y=new U(...M),A=new U(...S),P=A.clone().sub(y),C=y.clone().add(A).multiplyScalar(.5);l(_,P.length(),_,C.x,C.y,C.z,E).quaternion.setFromUnitVectors(new U(0,1,0),P.normalize())}function b(M,S,E){l(.07,.18,.07,M,S,E,r);for(let _=0;_<3;_++)l(.09,.055,.09,M,S+.12+_*.06,E,["#65d2a6","#efb84e","#d86363"][_])}function w(M,S,E){d(.35,.6,.3,M,S,E,"#d0d8df"),l(.21,.16,.014,M,S+.1,E+.16,"#132a3c"),l(.16,.09,.015,M,S+.11,E+.17,"#4fafa5");for(let _=0;_<3;_++)l(.035,.035,.016,M+(_-1)*.07,S-.05,E+.17,["#65d2a6","#efb84e","#d86363"][_]);b(M,S+.43,E)}function m(M,S,E,_,y){for(const A of[-M/2,M/2]){for(let P=0;P<Math.ceil(S/y);P++){const C=.18+P*y,D=Math.min(S-.1,C+y);D<=C||(x([A,C,-E/2],[A,D,E/2]),x([A,C,E/2],[A,D,-E/2]))}for(const P of[-E/2,E/2])l(.14,.5,.14,A,.3,P,"#e5aa3c"),l(.15,.055,.15,A,.2,P,r),l(.15,.055,.15,A,.4,P,r)}for(let A=0;A<=_;A++){const P=A*M/_-M/2;for(const C of[-E/2,E/2]){l(.24,.035,.24,P,.02,C,a);for(let D=.6;D<S;D+=.35)l(.027,.045,.004,P,D,C+Math.sign(C)*.047,"#132335")}}}function f(M,S,E,_=!0){for(let y=0;y<3;y++){l(1.15,.055,.16,M,S+.035,E+(y-1)*.4,h);for(const A of[-.43,0,.43])l(.16,.11,.16,M+A,S+.11,E+(y-1)*.4,h)}for(let y=0;y<5;y++)l(.17,.055,1.05,M+(y-2)*.24,S+.19,E,"#b18b5f");if(_){for(let y=0;y<2;y++)for(const A of[-1,1])for(const P of[-1,1]){const C=M+A*.258,D=E+P*.233,I=S+.39+y*.34;if(l(.502,.325,.45,C,I,D,y?c:"#b28d62"),l(.035,.012,.451,C,I+.168,D,"#d4b485"),P===1){l(.14,.09,.006,C+.09,I,D+.228,"#e4e1d3");for(let F=0;F<4;F++)l(.007,.05,.007,C+.04+F*.024,I,D+.233,"#344052")}}for(const y of[-.33,.33])l(.025,.7,.952,M+y,S+.57,E,"#445464"),l(.025,.012,.952,M+y,S+.923,E,"#445464")}}function v(M,S,E,_=0,y=0,A=!1){if(A){l(S,.18,M,_,E,y,r);for(let C=-M/2+.12;C<M/2;C+=.24)u(S-.12,.065,_,E+.12,y+C,"x");for(const C of[-1,1])l(.08,.25,M,_+C*S/2,E+.12,y,o,!0)}else{l(M,.18,S,_,E,y,r);for(let C=-M/2+.12;C<M/2;C+=.24)u(S-.12,.065,_+C,E+.12,y);for(const C of[-1,1])l(M,.25,.08,_,E+.12,y+C*S/2,o,!0)}for(const C of[-1,1])for(const D of[-1,1])l(.1,E,.1,_+C*(A?S:M)*.38,E/2,y+D*(A?M:S)*.38,r);for(const C of[-1,1])for(const D of[-1,1]){const I=_+C*(A?S:M)*.38,F=y+D*(A?M:S)*.38;l(.22,.035,.22,I,.02,F,a),l(.13,.12,.13,I,.1,F,r)}const P=l(.28,.25,.38,_+(A?S/2:M*.35),E-.2,y+(A?M*.35:S/2+.16),a);for(let C=0;C<4;C++)l(.29,.02,.4,P.position.x,E-.3+C*.045,P.position.z,r);for(const C of[-1,1]){const D=_+(A?S/2+.04:C*M*.35),I=y+(A?C*M*.35:S/2+.04);l(.07,.12,.08,D,E+.22,I,"#e4ae43"),l(.025,.04,.09,D,E+.24,I,"#132335")}}if(Wh[i.type]||i.type==="conveyor"&&t.exhibitionDetail)T_(i,e);else if(i.type==="binRack"){let S=-(t.smallBays*t.smallPitch+t.largeBays*t.largePitch)/2,E=0;for(const[_,y,A,P,C]of[[t.smallBays,t.smallLevels,t.smallPitch,t.smallStep,!1],[t.largeBays,t.largeLevels,t.largePitch,t.largeStep,!0]]){if(!_)continue;const D=y*P+.2;for(let I=0;I<=_;I++)for(const F of[-1,1]){const B=S+I*A,k=F*t.depth/2;if(l(.045,D,.045,B,D/2,k,r),l(.012,D,.012,B-.028,D/2,k+F*.016,a),l(.012,D,.012,B+.028,D/2,k+F*.016,a),ya({box:l,cylinder:(H,J,ne,ue,Q,G,K)=>{const W=l(H*2,J,H*2,ne,ue,Q,K);return W.geometry.dispose(),W.geometry=new $t(H,H,J,6),G==="z"&&(W.rotation.x=Math.PI/2),G==="x"&&(W.rotation.z=Math.PI/2),W}},B,k,.13,.17),I===0||I===_){for(let H=.22;H<D-.1;H+=P)l(.02,.04,.004,B,H,k+F*.026,"#1c292e"),l(.065,.085,.012,B,H-.045,k+F*.035,a);l(.09,.42,.07,B,.23,k,"#c3a24b")}}for(let I=0;I<y;I++){const F=.15+I*P;for(const B of[-1,1])l(_*A,.045,.04,S+_*A/2,F,B*t.depth/2,o,!0);for(let B=0;B<_;B++){const k=S+(B+.5)*A;for(const H of[-1,1])l(.035,.025,t.depth,k+H*A*.36,F,0,a);if(t.loaded){s=E+B*y+I;const H=(p=i.binSizes)==null?void 0:p[s],J=A*(H===2?.94:.82),ne=P*(H===2?.82:.72),ue=t.depth*.85,Q=i.binSizes?H===1?"#9ba9aa":H===2?"#aab0ac":"#8b8b91":C?"#aab0ac":"#9ba9aa";l(J,.025,ue,k,F+.04,0,Q);for(const G of[-1,1]){l(J,ne,.024,k,F+ne/2+.05,G*ue/2,Q),l(.024,ne,ue,k+G*J/2,F+ne/2+.05,0,Q),l(J,.035,.045,k,F+ne+.05,G*ue/2,a),l(.12,.055,.026,k,F+ne*.55,G*(ue/2+.016),"#d9e0d9"),l(.13,.035,.026,k,F+ne*.85,G*(ue/2+.016),r);for(const K of[-1,1])l(.024,ne*.82,.012,k+K*(J/2-.022),F+ne*.51+.05,G*(ue/2+.02),a);for(const K of[-.32,0,.32])l(.018,ne*.65,.012,k+J*K,F+ne*.43+.05,G*(ue/2+.019),Q);l(J*.82,.018,.028,k,F+.1,G*(ue/2+.012),a)}s=null}}}for(const I of[S,S+_*A])for(let F=0;F<y;F+=2)x([I,.15+F*P,-t.depth/2],[I,Math.min(D,(F+2)*P),t.depth/2]);E+=_*y,S+=_*A}}else if(i.type==="shuttle"){const M=t.bays*t.bayWidth,S=t.baseHeight+t.levels*t.levelHeight;m(M,S,t.depth,t.bays,t.levelHeight);for(let E=0;E<=t.bays;E++)for(let _=0;_<=t.rows;_++){const y=E*t.bayWidth-M/2,A=_*t.depth/t.rows-t.depth/2;l(.09,S,.09,y,S/2,A,r),l(.22,.05,.22,y,.025,A,r)}for(let E=0;E<t.levels;E++){const _=t.baseHeight+E*t.levelHeight;for(let y=0;y<=t.rows;y++)l(M,.12,.08,0,_,y*t.depth/t.rows-t.depth/2,o,!0);for(let y=0;y<t.bays;y++){const A=(y+.5)*t.bayWidth-M/2;for(let P=0;P<t.rows;P++){const C=(P+.5)*t.depth/t.rows-t.depth/2;for(const D of[-1,1])l(t.bayWidth-.15,.08,.07,A,_,C+D*.52,a);t.loaded&&(s=(E*t.bays+y)*t.rows+P,f(A,_+.06,C,!0),s=null)}}}}else if(i.type==="barRack"){const M=t.bays*t.bayWidth,S=(t.height-.4)/t.levels;m(M,t.height,t.depth,t.bays,S*2);for(let E=0;E<=t.bays;E++)for(const _ of[-1,1])l(.08,t.height,.08,E*t.bayWidth-M/2,t.height/2,_*t.depth/2,r);for(let E=0;E<t.levels;E++){const _=.25+E*S;for(const y of[-1,1])l(M,.055,.06,0,_,y*t.depth/2,o,!0);for(let y=0;y<t.bays;y++)for(let A=0;A<t.lanes;A++){const P=(y+(A+.5)/t.lanes)*t.bayWidth-M/2;l(.03,.04,t.depth,P,_,0,a),t.loaded&&(s=(E*t.bays+y)*t.lanes+A,u(t.depth-.08,.065,P,_+.1,0),s=null)}}}else if(i.type==="rgv"){for(const S of[-.7,.7])l(t.railLength,.05,.1,0,.03,S,a);const M=new tt;e.add(M),e.userData.carriage=M,n=M,d(4.4,.35,1.8,t.travel,.35,0),w(t.travel+1.9,.78,-.65);for(const S of[-.94,.94]){l(4.2,.09,.08,t.travel,.33,S,"#162a3a");for(let E=-4;E<=4;E++)l(.19,.08,.09,t.travel+E*.43,.34,S,"#e5aa3c")}for(const S of[-1,1]){v(1.8,1.6,.7,t.travel+S*1.1,0);for(const E of[-.9,.9])u(.13,.19,t.travel+S*1.55,.22,E)}l(.4,.4,.3,t.travel+2,.85,0,r)}else if(i.type==="shuttleCar"){d(t.width,.23,1.05,0,.23,0),l(t.width*.8,.04,.5,0,.37,0,r);for(const M of[-t.width*.4,t.width*.4])l(.12,.04,.2,M,.38,0,"#e5aa3c");for(const M of[-1,1]){l(t.width-.1,.08,.12,0,.43,M*.4,a);for(const S of[-.4,.4])u(.12,.12,S,.14,M*.52)}}else if(i.type==="machine"){l(t.width,.25,t.depth,0,.15,0,r),d(t.width*.85,t.height*.7,t.depth*.6,0,t.height*.45,-t.depth*.15,"#9eafb9");for(const M of[-1,1])l(t.width*.28,t.height*.52,.025,M*t.width*.22,t.height*.47,t.depth*.155,"#172e3e"),l(.035,t.height*.44,.04,M*t.width*.08,t.height*.47,t.depth*.18,a);for(let M=0;M<6;M++)l(.24,.025,.028,t.width*.35,t.height*.24+M*.06,t.depth*.17,r);w(t.width*.43,t.height*.53,t.depth*.4),l(t.width*.65,.12,t.depth*.8,0,t.height*.4,0,a);for(const M of[-1,1])l(.15,t.height,.15,M*t.width*.4,t.height/2,-t.depth*.35,o,!0);l(t.width,.2,.4,0,t.height,-t.depth*.35,o,!0),l(.35,.5,.25,t.width*.4,t.height*.5,t.depth*.4,r),l(.25,.18,.02,t.width*.4,t.height*.58,t.depth*.4+.14,"#5ac6c0")}else if(i.type==="robot"){d(.8,.4,.8,0,.2,0,r),u(.4,.28,0,.6,0);for(const E of[-1,1])for(const _ of[-1,1])l(.09,.035,.09,E*.3,.42,_*.3,a);u(.38,.18,0,t.height*.43,0),u(.32,.15,t.height*.28,t.height*.7,0),u(.29,.12,t.height*.59,t.height*.64,0),l(.075,t.height*.38,.08,-.17,t.height*.4,-.12,r),x([0,t.height*.62,-.18],[t.height*.5,t.height*.75,-.18],r,.065);const M=l(.27,t.height*.5,.3,0,t.height*.43,0,o,!0);M.rotation.z=-.3;const S=l(t.height*.6,.24,.26,t.height*.28,t.height*.7,0,o,!0);S.rotation.z=.2,l(.2,.55,.2,t.height*.59,t.height*.64,0,a),l(.5,.07,.4,t.height*.59,t.height*.36,0,r)}else if(i.type==="rack"){const M=t.bays*t.bayWidth;m(M,t.levels*t.levelHeight+.3,t.depth,t.bays,t.levelHeight);for(let S=0;S<=t.bays;S++)for(const E of[-1,1]){const _=S*t.bayWidth-M/2;l(.09,t.levels*t.levelHeight+.3,.09,_,(t.levels*t.levelHeight+.3)/2,E*t.depth/2,r),l(.22,.06,.22,_,.03,E*t.depth/2,r)}for(let S=0;S<t.levels;S++){const E=.24+S*t.levelHeight;for(const _ of[-1,1])l(M,.13,.09,0,E,_*t.depth/2,o,!0);for(let _=0;_<t.bays;_++){const y=(_+.5)*t.bayWidth-M/2;l(t.bayWidth-.1,.05,t.depth-.1,y,E,0,a),t.loaded&&(s=S*t.bays+_,f(y,E+.04,0,!0),s=null)}}for(const S of[-M/2,M/2])for(let E=0;E<t.levels;E++){const _=l(.05,Math.hypot(t.levelHeight,t.depth),.05,S,(E+.5)*t.levelHeight,0,a);_.rotation.x=(E%2?1:-1)*Math.atan(t.depth/t.levelHeight)}}else if(i.type==="stacker"){const M="#e99832",S="#1d2b38",E="#c3cdd1",_="#8d9ca5",y=t.travel,A=0;l(t.railLength,.09,.17,0,.07,A,_),l(t.railLength,.045,.32,0,.022,A,S);for(let H=-t.railLength/2+.3;H<t.railLength/2;H+=.9){l(.34,.035,.65,H,.02,A,S);for(const J of[-.22,.22])l(.07,.045,.07,H,.045,A+J,_)}const P=new tt;e.add(P),e.userData.carriage=P,n=P,d(2.65,.1,.8,y,.08,A,S),d(2.3,.04,.85,y,.16,A,E);for(const H of[-1.04,1.04])u(.26,.22,y+H,.24,A),l(.4,.12,.42,y+H,.48,A,M),l(.2,.11,.25,y+H*1.18,.32,A,S);const C=y+.67,D="#d5ae35",I=l(.28,t.height-.25,.32,C,(t.height+.25)/2,A,"#aeb4b6");I.userData.singleMast=!0;for(const H of[-1,1])l(.055,t.height-.3,.035,C+H*.11,(t.height+.3)/2,A+.178,S),l(.027,t.height-.35,.04,C+H*.075,(t.height+.35)/2,A+.197,_);l(.32,.2,.38,C,.25,A,S),d(.48,.1,.47,C,t.height+.05,A,S);for(const H of[-.16,.16])u(.12,.09,C,t.height+.12,A+H),l(.13,.055,.1,C-.24,t.height+.07,A+H,S);d(.36,.3,.34,y+1.02,.4,A,"#913f3c"),u(.3,.14,y+1.02,.4,A-.23);for(const H of[-.1,.1])l(.018,t.height-.3,.018,C+.19,(t.height+.3)/2,A+H,S);l(.045,t.height-.4,.065,C-.19,(t.height+.4)/2,A-.12,S);for(let H=.5;H<t.height;H+=.28)l(.055,.025,.08,C-.19,H,A-.12,_);d(.34,2.05,.44,y+1.06,1.45,A-.02,E),l(.025,1.85,.012,y+.94,1.45,A+.209,S),l(.17,.14,.016,y+1.06,1.65,A+.211,S),l(.13,.09,.018,y+1.06,1.66,A+.223,"#4c9b9b"),l(.022,.16,.022,y+.96,1.28,A+.215,S);for(let H=0;H<4;H++)l(.2,.014,.016,y+1.06,.63+H*.043,A+.209,S);b(y+1.06,2.6,A-.02);for(const H of[-1.15,1.15])l(.23,.1,.04,y+H,.58,A+.45,"#efb34e"),l(.08,.11,.045,y+H,.58,A+.475,S);const F=new tt;P.add(F),e.userData.lift=F,n=F,d(1.08,.12,1.05,y,t.lift+.06,A,S),l(1.02,.025,1,y,t.lift+.13,A,E),l(.12,.58,.42,C-.16,t.lift+.32,A,D);for(const H of[.1,.51])for(const J of[-.17,.17])u(.08,.055,C-.19,t.lift+H,A+J);const B=new tt;F.add(B),e.userData.loadGuard=B,n=B;for(const H of[-.52,.52]){for(const J of[-.51,.51])l(.045,.76,.045,y+H,t.lift+.53,A+J,D);for(const J of[.4,.65,.91])l(.045,.045,1.065,y+H,t.lift+J,A,D);for(const J of[-.25,0,.25])l(.025,.72,.025,y+H,t.lift+.53,A+J,D);l(.055,.08,1.065,y+H,t.lift+.18,A,S)}n=F;const k=new tt;F.add(k),e.userData.fork=k,n=k;for(const H of[-.18,.18])d(.24,.09,1.12,y+H,t.lift+.07,A,_),l(.17,.07,.94,y+H,t.lift+.11,A,E),l(.105,.055,.78,y+H,t.lift+.145,A,_),l(.11,.045,.15,y+H,t.lift+.155,A+.315,S);n=F;for(const H of[-.63,.63])l(.055,.16,.08,y+H,t.lift+.24,A+.52,"#e7b54c"),l(.035,.07,.09,y+H,t.lift+.26,A+.57,S);n=P}else if(i.type==="conveyor")v(t.length,t.width,t.height);else if(i.type==="turn")v(2.8,t.width,t.height,-.75,0),v(2.8,t.width,t.height,.65,1.1,!0);else if(i.type==="pallet")f(0,0,0,t.cargo);else if(i.type==="agv"){d(1.55,.35,1.2,0,.32,0),d(1.6,.12,1.24,0,.2,0,"#152b3c"),l(1.35,.04,.1,0,.48,.58,"#60d4b2"),l(.16,.12,.16,.6,.57,-.4,"#152b3c"),l(.18,.025,.18,.6,.65,-.4,"#69ceb9");for(const M of[-.8,.8])l(.03,.08,.82,M,.31,0,"#e5aa3c"),l(.04,.06,.2,M,.32,.4,"#dce9ed");l(1.35,.14,1,0,.57,0,r);for(const M of[-.5,.5])for(const S of[-.59,.59])u(.12,.18,M,.22,S);l(.7,.05,.05,.6,.37,.62,"#67e6c0"),t.cargo&&f(0,.65,0,!0)}e.userData.stock=[];const g=[];e.traverse(M=>{M.isGroup&&g.push(M)});for(const M of g){const S=new Map,E=new Map;for(const _ of[...M.children]){if(!_.isMesh)continue;_.updateMatrix();const y=_.material,A=[y.type,y.color.getHex(),y.roughness,y.metalness,((T=y.map)==null?void 0:T.uuid)||"",y.side,y.transparent,y.opacity,!!_.userData.tint].join(":");if(_.userData.slot!==null){const P=A+JSON.stringify(_.geometry.parameters);E.has(P)||E.set(P,{geometry:_.geometry.clone(),material:y.clone(),entries:[]}),E.get(P).entries.push({slot:_.userData.slot,matrix:_.matrix.clone()})}else S.has(A)||S.set(A,{geometry:[],material:y.clone(),tint:_.userData.tint}),S.get(A).geometry.push((_.geometry.index?_.geometry.toNonIndexed():_.geometry.clone()).applyMatrix4(_.matrix));M.remove(_),_.geometry.dispose(),y.dispose()}for(const _ of S.values()){const y=A_(_.geometry,!1);for(const P of _.geometry)P.dispose();const A=new Ge(y,_.material);A.userData.id=i.id,A.userData.tint=_.tint,A.castShadow=!0,A.receiveShadow=!0,M.add(A)}for(const _ of E.values()){const y=new gh(_.geometry,_.material,_.entries.length);y.instanceMatrix.setUsage(Fu);for(let A=0;A<_.entries.length;A++){const C=.94+(Math.imul(_.entries[A].slot+1,2654435761)>>>0)%101/1e3;y.setColorAt(A,new We(C,C,C))}y.userData.id=i.id,y.castShadow=!0,y.receiveShadow=!0,y.frustumCulled=!1,M.add(y),e.userData.stock.push({mesh:y,entries:_.entries})}}return e.traverse(M=>{var S;(S=M.material)!=null&&S.userData.industrialSurface&&h_(M.material)}),e.userData.baseTravel=t.travel||0,e.userData.baseLift=t.lift||0,e.userData.id=i.id,e.userData.signature=JSON.stringify(t),qh(e,i.occupiedSlots),e}const C_=new $e().makeScale(0,0,0);function qh(i,e){for(const t of i.userData.stock||[]){for(let n=0;n<t.entries.length;n++){const s=t.entries[n];t.mesh.setMatrixAt(n,!e||e.has(s.slot)?s.matrix:C_)}t.mesh.instanceMatrix.needsUpdate=!0,t.mesh.boundingSphere=null,t.mesh.boundingBox=null}}function Mo(i,e,t,n=0){i.userData.beltTexture&&(i.userData.beltTexture.offset.x=-e),i.userData.tipper&&(i.userData.tipper.rotation.x=-Tt.degToRad(Math.max(0,Math.min(110,i.userData.baseTilt+n)))),i.userData.slide&&(i.userData.slide.position.x=Math.sin(e*.3)*1.6),i.userData.robotArm&&(i.userData.robotArm.rotation.y=Math.sin(e*.3)*.18),i.userData.fork&&(i.userData.fork.position.z=n),i.userData.carriage&&(i.userData.carriage.position.x=e-i.userData.baseTravel),i.userData.lift&&(i.userData.lift.position.y=t-i.userData.baseLift)}const P_={width:40,depth:28};function Uc(i){if(![1,2].includes(i.version)||!Array.isArray(i.objects)||i.objects.length>150)throw Error("场景最多支持150个设备");const e={...P_,...i.floor};for(const r of["width","depth"])if(!Number.isFinite(e[r])||e[r]<10||e[r]>120)throw Error("厂房尺寸需要在10~120米之间");const t=new Set;let n=0;const s=i.objects.map(r=>{const o=JSON.parse(JSON.stringify(r));if(!cr[o.type]||typeof o.id!="string"||t.has(o.id)||typeof o.name!="string"||!/^#[0-9a-f]{6}$/i.test(o.color)||typeof o.visible!="boolean")throw Error("设备字段无效");t.add(o.id);for(const h of["position","rotation","scale"])if(!Array.isArray(o[h])||o[h].length!==3||!o[h].every(c=>Number.isFinite(c)&&Math.abs(c)<=1e4)||h==="scale"&&o[h].some(c=>c<=0))throw Error("变换数值无效");for(const h of["roughness","metalness"])if(!Number.isFinite(o[h])||o[h]<0||o[h]>1)throw Error("材质数值无效");o.type==="binRack"&&(o.name=o.name.replace(/^(第\s*\d+\s*)排料框库$/,"$1列料框库")),o.params={...cr[o.type],...o.params};for(const[h,c,l,u,d]of R_[o.type])if(!Number.isFinite(o.params[h])||o.params[h]<l||o.params[h]>u||d===1&&!Number.isInteger(o.params[h]))throw Error(`${c}超出范围`);for(const h of Object.keys(cr[o.type]))if(typeof cr[o.type][h]=="boolean"&&typeof o.params[h]!="boolean")throw Error("设备开关无效");if(o.type==="stacker"&&o.params.lift>o.params.height-.2)throw Error("载货台超出立柱高度");const a=o.params;return n+=o.type==="shuttle"?a.bays*a.rows*a.levels:o.type==="barRack"?a.bays*a.lanes*a.levels:o.type==="binRack"?a.smallBays*a.smallLevels+a.largeBays*a.largeLevels:["rack","exhibitRack"].includes(o.type)?a.bays*a.levels:0,o});if(n>12e3)throw Error("单个方案最多支持12000个库位");return{version:2,id:typeof i.id=="string"?i.id:g_(),name:typeof i.name=="string"?i.name:"导入场景",floor:e,objects:s,seed:Number.isInteger(i.seed)?i.seed:2026}}function D_(i){if(i==="exhibition"){const e=Uc(w_());return e.id="demo-exhibition",e.name="展会布卷流程",e}if(!["general","hardware"].includes(i))throw Error("未知的演示场景");return Uc(structuredClone(o_))}const Yh=[{name:"穿梭车进入货架取框",seconds:22},{name:"料框交接链条输送线",seconds:5},{name:"辊道输送料框至翻转机",seconds:4},{name:"翻转料框并卸出布卷",seconds:8},{name:"输送布卷至高架线",seconds:5},{name:"高架线送入主峰机械",seconds:5},{name:"主峰加工并移载至侧封侧拍",seconds:6},{name:"侧封侧拍加工并转出",seconds:5},{name:"返回高架线输送至辊道",seconds:5},{name:"布卷到位，等待机械手",seconds:3},{name:"机械手抓卷并放入料框",seconds:8}],nl=Yh.map(i=>i.name),dt=Yh.map(i=>i.seconds),L_=[["rack","取货货架"],["shuttle","穿梭车 / 移动底盘"],["chain","链条输送线"],["roller","翻转前辊道"],["tipper","翻转机"],["platform","卸卷皮带平台"],["upper","进料高架皮带"],["main","主峰机械"],["side","侧封侧拍"],["returnBelt","回料高架皮带"],["exit","机械手前辊道"],["robot","机械手"],["receiver","收卷料框"]];function Nc(i){var t;const e=(n,s)=>{var r;return((r=i.find(o=>o.type===n&&(!s||s.test(o.name))))==null?void 0:r.id)||""};return{rack:e("exhibitRack"),shuttle:e("exhibitAgv"),chain:((t=i.find(n=>n.type==="conveyor"&&n.params.chainDeck))==null?void 0:t.id)||"",roller:e("conveyor",/前端/),tipper:e("exhibitHood"),platform:e("conveyor",/平台.*02/),upper:e("exhibitProcess",/^(?!.*副本)/),main:e("exhibitZhufeng"),side:e("exhibitSideSeal"),returnBelt:e("exhibitProcess",/副本/),exit:e("conveyor",/左侧/),robot:e("exhibitRobot"),receiver:e("exhibitCarrier",/机器人交接/)}}function et(i,[e,t,n]){const s=i.rotation[1]*Math.PI/180;return[i.position[0]+e*i.scale[0]*Math.cos(s)+n*i.scale[2]*Math.sin(s),i.position[1]+t*i.scale[1],i.position[2]-e*i.scale[0]*Math.sin(s)+n*i.scale[2]*Math.cos(s)]}function ut(i,e){if(e<=0)return[...i[0]];if(e>=1)return[...i.at(-1)];const t=i.slice(1).map((s,r)=>Math.hypot(...s.map((o,a)=>o-i[r][a])));let n=Math.max(0,Math.min(1,e))*t.reduce((s,r)=>s+r,0);for(let s=0;s<t.length;s++){if(n<=t[s]||s===t.length-1){const r=t[s]?n/t[s]:0;return i[s].map((o,a)=>o+(i[s+1][a]-o)*r)}n-=t[s]}return i[0]}function hr(i,e){const t=i.rotation[1]*Math.PI/180,n=e[0]-i.position[0],s=e[2]-i.position[2],r=Math.max(0,(i.params.width||i.params.length)/2-.15),o=Math.max(-r,Math.min(r,(n*Math.cos(t)-s*Math.sin(t))/i.scale[0]));return et(i,[o,(i.params.height||.7)+.159,0])}function Zh(i){var Ne,N;const e=i.layout.objects,t=new Map(e.map(R=>[R.id,R])),n=Object.fromEntries(L_.map(([R])=>[R,t.get(i.bindings[R])]));if(Object.values(n).some(R=>!R))throw Error("流程设备已缺失");const s=n.rack,r=s.params;if(i.level===1&&i.bay===r.exitBay)throw Error("出入通道不存放料框");if(i.bay===r.liftBay)throw Error("提升机格位不能存放料框");if(i.level>1&&!r.liftBay)throw Error("当前货架没有换层提升机");const o=et(s,[(i.bay-.5)*r.bayWidth-r.bays*r.bayWidth/2,Ot(r)+(i.level-1)*r.levelHeight+(r.pickupClearance??.24),0]),a=et(s,[(i.bay-.5)*r.bayWidth-r.bays*r.bayWidth/2,Ot(r)+(i.level-1)*r.levelHeight+(r.pickupClearance??.24),-r.depth/2-(r.laneWidth??1.8)/2]),h=(R,Y=.159)=>et(R,[0,(R.params.height||.7)+Y,0]),c=[-1,1].map(R=>et(n.chain,[R*(n.chain.params.length/2-.5),(R<0?n.chain.params.endHeight??n.chain.params.height:n.chain.params.startHeight??n.chain.params.height)+.0555,0])),l=R=>Math.hypot(R[0]-s.position[0],R[2]-s.position[2]),[u,d]=c.sort((R,Y)=>l(R)-l(Y)),x=n.roller.params.rightAngleEntry?et(n.roller,[n.roller.params.transferX,n.roller.params.height+.09,0]):d,b=Es(r.bayWidth*.76,r.depth*.76,Math.min(r.levelHeight*.76,r.levelHeight-(r.pickupClearance??.24)-.16)),w=(b.length-1)*((((Ne=b[0])==null?void 0:Ne.radius)??.17)*2+.04)/2,m=et(n.tipper,[0,n.tipper.params.height*.62-.0875,0]),f=et(n.platform,[0,(n.platform.params.height||.7)+.15,-w]);h(n.upper);const v=h(n.main,-.8),g=et(n.side,[0,n.side.params.height*.51-Math.min(n.side.params.internalLowering??.15,n.side.params.height*.2)+.0435+.15,0]);h(n.returnBelt);const p=h(n.exit,.24),T=et(n.receiver,[0,Math.min(.13,n.receiver.params.height*.14)+.0175+.17-.05,0]),M=hr(n.upper,f);hr(n.upper,v);const S=hr(n.returnBelt,g),E=hr(n.returnBelt,p),_=n.main.rotation[1]*Math.PI/180,y=[Math.cos(_),0,-Math.sin(_)],A=M.map((R,Y)=>R-v[Y]),P=A[0]*y[0]+A[2]*y[2]>=0?1:-1,C=n.main.params.width*n.main.scale[0]/2+r.bayWidth*.76*.46+.08,D=[v[0]+y[0]*P*C,M[1],M[2]],I=[v[0],D[1],D[2]],F=[v[0],v[1],D[2]],B=[v[0],v[1],g[2]],k=e.find(R=>R.type==="conveyor"&&/平台接驳段$/.test(R.name)),H=e.find(R=>R.type==="exhibitIncline"),J=H?Gh(H.params):null,ne=H?[et(H,[-H.params.length/2,H.params.lowerHeight+.15,0]),et(H,[J.pickupX,H.params.lowerHeight+.15,0]),et(H,[J.pickupX,H.params.upperHeight+.15,0]),et(H,[H.params.length/2,H.params.upperHeight+.15,0])]:[],ue=H?[f,...ne,M]:k?[f,h(k),M]:[f,M],Q=((r.liftBay||r.bays)-.5)*r.bayWidth-r.bays*r.bayWidth/2,G=Ot(r)+(i.level-1)*r.levelHeight+(r.pickupClearance??.24),K=et(s,[Q,Ot(r)+(r.pickupClearance??.24),0]),W=et(s,[Q,G,0]),q=et(s,[Q,G,-r.depth/2-(r.laneWidth??1.8)/2]),ae=i.blockedPorts||((N=s.initialOccupiedSlots)==null?void 0:N.filter(R=>R<r.bays).map(R=>R+1))||[],ie=r.exitBay?[r.exitBay]:[r.bays,r.bays-1],ye=ie.find(R=>!ae.includes(R)||i.level===1&&i.bay===R);if(!ye)throw Error(r.exitBay?"出入通道被占用，请先清空入口":"1、2号出口均被料框占用，请先清空一个出口");const Ue=(ye-.5)*r.bayWidth-r.bays*r.bayWidth/2,qe=Ot(r)+(r.pickupClearance??.24),O=-r.depth/2-(r.laneWidth??1.8)/2,le=et(s,[Q,qe,O]),se=et(s,[Ue,qe,O]),re=et(s,[Ue,qe,0]),oe=et(s,[Ue,qe,r.depth/2+r.depth*.76/2+.18]),ve=et(s,[Ue,qe,r.depth/2+r.depth*.76/2+.18]);ve[0]=u[0];const fe=[u[0],u[1],Math.max(u[2],ve[2])],me=et(s,[r.bays*r.bayWidth/2+.8,a[1]-s.position[1],-r.depth/2-(r.laneWidth??1.8)/2]),Fe=et(s,[r.bays*r.bayWidth/2+.8,Ot(r),r.depth/2+1]);return{b:n,incline:H,bay:i.bay,level:i.level,machineWait:D,machineEntry:I,chainClear:ve,chainEntry:fe,dockBay:ye,liftRearLow:le,dockRear:se,dockCenter:re,liftLow:K,liftHigh:W,liftBack:q,liftExit:oe,source:o,back:a,endBack:me,endFront:Fe,clearance:r.pickupClearance??.24,tip:m,platform:f,receiver:T,paths:[[me,a,o,a,me,Fe,fe],[fe,...n.roller.params.rightAngleEntry?[d]:[],x],[x,et(n.roller,[0,n.roller.params.height+.09,0]),m],[m,f],ue,[M,D],[D,I,F,v,B,g],[g,S],[S,E,p],[p,p],[p,et(n.robot,[0,2.3,0]),T]],width:r.bayWidth*.76,depth:r.depth*.76,height:Math.min(r.levelHeight*.76,r.levelHeight-(r.pickupClearance??.24)-.16)}}function I_(i,e){return i.level===1?e<.38?ut([i.dockRear,i.back],e/.38):e<.5?ut([i.back,i.source],(e-.38)/.12):e<.65?ut([i.source,i.back],(e-.5)/.15):ut([i.back,i.dockRear,i.dockCenter,i.liftExit,i.chainClear,i.chainEntry],(e-.65)/.35):i.b.rack.params.liftBay?e<.18?ut([i.liftLow,i.liftHigh],e/.18):e<.38?ut([i.liftHigh,i.liftBack,i.back],(e-.18)/.2):e<.5?ut([i.back,i.source],(e-.38)/.12):e<.62?ut([i.source,i.back],(e-.5)/.12):e<.8?ut([i.back,i.liftBack,i.liftHigh],(e-.62)/.18):e<.92?ut([i.liftHigh,i.liftLow],(e-.8)/.12):ut([i.liftLow,i.liftRearLow,i.dockRear,i.dockCenter,i.liftExit,i.paths[0].at(-1)],(e-.92)/.08):e<.35?ut([i.endBack,i.back],e/.35):e<.5?ut([i.back,i.source],(e-.35)/.15):e<.65?ut([i.source,i.back],(e-.5)/.15):e<.9?ut([i.back,i.endBack],(e-.65)/.25):ut([i.endBack,i.endFront,i.paths[0].at(-1)],(e-.9)/.1)}function U_(i,e){const t=i.b.rack,n=t.params,s=Ot(n)+(n.pickupClearance??.24),r=(.5-n.bays/2)*n.bayWidth,o=-n.depth/2-(n.laneWidth??1.8)/2,a=et(t,[r,s,0]),h=et(t,[r,s,o]),c=i.b.receiver.position;return i.level===1?ut([c,a,h,i.back,i.source],e):e<.4?ut([c,a,h,i.liftRearLow,i.liftLow],e/.4):e<.6?ut([i.liftLow,i.liftHigh],(e-.4)/.2):ut([i.liftHigh,i.liftBack,i.back,i.source],(e-.6)/.4)}function N_(i){const e=i.b.rack,t=e.params,n=e.initialOccupiedSlots||[],s=i.level,r=Array.from({length:t.bays},(c,l)=>l+1).find(c=>c!==t.liftBay&&c!==1&&c<t.bays-1&&c!==i.bay&&!n.includes((s-1)*t.bays+c-1));if(!r)return null;const o=et(e,[(r-.5)*t.bayWidth-t.bays*t.bayWidth/2,Ot(t)+(s-1)*t.levelHeight+i.clearance,0]),a=et(e,[(r-.5)*t.bayWidth-t.bays*t.bayWidth/2,Ot(t)+(s-1)*t.levelHeight+i.clearance,-t.depth/2-(t.laneWidth??1.8)/2]),h=[et(i.b.tipper,[0,i.b.tipper.params.height*.62-.0875,0]),...i.paths[2].slice(0,-1).reverse(),...i.paths[1].slice(0,-1).reverse(),i.chainClear,i.liftExit,i.dockCenter,i.dockRear];return{bay:r,level:s,target:o,path:i.level===1?[...h,a,o]:[...h,i.liftRearLow,i.liftLow,i.liftHigh,i.liftBack,a,o]}}function F_(i,e){let t=null,n=null,s=null;const r=()=>{var h,c;if(t){i.remove(t.group),Ii(t.group);for(const[l,u]of t.poses){const d=e.get(l);d&&(d.position.copy(u.position),d.rotation.copy(u.rotation),d.visible=u.visible,d.userData.robotArm&&(d.userData.robotArm.visible=!0,d.userData.robotArm.rotation.y=0))}if(n!=null&&n.incline){const l=(h=e.get(n.incline.id))==null?void 0:h.userData.clothLift;l&&(l.position.y=n.incline.params.lowerHeight)}if(n!=null&&n.b.rack){const l=(c=e.get(n.b.rack.id))==null?void 0:c.userData.rackLift;l&&(l.position.y=Ot(n.b.rack.params))}if(n!=null&&n.b.tipper){const l=e.get(n.b.tipper.id);l!=null&&l.userData.tipper&&(l.userData.tipper.rotation.x=-Tt.degToRad(l.userData.baseTilt||0))}t=null}s=null};function o(h){var C;if(s===h.id)return;r(),s=h.id,n=Zh(h);const c=new tt;i.add(c);const l=Xh({id:"workflow-cargo",type:"exhibitCarrier",color:"#b8bdc1",params:{width:n.width,depth:n.depth,height:n.height},roughness:.55,metalness:.3});l.name="workflow-crate",c.add(l);const u=new Ge(new $t(.17,.17,n.width*.82,32),new ft({color:"#b88c52",roughness:.9}));u.name="workflow-cloth-roll",u.rotation.z=Math.PI/2,u.castShadow=!0,c.add(u);const d=new Map;for(const D of["shuttle","robot","receiver"]){const I=e.get(n.b[D].id);I&&d.set(n.b[D].id,{position:I.position.clone(),rotation:I.rotation.clone(),visible:I.visible})}const x=new tt;c.add(x);const b=new ft({color:"#adb8bc",metalness:.65,roughness:.4}),w=new ft({color:"#263844",roughness:.65}),m=Math.min(n.b.rack.params.bayWidth*.46,.95),f=Math.min(n.depth*.9,1.35),v=new Ge(new Lt(m,.12,f),b);v.position.y=.09,x.add(v);for(const D of[-m*.44,m*.44])for(const I of[-f*.4,f*.4]){const F=new Ge(new $t(.035,.035,.04,12),w);F.rotation.z=Math.PI/2,F.position.set(D,.035,I),x.add(F)}const g=new Ge(new Lt(m*.85,.025,f*.8),b);g.position.y=.16,x.add(g);const p=new tt;p.name="workflow-robot-arm",c.add(p),p.visible=!1;const T=[0,1].map(()=>{const D=new Ge(new $t(.105,.13,1,16),b);return p.add(D),D}),M=[0,1,2].map(()=>{const D=new Ge(new Wa(.16,16,12),b);return p.add(D),D}),S=(C=e.get(n.b.robot.id))==null?void 0:C.userData.robotGrip;i.updateMatrixWorld(!0);const E=S?S.getWorldPosition(new U).add(new U(0,-.32,0)):new U().fromArray(n.paths[10][1]),_=S?S.clone(!0):new tt;_.name="workflow-robot-gripper",_.rotation.set(0,0,0),_.traverse(D=>{D.isMesh&&(D.geometry=D.geometry.clone(),D.material=Array.isArray(D.material)?D.material.map(I=>I.clone()):D.material.clone())}),p.add(_);const y=Es(n.width,n.depth,n.height,(h.level-1)*n.b.rack.params.bays+h.bay-1);u.material.color.set(y[0].color),u.geometry.dispose(),u.geometry=new $t(y[0].radius,y[0].radius,y[0].length,24);const A=[u];for(let D=1;D<y.length;D++){const I=u.clone();I.geometry=new $t(y[D].radius,y[D].radius,y[D].length,24),I.material=u.material.clone(),I.material.color.set(y[D].color),I.name="workflow-extra-roll-"+D,c.add(I),A.push(I)}for(let D=0;D<A.length;D++){const I=A[D];Vh({cylinder:(F,B,k,H,J,ne,ue)=>{const Q=new Ge(new $t(F,F,B,24),new ft({color:ue,roughness:.94,metalness:0}));return Q.position.set(k,H,J),ne==="x"&&(Q.rotation.z=Math.PI/2),ne==="z"&&(Q.rotation.x=Math.PI/2),I.add(Q),Q}},{radius:y[D].radius,length:y[D].length,axis:"y",color:y[D].color})}t={group:c,carrier:l,cloth:u,rolls:A,specs:y,poses:d,shuttleVisual:x,lifter:g,robotRig:p,links:T,joints:M,grip:_,robotHome:E};const P=e.get(n.b.receiver.id);P&&(P.visible=!0),e.get(n.b.shuttle.id).visible=!1}function a(h){var E,_,y,A;o(h);const c=Math.min(h.stage,10),l=h.stage===11?1:Math.min(1,h.elapsed/dt[c]),u=h.rollIndex||0;t.cloth=t.rolls[u];const d=(E=h.rollStates)==null?void 0:E[u],x=c===0?I_(n,l):ut(n.paths[c],(d==null?void 0:d.pathProgress)??l),{carrier:b,cloth:w}=t;b.visible=h.stage>0||l>=.5,b.rotation.set(0,Tt.degToRad(n.b.rack.rotation[1]),0),b.position.fromArray(x),w.visible=b.visible||c>=3;const m=e.get(n.b.tipper.id),f=m==null?void 0:m.userData.tipper,v=c>=4?h.emptyElapsed??dt.slice(4,c).reduce((P,C)=>P+C,0)+h.elapsed:0;if(f&&(f.rotation.x=c<3?-Tt.degToRad(m.userData.baseTilt||0):-Math.PI/2*Math.min(c===3?l/.45:Math.max(0,1-v/4),1),m.updateMatrixWorld(!0),c>=3&&(b.position.copy(f.localToWorld(new U(...m.userData.tipperCargoOffset||[0,-.0875,0]))),b.quaternion.copy(f.getWorldQuaternion(new zt)))),c<3)w.position.copy(b.position).add(new U(...t.specs[u].offset)),b.visible||w.position.fromArray(n.source).add(new U(0,.4,0));else if(c===3){const P=t.specs[u],C=new U(...P.offset).applyQuaternion(b.quaternion).add(b.position);if(w.quaternion.copy(b.quaternion).multiply(new zt().setFromAxisAngle(new U(0,0,1),Math.PI/2)),l<.45)w.position.copy(C);else{const D=new U().fromArray(n.platform).add(new U(0,P.radius-.15,P.offset[2]-t.specs[0].offset[2]));w.position.copy(C).lerp(D,(l-.45)/.55),w.quaternion.slerp(new zt().setFromAxisAngle(new U(0,0,1),Math.PI/2),(l-.45)/.55)}}else w.rotation.set(0,0,Math.PI/2),d!=null&&d.queued?w.position.fromArray(n.platform).add(new U(0,t.specs[u].radius-.15,d.queueDistance||0)):w.position.fromArray(x).add(new U(0,t.specs[u].radius-.15,0));const g=e.get(n.b.shuttle.id);c===0&&g&&(g.position.fromArray(x),g.position.y=Math.max(0,x[1]-n.clearance+.035),t.shuttleVisual.position.copy(g.position),t.shuttleVisual.rotation.y=Tt.degToRad(n.b.rack.rotation[1]),t.lifter.position.y=.16+(l>=.5?.04:0));const p=e.get(n.b.rack.id),T=p==null?void 0:p.userData.rackLift;if(T){const P=c===0?l:1;T.position.y=Ot(n.b.rack.params)+(h.level-1)*n.b.rack.params.levelHeight*(P<.18?P/.18:P<.8?1:P<.92?1-(P-.8)/.12:0)}const M=e.get(n.b.robot.id),S=M==null?void 0:M.userData.robotArm;if(t.robotRig.visible=!0,S&&(S.visible=!1,S.rotation.y=0),M){const P=new U().fromArray(n.paths[9][0]).add(new U(0,t.specs[u].radius-.15,0)),C=new U().fromArray(n.receiver).add(new U(...t.specs[u].offset).add(new U(0,-Math.min(.13,n.b.receiver.params.height*.14)-.0175-.17+.05,0))),D=q=>q.clone().setY(Math.max(P.y,C.y)+1.1),I=D(P),F=D(C);let B;c!==10?B=t.robotHome.clone():l<.25?B=t.robotHome.clone().lerp(I,l/.25):l<.35?B=I.clone().lerp(P,(l-.25)/.1):l<.45?B=P.clone().lerp(I,(l-.35)/.1):l<.75?B=I.clone().lerp(F,(l-.45)/.3):l<.9?B=F.clone().lerp(C,(l-.75)/.15):l<.95?B=C.clone().lerp(F,(l-.9)/.05):B=F.clone().lerp(t.robotHome,(l-.95)/.05);const k=M.localToWorld(new U(0,1.15*n.b.robot.params.height/2.65,0)),H=B.clone().add(new U(0,.32,0)),J=H.clone().sub(k),ne=J.length(),ue=1.6,Q=k.clone().add(H).multiplyScalar(.5),G=new U(0,1,0).addScaledVector(J,-J.y/(ne*ne||1)).normalize(),K=Q.addScaledVector(G,Math.sqrt(Math.max(0,ue*ue-ne*ne/4))),W=[k,K,H];t.joints.forEach((q,ae)=>q.position.copy(W[ae])),t.links.forEach((q,ae)=>{const ie=W[ae+1].clone().sub(W[ae]);q.position.copy(W[ae]).add(W[ae+1]).multiplyScalar(.5),q.scale.y=ie.length(),q.quaternion.setFromUnitVectors(new U(0,1,0),ie.normalize())}),t.grip.position.copy(H),t.grip.rotation.y=Tt.degToRad(n.b.receiver.rotation[1]),c===10&&w.position.copy(l<.35?P:l<.9?B:C)}for(let P=0;P<t.rolls.length;P++){const C=t.rolls[P];if(P!==u)if(C.visible=b.visible||c>=3,C.rotation.set(0,0,Math.PI/2),c<3)C.position.copy(b.visible?b.position:new U().fromArray(n.source)).add(new U(...t.specs[P].offset));else if(c===3){const D=t.specs[P],I=new U(...D.offset).applyQuaternion(b.quaternion).add(b.position);if(C.quaternion.copy(b.quaternion).multiply(new zt().setFromAxisAngle(new U(0,0,1),Math.PI/2)),C.position.copy(I),l>=.45){const F=new U().fromArray(n.platform).add(new U(0,D.radius-.15,D.offset[2]-t.specs[0].offset[2]));C.position.lerp(F,(l-.45)/.55),C.quaternion.slerp(new zt().setFromAxisAngle(new U(0,0,1),Math.PI/2),(l-.45)/.55)}}else if(h.rollStates){const D=h.rollStates[P];D.done?C.position.fromArray(n.receiver).add(new U(...t.specs[P].offset).add(new U(0,-Math.min(.13,n.b.receiver.params.height*.14)-.0175-.17+.05,0))):D.queued?C.position.fromArray(n.platform).add(new U(0,t.specs[P].radius-.15,D.queueDistance??t.specs[P].offset[2]-t.specs[0].offset[2])):C.position.fromArray(ut(n.paths[D.stage],D.pathProgress??D.elapsed/dt[D.stage])).add(new U(0,t.specs[P].radius-.15,0))}else P<u?C.position.fromArray(n.receiver).add(new U(...t.specs[P].offset).add(new U(0,-Math.min(.13,n.b.receiver.params.height*.14)-.0175-.17+.05,0))):C.position.fromArray(n.platform).add(new U(0,t.specs[P].radius-.15,t.specs[P].offset[2]))}if(c>=4&&v>=4){const P=N_(n);if(P){const C=Math.min(1,(v-4)/40);b.position.fromArray(ut(P.path,C)),b.rotation.set(0,Tt.degToRad(n.b.rack.rotation[1]),0),C>.45&&C<1&&!(h.stage===11&&h.returnProgress>0)&&(t.shuttleVisual.position.copy(b.position),t.shuttleVisual.position.y-=n.clearance-.035)}}if(h.demo&&h.stage===11&&h.returnProgress!==void 0){const P=e.get(n.b.receiver.id),C=h.returnProgress,D=U_(n,Math.max(0,Math.min(1,(C-.35)/.57)));P&&P.position.fromArray(D);const I=new U().fromArray(D).sub(new U().fromArray(n.b.receiver.position));t.rolls.forEach((J,ne)=>{J.position.fromArray(n.b.receiver.position).add(new U(...t.specs[ne].offset)).add(I)});const F=n.b.rack,B=F.params,k=et(F,[(.5-B.bays/2)*B.bayWidth,Ot(B)+(B.pickupClearance??.24),-B.depth/2-(B.laneWidth??1.8)/2]),H=C<.27?ut([n.paths[0].at(-1),n.liftExit,n.dockCenter,n.dockRear,k,n.b.receiver.position],C/.27):D;if(t.shuttleVisual.position.fromArray(H),t.shuttleVisual.position.y-=n.clearance-.035,t.lifter.position.y=.16+(C>.27&&C<.92?.04:0),T&&n.level>1){const J=Math.max(0,Math.min(1,(C-.35)/.57));T.position.y=Ot(B)+(h.level-1)*B.levelHeight*(J<.4?0:J<.6?(J-.4)/.2:1)}h.returned&&P&&(P.visible=!1)}if(n.incline){const P=(_=e.get(n.incline.id))==null?void 0:_.userData.clothLift;if(P){const C=(y=h.rollStates)==null?void 0:y.find(I=>I.stage===4&&!I.queued),D=C?ut(n.paths[4],C.pathProgress??C.elapsed/dt[4]):c===4?x:null;P.position.y=D?Math.max(n.incline.params.lowerHeight,Math.min(n.incline.params.upperHeight,D[1]-n.incline.position[1]-.15)):n.incline.params.lowerHeight}}for(const P of["upper","returnBelt"]){const C=(A=e.get(n.b[P].id))==null?void 0:A.userData.beltTexture;C&&(C.offset.x=-(c+l)*.5)}return{stage:nl[c],progress:Math.round((h.stage+l)/11*100)}}return{render:a,reset:r}}let Nt=null;function O_(i,e){const t=i.paths.slice(4,10),n=t.map(h=>h.slice(1).reduce((c,l,u)=>c+Math.hypot(...l.map((d,x)=>d-h[u][x])),0)),s=[0];n.forEach(h=>s.push(s.at(-1)+Math.max(.01,h)));const r=t[4],o=Math.hypot(...r[1].map((h,c)=>h-r[0][c])),a=s[4]+o;return{paths:t,lengths:n,specs:e,directions:t.map(h=>{const c=h.at(-1)[0]-h[0][0],l=h.at(-1)[2]-h[0][2],u=Math.hypot(c,l)||1;return[Math.abs(c)/u,Math.abs(l)/u]}),liftGateDistance:i.incline?Math.hypot(...t[0][1].map((h,c)=>h-t[0][0][c]))+Math.hypot(...t[0][2].map((h,c)=>h-t[0][1][c])):null,bufferZones:[{start:s[4]-i.b.returnBelt.params.depth/2*i.b.returnBelt.scale[2],end:a},{start:a,end:s.at(-1),robot:!0}]}}function Fc(i,e,t={}){const n=t.lengths||[3,3,2,2,4,.01],s=t.specs||Array.from({length:i},()=>({radius:.17,length:1})),r=t.directions||n.map(()=>[0,1]),o=JSON.stringify([i,n,s,r,t.paths,t.liftGateDistance,t.bufferZones]),a=[0];n.forEach(b=>a.push(a.at(-1)+Math.max(.01,b)));const h=a.at(-1),c=b=>!b.done&&!(b.position>=h-1e-7&&b.robot>=dt[10]*.45),l=b=>{for(let w=0;w<n.length;w++)if(b<a[w+1]-1e-8)return w;return n.length-1},u=b=>{if(!t.paths)return null;const w=l(Math.max(0,b)),m=t.paths[w];let f=b-a[w];if(f<0){const v=m[0],g=m[1],p=Math.hypot(...g.map((T,M)=>T-v[M]))||1;return v.map((T,M)=>T+(g[M]-T)*f/p)}for(let v=1;v<m.length;v++){const g=m[v-1],p=m[v],T=Math.hypot(...p.map((M,S)=>M-g[S]));if(f<=T||v===m.length-1){const M=T?Math.min(1,f/T):0;return g.map((S,E)=>S+(p[E]-S)*M)}f-=T}return m.at(-1)},d=(b,w,m,f)=>{const v=u(b),g=u(m.position);return!v||!g?!1:Math.abs(v[0]-g[0])<(s[w].length+s[f].length)/2+.06&&Math.abs(v[2]-g[2])<s[w].radius+s[f].radius+.06&&Math.abs(v[1]-g[1])<s[w].radius+s[f].radius+.06},x=(b,w)=>{var m,f;return Math.abs(((m=r[w])==null?void 0:m[0])||0)*s[b].length/2+Math.abs(((f=r[w])==null?void 0:f[1])||0)*s[b].radius};if(!Nt||Nt.key!==o||e<Nt.time){let b=0;Nt={key:o,time:0,rolls:s.map((w,m)=>(m&&(b-=x(m,0)+x(m-1,0)+.04),{position:b,robot:0,wait:0,done:!1}))}}for(;Nt.time<e-1e-8;){const b=Math.min(.05,e-Nt.time);for(let w=0;w<i;w++){const m=Nt.rolls[w];if(m.done)continue;if(m.position>=h-1e-7){m.position=h,m.wait+=b,m.wait>=dt[9]&&!Nt.rolls.slice(0,w).some(p=>!p.done&&p.robot>0)&&(m.robot+=b,m.robot>=dt[10]&&(m.done=!0));continue}const f=l(Math.max(0,m.position));let v=m.position+b*Math.max(.01,n[f])/dt[f+4];const g=Nt.rolls[w-1];if(g&&c(g)){const p=l(Math.max(0,v)),T=Math.max(x(w,f)+x(w-1,f),x(w,p)+x(w-1,p))+.04;v=Math.min(v,g.position-T)}for(const p of t.bufferZones||[]){const T=x(w,f)+.06,M=p.start-T;m.position<=M+1e-7&&v>M&&Nt.rolls.slice(0,w).some((S,E)=>c(S)&&S.position+x(E,l(S.position))>=p.start-1e-7&&(p.robot||S.position-x(E,l(S.position))<p.end+.06))&&(v=Math.min(v,M))}t.liftGateDistance!=null&&m.position<t.liftGateDistance&&v+s[w].radius>=t.liftGateDistance&&Nt.rolls.slice(0,w).some(p=>!p.done&&p.position>=t.liftGateDistance&&p.position<a[1])&&(v=Math.min(v,t.liftGateDistance-s[w].radius-.04));for(const p of[2,3])v>=a[p]&&m.position<a[p]&&Nt.rolls.slice(0,w).some(T=>!T.done&&T.position>=a[p]&&T.position<a[p+1])&&(v=Math.min(v,a[p]-x(w,Math.max(0,p-1))-.04));Nt.rolls.slice(0,w).some((p,T)=>c(p)&&[0,.15,.3,.5,.75].some(M=>d(v,w,{position:Math.min(h,p.position+M)},T)))&&(v=m.position),m.position=Math.min(h,Math.max(m.position,v))}Nt.time+=b}return Nt.rolls.map(b=>{if(b.done)return{stage:11,elapsed:0,done:!0,travel:b.position};if(b.position<0)return{stage:4,elapsed:0,queued:!0,travel:b.position,queueDistance:-b.position};if(b.position>=h-1e-7)return b.robot<=0?{stage:9,elapsed:Math.min(dt[9],b.wait),pathProgress:1,travel:b.position}:{stage:10,elapsed:Math.min(dt[10],b.robot),travel:b.position};const w=l(b.position),m=Math.max(0,Math.min(1,(b.position-a[w])/Math.max(.01,n[w])));return{stage:w+4,elapsed:m*dt[w+4],pathProgress:m,travel:b.position}})}const So={};function z_({project:i,objects:e,save:t,notify:n,render:s,reset:r,stockChanged:o,slots:a,demoOnly:h=!1}){const c=Sn(!1),l=Sn([]),u=Sn(null),d=Sn({}),x=Sn(1),b=Sn(1),w=Sn(!1),m=Sn(!1),f=Sn(!1);let v=0,g=0,p=null,T=0,M=0,S=null;const E=Ir(()=>e().some(Q=>Q.type==="exhibitRack")),_=Ir(()=>!!u.value&&!u.value.demo&&u.value.status!=="completed"),y=Ir(()=>{var K;const Q=u.value;if(!Q)return 0;if(!Q.demo)return Math.min(100,Math.round((Q.stage+(Q.stage<11?Q.elapsed/dt[Q.stage]:0))/11*100));if(Q.stage<4)return Math.round((Q.stage+Q.elapsed/dt[Q.stage])/4*25);const G=((K=Q.rollStates)==null?void 0:K.reduce((W,q)=>W+(q.done?1:Math.max(0,(q.stage-4+q.elapsed/dt[q.stage])/7)),0))/(Q.rollCount||1)||0;return Math.min(100,Math.round(25+G*60+(Q.returnProgress||0)*15))});async function A(Q="",G={}){if(h)throw Error("公开演示模式不允许访问业务接口");const K=await fetch(((So==null?void 0:So.VITE_API_BASE)||"")+"/api/projects/"+encodeURIComponent(i())+"/workflows"+Q,{...G,signal:AbortSignal.timeout(15e3)});if(!K.ok)throw Error((await K.text()).slice(0,180));return K.json()}async function P(){f.value=!1,p=null,M++;const Q=M;if(m.value=!1,r(),u.value=null,l.value=[],d.value=Nc(e()),!!E.value)try{const G=await A();if(Q!==M)return;l.value=G,u.value=G.find(q=>q.status!=="completed")||G[0]||null,o();const K=e().find(q=>q.id===d.value.rack),W=a().find(q=>q.deviceId===(K==null?void 0:K.id)&&q.index%K.params.bays+1!==K.params.liftBay&&q.occupied&&!ue(q.deviceId,q.index,K.params.bays));W&&(x.value=W.index%K.params.bays+1,b.value=Math.floor(W.index/K.params.bays)+1),u.value&&u.value.status!=="completed"?s(u.value):u.value=null}catch(G){n("任务加载失败："+G.message)}}function C(){try{const Q=Nc(e()),G=e().find(ae=>ae.id===Q.rack),K=a().filter(ae=>ae.deviceId===(G==null?void 0:G.id)&&ae.occupied&&ae.index%G.params.bays+1!==G.params.liftBay);if(!K.length){f.value=!1,m.value=!1,n("没有可用于演示的料框库位");return}const W=K[v++%K.length];r(),u.value={id:"demo-"+v,projectId:i(),demo:!0,blockedPorts:a().filter(ae=>ae.deviceId===G.id&&ae.occupied&&ae.index<G.params.bays).map(ae=>ae.index+1),rollIndex:0,rollCount:Es(G.params.bayWidth*.76,G.params.depth*.76,Math.min(G.params.levelHeight*.76,G.params.levelHeight-(G.params.pickupClearance??.24)-.16),W.index).length,bindings:Q,bay:W.index%G.params.bays+1,level:Math.floor(W.index/G.params.bays)+1,stage:0,elapsed:0,status:"running",layout:{objects:JSON.parse(JSON.stringify(e()))}};const q=Zh(u.value);u.value.pipelineGeometry=O_(q,Es(q.width,q.depth,q.height,W.index)),g=0,o(),s(u.value)}catch(Q){f.value=!1,m.value=!1,r(),u.value=null,o(),n(Q.message)}}async function D(){var Q,G;if(!w.value){if(f.value){f.value=!1,m.value=!1,u.value.status="paused",n("整体演示已暂停，可以下达指定任务");return}if(_.value){m.value&&await J(),n("请先完成当前指定任务，再开启连续演示");return}(Q=u.value)!=null&&Q.demo||(p=u.value),f.value=!0,m.value=!0,(G=u.value)!=null&&G.demo?u.value.stage<11&&(u.value.status="running"):C()}}function I(){var Q;(Q=u.value)!=null&&Q.demo&&(f.value=!1,m.value=!1,r(),u.value=p,p=null,o(),n("已退出演示，可以编辑方案"))}function F(){var Q;f.value&&(f.value=!1,m.value=!1,(Q=u.value)!=null&&Q.demo&&(u.value.status="paused")),c.value=!0}async function B(Q=m.value?"running":"paused"){var W;if(!u.value||u.value.demo)return!0;const G=u.value,K=G.id;w.value=!0,S=A("/"+K,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({stage:G.stage,elapsed:G.elapsed,status:G.stage===11?"completed":Q,revision:G.revision})});try{const q=await S;return((W=u.value)==null?void 0:W.id)!==K?!1:(u.value=q,l.value=[q,...l.value.filter(ae=>ae.id!==K)],o(),!0)}catch(q){return m.value=!1,n("任务已暂停："+q.message),!1}finally{S=null,w.value=!1}}async function k(){var Q;if(m.value=!1,(Q=u.value)!=null&&Q.demo&&I(),S)try{await S}catch{return!1}return _.value?B("paused"):!0}async function H(){var Q;if(!(w.value||_.value||f.value))try{if(!a().some(K=>{var W;return K.deviceId===d.value.rack&&K.index===(b.value-1)*((W=e().find(q=>q.id===d.value.rack))==null?void 0:W.params.bays)+x.value-1&&K.occupied&&!ue(K.deviceId,K.index,e().find(q=>q.id===K.deviceId).params.bays)}))throw Error("所选库位没有可取料框，请选择有货的列和层");if((Q=u.value)!=null&&Q.demo&&(r(),u.value=p,o()),!await t())return;w.value=!0;const G=await A("",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({bindings:d.value,bay:x.value,level:b.value})});r(),u.value=G,l.value.unshift(G),T=0,c.value=!1,m.value=!0,n("布卷出库任务已下达")}catch(G){n("下达失败："+G.message)}finally{w.value=!1}}async function J(){var Q;if((Q=u.value)!=null&&Q.demo){await D();return}if(!u.value||u.value.status==="completed"){c.value=!0;return}m.value?(m.value=!1,S&&await S,await B("paused")):(m.value=!0,await B("running"))}function ne(Q){const G=u.value;if(!(!G||!m.value)){if(G.demo){if(f.value&&m.value)if(G.stage>=4&&(G.emptyElapsed=(G.emptyElapsed||0)+Q),G.stage===11)G.returnProgress=Math.min(1,(G.returnProgress||0)+Q/42),G.returnProgress===1&&(G.returned||(G.returned=!0,o()),g+=Q,g>=1.5&&C());else if(G.stage>=4){G.pipelineTime=(G.pipelineTime||0)+Q,G.rollStates=Fc(G.rollCount,G.pipelineTime,G.pipelineGeometry);const K=G.rollStates.findIndex(q=>q.stage===10);G.rollIndex=K>=0?K:Math.max(0,G.rollStates.findIndex(q=>!q.done));const W=G.rollStates[G.rollIndex];G.stage=G.rollStates.every(q=>q.done)?11:W.stage,G.elapsed=W.elapsed,G.stage===11&&(G.status="completed")}else{const K=G.stage===0&&G.elapsed>=dt[0]*.5;G.elapsed=Math.min(dt[G.stage],G.elapsed+Q),G.stage===0&&!K&&G.elapsed>=dt[0]*.5&&o(),G.elapsed>=dt[G.stage]&&(G.stage++,G.elapsed=0,G.stage===4&&(G.pipelineTime=0,G.rollStates=Fc(G.rollCount,0,G.pipelineGeometry)),o())}s(u.value);return}if(m.value&&!w.value&&G.stage<11){const K=G.stage===0&&G.elapsed>=dt[0]*.5;G.elapsed=Math.min(dt[G.stage],G.elapsed+Q),G.stage===0&&!K&&G.elapsed>=dt[0]*.5&&o(),T+=Q,G.elapsed>=dt[G.stage]?(G.stage++,G.elapsed=0,G.stage===11&&(m.value=!1),B(),T=0):T>2&&(B(),T=0)}s(G)}}function ue(Q,G,K){var W,q;return((W=u.value)==null?void 0:W.demo)&&!u.value.returned&&u.value.bindings.rack===Q&&(u.value.level-1)*K+u.value.bay-1===G&&(u.value.stage>0||u.value.elapsed>=dt[0]*.5)||!((q=u.value)!=null&&q.demo)&&l.value.some(ae=>ae.bindings.rack===Q&&(ae.level-1)*K+ae.bay-1===G&&(ae.stage>0||ae.elapsed>dt[0]*.5))}return{demo:f,toggleDemo:D,stopDemo:I,suspend:k,openManual:F,open:c,records:l,task:u,bindings:d,bay:x,level:b,busy:w,playing:m,isExhibition:E,locked:_,progress:y,load:P,submit:H,toggle:J,advance:ne,consumed:ue,steps:nl}}function k_(i,{kind:e,onState:t=()=>{},onPick:n=()=>{},onError:s=()=>{}}){const r=D_(e),o=fv(r.objects.filter(z=>z.type==="binRack"),"A",r.floor.exitReserve||10);o&&Object.assign(r.floor,vv(o,r.objects));const a=new ph;a.background=new We("#717b78"),a.fog=new za("#717b78",.006);const h=new nv({antialias:!0,powerPreference:"high-performance"});h.toneMapping=wa,h.toneMappingExposure=1,h.shadowMap.type=Gc,i.appendChild(h.domElement);const c=new jt(42,1,.1,500),l=new Hv(c,h.domElement);l.enableDamping=!0,l.dampingFactor=.08,l.minDistance=2,l.maxDistance=150,l.maxPolarAngle=Math.PI*.49;const u=new va(h),d=new Uv,x=u.fromScene(d,.04);a.environment=x.texture,a.environmentIntensity=.6,d.dispose(),u.dispose(),a.add(new fd("#e9eee9","#525450",.8));const b=new Yl("#fff0e2",2.35);b.name="studio-sun",b.castShadow=!0,b.shadow.mapSize.set(2048,2048),a.add(b,b.target);const w=new Yl("#d7e8ed",.75);w.position.set(-12,9,-10),a.add(w);const m=new Ge(new jn(2e3,2e3),new ft({color:"#343d3e",roughness:.92}));m.rotation.x=-Math.PI/2,m.position.y=-.28,m.receiveShadow=!0,a.add(m);const f=new tt,v=r.floor,g=h.capabilities.getMaxAnisotropy(),p=new Ge(new Lt(v.width,.25,v.depth),new qa({color:"#b3bbb4",map:Nv(v.width,v.depth,g),bumpMap:Bv(v.width,v.depth,g),bumpScale:.006,roughness:.84,roughnessMap:Ov(v.width,v.depth,g),metalness:.02,clearcoat:.12,clearcoatRoughness:.58}));p.position.set(v.centerX||0,-.125,v.centerZ||0),p.receiveShadow=!0,f.add(p);const T=Math.max(7,...r.objects.map(z=>z.type==="binRack"?Math.max(z.params.smallLevels*z.params.smallStep,z.params.largeLevels*z.params.largeStep)+.2:z.params.height||3))+2,M=zv(v,T,{wallsVisible:!1});f.add(M),a.add(f),Fv(a,v);const S=new Map,E=new Map,_=r.objects;let y=e!=="exhibition"?bc(_,{pose:z=>{var $;return($=S.get(z))==null?void 0:$.userData.pose},notify:z=>t({message:z})}):null,A=(y==null?void 0:y.state)||bo(_,2026),P="",C="entrance";for(const z of _.filter($=>$.type==="binRack"))z.binSizes=A.slots.filter($=>$.deviceId===z.id).map($=>$.size);for(const z of _){const $=Xh(z);$.userData.pose={travel:z.params.travel||0,lift:z.params.lift||0,extension:0},$.position.fromArray(z.position),$.rotation.set(...z.rotation.map(Tt.degToRad)),$.scale.fromArray(z.scale),$.visible=z.visible,S.set(z.id,$),a.add($),z.type==="binRack"&&$.add(gv(z,_.filter(X=>X.type==="binRack").indexOf(z)))}o&&f.add(pv(o));let D=!1,I=!1,F,B=0,k=0,H=performance.now(),J=0,ne=0,ue=!0,Q=null,G;const K=e==="exhibition"?F_(a,S):{reset(){}},W=()=>{for(const z of _){const $=new Set(A.slots.filter(X=>X.deviceId===z.id&&X.occupied&&!(G!=null&&G.consumed(z.id,X.index,z.params.bays))).map(X=>X.index));qh(S.get(z.id),$)}ue=!0};e==="exhibition"&&(G=z_({demoOnly:!0,project:()=>r.id,objects:()=>_,save:async()=>!0,notify:z=>t({message:z==="整体演示已暂停，可以下达指定任务"?"演示已暂停，点击开始演示可继续。":z==="已退出演示，可以编辑方案"?"演示已重置，可重新开始。":z}),render:z=>{K.render(z),ue=!0},reset:()=>K.reset(),stockChanged:W,slots:()=>A.slots})),W();const q=new Qt;for(const z of S.values())q.expandByObject(z);const ae=q.getCenter(new U),ie=q.getSize(new U),ye=Math.max(ie.x,ie.z,ie.y*2,8);function Ue(z){P="",l.target.copy(z.target),c.position.copy(z.position),l.maxDistance=350,c.near=.1,c.far=500,c.updateProjectionMatrix(),l.update(),ue=!0}function qe(){C="overview",Ue(o?wc(o,c.aspect):{target:ae,position:ae.clone().add(new U(1,.7,1).normalize().multiplyScalar(ye*1.8))})}function O(){C="entrance",o&&Ue(Ec(o,c.aspect))}function le(z){const $=S.get(z);if(!$)return;const X=Ac($),Se=Math.max(X.size.length()/2,.8),he=Se/(Math.sin(Tt.degToRad(c.fov/2))*Math.min(c.aspect,1))*1.2,Ae=$.userData.carriage?new U(-.2,.3,1).normalize():c.position.clone().sub(l.target).normalize();Ae.lengthSq()<.01&&Ae.set(1,.6,1).normalize(),Ue({target:X.center,position:X.center.clone().addScaledVector(Ae,he)}),C=null}let se;const re=()=>{const z=i.clientWidth,$=i.clientHeight;if(!(!z||!$)){if(h.setSize(z,$),c.aspect=z/$,c.updateProjectionMatrix(),se==null||se.resize(z,$),C&&o){const X=C==="overview"?wc(o,c.aspect):Ec(o,c.aspect);Ue(X)}ue=!0}};h.shadowMap.enabled=!0,re(),se=Iv(h,a,c),re(),o?O():qe();const oe=new ResizeObserver(re);oe.observe(i),l.addEventListener("start",()=>{C=null,P=""}),l.addEventListener("change",()=>{ue=!0});const ve=new _d,fe=new de;let me;const Fe=z=>{me={x:z.clientX,y:z.clientY}},Ne=z=>{if(!me||Math.hypot(z.clientX-me.x,z.clientY-me.y)>5)return;const $=h.domElement.getBoundingClientRect();fe.set((z.clientX-$.left)/$.width*2-1,-(z.clientY-$.top)/$.height*2+1),ve.setFromCamera(fe,c);const X=ve.intersectObjects([...S.values()],!0)[0];let Se=X==null?void 0:X.object;for(;Se&&!_.some(he=>he.id===Se.userData.id);)Se=Se.parent;Q=_.find(he=>he.id===(Se==null?void 0:Se.userData.id))||null,n(Q?{name:Q.name,type:Q.type}:null)};h.domElement.addEventListener("pointerdown",Fe),h.domElement.addEventListener("pointerup",Ne);const N=()=>{document.hidden&&(y==null||y.pause(),D=!1,G&&(G.playing.value=!1,G.demo.value=!1),t({playing:!1,message:"页面进入后台，动画已暂停。"}),H=performance.now()),ue=!0};document.addEventListener("visibilitychange",N);const R=z=>{z.preventDefault(),D=!1,s("显卡上下文已丢失，请刷新页面后重试。")};h.domElement.addEventListener("webglcontextlost",R);function Y(z){if(I)return;F=requestAnimationFrame(Y);const $=Math.min((z-H)/1e3,.05);if(H=z,!document.hidden){if(l.update(),P&&(_v(c,l,Ac(S.get(P)).center,$),ue=!0),D){if(B+=$,y){y.advance($).then(X=>{X&&!I&&W()}).catch(X=>{y.pause(),D=!1,s(X.message)});for(const X of A.tasks){const Se=S.get(X.deviceId);Se&&Xn(X)&&(Mo(Se,X.pose.travel,X.pose.lift,X.pose.extension),Se.userData.pose={...X.pose});let he=E.get(X.code);X.cargoState!=="rack"&&!X.collected?(he||(he=ov(X.geometry,X.cargo.boxCode),a.add(he),E.set(X.code,he)),he.position.fromArray(X.type==="inbound"?hv(X):zh(X))):he&&(a.remove(he),Ii(he),E.delete(X.code))}D=y.playing}else if(G)G.advance($);else{Math.floor(B)>k&&(iu(A,_,Math.floor(B)-k),k=Math.floor(B),W());for(const X of _){if(!A.devices[X.id])continue;const Se=su(X,B);Mo(S.get(X.id),Se.travel,Se.lift,Se.extension)}}ue=!0}ue&&(se.invalidate(),se.render(D),ue=!1,ne++),z-J>1e3&&(t({playing:D,elapsed:Math.floor(B),devices:_.length,slots:A.slots.length,occupied:A.slots.filter(X=>X.occupied).length,fps:Math.round(ne*1e3/(z-J||1e3)),cycles:(y==null?void 0:y.status.cycles)||0,tasks:y?A.tasks.slice(0,8).map(X=>({code:X.code,stage:X.stage,progress:X.progress,type:X.type,boxCode:X.cargo.boxCode})):[],stage:y?y.status.message:G!=null&&G.task.value?nl[Math.min(G.task.value.stage,10)]:G?"准备就绪 · 点击开始演示":"设备运动与模拟移库",progress:(G==null?void 0:G.progress.value)||0}),ne=0,J=z)}}return F=requestAnimationFrame(Y),{toggle:async()=>{y?(y.playing?y.pause():y.start(),D=y.playing):G?(await G.toggleDemo(),D=G.playing.value):D=!D,ue=!0,t({playing:D})},overview:qe,entrance:O,devices:_.filter(z=>z.type==="stacker").map(z=>({id:z.id,name:z.name})),follow:z=>{z&&le(z),P=z},toggleFactory:()=>(M.visible=!M.visible,ue=!0,M.visible),focus:()=>{Q&&le(Q.id)},reset:()=>{D=!1,y==null||y.dispose();for(const z of E.values())a.remove(z),Ii(z);E.clear(),B=0,k=0,G&&(G.stopDemo(),K.reset()),y=e!=="exhibition"?bc(_,{pose:z=>{var $;return($=S.get(z))==null?void 0:$.userData.pose},notify:z=>t({message:z})}):null,A=(y==null?void 0:y.state)||bo(_,2026);for(const z of _){const $=S.get(z.id);$.userData.pose={travel:z.params.travel||0,lift:z.params.lift||0,extension:0},Mo($,$.userData.pose.travel,$.userData.pose.lift,0)}W(),o?O():qe(),t({playing:!1,elapsed:0,cycles:0,tasks:[],progress:0,message:"演示已重置。"})},dispose:()=>{var z;I=!0,y==null||y.dispose();for(const $ of E.values())Ii($);se.dispose(),cancelAnimationFrame(F),oe.disconnect(),document.removeEventListener("visibilitychange",N),h.domElement.removeEventListener("pointerdown",Fe),h.domElement.removeEventListener("pointerup",Ne),h.domElement.removeEventListener("webglcontextlost",R),K.reset(),l.dispose();for(const $ of S.values())Ii($);m.geometry.dispose(),m.material.dispose(),Ii(f),x.dispose(),(z=b.shadow.map)==null||z.dispose(),h.dispose(),h.domElement.remove()}}}export{k_ as startDemo};
