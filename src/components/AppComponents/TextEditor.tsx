import { Text, Box } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";

type TextEditorProps = {
  data: string;
  onChangeValue: any;
  isLimited?: boolean;
};

function TextEditor(TextEditorProps: TextEditorProps) {
  const isLimited = TextEditorProps.isLimited
    ? TextEditorProps.isLimited
    : false;
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  return (
    <>
      {editorLoaded ? (
        <Box overflowX="auto" overflowY="auto" color="black" maxW="100%">
          {isLimited ? (
            <CKEditor
              editor={ClassicEditor}
              data={TextEditorProps.data}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "undo",
                  "redo",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "insertTable",
                ],
              }}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                TextEditorProps.onChangeValue(data);
              }}
            />
          ) : (
            <CKEditor
              editor={ClassicEditor}
              data={TextEditorProps.data}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                TextEditorProps.onChangeValue(data);
              }}
            />
          )}
        </Box>
      ) : (
        <Text>Editor Loading</Text>
      )}
    </>
  );
}
export default TextEditor;
