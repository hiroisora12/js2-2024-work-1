import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
// 現在の月と年を格納
let currentDate = new Date();

// 月の名前を設定
const monthNames = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"
];

// カレンダーを描画する関数
function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const calendarDays = document.getElementById("calendar-days");
    
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // 月と年の表示
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    // 1日の曜日を取得
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayWeekday = firstDayOfMonth.getDay(); // 0:日曜日, 1:月曜日, ...
    
    // 月の日数を取得
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // カレンダーの日を表示
    calendarDays.innerHTML = ""; // 前の内容をクリア
    for (let i = 0; i < firstDayWeekday; i++) {
        calendarDays.innerHTML += `<div></div>`; // 空のセル
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.innerHTML += `<div class="calendar-day" data-day="${day}">${day}</div>`;
    }
}

// 予定を保存するための関数
function saveEvent() {
    const datePicker = document.getElementById("date-picker");
    const eventDescription = document.getElementById("event-description");
    
    const date = datePicker.value;
    const description = eventDescription.value;
    
    if (date && description) {
        const eventList = document.getElementById("event-list");
        const newEvent = document.createElement("li");
        newEvent.textContent = `${date}: ${description}`;
        eventList.appendChild(newEvent);
        
        // フォームをリセット
        datePicker.value = "";
        eventDescription.value = "";
    }
}

// 月を変更する関数
document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// 予定を保存ボタンにイベントリスナーを追加
document.getElementById("save-event").addEventListener("click", saveEvent);

// 最初のカレンダーを描画
renderCalendar();
