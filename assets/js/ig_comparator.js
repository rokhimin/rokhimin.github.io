function extractUsernames(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const links = doc.querySelectorAll('a[target="_blank"]');
    return new Set([...links].map(link => link.textContent.trim()));
}

function compareLists() {
    const followingFile = document.getElementById('followingFile').files[0];
    const followersFile = document.getElementById('followersFile').files[0];
    
    if (!followingFile || !followersFile) {
        alert("Please upload both files.");
        return;
    }
    
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function(event) {
        const followingSet = extractUsernames(event.target.result);
        reader2.onload = function(event) {
            const followersSet = extractUsernames(event.target.result);
            
            const notFollowingBack = [...followingSet].filter(user => !followersSet.has(user));
            const notFollowedBack = [...followersSet].filter(user => !followingSet.has(user));
            
            document.getElementById('notFollowingBack').value = notFollowingBack.join('\n');
            document.getElementById('notFollowedBack').value = notFollowedBack.join('\n');
        };
        reader2.readAsText(followersFile);
    };
    reader1.readAsText(followingFile);
}

function copyToClipboard(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

function downloadText(elementId, filename) {
    const text = document.getElementById(elementId).value;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}