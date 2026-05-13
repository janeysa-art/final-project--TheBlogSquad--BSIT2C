document.addEventListener('DOMContentLoaded', () => {
    // Check if we have saved data
    const savedData = localStorage.getItem('blogSquadUser');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Update elements on the page if they exist
        // Example: If you have <h2 id="heroName"></h2>
        if(document.getElementById('heroName')) {
            document.getElementById('heroName').innerText = data.name;
        }
        
        if(document.getElementById('displayBio')) {
            document.getElementById('displayBio').innerText = data.bio;
        }
    }
});
const savedData = JSON.parse(localStorage.getItem('userProfile'));
if (savedData) {
    document.getElementById('profileName').innerText = savedData.name;
    document.getElementById('profileBio').innerText = savedData.bio;
    // ... repeat for other fields
}