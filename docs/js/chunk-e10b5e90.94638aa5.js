(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e10b5e90"],{1413:function(t,n,e){"use strict";e.r(n),e.d(n,"ion_menu",(function(){return d})),e.d(n,"ion_menu_button",(function(){return v})),e.d(n,"ion_menu_controller",(function(){return y})),e.d(n,"ion_menu_toggle",(function(){return O}));var i=e("9ab4"),o=e("4f09"),r=e("b6d2"),s=e("c123"),a=(e("157e"),e("c682")),c=e("042c"),u=e("264c"),h=e("b985"),d=function(){function t(t){Object(o["l"])(this,t),this.lastOnEnd=0,this.blocker=a["GESTURE_CONTROLLER"].createBlocker({disableScroll:!0}),this.mode=Object(o["e"])(this),this.isAnimating=!1,this._isOpen=!1,this.isPaneVisible=!1,this.isEndSide=!1,this.disabled=!1,this.side="start",this.swipeGesture=!0,this.maxEdgeStart=50,this.ionWillOpen=Object(o["d"])(this,"ionWillOpen",7),this.ionWillClose=Object(o["d"])(this,"ionWillClose",7),this.ionDidOpen=Object(o["d"])(this,"ionDidOpen",7),this.ionDidClose=Object(o["d"])(this,"ionDidClose",7),this.ionMenuChange=Object(o["d"])(this,"ionMenuChange",7)}return t.prototype.typeChanged=function(t,n){var e=this.contentEl;e&&(void 0!==n&&e.classList.remove("menu-content-"+n),e.classList.add("menu-content-"+t),e.removeAttribute("style")),this.menuInnerEl&&this.menuInnerEl.removeAttribute("style"),this.animation=void 0},t.prototype.disabledChanged=function(){this.updateState(),this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})},t.prototype.sideChanged=function(){this.isEndSide=Object(s["h"])(this.side)},t.prototype.swipeGestureChanged=function(){this.updateState()},t.prototype.connectedCallback=function(){return Object(i["a"])(this,void 0,void 0,(function(){var t,n,o,s,a=this;return Object(i["c"])(this,(function(i){switch(i.label){case 0:return void 0===this.type&&(this.type=r["b"].get("menuType","ios"===this.mode?"reveal":"overlay")),t=this.el,n=t.parentNode,void 0===this.contentId&&console.warn('[DEPRECATED][ion-menu] Using the [main] attribute is deprecated, please use the "contentId" property instead:\nBEFORE:\n  <ion-menu>...</ion-menu>\n  <div main>...</div>\n\nAFTER:\n  <ion-menu contentId="my-content"></ion-menu>\n  <div id="my-content">...</div>\n'),o=void 0!==this.contentId?document.getElementById(this.contentId):n&&n.querySelector&&n.querySelector("[main]"),o&&o.tagName?(this.contentEl=o,o.classList.add("menu-content"),this.typeChanged(this.type,void 0),this.sideChanged(),c["a"]._register(this),s=this,[4,Promise.resolve().then(e.bind(null,"c682"))]):(console.error('Menu: must have a "content" element to listen for drag events on.'),[2]);case 1:return s.gesture=i.sent().createGesture({el:document,gestureName:"menu-swipe",gesturePriority:30,threshold:10,canStart:function(t){return a.canStart(t)},onWillStart:function(){return a.onWillStart()},onStart:function(){return a.onStart()},onMove:function(t){return a.onMove(t)},onEnd:function(t){return a.onEnd(t)}}),this.updateState(),[2]}}))}))},t.prototype.componentDidLoad=function(){return Object(i["a"])(this,void 0,void 0,(function(){return Object(i["c"])(this,(function(t){return this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen}),this.updateState(),[2]}))}))},t.prototype.disconnectedCallback=function(){this.blocker.destroy(),c["a"]._unregister(this),this.animation&&this.animation.destroy(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.animation=void 0,this.contentEl=this.backdropEl=this.menuInnerEl=void 0},t.prototype.onSplitPaneChanged=function(t){this.isPaneVisible=t.detail.isPane(this.el),this.updateState()},t.prototype.onBackdropClick=function(t){if(this._isOpen&&this.lastOnEnd<t.timeStamp-100){var n=!!t.composedPath&&!t.composedPath().includes(this.menuInnerEl);n&&(t.preventDefault(),t.stopPropagation(),this.close())}},t.prototype.isOpen=function(){return Promise.resolve(this._isOpen)},t.prototype.isActive=function(){return Promise.resolve(this._isActive())},t.prototype.open=function(t){return void 0===t&&(t=!0),this.setOpen(!0,t)},t.prototype.close=function(t){return void 0===t&&(t=!0),this.setOpen(!1,t)},t.prototype.toggle=function(t){return void 0===t&&(t=!0),this.setOpen(!this._isOpen,t)},t.prototype.setOpen=function(t,n){return void 0===n&&(n=!0),c["a"]._setOpen(this,t,n)},t.prototype._setOpen=function(t,n){return void 0===n&&(n=!0),Object(i["a"])(this,void 0,void 0,(function(){return Object(i["c"])(this,(function(e){switch(e.label){case 0:return!this._isActive()||this.isAnimating||t===this._isOpen?[2,!1]:(this.beforeAnimation(t),[4,this.loadAnimation()]);case 1:return e.sent(),[4,this.startAnimation(t,n)];case 2:return e.sent(),this.afterAnimation(t),[2,!0]}}))}))},t.prototype.loadAnimation=function(){return Object(i["a"])(this,void 0,void 0,(function(){var t,n;return Object(i["c"])(this,(function(e){switch(e.label){case 0:return t=this.menuInnerEl.offsetWidth,t===this.width&&void 0!==this.animation?[2]:(this.width=t,this.animation&&(this.animation.destroy(),this.animation=void 0),n=this,[4,c["a"]._createAnimation(this.type,this)]);case 1:return n.animation=e.sent(),r["b"].getBoolean("animated",!0)||this.animation.duration(0),this.animation.fill("both"),[2]}}))}))},t.prototype.startAnimation=function(t,n){return Object(i["a"])(this,void 0,void 0,(function(){var e,o;return Object(i["c"])(this,(function(i){switch(i.label){case 0:return e=!t,o=this.animation.direction(e?"reverse":"normal").easing(e?"cubic-bezier(0.4, 0.0, 0.6, 1)":"cubic-bezier(0.0, 0.0, 0.2, 1)"),n?[4,o.playAsync()]:[3,2];case 1:return i.sent(),[3,3];case 2:o.playSync(),i.label=3;case 3:return[2]}}))}))},t.prototype._isActive=function(){return!this.disabled&&!this.isPaneVisible},t.prototype.canSwipe=function(){return this.swipeGesture&&!this.isAnimating&&this._isActive()},t.prototype.canStart=function(t){return!!this.canSwipe()&&(!!this._isOpen||!c["a"]._getOpenSync()&&p(window,t.currentX,this.isEndSide,this.maxEdgeStart))},t.prototype.onWillStart=function(){return this.beforeAnimation(!this._isOpen),this.loadAnimation()},t.prototype.onStart=function(){this.isAnimating&&this.animation?this.animation.direction(this._isOpen?"reverse":"normal").progressStart(!0):Object(s["b"])(!1,"isAnimating has to be true")},t.prototype.onMove=function(t){if(this.isAnimating&&this.animation){var n=l(t.deltaX,this._isOpen,this.isEndSide),e=n/this.width;this.animation.progressStep(e)}else Object(s["b"])(!1,"isAnimating has to be true")},t.prototype.onEnd=function(t){var n=this;if(this.isAnimating&&this.animation){var e=this._isOpen,i=this.isEndSide,o=l(t.deltaX,e,i),r=this.width,a=o/r,c=t.velocityX,u=r/2,d=c>=0&&(c>.2||t.deltaX>u),p=c<=0&&(c<-.2||t.deltaX<-u),b=e?i?d:p:i?p:d,m=!e&&b;e&&!b&&(m=!0),this.lastOnEnd=t.timeStamp;var f=b?.001:-.001,g=a<=0?.01:a;f+=Object(h["b"])(new h["a"](0,0),new h["a"](.4,0),new h["a"](.6,1),new h["a"](1,1),Object(s["c"])(0,g,1)),this.animation.easing("cubic-bezier(0.4, 0.0, 0.6, 1)").onFinish((function(){return n.afterAnimation(m)}),{oneTimeCallback:!0}).progressEnd(b?1:0,f,300)}else Object(s["b"])(!1,"isAnimating has to be true")},t.prototype.beforeAnimation=function(t){Object(s["b"])(!this.isAnimating,"_before() should not be called while animating"),this.el.classList.add(b),this.backdropEl&&this.backdropEl.classList.add(m),this.blocker.block(),this.isAnimating=!0,t?this.ionWillOpen.emit():this.ionWillClose.emit()},t.prototype.afterAnimation=function(t){Object(s["b"])(this.isAnimating,"_before() should be called while animating"),this._isOpen=t,this.isAnimating=!1,this._isOpen||this.blocker.unblock(),t?(this.contentEl&&this.contentEl.classList.add(f),this.ionDidOpen.emit()):(this.el.classList.remove(b),this.contentEl&&this.contentEl.classList.remove(f),this.backdropEl&&this.backdropEl.classList.remove(m),this.animation&&this.animation.stop(),this.ionDidClose.emit())},t.prototype.updateState=function(){var t=this._isActive();this.gesture&&this.gesture.setDisabled(!t||!this.swipeGesture),!t&&this._isOpen&&this.forceClosing(),this.disabled||c["a"]._setActiveMenu(this),Object(s["b"])(!this.isAnimating,"can not be animating")},t.prototype.forceClosing=function(){Object(s["b"])(this._isOpen,"menu cannot be closed"),this.isAnimating=!0;var t=this.animation.direction("reverse");t.playSync(),this.afterAnimation(!1)},t.prototype.render=function(){var t,n=this,e=this,i=e.isEndSide,r=e.type,s=e.disabled,a=e.mode,c=e.isPaneVisible;return Object(o["i"])(o["a"],{role:"navigation",class:(t={},t[a]=!0,t["menu-type-"+r]=!0,t["menu-enabled"]=!s,t["menu-side-end"]=i,t["menu-side-start"]=!i,t["menu-pane-visible"]=c,t)},Object(o["i"])("div",{class:"menu-inner",ref:function(t){return n.menuInnerEl=t}},Object(o["i"])("slot",null)),Object(o["i"])("ion-backdrop",{ref:function(t){return n.backdropEl=t},class:"menu-backdrop",tappable:!1,stopPropagation:!1}))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(o["f"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{type:["typeChanged"],disabled:["disabledChanged"],side:["sideChanged"],swipeGesture:["swipeGestureChanged"]}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color,#fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{left:0;right:auto;top:0;bottom:0;-webkit-transform:translate3d(-9999px,0,0);transform:translate3d(-9999px,0,0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}:host-context([dir=rtl]) .menu-inner,[dir=rtl] .menu-inner{left:unset;right:unset;left:auto;right:0;-webkit-transform:translate3d(calc(-1 * -9999px),0,0);transform:translate3d(calc(-1 * -9999px),0,0)}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;right:auto;left:0}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;right:0;left:auto}ion-backdrop{display:none;opacity:.01;z-index:-1}@media (max-width:340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translateZ(0);transform:translateZ(0)}:host(.menu-type-overlay){z-index:1000}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none!important;transform:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}:host(.menu-pane-visible) ion-backdrop{display:hidden!important}:host(.menu-type-push){z-index:1000}:host(.menu-type-push) .show-backdrop{display:block}"},enumerable:!0,configurable:!0}),t}(),l=function(t,n,e){return Math.max(0,n!==e?-t:t)},p=function(t,n,e,i){return e?n>=t.innerWidth-i:n<=i},b="show-menu",m="show-backdrop",f="menu-content-open",g=function(t){return Object(i["a"])(void 0,void 0,void 0,(function(){var n,e;return Object(i["c"])(this,(function(i){switch(i.label){case 0:return[4,c["a"].get(t)];case 1:return n=i.sent(),e=n,e?[4,n.isActive()]:[3,3];case 2:e=i.sent(),i.label=3;case 3:return[2,!!e]}}))}))},v=function(){function t(t){var n=this;Object(o["l"])(this,t),this.visible=!1,this.disabled=!1,this.autoHide=!0,this.type="button",this.onClick=function(){return Object(i["a"])(n,void 0,void 0,(function(){return Object(i["c"])(this,(function(t){return[2,c["a"].toggle(this.menu)]}))}))}}return t.prototype.componentDidLoad=function(){this.visibilityChanged()},t.prototype.visibilityChanged=function(){return Object(i["a"])(this,void 0,void 0,(function(){var t;return Object(i["c"])(this,(function(n){switch(n.label){case 0:return t=this,[4,g(this.menu)];case 1:return t.visible=n.sent(),[2]}}))}))},t.prototype.render=function(){var t,n=this,e=n.color,i=n.disabled,s=Object(o["e"])(this),a=r["b"].get("menuIcon","menu"),c=this.autoHide&&!this.visible,h={type:this.type};return Object(o["i"])(o["a"],{onClick:this.onClick,"aria-disabled":i?"true":null,"aria-hidden":c?"true":null,class:Object.assign(Object.assign((t={},t[s]=!0,t),Object(u["a"])(e)),{button:!0,"menu-button-hidden":c,"menu-button-disabled":i,"ion-activatable":!0,"ion-focusable":!0})},Object(o["i"])("button",Object.assign({},h,{disabled:i,class:"button-native"}),Object(o["i"])("slot",null,Object(o["i"])("ion-icon",{icon:a,mode:s,lazy:!1})),"md"===s&&Object(o["i"])("ion-ripple-effect",{type:"unbounded"})))},Object.defineProperty(t,"style",{get:function(){return":host{--background:transparent;--color-focused:var(--color);--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:.5;pointer-events:none}@media (any-hover:hover){:host(:hover) .button-native{background:var(--background-hover);color:var(--color-hover)}}:host(.ion-focused) .button-native{background:var(--background-focused);color:var(--color-focused)}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host-context(ion-toolbar:not(.ion-color)){color:var(--ion-toolbar-color,var(--color))}:host{--background-focused:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--border-radius:4px;--color:var(--ion-color-primary,#3880ff);--padding-start:5px;--padding-end:5px;height:32px;font-size:31px}:host(.activated){opacity:.4}@media (any-hover:hover){:host(:hover){opacity:.6}}:host(.ion-color.ion-focused) .button-native{background:rgba(var(--ion-color-base-rgb),.1)}"},enumerable:!0,configurable:!0}),t}(),y=function(){function t(t){Object(o["l"])(this,t)}return t.prototype.open=function(t){return c["a"].open(t)},t.prototype.close=function(t){return c["a"].close(t)},t.prototype.toggle=function(t){return c["a"].toggle(t)},t.prototype.enable=function(t,n){return c["a"].enable(t,n)},t.prototype.swipeGesture=function(t,n){return c["a"].swipeGesture(t,n)},t.prototype.isOpen=function(t){return c["a"].isOpen(t)},t.prototype.isEnabled=function(t){return c["a"].isEnabled(t)},t.prototype.get=function(t){return c["a"].get(t)},t.prototype.getOpen=function(){return c["a"].getOpen()},t.prototype.getMenus=function(){return c["a"].getMenus()},t.prototype.isAnimating=function(){return c["a"].isAnimating()},t.prototype.registerAnimation=function(t,n){return Object(i["a"])(this,void 0,void 0,(function(){return Object(i["c"])(this,(function(e){return[2,c["a"].registerAnimation(t,n)]}))}))},t}(),O=function(){function t(t){var n=this;Object(o["l"])(this,t),this.visible=!1,this.autoHide=!0,this.onClick=function(){return c["a"].toggle(n.menu)}}return t.prototype.connectedCallback=function(){this.visibilityChanged()},t.prototype.visibilityChanged=function(){return Object(i["a"])(this,void 0,void 0,(function(){var t;return Object(i["c"])(this,(function(n){switch(n.label){case 0:return t=this,[4,g(this.menu)];case 1:return t.visible=n.sent(),[2]}}))}))},t.prototype.render=function(){var t,n=Object(o["e"])(this),e=this.autoHide&&!this.visible;return Object(o["i"])(o["a"],{onClick:this.onClick,"aria-hidden":e?"true":null,class:(t={},t[n]=!0,t["menu-toggle-hidden"]=e,t)},Object(o["i"])("slot",null))},Object.defineProperty(t,"style",{get:function(){return":host(.menu-toggle-hidden){display:none}"},enumerable:!0,configurable:!0}),t}()},"264c":function(t,n,e){"use strict";e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"d",(function(){return u}));var i=e("9ab4"),o=function(t,n){return null!==n.closest(t)},r=function(t){var n;return"string"===typeof t&&t.length>0?(n={"ion-color":!0},n["ion-color-"+t]=!0,n):void 0},s=function(t){if(void 0!==t){var n=Array.isArray(t)?t:t.split(" ");return n.filter((function(t){return null!=t})).map((function(t){return t.trim()})).filter((function(t){return""!==t}))}return[]},a=function(t){var n={};return s(t).forEach((function(t){return n[t]=!0})),n},c=/^[a-z][a-z0-9+\-.]*:/,u=function(t,n,e){return Object(i["a"])(void 0,void 0,void 0,(function(){var o;return Object(i["c"])(this,(function(i){return null!=t&&"#"!==t[0]&&!c.test(t)&&(o=document.querySelector("ion-router"),o)?(null!=n&&n.preventDefault(),[2,o.push(t,e)]):[2,!1]}))}))}},b985:function(t,n,e){"use strict";e.d(n,"a",(function(){return i})),e.d(n,"b",(function(){return o}));var i=function(){function t(t,n){this.x=t,this.y=n}return t}(),o=function(t,n,e,i,o){var a=s(t.y,n.y,e.y,i.y,o);return r(t.x,n.x,e.x,i.x,a[0])},r=function(t,n,e,i,o){var r=3*n*Math.pow(o-1,2),s=-3*e*o+3*e+i*o,a=t*Math.pow(o-1,3);return o*(r+o*s)-a},s=function(t,n,e,i,o){t-=o,n-=o,e-=o,i-=o;var r=c(i-3*e+3*n-t,3*e-6*n+3*t,3*n-3*t,t);return r.filter((function(t){return t>=0&&t<=1}))},a=function(t,n,e){var i=n*n-4*t*e;return i<0?[]:[(-n+Math.sqrt(i))/(2*t),(-n-Math.sqrt(i))/(2*t)]},c=function(t,n,e,i){if(0===t)return a(n,e,i);n/=t,e/=t,i/=t;var o=(3*e-n*n)/3,r=(2*n*n*n-9*n*e+27*i)/27;if(0===o)return[Math.pow(-r,1/3)];if(0===r)return[Math.sqrt(-o),-Math.sqrt(-o)];var s=Math.pow(r/2,2)+Math.pow(o/3,3);if(0===s)return[Math.pow(r/2,.5)-n/3];if(s>0)return[Math.pow(-r/2+Math.sqrt(s),1/3)-Math.pow(r/2+Math.sqrt(s),1/3)-n/3];var c=Math.sqrt(Math.pow(-o/3,3)),u=Math.acos(-r/(2*Math.sqrt(Math.pow(-o/3,3)))),h=2*Math.pow(c,1/3);return[h*Math.cos(u/3)-n/3,h*Math.cos((u+2*Math.PI)/3)-n/3,h*Math.cos((u+4*Math.PI)/3)-n/3]}}}]);
//# sourceMappingURL=chunk-e10b5e90.94638aa5.js.map