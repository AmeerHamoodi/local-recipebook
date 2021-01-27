const modules = {
    toolbar: [
        [{ 'header': 1 }],
        [{ 'header': 2 }],
        [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'indent',
            'size',
            'video',
        ],
        [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ "align": ["", "center", "right", "justify"] }],
        ['link', 'image'],
        ['clean'],
        [
            { "script": "super" },
            { "script": "sub" }
        ]
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'size',
    'formula',
    'video',
    'align',
    'code-block',
    'script',
    'code',
    'color'
];

export { modules, formats };