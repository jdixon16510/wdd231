document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const data = {
    firstName: params.get("firstName") || "N/A",
    title: params.get("title") || "N/A",
    lastName: params.get("lastName") || "N/A",
    email: params.get("email") || "N/A",
    phone: params.get("phone") || "N/A",
    business: params.get("business") || "N/A",
    timestamp: params.get("timestamp") || "N/A"
  };

  // Format the ISO timestamp to local date and time format
  function formatTimestamp(iso) {
    if (iso === "N/A") return iso;

    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

   document.getElementById("name").textContent = `${data.firstName} ${data.lastName}`;
   document.getElementById("title").textContent = data.title;
   document.getElementById("email").textContent = data.email;
   document.getElementById("phone").textContent = data.phone;
   document.getElementById("business").textContent = data.business;
   document.getElementById("timestamp").textContent = formatTimestamp(data.timestamp);
});
