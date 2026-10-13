const KEY="hemline_products";let items;
try{items=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!Array.isArray(items))items=DEFAULT_PRODUCTS.map(p=>({...p}));
const $=id=>document.getElementById(id);
const COLORS={Tops:"#9db4d3",Bottoms:"#3f5b87",Outerwear:"#4d6a5e",Accessories:"#cbb994"};
function persist(){try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){}}
function say(t){$("msg").textContent=t}
function esc(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function render(){
 $("rows").innerHTML=items.length?items.map(p=>`<tr><td>${esc(p.name)}</td><td>${p.category}</td><td>$${Number(p.price).toFixed(2)}</td><td>${p.stock}</td>
 <td><button class="btn ghost sm" data-e="${p.id}">Edit</button><button class="btn danger sm" data-d="${p.id}">Delete</button></td></tr>`).join(""):'<tr><td colspan="5">No products yet. Use the form above to add one.</td></tr>';
}
function reset(){$("form").reset();$("pid").value="";$("save").textContent="Add product";$("cancel").hidden=true}
$("form").addEventListener("submit",e=>{
 e.preventDefault();
 const d={name:$("name").value.trim(),category:$("cat").value,price:+$("price").value,stock:+$("stock").value};
 if(!d.name){say("Enter a product name.");return}
 const id=+$("pid").value;
 if(id){Object.assign(items.find(p=>p.id===id),d);say("Product updated.")}
 else{items.push({id:Date.now(),color:COLORS[d.category],...d});say("Product added.")}
 persist();render();reset();
});
$("cancel").onclick=()=>{reset();say("")};
$("rows").addEventListener("click",e=>{
 const ed=e.target.dataset.e,del=e.target.dataset.d;
 if(ed){const p=items.find(x=>x.id==ed);$("pid").value=p.id;$("name").value=p.name;$("cat").value=p.category;$("price").value=p.price;$("stock").value=p.stock;$("save").textContent="Save changes";$("cancel").hidden=false;$("name").focus();say("Editing "+p.name+".")}
 if(del){const p=items.find(x=>x.id==del);if(confirm("Delete "+p.name+"?")){items=items.filter(x=>x.id!=del);persist();render();say("Product deleted.")}}
});
render();
