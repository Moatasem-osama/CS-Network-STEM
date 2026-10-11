// --- Tool 1 Logic: LAN vs WAN Classifier ---
function classifyNetwork() {
    const range = document.getElementById('distanceRange').value;
    const resultBox = document.getElementById('netResult');
    let htmlContent = '';

    if (range === 'room' || range === 'building') {
        resultBox.style.borderLeftColor = 'var(--accent)';
        htmlContent = `<strong>Type: LAN (Local Area Network)</strong><br>
                       <span style="color: var(--text-muted);">Covers a small geographical area (home, office, or building). Characterized by high data transfer rates and lower costs.</span>`;
    } else if (range === 'city') {
        resultBox.style.borderLeftColor = 'var(--primary)';
        htmlContent = `<strong>Type: WAN (Wide Area Network)</strong><br>
                       <span style="color: var(--text-muted);">Spans a large geographic area such as cities, countries, or globally. The Internet is the most well-known WAN.</span>`;
    }

    resultBox.innerHTML = htmlContent;
    resultBox.style.display = 'block';
}

// --- Tool 2 Logic: P2P Simulator ---
let selectedNodes = [];

function selectNode(nodeId) {
    const nodeElement = document.getElementById(`node${nodeId}`);
    
    // If the node is already selected, deselect it
    if (selectedNodes.includes(nodeId)) {
        selectedNodes = selectedNodes.filter(id => id !== nodeId);
        nodeElement.classList.remove('selected');
    } else {
        // Enforce a maximum selection of 2 nodes
        if (selectedNodes.length >= 2) {
            const oldestNodeId = selectedNodes.shift();
            document.getElementById(`node${oldestNodeId}`).classList.remove('selected');
        }
        selectedNodes.push(nodeId);
        nodeElement.classList.add('selected');
    }

    // Update status elements
    const statusBox = document.getElementById('p2pStatus');
    const sendBtn = document.getElementById('sendBtn');

    if (selectedNodes.length === 1) {
        const name = document.getElementById(`node${selectedNodes[0]}`).innerText;
        statusBox.innerText = `Selected Sender: ${name}. Now choose a receiver...`;
        sendBtn.disabled = true;
    } else if (selectedNodes.length === 2) {
        const name1 = document.getElementById(`node${selectedNodes[0]}`).innerText;
        const name2 = document.getElementById(`node${selectedNodes[1]}`).innerText;
        statusBox.innerText = `Ready to connect: ${name1} ➔ ${name2}`;
        sendBtn.disabled = false;
    } else {
        statusBox.innerText = 'Click on two devices to start transmitting...';
        sendBtn.disabled = true;
    }
}

function sendP2PData() {
    if (selectedNodes.length !== 2) return;
    
    const statusBox = document.getElementById('p2pStatus');
    const name1 = document.getElementById(`node${selectedNodes[0]}`).innerText;
    const name2 = document.getElementById(`node${selectedNodes[1]}`).innerText;

    statusBox.style.color = 'var(--accent)';
    statusBox.innerText = `⚡ Sending packets directly from ${name1} to ${name2}...`;

    // Simulate 2 seconds transmission latency
    setTimeout(() => {
        statusBox.innerText = `✅ Transfer completed successfully without any central server intervention!`;
        statusBox.style.color = 'var(--text-main)';
        
        // Reset the active state on the UI
        selectedNodes.forEach(id => {
            document.getElementById(`node${id}`).classList.remove('selected');
        });
        selectedNodes = [];
        document.getElementById('sendBtn').disabled = true;
    }, 2000);
}

// --- Tool 3 Logic: Admin Tasks ---
function checkAdminAnswer(isCorrect) {
    const feedbackBox = document.getElementById('adminFeedback');
    
    if (isCorrect) {
        feedbackBox.style.color = 'var(--accent)';
        feedbackBox.innerText = "🎯 Correct! Standard practice is to look for bottlenecks and check server performance metrics or switch traffic logs before taking drastic hardware actions.";
    } else {
        feedbackBox.style.color = 'var(--danger)';
        feedbackBox.innerText = "❌ Incorrect option. This action might cause unnecessary downtime, higher expenses, or won't solve the core network issue.";
    }
}
