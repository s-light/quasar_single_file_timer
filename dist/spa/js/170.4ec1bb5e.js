"use strict";(self["webpackChunkquasar_single_file_timer"]=self["webpackChunkquasar_single_file_timer"]||[]).push([[170],{5690:(e,t,n)=>{n.d(t,{v:()=>i});var l=n(499),a=n(4376);function i(e="HH:mm:ss"){function t(e){let t=0;return e=(0,l.SU)(e),t+=1e3*e.getHours()*60*60,t+=1e3*e.getMinutes()*60,t+=1e3*e.getSeconds(),t+=e.getMilliseconds(),t}function n(n){let i=t(a.ZP.extractDate((0,l.SU)(n),(0,l.SU)(e)));return i}function i(t){return a.ZP.formatDate((0,l.SU)(t),(0,l.SU)(e))}return{convertDateToMillis:t,convertTimeStrToDuration:n,durationFormatted:i}}},3922:(e,t,n)=>{n.d(t,{Y:()=>a});var l=n(7363);const a=(0,l.Q_)("thetime",{state:()=>({timer:{format:"HH:mm:ss",start:Date.now(),end:Date.now()+1e4,running:!1,timer_id:null,duration:1e4,interval:50,now:Date.now()},alarm:{running:!1,remaining:0,timer_id:null,duration:5e3,interval:500}}),getters:{remaining:e=>e.timer.end-e.timer.now,elapsed:e=>e.timer.now-e.timer.start,elapsed_percentage(e){const t=e.timer.now-e.timer.start;let n=100*t/e.timer.duration;return n}},actions:{}})},3170:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var l=n(9835),a=n(6970);const i=(0,l._)("br",null,null,-1);function r(e,t,n,r,o,u){const m=(0,l.up)("q-btn"),s=(0,l.up)("EssentialNavigation"),d=(0,l.up)("timer-control"),c=(0,l.up)("q-item-section"),p=(0,l.up)("q-item"),w=(0,l.up)("q-item-label"),g=(0,l.up)("q-list"),v=(0,l.up)("q-drawer"),f=(0,l.up)("router-view"),_=(0,l.up)("q-page-container"),h=(0,l.up)("q-layout");return(0,l.wg)(),(0,l.j4)(h,{view:"lHh Lpr lFf"},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer,class:"fixed-top q-ma-sm",style:{"z-index":"10000"}},null,8,["onClick"]),(0,l.Wm)(v,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":t[0]||(t[0]=t=>e.leftDrawerOpen=t),"show-if-above":"",bordered:"",elevated:"",persistent:""},{default:(0,l.w5)((()=>[(0,l.Wm)(g,{class:"q-pt-xl"},{default:(0,l.w5)((()=>[(0,l.Wm)(s),(0,l.Wm)(p,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)(d,{thetime:e.thetime},null,8,["thetime"])])),_:1})])),_:1}),(0,l.Wm)(w,{header:"",class:"fixed-bottom"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(e.appinfo.productName)+" v"+(0,a.zw)(e.appinfo.version)+" ",1),i,(0,l.Uk)(" Quasar v"+(0,a.zw)(e.$q.version),1)])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(f)])),_:1})])),_:1})}var o=n(499),u=n(7128);function m(e,t,n,i,r,o){const u=(0,l.up)("q-icon"),m=(0,l.up)("q-item-section"),s=(0,l.up)("q-item-label"),d=(0,l.up)("q-item");return(0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(r.childrenCommon,(e=>((0,l.wg)(),(0,l.j4)(d,{key:e.title,to:e.path,exact:""},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{name:e.icon},null,8,["name"])])),_:2},1024),(0,l.Wm)(m,null,{default:(0,l.w5)((()=>[(0,l.Wm)(s,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(e.title),1)])),_:2},1024),(0,l.Wm)(s,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(e.caption),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["to"])))),128)}var s=n(117);const d={name:"EssentialNavigation",data(){return{childrenCommon:s.Z}}};var c=n(1639),p=n(490),w=n(1233),g=n(2857),v=n(3115),f=n(9984),_=n.n(f);const h=(0,c.Z)(d,[["render",m]]),q=h;_()(d,"components",{QItem:p.Z,QItemSection:w.Z,QIcon:g.Z,QItemLabel:v.Z});var D=n(3922),b=n(5690);const Z={props:{thetime:{type:Object,required:!0}},setup(e){const t=e,n=(0,o.iH)("00:00:10"),a=(0,o.Vh)(t,"thetime"),i=(0,o.SU)(a).timer,r=(0,o.SU)(a).alarm,u=(0,b.v)(i.format),m=()=>{i.timer_id&&window.clearInterval(i.timer_id),i.timer_id=null,i.now=i.end+1e3,i.running=!1},s=()=>{i.now=Date.now(),a.value.remaining<=i.interval&&(console.log("timer_stop"),m(),console.log("run alarm:"),r.running=!0)},d=(e=null)=>{m(),r.running=!1,e&&(i.duration=e),i.start=Date.now(),i.end=Date.now()+i.duration,i.timer_id=window.setInterval(s,i.update_interval),i.running=!0},c=()=>{console.log(`timeNew: ${n.value}`);let e=u.convertTimeStrToDuration(n.value);console.log(`duration: ${e}`),d(e)};let p=(0,o.iH)(["00:00:02","00:00:05","00:01:00","00:05:00","00:10:00","00:15:00","00:30:00"]);return(e,t)=>{const a=(0,l.up)("q-btn"),i=(0,l.up)("q-input");return(0,l.wg)(),(0,l.iD)("section",null,[(0,l._)("ul",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,o.SU)(p),(e=>((0,l.wg)(),(0,l.iD)("li",{key:e},[(0,l.Wm)(a,{label:e,outlined:"",onClick:t=>d((0,o.SU)(u).convertTimeStrToDuration(e))},null,8,["label","onClick"])])))),128))]),(0,l._)("section",null,[(0,l.Wm)(i,{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=e=>n.value=e),outlined:"",type:"time",step:"1",pattern:"[0-9]{2}:[0-9]{2}:[0-9]{2}"},null,8,["modelValue"]),(0,l.Wm)(a,{label:"start",outlined:"",onClick:t[1]||(t[1]=e=>c())}),(0,l.Wm)(a,{label:"add",outlined:"",onClick:t[2]||(t[2]=e=>(0,o.SU)(p).push(n.value))})])])}}};var W=n(7065),S=n(6768);const U=Z,k=U;_()(Z,"components",{QBtn:W.Z,QInput:S.Z});const Q=(0,l.aZ)({name:"MainLayout",components:{EssentialNavigation:q,TimerControl:k},setup(){const e=(0,D.Y)(),t=(0,o.iH)(!1);return console.log(`leftDrawerOpen: ${t.value}`),{leftDrawerOpen:t,toggleLeftDrawer(){t.value=!t.value,console.log(`leftDrawerOpen: ${t.value}`)},thetime:e}},data(){return{appinfo:u}}});var C=n(1967),H=n(8673),I=n(3246),y=n(2133);const T=(0,c.Z)(Q,[["render",r]]),L=T;_()(Q,"components",{QLayout:C.Z,QBtn:W.Z,QDrawer:H.Z,QList:I.Z,QItem:p.Z,QItemSection:w.Z,QItemLabel:v.Z,QPageContainer:y.Z})},7128:e=>{e.exports=JSON.parse('{"name":"quasar-single-file-timer","version":"1.0.0","productName":"SimpleCountdownTimer ","description":"very simple countdown / timer single-file inlined/packed quasar app","projectUrl":"https://github.com/s-light/quasar_single_file_timer","previewUrl":"https://s-light.github.io/quasar_single_file_timer/dist/spa/#/"}')}}]);