export const calculateBMI = (weight, height, unitSystem = 'metric') => {
    // unitSystem: 'metric' (kg, cm) or 'imperial' (lbs, feet/inches)
    
    // Inputs might be strings, convert to numbers
    const w = parseFloat(weight);
    
    if (!w || w <= 0) return null;

    let h_meters = 0;

    if (unitSystem === 'metric') {
        const h_cm = parseFloat(height);
        if (!h_cm || h_cm <= 0) return null;
        h_meters = h_cm / 100;
    } else {
        // height in imperial might be passed as an object { feet, inches } or a total inches value
        // For simplicity in this function, let's assume 'height' input for imperial is total inches
        // Or we can handle feet/inches separately in the UI and pass total inches here.
        // Let's assume height is an object { feet: 5, inches: 10 } if unitSystem is imperial
        
        let inches = 0;
        if (typeof height === 'object') {
            inches = (parseFloat(height.feet) || 0) * 12 + (parseFloat(height.inches) || 0);
        } else {
             inches = parseFloat(height);
        }
        
        if (!inches || inches <= 0) return null;
        h_meters = inches * 0.0254;
        
        // Convert lbs to kg for standard formula context if needed, but BMI formula for imperial is:
        // (weight_lbs / height_inches^2) * 703
        
        const bmiImperial = (w / (inches * inches)) * 703;
        return getBMIDetails(bmiImperial);
    }

    const bmi = w / (h_meters * h_meters);
    return getBMIDetails(bmi);
};

const getBMIDetails = (bmiValue) => {
    const bmi = parseFloat(bmiValue.toFixed(1));
    let status = '';
    let color = '';
    let recommendation = '';

    if (bmi < 18.5) {
        status = 'Underweight';
        color = 'text-blue-500';
        recommendation = 'Consider consulting a nutritionist to gain weight healthily.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = 'Normal';
        color = 'text-emerald-500';
        recommendation = 'Great job! Maintain your balanced diet and exercise routine.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = 'Overweight';
        color = 'text-amber-500';
        recommendation = 'Aim for regular physical activity and a balanced diet.';
    } else {
        status = 'Obese';
        color = 'text-red-500';
        recommendation = 'Please consult a healthcare provider for professional advice.';
    }

    return {
        score: bmi,
        status,
        color,
        recommendation
    };
};
