
const API = "http://localhost:3001";

async function fetchSlots() {
  const res = await fetch(API + "/slots");
  const slots = await res.json();
  renderSlots(slots);
}

function renderSlots(slots) {
  const container = document.getElementById("slots-container");
  container.innerHTML = "";
  slots.forEach(slot => {
    const div = document.createElement("div");
    div.className = "slot";
    div.innerHTML = `
      <span class="${slot.name ? 'booked' : 'available'}">${slot.time} - ${slot.name ? 'Booked by ' + slot.name : 'Available'}</span>
      ${slot.name ? 
        `<button onclick="cancelSlot('${slot.time}')">Cancel</button>` :
        `<input id="name-${slot.time}" placeholder="Your name"/>
         <button onclick="bookSlot('${slot.time}')">Book</button>`
      }
    `;
    container.appendChild(div);
  });
}

async function bookSlot(time) {
  const name = document.getElementById("name-" + time).value;
  if (!name) return alert("Enter your name");
  const res = await fetch(API + "/book", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ time, name })
  });
  const result = await res.json();
  alert(result.message);
  fetchSlots();
}

async function cancelSlot(time) {
  const res = await fetch(API + "/cancel", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ time })
  });
  const result = await res.json();
  alert(result.message);
  fetchSlots();
}

window.onload = fetchSlots;
document.getElementById("refresh-btn")?.addEventListener("click", fetchSlots);