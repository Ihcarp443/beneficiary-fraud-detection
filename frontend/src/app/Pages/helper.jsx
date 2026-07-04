const doc = (label, value) => ({ label, value });

const DocumentTypes = {
  "Housing Assistance": [
    {
      title: "Identity Proof",
      documents: [
        doc("Aadhaar Card", "aadhaar"),
        doc("PAN Card", "pan"),
        doc("Passport", "passport"),
        doc("Voter ID", "voter_id"),
        doc("Driving Licence", "driving_licence"),
      ],
    },
    {
      title: "Address Proof",
      documents: [
        doc("Aadhaar Card", "aadhaar"),
        doc("Passport", "passport"),
        doc("Utility Bill", "utility_bill"),
        doc("Rental Agreement", "rental_agreement"),
      ],
    },
    {
      title: "Income Proof",
      documents: [
        doc("Salary Slip", "salary_slip"),
        doc("Income Certificate", "income_certificate"),
        doc("Bank Statement", "bank_statement"),
        doc("Form 16", "form_16"),
      ],
    },
    {
      title: "Employment Proof",
      documents: [
        doc("Employment Letter", "employment_letter"),
        doc("Company ID Card", "company_id_card"),
        doc("Joining Letter", "joining_letter"),
      ],
    },
  ],

  "Healthcare Benefits": [
    {
      title: "Identity Proof",
      documents: [
        doc("Aadhaar Card", "aadhaar"),
        doc("PAN Card", "pan"),
        doc("Passport", "passport"),
      ],
    },
    {
      title: "Medical Records",
      documents: [
        doc("Medical Certificate", "medical_certificate"),
        doc("Doctor Prescription", "doctor_prescription"),
        doc("Hospital Report", "hospital_report"),
        doc("Lab Report", "lab_report"),
      ],
    },
    {
      title: "Income Proof",
      documents: [
        doc("Salary Slip", "salary_slip"),
        doc("Income Certificate", "income_certificate"),
        doc("Bank Statement", "bank_statement"),
      ],
    },
    {
      title: "Insurance Proof",
      documents: [
        doc("Health Insurance Card", "health_insurance_card"),
        doc("Insurance Policy", "insurance_policy"),
      ],
    },
  ],

  "Food Assistance": [
    {
      title: "Identity Proof",
      documents: [
        doc("Aadhaar Card", "aadhaar"),
        doc("PAN Card", "pan"),
        doc("Passport", "passport"),
      ],
    },
    {
      title: "Income Proof",
      documents: [
        doc("Salary Slip", "salary_slip"),
        doc("Income Certificate", "income_certificate"),
      ],
    },
    {
      title: "Family Proof",
      documents: [
        doc("Ration Card", "ration_card"),
        doc("Birth Certificate", "birth_certificate"),
        doc("Family Register", "family_register"),
      ],
    },
  ],

  "Education Grant": [
    {
      title: "Identity Proof",
      documents: [
        doc("Aadhaar Card", "aadhaar"),
        doc("Passport", "passport"),
      ],
    },
    {
      title: "Academic Records",
      documents: [
        doc("Marksheet", "marksheet"),
        doc("Degree Certificate", "degree_certificate"),
        doc("Transfer Certificate", "transfer_certificate"),
      ],
    },
    {
      title: "Income Proof",
      documents: [
        doc("Income Certificate", "income_certificate"),
        doc("Salary Slip", "salary_slip"),
      ],
    },
    {
      title: "Admission Proof",
      documents: [
        doc("Admission Letter", "admission_letter"),
        doc("College Offer Letter", "college_offer_letter"),
      ],
    },
  ],

  "Disability Support": [
    {
      title: "Identity Proof",
      documents: [
        doc("Aadhaar Card", "aadhaar"),
        doc("Passport", "passport"),
      ],
    },
    {
      title: "Medical Proof",
      documents: [
        doc("Medical Certificate", "medical_certificate"),
        doc("Hospital Certificate", "hospital_certificate"),
      ],
    },
    {
      title: "Disability Proof",
      documents: [
        doc("Disability Certificate", "disability_certificate"),
        doc("UDID Card", "udid_card"),
      ],
    },
    {
      title: "Income Proof",
      documents: [
        doc("Income Certificate", "income_certificate"),
        doc("Salary Slip", "salary_slip"),
      ],
    },
  ],

  "Unemployment Benefits": [
    {
      title: "Identity Proof",
      documents: [
        doc("Aadhaar Card", "aadhaar"),
        doc("Passport", "passport"),
      ],
    },
    {
      title: "Termination Proof",
      documents: [
        doc("Termination Letter", "termination_letter"),
        doc("Relieving Letter", "relieving_letter"),
        doc("Layoff Notice", "layoff_notice"),
      ],
    },
    {
      title: "Income Proof",
      documents: [
        doc("Salary Slip", "salary_slip"),
        doc("Income Certificate", "income_certificate"),
      ],
    },
    {
      title: "Bank Proof",
      documents: [
        doc("Bank Statement", "bank_statement"),
      ],
    },
  ],
};

export default DocumentTypes;