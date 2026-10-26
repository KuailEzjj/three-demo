/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const di={ROTATE:0,DOLLY:1,PAN:2},ui={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bl=0,La=1,zl=2,qo=1,jo=2,ln=3,bn=0,Ae=1,cn=2,Sn=0,pi=1,Ua=2,Ia=3,Na=4,Hl=5,Fn=100,kl=101,Gl=102,Vl=103,Wl=104,Xl=200,Yl=201,ql=202,jl=203,yr=204,Er=205,Kl=206,Zl=207,$l=208,Jl=209,Ql=210,tc=211,ec=212,nc=213,ic=214,br=0,Tr=1,Ar=2,gi=3,wr=4,Rr=5,Cr=6,Pr=7,Ko=0,sc=1,rc=2,yn=0,ac=1,oc=2,lc=3,Zo=4,cc=5,hc=6,uc=7,$o=300,_i=301,vi=302,Dr=303,Lr=304,Os=306,Ur=1e3,Bn=1001,Ir=1002,Le=1003,fc=1004,Zi=1005,Ze=1006,Vs=1007,zn=1008,Qe=1009,Jo=1010,Qo=1011,Bi=1012,fa=1013,Hn=1014,$e=1015,Yi=1016,da=1017,pa=1018,zi=1020,tl=35902,el=35899,nl=1021,il=1022,qe=1023,Hi=1026,ki=1027,ma=1028,ga=1029,sl=1030,_a=1031,va=1033,As=33776,ws=33777,Rs=33778,Cs=33779,Nr=35840,Fr=35841,Or=35842,Br=35843,zr=36196,Hr=37492,kr=37496,Gr=37808,Vr=37809,Wr=37810,Xr=37811,Yr=37812,qr=37813,jr=37814,Kr=37815,Zr=37816,$r=37817,Jr=37818,Qr=37819,ta=37820,ea=37821,na=36492,ia=36494,sa=36495,ra=36283,aa=36284,oa=36285,la=36286,dc=3200,pc=3201,rl=0,mc=1,Mn="",Be="srgb",xi="srgb-linear",Ds="linear",Zt="srgb",Yn=7680,Fa=519,gc=512,_c=513,vc=514,al=515,xc=516,Mc=517,Sc=518,yc=519,ca=35044,Ec=35048,Oa="300 es",Je=2e3,Ls=2001;class Vn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ba=1234567;const Fi=Math.PI/180,Gi=180/Math.PI;function hn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]).toLowerCase()}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function xa(i,t){return(i%t+t)%t}function bc(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Tc(i,t,e){return i!==t?(e-i)/(t-i):0}function Oi(i,t,e){return(1-e)*i+e*t}function Ac(i,t,e,n){return Oi(i,t,1-Math.exp(-e*n))}function wc(i,t=1){return t-Math.abs(xa(i,t*2)-t)}function Rc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Cc(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Pc(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Dc(i,t){return i+Math.random()*(t-i)}function Lc(i){return i*(.5-Math.random())}function Uc(i){i!==void 0&&(Ba=i);let t=Ba+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ic(i){return i*Fi}function Nc(i){return i*Gi}function Fc(i){return(i&i-1)===0&&i!==0}function Oc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Bc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function zc(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),h=a(e/2),l=r((t+n)/2),c=a((t+n)/2),f=r((t-n)/2),p=a((t-n)/2),d=r((n-t)/2),v=a((n-t)/2);switch(s){case"XYX":i.set(o*c,h*f,h*p,o*l);break;case"YZY":i.set(h*p,o*c,h*f,o*l);break;case"ZXZ":i.set(h*f,h*p,o*c,o*l);break;case"XZX":i.set(o*c,h*v,h*d,o*l);break;case"YXY":i.set(h*d,o*c,h*v,o*l);break;case"ZYZ":i.set(h*v,h*d,o*c,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ye(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function jt(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ma={DEG2RAD:Fi,RAD2DEG:Gi,generateUUID:hn,clamp:Gt,euclideanModulo:xa,mapLinear:bc,inverseLerp:Tc,lerp:Oi,damp:Ac,pingpong:wc,smoothstep:Rc,smootherstep:Cc,randInt:Pc,randFloat:Dc,randFloatSpread:Lc,seededRandom:Uc,degToRad:Ic,radToDeg:Nc,isPowerOfTwo:Fc,ceilPowerOfTwo:Oc,floorPowerOfTwo:Bc,setQuaternionFromProperEuler:zc,normalize:jt,denormalize:Ye};class At{constructor(t=0,e=0){At.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let h=n[s+0],l=n[s+1],c=n[s+2],f=n[s+3];const p=r[a+0],d=r[a+1],v=r[a+2],x=r[a+3];if(o===0){t[e+0]=h,t[e+1]=l,t[e+2]=c,t[e+3]=f;return}if(o===1){t[e+0]=p,t[e+1]=d,t[e+2]=v,t[e+3]=x;return}if(f!==x||h!==p||l!==d||c!==v){let g=1-o;const u=h*p+l*d+c*v+f*x,R=u>=0?1:-1,C=1-u*u;if(C>Number.EPSILON){const P=Math.sqrt(C),S=Math.atan2(P,u*R);g=Math.sin(g*S)/P,o=Math.sin(o*S)/P}const T=o*R;if(h=h*g+p*T,l=l*g+d*T,c=c*g+v*T,f=f*g+x*T,g===1-o){const P=1/Math.sqrt(h*h+l*l+c*c+f*f);h*=P,l*=P,c*=P,f*=P}}t[e]=h,t[e+1]=l,t[e+2]=c,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],h=n[s+1],l=n[s+2],c=n[s+3],f=r[a],p=r[a+1],d=r[a+2],v=r[a+3];return t[e]=o*v+c*f+h*d-l*p,t[e+1]=h*v+c*p+l*f-o*d,t[e+2]=l*v+c*d+o*p-h*f,t[e+3]=c*v-o*f-h*p-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,h=Math.sin,l=o(n/2),c=o(s/2),f=o(r/2),p=h(n/2),d=h(s/2),v=h(r/2);switch(a){case"XYZ":this._x=p*c*f+l*d*v,this._y=l*d*f-p*c*v,this._z=l*c*v+p*d*f,this._w=l*c*f-p*d*v;break;case"YXZ":this._x=p*c*f+l*d*v,this._y=l*d*f-p*c*v,this._z=l*c*v-p*d*f,this._w=l*c*f+p*d*v;break;case"ZXY":this._x=p*c*f-l*d*v,this._y=l*d*f+p*c*v,this._z=l*c*v+p*d*f,this._w=l*c*f-p*d*v;break;case"ZYX":this._x=p*c*f-l*d*v,this._y=l*d*f+p*c*v,this._z=l*c*v-p*d*f,this._w=l*c*f+p*d*v;break;case"YZX":this._x=p*c*f+l*d*v,this._y=l*d*f+p*c*v,this._z=l*c*v-p*d*f,this._w=l*c*f-p*d*v;break;case"XZY":this._x=p*c*f-l*d*v,this._y=l*d*f-p*c*v,this._z=l*c*v+p*d*f,this._w=l*c*f+p*d*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],h=e[9],l=e[2],c=e[6],f=e[10],p=n+o+f;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(c-h)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(c-h)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(h+c)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(h+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,h=e._y,l=e._z,c=e._w;return this._x=n*c+a*o+s*l-r*h,this._y=s*c+a*h+r*o-n*l,this._z=r*c+a*l+n*h-s*o,this._w=a*c-n*o-s*h-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const h=1-o*o;if(h<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(h),c=Math.atan2(l,o),f=Math.sin((1-e)*c)/l,p=Math.sin(e*c)/l;return this._w=a*f+this._w*p,this._x=n*f+this._x*p,this._y=s*f+this._y*p,this._z=r*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(za.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(za.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,h=t.w,l=2*(a*s-o*n),c=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+h*l+a*f-o*c,this.y=n+h*c+o*l-r*f,this.z=s+h*f+r*c-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,h=e.z;return this.x=s*h-r*o,this.y=r*a-n*h,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ws.copy(this).projectOnVector(t),this.sub(Ws)}reflect(t){return this.sub(Ws.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ws=new F,za=new kn;class Ot{constructor(t,e,n,s,r,a,o,h,l){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,h,l)}set(t,e,n,s,r,a,o,h,l){const c=this.elements;return c[0]=t,c[1]=s,c[2]=o,c[3]=e,c[4]=r,c[5]=h,c[6]=n,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],h=n[6],l=n[1],c=n[4],f=n[7],p=n[2],d=n[5],v=n[8],x=s[0],g=s[3],u=s[6],R=s[1],C=s[4],T=s[7],P=s[2],S=s[5],b=s[8];return r[0]=a*x+o*R+h*P,r[3]=a*g+o*C+h*S,r[6]=a*u+o*T+h*b,r[1]=l*x+c*R+f*P,r[4]=l*g+c*C+f*S,r[7]=l*u+c*T+f*b,r[2]=p*x+d*R+v*P,r[5]=p*g+d*C+v*S,r[8]=p*u+d*T+v*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8];return e*a*c-e*o*l-n*r*c+n*o*h+s*r*l-s*a*h}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],f=c*a-o*l,p=o*h-c*r,d=l*r-a*h,v=e*f+n*p+s*d;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return t[0]=f*x,t[1]=(s*l-c*n)*x,t[2]=(o*n-s*a)*x,t[3]=p*x,t[4]=(c*e-s*h)*x,t[5]=(s*r-o*e)*x,t[6]=d*x,t[7]=(n*h-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const h=Math.cos(r),l=Math.sin(r);return this.set(n*h,n*l,-n*(h*a+l*o)+a+t,-s*l,s*h,-s*(-l*a+h*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Xs.makeScale(t,e)),this}rotate(t){return this.premultiply(Xs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Xs=new Ot;function ol(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hc(){const i=Us("canvas");return i.style.display="block",i}const Ha={};function Vi(i){i in Ha||(Ha[i]=!0,console.warn(i))}function kc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const ka=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ga=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gc(){const i={enabled:!0,workingColorSpace:xi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Zt&&(s.r=un(s.r),s.g=un(s.g),s.b=un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Zt&&(s.r=mi(s.r),s.g=mi(s.g),s.b=mi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Mn?Ds:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Vi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Vi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[xi]:{primaries:t,whitePoint:n,transfer:Ds,toXYZ:ka,fromXYZ:Ga,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:t,whitePoint:n,transfer:Zt,toXYZ:ka,fromXYZ:Ga,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}}),i}const Yt=Gc();function un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qn;class Vc{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qn===void 0&&(qn=Us("canvas")),qn.width=t.width,qn.height=t.height;const s=qn.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qn}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Us("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=un(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(un(e[n]/255)*255):e[n]=un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wc=0;class Sa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wc++}),this.uuid=hn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ys(s[a].image)):r.push(Ys(s[a]))}else r=Ys(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ys(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xc=0;const qs=new F;class Me extends Vn{constructor(t=Me.DEFAULT_IMAGE,e=Me.DEFAULT_MAPPING,n=Bn,s=Bn,r=Ze,a=zn,o=qe,h=Qe,l=Me.DEFAULT_ANISOTROPY,c=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xc++}),this.uuid=hn(),this.name="",this.source=new Sa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qs).x}get height(){return this.source.getSize(qs).y}get depth(){return this.source.getSize(qs).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$o)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ur:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case Ir:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ur:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case Ir:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Me.DEFAULT_IMAGE=null;Me.DEFAULT_MAPPING=$o;Me.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,s=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const h=t.elements,l=h[0],c=h[4],f=h[8],p=h[1],d=h[5],v=h[9],x=h[2],g=h[6],u=h[10];if(Math.abs(c-p)<.01&&Math.abs(f-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(c+p)<.1&&Math.abs(f+x)<.1&&Math.abs(v+g)<.1&&Math.abs(l+d+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const C=(l+1)/2,T=(d+1)/2,P=(u+1)/2,S=(c+p)/4,b=(f+x)/4,A=(v+g)/4;return C>T&&C>P?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=S/n,r=b/n):T>P?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=S/s,r=A/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=b/r,s=A/r),this.set(n,s,r,e),this}let R=Math.sqrt((g-v)*(g-v)+(f-x)*(f-x)+(p-c)*(p-c));return Math.abs(R)<.001&&(R=1),this.x=(g-v)/R,this.y=(f-x)/R,this.z=(p-c)/R,this.w=Math.acos((l+d+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yc extends Vn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Me(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Sa(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends Yc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ll extends Me{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qc extends Me{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fn{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ge.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ge.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ge.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ge):Ge.fromBufferAttribute(r,a),Ge.applyMatrix4(t.matrixWorld),this.expandByPoint(Ge);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$i.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$i.copy(n.boundingBox)),$i.applyMatrix4(t.matrixWorld),this.union($i)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ge),Ge.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(bi),Ji.subVectors(this.max,bi),jn.subVectors(t.a,bi),Kn.subVectors(t.b,bi),Zn.subVectors(t.c,bi),dn.subVectors(Kn,jn),pn.subVectors(Zn,Kn),Cn.subVectors(jn,Zn);let e=[0,-dn.z,dn.y,0,-pn.z,pn.y,0,-Cn.z,Cn.y,dn.z,0,-dn.x,pn.z,0,-pn.x,Cn.z,0,-Cn.x,-dn.y,dn.x,0,-pn.y,pn.x,0,-Cn.y,Cn.x,0];return!js(e,jn,Kn,Zn,Ji)||(e=[1,0,0,0,1,0,0,0,1],!js(e,jn,Kn,Zn,Ji))?!1:(Qi.crossVectors(dn,pn),e=[Qi.x,Qi.y,Qi.z],js(e,jn,Kn,Zn,Ji))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ge).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ge).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const nn=[new F,new F,new F,new F,new F,new F,new F,new F],Ge=new F,$i=new fn,jn=new F,Kn=new F,Zn=new F,dn=new F,pn=new F,Cn=new F,bi=new F,Ji=new F,Qi=new F,Pn=new F;function js(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Pn.fromArray(i,r);const o=s.x*Math.abs(Pn.x)+s.y*Math.abs(Pn.y)+s.z*Math.abs(Pn.z),h=t.dot(Pn),l=e.dot(Pn),c=n.dot(Pn);if(Math.max(-Math.max(h,l,c),Math.min(h,l,c))>o)return!1}return!0}const jc=new fn,Ti=new F,Ks=new F;class Si{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):jc.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ti.subVectors(t,this.center);const e=Ti.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ti,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ks.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ti.copy(t.center).add(Ks)),this.expandByPoint(Ti.copy(t.center).sub(Ks))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const sn=new F,Zs=new F,ts=new F,mn=new F,$s=new F,es=new F,Js=new F;class Bs{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Zs.copy(t).add(e).multiplyScalar(.5),ts.copy(e).sub(t).normalize(),mn.copy(this.origin).sub(Zs);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ts),o=mn.dot(this.direction),h=-mn.dot(ts),l=mn.lengthSq(),c=Math.abs(1-a*a);let f,p,d,v;if(c>0)if(f=a*h-o,p=a*o-h,v=r*c,f>=0)if(p>=-v)if(p<=v){const x=1/c;f*=x,p*=x,d=f*(f+a*p+2*o)+p*(a*f+p+2*h)+l}else p=r,f=Math.max(0,-(a*p+o)),d=-f*f+p*(p+2*h)+l;else p=-r,f=Math.max(0,-(a*p+o)),d=-f*f+p*(p+2*h)+l;else p<=-v?(f=Math.max(0,-(-a*r+o)),p=f>0?-r:Math.min(Math.max(-r,-h),r),d=-f*f+p*(p+2*h)+l):p<=v?(f=0,p=Math.min(Math.max(-r,-h),r),d=p*(p+2*h)+l):(f=Math.max(0,-(a*r+o)),p=f>0?r:Math.min(Math.max(-r,-h),r),d=-f*f+p*(p+2*h)+l);else p=a>0?-r:r,f=Math.max(0,-(a*p+o)),d=-f*f+p*(p+2*h)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Zs).addScaledVector(ts,p),d}intersectSphere(t,e){sn.subVectors(t.center,this.origin);const n=sn.dot(this.direction),s=sn.dot(sn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,h=n+a;return h<0?null:o<0?this.at(h,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,h;const l=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),c>=0?(r=(t.min.y-p.y)*c,a=(t.max.y-p.y)*c):(r=(t.max.y-p.y)*c,a=(t.min.y-p.y)*c),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-p.z)*f,h=(t.max.z-p.z)*f):(o=(t.max.z-p.z)*f,h=(t.min.z-p.z)*f),n>h||o>s)||((o>n||n!==n)&&(n=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,n,s,r){$s.subVectors(e,t),es.subVectors(n,t),Js.crossVectors($s,es);let a=this.direction.dot(Js),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mn.subVectors(this.origin,t);const h=o*this.direction.dot(es.crossVectors(mn,es));if(h<0)return null;const l=o*this.direction.dot($s.cross(mn));if(l<0||h+l>a)return null;const c=-o*mn.dot(Js);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jt{constructor(t,e,n,s,r,a,o,h,l,c,f,p,d,v,x,g){Jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,h,l,c,f,p,d,v,x,g)}set(t,e,n,s,r,a,o,h,l,c,f,p,d,v,x,g){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=h,u[2]=l,u[6]=c,u[10]=f,u[14]=p,u[3]=d,u[7]=v,u[11]=x,u[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/$n.setFromMatrixColumn(t,0).length(),r=1/$n.setFromMatrixColumn(t,1).length(),a=1/$n.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),h=Math.cos(s),l=Math.sin(s),c=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const p=a*c,d=a*f,v=o*c,x=o*f;e[0]=h*c,e[4]=-h*f,e[8]=l,e[1]=d+v*l,e[5]=p-x*l,e[9]=-o*h,e[2]=x-p*l,e[6]=v+d*l,e[10]=a*h}else if(t.order==="YXZ"){const p=h*c,d=h*f,v=l*c,x=l*f;e[0]=p+x*o,e[4]=v*o-d,e[8]=a*l,e[1]=a*f,e[5]=a*c,e[9]=-o,e[2]=d*o-v,e[6]=x+p*o,e[10]=a*h}else if(t.order==="ZXY"){const p=h*c,d=h*f,v=l*c,x=l*f;e[0]=p-x*o,e[4]=-a*f,e[8]=v+d*o,e[1]=d+v*o,e[5]=a*c,e[9]=x-p*o,e[2]=-a*l,e[6]=o,e[10]=a*h}else if(t.order==="ZYX"){const p=a*c,d=a*f,v=o*c,x=o*f;e[0]=h*c,e[4]=v*l-d,e[8]=p*l+x,e[1]=h*f,e[5]=x*l+p,e[9]=d*l-v,e[2]=-l,e[6]=o*h,e[10]=a*h}else if(t.order==="YZX"){const p=a*h,d=a*l,v=o*h,x=o*l;e[0]=h*c,e[4]=x-p*f,e[8]=v*f+d,e[1]=f,e[5]=a*c,e[9]=-o*c,e[2]=-l*c,e[6]=d*f+v,e[10]=p-x*f}else if(t.order==="XZY"){const p=a*h,d=a*l,v=o*h,x=o*l;e[0]=h*c,e[4]=-f,e[8]=l*c,e[1]=p*f+x,e[5]=a*c,e[9]=d*f-v,e[2]=v*f-d,e[6]=o*c,e[10]=x*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Kc,t,Zc)}lookAt(t,e,n){const s=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),gn.crossVectors(n,Pe),gn.lengthSq()===0&&(Math.abs(n.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),gn.crossVectors(n,Pe)),gn.normalize(),ns.crossVectors(Pe,gn),s[0]=gn.x,s[4]=ns.x,s[8]=Pe.x,s[1]=gn.y,s[5]=ns.y,s[9]=Pe.y,s[2]=gn.z,s[6]=ns.z,s[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],h=n[8],l=n[12],c=n[1],f=n[5],p=n[9],d=n[13],v=n[2],x=n[6],g=n[10],u=n[14],R=n[3],C=n[7],T=n[11],P=n[15],S=s[0],b=s[4],A=s[8],_=s[12],m=s[1],y=s[5],D=s[9],U=s[13],I=s[2],k=s[6],z=s[10],Z=s[14],G=s[3],X=s[7],et=s[11],ut=s[15];return r[0]=a*S+o*m+h*I+l*G,r[4]=a*b+o*y+h*k+l*X,r[8]=a*A+o*D+h*z+l*et,r[12]=a*_+o*U+h*Z+l*ut,r[1]=c*S+f*m+p*I+d*G,r[5]=c*b+f*y+p*k+d*X,r[9]=c*A+f*D+p*z+d*et,r[13]=c*_+f*U+p*Z+d*ut,r[2]=v*S+x*m+g*I+u*G,r[6]=v*b+x*y+g*k+u*X,r[10]=v*A+x*D+g*z+u*et,r[14]=v*_+x*U+g*Z+u*ut,r[3]=R*S+C*m+T*I+P*G,r[7]=R*b+C*y+T*k+P*X,r[11]=R*A+C*D+T*z+P*et,r[15]=R*_+C*U+T*Z+P*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],h=t[9],l=t[13],c=t[2],f=t[6],p=t[10],d=t[14],v=t[3],x=t[7],g=t[11],u=t[15];return v*(+r*h*f-s*l*f-r*o*p+n*l*p+s*o*d-n*h*d)+x*(+e*h*d-e*l*p+r*a*p-s*a*d+s*l*c-r*h*c)+g*(+e*l*f-e*o*d-r*a*f+n*a*d+r*o*c-n*l*c)+u*(-s*o*c-e*h*f+e*o*p+s*a*f-n*a*p+n*h*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],f=t[9],p=t[10],d=t[11],v=t[12],x=t[13],g=t[14],u=t[15],R=f*g*l-x*p*l+x*h*d-o*g*d-f*h*u+o*p*u,C=v*p*l-c*g*l-v*h*d+a*g*d+c*h*u-a*p*u,T=c*x*l-v*f*l+v*o*d-a*x*d-c*o*u+a*f*u,P=v*f*h-c*x*h-v*o*p+a*x*p+c*o*g-a*f*g,S=e*R+n*C+s*T+r*P;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/S;return t[0]=R*b,t[1]=(x*p*r-f*g*r-x*s*d+n*g*d+f*s*u-n*p*u)*b,t[2]=(o*g*r-x*h*r+x*s*l-n*g*l-o*s*u+n*h*u)*b,t[3]=(f*h*r-o*p*r-f*s*l+n*p*l+o*s*d-n*h*d)*b,t[4]=C*b,t[5]=(c*g*r-v*p*r+v*s*d-e*g*d-c*s*u+e*p*u)*b,t[6]=(v*h*r-a*g*r-v*s*l+e*g*l+a*s*u-e*h*u)*b,t[7]=(a*p*r-c*h*r+c*s*l-e*p*l-a*s*d+e*h*d)*b,t[8]=T*b,t[9]=(v*f*r-c*x*r-v*n*d+e*x*d+c*n*u-e*f*u)*b,t[10]=(a*x*r-v*o*r+v*n*l-e*x*l-a*n*u+e*o*u)*b,t[11]=(c*o*r-a*f*r-c*n*l+e*f*l+a*n*d-e*o*d)*b,t[12]=P*b,t[13]=(c*x*s-v*f*s+v*n*p-e*x*p-c*n*g+e*f*g)*b,t[14]=(v*o*s-a*x*s-v*n*h+e*x*h+a*n*g-e*o*g)*b,t[15]=(a*f*s-c*o*s+c*n*h-e*f*h-a*n*p+e*o*p)*b,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,h=t.z,l=r*a,c=r*o;return this.set(l*a+n,l*o-s*h,l*h+s*o,0,l*o+s*h,c*o+n,c*h-s*a,0,l*h-s*o,c*h+s*a,r*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,h=e._w,l=r+r,c=a+a,f=o+o,p=r*l,d=r*c,v=r*f,x=a*c,g=a*f,u=o*f,R=h*l,C=h*c,T=h*f,P=n.x,S=n.y,b=n.z;return s[0]=(1-(x+u))*P,s[1]=(d+T)*P,s[2]=(v-C)*P,s[3]=0,s[4]=(d-T)*S,s[5]=(1-(p+u))*S,s[6]=(g+R)*S,s[7]=0,s[8]=(v+C)*b,s[9]=(g-R)*b,s[10]=(1-(p+x))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=$n.set(s[0],s[1],s[2]).length();const a=$n.set(s[4],s[5],s[6]).length(),o=$n.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ve.copy(this);const l=1/r,c=1/a,f=1/o;return Ve.elements[0]*=l,Ve.elements[1]*=l,Ve.elements[2]*=l,Ve.elements[4]*=c,Ve.elements[5]*=c,Ve.elements[6]*=c,Ve.elements[8]*=f,Ve.elements[9]*=f,Ve.elements[10]*=f,e.setFromRotationMatrix(Ve),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Je,h=!1){const l=this.elements,c=2*r/(e-t),f=2*r/(n-s),p=(e+t)/(e-t),d=(n+s)/(n-s);let v,x;if(h)v=r/(a-r),x=a*r/(a-r);else if(o===Je)v=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ls)v=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Je,h=!1){const l=this.elements,c=2/(e-t),f=2/(n-s),p=-(e+t)/(e-t),d=-(n+s)/(n-s);let v,x;if(h)v=1/(a-r),x=a/(a-r);else if(o===Je)v=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ls)v=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=v,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const $n=new F,Ve=new Jt,Kc=new F(0,0,0),Zc=new F(1,1,1),gn=new F,ns=new F,Pe=new F,Va=new Jt,Wa=new kn;class tn{constructor(t=0,e=0,n=0,s=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],h=s[1],l=s[5],c=s[9],f=s[2],p=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-Gt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Va.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Va,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wa.setFromEuler(this),this.setFromQuaternion(Wa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class ya{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $c=0;const Xa=new F,Jn=new kn,rn=new Jt,is=new F,Ai=new F,Jc=new F,Qc=new kn,Ya=new F(1,0,0),qa=new F(0,1,0),ja=new F(0,0,1),Ka={type:"added"},th={type:"removed"},Qn={type:"childadded",child:null},Qs={type:"childremoved",child:null};class fe extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$c++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fe.DEFAULT_UP.clone();const t=new F,e=new tn,n=new kn,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Jt},normalMatrix:{value:new Ot}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ya,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Jn.setFromAxisAngle(t,e),this.quaternion.multiply(Jn),this}rotateOnWorldAxis(t,e){return Jn.setFromAxisAngle(t,e),this.quaternion.premultiply(Jn),this}rotateX(t){return this.rotateOnAxis(Ya,t)}rotateY(t){return this.rotateOnAxis(qa,t)}rotateZ(t){return this.rotateOnAxis(ja,t)}translateOnAxis(t,e){return Xa.copy(t).applyQuaternion(this.quaternion),this.position.add(Xa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ya,t)}translateY(t){return this.translateOnAxis(qa,t)}translateZ(t){return this.translateOnAxis(ja,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?is.copy(t):is.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ai.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Ai,is,this.up):rn.lookAt(is,Ai,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),Jn.setFromRotationMatrix(rn),this.quaternion.premultiply(Jn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ka),Qn.child=t,this.dispatchEvent(Qn),Qn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(th),Qs.child=t,this.dispatchEvent(Qs),Qs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ka),Qn.child=t,this.dispatchEvent(Qn),Qn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,t,Jc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,Qc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,c=h.length;l<c;l++){const f=h[l];r(t.shapes,f)}else r(t.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(r(t.materials,this.material[h]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(t.animations,h))}}if(e){const o=a(t.geometries),h=a(t.materials),l=a(t.textures),c=a(t.images),f=a(t.shapes),p=a(t.skeletons),d=a(t.animations),v=a(t.nodes);o.length>0&&(n.geometries=o),h.length>0&&(n.materials=h),l.length>0&&(n.textures=l),c.length>0&&(n.images=c),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const h=[];for(const l in o){const c=o[l];delete c.metadata,h.push(c)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}fe.DEFAULT_UP=new F(0,1,0);fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const We=new F,an=new F,tr=new F,on=new F,ti=new F,ei=new F,Za=new F,er=new F,nr=new F,ir=new F,sr=new oe,rr=new oe,ar=new oe;class He{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),We.subVectors(t,e),s.cross(We);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){We.subVectors(s,e),an.subVectors(n,e),tr.subVectors(t,e);const a=We.dot(We),o=We.dot(an),h=We.dot(tr),l=an.dot(an),c=an.dot(tr),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const p=1/f,d=(l*h-o*c)*p,v=(a*c-o*h)*p;return r.set(1-d-v,v,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(t,e,n,s,r,a,o,h){return this.getBarycoord(t,e,n,s,on)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,on.x),h.addScaledVector(a,on.y),h.addScaledVector(o,on.z),h)}static getInterpolatedAttribute(t,e,n,s,r,a){return sr.setScalar(0),rr.setScalar(0),ar.setScalar(0),sr.fromBufferAttribute(t,e),rr.fromBufferAttribute(t,n),ar.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(sr,r.x),a.addScaledVector(rr,r.y),a.addScaledVector(ar,r.z),a}static isFrontFacing(t,e,n,s){return We.subVectors(n,e),an.subVectors(t,e),We.cross(an).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return We.subVectors(this.c,this.b),an.subVectors(this.a,this.b),We.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return He.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return He.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return He.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return He.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return He.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ti.subVectors(s,n),ei.subVectors(r,n),er.subVectors(t,n);const h=ti.dot(er),l=ei.dot(er);if(h<=0&&l<=0)return e.copy(n);nr.subVectors(t,s);const c=ti.dot(nr),f=ei.dot(nr);if(c>=0&&f<=c)return e.copy(s);const p=h*f-c*l;if(p<=0&&h>=0&&c<=0)return a=h/(h-c),e.copy(n).addScaledVector(ti,a);ir.subVectors(t,r);const d=ti.dot(ir),v=ei.dot(ir);if(v>=0&&d<=v)return e.copy(r);const x=d*l-h*v;if(x<=0&&l>=0&&v<=0)return o=l/(l-v),e.copy(n).addScaledVector(ei,o);const g=c*v-d*f;if(g<=0&&f-c>=0&&d-v>=0)return Za.subVectors(r,s),o=(f-c)/(f-c+(d-v)),e.copy(s).addScaledVector(Za,o);const u=1/(g+x+p);return a=x*u,o=p*u,e.copy(n).addScaledVector(ti,a).addScaledVector(ei,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},ss={h:0,s:0,l:0};function or(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Nt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=xa(t,1),e=Gt(e,0,1),n=Gt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=or(a,r,t+1/3),this.g=or(a,r,t),this.b=or(a,r,t-1/3)}return Yt.colorSpaceToWorking(this,s),this}setStyle(t,e=Be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=cl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=un(t.r),this.g=un(t.g),this.b=un(t.b),this}copyLinearToSRGB(t){return this.r=mi(t.r),this.g=mi(t.g),this.b=mi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return Yt.workingToColorSpace(ve.copy(this),t),Math.round(Gt(ve.r*255,0,255))*65536+Math.round(Gt(ve.g*255,0,255))*256+Math.round(Gt(ve.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(ve.copy(this),e);const n=ve.r,s=ve.g,r=ve.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let h,l;const c=(o+a)/2;if(o===a)h=0,l=0;else{const f=a-o;switch(l=c<=.5?f/(a+o):f/(2-a-o),a){case n:h=(s-r)/f+(s<r?6:0);break;case s:h=(r-n)/f+2;break;case r:h=(n-s)/f+4;break}h/=6}return t.h=h,t.s=l,t.l=c,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(ve.copy(this),e),t.r=ve.r,t.g=ve.g,t.b=ve.b,t}getStyle(t=Be){Yt.workingToColorSpace(ve.copy(this),t);const e=ve.r,n=ve.g,s=ve.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(_n),this.setHSL(_n.h+t,_n.s+e,_n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(_n),t.getHSL(ss);const n=Oi(_n.h,ss.h,e),s=Oi(_n.s,ss.s,e),r=Oi(_n.l,ss.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ve=new Nt;Nt.NAMES=cl;let eh=0;class Wn extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=hn(),this.name="",this.type="Material",this.blending=pi,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yr,this.blendDst=Er,this.blendEquation=Fn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yn,this.stencilZFail=Yn,this.stencilZPass=Yn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yr&&(n.blendSrc=this.blendSrc),this.blendDst!==Er&&(n.blendDst=this.blendDst),this.blendEquation!==Fn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class hl extends Wn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new F,rs=new At;let nh=0;class Ue{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ca,this.updateRanges=[],this.gpuType=$e,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)rs.fromBufferAttribute(this,e),rs.applyMatrix3(t),this.setXY(e,rs.x,rs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ye(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ye(e,this.array)),e}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ye(e,this.array)),e}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ye(e,this.array)),e}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ye(e,this.array)),e}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array),r=jt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ca&&(t.usage=this.usage),t}}class ul extends Ue{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class fl extends Ue{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class we extends Ue{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ih=0;const Fe=new Jt,lr=new fe,ni=new F,De=new fn,wi=new fn,ge=new F;class ke extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ol(t)?fl:ul)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fe.makeRotationFromQuaternion(t),this.applyMatrix4(Fe),this}rotateX(t){return Fe.makeRotationX(t),this.applyMatrix4(Fe),this}rotateY(t){return Fe.makeRotationY(t),this.applyMatrix4(Fe),this}rotateZ(t){return Fe.makeRotationZ(t),this.applyMatrix4(Fe),this}translate(t,e,n){return Fe.makeTranslation(t,e,n),this.applyMatrix4(Fe),this}scale(t,e,n){return Fe.makeScale(t,e,n),this.applyMatrix4(Fe),this}lookAt(t){return lr.lookAt(t),lr.updateMatrix(),this.applyMatrix4(lr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ni).negate(),this.translate(ni.x,ni.y,ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new we(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];De.setFromBufferAttribute(r),this.morphTargetsRelative?(ge.addVectors(this.boundingBox.min,De.min),this.boundingBox.expandByPoint(ge),ge.addVectors(this.boundingBox.max,De.max),this.boundingBox.expandByPoint(ge)):(this.boundingBox.expandByPoint(De.min),this.boundingBox.expandByPoint(De.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(De.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];wi.setFromBufferAttribute(o),this.morphTargetsRelative?(ge.addVectors(De.min,wi.min),De.expandByPoint(ge),ge.addVectors(De.max,wi.max),De.expandByPoint(ge)):(De.expandByPoint(wi.min),De.expandByPoint(wi.max))}De.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ge.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ge));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],h=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)ge.fromBufferAttribute(o,l),h&&(ni.fromBufferAttribute(t,l),ge.add(ni)),s=Math.max(s,n.distanceToSquared(ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ue(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],h=[];for(let A=0;A<n.count;A++)o[A]=new F,h[A]=new F;const l=new F,c=new F,f=new F,p=new At,d=new At,v=new At,x=new F,g=new F;function u(A,_,m){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,_),f.fromBufferAttribute(n,m),p.fromBufferAttribute(r,A),d.fromBufferAttribute(r,_),v.fromBufferAttribute(r,m),c.sub(l),f.sub(l),d.sub(p),v.sub(p);const y=1/(d.x*v.y-v.x*d.y);isFinite(y)&&(x.copy(c).multiplyScalar(v.y).addScaledVector(f,-d.y).multiplyScalar(y),g.copy(f).multiplyScalar(d.x).addScaledVector(c,-v.x).multiplyScalar(y),o[A].add(x),o[_].add(x),o[m].add(x),h[A].add(g),h[_].add(g),h[m].add(g))}let R=this.groups;R.length===0&&(R=[{start:0,count:t.count}]);for(let A=0,_=R.length;A<_;++A){const m=R[A],y=m.start,D=m.count;for(let U=y,I=y+D;U<I;U+=3)u(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const C=new F,T=new F,P=new F,S=new F;function b(A){P.fromBufferAttribute(s,A),S.copy(P);const _=o[A];C.copy(_),C.sub(P.multiplyScalar(P.dot(_))).normalize(),T.crossVectors(S,_);const y=T.dot(h[A])<0?-1:1;a.setXYZW(A,C.x,C.y,C.z,y)}for(let A=0,_=R.length;A<_;++A){const m=R[A],y=m.start,D=m.count;for(let U=y,I=y+D;U<I;U+=3)b(t.getX(U+0)),b(t.getX(U+1)),b(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ue(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);const s=new F,r=new F,a=new F,o=new F,h=new F,l=new F,c=new F,f=new F;if(t)for(let p=0,d=t.count;p<d;p+=3){const v=t.getX(p+0),x=t.getX(p+1),g=t.getX(p+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,g),c.subVectors(a,r),f.subVectors(s,r),c.cross(f),o.fromBufferAttribute(n,v),h.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(c),h.add(c),l.add(c),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(x,h.x,h.y,h.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let p=0,d=e.count;p<d;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),c.subVectors(a,r),f.subVectors(s,r),c.cross(f),n.setXYZ(p+0,c.x,c.y,c.z),n.setXYZ(p+1,c.x,c.y,c.z),n.setXYZ(p+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ge.fromBufferAttribute(t,e),ge.normalize(),t.setXYZ(e,ge.x,ge.y,ge.z)}toNonIndexed(){function t(o,h){const l=o.array,c=o.itemSize,f=o.normalized,p=new l.constructor(h.length*c);let d=0,v=0;for(let x=0,g=h.length;x<g;x++){o.isInterleavedBufferAttribute?d=h[x]*o.data.stride+o.offset:d=h[x]*c;for(let u=0;u<c;u++)p[v++]=l[d++]}return new Ue(p,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ke,n=this.index.array,s=this.attributes;for(const o in s){const h=s[o],l=t(h,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const h=[],l=r[o];for(let c=0,f=l.length;c<f;c++){const p=l[c],d=t(p,n);h.push(d)}e.morphAttributes[o]=h}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(t[l]=h[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const l=n[h];t.data.attributes[h]=l.toJSON(t.data)}const s={};let r=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],c=[];for(let f=0,p=l.length;f<p;f++){const d=l[f];c.push(d.toJSON(t.data))}c.length>0&&(s[h]=c,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const c=s[l];this.setAttribute(l,c.clone(e))}const r=t.morphAttributes;for(const l in r){const c=[],f=r[l];for(let p=0,d=f.length;p<d;p++)c.push(f[p].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,c=a.length;l<c;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $a=new Jt,Dn=new Bs,as=new Si,Ja=new F,os=new F,ls=new F,cs=new F,cr=new F,hs=new F,Qa=new F,us=new F;class xe extends fe{constructor(t=new ke,e=new hl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){hs.set(0,0,0);for(let h=0,l=r.length;h<l;h++){const c=o[h],f=r[h];c!==0&&(cr.fromBufferAttribute(f,t),a?hs.addScaledVector(cr,c):hs.addScaledVector(cr.sub(e),c))}e.add(hs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),as.copy(n.boundingSphere),as.applyMatrix4(r),Dn.copy(t.ray).recast(t.near),!(as.containsPoint(Dn.origin)===!1&&(Dn.intersectSphere(as,Ja)===null||Dn.origin.distanceToSquared(Ja)>(t.far-t.near)**2))&&($a.copy(r).invert(),Dn.copy(t.ray).applyMatrix4($a),!(n.boundingBox!==null&&Dn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Dn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,f=r.attributes.normal,p=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,x=p.length;v<x;v++){const g=p[v],u=a[g.materialIndex],R=Math.max(g.start,d.start),C=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let T=R,P=C;T<P;T+=3){const S=o.getX(T),b=o.getX(T+1),A=o.getX(T+2);s=fs(this,u,t,n,l,c,f,S,b,A),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const v=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=v,u=x;g<u;g+=3){const R=o.getX(g),C=o.getX(g+1),T=o.getX(g+2);s=fs(this,a,t,n,l,c,f,R,C,T),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let v=0,x=p.length;v<x;v++){const g=p[v],u=a[g.materialIndex],R=Math.max(g.start,d.start),C=Math.min(h.count,Math.min(g.start+g.count,d.start+d.count));for(let T=R,P=C;T<P;T+=3){const S=T,b=T+1,A=T+2;s=fs(this,u,t,n,l,c,f,S,b,A),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const v=Math.max(0,d.start),x=Math.min(h.count,d.start+d.count);for(let g=v,u=x;g<u;g+=3){const R=g,C=g+1,T=g+2;s=fs(this,a,t,n,l,c,f,R,C,T),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function sh(i,t,e,n,s,r,a,o){let h;if(t.side===Ae?h=n.intersectTriangle(a,r,s,!0,o):h=n.intersectTriangle(s,r,a,t.side===bn,o),h===null)return null;us.copy(o),us.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(us);return l<e.near||l>e.far?null:{distance:l,point:us.clone(),object:i}}function fs(i,t,e,n,s,r,a,o,h,l){i.getVertexPosition(o,os),i.getVertexPosition(h,ls),i.getVertexPosition(l,cs);const c=sh(i,t,e,n,os,ls,cs,Qa);if(c){const f=new F;He.getBarycoord(Qa,os,ls,cs,f),s&&(c.uv=He.getInterpolatedAttribute(s,o,h,l,f,new At)),r&&(c.uv1=He.getInterpolatedAttribute(r,o,h,l,f,new At)),a&&(c.normal=He.getInterpolatedAttribute(a,o,h,l,f,new F),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const p={a:o,b:h,c:l,normal:new F,materialIndex:0};He.getNormal(os,ls,cs,p.normal),c.face=p,c.barycoord=f}return c}class An extends ke{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],l=[],c=[],f=[];let p=0,d=0;v("z","y","x",-1,-1,n,e,t,a,r,0),v("z","y","x",1,-1,n,e,-t,a,r,1),v("x","z","y",1,1,t,n,e,s,a,2),v("x","z","y",1,-1,t,n,-e,s,a,3),v("x","y","z",1,-1,t,e,n,s,r,4),v("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(h),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(c,3)),this.setAttribute("uv",new we(f,2));function v(x,g,u,R,C,T,P,S,b,A,_){const m=T/b,y=P/A,D=T/2,U=P/2,I=S/2,k=b+1,z=A+1;let Z=0,G=0;const X=new F;for(let et=0;et<z;et++){const ut=et*y-U;for(let bt=0;bt<k;bt++){const Vt=bt*m-D;X[x]=Vt*R,X[g]=ut*C,X[u]=I,l.push(X.x,X.y,X.z),X[x]=0,X[g]=0,X[u]=S>0?1:-1,c.push(X.x,X.y,X.z),f.push(bt/b),f.push(1-et/A),Z+=1}}for(let et=0;et<A;et++)for(let ut=0;ut<b;ut++){const bt=p+ut+k*et,Vt=p+ut+k*(et+1),Ht=p+(ut+1)+k*(et+1),kt=p+(ut+1)+k*et;h.push(bt,Vt,kt),h.push(Vt,Ht,kt),G+=6}o.addGroup(d,G,_),d+=G,p+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new An(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Mi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ee(i){const t={};for(let e=0;e<i.length;e++){const n=Mi(i[e]);for(const s in n)t[s]=n[s]}return t}function rh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function dl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const ah={clone:Mi,merge:Ee};var oh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends Wn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oh,this.fragmentShader=lh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mi(t.uniforms),this.uniformsGroups=rh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class pl extends fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=Je,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vn=new F,to=new At,eo=new At;class ze extends pl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Gi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Fi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Gi*2*Math.atan(Math.tan(Fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(vn.x,vn.y).multiplyScalar(-t/vn.z),vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vn.x,vn.y).multiplyScalar(-t/vn.z)}getViewSize(t,e){return this.getViewBounds(t,to,eo),e.subVectors(eo,to)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Fi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/h,e-=a.offsetY*n/l,s*=a.width/h,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ii=-90,si=1;class ch extends fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ze(ii,si,t,e);s.layers=this.layers,this.add(s);const r=new ze(ii,si,t,e);r.layers=this.layers,this.add(r);const a=new ze(ii,si,t,e);a.layers=this.layers,this.add(a);const o=new ze(ii,si,t,e);o.layers=this.layers,this.add(o);const h=new ze(ii,si,t,e);h.layers=this.layers,this.add(h);const l=new ze(ii,si,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,h]=e;for(const l of e)this.remove(l);if(t===Je)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===Ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,l,c]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,h),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,c),t.setRenderTarget(f,p,d),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class ml extends Me{constructor(t=[],e=_i,n,s,r,a,o,h,l,c){super(t,e,n,s,r,a,o,h,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class hh extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ml(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new An(5,5,5),r=new Tn({name:"CubemapFromEquirect",uniforms:Mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ae,blending:Sn});r.uniforms.tEquirect.value=e;const a=new xe(s,r),o=e.minFilter;return e.minFilter===zn&&(e.minFilter=Ze),new ch(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Xe extends fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uh={type:"move"};class hr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),u=this._getHandJoint(l,x);g!==null&&(u.matrix.fromArray(g.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=g.radius),u.visible=g!==null}const c=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],p=c.position.distanceTo(f.position),d=.02,v=.005;l.inputState.pinching&&p>d+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=d-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(uh)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class fh extends fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class dh{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ca,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ye=new F;class Is{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Ye(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ye(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ye(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ye(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ye(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array),r=jt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ue(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Is(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class gl extends Wn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ri;const Ri=new F,ai=new F,oi=new F,li=new At,Ci=new At,_l=new Jt,ds=new F,Pi=new F,ps=new F,no=new At,ur=new At,io=new At;class ph extends fe{constructor(t=new gl){if(super(),this.isSprite=!0,this.type="Sprite",ri===void 0){ri=new ke;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new dh(e,5);ri.setIndex([0,1,2,0,2,3]),ri.setAttribute("position",new Is(n,3,0,!1)),ri.setAttribute("uv",new Is(n,2,3,!1))}this.geometry=ri,this.material=t,this.center=new At(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ai.setFromMatrixScale(this.matrixWorld),_l.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),oi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ai.multiplyScalar(-oi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ms(ds.set(-.5,-.5,0),oi,a,ai,s,r),ms(Pi.set(.5,-.5,0),oi,a,ai,s,r),ms(ps.set(.5,.5,0),oi,a,ai,s,r),no.set(0,0),ur.set(1,0),io.set(1,1);let o=t.ray.intersectTriangle(ds,Pi,ps,!1,Ri);if(o===null&&(ms(Pi.set(-.5,.5,0),oi,a,ai,s,r),ur.set(0,1),o=t.ray.intersectTriangle(ds,ps,Pi,!1,Ri),o===null))return;const h=t.ray.origin.distanceTo(Ri);h<t.near||h>t.far||e.push({distance:h,point:Ri.clone(),uv:He.getInterpolation(Ri,ds,Pi,ps,no,ur,io,new At),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ms(i,t,e,n,s,r){li.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ci.x=r*li.x-s*li.y,Ci.y=s*li.x+r*li.y):Ci.copy(li),i.copy(t),i.x+=Ci.x,i.y+=Ci.y,i.applyMatrix4(_l)}class mh extends Me{constructor(t=null,e=1,n=1,s,r,a,o,h,l=Le,c=Le,f,p){super(null,a,o,h,l,c,s,r,f,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class so extends Ue{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ci=new Jt,ro=new Jt,gs=[],ao=new fn,gh=new Jt,Di=new xe,Li=new Si;class _h extends xe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new so(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,gh)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ci),ao.copy(t.boundingBox).applyMatrix4(ci),this.boundingBox.union(ao)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Si),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ci),Li.copy(t.boundingSphere).applyMatrix4(ci),this.boundingSphere.union(Li)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Di.geometry=this.geometry,Di.material=this.material,Di.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Li.copy(this.boundingSphere),Li.applyMatrix4(n),t.ray.intersectsSphere(Li)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ci),ro.multiplyMatrices(n,ci),Di.matrixWorld=ro,Di.raycast(t,gs);for(let a=0,o=gs.length;a<o;a++){const h=gs[a];h.instanceId=r,h.object=this,e.push(h)}gs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new so(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mh(new Float32Array(s*this.count),s,this.count,ma,$e));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,h=s*t;r[h]=o,r.set(n,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const fr=new F,vh=new F,xh=new Ot;class xn{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=fr.subVectors(n,e).cross(vh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(fr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||xh.getNormalMatrix(t),s=this.coplanarPoint(fr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ln=new Si,Mh=new At(.5,.5),_s=new F;class Ea{constructor(t=new xn,e=new xn,n=new xn,s=new xn,r=new xn,a=new xn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Je,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],h=r[2],l=r[3],c=r[4],f=r[5],p=r[6],d=r[7],v=r[8],x=r[9],g=r[10],u=r[11],R=r[12],C=r[13],T=r[14],P=r[15];if(s[0].setComponents(l-a,d-c,u-v,P-R).normalize(),s[1].setComponents(l+a,d+c,u+v,P+R).normalize(),s[2].setComponents(l+o,d+f,u+x,P+C).normalize(),s[3].setComponents(l-o,d-f,u-x,P-C).normalize(),n)s[4].setComponents(h,p,g,T).normalize(),s[5].setComponents(l-h,d-p,u-g,P-T).normalize();else if(s[4].setComponents(l-h,d-p,u-g,P-T).normalize(),e===Je)s[5].setComponents(l+h,d+p,u+g,P+T).normalize();else if(e===Ls)s[5].setComponents(h,p,g,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ln.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ln.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ln)}intersectsSprite(t){Ln.center.set(0,0,0);const e=Mh.distanceTo(t.center);return Ln.radius=.7071067811865476+e,Ln.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ln)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(_s.x=s.normal.x>0?t.max.x:t.min.x,_s.y=s.normal.y>0?t.max.y:t.min.y,_s.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_s)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class vl extends Wn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ns=new F,Fs=new F,oo=new Jt,Ui=new Bs,vs=new Si,dr=new F,lo=new F;class Sh extends fe{constructor(t=new ke,e=new vl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ns.fromBufferAttribute(e,s-1),Fs.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ns.distanceTo(Fs);t.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(s),vs.radius+=r,t.ray.intersectsSphere(vs)===!1)return;oo.copy(s).invert(),Ui.copy(t.ray).applyMatrix4(oo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=this.isLineSegments?2:1,c=n.index,p=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),v=Math.min(c.count,a.start+a.count);for(let x=d,g=v-1;x<g;x+=l){const u=c.getX(x),R=c.getX(x+1),C=xs(this,t,Ui,h,u,R,x);C&&e.push(C)}if(this.isLineLoop){const x=c.getX(v-1),g=c.getX(d),u=xs(this,t,Ui,h,x,g,v-1);u&&e.push(u)}}else{const d=Math.max(0,a.start),v=Math.min(p.count,a.start+a.count);for(let x=d,g=v-1;x<g;x+=l){const u=xs(this,t,Ui,h,x,x+1,x);u&&e.push(u)}if(this.isLineLoop){const x=xs(this,t,Ui,h,v-1,d,v-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function xs(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Ns.fromBufferAttribute(o,s),Fs.fromBufferAttribute(o,r),e.distanceSqToSegment(Ns,Fs,dr,lo)>n)return;dr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(dr);if(!(l<t.near||l>t.far))return{distance:l,point:lo.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const co=new F,ho=new F;class yh extends Sh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)co.fromBufferAttribute(e,s),ho.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+co.distanceTo(ho);t.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Eh extends Me{constructor(t,e,n,s,r,a,o,h,l){super(t,e,n,s,r,a,o,h,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xl extends Me{constructor(t,e,n=Hn,s,r,a,o=Le,h=Le,l,c=Hi,f=1){if(c!==Hi&&c!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:f};super(p,s,r,a,o,h,c,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Sa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ml extends Me{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Wi extends ke{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h};const l=this;s=Math.floor(s),r=Math.floor(r);const c=[],f=[],p=[],d=[];let v=0;const x=[],g=n/2;let u=0;R(),a===!1&&(t>0&&C(!0),e>0&&C(!1)),this.setIndex(c),this.setAttribute("position",new we(f,3)),this.setAttribute("normal",new we(p,3)),this.setAttribute("uv",new we(d,2));function R(){const T=new F,P=new F;let S=0;const b=(e-t)/n;for(let A=0;A<=r;A++){const _=[],m=A/r,y=m*(e-t)+t;for(let D=0;D<=s;D++){const U=D/s,I=U*h+o,k=Math.sin(I),z=Math.cos(I);P.x=y*k,P.y=-m*n+g,P.z=y*z,f.push(P.x,P.y,P.z),T.set(k,b,z).normalize(),p.push(T.x,T.y,T.z),d.push(U,1-m),_.push(v++)}x.push(_)}for(let A=0;A<s;A++)for(let _=0;_<r;_++){const m=x[_][A],y=x[_+1][A],D=x[_+1][A+1],U=x[_][A+1];(t>0||_!==0)&&(c.push(m,y,U),S+=3),(e>0||_!==r-1)&&(c.push(y,D,U),S+=3)}l.addGroup(u,S,0),u+=S}function C(T){const P=v,S=new At,b=new F;let A=0;const _=T===!0?t:e,m=T===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,g*m,0),p.push(0,m,0),d.push(.5,.5),v++;const y=v;for(let D=0;D<=s;D++){const I=D/s*h+o,k=Math.cos(I),z=Math.sin(I);b.x=_*z,b.y=g*m,b.z=_*k,f.push(b.x,b.y,b.z),p.push(0,m,0),S.x=k*.5+.5,S.y=z*.5*m+.5,d.push(S.x,S.y),v++}for(let D=0;D<s;D++){const U=P+D,I=y+D;T===!0?c.push(I,I+1,U):c.push(I+1,I,U),A+=3}l.addGroup(u,A,T===!0?1:2),u+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qi extends ke{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),h=Math.floor(s),l=o+1,c=h+1,f=t/o,p=e/h,d=[],v=[],x=[],g=[];for(let u=0;u<c;u++){const R=u*p-a;for(let C=0;C<l;C++){const T=C*f-r;v.push(T,-R,0),x.push(0,0,1),g.push(C/o),g.push(1-u/h)}}for(let u=0;u<h;u++)for(let R=0;R<o;R++){const C=R+l*u,T=R+l*(u+1),P=R+1+l*(u+1),S=R+1+l*u;d.push(C,T,S),d.push(T,P,S)}this.setIndex(d),this.setAttribute("position",new we(v,3)),this.setAttribute("normal",new we(x,3)),this.setAttribute("uv",new we(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qi(t.width,t.height,t.widthSegments,t.heightSegments)}}class zs extends Wn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rl,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bh extends zs{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new At(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Th extends Wn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ah extends Wn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Sl extends fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class wh extends Sl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const pr=new Jt,uo=new F,fo=new F;class Rh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.mapType=Qe,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ea,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;uo.setFromMatrixPosition(t.matrixWorld),e.position.copy(uo),fo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fo),e.updateMatrixWorld(),pr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pr,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(pr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class yl extends pl{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,h=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=c*this.view.offsetY,h=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ch extends Rh{constructor(){super(new yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ph extends Sl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.target=new fe,this.shadow=new Ch}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Dh extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const po=new Jt;class Lh{constructor(t,e,n=0,s=1/0){this.ray=new Bs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ya,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return po.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(po),this}intersectObject(t,e=!0,n=[]){return ha(t,this,n,e),n.sort(mo),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ha(t[s],this,n,e);return n.sort(mo),n}}function mo(i,t){return i.distance-t.distance}function ha(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)ha(r[a],t,e,!0)}}class go{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Gt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Gt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Uh extends yh{constructor(t=10,e=10,n=4473924,s=8947848){n=new Nt(n),s=new Nt(s);const r=e/2,a=t/e,o=t/2,h=[],l=[];for(let p=0,d=0,v=-o;p<=e;p++,v+=a){h.push(-o,0,v,o,0,v),h.push(v,0,-o,v,0,o);const x=p===r?n:s;x.toArray(l,d),d+=3,x.toArray(l,d),d+=3,x.toArray(l,d),d+=3,x.toArray(l,d),d+=3}const c=new ke;c.setAttribute("position",new we(h,3)),c.setAttribute("color",new we(l,3));const f=new vl({vertexColors:!0,toneMapped:!1});super(c,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Ih extends Vn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function _o(i,t,e,n){const s=Nh(n);switch(e){case nl:return i*t;case ma:return i*t/s.components*s.byteLength;case ga:return i*t/s.components*s.byteLength;case sl:return i*t*2/s.components*s.byteLength;case _a:return i*t*2/s.components*s.byteLength;case il:return i*t*3/s.components*s.byteLength;case qe:return i*t*4/s.components*s.byteLength;case va:return i*t*4/s.components*s.byteLength;case As:case ws:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Rs:case Cs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fr:case Br:return Math.max(i,16)*Math.max(t,8)/4;case Nr:case Or:return Math.max(i,8)*Math.max(t,8)/2;case zr:case Hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wr:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xr:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Yr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qr:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case jr:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Kr:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Zr:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case $r:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Jr:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qr:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ta:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ea:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case na:case ia:case sa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ra:case aa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case oa:case la:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Nh(i){switch(i){case Qe:case Jo:return{byteLength:1,components:1};case Bi:case Qo:case Yi:return{byteLength:2,components:1};case da:case pa:return{byteLength:2,components:4};case Hn:case fa:case $e:return{byteLength:4,components:1};case tl:case el:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function El(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Fh(i){const t=new WeakMap;function e(o,h){const l=o.array,c=o.usage,f=l.byteLength,p=i.createBuffer();i.bindBuffer(h,p),i.bufferData(h,l,c),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,h,l){const c=h.array,f=h.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,c);else{f.sort((d,v)=>d.start-v.start);let p=0;for(let d=1;d<f.length;d++){const v=f[p],x=f[d];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++p,f[p]=x)}f.length=p+1;for(let d=0,v=f.length;d<v;d++){const x=f[d];i.bufferSubData(l,x.start*c.BYTES_PER_ELEMENT,c,x.start,x.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=t.get(o);h&&(i.deleteBuffer(h.buffer),t.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,h),l.version=o.version}}return{get:s,remove:r,update:a}}var Oh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bh=`#ifdef USE_ALPHAHASH
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
#endif`,zh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vh=`#ifdef USE_AOMAP
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
#endif`,Wh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xh=`#ifdef USE_BATCHING
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
#endif`,Yh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zh=`#ifdef USE_IRIDESCENCE
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
#endif`,$h=`#ifdef USE_BUMPMAP
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
#endif`,Jh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,iu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,su=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ru=`#if defined( USE_COLOR_ALPHA )
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
#endif`,au=`#define PI 3.141592653589793
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
} // validated`,ou=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lu=`vec3 transformedNormal = objectNormal;
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
#endif`,cu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,du="gl_FragColor = linearToOutputTexel( gl_FragColor );",pu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mu=`#ifdef USE_ENVMAP
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
#endif`,gu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_u=`#ifdef USE_ENVMAP
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
#endif`,vu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xu=`#ifdef USE_ENVMAP
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
#endif`,Mu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Su=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bu=`#ifdef USE_GRADIENTMAP
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
}`,Tu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Au=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ru=`uniform bool receiveShadow;
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
#endif`,Cu=`#ifdef USE_ENVMAP
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
#endif`,Pu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Du=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Iu=`PhysicalMaterial material;
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
#endif`,Nu=`struct PhysicalMaterial {
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
}`,Fu=`
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
#endif`,Ou=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ku=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yu=`#if defined( USE_POINTS_UV )
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
#endif`,qu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ju=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ku=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$u=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ju=`#ifdef USE_MORPHTARGETS
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
#endif`,Qu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ef=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ff=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,df=`#ifdef PREMULTIPLIED_ALPHA
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
#endif`,_f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
}`,Ef=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bf=`#ifdef USE_SKINNING
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
#endif`,Af=`#ifdef USE_SKINNING
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
#endif`,wf=`float specularStrength;
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
}`,Hf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`#include <common>
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
}`,Kf=`uniform float scale;
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
}`,Zf=`uniform vec3 diffuse;
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
}`,$f=`#include <common>
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
}`,Jf=`uniform vec3 diffuse;
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
}`,Qf=`#define LAMBERT
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
}`,td=`#define LAMBERT
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
}`,ed=`#define MATCAP
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
}`,nd=`#define MATCAP
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
}`,id=`#define NORMAL
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
}`,sd=`#define NORMAL
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
}`,rd=`#define PHONG
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
}`,ad=`#define PHONG
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
}`,od=`#define STANDARD
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
}`,ld=`#define STANDARD
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
}`,cd=`#define TOON
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
}`,hd=`#define TOON
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
}`,ud=`uniform float size;
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
}`,fd=`uniform vec3 diffuse;
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
}`,dd=`#include <common>
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
}`,pd=`uniform vec3 color;
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
}`,md=`uniform float rotation;
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
}`,gd=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:Oh,alphahash_pars_fragment:Bh,alphamap_fragment:zh,alphamap_pars_fragment:Hh,alphatest_fragment:kh,alphatest_pars_fragment:Gh,aomap_fragment:Vh,aomap_pars_fragment:Wh,batching_pars_vertex:Xh,batching_vertex:Yh,begin_vertex:qh,beginnormal_vertex:jh,bsdfs:Kh,iridescence_fragment:Zh,bumpmap_pars_fragment:$h,clipping_planes_fragment:Jh,clipping_planes_pars_fragment:Qh,clipping_planes_pars_vertex:tu,clipping_planes_vertex:eu,color_fragment:nu,color_pars_fragment:iu,color_pars_vertex:su,color_vertex:ru,common:au,cube_uv_reflection_fragment:ou,defaultnormal_vertex:lu,displacementmap_pars_vertex:cu,displacementmap_vertex:hu,emissivemap_fragment:uu,emissivemap_pars_fragment:fu,colorspace_fragment:du,colorspace_pars_fragment:pu,envmap_fragment:mu,envmap_common_pars_fragment:gu,envmap_pars_fragment:_u,envmap_pars_vertex:vu,envmap_physical_pars_fragment:Cu,envmap_vertex:xu,fog_vertex:Mu,fog_pars_vertex:Su,fog_fragment:yu,fog_pars_fragment:Eu,gradientmap_pars_fragment:bu,lightmap_pars_fragment:Tu,lights_lambert_fragment:Au,lights_lambert_pars_fragment:wu,lights_pars_begin:Ru,lights_toon_fragment:Pu,lights_toon_pars_fragment:Du,lights_phong_fragment:Lu,lights_phong_pars_fragment:Uu,lights_physical_fragment:Iu,lights_physical_pars_fragment:Nu,lights_fragment_begin:Fu,lights_fragment_maps:Ou,lights_fragment_end:Bu,logdepthbuf_fragment:zu,logdepthbuf_pars_fragment:Hu,logdepthbuf_pars_vertex:ku,logdepthbuf_vertex:Gu,map_fragment:Vu,map_pars_fragment:Wu,map_particle_fragment:Xu,map_particle_pars_fragment:Yu,metalnessmap_fragment:qu,metalnessmap_pars_fragment:ju,morphinstance_vertex:Ku,morphcolor_vertex:Zu,morphnormal_vertex:$u,morphtarget_pars_vertex:Ju,morphtarget_vertex:Qu,normal_fragment_begin:tf,normal_fragment_maps:ef,normal_pars_fragment:nf,normal_pars_vertex:sf,normal_vertex:rf,normalmap_pars_fragment:af,clearcoat_normal_fragment_begin:of,clearcoat_normal_fragment_maps:lf,clearcoat_pars_fragment:cf,iridescence_pars_fragment:hf,opaque_fragment:uf,packing:ff,premultiplied_alpha_fragment:df,project_vertex:pf,dithering_fragment:mf,dithering_pars_fragment:gf,roughnessmap_fragment:_f,roughnessmap_pars_fragment:vf,shadowmap_pars_fragment:xf,shadowmap_pars_vertex:Mf,shadowmap_vertex:Sf,shadowmask_pars_fragment:yf,skinbase_vertex:Ef,skinning_pars_vertex:bf,skinning_vertex:Tf,skinnormal_vertex:Af,specularmap_fragment:wf,specularmap_pars_fragment:Rf,tonemapping_fragment:Cf,tonemapping_pars_fragment:Pf,transmission_fragment:Df,transmission_pars_fragment:Lf,uv_pars_fragment:Uf,uv_pars_vertex:If,uv_vertex:Nf,worldpos_vertex:Ff,background_vert:Of,background_frag:Bf,backgroundCube_vert:zf,backgroundCube_frag:Hf,cube_vert:kf,cube_frag:Gf,depth_vert:Vf,depth_frag:Wf,distanceRGBA_vert:Xf,distanceRGBA_frag:Yf,equirect_vert:qf,equirect_frag:jf,linedashed_vert:Kf,linedashed_frag:Zf,meshbasic_vert:$f,meshbasic_frag:Jf,meshlambert_vert:Qf,meshlambert_frag:td,meshmatcap_vert:ed,meshmatcap_frag:nd,meshnormal_vert:id,meshnormal_frag:sd,meshphong_vert:rd,meshphong_frag:ad,meshphysical_vert:od,meshphysical_frag:ld,meshtoon_vert:cd,meshtoon_frag:hd,points_vert:ud,points_frag:fd,shadow_vert:dd,shadow_frag:pd,sprite_vert:md,sprite_frag:gd},ot={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Ke={basic:{uniforms:Ee([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Ee([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Nt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Ee([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Ee([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Ee([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Nt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Ee([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Ee([ot.points,ot.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Ee([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Ee([ot.common,ot.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Ee([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Ee([ot.sprite,ot.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Ee([ot.common,ot.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Ee([ot.lights,ot.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};Ke.physical={uniforms:Ee([Ke.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const Ms={r:0,b:0,g:0},Un=new tn,_d=new Jt;function vd(i,t,e,n,s,r,a){const o=new Nt(0);let h=r===!0?0:1,l,c,f=null,p=0,d=null;function v(C){let T=C.isScene===!0?C.background:null;return T&&T.isTexture&&(T=(C.backgroundBlurriness>0?e:t).get(T)),T}function x(C){let T=!1;const P=v(C);P===null?u(o,h):P&&P.isColor&&(u(P,1),T=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(C,T){const P=v(T);P&&(P.isCubeTexture||P.mapping===Os)?(c===void 0&&(c=new xe(new An(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:Mi(Ke.backgroundCube.uniforms),vertexShader:Ke.backgroundCube.vertexShader,fragmentShader:Ke.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),Un.copy(T.backgroundRotation),Un.x*=-1,Un.y*=-1,Un.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),c.material.uniforms.envMap.value=P,c.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(_d.makeRotationFromEuler(Un)),c.material.toneMapped=Yt.getTransfer(P.colorSpace)!==Zt,(f!==P||p!==P.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=P,p=P.version,d=i.toneMapping),c.layers.enableAll(),C.unshift(c,c.geometry,c.material,0,0,null)):P&&P.isTexture&&(l===void 0&&(l=new xe(new qi(2,2),new Tn({name:"BackgroundMaterial",uniforms:Mi(Ke.background.uniforms),vertexShader:Ke.background.vertexShader,fragmentShader:Ke.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=P,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(P.colorSpace)!==Zt,P.matrixAutoUpdate===!0&&P.updateMatrix(),l.material.uniforms.uvTransform.value.copy(P.matrix),(f!==P||p!==P.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=P,p=P.version,d=i.toneMapping),l.layers.enableAll(),C.unshift(l,l.geometry,l.material,0,0,null))}function u(C,T){C.getRGB(Ms,dl(i)),n.buffers.color.setClear(Ms.r,Ms.g,Ms.b,T,a)}function R(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(C,T=1){o.set(C),h=T,u(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(C){h=C,u(o,h)},render:x,addToRenderList:g,dispose:R}}function xd(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(m,y,D,U,I){let k=!1;const z=f(U,D,y);r!==z&&(r=z,l(r.object)),k=d(m,U,D,I),k&&v(m,U,D,I),I!==null&&t.update(I,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,T(m,y,D,U),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function h(){return i.createVertexArray()}function l(m){return i.bindVertexArray(m)}function c(m){return i.deleteVertexArray(m)}function f(m,y,D){const U=D.wireframe===!0;let I=n[m.id];I===void 0&&(I={},n[m.id]=I);let k=I[y.id];k===void 0&&(k={},I[y.id]=k);let z=k[U];return z===void 0&&(z=p(h()),k[U]=z),z}function p(m){const y=[],D=[],U=[];for(let I=0;I<e;I++)y[I]=0,D[I]=0,U[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:D,attributeDivisors:U,object:m,attributes:{},index:null}}function d(m,y,D,U){const I=r.attributes,k=y.attributes;let z=0;const Z=D.getAttributes();for(const G in Z)if(Z[G].location>=0){const et=I[G];let ut=k[G];if(ut===void 0&&(G==="instanceMatrix"&&m.instanceMatrix&&(ut=m.instanceMatrix),G==="instanceColor"&&m.instanceColor&&(ut=m.instanceColor)),et===void 0||et.attribute!==ut||ut&&et.data!==ut.data)return!0;z++}return r.attributesNum!==z||r.index!==U}function v(m,y,D,U){const I={},k=y.attributes;let z=0;const Z=D.getAttributes();for(const G in Z)if(Z[G].location>=0){let et=k[G];et===void 0&&(G==="instanceMatrix"&&m.instanceMatrix&&(et=m.instanceMatrix),G==="instanceColor"&&m.instanceColor&&(et=m.instanceColor));const ut={};ut.attribute=et,et&&et.data&&(ut.data=et.data),I[G]=ut,z++}r.attributes=I,r.attributesNum=z,r.index=U}function x(){const m=r.newAttributes;for(let y=0,D=m.length;y<D;y++)m[y]=0}function g(m){u(m,0)}function u(m,y){const D=r.newAttributes,U=r.enabledAttributes,I=r.attributeDivisors;D[m]=1,U[m]===0&&(i.enableVertexAttribArray(m),U[m]=1),I[m]!==y&&(i.vertexAttribDivisor(m,y),I[m]=y)}function R(){const m=r.newAttributes,y=r.enabledAttributes;for(let D=0,U=y.length;D<U;D++)y[D]!==m[D]&&(i.disableVertexAttribArray(D),y[D]=0)}function C(m,y,D,U,I,k,z){z===!0?i.vertexAttribIPointer(m,y,D,I,k):i.vertexAttribPointer(m,y,D,U,I,k)}function T(m,y,D,U){x();const I=U.attributes,k=D.getAttributes(),z=y.defaultAttributeValues;for(const Z in k){const G=k[Z];if(G.location>=0){let X=I[Z];if(X===void 0&&(Z==="instanceMatrix"&&m.instanceMatrix&&(X=m.instanceMatrix),Z==="instanceColor"&&m.instanceColor&&(X=m.instanceColor)),X!==void 0){const et=X.normalized,ut=X.itemSize,bt=t.get(X);if(bt===void 0)continue;const Vt=bt.buffer,Ht=bt.type,kt=bt.bytesPerElement,q=Ht===i.INT||Ht===i.UNSIGNED_INT||X.gpuType===fa;if(X.isInterleavedBufferAttribute){const J=X.data,$=J.stride,dt=X.offset;if(J.isInstancedInterleavedBuffer){for(let lt=0;lt<G.locationSize;lt++)u(G.location+lt,J.meshPerAttribute);m.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let lt=0;lt<G.locationSize;lt++)g(G.location+lt);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let lt=0;lt<G.locationSize;lt++)C(G.location+lt,ut/G.locationSize,Ht,et,$*kt,(dt+ut/G.locationSize*lt)*kt,q)}else{if(X.isInstancedBufferAttribute){for(let J=0;J<G.locationSize;J++)u(G.location+J,X.meshPerAttribute);m.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let J=0;J<G.locationSize;J++)g(G.location+J);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let J=0;J<G.locationSize;J++)C(G.location+J,ut/G.locationSize,Ht,et,ut*kt,ut/G.locationSize*J*kt,q)}}else if(z!==void 0){const et=z[Z];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(G.location,et);break;case 3:i.vertexAttrib3fv(G.location,et);break;case 4:i.vertexAttrib4fv(G.location,et);break;default:i.vertexAttrib1fv(G.location,et)}}}}R()}function P(){A();for(const m in n){const y=n[m];for(const D in y){const U=y[D];for(const I in U)c(U[I].object),delete U[I];delete y[D]}delete n[m]}}function S(m){if(n[m.id]===void 0)return;const y=n[m.id];for(const D in y){const U=y[D];for(const I in U)c(U[I].object),delete U[I];delete y[D]}delete n[m.id]}function b(m){for(const y in n){const D=n[y];if(D[m.id]===void 0)continue;const U=D[m.id];for(const I in U)c(U[I].object),delete U[I];delete D[m.id]}}function A(){_(),a=!0,r!==s&&(r=s,l(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:_,dispose:P,releaseStatesOfGeometry:S,releaseStatesOfProgram:b,initAttributes:x,enableAttribute:g,disableUnusedAttributes:R}}function Md(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,f){f!==0&&(i.drawArraysInstanced(n,l,c,f),e.update(c,n,f))}function o(l,c,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,f);let d=0;for(let v=0;v<f;v++)d+=c[v];e.update(d,n,1)}function h(l,c,f,p){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let v=0;v<l.length;v++)a(l[v],c[v],p[v]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,c,0,p,0,f);let v=0;for(let x=0;x<f;x++)v+=c[x]*p[x];e.update(v,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=h}function Sd(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==qe&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const A=b===Yi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==Qe&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==$e&&!A)}function h(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=h(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const f=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),R=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=v>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:p,maxTextures:d,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:R,maxVaryings:C,maxFragmentUniforms:T,vertexTextures:P,maxSamples:S}}function yd(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new xn,o=new Ot,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const d=f.length!==0||p||n!==0||s;return s=p,n=f.length,d},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,p){e=c(f,p,0)},this.setState=function(f,p,d){const v=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,u=i.get(f);if(!s||v===null||v.length===0||r&&!g)r?c(null):l();else{const R=r?0:n,C=R*4;let T=u.clippingState||null;h.value=T,T=c(v,p,C,d);for(let P=0;P!==C;++P)T[P]=e[P];u.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=R}};function l(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(f,p,d,v){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=h.value,v!==!0||g===null){const u=d+x*4,R=p.matrixWorldInverse;o.getNormalMatrix(R),(g===null||g.length<u)&&(g=new Float32Array(u));for(let C=0,T=d;C!==x;++C,T+=4)a.copy(f[C]).applyMatrix4(R,o),a.normal.toArray(g,T),g[T+3]=a.constant}h.value=g,h.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function Ed(i){let t=new WeakMap;function e(a,o){return o===Dr?a.mapping=_i:o===Lr&&(a.mapping=vi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Dr||o===Lr)if(t.has(a)){const h=t.get(a).texture;return e(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const l=new hh(h.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const h=t.get(o);h!==void 0&&(t.delete(o),h.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const fi=4,vo=[.125,.215,.35,.446,.526,.582],On=20,mr=new yl,xo=new Nt;let gr=null,_r=0,vr=0,xr=!1;const Nn=(1+Math.sqrt(5))/2,hi=1/Nn,Mo=[new F(-Nn,hi,0),new F(Nn,hi,0),new F(-hi,0,Nn),new F(hi,0,Nn),new F(0,Nn,-hi),new F(0,Nn,hi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],bd=new F;class So{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=bd}=r;gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(t,n,s,h,o),e>0&&this._blur(h,0,0,e),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(gr,_r,vr),this._renderer.xr.enabled=xr,t.scissorTest=!1,Ss(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===_i||t.mapping===vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:Yi,format:qe,colorSpace:xi,depthBuffer:!1},s=yo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yo(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Td(r)),this._blurMaterial=Ad(r,t,e)}return s}_compileMaterial(t){const e=new xe(this._lodPlanes[0],t);this._renderer.compile(e,mr)}_sceneToCubeUV(t,e,n,s,r){const h=new ze(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,d=f.toneMapping;f.getClearColor(xo),f.toneMapping=yn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null));const x=new hl({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),g=new xe(new An,x);let u=!1;const R=t.background;R?R.isColor&&(x.color.copy(R),t.background=null,u=!0):(x.color.copy(xo),u=!0);for(let C=0;C<6;C++){const T=C%3;T===0?(h.up.set(0,l[C],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+c[C],r.y,r.z)):T===1?(h.up.set(0,0,l[C]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+c[C],r.z)):(h.up.set(0,l[C],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+c[C]));const P=this._cubeSize;Ss(s,T*P,C>2?P:0,P,P),f.setRenderTarget(s),u&&f.render(g,h),f.render(t,h)}g.geometry.dispose(),g.material.dispose(),f.toneMapping=d,f.autoClear=p,t.background=R}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===_i||t.mapping===vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new xe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const h=this._cubeSize;Ss(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(a,mr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Mo[(s-r-1)%Mo.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const h=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,f=new xe(this._lodPlanes[s],l),p=l.uniforms,d=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*On-1),x=r/v,g=isFinite(r)?1+Math.floor(c*x):On;g>On&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${On}`);const u=[];let R=0;for(let b=0;b<On;++b){const A=b/x,_=Math.exp(-A*A/2);u.push(_),b===0?R+=_:b<g&&(R+=2*_)}for(let b=0;b<u.length;b++)u[b]=u[b]/R;p.envMap.value=t.texture,p.samples.value=g,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:C}=this;p.dTheta.value=v,p.mipInt.value=C-n;const T=this._sizeLods[s],P=3*T*(s>C-fi?s-C+fi:0),S=4*(this._cubeSize-T);Ss(e,P,S,3*T,2*T),h.setRenderTarget(e),h.render(f,mr)}}function Td(i){const t=[],e=[],n=[];let s=i;const r=i-fi+1+vo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let h=1/o;a>i-fi?h=vo[a-i+fi-1]:a===0&&(h=0),n.push(h);const l=1/(o-2),c=-l,f=1+l,p=[c,c,f,c,f,f,c,c,f,f,c,f],d=6,v=6,x=3,g=2,u=1,R=new Float32Array(x*v*d),C=new Float32Array(g*v*d),T=new Float32Array(u*v*d);for(let S=0;S<d;S++){const b=S%3*2/3-1,A=S>2?0:-1,_=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];R.set(_,x*v*S),C.set(p,g*v*S);const m=[S,S,S,S,S,S];T.set(m,u*v*S)}const P=new ke;P.setAttribute("position",new Ue(R,x)),P.setAttribute("uv",new Ue(C,g)),P.setAttribute("faceIndex",new Ue(T,u)),t.push(P),s>fi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function yo(i,t,e){const n=new Gn(i,t,e);return n.texture.mapping=Os,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ss(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ad(i,t,e){const n=new Float32Array(On),s=new F(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:On,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ba(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Eo(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ba(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function bo(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function ba(){return`

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
	`}function wd(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const h=o.mapping,l=h===Dr||h===Lr,c=h===_i||h===vi;if(l||c){let f=t.get(o);const p=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new So(i)),f=l?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return l&&d&&d.height>0||c&&d&&s(d)?(e===null&&(e=new So(i)),f=l?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let h=0;const l=6;for(let c=0;c<l;c++)o[c]!==void 0&&h++;return h===l}function r(o){const h=o.target;h.removeEventListener("dispose",r);const l=t.get(h);l!==void 0&&(t.delete(h),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Rd(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Vi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Cd(i,t,e,n){const s={},r=new WeakMap;function a(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const v in p.attributes)t.remove(p.attributes[v]);p.removeEventListener("dispose",a),delete s[p.id];const d=r.get(p);d&&(t.remove(d),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(f,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function h(f){const p=f.attributes;for(const d in p)t.update(p[d],i.ARRAY_BUFFER)}function l(f){const p=[],d=f.index,v=f.attributes.position;let x=0;if(d!==null){const R=d.array;x=d.version;for(let C=0,T=R.length;C<T;C+=3){const P=R[C+0],S=R[C+1],b=R[C+2];p.push(P,S,S,b,b,P)}}else if(v!==void 0){const R=v.array;x=v.version;for(let C=0,T=R.length/3-1;C<T;C+=3){const P=C+0,S=C+1,b=C+2;p.push(P,S,S,b,b,P)}}else return;const g=new(ol(p)?fl:ul)(p,1);g.version=x;const u=r.get(f);u&&t.remove(u),r.set(f,g)}function c(f){const p=r.get(f);if(p){const d=f.index;d!==null&&p.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:h,getWireframeAttribute:c}}function Pd(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function h(p,d){i.drawElements(n,d,r,p*a),e.update(d,n,1)}function l(p,d,v){v!==0&&(i.drawElementsInstanced(n,d,r,p*a,v),e.update(d,n,v))}function c(p,d,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,p,0,v);let g=0;for(let u=0;u<v;u++)g+=d[u];e.update(g,n,1)}function f(p,d,v,x){if(v===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let u=0;u<p.length;u++)l(p[u]/a,d[u],x[u]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,p,0,x,0,v);let u=0;for(let R=0;R<v;R++)u+=d[R]*x[R];e.update(u,n,1)}}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=f}function Dd(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ld(i,t,e){const n=new WeakMap,s=new oe;function r(a,o,h){const l=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=c!==void 0?c.length:0;let p=n.get(o);if(p===void 0||p.count!==f){let _=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",_)};p!==void 0&&p.texture.dispose();const d=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let C=0;d===!0&&(C=1),v===!0&&(C=2),x===!0&&(C=3);let T=o.attributes.position.count*C,P=1;T>t.maxTextureSize&&(P=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const S=new Float32Array(T*P*4*f),b=new ll(S,T,P,f);b.type=$e,b.needsUpdate=!0;const A=C*4;for(let m=0;m<f;m++){const y=g[m],D=u[m],U=R[m],I=T*P*4*m;for(let k=0;k<y.count;k++){const z=k*A;d===!0&&(s.fromBufferAttribute(y,k),S[I+z+0]=s.x,S[I+z+1]=s.y,S[I+z+2]=s.z,S[I+z+3]=0),v===!0&&(s.fromBufferAttribute(D,k),S[I+z+4]=s.x,S[I+z+5]=s.y,S[I+z+6]=s.z,S[I+z+7]=0),x===!0&&(s.fromBufferAttribute(U,k),S[I+z+8]=s.x,S[I+z+9]=s.y,S[I+z+10]=s.z,S[I+z+11]=U.itemSize===4?s.w:1)}}p={count:f,texture:b,size:new At(T,P)},n.set(o,p),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];const v=o.morphTargetsRelative?1:1-d;h.getUniforms().setValue(i,"morphTargetBaseInfluence",v),h.getUniforms().setValue(i,"morphTargetInfluences",l)}h.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),h.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Ud(i,t,e,n){let s=new WeakMap;function r(h){const l=n.render.frame,c=h.geometry,f=t.get(h,c);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",o)===!1&&h.addEventListener("dispose",o),s.get(h)!==l&&(e.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,i.ARRAY_BUFFER),s.set(h,l))),h.isSkinnedMesh){const p=h.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return f}function a(){s=new WeakMap}function o(h){const l=h.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const bl=new Me,To=new xl(1,1),Tl=new ll,Al=new qc,wl=new ml,Ao=[],wo=[],Ro=new Float32Array(16),Co=new Float32Array(9),Po=new Float32Array(4);function yi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ao[s];if(r===void 0&&(r=new Float32Array(s),Ao[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function de(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Hs(i,t){let e=wo[t];e===void 0&&(e=new Int32Array(t),wo[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Id(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Nd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2fv(this.addr,t),pe(e,t)}}function Fd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(de(e,t))return;i.uniform3fv(this.addr,t),pe(e,t)}}function Od(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4fv(this.addr,t),pe(e,t)}}function Bd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),pe(e,t)}else{if(de(e,n))return;Po.set(n),i.uniformMatrix2fv(this.addr,!1,Po),pe(e,n)}}function zd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),pe(e,t)}else{if(de(e,n))return;Co.set(n),i.uniformMatrix3fv(this.addr,!1,Co),pe(e,n)}}function Hd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),pe(e,t)}else{if(de(e,n))return;Ro.set(n),i.uniformMatrix4fv(this.addr,!1,Ro),pe(e,n)}}function kd(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2iv(this.addr,t),pe(e,t)}}function Vd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;i.uniform3iv(this.addr,t),pe(e,t)}}function Wd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4iv(this.addr,t),pe(e,t)}}function Xd(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Yd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2uiv(this.addr,t),pe(e,t)}}function qd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;i.uniform3uiv(this.addr,t),pe(e,t)}}function jd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4uiv(this.addr,t),pe(e,t)}}function Kd(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(To.compareFunction=al,r=To):r=bl,e.setTexture2D(t||r,s)}function Zd(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Al,s)}function $d(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||wl,s)}function Jd(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Tl,s)}function Qd(i){switch(i){case 5126:return Id;case 35664:return Nd;case 35665:return Fd;case 35666:return Od;case 35674:return Bd;case 35675:return zd;case 35676:return Hd;case 5124:case 35670:return kd;case 35667:case 35671:return Gd;case 35668:case 35672:return Vd;case 35669:case 35673:return Wd;case 5125:return Xd;case 36294:return Yd;case 36295:return qd;case 36296:return jd;case 35678:case 36198:case 36298:case 36306:case 35682:return Kd;case 35679:case 36299:case 36307:return Zd;case 35680:case 36300:case 36308:case 36293:return $d;case 36289:case 36303:case 36311:case 36292:return Jd}}function tp(i,t){i.uniform1fv(this.addr,t)}function ep(i,t){const e=yi(t,this.size,2);i.uniform2fv(this.addr,e)}function np(i,t){const e=yi(t,this.size,3);i.uniform3fv(this.addr,e)}function ip(i,t){const e=yi(t,this.size,4);i.uniform4fv(this.addr,e)}function sp(i,t){const e=yi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function rp(i,t){const e=yi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ap(i,t){const e=yi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function op(i,t){i.uniform1iv(this.addr,t)}function lp(i,t){i.uniform2iv(this.addr,t)}function cp(i,t){i.uniform3iv(this.addr,t)}function hp(i,t){i.uniform4iv(this.addr,t)}function up(i,t){i.uniform1uiv(this.addr,t)}function fp(i,t){i.uniform2uiv(this.addr,t)}function dp(i,t){i.uniform3uiv(this.addr,t)}function pp(i,t){i.uniform4uiv(this.addr,t)}function mp(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||bl,r[a])}function gp(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Al,r[a])}function _p(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||wl,r[a])}function vp(i,t,e){const n=this.cache,s=t.length,r=Hs(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Tl,r[a])}function xp(i){switch(i){case 5126:return tp;case 35664:return ep;case 35665:return np;case 35666:return ip;case 35674:return sp;case 35675:return rp;case 35676:return ap;case 5124:case 35670:return op;case 35667:case 35671:return lp;case 35668:case 35672:return cp;case 35669:case 35673:return hp;case 5125:return up;case 36294:return fp;case 36295:return dp;case 36296:return pp;case 35678:case 36198:case 36298:case 36306:case 35682:return mp;case 35679:case 36299:case 36307:return gp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return vp}}class Mp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Qd(e.type)}}class Sp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xp(e.type)}}class yp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Mr=/(\w+)(\])?(\[|\.)?/g;function Do(i,t){i.seq.push(t),i.map[t.id]=t}function Ep(i,t,e){const n=i.name,s=n.length;for(Mr.lastIndex=0;;){const r=Mr.exec(n),a=Mr.lastIndex;let o=r[1];const h=r[2]==="]",l=r[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===s){Do(e,l===void 0?new Mp(o,i,t):new Sp(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new yp(o),Do(e,f)),e=f}}}class Ps{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Ep(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],h=n[o.id];h.needsUpdate!==!1&&o.setValue(t,h.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Lo(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const bp=37297;let Tp=0;function Ap(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Uo=new Ot;function wp(i){Yt._getMatrix(Uo,Yt.workingColorSpace,i);const t=`mat3( ${Uo.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case Ds:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Io(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Ap(i.getShaderSource(t),o)}else return r}function Rp(i,t){const e=wp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Cp(i,t){let e;switch(t){case ac:e="Linear";break;case oc:e="Reinhard";break;case lc:e="Cineon";break;case Zo:e="ACESFilmic";break;case hc:e="AgX";break;case uc:e="Neutral";break;case cc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ys=new F;function Pp(){Yt.getLuminanceCoefficients(ys);const i=ys.x.toFixed(4),t=ys.y.toFixed(4),e=ys.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ni).join(`
`)}function Lp(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Up(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ni(i){return i!==""}function No(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fo(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ip=/^[ \t]*#include +<([\w\d./]+)>/gm;function ua(i){return i.replace(Ip,Fp)}const Np=new Map;function Fp(i,t){let e=zt[t];if(e===void 0){const n=Np.get(t);if(n!==void 0)e=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ua(e)}const Op=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oo(i){return i.replace(Op,Bp)}function Bp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bo(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function zp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===qo?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===jo?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(t="SHADOWMAP_TYPE_VSM"),t}function Hp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case _i:case vi:t="ENVMAP_TYPE_CUBE";break;case Os:t="ENVMAP_TYPE_CUBE_UV";break}return t}function kp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vi:t="ENVMAP_MODE_REFRACTION";break}return t}function Gp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ko:t="ENVMAP_BLENDING_MULTIPLY";break;case sc:t="ENVMAP_BLENDING_MIX";break;case rc:t="ENVMAP_BLENDING_ADD";break}return t}function Vp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Wp(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const h=zp(e),l=Hp(e),c=kp(e),f=Gp(e),p=Vp(e),d=Dp(e),v=Lp(r),x=s.createProgram();let g,u,R=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ni).join(`
`),g.length>0&&(g+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ni).join(`
`),u.length>0&&(u+=`
`)):(g=[Bo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ni).join(`
`),u=[Bo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+c:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==yn?"#define TONE_MAPPING":"",e.toneMapping!==yn?zt.tonemapping_pars_fragment:"",e.toneMapping!==yn?Cp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Rp("linearToOutputTexel",e.outputColorSpace),Pp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ni).join(`
`)),a=ua(a),a=No(a,e),a=Fo(a,e),o=ua(o),o=No(o,e),o=Fo(o,e),a=Oo(a),o=Oo(o),e.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,u=["#define varying in",e.glslVersion===Oa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Oa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const C=R+g+a,T=R+u+o,P=Lo(s,s.VERTEX_SHADER,C),S=Lo(s,s.FRAGMENT_SHADER,T);s.attachShader(x,P),s.attachShader(x,S),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function b(y){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(x)||"",U=s.getShaderInfoLog(P)||"",I=s.getShaderInfoLog(S)||"",k=D.trim(),z=U.trim(),Z=I.trim();let G=!0,X=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,P,S);else{const et=Io(s,P,"vertex"),ut=Io(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+k+`
`+et+`
`+ut)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(z===""||Z==="")&&(X=!1);X&&(y.diagnostics={runnable:G,programLog:k,vertexShader:{log:z,prefix:g},fragmentShader:{log:Z,prefix:u}})}s.deleteShader(P),s.deleteShader(S),A=new Ps(s,x),_=Up(s,x)}let A;this.getUniforms=function(){return A===void 0&&b(this),A};let _;this.getAttributes=function(){return _===void 0&&b(this),_};let m=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return m===!1&&(m=s.getProgramParameter(x,bp)),m},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Tp++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=S,this}let Xp=0;class Yp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new qp(t),e.set(t,n)),n}}class qp{constructor(t){this.id=Xp++,this.code=t,this.usedTimes=0}}function jp(i,t,e,n,s,r,a){const o=new ya,h=new Yp,l=new Set,c=[],f=s.logarithmicDepthBuffer,p=s.vertexTextures;let d=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,m,y,D,U){const I=D.fog,k=U.geometry,z=_.isMeshStandardMaterial?D.environment:null,Z=(_.isMeshStandardMaterial?e:t).get(_.envMap||z),G=Z&&Z.mapping===Os?Z.image.height:null,X=v[_.type];_.precision!==null&&(d=s.getMaxPrecision(_.precision),d!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const et=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ut=et!==void 0?et.length:0;let bt=0;k.morphAttributes.position!==void 0&&(bt=1),k.morphAttributes.normal!==void 0&&(bt=2),k.morphAttributes.color!==void 0&&(bt=3);let Vt,Ht,kt,q;if(X){const qt=Ke[X];Vt=qt.vertexShader,Ht=qt.fragmentShader}else Vt=_.vertexShader,Ht=_.fragmentShader,h.update(_),kt=h.getVertexShaderID(_),q=h.getFragmentShaderID(_);const J=i.getRenderTarget(),$=i.state.buffers.depth.getReversed(),dt=U.isInstancedMesh===!0,lt=U.isBatchedMesh===!0,Rt=!!_.map,ce=!!_.matcap,L=!!Z,ne=!!_.aoMap,It=!!_.lightMap,Dt=!!_.bumpMap,vt=!!_.normalMap,ie=!!_.displacementMap,xt=!!_.emissiveMap,Bt=!!_.metalnessMap,me=!!_.roughnessMap,le=_.anisotropy>0,w=_.clearcoat>0,M=_.dispersion>0,H=_.iridescence>0,j=_.sheen>0,Q=_.transmission>0,Y=le&&!!_.anisotropyMap,Et=w&&!!_.clearcoatMap,rt=w&&!!_.clearcoatNormalMap,Mt=w&&!!_.clearcoatRoughnessMap,St=H&&!!_.iridescenceMap,it=H&&!!_.iridescenceThicknessMap,ft=j&&!!_.sheenColorMap,Pt=j&&!!_.sheenRoughnessMap,yt=!!_.specularMap,ct=!!_.specularColorMap,Ft=!!_.specularIntensityMap,N=Q&&!!_.transmissionMap,st=Q&&!!_.thicknessMap,at=!!_.gradientMap,mt=!!_.alphaMap,tt=_.alphaTest>0,K=!!_.alphaHash,_t=!!_.extensions;let Ut=yn;_.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ut=i.toneMapping);const te={shaderID:X,shaderType:_.type,shaderName:_.name,vertexShader:Vt,fragmentShader:Ht,defines:_.defines,customVertexShaderID:kt,customFragmentShaderID:q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:lt,batchingColor:lt&&U._colorsTexture!==null,instancing:dt,instancingColor:dt&&U.instanceColor!==null,instancingMorph:dt&&U.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:xi,alphaToCoverage:!!_.alphaToCoverage,map:Rt,matcap:ce,envMap:L,envMapMode:L&&Z.mapping,envMapCubeUVHeight:G,aoMap:ne,lightMap:It,bumpMap:Dt,normalMap:vt,displacementMap:p&&ie,emissiveMap:xt,normalMapObjectSpace:vt&&_.normalMapType===mc,normalMapTangentSpace:vt&&_.normalMapType===rl,metalnessMap:Bt,roughnessMap:me,anisotropy:le,anisotropyMap:Y,clearcoat:w,clearcoatMap:Et,clearcoatNormalMap:rt,clearcoatRoughnessMap:Mt,dispersion:M,iridescence:H,iridescenceMap:St,iridescenceThicknessMap:it,sheen:j,sheenColorMap:ft,sheenRoughnessMap:Pt,specularMap:yt,specularColorMap:ct,specularIntensityMap:Ft,transmission:Q,transmissionMap:N,thicknessMap:st,gradientMap:at,opaque:_.transparent===!1&&_.blending===pi&&_.alphaToCoverage===!1,alphaMap:mt,alphaTest:tt,alphaHash:K,combine:_.combine,mapUv:Rt&&x(_.map.channel),aoMapUv:ne&&x(_.aoMap.channel),lightMapUv:It&&x(_.lightMap.channel),bumpMapUv:Dt&&x(_.bumpMap.channel),normalMapUv:vt&&x(_.normalMap.channel),displacementMapUv:ie&&x(_.displacementMap.channel),emissiveMapUv:xt&&x(_.emissiveMap.channel),metalnessMapUv:Bt&&x(_.metalnessMap.channel),roughnessMapUv:me&&x(_.roughnessMap.channel),anisotropyMapUv:Y&&x(_.anisotropyMap.channel),clearcoatMapUv:Et&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:rt&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:it&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&x(_.sheenRoughnessMap.channel),specularMapUv:yt&&x(_.specularMap.channel),specularColorMapUv:ct&&x(_.specularColorMap.channel),specularIntensityMapUv:Ft&&x(_.specularIntensityMap.channel),transmissionMapUv:N&&x(_.transmissionMap.channel),thicknessMapUv:st&&x(_.thicknessMap.channel),alphaMapUv:mt&&x(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(vt||le),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Rt||mt),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.flatShading===!0&&_.wireframe===!1,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:$,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:bt,numDirLights:m.directional.length,numPointLights:m.point.length,numSpotLights:m.spot.length,numSpotLightMaps:m.spotLightMap.length,numRectAreaLights:m.rectArea.length,numHemiLights:m.hemi.length,numDirLightShadows:m.directionalShadowMap.length,numPointLightShadows:m.pointShadowMap.length,numSpotLightShadows:m.spotShadowMap.length,numSpotLightShadowsWithMaps:m.numSpotLightShadowsWithMaps,numLightProbes:m.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&y.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Rt&&_.map.isVideoTexture===!0&&Yt.getTransfer(_.map.colorSpace)===Zt,decodeVideoTextureEmissive:xt&&_.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(_.emissiveMap.colorSpace)===Zt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===cn,flipSided:_.side===Ae,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:_t&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&_.extensions.multiDraw===!0||lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return te.vertexUv1s=l.has(1),te.vertexUv2s=l.has(2),te.vertexUv3s=l.has(3),l.clear(),te}function u(_){const m=[];if(_.shaderID?m.push(_.shaderID):(m.push(_.customVertexShaderID),m.push(_.customFragmentShaderID)),_.defines!==void 0)for(const y in _.defines)m.push(y),m.push(_.defines[y]);return _.isRawShaderMaterial===!1&&(R(m,_),C(m,_),m.push(i.outputColorSpace)),m.push(_.customProgramCacheKey),m.join()}function R(_,m){_.push(m.precision),_.push(m.outputColorSpace),_.push(m.envMapMode),_.push(m.envMapCubeUVHeight),_.push(m.mapUv),_.push(m.alphaMapUv),_.push(m.lightMapUv),_.push(m.aoMapUv),_.push(m.bumpMapUv),_.push(m.normalMapUv),_.push(m.displacementMapUv),_.push(m.emissiveMapUv),_.push(m.metalnessMapUv),_.push(m.roughnessMapUv),_.push(m.anisotropyMapUv),_.push(m.clearcoatMapUv),_.push(m.clearcoatNormalMapUv),_.push(m.clearcoatRoughnessMapUv),_.push(m.iridescenceMapUv),_.push(m.iridescenceThicknessMapUv),_.push(m.sheenColorMapUv),_.push(m.sheenRoughnessMapUv),_.push(m.specularMapUv),_.push(m.specularColorMapUv),_.push(m.specularIntensityMapUv),_.push(m.transmissionMapUv),_.push(m.thicknessMapUv),_.push(m.combine),_.push(m.fogExp2),_.push(m.sizeAttenuation),_.push(m.morphTargetsCount),_.push(m.morphAttributeCount),_.push(m.numDirLights),_.push(m.numPointLights),_.push(m.numSpotLights),_.push(m.numSpotLightMaps),_.push(m.numHemiLights),_.push(m.numRectAreaLights),_.push(m.numDirLightShadows),_.push(m.numPointLightShadows),_.push(m.numSpotLightShadows),_.push(m.numSpotLightShadowsWithMaps),_.push(m.numLightProbes),_.push(m.shadowMapType),_.push(m.toneMapping),_.push(m.numClippingPlanes),_.push(m.numClipIntersection),_.push(m.depthPacking)}function C(_,m){o.disableAll(),m.supportsVertexTextures&&o.enable(0),m.instancing&&o.enable(1),m.instancingColor&&o.enable(2),m.instancingMorph&&o.enable(3),m.matcap&&o.enable(4),m.envMap&&o.enable(5),m.normalMapObjectSpace&&o.enable(6),m.normalMapTangentSpace&&o.enable(7),m.clearcoat&&o.enable(8),m.iridescence&&o.enable(9),m.alphaTest&&o.enable(10),m.vertexColors&&o.enable(11),m.vertexAlphas&&o.enable(12),m.vertexUv1s&&o.enable(13),m.vertexUv2s&&o.enable(14),m.vertexUv3s&&o.enable(15),m.vertexTangents&&o.enable(16),m.anisotropy&&o.enable(17),m.alphaHash&&o.enable(18),m.batching&&o.enable(19),m.dispersion&&o.enable(20),m.batchingColor&&o.enable(21),m.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),m.fog&&o.enable(0),m.useFog&&o.enable(1),m.flatShading&&o.enable(2),m.logarithmicDepthBuffer&&o.enable(3),m.reversedDepthBuffer&&o.enable(4),m.skinning&&o.enable(5),m.morphTargets&&o.enable(6),m.morphNormals&&o.enable(7),m.morphColors&&o.enable(8),m.premultipliedAlpha&&o.enable(9),m.shadowMapEnabled&&o.enable(10),m.doubleSided&&o.enable(11),m.flipSided&&o.enable(12),m.useDepthPacking&&o.enable(13),m.dithering&&o.enable(14),m.transmission&&o.enable(15),m.sheen&&o.enable(16),m.opaque&&o.enable(17),m.pointsUvs&&o.enable(18),m.decodeVideoTexture&&o.enable(19),m.decodeVideoTextureEmissive&&o.enable(20),m.alphaToCoverage&&o.enable(21),_.push(o.mask)}function T(_){const m=v[_.type];let y;if(m){const D=Ke[m];y=ah.clone(D.uniforms)}else y=_.uniforms;return y}function P(_,m){let y;for(let D=0,U=c.length;D<U;D++){const I=c[D];if(I.cacheKey===m){y=I,++y.usedTimes;break}}return y===void 0&&(y=new Wp(i,m,_,r),c.push(y)),y}function S(_){if(--_.usedTimes===0){const m=c.indexOf(_);c[m]=c[c.length-1],c.pop(),_.destroy()}}function b(_){h.remove(_)}function A(){h.dispose()}return{getParameters:g,getProgramCacheKey:u,getUniforms:T,acquireProgram:P,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:A}}function Kp(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,h){i.get(a)[o]=h}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Zp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function zo(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ho(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f,p,d,v,x,g){let u=i[t];return u===void 0?(u={id:f.id,object:f,geometry:p,material:d,groupOrder:v,renderOrder:f.renderOrder,z:x,group:g},i[t]=u):(u.id=f.id,u.object=f,u.geometry=p,u.material=d,u.groupOrder=v,u.renderOrder=f.renderOrder,u.z=x,u.group=g),t++,u}function o(f,p,d,v,x,g){const u=a(f,p,d,v,x,g);d.transmission>0?n.push(u):d.transparent===!0?s.push(u):e.push(u)}function h(f,p,d,v,x,g){const u=a(f,p,d,v,x,g);d.transmission>0?n.unshift(u):d.transparent===!0?s.unshift(u):e.unshift(u)}function l(f,p){e.length>1&&e.sort(f||Zp),n.length>1&&n.sort(p||zo),s.length>1&&s.sort(p||zo)}function c(){for(let f=t,p=i.length;f<p;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:h,finish:c,sort:l}}function $p(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ho,i.set(n,[a])):s>=r.length?(a=new Ho,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Jp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Nt};break;case"SpotLight":e={position:new F,direction:new F,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function Qp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let tm=0;function em(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function nm(i){const t=new Jp,e=Qp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new Jt,a=new Jt;function o(l){let c=0,f=0,p=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let d=0,v=0,x=0,g=0,u=0,R=0,C=0,T=0,P=0,S=0,b=0;l.sort(em);for(let _=0,m=l.length;_<m;_++){const y=l[_],D=y.color,U=y.intensity,I=y.distance,k=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)c+=D.r*U,f+=D.g*U,p+=D.b*U;else if(y.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(y.sh.coefficients[z],U);b++}else if(y.isDirectionalLight){const z=t.get(y);if(z.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const Z=y.shadow,G=e.get(y);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=k,n.directionalShadowMatrix[d]=y.shadow.matrix,R++}n.directional[d]=z,d++}else if(y.isSpotLight){const z=t.get(y);z.position.setFromMatrixPosition(y.matrixWorld),z.color.copy(D).multiplyScalar(U),z.distance=I,z.coneCos=Math.cos(y.angle),z.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),z.decay=y.decay,n.spot[x]=z;const Z=y.shadow;if(y.map&&(n.spotLightMap[P]=y.map,P++,Z.updateMatrices(y),y.castShadow&&S++),n.spotLightMatrix[x]=Z.matrix,y.castShadow){const G=e.get(y);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=k,T++}x++}else if(y.isRectAreaLight){const z=t.get(y);z.color.copy(D).multiplyScalar(U),z.halfWidth.set(y.width*.5,0,0),z.halfHeight.set(0,y.height*.5,0),n.rectArea[g]=z,g++}else if(y.isPointLight){const z=t.get(y);if(z.color.copy(y.color).multiplyScalar(y.intensity),z.distance=y.distance,z.decay=y.decay,y.castShadow){const Z=y.shadow,G=e.get(y);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[v]=G,n.pointShadowMap[v]=k,n.pointShadowMatrix[v]=y.shadow.matrix,C++}n.point[v]=z,v++}else if(y.isHemisphereLight){const z=t.get(y);z.skyColor.copy(y.color).multiplyScalar(U),z.groundColor.copy(y.groundColor).multiplyScalar(U),n.hemi[u]=z,u++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=f,n.ambient[2]=p;const A=n.hash;(A.directionalLength!==d||A.pointLength!==v||A.spotLength!==x||A.rectAreaLength!==g||A.hemiLength!==u||A.numDirectionalShadows!==R||A.numPointShadows!==C||A.numSpotShadows!==T||A.numSpotMaps!==P||A.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=g,n.point.length=v,n.hemi.length=u,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=R,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=T+P-S,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=b,A.directionalLength=d,A.pointLength=v,A.spotLength=x,A.rectAreaLength=g,A.hemiLength=u,A.numDirectionalShadows=R,A.numPointShadows=C,A.numSpotShadows=T,A.numSpotMaps=P,A.numLightProbes=b,n.version=tm++)}function h(l,c){let f=0,p=0,d=0,v=0,x=0;const g=c.matrixWorldInverse;for(let u=0,R=l.length;u<R;u++){const C=l[u];if(C.isDirectionalLight){const T=n.directional[f];T.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),f++}else if(C.isSpotLight){const T=n.spot[d];T.position.setFromMatrixPosition(C.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),d++}else if(C.isRectAreaLight){const T=n.rectArea[v];T.position.setFromMatrixPosition(C.matrixWorld),T.position.applyMatrix4(g),a.identity(),r.copy(C.matrixWorld),r.premultiply(g),a.extractRotation(r),T.halfWidth.set(C.width*.5,0,0),T.halfHeight.set(0,C.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),v++}else if(C.isPointLight){const T=n.point[p];T.position.setFromMatrixPosition(C.matrixWorld),T.position.applyMatrix4(g),p++}else if(C.isHemisphereLight){const T=n.hemi[x];T.direction.setFromMatrixPosition(C.matrixWorld),T.direction.transformDirection(g),x++}}}return{setup:o,setupView:h,state:n}}function ko(i){const t=new nm(i),e=[],n=[];function s(c){l.camera=c,e.length=0,n.length=0}function r(c){e.push(c)}function a(c){n.push(c)}function o(){t.setup(e)}function h(c){t.setupView(e,c)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:h,pushLight:r,pushShadow:a}}function im(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new ko(i),t.set(s,[o])):r>=a.length?(o=new ko(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rm=`uniform sampler2D shadow_pass;
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
}`;function am(i,t,e){let n=new Ea;const s=new At,r=new At,a=new oe,o=new Th({depthPacking:pc}),h=new Ah,l={},c=e.maxTextureSize,f={[bn]:Ae,[Ae]:bn,[cn]:cn},p=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:sm,fragmentShader:rm}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const v=new ke;v.setAttribute("position",new Ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new xe(v,p),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qo;let u=this.type;this.render=function(S,b,A){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const _=i.getRenderTarget(),m=i.getActiveCubeFace(),y=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Sn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=u!==ln&&this.type===ln,I=u===ln&&this.type!==ln;for(let k=0,z=S.length;k<z;k++){const Z=S[k],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const X=G.getFrameExtents();if(s.multiply(X),r.copy(G.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/X.x),s.x=r.x*X.x,G.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/X.y),s.y=r.y*X.y,G.mapSize.y=r.y)),G.map===null||U===!0||I===!0){const ut=this.type!==ln?{minFilter:Le,magFilter:Le}:{};G.map!==null&&G.map.dispose(),G.map=new Gn(s.x,s.y,ut),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const et=G.getViewportCount();for(let ut=0;ut<et;ut++){const bt=G.getViewport(ut);a.set(r.x*bt.x,r.y*bt.y,r.x*bt.z,r.y*bt.w),D.viewport(a),G.updateMatrices(Z,ut),n=G.getFrustum(),T(b,A,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===ln&&R(G,A),G.needsUpdate=!1}u=this.type,g.needsUpdate=!1,i.setRenderTarget(_,m,y)};function R(S,b){const A=t.update(x);p.defines.VSM_SAMPLES!==S.blurSamples&&(p.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Gn(s.x,s.y)),p.uniforms.shadow_pass.value=S.map.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(b,null,A,p,x,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(b,null,A,d,x,null)}function C(S,b,A,_){let m=null;const y=A.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(y!==void 0)m=y;else if(m=A.isPointLight===!0?h:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const D=m.uuid,U=b.uuid;let I=l[D];I===void 0&&(I={},l[D]=I);let k=I[U];k===void 0&&(k=m.clone(),I[U]=k,b.addEventListener("dispose",P)),m=k}if(m.visible=b.visible,m.wireframe=b.wireframe,_===ln?m.side=b.shadowSide!==null?b.shadowSide:b.side:m.side=b.shadowSide!==null?b.shadowSide:f[b.side],m.alphaMap=b.alphaMap,m.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,m.map=b.map,m.clipShadows=b.clipShadows,m.clippingPlanes=b.clippingPlanes,m.clipIntersection=b.clipIntersection,m.displacementMap=b.displacementMap,m.displacementScale=b.displacementScale,m.displacementBias=b.displacementBias,m.wireframeLinewidth=b.wireframeLinewidth,m.linewidth=b.linewidth,A.isPointLight===!0&&m.isMeshDistanceMaterial===!0){const D=i.properties.get(m);D.light=A}return m}function T(S,b,A,_,m){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&m===ln)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,S.matrixWorld);const U=t.update(S),I=S.material;if(Array.isArray(I)){const k=U.groups;for(let z=0,Z=k.length;z<Z;z++){const G=k[z],X=I[G.materialIndex];if(X&&X.visible){const et=C(S,X,_,m);S.onBeforeShadow(i,S,b,A,U,et,G),i.renderBufferDirect(A,null,U,et,S,G),S.onAfterShadow(i,S,b,A,U,et,G)}}}else if(I.visible){const k=C(S,I,_,m);S.onBeforeShadow(i,S,b,A,U,k,null),i.renderBufferDirect(A,null,U,k,S,null),S.onAfterShadow(i,S,b,A,U,k,null)}}const D=S.children;for(let U=0,I=D.length;U<I;U++)T(D[U],b,A,_,m)}function P(S){S.target.removeEventListener("dispose",P);for(const A in l){const _=l[A],m=S.target.uuid;m in _&&(_[m].dispose(),delete _[m])}}}const om={[br]:Tr,[Ar]:Cr,[wr]:Pr,[gi]:Rr,[Tr]:br,[Cr]:Ar,[Pr]:wr,[Rr]:gi};function lm(i,t){function e(){let N=!1;const st=new oe;let at=null;const mt=new oe(0,0,0,0);return{setMask:function(tt){at!==tt&&!N&&(i.colorMask(tt,tt,tt,tt),at=tt)},setLocked:function(tt){N=tt},setClear:function(tt,K,_t,Ut,te){te===!0&&(tt*=Ut,K*=Ut,_t*=Ut),st.set(tt,K,_t,Ut),mt.equals(st)===!1&&(i.clearColor(tt,K,_t,Ut),mt.copy(st))},reset:function(){N=!1,at=null,mt.set(-1,0,0,0)}}}function n(){let N=!1,st=!1,at=null,mt=null,tt=null;return{setReversed:function(K){if(st!==K){const _t=t.get("EXT_clip_control");K?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),st=K;const Ut=tt;tt=null,this.setClear(Ut)}},getReversed:function(){return st},setTest:function(K){K?J(i.DEPTH_TEST):$(i.DEPTH_TEST)},setMask:function(K){at!==K&&!N&&(i.depthMask(K),at=K)},setFunc:function(K){if(st&&(K=om[K]),mt!==K){switch(K){case br:i.depthFunc(i.NEVER);break;case Tr:i.depthFunc(i.ALWAYS);break;case Ar:i.depthFunc(i.LESS);break;case gi:i.depthFunc(i.LEQUAL);break;case wr:i.depthFunc(i.EQUAL);break;case Rr:i.depthFunc(i.GEQUAL);break;case Cr:i.depthFunc(i.GREATER);break;case Pr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=K}},setLocked:function(K){N=K},setClear:function(K){tt!==K&&(st&&(K=1-K),i.clearDepth(K),tt=K)},reset:function(){N=!1,at=null,mt=null,tt=null,st=!1}}}function s(){let N=!1,st=null,at=null,mt=null,tt=null,K=null,_t=null,Ut=null,te=null;return{setTest:function(qt){N||(qt?J(i.STENCIL_TEST):$(i.STENCIL_TEST))},setMask:function(qt){st!==qt&&!N&&(i.stencilMask(qt),st=qt)},setFunc:function(qt,en,je){(at!==qt||mt!==en||tt!==je)&&(i.stencilFunc(qt,en,je),at=qt,mt=en,tt=je)},setOp:function(qt,en,je){(K!==qt||_t!==en||Ut!==je)&&(i.stencilOp(qt,en,je),K=qt,_t=en,Ut=je)},setLocked:function(qt){N=qt},setClear:function(qt){te!==qt&&(i.clearStencil(qt),te=qt)},reset:function(){N=!1,st=null,at=null,mt=null,tt=null,K=null,_t=null,Ut=null,te=null}}}const r=new e,a=new n,o=new s,h=new WeakMap,l=new WeakMap;let c={},f={},p=new WeakMap,d=[],v=null,x=!1,g=null,u=null,R=null,C=null,T=null,P=null,S=null,b=new Nt(0,0,0),A=0,_=!1,m=null,y=null,D=null,U=null,I=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Z=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=Z>=2);let X=null,et={};const ut=i.getParameter(i.SCISSOR_BOX),bt=i.getParameter(i.VIEWPORT),Vt=new oe().fromArray(ut),Ht=new oe().fromArray(bt);function kt(N,st,at,mt){const tt=new Uint8Array(4),K=i.createTexture();i.bindTexture(N,K),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _t=0;_t<at;_t++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,tt):i.texImage2D(st+_t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,tt);return K}const q={};q[i.TEXTURE_2D]=kt(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=kt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=kt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=kt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(gi),Dt(!1),vt(La),J(i.CULL_FACE),ne(Sn);function J(N){c[N]!==!0&&(i.enable(N),c[N]=!0)}function $(N){c[N]!==!1&&(i.disable(N),c[N]=!1)}function dt(N,st){return f[N]!==st?(i.bindFramebuffer(N,st),f[N]=st,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=st),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=st),!0):!1}function lt(N,st){let at=d,mt=!1;if(N){at=p.get(st),at===void 0&&(at=[],p.set(st,at));const tt=N.textures;if(at.length!==tt.length||at[0]!==i.COLOR_ATTACHMENT0){for(let K=0,_t=tt.length;K<_t;K++)at[K]=i.COLOR_ATTACHMENT0+K;at.length=tt.length,mt=!0}}else at[0]!==i.BACK&&(at[0]=i.BACK,mt=!0);mt&&i.drawBuffers(at)}function Rt(N){return v!==N?(i.useProgram(N),v=N,!0):!1}const ce={[Fn]:i.FUNC_ADD,[kl]:i.FUNC_SUBTRACT,[Gl]:i.FUNC_REVERSE_SUBTRACT};ce[Vl]=i.MIN,ce[Wl]=i.MAX;const L={[Xl]:i.ZERO,[Yl]:i.ONE,[ql]:i.SRC_COLOR,[yr]:i.SRC_ALPHA,[Ql]:i.SRC_ALPHA_SATURATE,[$l]:i.DST_COLOR,[Kl]:i.DST_ALPHA,[jl]:i.ONE_MINUS_SRC_COLOR,[Er]:i.ONE_MINUS_SRC_ALPHA,[Jl]:i.ONE_MINUS_DST_COLOR,[Zl]:i.ONE_MINUS_DST_ALPHA,[tc]:i.CONSTANT_COLOR,[ec]:i.ONE_MINUS_CONSTANT_COLOR,[nc]:i.CONSTANT_ALPHA,[ic]:i.ONE_MINUS_CONSTANT_ALPHA};function ne(N,st,at,mt,tt,K,_t,Ut,te,qt){if(N===Sn){x===!0&&($(i.BLEND),x=!1);return}if(x===!1&&(J(i.BLEND),x=!0),N!==Hl){if(N!==g||qt!==_){if((u!==Fn||T!==Fn)&&(i.blendEquation(i.FUNC_ADD),u=Fn,T=Fn),qt)switch(N){case pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ua:i.blendFunc(i.ONE,i.ONE);break;case Ia:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Na:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ua:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ia:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Na:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}R=null,C=null,P=null,S=null,b.set(0,0,0),A=0,g=N,_=qt}return}tt=tt||st,K=K||at,_t=_t||mt,(st!==u||tt!==T)&&(i.blendEquationSeparate(ce[st],ce[tt]),u=st,T=tt),(at!==R||mt!==C||K!==P||_t!==S)&&(i.blendFuncSeparate(L[at],L[mt],L[K],L[_t]),R=at,C=mt,P=K,S=_t),(Ut.equals(b)===!1||te!==A)&&(i.blendColor(Ut.r,Ut.g,Ut.b,te),b.copy(Ut),A=te),g=N,_=!1}function It(N,st){N.side===cn?$(i.CULL_FACE):J(i.CULL_FACE);let at=N.side===Ae;st&&(at=!at),Dt(at),N.blending===pi&&N.transparent===!1?ne(Sn):ne(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const mt=N.stencilWrite;o.setTest(mt),mt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),xt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):$(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(N){m!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),m=N)}function vt(N){N!==Bl?(J(i.CULL_FACE),N!==y&&(N===La?i.cullFace(i.BACK):N===zl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):$(i.CULL_FACE),y=N}function ie(N){N!==D&&(z&&i.lineWidth(N),D=N)}function xt(N,st,at){N?(J(i.POLYGON_OFFSET_FILL),(U!==st||I!==at)&&(i.polygonOffset(st,at),U=st,I=at)):$(i.POLYGON_OFFSET_FILL)}function Bt(N){N?J(i.SCISSOR_TEST):$(i.SCISSOR_TEST)}function me(N){N===void 0&&(N=i.TEXTURE0+k-1),X!==N&&(i.activeTexture(N),X=N)}function le(N,st,at){at===void 0&&(X===null?at=i.TEXTURE0+k-1:at=X);let mt=et[at];mt===void 0&&(mt={type:void 0,texture:void 0},et[at]=mt),(mt.type!==N||mt.texture!==st)&&(X!==at&&(i.activeTexture(at),X=at),i.bindTexture(N,st||q[N]),mt.type=N,mt.texture=st)}function w(){const N=et[X];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function St(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function it(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ft(N){Vt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Vt.copy(N))}function Pt(N){Ht.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Ht.copy(N))}function yt(N,st){let at=l.get(st);at===void 0&&(at=new WeakMap,l.set(st,at));let mt=at.get(N);mt===void 0&&(mt=i.getUniformBlockIndex(st,N.name),at.set(N,mt))}function ct(N,st){const mt=l.get(st).get(N);h.get(st)!==mt&&(i.uniformBlockBinding(st,mt,N.__bindingPointIndex),h.set(st,mt))}function Ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},X=null,et={},f={},p=new WeakMap,d=[],v=null,x=!1,g=null,u=null,R=null,C=null,T=null,P=null,S=null,b=new Nt(0,0,0),A=0,_=!1,m=null,y=null,D=null,U=null,I=null,Vt.set(0,0,i.canvas.width,i.canvas.height),Ht.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:$,bindFramebuffer:dt,drawBuffers:lt,useProgram:Rt,setBlending:ne,setMaterial:It,setFlipSided:Dt,setCullFace:vt,setLineWidth:ie,setPolygonOffset:xt,setScissorTest:Bt,activeTexture:me,bindTexture:le,unbindTexture:w,compressedTexImage2D:M,compressedTexImage3D:H,texImage2D:St,texImage3D:it,updateUBOMapping:yt,uniformBlockBinding:ct,texStorage2D:rt,texStorage3D:Mt,texSubImage2D:j,texSubImage3D:Q,compressedTexSubImage2D:Y,compressedTexSubImage3D:Et,scissor:ft,viewport:Pt,reset:Ft}}function cm(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new At,c=new WeakMap;let f;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,M){return d?new OffscreenCanvas(w,M):Us("canvas")}function x(w,M,H){let j=1;const Q=le(w);if((Q.width>H||Q.height>H)&&(j=H/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Y=Math.floor(j*Q.width),Et=Math.floor(j*Q.height);f===void 0&&(f=v(Y,Et));const rt=M?v(Y,Et):f;return rt.width=Y,rt.height=Et,rt.getContext("2d").drawImage(w,0,0,Y,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+Et+")."),rt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function g(w){return w.generateMipmaps}function u(w){i.generateMipmap(w)}function R(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function C(w,M,H,j,Q=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Y=M;if(M===i.RED&&(H===i.FLOAT&&(Y=i.R32F),H===i.HALF_FLOAT&&(Y=i.R16F),H===i.UNSIGNED_BYTE&&(Y=i.R8)),M===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.R8UI),H===i.UNSIGNED_SHORT&&(Y=i.R16UI),H===i.UNSIGNED_INT&&(Y=i.R32UI),H===i.BYTE&&(Y=i.R8I),H===i.SHORT&&(Y=i.R16I),H===i.INT&&(Y=i.R32I)),M===i.RG&&(H===i.FLOAT&&(Y=i.RG32F),H===i.HALF_FLOAT&&(Y=i.RG16F),H===i.UNSIGNED_BYTE&&(Y=i.RG8)),M===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.RG8UI),H===i.UNSIGNED_SHORT&&(Y=i.RG16UI),H===i.UNSIGNED_INT&&(Y=i.RG32UI),H===i.BYTE&&(Y=i.RG8I),H===i.SHORT&&(Y=i.RG16I),H===i.INT&&(Y=i.RG32I)),M===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),H===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),H===i.UNSIGNED_INT&&(Y=i.RGB32UI),H===i.BYTE&&(Y=i.RGB8I),H===i.SHORT&&(Y=i.RGB16I),H===i.INT&&(Y=i.RGB32I)),M===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),H===i.UNSIGNED_INT&&(Y=i.RGBA32UI),H===i.BYTE&&(Y=i.RGBA8I),H===i.SHORT&&(Y=i.RGBA16I),H===i.INT&&(Y=i.RGBA32I)),M===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),M===i.RGBA){const Et=Q?Ds:Yt.getTransfer(j);H===i.FLOAT&&(Y=i.RGBA32F),H===i.HALF_FLOAT&&(Y=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Y=Et===Zt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function T(w,M){let H;return w?M===null||M===Hn||M===zi?H=i.DEPTH24_STENCIL8:M===$e?H=i.DEPTH32F_STENCIL8:M===Bi&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Hn||M===zi?H=i.DEPTH_COMPONENT24:M===$e?H=i.DEPTH_COMPONENT32F:M===Bi&&(H=i.DEPTH_COMPONENT16),H}function P(w,M){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Le&&w.minFilter!==Ze?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function S(w){const M=w.target;M.removeEventListener("dispose",S),A(M),M.isVideoTexture&&c.delete(M)}function b(w){const M=w.target;M.removeEventListener("dispose",b),m(M)}function A(w){const M=n.get(w);if(M.__webglInit===void 0)return;const H=w.source,j=p.get(H);if(j){const Q=j[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&_(w),Object.keys(j).length===0&&p.delete(H)}n.remove(w)}function _(w){const M=n.get(w);i.deleteTexture(M.__webglTexture);const H=w.source,j=p.get(H);delete j[M.__cacheKey],a.memory.textures--}function m(w){const M=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let Q=0;Q<M.__webglFramebuffer[j].length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[j][Q]);else i.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)i.deleteFramebuffer(M.__webglFramebuffer[j]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=w.textures;for(let j=0,Q=H.length;j<Q;j++){const Y=n.get(H[j]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(H[j])}n.remove(w)}let y=0;function D(){y=0}function U(){const w=y;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),y+=1,w}function I(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function k(w,M){const H=n.get(w);if(w.isVideoTexture&&Bt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&H.__version!==w.version){const j=w.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(H,w,M);return}}else w.isExternalTexture&&(H.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+M)}function z(w,M){const H=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&H.__version!==w.version){q(H,w,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+M)}function Z(w,M){const H=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&H.__version!==w.version){q(H,w,M);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+M)}function G(w,M){const H=n.get(w);if(w.version>0&&H.__version!==w.version){J(H,w,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+M)}const X={[Ur]:i.REPEAT,[Bn]:i.CLAMP_TO_EDGE,[Ir]:i.MIRRORED_REPEAT},et={[Le]:i.NEAREST,[fc]:i.NEAREST_MIPMAP_NEAREST,[Zi]:i.NEAREST_MIPMAP_LINEAR,[Ze]:i.LINEAR,[Vs]:i.LINEAR_MIPMAP_NEAREST,[zn]:i.LINEAR_MIPMAP_LINEAR},ut={[gc]:i.NEVER,[yc]:i.ALWAYS,[_c]:i.LESS,[al]:i.LEQUAL,[vc]:i.EQUAL,[Sc]:i.GEQUAL,[xc]:i.GREATER,[Mc]:i.NOTEQUAL};function bt(w,M){if(M.type===$e&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Ze||M.magFilter===Vs||M.magFilter===Zi||M.magFilter===zn||M.minFilter===Ze||M.minFilter===Vs||M.minFilter===Zi||M.minFilter===zn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,X[M.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,X[M.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,X[M.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,et[M.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,et[M.minFilter]),M.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ut[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Le||M.minFilter!==Zi&&M.minFilter!==zn||M.type===$e&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Vt(w,M){let H=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",S));const j=M.source;let Q=p.get(j);Q===void 0&&(Q={},p.set(j,Q));const Y=I(M);if(Y!==w.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),Q[Y].usedTimes++;const Et=Q[w.__cacheKey];Et!==void 0&&(Q[w.__cacheKey].usedTimes--,Et.usedTimes===0&&_(M)),w.__cacheKey=Y,w.__webglTexture=Q[Y].texture}return H}function Ht(w,M,H){return Math.floor(Math.floor(w/H)/M)}function kt(w,M,H,j){const Y=w.updateRanges;if(Y.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,H,j,M.data);else{Y.sort((it,ft)=>it.start-ft.start);let Et=0;for(let it=1;it<Y.length;it++){const ft=Y[Et],Pt=Y[it],yt=ft.start+ft.count,ct=Ht(Pt.start,M.width,4),Ft=Ht(ft.start,M.width,4);Pt.start<=yt+1&&ct===Ft&&Ht(Pt.start+Pt.count-1,M.width,4)===ct?ft.count=Math.max(ft.count,Pt.start+Pt.count-ft.start):(++Et,Y[Et]=Pt)}Y.length=Et+1;const rt=i.getParameter(i.UNPACK_ROW_LENGTH),Mt=i.getParameter(i.UNPACK_SKIP_PIXELS),St=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let it=0,ft=Y.length;it<ft;it++){const Pt=Y[it],yt=Math.floor(Pt.start/4),ct=Math.ceil(Pt.count/4),Ft=yt%M.width,N=Math.floor(yt/M.width),st=ct,at=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ft),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,Ft,N,st,at,H,j,M.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(i.UNPACK_SKIP_ROWS,St)}}function q(w,M,H){let j=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=i.TEXTURE_3D);const Q=Vt(w,M),Y=M.source;e.bindTexture(j,w.__webglTexture,i.TEXTURE0+H);const Et=n.get(Y);if(Y.version!==Et.__version||Q===!0){e.activeTexture(i.TEXTURE0+H);const rt=Yt.getPrimaries(Yt.workingColorSpace),Mt=M.colorSpace===Mn?null:Yt.getPrimaries(M.colorSpace),St=M.colorSpace===Mn||rt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let it=x(M.image,!1,s.maxTextureSize);it=me(M,it);const ft=r.convert(M.format,M.colorSpace),Pt=r.convert(M.type);let yt=C(M.internalFormat,ft,Pt,M.colorSpace,M.isVideoTexture);bt(j,M);let ct;const Ft=M.mipmaps,N=M.isVideoTexture!==!0,st=Et.__version===void 0||Q===!0,at=Y.dataReady,mt=P(M,it);if(M.isDepthTexture)yt=T(M.format===ki,M.type),st&&(N?e.texStorage2D(i.TEXTURE_2D,1,yt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,yt,it.width,it.height,0,ft,Pt,null));else if(M.isDataTexture)if(Ft.length>0){N&&st&&e.texStorage2D(i.TEXTURE_2D,mt,yt,Ft[0].width,Ft[0].height);for(let tt=0,K=Ft.length;tt<K;tt++)ct=Ft[tt],N?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ct.width,ct.height,ft,Pt,ct.data):e.texImage2D(i.TEXTURE_2D,tt,yt,ct.width,ct.height,0,ft,Pt,ct.data);M.generateMipmaps=!1}else N?(st&&e.texStorage2D(i.TEXTURE_2D,mt,yt,it.width,it.height),at&&kt(M,it,ft,Pt)):e.texImage2D(i.TEXTURE_2D,0,yt,it.width,it.height,0,ft,Pt,it.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){N&&st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,yt,Ft[0].width,Ft[0].height,it.depth);for(let tt=0,K=Ft.length;tt<K;tt++)if(ct=Ft[tt],M.format!==qe)if(ft!==null)if(N){if(at)if(M.layerUpdates.size>0){const _t=_o(ct.width,ct.height,M.format,M.type);for(const Ut of M.layerUpdates){const te=ct.data.subarray(Ut*_t/ct.data.BYTES_PER_ELEMENT,(Ut+1)*_t/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Ut,ct.width,ct.height,1,ft,te)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,ct.width,ct.height,it.depth,ft,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,yt,ct.width,ct.height,it.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?at&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,ct.width,ct.height,it.depth,ft,Pt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,yt,ct.width,ct.height,it.depth,0,ft,Pt,ct.data)}else{N&&st&&e.texStorage2D(i.TEXTURE_2D,mt,yt,Ft[0].width,Ft[0].height);for(let tt=0,K=Ft.length;tt<K;tt++)ct=Ft[tt],M.format!==qe?ft!==null?N?at&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,ct.width,ct.height,ft,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,yt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ct.width,ct.height,ft,Pt,ct.data):e.texImage2D(i.TEXTURE_2D,tt,yt,ct.width,ct.height,0,ft,Pt,ct.data)}else if(M.isDataArrayTexture)if(N){if(st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,yt,it.width,it.height,it.depth),at)if(M.layerUpdates.size>0){const tt=_o(it.width,it.height,M.format,M.type);for(const K of M.layerUpdates){const _t=it.data.subarray(K*tt/it.data.BYTES_PER_ELEMENT,(K+1)*tt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,it.width,it.height,1,ft,Pt,_t)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,ft,Pt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,yt,it.width,it.height,it.depth,0,ft,Pt,it.data);else if(M.isData3DTexture)N?(st&&e.texStorage3D(i.TEXTURE_3D,mt,yt,it.width,it.height,it.depth),at&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,ft,Pt,it.data)):e.texImage3D(i.TEXTURE_3D,0,yt,it.width,it.height,it.depth,0,ft,Pt,it.data);else if(M.isFramebufferTexture){if(st)if(N)e.texStorage2D(i.TEXTURE_2D,mt,yt,it.width,it.height);else{let tt=it.width,K=it.height;for(let _t=0;_t<mt;_t++)e.texImage2D(i.TEXTURE_2D,_t,yt,tt,K,0,ft,Pt,null),tt>>=1,K>>=1}}else if(Ft.length>0){if(N&&st){const tt=le(Ft[0]);e.texStorage2D(i.TEXTURE_2D,mt,yt,tt.width,tt.height)}for(let tt=0,K=Ft.length;tt<K;tt++)ct=Ft[tt],N?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ft,Pt,ct):e.texImage2D(i.TEXTURE_2D,tt,yt,ft,Pt,ct);M.generateMipmaps=!1}else if(N){if(st){const tt=le(it);e.texStorage2D(i.TEXTURE_2D,mt,yt,tt.width,tt.height)}at&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,Pt,it)}else e.texImage2D(i.TEXTURE_2D,0,yt,ft,Pt,it);g(M)&&u(j),Et.__version=Y.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function J(w,M,H){if(M.image.length!==6)return;const j=Vt(w,M),Q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+H);const Y=n.get(Q);if(Q.version!==Y.__version||j===!0){e.activeTexture(i.TEXTURE0+H);const Et=Yt.getPrimaries(Yt.workingColorSpace),rt=M.colorSpace===Mn?null:Yt.getPrimaries(M.colorSpace),Mt=M.colorSpace===Mn||Et===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const St=M.isCompressedTexture||M.image[0].isCompressedTexture,it=M.image[0]&&M.image[0].isDataTexture,ft=[];for(let K=0;K<6;K++)!St&&!it?ft[K]=x(M.image[K],!0,s.maxCubemapSize):ft[K]=it?M.image[K].image:M.image[K],ft[K]=me(M,ft[K]);const Pt=ft[0],yt=r.convert(M.format,M.colorSpace),ct=r.convert(M.type),Ft=C(M.internalFormat,yt,ct,M.colorSpace),N=M.isVideoTexture!==!0,st=Y.__version===void 0||j===!0,at=Q.dataReady;let mt=P(M,Pt);bt(i.TEXTURE_CUBE_MAP,M);let tt;if(St){N&&st&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Ft,Pt.width,Pt.height);for(let K=0;K<6;K++){tt=ft[K].mipmaps;for(let _t=0;_t<tt.length;_t++){const Ut=tt[_t];M.format!==qe?yt!==null?N?at&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,Ut.width,Ut.height,yt,Ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Ft,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,0,0,Ut.width,Ut.height,yt,ct,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t,Ft,Ut.width,Ut.height,0,yt,ct,Ut.data)}}}else{if(tt=M.mipmaps,N&&st){tt.length>0&&mt++;const K=le(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Ft,K.width,K.height)}for(let K=0;K<6;K++)if(it){N?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ft[K].width,ft[K].height,yt,ct,ft[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ft,ft[K].width,ft[K].height,0,yt,ct,ft[K].data);for(let _t=0;_t<tt.length;_t++){const te=tt[_t].image[K].image;N?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,te.width,te.height,yt,ct,te.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Ft,te.width,te.height,0,yt,ct,te.data)}}else{N?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,yt,ct,ft[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ft,yt,ct,ft[K]);for(let _t=0;_t<tt.length;_t++){const Ut=tt[_t];N?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,0,0,yt,ct,Ut.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_t+1,Ft,yt,ct,Ut.image[K])}}}g(M)&&u(i.TEXTURE_CUBE_MAP),Y.__version=Q.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function $(w,M,H,j,Q,Y){const Et=r.convert(H.format,H.colorSpace),rt=r.convert(H.type),Mt=C(H.internalFormat,Et,rt,H.colorSpace),St=n.get(M),it=n.get(H);if(it.__renderTarget=M,!St.__hasExternalTextures){const ft=Math.max(1,M.width>>Y),Pt=Math.max(1,M.height>>Y);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,Y,Mt,ft,Pt,M.depth,0,Et,rt,null):e.texImage2D(Q,Y,Mt,ft,Pt,0,Et,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),xt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,it.__webglTexture,0,ie(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,it.__webglTexture,Y),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(w,M,H){if(i.bindRenderbuffer(i.RENDERBUFFER,w),M.depthBuffer){const j=M.depthTexture,Q=j&&j.isDepthTexture?j.type:null,Y=T(M.stencilBuffer,Q),Et=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=ie(M);xt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,Y,M.width,M.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,Y,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Y,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,w)}else{const j=M.textures;for(let Q=0;Q<j.length;Q++){const Y=j[Q],Et=r.convert(Y.format,Y.colorSpace),rt=r.convert(Y.type),Mt=C(Y.internalFormat,Et,rt,Y.colorSpace),St=ie(M);H&&xt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,St,Mt,M.width,M.height):xt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,St,Mt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function lt(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(M.depthTexture);j.__renderTarget=M,(!j.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),k(M.depthTexture,0);const Q=j.__webglTexture,Y=ie(M);if(M.depthTexture.format===Hi)xt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(M.depthTexture.format===ki)xt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Rt(w){const M=n.get(w),H=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){const j=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=j}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const j=w.texture.mipmaps;j&&j.length>0?lt(M.__webglFramebuffer[0],w):lt(M.__webglFramebuffer,w)}else if(H){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=i.createRenderbuffer(),dt(M.__webglDepthbuffer[j],w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Y)}}else{const j=w.texture.mipmaps;if(j&&j.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),dt(M.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Y)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(w,M,H){const j=n.get(w);M!==void 0&&$(j.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Rt(w)}function L(w){const M=w.texture,H=n.get(w),j=n.get(M);w.addEventListener("dispose",b);const Q=w.textures,Y=w.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=M.version,a.memory.textures++),Y){H.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[rt]=[];for(let Mt=0;Mt<M.mipmaps.length;Mt++)H.__webglFramebuffer[rt][Mt]=i.createFramebuffer()}else H.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let rt=0;rt<M.mipmaps.length;rt++)H.__webglFramebuffer[rt]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Et)for(let rt=0,Mt=Q.length;rt<Mt;rt++){const St=n.get(Q[rt]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&xt(w)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){const Mt=Q[rt];H.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[rt]);const St=r.convert(Mt.format,Mt.colorSpace),it=r.convert(Mt.type),ft=C(Mt.internalFormat,St,it,Mt.colorSpace,w.isXRRenderTarget===!0),Pt=ie(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,ft,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,H.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(H.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),bt(i.TEXTURE_CUBE_MAP,M);for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0)for(let Mt=0;Mt<M.mipmaps.length;Mt++)$(H.__webglFramebuffer[rt][Mt],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt);else $(H.__webglFramebuffer[rt],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);g(M)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let rt=0,Mt=Q.length;rt<Mt;rt++){const St=Q[rt],it=n.get(St);let ft=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ft=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,it.__webglTexture),bt(ft,St),$(H.__webglFramebuffer,w,St,i.COLOR_ATTACHMENT0+rt,ft,0),g(St)&&u(ft)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(rt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,j.__webglTexture),bt(rt,M),M.mipmaps&&M.mipmaps.length>0)for(let Mt=0;Mt<M.mipmaps.length;Mt++)$(H.__webglFramebuffer[Mt],w,M,i.COLOR_ATTACHMENT0,rt,Mt);else $(H.__webglFramebuffer,w,M,i.COLOR_ATTACHMENT0,rt,0);g(M)&&u(rt),e.unbindTexture()}w.depthBuffer&&Rt(w)}function ne(w){const M=w.textures;for(let H=0,j=M.length;H<j;H++){const Q=M[H];if(g(Q)){const Y=R(w),Et=n.get(Q).__webglTexture;e.bindTexture(Y,Et),u(Y),e.unbindTexture()}}}const It=[],Dt=[];function vt(w){if(w.samples>0){if(xt(w)===!1){const M=w.textures,H=w.width,j=w.height;let Q=i.COLOR_BUFFER_BIT;const Y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(w),rt=M.length>1;if(rt)for(let St=0;St<M.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer);const Mt=w.texture.mipmaps;Mt&&Mt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let St=0;St<M.length;St++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[St]);const it=n.get(M[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,H,j,0,0,H,j,Q,i.NEAREST),h===!0&&(It.length=0,Dt.length=0,It.push(i.COLOR_ATTACHMENT0+St),w.depthBuffer&&w.resolveDepthBuffer===!1&&(It.push(Y),Dt.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,It))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let St=0;St<M.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,Et.__webglColorRenderbuffer[St]);const it=n.get(M[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,it,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&h){const M=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ie(w){return Math.min(s.maxSamples,w.samples)}function xt(w){const M=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Bt(w){const M=a.render.frame;c.get(w)!==M&&(c.set(w,M),w.update())}function me(w,M){const H=w.colorSpace,j=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||H!==xi&&H!==Mn&&(Yt.getTransfer(H)===Zt?(j!==qe||Q!==Qe)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function le(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=ce,this.setupRenderTarget=L,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=$,this.useMultisampledRTT=xt}function hm(i,t){function e(n,s=Mn){let r;const a=Yt.getTransfer(s);if(n===Qe)return i.UNSIGNED_BYTE;if(n===da)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===tl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===el)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Jo)return i.BYTE;if(n===Qo)return i.SHORT;if(n===Bi)return i.UNSIGNED_SHORT;if(n===fa)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===$e)return i.FLOAT;if(n===Yi)return i.HALF_FLOAT;if(n===nl)return i.ALPHA;if(n===il)return i.RGB;if(n===qe)return i.RGBA;if(n===Hi)return i.DEPTH_COMPONENT;if(n===ki)return i.DEPTH_STENCIL;if(n===ma)return i.RED;if(n===ga)return i.RED_INTEGER;if(n===sl)return i.RG;if(n===_a)return i.RG_INTEGER;if(n===va)return i.RGBA_INTEGER;if(n===As||n===ws||n===Rs||n===Cs)if(a===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===As)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===As)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Cs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nr||n===Fr||n===Or||n===Br)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Nr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Or)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Br)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===zr||n===Hr||n===kr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===zr||n===Hr)return a===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===kr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Gr||n===Vr||n===Wr||n===Xr||n===Yr||n===qr||n===jr||n===Kr||n===Zr||n===$r||n===Jr||n===Qr||n===ta||n===ea)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Gr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===jr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Kr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$r)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ta)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ea)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===na||n===ia||n===sa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===na)return a===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ra||n===aa||n===oa||n===la)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ra)return r.COMPRESSED_RED_RGTC1_EXT;if(n===aa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===la)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const um=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fm=`
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

}`;class dm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ml(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Tn({vertexShader:um,fragmentShader:fm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xe(new qi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pm extends Vn{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",h=1,l=null,c=null,f=null,p=null,d=null,v=null;const x=typeof XRWebGLBinding<"u",g=new dm,u={},R=e.getContextAttributes();let C=null,T=null;const P=[],S=[],b=new At;let A=null;const _=new ze;_.viewport=new oe;const m=new ze;m.viewport=new oe;const y=[_,m],D=new Dh;let U=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=P[q];return J===void 0&&(J=new hr,P[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=P[q];return J===void 0&&(J=new hr,P[q]=J),J.getGripSpace()},this.getHand=function(q){let J=P[q];return J===void 0&&(J=new hr,P[q]=J),J.getHandSpace()};function k(q){const J=S.indexOf(q.inputSource);if(J===-1)return;const $=P[J];$!==void 0&&($.update(q.inputSource,q.frame,l||a),$.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",Z);for(let q=0;q<P.length;q++){const J=S[q];J!==null&&(S[q]=null,P[q].disconnect(J))}U=null,I=null,g.reset();for(const q in u)delete u[q];t.setRenderTarget(C),d=null,p=null,f=null,s=null,T=null,kt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(C=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",z),s.addEventListener("inputsourceschange",Z),R.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(b),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let $=null,dt=null,lt=null;R.depth&&(lt=R.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=R.stencil?ki:Hi,dt=R.stencil?zi:Hn);const Rt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};f=this.getBinding(),p=f.createProjectionLayer(Rt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),T=new Gn(p.textureWidth,p.textureHeight,{format:qe,type:Qe,depthTexture:new xl(p.textureWidth,p.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:R.stencil,colorSpace:t.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const $={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,$),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),T=new Gn(d.framebufferWidth,d.framebufferHeight,{format:qe,type:Qe,colorSpace:t.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await s.requestReferenceSpace(o),kt.setContext(s),kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Z(q){for(let J=0;J<q.removed.length;J++){const $=q.removed[J],dt=S.indexOf($);dt>=0&&(S[dt]=null,P[dt].disconnect($))}for(let J=0;J<q.added.length;J++){const $=q.added[J];let dt=S.indexOf($);if(dt===-1){for(let Rt=0;Rt<P.length;Rt++)if(Rt>=S.length){S.push($),dt=Rt;break}else if(S[Rt]===null){S[Rt]=$,dt=Rt;break}if(dt===-1)break}const lt=P[dt];lt&&lt.connect($)}}const G=new F,X=new F;function et(q,J,$){G.setFromMatrixPosition(J.matrixWorld),X.setFromMatrixPosition($.matrixWorld);const dt=G.distanceTo(X),lt=J.projectionMatrix.elements,Rt=$.projectionMatrix.elements,ce=lt[14]/(lt[10]-1),L=lt[14]/(lt[10]+1),ne=(lt[9]+1)/lt[5],It=(lt[9]-1)/lt[5],Dt=(lt[8]-1)/lt[0],vt=(Rt[8]+1)/Rt[0],ie=ce*Dt,xt=ce*vt,Bt=dt/(-Dt+vt),me=Bt*-Dt;if(J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(me),q.translateZ(Bt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),lt[10]===-1)q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const le=ce+Bt,w=L+Bt,M=ie-me,H=xt+(dt-me),j=ne*L/w*le,Q=It*L/w*le;q.projectionMatrix.makePerspective(M,H,j,Q,le,w),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ut(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let J=q.near,$=q.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&($=g.depthFar)),D.near=m.near=_.near=J,D.far=m.far=_.far=$,(U!==D.near||I!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),U=D.near,I=D.far),D.layers.mask=q.layers.mask|6,_.layers.mask=D.layers.mask&3,m.layers.mask=D.layers.mask&5;const dt=q.parent,lt=D.cameras;ut(D,dt);for(let Rt=0;Rt<lt.length;Rt++)ut(lt[Rt],dt);lt.length===2?et(D,_,m):D.projectionMatrix.copy(_.projectionMatrix),bt(q,D,dt)};function bt(q,J,$){$===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy($.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Gi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(p===null&&d===null))return h},this.setFoveation=function(q){h=q,p!==null&&(p.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(q){return u[q]};let Vt=null;function Ht(q,J){if(c=J.getViewerPose(l||a),v=J,c!==null){const $=c.views;d!==null&&(t.setRenderTargetFramebuffer(T,d.framebuffer),t.setRenderTarget(T));let dt=!1;$.length!==D.cameras.length&&(D.cameras.length=0,dt=!0);for(let L=0;L<$.length;L++){const ne=$[L];let It=null;if(d!==null)It=d.getViewport(ne);else{const vt=f.getViewSubImage(p,ne);It=vt.viewport,L===0&&(t.setRenderTargetTextures(T,vt.colorTexture,vt.depthStencilTexture),t.setRenderTarget(T))}let Dt=y[L];Dt===void 0&&(Dt=new ze,Dt.layers.enable(L),Dt.viewport=new oe,y[L]=Dt),Dt.matrix.fromArray(ne.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(ne.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(It.x,It.y,It.width,It.height),L===0&&(D.matrix.copy(Dt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),dt===!0&&D.cameras.push(Dt)}const lt=s.enabledFeatures;if(lt&&lt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=n.getBinding();const L=f.getDepthInformation($[0]);L&&L.isValid&&L.texture&&g.init(L,s.renderState)}if(lt&&lt.includes("camera-access")&&x){t.state.unbindTexture(),f=n.getBinding();for(let L=0;L<$.length;L++){const ne=$[L].camera;if(ne){let It=u[ne];It||(It=new Ml,u[ne]=It);const Dt=f.getCameraImage(ne);It.sourceTexture=Dt}}}}for(let $=0;$<P.length;$++){const dt=S[$],lt=P[$];dt!==null&&lt!==void 0&&lt.update(dt,J,l||a)}Vt&&Vt(q,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),v=null}const kt=new El;kt.setAnimationLoop(Ht),this.setAnimationLoop=function(q){Vt=q},this.dispose=function(){}}}const In=new tn,mm=new Jt;function gm(i,t){function e(g,u){g.matrixAutoUpdate===!0&&g.updateMatrix(),u.value.copy(g.matrix)}function n(g,u){u.color.getRGB(g.fogColor.value,dl(i)),u.isFog?(g.fogNear.value=u.near,g.fogFar.value=u.far):u.isFogExp2&&(g.fogDensity.value=u.density)}function s(g,u,R,C,T){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(g,u):u.isMeshToonMaterial?(r(g,u),f(g,u)):u.isMeshPhongMaterial?(r(g,u),c(g,u)):u.isMeshStandardMaterial?(r(g,u),p(g,u),u.isMeshPhysicalMaterial&&d(g,u,T)):u.isMeshMatcapMaterial?(r(g,u),v(g,u)):u.isMeshDepthMaterial?r(g,u):u.isMeshDistanceMaterial?(r(g,u),x(g,u)):u.isMeshNormalMaterial?r(g,u):u.isLineBasicMaterial?(a(g,u),u.isLineDashedMaterial&&o(g,u)):u.isPointsMaterial?h(g,u,R,C):u.isSpriteMaterial?l(g,u):u.isShadowMaterial?(g.color.value.copy(u.color),g.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(g,u){g.opacity.value=u.opacity,u.color&&g.diffuse.value.copy(u.color),u.emissive&&g.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(g.map.value=u.map,e(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,e(u.alphaMap,g.alphaMapTransform)),u.bumpMap&&(g.bumpMap.value=u.bumpMap,e(u.bumpMap,g.bumpMapTransform),g.bumpScale.value=u.bumpScale,u.side===Ae&&(g.bumpScale.value*=-1)),u.normalMap&&(g.normalMap.value=u.normalMap,e(u.normalMap,g.normalMapTransform),g.normalScale.value.copy(u.normalScale),u.side===Ae&&g.normalScale.value.negate()),u.displacementMap&&(g.displacementMap.value=u.displacementMap,e(u.displacementMap,g.displacementMapTransform),g.displacementScale.value=u.displacementScale,g.displacementBias.value=u.displacementBias),u.emissiveMap&&(g.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,g.emissiveMapTransform)),u.specularMap&&(g.specularMap.value=u.specularMap,e(u.specularMap,g.specularMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest);const R=t.get(u),C=R.envMap,T=R.envMapRotation;C&&(g.envMap.value=C,In.copy(T),In.x*=-1,In.y*=-1,In.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(In.y*=-1,In.z*=-1),g.envMapRotation.value.setFromMatrix4(mm.makeRotationFromEuler(In)),g.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=u.reflectivity,g.ior.value=u.ior,g.refractionRatio.value=u.refractionRatio),u.lightMap&&(g.lightMap.value=u.lightMap,g.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,g.lightMapTransform)),u.aoMap&&(g.aoMap.value=u.aoMap,g.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,g.aoMapTransform))}function a(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,u.map&&(g.map.value=u.map,e(u.map,g.mapTransform))}function o(g,u){g.dashSize.value=u.dashSize,g.totalSize.value=u.dashSize+u.gapSize,g.scale.value=u.scale}function h(g,u,R,C){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.size.value=u.size*R,g.scale.value=C*.5,u.map&&(g.map.value=u.map,e(u.map,g.uvTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,e(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function l(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.rotation.value=u.rotation,u.map&&(g.map.value=u.map,e(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,e(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function c(g,u){g.specular.value.copy(u.specular),g.shininess.value=Math.max(u.shininess,1e-4)}function f(g,u){u.gradientMap&&(g.gradientMap.value=u.gradientMap)}function p(g,u){g.metalness.value=u.metalness,u.metalnessMap&&(g.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,g.metalnessMapTransform)),g.roughness.value=u.roughness,u.roughnessMap&&(g.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,g.roughnessMapTransform)),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)}function d(g,u,R){g.ior.value=u.ior,u.sheen>0&&(g.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),g.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(g.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,g.sheenColorMapTransform)),u.sheenRoughnessMap&&(g.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,g.sheenRoughnessMapTransform))),u.clearcoat>0&&(g.clearcoat.value=u.clearcoat,g.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(g.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,g.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(g.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ae&&g.clearcoatNormalScale.value.negate())),u.dispersion>0&&(g.dispersion.value=u.dispersion),u.iridescence>0&&(g.iridescence.value=u.iridescence,g.iridescenceIOR.value=u.iridescenceIOR,g.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(g.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,g.iridescenceMapTransform)),u.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),u.transmission>0&&(g.transmission.value=u.transmission,g.transmissionSamplerMap.value=R.texture,g.transmissionSamplerSize.value.set(R.width,R.height),u.transmissionMap&&(g.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,g.transmissionMapTransform)),g.thickness.value=u.thickness,u.thicknessMap&&(g.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=u.attenuationDistance,g.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(g.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(g.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=u.specularIntensity,g.specularColor.value.copy(u.specularColor),u.specularColorMap&&(g.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,g.specularColorMapTransform)),u.specularIntensityMap&&(g.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,u){u.matcap&&(g.matcap.value=u.matcap)}function x(g,u){const R=t.get(u).light;g.referencePosition.value.setFromMatrixPosition(R.matrixWorld),g.nearDistance.value=R.shadow.camera.near,g.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function _m(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(R,C){const T=C.program;n.uniformBlockBinding(R,T)}function l(R,C){let T=s[R.id];T===void 0&&(v(R),T=c(R),s[R.id]=T,R.addEventListener("dispose",g));const P=C.program;n.updateUBOMapping(R,P);const S=t.render.frame;r[R.id]!==S&&(p(R),r[R.id]=S)}function c(R){const C=f();R.__bindingPointIndex=C;const T=i.createBuffer(),P=R.__size,S=R.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,P,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,T),T}function f(){for(let R=0;R<o;R++)if(a.indexOf(R)===-1)return a.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(R){const C=s[R.id],T=R.uniforms,P=R.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let S=0,b=T.length;S<b;S++){const A=Array.isArray(T[S])?T[S]:[T[S]];for(let _=0,m=A.length;_<m;_++){const y=A[_];if(d(y,S,_,P)===!0){const D=y.__offset,U=Array.isArray(y.value)?y.value:[y.value];let I=0;for(let k=0;k<U.length;k++){const z=U[k],Z=x(z);typeof z=="number"||typeof z=="boolean"?(y.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,D+I,y.__data)):z.isMatrix3?(y.__data[0]=z.elements[0],y.__data[1]=z.elements[1],y.__data[2]=z.elements[2],y.__data[3]=0,y.__data[4]=z.elements[3],y.__data[5]=z.elements[4],y.__data[6]=z.elements[5],y.__data[7]=0,y.__data[8]=z.elements[6],y.__data[9]=z.elements[7],y.__data[10]=z.elements[8],y.__data[11]=0):(z.toArray(y.__data,I),I+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,y.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(R,C,T,P){const S=R.value,b=C+"_"+T;if(P[b]===void 0)return typeof S=="number"||typeof S=="boolean"?P[b]=S:P[b]=S.clone(),!0;{const A=P[b];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return P[b]=S,!0}else if(A.equals(S)===!1)return A.copy(S),!0}return!1}function v(R){const C=R.uniforms;let T=0;const P=16;for(let b=0,A=C.length;b<A;b++){const _=Array.isArray(C[b])?C[b]:[C[b]];for(let m=0,y=_.length;m<y;m++){const D=_[m],U=Array.isArray(D.value)?D.value:[D.value];for(let I=0,k=U.length;I<k;I++){const z=U[I],Z=x(z),G=T%P,X=G%Z.boundary,et=G+X;T+=X,et!==0&&P-et<Z.storage&&(T+=P-et),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=T,T+=Z.storage}}}const S=T%P;return S>0&&(T+=P-S),R.__size=T,R.__cache={},this}function x(R){const C={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(C.boundary=4,C.storage=4):R.isVector2?(C.boundary=8,C.storage=8):R.isVector3||R.isColor?(C.boundary=16,C.storage=12):R.isVector4?(C.boundary=16,C.storage=16):R.isMatrix3?(C.boundary=48,C.storage=48):R.isMatrix4?(C.boundary=64,C.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),C}function g(R){const C=R.target;C.removeEventListener("dispose",g);const T=a.indexOf(C.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[C.id]),delete s[C.id],delete r[C.id]}function u(){for(const R in s)i.deleteBuffer(s[R]);a=[],s={},r={}}return{bind:h,update:l,dispose:u}}class vm{constructor(t={}){const{canvas:e=Hc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const v=new Uint32Array(4),x=new Int32Array(4);let g=null,u=null;const R=[],C=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let P=!1;this._outputColorSpace=Be;let S=0,b=0,A=null,_=-1,m=null;const y=new oe,D=new oe;let U=null;const I=new Nt(0);let k=0,z=e.width,Z=e.height,G=1,X=null,et=null;const ut=new oe(0,0,z,Z),bt=new oe(0,0,z,Z);let Vt=!1;const Ht=new Ea;let kt=!1,q=!1;const J=new Jt,$=new F,dt=new oe,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Rt=!1;function ce(){return A===null?G:1}let L=n;function ne(E,O){return e.getContext(E,O)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r180"),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",tt,!1),L===null){const O="webgl2";if(L=ne(O,E),L===null)throw ne(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let It,Dt,vt,ie,xt,Bt,me,le,w,M,H,j,Q,Y,Et,rt,Mt,St,it,ft,Pt,yt,ct,Ft;function N(){It=new Rd(L),It.init(),yt=new hm(L,It),Dt=new Sd(L,It,t,yt),vt=new lm(L,It),Dt.reversedDepthBuffer&&p&&vt.buffers.depth.setReversed(!0),ie=new Dd(L),xt=new Kp,Bt=new cm(L,It,vt,xt,Dt,yt,ie),me=new Ed(T),le=new wd(T),w=new Fh(L),ct=new xd(L,w),M=new Cd(L,w,ie,ct),H=new Ud(L,M,w,ie),it=new Ld(L,Dt,Bt),rt=new yd(xt),j=new jp(T,me,le,It,Dt,ct,rt),Q=new gm(T,xt),Y=new $p,Et=new im(It),St=new vd(T,me,le,vt,H,d,h),Mt=new am(T,H,Dt),Ft=new _m(L,ie,Dt,vt),ft=new Md(L,It,ie),Pt=new Pd(L,It,ie),ie.programs=j.programs,T.capabilities=Dt,T.extensions=It,T.properties=xt,T.renderLists=Y,T.shadowMap=Mt,T.state=vt,T.info=ie}N();const st=new pm(T,L);this.xr=st,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=It.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=It.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(z,Z,!1))},this.getSize=function(E){return E.set(z,Z)},this.setSize=function(E,O,V=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,Z=O,e.width=Math.floor(E*G),e.height=Math.floor(O*G),V===!0&&(e.style.width=E+"px",e.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(z*G,Z*G).floor()},this.setDrawingBufferSize=function(E,O,V){z=E,Z=O,G=V,e.width=Math.floor(E*V),e.height=Math.floor(O*V),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(y)},this.getViewport=function(E){return E.copy(ut)},this.setViewport=function(E,O,V,W){E.isVector4?ut.set(E.x,E.y,E.z,E.w):ut.set(E,O,V,W),vt.viewport(y.copy(ut).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(bt)},this.setScissor=function(E,O,V,W){E.isVector4?bt.set(E.x,E.y,E.z,E.w):bt.set(E,O,V,W),vt.scissor(D.copy(bt).multiplyScalar(G).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(E){vt.setScissorTest(Vt=E)},this.setOpaqueSort=function(E){X=E},this.setTransparentSort=function(E){et=E},this.getClearColor=function(E){return E.copy(St.getClearColor())},this.setClearColor=function(){St.setClearColor(...arguments)},this.getClearAlpha=function(){return St.getClearAlpha()},this.setClearAlpha=function(){St.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,V=!0){let W=0;if(E){let B=!1;if(A!==null){const nt=A.texture.format;B=nt===va||nt===_a||nt===ga}if(B){const nt=A.texture.type,ht=nt===Qe||nt===Hn||nt===Bi||nt===zi||nt===da||nt===pa,gt=St.getClearColor(),pt=St.getClearAlpha(),Ct=gt.r,Lt=gt.g,Tt=gt.b;ht?(v[0]=Ct,v[1]=Lt,v[2]=Tt,v[3]=pt,L.clearBufferuiv(L.COLOR,0,v)):(x[0]=Ct,x[1]=Lt,x[2]=Tt,x[3]=pt,L.clearBufferiv(L.COLOR,0,x))}else W|=L.COLOR_BUFFER_BIT}O&&(W|=L.DEPTH_BUFFER_BIT),V&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),St.dispose(),Y.dispose(),Et.dispose(),xt.dispose(),me.dispose(),le.dispose(),H.dispose(),ct.dispose(),Ft.dispose(),j.dispose(),st.dispose(),st.removeEventListener("sessionstart",je),st.removeEventListener("sessionend",Aa),wn.stop()};function at(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const E=ie.autoReset,O=Mt.enabled,V=Mt.autoUpdate,W=Mt.needsUpdate,B=Mt.type;N(),ie.autoReset=E,Mt.enabled=O,Mt.autoUpdate=V,Mt.needsUpdate=W,Mt.type=B}function tt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function K(E){const O=E.target;O.removeEventListener("dispose",K),_t(O)}function _t(E){Ut(E),xt.remove(E)}function Ut(E){const O=xt.get(E).programs;O!==void 0&&(O.forEach(function(V){j.releaseProgram(V)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,V,W,B,nt){O===null&&(O=lt);const ht=B.isMesh&&B.matrixWorld.determinant()<0,gt=Ll(E,O,V,W,B);vt.setMaterial(W,ht);let pt=V.index,Ct=1;if(W.wireframe===!0){if(pt=M.getWireframeAttribute(V),pt===void 0)return;Ct=2}const Lt=V.drawRange,Tt=V.attributes.position;let Wt=Lt.start*Ct,Kt=(Lt.start+Lt.count)*Ct;nt!==null&&(Wt=Math.max(Wt,nt.start*Ct),Kt=Math.min(Kt,(nt.start+nt.count)*Ct)),pt!==null?(Wt=Math.max(Wt,0),Kt=Math.min(Kt,pt.count)):Tt!=null&&(Wt=Math.max(Wt,0),Kt=Math.min(Kt,Tt.count));const ae=Kt-Wt;if(ae<0||ae===1/0)return;ct.setup(B,W,gt,V,pt);let ee,Qt=ft;if(pt!==null&&(ee=w.get(pt),Qt=Pt,Qt.setIndex(ee)),B.isMesh)W.wireframe===!0?(vt.setLineWidth(W.wireframeLinewidth*ce()),Qt.setMode(L.LINES)):Qt.setMode(L.TRIANGLES);else if(B.isLine){let wt=W.linewidth;wt===void 0&&(wt=1),vt.setLineWidth(wt*ce()),B.isLineSegments?Qt.setMode(L.LINES):B.isLineLoop?Qt.setMode(L.LINE_LOOP):Qt.setMode(L.LINE_STRIP)}else B.isPoints?Qt.setMode(L.POINTS):B.isSprite&&Qt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Vi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Qt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(It.get("WEBGL_multi_draw"))Qt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const wt=B._multiDrawStarts,se=B._multiDrawCounts,Xt=B._multiDrawCount,Re=pt?w.get(pt).bytesPerElement:1,Xn=xt.get(W).currentProgram.getUniforms();for(let Ce=0;Ce<Xt;Ce++)Xn.setValue(L,"_gl_DrawID",Ce),Qt.render(wt[Ce]/Re,se[Ce])}else if(B.isInstancedMesh)Qt.renderInstances(Wt,ae,B.count);else if(V.isInstancedBufferGeometry){const wt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,se=Math.min(V.instanceCount,wt);Qt.renderInstances(Wt,ae,se)}else Qt.render(Wt,ae)};function te(E,O,V){E.transparent===!0&&E.side===cn&&E.forceSinglePass===!1?(E.side=Ae,E.needsUpdate=!0,Ki(E,O,V),E.side=bn,E.needsUpdate=!0,Ki(E,O,V),E.side=cn):Ki(E,O,V)}this.compile=function(E,O,V=null){V===null&&(V=E),u=Et.get(V),u.init(O),C.push(u),V.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(u.pushLight(B),B.castShadow&&u.pushShadow(B))}),E!==V&&E.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(u.pushLight(B),B.castShadow&&u.pushShadow(B))}),u.setupLights();const W=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const nt=B.material;if(nt)if(Array.isArray(nt))for(let ht=0;ht<nt.length;ht++){const gt=nt[ht];te(gt,V,B),W.add(gt)}else te(nt,V,B),W.add(nt)}),u=C.pop(),W},this.compileAsync=function(E,O,V=null){const W=this.compile(E,O,V);return new Promise(B=>{function nt(){if(W.forEach(function(ht){xt.get(ht).currentProgram.isReady()&&W.delete(ht)}),W.size===0){B(E);return}setTimeout(nt,10)}It.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let qt=null;function en(E){qt&&qt(E)}function je(){wn.stop()}function Aa(){wn.start()}const wn=new El;wn.setAnimationLoop(en),typeof self<"u"&&wn.setContext(self),this.setAnimationLoop=function(E){qt=E,st.setAnimationLoop(E),E===null?wn.stop():wn.start()},st.addEventListener("sessionstart",je),st.addEventListener("sessionend",Aa),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(O),O=st.getCamera()),E.isScene===!0&&E.onBeforeRender(T,E,O,A),u=Et.get(E,C.length),u.init(O),C.push(u),J.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ht.setFromProjectionMatrix(J,Je,O.reversedDepth),q=this.localClippingEnabled,kt=rt.init(this.clippingPlanes,q),g=Y.get(E,R.length),g.init(),R.push(g),st.enabled===!0&&st.isPresenting===!0){const nt=T.xr.getDepthSensingMesh();nt!==null&&ks(nt,O,-1/0,T.sortObjects)}ks(E,O,0,T.sortObjects),g.finish(),T.sortObjects===!0&&g.sort(X,et),Rt=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,Rt&&St.addToRenderList(g,E),this.info.render.frame++,kt===!0&&rt.beginShadows();const V=u.state.shadowsArray;Mt.render(V,E,O),kt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,B=g.transmissive;if(u.setupLights(),O.isArrayCamera){const nt=O.cameras;if(B.length>0)for(let ht=0,gt=nt.length;ht<gt;ht++){const pt=nt[ht];Ra(W,B,E,pt)}Rt&&St.render(E);for(let ht=0,gt=nt.length;ht<gt;ht++){const pt=nt[ht];wa(g,E,pt,pt.viewport)}}else B.length>0&&Ra(W,B,E,O),Rt&&St.render(E),wa(g,E,O);A!==null&&b===0&&(Bt.updateMultisampleRenderTarget(A),Bt.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(T,E,O),ct.resetDefaultState(),_=-1,m=null,C.pop(),C.length>0?(u=C[C.length-1],kt===!0&&rt.setGlobalState(T.clippingPlanes,u.state.camera)):u=null,R.pop(),R.length>0?g=R[R.length-1]:g=null};function ks(E,O,V,W){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)u.pushLight(E),E.castShadow&&u.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ht.intersectsSprite(E)){W&&dt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(J);const ht=H.update(E),gt=E.material;gt.visible&&g.push(E,ht,gt,V,dt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ht.intersectsObject(E))){const ht=H.update(E),gt=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),dt.copy(E.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),dt.copy(ht.boundingSphere.center)),dt.applyMatrix4(E.matrixWorld).applyMatrix4(J)),Array.isArray(gt)){const pt=ht.groups;for(let Ct=0,Lt=pt.length;Ct<Lt;Ct++){const Tt=pt[Ct],Wt=gt[Tt.materialIndex];Wt&&Wt.visible&&g.push(E,ht,Wt,V,dt.z,Tt)}}else gt.visible&&g.push(E,ht,gt,V,dt.z,null)}}const nt=E.children;for(let ht=0,gt=nt.length;ht<gt;ht++)ks(nt[ht],O,V,W)}function wa(E,O,V,W){const B=E.opaque,nt=E.transmissive,ht=E.transparent;u.setupLightsView(V),kt===!0&&rt.setGlobalState(T.clippingPlanes,V),W&&vt.viewport(y.copy(W)),B.length>0&&ji(B,O,V),nt.length>0&&ji(nt,O,V),ht.length>0&&ji(ht,O,V),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function Ra(E,O,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[W.id]===void 0&&(u.state.transmissionRenderTarget[W.id]=new Gn(1,1,{generateMipmaps:!0,type:It.has("EXT_color_buffer_half_float")||It.has("EXT_color_buffer_float")?Yi:Qe,minFilter:zn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const nt=u.state.transmissionRenderTarget[W.id],ht=W.viewport||y;nt.setSize(ht.z*T.transmissionResolutionScale,ht.w*T.transmissionResolutionScale);const gt=T.getRenderTarget(),pt=T.getActiveCubeFace(),Ct=T.getActiveMipmapLevel();T.setRenderTarget(nt),T.getClearColor(I),k=T.getClearAlpha(),k<1&&T.setClearColor(16777215,.5),T.clear(),Rt&&St.render(V);const Lt=T.toneMapping;T.toneMapping=yn;const Tt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),u.setupLightsView(W),kt===!0&&rt.setGlobalState(T.clippingPlanes,W),ji(E,V,W),Bt.updateMultisampleRenderTarget(nt),Bt.updateRenderTargetMipmap(nt),It.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Kt=0,ae=O.length;Kt<ae;Kt++){const ee=O[Kt],Qt=ee.object,wt=ee.geometry,se=ee.material,Xt=ee.group;if(se.side===cn&&Qt.layers.test(W.layers)){const Re=se.side;se.side=Ae,se.needsUpdate=!0,Ca(Qt,V,W,wt,se,Xt),se.side=Re,se.needsUpdate=!0,Wt=!0}}Wt===!0&&(Bt.updateMultisampleRenderTarget(nt),Bt.updateRenderTargetMipmap(nt))}T.setRenderTarget(gt,pt,Ct),T.setClearColor(I,k),Tt!==void 0&&(W.viewport=Tt),T.toneMapping=Lt}function ji(E,O,V){const W=O.isScene===!0?O.overrideMaterial:null;for(let B=0,nt=E.length;B<nt;B++){const ht=E[B],gt=ht.object,pt=ht.geometry,Ct=ht.group;let Lt=ht.material;Lt.allowOverride===!0&&W!==null&&(Lt=W),gt.layers.test(V.layers)&&Ca(gt,O,V,pt,Lt,Ct)}}function Ca(E,O,V,W,B,nt){E.onBeforeRender(T,O,V,W,B,nt),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(T,O,V,W,E,nt),B.transparent===!0&&B.side===cn&&B.forceSinglePass===!1?(B.side=Ae,B.needsUpdate=!0,T.renderBufferDirect(V,O,W,B,E,nt),B.side=bn,B.needsUpdate=!0,T.renderBufferDirect(V,O,W,B,E,nt),B.side=cn):T.renderBufferDirect(V,O,W,B,E,nt),E.onAfterRender(T,O,V,W,B,nt)}function Ki(E,O,V){O.isScene!==!0&&(O=lt);const W=xt.get(E),B=u.state.lights,nt=u.state.shadowsArray,ht=B.state.version,gt=j.getParameters(E,B.state,nt,O,V),pt=j.getProgramCacheKey(gt);let Ct=W.programs;W.environment=E.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(E.isMeshStandardMaterial?le:me).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Ct===void 0&&(E.addEventListener("dispose",K),Ct=new Map,W.programs=Ct);let Lt=Ct.get(pt);if(Lt!==void 0){if(W.currentProgram===Lt&&W.lightsStateVersion===ht)return Da(E,gt),Lt}else gt.uniforms=j.getUniforms(E),E.onBeforeCompile(gt,T),Lt=j.acquireProgram(gt,pt),Ct.set(pt,Lt),W.uniforms=gt.uniforms;const Tt=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Tt.clippingPlanes=rt.uniform),Da(E,gt),W.needsLights=Il(E),W.lightsStateVersion=ht,W.needsLights&&(Tt.ambientLightColor.value=B.state.ambient,Tt.lightProbe.value=B.state.probe,Tt.directionalLights.value=B.state.directional,Tt.directionalLightShadows.value=B.state.directionalShadow,Tt.spotLights.value=B.state.spot,Tt.spotLightShadows.value=B.state.spotShadow,Tt.rectAreaLights.value=B.state.rectArea,Tt.ltc_1.value=B.state.rectAreaLTC1,Tt.ltc_2.value=B.state.rectAreaLTC2,Tt.pointLights.value=B.state.point,Tt.pointLightShadows.value=B.state.pointShadow,Tt.hemisphereLights.value=B.state.hemi,Tt.directionalShadowMap.value=B.state.directionalShadowMap,Tt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Tt.spotShadowMap.value=B.state.spotShadowMap,Tt.spotLightMatrix.value=B.state.spotLightMatrix,Tt.spotLightMap.value=B.state.spotLightMap,Tt.pointShadowMap.value=B.state.pointShadowMap,Tt.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Lt,W.uniformsList=null,Lt}function Pa(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=Ps.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Da(E,O){const V=xt.get(E);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function Ll(E,O,V,W,B){O.isScene!==!0&&(O=lt),Bt.resetTextureUnits();const nt=O.fog,ht=W.isMeshStandardMaterial?O.environment:null,gt=A===null?T.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:xi,pt=(W.isMeshStandardMaterial?le:me).get(W.envMap||ht),Ct=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Lt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Tt=!!V.morphAttributes.position,Wt=!!V.morphAttributes.normal,Kt=!!V.morphAttributes.color;let ae=yn;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ae=T.toneMapping);const ee=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Qt=ee!==void 0?ee.length:0,wt=xt.get(W),se=u.state.lights;if(kt===!0&&(q===!0||E!==m)){const Se=E===m&&W.id===_;rt.setState(W,E,Se)}let Xt=!1;W.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==se.state.version||wt.outputColorSpace!==gt||B.isBatchedMesh&&wt.batching===!1||!B.isBatchedMesh&&wt.batching===!0||B.isBatchedMesh&&wt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&wt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&wt.instancing===!1||!B.isInstancedMesh&&wt.instancing===!0||B.isSkinnedMesh&&wt.skinning===!1||!B.isSkinnedMesh&&wt.skinning===!0||B.isInstancedMesh&&wt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&wt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&wt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&wt.instancingMorph===!1&&B.morphTexture!==null||wt.envMap!==pt||W.fog===!0&&wt.fog!==nt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==rt.numPlanes||wt.numIntersection!==rt.numIntersection)||wt.vertexAlphas!==Ct||wt.vertexTangents!==Lt||wt.morphTargets!==Tt||wt.morphNormals!==Wt||wt.morphColors!==Kt||wt.toneMapping!==ae||wt.morphTargetsCount!==Qt)&&(Xt=!0):(Xt=!0,wt.__version=W.version);let Re=wt.currentProgram;Xt===!0&&(Re=Ki(W,O,B));let Xn=!1,Ce=!1,Ei=!1;const re=Re.getUniforms(),Ie=wt.uniforms;if(vt.useProgram(Re.program)&&(Xn=!0,Ce=!0,Ei=!0),W.id!==_&&(_=W.id,Ce=!0),Xn||m!==E){vt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),re.setValue(L,"projectionMatrix",E.projectionMatrix),re.setValue(L,"viewMatrix",E.matrixWorldInverse);const be=re.map.cameraPosition;be!==void 0&&be.setValue(L,$.setFromMatrixPosition(E.matrixWorld)),Dt.logarithmicDepthBuffer&&re.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&re.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),m!==E&&(m=E,Ce=!0,Ei=!0)}if(B.isSkinnedMesh){re.setOptional(L,B,"bindMatrix"),re.setOptional(L,B,"bindMatrixInverse");const Se=B.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),re.setValue(L,"boneTexture",Se.boneTexture,Bt))}B.isBatchedMesh&&(re.setOptional(L,B,"batchingTexture"),re.setValue(L,"batchingTexture",B._matricesTexture,Bt),re.setOptional(L,B,"batchingIdTexture"),re.setValue(L,"batchingIdTexture",B._indirectTexture,Bt),re.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&re.setValue(L,"batchingColorTexture",B._colorsTexture,Bt));const Ne=V.morphAttributes;if((Ne.position!==void 0||Ne.normal!==void 0||Ne.color!==void 0)&&it.update(B,V,Re),(Ce||wt.receiveShadow!==B.receiveShadow)&&(wt.receiveShadow=B.receiveShadow,re.setValue(L,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ie.envMap.value=pt,Ie.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(Ie.envMapIntensity.value=O.environmentIntensity),Ce&&(re.setValue(L,"toneMappingExposure",T.toneMappingExposure),wt.needsLights&&Ul(Ie,Ei),nt&&W.fog===!0&&Q.refreshFogUniforms(Ie,nt),Q.refreshMaterialUniforms(Ie,W,G,Z,u.state.transmissionRenderTarget[E.id]),Ps.upload(L,Pa(wt),Ie,Bt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ps.upload(L,Pa(wt),Ie,Bt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&re.setValue(L,"center",B.center),re.setValue(L,"modelViewMatrix",B.modelViewMatrix),re.setValue(L,"normalMatrix",B.normalMatrix),re.setValue(L,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Se=W.uniformsGroups;for(let be=0,Gs=Se.length;be<Gs;be++){const Rn=Se[be];Ft.update(Rn,Re),Ft.bind(Rn,Re)}}return Re}function Ul(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Il(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,O,V){const W=xt.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),xt.get(E.texture).__webglTexture=O,xt.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:V,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){const V=xt.get(E);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0};const Nl=L.createFramebuffer();this.setRenderTarget=function(E,O=0,V=0){A=E,S=O,b=V;let W=!0,B=null,nt=!1,ht=!1;if(E){const pt=xt.get(E);if(pt.__useDefaultFramebuffer!==void 0)vt.bindFramebuffer(L.FRAMEBUFFER,null),W=!1;else if(pt.__webglFramebuffer===void 0)Bt.setupRenderTarget(E);else if(pt.__hasExternalTextures)Bt.rebindTextures(E,xt.get(E.texture).__webglTexture,xt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Tt=E.depthTexture;if(pt.__boundDepthTexture!==Tt){if(Tt!==null&&xt.has(Tt)&&(E.width!==Tt.image.width||E.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(E)}}const Ct=E.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Lt=xt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Lt[O])?B=Lt[O][V]:B=Lt[O],nt=!0):E.samples>0&&Bt.useMultisampledRTT(E)===!1?B=xt.get(E).__webglMultisampledFramebuffer:Array.isArray(Lt)?B=Lt[V]:B=Lt,y.copy(E.viewport),D.copy(E.scissor),U=E.scissorTest}else y.copy(ut).multiplyScalar(G).floor(),D.copy(bt).multiplyScalar(G).floor(),U=Vt;if(V!==0&&(B=Nl),vt.bindFramebuffer(L.FRAMEBUFFER,B)&&W&&vt.drawBuffers(E,B),vt.viewport(y),vt.scissor(D),vt.setScissorTest(U),nt){const pt=xt.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,pt.__webglTexture,V)}else if(ht){const pt=O;for(let Ct=0;Ct<E.textures.length;Ct++){const Lt=xt.get(E.textures[Ct]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ct,Lt.__webglTexture,V,pt)}}else if(E!==null&&V!==0){const pt=xt.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,pt.__webglTexture,V)}_=-1},this.readRenderTargetPixels=function(E,O,V,W,B,nt,ht,gt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=xt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(pt=pt[ht]),pt){vt.bindFramebuffer(L.FRAMEBUFFER,pt);try{const Ct=E.textures[gt],Lt=Ct.format,Tt=Ct.type;if(!Dt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-W&&V>=0&&V<=E.height-B&&(E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+gt),L.readPixels(O,V,W,B,yt.convert(Lt),yt.convert(Tt),nt))}finally{const Ct=A!==null?xt.get(A).__webglFramebuffer:null;vt.bindFramebuffer(L.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(E,O,V,W,B,nt,ht,gt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=xt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(pt=pt[ht]),pt)if(O>=0&&O<=E.width-W&&V>=0&&V<=E.height-B){vt.bindFramebuffer(L.FRAMEBUFFER,pt);const Ct=E.textures[gt],Lt=Ct.format,Tt=Ct.type;if(!Dt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Wt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Wt),L.bufferData(L.PIXEL_PACK_BUFFER,nt.byteLength,L.STREAM_READ),E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+gt),L.readPixels(O,V,W,B,yt.convert(Lt),yt.convert(Tt),0);const Kt=A!==null?xt.get(A).__webglFramebuffer:null;vt.bindFramebuffer(L.FRAMEBUFFER,Kt);const ae=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await kc(L,ae,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Wt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,nt),L.deleteBuffer(Wt),L.deleteSync(ae),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,V=0){const W=Math.pow(2,-V),B=Math.floor(E.image.width*W),nt=Math.floor(E.image.height*W),ht=O!==null?O.x:0,gt=O!==null?O.y:0;Bt.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,ht,gt,B,nt),vt.unbindTexture()};const Fl=L.createFramebuffer(),Ol=L.createFramebuffer();this.copyTextureToTexture=function(E,O,V=null,W=null,B=0,nt=null){nt===null&&(B!==0?(Vi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),nt=B,B=0):nt=0);let ht,gt,pt,Ct,Lt,Tt,Wt,Kt,ae;const ee=E.isCompressedTexture?E.mipmaps[nt]:E.image;if(V!==null)ht=V.max.x-V.min.x,gt=V.max.y-V.min.y,pt=V.isBox3?V.max.z-V.min.z:1,Ct=V.min.x,Lt=V.min.y,Tt=V.isBox3?V.min.z:0;else{const Ne=Math.pow(2,-B);ht=Math.floor(ee.width*Ne),gt=Math.floor(ee.height*Ne),E.isDataArrayTexture?pt=ee.depth:E.isData3DTexture?pt=Math.floor(ee.depth*Ne):pt=1,Ct=0,Lt=0,Tt=0}W!==null?(Wt=W.x,Kt=W.y,ae=W.z):(Wt=0,Kt=0,ae=0);const Qt=yt.convert(O.format),wt=yt.convert(O.type);let se;O.isData3DTexture?(Bt.setTexture3D(O,0),se=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Bt.setTexture2DArray(O,0),se=L.TEXTURE_2D_ARRAY):(Bt.setTexture2D(O,0),se=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const Xt=L.getParameter(L.UNPACK_ROW_LENGTH),Re=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Xn=L.getParameter(L.UNPACK_SKIP_PIXELS),Ce=L.getParameter(L.UNPACK_SKIP_ROWS),Ei=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ee.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ee.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ct),L.pixelStorei(L.UNPACK_SKIP_ROWS,Lt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Tt);const re=E.isDataArrayTexture||E.isData3DTexture,Ie=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){const Ne=xt.get(E),Se=xt.get(O),be=xt.get(Ne.__renderTarget),Gs=xt.get(Se.__renderTarget);vt.bindFramebuffer(L.READ_FRAMEBUFFER,be.__webglFramebuffer),vt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Gs.__webglFramebuffer);for(let Rn=0;Rn<pt;Rn++)re&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.get(E).__webglTexture,B,Tt+Rn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.get(O).__webglTexture,nt,ae+Rn)),L.blitFramebuffer(Ct,Lt,ht,gt,Wt,Kt,ht,gt,L.DEPTH_BUFFER_BIT,L.NEAREST);vt.bindFramebuffer(L.READ_FRAMEBUFFER,null),vt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||E.isRenderTargetTexture||xt.has(E)){const Ne=xt.get(E),Se=xt.get(O);vt.bindFramebuffer(L.READ_FRAMEBUFFER,Fl),vt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ol);for(let be=0;be<pt;be++)re?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ne.__webglTexture,B,Tt+be):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ne.__webglTexture,B),Ie?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Se.__webglTexture,nt,ae+be):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Se.__webglTexture,nt),B!==0?L.blitFramebuffer(Ct,Lt,ht,gt,Wt,Kt,ht,gt,L.COLOR_BUFFER_BIT,L.NEAREST):Ie?L.copyTexSubImage3D(se,nt,Wt,Kt,ae+be,Ct,Lt,ht,gt):L.copyTexSubImage2D(se,nt,Wt,Kt,Ct,Lt,ht,gt);vt.bindFramebuffer(L.READ_FRAMEBUFFER,null),vt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ie?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(se,nt,Wt,Kt,ae,ht,gt,pt,Qt,wt,ee.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(se,nt,Wt,Kt,ae,ht,gt,pt,Qt,ee.data):L.texSubImage3D(se,nt,Wt,Kt,ae,ht,gt,pt,Qt,wt,ee):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,nt,Wt,Kt,ht,gt,Qt,wt,ee.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,nt,Wt,Kt,ee.width,ee.height,Qt,ee.data):L.texSubImage2D(L.TEXTURE_2D,nt,Wt,Kt,ht,gt,Qt,wt,ee);L.pixelStorei(L.UNPACK_ROW_LENGTH,Xt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Re),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Xn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ce),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ei),nt===0&&O.generateMipmaps&&L.generateMipmap(se),vt.unbindTexture()},this.initRenderTarget=function(E){xt.get(E).__webglFramebuffer===void 0&&Bt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Bt.setTextureCube(E,0):E.isData3DTexture?Bt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Bt.setTexture2DArray(E,0):Bt.setTexture2D(E,0),vt.unbindTexture()},this.resetState=function(){S=0,b=0,A=null,vt.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Je}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}}const Go={type:"change"},Ta={type:"start"},Rl={type:"end"},Es=new Bs,Vo=new xn,xm=Math.cos(70*Ma.DEG2RAD),ue=new F,Te=2*Math.PI,$t={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sr=1e-6;class Mm extends Ih{constructor(t,e=null){super(t,e),this.state=$t.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:ui.ROTATE,TWO:ui.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new kn,this._lastTargetPosition=new F,this._quat=new kn().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new go,this._sphericalDelta=new go,this._scale=1,this._panOffset=new F,this._rotateStart=new At,this._rotateEnd=new At,this._rotateDelta=new At,this._panStart=new At,this._panEnd=new At,this._panDelta=new At,this._dollyStart=new At,this._dollyEnd=new At,this._dollyDelta=new At,this._dollyDirection=new F,this._mouse=new At,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ym.bind(this),this._onPointerDown=Sm.bind(this),this._onPointerUp=Em.bind(this),this._onContextMenu=Pm.bind(this),this._onMouseWheel=Am.bind(this),this._onKeyDown=wm.bind(this),this._onTouchStart=Rm.bind(this),this._onTouchMove=Cm.bind(this),this._onMouseDown=bm.bind(this),this._onMouseMove=Tm.bind(this),this._interceptControlDown=Dm.bind(this),this._interceptControlUp=Lm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Go),this.update(),this.state=$t.NONE}update(t=null){const e=this.object.position;ue.copy(e).sub(this.target),ue.applyQuaternion(this._quat),this._spherical.setFromVector3(ue),this.autoRotate&&this.state===$t.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Te:n>Math.PI&&(n-=Te),s<-Math.PI?s+=Te:s>Math.PI&&(s-=Te),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ue.setFromSpherical(this._spherical),ue.applyQuaternion(this._quatInverse),e.copy(this.target).add(ue),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ue.length();a=this._clampDistance(o*this._scale);const h=o-a;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=ue.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Es.origin.copy(this.object.position),Es.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Es.direction))<xm?this.object.lookAt(this.target):(Vo.setFromNormalAndCoplanarPoint(this.object.up,this.target),Es.intersectPlane(Vo,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Sr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sr||this._lastTargetPosition.distanceToSquared(this.target)>Sr?(this.dispatchEvent(Go),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Te/60*this.autoRotateSpeed*t:Te/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ue.setFromMatrixColumn(e,0),ue.multiplyScalar(-t),this._panOffset.add(ue)}_panUp(t,e){this.screenSpacePanning===!0?ue.setFromMatrixColumn(e,1):(ue.setFromMatrixColumn(e,0),ue.crossVectors(this.object.up,ue)),ue.multiplyScalar(t),this._panOffset.add(ue)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ue.copy(s).sub(this.target);let r=ue.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Te*this._rotateDelta.x/e.clientHeight),this._rotateUp(Te*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Te*this._rotateDelta.x/e.clientHeight),this._rotateUp(Te*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new At,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Sm(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function ym(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Em(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Rl),this.state=$t.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function bm(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=$t.DOLLY;break;case di.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=$t.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=$t.ROTATE}break;case di.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=$t.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=$t.PAN}break;default:this.state=$t.NONE}this.state!==$t.NONE&&this.dispatchEvent(Ta)}function Tm(i){switch(this.state){case $t.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case $t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case $t.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Am(i){this.enabled===!1||this.enableZoom===!1||this.state!==$t.NONE||(i.preventDefault(),this.dispatchEvent(Ta),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Rl))}function wm(i){this.enabled!==!1&&this._handleKeyDown(i)}function Rm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ui.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=$t.TOUCH_ROTATE;break;case ui.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=$t.TOUCH_PAN;break;default:this.state=$t.NONE}break;case 2:switch(this.touches.TWO){case ui.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=$t.TOUCH_DOLLY_PAN;break;case ui.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=$t.TOUCH_DOLLY_ROTATE;break;default:this.state=$t.NONE}break;default:this.state=$t.NONE}this.state!==$t.NONE&&this.dispatchEvent(Ta)}function Cm(i){switch(this._trackPointer(i),this.state){case $t.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case $t.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case $t.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case $t.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=$t.NONE}}function Pm(i){this.enabled!==!1&&i.preventDefault()}function Dm(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Lm(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Um=2,Im="public-hardware",Nm="五金立体库 · 模拟展示",Fm={width:61,depth:12,exitSide:"A",exitReserve:10,centerX:-3.637500000000003,centerZ:0,centerGap:.15},Om=2026,Bm=[{position:[0,0,2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 1 列料框库",metalness:.2,id:"public-hardware-1"},{position:[0,0,.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:1,params:{smallBays:67,largeBays:0,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 2 列料框库",metalness:.2,id:"public-hardware-2"},{position:[0,0,-.475],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 3 列料框库",metalness:.2,id:"public-hardware-3"},{position:[0,0,-2.975],visible:!0,color:"#6895b0",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"binRack",aisle:2,params:{smallBays:53,largeBays:7,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},name:"第 4 列料框库",metalness:.2,id:"public-hardware-4"},{position:[0,0,1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:1,params:{height:9.4,travel:0,lift:1.2,railLength:51},name:"巷道 1 堆垛机",metalness:.2,id:"public-hardware-5"},{position:[0,0,-1.725],visible:!0,color:"#3ba7b9",rotation:[0,0,0],roughness:.55,scale:[1,1,1],type:"stacker",aisle:2,params:{height:9.4,travel:0,lift:1.2,railLength:48},name:"巷道 2 堆垛机",metalness:.2,id:"public-hardware-6"},{position:[-27.3,0,0],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"hardwareConveyorAssembly",params:{length:4.8,width:6.7,height:.81,laneCenters:[-2.975,-.475,.475,2.975]},name:"五金 · 四列对齐输送线总装",metalness:.35,id:"public-hardware-7"},{position:[-23.7375,0,2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81},name:"五金 · 第1列入库专用接驳",metalness:.35,id:"public-hardware-8"},{position:[-23.7375,0,.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:2.3249999999999957,width:.66,height:.81},name:"五金 · 第2列出库专用接驳",metalness:.35,id:"public-hardware-9"},{position:[-23.0375,0,-.475],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81},name:"五金 · 第3列入库专用接驳",metalness:.35,id:"public-hardware-10"},{position:[-23.0375,0,-2.975],visible:!0,color:"#9eacb5",rotation:[0,0,0],roughness:.5,scale:[1,1,1],type:"conveyor",params:{length:3.724999999999998,width:.66,height:.81},name:"五金 · 第4列出库专用接驳",metalness:.35,id:"public-hardware-11"}],zm={version:Um,id:Im,name:Nm,floor:Fm,seed:Om,objects:Bm},Hm=new Set(["#242a2b","#283437","#343e40","#43484b","#35322b","#304b50"]),km=new Set(["#d0d8df","#c3cdd1","#9eafb9","#b0b3b1","#b8bdc1","#929a9f"]);function Cl(i,t={}){const s=new Nt(i).getHSL({}).s<.22,r=["#98734d","#bd9669","#b28d62","#b18b5f","#d4b485"].includes(i),a=Hm.has(i),o=!r&&!a&&(!s||km.has(i)),h=o?bh:zs,l=new h({color:i,roughness:r?.87:a?.88:o?.56:.46,metalness:r||a?0:o?.12:.52,...o?{clearcoat:.18,clearcoatRoughness:.45}:{},...t});return l.userData.industrialSurface=!0,l.userData.surfaceRole=r?"wood":a?"rubber":o?"paint":"metal",l}function Gm(i){let t=i.userData.surfaceRole||"metal";!["wood","rubber"].includes(t)&&i.metalness===0&&i.roughness>=.9&&(t="cloth","clearcoat"in i&&(i.clearcoat=0)),i.userData.surfaceRole=t;const n={metal:{frequency:1600,amplitude:.025,expression:"sin(finishPoint.y * 1600.0 + sin(finishPoint.z * 13.0) * 0.4)"},paint:{frequency:1100,amplitude:.02,expression:"sin(finishPoint.x * 1100.0) * sin(finishPoint.y * 980.0 + finishPoint.z * 830.0)"},cloth:{frequency:950,amplitude:.04,expression:"sin(finishPoint.x * 950.0) * sin(finishPoint.z * 950.0 + finishPoint.y * 950.0)"},rubber:{frequency:1300,amplitude:.025,expression:"sin(finishPoint.x * 1300.0 + finishPoint.y * 710.0) * sin(finishPoint.z * 1100.0)"},wood:{frequency:160,amplitude:.05,expression:"sin(finishPoint.x * 160.0 + sin(finishPoint.z * 9.0) * 4.0)"}}[t];return i.onBeforeCompile=s=>{s.vertexShader=`varying vec3 finishPoint;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
finishPoint = position;`),s.fragmentShader=`varying vec3 finishPoint;
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <roughnessmap_fragment>",`
      #include <roughnessmap_fragment>
      float finishFootprint = length(fwidth(finishPoint * ${n.frequency.toFixed(1)}));
      float finishWeight = 1.0 - smoothstep(0.4, 2.0, finishFootprint);
      float finishGrain = ${n.expression};
      roughnessFactor = clamp(roughnessFactor + finishGrain * ${n.amplitude.toFixed(3)} * finishWeight, 0.04, 1.0);
    `)},i.customProgramCacheKey=()=>"industrial-finish-v1-"+t,i}function Vm({box:i,cylinder:t},e,n,s=.18,r=.2){i(s,.018,r,e,.009,n,"#939d9e");for(const a of[-s*.32,s*.32])for(const o of[-r*.32,r*.32])t(.011,.003,e+a,.02,n+o,"y","#bcc1bf"),t(.008,.01,e+a,.026,n+o,"y","#566165")}function Wm({box:i,cylinder:t,rod:e},{length:n,width:s,height:r}){for(const l of[-n*.43,n*.43])for(const c of[-s*.44,s*.44])t(.045,.012,l,.006,c,"y","#343e40"),t(.012,.06,l,.038,c,"y","#aab3b2"),t(.021,.012,l,.065,c,"y","#616c70");for(const l of[-n*.41,n*.41])for(const c of[-1,1]){const f=c*(s/2+.018);i(.11,.07,.012,l,r-.06,f,"#6f7e81"),t(.008,.014,l,r-.04,f+c*.012,"z","#b2bcba"),t(.009,.065,l,r-.095,f,"x","#b2bcba")}const a=s/2-.06;e([-n*.39,r-.23,a],[n*.35,r-.23,a],.012,"#283437");for(const l of[-n*.32,0,n*.32])i(.025,.025,.04,l,r-.23,a,"#707e7d");const o=-n*.24,h=s/2+.055;i(.13,.12,.05,o,r-.12,h,"#d1b454"),t(.017,.016,o,r-.1,h+.034,"z","#aa3d32"),t(.013,.035,o,r-.19,h,"y","#39474a")}function Xm({box:i,cylinder:t},{width:e,depth:n,height:s}){const r=s-.16,a=.16;for(const o of[-1,1]){const h=o*e*.34,l=-n*.38;i(.027,r-a,.036,h,(r+a)/2,l,"#333f42"),i(.012,r-a-.05,.018,h+o*.024,(r+a)/2,l,"#b3bcba");for(const c of[a,r])t(.052,.06,h,c,l,"z","#586567"),t(.023,.075,h,c,l,"z","#abb7b4");for(let c=a+.07;c<r-.06;c+=.14)i(.036,.025,.012,h,c,l+.025,"#8c9998");i(.08,.1,.045,h,r-.14,l+.055,"#485f64"),i(.015,.025,.008,h,r-.13,l+.083,"#bd9c4e")}}const Ii=new F;function Oe(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),h=Math.PI/4;Ii.copy(t),Ii[n]=0,Ii.normalize();const l=.5*a/(a+o),c=1-Ii.angleTo(i)/h;return Math.sign(Ii[e])===1?c*l:o/(a+o)+l+l*(1-c)}class Xi extends An{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const h=new F,l=new F,c=new F(t,e,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,p=this.attributes.normal.array,d=this.attributes.uv.array,v=f.length/6,x=new F,g=.5/a;for(let u=0,R=0;u<f.length;u+=3,R+=2)switch(h.fromArray(f,u),l.copy(h),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),f[u+0]=c.x*Math.sign(h.x)+l.x*r,f[u+1]=c.y*Math.sign(h.y)+l.y*r,f[u+2]=c.z*Math.sign(h.z)+l.z*r,p[u+0]=l.x,p[u+1]=l.y,p[u+2]=l.z,Math.floor(u/v)){case 0:x.set(1,0,0),d[R+0]=Oe(x,l,"z","y",r,n),d[R+1]=1-Oe(x,l,"y","z",r,e);break;case 1:x.set(-1,0,0),d[R+0]=1-Oe(x,l,"z","y",r,n),d[R+1]=1-Oe(x,l,"y","z",r,e);break;case 2:x.set(0,1,0),d[R+0]=1-Oe(x,l,"x","z",r,t),d[R+1]=Oe(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),d[R+0]=1-Oe(x,l,"x","z",r,t),d[R+1]=1-Oe(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),d[R+0]=1-Oe(x,l,"x","y",r,t),d[R+1]=1-Oe(x,l,"y","x",r,e);break;case 5:x.set(0,0,-1),d[R+0]=Oe(x,l,"x","y",r,t),d[R+1]=1-Oe(x,l,"y","x",r,e);break}}static fromJSON(t){return new Xi(t.width,t.height,t.depth,t.segments,t.radius)}}const Pl={hardwareConveyorAssembly:{length:4.8,width:4.4,height:.81},hardwareLift:{width:1.15,depth:1.25,height:1.9,platformHeight:.72}},Ym={hardwareConveyorAssembly:[["length","总长 · m",2,8,.01],["width","总宽 · m",2,8,.01],["height","输送面高度 · m",.5,1.5,.01]],hardwareLift:[["width","平台宽度 · m",.6,3,.01],["depth","平台长度 · m",.6,3,.01],["height","机架高度 · m",1,4,.05],["platformHeight","平台高度 · m",.3,3,.01]]};function qm(i,t){const e=i.params,n="#929a9f",s="#38434d",r="#c2c7c9";let a=t,o=null;const h=new Map;function l(d,v,x,g,u,R,C=n){h.has(C)||h.set(C,Cl(C));const T=new xe(Math.min(d,v,x)>=.15?new Xi(d,v,x,1,Math.min(.018,Math.min(d,v,x)*.08)):new An(d,v,x),h.get(C).clone());return T.position.set(g,u,R),T.userData={id:i.id,slot:o,tint:!1},a.add(T),T}function c(d,v,x=.035,g=n){const u=new F(...d),R=new F(...v),C=R.clone().sub(u),T=u.clone().add(R).multiplyScalar(.5),P=l(x,C.length(),x,...T.toArray(),g);return P.quaternion.setFromUnitVectors(new F(0,1,0),C.normalize()),P}function f(d,v,x,g,u,R="z",C=r){const T=l(.1,.1,.1,x,g,u,C);return T.geometry.dispose(),T.geometry=new Wi(d,d,v,16),R==="z"&&(T.rotation.x=Math.PI/2),R==="x"&&(T.rotation.z=Math.PI/2),T}function p(d,v,x,g="x",u="#587f90"){f(.11,.27,d,v,x,g,u);for(let R=0;R<5;R++)f(.12,.015,d+(g==="x"?(R-2)*.045:0),v,x+(g==="z"?(R-2)*.045:0),g,s);l(.18,.12,.14,d,v+.12,x,n)}if(i.type==="hardwareConveyorAssembly"){let C=function(P,S,b,A,_=!1){const m=_?P*v:P*d,y=_?S*d:S*(g?1:v),D=new Xe;t.add(D),D.position.set(b*d,0,A*v),_&&(D.rotation.y=Math.PI/2),a=D,Wm({box:l,cylinder:f,rod:c},{length:m,width:y,height:x});for(const I of[-y/2,y/2])l(m,.09,.035,0,x-.075,I,n),l(m,.012,.023,0,x+.018,I-Math.sign(I)*.025,"#387b5c");const U=Math.max(5,Math.floor(m/.115));for(let I=0;I<U;I++)f(.026,y-.065,-m/2+.055+I*(m-.11)/(U-1),x-.026,0,"z",r);for(const I of[-m*.43,m*.43])for(const k of[-y*.44,y*.44])l(.04,x-.11,.045,I,(x-.11)/2,k,n),f(.028,.026,I,.018,k,"y",r);for(const I of[-m*.43,m*.43])l(.035,.05,y*.83,I,x*.35,0,n),c([I,.14,-y*.43],[I,x*.34,y*.43],.017,n);for(const I of[-m*.45,0,m*.45])for(const k of[-y*.49,y*.49])l(.025,.13,.025,I,x+.065,k,s),c([I,x+.12,k],[I+(I>0?-.16:.16),x+.12,k],.01,s);p(m*.14,x-.17,0,"z","#397ba2"),l(.17,.11,.12,-m*.13,x-.2,0,s);for(const I of[-1,1]){l(m-.08,.025,.025,0,x-.055,I*(y/2-.055),"#315f49");for(const k of[-m*.4,m*.4])l(.055,.04,.035,k,x+.1,I*y*.49,s),l(.015,.018,.006,k,x+.1,I*(y*.49+.021),"#cf9d45")}for(const I of[-m*.43,m*.43])for(const k of[-y*.44,y*.44])f(.011,.055,I,.047,k,"y",s);a=t};const d=e.length/4.8,v=e.width/4.4,x=e.height,g=Array.isArray(e.laneCenters)&&e.laneCenters.length===4,u=.66*(g?1:v),R=g?e.laneCenters.map(P=>P/v):[-1.73,-.47,.47,1.73],T=[-2.15*v,...R.slice(0,-1).map((P,S)=>(P+R[S+1])*v/2),2.15*v];for(const P of[-.43,.43])for(let S=0;S<T.length-1;S++){const b=T[S],A=T[S+1];C((A-b-.018)/v,.8,P,(b+A)/2/v,!0)}for(const P of R){C(1.55,.66,-1.625,P),C(1.55,.66,1.625,P);for(const S of[-1,1])S>0&&l(.035,.14,u,S*2.38*d,x+.045,P*v,n),l(.045,.08,u-.04,S*.84*d,x-.065,P*v,n);for(const S of[-.43,.43])for(const b of[-1,1])l(.73*d,.012,.025,S*d,x+.006,P*v+b*u*.32,"#34755b")}for(const P of[R[0],R[2]])l(.2,.26,.085,-.86*d,x-.32,P*v,n),l(.08,.05,.012,-.86*d,x-.26,P*v+.05,"#477e91");if(typeof document<"u")for(const[P,S]of[...R].sort((b,A)=>A-b).entries()){const b=document.createElement("canvas");b.width=256,b.height=112;const A=b.getContext("2d");A.fillStyle="#152b3e",A.fillRect(0,0,256,112),A.strokeStyle="#62d1bd",A.lineWidth=6,A.strokeRect(3,3,250,106),A.fillStyle="#ffffff",A.font="bold 66px sans-serif",A.textAlign="center",A.fillText(String(101+P),128,79);const _=new Eh(b),m=new ph(new gl({map:_,depthTest:!1}));m.userData.ownedTexture=_,m.position.set(-2.54*d,x+.35,S*v),m.scale.set(.55,.24,1),t.add(m)}t.userData.hardwareTransverseRows=2,t.userData.hardwareConveyorSize=[e.length,e.width,e.height],t.userData.hardwareLaneCenters=R.map(P=>P*v)}else if(i.type==="hardwareLift"){const d=e.width,v=e.depth,x=e.height,g=e.platformHeight;Xm({box:l,cylinder:f},{width:d,depth:v,height:x});for(const u of[-d*.48,d*.48])for(const R of[-v*.48,v*.48])l(.065,x,.065,u,x/2,R,n),l(.16,.035,.16,u,.018,R,r),l(.018,x-.1,.025,u*.9,x/2,R,s);for(const u of[-v*.48,v*.48])l(d,.08,.06,0,x,u,n);l(d,.045,v,0,.055,0,n);for(const u of[-d*.43,d*.43])l(.065,.12,v*.84,u,g-.09,0,n);for(let u=0;u<7;u++)f(.035,d*.8,0,g,-v*.36+u*v*.72/6,"x",r);for(const u of[-v*.44,v*.44])l(d*.86,.08,.035,0,g-.05,u,s);p(d*.55,x-.18,v*.38,"x"),signal(-d*.55,x-.2,v*.48)}else throw Error("不属于公开五金设备类型")}function jm(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,h=new ke;let l=0;for(let c=0;c<i.length;++c){const f=i[c];let p=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;h.addGroup(l,d,c),l+=d}}if(e){let c=0;const f=[];for(let p=0;p<i.length;++p){const d=i[p].index;for(let v=0;v<d.count;++v)f.push(d.getX(v)+c);c+=i[p].attributes.position.count}h.setIndex(f)}for(const c in r){const f=Wo(r[c]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;h.setAttribute(c,f)}for(const c in a){const f=a[c][0].length;if(f===0)break;h.morphAttributes=h.morphAttributes||{},h.morphAttributes[c]=[];for(let p=0;p<f;++p){const d=[];for(let x=0;x<a[c].length;++x)d.push(a[c][x][p]);const v=Wo(d);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;h.morphAttributes[c].push(v)}}return h}function Wo(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const c=i[l];if(t===void 0&&(t=c.array.constructor),t!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=c.itemSize),e!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*e}const a=new t(r),o=new Ue(a,e,n);let h=0;for(let l=0;l<i.length;++l){const c=i[l];if(c.isInterleavedBufferAttribute){const f=h/e;for(let p=0,d=c.count;p<d;p++)for(let v=0;v<e;v++){const x=c.getComponent(p,v);o.setComponent(p+f,v,x)}}else a.set(c.array,h);h+=c.count*e}return s!==void 0&&(o.gpuType=s),o}const bs={...Pl,binRack:{smallBays:40,largeBays:24,smallLevels:20,largeLevels:14,smallPitch:.65,largePitch:.9,smallStep:.45,largeStep:.64,depth:.8,loaded:!0},rack:{bays:5,levels:4,bayWidth:1.8,levelHeight:1.55,depth:1.4,loaded:!0},shuttle:{bays:10,rows:2,levels:4,bayWidth:2.099,levelHeight:1.5,baseHeight:.525,depth:3.1,loaded:!0},barRack:{bays:6,lanes:6,levels:11,bayWidth:2.6,depth:1.55,height:6.5,loaded:!0},rgv:{railLength:23.3,travel:0},shuttleCar:{width:1.35},robot:{height:2.7},machine:{width:4.2,depth:2.5,height:1.8},stacker:{height:7,travel:0,lift:1.2,railLength:18},conveyor:{length:7,width:1.3,height:.8},turn:{width:1.3,height:.8},pallet:{cargo:!0},agv:{cargo:!0}},Km={...Ym,binRack:[["smallBays","小料框排数",0,100,1],["largeBays","大料筐排数",0,100,1],["smallLevels","小料框层数",1,30,1],["largeLevels","大料筐层数",1,30,1],["smallPitch","小框排距 · m",.3,2,.01],["largePitch","大筐排距 · m",.4,3,.01],["smallStep","小框层高 · m",.2,1.5,.01],["largeStep","大筐层高 · m",.3,2,.01],["depth","货架深度 · m",.4,2,.01]],rack:[["bays","货架列数",1,12,1],["levels","货架层数",1,8,1],["bayWidth","单列宽度 · m",1,3,.1],["levelHeight","层高 · m",1,2.5,.1],["depth","货架深度 · m",1,3,.1]],shuttle:[["bays","货架列数",1,16,1],["rows","深位数量",1,4,1],["levels","货架层数",1,8,1],["bayWidth","列间距 · m",1,3,.01],["levelHeight","层间距 · m",1,2.5,.1],["baseHeight","底层高度 · m",.2,1,.025],["depth","整体深度 · m",1,6,.1]],barRack:[["bays","货架列数",1,12,1],["lanes","每列条数",1,8,1],["levels","货架层数",1,15,1],["bayWidth","列间距 · m",1,4,.1],["depth","货架深度 · m",1,3,.1],["height","总高度 · m",3,10,.1]],rgv:[["railLength","轨道长度 · m",4,32,.1],["travel","行走位置 · m",-14,14,.1]],shuttleCar:[["width","车体宽度 · m",.8,2,.1]],robot:[["height","示意高度 · m",1.5,4,.1]],machine:[["width","设备宽度 · m",1,8,.1],["depth","设备深度 · m",1,6,.1],["height","设备高度 · m",.8,4,.1]],stacker:[["railLength","轨道长度 · m",4,120,.1],["height","立柱高度 · m",3,20,.1],["travel","行走位置 · m",-8,8,.1],["lift","载货台高度 · m",.5,13,.1]],conveyor:[["length","输送长度 · m",.2,18,.01],["width","输送宽度 · m",.4,2.5,.1],["height","输送高度 · m",.5,1.5,.1]],turn:[["width","转角宽度 · m",.8,2,.1],["height","输送高度 · m",.5,1.5,.1]],pallet:[],agv:[]};function Zm(i){const t=new Set,e=new Set;i.userData.beltTexture&&t.add(i.userData.beltTexture),i.traverse(n=>{var s;if(n.userData.ownedTexture&&t.add(n.userData.ownedTexture),(s=n.geometry)==null||s.dispose(),n.material)for(const r of[n.material].flat()){e.add(r);for(const a of["map","bumpMap","roughnessMap","normalMap"])r[a]&&t.add(r[a])}}),t.forEach(n=>n.dispose()),e.forEach(n=>n.dispose())}function $m(i){var T,P;const t=new Xe,e=i.params;let n=t,s=null;const r="#354148",a=i.color,o="#a4abad",h="#98734d",l="#bd9669";function c(S,b,A,_,m,y,D=a,U=!1){const I=new xe(s===null&&!["binRack","rack","shuttle","barRack"].includes(i.type)&&Math.min(S,b,A)>=.15?new Xi(S,b,A,1,Math.min(.025,Math.min(S,b,A)*.1)):new An(S,b,A),Cl(D,U?{roughness:i.roughness,metalness:i.metalness}:{}));return I.position.set(_,m,y),I.castShadow=!0,I.receiveShadow=!0,I.userData.id=i.id,I.userData.tint=U,I.userData.slot=s,n.add(I),I}function f(S,b,A,_,m,y="z"){const D=new xe(new Wi(b,b,S,12),new zs({color:o,metalness:.65,roughness:.3}));D.rotation[y==="z"?"x":"z"]=Math.PI/2,D.position.set(A,_,m),D.castShadow=!0,D.userData.id=i.id,D.userData.slot=s,n.add(D)}function p(S,b,A,_,m,y,D=a){const U=c(S,b,A,_,m,y,D,D===a);return U.geometry.dispose(),U.geometry=new Xi(S,b,A,2,Math.min(S,b,A)*.12),U}function d(S,b,A=o,_=.035){const m=new F(...S),y=new F(...b),D=y.clone().sub(m),U=m.clone().add(y).multiplyScalar(.5);c(_,D.length(),_,U.x,U.y,U.z,A).quaternion.setFromUnitVectors(new F(0,1,0),D.normalize())}function v(S,b,A){c(.07,.18,.07,S,b,A,r);for(let _=0;_<3;_++)c(.09,.055,.09,S,b+.12+_*.06,A,["#65d2a6","#efb84e","#d86363"][_])}function x(S,b,A){p(.35,.6,.3,S,b,A,"#d0d8df"),c(.21,.16,.014,S,b+.1,A+.16,"#132a3c"),c(.16,.09,.015,S,b+.11,A+.17,"#4fafa5");for(let _=0;_<3;_++)c(.035,.035,.016,S+(_-1)*.07,b-.05,A+.17,["#65d2a6","#efb84e","#d86363"][_]);v(S,b+.43,A)}function g(S,b,A,_,m){for(const y of[-S/2,S/2]){for(let D=0;D<Math.ceil(b/m);D++){const U=.18+D*m,I=Math.min(b-.1,U+m);I<=U||(d([y,U,-A/2],[y,I,A/2]),d([y,U,A/2],[y,I,-A/2]))}for(const D of[-A/2,A/2])c(.14,.5,.14,y,.3,D,"#e5aa3c"),c(.15,.055,.15,y,.2,D,r),c(.15,.055,.15,y,.4,D,r)}for(let y=0;y<=_;y++){const D=y*S/_-S/2;for(const U of[-A/2,A/2]){c(.24,.035,.24,D,.02,U,o);for(let I=.6;I<b;I+=.35)c(.027,.045,.004,D,I,U+Math.sign(U)*.047,"#132335")}}}function u(S,b,A,_=!0){for(let m=0;m<3;m++){c(1.15,.055,.16,S,b+.035,A+(m-1)*.4,h);for(const y of[-.43,0,.43])c(.16,.11,.16,S+y,b+.11,A+(m-1)*.4,h)}for(let m=0;m<5;m++)c(.17,.055,1.05,S+(m-2)*.24,b+.19,A,"#b18b5f");if(_){for(let m=0;m<2;m++)for(const y of[-1,1])for(const D of[-1,1]){const U=S+y*.258,I=A+D*.233,k=b+.39+m*.34;if(c(.502,.325,.45,U,k,I,m?l:"#b28d62"),c(.035,.012,.451,U,k+.168,I,"#d4b485"),D===1){c(.14,.09,.006,U+.09,k,I+.228,"#e4e1d3");for(let z=0;z<4;z++)c(.007,.05,.007,U+.04+z*.024,k,I+.233,"#344052")}}for(const m of[-.33,.33])c(.025,.7,.952,S+m,b+.57,A,"#445464"),c(.025,.012,.952,S+m,b+.923,A,"#445464")}}function R(S,b,A,_=0,m=0,y=!1){if(y){c(b,.18,S,_,A,m,r);for(let U=-S/2+.12;U<S/2;U+=.24)f(b-.12,.065,_,A+.12,m+U,"x");for(const U of[-1,1])c(.08,.25,S,_+U*b/2,A+.12,m,a,!0)}else{c(S,.18,b,_,A,m,r);for(let U=-S/2+.12;U<S/2;U+=.24)f(b-.12,.065,_+U,A+.12,m);for(const U of[-1,1])c(S,.25,.08,_,A+.12,m+U*b/2,a,!0)}for(const U of[-1,1])for(const I of[-1,1])c(.1,A,.1,_+U*(y?b:S)*.38,A/2,m+I*(y?S:b)*.38,r);for(const U of[-1,1])for(const I of[-1,1]){const k=_+U*(y?b:S)*.38,z=m+I*(y?S:b)*.38;c(.22,.035,.22,k,.02,z,o),c(.13,.12,.13,k,.1,z,r)}const D=c(.28,.25,.38,_+(y?b/2:S*.35),A-.2,m+(y?S*.35:b/2+.16),o);for(let U=0;U<4;U++)c(.29,.02,.4,D.position.x,A-.3+U*.045,D.position.z,r);for(const U of[-1,1]){const I=_+(y?b/2+.04:U*S*.35),k=m+(y?U*S*.35:b/2+.04);c(.07,.12,.08,I,A+.22,k,"#e4ae43"),c(.025,.04,.09,I,A+.24,k,"#132335")}}if(Pl[i.type]||i.type==="conveyor"&&e.exhibitionDetail)qm(i,t);else if(i.type==="binRack"){let b=-(e.smallBays*e.smallPitch+e.largeBays*e.largePitch)/2,A=0;for(const[_,m,y,D,U]of[[e.smallBays,e.smallLevels,e.smallPitch,e.smallStep,!1],[e.largeBays,e.largeLevels,e.largePitch,e.largeStep,!0]]){if(!_)continue;const I=m*D+.2;for(let k=0;k<=_;k++)for(const z of[-1,1]){const Z=b+k*y,G=z*e.depth/2;if(c(.045,I,.045,Z,I/2,G,r),c(.012,I,.012,Z-.028,I/2,G+z*.016,o),c(.012,I,.012,Z+.028,I/2,G+z*.016,o),Vm({box:c,cylinder:(X,et,ut,bt,Vt,Ht,kt)=>{const q=c(X*2,et,X*2,ut,bt,Vt,kt);return q.geometry.dispose(),q.geometry=new Wi(X,X,et,6),Ht==="z"&&(q.rotation.x=Math.PI/2),Ht==="x"&&(q.rotation.z=Math.PI/2),q}},Z,G,.13,.17),k===0||k===_){for(let X=.22;X<I-.1;X+=D)c(.02,.04,.004,Z,X,G+z*.026,"#1c292e"),c(.065,.085,.012,Z,X-.045,G+z*.035,o);c(.09,.42,.07,Z,.23,G,"#c3a24b")}}for(let k=0;k<m;k++){const z=.15+k*D;for(const Z of[-1,1])c(_*y,.045,.04,b+_*y/2,z,Z*e.depth/2,a,!0);for(let Z=0;Z<_;Z++){const G=b+(Z+.5)*y;for(const X of[-1,1])c(.035,.025,e.depth,G+X*y*.36,z,0,o);if(e.loaded){s=A+Z*m+k;const X=(T=i.binSizes)==null?void 0:T[s],et=y*(X===2?.94:.82),ut=D*(X===2?.82:.72),bt=e.depth*.85,Vt=i.binSizes?X===1?"#9ba9aa":X===2?"#aab0ac":"#8b8b91":U?"#aab0ac":"#9ba9aa";c(et,.025,bt,G,z+.04,0,Vt);for(const Ht of[-1,1]){c(et,ut,.024,G,z+ut/2+.05,Ht*bt/2,Vt),c(.024,ut,bt,G+Ht*et/2,z+ut/2+.05,0,Vt),c(et,.035,.045,G,z+ut+.05,Ht*bt/2,o),c(.12,.055,.026,G,z+ut*.55,Ht*(bt/2+.016),"#d9e0d9"),c(.13,.035,.026,G,z+ut*.85,Ht*(bt/2+.016),r);for(const kt of[-1,1])c(.024,ut*.82,.012,G+kt*(et/2-.022),z+ut*.51+.05,Ht*(bt/2+.02),o);for(const kt of[-.32,0,.32])c(.018,ut*.65,.012,G+et*kt,z+ut*.43+.05,Ht*(bt/2+.019),Vt);c(et*.82,.018,.028,G,z+.1,Ht*(bt/2+.012),o)}s=null}}}for(const k of[b,b+_*y])for(let z=0;z<m;z+=2)d([k,.15+z*D,-e.depth/2],[k,Math.min(I,(z+2)*D),e.depth/2]);A+=_*m,b+=_*y}}else if(i.type==="shuttle"){const S=e.bays*e.bayWidth,b=e.baseHeight+e.levels*e.levelHeight;g(S,b,e.depth,e.bays,e.levelHeight);for(let A=0;A<=e.bays;A++)for(let _=0;_<=e.rows;_++){const m=A*e.bayWidth-S/2,y=_*e.depth/e.rows-e.depth/2;c(.09,b,.09,m,b/2,y,r),c(.22,.05,.22,m,.025,y,r)}for(let A=0;A<e.levels;A++){const _=e.baseHeight+A*e.levelHeight;for(let m=0;m<=e.rows;m++)c(S,.12,.08,0,_,m*e.depth/e.rows-e.depth/2,a,!0);for(let m=0;m<e.bays;m++){const y=(m+.5)*e.bayWidth-S/2;for(let D=0;D<e.rows;D++){const U=(D+.5)*e.depth/e.rows-e.depth/2;for(const I of[-1,1])c(e.bayWidth-.15,.08,.07,y,_,U+I*.52,o);e.loaded&&(s=(A*e.bays+m)*e.rows+D,u(y,_+.06,U,!0),s=null)}}}}else if(i.type==="barRack"){const S=e.bays*e.bayWidth,b=(e.height-.4)/e.levels;g(S,e.height,e.depth,e.bays,b*2);for(let A=0;A<=e.bays;A++)for(const _ of[-1,1])c(.08,e.height,.08,A*e.bayWidth-S/2,e.height/2,_*e.depth/2,r);for(let A=0;A<e.levels;A++){const _=.25+A*b;for(const m of[-1,1])c(S,.055,.06,0,_,m*e.depth/2,a,!0);for(let m=0;m<e.bays;m++)for(let y=0;y<e.lanes;y++){const D=(m+(y+.5)/e.lanes)*e.bayWidth-S/2;c(.03,.04,e.depth,D,_,0,o),e.loaded&&(s=(A*e.bays+m)*e.lanes+y,f(e.depth-.08,.065,D,_+.1,0),s=null)}}}else if(i.type==="rgv"){for(const b of[-.7,.7])c(e.railLength,.05,.1,0,.03,b,o);const S=new Xe;t.add(S),t.userData.carriage=S,n=S,p(4.4,.35,1.8,e.travel,.35,0),x(e.travel+1.9,.78,-.65);for(const b of[-.94,.94]){c(4.2,.09,.08,e.travel,.33,b,"#162a3a");for(let A=-4;A<=4;A++)c(.19,.08,.09,e.travel+A*.43,.34,b,"#e5aa3c")}for(const b of[-1,1]){R(1.8,1.6,.7,e.travel+b*1.1,0);for(const A of[-.9,.9])f(.13,.19,e.travel+b*1.55,.22,A)}c(.4,.4,.3,e.travel+2,.85,0,r)}else if(i.type==="shuttleCar"){p(e.width,.23,1.05,0,.23,0),c(e.width*.8,.04,.5,0,.37,0,r);for(const S of[-e.width*.4,e.width*.4])c(.12,.04,.2,S,.38,0,"#e5aa3c");for(const S of[-1,1]){c(e.width-.1,.08,.12,0,.43,S*.4,o);for(const b of[-.4,.4])f(.12,.12,b,.14,S*.52)}}else if(i.type==="machine"){c(e.width,.25,e.depth,0,.15,0,r),p(e.width*.85,e.height*.7,e.depth*.6,0,e.height*.45,-e.depth*.15,"#9eafb9");for(const S of[-1,1])c(e.width*.28,e.height*.52,.025,S*e.width*.22,e.height*.47,e.depth*.155,"#172e3e"),c(.035,e.height*.44,.04,S*e.width*.08,e.height*.47,e.depth*.18,o);for(let S=0;S<6;S++)c(.24,.025,.028,e.width*.35,e.height*.24+S*.06,e.depth*.17,r);x(e.width*.43,e.height*.53,e.depth*.4),c(e.width*.65,.12,e.depth*.8,0,e.height*.4,0,o);for(const S of[-1,1])c(.15,e.height,.15,S*e.width*.4,e.height/2,-e.depth*.35,a,!0);c(e.width,.2,.4,0,e.height,-e.depth*.35,a,!0),c(.35,.5,.25,e.width*.4,e.height*.5,e.depth*.4,r),c(.25,.18,.02,e.width*.4,e.height*.58,e.depth*.4+.14,"#5ac6c0")}else if(i.type==="robot"){p(.8,.4,.8,0,.2,0,r),f(.4,.28,0,.6,0);for(const A of[-1,1])for(const _ of[-1,1])c(.09,.035,.09,A*.3,.42,_*.3,o);f(.38,.18,0,e.height*.43,0),f(.32,.15,e.height*.28,e.height*.7,0),f(.29,.12,e.height*.59,e.height*.64,0),c(.075,e.height*.38,.08,-.17,e.height*.4,-.12,r),d([0,e.height*.62,-.18],[e.height*.5,e.height*.75,-.18],r,.065);const S=c(.27,e.height*.5,.3,0,e.height*.43,0,a,!0);S.rotation.z=-.3;const b=c(e.height*.6,.24,.26,e.height*.28,e.height*.7,0,a,!0);b.rotation.z=.2,c(.2,.55,.2,e.height*.59,e.height*.64,0,o),c(.5,.07,.4,e.height*.59,e.height*.36,0,r)}else if(i.type==="rack"){const S=e.bays*e.bayWidth;g(S,e.levels*e.levelHeight+.3,e.depth,e.bays,e.levelHeight);for(let b=0;b<=e.bays;b++)for(const A of[-1,1]){const _=b*e.bayWidth-S/2;c(.09,e.levels*e.levelHeight+.3,.09,_,(e.levels*e.levelHeight+.3)/2,A*e.depth/2,r),c(.22,.06,.22,_,.03,A*e.depth/2,r)}for(let b=0;b<e.levels;b++){const A=.24+b*e.levelHeight;for(const _ of[-1,1])c(S,.13,.09,0,A,_*e.depth/2,a,!0);for(let _=0;_<e.bays;_++){const m=(_+.5)*e.bayWidth-S/2;c(e.bayWidth-.1,.05,e.depth-.1,m,A,0,o),e.loaded&&(s=b*e.bays+_,u(m,A+.04,0,!0),s=null)}}for(const b of[-S/2,S/2])for(let A=0;A<e.levels;A++){const _=c(.05,Math.hypot(e.levelHeight,e.depth),.05,b,(A+.5)*e.levelHeight,0,o);_.rotation.x=(A%2?1:-1)*Math.atan(e.depth/e.levelHeight)}}else if(i.type==="stacker"){const S="#e99832",b="#1d2b38",A="#c3cdd1",_="#8d9ca5",m=e.travel,y=0;c(e.railLength,.09,.17,0,.07,y,_),c(e.railLength,.045,.32,0,.022,y,b);for(let X=-e.railLength/2+.3;X<e.railLength/2;X+=.9){c(.34,.035,.65,X,.02,y,b);for(const et of[-.22,.22])c(.07,.045,.07,X,.045,y+et,_)}const D=new Xe;t.add(D),t.userData.carriage=D,n=D,p(2.65,.1,.8,m,.08,y,b),p(2.3,.04,.85,m,.16,y,A);for(const X of[-1.04,1.04])f(.26,.22,m+X,.24,y),c(.4,.12,.42,m+X,.48,y,S),c(.2,.11,.25,m+X*1.18,.32,y,b);const U=m+.67,I="#d5ae35",k=c(.28,e.height-.25,.32,U,(e.height+.25)/2,y,"#aeb4b6");k.userData.singleMast=!0;for(const X of[-1,1])c(.055,e.height-.3,.035,U+X*.11,(e.height+.3)/2,y+.178,b),c(.027,e.height-.35,.04,U+X*.075,(e.height+.35)/2,y+.197,_);c(.32,.2,.38,U,.25,y,b),p(.48,.1,.47,U,e.height+.05,y,b);for(const X of[-.16,.16])f(.12,.09,U,e.height+.12,y+X),c(.13,.055,.1,U-.24,e.height+.07,y+X,b);p(.36,.3,.34,m+1.02,.4,y,"#913f3c"),f(.3,.14,m+1.02,.4,y-.23);for(const X of[-.1,.1])c(.018,e.height-.3,.018,U+.19,(e.height+.3)/2,y+X,b);c(.045,e.height-.4,.065,U-.19,(e.height+.4)/2,y-.12,b);for(let X=.5;X<e.height;X+=.28)c(.055,.025,.08,U-.19,X,y-.12,_);p(.34,2.05,.44,m+1.06,1.45,y-.02,A),c(.025,1.85,.012,m+.94,1.45,y+.209,b),c(.17,.14,.016,m+1.06,1.65,y+.211,b),c(.13,.09,.018,m+1.06,1.66,y+.223,"#4c9b9b"),c(.022,.16,.022,m+.96,1.28,y+.215,b);for(let X=0;X<4;X++)c(.2,.014,.016,m+1.06,.63+X*.043,y+.209,b);v(m+1.06,2.6,y-.02);for(const X of[-1.15,1.15])c(.23,.1,.04,m+X,.58,y+.45,"#efb34e"),c(.08,.11,.045,m+X,.58,y+.475,b);const z=new Xe;D.add(z),t.userData.lift=z,n=z,p(1.08,.12,1.05,m,e.lift+.06,y,b),c(1.02,.025,1,m,e.lift+.13,y,A),c(.12,.58,.42,U-.16,e.lift+.32,y,I);for(const X of[.1,.51])for(const et of[-.17,.17])f(.08,.055,U-.19,e.lift+X,y+et);const Z=new Xe;z.add(Z),t.userData.loadGuard=Z,n=Z;for(const X of[-.52,.52]){for(const et of[-.51,.51])c(.045,.76,.045,m+X,e.lift+.53,y+et,I);for(const et of[.4,.65,.91])c(.045,.045,1.065,m+X,e.lift+et,y,I);for(const et of[-.25,0,.25])c(.025,.72,.025,m+X,e.lift+.53,y+et,I);c(.055,.08,1.065,m+X,e.lift+.18,y,b)}n=z;const G=new Xe;z.add(G),t.userData.fork=G,n=G;for(const X of[-.18,.18])p(.24,.09,1.12,m+X,e.lift+.07,y,_),c(.17,.07,.94,m+X,e.lift+.11,y,A),c(.105,.055,.78,m+X,e.lift+.145,y,_),c(.11,.045,.15,m+X,e.lift+.155,y+.315,b);n=z;for(const X of[-.63,.63])c(.055,.16,.08,m+X,e.lift+.24,y+.52,"#e7b54c"),c(.035,.07,.09,m+X,e.lift+.26,y+.57,b);n=D}else if(i.type==="conveyor")R(e.length,e.width,e.height);else if(i.type==="turn")R(2.8,e.width,e.height,-.75,0),R(2.8,e.width,e.height,.65,1.1,!0);else if(i.type==="pallet")u(0,0,0,e.cargo);else if(i.type==="agv"){p(1.55,.35,1.2,0,.32,0),p(1.6,.12,1.24,0,.2,0,"#152b3c"),c(1.35,.04,.1,0,.48,.58,"#60d4b2"),c(.16,.12,.16,.6,.57,-.4,"#152b3c"),c(.18,.025,.18,.6,.65,-.4,"#69ceb9");for(const S of[-.8,.8])c(.03,.08,.82,S,.31,0,"#e5aa3c"),c(.04,.06,.2,S,.32,.4,"#dce9ed");c(1.35,.14,1,0,.57,0,r);for(const S of[-.5,.5])for(const b of[-.59,.59])f(.12,.18,S,.22,b);c(.7,.05,.05,.6,.37,.62,"#67e6c0"),e.cargo&&u(0,.65,0,!0)}t.userData.stock=[];const C=[];t.traverse(S=>{S.isGroup&&C.push(S)});for(const S of C){const b=new Map,A=new Map;for(const _ of[...S.children]){if(!_.isMesh)continue;_.updateMatrix();const m=_.material,y=[m.type,m.color.getHex(),m.roughness,m.metalness,((P=m.map)==null?void 0:P.uuid)||"",m.side,m.transparent,m.opacity,!!_.userData.tint].join(":");if(_.userData.slot!==null){const D=y+JSON.stringify(_.geometry.parameters);A.has(D)||A.set(D,{geometry:_.geometry.clone(),material:m.clone(),entries:[]}),A.get(D).entries.push({slot:_.userData.slot,matrix:_.matrix.clone()})}else b.has(y)||b.set(y,{geometry:[],material:m.clone(),tint:_.userData.tint}),b.get(y).geometry.push((_.geometry.index?_.geometry.toNonIndexed():_.geometry.clone()).applyMatrix4(_.matrix));S.remove(_),_.geometry.dispose(),m.dispose()}for(const _ of b.values()){const m=jm(_.geometry,!1);for(const D of _.geometry)D.dispose();const y=new xe(m,_.material);y.userData.id=i.id,y.userData.tint=_.tint,y.castShadow=!0,y.receiveShadow=!0,S.add(y)}for(const _ of A.values()){const m=new _h(_.geometry,_.material,_.entries.length);m.instanceMatrix.setUsage(Ec);for(let y=0;y<_.entries.length;y++){const U=.94+(Math.imul(_.entries[y].slot+1,2654435761)>>>0)%101/1e3;m.setColorAt(y,new Nt(U,U,U))}m.userData.id=i.id,m.castShadow=!0,m.receiveShadow=!0,m.frustumCulled=!1,S.add(m),t.userData.stock.push({mesh:m,entries:_.entries})}}return t.traverse(S=>{var b;(b=S.material)!=null&&b.userData.industrialSurface&&Gm(S.material)}),t.userData.baseTravel=e.travel||0,t.userData.baseLift=e.lift||0,t.userData.id=i.id,t.userData.signature=JSON.stringify(e),Dl(t,i.occupiedSlots),t}const Jm=new Jt().makeScale(0,0,0);function Dl(i,t){for(const e of i.userData.stock||[]){for(let n=0;n<e.entries.length;n++){const s=e.entries[n];e.mesh.setMatrixAt(n,!t||t.has(s.slot)?s.matrix:Jm)}e.mesh.instanceMatrix.needsUpdate=!0,e.mesh.boundingSphere=null,e.mesh.boundingBox=null}}function Xo(i,t,e,n=0){i.userData.beltTexture&&(i.userData.beltTexture.offset.x=-t),i.userData.tipper&&(i.userData.tipper.rotation.x=-Ma.degToRad(Math.max(0,Math.min(110,i.userData.baseTilt+n)))),i.userData.slide&&(i.userData.slide.position.x=Math.sin(t*.3)*1.6),i.userData.robotArm&&(i.userData.robotArm.rotation.y=Math.sin(t*.3)*.18),i.userData.fork&&(i.userData.fork.position.z=n),i.userData.carriage&&(i.userData.carriage.position.x=t-i.userData.baseTravel),i.userData.lift&&(i.userData.lift.position.y=e-i.userData.baseLift)}function Qm(i=globalThis.crypto){if(typeof(i==null?void 0:i.randomUUID)=="function")return i.randomUUID();const t=new Uint8Array(16);if(typeof(i==null?void 0:i.getRandomValues)=="function")i.getRandomValues(t);else for(let n=0;n<t.length;n++)t[n]=Math.floor(Math.random()*256);t[6]=t[6]&15|64,t[8]=t[8]&63|128;const e=Array.from(t,n=>n.toString(16).padStart(2,"0")).join("");return`${e.slice(0,8)}-${e.slice(8,12)}-${e.slice(12,16)}-${e.slice(16,20)}-${e.slice(20)}`}const tg={width:40,depth:28};function eg(i){if(![1,2].includes(i.version)||!Array.isArray(i.objects)||i.objects.length>150)throw Error("场景最多支持150个设备");const t={...tg,...i.floor};for(const r of["width","depth"])if(!Number.isFinite(t[r])||t[r]<10||t[r]>120)throw Error("厂房尺寸需要在10~120米之间");const e=new Set;let n=0;const s=i.objects.map(r=>{const a=JSON.parse(JSON.stringify(r));if(!bs[a.type]||typeof a.id!="string"||e.has(a.id)||typeof a.name!="string"||!/^#[0-9a-f]{6}$/i.test(a.color)||typeof a.visible!="boolean")throw Error("设备字段无效");e.add(a.id);for(const h of["position","rotation","scale"])if(!Array.isArray(a[h])||a[h].length!==3||!a[h].every(l=>Number.isFinite(l)&&Math.abs(l)<=1e4)||h==="scale"&&a[h].some(l=>l<=0))throw Error("变换数值无效");for(const h of["roughness","metalness"])if(!Number.isFinite(a[h])||a[h]<0||a[h]>1)throw Error("材质数值无效");a.type==="binRack"&&(a.name=a.name.replace(/^(第\s*\d+\s*)排料框库$/,"$1列料框库")),a.params={...bs[a.type],...a.params};for(const[h,l,c,f,p]of Km[a.type])if(!Number.isFinite(a.params[h])||a.params[h]<c||a.params[h]>f||p===1&&!Number.isInteger(a.params[h]))throw Error(`${l}超出范围`);for(const h of Object.keys(bs[a.type]))if(typeof bs[a.type][h]=="boolean"&&typeof a.params[h]!="boolean")throw Error("设备开关无效");if(a.type==="stacker"&&a.params.lift>a.params.height-.2)throw Error("载货台超出立柱高度");const o=a.params;return n+=a.type==="shuttle"?o.bays*o.rows*o.levels:a.type==="barRack"?o.bays*o.lanes*o.levels:a.type==="binRack"?o.smallBays*o.smallLevels+o.largeBays*o.largeLevels:["rack","exhibitRack"].includes(a.type)?o.bays*o.levels:0,a});if(n>12e3)throw Error("单个方案最多支持12000个库位");return{version:2,id:typeof i.id=="string"?i.id:Qm(),name:typeof i.name=="string"?i.name:"导入场景",floor:t,objects:s,seed:Number.isInteger(i.seed)?i.seed:2026}}function ng(i){if(i==="exhibition")throw Error("此场景暂未公开");if(!["general","hardware"].includes(i))throw Error("未知的演示场景");return eg(structuredClone(zm))}const ig=["stacker","rgv","agv","shuttleCar","conveyor","turn","robot","machine","exhibitTransfer","exhibitRobot","exhibitAgv","exhibitHood"];function sg(i){const t=i.params;return i.type==="barRack"?t.bays*t.lanes*t.levels:i.type==="shuttle"?t.bays*t.rows*t.levels:i.type==="binRack"?t.smallBays*t.smallLevels+t.largeBays*t.largeLevels:["rack","exhibitRack"].includes(i.type)?t.bays*t.levels:0}function En(i){let t=2166136261;for(const e of i)t=Math.imul(t^e.charCodeAt(0),16777619);return t>>>0}const Ts=[["SKU-001","电机组件"],["SKU-002","铝型材"],["SKU-003","标准紧固件"],["SKU-004","传动轴"],["SKU-005","包装辅料"]];function Yo(i,t=2026){const e=[],n={};let s=0;for(const r of i){const a=r.params;for(let o=0;o<sg(r);o++){const h=En(`${t}:${r.id}:${o}`),l=r.type==="exhibitRack"&&(o%a.bays+1===a.liftBay||o<a.bays&&o+1===a.exitBay)?!1:r.initialOccupiedSlots?r.initialOccupiedSlots.includes(o):h%100<68;e.push({id:`${r.id}:${o}`,deviceId:r.id,index:o,location:r.type==="binRack"?`${r.name} / ${o<a.smallBays*a.smallLevels?"小料框":"大料筐"} / ${String(o<a.smallBays*a.smallLevels?Math.floor(o/a.smallLevels)+1:a.smallBays+Math.floor((o-a.smallBays*a.smallLevels)/a.largeLevels)+1).padStart(2,"0")}排 / ${String(o<a.smallBays*a.smallLevels?o%a.smallLevels+1:(o-a.smallBays*a.smallLevels)%a.largeLevels+1).padStart(2,"0")}层`:`${r.name} / ${String(o+1).padStart(4,"0")}`,occupied:l,sku:l?Ts[h%Ts.length][0]:"",product:l?Ts[h%Ts.length][1]:"",quantity:l?1+h%24:0,batch:l?`B202610-${String(h%90+10)}`:""})}ig.includes(r.type)&&(s++,n[r.id]={id:r.id,code:`DEV-${String(s).padStart(3,"0")}`,status:r.type==="machine"?"maintenance":"idle",completed:0,temperature:25+En(r.id)%9,power:0,travel:0,lift:1,alarm:""})}return{seed:t,elapsed:0,completed:0,slots:e,devices:n,tasks:[],events:[{time:0,message:"模拟库存与设备数据已生成"}]}}function rg(i,t,e=1){var r;i.elapsed+=e;const n=new Map(t.map(a=>[a.id,a]));let s=!1;for(const[a,o]of Object.entries(i.devices)){const h=n.get(a);if(!h)continue;if(o.status==="fault"||o.status==="maintenance"){o.power=0;continue}o.status="running",o.temperature=+(29+Math.sin(i.elapsed/18+En(a)%10)*3).toFixed(1),o.power=+(1.2+Math.abs(Math.sin(i.elapsed/9+En(a)%7))*2.8).toFixed(2);const l=h.params.railLength||8;o.travel=+((l/2-2)*Math.sin(i.elapsed/8+En(a)%5)).toFixed(2),o.lift=+(.5+((h.params.height||5)-1)*(.5+.5*Math.sin(i.elapsed/10))).toFixed(2)}for(const a of i.tasks.filter(o=>o.status==="running")){const o=i.devices[a.deviceId];if(!(!o||["fault","maintenance"].includes(o.status))&&(a.progress=Math.min(100,a.progress+e*20),a.progress===100)){const h=i.slots.find(c=>c.id===a.source),l=i.slots.find(c=>c.id===a.target);if(h!=null&&h.occupied&&l&&!l.occupied){for(const c of["sku","product","quantity","batch",...i.source==="SQL"?["boxCode","boxId","size","items"]:[]])l[c]=h[c],h[c]=c==="quantity"?null:c==="items"?[]:c==="boxId"?null:c==="size"?0:"";if(i.source==="SQL")for(const c of i.inventory)c.boxId===l.boxId&&(c.locationId=l.locationId);h.occupied=!1,l.occupied=!0,s=!0,i.completed++,o.completed++,a.status="completed",i.events.unshift({time:i.elapsed,message:`${a.code} 移库完成`})}else a.status="cancelled"}}if(!i.tasks.some(a=>a.status==="running")&&i.elapsed%3===0){const a=Object.values(i.devices).filter(p=>!["fault","maintenance"].includes(p.status)),o=a[Math.floor(i.elapsed/3)%a.length],h=o?(r=n.get(o.id))==null?void 0:r.aisle:null,l=p=>{var d;return!h||((d=n.get(p.deviceId))==null?void 0:d.aisle)===h},c=i.slots.find(p=>p.occupied&&l(p)),f=[...i.slots].reverse().find(p=>!p.occupied&&l(p));o&&c&&f&&(i.tasks.unshift({code:`MOCK-${String(i.completed+1).padStart(4,"0")}`,source:c.id,target:f.id,deviceId:o.id,from:c.location,to:f.location,status:"running",progress:0}),i.events.unshift({time:i.elapsed,message:`模拟移库任务分配给 ${o.code}`}))}return i.tasks=i.tasks.slice(0,30),i.events=i.events.slice(0,40),s}function ag(i,t){if(i.type==="exhibitTransfer")return{travel:t*.12,lift:0,extension:0};if(i.type==="exhibitHood"){const n=t%16;let s=n<3?0:n<7?(n-3)/4:n<10?1:n<14?1-(n-10)/4:0;return s=s*s*(3-2*s),{travel:0,lift:0,extension:90*s-(i.params.angle||0)}}if(i.type==="stacker"){const n=t%16,s=n>=5&&n<11,r=((i.params.railLength||8)/2-2)*Math.sin(Math.floor(t/16)*.7+En(i.id)%5),a=((i.params.railLength||8)/2-2)*Math.sin((Math.floor(t/16)-1)*.7+En(i.id)%5),o=Math.min(n/5,1),h=o*o*(3-2*o);return{travel:a+(r-a)*h,lift:.5+((i.params.height||5)-1)*(.5+.4*(Math.sin((Math.floor(t/16)-1)*.9)+(Math.sin(Math.floor(t/16)*.9)-Math.sin((Math.floor(t/16)-1)*.9))*h)),extension:s?Math.sin((n-5)/6*Math.PI)*.6*(Math.floor(t/16)%2?1:-1):0}}const e=En(i.id)%5;return{travel:((i.params.railLength||8)/2-2)*Math.sin(t/8+e),lift:.5+((i.params.height||5)-1)*(.5+.5*Math.sin(t/10))}}function og(i,{kind:t,quality:e="balanced",onState:n=()=>{},onPick:s=()=>{},onError:r=()=>{}}){const a=ng(t),o=new fh;o.background=new Nt("#eef2f8");const h=new vm({antialias:!0,powerPreference:"high-performance"});h.toneMapping=Zo,h.toneMappingExposure=1.25,h.shadowMap.type=jo,i.appendChild(h.domElement);const l=new ze(42,1,.1,500),c=new Mm(l,h.domElement);c.enableDamping=!0,c.dampingFactor=.08,c.minDistance=2,c.maxDistance=150,c.maxPolarAngle=Math.PI*.49,o.add(new wh("#ffffff","#778da4",3));const f=new Ph("#fff8ed",4);f.position.set(12,28,14),f.castShadow=!0,f.shadow.mapSize.set(1024,1024),Object.assign(f.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:.5,far:100}),f.shadow.normalBias=.04,o.add(f);const p=new xe(new qi(140,140),new zs({color:"#e5eaf0",roughness:.93}));p.rotation.x=-Math.PI/2,p.position.y=-.06,p.receiveShadow=!0,o.add(p);const d=new Uh(100,50,"#c3cfdf","#d9e1ec");d.position.y=-.05,o.add(d);const v=new Map,x=a.objects;let g=Yo(x,2026);for(const $ of x){const dt=$m($);dt.position.fromArray($.position),dt.rotation.set(...$.rotation.map(Ma.degToRad)),dt.scale.fromArray($.scale),dt.visible=$.visible,v.set($.id,dt),o.add(dt)}let u=!1,R=!1,C,T=0,P=0,S=performance.now(),b=0,A=0,_=!0,m=null;const y=()=>{for(const $ of x){const dt=new Set(g.slots.filter(lt=>lt.deviceId===$.id&&lt.occupied&&!0).map(lt=>lt.index));Dl(v.get($.id),dt)}_=!0};y();const D=new fn;for(const $ of v.values())D.expandByObject($);const U=D.getCenter(new F),I=D.getSize(new F),k=Math.max(I.x,I.z,I.y*2,8);function z(){c.target.copy(U),l.position.copy(U).add(new F(.8,.63,.86).normalize().multiplyScalar(k*1.65/Math.min(l.aspect,1))),l.near=Math.max(.03,k/3e3),l.far=Math.max(200,k*8),l.updateProjectionMatrix(),c.update(),_=!0}const Z=()=>{const $=i.clientWidth,dt=i.clientHeight;!$||!dt||(h.setSize($,dt),l.aspect=$/dt,l.updateProjectionMatrix(),_=!0)};function G($){h.setPixelRatio(Math.min(devicePixelRatio,$==="low"?1:1.35)),h.shadowMap.enabled=$!=="low",Z()}G(e),z();const X=new ResizeObserver(Z);X.observe(i),c.addEventListener("change",()=>{_=!0});const et=new Lh,ut=new At;let bt;const Vt=$=>{bt={x:$.clientX,y:$.clientY}},Ht=$=>{if(!bt||Math.hypot($.clientX-bt.x,$.clientY-bt.y)>5)return;const dt=h.domElement.getBoundingClientRect();ut.set(($.clientX-dt.left)/dt.width*2-1,-($.clientY-dt.top)/dt.height*2+1),et.setFromCamera(ut,l);const lt=et.intersectObjects([...v.values()],!0)[0];let Rt=lt==null?void 0:lt.object;for(;Rt&&!x.some(ce=>ce.id===Rt.userData.id);)Rt=Rt.parent;m=x.find(ce=>ce.id===(Rt==null?void 0:Rt.userData.id))||null,s(m?{name:m.name,type:m.type}:null)};h.domElement.addEventListener("pointerdown",Vt),h.domElement.addEventListener("pointerup",Ht);const kt=()=>{document.hidden&&(u=!1,n({playing:!1,message:"页面进入后台，动画已暂停。"}),S=performance.now()),_=!0};document.addEventListener("visibilitychange",kt);const q=$=>{$.preventDefault(),u=!1,r("显卡上下文已丢失，请刷新页面，或切换轻量画质后重试。")};h.domElement.addEventListener("webglcontextlost",q);function J($){if(R)return;C=requestAnimationFrame(J);const dt=Math.min(($-S)/1e3,.05);if(S=$,!document.hidden){if(c.update(),u){T+=dt;{Math.floor(T)>P&&(rg(g,x,Math.floor(T)-P),P=Math.floor(T),y());for(const lt of x){if(!g.devices[lt.id])continue;const Rt=ag(lt,T);Xo(v.get(lt.id),Rt.travel,Rt.lift,Rt.extension)}}_=!0}_&&(h.render(o,l),_=!1,A++),$-b>1e3&&(n({playing:u,elapsed:Math.floor(T),devices:x.length,slots:g.slots.length,occupied:g.slots.filter(lt=>lt.occupied).length,fps:Math.round(A*1e3/($-b||1e3)),stage:"设备运动与模拟移库",progress:0}),A=0,b=$)}}return C=requestAnimationFrame(J),{toggle:async()=>{u=!u,_=!0,n({playing:u})},overview:z,setQuality:G,focus:()=>{if(!m)return;const $=new fn().setFromObject(v.get(m.id)),dt=$.getCenter(new F),lt=$.getSize(new F),Rt=Math.max(lt.x,lt.y,lt.z,2)*2;c.target.copy(dt),l.position.copy(dt).add(new F(Rt,Rt*.6,Rt)),c.update(),_=!0},reset:()=>{u=!1,T=0,P=0,g=Yo(x,2026);for(const $ of x)Xo(v.get($.id),$.params.travel||0,$.params.lift||1.2,0);y(),z(),n({playing:!1,elapsed:0,progress:0,message:"演示已重置。"})},dispose:()=>{var $;R=!0,cancelAnimationFrame(C),X.disconnect(),document.removeEventListener("visibilitychange",kt),h.domElement.removeEventListener("pointerdown",Vt),h.domElement.removeEventListener("pointerup",Ht),h.domElement.removeEventListener("webglcontextlost",q),c.dispose();for(const dt of v.values())Zm(dt);p.geometry.dispose(),p.material.dispose(),d.geometry.dispose(),d.material.dispose(),($=f.shadow.map)==null||$.dispose(),h.dispose(),h.domElement.remove()}}}export{og as startDemo};
