export default function handler(req, res) {
    const salary = parseFloat(req.query.salary as string);

    if (!salary || isNaN(salary)) {
        return res.status(400).json({ error: 'Invalid or missing salary' });
    }

    const annualSalary = salary * 12;
    let tax = 0;

    // Pakistani tax brackets
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
        monthlySalary: salary,
        annualSalary,
        annualTax: tax,
        monthlyTax: tax / 12,
    });
}
