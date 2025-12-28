let stories = [];

// Notun Golpo Add Kora
function addStory() {
    const title = document.getElementById('storyTitle').value;
    const content = document.getElementById('storyContent').value;

    if (!title || !content) {
        alert("দয়া করে শিরোনাম এবং গল্প দুটিই লিখুন।");
        return;
    }

    const newStory = {
        id: Date.now(),
        title: title,
        content: content,
        likes: 0,
        comments: []
    };

    stories.unshift(newStory);
    renderStories(stories);

    // Input reset
    document.getElementById('storyTitle').value = '';
    document.getElementById('storyContent').value = '';
}

// Golpo UI-te dekhano
function renderStories(data) {
    const container = document.getElementById('storyContainer');
    container.innerHTML = '';

    data.forEach(story => {
        container.innerHTML += `
            <div class="story-card">
                <h2>${story.title}</h2>
                <p>${story.content}</p>
                <div class="actions">
                    <span class="btn" onclick="likeStory(${story.id})">❤️ লাইক (${story.likes})</span>
                    <span class="btn" onclick="toggleComment(${story.id})">💬 কমেন্ট (${story.comments.length})</span>
                </div>
                <div id="comment-section-${story.id}" class="comment-box">
                    <input type="text" placeholder="মতামত লিখুন..." onkeypress="addComment(event, ${story.id})">
                    <div id="comments-${story.id}">
                        ${story.comments.map(c => `<small style="display:block; border-bottom:1px solid #ddd; padding:5px 0;">${c}</small>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });
}

// Like Logic
function likeStory(id) {
    const story = stories.find(s => s.id === id);
    story.likes++;
    renderStories(stories);
}

// Comment Logic
function toggleComment(id) {
    const box = document.getElementById(`comment-section-${id}`);
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function addComment(event, id) {
    if (event.key === 'Enter') {
        const commentText = event.target.value;
        if (commentText) {
            const story = stories.find(s => s.id === id);
            story.comments.push(commentText);
            event.target.value = '';
            renderStories(stories);
            document.getElementById(`comment-section-${id}`).style.display = 'block';
        }
    }
}

// Search Logic
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = stories.filter(s => s.title.toLowerCase().includes(searchTerm));
    renderStories(filtered);
});
