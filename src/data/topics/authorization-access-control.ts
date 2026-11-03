import { RoadmapTopic } from '../../types/roadmap';

export const topic: RoadmapTopic = {
  "id": "authorization-access-control",
  "number": 21,
  "title": "Authorization & Access Control (RBAC, ABAC, Principle of Least Privilege)",
  "phaseId": 4,
  "phaseName": "Security & Access Control",
  "duration": "35 min",
  "timeEstimates": {
    "video": "53 min",
    "reading": "35 min",
    "lab": "45 min",
    "total": "2 hr 13 min"
  },
  "youtubeId": "SuycfXLdF8o",
  "youtubeChannelUrl": "https://www.youtube.com/@jimdickson1752",
  "secondaryVideo": {
    "youtubeId": "6GRaRY4OKa8",
    "title": "RBAC vs ABAC Explained with Real-World Production Examples",
    "duration": "18 min",
    "description": "How Role-Based and Attribute-Based Access Control differ in practice, resolving role explosion and enforcing fine-grained user permissions."
  },
  "shortSummary": "Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), policy enforcement points, and multi-tenant data isolation.",
  "seniorInsight": {
    "quote": "Authentication is knowing who the caller is. Authorization is verifying whether they have permission to modify THIS specific row in the database.",
    "productionLesson": "Broken Object Level Authorization (BOLA/IDOR) is the #1 API vulnerability in the world. Never write: UPDATE documents SET body = :body WHERE id = :id. Always scope by ownership: WHERE id = :id AND organization_id = :currentOrgId.",
    "commonMistake": "Checking roles in UI buttons while forgetting to check row-level permissions on backend endpoints."
  },
  "coreDeepDive": {
    "what": "Authorization governs permissions and access policies determining what authenticated entities are allowed to execute.",
    "why": "Prevents vertical privilege escalation (users acting as admins) and horizontal privilege escalation (user A viewing user B's medical records).",
    "howItWorks": [
      "1. RBAC assigns permissions to roles (Admin, Member, Viewer) and roles to users.",
      "2. ABAC evaluates dynamic attributes (user department, resource classification, current time, IP subnet).",
      "3. Policy Enforcement Point (PEP) intercepts the request and verifies policies before running domain handlers."
    ],
    "blueprintTitle": "Multi-Tenant BOLA-Proof Query",
    "blueprintCode": "// VULNERABLE TO BOLA / IDOR (Attacker passes any documentId)\nSELECT * FROM documents WHERE id = $1;\n\n// SECURE: Enforces Tenant Isolation at Database Query Boundary\nSELECT * FROM documents \nWHERE id = $1 \n  AND organization_id = $2; -- Extracted authoritatively from verified JWT",
    "blueprintLanguage": "sql"
  },
  "recommendedBook": {
    "title": "OWASP Authorization & Access Control Cheat Sheet",
    "author": "OWASP Foundation",
    "keyChapters": "Role-Based Access Control (RBAC) & Attribute-Based Access Control (ABAC)",
    "whyReadThis": "Definitive guide on enforcing principle of least privilege, avoiding BOLA/IDOR vulnerabilities, and policy enforcement points.",
    "readingUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
  },
  "handsOnChallenge": {
    "ticketNumber": "TICKET-018",
    "title": "Prevent Broken Object Level Authorization (BOLA/IDOR) in Invoice API",
    "scenario": "Users can view competitor invoices by changing the URL from /invoices/100 to /invoices/101.",
    "acceptanceCriteria": [
      "Extract current user's organizationId from the verified session context.",
      "Ensure all SELECT, UPDATE, and DELETE queries filter by organization_id."
    ],
    "terminalLab": "curl -H \"Authorization: Bearer user_token\" http://localhost:3000/api/invoices/9999",
    "hints": [
      "Never trust an ID parameter from the URL without checking ownership!"
    ],
    "solutionCode": "async function getInvoice(req, res) {\n  const { invoiceId } = req.params;\n  const { orgId } = req.user;\n  const invoice = await db.query(\n    'SELECT * FROM invoices WHERE id = $1 AND organization_id = $2',\n    [invoiceId, orgId]\n  );\n  if (!invoice.rows[0]) return res.status(404).json({ error: 'Invoice not found' });\n  return res.json(invoice.rows[0]);\n}",
    "solutionExplanation": "Returning 404 rather than 403 prevents attackers from enumerating valid invoice IDs across other tenants."
  },
  "selfCheckQuestions": [
    {
      "category": "WHAT",
      "question": "What is the fundamental difference between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)?",
      "answerExplanation": "RBAC assigns permissions to static roles (e.g., admin, editor, viewer) and users to roles, answering: 'Does user role X have permission Y?'. ABAC evaluates dynamic policies based on attributes of the user, the resource, the action, and the environment (e.g., 'Can a doctor edit a medical record if doctor.department == record.department and current_time is during business hours?')."
    },
    {
      "category": "WHY",
      "question": "Why is Insecure Direct Object References (IDOR / BOLA - Broken Object Level Authorization) consistently ranked as the #1 API security flaw?",
      "answerExplanation": "Applications often verify that a user is authenticated and possesses a general role (e.g., 'customer'), but forget to verify whether that customer actually owns the specific resource requested by ID (e.g., GET /api/invoices/1234). Attackers simply increment IDs to view or manipulate other users' sensitive private data without triggering standard role guards."
    },
    {
      "category": "HOW",
      "question": "How do you architect a declarative Policy Enforcement Point (PEP) middleware that prevents IDOR at the database query level?",
      "answerExplanation": "Instead of checking ownership in handlers, inject the authenticated user_id or tenant_id into repository query scopes. Every mutation query executes with tenant scoping (e.g., UPDATE invoices SET amount = $1 WHERE id = $2 AND tenant_id = $3). If the record belongs to another user, 0 rows update and the API returns 404/403 automatically."
    }
  ]
};

export default topic;
