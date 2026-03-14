"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css'; // Use react-quill-new for better React 18/19 support

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-slate-50 animate-pulse rounded-xl" />,
});

const QuillEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['clean'], 
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="min-h-[300px]"
      />
      <style jsx global>{`
        .ql-container {
          min-height: 250px;
          font-size: 16px;
        }
        .ql-editor {
          min-height: 250px;
        }
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .ql-container.ql-snow {
          border: none;
        }
      `}</style>
    </div>
  );
};

export default QuillEditor;