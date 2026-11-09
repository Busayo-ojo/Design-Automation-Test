import React, { forwardRef, useCallback, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../../foundations/icons';
import { Button } from '../../elements/Button';
import { ProgressBar } from '../ProgressBar';
import {
  FILE_TYPE_COLOR,
  UPLOAD_STATE_ICON,
  formatFromName,
  type FileTypeFormat,
  type UploadStateType,
  type FileUploadRowState,
  type FileDropzoneState,
  type UploadFileMeta,
} from './fileUploadUtils';
import './FileUpload.css';

/* ═══════════════════════════════════════════════════════════════════════════
   File Upload — built 1:1 from the Figma page "✤ File Upload ⚜️"
   (file Hq7luvf787VJlCj1d3YJYw)

   Layered exactly as Figma organises it:

     ELEMENTS   (frame "Base components" 2065:41198)
       FileTypeBadge      ← file type           3355:170664 (6 variants)
       UploadStateIcon    ← file upload states  3355:171475 (4 variants)
       UploadProgressRing ← the circular % ring used by the In Progress row

     FULL       (frames "Single File Upload" / "Multiple File Upload")
       FileUploadRow      ← Small upload        6092:3073  (4 variants)
       FileDropzone       ← Big Upload          6100:14546 (4 variants)
       FileUploadList     ← Mutilple Uploads    6100:15099 (7 file booleans)

   Reuse (rules/FIGMA_STORYBOOK_RULES.md §0): CTAs are the existing Button
   element, the dropzone's linear bar is the existing ProgressBar, and every
   icon comes from foundations/icons. None of their markup is re-implemented.
   ═══════════════════════════════════════════════════════════════════════════ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — FileTypeBadge
   Figma: file type (3355:170664) · 24×24 · a document glyph with a coloured
   "Attachment Format" label (22×10, r1, 2px horizontal padding).
   ═══════════════════════════════════════════════════════════════════════════ */

export interface FileTypeBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Figma `type` variant */
  format?: FileTypeFormat;
  /** Rendered size in px. Figma's base is 24; the upload row scales it to 48. */
  size?: number;
}

export const FileTypeBadge: React.FC<FileTypeBadgeProps> = ({
  format = 'PNG',
  size = 24,
  className,
  style,
  ...rest
}) => (
  <span
    className={cx('fmdqui-fileupload-badge', className)}
    style={{ width: size, height: size, ...style }}
    aria-label={`${format} file`}
    {...rest}
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Document body with the folded corner, matching Figma's "Document" group */}
      <path
        d="M4 2.5h8.5L19 9v12.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-19a1 1 0 0 1 1-1Z"
        className="fmdqui-fileupload-badge__page"
      />
      <path d="M12.5 2.5 19 9h-5.5a1 1 0 0 1-1-1V2.5Z" className="fmdqui-fileupload-badge__fold" />
    </svg>
    {/* Figma "Attachment Format" chip */}
    <span
      className="fmdqui-fileupload-badge__format"
      style={{ backgroundColor: FILE_TYPE_COLOR[format] }}
    >
      {format}
    </span>
  </span>
);

FileTypeBadge.displayName = 'FileTypeBadge';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — UploadStateIcon
   Figma: file upload states (3355:171475) · 32×32 tinted circle + icon
     default → neutral-100 + cloud-upload (linear, neutral-600)
     Success → success-50  + check-circle  (bold, success-400)
     warning → warning-50  + info-circle   (bold, warning-500)
     error   → error-50    + info-triangle (bold, error-500)
   ═══════════════════════════════════════════════════════════════════════════ */

export interface UploadStateIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma `type` variant */
  type?: UploadStateType;
  /** Circle diameter in px. Figma's base is 32; compositions scale to 48/56. */
  size?: number;
}

export const UploadStateIcon: React.FC<UploadStateIconProps> = ({
  type = 'default',
  size = 32,
  className,
  style,
  ...rest
}) => {
  const icon = UPLOAD_STATE_ICON[type];
  // Figma scales the glyph with the circle (32 → 24/30 at base scale).
  const glyph = Math.round((icon.size / 32) * size);
  return (
    <span
      className={cx('fmdqui-fileupload-state', `fmdqui-fileupload-state--${type}`, className)}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <Icon name={icon.name} variant={icon.variant} size={glyph} />
    </span>
  );
};

UploadStateIcon.displayName = 'UploadStateIcon';

/* ═══════════════════════════════════════════════════════════════════════════
   ELEMENT — UploadProgressRing
   Figma: the "Progress circles" instance in Small upload `state=In Progress`
   — a primary-400 arc on a neutral-100 track with the percentage inside.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface UploadProgressRingProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 0–100 */
  progress?: number;
  /** Diameter in px. Figma renders it at 48 inside the upload row. */
  size?: number;
  /** Show the numeric label inside the ring */
  hasLabel?: boolean;
}

export const UploadProgressRing: React.FC<UploadProgressRingProps> = ({
  progress = 25,
  size = 48,
  hasLabel = true,
  className,
  style,
  ...rest
}) => {
  const pct = Math.max(0, Math.min(100, progress));
  const stroke = Math.max(3, Math.round(size / 10));
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  return (
    <span
      className={cx('fmdqui-fileupload-ring', className)}
      style={{ width: size, height: size, ...style }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          className="fmdqui-fileupload-ring__track"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          className="fmdqui-fileupload-ring__arc"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {hasLabel && <span className="fmdqui-fileupload-ring__label">{pct}%</span>}
    </span>
  );
};

UploadProgressRing.displayName = 'UploadProgressRing';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — FileUploadRow
   Figma: Small upload (6092:3073) · 450×48 · HORIZONTAL · gap 16

     Default      cloud-upload circle · "Upload your document" · Button "Upload"
     In Progress  PDF badge           · name + meta           · ring + close
     Complete     success circle      · name + meta           · bin + download
     Error        error circle        · name + error message  · "Try Again"
   ═══════════════════════════════════════════════════════════════════════════ */

export interface FileUploadRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError' | 'title'> {
  /** Figma `state` variant */
  state?: FileUploadRowState;
  /** Title line. Figma: "Upload your document" / "Name of document.pdf" */
  title?: ReactNode;
  /** File metadata shown on the second line */
  file?: UploadFileMeta;
  /** Hint shown in the `default` state. Figma: "PDF format" */
  hint?: ReactNode;
  /** Max-size hint. Figma: "Max. 5MB" */
  maxSizeHint?: ReactNode;
  /** Error copy for the `error` state. Figma: "Error message" */
  errorMessage?: ReactNode;
  /** 0–100, used by `in progress` */
  progress?: number;
  uploadLabel?: string;
  retryLabel?: string;
  onUpload?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  onRetry?: () => void;
}

export const FileUploadRow = forwardRef<HTMLDivElement, FileUploadRowProps>(
  (
    {
      state = 'default',
      title,
      file,
      hint = 'PDF format',
      maxSizeHint = 'Max. 5MB',
      errorMessage = 'Error message',
      progress = 25,
      uploadLabel = 'Upload',
      retryLabel = 'Try Again',
      onUpload,
      onCancel,
      onDelete,
      onDownload,
      onRetry,
      className,
      ...rest
    },
    ref
  ) => {
    const name = file?.name ?? 'Name of document.pdf';
    const resolvedTitle = title ?? (state === 'default' ? 'Upload your document' : name);
    const stamp = file?.timestamp ?? '11 Sep, 2026 | 12:24pm';
    const size = file?.size ?? '13MB';

    return (
      <div
        ref={ref}
        className={cx(
          'fmdqui-fileupload-row',
          `fmdqui-fileupload-row--${state.replace(/\s+/g, '-')}`,
          className
        )}
        {...rest}
      >
        <div className="fmdqui-fileupload-row__left">
          {/* Figma uses the file-type badge only while uploading; the other
              states use the tinted status circle. */}
          {state === 'in progress' ? (
            <FileTypeBadge format={file?.format ?? formatFromName(name)} size={48} />
          ) : (
            <UploadStateIcon
              type={state === 'complete' ? 'success' : state === 'error' ? 'error' : 'default'}
              size={48}
            />
          )}

          <div className="fmdqui-fileupload-row__text">
            <span className="fmdqui-fileupload-row__title">{resolvedTitle}</span>
            {state === 'error' ? (
              <span className="fmdqui-fileupload-row__error">{errorMessage}</span>
            ) : (
              <span className="fmdqui-fileupload-row__meta">
                <span>{state === 'default' ? hint : stamp}</span>
                <span className="fmdqui-fileupload-row__dot" aria-hidden="true" />
                <span className="fmdqui-fileupload-row__size">
                  {state === 'default' ? maxSizeHint : size}
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="fmdqui-fileupload-row__actions">
          {state === 'default' && (
            <Button variant="primary" size="sm" onClick={onUpload}>
              {uploadLabel}
            </Button>
          )}

          {state === 'in progress' && (
            <>
              <UploadProgressRing progress={progress} size={48} />
              <button
                type="button"
                className="fmdqui-fileupload-row__icon-btn"
                onClick={onCancel}
                aria-label="Cancel upload"
              >
                <Icon name="multiply" variant="linear" size={28} />
              </button>
            </>
          )}

          {state === 'complete' && (
            <>
              <button
                type="button"
                className="fmdqui-fileupload-row__icon-btn fmdqui-fileupload-row__icon-btn--danger"
                onClick={onDelete}
                aria-label="Delete file"
              >
                <Icon name="bin" variant="linear" size={28} />
              </button>
              <button
                type="button"
                className="fmdqui-fileupload-row__icon-btn"
                onClick={onDownload}
                aria-label="Download file"
              >
                <Icon name="download" variant="linear" size={28} />
              </button>
            </>
          )}

          {state === 'error' && (
            <Button
              variant="text"
              buttonType="primary"
              size="sm"
              iconStyle="leading icon"
              icon={<Icon name="refresh" variant="linear" size={20} />}
              onClick={onRetry}
            >
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

FileUploadRow.displayName = 'FileUploadRow';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — FileDropzone
   Figma: Big Upload (6100:14546) · 400×264 · dashed 1.5px border (4/4) · r16

     default    white      + neutral-300 border · browse + drag-and-drop + OR
     uploading  #FFFBFA    + primary-200 border · PDF badge, %, linear bar
     success    #FBFEFC    + success-200 border · "Clear Upload"
     error      #FEFBFB    + destructive-light  · "Try Again"
   ═══════════════════════════════════════════════════════════════════════════ */

export interface FileDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError' | 'onSelect' | 'title'> {
  /** Figma `Property 1` variant */
  state?: FileDropzoneState;
  /** Headline. Figma: "Uploading Document..." / "Failed to Upload" */
  title?: ReactNode;
  /** Sub-line. Figma: "{Name of document}" / "Error message" */
  supportingText?: ReactNode;
  /** Accepted-formats hint for the default state */
  hint?: ReactNode;
  /** Figma: "Click to upload" */
  browseLabel?: string;
  /** Figma: "or drag and drop" */
  dragLabel?: string;
  /** Figma: "Browse Files" */
  secondaryLabel?: string;
  /** 0–100, used by `uploading` */
  progress?: number;
  /** Badge format shown while uploading */
  format?: FileTypeFormat;
  accept?: string;
  multiple?: boolean;
  onSelectFiles?: (files: FileList) => void;
  onRetry?: () => void;
  onClear?: () => void;
}

export const FileDropzone = forwardRef<HTMLDivElement, FileDropzoneProps>(
  (
    {
      state = 'default',
      title,
      supportingText,
      hint = 'SVG, PNG, JPG or GIF (max. 800x400px)',
      browseLabel = 'Click to upload',
      dragLabel = 'or drag and drop',
      secondaryLabel = 'Browse Files',
      progress = 65,
      format = 'PDF',
      accept,
      multiple,
      onSelectFiles,
      onRetry,
      onClear,
      className,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const pick = useCallback(() => inputRef.current?.click(), []);

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files?.length) onSelectFiles?.(e.dataTransfer.files);
      },
      [onSelectFiles]
    );

    return (
      <div
        ref={ref}
        className={cx(
          'fmdqui-fileupload-dropzone',
          `fmdqui-fileupload-dropzone--${state}`,
          dragging && 'fmdqui-fileupload-dropzone--dragging',
          className
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        {...rest}
      >
        <input
          ref={inputRef}
          type="file"
          className="fmdqui-fileupload-dropzone__input"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && onSelectFiles?.(e.target.files)}
          tabIndex={-1}
        />

        <div className="fmdqui-fileupload-dropzone__content">
          {state === 'uploading' ? (
            <>
              <FileTypeBadge format={format} size={45} />
              <div className="fmdqui-fileupload-dropzone__uploading">
                <span className="fmdqui-fileupload-dropzone__pct">{progress}%</span>
                {/* Figma shows a bare bar here — the percentage sits above it,
                    so ProgressBar's label, metadata and footer are suppressed. */}
                <ProgressBar
                  progress={progress}
                  size="sm"
                  color="blue"
                  hasLabel={false}
                  hasMetadata={false}
                  hasDescription={false}
                  hasPercentages={false}
                  className="fmdqui-fileupload-dropzone__bar"
                />
              </div>
            </>
          ) : (
            <UploadStateIcon
              type={state === 'success' ? 'success' : state === 'error' ? 'error' : 'default'}
              size={56}
            />
          )}

          {state === 'default' ? (
            <div className="fmdqui-fileupload-dropzone__texts">
              <span className="fmdqui-fileupload-dropzone__action">
                <Button variant="text" buttonType="primary" size="sm" onClick={pick}>
                  {browseLabel}
                </Button>
                <span className="fmdqui-fileupload-dropzone__drag">{dragLabel}</span>
              </span>
              <span className="fmdqui-fileupload-dropzone__hint">{hint}</span>
            </div>
          ) : (
            <div className="fmdqui-fileupload-dropzone__texts">
              <span className="fmdqui-fileupload-dropzone__title">
                {title ?? (state === 'error' ? 'Failed to Upload' : 'Uploading Document...')}
              </span>
              <span className="fmdqui-fileupload-dropzone__hint">
                {supportingText ?? (state === 'error' ? 'Error message' : '{Name of document}')}
              </span>
            </div>
          )}

          {state === 'default' && (
            <>
              {/* Figma instances the shared Divider with "OR" */}
              <span className="fmdqui-fileupload-dropzone__divider">
                <span className="fmdqui-fileupload-dropzone__divider-label">OR</span>
              </span>
              <Button variant="primary" size="sm" onClick={pick}>
                {secondaryLabel}
              </Button>
            </>
          )}

          {state === 'success' && (
            <Button
              variant="text"
              buttonType="secondary"
              size="sm"
              iconStyle="leading icon"
              icon={<Icon name="bin" variant="linear" size={20} />}
              onClick={onClear}
            >
              Clear Upload
            </Button>
          )}

          {state === 'error' && (
            <Button
              variant="text"
              buttonType="primary"
              size="sm"
              iconStyle="leading icon"
              icon={<Icon name="refresh" variant="linear" size={20} />}
              onClick={onRetry}
              className="fmdqui-fileupload-dropzone__retry"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }
);

FileDropzone.displayName = 'FileDropzone';

/* ═══════════════════════════════════════════════════════════════════════════
   FULL — FileUploadList
   Figma: Mutilple Uploads (6100:15099) — a stack of Small upload rows, with a
   BOOLEAN per slot (`file 1` … `file 7`) controlling how many are shown.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface FileUploadListItem extends FileUploadRowProps {
  id?: string;
}

export interface FileUploadListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rows to render — Figma's seven `file n` booleans become a list */
  files?: FileUploadListItem[];
  /** Optional dropzone above the list */
  dropzone?: FileDropzoneProps | false;
}

export const FileUploadList: React.FC<FileUploadListProps> = ({
  files = [],
  dropzone = false,
  className,
  ...rest
}) => (
  <div className={cx('fmdqui-fileupload-list', className)} {...rest}>
    {dropzone && <FileDropzone {...dropzone} />}
    {files.map((f, i) => {
      const { id, ...row } = f;
      return <FileUploadRow key={id ?? i} {...row} />;
    })}
  </div>
);

FileUploadList.displayName = 'FileUploadList';
