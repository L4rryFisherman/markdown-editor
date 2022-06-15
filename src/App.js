
import './App.css';
import React from 'react';
import { FaWindowMaximize, FaWindowMinimize } from 'react-icons/fa';
import Markdown from 'marked-react';
import Lowlight from 'react-lowlight'
import javascript from 'highlight.js/lib/languages/javascript';
Lowlight.registerLanguage('js', javascript);

const renderer = {
  code(snippet, lang) {
    return <Lowlight key={this.elementId} language={lang} value={snippet} />;
  },
};

function App() {
  return (
    <div>
      <Input />

        <script src="bundle.js"></script>
        <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>

    </div>
  );
}



class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folded:true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.body.style.backgroundColor = "#f0f2f5"
}
  handleClick() {this.setState(prevState => ({folded: !prevState.folded}));  }
  render() {
    return (
    <div id="input">
      <div id="inputbox"></div>
        <div id="inputheader"><h3>Editor</h3>
          <div id="icon">
            <button onClick={this.handleClick} >{this.state.folded ===true? <FaWindowMaximize /> :<FaWindowMinimize />}</button>
          </div>
        </div>
      <InputBox folded={this.state.folded} />
    </div>
    )
  }
}

const defaultinput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
\/\/ this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`


class InputBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: defaultinput,
      output: <Markdown renderer={renderer} options={{gfm: true, breaks: true}} value={defaultinput} /> 
    };
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange = (event) => {
    let text = event.target.value;
    text = <Markdown renderer={renderer} options={{gfm: true, breaks: true}} value={text} /> 
    this.setState({ 
      input: event.target.value,
      output: text 
    });
  }
  render() {
    const style = this.props.folded==true ? {'height':'200px'} : {'height':'800px'}
    return (
      <div id="textarea">
      <textarea id="editor" value={this.state.input} onChange={this.handleChange} style={style} />
      <div id="outputbox">
      <OutputBox input={this.state.output}/>
      </div>
    </div>
    )
  }
}



 
class OutputBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folded:true
    };
    this.handleClick = this.handleClick.bind(this);
  }
    handleClick() {this.setState(prevState => ({folded: !prevState.folded}))};
  render() {
    const style = this.state.folded==true ? {'height':'200px'} : {'height':'800px'}
    return (
    <div>
      <div id="outputheader"><h3>Markdown</h3>
        <div id="icon">
          <button onClick={this.handleClick} >{this.state.folded ===true? <FaWindowMaximize /> :<FaWindowMinimize />}</button>
        </div>
      </div>
      
      <div id="preview" style={style}>
        {this.props.input}
      </div>
      
    </div>
    )
  }
}



export default App;
