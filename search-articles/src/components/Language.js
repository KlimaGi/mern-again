import React from "react";

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.state = { languages: [] };

    this.onClickLang = this.onClickLang.bind(this);
  }

  componentDidMount() {
    this.setState({
      languages: [
        { key: "Arabic", name: "ar" },
        { key: "German", name: "de" },
        { key: "Greek", name: "el" },
        { key: "English", name: "en" },
        { key: "Spanish", name: "es" },
        { key: "French", name: "fr" },
        { key: "Hebrew", name: "he" },
        { key: "Hindi", name: "hi" },
        { key: "Italian", name: "it" },
        { key: "Japanese", name: "ja" },
        { key: "Malayalam", name: "ml" },
        { key: "Marathi", name: "mr" },
        { key: "Dutch", name: "nl" },
        { key: "Norwegian", name: "no" },
        { key: "Portuguese", name: "pt" },
        { key: "Romanian", name: "ro" },
        { key: "Russian", name: "ru" },
        { key: "Swedish", name: "sv" },
        { key: "Tamil", name: "ta" },
        { key: "Telugu", name: "te" },
        { key: "Ukrainian", name: "uk" },
        { key: "Chinese", name: "zh" },
      ],
    });
  }

  onClickLang = (event) => {
    const langName = this.state.languages.filter((el) => {
      if (event.target.value === el.key) {
        return el.name;
      }
    });

    this.props.onClickLanguage(langName[0].name);
    //console.log("langName", langName);
  };

  render() {
    return (
      <div>
        <select
          className="form-select text-color mx-2 input-back"
          onChange={this.onClickLang}
        >
          <option className="text-color">Select Language</option>
          {this.state.languages.map((lang) => {
            return <option>{lang.key}</option>;
          })}
        </select>
      </div>
    );
  }
}

export default Language;
