# Brand & UI Quality Checklist

**iQx Consult Limited — May 2026**

---

## Introduction

This checklist is a mandatory pre-submission gate for every iQx application going into brand review. It exists to ensure that observations from external parties and the cycle of fixes is reduced to the barest minimum.

The recurring issues catalogued here are drawn directly from historical brand review feedback. They fall into eight categories:

- Casing and capitalisation
- Singular/plural consistency
- Punctuation and spacing
- Currency and number formatting
- Table and data alignment
- Empty states
- Date and time formatting
- Terminology

Items marked **High** are non-negotiable; any high item left unresolved is grounds to return the application to the developer without further review.

### Who Should Use This Checklist

- **Developers** — complete this checklist before handing off to QA
- **QA engineers** — verify all items independently
- **System Reviewers** — cross-check and reconfirm all items before approving for brand review

---

## How to Use This Checklist

- Work through each section in order, and on every page of the application
- Tick the checkbox for each item once you have confirmed it is correct across all screens and states of the application
- Do not tick an item based on memory; verify it directly in the running application on localhost or test environment
- If a high item cannot be resolved before submission, document the reason and escalate to the Group Head of ADG before proceeding
- If the business requests any specific change, proper documentation must be generated specifying why and what the reason for the change is

---

## Checklist

### 1. Casing and Capitalisation

| Check Item | Severity |
|---|---|
| System feedback messages (success/error pop-ups) start with a capital letter. e.g. "Success" not "success", "An error occurred" not "an error occurred". | **High** |
| Search box placeholder text starts with a capital letter. e.g. "Search by name" not "search by name". | **High** |
| Action buttons use correct casing for two-word verbs. e.g. "Log In" and "Log Out" not "Login" / "Logout". | **High** |
| Minor prepositions in headings and titles are lowercase. Words like "of", "for", "your", "by", and "with" must not be capitalised mid-title. e.g. "Notification of Change" not "Notification Of Change". | **High** |
| Stand-alone action prompts and dropdown triggers are capitalised. e.g. "Import", "Export", "Select" — not "import", "export", "select". | **Medium** |

---

### 2. Singular vs. Plural (Menus, Headers & Tabs)

| Check Item | Severity |
|---|---|
| Navigation menu labels use the approved singular form. Standard: "Product", "Institution", "User", "Menu", "Complaint", "Role", "Trading Asset" — not their plurals. | **High** |
| Table headers use "Action" not "Actions", and "Asset" not "Assets". Review every data table header in the application. | **High** |
| Report and tab names use the singular form. e.g. "Authorised Representatives Report" not "Authorised Representatives Reports". | **Medium** |

---

### 3. Punctuation and Spacing

| Check Item | Severity |
|---|---|
| UI labels, input field titles, and table headers have no trailing colons. e.g. "Face Value" not "Face Value:", "Collateral Purpose" not "Collateral Purpose:". | **High** |
| Descriptive helper text and standalone sentences end with a full stop. | **High** |
| Three-letter month abbreviations include a full stop, except May. "Jan.", "Feb.", "Mar.", "Apr.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec." — "May" never takes a full stop. Always be consistent with whatever format you decide to use. | **High** |
| Only the square (▪) bullet point is acceptable. | **Medium** |
| A space appears before every open bracket. e.g. "Contract Value (₦'mm)" not "Contract Value(₦'mm)". | **Medium** |
| Button labels, headings, and navigation items do not end with a full stop. | **Medium** |

---

### 4. Currency and Number Formatting

| Check Item | Severity |
|---|---|
| The Naira symbol ₦ is used, not the letter N or the code NGN — in all UI fields. This applies to labels, table headers, and inline references. | **High** |
| The ₦ symbol is not repeated in individual table cells when it is already in the column header. | **High** |
| All figures display commas as thousand separators and are formatted to two decimal places. e.g. "₦1,250,000.00" not "₦1250000" or "₦1,250,000". | **High** |

---

### 5. Table and Data Alignment

| Check Item | Severity |
|---|---|
| Table header text is centre aligned. | **High** |
| All numerical figures, percentages, and currency amounts in table cells are right aligned. Right-alignment is the standard for any value used in calculation or comparison. | **High** |
| Serial number columns use the header "S/N" — not "#", "UID", "IID", or "RegID". | **High** |
| Long text blocks (e.g. Terms & Conditions, legal disclaimers) are fully justified. | **Medium** |

---

### 6. Date and Time Formatting

| Check Item | Severity |
|---|---|
| Dates follow the format: Month DD, YYYY — with no leading zero for single-digit days. "Mar. 1, 2025" not "Mar 01, 2025". Note the full stop after the abbreviated month. | **High** |
| "Expiry Date" is used for active contracts and products — not "Expired Date". "Expired" is past tense and implies the product is already inactive. | **High** |

---

### 7. Empty States

| Check Item | Severity |
|---|---|
| Empty state messages use only the approved phrases: "No Data Available" or "No Orders Available". "No data", "There are no records found", "No notifications yet" and similar variations are not approved. | **High** |
| No redundant sub-text appears beneath the empty state graphic repeating the same message. If a graphic already says "No Orders", do not add a sentence below that says the same thing in different words. | **Medium** |

---

### 8. Terminology, Spelling, and Grammar

| Check Item | Severity |
|---|---|
| No backend variable names or snake_case syntax appear in the user interface. e.g. UI must display "Dealer Code" not "dealer_code", "Collateral Type" not "collateral_type". | **High** |
| UK/British English spelling is used consistently throughout. "Authoriser" not "Authorizer", "synchronise" not "synchronize", "organisation" not "organization". | **High** |
| Required terms are written out in full at first use. "Two-Factor Authentication (2FA)" not "2FA", "Unit of Measurement (UoM)" not "UoM". | **Medium** |
| Compound modifiers include the required hyphen. "Non-Interest" not "Non Interest"; "One-way quote" not "1-Way-Quote". | **Medium** |
| All product names, regulatory bodies, and FMDQ entity names are spelled exactly as per the approved glossary. e.g. "FMDQ Exchange", "FMDQ Clear", "CBN", "SEC" — check every instance. | **High** |

---

*Prepared by: Oluwabusayo Ojo — Application Delivery Group*
*Reviewed by: Olatayo Adeoye — GH Application Development*
*Approved by: Emmanuel Alao — Supervising Head, iQx Consult Limited*
