'use client'

export function Notify(msg: string) {
    const div = document.createElement("div");
  
    div.innerText = msg;
    div.className = `fixed top-[1vw] left-1/2 transform -translate-x-1/2 bg-white text-[#111827] px-6 py-3 rounded shadow-lg border z-[9999] transition-opacity duration-300`;
  
    document.body.appendChild(div);
  
    setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => div.remove(), 300); 
    }, 3000);
}
