(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{26:function(e,n,t){},44:function(e,n,t){"use strict";t.r(n);var c=t(0),s=t(2),a=t.n(s),o=t(19),r=t.n(o),u=(t(25),t(26),t(6)),i=t(9),l=t(3),b=t(7),d=function(e){var n=e.handleChange,t=e.input,s=e.submitPerson;return Object(c.jsxs)("form",{onSubmit:s,className:"mb-4",children:[Object(c.jsxs)("div",{children:["Name: ",Object(c.jsx)("input",{name:"name",type:"text",onChange:n,value:t.name})]}),Object(c.jsxs)("div",{children:["Number: ",Object(c.jsx)("input",{name:"number",type:"number",onChange:n,value:t.number})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",className:"btn btn-info",children:"Add"})})]})},j=t(4),m=t.n(j),h="/api/persons",f=function(){return m.a.get(h).then((function(e){return e.data}))},O=function(e){return m.a.post(h,e).then((function(){return console.log("Operation success!")}))},p=function(e){return m.a.delete("".concat(h,"/").concat(e)).then((function(){return console.log("Delete success!")}))},g=function(e){var n=e.persons,t=e.search,s=e.deletePerson,a=n.filter((function(e){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())}));return Object(c.jsx)("ul",{children:a.map((function(e,n){return Object(c.jsxs)("li",{className:"mb-2",children:[e.name," ",e.number," ",Object(c.jsx)("button",{className:"btn btn-sm btn-danger",onClick:function(){s(e)},children:"Delete"})]},n)}))})},x=function(e){var n=e.message;return n.display?Object(c.jsx)("div",{className:"alert alert-".concat(n.color),style:{position:"absolute",bottom:"0",width:"calc(100% - 30px)"},children:n.message}):null},v=function(e){var n=e.handleSearch,t=e.search;return Object(c.jsxs)("div",{className:"mb-4",children:["Search : ",Object(c.jsx)("input",{name:"search",type:"text",onChange:n,value:t})]})},y=function(){var e=Object(s.useState)([]),n=Object(b.a)(e,2),t=n[0],a=n[1],o=Object(s.useState)({name:"",number:""}),r=Object(b.a)(o,2),j=r[0],m=r[1],h=Object(s.useState)(""),y=Object(b.a)(h,2),N=y[0],S=y[1],w=Object(s.useState)({message:"Message",color:"success",display:!1}),C=Object(b.a)(w,2),k=C[0],P=C[1];Object(s.useEffect)((function(){console.log("effect"),f().then((function(e){console.log(e),a(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{className:"m-0",children:"Search Phonebook"}),Object(c.jsx)(v,{handleSearch:function(e){var n=e.target.value;S(n)},search:N}),Object(c.jsx)("h2",{className:"m-0",children:"Add New Contact"}),Object(c.jsx)(d,{submitPerson:function(e){e.preventDefault();var n=Object(u.a)(t),c=Object(l.a)(Object(l.a)({},j),{},{id:n.length+1});O(c).then((function(){n.push(c),a(n),m({name:"",number:""}),P({message:"Successfully added ".concat(j.name,"!"),color:"success",display:!0}),setTimeout((function(){P({message:"",color:"success",display:!1})}),5e3)})).catch((function(e){console.log(e.response.data),P({message:e.response.data.error,color:"danger",display:!0}),setTimeout((function(){P({message:"",color:"success",display:!1})}),1e4)}))},handleChange:function(e){var n=Object(l.a)(Object(l.a)({},j),{},Object(i.a)({},e.target.name,e.target.value));m(n)},input:j}),Object(c.jsx)("h2",{children:"Phone Numbers"}),Object(c.jsx)(g,{persons:t,search:N,deletePerson:function(e){if(window.confirm("Are you sure you want to delete the contact ".concat(e.name,"?"))){var n=Object(u.a)(t);p(e.id).then((function(){var c=t.findIndex((function(n){return n.id===e.id}));n.splice(c,1),a(n),P({message:"Deleted ".concat(e.name,"!"),color:"danger",display:!0}),setTimeout((function(){P({message:"",color:"success",display:!1})}),5e3)})).catch((function(e){console.log(e.message)}))}}}),Object(c.jsx)(x,{message:k})]})};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(y,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.6459eefc.chunk.js.map