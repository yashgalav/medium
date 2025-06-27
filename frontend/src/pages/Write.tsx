import Editor from '../components/Editor'
import StarterKit from '@tiptap/starter-kit';
import { generateHTML, useEditor } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import { common, createLowlight } from 'lowlight'
import MediumNavbar from '../components/MediumNavbar';
import Placeholder from '@tiptap/extension-placeholder'
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentAtom, imageAtom, titleAtom } from '../store/atoms';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

const lowlight = createLowlight(common)

export default function Write() {
    const [content, setContent] = useRecoilState(contentAtom);
    const title = useRecoilValue(titleAtom);
    const [image, setImage] = useRecoilState(imageAtom);
    const navigate = useNavigate();


    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // disable default CodeBlock
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Placeholder.configure({
                placeholder: "Tell your Story...",
            })
        ]
        // content: '<p></p>',
        ,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();

            // Function to remove image nodes
            const filterImages = (node: any): any => {
                if (node.type === 'image') {
                    return null;  // Exclude image node
                }

                if (node.content) {
                    node.content = node.content
                        .map(filterImages)
                        .filter((child: any) => child !== null);
                }

                return node;
            };

            const images = ((node: any, collectedImages: any[] = []): any[] => {
                if (!node) return collectedImages;
                if (node.type === 'image') {
                    collectedImages.push(node);  // You can also push node.attrs.src if you want only URLs
                }

                if (node.content && Array.isArray(node.content)) {
                    node.content.forEach((child: any) => images(child, collectedImages));
                }

                return collectedImages;
            })



            if (images(json).length > 0) {
                images(json).forEach((imgNode, index) => {
                    const src = imgNode.attrs.src;

                    // If your src is a base64 string, convert it to a File
                    if (src.startsWith('data:image/')) {
                        const file = base64ToFile(src, `image_${index}.png`);
                        setImage(file);
                    }
                });

            } else {
                setImage(null)
            }

            const filteredJson = filterImages(json);

            if (filteredJson) {
                const htmlWithoutImages = generateHTML(filteredJson, [StarterKit]);
                setContent(htmlWithoutImages);
            }
        },
    });

    const formData = new FormData();

    // Append image file
    formData.append('image', image);  // selectedFile = File object (from input)

    // Append other data fields
    formData.append('title', title);

    // setContent(stripHtml(content))
    formData.append('content', content);

    // Send via Fetch API

    async function uploadPost(formData :FormData) {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog/create`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,  // Example: JWT Token from localStorage
                }
            })
                .then(response => {
                    toast.success(response.data.message, {
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
                    navigate("/blogs");
                })
        } catch (ex: any) {
            const errorMessage = ex.response?.data?.message || ex.message || "Something went wrong!";

            toast.error(errorMessage, {
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
        }
    }



    return (
        <div className='h-screen'>
            <MediumNavbar hidden={false} uploadPost={uploadPost} formData={formData} />
            <div className='h-3/4 px-4' style={{ maxWidth: 600, margin: '2rem auto' }}>
                <Editor editor={editor} />
            </div>

        </div>
    )
}


const base64ToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};


