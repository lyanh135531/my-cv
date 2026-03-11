import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered } from 'lucide-react';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Nhập nội dung...', minHeight = '120px' }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'rte-is-empty',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Avoid updating with empty paragraph wrapper
      const isEmpty = editor.isEmpty;
      onChange(isEmpty ? '' : html);
    },
    editorProps: {
      attributes: {
        class: 'rte-editor-content',
        style: `min-height: ${minHeight}`,
      },
    },
  });

  // Sync external value changes (e.g. from AI enhancement)
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    const incomingIsEmpty = !value || value === '';
    const currentIsEmpty = editor.isEmpty;

    if (incomingIsEmpty && !currentIsEmpty) {
      editor.commands.clearContent();
      return;
    }

    if (value !== currentHtml) {
      // Only set if the value is different to avoid cursor jump
      const { from, to } = editor.state.selection;
      editor.commands.setContent(value || '', { emitUpdate: false });
      try {
        editor.commands.setTextSelection({ from, to });
      } catch {
        // selection out of range after content change — ignore
      }
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rte-wrapper glass-input">
      <div className="rte-toolbar">
        <button
          type="button"
          title="Bold (Ctrl+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rte-tool-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          title="Italic (Ctrl+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rte-tool-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          <Italic size={14} />
        </button>
        <button
          type="button"
          title="Underline (Ctrl+U)"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rte-tool-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
        >
          <UnderlineIcon size={14} />
        </button>
        <div className="rte-divider" />
        <button
          type="button"
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rte-tool-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        >
          <List size={14} />
        </button>
        <button
          type="button"
          title="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rte-tool-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        >
          <ListOrdered size={14} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
