// AI Assistant Knowledge Base
const knowledgeBase = {
    'register': {
        keywords: ['register', 'registration', 'cipc', 'company', 'start'],
        response: `To register a business in South Africa:
        
1. **Choose Business Structure**: Sole proprietor, Partnership, or Private Company (Pty Ltd)
2. **Visit CIPC Website**: Go to https://www.cipc.co.za/
3. **Reserve Company Name**: Check availability and reserve
4. **Submit Documents**:
   - ID copies of directors
   - Proof of address
   - MOI (Memorandum of Incorporation for Pty Ltd)
5. **Pay Registration Fee**: R175 for Pty Ltd (online)
6. **Get Certificate**: Usually processed within 5-7 working days

Need more help? Visit CIPC directly or contact a local business consultant.`
    },
    'marketing': {
        keywords: ['market', 'advertise', 'grow', 'customers', 'sales', 'channels'],
        response: `Best marketing channels for SA businesses:

🛒 **E-Commerce**: Takealot, BidorBuy, Shopify
📱 **Social Media**: Facebook, Instagram, TikTok (huge in SA!)
📍 **Local SEO**: Google My Business is FREE and essential
📊 **Paid Ads**: Start with Facebook Ads (good ROI in SA market)
📧 **Email**: Mailchimp for newsletters

**Pro Tip**: Focus on mobile-first! Most SA customers browse on phones.

Check the "Channels" section above for direct links! 👆`
    },
    'funding': {
        keywords: ['fund', 'loan', 'capital', 'money', 'investment', 'finance'],
        response: `SA Business Funding Options:

💰 **Government Agencies**:
- **SEDA**: Free business support + funding (https://www.seda.org.za/)
- **NEF**: National Empowerment Fund for black-owned businesses
- **IDC**: Industrial Development Corporation (larger amounts)

🏦 **Banks**:
- FNB Business Loans
- Standard Bank SME Finance
- Nedbank Business Banking

👥 **Private**:
- Business Partners Limited (equity + loan)
- Angel investors via Silicon Cape
- Crowdfunding platforms

Requirements: Business plan, financial statements, collateral (sometimes)`
    },
    'tax': {
        keywords: ['tax', 'sars', 'vat', 'paye', 'compliance'],
        response: `SA Tax Compliance Guide:

✅ **Income Tax**: All businesses must register
✅ **VAT**: Required if turnover > R1 million/year
✅ **PAYE**: If you have employees
✅ **UIF**: Unemployment Insurance for employees

**Important Deadlines**:
- VAT returns: Every 2 months
- Provisional tax: Feb 28 & Aug 31
- Annual returns: Varies by year-end

💡 Use eFiling (https://www.sarsefiling.co.za/) - it's free!
📞 SARS Contact Centre: 0800 00 SARS (7277)

Consider hiring an accountant if turnover > R500k/year.`
    },
    'bbee': {
        keywords: ['bbee', 'b-bbee', 'bbbee', 'empowerment', 'transformation'],
        response: `B-BBEE (Broad-Based Black Economic Empowerment):

**Who needs it?**
- Businesses wanting government tenders
- Companies doing business with large corporates
- Entities with turnover > R10 million

**Levels**: 1 (best) to 8 (non-compliant)

**Key Elements**:
1. Ownership (25 points)
2. Management Control (19 points)
3. Skills Development (20 points)
4. Enterprise & Supplier Development (40 points)
5. Socio-Economic Development (5 points)

**EME Status**: Turnover < R10m = automatic Level 4
**QSE Status**: R10m - R50m

Get verified annually by SANAS-accredited agency.`
    },
    'default': {
        keywords: [],
        response: `I can help you with:

📋 **Business Registration**: How to register with CIPC
💰 **Funding**: SEDA, NEF, loans, and grants
📊 **Marketing**: Best channels for SA businesses
💵 **Tax**: SARS registration and compliance
👥 **HR**: Labour laws, UIF, COID
🏆 **B-BBEE**: Transformation and compliance

Try asking: "How do I register a business?" or use the quick buttons above!`
    }
};

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Get AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function askQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

function addMessage(text, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = text.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check each knowledge category
    for (const [category, data] of Object.entries(knowledgeBase)) {
        if (category === 'default') continue;
        
        for (const keyword of data.keywords) {
            if (lowerMessage.includes(keyword)) {
                return data.response;
            }
        }
    }
    
    // Default response
    return knowledgeBase.default.response;
}

// Handle Enter key in chat
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Progress tracker for checklist
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Save to localStorage
            const checkedItems = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.nextElementSibling.textContent);
            
            localStorage.setItem('businessChecklist', JSON.stringify(checkedItems));
            
            // Visual feedback
            if (checkbox.checked) {
                checkbox.parentElement.style.backgroundColor = '#06D6A033';
            } else {
                checkbox.parentElement.style.backgroundColor = '';
            }
        });
    });
    
    // Load saved progress
    const saved = JSON.parse(localStorage.getItem('businessChecklist') || '[]');
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        if (saved.includes(label)) {
            checkbox.checked = true;
            checkbox.parentElement.style.backgroundColor = '#06D6A033';
        }
    });
});

// Business Name Generator
function generateBusinessName() {
    const keyword = document.getElementById('nameKeyword').value.trim();
    const resultsDiv = document.getElementById('nameResults');
    
    if (!keyword) {
        resultsDiv.innerHTML = '<p style="color: var(--gray);">Please enter a keyword first!</p>';
        return;
    }
    
    const prefixes = ['Smart', 'Pro', 'Elite', 'Prime', 'Flex', 'Zulu', 'Mzansi', 'iAfrica', 'SA'];
    const suffixes = ['Hub', 'Solutions', 'Group', 'Ventures', 'Services', 'Connect', 'Network', 'Digital', 'Pro'];
    
    let names = [];
    for (let i = 0; i < 5; i++) {
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
        
        if (i % 2 === 0) {
            names.push(`${randomPrefix} ${capitalizedKeyword} ${randomSuffix}`);
        } else {
            names.push(`${capitalizedKeyword} ${randomSuffix}`);
        }
    }
    
    resultsDiv.innerHTML = names.map(name => `<div class="name-result">${name}</div>`).join('');
}

// Cost Calculator
function calculateCosts() {
    const regFee = parseFloat(document.getElementById('regFee').value) || 0;
    const rentFee = parseFloat(document.getElementById('rentFee').value) || 0;
    const equipFee = parseFloat(document.getElementById('equipFee').value) || 0;
    const marketFee = parseFloat(document.getElementById('marketFee').value) || 0;
    
    const total = regFee + rentFee + equipFee + marketFee;
    const resultsDiv = document.getElementById('costResults');
    
    resultsDiv.innerHTML = `
        <div>💰 Estimated Startup Cost</div>
        <div style="font-size: 2rem; margin-top: 0.5rem;">R${total.toLocaleString('en-ZA', {minimumFractionDigits: 2})}</div>
    `;
}

// Template Download
function downloadTemplate(templateType) {
    const templates = {
        'business-plan': {
            name: 'SA_Business_Plan_Template.txt',
            content: `BUSINESS PLAN TEMPLATE - SOUTH AFRICA\n\n1. EXECUTIVE SUMMARY\n   - Business Name:\n   - Location:\n   - Industry:\n   - Funding Required:\n\n2. COMPANY DESCRIPTION\n   - Mission Statement:\n   - Vision:\n   - Key Products/Services:\n\n3. MARKET ANALYSIS\n   - Target Market:\n   - Competition:\n   - Market Size:\n\n4. ORGANIZATION & MANAGEMENT\n   - Management Team:\n   - Organizational Structure:\n\n5. PRODUCTS/SERVICES\n   - Description:\n   - Pricing:\n\n6. MARKETING & SALES\n   - Marketing Strategy:\n   - Sales Channels:\n\n7. FINANCIAL PROJECTIONS\n   - Startup Costs:\n   - Revenue Forecast:\n   - Break-even Analysis:\n\n8. FUNDING REQUEST\n   - Amount Needed:\n   - Use of Funds:\n\nFor more detailed templates, visit SEDA: https://www.seda.org.za/`
        },
        'invoice': {
            name: 'SA_Invoice_Template.txt',
            content: `INVOICE\n\nYour Company Name\nAddress\nVAT No: [if applicable]\nTel: [phone]\nEmail: [email]\n\nINVOICE TO:\nClient Name:\nAddress:\n\nINVOICE #: [number]\nDATE: [date]\nDUE DATE: [due date]\n\nDESCRIPTION | QTY | RATE | AMOUNT\n-----------------------------------\n\nSUBTOTAL: R\nVAT (15%): R\nTOTAL: R\n\nPAYMENT TERMS: [e.g., 30 days]\nBANKING DETAILS:\nBank:\nAccount Name:\nAccount Number:\nBranch Code:`
        },
        'contract': {
            name: 'SA_Service_Agreement_Template.txt',
            content: `SERVICE AGREEMENT\n\nThis Agreement is entered into on [DATE] between:\n\nSERVICE PROVIDER:\nName:\nAddress:\nRegistration No:\n\nAND\n\nCLIENT:\nName:\nAddress:\n\n1. SERVICES\nThe Service Provider agrees to provide:\n[Description of services]\n\n2. PAYMENT\nFee: R\nPayment Terms:\n\n3. TERM\nStart Date:\nEnd Date:\n\n4. TERMINATION\nNotice Period: [days]\n\n5. CONFIDENTIALITY\n[Terms]\n\n6. APPLICABLE LAW\nThis agreement shall be governed by the laws of South Africa.\n\nSIGNED:\n\nService Provider: ________________  Date: __________\n\nClient: _________________  Date: __________`
        },
        'quotation': {
            name: 'SA_Quotation_Template.txt',
            content: `QUOTATION\n\nYour Company Name\nAddress\nTel:\nEmail:\n\nQUOTATION FOR:\nClient Name:\nClient Address:\n\nQuote #: [number]\nDate: [date]\nValid Until: [expiry date]\n\nITEM | DESCRIPTION | QTY | UNIT PRICE | TOTAL\n----------------------------------------------\n\nSUBTOTAL: R\nVAT (15%): R\nTOTAL: R\n\nTERMS & CONDITIONS:\n- Quote valid for 30 days\n- 50% deposit required\n- Payment terms: [specify]\n\nPlease sign below to accept this quotation:\n\nSignature: ________________  Date: __________`
        }
    };
    
    const template = templates[templateType];
    if (!template) return;
    
    // Create and download file
    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = template.name;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert(`✅ Downloaded: ${template.name}\n\nNote: This is a basic template. Consult with a legal professional for specific requirements.`);
}

// Growth Tracker
let revenueData = JSON.parse(localStorage.getItem('revenueData')) || [];

function addRevenueEntry() {
    const revenue = parseFloat(document.getElementById('monthlyRevenue').value);
    if (!revenue || revenue <= 0) {
        alert('Please enter a valid revenue amount!');
        return;
    }
    
    revenueData.push({
        month: revenueData.length + 1,
        amount: revenue
    });
    
    localStorage.setItem('revenueData', JSON.stringify(revenueData));
    document.getElementById('monthlyRevenue').value = '';
    
    updateGrowthChart();
}

function updateGrowthChart() {
    const statsDiv = document.getElementById('growthStats');
    
    if (revenueData.length === 0) {
        statsDiv.innerHTML = 'Add your first revenue entry to start tracking!';
        return;
    }
    
    const total = revenueData.reduce((sum, entry) => sum + entry.amount, 0);
    const avg = total / revenueData.length;
    const growth = revenueData.length > 1 ? 
        ((revenueData[revenueData.length - 1].amount - revenueData[0].amount) / revenueData[0].amount * 100) : 0;
    
    statsDiv.innerHTML = `
        <div>📊 Entries: ${revenueData.length} months</div>
        <div>💰 Total Revenue: R${total.toLocaleString('en-ZA', {minimumFractionDigits: 2})}</div>
        <div>📈 Growth: ${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%</div>
    `;
}

// FAQ Toggle
function toggleFAQ(element) {
    element.classList.toggle('active');
}

// Initialize growth tracker on load
document.addEventListener('DOMContentLoaded', () => {
    updateGrowthChart();
});

console.log('🚀 SA Business Assistant loaded successfully!');
