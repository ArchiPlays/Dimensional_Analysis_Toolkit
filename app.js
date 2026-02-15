// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    const expressionInput = document.getElementById('expression');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');
    const quantitiesList = document.getElementById('quantitiesList');
    const searchInput = document.getElementById('searchQuantities');

    // Initialize quantities list
    displayQuantities(getAllQuantities());

    // Analyze button click
    analyzeBtn.addEventListener('click', () => {
        const expression = expressionInput.value.trim();
        if (expression) {
            analyzeExpression(expression);
        }
    });

    // Enter key in input
    expressionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const expression = expressionInput.value.trim();
            if (expression) {
                analyzeExpression(expression);
            }
        }
    });

    // Example buttons
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const expr = btn.getAttribute('data-expr');
            expressionInput.value = expr;
            analyzeExpression(expr);
        });
    });

    // Search quantities
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query) {
            displayQuantities(searchQuantities(query));
        } else {
            displayQuantities(getAllQuantities());
        }
    });

    // Quantity card click - insert into expression
    quantitiesList.addEventListener('click', (e) => {
        const card = e.target.closest('.quantity-card');
        if (card) {
            const name = card.querySelector('.quantity-name').textContent;
            const currentValue = expressionInput.value;
            expressionInput.value = currentValue ? `${currentValue} * ${name}` : name;
            expressionInput.focus();
        }
    });

    // Display quantities in the database section
    function displayQuantities(quantities) {
        quantitiesList.innerHTML = '';
        
        quantities.forEach(q => {
            const card = document.createElement('div');
            card.className = 'quantity-card';
            
            const name = document.createElement('div');
            name.className = 'quantity-name';
            name.textContent = q.name;
            card.appendChild(name);
            
            // Add symbols if available
            if (q.symbols && q.symbols.length > 0) {
                const symbols = document.createElement('div');
                symbols.className = 'quantity-symbols';
                symbols.textContent = `Symbols: ${q.symbols.join(', ')}`;
                card.appendChild(symbols);
            }
            
            const dimension = document.createElement('div');
            dimension.className = 'quantity-dimension';
            dimension.textContent = q.dimension.toString();
            card.appendChild(dimension);
            
            quantitiesList.appendChild(card);
        });
    }

    // Analyze expression
    function analyzeExpression(expression) {
        const result = analyzeDimensions(expression);
        
        if (result.success) {
            displaySuccess(result.dimension, expression);
        } else {
            displayError(result.error);
        }
        
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Display successful analysis
    function displaySuccess(dimension, expression) {
        const units = getUnitsForDimension(dimension);
        const quantityNames = getQuantityNamesForDimension(dimension);
        
        let html = '<div class="result-success">';
        
        // Expression
        html += `<div style="margin-bottom: 1rem;">`;
        html += `<strong>Expression:</strong> <code>${escapeHtml(expression)}</code>`;
        html += `</div>`;
        
        // Dimension
        html += '<div class="dimension-display">';
        html += `<div><strong>Dimension:</strong> ${escapeHtml(dimension.toString())}</div>`;
        html += `<div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">`;
        html += escapeHtml(dimension.toReadableString());
        html += `</div>`;
        html += `<div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">`;
        html += `SI: ${escapeHtml(dimension.toSI())}`;
        html += `</div>`;
        html += '</div>';
        
        // Matching quantities
        if (quantityNames.length > 0) {
            html += '<div style="margin-top: 1rem;">';
            html += '<strong>Recognized as:</strong> ';
            html += quantityNames.slice(0, 5).map(name => 
                `<span style="display: inline-block; padding: 0.3rem 0.8rem; margin: 0.2rem; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 4px;">${escapeHtml(name)}</span>`
            ).join('');
            if (quantityNames.length > 5) {
                html += `<span style="color: var(--text-secondary);"> and ${quantityNames.length - 5} more...</span>`;
            }
            html += '</div>';
        }
        
        // Available units
        if (units.length > 0) {
            html += '<div class="units-section">';
            html += '<h3>Available Units:</h3>';
            html += '<div class="units-grid">';
            units.forEach(unit => {
                html += `<div class="unit-item">${escapeHtml(unit)}</div>`;
            });
            html += '</div>';
            html += '</div>';
        } else if (!dimension.isDimensionless()) {
            html += '<div style="margin-top: 1rem; color: var(--text-secondary);">';
            html += '<em>No common units found for this dimension combination.</em>';
            html += '</div>';
        }
        
        html += '</div>';
        
        resultContent.innerHTML = html;
    }

    // Display error
    function displayError(errorMessage) {
        const html = `
            <div class="result-error">
                <strong>Error:</strong> ${escapeHtml(errorMessage)}
            </div>
            <div style="margin-top: 1rem; color: var(--text-secondary);">
                <strong>Tips:</strong>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>Use * for multiplication and / for division</li>
                    <li>Use ^ for exponentiation (e.g., length^2)</li>
                    <li>Functions like sin, cos, log require dimensionless arguments</li>
                    <li>Addition/subtraction requires matching dimensions</li>
                    <li>Use quantity names from the database below</li>
                </ul>
            </div>
        `;
        resultContent.innerHTML = html;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
