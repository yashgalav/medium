
import CustomDropdown from './CustomDropdown'
import { Editor as TiptapEditor, EditorContent } from '@tiptap/react';
import { useRecoilState } from 'recoil';
import { titleAtom } from '../store/atoms';

export default function Editor({ editor }: { editor: TiptapEditor | null }) {
    const [title, setTitle] = useRecoilState(titleAtom);


    return (
        <div className="flex  items-start space-x-6 h-full  ">
            {/* Plus button with dropdown */}
            <div className="flex-shrink-0 pt-2">
                <CustomDropdown editor={editor} />
            </div>

            {/* Editor content */}
            <div className="flex-1 min-w-0  h-full">
                {/* Title input */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-4xl md:text-5xl font-light text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent mb-4 leading-tight"
                />
                
                {/* Tiptap Editor Content */}
                <EditorContent 
                    editor={editor} 
                    className="ProseMirror h-3/4  [&_.ProseMirror]:outline-none  [&_.ProseMirror]:px-1 [&_.ProseMirror]:text-gray-900"
                />
            </div>
        </div>
    )
}