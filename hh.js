let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function saveJobs() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

function renderJobs() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  jobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <strong>${job.title}</strong> chez <em>${job.company}</em><br>
      Statut: 
      <select onchange="updateStatus(${index}, this.value)">
        <option ${job.status === "À postuler" ? "selected" : ""}>À postuler</option>
        <option ${job.status === "Postulé" ? "selected" : ""}>Postulé</option>
        <option ${job.status === "Entretien" ? "selected" : ""}>Entretien</option>
        <option ${job.status === "Refus" ? "selected" : ""}>Refus</option>
      </select><br>
      <a href="${job.link}" target="_blank">Voir l'offre</a><br>
      <button onclick="deleteJob(${index})">🗑 Supprimer</button>
    `;
    jobList.appendChild(card);
  });
}

function addJob() {
  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const link = document.getElementById("link").value.trim();
  const status = document.getElementById("status").value;

  if (title && company && link) {
    jobs.push({ title, company, link, status });
    saveJobs();
    renderJobs();
    document.getElementById("title").value = "";
    document.getElementById("company").value = "";
    document.getElementById("link").value = "";
    document.getElementById("status").value = "À postuler";
  } else {
    alert("Veuillez remplir tous les champs.");
  }
}

function deleteJob(index) {
  if (confirm("Supprimer cette offre ?")) {
    jobs.splice(index, 1);
    saveJobs();
    renderJobs();
  }
}

function updateStatus(index, newStatus) {
  jobs[index].status = newStatus;
  saveJobs();
}

renderJobs();