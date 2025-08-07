console.log("연결됐음");
let btn1 = document.querySelector("#btn1");

btn1.addEventListener("click", () => {
    console.log("버튼클릭했슈");
});

//선언식 함수선언 greet,name 이름 지어놓기
function greet(name) {
    return `안녕, ${name}님!`;
}
console.log(greet("채린")); //콘솔을 통해 호출하기