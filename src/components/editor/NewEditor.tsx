import React, { Fragment, useState } from 'react'
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';


const codeSnippet = `
    // TODO: edit this code snippet
    import axios from "axios";
    const getUser = () => {
        return axios.get('https://randomuser.me/api);
    }
`

const languages: Language[] = [
    "tsx",
    "typescript",
    "javascript",
    "jsx",
    "python",
    "json",
    "go"
]


// Define styles for editor
const styles: any = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        ...theme.plain
    }
}


// Highlight component

const HighlightElement = (code: string) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={languages[0]}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                    </div>
                ))}
            </Fragment>
        )}
    </Highlight>
)

export const NewEditor = () => {
    const [code, setCode] = useState(codeSnippet);
    const [languageSelected, setLanguageSelected] = useState(languages[0])
    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
    }
    const handleLanguageChange = (language: any) => {
        setLanguageSelected(language)
    }

    return (
        <div className="">
            <select>
                {
                    languages.map((language, index) => (
                        <option onChange={(value)=>handleLanguageChange(value)} key={index} value={language}>{language}</option>
                    ))
                }
            </select>
            <Editor
                value={code}
                onValueChange={handleCodeChange}
                highlight={HighlightElement}
                padding={10}
                style={styles.root}
            />
        </div>
    )
}
