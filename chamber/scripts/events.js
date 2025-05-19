async function loadEvents() {
   try {
     const response = await fetch("data/events.json");
     if (!response.ok) throw new Error("Failed to load events");
 
     const data = await response.json();
     const eventsList = document.getElementById("events-list");
 
     data.events.forEach(event => {
       const li = document.createElement("li");
       li.innerHTML = `
         <div class="event-date">${event.date}</div>
         <div class="event-details">${event.title} – ${event.location}</div>
      `;

       eventsList.appendChild(li);
     });
   } catch (error) {
     console.error("Events loading error:", error);
   }
 }
 
 document.addEventListener("DOMContentLoaded", loadEvents);
 