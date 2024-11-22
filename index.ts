export default function handler(req, res) {
    // Check if this is a request for tax calculation or the frontend
    if (req.method === 'GET' && !req.query.salary) {
        // Serve the frontend
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pakistani Salary Tax Calculator</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background-color: #f9f9f9;
                    }
                    form {
                        margin-bottom: 20px;
                    }
                    label {
                        font-size: 16px;
                    }
                    input {
                        margin: 10px 0;
                        padding: 8px;
                        font-size: 16px;
                        width: 200px;
                    }
                    button {
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #fff;
                        background-color: #007bff;
                        border: none;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                    #result p {
                        font-size: 16px;
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                <h1>Pakistani Salary Tax Calculator</h1>
                <form id="tax-form">
                    <label for="salary">Enter Monthly Salary (PKR):</label>
                    <input type="number" id="salary" name="salary" required>
                    <button type="submit">Calculate Tax</button>
                </form>
                <div id="result"></div>
                <script>
                    const form = document.getElementById('tax-form');
                    const resultDiv = document.getElementById('result');
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const salary = document.getElementById('salary').value;
                        try {
                            const response = await fetch(\`/api?salary=\${salary}\`);
                            const data = await response.json();
                            if (data.error) {
                                resultDiv.innerHTML = \`<p style="color: red;">\${data.error}</p>\`;
                            } else {
                                resultDiv.innerHTML = \`
                                    <p><strong>Monthly Salary:</strong> PKR \${data.monthlySalary}</p>
                                    <p><strong>Annual Salary:</strong> PKR \${data.annualSalary}</p>
                                    <p><strong>Annual Tax:</strong> PKR \${data.annualTax}</p>
                                    <p><strong>Monthly Tax:</strong> PKR \${data.monthlyTax.toFixed(2)}</p>
                                \`;
                            }
                        } catch (error) {
                            resultDiv.innerHTML = \`<p style="color: red;">Something went wrong. Please try again later.</p>\`;
                        }
                    });
                </script>
            </body>
            </html>
        `);
    } else if (req.method === 'GET' && req.query.salary) {
        // API: Calculate tax
        const { salary } = req.query;
        if (!salary || isNaN(salary)) {
            return res.status(400).json({ error: 'Invalid or missing salary' });
        }

        // Convert to annual salary
        const annualSalary = parseFloat(salary) * 12;

        // Pakistani tax brackets (example)
        let tax = 0;
        if (annualSalary > 600000) {
            if (annualSalary <= 1200000) {
                tax = (annualSalary - 600000) * 0.05;
            } else if (annualSalary <= 2400000) {
                tax = (1200000 - 600000) * 0.05 + (annualSalary - 1200000) * 0.1;
            } else if (annualSalary <= 3600000) {
                tax = (1200000 - 600000) * 0.05 + (2400000 - 1200000) * 0.1 + (annualSalary - 2400000) * 0.15;
            } else {
                tax = (1200000 - 600000) * 0.05 + (2400000 - 1200000) * 0.1 + (3600000 - 2400000) * 0.15 + (annualSalary - 3600000) * 0.2;
            }
        }

        res.status(200).json({
            monthlySalary: parseFloat(salary),
            annualSalary,
            annualTax: tax,
            monthlyTax: tax / 12,
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
