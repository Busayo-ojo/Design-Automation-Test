import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  FileTypeBadge,
  UploadStateIcon,
  UploadProgressRing,
  FileUploadRow,
  FileDropzone,
  FileUploadList,
} from './FileUpload';
import {
  FILE_TYPE_FORMATS,
  UPLOAD_STATE_TYPES,
  FILE_UPLOAD_ROW_STATES,
  FILE_DROPZONE_STATES,
} from './fileUploadUtils';

/* ───────────────────────────────────────────────────────────────────────────
   Figma: page "✤ File Upload ⚜️" — 19 variants across 5 nodes.
   Stories follow Figma's own order: Elements → Full.
   ─────────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof FileDropzone> = {
  title: 'Components/📎 File Upload',
  component: FileDropzone,
  parameters: {
    docs: {
      description: {
        component:
          'Per the Figma documentation frame, file upload components "enable users to upload files from their local devices to a web or application interface." Composes the existing Button and ProgressBar elements.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: FILE_DROPZONE_STATES,
      description: 'Figma `Property 1` variant (Big Upload 6100:14546)',
      table: { category: 'Variant' },
    },
    format: {
      control: 'select',
      options: FILE_TYPE_FORMATS,
      description: 'Badge format shown while uploading',
      table: { category: 'Variant' },
    },
    progress: { control: { type: 'range', min: 0, max: 100 }, table: { category: 'Content' } },
    title: { control: 'text', table: { category: 'Content' } },
    supportingText: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    browseLabel: { control: 'text', table: { category: 'Content' } },
    dragLabel: { control: 'text', table: { category: 'Content' } },
    secondaryLabel: { control: 'text', table: { category: 'Content' } },
  },
};
export default meta;

// ─── Local presentation helpers (stories only) ─────────────────────────────

const Wrap: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title, note, children,
}) => (
  <section style={{ marginBottom: 48, fontFamily: 'DM Sans, sans-serif' }}>
    <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: 'var(--color-neutral-900)' }}>{title}</h3>
    {note && <p style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-500)' }}>{note}</p>}
    <div style={{ marginTop: 16 }}>{children}</div>
  </section>
);

const Cell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{label}</code>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   1 · ELEMENTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const ElementsFileType: StoryObj = {
  name: 'Elements / 🏷️ File Type Badge — all 6 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `file type` (COMPONENT_SET 3355:170664) — a document glyph with a colour-coded format chip. Two of the six colours had no existing token and were added: `--color-file-jpg` and `--color-file-mp3`.',
      },
    },
  },
  render: () => (
    <Wrap title="file type" note="Figma 3355:170664 · 6 variants · 24×24 base, shown at 48">
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {FILE_TYPE_FORMATS.map((f) => (
          <Cell key={f} label={`type=${f}`}>
            <FileTypeBadge format={f} size={48} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

export const ElementsUploadStates: StoryObj = {
  name: 'Elements / ⭕ Upload State Icon — all 4 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `file upload states` (COMPONENT_SET 3355:171475) — a tinted circle with a status glyph. Note `warning` exists in the element set but none of the full compositions use it.',
      },
    },
  },
  render: () => (
    <Wrap title="file upload states" note="Figma 3355:171475 · 4 variants · 32×32 base, shown at 56">
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {UPLOAD_STATE_TYPES.map((t) => (
          <Cell key={t} label={`type=${t}`}>
            <UploadStateIcon type={t} size={56} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

export const ElementsProgressRing: StoryObj = {
  name: 'Elements / 🔵 Upload Progress Ring',
  parameters: {
    docs: {
      description: {
        story:
          'The circular indicator Figma instances inside the `In Progress` upload row — a primary-400 arc on a neutral-100 track with the percentage centred.',
      },
    },
  },
  render: () => (
    <Wrap title="Progress ring" note="primary-400 arc · neutral-100 track · SemiBold 12px label">
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {[0, 25, 50, 65, 100].map((p) => (
          <Cell key={p} label={`progress=${p}`}>
            <UploadProgressRing progress={p} size={48} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   2 · FULL
   ═══════════════════════════════════════════════════════════════════════════ */

export const FullUploadRow: StoryObj = {
  name: 'Full / 📄 Upload Row — all 4 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Small upload` (COMPONENT_SET 6092:3073) · 450×48. Each state swaps both the leading indicator and the trailing actions. Note that `In Progress` is the only state that uses the file-type badge rather than the status circle.',
      },
    },
  },
  render: () => (
    <Wrap title="Small upload" note="Figma 6092:3073 · 4 variants · 450×48 · gap 16">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {FILE_UPLOAD_ROW_STATES.map((s) => (
          <Cell key={s} label={`state=${s}`}>
            <FileUploadRow state={s} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

export const FullDropzone: StoryObj = {
  name: 'Full / 📦 Dropzone — all 4 Figma variants',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Big Upload` (COMPONENT_SET 6100:14546) · 400×264 with a dashed 1.5px border. Each state tints both the surface and the border; the three tinted surfaces had no existing tokens and were added.',
      },
    },
  },
  render: () => (
    <Wrap title="Big Upload" note="Figma 6100:14546 · 4 variants · 400×264 · dashed 1.5px, r16">
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {FILE_DROPZONE_STATES.map((s) => (
          <Cell key={s} label={`Property 1=${s}`}>
            <FileDropzone state={s} />
          </Cell>
        ))}
      </div>
    </Wrap>
  ),
};

export const FullMultiple: StoryObj = {
  name: 'Full / 🗂️ Multiple Uploads',
  parameters: {
    docs: {
      description: {
        story:
          'Figma `Mutilple Uploads` (COMPONENT 6100:15099) exposes seven `file n` booleans — one per slot. In code that becomes a `files` array, so the list is not capped at seven.',
      },
    },
  },
  render: () => (
    <Wrap title="Mutilple Uploads" note="Figma 6100:15099 · 7 file booleans → a files array">
      <FileUploadList
        dropzone={{ state: 'default' }}
        files={[
          { state: 'complete', file: { name: 'Annual report.pdf', size: '13MB' } },
          { state: 'in progress', progress: 45, file: { name: 'Trade data.xls', format: 'XLS' } },
          { state: 'error', file: { name: 'Scan.jpg' }, errorMessage: 'File exceeds 5MB limit' },
          { state: 'complete', file: { name: 'Cover art.png', size: '2MB' } },
        ]}
      />
    </Wrap>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   3 · INTERACTIVE
   ═══════════════════════════════════════════════════════════════════════════ */

export const Interactive: StoryObj = {
  name: 'Interactive / Pick or drag a file',
  parameters: {
    docs: {
      description: {
        story:
          'Click "Click to upload" or "Browse Files" to open the file picker, or drag a file onto the dropzone. The chosen file runs through a simulated upload and lands in the list below — exercising all four row states end to end.',
      },
    },
  },
  render: function InteractiveUpload() {
    const [files, setFiles] = useState<
      Array<{ name: string; size: string; state: 'in progress' | 'complete'; progress: number }>
    >([]);

    const add = (list: FileList) => {
      const f = list[0];
      if (!f) return;
      const entry = {
        name: f.name,
        size: `${Math.max(1, Math.round(f.size / 1024 / 1024))}MB`,
        state: 'in progress' as const,
        progress: 0,
      };
      setFiles((prev) => [...prev, entry]);
      // Simulated progress so the states can be seen without a backend.
      let p = 0;
      const tick = setInterval(() => {
        p += 20;
        setFiles((prev) =>
          prev.map((x) =>
            x.name === entry.name
              ? { ...x, progress: Math.min(100, p), state: p >= 100 ? 'complete' : 'in progress' }
              : x
          )
        );
        if (p >= 100) clearInterval(tick);
      }, 400);
    };

    return (
      <Wrap title="Pick or drag a file" note="Simulated upload — no backend required">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <FileDropzone state="default" onSelectFiles={add} />
          {files.map((f, i) => (
            <FileUploadRow
              key={`${f.name}-${i}`}
              state={f.state}
              progress={f.progress}
              file={{ name: f.name, size: f.size }}
              onDelete={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
              onCancel={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
            />
          ))}
        </div>
      </Wrap>
    );
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   4 · PLAYGROUND
   ═══════════════════════════════════════════════════════════════════════════ */

export const Playground: StoryObj<typeof FileDropzone> = {
  args: {
    state: 'default',
    progress: 65,
    format: 'PDF',
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
    browseLabel: 'Click to upload',
    dragLabel: 'or drag and drop',
    secondaryLabel: 'Browse Files',
  },
};
