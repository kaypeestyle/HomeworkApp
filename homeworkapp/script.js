javascript//for functionality
// Simple data storage (we'll improve this later)
let homeworkList = [];
let submittedWork = [];

// Add new homework
function addHomework() {
    const description = document.getElementById('hw-description').value;
    if (description) {
        const newHW = {
            id: Date.now(),
            description: description,
            date: new Date().toLocaleDateString()
        };
        homeworkList.push(newHW);
        displayHomework();
        document.getElementById('hw-description').value = '';
    }
}

// Display homework list
function displayHomework() {
    const listElement = document.getElementById('homework-list');
    listElement.innerHTML = '';
    
    homeworkList.forEach(hw => {
        const hwElement = document.createElement('div');
        hwElement.className = 'homework-item';
        hwElement.innerHTML = `
            <h3>Homework (${hw.date})</h3>
            <p>${hw.description}</p>
            <button onclick="downloadHomework(${hw.id})">Download</button>
        `;
        listElement.appendChild(hwElement);
    });
}

// Download homework for offline use
function downloadHomework(hwId) {
    const hw = homeworkList.find(item => item.id === hwId);
    if (hw) {
        const hwText = `Homework Assignment\nDate: ${hw.date}\n\n${hw.description}`;
        const blob = new Blob([hwText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `homework-${hw.date}.txt`;
        a.click();
        
        alert('Homework downloaded! You can now work on it offline.');
    }
}

// Submit completed work
function submitWork() {
    const fileInput = document.getElementById('hw-upload');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const work = {
                id: Date.now(),
                fileName: file.name,
                content: e.target.result,
                date: new Date().toLocaleDateString(),
                grade: null,
                feedback: null
            };
            submittedWork.push(work);
            displaySubmittedWork();
            alert('Work submitted successfully!');
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to upload');
    }
}

// Display submitted work (for teacher)
function displaySubmittedWork() {
    const container = document.getElementById('submitted-work');
    container.innerHTML = '';
    
    submittedWork.forEach(work => {
        const workElement = document.createElement('div');
        workElement.className = 'submitted-item';
        workElement.innerHTML = `
            <h3>${work.fileName} (${work.date})</h3>
            <a href="${work.content}" download="${work.fileName}">Download Work</a>
            <div>
                <input type="text" id="grade-${work.id}" placeholder="Grade" value="${work.grade || ''}">
                <textarea id="feedback-${work.id}" placeholder="Feedback">${work.feedback || ''}</textarea>
                <button onclick="saveAssessment(${work.id})">Save</button>
            </div>
        `;
        container.appendChild(workElement);
    });
}

// Save assessment
function saveAssessment(workId) {
    const work = submittedWork.find(item => item.id === workId);
    if (work) {
        work.grade = document.getElementById(`grade-${workId}`).value;
        work.feedback = document.getElementById(`feedback-${workId}`).value;
        alert('Assessment saved!');
    }
}

// Initial display
displayHomework();
displaySubmittedWork();
