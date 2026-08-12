document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('project-container');
    let allCardsHtml = ''; // Variabel penampung agar render lebih ringan

    projectsData.forEach(project => {
        const tagsHtml = project.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join('');

        let linksHtml = '';
        
        // Link Demo
        if (project.links.demo && project.links.demo !== "#") {
            linksHtml += `<a href="${project.links.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
        }
        
        // Link Source Code
        if (project.links.source) {
            if (Array.isArray(project.links.source)) {
                linksHtml += `
                    <a href="${project.links.source[0]}" target="_blank"><i class="fab fa-github"></i> Source (FE)</a>
                    <a href="${project.links.source[1]}" target="_blank"><i class="fab fa-github"></i> Source (BE)</a>
                `;
            } else {
                linksHtml += `<a href="${project.links.source}" target="_blank"><i class="fab fa-github"></i> Source Code</a>`;
            }
        }

        // --- INI LOGIKA BARU UNTUK TOMBOL STUDI KASUS ---
        if (project.hasCaseStudy) {
            linksHtml += `
                <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem; cursor: pointer; margin-left: auto;" onclick="openCaseStudy()">
                    <i class="fas fa-book-open"></i> Studi Kasus
                </button>
            `;
        }

        const cardHtml = `
            <div class="project-card">
                <div class="card-img">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="card-content">
                    <div class="card-title">${project.title}</div>
                    <p class="card-desc">${project.desc}</p>
                    <div class="tags">
                        ${tagsHtml}
                    </div>
                    <!-- Tambahan flex-wrap agar kalau tombolnya banyak, tidak berantakan -->
                    <div class="card-links" style="align-items: center; flex-wrap: wrap;">
                        ${linksHtml}
                    </div>
                </div>
            </div>
        `;

        allCardsHtml += cardHtml;
    });

    container.innerHTML = allCardsHtml;
});