/**
 * Enhanced Logic for University Admission GPA score calculation in Bangladesh.
 * Covers Medical, Engineering Hub, and General Universities.
 */

const admissionSystems = {
    medical: {
        id: 'medical',
        name: 'Medical (MBBS/BDS)',
        sscMultiplier: 15, // 5 * 15 = 75
        hscMultiplier: 25, // 5 * 25 = 125
        totalGpaMarks: 200,
        secondTimeDeduction: 5,
        prevAdmittedDeduction: 10,
        group: 'Medical'
    },
    du: {
        id: 'du',
        name: 'Dhaka University (DU)',
        sscMultiplier: 2, // 5 * 2 = 10
        hscMultiplier: 2, // 5 * 2 = 10
        totalGpaMarks: 20,
        group: 'General'
    },
    ju: {
        id: 'ju',
        name: 'Jahangirnagar University (JU)',
        sscMultiplier: 1.5, // 5 * 1.5 = 7.5
        hscMultiplier: 2.5, // 5 * 2.5 = 12.5
        totalGpaMarks: 20,
        group: 'General'
    },
    cu: {
        id: 'cu',
        name: 'Chittagong University (CU)',
        sscMultiplier: 1.6, // 5 * 1.6 = 8
        hscMultiplier: 2.4, // 5 * 2.4 = 12
        totalGpaMarks: 20,
        secondTimeDeduction: 5,
        group: 'General'
    },
    ru: {
        id: 'ru',
        name: 'Rajshahi University (RU)',
        sscMultiplier: 0, 
        hscMultiplier: 0,
        totalGpaMarks: 0,
        note: 'Merit is 100% on MCQ Test (100 Marks)',
        group: 'General'
    },
    gst: {
        id: 'gst',
        name: 'GST Cluster (JnU, SUST, etc.)',
        sscMultiplier: 2, 
        hscMultiplier: 2,
        totalGpaMarks: 20,
        group: 'General'
    },
    engineering: {
        id: 'engineering',
        name: 'Engineering Hub (BUET, BUTEX)',
        sscMultiplier: 0,
        hscMultiplier: 0,
        totalGpaMarks: 0,
        isEngineering: true, // Special flag for UI
        group: 'Engineering',
        note: 'Merit is test-based. Selection depends on HSC subject marks (P/C/M/E).'
    },
    ckruet: {
        id: 'ckruet',
        name: 'CKRUET (CUET, KUET, RUET)',
        sscMultiplier: 0,
        hscMultiplier: 0,
        totalGpaMarks: 0,
        isEngineering: true,
        group: 'Engineering',
        note: 'Merit is test-based (500 Marks). Selection based on HSC GP (P/C/M/E).'
    }
};

export const calculateAdmissionMarks = (sscGpa, hscGpa, systemKey, options = {}) => {
    const system = admissionSystems[systemKey];
    if (!system) return null;

    // Engineering logic handle
    if (system.isEngineering) {
        return {
            isEngineering: true,
            earned: "N/A",
            lost: "N/A",
            max: "Exam Only",
            deduction: "0.00",
            finalGpaScore: "100% Test",
            percentage: "N/A",
            note: "Engineering merit is calculated purely on the Admission Test score. GPA is used for Eligibility and Shortlisting (top candidates)."
        };
    }

    const sscMarks = Number(sscGpa) * system.sscMultiplier;
    const hscMarks = Number(hscGpa) * system.hscMultiplier;
    let earnedMarks = sscMarks + hscMarks;
    
    const maxPossibleMarks = (5 * system.sscMultiplier) + (5 * system.hscMultiplier);
    const marksLost = maxPossibleMarks - earnedMarks;

    let totalDeduction = 0;
    if (options.isSecondTimer && system.secondTimeDeduction) {
        totalDeduction += system.secondTimeDeduction;
    }
    if (options.isPrevAdmitted && system.prevAdmittedDeduction) {
        totalDeduction += system.prevAdmittedDeduction;
    }

    const finalScore = earnedMarks - totalDeduction;

    return {
        isEngineering: false,
        earned: earnedMarks.toFixed(2),
        lost: marksLost.toFixed(2),
        max: maxPossibleMarks.toFixed(2),
        deduction: totalDeduction.toFixed(2),
        finalGpaScore: Math.max(0, finalScore).toFixed(2),
        percentage: maxPossibleMarks > 0 ? ((earnedMarks / maxPossibleMarks) * 100).toFixed(1) : "100"
    };
};

export { admissionSystems };
