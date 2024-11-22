export default function handler(req, res) {
    const salary = parseFloat(req.query.salary as string);

    if (!salary || isNaN(salary)) {
        return res.status(400).json({ error: 'Invalid or missing salary' });
    }

    const annualSalary = salary * 12;
    let tax = 0;

    // Updated Pakistani tax brackets for FY 2024-2025
    if (annualSalary > 600000) {
        if (annualSalary <= 1200000) {
            tax = (annualSalary - 600000) * 0.05;
        } else if (annualSalary <= 2200000) {
            tax = 30000 + (annualSalary - 1200000) * 0.15;
        } else if (annualSalary <= 3200000) {
            tax = 180000 + (annualSalary - 2200000) * 0.25;
        } else if (annualSalary <= 4100000) {
            tax = 430000 + (annualSalary - 3200000) * 0.30;
        } else {
            tax = 700000 + (annualSalary - 4100000) * 0.35;
        }
    }

    res.status(200).json({
        monthlySalary: salary,
        annualSalary,
        annualTax: tax,
        monthlyTax: tax / 12,
    });
}
