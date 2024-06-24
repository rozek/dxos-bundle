import{M as f,o as m,a as x,P as g,e as A,i as j,l as d,t as y,h as D,b as l,I as K,c as E,T as Q,R as P,S as O,p as q,q as R,s as H,r as M,u as U,v as G,w as I,A as N,g as _,Q as Y,x as z,__tla as J}from"./index.js";let h,T=Promise.all([(()=>{try{return J}catch{}})()]).then(async()=>{const b="dxos.org/agent/plugin/query";var u="/home/runner/work/dxos/dxos/packages/sdk/client/src/echo/agent-query-source-provider.ts",w=new Error,L=class{constructor(e){this._space=e,this._responsePromises=new Map,this._unsubscribe=void 0}async open(){this._unsubscribe=this._space.listen(b,e=>this._handleMessage(e))}async close(){var e;(e=this._unsubscribe)==null||e.call(this),this._responsePromises.forEach(s=>s.reject(w)),this._responsePromises.clear()}_sendRequest(e){const s={queryId:g.random().toHex(),filter:e};this._space.postMessage(b,{"@type":"dxos.agent.query.QueryRequest",...s}).catch(i=>d.catch(i,void 0,{F:u,L:54,S:this,C:(t,r)=>t(...r)}));let a;return{response:new Promise((i,t)=>{l(s.queryId,void 0,{F:u,L:59,S:this,A:["request.queryId",""]}),this._responsePromises.set(s.queryId,{resolve:i,reject:t}),a=()=>{t(new Error("Request cancelled.")),this._responsePromises.delete(s.queryId)}}),cancelRequest:()=>{a()}}}_handleMessage(e){if(e.payload["@type"]!=="dxos.agent.query.QueryResponse")return;const s=e.payload;l(s.queryId,"QueryId is undefined.",{F:u,L:78,S:this,A:["response.queryId","'QueryId is undefined.'"]});const a=this._responsePromises.get(s.queryId);if(!a){d("Request for this response was canceled.",{response:s},{F:u,L:81,S:this,C:(i,t)=>i(...t)});return}a.resolve(s),this._responsePromises.delete(s.queryId)}create(){return new C({sendRequest:this._sendRequest.bind(this)})}},C=class{constructor(e){this._params=e,this._cancelPreviousRequest=void 0,this.changed=new x}getResults(){return this._results??[]}async run(){return this._results??[]}update(e){if(e.options.dataLocation===void 0||e.options.dataLocation===Y.DataLocation.LOCAL)return;this._results=void 0,this.changed.emit(),this._cancelPreviousRequest&&this._cancelPreviousRequest();const s=Date.now(),{response:a,cancelRequest:i}=this._params.sendRequest(e.toProto());this._cancelPreviousRequest=i,a.then(t=>{var r;this._results=((r=t.results)==null?void 0:r.map(n=>{var v;const o=(v=t.objects)==null?void 0:v.find(S=>S.objectId===n.id);return{id:n.id,spaceKey:n.spaceKey,object:o&&F(o),match:{rank:n.rank},resolution:{source:"remote",time:Date.now()-s}}}))??[],this.changed.emit()}).catch(t=>t===w||d.catch(t,void 0,{F:u,L:152,S:this,C:(r,n)=>r(...n)}))}close(){}},F=e=>(l(e.genesis,"Genesis is undefined.",{F:u,L:161,S:void 0,A:["objSnapshot.genesis","'Genesis is undefined.'"]}),l(e.snapshot,"Genesis model type is undefined.",{F:u,L:162,S:void 0,A:["objSnapshot.snapshot","'Genesis model type is undefined.'"]}),I());function p(e,s,a,i){var t=arguments.length,r=t<3?s:i===null?i=Object.getOwnPropertyDescriptor(s,a):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,s,a,i);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(r=(t<3?n(r):t>3?n(s,a,r):n(s,a))||r);return t>3&&r&&Object.defineProperty(s,a,r),r}let c;c="/home/runner/work/dxos/dxos/packages/sdk/client/src/echo/space-list.ts",h=class extends f{constructor(e,s,a,i){const t=new m;super(t.observable,[]),this._serviceProvider=e,this._echoClient=s,this._getIdentityKey=a,this._traceParent=i,this._defaultSpaceAvailable=new m,this._isReady=new f(this._defaultSpaceAvailable.observable,!1),this._spaceCreated=new x,this._instanceId=g.random().toHex(),this._spacesStream=t}get _isReadyState(){return this._isReady.get()}[A.custom](){return j(this)}toJSON(){var e;return{spaces:(e=this._value)==null?void 0:e.length}}async _open(){d.trace("dxos.sdk.echo-proxy.open",y.begin({id:this._instanceId,parentId:this._traceParent}),{F:c,L:81,S:this,C:(i,t)=>i(...t)}),this._ctx=new D({onError:i=>{d.catch(i,void 0,{F:c,L:84,S:this,C:(t,r)=>t(...r)})}}),l(this._serviceProvider.services.SpacesService,"SpacesService is not available.",{F:c,L:88,S:this,A:["this._serviceProvider.services.SpacesService","'SpacesService is not available.'"]}),l(this._serviceProvider.services.InvitationsService,"InvitationsService is not available.",{F:c,L:89,S:this,A:["this._serviceProvider.services.InvitationsService","'InvitationsService is not available.'"]}),this._invitationProxy=new K(this._serviceProvider.services.InvitationsService,this._serviceProvider.services.IdentityService,()=>({kind:E.Kind.SPACE})),await this._invitationProxy.open();const e=new Q,s=this._serviceProvider.services.SpacesService.querySpaces(void 0,{timeout:P});s.subscribe(i=>{let t=!1;const r=this.get();for(const n of i.spaces??[]){if(this._ctx.disposed)return;let o=r.find(({key:v})=>v.equals(n.spaceKey));o||(o=new O(this._serviceProvider,n,this._echoClient),o._stateUpdate.on(this._ctx,()=>{this._spacesStream.next([...this.get()])}),o.waitUntilReady().then(()=>{o&&o.state.get()===q.READY&&this._getIdentityKey()&&o.properties[R]===this._getIdentityKey().toHex()&&(this._defaultSpaceAvailable.next(!0),this._defaultSpaceAvailable.complete())}).catch(v=>v.message==="Context disposed."||d.catch(v,void 0,{F:c,L:134,S:this,C:(S,k)=>S(...k)})),r.push(o),this._spaceCreated.emit(o.key),t=!0),H(this._ctx,async()=>{await o._processSpaceUpdate(n)})}e.wake(),t&&this._spacesStream.next([...r])}),this._ctx.onDispose(()=>s.close());const a=this._isReady.subscribe(async i=>{if(!i)return;const t=new L(this.default);await t.open(),this._echoClient.graph.registerQuerySourceProvider(t),this._ctx.onDispose(()=>t.close()),a.unsubscribe()});this._ctx.onDispose(()=>a.unsubscribe()),await e.wait(),d.trace("dxos.sdk.echo-proxy.open",y.end({id:this._instanceId}),{F:c,L:172,S:this,C:(i,t)=>i(...t)})}async setConfig(e){var s;await((s=this._serviceProvider.services.QueryService)==null?void 0:s.setConfig(e,{timeout:2e4}))}async _close(){var e;await this._ctx.dispose(),await Promise.all(this.get().map(s=>s._destroy())),this._spacesStream.next([]),this._isReady=new f(this._defaultSpaceAvailable.observable,!1),await((e=this._invitationProxy)==null?void 0:e.close()),this._invitationProxy=void 0}get isReady(){return this._isReady}get(e){var s;return e?(s=this._value)==null?void 0:s.find(({key:a})=>a.equals(e)):this._value}get _spaces(){return this.get()}get default(){const e=this._getIdentityKey();l(e,"Identity must be set.",{F:c,L:214,S:this,A:["identityKey","'Identity must be set.'"]});const s=this.get().find(a=>a.state.get()===q.READY&&a.properties[R]===e.toHex());return l(s,"Default space is not yet available. Use `client.spaces.isReady` to wait for the default space.",{F:c,L:218,S:this,A:["space","'Default space is not yet available. Use `client.spaces.isReady` to wait for the default space.'"]}),s}async create(e){l(this._serviceProvider.services.SpacesService,"SpacesService is not available.",{F:c,L:223,S:this,A:["this._serviceProvider.services.SpacesService","'SpacesService is not available.'"]});const s=g.random().toHex();d.trace("dxos.sdk.echo-proxy.create-space",y.begin({id:s}),{F:c,L:225,S:this,C:(t,r)=>t(...r)});const a=await this._serviceProvider.services.SpacesService.createSpace(void 0,{timeout:P});await this._spaceCreated.waitForCondition(()=>this.get().some(({key:t})=>t.equals(a.spaceKey)));const i=this.get().find(({key:t})=>t.equals(a.spaceKey))??M();return await i._databaseInitialized.wait({timeout:U}),i.db.add(G(z,e??{})),await i.db.flush(),await i._initializationComplete.wait(),d.trace("dxos.sdk.echo-proxy.create-space",y.end({id:s}),{F:c,L:238,S:this,C:(t,r)=>t(...r)}),i}async clone(e){return I()}join(e){if(!this._invitationProxy)throw new N("Client not open.");return d("accept invitation",e,{F:c,L:268,S:this,C:(s,a)=>s(...a)}),this._invitationProxy.join(e)}query(e,s){return this._echoClient.graph.query(e,s)}},p([_.info()],h.prototype,"_isReadyState",null),p([_.info({depth:null})],h.prototype,"toJSON",null),p([_.span()],h.prototype,"_open",null),p([_.span()],h.prototype,"_close",null),p([_.info()],h.prototype,"_spaces",null),p([_.info()],h.prototype,"default",null),h=p([_.resource()],h)});export{h as SpaceList,T as __tla};
