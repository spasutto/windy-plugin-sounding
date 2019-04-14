"use strict";function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function _arrayWithHoles(a){if(Array.isArray(a))return a}W.loadPlugin({name:"windy-plugin-sounding",version:"0.7.6",author:"Victor Berchet",repository:{type:"git",url:"git+https://github.com/vicb/windy-plugin-sounding"},description:"Soundings for paraglider pilots.",displayName:"Better Sounding",hook:"contextmenu",dependencies:["https://cdn.jsdelivr.net/npm/preact@8/dist/preact.min.js"],className:"plugin-lhpane plugin-mobile-fullscreen",exclusive:"lhpane"},"<div class=\"plugin-content\"> <div class=\"title\">Sounding forecast <span id=\"sounding-model\"></span></div> <div id=\"sounding-chart\"></div> </div>",".onwindy-plugin-sounding .left-border{left:600px}.onwindy-plugin-sounding #search{display:none}#windy-plugin-sounding{font-size:12px;padding:1em 1em;line-height:2;z-index:100;width:600px}#windy-plugin-sounding .title{margin:0 0 .3em .6em;font-size:16px}#windy-plugin-sounding .closing-x{display:block}@media only screen and (max-device-width:736px){#windy-plugin-sounding{display:block;left:0;top:0;right:0;width:calc(100% - 20px);margin:10px}}#windy-plugin-sounding .axis path,#windy-plugin-sounding .axis line{fill:none;stroke:#000;shape-rendering:crispEdges}#windy-plugin-sounding #sounding-chart svg{width:100%;height:600px}#windy-plugin-sounding #sounding-chart .cumulus{stroke:#030104;stroke-width:2px;fill:ivory}#windy-plugin-sounding #sounding-chart .infoline{stroke-width:3;fill:none;stroke-linejoin:round}#windy-plugin-sounding #sounding-chart .infoline.dewpoint{stroke:steelblue}#windy-plugin-sounding #sounding-chart .infoline.temperature{stroke:red}#windy-plugin-sounding #sounding-chart .infoline.wind{stroke:purple}#windy-plugin-sounding #sounding-chart .infoline.parcel{stroke:darkorange;stroke-width:2}#windy-plugin-sounding #sounding-chart line.boundary{stroke-width:1;stroke-dasharray:8;stroke:gray}#windy-plugin-sounding #sounding-chart .moist{fill:none;stroke:green;stroke-width:.3;stroke-dasharray:4 6}#windy-plugin-sounding #sounding-chart .dry{fill:none;stroke:green;stroke-width:.3}#windy-plugin-sounding #sounding-chart .isohume{fill:none;stroke:blue;stroke-width:.3;stroke-dasharray:4 6}#windy-plugin-sounding #sounding-chart .isotherm{stroke:darkred;stroke-width:.3}#windy-plugin-sounding #sounding-chart .parcel{stroke-width:3;stroke-dasharray:None}#windy-plugin-sounding #sounding-chart .parcel.moist,#windy-plugin-sounding #sounding-chart .parcel.dry{stroke:#599c00}#windy-plugin-sounding #sounding-chart .parcel.isohume{stroke-width:1;stroke:gray;stroke-dasharray:4}#windy-plugin-sounding #sounding-chart text.tick{font-size:12px;font-family:sans-serif;fill:black}#windy-plugin-sounding #sounding-chart .surface{fill:#8f6d4d}#windy-plugin-sounding #fly-to{padding:0 15px 0 8px}#windy-plugin-sounding #fly-to .location{border:1px solid #bbb;border-radius:1em;line-height:1em;padding:.3em .6em;user-select:none;display:inline-block;margin-right:.3em;cursor:pointer}#windy-plugin-sounding #fly-to .selected{background-color:#d49500;border-color:#d49500;color:white}",function(){function a(){d&&(i.off(d),d=null),e&&(l.off(e),e=null),f&&(l.off(f),f=null)}function b(a,b){var c={lng:b,lat:a};o?o.setLatLng(c):o=L.marker(c,{icon:m.myMarkers.pulsatingIcon,zIndexOffset:-300}).addTo(m)}var d,e,f,g=this,h=W.require("windy-plugin-sounding/soundingGraph"),i=W.require("store"),j=W.require("plugins"),k=W.require("pluginDataLoader"),l=W.require("picker"),m=W.require("map"),n=k({key:"QKlmnpLWr2rZSyFaT7LpxZc0d5bo34D4",plugin:"windy-plugin-sounding"}),o=null,p=j["detail-render"].load().then(function(){return W.define("sMeteogram",["meteogram","Class"],function(a,b){var c=this;return b.extend(a,{legend:function a(){return c}})}),W.require("sMeteogram")});m.setZoom(10,{animate:!1}),i.set("overlay","clouds"),this.onopen=function(b){var j,k;if(!b){var r=m.getCenter();j=r.lat,k=r.lng}else j=b.lat,k=b.lon;var n=m.getBounds(),o=n.getEast()-n.getWest(),p=k-300*(o/m.getSize().x);m.panTo({lng:p,lat:j}),h.init(j,k),q(j,k),a(),d=i.on("product",function(){return q(j,k)}),e=l.on("pickerOpened",function(a){var b=a.lat,c=a.lon;return q(b,c)}),f=l.on("pickerMoved",function(a){var b=a.lat,c=a.lon;return q(b,c)}),g.node.oncontextmenu=g.node.ondblclick=g.node.onclick=function(a){return a.stopPropagation()}};var q=function(a,c){b(a,c);var d=/gfs|ecmwf|nam\w+|iconEu/,e=i.get("product");d.test(e)||(e="ecmwf"),document.getElementById("sounding-model").innerText=e.toUpperCase();var f={model:e,lat:a,lon:c};Promise.all([n("airData",f),n("forecast",f),p]).then(function(a){var b=_slicedToArray(a,3),c=b[0],d=b[1],e=b[2];h.load(c.data,d.data,e)})};this.onclose=function(){a(),o&&(m.removeLayer(o),o=null)}}),W.define("windy-plugin-sounding/soundingGraph",["overlays","broadcast","favs","store","$","utils","windy-plugin-sounding/atmosphere","windy-plugin-sounding/math"],function(a,b,c,f,g,d,e,i){var r=Math.sign,s=Math.round,t=Math.min,u=Math.max;function j(a){return m(a)||l(a)||k()}function k(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function m(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function n(){return n=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},n.apply(this,arguments)}function o(a){var b=Number.MIN_VALUE,c=b,d=Number.MAX_VALUE,e=b;for(var f in Q.params){var g=Q.params[f],h=g.pressure.length-1;e=u(e,g.pressure[0]),d=t(d,g.pressure[h]),c=u.apply(Math,[c].concat(j(g.temp)))}c+=8;var k=c-60;E=76.53*(3-Math.log10(400))/(c-k)*(M/580),v.domain([k,c]),C.domain([S(k),S(c)]),z.domain([e,d]);var l=a.map(function(a){return(Q.mgCanvas.height-1)*(1-a/100)});B=i.scaleLinear().range(l).domain([1e3,950,925,900,850,800,700,600,500,400,300,200,150,100])}function p(a,b,c,d){var f=a.data["".concat(b,"-").concat(c,"h")],g=Array.isArray(f)?f[d]:null;return"gh"===b&&null==g?s(e.getElevation(c)):g}function q(a,b,c,d){return c.map(function(c){return p(a,b,c,d)})}var v,z,A,B,C,D,E,F,G,H,I,J=g("#sounding-chart"),K=100,M=J.clientWidth-100-20-15,N=580,O=preact,P=O.h,h=O.render,Q={lat:0,lon:0,elevation:0,params:{}},R=[],S=a.temp.convertNumber,T=a.wind.convertNumber,U=function(a){return s("ft"===f.get("metric_altitude")?3.28084*a:a)},V=function a(g,k){if(Q.lat=g,Q.lon=k,Q.params=null,v)return void X();v=i.scaleLinear().range([0,M]),A=i.scaleLinear().range([0,K/2,K]),z=i.scaleLog().range([N,0]),C=i.scaleLinear().range([0,M]),D=i.scaleLinear().range([N,0]),F=i.line().x(function(a){return v(a[0])+E*(N-z(a[1]))}).y(function(a){return z(a[1])}),G=i.line().x(function(a){return A(a[0])}).y(function(a){return z(a[1])});var l=function(a){var b=a.temp,c=v(b+e.celsiusToK),d=N-(M-c)/E;return P("line",{class:"isotherm",x1:c.toFixed(1),y1:N,x2:M,y2:d.toFixed(1)})},m=function(a){for(var b=a.temp,c=[],d=e.mixingRatio(e.saturationVaporPressure(b+e.celsiusToK),1e3),f=N/4,g=N;g>-f;g-=f){var h=z.invert(g),i=e.dewpoint(e.vaporPressure(h,d));c.push([i,h])}return P("path",{class:"isohume",d:F(c)})},o=function(a){for(var b=a.temp,c=[],d=b+e.celsiusToK,f=N/15,g=N;g>-f;g-=f){var h=z.invert(g),i=e.dryLapse(h,d,1e3);c.push([i,h])}return P("path",{class:"dry",d:F(c)})},p=function(a){for(var b,c=a.temp,d=[],f=c+e.celsiusToK,g=f,h=1e3,i=N/15,j=N;j>-i;j-=i)b=z.invert(j),g+=(b-h)*e.moistGradientT(b,g),h=b,d.push([g,b]);return P("path",{class:"moist",d:F(d)})},q=function(a){var b=a.params,c=D(Q.elevation),d=i.zip(b.wind_u,b.wind_v).reduce(function(a,d,e){var f=z(b.pressure[e]);return f<c&&a.push(P(w,{wind_u:d[0],wind_v:d[1],y:f})),a},[]);return P("g",{children:d})},w=function(a){var b=a.wind_u,c=a.wind_v,e=a.y,f=d.wind2obj([b,c]);return P("g",null,1<f.wind?P("g",{transform:"translate(0,".concat(e,") rotate(").concat(f.dir,")"),stroke:"black",fill:"none"},P("line",{y2:"-30"}),P("path",{d:"M-4,-8L0,0L4,-8","stroke-linejoin":"round"})):P("g",{transform:"translate(0,".concat(e,")"),stroke:"black",fill:"none"},P("circle",{r:"6"}),P("circle",{r:"1"})))},x=function(a){var b=a.elevation,c=a.width;if(null==b)return null;var d=s(D(U(b)));return d>=N?null:P("rect",{class:"surface",y:d,width:c,height:N-d+1})},O=function(a){var b=a.y,c=a.height,d=a.width,e=a.cover;return P("rect",n({y:b,height:c,width:d},{fill:"rgba(".concat(e,", ").concat(e,", ").concat(e,", 0.7)")}))},R=function(a){var b=a.x,c=a.y;return P("path",{class:"cumulus",transform:"translate(".concat(b-36,", ").concat(c-28,")"),d:"M26.003 24H5.997C3.794 24 2 22.209 2 20c0-1.893 1.318-3.482 3.086-3.896A7.162 7.162 0 0 1 5 15c0-3.866 3.134-7 7-7 3.162 0 5.834 2.097 6.702 4.975A4.477 4.477 0 0 1 21.5 12c2.316 0 4.225 1.75 4.473 4h.03C28.206 16 30 17.791 30 20c0 2.205-1.789 4-3.997 4z"})},S=function(){for(var a,b=f.get("timestamp"),c=Q.mgCanvas,d=c.width,e=c.height,g=Q.hours[0],h=Q.hours[Q.hours.length-1],j=s(i.linearInterpolate(g,0,h,d-1,b)),k=c.getContext("2d").getImageData(j,0,1,e).data,l=t(N,s(D(U(Q.elevation)))),m=function(a){var b=z.invert(a),c=s(B(b));return k[4*c]},n=[],o=30,p=s(B(z.invert(o))),q=255,r=!1,u=0;u<p;u++)a=k[4*u],0<a&&(r=!0,q=t(a,q));for(r&&(n.push(P(O,{y:"0",width:M,height:"30",cover:q})),n.push(P("text",{class:"tick",y:25,x:M-5,"text-anchor":"end"},"upper clouds")),n.push(P("line",{y1:"30",y2:"30",x2:M,class:"boundary"})));o<l;){for(var v=o,w=m(o),x=1;o++<l&&m(o)==w;)x++;0!=w&&n.push(P(O,{y:v,width:"100",height:x,cover:w}))}return P("g",{children:n})},V=function(c){a(c.lat,c.lon),b.emit("rqstOpen","windy-plugin-sounding",c)},Y=function(a){var b=a.favs,c=Object.values(b),e=d.latLon2str(Q);return P("div",{id:"fly-to",class:"size-s"},0==c.length?P("span",{"data-icon":"m"},"Add favorites to enable fly to."):c.map(function(a){return P("span",{class:"location + ".concat(d.latLon2str(a)==e?" selected":""),onClick:function(){return V(a)}},a.title||a.name)}))},Z=function(a){var b=a.params,c=Q.celestial.sunriseTs+7200000,d=Q.celestial.sunsetTs-7200000,g=f.get("timestamp");if(g<c||(g-c)%86400000>d-c)return null;for(var h,j=D(U(Q.elevation)),k=z.invert(j),l=3+i.sampleAt(b.pressure,b.temp,[k])[0],m=i.sampleAt(b.pressure,b.dewpoint,[k])[0],n=[],o=[],q=[],r=N/20,u=e.mixingRatio(e.saturationVaporPressure(m),k),v=j;v>-r;v-=r)h=z.invert(v),q.push(h),n.push(e.dryLapse(h,l,k)),o.push(e.dewpoint(e.vaporPressure(h,u)));var w=i.firstIntersection(q,n,q,o),x=i.firstIntersection(q,n,b.pressure,b.temp),A=[],B=x;if(w&&w[0]>x[0]){B=w;for(var C,E=[],G=[],H=w[1],I=w[0],J=z(I);J>-r;J-=r)C=z.invert(J),H+=(C-I)*e.moistGradientT(C,H),I=C,E.push(C),G.push(H);var K=i.zip(o,q).filter(function(a){return a[1]>B[0]});K.push([w[1],w[0]]),A.push(P("path",{class:"parcel isohume",d:F(K)}));var O=i.zip(G,E),S=i.firstIntersection(E,G,b.pressure,b.temp),T=0;if(S){var V=S[0];T=z(V),A.push(P("line",{class:"boundary",y1:T,y2:T,x2:M})),O=O.filter(function(a){return a[1]>=V}),O.push([S[1],S[0]])}A.push(P("rect",{y:T,height:z(B[0])-T,width:M,fill:"url(#diag-hatch)"})),A.push(P(R,{x:M,y:z(B[0])})),A.push(P("path",{class:"parcel moist",d:F(O)}))}var X=z(B[0]),Y=100*s(D.invert(X)/100),Z=i.zip(n,q).filter(function(a){return a[1]>=B[0]});return Z.push([B[1],B[0]]),A.push(P("line",{class:"boundary",y1:X,y2:X,x2:M})),A.push(P("text",{class:"tick",style:"fill: black","text-anchor":"end","dominant-baseline":"hanging",y:X+4,x:M-7},Y)),A.push(P("path",{class:"parcel dry",d:F(Z)})),P("g",{children:A})},$=Date.now(),_=function(a){var b=f.get("timestamp"),c=100,e=r(event.deltaY);if(a.shiftKey||a.ctrlKey){c=800;var g=new Date(b),d=g.getUTCHours();g.setUTCMinutes(0),b=g.getTime();var h=(13-Q.celestial.TZoffset+24)%24,i=(h-d)*e;b+=0>=i?1e3*(3600*(e*(24+i))):1e3*(3600*(e*i))}else b+=1e3*(3600*e);Date.now()-$>c&&(f.set("timestamp",b),$=Date.now()),a.stopPropagation(),a.preventDefault()},aa=function(){for(var a,b,c=[],d=f.get("metric_altitude"),e="m"==d?1e3:3e3,g=e;!a;g+=e)b=D(g),a=20>D(g+e),c.push(P("line",{y1:b,x2:M,y2:b,stroke:"black","stroke-width":"0.1"})),c.push(P("text",{class:"tick",y:b-5,x:5},g+" "+(a?" "+d:"")));return P("g",{children:c})},ba=function(){for(var a=Math.trunc,b,c,d=[],e=f.get("metric_temp"),g="\xB0C"==e?10:20,h=a(C.invert(0)/g)*g,i=h;!b;i+=g)c=C(i),b=C(i+g)>M,d.push(P("text",{class:"tick","text-anchor":"middle","dominant-baseline":"hanging",y:N+5,x:c},i+(b?" "+e:"")));return P("g",{children:d})};H=function(){var a,b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=b.params,g=b.elevation;if(e){a=i.zip(e.wind_u,e.wind_v).map(function(a){return d.wind2obj(a).wind});var h=u.apply(Math,j(a));A.domain([0,30/3.6,u(60/3.6,h)]),D.domain([U(e.gh[0]),U(e.gh[e.gh.length-1])])}return P("div",null,P("svg",{id:"sounding",onWheel:_},P("defs",null,P("clipPath",{id:"clip-chart"},P("rect",{width:M,height:N+20})),P("pattern",{id:"diag-hatch",patternUnits:"userSpaceOnUse",width:"8",height:"8",patternTransform:"rotate(45 2 2)"},P("rect",{width:"8",height:"8",fill:"#f8f8f8",opacity:"0.7"}),P("path",{d:"M 0,-1 L 0,11",stroke:"gray","stroke-width":"1"}))),e?P("g",null,P("g",{class:"wind"},P("g",{class:"chart",transform:"translate(".concat(M+30,",0)")},P("rect",{fill:"none",y:"1",height:N-1,width:K,stroke:"gray","stroke-width":"1"}),P("text",{class:"tick",transform:"translate(".concat(A(15/3.6)-5," 80) rotate(-90)")},T(15/3.6)),P("text",{class:"tick",transform:"translate(".concat(A(30/3.6)-5," 80) rotate(-90)")},T(30/3.6)),P("text",{class:"tick",transform:"translate(".concat(K-5," 80) rotate(-90)")},T(A.invert(K))+" "+f.get("metric_wind")),P("line",{y1:N,x1:A(15/3.6),x2:A(15/3.6),stroke:"black","stroke-width":"0.1"}),P("rect",{x:K/2,width:K/2,height:N,fill:"red",opacity:"0.1"}),P("g",{class:"chartArea"},P("path",{class:"infoline wind",d:G(i.zip(a,e.pressure))}),P("g",{transform:"translate(".concat(K/2,",0)")},P(q,{params:e}))),P(x,{elevation:g,width:K}))),P("g",{class:"chart",transform:"translate(10,0)"},P("rect",{fill:"none",y:"1",height:N-1,width:M,stroke:"gray","stroke-width":"1"}),P("g",{class:"chartArea","clip-path":"url(#clip-chart)"},P("rect",{class:"overlay",width:M,height:N,opacity:"0"}),[-70,-60,-50,-40,-30,-20,-10,0,10,20].map(function(a){return P(l,{temp:a})}),[-20,-10,0,5,10,15,20,25,30,40,50,60,70,80].map(function(a){return P(o,{temp:a})}),[-20,-10,0,5,10,15,20,25,30,35].map(function(a){return P(p,{temp:a})}),[-20,-15,-10,-5,0,5,10,15,20].map(function(a){return P(m,{temp:a})}),P(Z,{params:e}),P(S,null),P("path",{class:"infoline temperature",d:F(i.zip(e.temp,e.pressure))}),P("path",{class:"infoline dewpoint",d:F(i.zip(e.dewpoint,e.pressure))}),P(x,{elevation:g,width:M})),P(ba,null),P(aa,null))):P("text",{x:"50%",y:"50%","text-anchor":"middle"},"No Data")),P(Y,{favs:c.getAll()}))},I=h(P(H,{display:"block",elevation:"0"}),J,I),f.on("timestamp",X)},X=function(){if(R=null,Q.sfcTemp=null,Q.params){var a,b,c=f.get("timestamp"),d=Q.hours,e=d.findIndex(function(a){return a>=c});if(-1<e){0==e?a=b=d[0]:(a=d[e-1],b=d[e]);var g=Q.params[a],j=Q.params[b];R={},Object.getOwnPropertyNames(g).forEach(function(d){R[d]=i.linearInterpolate(a,g[d],b,j[d],c)});var k=Q.sfcTempByTs[e-1];if(null!=k){var l=Q.sfcTempByTs[e];Q.sfcTemp=i.linearInterpolate(a,k,b,l,c)}}}I=h(P(H,{params:R,elevation:Q.elevation,display:"block"}),J,I)};return{load:function(a,b,c){var d=a.data.hours,e=new Set;for(var f in a.data){var g=f.match(/([^-]+)-(.+)h$/);null!==g&&e.add(+g[2])}var h=Array.from(e).filter(function(a){return a>=400}).sort(function(c,a){return+c<+a?1:-1}),i={},j=[];d.forEach(function(b,c){j.push(p(a,"temp","surface",c)),i[b]={temp:q(a,"temp",h,c),dewpoint:q(a,"dewpoint",h,c),gh:q(a,"gh",h,c),wind_u:q(a,"wind_u",h,c),wind_v:q(a,"wind_v",h,c),pressure:h}});var k=document.createElement("canvas"),l=a.data.hours.length,m=300/c.canvasRatio;c.init(k,l,6,m).setHeight(m).setOffset(0).render(a).resetCanvas(),Q.params=i,Q.mgCanvas=k,Q.hours=a.data.hours,Q.sfcTempByTs=j;var n=null==b.header.elevation?0:b.header.elevation;null!=a.header.elevation&&(n=a.header.elevation),null!=a.header.modelElevation&&(n=a.header.modelElevation),Q.elevation=n,Q.celestial=b.celestial,o(c.hrAlt),X()},init:V}}),W.define("windy-plugin-sounding/atmosphere",[],function(){var e=Math.pow;function a(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:f;return c*a/(b-a)}function b(b,d){return a(c(d),b)}function c(a){var b=a-h;return g*Math.exp(17.67*b/(b+243.5))}var f=18.01528/28.9644,g=6.112,h=273.15,i=-.0065;return{dryLapse:function(a,b,c){return b*e(a/c,287/1005)},moistGradientT:function(a,c){var g=b(a,c),h=1005+e(2501000,2)*g*f/(287*e(c,2));return 1/a*((287*c+2501000*g)/h)},dewpoint:function(a){var b=Math.log(a/g);return h+243.5*b/(17.67-b)},vaporPressure:function(a,b){return a*b/(f+b)},getElevation:function(a){return 288.15/i*(e(a/1013.25,-i*287/9.80665)-1)},saturationVaporPressure:c,mixingRatio:a,celsiusToK:h}}),W.define("windy-plugin-sounding/math",[],function(){var h=Math.log,i=Math.exp,j=Math.sign;function a(a){return d(a)||c(a)||b()}function b(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function d(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function e(a,b,c,d,e){if(a==c)return b;var f=(e-a)/(c-a);return Array.isArray(b)?b.map(function(a,b){return a*(1-f)+d[b]*f}):b*(1-f)+d*f}function f(a,b,c){var d=a[0]>a[1];return c.map(function(c){var f=a.findIndex(function(a){return d?a<=c:a>=c});return-1==f?f=a.length-1:0==f&&(f=1),e(a[f-1],b[f-1],a[f],b[f],c)})}function g(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,c=function(a){return a[0]},d=function(a){return a[1]},e=function(c,d){return c.toFixed(a)+","+d.toFixed(b)},g=function(a){var b=a.map(function(a){return e(c(a),d(a))});return"M"+b.join("L")};return g.x=function(a){return c=a,g},g.y=function(a){return d=a,g},g}return{firstIntersection:function(b,c,d,e){for(var g=Math.min(b[0],d[0]),h=Math.max(b[b.length-1],d[d.length-1]),i=Array.from(new Set([].concat(a(b),a(d)))).filter(function(a){return a>=h&&a<=g}).sort(function(c,a){return+c>+a?-1:1}),k=f(b,c,i),l=f(d,e,i),m=0;m<i.length-1;m++){var n=k[m],o=l[m],p=i[m];if(n==o)return[p,n];var q=k[m+1],r=l[m+1];if(j(o-n)!=j(r-q)){var s=i[m+1],t=s-p,u=(q-n)/t,v=(o-n)/(u-(r-o)/t);return[p+v,n+v*u]}}return null},sampleAt:f,linearInterpolate:e,zip:function(c,a){return c.map(function(b,c){return[b,a[c]]})},scaleLinear:function(){var a=[0,1],b=[0,1],c=function(c){return f(b,a,[c])[0]};return c.invert=function(c){return f(a,b,[c])[0]},c.range=function(b){return a=b,c},c.domain=function(a){return b=a,c},c},scaleLog:function(){var a=[0,1],b=[0,1],c=function(c){return f(b,a,[h(c)])[0]};return c.invert=function(c){return i(f(a,b,[c])[0])},c.range=function(b){return a=b,c},c.domain=function(a){return b=a.map(Math.log),c},c},line:g}});