"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Quill default styles
import "./QuillEditor.css"; // ✅ Import your custom styles

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-slate-50 animate-pulse rounded-xl" />
  ),
});

// ✅ Register custom Divider blot
import Quill from "quill";
const BlockEmbed = Quill.import("blots/block/embed");

class DividerBlot extends BlockEmbed {
  static blotName = "divider";
  static tagName = "hr";
}
Quill.register(DividerBlot);

const QuillEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["divider"], 
        ["clean"],
      ],
      handlers: {
        divider: function () {
          const range = this.quill.getSelection();
          if (range) {
            this.quill.insertEmbed(range.index, "divider", true, "user");
          }
        },
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "divider", // ✅ Allow divider format
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
    </div>
  );
};

export default QuillEditor;
