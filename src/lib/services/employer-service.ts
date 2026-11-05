import { Employer, EmployerDocument, EmployerStatus, AuditLog } from '@/types';
import { INITIAL_EMPLOYERS, INITIAL_AUDIT_LOGS } from '@/lib/data/sample-data';

const EMPLOYERS_KEY = 'atchujobs_employers';
const AUDIT_LOGS_KEY = 'atchujobs_audit_logs';

export function getStoredEmployers(): Employer[] {
  if (typeof window === 'undefined') return INITIAL_EMPLOYERS;
  try {
    const raw = localStorage.getItem(EMPLOYERS_KEY);
    if (!raw) {
      localStorage.setItem(EMPLOYERS_KEY, JSON.stringify(INITIAL_EMPLOYERS));
      return INITIAL_EMPLOYERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_EMPLOYERS;
  }
}

export function saveStoredEmployers(employers: Employer[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EMPLOYERS_KEY, JSON.stringify(employers));
}

export function getEmployerById(id: string): Employer | null {
  const employers = getStoredEmployers();
  return employers.find((e) => e.id === id) || null;
}

export function getEmployerByUserId(userId: string): Employer | null {
  const employers = getStoredEmployers();
  return employers.find((e) => e.user_id === userId) || null;
}

export function updateEmployerStatus(
  employerId: string,
  status: EmployerStatus,
  adminNotes?: string,
  adminId?: string
): boolean {
  const employers = getStoredEmployers();
  const idx = employers.findIndex((e) => e.id === employerId);
  if (idx === -1) return false;

  employers[idx].status = status;
  if (adminNotes) employers[idx].verification_notes = adminNotes;
  if (status === 'verified') {
    employers[idx].verified_at = new Date().toISOString();
    employers[idx].verified_by = adminId || 'admin';
  }
  employers[idx].updated_at = new Date().toISOString();

  saveStoredEmployers(employers);

  // Add audit log
  addAuditLog({
    admin_id: adminId || 'admin',
    action: status === 'verified' ? 'VERIFY_EMPLOYER' : status === 'suspended' ? 'SUSPEND_EMPLOYER' : 'REJECT_EMPLOYER',
    target_entity: 'employer',
    target_id: employerId,
    details: {
      company_name: employers[idx].company_name,
      new_status: status,
      notes: adminNotes,
    },
  });

  return true;
}

export function addEmployerDocument(
  employerId: string,
  doc: {
    document_type: EmployerDocument['document_type'];
    document_number?: string;
    file_name: string;
    file_url?: string;
  }
): boolean {
  const employers = getStoredEmployers();
  const idx = employers.findIndex((e) => e.id === employerId);
  if (idx === -1) return false;

  const newDoc: EmployerDocument = {
    id: `doc-${Date.now()}`,
    employer_id: employerId,
    document_type: doc.document_type,
    document_number: doc.document_number,
    file_name: doc.file_name,
    file_url: doc.file_url || '/documents/sample-doc.pdf',
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  if (!employers[idx].documents) {
    employers[idx].documents = [];
  }
  employers[idx].documents!.push(newDoc);
  employers[idx].updated_at = new Date().toISOString();

  saveStoredEmployers(employers);
  return true;
}

// Audit Logs
export function getStoredAuditLogs(): AuditLog[] {
  if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem(AUDIT_LOGS_KEY);
    if (!raw) {
      localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_AUDIT_LOGS;
  }
}

export function addAuditLog(log: Omit<AuditLog, 'id' | 'created_at'>) {
  const logs = getStoredAuditLogs();
  const newLog: AuditLog = {
    ...log,
    id: `log-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  logs.unshift(newLog);
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(logs));
  }
}
