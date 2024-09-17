"use strict";

// Node 객체 불러오기
const btnAdd = document.querySelector(".btn--add");
const btnCheck = document.querySelector(".btn--check");
const btnTrash = document.querySelector(".btn-trash");

const listholder = document.querySelector(".listholder");
const inputTodo = document.querySelector("#input-todo");

const listplace = document.querySelector(".listplace");
const listItems = document.querySelectorAll(".list");

// 1. + 버튼 눌렀을 때, <li> 요소를 동적으로 listholder 안에 추가.
// 👉 HTML 문서를 통째로 바꿔치기 해버리는 innerHTML 대신, 계속해서 추가될 수 있도록 insertAdjacentHTML() 함수 이용!
btnAdd.addEventListener("click", function (e) {
  e.preventDefault();

  const input = inputTodo.value;

  if (input) {
    const html = `<li class="list">
    <p>${input}</p>
    <div class="button-box">
      <button class="btn btn--check">check</button>
      <button class="btn btn--trash">trash</button>
    </div>
   </li>`;

    listholder.insertAdjacentHTML("beforeend", html);
    inputTodo.value = "";
  }
});

// 2. check button 에 직접 이벤트 리스너 달기?? Nono
// 👉 체크버튼의 listholder(부모요소)에 이벤트 위임 설정 (버블링 메커니즘 덕분에 가능 ✔️)
listholder.addEventListener("click", function (e) {
  console.log(e.target);
  // ✅ check button 클릭시
  if (e.target.classList.contains("btn--check")) {
    const listItem = e.target.closest(".list"); // 동적으로 추가된 클래스가 list인 요소가 여러개이므로 클릭된 버튼(check or trash)에서 가장 가까운 상위 요소 중, class="list"인 것을 찾는 것.
    listItem.classList.add("done");
    listItem.querySelector("p").style.textDecoration = "line-through";
  }

  // ✅ trash 버튼을 클릭했는지 확인
  if (e.target.classList.contains("btn--trash")) {
    const listItem = e.target.closest(".list");
    listItem.remove();
  }
});

// 3. in progress, completed 선택시 조건에 만족하는 DOM Node들만 html 상에 보이도록.
// 👉 outerHTML의 쓰임에 주목하자.
listplace.addEventListener("click", function (e) {
  // 💥 클릭할 때마다 최신 상태의 listItems를 가져온다.
  // 🖍️ 문제: progress or completed -> all 버튼을 다시 눌렀을 때 to-do list들이 다시 뜨지 않는다.
  const listItems = document.querySelectorAll(".list");

  // ✅ in progress 버튼 클릭 시
  if (e.target.classList.contains("progress")) {
    listholder.innerHTML = ""; // Clear existing items

    listItems.forEach((item) => {
      if (!item.classList.contains("done")) {
        listholder.insertAdjacentHTML("beforeend", item.outerHTML);
      }
    });
  }

  // ✅ completed 클릭 시
  if (e.target.classList.contains("completed")) {
    listholder.innerHTML = "";

    listItems.forEach((item) => {
      if (item.classList.contains("done")) {
        listholder.insertAdjacentHTML("beforeend", item.outerHTML);
      }
    });
  }

  // ✅ all 클릭 시
  if (e.target.classList.contains("all")) {
    listholder.innerHTML = ""; // Clear existing items

    listItems.forEach((item) => {
      listholder.insertAdjacentHTML("beforeend", item.outerHTML);
    });
  }
});
