import "./tiptap.css"

import { TextStyleKit } from '@tiptap/extension-text-style'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Label } from "./ui/label"

import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"




import { useController, useFormContext } from 'react-hook-form'

const extensions = [TextStyleKit, StarterKit]

function MenuBar({ editor }: { editor: Editor }) {
    // Read the current editor's state, and re-render the component when it changes
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        },
    })

    return (
        <div className="control-group">
            <ToggleGroup className="button-group flex flex-wrap gap-2 bg-card px-2 w-full justify-center" type="multiple">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? 'is-active' : ''}
                >
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={editorState.isItalic ? 'is-active' : ''}
                >
                    <ToggleGroupItem value="Italic" aria-label="Toggle itallic">
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={editorState.isStrike ? 'is-active' : ''}
                >
                    <ToggleGroupItem value="Strike" aria-label="Toggle strike">
                        <Strikethrough className="h-4 w-4" />
                    </ToggleGroupItem>
                </button>



                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editorState.isBulletList ? 'is-active' : ''}
                >
                    <ToggleGroupItem value="bulletList" aria-label="Toggle bullet list">
                        <List className="h-4 w-4" />
                    </ToggleGroupItem>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editorState.isOrderedList ? 'is-active' : ''}
                >
                    <ToggleGroupItem value="orderedList" aria-label="Toggle ordered list">
                        <ListOrdered className="h-4 w-4" />
                    </ToggleGroupItem>
                </button>

            </ToggleGroup>
        </div>
    )
}

export default ({ name }: { name: string }) => {
    const { control } = useFormContext();
    const { field } = useController({
        name,
        control,
    });

    const editor = useEditor({
        extensions,
        content: field.value || '',
        onUpdate: ({ editor }) => {
            field.onChange(editor.getHTML());
        },
    });

    return (
        <div>
            <Label className="my-4">Comentários e Obsvervações</Label>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="border border-border rounded-md p-4 shadow-md mt-2 tiptap" />
        </div>
    )
}
