"use strict";function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function _arrayWithHoles(a){if(Array.isArray(a))return a}W.loadPlugin({name:"windy-plugin-sounding",version:"0.7.1",author:"Victor Berchet",repository:{type:"git",url:"git+https://github.com/vicb/windy-plugin-sounding"},description:"Soundings for paraglider pilots.",displayName:"Better Sounding",hook:"contextmenu",dependencies:["https://cdn.jsdelivr.net/npm/preact@8/dist/preact.min.js"],className:"plugin-lhpane plugin-mobile-fullscreen",exclusive:"lhpane"},"<div class=\"plugin-content\"> <div class=\"title\">Sounding forecast <span id=\"sounding-model\"></span></div> <div id=\"sounding-chart\"></div> </div>",".onwindy-plugin-sounding .left-border{left:600px}.onwindy-plugin-sounding #search{display:none}#windy-plugin-sounding{font-size:12px;padding:1em 1em;line-height:2;z-index:100;width:600px}#windy-plugin-sounding .title{margin:0 0 .3em .6em;font-size:16px}#windy-plugin-sounding .closing-x{display:block}@media only screen and (max-device-width:736px){#windy-plugin-sounding{display:block;left:0;top:0;right:0;width:calc(100% - 20px);margin:10px}}#windy-plugin-sounding .axis path,#windy-plugin-sounding .axis line{fill:none;stroke:#000;shape-rendering:crispEdges}#windy-plugin-sounding #sounding-chart svg{width:100%;height:600px}#windy-plugin-sounding #sounding-chart .cumulus{stroke:#030104;stroke-width:2px;fill:ivory}#windy-plugin-sounding #sounding-chart .infoline{stroke-width:3;fill:none;stroke-linejoin:round}#windy-plugin-sounding #sounding-chart .infoline.dewpoint{stroke:steelblue}#windy-plugin-sounding #sounding-chart .infoline.temperature{stroke:red}#windy-plugin-sounding #sounding-chart .infoline.wind{stroke:purple}#windy-plugin-sounding #sounding-chart .infoline.parcel{stroke:darkorange;stroke-width:2}#windy-plugin-sounding #sounding-chart line.boundary{stroke-width:1;stroke-dasharray:8;stroke:gray}#windy-plugin-sounding #sounding-chart .moist{fill:none;stroke:green;stroke-width:.3;stroke-dasharray:4 6}#windy-plugin-sounding #sounding-chart .dry{fill:none;stroke:green;stroke-width:.3}#windy-plugin-sounding #sounding-chart .isohume{fill:none;stroke:blue;stroke-width:.3;stroke-dasharray:4 6}#windy-plugin-sounding #sounding-chart .parcel{stroke-width:3;stroke-dasharray:None}#windy-plugin-sounding #sounding-chart .parcel.moist,#windy-plugin-sounding #sounding-chart .parcel.dry{stroke:#599c00}#windy-plugin-sounding #sounding-chart .parcel.isohume{stroke-width:1;stroke:gray;stroke-dasharray:4}#windy-plugin-sounding #sounding-chart text.tick{font-size:12px;font-family:sans-serif;fill:black}#windy-plugin-sounding #sounding-chart .surface{fill:#8f6d4d}#windy-plugin-sounding #fly-to{padding:0 15px 0 8px}#windy-plugin-sounding #fly-to .location{border:1px solid #bbb;border-radius:1em;line-height:1em;padding:.3em .6em;user-select:none;display:inline-block;margin-right:.3em;cursor:pointer}#windy-plugin-sounding #fly-to .selected{background-color:#d49500;border-color:#d49500;color:white}",function(){var a,b=this,d=W.require("windy-plugin-sounding/soundingGraph"),e=W.require("plugins"),f=W.require("store"),g=W.require("pluginDataLoader"),h=W.require("map"),i=g({key:"QKlmnpLWr2rZSyFaT7LpxZc0d5bo34D4",plugin:"windy-plugin-sounding"}),j=null,k=e["detail-render"].load().then(function(){return W.define("sMeteogram",["meteogram","Class"],function(a,b){var c=this;return b.extend(a,{legend:function a(){return c}})}),W.require("sMeteogram")});h.setZoom(10,{animate:!1}),f.set("overlay","clouds"),this.onopen=function(e){var g,i;if(!e){var p=h.getCenter();g=p.lat,i=p.lng}else g=e.lat,i=e.lon;var k=h.getBounds(),m=k.getEast()-k.getWest(),n=i-300*(m/h.getSize().x);h.panTo({lng:n,lat:g});var o={lng:i,lat:g};j?j.setLatLng(o):j=L.marker(o,{icon:h.myMarkers.pulsatingIcon,zIndexOffset:-300}).addTo(h),d.init(g,i),l(g,i),null!=a&&f.off(a),a=f.on("product",function(){return l(g,i)}),b.node.oncontextmenu=b.node.ondblclick=b.node.onclick=function(a){return a.stopPropagation()}};var l=function(a,b){var c=/gfs|ecmwf|nam\w+|iconEu/,e=f.get("product");c.test(e)||(e="ecmwf"),document.getElementById("sounding-model").innerText=e.toUpperCase();var g={model:e,lat:a,lon:b};Promise.all([i("airData",g),i("forecast",g),k]).then(function(a){var b=_slicedToArray(a,3),c=b[0],e=b[1],f=b[2];d.load(c.data,e.data,f)})};this.onclose=function(){null!=a&&(f.off(a),a=null),j&&(h.removeLayer(j),j=null)}}),W.define("windy-plugin-sounding/soundingGraph",["overlays","broadcast","favs","store","$","utils","windy-plugin-sounding/soundingUtils","windy-plugin-sounding/atmosphere","windy-plugin-sounding/math"],function(a,b,c,f,g,e,i,j,k){var q=Math.sign,r=Math.round,s=Math.max,t=Math.min;function l(){return l=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},l.apply(this,arguments)}function n(a){var b=Number.MIN_VALUE,c=Number.MAX_VALUE,f=c,g=b,h=c,i=b,l=c,m=b,n=b,o=function(a){var b=O.data[a];b.forEach(function(a,c){0==c&&(h=t(h,a.gh),m=s(m,a.pressure)),c==b.length-1&&(i=s(i,a.gh),l=t(l,a.pressure)),f=t(f,a.dewpoint),g=s(g,a.temp);var d=e.wind2obj([a.wind_u,a.wind_v]).wind;n=s(n,d)})};for(var p in O.data)o(p);f=-30+j.celsiusToK,g=30+j.celsiusToK,u.domain([f,g]),A.domain([Q(f),Q(g)]),w.domain([0,30/3.6,n]),w.range([0,50,100]),v.domain([m,l]),B.domain([S(h),S(i)]);var d=a.map(function(a){return(O.mgCanvas.height-1)*(1-a/100)});z=k.scaleLinear().range(d).domain([1e3,950,925,900,850,800,700,600,500,400,300,200,150,100])}function o(a,b,c,d){var e=a.data["".concat(b,"-").concat(c)];return Array.isArray(e)?e[d]:null}function p(a,b,c,d){var e=o(a,"gh",b,c);return null==e?r(j.getElevation(d)):e}var u,v,w,z,A,B,C,D,E,F,G,H=g("#sounding-chart"),I=100,J=H.clientWidth-100-20-15,K=580,M=preact,N=M.h,d=M.render,h=.4,m=300,O={lat:0,lon:0,elevation:0,data:{}},P=[],Q=a.temp.convertNumber,R=a.wind.convertNumber,S=function(a){return r("ft"===f.get("metric_altitude")?3.28084*a:a)},T=function a(g,i){if(O.lat=g,O.lon=i,O.data=null,u)return void U();u=k.scaleLinear().range([0,J]),w=k.scaleLinear().range([0,I]),v=k.scaleLog().range([K,0]),A=k.scaleLinear().range([0,J]),B=k.scaleLinear().range([K,0]),C=k.line().x(function(a){return u(a.temp)+h*(K-v(a.pressure))}).y(function(a){return v(a.pressure)}),D=k.line().x(function(a){return u(a.dewpoint)+h*(K-v(a.pressure))}).y(function(a){return v(a.pressure)}),E=k.line().x(function(a){return w(e.wind2obj([a.wind_u,a.wind_v]).wind)}).y(function(a){return v(a.pressure)});var n=function(a){var b=a.temp;if(0==h)return null;var c=u(b+j.celsiusToK);return N("line",{x1:c,y1:K,x2:J,y2:K-(J-c)/h,stroke:"darkred","stroke-width":"0.2"})},o=function(a){for(var b=a.temp,c=[],d=j.mixingRatio(j.saturationVaporPressure(b+j.celsiusToK),1e3),e=K/6,f=K;f>-e;f-=e){var g=v.invert(f),i=j.dewpoint(j.vaporPressure(g,d));c.push({t:i,p:g})}var l=k.line().x(function(a){return u(a.t)+h*(K-v(a.p))}).y(function(a){return v(a.p)});return N("path",{class:"isohume",d:l(c)})},p=function(a){for(var b=a.temp,c=[],d=b+j.celsiusToK,e=K/15,f=K;f>-e;f-=e){var g=v.invert(f),i=j.dryLapse(g,d,1e3);c.push({t:i,p:g})}var l=k.line().x(function(a){return u(a.t)+h*(K-v(a.p))}).y(function(a){return v(a.p)});return N("path",{class:"dry",d:l(c)})},s=function(a){for(var b,c=a.temp,d=[],e=c+j.celsiusToK,f=e,g=1e3,i=K/15,l=K;l>-i;l-=i)b=v.invert(l),f+=(b-g)*j.moistGradientT(b,f),g=b,d.push({t:f,p:b});var m=k.line().x(function(a){return u(a.t)+h*(K-v(a.p))}).y(function(a){return v(a.p)});return N("path",{class:"moist",d:m(d)})},x=function(a){var b=a.data,c=B(O.elevation),d=b.reduce(function(a,b){var d=v(b.pressure);return d<c&&a.push(N(y,{wind_u:b.wind_u,wind_v:b.wind_v,y:d})),a},[]);return N("g",{children:d})},y=function(a){var b=a.wind_u,c=a.wind_v,d=a.y,f=e.wind2obj([b,c]);return N("g",null,1<f.wind?N("g",{transform:"translate(0,".concat(d,") rotate(").concat(f.dir,")"),stroke:"black",fill:"none"},N("line",{y2:"-30"}),N("path",{d:"M-4,-8L0,0L4,-8","stroke-linejoin":"round"})):N("g",{transform:"translate(0,".concat(d,")"),stroke:"black",fill:"none"},N("circle",{r:"6"}),N("circle",{r:"1"})))},M=function(a){var b=a.elevation,c=a.width;if(null==b)return null;var d=r(B(S(b)));return d>=K?null:N("rect",{class:"surface",y:d,width:c,height:K-d+1})},P=function(a){var b=a.y,c=a.height,d=a.width,e=a.cover;return N("rect",l({y:b,height:c,width:d},{fill:"rgba(".concat(e,", ").concat(e,", ").concat(e,", 0.7)")}))},Q=function(a){var b=a.x,c=a.y;return N("path",{class:"cumulus",transform:"translate(".concat(b-36,", ").concat(c-28,")"),d:"M26.003 24H5.997C3.794 24 2 22.209 2 20c0-1.893 1.318-3.482 3.086-3.896A7.162 7.162 0 0 1 5 15c0-3.866 3.134-7 7-7 3.162 0 5.834 2.097 6.702 4.975A4.477 4.477 0 0 1 21.5 12c2.316 0 4.225 1.75 4.473 4h.03C28.206 16 30 17.791 30 20c0 2.205-1.789 4-3.997 4z"})},T=function(){for(var a,b=f.get("timestamp"),c=O.mgCanvas,d=c.width,e=c.height,g=O.hours[0],h=O.hours[O.hours.length-1],i=r(k.linearInterpolate(g,0,h,d-1,b)),j=c.getContext("2d").getImageData(i,0,1,e).data,l=t(K,r(B(S(O.elevation)))),m=function(a){var b=v.invert(a),c=r(z(b));return j[4*c]},n=[],o=30,p=r(z(v.invert(o))),q=255,s=!1,u=0;u<p;u++)a=j[4*u],0<a&&(s=!0,q=t(a,q));for(s&&(n.push(N(P,{y:"0",width:J,height:"30",cover:q})),n.push(N("text",{class:"tick",y:25,x:J-5,"text-anchor":"end"},"upper clouds")),n.push(N("line",{y1:"30",y2:"30",x2:J,class:"boundary"})));o<l;){for(var w=o,x=m(o),A=1;o++<l&&m(o)==x;)A++;0!=x&&n.push(N(P,{y:w,width:"100",height:A,cover:x}))}return N("g",{children:n})},V=function(c){a(c.lat,c.lon),b.emit("rqstOpen","windy-plugin-sounding",c)},X=function(a){var b=a.favs,c=Object.values(b),d=e.latLon2str(O);return N("div",{id:"fly-to",class:"size-s"},0==c.length?N("span",{"data-icon":"m"},"Add favorites to enable fly to."):c.map(function(a){return N("span",{class:"location + ".concat(e.latLon2str(a)==d?" selected":""),onClick:function(){return V(a)}},a.title||a.name)}))},Y=function(a){var b=a.data,c=O.celestial.sunriseTs+7200000,d=O.celestial.sunsetTs-7200000,e=f.get("timestamp");if(e<c||(e-c)%86400000>d-c)return null;var g=[],i=[],l=[];b.forEach(function(a){g.push(a.temp),i.push(a.dewpoint),l.push(a.pressure)});for(var n=v.invert(B(S(O.elevation))),o=3+k.sampleAt(l,g,[n])[0],q=k.sampleAt(l,i,[n])[0],s=[],w=[],x=[],y=20,z=j.mixingRatio(j.saturationVaporPressure(q),n),A=n;A>=m;A-=y)x.push(A),s.push(j.dryLapse(A,o,n)),w.push(j.dewpoint(j.vaporPressure(A,z)));var C=k.firstIntersection(x,s,x,w),D=k.firstIntersection(x,s,l,g),E=k.line().y(function(a){return v(a[1])}).x(function(a){return u(a[0])+h*(K-v(a[1]))}),F=[],G=D;if(C&&C[0]>D[0]){G=C;for(var H=[],I=[],M=C[1],P=G[0];P>=m;P-=y)H.push(P),I.push(M),M-=y*j.moistGradientT(P,M);var R=k.zip(w,x).filter(function(a){return a[1]>G[0]});R.push([C[1],C[0]]),F.push(N("path",{class:"parcel isohume",d:E(R)}));var T=k.zip(I,H),U=k.firstIntersection(H,I,l,g),V=0;if(U){var X=U[0];V=v(X),F.push(N("line",{class:"boundary",y1:V,y2:V,x2:J})),T=T.filter(function(a){return a[1]>=X}),T.push([U[1],U[0]])}F.push(N("rect",{y:V,height:v(G[0])-V,width:J,fill:"url(#diag-hatch)"})),F.push(N(Q,{x:J,y:v(G[0])})),F.push(N("path",{class:"parcel moist",d:E(T)}))}var Y=v(G[0]),Z=100*r(B.invert(Y)/100),$=k.zip(s,x).filter(function(a){return a[1]>=G[0]});return $.push([G[1],G[0]]),F.push(N("line",{class:"boundary",y1:Y,y2:Y,x2:J})),F.push(N("text",{class:"tick",style:"fill: black","text-anchor":"end","dominant-baseline":"hanging",y:Y+4,x:J-7},Z)),F.push(N("path",{class:"parcel dry",d:E($)})),N("g",{children:F})},Z=Date.now(),$=function(a){var b=f.get("timestamp"),c=100,e=q(event.deltaY);if(a.shiftKey||a.ctrlKey){c=800;var g=new Date(b),d=g.getUTCHours();g.setUTCMinutes(0),b=g.getTime();var h=(13-O.celestial.TZoffset+24)%24,i=(h-d)*e;b+=0>=i?1e3*(3600*(e*(24+i))):1e3*(3600*(e*i))}else b+=1e3*(3600*e);Date.now()-Z>c&&(f.set("timestamp",b),Z=Date.now()),a.stopPropagation(),a.preventDefault()},_=function(){for(var a,b,c=[],d=f.get("metric_altitude"),e="m"==d?1e3:3e3,g=e;!a;g+=e)b=B(g),a=20>B(g+e),c.push(N("line",{y1:b,x2:J,y2:b,stroke:"black","stroke-width":"0.1"})),c.push(N("text",{class:"tick",y:b-5,x:5},g+" "+(a?" "+d:"")));return N("g",{children:c})},aa=function(){for(var a=Math.trunc,b,c,d=[],e=f.get("metric_temp"),g="\xB0C"==e?10:20,h=a(A.invert(0)/g)*g,i=h;!b;i+=g)c=A(i),b=A(i+g)>J,d.push(N("text",{class:"tick","text-anchor":"middle","dominant-baseline":"hanging",y:K+5,x:c},i+(b?" "+e:"")));return N("g",{children:d})};F=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},b=a.data,d=a.elevation;return N("div",null,N("svg",{id:"sounding",onWheel:$},N("defs",null,N("clipPath",{id:"clip-chart"},N("rect",{width:J,height:K+20})),N("pattern",{id:"diag-hatch",patternUnits:"userSpaceOnUse",width:"8",height:"8",patternTransform:"rotate(45 2 2)"},N("rect",{width:"8",height:"8",fill:"#f8f8f8",opacity:"0.7"}),N("path",{d:"M 0,-1 L 0,11",stroke:"gray","stroke-width":"1"}))),b?N("g",null,N("g",{class:"wind"},N("g",{class:"chart",transform:"translate(".concat(J+30,",0)")},N("rect",{fill:"none",y:"1",height:K-1,width:I,stroke:"gray","stroke-width":"1"}),N("text",{class:"tick",transform:"translate(".concat(w(15/3.6)-5," 80) rotate(-90)")},R(15/3.6)),N("text",{class:"tick",transform:"translate(".concat(w(30/3.6)-5," 80) rotate(-90)")},R(30/3.6)),N("text",{class:"tick",transform:"translate(".concat(I-5," 80) rotate(-90)")},R(w.invert(I))+" "+f.get("metric_wind")),N("line",{y1:K,x1:w(15/3.6),x2:w(15/3.6),stroke:"black","stroke-width":"0.1"}),N("rect",{x:I/2,width:I/2,height:K,fill:"red",opacity:"0.1"}),N("g",{class:"chartArea"},N("path",{class:"infoline wind",d:E(b)}),N("g",{transform:"translate(".concat(I/2,",0)")},N(x,{data:b}))),N(M,{elevation:d,width:I}))),N("g",{class:"chart",transform:"translate(10,0)"},N("rect",{fill:"none",y:"1",height:K-1,width:J,stroke:"gray","stroke-width":"1"}),N("g",{class:"chartArea","clip-path":"url(#clip-chart)"},N("rect",{class:"overlay",width:J,height:K,opacity:"0"}),[-70,-60,-50,-40,-30,-20,-10,0,10,20].map(function(a){return N(n,{temp:a})}),[-20,-10,0,5,10,15,20,25,30,40,50,60,70,80].map(function(a){return N(p,{temp:a})}),[-20,-10,0,5,10,15,20,25,30,35].map(function(a){return N(s,{temp:a})}),[-20,-15,-10,-5,0,5,10,15,20].map(function(a){return N(o,{temp:a})}),N(Y,{data:b}),N(T,null),N("path",{class:"infoline temperature",d:C(b)}),N("path",{class:"infoline dewpoint",d:D(b)}),N(M,{elevation:d,width:J})),N(aa,null),N(_,null))):N("text",{x:"50%",y:"50%","text-anchor":"middle"},"No Data")),N(X,{favs:c.getAll()}))},G=d(N(F,{display:"block",elevation:"0"}),H,G),f.on("timestamp",U)},U=function(){if(P=null,O.sfcTemp=null,O.data){var a,b,c=f.get("timestamp"),e=O.hours,g=e.findIndex(function(a){return a>=c}),h=0;if(-1<g){0==g?a=b=e[0]:(a=e[g-1],b=e[g],h=(c-a)/(b-a)),P=i.interpolateArray(O.data[a],O.data[b],h);var j=O.sfcTempByTs[g-1];if(null!=j){var k=O.sfcTempByTs[g];O.sfcTemp=(1-h)*j+h*k}}}G=d(N(F,{data:P,elevation:O.elevation,display:"block"}),H,G)};return{load:function(a,b,c){var d=a.data.hours,e=new Set,f=new Set;for(var g in a.data){var h=g.match(/([^-]+)-(.+)h$/);null!==h&&(e.add(h[1]),f.add(+h[2]))}var i=Array.from(f).filter(function(a){return a>m}).sort(function(c,a){return+c<+a?1:-1}),j={},k=[];d.forEach(function(b,c){j[b]=[],k.push(o(a,"temp","surface",c)),i.forEach(function(d){var e="".concat(d,"h"),f=p(a,e,c,d);j[b].push({temp:o(a,"temp",e,c),dewpoint:o(a,"dewpoint",e,c),gh:f,wind_u:o(a,"wind_u",e,c),wind_v:o(a,"wind_v",e,c),pressure:d})})});var l=document.createElement("canvas"),q=a.data.hours.length,r=300/c.canvasRatio;c.init(l,q,6,r).setHeight(r).setOffset(0).render(a).resetCanvas(),O.data=j,O.mgCanvas=l,O.hours=a.data.hours,O.sfcTempByTs=k;var s=null==b.header.elevation?0:b.header.elevation;null!=a.header.elevation&&(s=a.header.elevation),null!=a.header.modelElevation&&(s=a.header.modelElevation),O.elevation=s,O.celestial=b.celestial,n(c.hrAlt),U()},init:T}}),W.define("windy-plugin-sounding/soundingUtils",[],function(){function a(a,b,c){var d={},e=Object.getOwnPropertyNames(a);return e.forEach(function(e){d[e]=(1-c)*a[e]+c*b[e]}),d}return{interpolateArray:function(b,c,d){var e=[];return b.forEach(function(b,f){var g=b.pressure,h=0==f?c[0]:c.find(function(a){return a.pressure==g});h&&e.push(a(b,h,d))}),e}}}),W.define("windy-plugin-sounding/atmosphere",[],function(){var e=Math.pow;function a(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:f;return c*a/(b-a)}function b(b,d){return a(c(d),b)}function c(a){var b=a-h;return g*Math.exp(17.67*b/(b+243.5))}var f=18.01528/28.9644,g=6.112,h=273.15,i=-.0065;return{dryLapse:function(a,b,c){return b*e(a/c,287/1005)},moistGradientT:function(a,c){var g=b(a,c),h=1005+e(2501000,2)*g*f/(287*e(c,2));return 1/a*((287*c+2501000*g)/h)},dewpoint:function(a){var b=Math.log(a/g);return h+243.5*b/(17.67-b)},vaporPressure:function(a,b){return a*b/(f+b)},getElevation:function(a){return 288.15/i*(e(a/1013.25,-i*287/9.80665)-1)},saturationVaporPressure:c,mixingRatio:a,celsiusToK:h}}),W.define("windy-plugin-sounding/math",[],function(){var h=Math.log,i=Math.exp,j=Math.sign;function a(a){return d(a)||c(a)||b()}function b(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function d(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function e(a,b,c,d,e){if(a==c)return b;var f=(e-a)/(c-a);return b*(1-f)+d*f}function f(a,b,c){var d=a[0]>a[1];return c.map(function(c){var f=a.findIndex(function(a){return d?a<=c:a>=c});return-1==f?f=a.length-1:0==f&&(f=1),e(a[f-1],b[f-1],a[f],b[f],c)})}function g(){var a=function(a){return a[0]},b=function(a){return a[1]},c=function(c){return c.reduce(function(c,d,e){return c+"".concat(0==e?"M":"L").concat(a(d),",").concat(b(d))},"")};return c.x=function(b){return a=b,c},c.y=function(a){return b=a,c},c}return{firstIntersection:function(b,c,d,e){for(var g=Math.min(b[0],d[0]),h=Math.max(b[b.length-1],d[d.length-1]),i=Array.from(new Set([].concat(a(b),a(d)))).filter(function(a){return a>=h&&a<=g}).sort(function(c,a){return+c>+a?-1:1}),k=f(b,c,i),l=f(d,e,i),m=0;m<i.length-1;m++){var n=k[m],o=l[m],p=i[m];if(n==o)return[p,n];var q=k[m+1],r=l[m+1];if(j(o-n)!=j(r-q)){var s=i[m+1],t=s-p,u=(q-n)/t,v=(o-n)/(u-(r-o)/t);return[p+v,n+v*u]}}return null},sampleAt:f,linearInterpolate:e,zip:function(c,a){return c.map(function(b,c){return[b,a[c]]})},scaleLinear:function(){var a=[0,1],b=[0,1],c=function(c){return f(b,a,[c])[0]};return c.invert=function(c){return f(a,b,[c])[0]},c.range=function(b){return a=b,c},c.domain=function(a){return b=a,c},c},scaleLog:function(){var a=[0,1],b=[0,1],c=function(c){return f(b,a,[h(c)])[0]};return c.invert=function(c){return i(f(a,b,[c])[0])},c.range=function(b){return a=b,c},c.domain=function(a){return b=a.map(Math.log),c},c},line:g}});