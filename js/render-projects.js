document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('project-container');

    projectsData.forEach(project => {
        const tagsHtml = project.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join('');

        let linksHtml = '';
        if (project.links.demo) {
            linksHtml += `<a href="${project.links.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
        }
        if (project.links.source) {
            linksHtml += `<a href="${project.links.source}" target="_blank"><i class="fab fa-github"></i> Source Code</a>`;
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
                    <div class="card-links">
                        ${linksHtml}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += cardHtml;
    });
});