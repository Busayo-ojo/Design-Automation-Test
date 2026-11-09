/* ═══════════════════════════════════════════════════════════════════════════
   File Upload — variant unions and Figma defaults.

   Kept separate from FileUpload.tsx so that file only exports components
   (react-refresh/only-export-components).
   ═══════════════════════════════════════════════════════════════════════════ */

/** Figma `file type` (3355:170664) → `type` variant */
export type FileTypeFormat = 'PNG' | 'PDF' | 'JPG' | 'XLS' | 'MP3' | 'GIF';

/** Figma `file upload states` (3355:171475) → `type` variant */
export type UploadStateType = 'default' | 'success' | 'warning' | 'error';

/** Figma `Small upload` (6092:3073) → `state` variant */
export type FileUploadRowState = 'default' | 'in progress' | 'complete' | 'error';

/** Figma `Big Upload` (6100:14546) → `Property 1` variant */
export type FileDropzoneState = 'default' | 'uploading' | 'success' | 'error';

export const FILE_TYPE_FORMATS: FileTypeFormat[] = ['PNG', 'PDF', 'JPG', 'XLS', 'MP3', 'GIF'];
export const UPLOAD_STATE_TYPES: UploadStateType[] = ['default', 'success', 'warning', 'error'];
export const FILE_UPLOAD_ROW_STATES: FileUploadRowState[] = ['default', 'in progress', 'complete', 'error'];
export const FILE_DROPZONE_STATES: FileDropzoneState[] = ['default', 'uploading', 'success', 'error'];

/** Figma colours each badge per format. */
export const FILE_TYPE_COLOR: Record<FileTypeFormat, string> = {
  PNG: 'var(--color-secondary-400)',   // #F3A218
  PDF: 'var(--color-primary-600)',     // #034592
  JPG: 'var(--color-file-jpg)',        // #C548F1
  XLS: 'var(--color-success-400)',     // #0F973D
  MP3: 'var(--color-file-mp3)',        // #6D56F8
  GIF: 'var(--color-primary-300)',     // #3D89DF
};

/** Icon + tint per Figma `file upload states` variant. */
export const UPLOAD_STATE_ICON: Record<
  UploadStateType,
  { name: string; variant: 'linear' | 'bold'; size: number }
> = {
  default: { name: 'cloud-upload', variant: 'linear', size: 24 },
  success: { name: 'check-circle', variant: 'bold', size: 30 },
  warning: { name: 'info-circle', variant: 'bold', size: 30 },
  error: { name: 'info-triangle', variant: 'bold', size: 24 },
};

export interface UploadFileMeta {
  /** File name, e.g. "Name of document.pdf" */
  name?: string;
  /** Figma shows "11 Sep, 2026 | 12:24pm" */
  timestamp?: string;
  /** Figma shows "13MB" */
  size?: string;
  /** Badge format for the leading icon */
  format?: FileTypeFormat;
}

/** Derives a badge format from a filename extension, falling back to PDF. */
export function formatFromName(name?: string): FileTypeFormat {
  const ext = (name?.split('.').pop() ?? '').toUpperCase();
  return (FILE_TYPE_FORMATS as string[]).includes(ext) ? (ext as FileTypeFormat) : 'PDF';
}
