(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Za="181",cr={ROTATE:0,DOLLY:1,PAN:2},ar={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Su=0,Yl=1,wu=2,Ed=1,Ja=2,Hn=3,fi=0,Yt=1,zt=2,jn=0,dr=1,Kl=2,Zl=3,Jl=4,yu=5,Ti=100,Mu=101,Eu=102,Cu=103,Tu=104,Au=200,Pu=201,Ru=202,Lu=203,ta=204,na=205,Du=206,Iu=207,Uu=208,Nu=209,Fu=210,Ou=211,Bu=212,ku=213,Vu=214,ia=0,ra=1,sa=2,fr=3,oa=4,aa=5,la=6,ca=7,Cd=0,zu=1,Hu=2,ui=0,Gu=1,Wu=2,Xu=3,ju=4,qu=5,$u=6,Yu=7,Td=300,mr=301,xr=302,da=303,ha=304,io=306,ua=1e3,Gn=1001,pa=1002,rn=1003,Ku=1004,xs=1005,fn=1006,fo=1007,Pi=1008,Pn=1009,Ad=1010,Pd=1011,zr=1012,Qa=1013,Di=1014,Wn=1015,br=1016,el=1017,tl=1018,Hr=1020,Rd=35902,Ld=35899,Dd=1021,Id=1022,Sn=1023,Gr=1026,Wr=1027,Ud=1028,nl=1029,il=1030,rl=1031,sl=1033,ks=33776,Vs=33777,zs=33778,Hs=33779,fa=35840,ma=35841,xa=35842,ga=35843,_a=36196,va=37492,ba=37496,Sa=37808,wa=37809,ya=37810,Ma=37811,Ea=37812,Ca=37813,Ta=37814,Aa=37815,Pa=37816,Ra=37817,La=37818,Da=37819,Ia=37820,Ua=37821,Na=36492,Fa=36494,Oa=36495,Ba=36283,ka=36284,Va=36285,za=36286,Zu=3200,Ju=3201,Nd=0,Qu=1,ci="",hn="srgb",gr="srgb-linear",Ys="linear",nt="srgb",Wi=7680,Ql=519,ep=512,tp=513,np=514,Fd=515,ip=516,rp=517,sp=518,op=519,ec=35044,tc="300 es",En=2e3,Ks=2001;function Od(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Xr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ap(){const n=Xr("canvas");return n.style.display="block",n}const nc={};function ic(...n){const e="THREE."+n.shift();console.log(e,...n)}function De(...n){const e="THREE."+n.shift();console.warn(e,...n)}function yt(...n){const e="THREE."+n.shift();console.error(e,...n)}function jr(...n){const e=n.join(" ");e in nc||(nc[e]=!0,De(...n))}function lp(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}class Bi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gs=Math.PI/180,Ha=180/Math.PI;function ts(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]).toLowerCase()}function Ve(n,e,t){return Math.max(e,Math.min(t,n))}function cp(n,e){return(n%e+e)%e}function mo(n,e,t){return(1-t)*n+t*e}function Ar(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function jt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const dp={DEG2RAD:Gs};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ii{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],d=i[r+2],h=i[r+3],p=s[o+0],f=s[o+1],_=s[o+2],b=s[o+3];if(a<=0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a>=1){e[t+0]=p,e[t+1]=f,e[t+2]=_,e[t+3]=b;return}if(h!==b||l!==p||c!==f||d!==_){let m=l*p+c*f+d*_+h*b;m<0&&(p=-p,f=-f,_=-_,b=-b,m=-m);let u=1-a;if(m<.9995){const E=Math.acos(m),y=Math.sin(E);u=Math.sin(u*E)/y,a=Math.sin(a*E)/y,l=l*u+p*a,c=c*u+f*a,d=d*u+_*a,h=h*u+b*a}else{l=l*u+p*a,c=c*u+f*a,d=d*u+_*a,h=h*u+b*a;const E=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=E,c*=E,d*=E,h*=E}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],d=i[r+3],h=s[o],p=s[o+1],f=s[o+2],_=s[o+3];return e[t]=a*_+d*h+l*f-c*p,e[t+1]=l*_+d*p+c*h-a*f,e[t+2]=c*_+d*f+a*p-l*h,e[t+3]=d*_-a*h-l*p-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(r/2),h=a(s/2),p=l(i/2),f=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=p*d*h+c*f*_,this._y=c*f*h-p*d*_,this._z=c*d*_+p*f*h,this._w=c*d*h-p*f*_;break;case"YXZ":this._x=p*d*h+c*f*_,this._y=c*f*h-p*d*_,this._z=c*d*_-p*f*h,this._w=c*d*h+p*f*_;break;case"ZXY":this._x=p*d*h-c*f*_,this._y=c*f*h+p*d*_,this._z=c*d*_+p*f*h,this._w=c*d*h-p*f*_;break;case"ZYX":this._x=p*d*h-c*f*_,this._y=c*f*h+p*d*_,this._z=c*d*_-p*f*h,this._w=c*d*h+p*f*_;break;case"YZX":this._x=p*d*h+c*f*_,this._y=c*f*h+p*d*_,this._z=c*d*_-p*f*h,this._w=c*d*h-p*f*_;break;case"XZY":this._x=p*d*h-c*f*_,this._y=c*f*h-p*d*_,this._z=c*d*_+p*f*h,this._w=c*d*h+p*f*_;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],p=i+a+h;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(d-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>h){const f=2*Math.sqrt(1+i-a-h);this._w=(d-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-i-h);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+h-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+o*a+r*c-s*l,this._y=r*d+o*l+s*a-i*c,this._z=s*d+o*c+i*l-r*a,this._w=o*d-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),d=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*d,this.y=i+l*d+a*c-s*h,this.z=r+l*h+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xo.copy(this).projectOnVector(e),this.sub(xo)}reflect(e){return this.sub(xo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xo=new N,rc=new Ii;class Ne{constructor(e,t,i,r,s,o,a,l,c){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],h=i[7],p=i[2],f=i[5],_=i[8],b=r[0],m=r[3],u=r[6],E=r[1],y=r[4],A=r[7],L=r[2],M=r[5],P=r[8];return s[0]=o*b+a*E+l*L,s[3]=o*m+a*y+l*M,s[6]=o*u+a*A+l*P,s[1]=c*b+d*E+h*L,s[4]=c*m+d*y+h*M,s[7]=c*u+d*A+h*P,s[2]=p*b+f*E+_*L,s[5]=p*m+f*y+_*M,s[8]=p*u+f*A+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-i*s*d+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,p=a*l-d*s,f=c*s-o*l,_=t*h+i*p+r*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/_;return e[0]=h*b,e[1]=(r*c-d*i)*b,e[2]=(a*i-r*o)*b,e[3]=p*b,e[4]=(d*t-r*l)*b,e[5]=(r*s-a*t)*b,e[6]=f*b,e[7]=(i*l-c*t)*b,e[8]=(o*t-i*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(go.makeScale(e,t)),this}rotate(e){return this.premultiply(go.makeRotation(-e)),this}translate(e,t){return this.premultiply(go.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const go=new Ne,sc=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),oc=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hp(){const n={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===nt&&(r.r=qn(r.r),r.g=qn(r.g),r.b=qn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(r.r=hr(r.r),r.g=hr(r.g),r.b=hr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ci?Ys:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return jr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return jr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[gr]:{primaries:e,whitePoint:i,transfer:Ys,toXYZ:sc,fromXYZ:oc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:sc,fromXYZ:oc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),n}const Ke=hp();function qn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function hr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Xi;class up{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Xi===void 0&&(Xi=Xr("canvas")),Xi.width=e.width,Xi.height=e.height;const r=Xi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Xi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=qn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(qn(t[i]/255)*255):t[i]=qn(t[i]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let pp=0;class ol{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=ts(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(_o(r[o].image)):s.push(_o(r[o]))}else s=_o(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function _o(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?up.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}let fp=0;const vo=new N;class Ft extends Bi{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,i=Gn,r=Gn,s=fn,o=Pi,a=Sn,l=Pn,c=Ft.DEFAULT_ANISOTROPY,d=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=ts(),this.name="",this.source=new ol(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Td)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=Td;Ft.DEFAULT_ANISOTROPY=1;class wt{constructor(e=0,t=0,i=0,r=1){wt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],d=l[4],h=l[8],p=l[1],f=l[5],_=l[9],b=l[2],m=l[6],u=l[10];if(Math.abs(d-p)<.01&&Math.abs(h-b)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+p)<.1&&Math.abs(h+b)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,A=(f+1)/2,L=(u+1)/2,M=(d+p)/4,P=(h+b)/4,k=(_+m)/4;return y>A&&y>L?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=M/i,s=P/i):A>L?A<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),i=M/r,s=k/r):L<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),i=P/s,r=k/s),this.set(i,r,s,t),this}let E=Math.sqrt((m-_)*(m-_)+(h-b)*(h-b)+(p-d)*(p-d));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(h-b)/E,this.z=(p-d)/E,this.w=Math.acos((c+f+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mp extends Bi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Ft(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ol(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends mp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Bd extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xp extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sr{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,gn):gn.fromBufferAttribute(s,o),gn.applyMatrix4(e.matrixWorld),this.expandByPoint(gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),gs.copy(i.boundingBox)),gs.applyMatrix4(e.matrixWorld),this.union(gs)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gn),gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),_s.subVectors(this.max,Pr),ji.subVectors(e.a,Pr),qi.subVectors(e.b,Pr),$i.subVectors(e.c,Pr),Qn.subVectors(qi,ji),ei.subVectors($i,qi),vi.subVectors(ji,$i);let t=[0,-Qn.z,Qn.y,0,-ei.z,ei.y,0,-vi.z,vi.y,Qn.z,0,-Qn.x,ei.z,0,-ei.x,vi.z,0,-vi.x,-Qn.y,Qn.x,0,-ei.y,ei.x,0,-vi.y,vi.x,0];return!bo(t,ji,qi,$i,_s)||(t=[1,0,0,0,1,0,0,0,1],!bo(t,ji,qi,$i,_s))?!1:(vs.crossVectors(Qn,ei),t=[vs.x,vs.y,vs.z],bo(t,ji,qi,$i,_s))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new N,new N,new N,new N,new N,new N,new N,new N],gn=new N,gs=new Sr,ji=new N,qi=new N,$i=new N,Qn=new N,ei=new N,vi=new N,Pr=new N,_s=new N,vs=new N,bi=new N;function bo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){bi.fromArray(n,s);const a=r.x*Math.abs(bi.x)+r.y*Math.abs(bi.y)+r.z*Math.abs(bi.z),l=e.dot(bi),c=t.dot(bi),d=i.dot(bi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const gp=new Sr,Rr=new N,So=new N;class al{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):gp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Rr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(So.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(So)),this.expandByPoint(Rr.copy(e.center).sub(So))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Nn=new N,wo=new N,bs=new N,ti=new N,yo=new N,Ss=new N,Mo=new N;class kd{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Nn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Nn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Nn.copy(this.origin).addScaledVector(this.direction,t),Nn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){wo.copy(e).add(t).multiplyScalar(.5),bs.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(wo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(bs),a=ti.dot(this.direction),l=-ti.dot(bs),c=ti.lengthSq(),d=Math.abs(1-o*o);let h,p,f,_;if(d>0)if(h=o*l-a,p=o*a-l,_=s*d,h>=0)if(p>=-_)if(p<=_){const b=1/d;h*=b,p*=b,f=h*(h+o*p+2*a)+p*(o*h+p+2*l)+c}else p=s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*l)+c;else p=-s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*l)+c;else p<=-_?(h=Math.max(0,-(-o*s+a)),p=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+p*(p+2*l)+c):p<=_?(h=0,p=Math.min(Math.max(-s,-l),s),f=p*(p+2*l)+c):(h=Math.max(0,-(o*s+a)),p=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+p*(p+2*l)+c);else p=o>0?-s:s,h=Math.max(0,-(o*p+a)),f=-h*h+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(wo).addScaledVector(bs,p),f}intersectSphere(e,t){Nn.subVectors(e.center,this.origin);const i=Nn.dot(this.direction),r=Nn.dot(Nn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(i=(e.min.x-p.x)*c,r=(e.max.x-p.x)*c):(i=(e.max.x-p.x)*c,r=(e.min.x-p.x)*c),d>=0?(s=(e.min.y-p.y)*d,o=(e.max.y-p.y)*d):(s=(e.max.y-p.y)*d,o=(e.min.y-p.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(a=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Nn)!==null}intersectTriangle(e,t,i,r,s){yo.subVectors(t,e),Ss.subVectors(i,e),Mo.crossVectors(yo,Ss);let o=this.direction.dot(Mo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,e);const l=a*this.direction.dot(Ss.crossVectors(ti,Ss));if(l<0)return null;const c=a*this.direction.dot(yo.cross(ti));if(c<0||l+c>o)return null;const d=-a*ti.dot(Mo);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mt{constructor(e,t,i,r,s,o,a,l,c,d,h,p,f,_,b,m){Mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,d,h,p,f,_,b,m)}set(e,t,i,r,s,o,a,l,c,d,h,p,f,_,b,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=p,u[3]=f,u[7]=_,u[11]=b,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Yi.setFromMatrixColumn(e,0).length(),s=1/Yi.setFromMatrixColumn(e,1).length(),o=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const p=o*d,f=o*h,_=a*d,b=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+_*c,t[5]=p-b*c,t[9]=-a*l,t[2]=b-p*c,t[6]=_+f*c,t[10]=o*l}else if(e.order==="YXZ"){const p=l*d,f=l*h,_=c*d,b=c*h;t[0]=p+b*a,t[4]=_*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=f*a-_,t[6]=b+p*a,t[10]=o*l}else if(e.order==="ZXY"){const p=l*d,f=l*h,_=c*d,b=c*h;t[0]=p-b*a,t[4]=-o*h,t[8]=_+f*a,t[1]=f+_*a,t[5]=o*d,t[9]=b-p*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const p=o*d,f=o*h,_=a*d,b=a*h;t[0]=l*d,t[4]=_*c-f,t[8]=p*c+b,t[1]=l*h,t[5]=b*c+p,t[9]=f*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const p=o*l,f=o*c,_=a*l,b=a*c;t[0]=l*d,t[4]=b-p*h,t[8]=_*h+f,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=f*h+_,t[10]=p-b*h}else if(e.order==="XZY"){const p=o*l,f=o*c,_=a*l,b=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=p*h+b,t[5]=o*d,t[9]=f*h-_,t[2]=_*h-f,t[6]=a*d,t[10]=b*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_p,e,vp)}lookAt(e,t,i){const r=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),ni.crossVectors(i,en),ni.lengthSq()===0&&(Math.abs(i.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ni.crossVectors(i,en)),ni.normalize(),ws.crossVectors(en,ni),r[0]=ni.x,r[4]=ws.x,r[8]=en.x,r[1]=ni.y,r[5]=ws.y,r[9]=en.y,r[2]=ni.z,r[6]=ws.z,r[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],h=i[5],p=i[9],f=i[13],_=i[2],b=i[6],m=i[10],u=i[14],E=i[3],y=i[7],A=i[11],L=i[15],M=r[0],P=r[4],k=r[8],S=r[12],v=r[1],R=r[5],B=r[9],z=r[13],q=r[2],W=r[6],$=r[10],Q=r[14],H=r[3],ie=r[7],oe=r[11],we=r[15];return s[0]=o*M+a*v+l*q+c*H,s[4]=o*P+a*R+l*W+c*ie,s[8]=o*k+a*B+l*$+c*oe,s[12]=o*S+a*z+l*Q+c*we,s[1]=d*M+h*v+p*q+f*H,s[5]=d*P+h*R+p*W+f*ie,s[9]=d*k+h*B+p*$+f*oe,s[13]=d*S+h*z+p*Q+f*we,s[2]=_*M+b*v+m*q+u*H,s[6]=_*P+b*R+m*W+u*ie,s[10]=_*k+b*B+m*$+u*oe,s[14]=_*S+b*z+m*Q+u*we,s[3]=E*M+y*v+A*q+L*H,s[7]=E*P+y*R+A*W+L*ie,s[11]=E*k+y*B+A*$+L*oe,s[15]=E*S+y*z+A*Q+L*we,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],p=e[10],f=e[14],_=e[3],b=e[7],m=e[11],u=e[15];return _*(+s*l*h-r*c*h-s*a*p+i*c*p+r*a*f-i*l*f)+b*(+t*l*f-t*c*p+s*o*p-r*o*f+r*c*d-s*l*d)+m*(+t*c*h-t*a*f-s*o*h+i*o*f+s*a*d-i*c*d)+u*(-r*a*d-t*l*h+t*a*p+r*o*h-i*o*p+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],p=e[10],f=e[11],_=e[12],b=e[13],m=e[14],u=e[15],E=h*m*c-b*p*c+b*l*f-a*m*f-h*l*u+a*p*u,y=_*p*c-d*m*c-_*l*f+o*m*f+d*l*u-o*p*u,A=d*b*c-_*h*c+_*a*f-o*b*f-d*a*u+o*h*u,L=_*h*l-d*b*l-_*a*p+o*b*p+d*a*m-o*h*m,M=t*E+i*y+r*A+s*L;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/M;return e[0]=E*P,e[1]=(b*p*s-h*m*s-b*r*f+i*m*f+h*r*u-i*p*u)*P,e[2]=(a*m*s-b*l*s+b*r*c-i*m*c-a*r*u+i*l*u)*P,e[3]=(h*l*s-a*p*s-h*r*c+i*p*c+a*r*f-i*l*f)*P,e[4]=y*P,e[5]=(d*m*s-_*p*s+_*r*f-t*m*f-d*r*u+t*p*u)*P,e[6]=(_*l*s-o*m*s-_*r*c+t*m*c+o*r*u-t*l*u)*P,e[7]=(o*p*s-d*l*s+d*r*c-t*p*c-o*r*f+t*l*f)*P,e[8]=A*P,e[9]=(_*h*s-d*b*s-_*i*f+t*b*f+d*i*u-t*h*u)*P,e[10]=(o*b*s-_*a*s+_*i*c-t*b*c-o*i*u+t*a*u)*P,e[11]=(d*a*s-o*h*s-d*i*c+t*h*c+o*i*f-t*a*f)*P,e[12]=L*P,e[13]=(d*b*r-_*h*r+_*i*p-t*b*p-d*i*m+t*h*m)*P,e[14]=(_*a*r-o*b*r-_*i*l+t*b*l+o*i*m-t*a*m)*P,e[15]=(o*h*r-d*a*r+d*i*l-t*h*l-o*i*p+t*a*p)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+i,d*l-r*o,0,c*l-r*a,d*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,d=o+o,h=a+a,p=s*c,f=s*d,_=s*h,b=o*d,m=o*h,u=a*h,E=l*c,y=l*d,A=l*h,L=i.x,M=i.y,P=i.z;return r[0]=(1-(b+u))*L,r[1]=(f+A)*L,r[2]=(_-y)*L,r[3]=0,r[4]=(f-A)*M,r[5]=(1-(p+u))*M,r[6]=(m+E)*M,r[7]=0,r[8]=(_+y)*P,r[9]=(m-E)*P,r[10]=(1-(p+b))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Yi.set(r[0],r[1],r[2]).length();const o=Yi.set(r[4],r[5],r[6]).length(),a=Yi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],_n.copy(this);const c=1/s,d=1/o,h=1/a;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=d,_n.elements[5]*=d,_n.elements[6]*=d,_n.elements[8]*=h,_n.elements[9]*=h,_n.elements[10]*=h,t.setFromRotationMatrix(_n),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=En,l=!1){const c=this.elements,d=2*s/(t-e),h=2*s/(i-r),p=(t+e)/(t-e),f=(i+r)/(i-r);let _,b;if(l)_=s/(o-s),b=o*s/(o-s);else if(a===En)_=-(o+s)/(o-s),b=-2*o*s/(o-s);else if(a===Ks)_=-o/(o-s),b=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=En,l=!1){const c=this.elements,d=2/(t-e),h=2/(i-r),p=-(t+e)/(t-e),f=-(i+r)/(i-r);let _,b;if(l)_=1/(o-s),b=o/(o-s);else if(a===En)_=-2/(o-s),b=-(o+s)/(o-s);else if(a===Ks)_=-1/(o-s),b=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Yi=new N,_n=new Mt,_p=new N(0,0,0),vp=new N(1,1,1),ni=new N,ws=new N,en=new N,ac=new Mt,lc=new Ii;class Rn{constructor(e=0,t=0,i=0,r=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],d=r[9],h=r[2],p=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,f),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ac.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ac,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lc.setFromEuler(this),this.setFromQuaternion(lc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Vd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let bp=0;const cc=new N,Ki=new Ii,Fn=new Mt,ys=new N,Lr=new N,Sp=new N,wp=new Ii,dc=new N(1,0,0),hc=new N(0,1,0),uc=new N(0,0,1),pc={type:"added"},yp={type:"removed"},Zi={type:"childadded",child:null},Eo={type:"childremoved",child:null};class Ot extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new N,t=new Rn,i=new Ii,r=new N(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Mt},normalMatrix:{value:new Ne}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(dc,e)}rotateY(e){return this.rotateOnAxis(hc,e)}rotateZ(e){return this.rotateOnAxis(uc,e)}translateOnAxis(e,t){return cc.copy(e).applyQuaternion(this.quaternion),this.position.add(cc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(dc,e)}translateY(e){return this.translateOnAxis(hc,e)}translateZ(e){return this.translateOnAxis(uc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ys.copy(e):ys.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Lr,ys,this.up):Fn.lookAt(ys,Lr,this.up),this.quaternion.setFromRotationMatrix(Fn),r&&(Fn.extractRotation(r.matrixWorld),Ki.setFromRotationMatrix(Fn),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(yt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pc),Zi.child=e,this.dispatchEvent(Zi),Zi.child=null):yt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yp),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pc),Zi.child=e,this.dispatchEvent(Zi),Zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,e,Sp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,wp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),p=o(e.skeletons),f=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),p.length>0&&(i.skeletons=p),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ot.DEFAULT_UP=new N(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new N,On=new N,Co=new N,Bn=new N,Ji=new N,Qi=new N,fc=new N,To=new N,Ao=new N,Po=new N,Ro=new wt,Lo=new wt,Do=new wt;class bn{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),vn.subVectors(e,t),r.cross(vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){vn.subVectors(r,t),On.subVectors(i,t),Co.subVectors(e,t);const o=vn.dot(vn),a=vn.dot(On),l=vn.dot(Co),c=On.dot(On),d=On.dot(Co),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const p=1/h,f=(c*l-a*d)*p,_=(o*d-a*l)*p;return s.set(1-f-_,_,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Bn.x),l.addScaledVector(o,Bn.y),l.addScaledVector(a,Bn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Ro.setScalar(0),Lo.setScalar(0),Do.setScalar(0),Ro.fromBufferAttribute(e,t),Lo.fromBufferAttribute(e,i),Do.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Ro,s.x),o.addScaledVector(Lo,s.y),o.addScaledVector(Do,s.z),o}static isFrontFacing(e,t,i,r){return vn.subVectors(i,t),On.subVectors(e,t),vn.cross(On).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),vn.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return bn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ji.subVectors(r,i),Qi.subVectors(s,i),To.subVectors(e,i);const l=Ji.dot(To),c=Qi.dot(To);if(l<=0&&c<=0)return t.copy(i);Ao.subVectors(e,r);const d=Ji.dot(Ao),h=Qi.dot(Ao);if(d>=0&&h<=d)return t.copy(r);const p=l*h-d*c;if(p<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(i).addScaledVector(Ji,o);Po.subVectors(e,s);const f=Ji.dot(Po),_=Qi.dot(Po);if(_>=0&&f<=_)return t.copy(s);const b=f*c-l*_;if(b<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(i).addScaledVector(Qi,a);const m=d*_-f*h;if(m<=0&&h-d>=0&&f-_>=0)return fc.subVectors(s,r),a=(h-d)/(h-d+(f-_)),t.copy(r).addScaledVector(fc,a);const u=1/(m+b+p);return o=b*u,a=p*u,t.copy(i).addScaledVector(Ji,o).addScaledVector(Qi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function Io(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=cp(e,1),t=Ve(t,0,1),i=Ve(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Io(o,s,e+1/3),this.g=Io(o,s,e),this.b=Io(o,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,t=hn){function i(s){s!==void 0&&parseFloat(s)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const i=zd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return Ke.workingToColorSpace(Nt.copy(this),e),Math.round(Ve(Nt.r*255,0,255))*65536+Math.round(Ve(Nt.g*255,0,255))*256+Math.round(Ve(Nt.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Nt.copy(this),t);const i=Nt.r,r=Nt.g,s=Nt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=hn){Ke.workingToColorSpace(Nt.copy(this),e);const t=Nt.r,i=Nt.g,r=Nt.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(Ms);const i=mo(ii.h,Ms.h,t),r=mo(ii.s,Ms.s,t),s=mo(ii.l,Ms.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new qe;qe.NAMES=zd;let Mp=0;class ns extends Bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=dr,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ta,this.blendDst=na,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==dr&&(i.blending=this.blending),this.side!==fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ta&&(i.blendSrc=this.blendSrc),this.blendDst!==na&&(i.blendDst=this.blendDst),this.blendEquation!==Ti&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ql&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ll extends ns{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Cd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new N,Es=new Ue;let Ep=0;class An{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ep++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ec,this.updateRanges=[],this.gpuType=Wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Es.fromBufferAttribute(this,t),Es.applyMatrix3(e),this.setXY(t,Es.x,Es.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ar(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=jt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ar(t,this.array)),t}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ar(t,this.array)),t}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ar(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ar(t,this.array)),t}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array),s=jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ec&&(e.usage=this.usage),e}}class Hd extends An{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Gd extends An{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ri extends An{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Cp=0;const cn=new Mt,Uo=new Ot,er=new N,tn=new Sr,Dr=new Sr,Lt=new N;class xi extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Od(e)?Gd:Hd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ne().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,i){return cn.makeTranslation(e,t,i),this.applyMatrix4(cn),this}scale(e,t,i){return cn.makeScale(e,t,i),this.applyMatrix4(cn),this}lookAt(e){return Uo.lookAt(e),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ri(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new al);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Dr.setFromBufferAttribute(a),this.morphTargetsRelative?(Lt.addVectors(tn.min,Dr.min),tn.expandByPoint(Lt),Lt.addVectors(tn.max,Dr.max),tn.expandByPoint(Lt)):(tn.expandByPoint(Dr.min),tn.expandByPoint(Dr.max))}tn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Lt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Lt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Lt.fromBufferAttribute(a,c),l&&(er.fromBufferAttribute(e,c),Lt.add(er)),r=Math.max(r,i.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let k=0;k<i.count;k++)a[k]=new N,l[k]=new N;const c=new N,d=new N,h=new N,p=new Ue,f=new Ue,_=new Ue,b=new N,m=new N;function u(k,S,v){c.fromBufferAttribute(i,k),d.fromBufferAttribute(i,S),h.fromBufferAttribute(i,v),p.fromBufferAttribute(s,k),f.fromBufferAttribute(s,S),_.fromBufferAttribute(s,v),d.sub(c),h.sub(c),f.sub(p),_.sub(p);const R=1/(f.x*_.y-_.x*f.y);isFinite(R)&&(b.copy(d).multiplyScalar(_.y).addScaledVector(h,-f.y).multiplyScalar(R),m.copy(h).multiplyScalar(f.x).addScaledVector(d,-_.x).multiplyScalar(R),a[k].add(b),a[S].add(b),a[v].add(b),l[k].add(m),l[S].add(m),l[v].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let k=0,S=E.length;k<S;++k){const v=E[k],R=v.start,B=v.count;for(let z=R,q=R+B;z<q;z+=3)u(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const y=new N,A=new N,L=new N,M=new N;function P(k){L.fromBufferAttribute(r,k),M.copy(L);const S=a[k];y.copy(S),y.sub(L.multiplyScalar(L.dot(S))).normalize(),A.crossVectors(M,S);const R=A.dot(l[k])<0?-1:1;o.setXYZW(k,y.x,y.y,y.z,R)}for(let k=0,S=E.length;k<S;++k){const v=E[k],R=v.start,B=v.count;for(let z=R,q=R+B;z<q;z+=3)P(e.getX(z+0)),P(e.getX(z+1)),P(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,f=i.count;p<f;p++)i.setXYZ(p,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,d=new N,h=new N;if(e)for(let p=0,f=e.count;p<f;p+=3){const _=e.getX(p+0),b=e.getX(p+1),m=e.getX(p+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,b),o.fromBufferAttribute(t,m),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,m),a.add(d),l.add(d),c.add(d),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=t.count;p<f;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),i.setXYZ(p+0,d.x,d.y,d.z),i.setXYZ(p+1,d.x,d.y,d.z),i.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,p=new c.constructor(l.length*d);let f=0,_=0;for(let b=0,m=l.length;b<m;b++){a.isInterleavedBufferAttribute?f=l[b]*a.data.stride+a.offset:f=l[b]*d;for(let u=0;u<d;u++)p[_++]=c[f++]}return new An(p,d,h)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xi,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,h=c.length;d<h;d++){const p=c[d],f=e(p,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,p=c.length;h<p;h++){const f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let p=0,f=h.length;p<f;p++)d.push(h[p].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const mc=new Mt,Si=new kd,Cs=new al,xc=new N,Ts=new N,As=new N,Ps=new N,No=new N,Rs=new N,gc=new N,Ls=new N;class Kt extends Ot{constructor(e=new xi,t=new ll){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Rs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],h=s[l];d!==0&&(No.fromBufferAttribute(h,e),o?Rs.addScaledVector(No,d):Rs.addScaledVector(No.sub(t),d))}t.add(Rs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(s),Si.copy(e.ray).recast(e.near),!(Cs.containsPoint(Si.origin)===!1&&(Si.intersectSphere(Cs,xc)===null||Si.origin.distanceToSquared(xc)>(e.far-e.near)**2))&&(mc.copy(s).invert(),Si.copy(e.ray).applyMatrix4(mc),!(i.boundingBox!==null&&Si.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Si)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,p=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,b=p.length;_<b;_++){const m=p[_],u=o[m.materialIndex],E=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let A=E,L=y;A<L;A+=3){const M=a.getX(A),P=a.getX(A+1),k=a.getX(A+2);r=Ds(this,u,e,i,c,d,h,M,P,k),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,f.start),b=Math.min(a.count,f.start+f.count);for(let m=_,u=b;m<u;m+=3){const E=a.getX(m),y=a.getX(m+1),A=a.getX(m+2);r=Ds(this,o,e,i,c,d,h,E,y,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,b=p.length;_<b;_++){const m=p[_],u=o[m.materialIndex],E=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let A=E,L=y;A<L;A+=3){const M=A,P=A+1,k=A+2;r=Ds(this,u,e,i,c,d,h,M,P,k),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,f.start),b=Math.min(l.count,f.start+f.count);for(let m=_,u=b;m<u;m+=3){const E=m,y=m+1,A=m+2;r=Ds(this,o,e,i,c,d,h,E,y,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Tp(n,e,t,i,r,s,o,a){let l;if(e.side===Yt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===fi,a),l===null)return null;Ls.copy(a),Ls.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ls);return c<t.near||c>t.far?null:{distance:c,point:Ls.clone(),object:n}}function Ds(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Ts),n.getVertexPosition(l,As),n.getVertexPosition(c,Ps);const d=Tp(n,e,t,i,Ts,As,Ps,gc);if(d){const h=new N;bn.getBarycoord(gc,Ts,As,Ps,h),r&&(d.uv=bn.getInterpolatedAttribute(r,a,l,c,h,new Ue)),s&&(d.uv1=bn.getInterpolatedAttribute(s,a,l,c,h,new Ue)),o&&(d.normal=bn.getInterpolatedAttribute(o,a,l,c,h,new N),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new N,materialIndex:0};bn.getNormal(Ts,As,Ps,p.normal),d.face=p,d.barycoord=h}return d}class ki extends xi{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],h=[];let p=0,f=0;_("z","y","x",-1,-1,i,t,e,o,s,0),_("z","y","x",1,-1,i,t,-e,o,s,1),_("x","z","y",1,1,e,i,t,r,o,2),_("x","z","y",1,-1,e,i,-t,r,o,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ri(c,3)),this.setAttribute("normal",new Ri(d,3)),this.setAttribute("uv",new Ri(h,2));function _(b,m,u,E,y,A,L,M,P,k,S){const v=A/P,R=L/k,B=A/2,z=L/2,q=M/2,W=P+1,$=k+1;let Q=0,H=0;const ie=new N;for(let oe=0;oe<$;oe++){const we=oe*R-z;for(let je=0;je<W;je++){const Qe=je*v-B;ie[b]=Qe*E,ie[m]=we*y,ie[u]=q,c.push(ie.x,ie.y,ie.z),ie[b]=0,ie[m]=0,ie[u]=M>0?1:-1,d.push(ie.x,ie.y,ie.z),h.push(je/P),h.push(1-oe/k),Q+=1}}for(let oe=0;oe<k;oe++)for(let we=0;we<P;we++){const je=p+we+W*oe,Qe=p+we+W*(oe+1),ot=p+(we+1)+W*(oe+1),at=p+(we+1)+W*oe;l.push(je,Qe,at),l.push(Qe,ot,at),H+=6}a.addGroup(f,H,S),f+=H,p+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ki(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _r(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function kt(n){const e={};for(let t=0;t<n.length;t++){const i=_r(n[t]);for(const r in i)e[r]=i[r]}return e}function Ap(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Wd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Pp={clone:_r,merge:kt};var Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends ns{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Lp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=Ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Xd extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new N,_c=new Ue,vc=new Ue;class un extends Xd{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ha*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ha*2*Math.atan(Math.tan(Gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ri.x,ri.y).multiplyScalar(-e/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ri.x,ri.y).multiplyScalar(-e/ri.z)}getViewSize(e,t){return this.getViewBounds(e,_c,vc),t.subVectors(vc,_c)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const tr=-90,nr=1;class Dp extends Ot{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new un(tr,nr,e,t);r.layers=this.layers,this.add(r);const s=new un(tr,nr,e,t);s.layers=this.layers,this.add(s);const o=new un(tr,nr,e,t);o.layers=this.layers,this.add(o);const a=new un(tr,nr,e,t);a.layers=this.layers,this.add(a);const l=new un(tr,nr,e,t);l.layers=this.layers,this.add(l);const c=new un(tr,nr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===En)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ks)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),e.render(t,d),e.setRenderTarget(h,p,f),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class jd extends Ft{constructor(e=[],t=mr,i,r,s,o,a,l,c,d){super(e,t,i,r,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ip extends Ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new jd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ki(5,5,5),s=new Yn({name:"CubemapFromEquirect",uniforms:_r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yt,blending:jn});s.uniforms.tEquirect.value=t;const o=new Kt(r,s),a=t.minFilter;return t.minFilter===Pi&&(t.minFilter=fn),new Dp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class Is extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Up={type:"move"};class Fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Is,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Is,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Is,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,i),u=this._getHandJoint(c,b);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=d.position.distanceTo(h.position),f=.02,_=.005;c.inputState.pinching&&p>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Up)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Is;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Np extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Fp extends Ft{constructor(e=null,t=1,i=1,r,s,o,a,l,c=rn,d=rn,h,p){super(null,o,a,l,c,d,r,s,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Oo=new N,Op=new N,Bp=new Ne;class li{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Oo.subVectors(i,t).cross(Op.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Oo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Bp.getNormalMatrix(e),r=this.coplanarPoint(Oo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wi=new al,kp=new Ue(.5,.5),Us=new N;class cl{constructor(e=new li,t=new li,i=new li,r=new li,s=new li,o=new li){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=En,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],d=s[4],h=s[5],p=s[6],f=s[7],_=s[8],b=s[9],m=s[10],u=s[11],E=s[12],y=s[13],A=s[14],L=s[15];if(r[0].setComponents(c-o,f-d,u-_,L-E).normalize(),r[1].setComponents(c+o,f+d,u+_,L+E).normalize(),r[2].setComponents(c+a,f+h,u+b,L+y).normalize(),r[3].setComponents(c-a,f-h,u-b,L-y).normalize(),i)r[4].setComponents(l,p,m,A).normalize(),r[5].setComponents(c-l,f-p,u-m,L-A).normalize();else if(r[4].setComponents(c-l,f-p,u-m,L-A).normalize(),t===En)r[5].setComponents(c+l,f+p,u+m,L+A).normalize();else if(t===Ks)r[5].setComponents(l,p,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(e){wi.center.set(0,0,0);const t=kp.distanceTo(e.center);return wi.radius=.7071067811865476+t,wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Us.x=r.normal.x>0?e.max.x:e.min.x,Us.y=r.normal.y>0?e.max.y:e.min.y,Us.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Us)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class qd extends Ft{constructor(e,t,i=Di,r,s,o,a=rn,l=rn,c,d=Gr,h=1){if(d!==Gr&&d!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:h};super(p,r,s,o,a,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ol(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class $d extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ln extends xi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,d=l+1,h=e/a,p=t/l,f=[],_=[],b=[],m=[];for(let u=0;u<d;u++){const E=u*p-o;for(let y=0;y<c;y++){const A=y*h-s;_.push(A,-E,0),b.push(0,0,1),m.push(y/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let E=0;E<a;E++){const y=E+c*u,A=E+c*(u+1),L=E+1+c*(u+1),M=E+1+c*u;f.push(y,A,M),f.push(A,L,M)}this.setIndex(f),this.setAttribute("position",new Ri(_,3)),this.setAttribute("normal",new Ri(b,3)),this.setAttribute("uv",new Ri(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.widthSegments,e.heightSegments)}}class qr extends ns{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nd,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vp extends ns{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class zp extends ns{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Bo={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Hp{constructor(e,t,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){a++,s===!1&&r.onStart!==void 0&&r.onStart(d,o,a),s=!0},this.itemEnd=function(d){o++,r.onProgress!==void 0&&r.onProgress(d,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,p=c.length;h<p;h+=2){const f=c[h],_=c[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Gp=new Hp;class dl{constructor(e){this.manager=e!==void 0?e:Gp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}dl.DEFAULT_MATERIAL_NAME="__DEFAULT";const ir=new WeakMap;class Wp extends dl{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Bo.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let h=ir.get(o);h===void 0&&(h=[],ir.set(o,h)),h.push({onLoad:t,onError:r})}return o}const a=Xr("img");function l(){d(),t&&t(this);const h=ir.get(this)||[];for(let p=0;p<h.length;p++){const f=h[p];f.onLoad&&f.onLoad(this)}ir.delete(this),s.manager.itemEnd(e)}function c(h){d(),r&&r(h),Bo.remove(`image:${e}`);const p=ir.get(this)||[];for(let f=0;f<p.length;f++){const _=p[f];_.onError&&_.onError(h)}ir.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Bo.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class hl extends dl{constructor(e){super(e)}load(e,t,i,r){const s=new Ft,o=new Wp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Yd extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const ko=new Mt,bc=new N,Sc=new N;class Xp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cl,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(bc),Sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sc),t.updateMatrixWorld(),ko.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ko,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ko)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ul extends Xd{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class jp extends Xp{constructor(){super(new ul(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wc extends Yd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new jp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class qp extends Yd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class $p extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class yc{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ve(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ve(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Yp extends Bi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){De("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Mc(n,e,t,i){const r=Kp(i);switch(t){case Dd:return n*e;case Ud:return n*e/r.components*r.byteLength;case nl:return n*e/r.components*r.byteLength;case il:return n*e*2/r.components*r.byteLength;case rl:return n*e*2/r.components*r.byteLength;case Id:return n*e*3/r.components*r.byteLength;case Sn:return n*e*4/r.components*r.byteLength;case sl:return n*e*4/r.components*r.byteLength;case ks:case Vs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zs:case Hs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ma:case ga:return Math.max(n,16)*Math.max(e,8)/4;case fa:case xa:return Math.max(n,8)*Math.max(e,8)/2;case _a:case va:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ya:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Pa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ua:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Na:case Fa:case Oa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ba:case ka:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Va:case za:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Kp(n){switch(n){case Pn:case Ad:return{byteLength:1,components:1};case zr:case Pd:case br:return{byteLength:2,components:1};case el:case tl:return{byteLength:2,components:4};case Di:case Qa:case Wn:return{byteLength:4,components:1};case Rd:case Ld:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Za}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Za);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kd(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Zp(n){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,h=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,d),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const d=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,d);else{h.sort((f,_)=>f.start-_.start);let p=0;for(let f=1;f<h.length;f++){const _=h[p],b=h[f];b.start<=_.start+_.count+1?_.count=Math.max(_.count,b.start+b.count-_.start):(++p,h[p]=b)}h.length=p+1;for(let f=0,_=h.length;f<_;f++){const b=h[f];n.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Jp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qp=`#ifdef USE_ALPHAHASH
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
#endif`,ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sf=`#ifdef USE_AOMAP
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
#endif`,of=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,af=`#ifdef USE_BATCHING
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
#endif`,lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,df=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uf=`#ifdef USE_IRIDESCENCE
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
#endif`,pf=`#ifdef USE_BUMPMAP
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
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_f=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,vf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,wf=`#define PI 3.141592653589793
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
} // validated`,yf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mf=`vec3 transformedNormal = objectNormal;
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
#endif`,Ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lf=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,If=`#ifdef USE_ENVMAP
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
#endif`,Uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nf=`#ifdef USE_ENVMAP
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
#endif`,Ff=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Of=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vf=`#ifdef USE_GRADIENTMAP
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
}`,zf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wf=`uniform bool receiveShadow;
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
#endif`,Xf=`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
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
#endif`,jf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$f=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kf=`PhysicalMaterial material;
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
#endif`,Zf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
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
}`,Jf=`
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
#endif`,Qf=`#if defined( RE_IndirectDiffuse )
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
#endif`,em=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,am=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lm=`#if defined( USE_POINTS_UV )
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
#endif`,cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,um=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`#ifdef USE_MORPHTARGETS
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
#endif`,mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sm=`#ifdef USE_NORMALMAP
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
#endif`,wm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ym=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Em=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Am=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Im=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Om=`float getShadowMask() {
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
}`,Bm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,km=`#ifdef USE_SKINNING
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
#endif`,Vm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zm=`#ifdef USE_SKINNING
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
#endif`,Hm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jm=`#ifdef USE_TRANSMISSION
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
#endif`,qm=`#ifdef USE_TRANSMISSION
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
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qm=`uniform sampler2D t2D;
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
}`,e0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,n0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r0=`#include <common>
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
}`,s0=`#if DEPTH_PACKING == 3200
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
}`,o0=`#define DISTANCE
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
}`,a0=`#define DISTANCE
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
}`,l0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,c0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`uniform float scale;
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
}`,h0=`uniform vec3 diffuse;
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
}`,u0=`#include <common>
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
}`,p0=`uniform vec3 diffuse;
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
}`,f0=`#define LAMBERT
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
}`,m0=`#define LAMBERT
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
}`,x0=`#define MATCAP
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
}`,g0=`#define MATCAP
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
}`,_0=`#define NORMAL
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
}`,v0=`#define NORMAL
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
}`,b0=`#define PHONG
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
}`,S0=`#define PHONG
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
}`,w0=`#define STANDARD
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
}`,y0=`#define STANDARD
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
}`,M0=`#define TOON
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
}`,E0=`#define TOON
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
}`,C0=`uniform float size;
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
}`,T0=`uniform vec3 diffuse;
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
}`,A0=`#include <common>
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
}`,P0=`uniform vec3 color;
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
}`,R0=`uniform float rotation;
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
}`,L0=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:Jp,alphahash_pars_fragment:Qp,alphamap_fragment:ef,alphamap_pars_fragment:tf,alphatest_fragment:nf,alphatest_pars_fragment:rf,aomap_fragment:sf,aomap_pars_fragment:of,batching_pars_vertex:af,batching_vertex:lf,begin_vertex:cf,beginnormal_vertex:df,bsdfs:hf,iridescence_fragment:uf,bumpmap_pars_fragment:pf,clipping_planes_fragment:ff,clipping_planes_pars_fragment:mf,clipping_planes_pars_vertex:xf,clipping_planes_vertex:gf,color_fragment:_f,color_pars_fragment:vf,color_pars_vertex:bf,color_vertex:Sf,common:wf,cube_uv_reflection_fragment:yf,defaultnormal_vertex:Mf,displacementmap_pars_vertex:Ef,displacementmap_vertex:Cf,emissivemap_fragment:Tf,emissivemap_pars_fragment:Af,colorspace_fragment:Pf,colorspace_pars_fragment:Rf,envmap_fragment:Lf,envmap_common_pars_fragment:Df,envmap_pars_fragment:If,envmap_pars_vertex:Uf,envmap_physical_pars_fragment:Xf,envmap_vertex:Nf,fog_vertex:Ff,fog_pars_vertex:Of,fog_fragment:Bf,fog_pars_fragment:kf,gradientmap_pars_fragment:Vf,lightmap_pars_fragment:zf,lights_lambert_fragment:Hf,lights_lambert_pars_fragment:Gf,lights_pars_begin:Wf,lights_toon_fragment:jf,lights_toon_pars_fragment:qf,lights_phong_fragment:$f,lights_phong_pars_fragment:Yf,lights_physical_fragment:Kf,lights_physical_pars_fragment:Zf,lights_fragment_begin:Jf,lights_fragment_maps:Qf,lights_fragment_end:em,logdepthbuf_fragment:tm,logdepthbuf_pars_fragment:nm,logdepthbuf_pars_vertex:im,logdepthbuf_vertex:rm,map_fragment:sm,map_pars_fragment:om,map_particle_fragment:am,map_particle_pars_fragment:lm,metalnessmap_fragment:cm,metalnessmap_pars_fragment:dm,morphinstance_vertex:hm,morphcolor_vertex:um,morphnormal_vertex:pm,morphtarget_pars_vertex:fm,morphtarget_vertex:mm,normal_fragment_begin:xm,normal_fragment_maps:gm,normal_pars_fragment:_m,normal_pars_vertex:vm,normal_vertex:bm,normalmap_pars_fragment:Sm,clearcoat_normal_fragment_begin:wm,clearcoat_normal_fragment_maps:ym,clearcoat_pars_fragment:Mm,iridescence_pars_fragment:Em,opaque_fragment:Cm,packing:Tm,premultiplied_alpha_fragment:Am,project_vertex:Pm,dithering_fragment:Rm,dithering_pars_fragment:Lm,roughnessmap_fragment:Dm,roughnessmap_pars_fragment:Im,shadowmap_pars_fragment:Um,shadowmap_pars_vertex:Nm,shadowmap_vertex:Fm,shadowmask_pars_fragment:Om,skinbase_vertex:Bm,skinning_pars_vertex:km,skinning_vertex:Vm,skinnormal_vertex:zm,specularmap_fragment:Hm,specularmap_pars_fragment:Gm,tonemapping_fragment:Wm,tonemapping_pars_fragment:Xm,transmission_fragment:jm,transmission_pars_fragment:qm,uv_pars_fragment:$m,uv_pars_vertex:Ym,uv_vertex:Km,worldpos_vertex:Zm,background_vert:Jm,background_frag:Qm,backgroundCube_vert:e0,backgroundCube_frag:t0,cube_vert:n0,cube_frag:i0,depth_vert:r0,depth_frag:s0,distanceRGBA_vert:o0,distanceRGBA_frag:a0,equirect_vert:l0,equirect_frag:c0,linedashed_vert:d0,linedashed_frag:h0,meshbasic_vert:u0,meshbasic_frag:p0,meshlambert_vert:f0,meshlambert_frag:m0,meshmatcap_vert:x0,meshmatcap_frag:g0,meshnormal_vert:_0,meshnormal_frag:v0,meshphong_vert:b0,meshphong_frag:S0,meshphysical_vert:w0,meshphysical_frag:y0,meshtoon_vert:M0,meshtoon_frag:E0,points_vert:C0,points_frag:T0,shadow_vert:A0,shadow_frag:P0,sprite_vert:R0,sprite_frag:L0},ae={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},yn={basic:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new qe(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:kt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:kt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new qe(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:kt([ae.points,ae.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:kt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:kt([ae.common,ae.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:kt([ae.sprite,ae.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:kt([ae.common,ae.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:kt([ae.lights,ae.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};yn.physical={uniforms:kt([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Ns={r:0,b:0,g:0},yi=new Rn,D0=new Mt;function I0(n,e,t,i,r,s,o){const a=new qe(0);let l=s===!0?0:1,c,d,h=null,p=0,f=null;function _(y){let A=y.isScene===!0?y.background:null;return A&&A.isTexture&&(A=(y.backgroundBlurriness>0?t:e).get(A)),A}function b(y){let A=!1;const L=_(y);L===null?u(a,l):L&&L.isColor&&(u(L,1),A=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,A){const L=_(A);L&&(L.isCubeTexture||L.mapping===io)?(d===void 0&&(d=new Kt(new ki(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:_r(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(M,P,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),yi.copy(A.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),d.material.uniforms.envMap.value=L,d.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(D0.makeRotationFromEuler(yi)),d.material.toneMapped=Ke.getTransfer(L.colorSpace)!==nt,(h!==L||p!==L.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,h=L,p=L.version,f=n.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null)):L&&L.isTexture&&(c===void 0&&(c=new Kt(new Ln(2,2),new Yn({name:"BackgroundMaterial",uniforms:_r(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=L,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(L.colorSpace)!==nt,L.matrixAutoUpdate===!0&&L.updateMatrix(),c.material.uniforms.uvTransform.value.copy(L.matrix),(h!==L||p!==L.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=L,p=L.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function u(y,A){y.getRGB(Ns,Wd(n)),i.buffers.color.setClear(Ns.r,Ns.g,Ns.b,A,o)}function E(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,A=1){a.set(y),l=A,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,u(a,l)},render:b,addToRenderList:m,dispose:E}}function U0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=p(null);let s=r,o=!1;function a(v,R,B,z,q){let W=!1;const $=h(z,B,R);s!==$&&(s=$,c(s.object)),W=f(v,z,B,q),W&&_(v,z,B,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,A(v,R,B,z),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function d(v){return n.deleteVertexArray(v)}function h(v,R,B){const z=B.wireframe===!0;let q=i[v.id];q===void 0&&(q={},i[v.id]=q);let W=q[R.id];W===void 0&&(W={},q[R.id]=W);let $=W[z];return $===void 0&&($=p(l()),W[z]=$),$}function p(v){const R=[],B=[],z=[];for(let q=0;q<t;q++)R[q]=0,B[q]=0,z[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:B,attributeDivisors:z,object:v,attributes:{},index:null}}function f(v,R,B,z){const q=s.attributes,W=R.attributes;let $=0;const Q=B.getAttributes();for(const H in Q)if(Q[H].location>=0){const oe=q[H];let we=W[H];if(we===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(we=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(we=v.instanceColor)),oe===void 0||oe.attribute!==we||we&&oe.data!==we.data)return!0;$++}return s.attributesNum!==$||s.index!==z}function _(v,R,B,z){const q={},W=R.attributes;let $=0;const Q=B.getAttributes();for(const H in Q)if(Q[H].location>=0){let oe=W[H];oe===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(oe=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(oe=v.instanceColor));const we={};we.attribute=oe,oe&&oe.data&&(we.data=oe.data),q[H]=we,$++}s.attributes=q,s.attributesNum=$,s.index=z}function b(){const v=s.newAttributes;for(let R=0,B=v.length;R<B;R++)v[R]=0}function m(v){u(v,0)}function u(v,R){const B=s.newAttributes,z=s.enabledAttributes,q=s.attributeDivisors;B[v]=1,z[v]===0&&(n.enableVertexAttribArray(v),z[v]=1),q[v]!==R&&(n.vertexAttribDivisor(v,R),q[v]=R)}function E(){const v=s.newAttributes,R=s.enabledAttributes;for(let B=0,z=R.length;B<z;B++)R[B]!==v[B]&&(n.disableVertexAttribArray(B),R[B]=0)}function y(v,R,B,z,q,W,$){$===!0?n.vertexAttribIPointer(v,R,B,q,W):n.vertexAttribPointer(v,R,B,z,q,W)}function A(v,R,B,z){b();const q=z.attributes,W=B.getAttributes(),$=R.defaultAttributeValues;for(const Q in W){const H=W[Q];if(H.location>=0){let ie=q[Q];if(ie===void 0&&(Q==="instanceMatrix"&&v.instanceMatrix&&(ie=v.instanceMatrix),Q==="instanceColor"&&v.instanceColor&&(ie=v.instanceColor)),ie!==void 0){const oe=ie.normalized,we=ie.itemSize,je=e.get(ie);if(je===void 0)continue;const Qe=je.buffer,ot=je.type,at=je.bytesPerElement,X=ot===n.INT||ot===n.UNSIGNED_INT||ie.gpuType===Qa;if(ie.isInterleavedBufferAttribute){const K=ie.data,pe=K.stride,Ie=ie.offset;if(K.isInstancedInterleavedBuffer){for(let ve=0;ve<H.locationSize;ve++)u(H.location+ve,K.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ve=0;ve<H.locationSize;ve++)m(H.location+ve);n.bindBuffer(n.ARRAY_BUFFER,Qe);for(let ve=0;ve<H.locationSize;ve++)y(H.location+ve,we/H.locationSize,ot,oe,pe*at,(Ie+we/H.locationSize*ve)*at,X)}else{if(ie.isInstancedBufferAttribute){for(let K=0;K<H.locationSize;K++)u(H.location+K,ie.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let K=0;K<H.locationSize;K++)m(H.location+K);n.bindBuffer(n.ARRAY_BUFFER,Qe);for(let K=0;K<H.locationSize;K++)y(H.location+K,we/H.locationSize,ot,oe,we*at,we/H.locationSize*K*at,X)}}else if($!==void 0){const oe=$[Q];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(H.location,oe);break;case 3:n.vertexAttrib3fv(H.location,oe);break;case 4:n.vertexAttrib4fv(H.location,oe);break;default:n.vertexAttrib1fv(H.location,oe)}}}}E()}function L(){k();for(const v in i){const R=i[v];for(const B in R){const z=R[B];for(const q in z)d(z[q].object),delete z[q];delete R[B]}delete i[v]}}function M(v){if(i[v.id]===void 0)return;const R=i[v.id];for(const B in R){const z=R[B];for(const q in z)d(z[q].object),delete z[q];delete R[B]}delete i[v.id]}function P(v){for(const R in i){const B=i[R];if(B[v.id]===void 0)continue;const z=B[v.id];for(const q in z)d(z[q].object),delete z[q];delete B[v.id]}}function k(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:k,resetDefaultState:S,dispose:L,releaseStatesOfGeometry:M,releaseStatesOfProgram:P,initAttributes:b,enableAttribute:m,disableUnusedAttributes:E}}function N0(n,e,t){let i;function r(c){i=c}function s(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function o(c,d,h){h!==0&&(n.drawArraysInstanced(i,c,d,h),t.update(d,i,h))}function a(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let f=0;for(let _=0;_<h;_++)f+=d[_];t.update(f,i,1)}function l(c,d,h,p){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)o(c[_],d[_],p[_]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,d,0,p,0,h);let _=0;for(let b=0;b<h;b++)_+=d[b]*p[b];t.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function F0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==Sn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const k=P===br&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Pn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Wn&&!k)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(De("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),A=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=_>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:_,maxTextureSize:b,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:A,vertexTextures:L,maxSamples:M}}function O0(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new li,a=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const f=h.length!==0||p||i!==0||r;return r=p,i=h.length,f},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=d(h,p,0)},this.setState=function(h,p,f){const _=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,u=n.get(h);if(!r||_===null||_.length===0||s&&!m)s?d(null):c();else{const E=s?0:i,y=E*4;let A=u.clippingState||null;l.value=A,A=d(_,p,y,f);for(let L=0;L!==y;++L)A[L]=t[L];u.clippingState=A,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,p,f,_){const b=h!==null?h.length:0;let m=null;if(b!==0){if(m=l.value,_!==!0||m===null){const u=f+b*4,E=p.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<u)&&(m=new Float32Array(u));for(let y=0,A=f;y!==b;++y,A+=4)o.copy(h[y]).applyMatrix4(E,a),o.normal.toArray(m,A),m[A+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function B0(n){let e=new WeakMap;function t(o,a){return a===da?o.mapping=mr:a===ha&&(o.mapping=xr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===da||a===ha)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ip(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const di=4,Ec=[.125,.215,.35,.446,.526,.582],Ai=20,k0=512,Ir=new ul,Cc=new qe;let Vo=null,zo=0,Ho=0,Go=!1;const V0=new N;class Tc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=V0}=s;Vo=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vo,zo,Ho),this._renderer.xr.enabled=Go,e.scissorTest=!1,rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mr||e.mapping===xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vo=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),Go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:br,format:Sn,colorSpace:gr,depthBuffer:!1},r=Ac(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ac(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=z0(s)),this._blurMaterial=G0(s,e,t)}return r}_compileMaterial(e){const t=new Kt(new xi,e);this._renderer.compile(t,Ir)}_sceneToCubeUV(e,t,i,r,s){const l=new un(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,f=h.toneMapping;h.getClearColor(Cc),h.toneMapping=ui,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new ki,new ll({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let u=!1;const E=e.background;E?E.isColor&&(m.color.copy(E),e.background=null,u=!0):(m.color.copy(Cc),u=!0);for(let y=0;y<6;y++){const A=y%3;A===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[y],s.y,s.z)):A===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[y]));const L=this._cubeSize;rr(r,A*L,y>2?L:0,L,L),h.setRenderTarget(r),u&&h.render(b,l),h.render(e,l)}h.toneMapping=f,h.autoClear=p,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===mr||e.mapping===xr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;rr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Ir)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget;if(this._ggxMaterial===null){const E=3*Math.max(this._cubeSize,16),y=4*this._cubeSize;this._ggxMaterial=H0(this._lodMax,E,y)}const o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),p=.05+c*.95,f=h*p,{_lodMax:_}=this,b=this._sizeLods[i],m=3*b*(i>_-di?i-_+di:0),u=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=_-t,rr(s,m,u,3*b,2*b),r.setRenderTarget(s),r.render(a,Ir),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,rr(e,m,u,3*b,2*b),r.setRenderTarget(e),r.render(a,Ir)}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&yt("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=c;const p=c.uniforms,f=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ai-1),b=s/_,m=isFinite(s)?1+Math.floor(d*b):Ai;m>Ai&&De(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ai}`);const u=[];let E=0;for(let P=0;P<Ai;++P){const k=P/b,S=Math.exp(-k*k/2);u.push(S),P===0?E+=S:P<m&&(E+=2*S)}for(let P=0;P<u.length;P++)u[P]=u[P]/E;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=u,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:y}=this;p.dTheta.value=_,p.mipInt.value=y-i;const A=this._sizeLods[r],L=3*A*(r>y-di?r-y+di:0),M=4*(this._cubeSize-A);rr(t,L,M,3*A,2*A),l.setRenderTarget(t),l.render(h,Ir)}}function z0(n){const e=[],t=[],i=[];let r=n;const s=n-di+1+Ec.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-di?l=Ec[o-n+di-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),d=-c,h=1+c,p=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,_=6,b=3,m=2,u=1,E=new Float32Array(b*_*f),y=new Float32Array(m*_*f),A=new Float32Array(u*_*f);for(let M=0;M<f;M++){const P=M%3*2/3-1,k=M>2?0:-1,S=[P,k,0,P+2/3,k,0,P+2/3,k+1,0,P,k,0,P+2/3,k+1,0,P,k+1,0];E.set(S,b*_*M),y.set(p,m*_*M);const v=[M,M,M,M,M,M];A.set(v,u*_*M)}const L=new xi;L.setAttribute("position",new An(E,b)),L.setAttribute("uv",new An(y,m)),L.setAttribute("faceIndex",new An(A,u)),i.push(new Kt(L,null)),r>di&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ac(n,e,t){const i=new Ui(n,e,t);return i.texture.mapping=io,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function rr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function H0(n,e,t){return new Yn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:k0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function G0(n,e,t){const i=new Float32Array(Ai),r=new N(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ro(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Pc(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ro(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Rc(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function ro(){return`

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
	`}function W0(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===da||l===ha,d=l===mr||l===xr;if(c||d){let h=e.get(a);const p=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new Tc(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||d&&f&&r(f)?(t===null&&(t=new Tc(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function X0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&jr("WebGLRenderer: "+i+" extension not supported."),r}}}function j0(n,e,t,i){const r={},s=new WeakMap;function o(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const _ in p.attributes)e.remove(p.attributes[_]);p.removeEventListener("dispose",o),delete r[p.id];const f=s.get(p);f&&(e.remove(f),s.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(h,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,t.memory.geometries++),p}function l(h){const p=h.attributes;for(const f in p)e.update(p[f],n.ARRAY_BUFFER)}function c(h){const p=[],f=h.index,_=h.attributes.position;let b=0;if(f!==null){const E=f.array;b=f.version;for(let y=0,A=E.length;y<A;y+=3){const L=E[y+0],M=E[y+1],P=E[y+2];p.push(L,M,M,P,P,L)}}else if(_!==void 0){const E=_.array;b=_.version;for(let y=0,A=E.length/3-1;y<A;y+=3){const L=y+0,M=y+1,P=y+2;p.push(L,M,M,P,P,L)}}else return;const m=new(Od(p)?Gd:Hd)(p,1);m.version=b;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function d(h){const p=s.get(h);if(p){const f=h.index;f!==null&&p.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function q0(n,e,t){let i;function r(p){i=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,f){n.drawElements(i,f,s,p*o),t.update(f,i,1)}function c(p,f,_){_!==0&&(n.drawElementsInstanced(i,f,s,p*o,_),t.update(f,i,_))}function d(p,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,p,0,_);let m=0;for(let u=0;u<_;u++)m+=f[u];t.update(m,i,1)}function h(p,f,_,b){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<p.length;u++)c(p[u]/o,f[u],b[u]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,p,0,b,0,_);let u=0;for(let E=0;E<_;E++)u+=f[E]*b[E];t.update(u,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function $0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:yt("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Y0(n,e,t){const i=new WeakMap,r=new wt;function s(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let p=i.get(a);if(p===void 0||p.count!==h){let v=function(){k.dispose(),i.delete(a),a.removeEventListener("dispose",v)};var f=v;p!==void 0&&p.texture.dispose();const _=a.morphAttributes.position!==void 0,b=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let A=0;_===!0&&(A=1),b===!0&&(A=2),m===!0&&(A=3);let L=a.attributes.position.count*A,M=1;L>e.maxTextureSize&&(M=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const P=new Float32Array(L*M*4*h),k=new Bd(P,L,M,h);k.type=Wn,k.needsUpdate=!0;const S=A*4;for(let R=0;R<h;R++){const B=u[R],z=E[R],q=y[R],W=L*M*4*R;for(let $=0;$<B.count;$++){const Q=$*S;_===!0&&(r.fromBufferAttribute(B,$),P[W+Q+0]=r.x,P[W+Q+1]=r.y,P[W+Q+2]=r.z,P[W+Q+3]=0),b===!0&&(r.fromBufferAttribute(z,$),P[W+Q+4]=r.x,P[W+Q+5]=r.y,P[W+Q+6]=r.z,P[W+Q+7]=0),m===!0&&(r.fromBufferAttribute(q,$),P[W+Q+8]=r.x,P[W+Q+9]=r.y,P[W+Q+10]=r.z,P[W+Q+11]=q.itemSize===4?r.w:1)}}p={count:h,texture:k,size:new Ue(L,M)},i.set(a,p),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const b=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",b),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:s}}function K0(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Zd=new Ft,Lc=new qd(1,1),Jd=new Bd,Qd=new xp,eh=new jd,Dc=[],Ic=[],Uc=new Float32Array(16),Nc=new Float32Array(9),Fc=new Float32Array(4);function wr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Dc[r];if(s===void 0&&(s=new Float32Array(r),Dc[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function so(n,e){let t=Ic[e];t===void 0&&(t=new Int32Array(e),Ic[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Z0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function J0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function Q0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function ex(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function tx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Pt(t,i))return;Fc.set(i),n.uniformMatrix2fv(this.addr,!1,Fc),Rt(t,i)}}function nx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Pt(t,i))return;Nc.set(i),n.uniformMatrix3fv(this.addr,!1,Nc),Rt(t,i)}}function ix(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Pt(t,i))return;Uc.set(i),n.uniformMatrix4fv(this.addr,!1,Uc),Rt(t,i)}}function rx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function sx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function ox(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function ax(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function lx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function cx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function dx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function hx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function ux(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Lc.compareFunction=Fd,s=Lc):s=Zd,t.setTexture2D(e||s,r)}function px(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Qd,r)}function fx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||eh,r)}function mx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Jd,r)}function xx(n){switch(n){case 5126:return Z0;case 35664:return J0;case 35665:return Q0;case 35666:return ex;case 35674:return tx;case 35675:return nx;case 35676:return ix;case 5124:case 35670:return rx;case 35667:case 35671:return sx;case 35668:case 35672:return ox;case 35669:case 35673:return ax;case 5125:return lx;case 36294:return cx;case 36295:return dx;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return px;case 35680:case 36300:case 36308:case 36293:return fx;case 36289:case 36303:case 36311:case 36292:return mx}}function gx(n,e){n.uniform1fv(this.addr,e)}function _x(n,e){const t=wr(e,this.size,2);n.uniform2fv(this.addr,t)}function vx(n,e){const t=wr(e,this.size,3);n.uniform3fv(this.addr,t)}function bx(n,e){const t=wr(e,this.size,4);n.uniform4fv(this.addr,t)}function Sx(n,e){const t=wr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function wx(n,e){const t=wr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function yx(n,e){const t=wr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Mx(n,e){n.uniform1iv(this.addr,e)}function Ex(n,e){n.uniform2iv(this.addr,e)}function Cx(n,e){n.uniform3iv(this.addr,e)}function Tx(n,e){n.uniform4iv(this.addr,e)}function Ax(n,e){n.uniform1uiv(this.addr,e)}function Px(n,e){n.uniform2uiv(this.addr,e)}function Rx(n,e){n.uniform3uiv(this.addr,e)}function Lx(n,e){n.uniform4uiv(this.addr,e)}function Dx(n,e,t){const i=this.cache,r=e.length,s=so(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Zd,s[o])}function Ix(n,e,t){const i=this.cache,r=e.length,s=so(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Qd,s[o])}function Ux(n,e,t){const i=this.cache,r=e.length,s=so(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||eh,s[o])}function Nx(n,e,t){const i=this.cache,r=e.length,s=so(t,r);Pt(i,s)||(n.uniform1iv(this.addr,s),Rt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Jd,s[o])}function Fx(n){switch(n){case 5126:return gx;case 35664:return _x;case 35665:return vx;case 35666:return bx;case 35674:return Sx;case 35675:return wx;case 35676:return yx;case 5124:case 35670:return Mx;case 35667:case 35671:return Ex;case 35668:case 35672:return Cx;case 35669:case 35673:return Tx;case 5125:return Ax;case 36294:return Px;case 36295:return Rx;case 36296:return Lx;case 35678:case 36198:case 36298:case 36306:case 35682:return Dx;case 35679:case 36299:case 36307:return Ix;case 35680:case 36300:case 36308:case 36293:return Ux;case 36289:case 36303:case 36311:case 36292:return Nx}}class Ox{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=xx(t.type)}}class Bx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fx(t.type)}}class kx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Wo=/(\w+)(\])?(\[|\.)?/g;function Oc(n,e){n.seq.push(e),n.map[e.id]=e}function Vx(n,e,t){const i=n.name,r=i.length;for(Wo.lastIndex=0;;){const s=Wo.exec(i),o=Wo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Oc(t,c===void 0?new Ox(a,n,e):new Bx(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new kx(a),Oc(t,h)),t=h}}}class Ws{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Vx(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Bc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const zx=37297;let Hx=0;function Gx(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const kc=new Ne;function Wx(n){Ke._getMatrix(kc,Ke.workingColorSpace,n);const e=`mat3( ${kc.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case Ys:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Vc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Gx(n.getShaderSource(e),a)}else return s}function Xx(n,e){const t=Wx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function jx(n,e){let t;switch(e){case Gu:t="Linear";break;case Wu:t="Reinhard";break;case Xu:t="Cineon";break;case ju:t="ACESFilmic";break;case $u:t="AgX";break;case Yu:t="Neutral";break;case qu:t="Custom";break;default:De("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Fs=new N;function qx(){Ke.getLuminanceCoefficients(Fs);const n=Fs.x.toFixed(4),e=Fs.y.toFixed(4),t=Fs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $x(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kr).join(`
`)}function Yx(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Kx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function kr(n){return n!==""}function zc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Zx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ga(n){return n.replace(Zx,Qx)}const Jx=new Map;function Qx(n,e){let t=Oe[e];if(t===void 0){const i=Jx.get(e);if(i!==void 0)t=Oe[i],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ga(t)}const eg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gc(n){return n.replace(eg,tg)}function tg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Wc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ng(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ed?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ja?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Hn&&(e="SHADOWMAP_TYPE_VSM"),e}function ig(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case mr:case xr:e="ENVMAP_TYPE_CUBE";break;case io:e="ENVMAP_TYPE_CUBE_UV";break}return e}function rg(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case xr:e="ENVMAP_MODE_REFRACTION";break}return e}function sg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Cd:e="ENVMAP_BLENDING_MULTIPLY";break;case zu:e="ENVMAP_BLENDING_MIX";break;case Hu:e="ENVMAP_BLENDING_ADD";break}return e}function og(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ag(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=ng(t),c=ig(t),d=rg(t),h=sg(t),p=og(t),f=$x(t),_=Yx(s),b=r.createProgram();let m,u,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(kr).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(kr).join(`
`),u.length>0&&(u+=`
`)):(m=[Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),u=[Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ui?"#define TONE_MAPPING":"",t.toneMapping!==ui?Oe.tonemapping_pars_fragment:"",t.toneMapping!==ui?jx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Xx("linearToOutputTexel",t.outputColorSpace),qx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kr).join(`
`)),o=Ga(o),o=zc(o,t),o=Hc(o,t),a=Ga(a),a=zc(a,t),a=Hc(a,t),o=Gc(o),a=Gc(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=E+m+o,A=E+u+a,L=Bc(r,r.VERTEX_SHADER,y),M=Bc(r,r.FRAGMENT_SHADER,A);r.attachShader(b,L),r.attachShader(b,M),t.index0AttributeName!==void 0?r.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function P(R){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(b)||"",z=r.getShaderInfoLog(L)||"",q=r.getShaderInfoLog(M)||"",W=B.trim(),$=z.trim(),Q=q.trim();let H=!0,ie=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,b,L,M);else{const oe=Vc(r,L,"vertex"),we=Vc(r,M,"fragment");yt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+oe+`
`+we)}else W!==""?De("WebGLProgram: Program Info Log:",W):($===""||Q==="")&&(ie=!1);ie&&(R.diagnostics={runnable:H,programLog:W,vertexShader:{log:$,prefix:m},fragmentShader:{log:Q,prefix:u}})}r.deleteShader(L),r.deleteShader(M),k=new Ws(r,b),S=Kx(r,b)}let k;this.getUniforms=function(){return k===void 0&&P(this),k};let S;this.getAttributes=function(){return S===void 0&&P(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(b,zx)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Hx++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=L,this.fragmentShader=M,this}let lg=0;class cg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new dg(e),t.set(e,i)),i}}class dg{constructor(e){this.id=lg++,this.code=e,this.usedTimes=0}}function hg(n,e,t,i,r,s,o){const a=new Vd,l=new cg,c=new Set,d=[],h=r.logarithmicDepthBuffer,p=r.vertexTextures;let f=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,v,R,B,z){const q=B.fog,W=z.geometry,$=S.isMeshStandardMaterial?B.environment:null,Q=(S.isMeshStandardMaterial?t:e).get(S.envMap||$),H=Q&&Q.mapping===io?Q.image.height:null,ie=_[S.type];S.precision!==null&&(f=r.getMaxPrecision(S.precision),f!==S.precision&&De("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const oe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,we=oe!==void 0?oe.length:0;let je=0;W.morphAttributes.position!==void 0&&(je=1),W.morphAttributes.normal!==void 0&&(je=2),W.morphAttributes.color!==void 0&&(je=3);let Qe,ot,at,X;if(ie){const et=yn[ie];Qe=et.vertexShader,ot=et.fragmentShader}else Qe=S.vertexShader,ot=S.fragmentShader,l.update(S),at=l.getVertexShaderID(S),X=l.getFragmentShaderID(S);const K=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),Ie=z.isInstancedMesh===!0,ve=z.isBatchedMesh===!0,ze=!!S.map,It=!!S.matcap,ke=!!Q,ut=!!S.aoMap,C=!!S.lightMap,He=!!S.bumpMap,Ge=!!S.normalMap,lt=!!S.displacementMap,xe=!!S.emissiveMap,ft=!!S.metalnessMap,Se=!!S.roughnessMap,Le=S.anisotropy>0,w=S.clearcoat>0,x=S.dispersion>0,U=S.iridescence>0,G=S.sheen>0,Y=S.transmission>0,V=Le&&!!S.anisotropyMap,_e=w&&!!S.clearcoatMap,le=w&&!!S.clearcoatNormalMap,ye=w&&!!S.clearcoatRoughnessMap,ge=U&&!!S.iridescenceMap,Z=U&&!!S.iridescenceThicknessMap,ne=G&&!!S.sheenColorMap,Te=G&&!!S.sheenRoughnessMap,Ee=!!S.specularMap,he=!!S.specularColorMap,Pe=!!S.specularIntensityMap,T=Y&&!!S.transmissionMap,ce=Y&&!!S.thicknessMap,re=!!S.gradientMap,se=!!S.alphaMap,ee=S.alphaTest>0,j=!!S.alphaHash,fe=!!S.extensions;let Re=ui;S.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Re=n.toneMapping);const dt={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:Qe,fragmentShader:ot,defines:S.defines,customVertexShaderID:at,customFragmentShaderID:X,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:ve,batchingColor:ve&&z._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&z.instanceColor!==null,instancingMorph:Ie&&z.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:gr,alphaToCoverage:!!S.alphaToCoverage,map:ze,matcap:It,envMap:ke,envMapMode:ke&&Q.mapping,envMapCubeUVHeight:H,aoMap:ut,lightMap:C,bumpMap:He,normalMap:Ge,displacementMap:p&&lt,emissiveMap:xe,normalMapObjectSpace:Ge&&S.normalMapType===Qu,normalMapTangentSpace:Ge&&S.normalMapType===Nd,metalnessMap:ft,roughnessMap:Se,anisotropy:Le,anisotropyMap:V,clearcoat:w,clearcoatMap:_e,clearcoatNormalMap:le,clearcoatRoughnessMap:ye,dispersion:x,iridescence:U,iridescenceMap:ge,iridescenceThicknessMap:Z,sheen:G,sheenColorMap:ne,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:he,specularIntensityMap:Pe,transmission:Y,transmissionMap:T,thicknessMap:ce,gradientMap:re,opaque:S.transparent===!1&&S.blending===dr&&S.alphaToCoverage===!1,alphaMap:se,alphaTest:ee,alphaHash:j,combine:S.combine,mapUv:ze&&b(S.map.channel),aoMapUv:ut&&b(S.aoMap.channel),lightMapUv:C&&b(S.lightMap.channel),bumpMapUv:He&&b(S.bumpMap.channel),normalMapUv:Ge&&b(S.normalMap.channel),displacementMapUv:lt&&b(S.displacementMap.channel),emissiveMapUv:xe&&b(S.emissiveMap.channel),metalnessMapUv:ft&&b(S.metalnessMap.channel),roughnessMapUv:Se&&b(S.roughnessMap.channel),anisotropyMapUv:V&&b(S.anisotropyMap.channel),clearcoatMapUv:_e&&b(S.clearcoatMap.channel),clearcoatNormalMapUv:le&&b(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&b(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&b(S.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&b(S.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&b(S.sheenColorMap.channel),sheenRoughnessMapUv:Te&&b(S.sheenRoughnessMap.channel),specularMapUv:Ee&&b(S.specularMap.channel),specularColorMapUv:he&&b(S.specularColorMap.channel),specularIntensityMapUv:Pe&&b(S.specularIntensityMap.channel),transmissionMapUv:T&&b(S.transmissionMap.channel),thicknessMapUv:ce&&b(S.thicknessMap.channel),alphaMapUv:se&&b(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Ge||Le),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!W.attributes.uv&&(ze||se),fog:!!q,useFog:S.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:pe,skinning:z.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:je,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Re,decodeVideoTexture:ze&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===nt,decodeVideoTextureEmissive:xe&&S.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(S.emissiveMap.colorSpace)===nt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===zt,flipSided:S.side===Yt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:fe&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&S.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function u(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)v.push(R),v.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(E(v,S),y(v,S),v.push(n.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function E(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function y(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function A(S){const v=_[S.type];let R;if(v){const B=yn[v];R=Pp.clone(B.uniforms)}else R=S.uniforms;return R}function L(S,v){let R;for(let B=0,z=d.length;B<z;B++){const q=d[B];if(q.cacheKey===v){R=q,++R.usedTimes;break}}return R===void 0&&(R=new ag(n,v,S,s),d.push(R)),R}function M(S){if(--S.usedTimes===0){const v=d.indexOf(S);d[v]=d[d.length-1],d.pop(),S.destroy()}}function P(S){l.remove(S)}function k(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:A,acquireProgram:L,releaseProgram:M,releaseShaderCache:P,programs:d,dispose:k}}function ug(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function pg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Xc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function jc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,p,f,_,b,m){let u=n[e];return u===void 0?(u={id:h.id,object:h,geometry:p,material:f,groupOrder:_,renderOrder:h.renderOrder,z:b,group:m},n[e]=u):(u.id=h.id,u.object=h,u.geometry=p,u.material=f,u.groupOrder=_,u.renderOrder=h.renderOrder,u.z=b,u.group=m),e++,u}function a(h,p,f,_,b,m){const u=o(h,p,f,_,b,m);f.transmission>0?i.push(u):f.transparent===!0?r.push(u):t.push(u)}function l(h,p,f,_,b,m){const u=o(h,p,f,_,b,m);f.transmission>0?i.unshift(u):f.transparent===!0?r.unshift(u):t.unshift(u)}function c(h,p){t.length>1&&t.sort(h||pg),i.length>1&&i.sort(p||Xc),r.length>1&&r.sort(p||Xc)}function d(){for(let h=e,p=n.length;h<p;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:d,sort:c}}function fg(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new jc,n.set(i,[o])):r>=s.length?(o=new jc,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function mg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new qe};break;case"SpotLight":t={position:new N,direction:new N,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function xg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let gg=0;function _g(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function vg(n){const e=new mg,t=xg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const r=new N,s=new Mt,o=new Mt;function a(c){let d=0,h=0,p=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,_=0,b=0,m=0,u=0,E=0,y=0,A=0,L=0,M=0,P=0;c.sort(_g);for(let S=0,v=c.length;S<v;S++){const R=c[S],B=R.color,z=R.intensity,q=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=B.r*z,h+=B.g*z,p+=B.b*z;else if(R.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(R.sh.coefficients[$],z);P++}else if(R.isDirectionalLight){const $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Q=R.shadow,H=t.get(R);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,i.directionalShadow[f]=H,i.directionalShadowMap[f]=W,i.directionalShadowMatrix[f]=R.shadow.matrix,E++}i.directional[f]=$,f++}else if(R.isSpotLight){const $=e.get(R);$.position.setFromMatrixPosition(R.matrixWorld),$.color.copy(B).multiplyScalar(z),$.distance=q,$.coneCos=Math.cos(R.angle),$.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),$.decay=R.decay,i.spot[b]=$;const Q=R.shadow;if(R.map&&(i.spotLightMap[L]=R.map,L++,Q.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[b]=Q.matrix,R.castShadow){const H=t.get(R);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,i.spotShadow[b]=H,i.spotShadowMap[b]=W,A++}b++}else if(R.isRectAreaLight){const $=e.get(R);$.color.copy(B).multiplyScalar(z),$.halfWidth.set(R.width*.5,0,0),$.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=$,m++}else if(R.isPointLight){const $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),$.distance=R.distance,$.decay=R.decay,R.castShadow){const Q=R.shadow,H=t.get(R);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,H.shadowCameraNear=Q.camera.near,H.shadowCameraFar=Q.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=W,i.pointShadowMatrix[_]=R.shadow.matrix,y++}i.point[_]=$,_++}else if(R.isHemisphereLight){const $=e.get(R);$.skyColor.copy(R.color).multiplyScalar(z),$.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[u]=$,u++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=p;const k=i.hash;(k.directionalLength!==f||k.pointLength!==_||k.spotLength!==b||k.rectAreaLength!==m||k.hemiLength!==u||k.numDirectionalShadows!==E||k.numPointShadows!==y||k.numSpotShadows!==A||k.numSpotMaps!==L||k.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=b,i.rectArea.length=m,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=A+L-M,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=P,k.directionalLength=f,k.pointLength=_,k.spotLength=b,k.rectAreaLength=m,k.hemiLength=u,k.numDirectionalShadows=E,k.numPointShadows=y,k.numSpotShadows=A,k.numSpotMaps=L,k.numLightProbes=P,i.version=gg++)}function l(c,d){let h=0,p=0,f=0,_=0,b=0;const m=d.matrixWorldInverse;for(let u=0,E=c.length;u<E;u++){const y=c[u];if(y.isDirectionalLight){const A=i.directional[h];A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),h++}else if(y.isSpotLight){const A=i.spot[f];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const A=i.rectArea[_];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){const A=i.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),p++}else if(y.isHemisphereLight){const A=i.hemi[b];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(m),b++}}}return{setup:a,setupView:l,state:i}}function qc(n){const e=new vg(n),t=[],i=[];function r(d){c.camera=d,t.length=0,i.length=0}function s(d){t.push(d)}function o(d){i.push(d)}function a(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function bg(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new qc(n),e.set(r,[a])):s>=o.length?(a=new qc(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const Sg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wg=`uniform sampler2D shadow_pass;
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
}`;function yg(n,e,t){let i=new cl;const r=new Ue,s=new Ue,o=new wt,a=new Vp({depthPacking:Ju}),l=new zp,c={},d=t.maxTextureSize,h={[fi]:Yt,[Yt]:fi,[zt]:zt},p=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Sg,fragmentShader:wg}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const _=new xi;_.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Kt(_,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ed;let u=this.type;this.render=function(M,P,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const S=n.getRenderTarget(),v=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),B=n.state;B.setBlending(jn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=u!==Hn&&this.type===Hn,q=u===Hn&&this.type!==Hn;for(let W=0,$=M.length;W<$;W++){const Q=M[W],H=Q.shadow;if(H===void 0){De("WebGLShadowMap:",Q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ie=H.getFrameExtents();if(r.multiply(ie),s.copy(H.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/ie.x),r.x=s.x*ie.x,H.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/ie.y),r.y=s.y*ie.y,H.mapSize.y=s.y)),H.map===null||z===!0||q===!0){const we=this.type!==Hn?{minFilter:rn,magFilter:rn}:{};H.map!==null&&H.map.dispose(),H.map=new Ui(r.x,r.y,we),H.map.texture.name=Q.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const oe=H.getViewportCount();for(let we=0;we<oe;we++){const je=H.getViewport(we);o.set(s.x*je.x,s.y*je.y,s.x*je.z,s.y*je.w),B.viewport(o),H.updateMatrices(Q,we),i=H.getFrustum(),A(P,k,H.camera,Q,this.type)}H.isPointLightShadow!==!0&&this.type===Hn&&E(H,k),H.needsUpdate=!1}u=this.type,m.needsUpdate=!1,n.setRenderTarget(S,v,R)};function E(M,P){const k=e.update(b);p.defines.VSM_SAMPLES!==M.blurSamples&&(p.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ui(r.x,r.y)),p.uniforms.shadow_pass.value=M.map.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(P,null,k,p,b,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(P,null,k,f,b,null)}function y(M,P,k,S){let v=null;const R=k.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)v=R;else if(v=k.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=v.uuid,z=P.uuid;let q=c[B];q===void 0&&(q={},c[B]=q);let W=q[z];W===void 0&&(W=v.clone(),q[z]=W,P.addEventListener("dispose",L)),v=W}if(v.visible=P.visible,v.wireframe=P.wireframe,S===Hn?v.side=P.shadowSide!==null?P.shadowSide:P.side:v.side=P.shadowSide!==null?P.shadowSide:h[P.side],v.alphaMap=P.alphaMap,v.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,v.map=P.map,v.clipShadows=P.clipShadows,v.clippingPlanes=P.clippingPlanes,v.clipIntersection=P.clipIntersection,v.displacementMap=P.displacementMap,v.displacementScale=P.displacementScale,v.displacementBias=P.displacementBias,v.wireframeLinewidth=P.wireframeLinewidth,v.linewidth=P.linewidth,k.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const B=n.properties.get(v);B.light=k}return v}function A(M,P,k,S,v){if(M.visible===!1)return;if(M.layers.test(P.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&v===Hn)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,M.matrixWorld);const z=e.update(M),q=M.material;if(Array.isArray(q)){const W=z.groups;for(let $=0,Q=W.length;$<Q;$++){const H=W[$],ie=q[H.materialIndex];if(ie&&ie.visible){const oe=y(M,ie,S,v);M.onBeforeShadow(n,M,P,k,z,oe,H),n.renderBufferDirect(k,null,z,oe,M,H),M.onAfterShadow(n,M,P,k,z,oe,H)}}}else if(q.visible){const W=y(M,q,S,v);M.onBeforeShadow(n,M,P,k,z,W,null),n.renderBufferDirect(k,null,z,W,M,null),M.onAfterShadow(n,M,P,k,z,W,null)}}const B=M.children;for(let z=0,q=B.length;z<q;z++)A(B[z],P,k,S,v)}function L(M){M.target.removeEventListener("dispose",L);for(const k in c){const S=c[k],v=M.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}const Mg={[ia]:ra,[sa]:la,[oa]:ca,[fr]:aa,[ra]:ia,[la]:sa,[ca]:oa,[aa]:fr};function Eg(n,e){function t(){let T=!1;const ce=new wt;let re=null;const se=new wt(0,0,0,0);return{setMask:function(ee){re!==ee&&!T&&(n.colorMask(ee,ee,ee,ee),re=ee)},setLocked:function(ee){T=ee},setClear:function(ee,j,fe,Re,dt){dt===!0&&(ee*=Re,j*=Re,fe*=Re),ce.set(ee,j,fe,Re),se.equals(ce)===!1&&(n.clearColor(ee,j,fe,Re),se.copy(ce))},reset:function(){T=!1,re=null,se.set(-1,0,0,0)}}}function i(){let T=!1,ce=!1,re=null,se=null,ee=null;return{setReversed:function(j){if(ce!==j){const fe=e.get("EXT_clip_control");j?fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.ZERO_TO_ONE_EXT):fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.NEGATIVE_ONE_TO_ONE_EXT),ce=j;const Re=ee;ee=null,this.setClear(Re)}},getReversed:function(){return ce},setTest:function(j){j?K(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(j){re!==j&&!T&&(n.depthMask(j),re=j)},setFunc:function(j){if(ce&&(j=Mg[j]),se!==j){switch(j){case ia:n.depthFunc(n.NEVER);break;case ra:n.depthFunc(n.ALWAYS);break;case sa:n.depthFunc(n.LESS);break;case fr:n.depthFunc(n.LEQUAL);break;case oa:n.depthFunc(n.EQUAL);break;case aa:n.depthFunc(n.GEQUAL);break;case la:n.depthFunc(n.GREATER);break;case ca:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}se=j}},setLocked:function(j){T=j},setClear:function(j){ee!==j&&(ce&&(j=1-j),n.clearDepth(j),ee=j)},reset:function(){T=!1,re=null,se=null,ee=null,ce=!1}}}function r(){let T=!1,ce=null,re=null,se=null,ee=null,j=null,fe=null,Re=null,dt=null;return{setTest:function(et){T||(et?K(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(et){ce!==et&&!T&&(n.stencilMask(et),ce=et)},setFunc:function(et,wn,xn){(re!==et||se!==wn||ee!==xn)&&(n.stencilFunc(et,wn,xn),re=et,se=wn,ee=xn)},setOp:function(et,wn,xn){(j!==et||fe!==wn||Re!==xn)&&(n.stencilOp(et,wn,xn),j=et,fe=wn,Re=xn)},setLocked:function(et){T=et},setClear:function(et){dt!==et&&(n.clearStencil(et),dt=et)},reset:function(){T=!1,ce=null,re=null,se=null,ee=null,j=null,fe=null,Re=null,dt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let d={},h={},p=new WeakMap,f=[],_=null,b=!1,m=null,u=null,E=null,y=null,A=null,L=null,M=null,P=new qe(0,0,0),k=0,S=!1,v=null,R=null,B=null,z=null,q=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,Q=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(H)[1]),$=Q>=1):H.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),$=Q>=2);let ie=null,oe={};const we=n.getParameter(n.SCISSOR_BOX),je=n.getParameter(n.VIEWPORT),Qe=new wt().fromArray(we),ot=new wt().fromArray(je);function at(T,ce,re,se){const ee=new Uint8Array(4),j=n.createTexture();n.bindTexture(T,j),n.texParameteri(T,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(T,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let fe=0;fe<re;fe++)T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,se,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(ce+fe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return j}const X={};X[n.TEXTURE_2D]=at(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=at(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=at(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=at(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(n.DEPTH_TEST),o.setFunc(fr),He(!1),Ge(Yl),K(n.CULL_FACE),ut(jn);function K(T){d[T]!==!0&&(n.enable(T),d[T]=!0)}function pe(T){d[T]!==!1&&(n.disable(T),d[T]=!1)}function Ie(T,ce){return h[T]!==ce?(n.bindFramebuffer(T,ce),h[T]=ce,T===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ce),T===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function ve(T,ce){let re=f,se=!1;if(T){re=p.get(ce),re===void 0&&(re=[],p.set(ce,re));const ee=T.textures;if(re.length!==ee.length||re[0]!==n.COLOR_ATTACHMENT0){for(let j=0,fe=ee.length;j<fe;j++)re[j]=n.COLOR_ATTACHMENT0+j;re.length=ee.length,se=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,se=!0);se&&n.drawBuffers(re)}function ze(T){return _!==T?(n.useProgram(T),_=T,!0):!1}const It={[Ti]:n.FUNC_ADD,[Mu]:n.FUNC_SUBTRACT,[Eu]:n.FUNC_REVERSE_SUBTRACT};It[Cu]=n.MIN,It[Tu]=n.MAX;const ke={[Au]:n.ZERO,[Pu]:n.ONE,[Ru]:n.SRC_COLOR,[ta]:n.SRC_ALPHA,[Fu]:n.SRC_ALPHA_SATURATE,[Uu]:n.DST_COLOR,[Du]:n.DST_ALPHA,[Lu]:n.ONE_MINUS_SRC_COLOR,[na]:n.ONE_MINUS_SRC_ALPHA,[Nu]:n.ONE_MINUS_DST_COLOR,[Iu]:n.ONE_MINUS_DST_ALPHA,[Ou]:n.CONSTANT_COLOR,[Bu]:n.ONE_MINUS_CONSTANT_COLOR,[ku]:n.CONSTANT_ALPHA,[Vu]:n.ONE_MINUS_CONSTANT_ALPHA};function ut(T,ce,re,se,ee,j,fe,Re,dt,et){if(T===jn){b===!0&&(pe(n.BLEND),b=!1);return}if(b===!1&&(K(n.BLEND),b=!0),T!==yu){if(T!==m||et!==S){if((u!==Ti||A!==Ti)&&(n.blendEquation(n.FUNC_ADD),u=Ti,A=Ti),et)switch(T){case dr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kl:n.blendFunc(n.ONE,n.ONE);break;case Zl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Jl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:yt("WebGLState: Invalid blending: ",T);break}else switch(T){case dr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Zl:yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jl:yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:yt("WebGLState: Invalid blending: ",T);break}E=null,y=null,L=null,M=null,P.set(0,0,0),k=0,m=T,S=et}return}ee=ee||ce,j=j||re,fe=fe||se,(ce!==u||ee!==A)&&(n.blendEquationSeparate(It[ce],It[ee]),u=ce,A=ee),(re!==E||se!==y||j!==L||fe!==M)&&(n.blendFuncSeparate(ke[re],ke[se],ke[j],ke[fe]),E=re,y=se,L=j,M=fe),(Re.equals(P)===!1||dt!==k)&&(n.blendColor(Re.r,Re.g,Re.b,dt),P.copy(Re),k=dt),m=T,S=!1}function C(T,ce){T.side===zt?pe(n.CULL_FACE):K(n.CULL_FACE);let re=T.side===Yt;ce&&(re=!re),He(re),T.blending===dr&&T.transparent===!1?ut(jn):ut(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),o.setFunc(T.depthFunc),o.setTest(T.depthTest),o.setMask(T.depthWrite),s.setMask(T.colorWrite);const se=T.stencilWrite;a.setTest(se),se&&(a.setMask(T.stencilWriteMask),a.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),a.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),xe(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(T){v!==T&&(T?n.frontFace(n.CW):n.frontFace(n.CCW),v=T)}function Ge(T){T!==Su?(K(n.CULL_FACE),T!==R&&(T===Yl?n.cullFace(n.BACK):T===wu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),R=T}function lt(T){T!==B&&($&&n.lineWidth(T),B=T)}function xe(T,ce,re){T?(K(n.POLYGON_OFFSET_FILL),(z!==ce||q!==re)&&(n.polygonOffset(ce,re),z=ce,q=re)):pe(n.POLYGON_OFFSET_FILL)}function ft(T){T?K(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function Se(T){T===void 0&&(T=n.TEXTURE0+W-1),ie!==T&&(n.activeTexture(T),ie=T)}function Le(T,ce,re){re===void 0&&(ie===null?re=n.TEXTURE0+W-1:re=ie);let se=oe[re];se===void 0&&(se={type:void 0,texture:void 0},oe[re]=se),(se.type!==T||se.texture!==ce)&&(ie!==re&&(n.activeTexture(re),ie=re),n.bindTexture(T,ce||X[T]),se.type=T,se.texture=ce)}function w(){const T=oe[ie];T!==void 0&&T.type!==void 0&&(n.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(T){T("WebGLState:",T)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(T){T("WebGLState:",T)}}function G(){try{n.texSubImage2D(...arguments)}catch(T){T("WebGLState:",T)}}function Y(){try{n.texSubImage3D(...arguments)}catch(T){T("WebGLState:",T)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(T){T("WebGLState:",T)}}function _e(){try{n.compressedTexSubImage3D(...arguments)}catch(T){T("WebGLState:",T)}}function le(){try{n.texStorage2D(...arguments)}catch(T){T("WebGLState:",T)}}function ye(){try{n.texStorage3D(...arguments)}catch(T){T("WebGLState:",T)}}function ge(){try{n.texImage2D(...arguments)}catch(T){T("WebGLState:",T)}}function Z(){try{n.texImage3D(...arguments)}catch(T){T("WebGLState:",T)}}function ne(T){Qe.equals(T)===!1&&(n.scissor(T.x,T.y,T.z,T.w),Qe.copy(T))}function Te(T){ot.equals(T)===!1&&(n.viewport(T.x,T.y,T.z,T.w),ot.copy(T))}function Ee(T,ce){let re=c.get(ce);re===void 0&&(re=new WeakMap,c.set(ce,re));let se=re.get(T);se===void 0&&(se=n.getUniformBlockIndex(ce,T.name),re.set(T,se))}function he(T,ce){const se=c.get(ce).get(T);l.get(ce)!==se&&(n.uniformBlockBinding(ce,se,T.__bindingPointIndex),l.set(ce,se))}function Pe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ie=null,oe={},h={},p=new WeakMap,f=[],_=null,b=!1,m=null,u=null,E=null,y=null,A=null,L=null,M=null,P=new qe(0,0,0),k=0,S=!1,v=null,R=null,B=null,z=null,q=null,Qe.set(0,0,n.canvas.width,n.canvas.height),ot.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:K,disable:pe,bindFramebuffer:Ie,drawBuffers:ve,useProgram:ze,setBlending:ut,setMaterial:C,setFlipSided:He,setCullFace:Ge,setLineWidth:lt,setPolygonOffset:xe,setScissorTest:ft,activeTexture:Se,bindTexture:Le,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:U,texImage2D:ge,texImage3D:Z,updateUBOMapping:Ee,uniformBlockBinding:he,texStorage2D:le,texStorage3D:ye,texSubImage2D:G,texSubImage3D:Y,compressedTexSubImage2D:V,compressedTexSubImage3D:_e,scissor:ne,viewport:Te,reset:Pe}}function Cg(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ue,d=new WeakMap;let h;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,x){return f?new OffscreenCanvas(w,x):Xr("canvas")}function b(w,x,U){let G=1;const Y=Le(w);if((Y.width>U||Y.height>U)&&(G=U/Math.max(Y.width,Y.height)),G<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const V=Math.floor(G*Y.width),_e=Math.floor(G*Y.height);h===void 0&&(h=_(V,_e));const le=x?_(V,_e):h;return le.width=V,le.height=_e,le.getContext("2d").drawImage(w,0,0,V,_e),De("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+V+"x"+_e+")."),le}else return"data"in w&&De("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),w;return w}function m(w){return w.generateMipmaps}function u(w){n.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(w,x,U,G,Y=!1){if(w!==null){if(n[w]!==void 0)return n[w];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let V=x;if(x===n.RED&&(U===n.FLOAT&&(V=n.R32F),U===n.HALF_FLOAT&&(V=n.R16F),U===n.UNSIGNED_BYTE&&(V=n.R8)),x===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(V=n.R8UI),U===n.UNSIGNED_SHORT&&(V=n.R16UI),U===n.UNSIGNED_INT&&(V=n.R32UI),U===n.BYTE&&(V=n.R8I),U===n.SHORT&&(V=n.R16I),U===n.INT&&(V=n.R32I)),x===n.RG&&(U===n.FLOAT&&(V=n.RG32F),U===n.HALF_FLOAT&&(V=n.RG16F),U===n.UNSIGNED_BYTE&&(V=n.RG8)),x===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(V=n.RG8UI),U===n.UNSIGNED_SHORT&&(V=n.RG16UI),U===n.UNSIGNED_INT&&(V=n.RG32UI),U===n.BYTE&&(V=n.RG8I),U===n.SHORT&&(V=n.RG16I),U===n.INT&&(V=n.RG32I)),x===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(V=n.RGB8UI),U===n.UNSIGNED_SHORT&&(V=n.RGB16UI),U===n.UNSIGNED_INT&&(V=n.RGB32UI),U===n.BYTE&&(V=n.RGB8I),U===n.SHORT&&(V=n.RGB16I),U===n.INT&&(V=n.RGB32I)),x===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(V=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(V=n.RGBA16UI),U===n.UNSIGNED_INT&&(V=n.RGBA32UI),U===n.BYTE&&(V=n.RGBA8I),U===n.SHORT&&(V=n.RGBA16I),U===n.INT&&(V=n.RGBA32I)),x===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(V=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(V=n.R11F_G11F_B10F)),x===n.RGBA){const _e=Y?Ys:Ke.getTransfer(G);U===n.FLOAT&&(V=n.RGBA32F),U===n.HALF_FLOAT&&(V=n.RGBA16F),U===n.UNSIGNED_BYTE&&(V=_e===nt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(V=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(V=n.RGB5_A1)}return(V===n.R16F||V===n.R32F||V===n.RG16F||V===n.RG32F||V===n.RGBA16F||V===n.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function A(w,x){let U;return w?x===null||x===Di||x===Hr?U=n.DEPTH24_STENCIL8:x===Wn?U=n.DEPTH32F_STENCIL8:x===zr&&(U=n.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Di||x===Hr?U=n.DEPTH_COMPONENT24:x===Wn?U=n.DEPTH_COMPONENT32F:x===zr&&(U=n.DEPTH_COMPONENT16),U}function L(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==rn&&w.minFilter!==fn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function M(w){const x=w.target;x.removeEventListener("dispose",M),k(x),x.isVideoTexture&&d.delete(x)}function P(w){const x=w.target;x.removeEventListener("dispose",P),v(x)}function k(w){const x=i.get(w);if(x.__webglInit===void 0)return;const U=w.source,G=p.get(U);if(G){const Y=G[x.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&S(w),Object.keys(G).length===0&&p.delete(U)}i.remove(w)}function S(w){const x=i.get(w);n.deleteTexture(x.__webglTexture);const U=w.source,G=p.get(U);delete G[x.__cacheKey],o.memory.textures--}function v(w){const x=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let Y=0;Y<x.__webglFramebuffer[G].length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[G][Y]);else n.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)n.deleteFramebuffer(x.__webglFramebuffer[G]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const U=w.textures;for(let G=0,Y=U.length;G<Y;G++){const V=i.get(U[G]);V.__webglTexture&&(n.deleteTexture(V.__webglTexture),o.memory.textures--),i.remove(U[G])}i.remove(w)}let R=0;function B(){R=0}function z(){const w=R;return w>=r.maxTextures&&De("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),R+=1,w}function q(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function W(w,x){const U=i.get(w);if(w.isVideoTexture&&ft(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&U.__version!==w.version){const G=w.image;if(G===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{X(U,w,x);return}}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+x)}function $(w,x){const U=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){X(U,w,x);return}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+x)}function Q(w,x){const U=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){X(U,w,x);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+x)}function H(w,x){const U=i.get(w);if(w.version>0&&U.__version!==w.version){K(U,w,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+x)}const ie={[ua]:n.REPEAT,[Gn]:n.CLAMP_TO_EDGE,[pa]:n.MIRRORED_REPEAT},oe={[rn]:n.NEAREST,[Ku]:n.NEAREST_MIPMAP_NEAREST,[xs]:n.NEAREST_MIPMAP_LINEAR,[fn]:n.LINEAR,[fo]:n.LINEAR_MIPMAP_NEAREST,[Pi]:n.LINEAR_MIPMAP_LINEAR},we={[ep]:n.NEVER,[op]:n.ALWAYS,[tp]:n.LESS,[Fd]:n.LEQUAL,[np]:n.EQUAL,[sp]:n.GEQUAL,[ip]:n.GREATER,[rp]:n.NOTEQUAL};function je(w,x){if(x.type===Wn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===fn||x.magFilter===fo||x.magFilter===xs||x.magFilter===Pi||x.minFilter===fn||x.minFilter===fo||x.minFilter===xs||x.minFilter===Pi)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,ie[x.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,ie[x.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,ie[x.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,oe[x.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,oe[x.minFilter]),x.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,we[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===rn||x.minFilter!==xs&&x.minFilter!==Pi||x.type===Wn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Qe(w,x){let U=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",M));const G=x.source;let Y=p.get(G);Y===void 0&&(Y={},p.set(G,Y));const V=q(x);if(V!==w.__cacheKey){Y[V]===void 0&&(Y[V]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Y[V].usedTimes++;const _e=Y[w.__cacheKey];_e!==void 0&&(Y[w.__cacheKey].usedTimes--,_e.usedTimes===0&&S(x)),w.__cacheKey=V,w.__webglTexture=Y[V].texture}return U}function ot(w,x,U){return Math.floor(Math.floor(w/U)/x)}function at(w,x,U,G){const V=w.updateRanges;if(V.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,U,G,x.data);else{V.sort((Z,ne)=>Z.start-ne.start);let _e=0;for(let Z=1;Z<V.length;Z++){const ne=V[_e],Te=V[Z],Ee=ne.start+ne.count,he=ot(Te.start,x.width,4),Pe=ot(ne.start,x.width,4);Te.start<=Ee+1&&he===Pe&&ot(Te.start+Te.count-1,x.width,4)===he?ne.count=Math.max(ne.count,Te.start+Te.count-ne.start):(++_e,V[_e]=Te)}V.length=_e+1;const le=n.getParameter(n.UNPACK_ROW_LENGTH),ye=n.getParameter(n.UNPACK_SKIP_PIXELS),ge=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let Z=0,ne=V.length;Z<ne;Z++){const Te=V[Z],Ee=Math.floor(Te.start/4),he=Math.ceil(Te.count/4),Pe=Ee%x.width,T=Math.floor(Ee/x.width),ce=he,re=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Pe),n.pixelStorei(n.UNPACK_SKIP_ROWS,T),t.texSubImage2D(n.TEXTURE_2D,0,Pe,T,ce,re,U,G,x.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,le),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ye),n.pixelStorei(n.UNPACK_SKIP_ROWS,ge)}}function X(w,x,U){let G=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=n.TEXTURE_3D);const Y=Qe(w,x),V=x.source;t.bindTexture(G,w.__webglTexture,n.TEXTURE0+U);const _e=i.get(V);if(V.version!==_e.__version||Y===!0){t.activeTexture(n.TEXTURE0+U);const le=Ke.getPrimaries(Ke.workingColorSpace),ye=x.colorSpace===ci?null:Ke.getPrimaries(x.colorSpace),ge=x.colorSpace===ci||le===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let Z=b(x.image,!1,r.maxTextureSize);Z=Se(x,Z);const ne=s.convert(x.format,x.colorSpace),Te=s.convert(x.type);let Ee=y(x.internalFormat,ne,Te,x.colorSpace,x.isVideoTexture);je(G,x);let he;const Pe=x.mipmaps,T=x.isVideoTexture!==!0,ce=_e.__version===void 0||Y===!0,re=V.dataReady,se=L(x,Z);if(x.isDepthTexture)Ee=A(x.format===Wr,x.type),ce&&(T?t.texStorage2D(n.TEXTURE_2D,1,Ee,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,Ee,Z.width,Z.height,0,ne,Te,null));else if(x.isDataTexture)if(Pe.length>0){T&&ce&&t.texStorage2D(n.TEXTURE_2D,se,Ee,Pe[0].width,Pe[0].height);for(let ee=0,j=Pe.length;ee<j;ee++)he=Pe[ee],T?re&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,ne,Te,he.data):t.texImage2D(n.TEXTURE_2D,ee,Ee,he.width,he.height,0,ne,Te,he.data);x.generateMipmaps=!1}else T?(ce&&t.texStorage2D(n.TEXTURE_2D,se,Ee,Z.width,Z.height),re&&at(x,Z,ne,Te)):t.texImage2D(n.TEXTURE_2D,0,Ee,Z.width,Z.height,0,ne,Te,Z.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){T&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Ee,Pe[0].width,Pe[0].height,Z.depth);for(let ee=0,j=Pe.length;ee<j;ee++)if(he=Pe[ee],x.format!==Sn)if(ne!==null)if(T){if(re)if(x.layerUpdates.size>0){const fe=Mc(he.width,he.height,x.format,x.type);for(const Re of x.layerUpdates){const dt=he.data.subarray(Re*fe/he.data.BYTES_PER_ELEMENT,(Re+1)*fe/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,Re,he.width,he.height,1,ne,dt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,Z.depth,ne,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Ee,he.width,he.height,Z.depth,0,he.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else T?re&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,Z.depth,ne,Te,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Ee,he.width,he.height,Z.depth,0,ne,Te,he.data)}else{T&&ce&&t.texStorage2D(n.TEXTURE_2D,se,Ee,Pe[0].width,Pe[0].height);for(let ee=0,j=Pe.length;ee<j;ee++)he=Pe[ee],x.format!==Sn?ne!==null?T?re&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,ne,he.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Ee,he.width,he.height,0,he.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):T?re&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,ne,Te,he.data):t.texImage2D(n.TEXTURE_2D,ee,Ee,he.width,he.height,0,ne,Te,he.data)}else if(x.isDataArrayTexture)if(T){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,se,Ee,Z.width,Z.height,Z.depth),re)if(x.layerUpdates.size>0){const ee=Mc(Z.width,Z.height,x.format,x.type);for(const j of x.layerUpdates){const fe=Z.data.subarray(j*ee/Z.data.BYTES_PER_ELEMENT,(j+1)*ee/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,Z.width,Z.height,1,ne,Te,fe)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ne,Te,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,Z.width,Z.height,Z.depth,0,ne,Te,Z.data);else if(x.isData3DTexture)T?(ce&&t.texStorage3D(n.TEXTURE_3D,se,Ee,Z.width,Z.height,Z.depth),re&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ne,Te,Z.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,Z.width,Z.height,Z.depth,0,ne,Te,Z.data);else if(x.isFramebufferTexture){if(ce)if(T)t.texStorage2D(n.TEXTURE_2D,se,Ee,Z.width,Z.height);else{let ee=Z.width,j=Z.height;for(let fe=0;fe<se;fe++)t.texImage2D(n.TEXTURE_2D,fe,Ee,ee,j,0,ne,Te,null),ee>>=1,j>>=1}}else if(Pe.length>0){if(T&&ce){const ee=Le(Pe[0]);t.texStorage2D(n.TEXTURE_2D,se,Ee,ee.width,ee.height)}for(let ee=0,j=Pe.length;ee<j;ee++)he=Pe[ee],T?re&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ne,Te,he):t.texImage2D(n.TEXTURE_2D,ee,Ee,ne,Te,he);x.generateMipmaps=!1}else if(T){if(ce){const ee=Le(Z);t.texStorage2D(n.TEXTURE_2D,se,Ee,ee.width,ee.height)}re&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne,Te,Z)}else t.texImage2D(n.TEXTURE_2D,0,Ee,ne,Te,Z);m(x)&&u(G),_e.__version=V.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function K(w,x,U){if(x.image.length!==6)return;const G=Qe(w,x),Y=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+U);const V=i.get(Y);if(Y.version!==V.__version||G===!0){t.activeTexture(n.TEXTURE0+U);const _e=Ke.getPrimaries(Ke.workingColorSpace),le=x.colorSpace===ci?null:Ke.getPrimaries(x.colorSpace),ye=x.colorSpace===ci||_e===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const ge=x.isCompressedTexture||x.image[0].isCompressedTexture,Z=x.image[0]&&x.image[0].isDataTexture,ne=[];for(let j=0;j<6;j++)!ge&&!Z?ne[j]=b(x.image[j],!0,r.maxCubemapSize):ne[j]=Z?x.image[j].image:x.image[j],ne[j]=Se(x,ne[j]);const Te=ne[0],Ee=s.convert(x.format,x.colorSpace),he=s.convert(x.type),Pe=y(x.internalFormat,Ee,he,x.colorSpace),T=x.isVideoTexture!==!0,ce=V.__version===void 0||G===!0,re=Y.dataReady;let se=L(x,Te);je(n.TEXTURE_CUBE_MAP,x);let ee;if(ge){T&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,se,Pe,Te.width,Te.height);for(let j=0;j<6;j++){ee=ne[j].mipmaps;for(let fe=0;fe<ee.length;fe++){const Re=ee[fe];x.format!==Sn?Ee!==null?T?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,0,0,Re.width,Re.height,Ee,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,Pe,Re.width,Re.height,0,Re.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):T?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,0,0,Re.width,Re.height,Ee,he,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,Pe,Re.width,Re.height,0,Ee,he,Re.data)}}}else{if(ee=x.mipmaps,T&&ce){ee.length>0&&se++;const j=Le(ne[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,se,Pe,j.width,j.height)}for(let j=0;j<6;j++)if(Z){T?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ne[j].width,ne[j].height,Ee,he,ne[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Pe,ne[j].width,ne[j].height,0,Ee,he,ne[j].data);for(let fe=0;fe<ee.length;fe++){const dt=ee[fe].image[j].image;T?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,0,0,dt.width,dt.height,Ee,he,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,Pe,dt.width,dt.height,0,Ee,he,dt.data)}}else{T?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ee,he,ne[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Pe,Ee,he,ne[j]);for(let fe=0;fe<ee.length;fe++){const Re=ee[fe];T?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,0,0,Ee,he,Re.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,Pe,Ee,he,Re.image[j])}}}m(x)&&u(n.TEXTURE_CUBE_MAP),V.__version=Y.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function pe(w,x,U,G,Y,V){const _e=s.convert(U.format,U.colorSpace),le=s.convert(U.type),ye=y(U.internalFormat,_e,le,U.colorSpace),ge=i.get(x),Z=i.get(U);if(Z.__renderTarget=x,!ge.__hasExternalTextures){const ne=Math.max(1,x.width>>V),Te=Math.max(1,x.height>>V);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,V,ye,ne,Te,x.depth,0,_e,le,null):t.texImage2D(Y,V,ye,ne,Te,0,_e,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),xe(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,Y,Z.__webglTexture,0,lt(x)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,Y,Z.__webglTexture,V),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(w,x,U){if(n.bindRenderbuffer(n.RENDERBUFFER,w),x.depthBuffer){const G=x.depthTexture,Y=G&&G.isDepthTexture?G.type:null,V=A(x.stencilBuffer,Y),_e=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=lt(x);xe(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,V,x.width,x.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,V,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,V,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_e,n.RENDERBUFFER,w)}else{const G=x.textures;for(let Y=0;Y<G.length;Y++){const V=G[Y],_e=s.convert(V.format,V.colorSpace),le=s.convert(V.type),ye=y(V.internalFormat,_e,le,V.colorSpace),ge=lt(x);U&&xe(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ge,ye,x.width,x.height):xe(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ge,ye,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ye,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(x.depthTexture);G.__renderTarget=x,(!G.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W(x.depthTexture,0);const Y=G.__webglTexture,V=lt(x);if(x.depthTexture.format===Gr)xe(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0);else if(x.depthTexture.format===Wr)xe(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function ze(w){const x=i.get(w),U=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const G=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){const Y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",Y)};G.addEventListener("dispose",Y),x.__depthDisposeCallback=Y}x.__boundDepthTexture=G}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const G=w.texture.mipmaps;G&&G.length>0?ve(x.__webglFramebuffer[0],w):ve(x.__webglFramebuffer,w)}else if(U){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=n.createRenderbuffer(),Ie(x.__webglDepthbuffer[G],w,!1);else{const Y=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,V)}}else{const G=w.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Ie(x.__webglDepthbuffer,w,!1);else{const Y=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,V)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function It(w,x,U){const G=i.get(w);x!==void 0&&pe(G.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&ze(w)}function ke(w){const x=w.texture,U=i.get(w),G=i.get(x);w.addEventListener("dispose",P);const Y=w.textures,V=w.isWebGLCubeRenderTarget===!0,_e=Y.length>1;if(_e||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=x.version,o.memory.textures++),V){U.__webglFramebuffer=[];for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer[le]=[];for(let ye=0;ye<x.mipmaps.length;ye++)U.__webglFramebuffer[le][ye]=n.createFramebuffer()}else U.__webglFramebuffer[le]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer=[];for(let le=0;le<x.mipmaps.length;le++)U.__webglFramebuffer[le]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(_e)for(let le=0,ye=Y.length;le<ye;le++){const ge=i.get(Y[le]);ge.__webglTexture===void 0&&(ge.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&xe(w)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let le=0;le<Y.length;le++){const ye=Y[le];U.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[le]);const ge=s.convert(ye.format,ye.colorSpace),Z=s.convert(ye.type),ne=y(ye.internalFormat,ge,Z,ye.colorSpace,w.isXRRenderTarget===!0),Te=lt(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,ne,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,U.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Ie(U.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(V){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),je(n.TEXTURE_CUBE_MAP,x);for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0)for(let ye=0;ye<x.mipmaps.length;ye++)pe(U.__webglFramebuffer[le][ye],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,ye);else pe(U.__webglFramebuffer[le],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(x)&&u(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let le=0,ye=Y.length;le<ye;le++){const ge=Y[le],Z=i.get(ge);let ne=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ne=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ne,Z.__webglTexture),je(ne,ge),pe(U.__webglFramebuffer,w,ge,n.COLOR_ATTACHMENT0+le,ne,0),m(ge)&&u(ne)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(le=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,G.__webglTexture),je(le,x),x.mipmaps&&x.mipmaps.length>0)for(let ye=0;ye<x.mipmaps.length;ye++)pe(U.__webglFramebuffer[ye],w,x,n.COLOR_ATTACHMENT0,le,ye);else pe(U.__webglFramebuffer,w,x,n.COLOR_ATTACHMENT0,le,0);m(x)&&u(le),t.unbindTexture()}w.depthBuffer&&ze(w)}function ut(w){const x=w.textures;for(let U=0,G=x.length;U<G;U++){const Y=x[U];if(m(Y)){const V=E(w),_e=i.get(Y).__webglTexture;t.bindTexture(V,_e),u(V),t.unbindTexture()}}}const C=[],He=[];function Ge(w){if(w.samples>0){if(xe(w)===!1){const x=w.textures,U=w.width,G=w.height;let Y=n.COLOR_BUFFER_BIT;const V=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=i.get(w),le=x.length>1;if(le)for(let ge=0;ge<x.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const ye=w.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let ge=0;ge<x.length;ge++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const Z=i.get(x[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Z,0)}n.blitFramebuffer(0,0,U,G,0,0,U,G,Y,n.NEAREST),l===!0&&(C.length=0,He.length=0,C.push(n.COLOR_ATTACHMENT0+ge),w.depthBuffer&&w.resolveDepthBuffer===!1&&(C.push(V),He.push(V),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,He)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let ge=0;ge<x.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const Z=i.get(x[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Z,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const x=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function lt(w){return Math.min(r.maxSamples,w.samples)}function xe(w){const x=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ft(w){const x=o.render.frame;d.get(w)!==x&&(d.set(w,x),w.update())}function Se(w,x){const U=w.colorSpace,G=w.format,Y=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||U!==gr&&U!==ci&&(Ke.getTransfer(U)===nt?(G!==Sn||Y!==Pn)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):yt("WebGLTextures: Unsupported texture color space:",U)),x}function Le(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=B,this.setTexture2D=W,this.setTexture2DArray=$,this.setTexture3D=Q,this.setTextureCube=H,this.rebindTextures=It,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=xe}function Tg(n,e){function t(i,r=ci){let s;const o=Ke.getTransfer(r);if(i===Pn)return n.UNSIGNED_BYTE;if(i===el)return n.UNSIGNED_SHORT_4_4_4_4;if(i===tl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Rd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ld)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ad)return n.BYTE;if(i===Pd)return n.SHORT;if(i===zr)return n.UNSIGNED_SHORT;if(i===Qa)return n.INT;if(i===Di)return n.UNSIGNED_INT;if(i===Wn)return n.FLOAT;if(i===br)return n.HALF_FLOAT;if(i===Dd)return n.ALPHA;if(i===Id)return n.RGB;if(i===Sn)return n.RGBA;if(i===Gr)return n.DEPTH_COMPONENT;if(i===Wr)return n.DEPTH_STENCIL;if(i===Ud)return n.RED;if(i===nl)return n.RED_INTEGER;if(i===il)return n.RG;if(i===rl)return n.RG_INTEGER;if(i===sl)return n.RGBA_INTEGER;if(i===ks||i===Vs||i===zs||i===Hs)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ks)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ks)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Hs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===fa||i===ma||i===xa||i===ga)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===fa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ma)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ga)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_a||i===va||i===ba)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_a||i===va)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ba)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Sa||i===wa||i===ya||i===Ma||i===Ea||i===Ca||i===Ta||i===Aa||i===Pa||i===Ra||i===La||i===Da||i===Ia||i===Ua)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Sa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ya)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ma)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ea)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ca)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ta)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Aa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Pa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ra)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===La)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Da)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ia)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ua)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Na||i===Fa||i===Oa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Na)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Fa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Oa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ba||i===ka||i===Va||i===za)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ba)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ka)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Va)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===za)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Ag=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pg=`
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

}`;class Rg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new $d(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Yn({vertexShader:Ag,fragmentShader:Pg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new Ln(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Lg extends Bi{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,p=null,f=null,_=null;const b=typeof XRWebGLBinding<"u",m=new Rg,u={},E=t.getContextAttributes();let y=null,A=null;const L=[],M=[],P=new Ue;let k=null;const S=new un;S.viewport=new wt;const v=new un;v.viewport=new wt;const R=[S,v],B=new $p;let z=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=L[X];return K===void 0&&(K=new Fo,L[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=L[X];return K===void 0&&(K=new Fo,L[X]=K),K.getGripSpace()},this.getHand=function(X){let K=L[X];return K===void 0&&(K=new Fo,L[X]=K),K.getHandSpace()};function W(X){const K=M.indexOf(X.inputSource);if(K===-1)return;const pe=L[K];pe!==void 0&&(pe.update(X.inputSource,X.frame,c||o),pe.dispatchEvent({type:X.type,data:X.inputSource}))}function $(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",Q);for(let X=0;X<L.length;X++){const K=M[X];K!==null&&(M[X]=null,L[X].disconnect(K))}z=null,q=null,m.reset();for(const X in u)delete u[X];e.setRenderTarget(y),f=null,p=null,h=null,r=null,A=null,at.stop(),i.isPresenting=!1,e.setPixelRatio(k),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return h===null&&b&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",$),r.addEventListener("inputsourceschange",Q),E.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(P),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ie=null,ve=null;E.depth&&(ve=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=E.stencil?Wr:Gr,Ie=E.stencil?Hr:Di);const ze={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:s};h=this.getBinding(),p=h.createProjectionLayer(ze),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),A=new Ui(p.textureWidth,p.textureHeight,{format:Sn,type:Pn,depthTexture:new qd(p.textureWidth,p.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const pe={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,pe),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),A=new Ui(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),at.setContext(r),at.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(X){for(let K=0;K<X.removed.length;K++){const pe=X.removed[K],Ie=M.indexOf(pe);Ie>=0&&(M[Ie]=null,L[Ie].disconnect(pe))}for(let K=0;K<X.added.length;K++){const pe=X.added[K];let Ie=M.indexOf(pe);if(Ie===-1){for(let ze=0;ze<L.length;ze++)if(ze>=M.length){M.push(pe),Ie=ze;break}else if(M[ze]===null){M[ze]=pe,Ie=ze;break}if(Ie===-1)break}const ve=L[Ie];ve&&ve.connect(pe)}}const H=new N,ie=new N;function oe(X,K,pe){H.setFromMatrixPosition(K.matrixWorld),ie.setFromMatrixPosition(pe.matrixWorld);const Ie=H.distanceTo(ie),ve=K.projectionMatrix.elements,ze=pe.projectionMatrix.elements,It=ve[14]/(ve[10]-1),ke=ve[14]/(ve[10]+1),ut=(ve[9]+1)/ve[5],C=(ve[9]-1)/ve[5],He=(ve[8]-1)/ve[0],Ge=(ze[8]+1)/ze[0],lt=It*He,xe=It*Ge,ft=Ie/(-He+Ge),Se=ft*-He;if(K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Se),X.translateZ(ft),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ve[10]===-1)X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Le=It+ft,w=ke+ft,x=lt-Se,U=xe+(Ie-Se),G=ut*ke/w*Le,Y=C*ke/w*Le;X.projectionMatrix.makePerspective(x,U,G,Y,Le,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function we(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let K=X.near,pe=X.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),B.near=v.near=S.near=K,B.far=v.far=S.far=pe,(z!==B.near||q!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),z=B.near,q=B.far),B.layers.mask=X.layers.mask|6,S.layers.mask=B.layers.mask&3,v.layers.mask=B.layers.mask&5;const Ie=X.parent,ve=B.cameras;we(B,Ie);for(let ze=0;ze<ve.length;ze++)we(ve[ze],Ie);ve.length===2?oe(B,S,v):B.projectionMatrix.copy(S.projectionMatrix),je(X,B,Ie)};function je(X,K,pe){pe===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(pe.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ha*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(X){l=X,p!==null&&(p.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(X){return u[X]};let Qe=null;function ot(X,K){if(d=K.getViewerPose(c||o),_=K,d!==null){const pe=d.views;f!==null&&(e.setRenderTargetFramebuffer(A,f.framebuffer),e.setRenderTarget(A));let Ie=!1;pe.length!==B.cameras.length&&(B.cameras.length=0,Ie=!0);for(let ke=0;ke<pe.length;ke++){const ut=pe[ke];let C=null;if(f!==null)C=f.getViewport(ut);else{const Ge=h.getViewSubImage(p,ut);C=Ge.viewport,ke===0&&(e.setRenderTargetTextures(A,Ge.colorTexture,Ge.depthStencilTexture),e.setRenderTarget(A))}let He=R[ke];He===void 0&&(He=new un,He.layers.enable(ke),He.viewport=new wt,R[ke]=He),He.matrix.fromArray(ut.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(ut.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(C.x,C.y,C.width,C.height),ke===0&&(B.matrix.copy(He.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ie===!0&&B.cameras.push(He)}const ve=r.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&b){h=i.getBinding();const ke=h.getDepthInformation(pe[0]);ke&&ke.isValid&&ke.texture&&m.init(ke,r.renderState)}if(ve&&ve.includes("camera-access")&&b){e.state.unbindTexture(),h=i.getBinding();for(let ke=0;ke<pe.length;ke++){const ut=pe[ke].camera;if(ut){let C=u[ut];C||(C=new $d,u[ut]=C);const He=h.getCameraImage(ut);C.sourceTexture=He}}}}for(let pe=0;pe<L.length;pe++){const Ie=M[pe],ve=L[pe];Ie!==null&&ve!==void 0&&ve.update(Ie,K,c||o)}Qe&&Qe(X,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),_=null}const at=new Kd;at.setAnimationLoop(ot),this.setAnimationLoop=function(X){Qe=X},this.dispose=function(){}}}const Mi=new Rn,Dg=new Mt;function Ig(n,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Wd(n)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,E,y,A){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),d(m,u)):u.isMeshStandardMaterial?(s(m,u),p(m,u),u.isMeshPhysicalMaterial&&f(m,u,A)):u.isMeshMatcapMaterial?(s(m,u),_(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),b(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,E,y):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Yt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Yt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const E=e.get(u),y=E.envMap,A=E.envMapRotation;y&&(m.envMap.value=y,Mi.copy(A),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),m.envMapRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(Mi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,E,y){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*E,m.scale.value=y*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function p(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function f(m,u,E){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Yt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function b(m,u){const E=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ug(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,y){const A=y.program;i.uniformBlockBinding(E,A)}function c(E,y){let A=r[E.id];A===void 0&&(_(E),A=d(E),r[E.id]=A,E.addEventListener("dispose",m));const L=y.program;i.updateUBOMapping(E,L);const M=e.render.frame;s[E.id]!==M&&(p(E),s[E.id]=M)}function d(E){const y=h();E.__bindingPointIndex=y;const A=n.createBuffer(),L=E.__size,M=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,L,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,A),A}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const y=r[E.id],A=E.uniforms,L=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let M=0,P=A.length;M<P;M++){const k=Array.isArray(A[M])?A[M]:[A[M]];for(let S=0,v=k.length;S<v;S++){const R=k[S];if(f(R,M,S,L)===!0){const B=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let q=0;for(let W=0;W<z.length;W++){const $=z[W],Q=b($);typeof $=="number"||typeof $=="boolean"?(R.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,B+q,R.__data)):$.isMatrix3?(R.__data[0]=$.elements[0],R.__data[1]=$.elements[1],R.__data[2]=$.elements[2],R.__data[3]=0,R.__data[4]=$.elements[3],R.__data[5]=$.elements[4],R.__data[6]=$.elements[5],R.__data[7]=0,R.__data[8]=$.elements[6],R.__data[9]=$.elements[7],R.__data[10]=$.elements[8],R.__data[11]=0):($.toArray(R.__data,q),q+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(E,y,A,L){const M=E.value,P=y+"_"+A;if(L[P]===void 0)return typeof M=="number"||typeof M=="boolean"?L[P]=M:L[P]=M.clone(),!0;{const k=L[P];if(typeof M=="number"||typeof M=="boolean"){if(k!==M)return L[P]=M,!0}else if(k.equals(M)===!1)return k.copy(M),!0}return!1}function _(E){const y=E.uniforms;let A=0;const L=16;for(let P=0,k=y.length;P<k;P++){const S=Array.isArray(y[P])?y[P]:[y[P]];for(let v=0,R=S.length;v<R;v++){const B=S[v],z=Array.isArray(B.value)?B.value:[B.value];for(let q=0,W=z.length;q<W;q++){const $=z[q],Q=b($),H=A%L,ie=H%Q.boundary,oe=H+ie;A+=ie,oe!==0&&L-oe<Q.storage&&(A+=L-oe),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=A,A+=Q.storage}}}const M=A%L;return M>0&&(A+=L-M),E.__size=A,E.__cache={},this}function b(E){const y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):De("WebGLRenderer: Unsupported uniform value type.",E),y}function m(E){const y=E.target;y.removeEventListener("dispose",m);const A=o.indexOf(y.__bindingPointIndex);o.splice(A,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function u(){for(const E in r)n.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}const Ng=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let kn=null;function Fg(){return kn===null&&(kn=new Fp(Ng,32,32,il,br),kn.minFilter=fn,kn.magFilter=fn,kn.wrapS=Gn,kn.wrapT=Gn,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}class Og{constructor(e={}){const{canvas:t=ap(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const _=new Set([sl,rl,nl]),b=new Set([Pn,Di,zr,Hr,el,tl]),m=new Uint32Array(4),u=new Int32Array(4);let E=null,y=null;const A=[],L=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let P=!1;this._outputColorSpace=hn;let k=0,S=0,v=null,R=-1,B=null;const z=new wt,q=new wt;let W=null;const $=new qe(0);let Q=0,H=t.width,ie=t.height,oe=1,we=null,je=null;const Qe=new wt(0,0,H,ie),ot=new wt(0,0,H,ie);let at=!1;const X=new cl;let K=!1,pe=!1;const Ie=new Mt,ve=new N,ze=new wt,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ke=!1;function ut(){return v===null?oe:1}let C=i;function He(g,D){return t.getContext(g,D)}try{const g={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Za}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",fe,!1),C===null){const D="webgl2";if(C=He(D,g),C===null)throw He(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(g){throw g("WebGLRenderer: "+g.message),g}let Ge,lt,xe,ft,Se,Le,w,x,U,G,Y,V,_e,le,ye,ge,Z,ne,Te,Ee,he,Pe,T,ce;function re(){Ge=new X0(C),Ge.init(),Pe=new Tg(C,Ge),lt=new F0(C,Ge,e,Pe),xe=new Eg(C,Ge),lt.reversedDepthBuffer&&p&&xe.buffers.depth.setReversed(!0),ft=new $0(C),Se=new ug,Le=new Cg(C,Ge,xe,Se,lt,Pe,ft),w=new B0(M),x=new W0(M),U=new Zp(C),T=new U0(C,U),G=new j0(C,U,ft,T),Y=new K0(C,G,U,ft),Te=new Y0(C,lt,Le),ge=new O0(Se),V=new hg(M,w,x,Ge,lt,T,ge),_e=new Ig(M,Se),le=new fg,ye=new bg(Ge),ne=new I0(M,w,x,xe,Y,f,l),Z=new yg(M,Y,lt),ce=new Ug(C,ft,lt,xe),Ee=new N0(C,Ge,ft),he=new q0(C,Ge,ft),ft.programs=V.programs,M.capabilities=lt,M.extensions=Ge,M.properties=Se,M.renderLists=le,M.shadowMap=Z,M.state=xe,M.info=ft}re();const se=new Lg(M,C);this.xr=se,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const g=Ge.get("WEBGL_lose_context");g&&g.loseContext()},this.forceContextRestore=function(){const g=Ge.get("WEBGL_lose_context");g&&g.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(g){g!==void 0&&(oe=g,this.setSize(H,ie,!1))},this.getSize=function(g){return g.set(H,ie)},this.setSize=function(g,D,F=!0){if(se.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}H=g,ie=D,t.width=Math.floor(g*oe),t.height=Math.floor(D*oe),F===!0&&(t.style.width=g+"px",t.style.height=D+"px"),this.setViewport(0,0,g,D)},this.getDrawingBufferSize=function(g){return g.set(H*oe,ie*oe).floor()},this.setDrawingBufferSize=function(g,D,F){H=g,ie=D,oe=F,t.width=Math.floor(g*F),t.height=Math.floor(D*F),this.setViewport(0,0,g,D)},this.getCurrentViewport=function(g){return g.copy(z)},this.getViewport=function(g){return g.copy(Qe)},this.setViewport=function(g,D,F,O){g.isVector4?Qe.set(g.x,g.y,g.z,g.w):Qe.set(g,D,F,O),xe.viewport(z.copy(Qe).multiplyScalar(oe).round())},this.getScissor=function(g){return g.copy(ot)},this.setScissor=function(g,D,F,O){g.isVector4?ot.set(g.x,g.y,g.z,g.w):ot.set(g,D,F,O),xe.scissor(q.copy(ot).multiplyScalar(oe).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(g){xe.setScissorTest(at=g)},this.setOpaqueSort=function(g){we=g},this.setTransparentSort=function(g){je=g},this.getClearColor=function(g){return g.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(g=!0,D=!0,F=!0){let O=0;if(g){let I=!1;if(v!==null){const te=v.texture.format;I=_.has(te)}if(I){const te=v.texture.type,de=b.has(te),me=ne.getClearColor(),ue=ne.getClearAlpha(),Ce=me.r,Ae=me.g,be=me.b;de?(m[0]=Ce,m[1]=Ae,m[2]=be,m[3]=ue,C.clearBufferuiv(C.COLOR,0,m)):(u[0]=Ce,u[1]=Ae,u[2]=be,u[3]=ue,C.clearBufferiv(C.COLOR,0,u))}else O|=C.COLOR_BUFFER_BIT}D&&(O|=C.DEPTH_BUFFER_BIT),F&&(O|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),ne.dispose(),le.dispose(),ye.dispose(),Se.dispose(),w.dispose(),x.dispose(),Y.dispose(),T.dispose(),ce.dispose(),V.dispose(),se.dispose(),se.removeEventListener("sessionstart",Hl),se.removeEventListener("sessionend",Gl),gi.stop()};function ee(g){g.preventDefault(),ic("WebGLRenderer: Context Lost."),P=!0}function j(){ic("WebGLRenderer: Context Restored."),P=!1;const g=ft.autoReset,D=Z.enabled,F=Z.autoUpdate,O=Z.needsUpdate,I=Z.type;re(),ft.autoReset=g,Z.enabled=D,Z.autoUpdate=F,Z.needsUpdate=O,Z.type=I}function fe(g){yt("WebGLRenderer: A WebGL context could not be created. Reason: ",g.statusMessage)}function Re(g){const D=g.target;D.removeEventListener("dispose",Re),dt(D)}function dt(g){et(g),Se.remove(g)}function et(g){const D=Se.get(g).programs;D!==void 0&&(D.forEach(function(F){V.releaseProgram(F)}),g.isShaderMaterial&&V.releaseShaderCache(g))}this.renderBufferDirect=function(g,D,F,O,I,te){D===null&&(D=It);const de=I.isMesh&&I.matrixWorld.determinant()<0,me=mu(g,D,F,O,I);xe.setMaterial(O,de);let ue=F.index,Ce=1;if(O.wireframe===!0){if(ue=G.getWireframeAttribute(F),ue===void 0)return;Ce=2}const Ae=F.drawRange,be=F.attributes.position;let We=Ae.start*Ce,tt=(Ae.start+Ae.count)*Ce;te!==null&&(We=Math.max(We,te.start*Ce),tt=Math.min(tt,(te.start+te.count)*Ce)),ue!==null?(We=Math.max(We,0),tt=Math.min(tt,ue.count)):be!=null&&(We=Math.max(We,0),tt=Math.min(tt,be.count));const _t=tt-We;if(_t<0||_t===1/0)return;T.setup(I,O,me,F,ue);let vt,st=Ee;if(ue!==null&&(vt=U.get(ue),st=he,st.setIndex(vt)),I.isMesh)O.wireframe===!0?(xe.setLineWidth(O.wireframeLinewidth*ut()),st.setMode(C.LINES)):st.setMode(C.TRIANGLES);else if(I.isLine){let Me=O.linewidth;Me===void 0&&(Me=1),xe.setLineWidth(Me*ut()),I.isLineSegments?st.setMode(C.LINES):I.isLineLoop?st.setMode(C.LINE_LOOP):st.setMode(C.LINE_STRIP)}else I.isPoints?st.setMode(C.POINTS):I.isSprite&&st.setMode(C.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)jr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))st.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Me=I._multiDrawStarts,mt=I._multiDrawCounts,Ye=I._multiDrawCount,Jt=ue?U.get(ue).bytesPerElement:1,Gi=Se.get(O).currentProgram.getUniforms();for(let Qt=0;Qt<Ye;Qt++)Gi.setValue(C,"_gl_DrawID",Qt),st.render(Me[Qt]/Jt,mt[Qt])}else if(I.isInstancedMesh)st.renderInstances(We,_t,I.count);else if(F.isInstancedBufferGeometry){const Me=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,mt=Math.min(F.instanceCount,Me);st.renderInstances(We,_t,mt)}else st.render(We,_t)};function wn(g,D,F){g.transparent===!0&&g.side===zt&&g.forceSinglePass===!1?(g.side=Yt,g.needsUpdate=!0,ms(g,D,F),g.side=fi,g.needsUpdate=!0,ms(g,D,F),g.side=zt):ms(g,D,F)}this.compile=function(g,D,F=null){F===null&&(F=g),y=ye.get(F),y.init(D),L.push(y),F.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(y.pushLight(I),I.castShadow&&y.pushShadow(I))}),g!==F&&g.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(y.pushLight(I),I.castShadow&&y.pushShadow(I))}),y.setupLights();const O=new Set;return g.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const te=I.material;if(te)if(Array.isArray(te))for(let de=0;de<te.length;de++){const me=te[de];wn(me,F,I),O.add(me)}else wn(te,F,I),O.add(te)}),y=L.pop(),O},this.compileAsync=function(g,D,F=null){const O=this.compile(g,D,F);return new Promise(I=>{function te(){if(O.forEach(function(de){Se.get(de).currentProgram.isReady()&&O.delete(de)}),O.size===0){I(g);return}setTimeout(te,10)}Ge.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let xn=null;function fu(g){xn&&xn(g)}function Hl(){gi.stop()}function Gl(){gi.start()}const gi=new Kd;gi.setAnimationLoop(fu),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(g){xn=g,se.setAnimationLoop(g),g===null?gi.stop():gi.start()},se.addEventListener("sessionstart",Hl),se.addEventListener("sessionend",Gl),this.render=function(g,D){if(D!==void 0&&D.isCamera!==!0){yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(D),D=se.getCamera()),g.isScene===!0&&g.onBeforeRender(M,g,D,v),y=ye.get(g,L.length),y.init(D),L.push(y),Ie.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),X.setFromProjectionMatrix(Ie,En,D.reversedDepth),pe=this.localClippingEnabled,K=ge.init(this.clippingPlanes,pe),E=le.get(g,A.length),E.init(),A.push(E),se.enabled===!0&&se.isPresenting===!0){const te=M.xr.getDepthSensingMesh();te!==null&&uo(te,D,-1/0,M.sortObjects)}uo(g,D,0,M.sortObjects),E.finish(),M.sortObjects===!0&&E.sort(we,je),ke=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,ke&&ne.addToRenderList(E,g),this.info.render.frame++,K===!0&&ge.beginShadows();const F=y.state.shadowsArray;Z.render(F,g,D),K===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=E.opaque,I=E.transmissive;if(y.setupLights(),D.isArrayCamera){const te=D.cameras;if(I.length>0)for(let de=0,me=te.length;de<me;de++){const ue=te[de];Xl(O,I,g,ue)}ke&&ne.render(g);for(let de=0,me=te.length;de<me;de++){const ue=te[de];Wl(E,g,ue,ue.viewport)}}else I.length>0&&Xl(O,I,g,D),ke&&ne.render(g),Wl(E,g,D);v!==null&&S===0&&(Le.updateMultisampleRenderTarget(v),Le.updateRenderTargetMipmap(v)),g.isScene===!0&&g.onAfterRender(M,g,D),T.resetDefaultState(),R=-1,B=null,L.pop(),L.length>0?(y=L[L.length-1],K===!0&&ge.setGlobalState(M.clippingPlanes,y.state.camera)):y=null,A.pop(),A.length>0?E=A[A.length-1]:E=null};function uo(g,D,F,O){if(g.visible===!1)return;if(g.layers.test(D.layers)){if(g.isGroup)F=g.renderOrder;else if(g.isLOD)g.autoUpdate===!0&&g.update(D);else if(g.isLight)y.pushLight(g),g.castShadow&&y.pushShadow(g);else if(g.isSprite){if(!g.frustumCulled||X.intersectsSprite(g)){O&&ze.setFromMatrixPosition(g.matrixWorld).applyMatrix4(Ie);const de=Y.update(g),me=g.material;me.visible&&E.push(g,de,me,F,ze.z,null)}}else if((g.isMesh||g.isLine||g.isPoints)&&(!g.frustumCulled||X.intersectsObject(g))){const de=Y.update(g),me=g.material;if(O&&(g.boundingSphere!==void 0?(g.boundingSphere===null&&g.computeBoundingSphere(),ze.copy(g.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),ze.copy(de.boundingSphere.center)),ze.applyMatrix4(g.matrixWorld).applyMatrix4(Ie)),Array.isArray(me)){const ue=de.groups;for(let Ce=0,Ae=ue.length;Ce<Ae;Ce++){const be=ue[Ce],We=me[be.materialIndex];We&&We.visible&&E.push(g,de,We,F,ze.z,be)}}else me.visible&&E.push(g,de,me,F,ze.z,null)}}const te=g.children;for(let de=0,me=te.length;de<me;de++)uo(te[de],D,F,O)}function Wl(g,D,F,O){const{opaque:I,transmissive:te,transparent:de}=g;y.setupLightsView(F),K===!0&&ge.setGlobalState(M.clippingPlanes,F),O&&xe.viewport(z.copy(O)),I.length>0&&fs(I,D,F),te.length>0&&fs(te,D,F),de.length>0&&fs(de,D,F),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Xl(g,D,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[O.id]===void 0&&(y.state.transmissionRenderTarget[O.id]=new Ui(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?br:Pn,minFilter:Pi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const te=y.state.transmissionRenderTarget[O.id],de=O.viewport||z;te.setSize(de.z*M.transmissionResolutionScale,de.w*M.transmissionResolutionScale);const me=M.getRenderTarget(),ue=M.getActiveCubeFace(),Ce=M.getActiveMipmapLevel();M.setRenderTarget(te),M.getClearColor($),Q=M.getClearAlpha(),Q<1&&M.setClearColor(16777215,.5),M.clear(),ke&&ne.render(F);const Ae=M.toneMapping;M.toneMapping=ui;const be=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),y.setupLightsView(O),K===!0&&ge.setGlobalState(M.clippingPlanes,O),fs(g,F,O),Le.updateMultisampleRenderTarget(te),Le.updateRenderTargetMipmap(te),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let tt=0,_t=D.length;tt<_t;tt++){const vt=D[tt],{object:st,geometry:Me,material:mt,group:Ye}=vt;if(mt.side===zt&&st.layers.test(O.layers)){const Jt=mt.side;mt.side=Yt,mt.needsUpdate=!0,jl(st,F,O,Me,mt,Ye),mt.side=Jt,mt.needsUpdate=!0,We=!0}}We===!0&&(Le.updateMultisampleRenderTarget(te),Le.updateRenderTargetMipmap(te))}M.setRenderTarget(me,ue,Ce),M.setClearColor($,Q),be!==void 0&&(O.viewport=be),M.toneMapping=Ae}function fs(g,D,F){const O=D.isScene===!0?D.overrideMaterial:null;for(let I=0,te=g.length;I<te;I++){const de=g[I],{object:me,geometry:ue,group:Ce}=de;let Ae=de.material;Ae.allowOverride===!0&&O!==null&&(Ae=O),me.layers.test(F.layers)&&jl(me,D,F,ue,Ae,Ce)}}function jl(g,D,F,O,I,te){g.onBeforeRender(M,D,F,O,I,te),g.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,g.matrixWorld),g.normalMatrix.getNormalMatrix(g.modelViewMatrix),I.onBeforeRender(M,D,F,O,g,te),I.transparent===!0&&I.side===zt&&I.forceSinglePass===!1?(I.side=Yt,I.needsUpdate=!0,M.renderBufferDirect(F,D,O,I,g,te),I.side=fi,I.needsUpdate=!0,M.renderBufferDirect(F,D,O,I,g,te),I.side=zt):M.renderBufferDirect(F,D,O,I,g,te),g.onAfterRender(M,D,F,O,I,te)}function ms(g,D,F){D.isScene!==!0&&(D=It);const O=Se.get(g),I=y.state.lights,te=y.state.shadowsArray,de=I.state.version,me=V.getParameters(g,I.state,te,D,F),ue=V.getProgramCacheKey(me);let Ce=O.programs;O.environment=g.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(g.isMeshStandardMaterial?x:w).get(g.envMap||O.environment),O.envMapRotation=O.environment!==null&&g.envMap===null?D.environmentRotation:g.envMapRotation,Ce===void 0&&(g.addEventListener("dispose",Re),Ce=new Map,O.programs=Ce);let Ae=Ce.get(ue);if(Ae!==void 0){if(O.currentProgram===Ae&&O.lightsStateVersion===de)return $l(g,me),Ae}else me.uniforms=V.getUniforms(g),g.onBeforeCompile(me,M),Ae=V.acquireProgram(me,ue),Ce.set(ue,Ae),O.uniforms=me.uniforms;const be=O.uniforms;return(!g.isShaderMaterial&&!g.isRawShaderMaterial||g.clipping===!0)&&(be.clippingPlanes=ge.uniform),$l(g,me),O.needsLights=gu(g),O.lightsStateVersion=de,O.needsLights&&(be.ambientLightColor.value=I.state.ambient,be.lightProbe.value=I.state.probe,be.directionalLights.value=I.state.directional,be.directionalLightShadows.value=I.state.directionalShadow,be.spotLights.value=I.state.spot,be.spotLightShadows.value=I.state.spotShadow,be.rectAreaLights.value=I.state.rectArea,be.ltc_1.value=I.state.rectAreaLTC1,be.ltc_2.value=I.state.rectAreaLTC2,be.pointLights.value=I.state.point,be.pointLightShadows.value=I.state.pointShadow,be.hemisphereLights.value=I.state.hemi,be.directionalShadowMap.value=I.state.directionalShadowMap,be.directionalShadowMatrix.value=I.state.directionalShadowMatrix,be.spotShadowMap.value=I.state.spotShadowMap,be.spotLightMatrix.value=I.state.spotLightMatrix,be.spotLightMap.value=I.state.spotLightMap,be.pointShadowMap.value=I.state.pointShadowMap,be.pointShadowMatrix.value=I.state.pointShadowMatrix),O.currentProgram=Ae,O.uniformsList=null,Ae}function ql(g){if(g.uniformsList===null){const D=g.currentProgram.getUniforms();g.uniformsList=Ws.seqWithValue(D.seq,g.uniforms)}return g.uniformsList}function $l(g,D){const F=Se.get(g);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function mu(g,D,F,O,I){D.isScene!==!0&&(D=It),Le.resetTextureUnits();const te=D.fog,de=O.isMeshStandardMaterial?D.environment:null,me=v===null?M.outputColorSpace:v.isXRRenderTarget===!0?v.texture.colorSpace:gr,ue=(O.isMeshStandardMaterial?x:w).get(O.envMap||de),Ce=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ae=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),be=!!F.morphAttributes.position,We=!!F.morphAttributes.normal,tt=!!F.morphAttributes.color;let _t=ui;O.toneMapped&&(v===null||v.isXRRenderTarget===!0)&&(_t=M.toneMapping);const vt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,st=vt!==void 0?vt.length:0,Me=Se.get(O),mt=y.state.lights;if(K===!0&&(pe===!0||g!==B)){const Bt=g===B&&O.id===R;ge.setState(O,g,Bt)}let Ye=!1;O.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==mt.state.version||Me.outputColorSpace!==me||I.isBatchedMesh&&Me.batching===!1||!I.isBatchedMesh&&Me.batching===!0||I.isBatchedMesh&&Me.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Me.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Me.instancing===!1||!I.isInstancedMesh&&Me.instancing===!0||I.isSkinnedMesh&&Me.skinning===!1||!I.isSkinnedMesh&&Me.skinning===!0||I.isInstancedMesh&&Me.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Me.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Me.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Me.instancingMorph===!1&&I.morphTexture!==null||Me.envMap!==ue||O.fog===!0&&Me.fog!==te||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ge.numPlanes||Me.numIntersection!==ge.numIntersection)||Me.vertexAlphas!==Ce||Me.vertexTangents!==Ae||Me.morphTargets!==be||Me.morphNormals!==We||Me.morphColors!==tt||Me.toneMapping!==_t||Me.morphTargetsCount!==st)&&(Ye=!0):(Ye=!0,Me.__version=O.version);let Jt=Me.currentProgram;Ye===!0&&(Jt=ms(O,D,I));let Gi=!1,Qt=!1,Tr=!1;const xt=Jt.getUniforms(),Wt=Me.uniforms;if(xe.useProgram(Jt.program)&&(Gi=!0,Qt=!0,Tr=!0),O.id!==R&&(R=O.id,Qt=!0),Gi||B!==g){xe.buffers.depth.getReversed()&&g.reversedDepth!==!0&&(g._reversedDepth=!0,g.updateProjectionMatrix()),xt.setValue(C,"projectionMatrix",g.projectionMatrix),xt.setValue(C,"viewMatrix",g.matrixWorldInverse);const Xt=xt.map.cameraPosition;Xt!==void 0&&Xt.setValue(C,ve.setFromMatrixPosition(g.matrixWorld)),lt.logarithmicDepthBuffer&&xt.setValue(C,"logDepthBufFC",2/(Math.log(g.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&xt.setValue(C,"isOrthographic",g.isOrthographicCamera===!0),B!==g&&(B=g,Qt=!0,Tr=!0)}if(I.isSkinnedMesh){xt.setOptional(C,I,"bindMatrix"),xt.setOptional(C,I,"bindMatrixInverse");const Bt=I.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),xt.setValue(C,"boneTexture",Bt.boneTexture,Le))}I.isBatchedMesh&&(xt.setOptional(C,I,"batchingTexture"),xt.setValue(C,"batchingTexture",I._matricesTexture,Le),xt.setOptional(C,I,"batchingIdTexture"),xt.setValue(C,"batchingIdTexture",I._indirectTexture,Le),xt.setOptional(C,I,"batchingColorTexture"),I._colorsTexture!==null&&xt.setValue(C,"batchingColorTexture",I._colorsTexture,Le));const ln=F.morphAttributes;if((ln.position!==void 0||ln.normal!==void 0||ln.color!==void 0)&&Te.update(I,F,Jt),(Qt||Me.receiveShadow!==I.receiveShadow)&&(Me.receiveShadow=I.receiveShadow,xt.setValue(C,"receiveShadow",I.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Wt.envMap.value=ue,Wt.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&D.environment!==null&&(Wt.envMapIntensity.value=D.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=Fg()),Qt&&(xt.setValue(C,"toneMappingExposure",M.toneMappingExposure),Me.needsLights&&xu(Wt,Tr),te&&O.fog===!0&&_e.refreshFogUniforms(Wt,te),_e.refreshMaterialUniforms(Wt,O,oe,ie,y.state.transmissionRenderTarget[g.id]),Ws.upload(C,ql(Me),Wt,Le)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ws.upload(C,ql(Me),Wt,Le),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&xt.setValue(C,"center",I.center),xt.setValue(C,"modelViewMatrix",I.modelViewMatrix),xt.setValue(C,"normalMatrix",I.normalMatrix),xt.setValue(C,"modelMatrix",I.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Bt=O.uniformsGroups;for(let Xt=0,po=Bt.length;Xt<po;Xt++){const _i=Bt[Xt];ce.update(_i,Jt),ce.bind(_i,Jt)}}return Jt}function xu(g,D){g.ambientLightColor.needsUpdate=D,g.lightProbe.needsUpdate=D,g.directionalLights.needsUpdate=D,g.directionalLightShadows.needsUpdate=D,g.pointLights.needsUpdate=D,g.pointLightShadows.needsUpdate=D,g.spotLights.needsUpdate=D,g.spotLightShadows.needsUpdate=D,g.rectAreaLights.needsUpdate=D,g.hemisphereLights.needsUpdate=D}function gu(g){return g.isMeshLambertMaterial||g.isMeshToonMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isShadowMaterial||g.isShaderMaterial&&g.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(g,D,F){const O=Se.get(g);O.__autoAllocateDepthBuffer=g.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),Se.get(g.texture).__webglTexture=D,Se.get(g.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:F,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(g,D){const F=Se.get(g);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0};const _u=C.createFramebuffer();this.setRenderTarget=function(g,D=0,F=0){v=g,k=D,S=F;let O=!0,I=null,te=!1,de=!1;if(g){const ue=Se.get(g);if(ue.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(C.FRAMEBUFFER,null),O=!1;else if(ue.__webglFramebuffer===void 0)Le.setupRenderTarget(g);else if(ue.__hasExternalTextures)Le.rebindTextures(g,Se.get(g.texture).__webglTexture,Se.get(g.depthTexture).__webglTexture);else if(g.depthBuffer){const be=g.depthTexture;if(ue.__boundDepthTexture!==be){if(be!==null&&Se.has(be)&&(g.width!==be.image.width||g.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(g)}}const Ce=g.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(de=!0);const Ae=Se.get(g).__webglFramebuffer;g.isWebGLCubeRenderTarget?(Array.isArray(Ae[D])?I=Ae[D][F]:I=Ae[D],te=!0):g.samples>0&&Le.useMultisampledRTT(g)===!1?I=Se.get(g).__webglMultisampledFramebuffer:Array.isArray(Ae)?I=Ae[F]:I=Ae,z.copy(g.viewport),q.copy(g.scissor),W=g.scissorTest}else z.copy(Qe).multiplyScalar(oe).floor(),q.copy(ot).multiplyScalar(oe).floor(),W=at;if(F!==0&&(I=_u),xe.bindFramebuffer(C.FRAMEBUFFER,I)&&O&&xe.drawBuffers(g,I),xe.viewport(z),xe.scissor(q),xe.setScissorTest(W),te){const ue=Se.get(g.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+D,ue.__webglTexture,F)}else if(de){const ue=D;for(let Ce=0;Ce<g.textures.length;Ce++){const Ae=Se.get(g.textures[Ce]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ce,Ae.__webglTexture,F,ue)}}else if(g!==null&&F!==0){const ue=Se.get(g.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ue.__webglTexture,F)}R=-1},this.readRenderTargetPixels=function(g,D,F,O,I,te,de,me=0){if(!(g&&g.isWebGLRenderTarget)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=Se.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&de!==void 0&&(ue=ue[de]),ue){xe.bindFramebuffer(C.FRAMEBUFFER,ue);try{const Ce=g.textures[me],Ae=Ce.format,be=Ce.type;if(!lt.textureFormatReadable(Ae)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!lt.textureTypeReadable(be)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=g.width-O&&F>=0&&F<=g.height-I&&(g.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+me),C.readPixels(D,F,O,I,Pe.convert(Ae),Pe.convert(be),te))}finally{const Ce=v!==null?Se.get(v).__webglFramebuffer:null;xe.bindFramebuffer(C.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(g,D,F,O,I,te,de,me=0){if(!(g&&g.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=Se.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&de!==void 0&&(ue=ue[de]),ue)if(D>=0&&D<=g.width-O&&F>=0&&F<=g.height-I){xe.bindFramebuffer(C.FRAMEBUFFER,ue);const Ce=g.textures[me],Ae=Ce.format,be=Ce.type;if(!lt.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!lt.textureTypeReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,We),C.bufferData(C.PIXEL_PACK_BUFFER,te.byteLength,C.STREAM_READ),g.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+me),C.readPixels(D,F,O,I,Pe.convert(Ae),Pe.convert(be),0);const tt=v!==null?Se.get(v).__webglFramebuffer:null;xe.bindFramebuffer(C.FRAMEBUFFER,tt);const _t=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await lp(C,_t,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,We),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,te),C.deleteBuffer(We),C.deleteSync(_t),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(g,D=null,F=0){const O=Math.pow(2,-F),I=Math.floor(g.image.width*O),te=Math.floor(g.image.height*O),de=D!==null?D.x:0,me=D!==null?D.y:0;Le.setTexture2D(g,0),C.copyTexSubImage2D(C.TEXTURE_2D,F,0,0,de,me,I,te),xe.unbindTexture()};const vu=C.createFramebuffer(),bu=C.createFramebuffer();this.copyTextureToTexture=function(g,D,F=null,O=null,I=0,te=null){te===null&&(I!==0?(jr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=I,I=0):te=0);let de,me,ue,Ce,Ae,be,We,tt,_t;const vt=g.isCompressedTexture?g.mipmaps[te]:g.image;if(F!==null)de=F.max.x-F.min.x,me=F.max.y-F.min.y,ue=F.isBox3?F.max.z-F.min.z:1,Ce=F.min.x,Ae=F.min.y,be=F.isBox3?F.min.z:0;else{const ln=Math.pow(2,-I);de=Math.floor(vt.width*ln),me=Math.floor(vt.height*ln),g.isDataArrayTexture?ue=vt.depth:g.isData3DTexture?ue=Math.floor(vt.depth*ln):ue=1,Ce=0,Ae=0,be=0}O!==null?(We=O.x,tt=O.y,_t=O.z):(We=0,tt=0,_t=0);const st=Pe.convert(D.format),Me=Pe.convert(D.type);let mt;D.isData3DTexture?(Le.setTexture3D(D,0),mt=C.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Le.setTexture2DArray(D,0),mt=C.TEXTURE_2D_ARRAY):(Le.setTexture2D(D,0),mt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,D.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,D.unpackAlignment);const Ye=C.getParameter(C.UNPACK_ROW_LENGTH),Jt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Gi=C.getParameter(C.UNPACK_SKIP_PIXELS),Qt=C.getParameter(C.UNPACK_SKIP_ROWS),Tr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,vt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,vt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ae),C.pixelStorei(C.UNPACK_SKIP_IMAGES,be);const xt=g.isDataArrayTexture||g.isData3DTexture,Wt=D.isDataArrayTexture||D.isData3DTexture;if(g.isDepthTexture){const ln=Se.get(g),Bt=Se.get(D),Xt=Se.get(ln.__renderTarget),po=Se.get(Bt.__renderTarget);xe.bindFramebuffer(C.READ_FRAMEBUFFER,Xt.__webglFramebuffer),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,po.__webglFramebuffer);for(let _i=0;_i<ue;_i++)xt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Se.get(g).__webglTexture,I,be+_i),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Se.get(D).__webglTexture,te,_t+_i)),C.blitFramebuffer(Ce,Ae,de,me,We,tt,de,me,C.DEPTH_BUFFER_BIT,C.NEAREST);xe.bindFramebuffer(C.READ_FRAMEBUFFER,null),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(I!==0||g.isRenderTargetTexture||Se.has(g)){const ln=Se.get(g),Bt=Se.get(D);xe.bindFramebuffer(C.READ_FRAMEBUFFER,vu),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,bu);for(let Xt=0;Xt<ue;Xt++)xt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ln.__webglTexture,I,be+Xt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ln.__webglTexture,I),Wt?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Bt.__webglTexture,te,_t+Xt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Bt.__webglTexture,te),I!==0?C.blitFramebuffer(Ce,Ae,de,me,We,tt,de,me,C.COLOR_BUFFER_BIT,C.NEAREST):Wt?C.copyTexSubImage3D(mt,te,We,tt,_t+Xt,Ce,Ae,de,me):C.copyTexSubImage2D(mt,te,We,tt,Ce,Ae,de,me);xe.bindFramebuffer(C.READ_FRAMEBUFFER,null),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Wt?g.isDataTexture||g.isData3DTexture?C.texSubImage3D(mt,te,We,tt,_t,de,me,ue,st,Me,vt.data):D.isCompressedArrayTexture?C.compressedTexSubImage3D(mt,te,We,tt,_t,de,me,ue,st,vt.data):C.texSubImage3D(mt,te,We,tt,_t,de,me,ue,st,Me,vt):g.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,te,We,tt,de,me,st,Me,vt.data):g.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,te,We,tt,vt.width,vt.height,st,vt.data):C.texSubImage2D(C.TEXTURE_2D,te,We,tt,de,me,st,Me,vt);C.pixelStorei(C.UNPACK_ROW_LENGTH,Ye),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Jt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Gi),C.pixelStorei(C.UNPACK_SKIP_ROWS,Qt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Tr),te===0&&D.generateMipmaps&&C.generateMipmap(mt),xe.unbindTexture()},this.initRenderTarget=function(g){Se.get(g).__webglFramebuffer===void 0&&Le.setupRenderTarget(g)},this.initTexture=function(g){g.isCubeTexture?Le.setTextureCube(g,0):g.isData3DTexture?Le.setTexture3D(g,0):g.isDataArrayTexture||g.isCompressedArrayTexture?Le.setTexture2DArray(g,0):Le.setTexture2D(g,0),xe.unbindTexture()},this.resetState=function(){k=0,S=0,v=null,xe.reset(),T.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}const $c={type:"change"},pl={type:"start"},th={type:"end"},Os=new kd,Yc=new li,Bg=Math.cos(70*dp.DEG2RAD),Tt=new N,qt=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Xo=1e-6;class kg extends Yp{constructor(e,t=null){super(e,t),this.state=it.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:cr.ROTATE,MIDDLE:cr.DOLLY,RIGHT:cr.PAN},this.touches={ONE:ar.ROTATE,TWO:ar.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Ii,this._lastTargetPosition=new N,this._quat=new Ii().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new yc,this._sphericalDelta=new yc,this._scale=1,this._panOffset=new N,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new N,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=zg.bind(this),this._onPointerDown=Vg.bind(this),this._onPointerUp=Hg.bind(this),this._onContextMenu=Yg.bind(this),this._onMouseWheel=Xg.bind(this),this._onKeyDown=jg.bind(this),this._onTouchStart=qg.bind(this),this._onTouchMove=$g.bind(this),this._onMouseDown=Gg.bind(this),this._onMouseMove=Wg.bind(this),this._interceptControlDown=Kg.bind(this),this._interceptControlUp=Zg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($c),this.update(),this.state=it.NONE}update(e=null){const t=this.object.position;Tt.copy(t).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=qt:i>Math.PI&&(i-=qt),r<-Math.PI?r+=qt:r>Math.PI&&(r-=qt),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Tt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Os.origin.copy(this.object.position),Os.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Os.direction))<Bg?this.object.lookAt(this.target):(Yc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Os.intersectPlane(Yc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Xo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Xo||this._lastTargetPosition.distanceToSquared(this.target)>Xo?(this.dispatchEvent($c),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?qt/60*this.autoRotateSpeed*e:qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Tt.setFromMatrixColumn(t,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,t){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(t,1):(Tt.setFromMatrixColumn(t,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Tt.copy(r).sub(this.target);let s=Tt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Vg(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function zg(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Hg(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(th),this.state=it.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Gg(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case cr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=it.DOLLY;break;case cr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=it.ROTATE}break;case cr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(pl)}function Wg(n){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Xg(n){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(n.preventDefault(),this.dispatchEvent(pl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(th))}function jg(n){this.enabled!==!1&&this._handleKeyDown(n)}function qg(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ar.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=it.TOUCH_ROTATE;break;case ar.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case ar.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=it.TOUCH_DOLLY_PAN;break;case ar.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(pl)}function $g(n){switch(this._trackPointer(n),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=it.NONE}}function Yg(n){this.enabled!==!1&&n.preventDefault()}function Kg(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Zg(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}/*! Tweakpane 4.0.5 (c) 2016 cocopon, licensed under the MIT license. */function ct(n){return n==null}function fl(n){return n!==null&&typeof n=="object"}function Wa(n){return n!==null&&typeof n=="object"}function Jg(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function Ni(n,e){return Array.from(new Set([...Object.keys(n),...Object.keys(e)])).reduce((i,r)=>{const s=n[r],o=e[r];return Wa(s)&&Wa(o)?Object.assign(Object.assign({},i),{[r]:Ni(s,o)}):Object.assign(Object.assign({},i),{[r]:r in e?o:s})},{})}function ml(n){return fl(n)?"target"in n:!1}const Qg={alreadydisposed:()=>"View has been already disposed",invalidparams:n=>`Invalid parameters for '${n.name}'`,nomatchingcontroller:n=>`No matching controller for '${n.key}'`,nomatchingview:n=>`No matching view for '${JSON.stringify(n.params)}'`,notbindable:()=>"Value is not bindable",notcompatible:n=>`Not compatible with  plugin '${n.id}'`,propertynotfound:n=>`Property '${n.name}' not found`,shouldneverhappen:()=>"This error should never happen"};class St{static alreadyDisposed(){return new St({type:"alreadydisposed"})}static notBindable(){return new St({type:"notbindable"})}static notCompatible(e,t){return new St({type:"notcompatible",context:{id:`${e}.${t}`}})}static propertyNotFound(e){return new St({type:"propertynotfound",context:{name:e}})}static shouldNeverHappen(){return new St({type:"shouldneverhappen"})}constructor(e){var t;this.message=(t=Qg[e.type](e.context))!==null&&t!==void 0?t:"Unexpected error",this.name=this.constructor.name,this.stack=new Error(this.message).stack,this.type=e.type}toString(){return this.message}}class Zs{constructor(e,t){this.obj_=e,this.key=t}static isBindable(e){return!(e===null||typeof e!="object"&&typeof e!="function")}read(){return this.obj_[this.key]}write(e){this.obj_[this.key]=e}writeProperty(e,t){const i=this.read();if(!Zs.isBindable(i))throw St.notBindable();if(!(e in i))throw St.propertyNotFound(e);i[e]=t}}class Ct{constructor(){this.observers_={}}on(e,t,i){var r;let s=this.observers_[e];return s||(s=this.observers_[e]=[]),s.push({handler:t,key:(r=i?.key)!==null&&r!==void 0?r:t}),this}off(e,t){const i=this.observers_[e];return i&&(this.observers_[e]=i.filter(r=>r.key!==t)),this}emit(e,t){const i=this.observers_[e];i&&i.forEach(r=>{r.handler(t)})}}class e_{constructor(e,t){var i;this.constraint_=t?.constraint,this.equals_=(i=t?.equals)!==null&&i!==void 0?i:((r,s)=>r===s),this.emitter=new Ct,this.rawValue_=e}get constraint(){return this.constraint_}get rawValue(){return this.rawValue_}set rawValue(e){this.setRawValue(e,{forceEmit:!1,last:!0})}setRawValue(e,t){const i=t??{forceEmit:!1,last:!0},r=this.constraint_?this.constraint_.constrain(e):e,s=this.rawValue_;this.equals_(s,r)&&!i.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.rawValue_=r,this.emitter.emit("change",{options:i,previousRawValue:s,rawValue:r,sender:this}))}}class t_{constructor(e){this.emitter=new Ct,this.value_=e}get rawValue(){return this.value_}set rawValue(e){this.setRawValue(e,{forceEmit:!1,last:!0})}setRawValue(e,t){const i=t??{forceEmit:!1,last:!0},r=this.value_;r===e&&!i.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.value_=e,this.emitter.emit("change",{options:i,previousRawValue:r,rawValue:this.value_,sender:this}))}}class n_{constructor(e){this.emitter=new Ct,this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.value_=e,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_)}get rawValue(){return this.value_.rawValue}onValueBeforeChange_(e){this.emitter.emit("beforechange",Object.assign(Object.assign({},e),{sender:this}))}onValueChange_(e){this.emitter.emit("change",Object.assign(Object.assign({},e),{sender:this}))}}function pt(n,e){const t=e?.constraint,i=e?.equals;return!t&&!i?new t_(n):new e_(n,e)}function i_(n){return[new n_(n),(e,t)=>{n.setRawValue(e,t)}]}class Be{constructor(e){this.emitter=new Ct,this.valMap_=e;for(const t in this.valMap_)this.valMap_[t].emitter.on("change",()=>{this.emitter.emit("change",{key:t,sender:this})})}static createCore(e){return Object.keys(e).reduce((i,r)=>Object.assign(i,{[r]:pt(e[r])}),{})}static fromObject(e){const t=this.createCore(e);return new Be(t)}get(e){return this.valMap_[e].rawValue}set(e,t){this.valMap_[e].rawValue=t}value(e){return this.valMap_[e]}}class is{constructor(e){this.values=Be.fromObject({max:e.max,min:e.min})}constrain(e){const t=this.values.get("max"),i=this.values.get("min");return Math.min(Math.max(e,i),t)}}class r_{constructor(e){this.values=Be.fromObject({max:e.max,min:e.min})}constrain(e){const t=this.values.get("max"),i=this.values.get("min");let r=e;return ct(i)||(r=Math.max(r,i)),ct(t)||(r=Math.min(r,t)),r}}class s_{constructor(e,t=0){this.step=e,this.origin=t}constrain(e){const t=this.origin%this.step,i=Math.round((e-t)/this.step);return t+i*this.step}}class o_{constructor(e){this.text=e}evaluate(){return Number(this.text)}toString(){return this.text}}const a_={"**":(n,e)=>Math.pow(n,e),"*":(n,e)=>n*e,"/":(n,e)=>n/e,"%":(n,e)=>n%e,"+":(n,e)=>n+e,"-":(n,e)=>n-e,"<<":(n,e)=>n<<e,">>":(n,e)=>n>>e,">>>":(n,e)=>n>>>e,"&":(n,e)=>n&e,"^":(n,e)=>n^e,"|":(n,e)=>n|e};class l_{constructor(e,t,i){this.left=t,this.operator=e,this.right=i}evaluate(){const e=a_[this.operator];if(!e)throw new Error(`unexpected binary operator: '${this.operator}`);return e(this.left.evaluate(),this.right.evaluate())}toString(){return["b(",this.left.toString(),this.operator,this.right.toString(),")"].join(" ")}}const c_={"+":n=>n,"-":n=>-n,"~":n=>~n};class d_{constructor(e,t){this.operator=e,this.expression=t}evaluate(){const e=c_[this.operator];if(!e)throw new Error(`unexpected unary operator: '${this.operator}`);return e(this.expression.evaluate())}toString(){return["u(",this.operator,this.expression.toString(),")"].join(" ")}}function xl(n){return(e,t)=>{for(let i=0;i<n.length;i++){const r=n[i](e,t);if(r!=="")return r}return""}}function $r(n,e){var t;const i=n.substr(e).match(/^\s+/);return(t=i&&i[0])!==null&&t!==void 0?t:""}function h_(n,e){const t=n.substr(e,1);return t.match(/^[1-9]$/)?t:""}function Yr(n,e){var t;const i=n.substr(e).match(/^[0-9]+/);return(t=i&&i[0])!==null&&t!==void 0?t:""}function u_(n,e){const t=Yr(n,e);if(t!=="")return t;const i=n.substr(e,1);if(e+=1,i!=="-"&&i!=="+")return"";const r=Yr(n,e);return r===""?"":i+r}function gl(n,e){const t=n.substr(e,1);if(e+=1,t.toLowerCase()!=="e")return"";const i=u_(n,e);return i===""?"":t+i}function nh(n,e){const t=n.substr(e,1);if(t==="0")return t;const i=h_(n,e);return e+=i.length,i===""?"":i+Yr(n,e)}function p_(n,e){const t=nh(n,e);if(e+=t.length,t==="")return"";const i=n.substr(e,1);if(e+=i.length,i!==".")return"";const r=Yr(n,e);return e+=r.length,t+i+r+gl(n,e)}function f_(n,e){const t=n.substr(e,1);if(e+=t.length,t!==".")return"";const i=Yr(n,e);return e+=i.length,i===""?"":t+i+gl(n,e)}function m_(n,e){const t=nh(n,e);return e+=t.length,t===""?"":t+gl(n,e)}const x_=xl([p_,f_,m_]);function g_(n,e){var t;const i=n.substr(e).match(/^[01]+/);return(t=i&&i[0])!==null&&t!==void 0?t:""}function __(n,e){const t=n.substr(e,2);if(e+=t.length,t.toLowerCase()!=="0b")return"";const i=g_(n,e);return i===""?"":t+i}function v_(n,e){var t;const i=n.substr(e).match(/^[0-7]+/);return(t=i&&i[0])!==null&&t!==void 0?t:""}function b_(n,e){const t=n.substr(e,2);if(e+=t.length,t.toLowerCase()!=="0o")return"";const i=v_(n,e);return i===""?"":t+i}function S_(n,e){var t;const i=n.substr(e).match(/^[0-9a-f]+/i);return(t=i&&i[0])!==null&&t!==void 0?t:""}function w_(n,e){const t=n.substr(e,2);if(e+=t.length,t.toLowerCase()!=="0x")return"";const i=S_(n,e);return i===""?"":t+i}const y_=xl([__,b_,w_]),M_=xl([y_,x_]);function E_(n,e){const t=M_(n,e);return e+=t.length,t===""?null:{evaluable:new o_(t),cursor:e}}function C_(n,e){const t=n.substr(e,1);if(e+=t.length,t!=="(")return null;const i=rh(n,e);if(!i)return null;e=i.cursor,e+=$r(n,e).length;const r=n.substr(e,1);return e+=r.length,r!==")"?null:{evaluable:i.evaluable,cursor:e}}function T_(n,e){var t;return(t=E_(n,e))!==null&&t!==void 0?t:C_(n,e)}function ih(n,e){const t=T_(n,e);if(t)return t;const i=n.substr(e,1);if(e+=i.length,i!=="+"&&i!=="-"&&i!=="~")return null;const r=ih(n,e);return r?(e=r.cursor,{cursor:e,evaluable:new d_(i,r.evaluable)}):null}function A_(n,e,t){t+=$r(e,t).length;const i=n.filter(r=>e.startsWith(r,t))[0];return i?(t+=i.length,t+=$r(e,t).length,{cursor:t,operator:i}):null}function P_(n,e){return(t,i)=>{const r=n(t,i);if(!r)return null;i=r.cursor;let s=r.evaluable;for(;;){const o=A_(e,t,i);if(!o)break;i=o.cursor;const a=n(t,i);if(!a)return null;i=a.cursor,s=new l_(o.operator,s,a.evaluable)}return s?{cursor:i,evaluable:s}:null}}const R_=[["**"],["*","/","%"],["+","-"],["<<",">>>",">>"],["&"],["^"],["|"]].reduce((n,e)=>P_(n,e),ih);function rh(n,e){return e+=$r(n,e).length,R_(n,e)}function L_(n){const e=rh(n,0);return!e||e.cursor+$r(n,e.cursor).length!==n.length?null:e.evaluable}function Kn(n){var e;const t=L_(n);return(e=t?.evaluate())!==null&&e!==void 0?e:null}function sh(n){if(typeof n=="number")return n;if(typeof n=="string"){const e=Kn(n);if(!ct(e))return e}return 0}function D_(n){return String(n)}function Zt(n){return e=>e.toFixed(Math.max(Math.min(n,20),0))}function Je(n,e,t,i,r){const s=(n-e)/(t-e);return i+s*(r-i)}function Kc(n){return String(n.toFixed(10)).split(".")[1].replace(/0+$/,"").length}function At(n,e,t){return Math.min(Math.max(n,e),t)}function oh(n,e){return(n%e+e)%e}function I_(n,e){return ct(n.step)?Math.max(Kc(e),2):Kc(n.step)}function ah(n){var e;return(e=n.step)!==null&&e!==void 0?e:1}function lh(n,e){var t;const i=Math.abs((t=n.step)!==null&&t!==void 0?t:e);return i===0?.1:Math.pow(10,Math.floor(Math.log10(i))-1)}function ch(n,e){return ct(n.step)?null:new s_(n.step,e)}function dh(n){return!ct(n.max)&&!ct(n.min)?new is({max:n.max,min:n.min}):!ct(n.max)||!ct(n.min)?new r_({max:n.max,min:n.min}):null}function hh(n,e){var t,i,r;return{formatter:(t=n.format)!==null&&t!==void 0?t:Zt(I_(n,e)),keyScale:(i=n.keyScale)!==null&&i!==void 0?i:ah(n),pointerScale:(r=n.pointerScale)!==null&&r!==void 0?r:lh(n,e)}}function uh(n){return{format:n.optional.function,keyScale:n.optional.number,max:n.optional.number,min:n.optional.number,pointerScale:n.optional.number,step:n.optional.number}}function _l(n){return{constraint:n.constraint,textProps:Be.fromObject(hh(n.params,n.initialValue))}}class Vi{constructor(e){this.controller=e}get element(){return this.controller.view.element}get disabled(){return this.controller.viewProps.get("disabled")}set disabled(e){this.controller.viewProps.set("disabled",e)}get hidden(){return this.controller.viewProps.get("hidden")}set hidden(e){this.controller.viewProps.set("hidden",e)}dispose(){this.controller.viewProps.set("disposed",!0)}importState(e){return this.controller.importState(e)}exportState(){return this.controller.exportState()}}class oo{constructor(e){this.target=e}}class rs extends oo{constructor(e,t,i){super(e),this.value=t,this.last=i??!0}}class U_ extends oo{constructor(e,t){super(e),this.expanded=t}}class N_ extends oo{constructor(e,t){super(e),this.index=t}}class F_ extends oo{constructor(e,t){super(e),this.native=t}}class Kr extends Vi{constructor(e){super(e),this.onValueChange_=this.onValueChange_.bind(this),this.emitter_=new Ct,this.controller.value.emitter.on("change",this.onValueChange_)}get label(){return this.controller.labelController.props.get("label")}set label(e){this.controller.labelController.props.set("label",e)}get key(){return this.controller.value.binding.target.key}get tag(){return this.controller.tag}set tag(e){this.controller.tag=e}on(e,t){const i=t.bind(this);return this.emitter_.on(e,r=>{i(r)},{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}refresh(){this.controller.value.fetch()}onValueChange_(e){const t=this.controller.value;this.emitter_.emit("change",new rs(this,t.binding.target.read(),e.options.last))}}class O_{constructor(e,t){this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=t,this.value_=e,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.emitter=new Ct}get rawValue(){return this.value_.rawValue}set rawValue(e){this.value_.rawValue=e}setRawValue(e,t){this.value_.setRawValue(e,t)}fetch(){this.value_.rawValue=this.binding.read()}push(){this.binding.write(this.value_.rawValue)}onValueBeforeChange_(e){this.emitter.emit("beforechange",Object.assign(Object.assign({},e),{sender:this}))}onValueChange_(e){this.push(),this.emitter.emit("change",Object.assign(Object.assign({},e),{sender:this}))}}function B_(n){if(!("binding"in n))return!1;const e=n.binding;return ml(e)&&"read"in e&&"write"in e}function k_(n,e){const i=Object.keys(e).reduce((r,s)=>{if(r===void 0)return;const o=e[s],a=o(n[s]);return a.succeeded?Object.assign(Object.assign({},r),{[s]:a.value}):void 0},{});return i}function V_(n,e){return n.reduce((t,i)=>{if(t===void 0)return;const r=e(i);if(!(!r.succeeded||r.value===void 0))return[...t,r.value]},[])}function z_(n){return n===null?!1:typeof n=="object"}function Vn(n){return e=>t=>{if(!e&&t===void 0)return{succeeded:!1,value:void 0};if(e&&t===void 0)return{succeeded:!0,value:void 0};const i=n(t);return i!==void 0?{succeeded:!0,value:i}:{succeeded:!1,value:void 0}}}function Zc(n){return{custom:e=>Vn(e)(n),boolean:Vn(e=>typeof e=="boolean"?e:void 0)(n),number:Vn(e=>typeof e=="number"?e:void 0)(n),string:Vn(e=>typeof e=="string"?e:void 0)(n),function:Vn(e=>typeof e=="function"?e:void 0)(n),constant:e=>Vn(t=>t===e?e:void 0)(n),raw:Vn(e=>e)(n),object:e=>Vn(t=>{if(z_(t))return k_(t,e)})(n),array:e=>Vn(t=>{if(Array.isArray(t))return V_(t,e)})(n)}}const Xa={optional:Zc(!0),required:Zc(!1)};function gt(n,e){const t=e(Xa),i=Xa.required.object(t)(n);return i.succeeded?i.value:void 0}function on(n,e,t,i){if(e&&!e(n))return!1;const r=gt(n,t);return r?i(r):!1}function an(n,e){var t;return Ni((t=n?.())!==null&&t!==void 0?t:{},e)}function Li(n){return"value"in n}function ph(n){if(!fl(n)||!("binding"in n))return!1;const e=n.binding;return ml(e)}const Cn="http://www.w3.org/2000/svg";function Js(n){n.offsetHeight}function H_(n,e){const t=n.style.transition;n.style.transition="none",e(),n.style.transition=t}function vl(n){return n.ontouchstart!==void 0}function G_(){return globalThis}function W_(){return G_().document}function X_(n){const e=n.ownerDocument.defaultView;return e&&"document"in e?n.getContext("2d",{willReadFrequently:!0}):null}const j_={check:'<path d="M2 8l4 4l8 -8"/>',dropdown:'<path d="M5 7h6l-3 3 z"/>',p2dpad:'<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'};function ao(n,e){const t=n.createElementNS(Cn,"svg");return t.innerHTML=j_[e],t}function fh(n,e,t){n.insertBefore(e,n.children[t])}function bl(n){n.parentElement&&n.parentElement.removeChild(n)}function mh(n){for(;n.children.length>0;)n.removeChild(n.children[0])}function q_(n){for(;n.childNodes.length>0;)n.removeChild(n.childNodes[0])}function xh(n){return n.relatedTarget?n.relatedTarget:"explicitOriginalTarget"in n?n.explicitOriginalTarget:null}function $n(n,e){n.emitter.on("change",t=>{e(t.rawValue)}),e(n.rawValue)}function Dn(n,e,t){$n(n.value(e),t)}const $_="tp";function $e(n){return(t,i)=>[$_,"-",n,"v",t?`_${t}`:"",i?`-${i}`:""].join("")}const Ur=$e("lbl");function Y_(n,e){const t=n.createDocumentFragment();return e.split(`
`).map(r=>n.createTextNode(r)).forEach((r,s)=>{s>0&&t.appendChild(n.createElement("br")),t.appendChild(r)}),t}class gh{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Ur()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("div");i.classList.add(Ur("l")),Dn(t.props,"label",s=>{ct(s)?this.element.classList.add(Ur(void 0,"nol")):(this.element.classList.remove(Ur(void 0,"nol")),q_(i),i.appendChild(Y_(e,s)))}),this.element.appendChild(i),this.labelElement=i;const r=e.createElement("div");r.classList.add(Ur("v")),this.element.appendChild(r),this.valueElement=r}}class _h{constructor(e,t){this.props=t.props,this.valueController=t.valueController,this.viewProps=t.valueController.viewProps,this.view=new gh(e,{props:t.props,viewProps:this.viewProps}),this.view.valueElement.appendChild(this.valueController.view.element)}importProps(e){return on(e,null,t=>({label:t.optional.string}),t=>(this.props.set("label",t.label),!0))}exportProps(){return an(null,{label:this.props.get("label")})}}function K_(){return["veryfirst","first","last","verylast"]}const Jc=$e(""),Qc={veryfirst:"vfst",first:"fst",last:"lst",verylast:"vlst"};class lo{constructor(e){this.parent_=null,this.blade=e.blade,this.view=e.view,this.viewProps=e.viewProps;const t=this.view.element;this.blade.value("positions").emitter.on("change",()=>{K_().forEach(i=>{t.classList.remove(Jc(void 0,Qc[i]))}),this.blade.get("positions").forEach(i=>{t.classList.add(Jc(void 0,Qc[i]))})}),this.viewProps.handleDispose(()=>{bl(t)})}get parent(){return this.parent_}set parent(e){this.parent_=e,this.viewProps.set("parent",this.parent_?this.parent_.viewProps:null)}importState(e){return on(e,null,t=>({disabled:t.required.boolean,hidden:t.required.boolean}),t=>(this.viewProps.importState(t),!0))}exportState(){return an(null,Object.assign({},this.viewProps.exportState()))}}class Fi extends lo{constructor(e,t){if(t.value!==t.valueController.value)throw St.shouldNeverHappen();const i=t.valueController.viewProps,r=new _h(e,{blade:t.blade,props:t.props,valueController:t.valueController});super(Object.assign(Object.assign({},t),{view:new gh(e,{props:t.props,viewProps:i}),viewProps:i})),this.labelController=r,this.value=t.value,this.valueController=t.valueController,this.view.valueElement.appendChild(this.valueController.view.element)}importState(e){return on(e,t=>{var i,r,s;return super.importState(t)&&this.labelController.importProps(t)&&((s=(r=(i=this.valueController).importProps)===null||r===void 0?void 0:r.call(i,e))!==null&&s!==void 0?s:!0)},t=>({value:t.optional.raw}),t=>(t.value&&(this.value.rawValue=t.value),!0))}exportState(){var e,t,i;return an(()=>super.exportState(),Object.assign(Object.assign({value:this.value.rawValue},this.labelController.exportProps()),(i=(t=(e=this.valueController).exportProps)===null||t===void 0?void 0:t.call(e))!==null&&i!==void 0?i:{}))}}function ed(n){const e=Object.assign({},n);return delete e.value,e}class vh extends Fi{constructor(e,t){super(e,t),this.tag=t.tag}importState(e){return on(e,t=>super.importState(ed(e)),t=>({tag:t.optional.string}),t=>(this.tag=t.tag,!0))}exportState(){return an(()=>ed(super.exportState()),{binding:{key:this.value.binding.target.key,value:this.value.binding.target.read()},tag:this.tag})}}function Z_(n){return Li(n)&&ph(n.value)}class J_ extends vh{importState(e){return on(e,t=>super.importState(t),t=>({binding:t.required.object({value:t.required.raw})}),t=>(this.value.binding.inject(t.binding.value),this.value.fetch(),!0))}}function Q_(n){return Li(n)&&B_(n.value)}function bh(n,e){for(;n.length<e;)n.push(void 0)}function ev(n){const e=[];return bh(e,n),e}function tv(n){const e=n.indexOf(void 0);return e<0?n:n.slice(0,e)}function nv(n,e){const t=[...tv(n),e];return t.length>n.length?t.splice(0,t.length-n.length):bh(t,n.length),t}class iv{constructor(e){this.emitter=new Ct,this.onTick_=this.onTick_.bind(this),this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=e.binding,this.value_=pt(ev(e.bufferSize)),this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.ticker=e.ticker,this.ticker.emitter.on("tick",this.onTick_),this.fetch()}get rawValue(){return this.value_.rawValue}set rawValue(e){this.value_.rawValue=e}setRawValue(e,t){this.value_.setRawValue(e,t)}fetch(){this.value_.rawValue=nv(this.value_.rawValue,this.binding.read())}onTick_(){this.fetch()}onValueBeforeChange_(e){this.emitter.emit("beforechange",Object.assign(Object.assign({},e),{sender:this}))}onValueChange_(e){this.emitter.emit("change",Object.assign(Object.assign({},e),{sender:this}))}}function rv(n){if(!("binding"in n))return!1;const e=n.binding;return ml(e)&&"read"in e&&!("write"in e)}class sv extends vh{exportState(){return an(()=>super.exportState(),{binding:{readonly:!0}})}}function ov(n){return Li(n)&&rv(n.value)}class av extends Vi{get label(){return this.controller.labelController.props.get("label")}set label(e){this.controller.labelController.props.set("label",e)}get title(){var e;return(e=this.controller.buttonController.props.get("title"))!==null&&e!==void 0?e:""}set title(e){this.controller.buttonController.props.set("title",e)}on(e,t){const i=t.bind(this);return this.controller.buttonController.emitter.on(e,s=>{i(new F_(this,s.nativeEvent))}),this}off(e,t){return this.controller.buttonController.emitter.off(e,t),this}}function lv(n,e,t){t?n.classList.add(e):n.classList.remove(e)}function yr(n,e){return t=>{lv(n,e,t)}}function Sl(n,e){$n(n,t=>{e.textContent=t??""})}const jo=$e("btn");class cv{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(jo()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("button");i.classList.add(jo("b")),t.viewProps.bindDisabled(i),this.element.appendChild(i),this.buttonElement=i;const r=e.createElement("div");r.classList.add(jo("t")),Sl(t.props.value("title"),r),this.buttonElement.appendChild(r)}}class dv{constructor(e,t){this.emitter=new Ct,this.onClick_=this.onClick_.bind(this),this.props=t.props,this.viewProps=t.viewProps,this.view=new cv(e,{props:this.props,viewProps:this.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}importProps(e){return on(e,null,t=>({title:t.optional.string}),t=>(this.props.set("title",t.title),!0))}exportProps(){return an(null,{title:this.props.get("title")})}onClick_(e){this.emitter.emit("click",{nativeEvent:e,sender:this})}}class td extends lo{constructor(e,t){const i=new dv(e,{props:t.buttonProps,viewProps:t.viewProps}),r=new _h(e,{blade:t.blade,props:t.labelProps,valueController:i});super({blade:t.blade,view:r.view,viewProps:t.viewProps}),this.buttonController=i,this.labelController=r}importState(e){return on(e,t=>super.importState(t)&&this.buttonController.importProps(t)&&this.labelController.importProps(t),()=>({}),()=>!0)}exportState(){return an(()=>super.exportState(),Object.assign(Object.assign({},this.buttonController.exportProps()),this.labelController.exportProps()))}}class Sh{constructor(e){const[t,i]=e.split("-"),r=t.split(".");this.major=parseInt(r[0],10),this.minor=parseInt(r[1],10),this.patch=parseInt(r[2],10),this.prerelease=i??null}toString(){const e=[this.major,this.minor,this.patch].join(".");return this.prerelease!==null?[e,this.prerelease].join("-"):e}}const Mr=new Sh("2.0.5");function Gt(n){return Object.assign({core:Mr},n)}const hv=Gt({id:"button",type:"blade",accept(n){const e=gt(n,t=>({title:t.required.string,view:t.required.constant("button"),label:t.optional.string}));return e?{params:e}:null},controller(n){return new td(n.document,{blade:n.blade,buttonProps:Be.fromObject({title:n.params.title}),labelProps:Be.fromObject({label:n.params.label}),viewProps:n.viewProps})},api(n){return n.controller instanceof td?new av(n.controller):null}});function uv(n,e){return n.addBlade(Object.assign(Object.assign({},e),{view:"button"}))}function pv(n,e){return n.addBlade(Object.assign(Object.assign({},e),{view:"folder"}))}function fv(n,e){return n.addBlade(Object.assign(Object.assign({},e),{view:"tab"}))}function mv(n){return fl(n)?"refresh"in n&&typeof n.refresh=="function":!1}function xv(n,e){if(!Zs.isBindable(n))throw St.notBindable();return new Zs(n,e)}class gv{constructor(e,t){this.onRackValueChange_=this.onRackValueChange_.bind(this),this.controller_=e,this.emitter_=new Ct,this.pool_=t,this.controller_.rack.emitter.on("valuechange",this.onRackValueChange_)}get children(){return this.controller_.rack.children.map(e=>this.pool_.createApi(e))}addBinding(e,t,i){const r=i??{},s=this.controller_.element.ownerDocument,o=this.pool_.createBinding(s,xv(e,t),r),a=this.pool_.createBindingApi(o);return this.add(a,r.index)}addFolder(e){return pv(this,e)}addButton(e){return uv(this,e)}addTab(e){return fv(this,e)}add(e,t){const i=e.controller;return this.controller_.rack.add(i,t),e}remove(e){this.controller_.rack.remove(e.controller)}addBlade(e){const t=this.controller_.element.ownerDocument,i=this.pool_.createBlade(t,e),r=this.pool_.createApi(i);return this.add(r,e.index)}on(e,t){const i=t.bind(this);return this.emitter_.on(e,r=>{i(r)},{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}refresh(){this.children.forEach(e=>{mv(e)&&e.refresh()})}onRackValueChange_(e){const t=e.bladeController,i=this.pool_.createApi(t),r=ph(t.value)?t.value.binding:null;this.emitter_.emit("change",new rs(i,r?r.target.read():t.value.rawValue,e.options.last))}}class wl extends Vi{constructor(e,t){super(e),this.rackApi_=new gv(e.rackController,t)}refresh(){this.rackApi_.refresh()}}class yl extends lo{constructor(e){super({blade:e.blade,view:e.view,viewProps:e.rackController.viewProps}),this.rackController=e.rackController}importState(e){return on(e,t=>super.importState(t),t=>({children:t.required.array(t.required.raw)}),t=>this.rackController.rack.children.every((i,r)=>i.importState(t.children[r])))}exportState(){return an(()=>super.exportState(),{children:this.rackController.rack.children.map(e=>e.exportState())})}}function ja(n){return"rackController"in n}class _v{constructor(e){this.emitter=new Ct,this.items_=[],this.cache_=new Set,this.onSubListAdd_=this.onSubListAdd_.bind(this),this.onSubListRemove_=this.onSubListRemove_.bind(this),this.extract_=e}get items(){return this.items_}allItems(){return Array.from(this.cache_)}find(e){for(const t of this.allItems())if(e(t))return t;return null}includes(e){return this.cache_.has(e)}add(e,t){if(this.includes(e))throw St.shouldNeverHappen();const i=t!==void 0?t:this.items_.length;this.items_.splice(i,0,e),this.cache_.add(e);const r=this.extract_(e);r&&(r.emitter.on("add",this.onSubListAdd_),r.emitter.on("remove",this.onSubListRemove_),r.allItems().forEach(s=>{this.cache_.add(s)})),this.emitter.emit("add",{index:i,item:e,root:this,target:this})}remove(e){const t=this.items_.indexOf(e);if(t<0)return;this.items_.splice(t,1),this.cache_.delete(e);const i=this.extract_(e);i&&(i.allItems().forEach(r=>{this.cache_.delete(r)}),i.emitter.off("add",this.onSubListAdd_),i.emitter.off("remove",this.onSubListRemove_)),this.emitter.emit("remove",{index:t,item:e,root:this,target:this})}onSubListAdd_(e){this.cache_.add(e.item),this.emitter.emit("add",{index:e.index,item:e.item,root:this,target:e.target})}onSubListRemove_(e){this.cache_.delete(e.item),this.emitter.emit("remove",{index:e.index,item:e.item,root:this,target:e.target})}}function vv(n,e){for(let t=0;t<n.length;t++){const i=n[t];if(Li(i)&&i.value===e)return i}return null}function bv(n){return ja(n)?n.rackController.rack.bcSet_:null}class Sv{constructor(e){var t,i;this.emitter=new Ct,this.onBladePositionsChange_=this.onBladePositionsChange_.bind(this),this.onSetAdd_=this.onSetAdd_.bind(this),this.onSetRemove_=this.onSetRemove_.bind(this),this.onChildDispose_=this.onChildDispose_.bind(this),this.onChildPositionsChange_=this.onChildPositionsChange_.bind(this),this.onChildValueChange_=this.onChildValueChange_.bind(this),this.onChildViewPropsChange_=this.onChildViewPropsChange_.bind(this),this.onRackLayout_=this.onRackLayout_.bind(this),this.onRackValueChange_=this.onRackValueChange_.bind(this),this.blade_=(t=e.blade)!==null&&t!==void 0?t:null,(i=this.blade_)===null||i===void 0||i.value("positions").emitter.on("change",this.onBladePositionsChange_),this.viewProps=e.viewProps,this.bcSet_=new _v(bv),this.bcSet_.emitter.on("add",this.onSetAdd_),this.bcSet_.emitter.on("remove",this.onSetRemove_)}get children(){return this.bcSet_.items}add(e,t){var i;(i=e.parent)===null||i===void 0||i.remove(e),e.parent=this,this.bcSet_.add(e,t)}remove(e){e.parent=null,this.bcSet_.remove(e)}find(e){return this.bcSet_.allItems().filter(e)}onSetAdd_(e){this.updatePositions_();const t=e.target===e.root;if(this.emitter.emit("add",{bladeController:e.item,index:e.index,root:t,sender:this}),!t)return;const i=e.item;if(i.viewProps.emitter.on("change",this.onChildViewPropsChange_),i.blade.value("positions").emitter.on("change",this.onChildPositionsChange_),i.viewProps.handleDispose(this.onChildDispose_),Li(i))i.value.emitter.on("change",this.onChildValueChange_);else if(ja(i)){const r=i.rackController.rack;if(r){const s=r.emitter;s.on("layout",this.onRackLayout_),s.on("valuechange",this.onRackValueChange_)}}}onSetRemove_(e){this.updatePositions_();const t=e.target===e.root;if(this.emitter.emit("remove",{bladeController:e.item,root:t,sender:this}),!t)return;const i=e.item;if(Li(i))i.value.emitter.off("change",this.onChildValueChange_);else if(ja(i)){const r=i.rackController.rack;if(r){const s=r.emitter;s.off("layout",this.onRackLayout_),s.off("valuechange",this.onRackValueChange_)}}}updatePositions_(){const e=this.bcSet_.items.filter(r=>!r.viewProps.get("hidden")),t=e[0],i=e[e.length-1];this.bcSet_.items.forEach(r=>{const s=[];r===t&&(s.push("first"),(!this.blade_||this.blade_.get("positions").includes("veryfirst"))&&s.push("veryfirst")),r===i&&(s.push("last"),(!this.blade_||this.blade_.get("positions").includes("verylast"))&&s.push("verylast")),r.blade.set("positions",s)})}onChildPositionsChange_(){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildViewPropsChange_(e){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildDispose_(){this.bcSet_.items.filter(t=>t.viewProps.get("disposed")).forEach(t=>{this.bcSet_.remove(t)})}onChildValueChange_(e){const t=vv(this.find(Li),e.sender);if(!t)throw St.alreadyDisposed();this.emitter.emit("valuechange",{bladeController:t,options:e.options,sender:this})}onRackLayout_(e){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onRackValueChange_(e){this.emitter.emit("valuechange",{bladeController:e.bladeController,options:e.options,sender:this})}onBladePositionsChange_(){this.updatePositions_()}}class Ml{constructor(e){this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this),this.element=e.element,this.viewProps=e.viewProps;const t=new Sv({blade:e.root?void 0:e.blade,viewProps:e.viewProps});t.emitter.on("add",this.onRackAdd_),t.emitter.on("remove",this.onRackRemove_),this.rack=t,this.viewProps.handleDispose(()=>{for(let i=this.rack.children.length-1;i>=0;i--)this.rack.children[i].viewProps.set("disposed",!0)})}onRackAdd_(e){e.root&&fh(this.element,e.bladeController.view.element,e.index)}onRackRemove_(e){e.root&&bl(e.bladeController.view.element)}}function Er(){return new Be({positions:pt([],{equals:Jg})})}class ss extends Be{constructor(e){super(e)}static create(e){const t={completed:!0,expanded:e,expandedHeight:null,shouldFixHeight:!1,temporaryExpanded:null},i=Be.createCore(t);return new ss(i)}get styleExpanded(){var e;return(e=this.get("temporaryExpanded"))!==null&&e!==void 0?e:this.get("expanded")}get styleHeight(){if(!this.styleExpanded)return"0";const e=this.get("expandedHeight");return this.get("shouldFixHeight")&&!ct(e)?`${e}px`:"auto"}bindExpandedClass(e,t){const i=()=>{this.styleExpanded?e.classList.add(t):e.classList.remove(t)};Dn(this,"expanded",i),Dn(this,"temporaryExpanded",i)}cleanUpTransition(){this.set("shouldFixHeight",!1),this.set("expandedHeight",null),this.set("completed",!0)}}function wv(n,e){let t=0;return H_(e,()=>{n.set("expandedHeight",null),n.set("temporaryExpanded",!0),Js(e),t=e.clientHeight,n.set("temporaryExpanded",null),Js(e)}),t}function nd(n,e){e.style.height=n.styleHeight}function El(n,e){n.value("expanded").emitter.on("beforechange",()=>{if(n.set("completed",!1),ct(n.get("expandedHeight"))){const t=wv(n,e);t>0&&n.set("expandedHeight",t)}n.set("shouldFixHeight",!0),Js(e)}),n.emitter.on("change",()=>{nd(n,e)}),nd(n,e),e.addEventListener("transitionend",t=>{t.propertyName==="height"&&n.cleanUpTransition()})}class wh extends wl{constructor(e,t){super(e,t),this.emitter_=new Ct,this.controller.foldable.value("expanded").emitter.on("change",i=>{this.emitter_.emit("fold",new U_(this,i.sender.rawValue))}),this.rackApi_.on("change",i=>{this.emitter_.emit("change",i)})}get expanded(){return this.controller.foldable.get("expanded")}set expanded(e){this.controller.foldable.set("expanded",e)}get title(){return this.controller.props.get("title")}set title(e){this.controller.props.set("title",e)}get children(){return this.rackApi_.children}addBinding(e,t,i){return this.rackApi_.addBinding(e,t,i)}addFolder(e){return this.rackApi_.addFolder(e)}addButton(e){return this.rackApi_.addButton(e)}addTab(e){return this.rackApi_.addTab(e)}add(e,t){return this.rackApi_.add(e,t)}remove(e){this.rackApi_.remove(e)}addBlade(e){return this.rackApi_.addBlade(e)}on(e,t){const i=t.bind(this);return this.emitter_.on(e,r=>{i(r)},{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}}const yh=$e("cnt");class yv{constructor(e,t){var i;this.className_=$e((i=t.viewName)!==null&&i!==void 0?i:"fld"),this.element=e.createElement("div"),this.element.classList.add(this.className_(),yh()),t.viewProps.bindClassModifiers(this.element),this.foldable_=t.foldable,this.foldable_.bindExpandedClass(this.element,this.className_(void 0,"expanded")),Dn(this.foldable_,"completed",yr(this.element,this.className_(void 0,"cpl")));const r=e.createElement("button");r.classList.add(this.className_("b")),Dn(t.props,"title",c=>{ct(c)?this.element.classList.add(this.className_(void 0,"not")):this.element.classList.remove(this.className_(void 0,"not"))}),t.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r;const s=e.createElement("div");s.classList.add(this.className_("i")),this.element.appendChild(s);const o=e.createElement("div");o.classList.add(this.className_("t")),Sl(t.props.value("title"),o),this.buttonElement.appendChild(o),this.titleElement=o;const a=e.createElement("div");a.classList.add(this.className_("m")),this.buttonElement.appendChild(a);const l=e.createElement("div");l.classList.add(this.className_("c")),this.element.appendChild(l),this.containerElement=l}}class qa extends yl{constructor(e,t){var i;const r=ss.create((i=t.expanded)!==null&&i!==void 0?i:!0),s=new yv(e,{foldable:r,props:t.props,viewName:t.root?"rot":void 0,viewProps:t.viewProps});super(Object.assign(Object.assign({},t),{rackController:new Ml({blade:t.blade,element:s.containerElement,root:t.root,viewProps:t.viewProps}),view:s})),this.onTitleClick_=this.onTitleClick_.bind(this),this.props=t.props,this.foldable=r,El(this.foldable,this.view.containerElement),this.rackController.rack.emitter.on("add",()=>{this.foldable.cleanUpTransition()}),this.rackController.rack.emitter.on("remove",()=>{this.foldable.cleanUpTransition()}),this.view.buttonElement.addEventListener("click",this.onTitleClick_)}get document(){return this.view.element.ownerDocument}importState(e){return on(e,t=>super.importState(t),t=>({expanded:t.required.boolean,title:t.optional.string}),t=>(this.foldable.set("expanded",t.expanded),this.props.set("title",t.title),!0))}exportState(){return an(()=>super.exportState(),{expanded:this.foldable.get("expanded"),title:this.props.get("title")})}onTitleClick_(){this.foldable.set("expanded",!this.foldable.get("expanded"))}}const Mv=Gt({id:"folder",type:"blade",accept(n){const e=gt(n,t=>({title:t.required.string,view:t.required.constant("folder"),expanded:t.optional.boolean}));return e?{params:e}:null},controller(n){return new qa(n.document,{blade:n.blade,expanded:n.params.expanded,props:Be.fromObject({title:n.params.title}),viewProps:n.viewProps})},api(n){return n.controller instanceof qa?new wh(n.controller,n.pool):null}}),Ev=$e("");function id(n,e){return yr(n,Ev(void 0,e))}class Jn extends Be{constructor(e){var t;super(e),this.onDisabledChange_=this.onDisabledChange_.bind(this),this.onParentChange_=this.onParentChange_.bind(this),this.onParentGlobalDisabledChange_=this.onParentGlobalDisabledChange_.bind(this),[this.globalDisabled_,this.setGlobalDisabled_]=i_(pt(this.getGlobalDisabled_())),this.value("disabled").emitter.on("change",this.onDisabledChange_),this.value("parent").emitter.on("change",this.onParentChange_),(t=this.get("parent"))===null||t===void 0||t.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_)}static create(e){var t,i,r;const s=e??{};return new Jn(Be.createCore({disabled:(t=s.disabled)!==null&&t!==void 0?t:!1,disposed:!1,hidden:(i=s.hidden)!==null&&i!==void 0?i:!1,parent:(r=s.parent)!==null&&r!==void 0?r:null}))}get globalDisabled(){return this.globalDisabled_}bindClassModifiers(e){$n(this.globalDisabled_,id(e,"disabled")),Dn(this,"hidden",id(e,"hidden"))}bindDisabled(e){$n(this.globalDisabled_,t=>{e.disabled=t})}bindTabIndex(e){$n(this.globalDisabled_,t=>{e.tabIndex=t?-1:0})}handleDispose(e){this.value("disposed").emitter.on("change",t=>{t&&e()})}importState(e){this.set("disabled",e.disabled),this.set("hidden",e.hidden)}exportState(){return{disabled:this.get("disabled"),hidden:this.get("hidden")}}getGlobalDisabled_(){const e=this.get("parent");return(e?e.globalDisabled.rawValue:!1)||this.get("disabled")}updateGlobalDisabled_(){this.setGlobalDisabled_(this.getGlobalDisabled_())}onDisabledChange_(){this.updateGlobalDisabled_()}onParentGlobalDisabledChange_(){this.updateGlobalDisabled_()}onParentChange_(e){var t;const i=e.previousRawValue;i?.globalDisabled.emitter.off("change",this.onParentGlobalDisabledChange_),(t=this.get("parent"))===null||t===void 0||t.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_),this.updateGlobalDisabled_()}}const rd=$e("tbp");class Cv{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(rd()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("div");i.classList.add(rd("c")),this.element.appendChild(i),this.containerElement=i}}const Nr=$e("tbi");class Tv{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Nr()),t.viewProps.bindClassModifiers(this.element),Dn(t.props,"selected",s=>{s?this.element.classList.add(Nr(void 0,"sel")):this.element.classList.remove(Nr(void 0,"sel"))});const i=e.createElement("button");i.classList.add(Nr("b")),t.viewProps.bindDisabled(i),this.element.appendChild(i),this.buttonElement=i;const r=e.createElement("div");r.classList.add(Nr("t")),Sl(t.props.value("title"),r),this.buttonElement.appendChild(r),this.titleElement=r}}class Av{constructor(e,t){this.emitter=new Ct,this.onClick_=this.onClick_.bind(this),this.props=t.props,this.viewProps=t.viewProps,this.view=new Tv(e,{props:t.props,viewProps:t.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}onClick_(){this.emitter.emit("click",{sender:this})}}class $a extends yl{constructor(e,t){const i=new Cv(e,{viewProps:t.viewProps});super(Object.assign(Object.assign({},t),{rackController:new Ml({blade:t.blade,element:i.containerElement,viewProps:t.viewProps}),view:i})),this.onItemClick_=this.onItemClick_.bind(this),this.ic_=new Av(e,{props:t.itemProps,viewProps:Jn.create()}),this.ic_.emitter.on("click",this.onItemClick_),this.props=t.props,Dn(this.props,"selected",r=>{this.itemController.props.set("selected",r),this.viewProps.set("hidden",!r)})}get itemController(){return this.ic_}importState(e){return on(e,t=>super.importState(t),t=>({selected:t.required.boolean,title:t.required.string}),t=>(this.ic_.props.set("selected",t.selected),this.ic_.props.set("title",t.title),!0))}exportState(){return an(()=>super.exportState(),{selected:this.ic_.props.get("selected"),title:this.ic_.props.get("title")})}onItemClick_(){this.props.set("selected",!0)}}class Pv extends wl{constructor(e,t){super(e,t),this.emitter_=new Ct,this.onSelect_=this.onSelect_.bind(this),this.pool_=t,this.rackApi_.on("change",i=>{this.emitter_.emit("change",i)}),this.controller.tab.selectedIndex.emitter.on("change",this.onSelect_)}get pages(){return this.rackApi_.children}addPage(e){const t=this.controller.view.element.ownerDocument,i=new $a(t,{blade:Er(),itemProps:Be.fromObject({selected:!1,title:e.title}),props:Be.fromObject({selected:!1}),viewProps:Jn.create()}),r=this.pool_.createApi(i);return this.rackApi_.add(r,e.index)}removePage(e){this.rackApi_.remove(this.rackApi_.children[e])}on(e,t){const i=t.bind(this);return this.emitter_.on(e,r=>{i(r)},{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}onSelect_(e){this.emitter_.emit("select",new N_(this,e.rawValue))}}class Rv extends wl{get title(){var e;return(e=this.controller.itemController.props.get("title"))!==null&&e!==void 0?e:""}set title(e){this.controller.itemController.props.set("title",e)}get selected(){return this.controller.props.get("selected")}set selected(e){this.controller.props.set("selected",e)}get children(){return this.rackApi_.children}addButton(e){return this.rackApi_.addButton(e)}addFolder(e){return this.rackApi_.addFolder(e)}addTab(e){return this.rackApi_.addTab(e)}add(e,t){this.rackApi_.add(e,t)}remove(e){this.rackApi_.remove(e)}addBinding(e,t,i){return this.rackApi_.addBinding(e,t,i)}addBlade(e){return this.rackApi_.addBlade(e)}}const sd=-1;class Lv{constructor(){this.onItemSelectedChange_=this.onItemSelectedChange_.bind(this),this.empty=pt(!0),this.selectedIndex=pt(sd),this.items_=[]}add(e,t){const i=t??this.items_.length;this.items_.splice(i,0,e),e.emitter.on("change",this.onItemSelectedChange_),this.keepSelection_()}remove(e){const t=this.items_.indexOf(e);t<0||(this.items_.splice(t,1),e.emitter.off("change",this.onItemSelectedChange_),this.keepSelection_())}keepSelection_(){if(this.items_.length===0){this.selectedIndex.rawValue=sd,this.empty.rawValue=!0;return}const e=this.items_.findIndex(t=>t.rawValue);e<0?(this.items_.forEach((t,i)=>{t.rawValue=i===0}),this.selectedIndex.rawValue=0):(this.items_.forEach((t,i)=>{t.rawValue=i===e}),this.selectedIndex.rawValue=e),this.empty.rawValue=!1}onItemSelectedChange_(e){if(e.rawValue){const t=this.items_.findIndex(i=>i===e.sender);this.items_.forEach((i,r)=>{i.rawValue=r===t}),this.selectedIndex.rawValue=t}else this.keepSelection_()}}const Fr=$e("tab");class Dv{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Fr(),yh()),t.viewProps.bindClassModifiers(this.element),$n(t.empty,yr(this.element,Fr(void 0,"nop")));const i=e.createElement("div");i.classList.add(Fr("t")),this.element.appendChild(i),this.itemsElement=i;const r=e.createElement("div");r.classList.add(Fr("i")),this.element.appendChild(r);const s=e.createElement("div");s.classList.add(Fr("c")),this.element.appendChild(s),this.contentsElement=s}}class od extends yl{constructor(e,t){const i=new Lv,r=new Dv(e,{empty:i.empty,viewProps:t.viewProps});super({blade:t.blade,rackController:new Ml({blade:t.blade,element:r.contentsElement,viewProps:t.viewProps}),view:r}),this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this);const s=this.rackController.rack;s.emitter.on("add",this.onRackAdd_),s.emitter.on("remove",this.onRackRemove_),this.tab=i}add(e,t){this.rackController.rack.add(e,t)}remove(e){this.rackController.rack.remove(this.rackController.rack.children[e])}onRackAdd_(e){if(!e.root)return;const t=e.bladeController;fh(this.view.itemsElement,t.itemController.view.element,e.index),t.itemController.viewProps.set("parent",this.viewProps),this.tab.add(t.props.value("selected"))}onRackRemove_(e){if(!e.root)return;const t=e.bladeController;bl(t.itemController.view.element),t.itemController.viewProps.set("parent",null),this.tab.remove(t.props.value("selected"))}}const Mh=Gt({id:"tab",type:"blade",accept(n){const e=gt(n,t=>({pages:t.required.array(t.required.object({title:t.required.string})),view:t.required.constant("tab")}));return!e||e.pages.length===0?null:{params:e}},controller(n){const e=new od(n.document,{blade:n.blade,viewProps:n.viewProps});return n.params.pages.forEach(t=>{const i=new $a(n.document,{blade:Er(),itemProps:Be.fromObject({selected:!1,title:t.title}),props:Be.fromObject({selected:!1}),viewProps:Jn.create()});e.add(i)}),e},api(n){return n.controller instanceof od?new Pv(n.controller,n.pool):n.controller instanceof $a?new Rv(n.controller,n.pool):null}});function Iv(n,e){const t=n.accept(e.params);if(!t)return null;const i=gt(e.params,r=>({disabled:r.optional.boolean,hidden:r.optional.boolean}));return n.controller({blade:Er(),document:e.document,params:Object.assign(Object.assign({},t.params),{disabled:i?.disabled,hidden:i?.hidden}),viewProps:Jn.create({disabled:i?.disabled,hidden:i?.hidden})})}class Cl extends Kr{get options(){return this.controller.valueController.props.get("options")}set options(e){this.controller.valueController.props.set("options",e)}}class Uv{constructor(){this.disabled=!1,this.emitter=new Ct}dispose(){}tick(){this.disabled||this.emitter.emit("tick",{sender:this})}}class Nv{constructor(e,t){this.disabled_=!1,this.timerId_=null,this.onTick_=this.onTick_.bind(this),this.doc_=e,this.emitter=new Ct,this.interval_=t,this.setTimer_()}get disabled(){return this.disabled_}set disabled(e){this.disabled_=e,this.disabled_?this.clearTimer_():this.setTimer_()}dispose(){this.clearTimer_()}clearTimer_(){if(this.timerId_===null)return;const e=this.doc_.defaultView;e&&e.clearInterval(this.timerId_),this.timerId_=null}setTimer_(){if(this.clearTimer_(),this.interval_<=0)return;const e=this.doc_.defaultView;e&&(this.timerId_=e.setInterval(this.onTick_,this.interval_))}onTick_(){this.disabled_||this.emitter.emit("tick",{sender:this})}}class os{constructor(e){this.constraints=e}constrain(e){return this.constraints.reduce((t,i)=>i.constrain(t),e)}}function Qs(n,e){if(n instanceof e)return n;if(n instanceof os){const t=n.constraints.reduce((i,r)=>i||(r instanceof e?r:null),null);if(t)return t}return null}class as{constructor(e){this.values=Be.fromObject({options:e})}constrain(e){const t=this.values.get("options");return t.length===0||t.filter(r=>r.value===e).length>0?e:t[0].value}}function ls(n){var e;const t=Xa;if(Array.isArray(n))return(e=gt({items:n},i=>({items:i.required.array(i.required.object({text:i.required.string,value:i.required.raw}))})))===null||e===void 0?void 0:e.items;if(typeof n=="object")return t.required.raw(n).value}function Tl(n){if(Array.isArray(n))return n;const e=[];return Object.keys(n).forEach(t=>{e.push({text:t,value:n[t]})}),e}function Al(n){return ct(n)?null:new as(Tl(n))}const qo=$e("lst");class Fv{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.props_=t.props,this.element=e.createElement("div"),this.element.classList.add(qo()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("select");i.classList.add(qo("s")),t.viewProps.bindDisabled(i),this.element.appendChild(i),this.selectElement=i;const r=e.createElement("div");r.classList.add(qo("m")),r.appendChild(ao(e,"dropdown")),this.element.appendChild(r),t.value.emitter.on("change",this.onValueChange_),this.value_=t.value,Dn(this.props_,"options",s=>{mh(this.selectElement),s.forEach(o=>{const a=e.createElement("option");a.textContent=o.text,this.selectElement.appendChild(a)}),this.update_()})}update_(){const e=this.props_.get("options").map(t=>t.value);this.selectElement.selectedIndex=e.indexOf(this.value_.rawValue)}onValueChange_(){this.update_()}}class mi{constructor(e,t){this.onSelectChange_=this.onSelectChange_.bind(this),this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.view=new Fv(e,{props:this.props,value:this.value,viewProps:this.viewProps}),this.view.selectElement.addEventListener("change",this.onSelectChange_)}onSelectChange_(e){const t=e.currentTarget;this.value.rawValue=this.props.get("options")[t.selectedIndex].value}importProps(e){return on(e,null,t=>({options:t.required.custom(ls)}),t=>(this.props.set("options",Tl(t.options)),!0))}exportProps(){return an(null,{options:this.props.get("options")})}}const ad=$e("pop");class Ov{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(ad()),t.viewProps.bindClassModifiers(this.element),$n(t.shows,yr(this.element,ad(void 0,"v")))}}class Eh{constructor(e,t){this.shows=pt(!1),this.viewProps=t.viewProps,this.view=new Ov(e,{shows:this.shows,viewProps:this.viewProps})}}const ld=$e("txt");class Bv{constructor(e,t){this.onChange_=this.onChange_.bind(this),this.element=e.createElement("div"),this.element.classList.add(ld()),t.viewProps.bindClassModifiers(this.element),this.props_=t.props,this.props_.emitter.on("change",this.onChange_);const i=e.createElement("input");i.classList.add(ld("i")),i.type="text",t.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,t.value.emitter.on("change",this.onChange_),this.value_=t.value,this.refresh()}refresh(){const e=this.props_.get("formatter");this.inputElement.value=e(this.value_.rawValue)}onChange_(){this.refresh()}}class Zr{constructor(e,t){this.onInputChange_=this.onInputChange_.bind(this),this.parser_=t.parser,this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.view=new Bv(e,{props:t.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_)}onInputChange_(e){const i=e.currentTarget.value,r=this.parser_(i);ct(r)||(this.value.rawValue=r),this.view.refresh()}}function kv(n){return String(n)}function Ch(n){return n==="false"?!1:!!n}function cd(n){return kv(n)}function Vv(n){return e=>n.reduce((t,i)=>t!==null?t:i(e),null)}const zv=Zt(0);function eo(n){return zv(n)+"%"}function Th(n){return String(n)}function Ya(n){return n}function Cr({primary:n,secondary:e,forward:t,backward:i}){let r=!1;function s(o){r||(r=!0,o(),r=!1)}n.emitter.on("change",o=>{s(()=>{e.setRawValue(t(n.rawValue,e.rawValue),o.options)})}),e.emitter.on("change",o=>{s(()=>{n.setRawValue(i(n.rawValue,e.rawValue),o.options)}),s(()=>{e.setRawValue(t(n.rawValue,e.rawValue),o.options)})}),s(()=>{e.setRawValue(t(n.rawValue,e.rawValue),{forceEmit:!1,last:!0})})}function $t(n,e){const t=n*(e.altKey?.1:1)*(e.shiftKey?10:1);return e.upKey?+t:e.downKey?-t:0}function Jr(n){return{altKey:n.altKey,downKey:n.key==="ArrowDown",shiftKey:n.shiftKey,upKey:n.key==="ArrowUp"}}function Zn(n){return{altKey:n.altKey,downKey:n.key==="ArrowLeft",shiftKey:n.shiftKey,upKey:n.key==="ArrowRight"}}function Hv(n){return n==="ArrowUp"||n==="ArrowDown"}function Ah(n){return Hv(n)||n==="ArrowLeft"||n==="ArrowRight"}function $o(n,e){var t,i;const r=e.ownerDocument.defaultView,s=e.getBoundingClientRect();return{x:n.pageX-(((t=r&&r.scrollX)!==null&&t!==void 0?t:0)+s.left),y:n.pageY-(((i=r&&r.scrollY)!==null&&i!==void 0?i:0)+s.top)}}class zi{constructor(e){this.lastTouch_=null,this.onDocumentMouseMove_=this.onDocumentMouseMove_.bind(this),this.onDocumentMouseUp_=this.onDocumentMouseUp_.bind(this),this.onMouseDown_=this.onMouseDown_.bind(this),this.onTouchEnd_=this.onTouchEnd_.bind(this),this.onTouchMove_=this.onTouchMove_.bind(this),this.onTouchStart_=this.onTouchStart_.bind(this),this.elem_=e,this.emitter=new Ct,e.addEventListener("touchstart",this.onTouchStart_,{passive:!1}),e.addEventListener("touchmove",this.onTouchMove_,{passive:!0}),e.addEventListener("touchend",this.onTouchEnd_),e.addEventListener("mousedown",this.onMouseDown_)}computePosition_(e){const t=this.elem_.getBoundingClientRect();return{bounds:{width:t.width,height:t.height},point:e?{x:e.x,y:e.y}:null}}onMouseDown_(e){var t;e.preventDefault(),(t=e.currentTarget)===null||t===void 0||t.focus();const i=this.elem_.ownerDocument;i.addEventListener("mousemove",this.onDocumentMouseMove_),i.addEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("down",{altKey:e.altKey,data:this.computePosition_($o(e,this.elem_)),sender:this,shiftKey:e.shiftKey})}onDocumentMouseMove_(e){this.emitter.emit("move",{altKey:e.altKey,data:this.computePosition_($o(e,this.elem_)),sender:this,shiftKey:e.shiftKey})}onDocumentMouseUp_(e){const t=this.elem_.ownerDocument;t.removeEventListener("mousemove",this.onDocumentMouseMove_),t.removeEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("up",{altKey:e.altKey,data:this.computePosition_($o(e,this.elem_)),sender:this,shiftKey:e.shiftKey})}onTouchStart_(e){e.preventDefault();const t=e.targetTouches.item(0),i=this.elem_.getBoundingClientRect();this.emitter.emit("down",{altKey:e.altKey,data:this.computePosition_(t?{x:t.clientX-i.left,y:t.clientY-i.top}:void 0),sender:this,shiftKey:e.shiftKey}),this.lastTouch_=t}onTouchMove_(e){const t=e.targetTouches.item(0),i=this.elem_.getBoundingClientRect();this.emitter.emit("move",{altKey:e.altKey,data:this.computePosition_(t?{x:t.clientX-i.left,y:t.clientY-i.top}:void 0),sender:this,shiftKey:e.shiftKey}),this.lastTouch_=t}onTouchEnd_(e){var t;const i=(t=e.targetTouches.item(0))!==null&&t!==void 0?t:this.lastTouch_,r=this.elem_.getBoundingClientRect();this.emitter.emit("up",{altKey:e.altKey,data:this.computePosition_(i?{x:i.clientX-r.left,y:i.clientY-r.top}:void 0),sender:this,shiftKey:e.shiftKey})}}const dn=$e("txt");class Gv{constructor(e,t){this.onChange_=this.onChange_.bind(this),this.props_=t.props,this.props_.emitter.on("change",this.onChange_),this.element=e.createElement("div"),this.element.classList.add(dn(),dn(void 0,"num")),t.arrayPosition&&this.element.classList.add(dn(void 0,t.arrayPosition)),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("input");i.classList.add(dn("i")),i.type="text",t.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,this.onDraggingChange_=this.onDraggingChange_.bind(this),this.dragging_=t.dragging,this.dragging_.emitter.on("change",this.onDraggingChange_),this.element.classList.add(dn()),this.inputElement.classList.add(dn("i"));const r=e.createElement("div");r.classList.add(dn("k")),this.element.appendChild(r),this.knobElement=r;const s=e.createElementNS(Cn,"svg");s.classList.add(dn("g")),this.knobElement.appendChild(s);const o=e.createElementNS(Cn,"path");o.classList.add(dn("gb")),s.appendChild(o),this.guideBodyElem_=o;const a=e.createElementNS(Cn,"path");a.classList.add(dn("gh")),s.appendChild(a),this.guideHeadElem_=a;const l=e.createElement("div");l.classList.add($e("tt")()),this.knobElement.appendChild(l),this.tooltipElem_=l,t.value.emitter.on("change",this.onChange_),this.value=t.value,this.refresh()}onDraggingChange_(e){if(e.rawValue===null){this.element.classList.remove(dn(void 0,"drg"));return}this.element.classList.add(dn(void 0,"drg"));const t=e.rawValue/this.props_.get("pointerScale"),i=t+(t>0?-1:t<0?1:0),r=At(-i,-4,4);this.guideHeadElem_.setAttributeNS(null,"d",[`M ${i+r},0 L${i},4 L${i+r},8`,`M ${t},-1 L${t},9`].join(" ")),this.guideBodyElem_.setAttributeNS(null,"d",`M 0,4 L${t},4`);const s=this.props_.get("formatter");this.tooltipElem_.textContent=s(this.value.rawValue),this.tooltipElem_.style.left=`${t}px`}refresh(){const e=this.props_.get("formatter");this.inputElement.value=e(this.value.rawValue)}onChange_(){this.refresh()}}class cs{constructor(e,t){var i;this.originRawValue_=0,this.onInputChange_=this.onInputChange_.bind(this),this.onInputKeyDown_=this.onInputKeyDown_.bind(this),this.onInputKeyUp_=this.onInputKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.parser_=t.parser,this.props=t.props,this.sliderProps_=(i=t.sliderProps)!==null&&i!==void 0?i:null,this.value=t.value,this.viewProps=t.viewProps,this.dragging_=pt(null),this.view=new Gv(e,{arrayPosition:t.arrayPosition,dragging:this.dragging_,props:this.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.inputElement.addEventListener("keydown",this.onInputKeyDown_),this.view.inputElement.addEventListener("keyup",this.onInputKeyUp_);const r=new zi(this.view.knobElement);r.emitter.on("down",this.onPointerDown_),r.emitter.on("move",this.onPointerMove_),r.emitter.on("up",this.onPointerUp_)}constrainValue_(e){var t,i;const r=(t=this.sliderProps_)===null||t===void 0?void 0:t.get("min"),s=(i=this.sliderProps_)===null||i===void 0?void 0:i.get("max");let o=e;return r!==void 0&&(o=Math.max(o,r)),s!==void 0&&(o=Math.min(o,s)),o}onInputChange_(e){const i=e.currentTarget.value,r=this.parser_(i);ct(r)||(this.value.rawValue=this.constrainValue_(r)),this.view.refresh()}onInputKeyDown_(e){const t=$t(this.props.get("keyScale"),Jr(e));t!==0&&this.value.setRawValue(this.constrainValue_(this.value.rawValue+t),{forceEmit:!1,last:!1})}onInputKeyUp_(e){$t(this.props.get("keyScale"),Jr(e))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}onPointerDown_(){this.originRawValue_=this.value.rawValue,this.dragging_.rawValue=0}computeDraggingValue_(e){if(!e.point)return null;const t=e.point.x-e.bounds.width/2;return this.constrainValue_(this.originRawValue_+t*this.props.get("pointerScale"))}onPointerMove_(e){const t=this.computeDraggingValue_(e.data);t!==null&&(this.value.setRawValue(t,{forceEmit:!1,last:!1}),this.dragging_.rawValue=this.value.rawValue-this.originRawValue_)}onPointerUp_(e){const t=this.computeDraggingValue_(e.data);t!==null&&(this.value.setRawValue(t,{forceEmit:!0,last:!0}),this.dragging_.rawValue=null)}}const Yo=$e("sld");class Wv{constructor(e,t){this.onChange_=this.onChange_.bind(this),this.props_=t.props,this.props_.emitter.on("change",this.onChange_),this.element=e.createElement("div"),this.element.classList.add(Yo()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("div");i.classList.add(Yo("t")),t.viewProps.bindTabIndex(i),this.element.appendChild(i),this.trackElement=i;const r=e.createElement("div");r.classList.add(Yo("k")),this.trackElement.appendChild(r),this.knobElement=r,t.value.emitter.on("change",this.onChange_),this.value=t.value,this.update_()}update_(){const e=At(Je(this.value.rawValue,this.props_.get("min"),this.props_.get("max"),0,100),0,100);this.knobElement.style.width=`${e}%`}onChange_(){this.update_()}}class Xv{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDownOrMove_=this.onPointerDownOrMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.props=t.props,this.view=new Wv(e,{props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new zi(this.view.trackElement),this.ptHandler_.emitter.on("down",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("move",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.trackElement.addEventListener("keydown",this.onKeyDown_),this.view.trackElement.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){e.point&&this.value.setRawValue(Je(At(e.point.x,0,e.bounds.width),0,e.bounds.width,this.props.get("min"),this.props.get("max")),t)}onPointerDownOrMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){const t=$t(this.props.get("keyScale"),Zn(e));t!==0&&this.value.setRawValue(this.value.rawValue+t,{forceEmit:!1,last:!1})}onKeyUp_(e){$t(this.props.get("keyScale"),Zn(e))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const Ko=$e("sldtxt");class jv{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Ko());const i=e.createElement("div");i.classList.add(Ko("s")),this.sliderView_=t.sliderView,i.appendChild(this.sliderView_.element),this.element.appendChild(i);const r=e.createElement("div");r.classList.add(Ko("t")),this.textView_=t.textView,r.appendChild(this.textView_.element),this.element.appendChild(r)}}class to{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.sliderC_=new Xv(e,{props:t.sliderProps,value:t.value,viewProps:this.viewProps}),this.textC_=new cs(e,{parser:t.parser,props:t.textProps,sliderProps:t.sliderProps,value:t.value,viewProps:t.viewProps}),this.view=new jv(e,{sliderView:this.sliderC_.view,textView:this.textC_.view})}get sliderController(){return this.sliderC_}get textController(){return this.textC_}importProps(e){return on(e,null,t=>({max:t.required.number,min:t.required.number}),t=>{const i=this.sliderC_.props;return i.set("max",t.max),i.set("min",t.min),!0})}exportProps(){const e=this.sliderC_.props;return an(null,{max:e.get("max"),min:e.get("min")})}}function Ph(n){return{sliderProps:new Be({keyScale:n.keyScale,max:n.max,min:n.min}),textProps:new Be({formatter:pt(n.formatter),keyScale:n.keyScale,pointerScale:pt(n.pointerScale)})}}const qv={containerUnitSize:"cnt-usz"};function Rh(n){return`--${qv[n]}`}function Qr(n){return uh(n)}function hi(n){if(Wa(n))return gt(n,Qr)}function Xn(n,e){if(!n)return;const t=[],i=ch(n,e);i&&t.push(i);const r=dh(n);return r&&t.push(r),new os(t)}function $v(n){return n?n.major===Mr.major:!1}function Lh(n){if(n==="inline"||n==="popup")return n}function ds(n,e){n.write(e)}const Bs=$e("ckb");class Yv{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.element=e.createElement("div"),this.element.classList.add(Bs()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("label");i.classList.add(Bs("l")),this.element.appendChild(i),this.labelElement=i;const r=e.createElement("input");r.classList.add(Bs("i")),r.type="checkbox",this.labelElement.appendChild(r),this.inputElement=r,t.viewProps.bindDisabled(this.inputElement);const s=e.createElement("div");s.classList.add(Bs("w")),this.labelElement.appendChild(s);const o=ao(e,"check");s.appendChild(o),t.value.emitter.on("change",this.onValueChange_),this.value=t.value,this.update_()}update_(){this.inputElement.checked=this.value.rawValue}onValueChange_(){this.update_()}}class Kv{constructor(e,t){this.onInputChange_=this.onInputChange_.bind(this),this.onLabelMouseDown_=this.onLabelMouseDown_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new Yv(e,{value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.labelElement.addEventListener("mousedown",this.onLabelMouseDown_)}onInputChange_(e){const t=e.currentTarget;this.value.rawValue=t.checked,e.preventDefault(),e.stopPropagation()}onLabelMouseDown_(e){e.preventDefault()}}function Zv(n){const e=[],t=Al(n.options);return t&&e.push(t),new os(e)}const Jv=Gt({id:"input-bool",type:"input",accept:(n,e)=>{if(typeof n!="boolean")return null;const t=gt(e,i=>({options:i.optional.custom(ls),readonly:i.optional.constant(!1)}));return t?{initialValue:n,params:t}:null},binding:{reader:n=>Ch,constraint:n=>Zv(n.params),writer:n=>ds},controller:n=>{const e=n.document,t=n.value,i=n.constraint,r=i&&Qs(i,as);return r?new mi(e,{props:new Be({options:r.values.value("options")}),value:t,viewProps:n.viewProps}):new Kv(e,{value:t,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="boolean"?null:n.controller.valueController instanceof mi?new Cl(n.controller):null}}),Ei=$e("col");class Qv{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(Ei()),t.foldable.bindExpandedClass(this.element,Ei(void 0,"expanded")),Dn(t.foldable,"completed",yr(this.element,Ei(void 0,"cpl")));const i=e.createElement("div");i.classList.add(Ei("h")),this.element.appendChild(i);const r=e.createElement("div");r.classList.add(Ei("s")),i.appendChild(r),this.swatchElement=r;const s=e.createElement("div");if(s.classList.add(Ei("t")),i.appendChild(s),this.textElement=s,t.pickerLayout==="inline"){const o=e.createElement("div");o.classList.add(Ei("p")),this.element.appendChild(o),this.pickerElement=o}else this.pickerElement=null}}function eb(n,e,t){const i=At(n/255,0,1),r=At(e/255,0,1),s=At(t/255,0,1),o=Math.max(i,r,s),a=Math.min(i,r,s),l=o-a;let c=0,d=0;const h=(a+o)/2;return l!==0&&(d=l/(1-Math.abs(o+a-1)),i===o?c=(r-s)/l:r===o?c=2+(s-i)/l:c=4+(i-r)/l,c=c/6+(c<0?1:0)),[c*360,d*100,h*100]}function tb(n,e,t){const i=(n%360+360)%360,r=At(e/100,0,1),s=At(t/100,0,1),o=(1-Math.abs(2*s-1))*r,a=o*(1-Math.abs(i/60%2-1)),l=s-o/2;let c,d,h;return i>=0&&i<60?[c,d,h]=[o,a,0]:i>=60&&i<120?[c,d,h]=[a,o,0]:i>=120&&i<180?[c,d,h]=[0,o,a]:i>=180&&i<240?[c,d,h]=[0,a,o]:i>=240&&i<300?[c,d,h]=[a,0,o]:[c,d,h]=[o,0,a],[(c+l)*255,(d+l)*255,(h+l)*255]}function nb(n,e,t){const i=At(n/255,0,1),r=At(e/255,0,1),s=At(t/255,0,1),o=Math.max(i,r,s),a=Math.min(i,r,s),l=o-a;let c;l===0?c=0:o===i?c=60*(((r-s)/l%6+6)%6):o===r?c=60*((s-i)/l+2):c=60*((i-r)/l+4);const d=o===0?0:l/o,h=o;return[c,d*100,h*100]}function Dh(n,e,t){const i=oh(n,360),r=At(e/100,0,1),s=At(t/100,0,1),o=s*r,a=o*(1-Math.abs(i/60%2-1)),l=s-o;let c,d,h;return i>=0&&i<60?[c,d,h]=[o,a,0]:i>=60&&i<120?[c,d,h]=[a,o,0]:i>=120&&i<180?[c,d,h]=[0,o,a]:i>=180&&i<240?[c,d,h]=[0,a,o]:i>=240&&i<300?[c,d,h]=[a,0,o]:[c,d,h]=[o,0,a],[(c+l)*255,(d+l)*255,(h+l)*255]}function ib(n,e,t){const i=t+e*(100-Math.abs(2*t-100))/200;return[n,i!==0?e*(100-Math.abs(2*t-100))/i:0,t+e*(100-Math.abs(2*t-100))/200]}function rb(n,e,t){const i=100-Math.abs(t*(200-e)/100-100);return[n,i!==0?e*t/i:0,t*(200-e)/200]}function In(n){return[n[0],n[1],n[2]]}function co(n,e){return[n[0],n[1],n[2],e]}const sb={hsl:{hsl:(n,e,t)=>[n,e,t],hsv:ib,rgb:tb},hsv:{hsl:rb,hsv:(n,e,t)=>[n,e,t],rgb:Dh},rgb:{hsl:eb,hsv:nb,rgb:(n,e,t)=>[n,e,t]}};function vr(n,e){return[e==="float"?1:n==="rgb"?255:360,e==="float"?1:n==="rgb"?255:100,e==="float"?1:n==="rgb"?255:100]}function ob(n,e){return n===e?e:oh(n,e)}function Ih(n,e,t){var i;const r=vr(e,t);return[e==="rgb"?At(n[0],0,r[0]):ob(n[0],r[0]),At(n[1],0,r[1]),At(n[2],0,r[2]),At((i=n[3])!==null&&i!==void 0?i:1,0,1)]}function dd(n,e,t,i){const r=vr(e,t),s=vr(e,i);return n.map((o,a)=>o/r[a]*s[a])}function Uh(n,e,t){const i=dd(n,e.mode,e.type,"int"),r=sb[e.mode][t.mode](...i);return dd(r,t.mode,"int",t.type)}class Ze{static black(){return new Ze([0,0,0],"rgb")}constructor(e,t){this.type="int",this.mode=t,this.comps_=Ih(e,t,this.type)}getComponents(e){return co(Uh(In(this.comps_),{mode:this.mode,type:this.type},{mode:e??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const e=this.getComponents("rgb");return{r:e[0],g:e[1],b:e[2],a:e[3]}}}const si=$e("colp");class ab{constructor(e,t){this.alphaViews_=null,this.element=e.createElement("div"),this.element.classList.add(si()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("div");i.classList.add(si("hsv"));const r=e.createElement("div");r.classList.add(si("sv")),this.svPaletteView_=t.svPaletteView,r.appendChild(this.svPaletteView_.element),i.appendChild(r);const s=e.createElement("div");s.classList.add(si("h")),this.hPaletteView_=t.hPaletteView,s.appendChild(this.hPaletteView_.element),i.appendChild(s),this.element.appendChild(i);const o=e.createElement("div");if(o.classList.add(si("rgb")),this.textsView_=t.textsView,o.appendChild(this.textsView_.element),this.element.appendChild(o),t.alphaViews){this.alphaViews_={palette:t.alphaViews.palette,text:t.alphaViews.text};const a=e.createElement("div");a.classList.add(si("a"));const l=e.createElement("div");l.classList.add(si("ap")),l.appendChild(this.alphaViews_.palette.element),a.appendChild(l);const c=e.createElement("div");c.classList.add(si("at")),c.appendChild(this.alphaViews_.text.element),a.appendChild(c),this.element.appendChild(a)}}get allFocusableElements(){const e=[this.svPaletteView_.element,this.hPaletteView_.element,this.textsView_.modeSelectElement,...this.textsView_.inputViews.map(t=>t.inputElement)];return this.alphaViews_&&e.push(this.alphaViews_.palette.element,this.alphaViews_.text.inputElement),e}}function lb(n){return n==="int"?"int":n==="float"?"float":void 0}function Pl(n){return gt(n,e=>({color:e.optional.object({alpha:e.optional.boolean,type:e.optional.custom(lb)}),expanded:e.optional.boolean,picker:e.optional.custom(Lh),readonly:e.optional.constant(!1)}))}function Oi(n){return n?.1:1}function Nh(n){var e;return(e=n.color)===null||e===void 0?void 0:e.type}class Rl{constructor(e,t){this.type="float",this.mode=t,this.comps_=Ih(e,t,this.type)}getComponents(e){return co(Uh(In(this.comps_),{mode:this.mode,type:this.type},{mode:e??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const e=this.getComponents("rgb");return{r:e[0],g:e[1],b:e[2],a:e[3]}}}const cb={int:(n,e)=>new Ze(n,e),float:(n,e)=>new Rl(n,e)};function Ll(n,e,t){return cb[t](n,e)}function db(n){return n.type==="float"}function hb(n){return n.type==="int"}function ub(n){const e=n.getComponents(),t=vr(n.mode,"int");return new Ze([Math.round(Je(e[0],0,1,0,t[0])),Math.round(Je(e[1],0,1,0,t[1])),Math.round(Je(e[2],0,1,0,t[2])),e[3]],n.mode)}function pb(n){const e=n.getComponents(),t=vr(n.mode,"int");return new Rl([Je(e[0],0,t[0],0,1),Je(e[1],0,t[1],0,1),Je(e[2],0,t[2],0,1),e[3]],n.mode)}function Ht(n,e){if(n.type===e)return n;if(hb(n)&&e==="float")return pb(n);if(db(n)&&e==="int")return ub(n);throw St.shouldNeverHappen()}function fb(n,e){return n.alpha===e.alpha&&n.mode===e.mode&&n.notation===e.notation&&n.type===e.type}function mn(n,e){const t=n.match(/^(.+)%$/);return Math.min(t?parseFloat(t[1])*.01*e:parseFloat(n),e)}const mb={deg:n=>n,grad:n=>n*360/400,rad:n=>n*360/(2*Math.PI),turn:n=>n*360};function Fh(n){const e=n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!e)return parseFloat(n);const t=parseFloat(e[1]),i=e[2];return mb[i](t)}function Oh(n){const e=n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!e)return null;const t=[mn(e[1],255),mn(e[2],255),mn(e[3],255)];return isNaN(t[0])||isNaN(t[1])||isNaN(t[2])?null:t}function xb(n){const e=Oh(n);return e?new Ze(e,"rgb"):null}function Bh(n){const e=n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!e)return null;const t=[mn(e[1],255),mn(e[2],255),mn(e[3],255),mn(e[4],1)];return isNaN(t[0])||isNaN(t[1])||isNaN(t[2])||isNaN(t[3])?null:t}function gb(n){const e=Bh(n);return e?new Ze(e,"rgb"):null}function kh(n){const e=n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!e)return null;const t=[Fh(e[1]),mn(e[2],100),mn(e[3],100)];return isNaN(t[0])||isNaN(t[1])||isNaN(t[2])?null:t}function _b(n){const e=kh(n);return e?new Ze(e,"hsl"):null}function Vh(n){const e=n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!e)return null;const t=[Fh(e[1]),mn(e[2],100),mn(e[3],100),mn(e[4],1)];return isNaN(t[0])||isNaN(t[1])||isNaN(t[2])||isNaN(t[3])?null:t}function vb(n){const e=Vh(n);return e?new Ze(e,"hsl"):null}function zh(n){const e=n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(e)return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)];const t=n.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null}function bb(n){const e=zh(n);return e?new Ze(e,"rgb"):null}function Hh(n){const e=n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(e)return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16),Je(parseInt(e[4]+e[4],16),0,255,0,1)];const t=n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16),Je(parseInt(t[4],16),0,255,0,1)]:null}function Sb(n){const e=Hh(n);return e?new Ze(e,"rgb"):null}function Gh(n){const e=n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!e)return null;const t=[parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3])];return isNaN(t[0])||isNaN(t[1])||isNaN(t[2])?null:t}function wb(n){return e=>{const t=Gh(e);return t?Ll(t,"rgb",n):null}}function Wh(n){const e=n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!e)return null;const t=[parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3]),parseFloat(e[4])];return isNaN(t[0])||isNaN(t[1])||isNaN(t[2])||isNaN(t[3])?null:t}function yb(n){return e=>{const t=Wh(e);return t?Ll(t,"rgb",n):null}}const Mb=[{parser:zh,result:{alpha:!1,mode:"rgb",notation:"hex"}},{parser:Hh,result:{alpha:!0,mode:"rgb",notation:"hex"}},{parser:Oh,result:{alpha:!1,mode:"rgb",notation:"func"}},{parser:Bh,result:{alpha:!0,mode:"rgb",notation:"func"}},{parser:kh,result:{alpha:!1,mode:"hsl",notation:"func"}},{parser:Vh,result:{alpha:!0,mode:"hsl",notation:"func"}},{parser:Gh,result:{alpha:!1,mode:"rgb",notation:"object"}},{parser:Wh,result:{alpha:!0,mode:"rgb",notation:"object"}}];function Eb(n){return Mb.reduce((e,{parser:t,result:i})=>e||(t(n)?i:null),null)}function Cb(n,e="int"){const t=Eb(n);return t?t.notation==="hex"&&e!=="float"?Object.assign(Object.assign({},t),{type:"int"}):t.notation==="func"?Object.assign(Object.assign({},t),{type:e}):null:null}function hs(n){const e=[bb,Sb,xb,gb,_b,vb];e.push(wb("int"),yb("int"));const t=Vv(e);return i=>{const r=t(i);return r?Ht(r,n):null}}function Tb(n){const e=hs("int");if(typeof n!="string")return Ze.black();const t=e(n);return t??Ze.black()}function Xh(n){const e=At(Math.floor(n),0,255).toString(16);return e.length===1?`0${e}`:e}function Dl(n,e="#"){const t=In(n.getComponents("rgb")).map(Xh).join("");return`${e}${t}`}function Il(n,e="#"){const t=n.getComponents("rgb"),i=[t[0],t[1],t[2],t[3]*255].map(Xh).join("");return`${e}${i}`}function jh(n){const e=Zt(0),t=Ht(n,"int");return`rgb(${In(t.getComponents("rgb")).map(r=>e(r)).join(", ")})`}function Xs(n){const e=Zt(2),t=Zt(0);return`rgba(${Ht(n,"int").getComponents("rgb").map((s,o)=>(o===3?e:t)(s)).join(", ")})`}function Ab(n){const e=[Zt(0),eo,eo],t=Ht(n,"int");return`hsl(${In(t.getComponents("hsl")).map((r,s)=>e[s](r)).join(", ")})`}function Pb(n){const e=[Zt(0),eo,eo,Zt(2)];return`hsla(${Ht(n,"int").getComponents("hsl").map((r,s)=>e[s](r)).join(", ")})`}function qh(n,e){const t=Zt(e==="float"?2:0),i=["r","g","b"],r=Ht(n,e);return`{${In(r.getComponents("rgb")).map((o,a)=>`${i[a]}: ${t(o)}`).join(", ")}}`}function Rb(n){return e=>qh(e,n)}function $h(n,e){const t=Zt(2),i=Zt(e==="float"?2:0),r=["r","g","b","a"];return`{${Ht(n,e).getComponents("rgb").map((a,l)=>{const c=l===3?t:i;return`${r[l]}: ${c(a)}`}).join(", ")}}`}function Lb(n){return e=>$h(e,n)}const Db=[{format:{alpha:!1,mode:"rgb",notation:"hex",type:"int"},stringifier:Dl},{format:{alpha:!0,mode:"rgb",notation:"hex",type:"int"},stringifier:Il},{format:{alpha:!1,mode:"rgb",notation:"func",type:"int"},stringifier:jh},{format:{alpha:!0,mode:"rgb",notation:"func",type:"int"},stringifier:Xs},{format:{alpha:!1,mode:"hsl",notation:"func",type:"int"},stringifier:Ab},{format:{alpha:!0,mode:"hsl",notation:"func",type:"int"},stringifier:Pb},...["int","float"].reduce((n,e)=>[...n,{format:{alpha:!1,mode:"rgb",notation:"object",type:e},stringifier:Rb(e)},{format:{alpha:!0,mode:"rgb",notation:"object",type:e},stringifier:Lb(e)}],[])];function Yh(n){return Db.reduce((e,t)=>e||(fb(t.format,n)?t.stringifier:null),null)}const Or=$e("apl");class Ib{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.value=t.value,this.value.emitter.on("change",this.onValueChange_),this.element=e.createElement("div"),this.element.classList.add(Or()),t.viewProps.bindClassModifiers(this.element),t.viewProps.bindTabIndex(this.element);const i=e.createElement("div");i.classList.add(Or("b")),this.element.appendChild(i);const r=e.createElement("div");r.classList.add(Or("c")),i.appendChild(r),this.colorElem_=r;const s=e.createElement("div");s.classList.add(Or("m")),this.element.appendChild(s),this.markerElem_=s;const o=e.createElement("div");o.classList.add(Or("p")),this.markerElem_.appendChild(o),this.previewElem_=o,this.update_()}update_(){const e=this.value.rawValue,t=e.getComponents("rgb"),i=new Ze([t[0],t[1],t[2],0],"rgb"),r=new Ze([t[0],t[1],t[2],255],"rgb"),s=["to right",Xs(i),Xs(r)];this.colorElem_.style.background=`linear-gradient(${s.join(",")})`,this.previewElem_.style.backgroundColor=Xs(e);const o=Je(t[3],0,1,0,100);this.markerElem_.style.left=`${o}%`}onValueChange_(){this.update_()}}class Ub{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new Ib(e,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new zi(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const i=e.point.x/e.bounds.width,r=this.value.rawValue,[s,o,a]=r.getComponents("hsv");this.value.setRawValue(new Ze([s,o,a,i],"hsv"),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){const t=$t(Oi(!0),Zn(e));if(t===0)return;const i=this.value.rawValue,[r,s,o,a]=i.getComponents("hsv");this.value.setRawValue(new Ze([r,s,o,a+t],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(e){$t(Oi(!0),Zn(e))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const sr=$e("coltxt");function Nb(n){const e=n.createElement("select"),t=[{text:"RGB",value:"rgb"},{text:"HSL",value:"hsl"},{text:"HSV",value:"hsv"},{text:"HEX",value:"hex"}];return e.appendChild(t.reduce((i,r)=>{const s=n.createElement("option");return s.textContent=r.text,s.value=r.value,i.appendChild(s),i},n.createDocumentFragment())),e}class Fb{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(sr()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("div");i.classList.add(sr("m")),this.modeElem_=Nb(e),this.modeElem_.classList.add(sr("ms")),i.appendChild(this.modeSelectElement),t.viewProps.bindDisabled(this.modeElem_);const r=e.createElement("div");r.classList.add(sr("mm")),r.appendChild(ao(e,"dropdown")),i.appendChild(r),this.element.appendChild(i);const s=e.createElement("div");s.classList.add(sr("w")),this.element.appendChild(s),this.inputsElem_=s,this.inputViews_=t.inputViews,this.applyInputViews_(),$n(t.mode,o=>{this.modeElem_.value=o})}get modeSelectElement(){return this.modeElem_}get inputViews(){return this.inputViews_}set inputViews(e){this.inputViews_=e,this.applyInputViews_()}applyInputViews_(){mh(this.inputsElem_);const e=this.element.ownerDocument;this.inputViews_.forEach(t=>{const i=e.createElement("div");i.classList.add(sr("c")),i.appendChild(t.element),this.inputsElem_.appendChild(i)})}}function Ob(n){return Zt(n==="float"?2:0)}function Bb(n,e,t){const i=vr(n,e)[t];return new is({min:0,max:i})}function kb(n,e,t){return new cs(n,{arrayPosition:t===0?"fst":t===2?"lst":"mid",parser:e.parser,props:Be.fromObject({formatter:Ob(e.colorType),keyScale:Oi(!1),pointerScale:e.colorType==="float"?.01:1}),value:pt(0,{constraint:Bb(e.colorMode,e.colorType,t)}),viewProps:e.viewProps})}function Vb(n,e){const t={colorMode:e.colorMode,colorType:e.colorType,parser:Kn,viewProps:e.viewProps};return[0,1,2].map(i=>{const r=kb(n,t,i);return Cr({primary:e.value,secondary:r.value,forward(s){return Ht(s,e.colorType).getComponents(e.colorMode)[i]},backward(s,o){const a=e.colorMode,c=Ht(s,e.colorType).getComponents(a);c[i]=o;const d=Ll(co(In(c),c[3]),a,e.colorType);return Ht(d,"int")}}),r})}function zb(n,e){const t=new Zr(n,{parser:hs("int"),props:Be.fromObject({formatter:Dl}),value:pt(Ze.black()),viewProps:e.viewProps});return Cr({primary:e.value,secondary:t.value,forward:i=>new Ze(In(i.getComponents()),i.mode),backward:(i,r)=>new Ze(co(In(r.getComponents(i.mode)),i.getComponents()[3]),i.mode)}),[t]}function Hb(n){return n!=="hex"}class Gb{constructor(e,t){this.onModeSelectChange_=this.onModeSelectChange_.bind(this),this.colorType_=t.colorType,this.value=t.value,this.viewProps=t.viewProps,this.colorMode=pt(this.value.rawValue.mode),this.ccs_=this.createComponentControllers_(e),this.view=new Fb(e,{mode:this.colorMode,inputViews:[this.ccs_[0].view,this.ccs_[1].view,this.ccs_[2].view],viewProps:this.viewProps}),this.view.modeSelectElement.addEventListener("change",this.onModeSelectChange_)}createComponentControllers_(e){const t=this.colorMode.rawValue;return Hb(t)?Vb(e,{colorMode:t,colorType:this.colorType_,value:this.value,viewProps:this.viewProps}):zb(e,{value:this.value,viewProps:this.viewProps})}onModeSelectChange_(e){const t=e.currentTarget;this.colorMode.rawValue=t.value,this.ccs_=this.createComponentControllers_(this.view.element.ownerDocument),this.view.inputViews=this.ccs_.map(i=>i.view)}}const Zo=$e("hpl");class Wb{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.value=t.value,this.value.emitter.on("change",this.onValueChange_),this.element=e.createElement("div"),this.element.classList.add(Zo()),t.viewProps.bindClassModifiers(this.element),t.viewProps.bindTabIndex(this.element);const i=e.createElement("div");i.classList.add(Zo("c")),this.element.appendChild(i);const r=e.createElement("div");r.classList.add(Zo("m")),this.element.appendChild(r),this.markerElem_=r,this.update_()}update_(){const e=this.value.rawValue,[t]=e.getComponents("hsv");this.markerElem_.style.backgroundColor=jh(new Ze([t,100,100],"hsv"));const i=Je(t,0,360,0,100);this.markerElem_.style.left=`${i}%`}onValueChange_(){this.update_()}}class Xb{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new Wb(e,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new zi(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const i=Je(At(e.point.x,0,e.bounds.width),0,e.bounds.width,0,360),r=this.value.rawValue,[,s,o,a]=r.getComponents("hsv");this.value.setRawValue(new Ze([i,s,o,a],"hsv"),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){const t=$t(Oi(!1),Zn(e));if(t===0)return;const i=this.value.rawValue,[r,s,o,a]=i.getComponents("hsv");this.value.setRawValue(new Ze([r+t,s,o,a],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(e){$t(Oi(!1),Zn(e))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const Jo=$e("svp"),hd=64;class jb{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),this.value=t.value,this.value.emitter.on("change",this.onValueChange_),this.element=e.createElement("div"),this.element.classList.add(Jo()),t.viewProps.bindClassModifiers(this.element),t.viewProps.bindTabIndex(this.element);const i=e.createElement("canvas");i.height=hd,i.width=hd,i.classList.add(Jo("c")),this.element.appendChild(i),this.canvasElement=i;const r=e.createElement("div");r.classList.add(Jo("m")),this.element.appendChild(r),this.markerElem_=r,this.update_()}update_(){const e=X_(this.canvasElement);if(!e)return;const i=this.value.rawValue.getComponents("hsv"),r=this.canvasElement.width,s=this.canvasElement.height,o=e.getImageData(0,0,r,s),a=o.data;for(let d=0;d<s;d++)for(let h=0;h<r;h++){const p=Je(h,0,r,0,100),f=Je(d,0,s,100,0),_=Dh(i[0],p,f),b=(d*r+h)*4;a[b]=_[0],a[b+1]=_[1],a[b+2]=_[2],a[b+3]=255}e.putImageData(o,0,0);const l=Je(i[1],0,100,0,100);this.markerElem_.style.left=`${l}%`;const c=Je(i[2],0,100,100,0);this.markerElem_.style.top=`${c}%`}onValueChange_(){this.update_()}}class qb{constructor(e,t){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.view=new jb(e,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new zi(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const i=Je(e.point.x,0,e.bounds.width,0,100),r=Je(e.point.y,0,e.bounds.height,100,0),[s,,,o]=this.value.rawValue.getComponents("hsv");this.value.setRawValue(new Ze([s,i,r,o],"hsv"),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onKeyDown_(e){Ah(e.key)&&e.preventDefault();const[t,i,r,s]=this.value.rawValue.getComponents("hsv"),o=Oi(!1),a=$t(o,Zn(e)),l=$t(o,Jr(e));a===0&&l===0||this.value.setRawValue(new Ze([t,i+a,r+l,s],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(e){const t=Oi(!1),i=$t(t,Zn(e)),r=$t(t,Jr(e));i===0&&r===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class $b{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.hPaletteC_=new Xb(e,{value:this.value,viewProps:this.viewProps}),this.svPaletteC_=new qb(e,{value:this.value,viewProps:this.viewProps}),this.alphaIcs_=t.supportsAlpha?{palette:new Ub(e,{value:this.value,viewProps:this.viewProps}),text:new cs(e,{parser:Kn,props:Be.fromObject({pointerScale:.01,keyScale:.1,formatter:Zt(2)}),value:pt(0,{constraint:new is({min:0,max:1})}),viewProps:this.viewProps})}:null,this.alphaIcs_&&Cr({primary:this.value,secondary:this.alphaIcs_.text.value,forward:i=>i.getComponents()[3],backward:(i,r)=>{const s=i.getComponents();return s[3]=r,new Ze(s,i.mode)}}),this.textsC_=new Gb(e,{colorType:t.colorType,value:this.value,viewProps:this.viewProps}),this.view=new ab(e,{alphaViews:this.alphaIcs_?{palette:this.alphaIcs_.palette.view,text:this.alphaIcs_.text.view}:null,hPaletteView:this.hPaletteC_.view,supportsAlpha:t.supportsAlpha,svPaletteView:this.svPaletteC_.view,textsView:this.textsC_.view,viewProps:this.viewProps})}get textsController(){return this.textsC_}}const Qo=$e("colsw");class Yb{constructor(e,t){this.onValueChange_=this.onValueChange_.bind(this),t.value.emitter.on("change",this.onValueChange_),this.value=t.value,this.element=e.createElement("div"),this.element.classList.add(Qo()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("div");i.classList.add(Qo("sw")),this.element.appendChild(i),this.swatchElem_=i;const r=e.createElement("button");r.classList.add(Qo("b")),t.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r,this.update_()}update_(){const e=this.value.rawValue;this.swatchElem_.style.backgroundColor=Il(e)}onValueChange_(){this.update_()}}class Kb{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.view=new Yb(e,{value:this.value,viewProps:this.viewProps})}}class Ul{constructor(e,t){this.onButtonBlur_=this.onButtonBlur_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.foldable_=ss.create(t.expanded),this.swatchC_=new Kb(e,{value:this.value,viewProps:this.viewProps});const i=this.swatchC_.view.buttonElement;i.addEventListener("blur",this.onButtonBlur_),i.addEventListener("click",this.onButtonClick_),this.textC_=new Zr(e,{parser:t.parser,props:Be.fromObject({formatter:t.formatter}),value:this.value,viewProps:this.viewProps}),this.view=new Qv(e,{foldable:this.foldable_,pickerLayout:t.pickerLayout}),this.view.swatchElement.appendChild(this.swatchC_.view.element),this.view.textElement.appendChild(this.textC_.view.element),this.popC_=t.pickerLayout==="popup"?new Eh(e,{viewProps:this.viewProps}):null;const r=new $b(e,{colorType:t.colorType,supportsAlpha:t.supportsAlpha,value:this.value,viewProps:this.viewProps});r.view.allFocusableElements.forEach(s=>{s.addEventListener("blur",this.onPopupChildBlur_),s.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=r,this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(r.view.element),Cr({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:s=>s,backward:(s,o)=>o})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),El(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onButtonBlur_(e){if(!this.popC_)return;const t=this.view.element,i=e.relatedTarget;(!i||!t.contains(i))&&(this.popC_.shows.rawValue=!1)}onButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(e){if(!this.popC_)return;const t=this.popC_.view.element,i=xh(e);i&&t.contains(i)||i&&i===this.swatchC_.view.buttonElement&&!vl(t.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(e){this.popC_?e.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&e.key==="Escape"&&this.swatchC_.view.buttonElement.focus()}}function Zb(n){return In(n.getComponents("rgb")).reduce((e,t)=>e<<8|Math.floor(t)&255,0)}function Jb(n){return n.getComponents("rgb").reduce((e,t,i)=>{const r=Math.floor(i===3?t*255:t)&255;return e<<8|r},0)>>>0}function Qb(n){return new Ze([n>>16&255,n>>8&255,n&255],"rgb")}function eS(n){return new Ze([n>>24&255,n>>16&255,n>>8&255,Je(n&255,0,255,0,1)],"rgb")}function tS(n){return typeof n!="number"?Ze.black():Qb(n)}function nS(n){return typeof n!="number"?Ze.black():eS(n)}function js(n,e){return typeof n!="object"||ct(n)?!1:e in n&&typeof n[e]=="number"}function Kh(n){return js(n,"r")&&js(n,"g")&&js(n,"b")}function Zh(n){return Kh(n)&&js(n,"a")}function Jh(n){return Kh(n)}function Nl(n,e){if(n.mode!==e.mode||n.type!==e.type)return!1;const t=n.getComponents(),i=e.getComponents();for(let r=0;r<t.length;r++)if(t[r]!==i[r])return!1;return!0}function ud(n){return"a"in n?[n.r,n.g,n.b,n.a]:[n.r,n.g,n.b]}function iS(n){const e=Yh(n);return e?(t,i)=>{ds(t,e(i))}:null}function rS(n){const e=n?Jb:Zb;return(t,i)=>{ds(t,e(i))}}function sS(n,e,t){const r=Ht(e,t).toRgbaObject();n.writeProperty("r",r.r),n.writeProperty("g",r.g),n.writeProperty("b",r.b),n.writeProperty("a",r.a)}function oS(n,e,t){const r=Ht(e,t).toRgbaObject();n.writeProperty("r",r.r),n.writeProperty("g",r.g),n.writeProperty("b",r.b)}function aS(n,e){return(t,i)=>{n?sS(t,i,e):oS(t,i,e)}}function lS(n){var e;return!!(!((e=n?.color)===null||e===void 0)&&e.alpha)}function cS(n){return n?e=>Il(e,"0x"):e=>Dl(e,"0x")}function dS(n){return"color"in n||n.view==="color"}const hS=Gt({id:"input-color-number",type:"input",accept:(n,e)=>{if(typeof n!="number"||!dS(e))return null;const t=Pl(e);return t?{initialValue:n,params:Object.assign(Object.assign({},t),{supportsAlpha:lS(e)})}:null},binding:{reader:n=>n.params.supportsAlpha?nS:tS,equals:Nl,writer:n=>rS(n.params.supportsAlpha)},controller:n=>{var e,t;return new Ul(n.document,{colorType:"int",expanded:(e=n.params.expanded)!==null&&e!==void 0?e:!1,formatter:cS(n.params.supportsAlpha),parser:hs("int"),pickerLayout:(t=n.params.picker)!==null&&t!==void 0?t:"popup",supportsAlpha:n.params.supportsAlpha,value:n.value,viewProps:n.viewProps})}});function uS(n,e){if(!Jh(n))return Ht(Ze.black(),e);if(e==="int"){const t=ud(n);return new Ze(t,"rgb")}if(e==="float"){const t=ud(n);return new Rl(t,"rgb")}return Ht(Ze.black(),"int")}function pS(n){return Zh(n)}function fS(n){return e=>{const t=uS(e,n);return Ht(t,"int")}}function mS(n,e){return t=>n?$h(t,e):qh(t,e)}const xS=Gt({id:"input-color-object",type:"input",accept:(n,e)=>{var t;if(!Jh(n))return null;const i=Pl(e);return i?{initialValue:n,params:Object.assign(Object.assign({},i),{colorType:(t=Nh(e))!==null&&t!==void 0?t:"int"})}:null},binding:{reader:n=>fS(n.params.colorType),equals:Nl,writer:n=>aS(pS(n.initialValue),n.params.colorType)},controller:n=>{var e,t;const i=Zh(n.initialValue);return new Ul(n.document,{colorType:n.params.colorType,expanded:(e=n.params.expanded)!==null&&e!==void 0?e:!1,formatter:mS(i,n.params.colorType),parser:hs("int"),pickerLayout:(t=n.params.picker)!==null&&t!==void 0?t:"popup",supportsAlpha:i,value:n.value,viewProps:n.viewProps})}}),gS=Gt({id:"input-color-string",type:"input",accept:(n,e)=>{if(typeof n!="string"||e.view==="text")return null;const t=Cb(n,Nh(e));if(!t)return null;const i=Yh(t);if(!i)return null;const r=Pl(e);return r?{initialValue:n,params:Object.assign(Object.assign({},r),{format:t,stringifier:i})}:null},binding:{reader:()=>Tb,equals:Nl,writer:n=>{const e=iS(n.params.format);if(!e)throw St.notBindable();return e}},controller:n=>{var e,t;return new Ul(n.document,{colorType:n.params.format.type,expanded:(e=n.params.expanded)!==null&&e!==void 0?e:!1,formatter:n.params.stringifier,parser:hs("int"),pickerLayout:(t=n.params.picker)!==null&&t!==void 0?t:"popup",supportsAlpha:n.params.format.alpha,value:n.value,viewProps:n.viewProps})}});class Fl{constructor(e){this.components=e.components,this.asm_=e.assembly}constrain(e){const t=this.asm_.toComponents(e).map((i,r)=>{var s,o;return(o=(s=this.components[r])===null||s===void 0?void 0:s.constrain(i))!==null&&o!==void 0?o:i});return this.asm_.fromComponents(t)}}const pd=$e("pndtxt");class _S{constructor(e,t){this.textViews=t.textViews,this.element=e.createElement("div"),this.element.classList.add(pd()),this.textViews.forEach(i=>{const r=e.createElement("div");r.classList.add(pd("a")),r.appendChild(i.element),this.element.appendChild(r)})}}function vS(n,e,t){return new cs(n,{arrayPosition:t===0?"fst":t===e.axes.length-1?"lst":"mid",parser:e.parser,props:e.axes[t].textProps,value:pt(0,{constraint:e.axes[t].constraint}),viewProps:e.viewProps})}class Ol{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.acs_=t.axes.map((i,r)=>vS(e,t,r)),this.acs_.forEach((i,r)=>{Cr({primary:this.value,secondary:i.value,forward:s=>t.assembly.toComponents(s)[r],backward:(s,o)=>{const a=t.assembly.toComponents(s);return a[r]=o,t.assembly.fromComponents(a)}})}),this.view=new _S(e,{textViews:this.acs_.map(i=>i.view)})}get textControllers(){return this.acs_}}class bS extends Kr{get max(){return this.controller.valueController.sliderController.props.get("max")}set max(e){this.controller.valueController.sliderController.props.set("max",e)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(e){this.controller.valueController.sliderController.props.set("min",e)}}function SS(n,e){const t=[],i=ch(n,e);i&&t.push(i);const r=dh(n);r&&t.push(r);const s=Al(n.options);return s&&t.push(s),new os(t)}const wS=Gt({id:"input-number",type:"input",accept:(n,e)=>{if(typeof n!="number")return null;const t=gt(e,i=>Object.assign(Object.assign({},uh(i)),{options:i.optional.custom(ls),readonly:i.optional.constant(!1)}));return t?{initialValue:n,params:t}:null},binding:{reader:n=>sh,constraint:n=>SS(n.params,n.initialValue),writer:n=>ds},controller:n=>{const e=n.value,t=n.constraint,i=t&&Qs(t,as);if(i)return new mi(n.document,{props:new Be({options:i.values.value("options")}),value:e,viewProps:n.viewProps});const r=hh(n.params,e.rawValue),s=t&&Qs(t,is);return s?new to(n.document,Object.assign(Object.assign({},Ph(Object.assign(Object.assign({},r),{keyScale:pt(r.keyScale),max:s.values.value("max"),min:s.values.value("min")}))),{parser:Kn,value:e,viewProps:n.viewProps})):new cs(n.document,{parser:Kn,props:Be.fromObject(r),value:e,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="number"?null:n.controller.valueController instanceof to?new bS(n.controller):n.controller.valueController instanceof mi?new Cl(n.controller):null}});class pi{constructor(e=0,t=0){this.x=e,this.y=t}getComponents(){return[this.x,this.y]}static isObject(e){if(ct(e))return!1;const t=e.x,i=e.y;return!(typeof t!="number"||typeof i!="number")}static equals(e,t){return e.x===t.x&&e.y===t.y}toObject(){return{x:this.x,y:this.y}}}const Qh={toComponents:n=>n.getComponents(),fromComponents:n=>new pi(...n)},or=$e("p2d");class yS{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(or()),t.viewProps.bindClassModifiers(this.element),$n(t.expanded,yr(this.element,or(void 0,"expanded")));const i=e.createElement("div");i.classList.add(or("h")),this.element.appendChild(i);const r=e.createElement("button");r.classList.add(or("b")),r.appendChild(ao(e,"p2dpad")),t.viewProps.bindDisabled(r),i.appendChild(r),this.buttonElement=r;const s=e.createElement("div");if(s.classList.add(or("t")),i.appendChild(s),this.textElement=s,t.pickerLayout==="inline"){const o=e.createElement("div");o.classList.add(or("p")),this.element.appendChild(o),this.pickerElement=o}else this.pickerElement=null}}const oi=$e("p2dp");class MS{constructor(e,t){this.onFoldableChange_=this.onFoldableChange_.bind(this),this.onPropsChange_=this.onPropsChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.props_=t.props,this.props_.emitter.on("change",this.onPropsChange_),this.element=e.createElement("div"),this.element.classList.add(oi()),t.layout==="popup"&&this.element.classList.add(oi(void 0,"p")),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("div");i.classList.add(oi("p")),t.viewProps.bindTabIndex(i),this.element.appendChild(i),this.padElement=i;const r=e.createElementNS(Cn,"svg");r.classList.add(oi("g")),this.padElement.appendChild(r),this.svgElem_=r;const s=e.createElementNS(Cn,"line");s.classList.add(oi("ax")),s.setAttributeNS(null,"x1","0"),s.setAttributeNS(null,"y1","50%"),s.setAttributeNS(null,"x2","100%"),s.setAttributeNS(null,"y2","50%"),this.svgElem_.appendChild(s);const o=e.createElementNS(Cn,"line");o.classList.add(oi("ax")),o.setAttributeNS(null,"x1","50%"),o.setAttributeNS(null,"y1","0"),o.setAttributeNS(null,"x2","50%"),o.setAttributeNS(null,"y2","100%"),this.svgElem_.appendChild(o);const a=e.createElementNS(Cn,"line");a.classList.add(oi("l")),a.setAttributeNS(null,"x1","50%"),a.setAttributeNS(null,"y1","50%"),this.svgElem_.appendChild(a),this.lineElem_=a;const l=e.createElement("div");l.classList.add(oi("m")),this.padElement.appendChild(l),this.markerElem_=l,t.value.emitter.on("change",this.onValueChange_),this.value=t.value,this.update_()}get allFocusableElements(){return[this.padElement]}update_(){const[e,t]=this.value.rawValue.getComponents(),i=this.props_.get("max"),r=Je(e,-i,+i,0,100),s=Je(t,-i,+i,0,100),o=this.props_.get("invertsY")?100-s:s;this.lineElem_.setAttributeNS(null,"x2",`${r}%`),this.lineElem_.setAttributeNS(null,"y2",`${o}%`),this.markerElem_.style.left=`${r}%`,this.markerElem_.style.top=`${o}%`}onValueChange_(){this.update_()}onPropsChange_(){this.update_()}onFoldableChange_(){this.update_()}}function fd(n,e,t){return[$t(e[0],Zn(n)),$t(e[1],Jr(n))*(t?1:-1)]}class ES{constructor(e,t){this.onPadKeyDown_=this.onPadKeyDown_.bind(this),this.onPadKeyUp_=this.onPadKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.view=new MS(e,{layout:t.layout,props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new zi(this.view.padElement),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.padElement.addEventListener("keydown",this.onPadKeyDown_),this.view.padElement.addEventListener("keyup",this.onPadKeyUp_)}handlePointerEvent_(e,t){if(!e.point)return;const i=this.props.get("max"),r=Je(e.point.x,0,e.bounds.width,-i,+i),s=Je(this.props.get("invertsY")?e.bounds.height-e.point.y:e.point.y,0,e.bounds.height,-i,+i);this.value.setRawValue(new pi(r,s),t)}onPointerDown_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerMove_(e){this.handlePointerEvent_(e.data,{forceEmit:!1,last:!1})}onPointerUp_(e){this.handlePointerEvent_(e.data,{forceEmit:!0,last:!0})}onPadKeyDown_(e){Ah(e.key)&&e.preventDefault();const[t,i]=fd(e,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));t===0&&i===0||this.value.setRawValue(new pi(this.value.rawValue.x+t,this.value.rawValue.y+i),{forceEmit:!1,last:!1})}onPadKeyUp_(e){const[t,i]=fd(e,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));t===0&&i===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class CS{constructor(e,t){var i,r;this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.onPadButtonBlur_=this.onPadButtonBlur_.bind(this),this.onPadButtonClick_=this.onPadButtonClick_.bind(this),this.value=t.value,this.viewProps=t.viewProps,this.foldable_=ss.create(t.expanded),this.popC_=t.pickerLayout==="popup"?new Eh(e,{viewProps:this.viewProps}):null;const s=new ES(e,{layout:t.pickerLayout,props:new Be({invertsY:pt(t.invertsY),max:pt(t.max),xKeyScale:t.axes[0].textProps.value("keyScale"),yKeyScale:t.axes[1].textProps.value("keyScale")}),value:this.value,viewProps:this.viewProps});s.view.allFocusableElements.forEach(o=>{o.addEventListener("blur",this.onPopupChildBlur_),o.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=s,this.textC_=new Ol(e,{assembly:Qh,axes:t.axes,parser:t.parser,value:this.value,viewProps:this.viewProps}),this.view=new yS(e,{expanded:this.foldable_.value("expanded"),pickerLayout:t.pickerLayout,viewProps:this.viewProps}),this.view.textElement.appendChild(this.textC_.view.element),(i=this.view.buttonElement)===null||i===void 0||i.addEventListener("blur",this.onPadButtonBlur_),(r=this.view.buttonElement)===null||r===void 0||r.addEventListener("click",this.onPadButtonClick_),this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(this.pickerC_.view.element),Cr({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:o=>o,backward:(o,a)=>a})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),El(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onPadButtonBlur_(e){if(!this.popC_)return;const t=this.view.element,i=e.relatedTarget;(!i||!t.contains(i))&&(this.popC_.shows.rawValue=!1)}onPadButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(e){if(!this.popC_)return;const t=this.popC_.view.element,i=xh(e);i&&t.contains(i)||i&&i===this.view.buttonElement&&!vl(t.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(e){this.popC_?e.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&e.key==="Escape"&&this.view.buttonElement.focus()}}function TS(n){return pi.isObject(n)?new pi(n.x,n.y):new pi}function AS(n,e){n.writeProperty("x",e.x),n.writeProperty("y",e.y)}function PS(n,e){return new Fl({assembly:Qh,components:[Xn(Object.assign(Object.assign({},n),n.x),e.x),Xn(Object.assign(Object.assign({},n),n.y),e.y)]})}function md(n,e){var t,i;if(!ct(n.min)||!ct(n.max))return Math.max(Math.abs((t=n.min)!==null&&t!==void 0?t:0),Math.abs((i=n.max)!==null&&i!==void 0?i:0));const r=ah(n);return Math.max(Math.abs(r)*10,Math.abs(e)*10)}function RS(n,e){var t,i;const r=md(Ni(n,(t=n.x)!==null&&t!==void 0?t:{}),e.x),s=md(Ni(n,(i=n.y)!==null&&i!==void 0?i:{}),e.y);return Math.max(r,s)}function LS(n){if(!("y"in n))return!1;const e=n.y;return e&&"inverted"in e?!!e.inverted:!1}const DS=Gt({id:"input-point2d",type:"input",accept:(n,e)=>{if(!pi.isObject(n))return null;const t=gt(e,i=>Object.assign(Object.assign({},Qr(i)),{expanded:i.optional.boolean,picker:i.optional.custom(Lh),readonly:i.optional.constant(!1),x:i.optional.custom(hi),y:i.optional.object(Object.assign(Object.assign({},Qr(i)),{inverted:i.optional.boolean}))}));return t?{initialValue:n,params:t}:null},binding:{reader:()=>TS,constraint:n=>PS(n.params,n.initialValue),equals:pi.equals,writer:()=>AS},controller:n=>{var e,t;const i=n.document,r=n.value,s=n.constraint,o=[n.params.x,n.params.y];return new CS(i,{axes:r.rawValue.getComponents().map((a,l)=>{var c;return _l({constraint:s.components[l],initialValue:a,params:Ni(n.params,(c=o[l])!==null&&c!==void 0?c:{})})}),expanded:(e=n.params.expanded)!==null&&e!==void 0?e:!1,invertsY:LS(n.params),max:RS(n.params,r.rawValue),parser:Kn,pickerLayout:(t=n.params.picker)!==null&&t!==void 0?t:"popup",value:r,viewProps:n.viewProps})}});class ur{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}getComponents(){return[this.x,this.y,this.z]}static isObject(e){if(ct(e))return!1;const t=e.x,i=e.y,r=e.z;return!(typeof t!="number"||typeof i!="number"||typeof r!="number")}static equals(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z}toObject(){return{x:this.x,y:this.y,z:this.z}}}const eu={toComponents:n=>n.getComponents(),fromComponents:n=>new ur(...n)};function IS(n){return ur.isObject(n)?new ur(n.x,n.y,n.z):new ur}function US(n,e){n.writeProperty("x",e.x),n.writeProperty("y",e.y),n.writeProperty("z",e.z)}function NS(n,e){return new Fl({assembly:eu,components:[Xn(Object.assign(Object.assign({},n),n.x),e.x),Xn(Object.assign(Object.assign({},n),n.y),e.y),Xn(Object.assign(Object.assign({},n),n.z),e.z)]})}const FS=Gt({id:"input-point3d",type:"input",accept:(n,e)=>{if(!ur.isObject(n))return null;const t=gt(e,i=>Object.assign(Object.assign({},Qr(i)),{readonly:i.optional.constant(!1),x:i.optional.custom(hi),y:i.optional.custom(hi),z:i.optional.custom(hi)}));return t?{initialValue:n,params:t}:null},binding:{reader:n=>IS,constraint:n=>NS(n.params,n.initialValue),equals:ur.equals,writer:n=>US},controller:n=>{const e=n.value,t=n.constraint,i=[n.params.x,n.params.y,n.params.z];return new Ol(n.document,{assembly:eu,axes:e.rawValue.getComponents().map((r,s)=>{var o;return _l({constraint:t.components[s],initialValue:r,params:Ni(n.params,(o=i[s])!==null&&o!==void 0?o:{})})}),parser:Kn,value:e,viewProps:n.viewProps})}});class pr{constructor(e=0,t=0,i=0,r=0){this.x=e,this.y=t,this.z=i,this.w=r}getComponents(){return[this.x,this.y,this.z,this.w]}static isObject(e){if(ct(e))return!1;const t=e.x,i=e.y,r=e.z,s=e.w;return!(typeof t!="number"||typeof i!="number"||typeof r!="number"||typeof s!="number")}static equals(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z&&e.w===t.w}toObject(){return{x:this.x,y:this.y,z:this.z,w:this.w}}}const tu={toComponents:n=>n.getComponents(),fromComponents:n=>new pr(...n)};function OS(n){return pr.isObject(n)?new pr(n.x,n.y,n.z,n.w):new pr}function BS(n,e){n.writeProperty("x",e.x),n.writeProperty("y",e.y),n.writeProperty("z",e.z),n.writeProperty("w",e.w)}function kS(n,e){return new Fl({assembly:tu,components:[Xn(Object.assign(Object.assign({},n),n.x),e.x),Xn(Object.assign(Object.assign({},n),n.y),e.y),Xn(Object.assign(Object.assign({},n),n.z),e.z),Xn(Object.assign(Object.assign({},n),n.w),e.w)]})}const VS=Gt({id:"input-point4d",type:"input",accept:(n,e)=>{if(!pr.isObject(n))return null;const t=gt(e,i=>Object.assign(Object.assign({},Qr(i)),{readonly:i.optional.constant(!1),w:i.optional.custom(hi),x:i.optional.custom(hi),y:i.optional.custom(hi),z:i.optional.custom(hi)}));return t?{initialValue:n,params:t}:null},binding:{reader:n=>OS,constraint:n=>kS(n.params,n.initialValue),equals:pr.equals,writer:n=>BS},controller:n=>{const e=n.value,t=n.constraint,i=[n.params.x,n.params.y,n.params.z,n.params.w];return new Ol(n.document,{assembly:tu,axes:e.rawValue.getComponents().map((r,s)=>{var o;return _l({constraint:t.components[s],initialValue:r,params:Ni(n.params,(o=i[s])!==null&&o!==void 0?o:{})})}),parser:Kn,value:e,viewProps:n.viewProps})}});function zS(n){const e=[],t=Al(n.options);return t&&e.push(t),new os(e)}const HS=Gt({id:"input-string",type:"input",accept:(n,e)=>{if(typeof n!="string")return null;const t=gt(e,i=>({readonly:i.optional.constant(!1),options:i.optional.custom(ls)}));return t?{initialValue:n,params:t}:null},binding:{reader:n=>Th,constraint:n=>zS(n.params),writer:n=>ds},controller:n=>{const e=n.document,t=n.value,i=n.constraint,r=i&&Qs(i,as);return r?new mi(e,{props:new Be({options:r.values.value("options")}),value:t,viewProps:n.viewProps}):new Zr(e,{parser:s=>s,props:Be.fromObject({formatter:Ya}),value:t,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="string"?null:n.controller.valueController instanceof mi?new Cl(n.controller):null}}),us={monitor:{defaultInterval:200,defaultRows:3}},xd=$e("mll");class GS{constructor(e,t){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=t.formatter,this.element=e.createElement("div"),this.element.classList.add(xd()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("textarea");i.classList.add(xd("i")),i.style.height=`calc(var(${Rh("containerUnitSize")}) * ${t.rows})`,i.readOnly=!0,t.viewProps.bindDisabled(i),this.element.appendChild(i),this.textareaElem_=i,t.value.emitter.on("change",this.onValueUpdate_),this.value=t.value,this.update_()}update_(){const e=this.textareaElem_,t=e.scrollTop===e.scrollHeight-e.clientHeight,i=[];this.value.rawValue.forEach(r=>{r!==void 0&&i.push(this.formatter_(r))}),e.textContent=i.join(`
`),t&&(e.scrollTop=e.scrollHeight)}onValueUpdate_(){this.update_()}}class Bl{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.view=new GS(e,{formatter:t.formatter,rows:t.rows,value:this.value,viewProps:this.viewProps})}}const gd=$e("sgl");class WS{constructor(e,t){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=t.formatter,this.element=e.createElement("div"),this.element.classList.add(gd()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("input");i.classList.add(gd("i")),i.readOnly=!0,i.type="text",t.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,t.value.emitter.on("change",this.onValueUpdate_),this.value=t.value,this.update_()}update_(){const e=this.value.rawValue,t=e[e.length-1];this.inputElement.value=t!==void 0?this.formatter_(t):""}onValueUpdate_(){this.update_()}}class kl{constructor(e,t){this.value=t.value,this.viewProps=t.viewProps,this.view=new WS(e,{formatter:t.formatter,value:this.value,viewProps:this.viewProps})}}const XS=Gt({id:"monitor-bool",type:"monitor",accept:(n,e)=>{if(typeof n!="boolean")return null;const t=gt(e,i=>({readonly:i.required.constant(!0),rows:i.optional.number}));return t?{initialValue:n,params:t}:null},binding:{reader:n=>Ch},controller:n=>{var e;return n.value.rawValue.length===1?new kl(n.document,{formatter:cd,value:n.value,viewProps:n.viewProps}):new Bl(n.document,{formatter:cd,rows:(e=n.params.rows)!==null&&e!==void 0?e:us.monitor.defaultRows,value:n.value,viewProps:n.viewProps})}});class jS extends Kr{get max(){return this.controller.valueController.props.get("max")}set max(e){this.controller.valueController.props.set("max",e)}get min(){return this.controller.valueController.props.get("min")}set min(e){this.controller.valueController.props.set("min",e)}}const ai=$e("grl");class qS{constructor(e,t){this.onCursorChange_=this.onCursorChange_.bind(this),this.onValueUpdate_=this.onValueUpdate_.bind(this),this.element=e.createElement("div"),this.element.classList.add(ai()),t.viewProps.bindClassModifiers(this.element),this.formatter_=t.formatter,this.props_=t.props,this.cursor_=t.cursor,this.cursor_.emitter.on("change",this.onCursorChange_);const i=e.createElementNS(Cn,"svg");i.classList.add(ai("g")),i.style.height=`calc(var(${Rh("containerUnitSize")}) * ${t.rows})`,this.element.appendChild(i),this.svgElem_=i;const r=e.createElementNS(Cn,"polyline");this.svgElem_.appendChild(r),this.lineElem_=r;const s=e.createElement("div");s.classList.add(ai("t"),$e("tt")()),this.element.appendChild(s),this.tooltipElem_=s,t.value.emitter.on("change",this.onValueUpdate_),this.value=t.value,this.update_()}get graphElement(){return this.svgElem_}update_(){const{clientWidth:e,clientHeight:t}=this.element,i=this.value.rawValue.length-1,r=this.props_.get("min"),s=this.props_.get("max"),o=[];this.value.rawValue.forEach((h,p)=>{if(h===void 0)return;const f=Je(p,0,i,0,e),_=Je(h,r,s,t,0);o.push([f,_].join(","))}),this.lineElem_.setAttributeNS(null,"points",o.join(" "));const a=this.tooltipElem_,l=this.value.rawValue[this.cursor_.rawValue];if(l===void 0){a.classList.remove(ai("t","a"));return}const c=Je(this.cursor_.rawValue,0,i,0,e),d=Je(l,r,s,t,0);a.style.left=`${c}px`,a.style.top=`${d}px`,a.textContent=`${this.formatter_(l)}`,a.classList.contains(ai("t","a"))||(a.classList.add(ai("t","a"),ai("t","in")),Js(a),a.classList.remove(ai("t","in")))}onValueUpdate_(){this.update_()}onCursorChange_(){this.update_()}}class nu{constructor(e,t){if(this.onGraphMouseMove_=this.onGraphMouseMove_.bind(this),this.onGraphMouseLeave_=this.onGraphMouseLeave_.bind(this),this.onGraphPointerDown_=this.onGraphPointerDown_.bind(this),this.onGraphPointerMove_=this.onGraphPointerMove_.bind(this),this.onGraphPointerUp_=this.onGraphPointerUp_.bind(this),this.props=t.props,this.value=t.value,this.viewProps=t.viewProps,this.cursor_=pt(-1),this.view=new qS(e,{cursor:this.cursor_,formatter:t.formatter,rows:t.rows,props:this.props,value:this.value,viewProps:this.viewProps}),!vl(e))this.view.element.addEventListener("mousemove",this.onGraphMouseMove_),this.view.element.addEventListener("mouseleave",this.onGraphMouseLeave_);else{const i=new zi(this.view.element);i.emitter.on("down",this.onGraphPointerDown_),i.emitter.on("move",this.onGraphPointerMove_),i.emitter.on("up",this.onGraphPointerUp_)}}importProps(e){return on(e,null,t=>({max:t.required.number,min:t.required.number}),t=>(this.props.set("max",t.max),this.props.set("min",t.min),!0))}exportProps(){return an(null,{max:this.props.get("max"),min:this.props.get("min")})}onGraphMouseLeave_(){this.cursor_.rawValue=-1}onGraphMouseMove_(e){const{clientWidth:t}=this.view.element;this.cursor_.rawValue=Math.floor(Je(e.offsetX,0,t,0,this.value.rawValue.length))}onGraphPointerDown_(e){this.onGraphPointerMove_(e)}onGraphPointerMove_(e){if(!e.data.point){this.cursor_.rawValue=-1;return}this.cursor_.rawValue=Math.floor(Je(e.data.point.x,0,e.data.bounds.width,0,this.value.rawValue.length))}onGraphPointerUp_(){this.cursor_.rawValue=-1}}function Ka(n){return ct(n.format)?Zt(2):n.format}function $S(n){var e;return n.value.rawValue.length===1?new kl(n.document,{formatter:Ka(n.params),value:n.value,viewProps:n.viewProps}):new Bl(n.document,{formatter:Ka(n.params),rows:(e=n.params.rows)!==null&&e!==void 0?e:us.monitor.defaultRows,value:n.value,viewProps:n.viewProps})}function YS(n){var e,t,i;return new nu(n.document,{formatter:Ka(n.params),rows:(e=n.params.rows)!==null&&e!==void 0?e:us.monitor.defaultRows,props:Be.fromObject({max:(t=n.params.max)!==null&&t!==void 0?t:100,min:(i=n.params.min)!==null&&i!==void 0?i:0}),value:n.value,viewProps:n.viewProps})}function _d(n){return n.view==="graph"}const KS=Gt({id:"monitor-number",type:"monitor",accept:(n,e)=>{if(typeof n!="number")return null;const t=gt(e,i=>({format:i.optional.function,max:i.optional.number,min:i.optional.number,readonly:i.required.constant(!0),rows:i.optional.number,view:i.optional.string}));return t?{initialValue:n,params:t}:null},binding:{defaultBufferSize:n=>_d(n)?64:1,reader:n=>sh},controller:n=>_d(n.params)?YS(n):$S(n),api:n=>n.controller.valueController instanceof nu?new jS(n.controller):null}),ZS=Gt({id:"monitor-string",type:"monitor",accept:(n,e)=>{if(typeof n!="string")return null;const t=gt(e,i=>({multiline:i.optional.boolean,readonly:i.required.constant(!0),rows:i.optional.number}));return t?{initialValue:n,params:t}:null},binding:{reader:n=>Th},controller:n=>{var e;const t=n.value;return t.rawValue.length>1||n.params.multiline?new Bl(n.document,{formatter:Ya,rows:(e=n.params.rows)!==null&&e!==void 0?e:us.monitor.defaultRows,value:t,viewProps:n.viewProps}):new kl(n.document,{formatter:Ya,value:t,viewProps:n.viewProps})}});class JS{constructor(){this.map_=new Map}get(e){var t;return(t=this.map_.get(e))!==null&&t!==void 0?t:null}has(e){return this.map_.has(e)}add(e,t){return this.map_.set(e,t),e.viewProps.handleDispose(()=>{this.map_.delete(e)}),t}}class QS{constructor(e){this.target=e.target,this.reader_=e.reader,this.writer_=e.writer}read(){return this.reader_(this.target.read())}write(e){this.writer_(this.target,e)}inject(e){this.write(this.reader_(e))}}function ew(n,e){var t;const i=n.accept(e.target.read(),e.params);if(ct(i))return null;const r={target:e.target,initialValue:i.initialValue,params:i.params},s=gt(e.params,h=>({disabled:h.optional.boolean,hidden:h.optional.boolean,label:h.optional.string,tag:h.optional.string})),o=n.binding.reader(r),a=n.binding.constraint?n.binding.constraint(r):void 0,l=new QS({reader:o,target:e.target,writer:n.binding.writer(r)}),c=new O_(pt(o(i.initialValue),{constraint:a,equals:n.binding.equals}),l),d=n.controller({constraint:a,document:e.document,initialValue:i.initialValue,params:i.params,value:c,viewProps:Jn.create({disabled:s?.disabled,hidden:s?.hidden})});return new J_(e.document,{blade:Er(),props:Be.fromObject({label:"label"in e.params?(t=s?.label)!==null&&t!==void 0?t:null:e.target.key}),tag:s?.tag,value:c,valueController:d})}class tw{constructor(e){this.target=e.target,this.reader_=e.reader}read(){return this.reader_(this.target.read())}}function nw(n,e){return e===0?new Uv:new Nv(n,e??us.monitor.defaultInterval)}function iw(n,e){var t,i,r;const s=n.accept(e.target.read(),e.params);if(ct(s))return null;const o={target:e.target,initialValue:s.initialValue,params:s.params},a=gt(e.params,p=>({bufferSize:p.optional.number,disabled:p.optional.boolean,hidden:p.optional.boolean,interval:p.optional.number,label:p.optional.string})),l=n.binding.reader(o),c=(i=(t=a?.bufferSize)!==null&&t!==void 0?t:n.binding.defaultBufferSize&&n.binding.defaultBufferSize(s.params))!==null&&i!==void 0?i:1,d=new iv({binding:new tw({reader:l,target:e.target}),bufferSize:c,ticker:nw(e.document,a?.interval)}),h=n.controller({document:e.document,params:s.params,value:d,viewProps:Jn.create({disabled:a?.disabled,hidden:a?.hidden})});return h.viewProps.bindDisabled(d.ticker),h.viewProps.handleDispose(()=>{d.ticker.dispose()}),new sv(e.document,{blade:Er(),props:Be.fromObject({label:"label"in e.params?(r=a?.label)!==null&&r!==void 0?r:null:e.target.key}),value:d,valueController:h})}class rw{constructor(e){this.pluginsMap_={blades:[],inputs:[],monitors:[]},this.apiCache_=e}getAll(){return[...this.pluginsMap_.blades,...this.pluginsMap_.inputs,...this.pluginsMap_.monitors]}register(e,t){if(!$v(t.core))throw St.notCompatible(e,t.id);t.type==="blade"?this.pluginsMap_.blades.unshift(t):t.type==="input"?this.pluginsMap_.inputs.unshift(t):t.type==="monitor"&&this.pluginsMap_.monitors.unshift(t)}createInput_(e,t,i){return this.pluginsMap_.inputs.reduce((r,s)=>r??ew(s,{document:e,target:t,params:i}),null)}createMonitor_(e,t,i){return this.pluginsMap_.monitors.reduce((r,s)=>r??iw(s,{document:e,params:i,target:t}),null)}createBinding(e,t,i){const r=t.read();if(ct(r))throw new St({context:{key:t.key},type:"nomatchingcontroller"});const s=this.createInput_(e,t,i);if(s)return s;const o=this.createMonitor_(e,t,i);if(o)return o;throw new St({context:{key:t.key},type:"nomatchingcontroller"})}createBlade(e,t){const i=this.pluginsMap_.blades.reduce((r,s)=>r??Iv(s,{document:e,params:t}),null);if(!i)throw new St({type:"nomatchingview",context:{params:t}});return i}createInputBindingApi_(e){const t=this.pluginsMap_.inputs.reduce((i,r)=>{var s,o;return i||((o=(s=r.api)===null||s===void 0?void 0:s.call(r,{controller:e}))!==null&&o!==void 0?o:null)},null);return this.apiCache_.add(e,t??new Kr(e))}createMonitorBindingApi_(e){const t=this.pluginsMap_.monitors.reduce((i,r)=>{var s,o;return i||((o=(s=r.api)===null||s===void 0?void 0:s.call(r,{controller:e}))!==null&&o!==void 0?o:null)},null);return this.apiCache_.add(e,t??new Kr(e))}createBindingApi(e){if(this.apiCache_.has(e))return this.apiCache_.get(e);if(Q_(e))return this.createInputBindingApi_(e);if(ov(e))return this.createMonitorBindingApi_(e);throw St.shouldNeverHappen()}createApi(e){if(this.apiCache_.has(e))return this.apiCache_.get(e);if(Z_(e))return this.createBindingApi(e);const t=this.pluginsMap_.blades.reduce((i,r)=>i??r.api({controller:e,pool:this}),null);if(!t)throw St.shouldNeverHappen();return this.apiCache_.add(e,t)}}const sw=new JS;function ow(){const n=new rw(sw);return[DS,FS,VS,HS,wS,gS,xS,hS,Jv,XS,ZS,KS,hv,Mv,Mh].forEach(e=>{n.register("core",e)}),n}class aw extends Vi{constructor(e){super(e),this.emitter_=new Ct,this.controller.value.emitter.on("change",t=>{this.emitter_.emit("change",new rs(this,t.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(e){this.controller.labelController.props.set("label",e)}get options(){return this.controller.valueController.props.get("options")}set options(e){this.controller.valueController.props.set("options",e)}get value(){return this.controller.value.rawValue}set value(e){this.controller.value.rawValue=e}on(e,t){const i=t.bind(this);return this.emitter_.on(e,r=>{i(r)},{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}}class lw extends Vi{}class cw extends Vi{constructor(e){super(e),this.emitter_=new Ct,this.controller.value.emitter.on("change",t=>{this.emitter_.emit("change",new rs(this,t.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(e){this.controller.labelController.props.set("label",e)}get max(){return this.controller.valueController.sliderController.props.get("max")}set max(e){this.controller.valueController.sliderController.props.set("max",e)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(e){this.controller.valueController.sliderController.props.set("min",e)}get value(){return this.controller.value.rawValue}set value(e){this.controller.value.rawValue=e}on(e,t){const i=t.bind(this);return this.emitter_.on(e,r=>{i(r)},{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}}class dw extends Vi{constructor(e){super(e),this.emitter_=new Ct,this.controller.value.emitter.on("change",t=>{this.emitter_.emit("change",new rs(this,t.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(e){this.controller.labelController.props.set("label",e)}get formatter(){return this.controller.valueController.props.get("formatter")}set formatter(e){this.controller.valueController.props.set("formatter",e)}get value(){return this.controller.value.rawValue}set value(e){this.controller.value.rawValue=e}on(e,t){const i=t.bind(this);return this.emitter_.on(e,r=>{i(r)},{key:t}),this}off(e,t){return this.emitter_.off(e,t),this}}const hw=(function(){return{id:"list",type:"blade",core:Mr,accept(n){const e=gt(n,t=>({options:t.required.custom(ls),value:t.required.raw,view:t.required.constant("list"),label:t.optional.string}));return e?{params:e}:null},controller(n){const e=new as(Tl(n.params.options)),t=pt(n.params.value,{constraint:e}),i=new mi(n.document,{props:new Be({options:e.values.value("options")}),value:t,viewProps:n.viewProps});return new Fi(n.document,{blade:n.blade,props:Be.fromObject({label:n.params.label}),value:t,valueController:i})},api(n){return!(n.controller instanceof Fi)||!(n.controller.valueController instanceof mi)?null:new aw(n.controller)}}})();class uw extends wh{constructor(e,t){super(e,t)}get element(){return this.controller.view.element}}class pw extends qa{constructor(e,t){super(e,{expanded:t.expanded,blade:t.blade,props:t.props,root:!0,viewProps:t.viewProps})}}const vd=$e("spr");class fw{constructor(e,t){this.element=e.createElement("div"),this.element.classList.add(vd()),t.viewProps.bindClassModifiers(this.element);const i=e.createElement("hr");i.classList.add(vd("r")),this.element.appendChild(i)}}class bd extends lo{constructor(e,t){super(Object.assign(Object.assign({},t),{view:new fw(e,{viewProps:t.viewProps})}))}}const mw={id:"separator",type:"blade",core:Mr,accept(n){const e=gt(n,t=>({view:t.required.constant("separator")}));return e?{params:e}:null},controller(n){return new bd(n.document,{blade:n.blade,viewProps:n.viewProps})},api(n){return n.controller instanceof bd?new lw(n.controller):null}},xw={id:"slider",type:"blade",core:Mr,accept(n){const e=gt(n,t=>({max:t.required.number,min:t.required.number,view:t.required.constant("slider"),format:t.optional.function,label:t.optional.string,value:t.optional.number}));return e?{params:e}:null},controller(n){var e,t;const i=(e=n.params.value)!==null&&e!==void 0?e:0,r=new is({max:n.params.max,min:n.params.min}),s=pt(i,{constraint:r}),o=new to(n.document,Object.assign(Object.assign({},Ph({formatter:(t=n.params.format)!==null&&t!==void 0?t:D_,keyScale:pt(1),max:r.values.value("max"),min:r.values.value("min"),pointerScale:lh(n.params,i)})),{parser:Kn,value:s,viewProps:n.viewProps}));return new Fi(n.document,{blade:n.blade,props:Be.fromObject({label:n.params.label}),value:s,valueController:o})},api(n){return!(n.controller instanceof Fi)||!(n.controller.valueController instanceof to)?null:new cw(n.controller)}},gw=(function(){return{id:"text",type:"blade",core:Mr,accept(n){const e=gt(n,t=>({parse:t.required.function,value:t.required.raw,view:t.required.constant("text"),format:t.optional.function,label:t.optional.string}));return e?{params:e}:null},controller(n){var e;const t=pt(n.params.value),i=new Zr(n.document,{parser:n.params.parse,props:Be.fromObject({formatter:(e=n.params.format)!==null&&e!==void 0?e:(r=>String(r))}),value:t,viewProps:n.viewProps});return new Fi(n.document,{blade:n.blade,props:Be.fromObject({label:n.params.label}),value:t,valueController:i})},api(n){return!(n.controller instanceof Fi)||!(n.controller.valueController instanceof Zr)?null:new dw(n.controller)}}})();function _w(n){const e=n.createElement("div");return e.classList.add($e("dfw")()),n.body&&n.body.appendChild(e),e}function vw(n,e,t){if(n.querySelector(`style[data-tp-style=${e}]`))return;const i=n.createElement("style");i.dataset.tpStyle=e,i.textContent=t,n.head.appendChild(i)}class bw extends uw{constructor(e){var t,i;const r=e??{},s=(t=r.document)!==null&&t!==void 0?t:W_(),o=ow(),a=new pw(s,{expanded:r.expanded,blade:Er(),props:Be.fromObject({title:r.title}),viewProps:Jn.create()});super(a,o),this.pool_=o,this.containerElem_=(i=r.container)!==null&&i!==void 0?i:_w(s),this.containerElem_.appendChild(this.element),this.doc_=s,this.usesDefaultWrapper_=!r.container,this.setUpDefaultPlugins_()}get document(){if(!this.doc_)throw St.alreadyDisposed();return this.doc_}dispose(){const e=this.containerElem_;if(!e)throw St.alreadyDisposed();if(this.usesDefaultWrapper_){const t=e.parentElement;t&&t.removeChild(e)}this.containerElem_=null,this.doc_=null,super.dispose()}registerPlugin(e){e.css&&vw(this.document,`plugin-${e.id}`,e.css),("plugin"in e?[e.plugin]:"plugins"in e?e.plugins:[]).forEach(i=>{this.pool_.register(e.id,i)})}setUpDefaultPlugins_(){this.registerPlugin({id:"default",css:'.tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{display:block;height:16px;inset:0;margin:auto;opacity:0;position:absolute;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{inset:0;position:absolute}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;inset:0;position:absolute}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);content:"";display:block;inset:0;position:absolute}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin:auto;position:absolute}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin-bottom:auto;margin-top:auto;position:absolute}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);content:"";inset:0 0 2px;pointer-events:none;position:absolute}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}',plugins:[hw,mw,xw,Mh,gw]})}}new Sh("4.0.5");let ht,Xe,bt,rt,Dt,Sd,es="perspective",Fe=[],pn=[],nn=-1;const Sw=10;let Tn=null,ho=!1,qs=0,$s=performance.now(),Mn=[];const ea=30,wd=500,yd=1e3;let Md=0;const ww=3e4,J={zSpacing:100,bgColor:"#000000",cameraMode:"perspective",cameraFOV:75,cameraZoom:1,transparentBg:!1,materialRoughness:.7,materialMetalness:.1,materialThickness:1,materialBorderWidth:0,materialBorderColor:"#ffffff"};let Vt;function yw(){const n=[],e=document.createElement("canvas");if(e.getContext("webgl")||e.getContext("experimental-webgl")||n.push("WebGL is not supported by your browser"),window.FileReader||n.push("FileReader API is not supported by your browser"),e.toDataURL||n.push("Canvas export is not supported by your browser"),n.length>0){const i=document.createElement("div");return i.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 10000;
        `,i.innerHTML=`
            <h2 style="margin-top: 0;">Browser Not Supported</h2>
            <p>Vexy Stax requires the following features:</p>
            <ul style="text-align: left;">
                ${n.map(r=>`<li>${r}</li>`).join("")}
            </ul>
            <p>Please use a modern browser like Chrome, Firefox, or Safari.</p>
        `,document.body.appendChild(i),console.error("Capability check failed:",n),!1}return console.log("✓ All required browser capabilities detected"),!0}function Mw(){if(!yw())return;ou(),Sd=document.getElementById("canvas"),ht=new Np,ht.background=new qe(J.bgColor);const n=window.innerWidth/window.innerHeight;Xe=new un(J.cameraFOV,n,.1,5e3),Xe.position.set(0,0,800),Xe.lookAt(0,0,0),Xe.zoom=J.cameraZoom;const e=600;bt=new ul(e*n/-2,e*n/2,e/2,e/-2,.1,5e3),bt.position.set(0,0,800),bt.lookAt(0,0,0),bt.zoom=J.cameraZoom,rt=new Og({canvas:Sd,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),rt.setSize(window.innerWidth,window.innerHeight),rt.setPixelRatio(window.devicePixelRatio),rt.shadowMap.enabled=!0,rt.shadowMap.type=Ja,rt.setClearColor(0,1),Ew(),Dt=new kg(Xe,rt.domElement),Dt.enableDamping=!0,Dt.dampingFactor=.05,Dt.minDistance=100,Dt.maxDistance=3e3,Ow(),Nw(),console.log("Initialization complete - UI should be visible"),Pw(),Cw(),Tw(),Aw(),Rw(),Lw(),pu(),console.log("Vexy Stax initialized")}function Ew(){const n=new qp(16777215,.4);ht.add(n);const e=new wc(16777215,.8);e.position.set(5,10,7),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.near=.5,e.shadow.camera.far=500,e.shadow.camera.left=-500,e.shadow.camera.right=500,e.shadow.camera.top=500,e.shadow.camera.bottom=-500,ht.add(e);const t=new wc(16777215,.3);t.position.set(-5,5,-5),ht.add(t),console.log("Lighting setup complete")}function Cw(){let n=null;function e(){const i=document.createElement("div");return i.id="keyboard-help",i.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 400px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 10000;
            display: none;
        `,i.innerHTML=`
            <h2 style="margin-top: 0;">Keyboard Shortcuts</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + E</kbd></td><td>Export PNG</td></tr>
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Z</kbd></td><td>Undo</td></tr>
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Shift + Z</kbd></td><td>Redo</td></tr>
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Delete</kbd></td><td>Clear all images</td></tr>
                <tr><td style="padding: 8px;"><kbd>?</kbd></td><td>Show this help</td></tr>
                <tr><td style="padding: 8px;"><kbd>Esc</kbd></td><td>Close help</td></tr>
            </table>
            <p style="margin-bottom: 0; margin-top: 20px; text-align: center; font-size: 0.9em; opacity: 0.7;">Press Esc or ? to close</p>
        `,document.body.appendChild(i),i}function t(){n||(n=e()),n.style.display==="none"?(n.style.display="block",console.log("Keyboard shortcuts help shown")):(n.style.display="none",console.log("Keyboard shortcuts help hidden"))}window.addEventListener("keydown",i=>{if(i.key==="?"||i.key==="/"){i.preventDefault(),t();return}if(i.key==="Escape"){n&&n.style.display==="block"&&(n.style.display="none",console.log("Help closed"));return}if((i.ctrlKey||i.metaKey)&&i.key==="e"&&!i.shiftKey){i.preventDefault(),console.log("Keyboard shortcut: Export PNG (Ctrl/Cmd+E)"),Vr(1);return}if((i.ctrlKey||i.metaKey)&&i.key==="z"&&!i.shiftKey){i.preventDefault(),console.log("Keyboard shortcut: Undo (Ctrl/Cmd+Z)"),ru();return}if((i.ctrlKey||i.metaKey)&&i.key==="z"&&i.shiftKey){i.preventDefault(),console.log("Keyboard shortcut: Redo (Ctrl/Cmd+Shift+Z)"),su();return}if((i.ctrlKey||i.metaKey)&&(i.key==="Delete"||i.key==="Backspace")){i.preventDefault(),Fe.length>0&&confirm("Clear all images? This cannot be undone.")&&(console.log("Keyboard shortcut: Clear all (Ctrl/Cmd+Delete)"),ps());return}}),console.log("Keyboard shortcuts enabled (Ctrl/Cmd+E, Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z, Ctrl/Cmd+Delete, ?)")}function Tw(){window.vexyStax={exportPNG:(n=1)=>{console.log(`[API] Exporting PNG at ${n}x`),Vr(n)},clearAll:()=>{console.log("[API] Clearing all images"),ps()},getImageStack:()=>{const n=Fe.map((e,t)=>({index:t,filename:e.filename,width:e.texture.image.width,height:e.texture.image.height,position:{x:e.mesh.position.x,y:e.mesh.position.y,z:e.mesh.position.z}}));return console.log("[API] Image stack:",n),n},loadSettings:()=>(console.log("[API] Loading settings"),ou()),saveSettings:()=>{console.log("[API] Saving settings"),Ci()},resetSettings:()=>{console.log("[API] Resetting settings to defaults"),au()},undo:()=>{console.log("[API] Undo"),ru()},redo:()=>{console.log("[API] Redo"),su()},showFPS:n=>{console.log(`[API] FPS display: ${n?"enabled":"disabled"}`),Iw(n)},getStats:()=>{const n=Mn.length>0?Math.round(Mn.reduce((t,i)=>t+i,0)/Mn.length):null,e={imageCount:Fe.length,totalPixels:Fe.reduce((t,i)=>{const r=i.texture.image;return t+r.width*r.height},0),estimatedMemoryMB:Fe.reduce((t,i)=>{const r=i.texture.image;return t+r.width*r.height*4/(1024*1024)},0).toFixed(2),cameraMode:J.cameraMode,currentSettings:{cameraMode:J.cameraMode,cameraFOV:J.cameraFOV,cameraZoom:J.cameraZoom,bgColor:J.bgColor,transparentBg:J.transparentBg,zSpacing:J.zSpacing},performance:{fpsMonitorEnabled:ho,currentFPS:n,historySize:`${nn+1}/${pn.length}`}};return console.log("[API] Stats:",e),e},help:()=>{console.log(`
%cVexy Stax Debug API
%c
Available commands:
  vexyStax.exportPNG(scale)  - Export PNG at 1x, 2x, 3x, or 4x resolution
  vexyStax.clearAll()        - Remove all images
  vexyStax.getImageStack()   - Get info about loaded images
  vexyStax.undo()            - Undo last change
  vexyStax.redo()            - Redo last undone change
  vexyStax.showFPS(enabled)  - Toggle FPS counter (true/false)
  vexyStax.loadSettings()    - Load settings from localStorage
  vexyStax.saveSettings()    - Save current settings
  vexyStax.resetSettings()   - Reset to default settings
  vexyStax.getStats()        - Get memory and image statistics
  vexyStax.help()            - Show this help

Example usage:
  vexyStax.exportPNG(2)      // Export at 2x resolution
  vexyStax.showFPS(true)     // Enable FPS counter
  vexyStax.undo()            // Undo last action
  vexyStax.getStats()        // Check current state
            `,"color: #00ff00; font-size: 16px; font-weight: bold","color: #ccc")}},console.log("%c[Debug API] Type vexyStax.help() for available commands","color: #00ff00")}function Aw(){window.addEventListener("beforeunload",()=>{console.log("[Cleanup] Disposing Three.js resources...");try{Fe.forEach(n=>{n.mesh&&(n.mesh.geometry&&n.mesh.geometry.dispose(),n.mesh.material&&(n.mesh.material.map&&n.mesh.material.map.dispose(),n.mesh.material.dispose()),ht.remove(n.mesh))}),Fe=[],Dt&&Dt.dispose(),rt&&(rt.dispose(),rt.forceContextLoss()),ht&&ht.clear(),console.log("[Cleanup] All resources disposed successfully")}catch(n){console.error("[Cleanup] Error during cleanup:",n)}}),console.log("[Cleanup] Resource cleanup handler registered")}function Pw(){let n=null;const e=150,t=()=>{n&&clearTimeout(n),n=setTimeout(()=>{jw(),console.log("[Resize] Debounced resize executed"),n=null},e)};window.addEventListener("resize",t),console.log(`[Resize] Debounced resize handler registered (${e}ms delay)`)}function Rw(){const n=rt.domElement;n.addEventListener("webglcontextlost",e=>{e.preventDefault(),console.warn("[WebGL] Context lost - GPU reset detected");const t=document.createElement("div");t.id="webgl-context-lost-message",t.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 165, 0, 0.95);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `,t.textContent="⚠️ Graphics context lost - recovering...",document.body.appendChild(t)}),n.addEventListener("webglcontextrestored",()=>{console.log("[WebGL] Context restored - reinitializing renderer");const e=document.getElementById("webgl-context-lost-message");e&&e.remove(),rt.setSize(window.innerWidth,window.innerHeight),rt.setPixelRatio(window.devicePixelRatio),rt.shadowMap.enabled=!0,rt.shadowMap.type=Ja,rt.setClearColor(J.bgColor,J.transparentBg?0:1),Fe.forEach((i,r)=>{console.log(`[WebGL] Reloading texture ${r+1}/${Fe.length}: ${i.filename}`),i.texture&&i.texture.image&&(i.texture.needsUpdate=!0)}),console.log("[WebGL] Context restoration complete");const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(40, 167, 69, 0.95);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `,t.textContent="✓ Graphics recovered successfully",document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3)}),console.log("[WebGL] Context loss/restore handlers registered")}function Lw(){Tn=document.createElement("div"),Tn.id="fps-display",Tn.style.cssText=`
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #00ff00;
        padding: 8px 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        z-index: 9999;
        display: none;
        min-width: 120px;
    `,document.body.appendChild(Tn),console.log("[FPS] Performance monitor initialized (use vexyStax.showFPS(true) to enable)")}function Dw(){if(!ho)return;const n=performance.now();if(qs++,n>=$s+1e3){const e=Math.round(qs*1e3/(n-$s));Mn.push(e),Mn.length>5&&Mn.shift();const t=Math.round(Mn.reduce((r,s)=>r+s,0)/Mn.length);let i="#00ff00";t<ea?i="#ff0000":t<50&&(i="#ffaa00"),Tn.style.color=i,Tn.innerHTML=`FPS: ${e}<br>Avg: ${t}`,t<ea&&Mn.length>=3&&console.warn(`[FPS] Performance warning: Average FPS ${t} below threshold ${ea}`),qs=0,$s=n}}function Iw(n){ho=n,Tn.style.display=n?"block":"none",n?(console.log("[FPS] Counter enabled"),qs=0,$s=performance.now(),Mn=[]):console.log("[FPS] Counter disabled")}function Uw(){let n=0;return Fe.forEach(e=>{if(e.texture&&e.texture.image){const t=e.texture.image.width,i=e.texture.image.height;n+=t*i*4}}),n/(1024*1024)}function iu(n=!1){const e=Uw(),t=Date.now();if(console.log(`[Memory] Current usage: ${e.toFixed(2)} MB (${Fe.length} images)`),e>=yd){const i=`Critical memory usage: ${e.toFixed(0)} MB!

Loading more images may cause browser slowdown or crash.

Continue anyway?`;return console.warn(`[Memory] CRITICAL: ${e.toFixed(2)} MB >= ${yd} MB`),n?confirm(i):(sn(`⚠️ Critical memory: ${e.toFixed(0)} MB`,"error",5e3),!0)}if(e>=wd&&t-Md>ww&&(console.warn(`[Memory] Warning: ${e.toFixed(2)} MB >= ${wd} MB`),sn(`⚠️ High memory usage: ${e.toFixed(0)} MB. Consider reducing image count.`,"warning",4e3),Md=t),ho&&Tn){const i=Tn.innerHTML,r=`<br><small style="opacity: 0.7">${e.toFixed(0)}MB</small>`;i.includes("MB")||(Tn.innerHTML+=r)}return!0}function Vl(){pn=pn.slice(0,nn+1);const n={timestamp:Date.now(),images:Fe.map(e=>({filename:e.filename,width:e.width,height:e.height,position:{...e.mesh.position},texture:e.texture,mesh:e.mesh}))};pn.push(n),nn++,pn.length>Sw&&(pn.shift(),nn--),console.log(`[History] Saved state (${nn+1}/${pn.length})`)}function ru(){if(nn<=0){console.log("[History] Nothing to undo"),sn("⚠️ Nothing to undo","warning");return}nn--;const n=pn[nn];Fe.forEach(e=>{ht.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),Fe=[],n.images.forEach(e=>{Fe.push({filename:e.filename,width:e.width,height:e.height,texture:e.texture,mesh:e.mesh}),ht.add(e.mesh),e.mesh.position.copy(e.position)}),Hi(),console.log(`[History] Undo to state ${nn+1}/${pn.length}`),sn("↶ Undo applied","success")}function su(){if(nn>=pn.length-1){console.log("[History] Nothing to redo"),sn("⚠️ Nothing to redo","warning");return}nn++;const n=pn[nn];Fe.forEach(e=>{ht.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),Fe=[],n.images.forEach(e=>{Fe.push({filename:e.filename,width:e.width,height:e.height,texture:e.texture,mesh:e.mesh}),ht.add(e.mesh),e.mesh.position.copy(e.position)}),Hi(),console.log(`[History] Redo to state ${nn+1}/${pn.length}`),sn("↷ Redo applied","success")}function sn(n,e="info",t=3e3){const i=document.createElement("div");i.style.cssText=`
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;const r={success:{bg:"rgba(40, 167, 69, 0.95)",text:"white"},error:{bg:"rgba(220, 53, 69, 0.95)",text:"white"},warning:{bg:"rgba(255, 193, 7, 0.95)",text:"black"},info:{bg:"rgba(23, 162, 184, 0.95)",text:"white"}},s=r[e]||r.info;i.style.background=s.bg,i.style.color=s.text,i.textContent=n,document.body.appendChild(i),setTimeout(()=>{i.style.animation="slideOut 0.3s ease-in",setTimeout(()=>i.remove(),300)},t)}function ou(){try{if(!window.localStorage)return console.warn("localStorage not available"),!1;const n=localStorage.getItem("vexy-stax-settings");if(!n)return console.log("No saved settings found"),!1;const e=JSON.parse(n);return e.cameraMode!==void 0&&(J.cameraMode=e.cameraMode),e.cameraFOV!==void 0&&(J.cameraFOV=e.cameraFOV),e.cameraZoom!==void 0&&(J.cameraZoom=e.cameraZoom),e.bgColor!==void 0&&(J.bgColor=e.bgColor),e.transparentBg!==void 0&&(J.transparentBg=e.transparentBg),e.zSpacing!==void 0&&(J.zSpacing=e.zSpacing),console.log("Settings loaded from localStorage:",e),!0}catch(n){return console.error("Failed to load settings:",n),!1}}function Ci(){try{if(!window.localStorage){console.warn("localStorage not available");return}const n={cameraMode:J.cameraMode,cameraFOV:J.cameraFOV,cameraZoom:J.cameraZoom,bgColor:J.bgColor,transparentBg:J.transparentBg,zSpacing:J.zSpacing};localStorage.setItem("vexy-stax-settings",JSON.stringify(n)),console.log("Settings saved to localStorage")}catch(n){if(n.name==="QuotaExceededError"||n.code===22)if(console.error("localStorage quota exceeded"),confirm(`Storage quota full!

Cannot save settings because browser storage is full.

Click OK to clear Vexy Stax storage and try again, or Cancel to continue without saving.`))try{localStorage.removeItem("vexy-stax-settings"),console.log("Cleared storage, retrying save..."),localStorage.setItem("vexy-stax-settings",JSON.stringify(settings)),console.log("Settings saved successfully after clearing storage"),alert("Storage cleared and settings saved!")}catch(t){console.error("Failed to save even after clearing:",t),alert("Still unable to save settings. Try closing other tabs or clearing browser data.")}else console.warn("User declined to clear storage - settings not saved");else console.error("Failed to save settings:",n.name,n.message)}}function au(){J.cameraMode="perspective",J.cameraFOV=75,J.cameraZoom=1,J.bgColor="#000000",J.transparentBg=!1,J.zSpacing=100,Vt&&Vt.refresh(),cu(J.cameraMode),lu(J.cameraZoom),no(),du(J.zSpacing);try{window.localStorage&&(localStorage.removeItem("vexy-stax-settings"),console.log("Settings reset to defaults and cleared from localStorage"))}catch(n){console.error("Failed to clear settings:",n)}}function Nw(){const n=document.getElementById("controls");if(!n){console.error("Controls container not found!");return}Vt=new bw({title:"Vexy-Stax Controls",container:n,expanded:!0}),console.log("Tweakpane created successfully");const e=Vt.addFolder({title:"Camera",expanded:!0});e.addBinding(J,"cameraMode",{label:"Mode",options:{Perspective:"perspective",Orthographic:"orthographic",Isometric:"isometric",Telephoto:"telephoto"}}).on("change",a=>{cu(a.value),Ci()}),e.addBinding(J,"cameraZoom",{label:"Zoom",min:.1,max:3,step:.1}).on("change",a=>{lu(a.value),Ci()}),e.addBinding(J,"cameraFOV",{label:"FOV",min:15,max:120,step:5}).on("change",a=>{(es==="perspective"||es==="telephoto")&&(Xe.fov=a.value,Xe.updateProjectionMatrix()),Ci()}),Vt.addBinding(J,"zSpacing",{label:"Z-Spacing",min:0,max:500,step:10}).on("change",a=>{du(a.value),Ci()}),Vt.addBinding(J,"bgColor",{label:"Background"}).on("change",a=>{no(),Ci()}),Vt.addBinding(J,"transparentBg",{label:"Transparent BG"}).on("change",a=>{no(),Ci()});const t=Vt.addFolder({title:"Viewpoints"});t.addButton({title:"Center"}).on("click",Fw),t.addButton({title:"Front"}).on("click",()=>{Br(0,0,800)}),t.addButton({title:"Top"}).on("click",()=>{Br(0,800,100)}),t.addButton({title:"Isometric"}).on("click",()=>{Br(500,500,500)}),t.addButton({title:"3D Stack View"}).on("click",()=>{Br(400,300,600)}),t.addButton({title:"Side"}).on("click",()=>{Br(800,0,0)});const i=Vt.addFolder({title:"Export"}),r=i.addFolder({title:"PNG",expanded:!1});r.addButton({title:"1x"}).on("click",Vr),r.addButton({title:"2x"}).on("click",()=>Vr(2)),r.addButton({title:"4x"}).on("click",()=>Vr(4));const s=i.addFolder({title:"JSON",expanded:!1});s.addButton({title:"Export"}).on("click",qw),s.addButton({title:"Import"}).on("click",()=>{const a=document.createElement("input");a.type="file",a.accept=".json",a.onchange=l=>$w(l.target.files[0]),a.click()}),s.addButton({title:"Copy"}).on("click",Yw),s.addButton({title:"Paste"}).on("click",Kw);const o=Vt.addFolder({title:"Materials",expanded:!1});o.addButton({title:"Flat Matte"}).on("click",()=>{zn({roughness:1,metalness:0,thickness:1,borderWidth:0})}),o.addButton({title:"Glossy Photo"}).on("click",()=>{zn({roughness:.1,metalness:0,thickness:1,borderWidth:0})}),o.addButton({title:"Plastic Card"}).on("click",()=>{zn({roughness:.4,metalness:.1,thickness:2,borderWidth:0})}),o.addButton({title:"Thick Board"}).on("click",()=>{zn({roughness:.9,metalness:0,thickness:8,borderWidth:0})}),o.addButton({title:"Metal Sheet"}).on("click",()=>{zn({roughness:.2,metalness:.8,thickness:1,borderWidth:0})}),o.addButton({title:"Glass Slide"}).on("click",()=>{zn({roughness:.05,metalness:0,thickness:1,borderWidth:0})}),o.addButton({title:"Matte Print"}).on("click",()=>{zn({roughness:.7,metalness:0,thickness:1,borderWidth:0})}),o.addButton({title:"Bordered"}).on("click",()=>{zn({roughness:.2,metalness:0,thickness:1,borderWidth:20})}),o.addButton({title:"3D Box"}).on("click",()=>{zn({roughness:.6,metalness:0,thickness:15,borderWidth:0})}),Vt.addButton({title:"Reset to Defaults"}).on("click",()=>{confirm("Reset all settings to defaults? This will clear saved preferences.")&&au()}),Vt.addButton({title:"Clear All"}).on("click",ps)}function Vr(n=1){(typeof n!="number"||n<1||n>4)&&(console.warn(`Invalid scale parameter: ${n}. Using 1x instead.`),n=1),console.log(`Exporting PNG at ${n}x resolution...`);let e=null;n>=2&&(e=document.createElement("div"),e.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 10000;
        `,e.innerHTML=`
            <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 10px;">Exporting...</div>
                <div style="font-size: 16px; opacity: 0.7;">Rendering at ${n}x resolution</div>
                <div style="margin-top: 20px; font-size: 14px; opacity: 0.5;">Please wait...</div>
            </div>
        `,document.body.appendChild(e)),setTimeout(()=>{try{const t=window.innerWidth,i=window.innerHeight,r=rt.getPixelRatio();n>1&&rt.setPixelRatio(r*n);const s=zl();rt.render(ht,s);const o=rt.domElement.toDataURL("image/png");if(!o||!o.startsWith("data:image/png"))throw new Error("Failed to generate PNG data");const c=((o.length-22)*3/4/(1024*1024)).toFixed(2),d=document.createElement("a"),h=new Date().toISOString().replace(/[:.]/g,"-").slice(0,-5),p=`vexy-stax-${n}x-${h}.png`;d.download=p,d.href=o,document.body.appendChild(d);let f=!1;try{d.click(),f=!0}catch(b){throw console.error("[Export] Download failed:",b),new Error("Failed to trigger download")}finally{document.body.removeChild(d)}n>1&&(rt.setPixelRatio(r),rt.render(ht,s));const _=`${rt.domElement.width}x${rt.domElement.height}px`;console.log(`[Export] PNG exported successfully: ${p} (${_}, ~${c} MB)`),f&&sn(`✓ Exported: ${p} (${c} MB)`,"success",3e3)}catch(t){console.error("[Export] Export failed:",t),sn(`❌ Export failed: ${t.message}`,"error",5e3)}finally{e&&document.body.removeChild(e)}},100)}function zl(){return es==="orthographic"||es==="isometric"?bt:Xe}function lu(n){J.cameraZoom=n,Xe.zoom=n,Xe.updateProjectionMatrix(),bt.zoom=n,bt.updateProjectionMatrix(),console.log(`Zoom updated to ${n.toFixed(1)}x`)}function Fw(){if(Fe.length===0){console.log("No content to center on");return}const n=new Sr;Fe.forEach(r=>{n.expandByObject(r.mesh)});const e=new N;n.getCenter(e),Dt.target.copy(e);const t=zl(),i=new N().subVectors(t.position,new N(0,0,0));t.position.copy(e).add(i),t.lookAt(e),Dt.update(),console.log(`Centered view on content at (${e.x.toFixed(1)}, ${e.y.toFixed(1)}, ${e.z.toFixed(1)})`)}function cu(n){es=n,console.log(`Switching to ${n} camera mode`),n==="orthographic"?(bt.position.set(0,0,800),bt.lookAt(0,0,0),bt.zoom=J.cameraZoom,bt.updateProjectionMatrix(),Dt.object=bt):n==="isometric"?(bt.position.set(500,500,500),bt.lookAt(0,0,0),bt.zoom=J.cameraZoom,bt.updateProjectionMatrix(),Dt.object=bt):n==="telephoto"?(J.cameraFOV=30,Xe.fov=30,Xe.position.set(0,0,1500),Xe.lookAt(0,0,0),Xe.zoom=J.cameraZoom,Xe.updateProjectionMatrix(),Dt.object=Xe,Vt.refresh()):(Xe.position.set(0,0,800),Xe.lookAt(0,0,0),Xe.zoom=J.cameraZoom,Xe.updateProjectionMatrix(),Dt.object=Xe),Dt.update()}function no(){J.transparentBg?(ht.background=null,rt.setClearColor(0,0)):(ht.background=new qe(J.bgColor),rt.setClearColor(J.bgColor,1))}function du(n){Fe.forEach((e,t)=>{e.mesh.position.z=t*n}),console.log(`Z-spacing updated to ${n}px`)}function Br(n,e,t){Xe.position.set(n,e,t),Xe.lookAt(0,0,0),Dt.update(),console.log(`Viewpoint set to (${n}, ${e}, ${t})`)}function ps(){Vl(),Fe.forEach(n=>{ht.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),n.mesh.material.map&&n.mesh.material.map.dispose()}),Fe=[],Hi(),console.log("All images cleared"),sn("🗑️ All images cleared","info")}function Ow(){const n=document.getElementById("image-input"),e=document.getElementById("drop-zone");n.addEventListener("change",kw),e.addEventListener("dragover",t=>{t.preventDefault(),e.classList.add("drag-over")}),e.addEventListener("dragleave",()=>{e.classList.remove("drag-over")}),e.addEventListener("drop",t=>{t.preventDefault(),e.classList.remove("drag-over");const i=t.dataTransfer.files;i.length>0&&Bw(i)})}function Bw(n){console.log(`Dropped ${n.length} file(s)...`);let e=0,t=0;for(let i=0;i<n.length;i++){const r=n[i];if(!hu(r)){t++;continue}e++,uu(r)}t>0&&console.warn(`[Validation] ${t} file(s) rejected, ${e} accepted from drop`)}function hu(n){if(!["image/png","image/jpeg","image/jpg","image/gif","image/webp","image/svg+xml"].includes(n.type)){const t=n.name.split(".").pop().toLowerCase();return console.error(`[Validation] Unsupported file type: ${n.name} (${n.type||"unknown type"})`),sn(`❌ Unsupported file type: .${t} (only images supported)`,"error",4e3),!1}return!0}function kw(n){const e=n.target.files;if(!e||e.length===0){console.warn("No files selected");return}console.log(`Loading ${e.length} file(s)...`);let t=0,i=0;for(let r=0;r<e.length;r++){const s=e[r];if(!hu(s)){i++;continue}t++,uu(s)}i>0&&console.warn(`[Validation] ${i} file(s) rejected, ${t} accepted`)}function zn(n){J.materialRoughness=n.roughness,J.materialMetalness=n.metalness,J.materialThickness=n.thickness,J.materialBorderWidth=n.borderWidth,console.log(`Applying material preset: roughness=${n.roughness}, metalness=${n.metalness}, thickness=${n.thickness}, border=${n.borderWidth}`),Fe.forEach((e,t)=>{const i=e.mesh.material.map,r=e.width,s=e.height;ht.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();let o;J.materialThickness>1?o=new ki(r,s,J.materialThickness):o=new Ln(r,s);const a=new qr({map:i,side:zt,transparent:!0,roughness:J.materialRoughness,metalness:J.materialMetalness}),l=new Kt(o,a);if(l.castShadow=!0,l.receiveShadow=!0,l.position.z=t*J.zSpacing,J.materialBorderWidth>0){const c=r+J.materialBorderWidth*2,d=s+J.materialBorderWidth*2,h=new Ln(c,d),p=new qr({color:J.materialBorderColor,side:zt,roughness:J.materialRoughness,metalness:J.materialMetalness}),f=new Kt(h,p);f.position.z=-.5,f.castShadow=!0,f.receiveShadow=!0,l.add(f)}e.mesh=l,ht.add(l)}),console.log(`Material applied to ${Fe.length} images`)}function uu(n){if(n.size>52428800){console.error(`File ${n.name} is too large (${(n.size/1024/1024).toFixed(1)}MB). Maximum size is 50MB.`),alert(`File "${n.name}" is too large (${(n.size/1024/1024).toFixed(1)}MB).
Maximum supported size is 50MB.
Please use a smaller image.`);return}if(n.size>10485760&&(console.warn(`Warning: File ${n.name} is large (${(n.size/1024/1024).toFixed(1)}MB). This may affect performance.`),!confirm(`File "${n.name}" is ${(n.size/1024/1024).toFixed(1)}MB.
Large files may slow down the application.
Continue loading?`)))return;const i=new FileReader;i.onload=function(s){const o=s.target.result;r(o,n.name,0)};function r(s,o,a){const c=[500,1500,3e3];new hl().load(s,function(h){const p=h.image,f=4096;(p.width>f||p.height>f)&&(console.warn(`Warning: Image ${o} has large dimensions (${p.width}x${p.height}). Max recommended: ${f}px.`),alert(`Warning: Image "${o}" is ${p.width}x${p.height}px.
Images larger than ${f}px may cause performance issues.
The image will be loaded but may render slowly.`)),a>0&&console.log(`[Retry] Successfully loaded ${o} on attempt ${a+1}`),Vw(h,o)},void 0,function(h){if(a<3){const p=c[a];console.warn(`[Retry] Failed to load ${o} (attempt ${a+1}/4). Retrying in ${p}ms...`,h),setTimeout(()=>{r(s,o,a+1)},p)}else console.error(`[Retry] Failed to load ${o} after 4 attempts:`,h),alert(`Failed to load image "${o}" after 4 attempts.
Please check the file is a valid image or try again.`)})}i.onerror=function(s){console.error(`Failed to read file ${n.name}:`,s),alert(`Failed to read file "${n.name}".
${s.message||"Unknown error"}`)},i.readAsDataURL(n)}function Vw(n,e){if(!iu(!0)){console.log("[Memory] User declined to add image due to high memory usage"),sn("❌ Image not added (memory limit)","warning");return}Vl();const t=n.image,i=t.width,r=t.height,s=400;let o=i,a=r;i>r?i>s&&(o=s,a=r/i*s):r>s&&(a=s,o=i/r*s);let l;J.materialThickness>1?l=new ki(o,a,J.materialThickness):l=new Ln(o,a);const c=new qr({map:n,side:zt,transparent:!0,roughness:J.materialRoughness,metalness:J.materialMetalness}),d=new Kt(l,c);d.castShadow=!0,d.receiveShadow=!0;let h=null;if(J.materialBorderWidth>0){const _=o+J.materialBorderWidth*2,b=a+J.materialBorderWidth*2,m=new Ln(_,b),u=new qr({color:J.materialBorderColor,side:zt,roughness:J.materialRoughness,metalness:J.materialMetalness});h=new Kt(m,u),h.position.z=-.5,h.castShadow=!0,h.receiveShadow=!0,d.add(h)}const p=Fe.length*J.zSpacing;d.position.z=p;const f={mesh:d,filename:e,width:o,height:a,originalWidth:i,originalHeight:r,id:Date.now()+Math.random()};Fe.push(f),ht.add(d),Hi(),console.log(`Added ${e} to stack at Z=${p} (${Fe.length} images total)`)}function Hi(){const n=document.getElementById("image-list");n.innerHTML="",Fe.forEach((e,t)=>{const i=document.createElement("div");i.className="image-item",i.draggable=!0,i.dataset.index=t,i.dataset.id=e.id,i.tabIndex=0,i.setAttribute("role","listitem"),i.setAttribute("aria-label",`Image ${t+1}: ${e.filename}, ${e.originalWidth} by ${e.originalHeight} pixels`),i.innerHTML=`
            <div class="image-item-info">
                <div class="image-item-name">${t+1}. ${e.filename}</div>
                <div>${e.originalWidth}×${e.originalHeight}px</div>
            </div>
            <div class="image-item-controls">
                <button class="image-item-btn delete" onclick="deleteImage(${t})">✕</button>
            </div>
        `,i.addEventListener("dragstart",Hw),i.addEventListener("dragover",Gw),i.addEventListener("drop",Ww),i.addEventListener("dragend",Xw),i.addEventListener("keydown",zw),i.addEventListener("focus",()=>{i.style.outline="2px solid #4CAF50",i.style.outlineOffset="2px"}),i.addEventListener("blur",()=>{i.style.outline="none"}),n.appendChild(i)})}function zw(n){const e=n.currentTarget,t=parseInt(e.dataset.index),i=document.getElementById("image-list"),r=Array.from(i.children);switch(n.key){case"ArrowUp":n.preventDefault(),t>0&&r[t-1].focus();break;case"ArrowDown":n.preventDefault(),t<r.length-1&&r[t+1].focus();break;case"Delete":case"Backspace":n.preventDefault();const s=Fe[t];confirm(`Delete "${s.filename}"?`)&&(deleteImage(t),setTimeout(()=>{const a=Array.from(i.children);if(a.length>0){const l=Math.min(t,a.length-1);a[l]?.focus()}},100));break;case"Enter":n.preventDefault();const o=Fe[t].mesh;if(o){const a=o.material.emissive.getHex();o.material.emissive.setHex(4521796),setTimeout(()=>{o.material.emissive.setHex(a)},500),console.log(`[Keyboard] Highlighted image ${t+1}: ${s.filename}`),sn(`✨ Image ${t+1}: ${s.filename}`,"info",2e3)}break}}let lr=null;function Hw(n){n.target,lr=parseInt(n.target.dataset.index),n.target.classList.add("dragging")}function Gw(n){return n.preventDefault(),!1}function Ww(n){n.preventDefault();const e=parseInt(n.currentTarget.dataset.index);if(lr!==null&&lr!==e){const[t]=Fe.splice(lr,1);Fe.splice(e,0,t),Fe.forEach((i,r)=>{i.mesh.position.z=r*J.zSpacing}),Hi(),console.log(`Reordered: moved ${lr} to ${e}`)}return!1}function Xw(n){n.target.classList.remove("dragging"),lr=null}window.deleteImage=function(n){Vl();const e=Fe[n];ht.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),e.mesh.material.map&&e.mesh.material.map.dispose(),Fe.splice(n,1),Fe.forEach((t,i)=>{t.mesh.position.z=i*J.zSpacing}),Hi(),console.log(`Deleted image at index ${n}`),sn(`🗑️ Deleted ${e.filename}`,"info"),iu(!1)};function jw(){const n=window.innerWidth/window.innerHeight;Xe.aspect=n,Xe.updateProjectionMatrix();const e=600;bt.left=e*n/-2,bt.right=e*n/2,bt.top=e/2,bt.bottom=e/-2,bt.updateProjectionMatrix(),rt.setSize(window.innerWidth,window.innerHeight)}function pu(){requestAnimationFrame(pu),Dw(),Dt.update();const n=zl();rt.render(ht,n)}function qw(){console.log("Exporting JSON configuration...");const n={version:"1.0",params:{zSpacing:J.zSpacing,bgColor:J.bgColor},camera:{position:{x:Xe.position.x,y:Xe.position.y,z:Xe.position.z}},images:[]};Fe.forEach(o=>{const a=o.mesh.material.map;if(a&&a.image){const l=document.createElement("canvas");l.width=a.image.width,l.height=a.image.height,l.getContext("2d").drawImage(a.image,0,0);const d=l.toDataURL("image/png");n.images.push({filename:o.filename,dataURL:d,width:o.width,height:o.height})}});const e=JSON.stringify(n,null,2),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),r=document.createElement("a"),s=new Date().toISOString().replace(/[:.]/g,"-").slice(0,-5);r.download=`vexy-stax-config-${s}.json`,r.href=i,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i),console.log(`JSON exported successfully as ${r.download}`)}function $w(n){if(!n){console.error("No file provided for import");return}console.log(`Importing JSON configuration from ${n.name}...`);const e=new FileReader;e.onload=function(t){try{const i=JSON.parse(t.target.result);if(!i.version||!i.params||!i.images)throw new Error("Invalid config format");ps(),J.zSpacing=i.params.zSpacing,J.bgColor=i.params.bgColor,ht.background=new qe(J.bgColor),i.camera&&i.camera.position&&(Xe.position.set(i.camera.position.x,i.camera.position.y,i.camera.position.z),Xe.lookAt(0,0,0),Dt.update());const r=new hl;i.images.forEach((s,o)=>{r.load(s.dataURL,a=>{const l=new Ln(s.width,s.height),c=new ll({map:a,side:zt,transparent:!0}),d=new Kt(l,c);d.position.z=o*J.zSpacing,Fe.push({mesh:d,filename:s.filename,width:s.width,height:s.height}),ht.add(d),console.log(`Loaded ${s.filename} from config`)})}),Vt.refresh(),console.log("JSON configuration imported successfully")}catch(i){console.error("Failed to import JSON:",i),alert(`Failed to import configuration: ${i.message}`)}},e.onerror=function(t){console.error("Failed to read JSON file:",t)},e.readAsText(n)}function Yw(){console.log("Copying JSON configuration to clipboard...");const n={version:"1.0",params:{zSpacing:J.zSpacing,bgColor:J.bgColor,cameraMode:J.cameraMode,cameraFOV:J.cameraFOV,transparentBg:J.transparentBg},camera:{position:{x:Xe.position.x,y:Xe.position.y,z:Xe.position.z}},images:[]};Fe.forEach(t=>{const i=t.mesh.material.map;if(i&&i.image){const r=document.createElement("canvas");r.width=i.image.width,r.height=i.image.height,r.getContext("2d").drawImage(i.image,0,0);const o=r.toDataURL("image/png");n.images.push({filename:t.filename,dataURL:o,width:t.width,height:t.height})}});const e=JSON.stringify(n,null,2);navigator.clipboard.writeText(e).then(()=>{console.log("JSON configuration copied to clipboard"),alert("Configuration copied to clipboard!")}).catch(t=>{console.error("Failed to copy to clipboard:",t),alert("Failed to copy to clipboard. Check console for details.")})}function Kw(){console.log("Pasting JSON configuration from clipboard..."),navigator.clipboard.readText().then(n=>{try{const e=JSON.parse(n);if(!e.version||!e.params||!e.images)throw new Error("Invalid config format");ps(),J.zSpacing=e.params.zSpacing,J.bgColor=e.params.bgColor,e.params.cameraMode&&(J.cameraMode=e.params.cameraMode),e.params.cameraFOV&&(J.cameraFOV=e.params.cameraFOV),e.params.transparentBg!==void 0&&(J.transparentBg=e.params.transparentBg),no(),e.camera&&e.camera.position&&(Xe.position.set(e.camera.position.x,e.camera.position.y,e.camera.position.z),Xe.lookAt(0,0,0),Dt.update());const t=new hl;e.images.forEach((i,r)=>{t.load(i.dataURL,s=>{const o=new Ln(i.width,i.height),a=new qr({map:s,side:zt,transparent:!0,roughness:.7,metalness:.1}),l=new Kt(o,a);l.castShadow=!0,l.receiveShadow=!0,l.position.z=r*J.zSpacing,Fe.push({mesh:l,filename:i.filename,width:i.width,height:i.height,originalWidth:i.width,originalHeight:i.height,id:Date.now()+Math.random()}),ht.add(l),Hi(),console.log(`Loaded ${i.filename} from clipboard`)})}),Vt.refresh(),console.log("JSON configuration pasted successfully"),alert("Configuration pasted from clipboard!")}catch(e){console.error("Failed to parse JSON from clipboard:",e),alert(`Failed to paste configuration: ${e.message}`)}}).catch(n=>{console.error("Failed to read from clipboard:",n),alert("Failed to read from clipboard. Check console for details.")})}Mw();
