import React, { useState, useRef, useEffect } from 'react';
import { Plus, ImageIcon, Minus, Code, Quote } from 'lucide-react';
import { Editor as TiptapEditor } from '@tiptap/react';
import { Bounce, toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { contentAtom, imageAtom } from '../store/atoms';

export default function CustomDropdown({ editor }: { editor: TiptapEditor | null }) {
    if (!editor) return null;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useRecoilState(contentAtom);
    const [image, setImage] = useRecoilState(imageAtom)

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const insertParagraph = () => {
        if (editor) {
            editor.chain().focus().insertContent('<p>Tell your story...</p>').run();
            setIsOpen(false);

        }
    }

    const insertDivider = () => {
        if (editor) {
            editor.chain().focus().setHorizontalRule().run();
            setIsOpen(false);
        }
    }

    const insertCodeBlock = () => {
        if (editor) {
            editor.chain().focus().insertContent({
                type: 'codeBlock',
                attrs: {
                    language: 'javascript',
                },
                content: [{
                    type: 'text',
                    text: `function greet(name) {
                                console.log('Hello, ' + name);
                            }`
                }],
            }).run();
            setIsOpen(false);
            
        }
    }

    const insertQuote = () => {
        if (editor) {
            editor.chain().focus().insertContent('<blockquote><p>Your quote here...</p></blockquote>').run();
            setIsOpen(false);
            
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && editor) {
            
            // Check if an image already exists in the editor
            const hasImage = editor.getHTML().includes('<img');

            if (hasImage) {

                // Ask user if they want to replace the existing image
                const confirmMessage = 'Image successfully replaced!';

                toast.success(confirmMessage, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });

                if (!hasImage) {
                    setIsOpen(false);
                    event.target.value = '';
                    return;
                }

                // Remove existing image
                const doc = editor.state.doc;
                editor.chain().focus().command(({ tr, state }) => {
                    let imageFound = false;
                    doc.descendants((node, pos) => {
                        if (node.type.name === 'image') {
                            tr.delete(pos, pos + node.nodeSize);
                            imageFound = true;
                            return false; // Stop after first image
                        }
                    });
                    return imageFound;
                }).run();
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const src = e.target?.result as string;
                editor.chain().focus().setImage({ src, alt: file.name }).run();
            };
            reader.readAsDataURL(file);
            setIsOpen(false);
        }
        // Reset the input value so the same file can be selected again
        event.target.value = '';
    }

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                className={`w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 text-gray-400 hover:text-gray-600 flex items-center justify-center ${isOpen ? 'border-gray-400 text-gray-600' : ''
                    }`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <Plus className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <ul className="py-1 text-sm text-gray-700">
                        <li>
                            <label className="flex items-center w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Add Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </li>
                        <li>
                            <button
                                onClick={insertParagraph}
                                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Paragraph
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={insertDivider}
                                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                            >
                                <Minus className="w-4 h-4 mr-2" />
                                Add Divider
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={insertCodeBlock}
                                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                            >
                                <Code className="w-4 h-4 mr-2" />
                                Add Code Block
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={insertQuote}
                                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                            >
                                <Quote className="w-4 h-4 mr-2" />
                                Add Quote
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}