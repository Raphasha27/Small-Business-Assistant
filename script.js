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

console.log('🚀 SA Business Assistant loaded successfully!');
