(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(14),u=t.n(c),r=(t(20),t(4)),l=t(2),i=t(3),s=t.n(i),m="/api/persons",f=function(){return s.a.get(m)},d=function(e){return s.a.post(m,e)},p=function(e){return s.a.delete("".concat(m,"/").concat(e))},h=function(e,n,t){return s.a.put("".concat(m,"/").concat(t),e)},b=function(e){var n=e.person,t=e.handleDelete;return o.a.createElement("div",null," ",n.name," : ",n.number," ",o.a.createElement("button",{onClick:t},"delete"))},v=function(e){var n=e.addPerson,t=e.newName,a=e.inputName,c=e.inputPhone,u=e.newPhone;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,o.a.createElement("h1",null,"Add a new"),"name: ",o.a.createElement("input",{value:t,onChange:a})," ",o.a.createElement("br",null),"number: ",o.a.createElement("input",{value:u,onChange:c})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.onInput,t=e.value;return o.a.createElement("div",null,o.a.createElement("span",null,"filter shown with")," ",o.a.createElement("input",{onChange:n,value:t}))},g=(t(38),function(e){var n=e.message,t=e.status;return o.a.createElement("div",{className:t?"positive":"negative"},n)}),w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),s=i[0],m=i[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),O=j[0],k=j[1],S=Object(a.useState)(""),y=Object(l.a)(S,2),P=y[0],T=y[1],C=Object(a.useState)(null),N=Object(l.a)(C,2),D=N[0],I=N[1],A=Object(a.useState)(!0),J=Object(l.a)(A,2),L=J[0],x=J[1];Object(a.useEffect)((function(){f().then((function(e){c(e.data)})).catch((function(e){console.log("fail",e)}))}),[]);var B=0===P.length?t:t.filter((function(e){return e.name.toLowerCase().includes(P)}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),null===D?null:o.a.createElement(g,{message:D,status:L}),o.a.createElement(E,{onInput:function(e){T(e.target.value.toLowerCase())},value:P}),o.a.createElement(v,{addPerson:function(e){e.preventDefault();var n={name:s,number:O},a=t.find((function(e){return e.name===n.name}));if(a)if(window.confirm("".concat(a.name," already added to phonebook, repace the old phone number with a new one? "))){var o=a.id;h(Object(r.a)(Object(r.a)({},a),{},{number:n.number}),n.name,o).then((function(e){c(t.map((function(n){return n.id!==o?n:e.data}))),x(!0),I("".concat(n.name,"'s Number Updated Successfully")),setTimeout((function(){I(null)}),3e3),m(""),k("")})).catch((function(e){m(""),k(""),x(!1),I("".concat(e.response.data.error)),setTimeout((function(){I(null)}),3e3),console.log(e.response.data.error)}))}else x(!1),I("process cancelled"),setTimeout((function(){I(null)}),3e3),m(""),k("");else n.name?d(n).then((function(e){console.log(e),c(t.concat(n)),x(!0),I("Added ".concat(n.name," to the phonebook")),setTimeout((function(){I(null)}),3e3),m(""),k("")})).catch((function(e){m(""),k(""),x(!1),I("".concat(e.response.data.error)),setTimeout((function(){I(null)}),3e3),console.log(e.response.data.error)})):alert("input field is empty")},inputName:function(e){m(e.target.value)},inputPhone:function(e){k(e.target.value)},newName:s,newPhone:O}),B.map((function(e,n){return o.a.createElement(b,{key:n,person:e,handleDelete:function(){return n=e.id,a=e.name,console.log(n),void(window.confirm("Delete ".concat(a," ?"))&&p(n).then((function(e){c(t.filter((function(e){return e.id!==n}))),x(!0),I("".concat(a," was deleted from the phonebook ")),setTimeout((function(){I(null)}),3e3)})).catch((function(e){console.log("fail",e),x(!1),I("Information of ".concat(a," has already been removed from server")),setTimeout((function(){I(null)}),3e3)})));var n,a}})})))};u.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ab6a0e19.chunk.js.map