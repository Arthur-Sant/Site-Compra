const btnBuy = document.getElementsByClassName("buy")

for(let i = 0; i < btnBuy.length; i++){
  const item = btnBuy.item(i);

  item.addEventListener("click", (event) => {
    save(Number(event.target.value));
  })
}

function returnObjetct(id){
  if(id){
    let obj = [];
    switch(id){
    case 1: obj = ["PC Gamer",3894.63,"img/pc.jpg"]; break;
    case 2: obj = ["Cadeira Gamer",1079.00,"img/cadeira.jpg"];break;
    case 3: obj = ["Mesa Gamer",289.99,"img/mesa.jpg"];break;
    case 4: obj = ["Monitor",844.33,"img/monitor.jpg"];break;
    case 5: obj = ["Mouse",694.00,"img/mouse.jpg"];break;
    case 6: obj = ["Teclado Gamer",411.65,"img/teclado.jpg"];break;
  }
  return {name: obj[0], value: obj[1], img: obj[2]};
}
}

function getAll(){
  let obj = [];
  const objString = localStorage.getItem("buy");
  if(objString){
    obj = JSON.parse(objString);
  }
  return obj
}

function save(id){
  const {name, value, img} = returnObjetct(id);
  const obj = {id, name, value, img, amount: 1};
  const list = getAll();
  let idList = list.filter(element => element.id == id);
  if(idList.length){ 
    obj.amount = idList[idList.length - 1].amount + 1;
    let index = list.findIndex(element => element.id == id);
    list[index] = obj
  }else{
  list.push(obj);
  }
  localStorage.setItem("buy", JSON.stringify(list))
  load()
}

function render(id, name, value, img, amount){
  const [list] = document.getElementsByClassName("list-group");

  if(list){
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const imgList = document.createElement("img");
    imgList.src = img;
    imgList.style.width = "60px";
    imgList.style.height = "60px";

    const p1 = document.createElement("p");
    p1.append(name);

    const p2 = document.createElement("p");
    p2.append("R$ " + value.toLocaleString("pt-BR"));

    const input = document.createElement("input");
    input.readOnly = true;
    input.style.width = "45%";
    input.style.textAlign = "center";
    input.value = amount;

    const btnMinus = document.createElement("button");
    btnMinus.innerText = "-"
    btnMinus.value = id
    btnMinus.classList.add("btn-list-buy");
    btnMinus.addEventListener("click", (element) => {
      deleteItem(element.target.value);
      window.onload;
    });

    const btnPlus = document.createElement("button");
    btnPlus.classList.add("btn-list-buy");
    btnPlus.innerText = "+";
    btnPlus.value = id
    btnPlus.addEventListener("click", (element) => {
      save(Number(element.target.value));
    })

    const div = document.createElement("div");
    div.classList.add("list-obj");

    const span = document.createElement("span");
    span.classList.add("span-list");
    span.appendChild(btnMinus);
    span.appendChild(input);
    span.appendChild(btnPlus);

    div.appendChild(p1)
    div.appendChild(span)
    div.appendChild(p2)


    li.appendChild(imgList)
    li.appendChild(div)

    list.appendChild(li)
  }
}

function deleteItem(id){
  let list = getAll();
  let idList = list.filter(element => element.id == id);
  let qtd = idList[idList.length - 1].amount  - 1;
  let index = list.findIndex(element => element.id == id);
  if(qtd > 0)
  list[index].amount = qtd;
  else{
    list = list.filter( element => element.id != id );
  }
  localStorage.setItem("buy", JSON.stringify(list));
  load()
}

function load(){
  const [list] = document.getElementsByClassName("list-group");
  list.innerHTML = "";
  let soma = 0; 
  getAll().forEach(element => {
    render(element.id, element.name, element.value, element.img, element.amount);
    soma += (element.value * element.amount);
  });

  const test = getAll();
  let li = document.createElement("li");
  li.style.listStyle = "none";
  if(test.length){
      const p = document.createElement("p");
      p.style.fontSize = "20px";
      p.style.margin = 0;
      p.innerText = "R$ " + soma.toLocaleString("pt-BR");

      const button = document.createElement("button");
      button.classList.add(...["btn","btn-danger"]);
      button.style.width = "50%";
      button.innerText = "Pagar"

      li.classList.add("li-pay")
      li.appendChild(p);
      li.appendChild(button)
  }else{
    const img = document.createElement("img")
    img.src = "img/shopping-cart.svg"
    img.style.width = "100%";
    li.appendChild(img)
  }
  list.appendChild(li)
}

window.onload = load();